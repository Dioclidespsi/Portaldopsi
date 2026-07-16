-- Row-Level Security para isolamento entre tenants (contas de psicólogo/clínica).
-- Rodar uma vez após `npx prisma db push` (ou a cada `db push` que recriar tabelas):
--   npx prisma db execute --file prisma/rls.sql --schema prisma/schema.prisma
--
-- Modelo: toda query passa por PrismaService, que executa
--   SET LOCAL app.tenant_id = '<uuid-do-tenant>'
-- no início de cada transação (ver src/prisma/prisma.service.ts). Sem esse SET,
-- current_setting(...) retorna NULL e a policy nega a linha por padrão — falha
-- fechado, não aberto.
--
-- FORCE ROW LEVEL SECURITY é necessário porque o usuário de aplicação do Postgres
-- normalmente é o dono das tabelas, e o dono ignora RLS por padrão.
--
-- A coluna é "tenantId" (camelCase, entre aspas) porque o Prisma cria as
-- colunas preservando o nome do campo do schema.prisma — só os nomes de
-- TABELA passaram por @@map para snake_case, os campos não.
--
-- users, invoices e subscriptions também aceitam o valor sentinela
-- '__system__' (nunca um tenantId real, que são uuid) — usado por
-- PrismaService.forSystem() para as poucas operações legitimamente
-- cross-tenant: webhook do Asaas/Stripe sincronizando status por
-- asaasPaymentId/asaasSubscriptionId (não por tenant conhecido) e o console
-- do administrador revisando CRP de qualquer tenant. Sem isso, essas queries
-- voltam sempre vazias/zero-linhas-afetadas, silenciosamente — foi um bug
-- real encontrado ao testar o console do admin ao vivo.

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE users FORCE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS tenant_isolation ON users;
CREATE POLICY tenant_isolation ON users
  USING ("tenantId" = current_setting('app.tenant_id', true) OR current_setting('app.tenant_id', true) = '__system__');

ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients FORCE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS tenant_isolation ON patients;
CREATE POLICY tenant_isolation ON patients
  USING ("tenantId" = current_setting('app.tenant_id', true));

ALTER TABLE prontuario_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE prontuario_entries FORCE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS tenant_isolation ON prontuario_entries;
CREATE POLICY tenant_isolation ON prontuario_entries
  USING ("tenantId" = current_setting('app.tenant_id', true));

ALTER TABLE homeworks ENABLE ROW LEVEL SECURITY;
ALTER TABLE homeworks FORCE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS tenant_isolation ON homeworks;
CREATE POLICY tenant_isolation ON homeworks
  USING ("tenantId" = current_setting('app.tenant_id', true));

ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments FORCE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS tenant_isolation ON appointments;
CREATE POLICY tenant_isolation ON appointments
  USING ("tenantId" = current_setting('app.tenant_id', true));

-- Sem exceção '__system__' de propósito, igual appointments/patients: o
-- agendamento público (BookingService) sempre resolve o tenantId pelo slug
-- primeiro e usa forTenant(id) explícito, nunca forSystem() — ver
-- profile.service.ts pra o mesmo padrão já usado no lead público.
ALTER TABLE availability_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE availability_slots FORCE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS tenant_isolation ON availability_slots;
CREATE POLICY tenant_isolation ON availability_slots
  USING ("tenantId" = current_setting('app.tenant_id', true));

ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices FORCE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS tenant_isolation ON invoices;
CREATE POLICY tenant_isolation ON invoices
  USING ("tenantId" = current_setting('app.tenant_id', true) OR current_setting('app.tenant_id', true) = '__system__');

ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions FORCE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS tenant_isolation ON subscriptions;
CREATE POLICY tenant_isolation ON subscriptions
  USING ("tenantId" = current_setting('app.tenant_id', true) OR current_setting('app.tenant_id', true) = '__system__');

-- também aceita '__system__': o webhook do Asaas libera a matrícula por
-- courseSlug+tenantId assim que o pagamento avulso do Marketplace confirma,
-- sem tenant conhecido no contexto de request (ver AsaasService.handleWebhook).
ALTER TABLE course_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_enrollments FORCE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS tenant_isolation ON course_enrollments;
CREATE POLICY tenant_isolation ON course_enrollments
  USING ("tenantId" = current_setting('app.tenant_id', true) OR current_setting('app.tenant_id', true) = '__system__');

ALTER TABLE test_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_assignments FORCE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS tenant_isolation ON test_assignments;
CREATE POLICY tenant_isolation ON test_assignments
  USING ("tenantId" = current_setting('app.tenant_id', true));

ALTER TABLE module_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE module_progress FORCE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS tenant_isolation ON module_progress;
CREATE POLICY tenant_isolation ON module_progress
  USING ("tenantId" = current_setting('app.tenant_id', true));

ALTER TABLE course_quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_quiz_attempts FORCE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS tenant_isolation ON course_quiz_attempts;
CREATE POLICY tenant_isolation ON course_quiz_attempts
  USING ("tenantId" = current_setting('app.tenant_id', true));

ALTER TABLE supervision_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE supervision_sessions FORCE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS tenant_isolation ON supervision_sessions;
CREATE POLICY tenant_isolation ON supervision_sessions
  USING ("tenantId" = current_setting('app.tenant_id', true));

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads FORCE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS tenant_isolation ON leads;
CREATE POLICY tenant_isolation ON leads
  USING ("tenantId" = current_setting('app.tenant_id', true));

-- Gap encontrado só na verificação pós-deploy: essas duas tabelas têm
-- tenantId mas nunca ganharam policy (o código sempre usa forCurrentTenant()
-- pra elas, então não havia vazamento ativo — mas ficavam sem a camada de
-- defesa do banco, inconsistente com o resto do projeto).
ALTER TABLE lead_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_activities FORCE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS tenant_isolation ON lead_activities;
CREATE POLICY tenant_isolation ON lead_activities
  USING ("tenantId" = current_setting('app.tenant_id', true));

ALTER TABLE ai_usage_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_usage_logs FORCE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS tenant_isolation ON ai_usage_logs;
CREATE POLICY tenant_isolation ON ai_usage_logs
  USING ("tenantId" = current_setting('app.tenant_id', true));

-- tenants, certificates, community_posts, community_replies, community_likes,
-- community_reports e community_notifications não levam policy de
-- tenant_isolation: os dois primeiros pela razão já documentada (raiz do
-- isolamento / verificação pública), os demais porque Comunidade é
-- deliberadamente CROSS-TENANT (não têm nem tenantId) — ver comentário em
-- CommunityPost no schema.prisma. Acesso fica restrito pela aplicação, não
-- pelo banco.

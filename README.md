# Portal do Psi — F0, F1, F2, F3 e F4 completos

Monorepo (`npm workspaces`) com o esqueleto de multi-tenancy, auth e billing descrito na
[arquitetura publicada](https://claude.ai/code/artifact/2870659d-ca02-418a-8489-d7e29dcfc9cc). F0
entrega signup/login multi-tenant com isolamento por Row-Level Security no Postgres. F1 adiciona os
módulos do dia a dia da clínica (Agenda, Financeiro, Site Profissional, Aplicação de Testes). F2
adiciona formação profissional e crescimento: Cursos, Certificados, Biblioteca, Supervisão e
Marketplace. F3 adiciona captação e comunidade: CRM, Marketing e Comunidade. F4 adiciona a camada de
IA, Teleconsulta e o Aplicativo do Paciente (identidade de login separada da equipe).

```
apps/
  api/   NestJS + Prisma — auth, tenants, patients, appointments, invoices, profile, psych-tests,
         courses, certificates, library, supervision, marketplace, crm, marketing, community, ai,
         teleconsulta, patient-portal, billing (Stripe + Asaas), asaas, admin (console cross-tenant:
         verificação de CRP, Ofertas), offers (leitura pro tenant)
  web/   Next.js — signup, login, dashboard (pacientes com prontuário/IA/teleconsulta, agenda,
         financeiro, testes, cursos, certificados, biblioteca, supervisão, crm, marketing,
         comunidade, assistente IA, site profissional, ofertas, assinatura) + /loja, /verificar,
         /paciente e /admin (console do administrador, login por token) públicas/separadas
```

## 1. Banco de dados

Não há Docker nesta máquina. Testado neste ambiente com **PostgreSQL 17 local** (instalado via
`winget install PostgreSQL.PostgreSQL.17`), mas Postgres gerenciado (Neon/Supabase) também funciona
— você cria a conta/instância, eu não faço esse cadastro por você.

**Crítico, não pule este passo**: a `DATABASE_URL` **nunca** pode apontar para a role `postgres`
(o superusuário). Superusuário do Postgres ignora RLS incondicionalmente — nem `FORCE ROW LEVEL
SECURITY` muda isso, essa opção só afeta o dono da tabela, nunca superusuário ou role com
`BYPASSRLS`. Conectar como `postgres` faz todo o isolamento entre tenants parecer funcionar em
testes superficiais e falhar silenciosamente assim que duas clínicas existem ao mesmo tempo — foi
exatamente isso que aconteceu na primeira rodada de teste deste projeto (ver seção abaixo). Crie
uma role de aplicação dedicada:

```sql
CREATE ROLE portal_app LOGIN PASSWORD 'escolha-uma-senha';
CREATE DATABASE portal_do_psi OWNER portal_app;
ALTER SCHEMA public OWNER TO portal_app;  -- rodar conectado ao banco portal_do_psi
```

E use essa role na `DATABASE_URL`, nunca `postgres`.

## 2. Configurar variáveis de ambiente

```
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.local.example apps/web/.env.local
```

Edite `apps/api/.env`:
- `DATABASE_URL` — a connection string do passo 1.
- `JWT_SECRET` — qualquer valor aleatório longo (`openssl rand -hex 32` ou similar).
- `STRIPE_SECRET_KEY` / `STRIPE_WEBHOOK_SECRET` / `STRIPE_PRICE_MONTHLY` / `STRIPE_PRICE_YEARLY` —
  deixe em branco por enquanto; o módulo de billing responde 503 até você preencher com chaves de
  teste e Price IDs reais da sua própria conta Stripe.
- `ANTHROPIC_API_KEY` — deixe em branco por enquanto; IA Clínica/Assistente IA/sugestão de mensagem
  no CRM respondem 503 até você preencher com uma chave da sua própria conta Anthropic.
- `DAILY_API_KEY` — deixe em branco por enquanto; criar sala de Teleconsulta responde 503 até você
  preencher com uma chave da sua própria conta Daily.co.
- `ASAAS_API_KEY` — deixe em branco por enquanto; sub-conta/assinatura/cobrança via Asaas respondem
  503 até você preencher com uma chave da sua própria conta Asaas.
- `ADMIN_TOKEN` — gere um valor aleatório (`openssl rand -hex 24` ou similar); protege o console do
  administrador (`/admin/*`, verificação de CRP e Ofertas). Sem isso, `/admin/*` responde 503.

## 3. Instalar dependências

```
npm install
```

## 4. Criar as tabelas e ativar RLS

```
npm run prisma:push --workspace apps/api
npm run prisma:rls --workspace apps/api
```

O segundo comando aplica `apps/api/prisma/rls.sql` — precisa rodar de novo toda vez que
`prisma db push` recriar as tabelas do zero.

## 5. Rodar

Em dois terminais:

```
npm run dev:api    # http://localhost:3333
npm run dev:web    # http://localhost:3000
```

## 6. Testar o fluxo

1. Abra `http://localhost:3000/signup`, crie uma clínica (nome, slug, seu e-mail/senha).
2. Você cai direto no dashboard, autenticado como `PSICOLOGO_TITULAR`.
3. Adicione um paciente pelo formulário — isso prova que a query passou pela RLS scoped ao
   seu tenant (`PrismaService.forCurrentTenant()` em `apps/api/src/patients`).
4. Em **Agenda**, marque uma sessão para esse paciente e mude o status (agendado → confirmado →
   concluído).
5. Em **Financeiro**, lance uma cobrança para o mesmo paciente e marque como paga — é registro
   manual, nenhum gateway está ligado ainda (ver §03 do doc de arquitetura).
6. Em **Site profissional**, preencha bio/especialidades, marque "Publicar página" e abra
   `http://localhost:3000/p/<seu-slug>` — é a única rota pública de todo o app, sem login.
7. Em **Testes**, aplique o GAD-7 no mesmo paciente — o formulário mostra o aviso de que é
   tradução de trabalho e instrumento de rastreio, calcula a pontuação e guarda no histórico.
8. Em **Cursos**, baixe o slide/exercícios/avaliação/roteiro de um módulo e clique "Marcar
   concluído" — complete todos os módulos de um curso pra ver um Certificado aparecer sozinho em
   **Certificados**, com link público de verificação.
9. Em **Biblioteca**, confira as referências regulatórias (LGPD, Resoluções CFP).
10. Em **Supervisão**, adicione um supervisor (formulário aparece automaticamente se não houver
    nenhum) e agende uma sessão.
11. Abra `http://localhost:3000/loja` sem estar logado — é a vitrine pública do Marketplace.
12. Em **CRM**, adicione um lead e clique "Converter em paciente" — confirme que ele aparece em
    Pacientes com o e-mail/telefone certo.
13. Em **Marketing**, escreva um post com "resultado garantido" e clique "Verificar" antes de
    salvar — o checklist ético deve apontar o alerta.
14. Em **Comunidade**, publique um post com uma clínica, depois entre com outra clínica e
    responda — Comunidade é o único espaço cross-tenant do sistema, então a segunda clínica deve
    conseguir ver e responder ao post da primeira (isso é esperado, não é vazamento de dado).
15. Crie uma segunda clínica em outro slug e confirme que pacientes/agenda/financeiro/testes/
    cursos/leads/posts de marketing da primeira **não** aparecem (diferente de Comunidade, que é
    intencionalmente compartilhada).
16. Abra um paciente (clique no nome em Pacientes) — nessa página dá pra adicionar entrada de
    prontuário, clicar "Resumir com IA" (503 sem `ANTHROPIC_API_KEY`), criar sala de teleconsulta
    num agendamento (503 sem `DAILY_API_KEY`), e ativar o Aplicativo do Paciente (exige e-mail
    cadastrado).
17. Depois de ativar o portal, abra `http://localhost:3000/paciente/login` **em aba anônima ou
    depois de sair da conta de equipe** — é login totalmente separado (slug + e-mail + senha do
    paciente, não da equipe). O paciente só vê as próprias sessões, pode confirmar presença e (se
    houver sala de teleconsulta) precisa consentir antes do link aparecer — exigência da Resolução
    CFP nº 11/2018.
18. Em **Assistente IA**, faça uma pergunta geral — mesma resposta 503 clara até configurar
    `ANTHROPIC_API_KEY`.
19. Em **Financeiro**, tente "Conectar sub-conta Asaas" e depois "Cobrar via Asaas" numa cobrança —
    mesma resposta 503 clara até configurar `ASAAS_API_KEY`. Com a chave configurada, conectar a
    sub-conta grava `payoutProvider`/`payoutAccountId` no tenant e o botão de cobrar passa a criar
    um pagamento real com split pro psicólogo (exige CPF/CNPJ do paciente cadastrado).
20. No dashboard principal (**Pacientes**), como `PSICOLOGO_TITULAR` sem CRP verificado, envie o
    número do CRP + um documento (PDF/JPG/PNG) — isso abre uma fila de aprovação manual, não é
    verificação automática contra o e-Psi/CFP (ver seção de aprofundamento abaixo).
21. Abra `http://localhost:3000/admin/login` **numa aba separada** (é um terceiro sistema de auth,
    igual ao Aplicativo do Paciente — token único do `ADMIN_TOKEN`, não JWT de tenant) e entre com o
    valor de `ADMIN_TOKEN` do seu `.env`. Em **Verificação de CRP**, aprove ou rejeite o envio do
    passo 20 — aprovar libera `crpStatus=VERIFICADO` pro psicólogo; rejeitar exige um motivo, que
    aparece de volta pro psicólogo no banner de pendências.
22. Em **Ofertas** (dentro do console admin), cadastre uma oferta (título, descrição, link externo)
    — ela aparece imediatamente em **Ofertas** no dashboard de qualquer tenant.
23. Em **Assinatura**, veja os dois planos (R$150/mês, R$1.500/ano) e tente assinar via Stripe e via
    Asaas — ambos devem responder 503 claro até `STRIPE_PRICE_MONTHLY`/`STRIPE_PRICE_YEARLY` ou
    `ASAAS_API_KEY` estarem configurados.
24. Em **CRM**, adicione um lead e clique "Sugerir mensagem (IA)" — mesma resposta 503 clara até
    configurar `ANTHROPIC_API_KEY`; com a chave configurada, mostra um rascunho de mensagem de
    retomada de contato que o psicólogo revisa antes de enviar manualmente.
25. Em `http://localhost:3000/admin/cursos`, defina um preço pra "Formação em Neurociência" e
    cadastre um link do YouTube pra um módulo do bloco gratuito da Escola de Marketing — confira
    que o vídeo aparece embutido em **Cursos** do lado do assinante, acima dos materiais de apoio.
26. Em `http://localhost:3000/admin/documentos`, envie um modelo de documento (PDF/DOC/DOCX/XLSX)
    — confira que ele aparece em **Documentos** no dashboard de qualquer tenant `CLINICA` e que o
    download funciona.
27. Abra `http://localhost:3000/loja` **sem estar logado**, clique "Comprar" no curso com preço
    definido e preencha o formulário (nome, slug, e-mail, senha, CPF/CNPJ) — isso cria uma conta
    `ESTUDANTE` e tenta iniciar o pagamento (503 claro sem `ASAAS_API_KEY`/`STRIPE_PRICE_*`). Entre
    com essa conta em `/login` — o menu mostra só Cursos/Certificados/Ofertas, e uma tentativa
    direta de `GET /patients` com o token dela retorna 403 ("Contas de estudante têm acesso apenas
    ao ambiente de estudos").

## Decisões de arquitetura já resolvidas (v2 do documento)

Ver §03 e §08 do documento de arquitetura. Resumo:

- **Testes psicológicos**: começa só com escalas de domínio público — sem depender de licenciar
  catálogo fechado (Vetor/Casa do Psicólogo/Hogrefe fica para depois). Do trio citado no
  documento (GAD-7, IPIP, O*NET/RIASEC), só o **GAD-7** foi implementado: é o único cujo texto de
  item eu conseguia reproduzir com confiança de fonte pública verificável. IPIP e O*NET têm
  dezenas de itens com regra de pontuação/inversão por fator — fabricar isso de memória arriscava
  entregar um instrumento com pontuação clinicamente errada. Ver o comentário em
  `apps/api/src/psych-tests/catalog/index.ts` para o passo a passo de como adicionar os dois
  depois de copiar o texto oficial da fonte.
- **Marketplace**: venda avulsa dos cursos para quem não assina a plataforma completa
  (principalmente estudante de psicologia — pode estudar, não pode atender).
- **Pagamento**: Asaas para os dois fluxos (assinatura da plataforma + repasse ao psicólogo via
  sub-conta), Stripe só como opção secundária pro Marketplace com comprador internacional. Asaas
  foi implementado (`apps/api/src/asaas`) — ver seção de aprofundamento abaixo para o que cobre e
  o aviso de honestidade sobre não ter sido testado contra sandbox real.
- **Vídeo**: Daily.co (Teleconsulta) — implementado no F4 (`apps/api/src/teleconsulta`), stub 503
  sem `DAILY_API_KEY`.

O schema Prisma já reflete essas decisões: `Tenant.kind` (`CLINICA`/`ESTUDANTE`),
`User.crpNumber`/`crpStatus` (portão que libera módulo clínico), `CourseEnrollment` (matrícula via
assinatura ou Marketplace) e `Tenant.payoutProvider`/`payoutAccountId` (sub-conta do Financeiro).
Nenhum desses campos tem service/controller ainda — só o modelo de dados está pronto.

Ainda em aberto (§08): processo de verificação de CRP (consulta automática ao CFP vs. upload
manual) e modelo de comissão do Marketplace.

Antes de produção com dado de saúde real, trocar o auth caseiro (JWT + bcrypt) por um provedor
gerenciado (Clerk/Auth0) — o scaffold atual é suficiente para validar modelo de dados e RLS, não
para produção.

## F1, F2, F3 e F4 estão completos

Todos os módulos seguem o mesmo padrão do `patients` original: tenant-scoped via
`PrismaService.forCurrentTenant()`, contexto vindo sempre de `getRequestContext()`, nunca de input
do cliente. Dois catálogos (testes e cursos) são dado estático versionado em código, não tabela —
só *respostas*/*progresso* de usuário viram linha de tenant com RLS. Ver `apps/api/src/*/catalog/`
para o padrão.

**Cursos** lê as pastas `Formacao-Neurociencia/` e `Escola-Marketing-Psicologos/` em tempo real
(`apps/api/src/courses/catalog/scan.ts`) — o título de cada módulo vem do `const NOME = "..."`
dentro do `build-modulo.js` de cada pasta, não do nome do arquivo (que é ASCII-safe, sem acento).
Achado ao testar: **`Modulo-4.1-Ansiedade` da Formação em Neurociência não tem `build-modulo.js`**
— os 4 arquivos de conteúdo existem, mas sem o script o scanner não consegue extrair
título/número e pula o módulo (fail-closed, de propósito — antes invisível no catálogo do que
com título fabricado). Resultado: 46 dos 47 módulos aparecem em Cursos até esse arquivo ser
restaurado ou recriado.

Notas importantes sobre decisões tomadas:
- O portão de CRP (`User.crpStatus`) **não está sendo checado** em nenhum guard ainda — é
  proposital, o processo de verificação em si segue em aberto (§08 do doc de arquitetura).
- `tenants` e `certificates` não têm RLS — isolamento depende do código do service sempre filtrar
  por `tenantId`/`userId` do contexto, nunca de input do cliente (ver `profile.service.ts` e
  `certificates.service.ts`).
- **Acesso a Cursos**: bloco gratuito (Bloco 2 da Escola de Marketing) libera pra qualquer
  autenticado; tenant `CLINICA` tem acesso assumido como incluso na assinatura da plataforma
  (decisão ainda não confirmada com você); tenant `ESTUDANTE` só acessa com `CourseEnrollment`
  via Marketplace.
- **Marketplace/enroll é matrícula manual/gratuita** por enquanto — mesmo estágio que o Stripe em
  `billing`, sem gateway real ligado. `priceCents` do catálogo está `null` de propósito: preço
  ainda não foi decidido (§08), não inventei valor.
- IPIP e O*NET/RIASEC (Aplicação de Testes) e conteúdo além das 4 regulamentações já citadas
  (Biblioteca) não foram implementados de propósito — risco de fabricar conteúdo técnico de
  memória sem fonte verificável.
- Supervisão hoje só modela supervisor dentro do mesmo tenant (cadastrado via `POST /users`,
  restrito a `PSICOLOGO_TITULAR`) — supervisor externo cross-tenant fica para depois.
- **CRM**: `Lead.convertToPatient` usa uma heurística simples (contato com "@" vira e-mail do
  paciente, senão telefone) — não há como editar o paciente depois pela UI ainda, então uma
  heurística errada fica manual até um endpoint de edição de paciente existir.
- **Marketing**: `checkCompliance` é um checklist básico por palavra-chave (promessa de cura,
  resultado garantido), ligado só ao que a Resolução CFP nº 03/2007 + NT 01/2022 veda de forma
  inequívoca — não é revisão jurídica completa, não tenta capturar comparação/depoimento/contexto.
  Publicação de verdade continua fora daqui: é o InstaPostPro (pasta-irmã) que resolve isso.
- **Comunidade** é o único espaço cross-tenant do sistema de propósito — `community_posts`/
  `community_replies` não têm RLS. Isso quase quebrou na primeira tentativa: tentar exibir o autor
  via `include` ao vivo cruza pra `users`/`tenants` (que TÊM RLS), e uma conexão sem
  `app.tenant_id` setado (o caso normal aqui) faz o Prisma falhar com "Field author is required...
  got null". Corrigido guardando `authorName`/`tenantName` como snapshot de texto no momento da
  criação (quando o autor está no próprio contexto autenticado dele), nunca via join depois. Ver
  comentário em `CommunityPost` no `schema.prisma`.
- **IA Clínica/Assistente IA** (`apps/api/src/ai`) não é um módulo à parte — é uma camada chamada
  de dentro de Prontuário (resumir evolução), Marketing (sugerir reescrita compliant) e um
  endpoint genérico de perguntas administrativas que **nunca** recebe dado de paciente. Mesmo
  estágio que Stripe: 503 sem `ANTHROPIC_API_KEY`, nunca simula uma resposta fabricada.
- **Teleconsulta** (`apps/api/src/teleconsulta`) cria a sala via API do Daily.co e grava
  `videoRoomUrl`/`videoRoomName` no `Appointment`. Sem `DAILY_API_KEY`, responde 503.
- **Aplicativo do Paciente** é uma identidade de login inteiramente separada da equipe — `Patient`
  ganhou `passwordHash`/`portalEnabled`, e existe um JWT com formato próprio
  (`{ sub: patientId, tenantId, kind: 'PACIENTE' }`, sem `role`) verificado por um middleware
  próprio (`PatientAuthMiddleware`) que abre um `AsyncLocalStorage` separado
  (`patientStorage`/`getPatientContext()`) — nunca o mesmo contexto da equipe. Testado nos dois
  sentidos: um token de equipe é rejeitado em `/patient-portal/*` ("Token não é de paciente"), e um
  token de paciente é rejeitado em rotas de equipe (403 do `RolesGuard`, já que o payload não tem
  `role`). A sala de teleconsulta só aparece pro paciente depois dele registrar consentimento
  (`consentAt`) — mas como a URL fica escondida até esse momento, a listagem de agendamentos expõe
  um `hasVideoRoom: boolean` separado, senão o paciente não teria como saber que precisa consentir.

## Bugs reais encontrados e corrigidos ao testar contra Postgres de verdade

Nenhum destes apareceria nos smoke-tests anteriores (que nunca tinham um banco real conectado).
Corrigidos nesta sessão, nesta ordem de gravidade:

1. **Crítico — isolamento entre tenants falhava de verdade.** Causa: `DATABASE_URL` apontava para
   a role `postgres` (superusuário) durante o setup inicial. Uma segunda clínica via os pacientes
   da primeira. Corrigido criando a role `portal_app` (sem `SUPERUSER`/`BYPASSRLS`) — ver seção 1.
   Confirmado com teste direto em SQL (`set_config('app.tenant_id', ...)` alternando entre dois
   tenants) antes e depois da correção.
2. **`prisma/rls.sql` comparava a coluna errada.** As policies usavam `tenant_id` (snake_case),
   mas o Prisma cria a coluna preservando o nome do campo do schema — `"tenantId"` (camelCase,
   precisa de aspas). `prisma db execute` falhava com "coluna tenant_id não existe" antes de eu
   perceber. Só os nomes de *tabela* passaram por `@@map`, os campos não.
3. **Tipo incompatível na policy.** `"tenantId"` é `text` (Prisma mapeia `String @id` assim, não
   para `uuid` nativo do Postgres), mas a policy comparava contra `current_setting(...)::uuid`.
   Removido o cast — agora compara `text = text`.
4. **`COURSES_ROOT=""` não caía no valor padrão.** O código usava `config.get(...) ?? default` —
   `??` só cai no fallback para `null`/`undefined`, não para string vazia. Corrigido para `||`. Sem
   isso, Cursos aparecia com "nenhum módulo encontrado" em todos os blocos.
5. **API sem `Cache-Control: no-store`.** Toda resposta é específica de um tenant (identificado
   pelo header `Authorization`, não pela URL), mas nenhuma resposta carregava `Cache-Control`, e
   havia `ETag` automático do Express sem `Vary: Authorization`. Isso é exatamente a receita para
   cache do navegador vazar dado de um tenant para outro no mesmo perfil/máquina — foi o que
   causou o sintoma inicial do bug #1 aparecer tão facilmente. Corrigido com middleware global em
   `main.ts` (`Cache-Control: no-store` em toda resposta, `etag` desligado no Express).
6. **Data de vencimento no Financeiro aparecia um dia antes.** `new Date("2026-07-20")` é meia-noite
   UTC; `toLocaleDateString('pt-BR')` sem fuso explícito converte para o fuso local do navegador,
   que pode cair no dia anterior. Corrigido passando `{ timeZone: 'UTC' }` — só necessário para
   datas puras (dueDate), não para horários de sessão (Agenda), que são momentos reais escolhidos
   pelo usuário.
7. **Middleware do Aplicativo do Paciente não aplicava a rotas protegidas.** `forRoutes('patient-
   portal/(.*)')` não casava com nada — o padrão de wildcard do NestJS para middleware é `*`
   (estilo Express), não uma regex entre parênteses. `/patient-portal/login` funcionava (rota
   literal, sem wildcard envolvido) mas `/me` e `/appointments` batiam em "PatientRequestContext
   ausente" porque o `PatientAuthMiddleware` nunca rodava. Corrigido trocando para
   `'patient-portal/*'` (e o mesmo padrão na exclusão em `auth.module.ts`).

Também observado, mas **não** é bug de aplicação — é ruído do modo dev: o Next.js Fast Refresh
ocasionalmente lança um aviso de "setState durante render" e recarrega a página sozinho; o
`nest start --watch` às vezes reinicia em rajadas curtas. Nenhum dos dois acontece rodando o build
de produção (`node dist/main.js`, sem `--watch`), que foi o que os smoke-tests anteriores usaram.

## Aprofundamento: gateway de pagamento nacional (Asaas)

Depois de F0-F4 completos, a peça mais concreta que ainda faltava do documento de arquitetura era o
Asaas (§03/§07) — até então só uma decisão registrada, nenhuma linha de código. Implementado em
`apps/api/src/asaas` (`AsaasService`/`AsaasController`), no mesmo padrão dos outros serviços
externos (Stripe/Anthropic/Daily.co): sem `ASAAS_API_KEY`, todos os endpoints respondem 503 com
mensagem clara. Cobre as três pontas do desenho original:

1. **Sub-conta do tenant** (`POST /asaas/payout-account`) — cria a sub-conta do psicólogo no Asaas
   e grava `walletId` em `Tenant.payoutAccountId`. Formulário em **Financeiro**.
2. **Assinatura da plataforma** (`POST /billing/checkout-asaas`) — cliente + assinatura recorrente
   Asaas para o tenant pagar o Portal do Psi, grava `asaasCustomerId`/`asaasSubscriptionId` em
   `Subscription`. Ganhou página própria (**Assinatura**) na rodada de aprofundamento seguinte, ver
   abaixo.
3. **Cobrança do paciente com split** (`POST /invoices/:id/charge`) — cria um pagamento Asaas com
   `split` roteando um percentual (`ASAAS_PLATFORM_FEE_PERCENT`, default 0) pro `walletId` da
   sub-conta do tenant, grava `asaasPaymentId`/`paymentLink` na `Invoice`. Botão "Cobrar via Asaas"
   em **Financeiro**, só habilitado se a sub-conta já estiver conectada. Exige CPF/CNPJ do paciente
   cadastrado — campo novo (`Patient.cpfCnpj`), coletável no formulário de novo paciente do
   dashboard.
4. **Webhook** (`POST /asaas/webhook`, rota pública) — sincroniza `Invoice.status` e
   `Subscription.status` a partir dos eventos de pagamento do Asaas, autenticado pelo header
   `asaas-access-token` (não por JWT) contra `ASAAS_WEBHOOK_TOKEN`.

**Aviso de honestidade**: não há conta sandbox real do Asaas disponível para testar contra a API de
verdade. Os nomes de endpoint/campo (`/accounts`, `/customers`, `/subscriptions`, `/payments`, o
formato do array `split`, o header `access_token`) seguem a documentação pública do Asaas, mas
devem ser conferidos contra https://docs.asaas.com antes de ligar isso em produção — a API pode
exigir campos adicionais (ex: endereço completo na criação de sub-conta) que só apareceriam como
erro 400 vindo do Asaas em tempo real. O que foi de fato testado ao vivo nesta sessão: o build
completo (tsc + nest build + next build) sem erros, e o caminho 503 fim-a-fim através do
navegador — criar clínica, cadastrar paciente com CPF, tentar conectar sub-conta e tentar cobrar
uma fatura, ambos retornando a mensagem de erro esperada pedindo `ASAAS_API_KEY`.

## Aprofundamento: preço da assinatura, verificação de CRP, console do admin, Ofertas, IA no CRM

Continuação direta da rodada do Asaas, agora respondendo decisões que antes estavam em aberto:
preço da assinatura (R$150/mês ou R$1.500/ano, confirmado pelo dono do projeto), o modelo de
verificação de CRP (documento enviado pelo psicólogo + aprovação manual, com notificação de
pendência — não consulta automática ao e-Psi/CFP, que exigiria integração com uma API pública cuja
existência e contrato não dava pra confirmar com confiança), e conteúdo promocional editável pelo
administrador (novos treinamentos, produtos externos como venda de livro ou construção de site).

- **Planos** (`apps/api/src/billing/plans.ts`): única fonte da verdade pro preço — nunca aceito do
  cliente (`CreateCheckoutDto`/`CreatePlatformSubscriptionDto` recebem só `plan: 'MONTHLY'|'YEARLY'`,
  nunca um valor numérico). Página **Assinatura** no dashboard mostra os dois planos, status atual
  da assinatura (`GET /billing/subscription`) e os dois botões de checkout (Stripe exige
  `STRIPE_PRICE_MONTHLY`/`STRIPE_PRICE_YEARLY` — IDs de Price reais do seu painel Stripe, não
  fabricáveis; Asaas usa `AsaasService.createPlatformSubscription` já existente).
- **Verificação de CRP**: `Patient`-like fluxo em `User` — `POST /users/me/crp` (multipart, Multer,
  PDF/JPG/PNG até 10MB, salvo em `apps/api/uploads/crp/` fora de qualquer pasta pública) grava
  `crpDocumentPath` e põe `crpStatus=EM_ANALISE`. Banner de pendência no dashboard principal mostra
  o motivo se rejeitado (`crpRejectionReason`) e deixa reenviar. **A checagem de `crpStatus` ainda
  não bloqueia nenhuma rota clínica** — só o fluxo de envio/aprovação existe; gatear acesso de
  verdade é uma decisão separada (bloquearia todo tenant de teste já existente).
- **Console do administrador** (`apps/api/src/admin`, `/admin/*` no frontend): terceiro sistema de
  auth do projeto (depois de staff-JWT e paciente-JWT) — um segredo único (`ADMIN_TOKEN`) enviado no
  header `x-admin-token` via `AdminTokenGuard`, sem tabela de usuário-admin própria. Suficiente pra
  operação atual (uma pessoa/equipe pequena); trocar por login de admin de verdade se a equipe que
  opera a plataforma crescer. Cobre fila de CRP pendente (aprovar/rejeitar/baixar documento) e CRUD
  de Ofertas.
- **Ofertas** (`Offer`, sem RLS de propósito — é conteúdo global por natureza, não porque falta
  implementar): CRUD pelo admin, leitura pública-pra-quem-está-logado em `GET /offers`, exibida numa
  página própria (**Ofertas**) em todo dashboard de tenant.
- **IA no CRM**: `AiService.suggestLeadFollowUp` gera um rascunho de mensagem de retomada de contato
  pra um lead — mesmo estágio 503 dos outros usos de IA, e o rascunho nunca é enviado sozinho, só
  aparece pro psicólogo revisar.

### Dois bugs reais encontrados testando esta rodada ao vivo

1. **Crítico — todas as exclusões de middleware com wildcard `*` quebraram silenciosamente.**
   Causa: instalar `@types/multer` (pra tipar o upload do CRP) fez o `npm install` re-resolver o
   range `^10.4.0` de `@nestjs/core` pra uma patch mais nova (10.4.22), que trouxe uma versão
   diferente do `path-to-regexp` interno usado especificamente pela lógica de `.exclude(...)` de
   middleware do Nest. Nessa versão, `pathToRegexp('/admin/*')` trata o `*` como caractere literal
   (`/^\/admin\/\*$/`) em vez de wildcard — confirmado isolando a chamada fora do Nest. Isso
   silenciosamente quebrou não só a exclusão nova (`admin/*`) mas também a exclusão já existente e
   testada do F4 (`patient-portal/*`), fazendo o login do Aplicativo do Paciente voltar a exigir JWT
   de equipe. **Corrigido** trocando `'patient-portal/*'`/`'admin/*'` por `'patient-portal/:rest*'`/
   `'admin/:rest*'` em `auth.module.ts` — sintaxe de parâmetro nomeado com quantificador `*`, que essa
   versão do `path-to-regexp` interpreta corretamente (confirmado via `pathToRegexp(...).test(...)`
   antes e depois da mudança). **Lição**: uma dependência com range de versão em aberto (`^10.4.0`)
   pode mudar comportamento de baixo nível mesmo sem nenhuma alteração de código próprio — sempre
   reteste os fluxos de auth existentes (não só o novo) depois de qualquer `npm install`.
2. **Console do admin sempre voltava listas vazias.** Causa: `AdminService` usava o `PrismaService`
   cru (sem `SET app.tenant_id`) pra consultar `users`, que tem `FORCE ROW LEVEL SECURITY` — sem
   contexto de tenant setado, `current_setting('app.tenant_id', true)` é `NULL` e a policy nega toda
   linha, então `/admin/crp/pending` sempre voltava `[]` mesmo com submissões reais no banco.
   **Corrigido** adicionando `PrismaService.forSystem()` (seta um valor sentinela `'__system__'`,
   que nunca colide com um `tenantId` real por serem `uuid`) e uma cláusula `OR current_setting(...)
   = '__system__'` nas policies de `users`, `invoices` e `subscriptions` em `rls.sql`. **Isso também
   revelou que o webhook do Asaas/Stripe (escrito nas rodadas anteriores com um comentário "bypassa
   RLS de propósito") nunca funcionou de verdade** — `invoices`/`subscriptions` têm RLS forçado, o
   client cru nunca bypassa nada, e essas atualizações de status por webhook sempre afetavam zero
   linhas silenciosamente. Corrigido no mesmo commit, trocando pra `forSystem()` nos dois lugares.
   Nenhum smoke-test anterior pegou isso porque nunca havia um webhook real disparando (sem conta
   Stripe/Asaas configurada) — só apareceu ao testar o admin, que tem o mesmo padrão de acesso.

## Aprofundamento: modelo de acesso ESTUDANTE, vídeo-aulas, documentos, Marketplace pago

Respondendo diretamente a uma clarificação do modelo de negócio: assinantes (tenant `CLINICA`) têm
acesso incluso a Cursos, escalas (Testes) e Documentos sem custo adicional; o público externo
(tenant `ESTUDANTE`) paga por curso avulso no Marketplace e só acessa o ambiente de estudos —
decisão que já estava desenhada no schema desde o F0 (`TenantKind`), mas **nunca tinha sido
aplicada em nenhum guard**. Esta rodada fecha esse gap e adiciona três peças novas.

- **`EstudanteAccessGuard`** (`apps/api/src/common/estudante-access.guard.ts`, registrado como
  `APP_GUARD` global): allowlist, não blocklist — tenant `ESTUDANTE` só passa em `/me`, `/courses`,
  `/certificates`, `/marketplace`, `/offers`; qualquer outra rota (Pacientes, Agenda, Financeiro,
  Testes, Documentos, etc.) responde 403 com mensagem clara. `tenantKind` foi adicionado ao payload
  do JWT (`AuthMiddleware` → `RequestContext`) pra o guard decidir sem round-trip ao banco.
- **Cadastro de estudante + Marketplace pago**: `POST /marketplace/purchase` (público) cria a conta
  `ESTUDANTE` e inicia uma cobrança avulsa real — Stripe (`mode: 'payment'`, preço inline via
  `price_data`, não um Price fixo) ou Asaas (`AsaasService.createOneTimePayment`, sem split, tudo
  pra conta da plataforma). O `CourseEnrollment` só é criado quando o webhook confirma o pagamento
  (Stripe `checkout.session.completed` ou Asaas `payment.externalReference` no formato
  `enrollment:<tenantId>:<courseSlug>`) — nunca direto no `purchase()`, mesmo padrão do Financeiro.
  `POST /marketplace/enroll` (autenticado) cobre o mesmo fluxo pra quem compra um segundo curso.
  Preço por curso é admin-editável (`CoursePrice`, `/admin/course-prices`) — sem preço, a compra é
  recusada com mensagem clara em vez de usar um valor inventado.
- **Vídeo-aula por módulo**: `CourseModuleVideo` (admin-editável em `/admin/cursos`, link do
  YouTube não-listado) mesclado no catálogo de Cursos e embutido como `<iframe>` acima dos
  materiais de apoio pra download — exatamente a ordem pedida ("aulas gravadas" com "materiais de
  apoio abaixo"). Nenhum vídeo existe nas pastas dos cursos hoje; a infraestrutura está pronta,
  populá-la é trabalho do administrador.
- **Modelos de documento** (`DocumentTemplate`, upload pelo admin em `/admin/documentos`, Multer,
  mesmo padrão do upload de CRP): página **Documentos** no dashboard do assinante, visível só pra
  `CLINICA` (bloqueada pra `ESTUDANTE` pelo `EstudanteAccessGuard`, nem precisou de checagem
  própria). Conteúdo vem do admin, nunca fabricado por mim — mesma disciplina do catálogo de
  Biblioteca/Testes.

Testado ao vivo: compra anônima em `/loja` (cria conta `ESTUDANTE`, tenta pagar via Asaas, recebe o
503 esperado), login como esse estudante mostra nav reduzido (Cursos/Certificados/Ofertas) e todos
os módulos pagos aparecem "bloqueado" (só o bloco gratuito da Escola de Marketing libera); tentativa
direta de `GET /patients`/`GET /document-templates` com o token desse estudante retorna 403 com a
mensagem do guard. Cadastro de vídeo no admin aparece corretamente embutido na página Cursos do
lado do assinante (`<iframe src="https://www.youtube.com/embed/...">`, confirmado via DOM). Upload
de modelo de documento aparece na página Documentos do assinante e o download funciona
(`GET /document-templates/:id/download` → 200).

## O que falta do F4

**Aplicação de Testes — catálogo licenciado** continua deliberadamente fora de escopo: exige
acordo comercial com editoras (Vetor, Casa do Psicólogo, Hogrefe) antes de prometer esse módulo a
qualquer assinante — ver §07/§08 do doc de arquitetura. Não fabricado, não fica pra "próxima vez
rápida" — é bloqueio jurídico real, não técnico.

Com F0-F4 completos, todo o roadmap original de 5 fases do documento de arquitetura está
implementado. Trabalho futuro daqui em diante é aprofundar o que já existe (mais casos de uso de
IA, catálogo licenciado de testes, testar o Asaas/Stripe contra conta sandbox real, popular
vídeo-aulas e modelos de documento de verdade) em vez de novas fases.

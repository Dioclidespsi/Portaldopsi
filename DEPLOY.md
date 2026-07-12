# Deploy do Portal do Psi — rota gratuita (Vercel + Render/Railway + Neon)

Guia pra colocar o Portal do Psi no ar pros primeiros testes, sem custo, usando o
domínio que você já tem na Hostinger só pra DNS (a aplicação em si roda em outros
serviços — a Hostinger compartilhada não suporta PostgreSQL, ver conversa).

Contas que você precisa criar (eu não crio essas contas nem entro com suas
credenciais — só te digo exatamente o que preencher em cada uma):

- **GitHub** (se ainda não tiver) — onde o código fica hospedado pra Vercel/Render
  puxarem o deploy automaticamente.
- **Neon** (neon.tech) — Postgres gerenciado, camada gratuita.
- **Render** (render.com) **ou** **Railway** (railway.app) — hospeda a API NestJS.
- **Vercel** (vercel.com) — hospeda o frontend Next.js.

## 1. Subir o código pro GitHub

```
git remote add origin https://github.com/SEU-USUARIO/portal-do-psi.git
git branch -M main
git push -u origin main
```

(Crie o repositório vazio no GitHub antes — não dou `git push` sozinho sem você
confirmar, então rode esses comandos você mesmo ou me avise quando o repositório
existir que eu ajudo a partir daí.)

## 2. Banco de dados (Neon)

1. Crie um projeto na Neon (região São Paulo/`sa-east-1` se disponível, ou a mais
   próxima).
2. Copie a **connection string** que a Neon te dá (formato
   `postgresql://usuario:senha@host/dbname?sslmode=require`).
3. **Antes de rodar a aplicação contra ela**, aplique o schema e o RLS:
   ```
   cd apps/api
   DATABASE_URL="<connection string da Neon>" npx prisma db push
   DATABASE_URL="<connection string da Neon>" npx prisma db execute --file prisma/rls.sql --schema prisma/schema.prisma
   ```
4. **Verificação obrigatória antes de considerar isso pronto**: confirme que o
   isolamento entre tenants funciona de verdade na Neon, do mesmo jeito que
   verificamos no Postgres local — crie duas contas de teste (dois slugs
   diferentes) contra o banco da Neon e confirme que uma não vê os pacientes da
   outra. A role da Neon não tem superusuário (Neon não permite isso por padrão),
   mas nunca testamos RLS especificamente contra a Neon nesta sessão — não
   assuma que está OK sem essa checagem, foi exatamente esse tipo de suposição
   que causou o bug crítico de vazamento entre tenants na primeira rodada deste
   projeto (ver README, seção "Bugs reais encontrados").

## 3. API (Render ou Railway)

Ambos funcionam; Render tem plano gratuito mais direto pra um serviço web
persistente, Railway é mais rápido de configurar. Passos genéricos:

1. Crie um novo serviço "Web Service" conectado ao repositório do GitHub.
2. **Root directory**: raiz do repositório (não `apps/api`) — o build usa os
   scripts do workspace.
3. **Build command**: `npm install && npm run build:api`
4. **Start command**: `npm run start:api`
5. Variáveis de ambiente a configurar no painel do serviço (nunca no código):
   - `DATABASE_URL` — a connection string da Neon.
   - `JWT_SECRET` — gere um valor novo (`openssl rand -hex 32`), não reaproveite o
     do ambiente local.
   - `PORT` — geralmente o Render/Railway já injeta essa variável sozinho; não
     precisa definir manualmente.
   - `ADMIN_TOKEN` — gere um valor novo, diferente do local.
   - `COURSES_ROOT` — **deixe em branco**. O conteúdo dos cursos (47+27 módulos,
     ~42MB) já está empacotado dentro do repositório em
     `apps/api/course-content/`, e `CoursesService` detecta sozinho se deve usar
     essa pasta (deploy) ou as pastas-irmãs de desenvolvimento local — não
     precisa configurar nada.
   - `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PRICE_MONTHLY`,
     `STRIPE_PRICE_YEARLY`, `ANTHROPIC_API_KEY`, `ANTHROPIC_MODEL`,
     `DAILY_API_KEY`, `ASAAS_API_KEY`, `ASAAS_BASE_URL`, `ASAAS_WEBHOOK_TOKEN`,
     `ASAAS_PLATFORM_FEE_PERCENT` — preencha os que já tiver; os que faltarem
     continuam respondendo 503 (comportamento esperado, não erro).
6. Anote a URL pública que o serviço ganha (ex:
   `https://portal-do-psi-api.onrender.com`) — vai precisar dela no passo 4.

## 4. Frontend (Vercel)

1. Importe o mesmo repositório do GitHub na Vercel.
2. **Root Directory**: `apps/web` (a Vercel tem suporte nativo a monorepo, é só
   apontar essa pasta nas configurações do projeto).
3. Framework preset: Next.js (detecta sozinho).
4. Variável de ambiente:
   - `NEXT_PUBLIC_API_URL` — a URL da API do passo 3 (ex:
     `https://portal-do-psi-api.onrender.com`).
5. Deploy. A Vercel te dá uma URL tipo `portal-do-psi.vercel.app` pra testar antes
   de ligar o domínio de verdade.

## 5. Domínio (DNS na Hostinger)

No painel de DNS da Hostinger (hPanel → Domínios → DNS / Zona DNS):

- Pro frontend (domínio raiz e/ou `www`): siga as instruções de "Add Domain" da
  Vercel — normalmente um registro `A` apontando pro IP deles, ou `CNAME` de
  `www` pro domínio `cname.vercel-dns.com`.
- Pra API, um subdomínio dedicado (ex: `api.seudominio.com.br`): registro
  `CNAME` apontando pra URL que o Render/Railway te deu.
- Depois de configurar, atualize `NEXT_PUBLIC_API_URL` na Vercel pro subdomínio
  novo (`https://api.seudominio.com.br`) em vez da URL genérica do Render.

## O que falta decidir antes do primeiro teste real

- **Verificação de RLS na Neon** (passo 2.4) — obrigatória, ainda não feita.
- Todas as chaves de serviço externo (Stripe/Anthropic/Daily.co/Asaas) seguem
  precisando ser preenchidas por você pra sair do modo 503, exatamente como em
  desenvolvimento local.

## Limitação aceita da rota gratuita: armazenamento de upload não é permanente

Documentos enviados pelo admin (modelos de documento, comprovantes de CRP) e
qualquer arquivo com upload ficam em `apps/api/uploads/` — disco local do
próprio processo. O plano gratuito do Render **não tem disco persistente**:
esses arquivos somem no próximo deploy ou reinício do serviço. Pra "primeiros
testes" isso é aceitável (só reenviar o arquivo de teste se sumir); antes de
qualquer uso real com documento de CRP de verdade, essa parte precisa de disco
persistente pago (Render/Railway oferecem) ou armazenamento externo (S3/R2) —
fica pra quando migrar pro servidor particular, como você já sinalizou.

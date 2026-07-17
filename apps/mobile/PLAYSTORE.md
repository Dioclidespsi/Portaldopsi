# Publicar na Google Play Store

Checklist de tudo que falta pra colocar o Portal do Psi na Play Store, além
do build assinado (que já sai automático — ver `README.md`).

## 1. Criar a conta de desenvolvedor

- https://play.google.com/console/signup
- Taxa única de **US$25** (não é mensal).
- Precisa de conta Google + cartão + verificação de identidade (Google pode
  levar de 1 a alguns dias pra aprovar).

## 2. Política nova do Google: teste fechado obrigatório

Contas de desenvolvedor **pessoais** criadas recentemente são obrigadas a
rodar uma trilha de **teste fechado** com **pelo menos 12 testadores**
usando o app por **14 dias seguidos** antes de poder publicar em produção.
Ou seja: não dá pra publicar direto — planeje pelo menos 2 semanas de
antecedência e separe 12 pessoas (podem ser você, familiares, colegas
psicólogos) que topem instalar e usar o app durante esse período.

## 3. Criar o app no Play Console

- **Nome**: Portal do Psi
- **Idioma padrão**: Português (Brasil)
- **App ou jogo**: App
- **Gratuito ou pago**: Gratuito
- **Categoria**: Saúde e fitness (ou Medicina)

## 4. Ficha da loja (Store Listing)

Preencher:
- **Descrição curta** (até 80 caracteres)
- **Descrição completa** (até 4000 caracteres)
- **Ícone**: já pronto em `apps/mobile/assets/icon-only.png` (redimensione
  pra 512×512 se necessário — o Play Console aceita o PNG direto)
- **Gráfico de destaque** (1024×500) — ainda não existe, precisa criar
- **Capturas de tela do celular**: mínimo 2, recomendado 4–8 — precisam ser
  screenshots reais do app funcionando (abra o APK de teste num celular ou
  emulador e capture: tela de login, agenda, dever de casa, meditação, etc.)

## 5. Formulário de Segurança de Dados (Data Safety)

Obrigatório e verificado pelo Google — responda com base no que a
plataforma realmente coleta (ver `apps/web/app/privacidade/page.tsx`):

| Pergunta | Resposta |
|---|---|
| Coleta dados pessoais (nome, e-mail, telefone)? | Sim |
| Coleta dados de saúde? | Sim (prontuário, testes psicológicos) |
| Coleta dados financeiros? | Sim, só o necessário pra cobrança (via Asaas/Stripe) |
| Dados são criptografados em trânsito? | Sim (HTTPS) |
| Usuário pode pedir exclusão dos dados? | Sim |
| Compartilha dados com terceiros? | Sim — processadores de pagamento, Firebase (push), Daily.co (teleconsulta) — nunca pra publicidade |

## 6. Classificação etária (Content Rating)

Preencha o questionário do IARC dentro do Play Console. Dado que o
conteúdo é sobre saúde mental e não tem violência/conteúdo adulto, deve
sair com classificação livre ou próxima disso — mas **responda você
mesmo**, não posso preencher isso por você (exige uma conta logada no
Play Console).

**Atenção especial**: se pacientes menores de idade vão usar o app
diretamente (não só os responsáveis agendando por eles), isso pode
enquadrar o app na política de "Famílias" do Google, que tem exigências
extras de privacidade. Vale decidir isso com cuidado — se tiver dúvida,
recomendo confirmar com um advogado antes de declarar o público-alvo.

## 7. URL da Política de Privacidade

```
https://portaldopsi.com.br/privacidade
```

Já está no site (link no rodapé da home também). Cole essa URL no campo
"Política de privacidade" do Play Console.

## 8. Enviar o AAB

1. Rode o workflow **"Build native apps"** no GitHub Actions (aba Actions).
2. Baixe o artefato `portal-do-psi-android-release-aab`.
3. No Play Console: **Versões** → **Teste fechado** → criar uma trilha →
   **Fazer upload** do `.aab`.
4. Adicione os 12+ testadores (e-mails deles) e aguarde os 14 dias.
5. Depois do período de teste, solicite a promoção pra produção.

## 9. Atualizações futuras

Toda vez que quiser publicar uma atualização da *casca* do app (ícone,
nome, permissões — não conteúdo do site, que já é automático):
1. Suba o `versionCode` e `versionName` em
   `apps/mobile/android/app/build.gradle`.
2. Rode o workflow de novo.
3. Envie o novo `.aab` no Play Console.

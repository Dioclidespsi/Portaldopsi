# Portal do Psi — Android (Capacitor)

Casca nativa Android: o app abre `https://portaldopsi.com.br` dentro de um
WebView nativo (ver `server.url` em `capacitor.config.ts`). Não duplica
código do site — qualquer deploy novo no site aparece automaticamente pro
paciente, sem precisar gerar um APK novo. Só muda quando o próprio ícone,
nome ou splash screen do app mudam.

## Pré-requisitos (não instalados neste ambiente)

- **Java JDK 17+**
- **Android Studio** (traz o Android SDK) — https://developer.android.com/studio

## Gerar o APK/AAB

```bash
npm install --workspace apps/mobile
npm run sync --workspace apps/mobile      # copia capacitor.config.ts pro projeto Android
npm run open:android --workspace apps/mobile   # abre no Android Studio
```

No Android Studio: **Build → Generate Signed Bundle / APK**. Pra publicar na
Play Store você precisa de um **AAB assinado** (não o APK de debug) — ver
Fase 9.

## Testar num celular/emulador sem gerar build assinado

```bash
npm run run:android --workspace apps/mobile
```

## Trocar o ícone

Substitua `assets/icon-only.png`, `assets/icon-foreground.png` e
`assets/icon-background.png` (1024×1024) e rode:

```bash
npx capacitor-assets generate --android
```

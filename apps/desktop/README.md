# Portal do Psi — Windows/Mac (Tauri)

Casca nativa desktop: o app abre `https://portaldopsi.com.br` numa janela
nativa (ver `app.windows[0].url` em `src-tauri/tauri.conf.json`). Não
duplica código do site — qualquer deploy novo no site aparece
automaticamente, sem precisar gerar um instalador novo. Só muda quando o
próprio ícone ou nome do app mudam.

## Pré-requisitos (não instalados neste ambiente)

- **Rust** (via https://rustup.rs)
- **Windows**: Microsoft C++ Build Tools (Visual Studio Installer → "Desktop
  development with C++") + WebView2 (já vem no Windows 11 e na maioria das
  instalações de Windows 10 atualizadas).
- **Mac**: Xcode Command Line Tools (`xcode-select --install`).

## Gerar o instalador

```bash
npm install --workspace apps/desktop
npm run build --workspace apps/desktop
```

Gera, dependendo do SO onde o comando roda:
- Windows: `.msi` e `.exe` (NSIS) em `src-tauri/target/release/bundle/`
- Mac: `.app` e `.dmg` em `src-tauri/target/release/bundle/`

**Importante**: build é feito no SO alvo — não dá pra gerar o `.exe` do
Windows rodando num Mac, e vice-versa (a não ser usando CI cross-platform,
ex: GitHub Actions com runners `windows-latest`/`macos-latest`).

## Testar em desenvolvimento

```bash
npm run dev --workspace apps/desktop
```

## Trocar o ícone

Substitua `../web/public/icons/icon-512.png` (ou aponte pra outro PNG
1024×1024) e rode:

```bash
npx tauri icon caminho/para/icone.png
```

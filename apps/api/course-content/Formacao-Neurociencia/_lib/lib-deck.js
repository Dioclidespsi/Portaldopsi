// Biblioteca compartilhada de slides — Formação em Neurociência Aplicada à Psicoterapia
// Reaproveitada por todos os protocolos do Bloco 4.

const pptxgen = require("pptxgenjs");

const NAVY = "12283D";
const NAVY2 = "1A3350";
const NAVY_TINT = "63768A";
const TERRA = "C1652F";
const TERRA_DIM = "A8551F";
const TERRA_TINT = "D99A73";
const PAPER = "F5F1EA";
const PAPER2 = "EFE8D9";
const INK = "2B2B2B";
const INK_MUTED = "6B6153";
const WHITE = "FFFFFF";

const HEAD_FONT = "Cambria";
const BODY_FONT = "Calibri";
const W = 13.33, H = 7.5;

function makeShadow() {
  return { type: "outer", color: "000000", blur: 8, offset: 3, angle: 45, opacity: 0.12 };
}

function novaApresentacao(titulo, autor) {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_WIDE";
  pres.author = autor || "Dioclides";
  pres.title = titulo;
  return pres;
}

function footer(slide, label, pageNum, dark) {
  slide.addText(label, {
    x: 0.5, y: H - 0.45, w: 8, h: 0.3, fontFace: BODY_FONT, fontSize: 9,
    color: dark ? "8FA0B3" : INK_MUTED, margin: 0,
  });
  slide.addText(String(pageNum), {
    x: W - 1, y: H - 0.45, w: 0.5, h: 0.3, fontFace: BODY_FONT, fontSize: 9,
    color: dark ? "8FA0B3" : INK_MUTED, align: "right", margin: 0,
  });
}

// pptxgenjs shapes constants are attached to the *instance*, not the class, so
// slide-building helpers below take `pres` as first arg to access pres.shapes.

function drawBadge(pres, slide, x, y, d, number, fillColor, textColor) {
  slide.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color: fillColor }, line: { type: "none" } });
  if (number !== "" && number !== undefined) {
    slide.addText(String(number), {
      x, y, w: d, h: d, fontFace: HEAD_FONT, fontSize: d > 0.6 ? 22 : 16, bold: true,
      color: textColor, align: "center", valign: "middle", margin: 0,
    });
  }
}

function eyebrow(slide, text, x, y, w, color) {
  slide.addText(text.toUpperCase(), {
    x, y, w, h: 0.3, fontFace: BODY_FONT, fontSize: 11, bold: true,
    color: color || TERRA_DIM, charSpacing: 2, margin: 0,
  });
}

function tituloSlide(slide, text, y) {
  slide.addText(text, {
    x: 0.85, y: y !== undefined ? y : 0.8, w: 11, h: 0.75, fontFace: HEAD_FONT, fontSize: 28, bold: true, color: NAVY, margin: 0,
  });
}

// ---------- SLIDE: Título ----------
function slideTitulo(pres, { moduloLabel, titulo, subtitulo, rodapeMarca, passos }) {
  const s = pres.addSlide();
  s.background = { color: NAVY };
  eyebrow(s, moduloLabel, 0.9, 1.5, 10, TERRA);
  s.addText(titulo, { x: 0.85, y: 1.9, w: 11, h: 1.4, fontFace: HEAD_FONT, fontSize: 56, bold: true, color: WHITE, margin: 0 });
  s.addText(subtitulo, { x: 0.9, y: 3.15, w: 10.5, h: 0.7, fontFace: BODY_FONT, fontSize: 21, color: "CBD8E5", margin: 0 });

  if (passos && passos.length) {
    let sx = 0.9;
    const step = Math.min(1.95, (W - 1.8) / passos.length);
    passos.forEach((t, i) => {
      drawBadge(pres, s, sx, 4.55, 0.42, i + 1, i === 0 ? TERRA : NAVY2, WHITE);
      s.addText(t, { x: sx - 0.35, y: 5.05, w: step, h: 0.4, fontFace: BODY_FONT, fontSize: 10, color: "AEBFD1", align: "center", margin: 0 });
      sx += step;
    });
  }

  s.addText(rodapeMarca || "Formação em Neurociência Aplicada à Psicoterapia — by Dioclides", {
    x: 0.9, y: H - 0.9, w: 10, h: 0.35, fontFace: BODY_FONT, fontSize: 11, color: "7E93A8", margin: 0,
  });
  return s;
}

// ---------- SLIDE: Roteiro (5 cards da anatomia do protocolo) ----------
function slideRoteiro(pres, { rodape, pageNum, titulo, cards }) {
  const s = pres.addSlide();
  s.background = { color: PAPER };
  eyebrow(s, "Roteiro desta aula", 0.9, 0.55, 10);
  tituloSlide(s, titulo || "A mesma anatomia de 5 passos, em todo protocolo do curso", 0.85);

  const n = cards.length;
  const cardW = Math.min(2.2, (W - 1.8 - (n - 1) * 0.28) / n);
  const gap = 0.28;
  let cx = 0.9;
  cards.forEach((c, i) => {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: cx, y: 2.1, w: cardW, h: 3.7, rectRadius: 0.1, fill: { color: WHITE }, line: { type: "none" }, shadow: makeShadow(),
    });
    drawBadge(pres, s, cx + cardW / 2 - 0.35, 2.45, 0.7, i + 1, i === 0 ? TERRA : NAVY, WHITE);
    s.addText(c.titulo, { x: cx + 0.15, y: 3.35, w: cardW - 0.3, h: 0.6, fontFace: HEAD_FONT, fontSize: 15, bold: true, color: NAVY, align: "center", margin: 0 });
    s.addText(c.desc, { x: cx + 0.2, y: 3.95, w: cardW - 0.4, h: 1.6, fontFace: BODY_FONT, fontSize: 11, color: INK_MUTED, align: "center", margin: 0 });
    cx += cardW + gap;
  });
  footer(s, rodape, pageNum, false);
  return s;
}

// ---------- SLIDE: Hook (frase de abertura) ----------
function slideHook(pres, { rodape, pageNum, eyebrowText, frase, apoio }) {
  const s = pres.addSlide();
  s.background = { color: PAPER };
  eyebrow(s, eyebrowText || "Antes de começar", 0.9, 0.9, 10);
  s.addText(frase, {
    x: 0.9, y: 1.5, w: 10.8, h: 2.6, fontFace: HEAD_FONT, fontSize: 34, bold: true, color: NAVY, margin: 0, lineSpacingMultiple: 1.15,
  });
  if (apoio) {
    s.addText(apoio, { x: 0.9, y: 4.3, w: 8.7, h: 1.5, fontFace: BODY_FONT, fontSize: 15, color: INK_MUTED, margin: 0 });
  }
  footer(s, rodape, pageNum, false);
  return s;
}

// ---------- SLIDE: Diagrama de cérebro (mecanismo) ----------
function slideCircuito(pres, { rodape, pageNum, eyebrowText, titulo, regioes, notas }) {
  const s = pres.addSlide();
  s.background = { color: PAPER };
  eyebrow(s, eyebrowText || "Passo 1 · Mecanismo", 0.9, 0.5, 10);
  tituloSlide(s, titulo);

  const bx = 0.9, by = 1.85, bw = 5.6, bh = 4.4;
  s.addShape(pres.shapes.OVAL, { x: bx, y: by, w: bw, h: bh, fill: { color: PAPER2 }, line: { color: NAVY, width: 2 } });

  regioes.forEach((r) => {
    s.addShape(pres.shapes.OVAL, {
      x: bx + bw * r.rx, y: by + bh * r.ry, w: r.d, h: r.d, fill: { color: r.color }, line: { color: WHITE, width: 1.5 },
    });
  });

  const legX = bx + bw + 0.5;
  let legY = 2.1;
  regioes.forEach((r) => {
    s.addShape(pres.shapes.OVAL, { x: legX, y: legY + 0.03, w: 0.22, h: 0.22, fill: { color: r.color }, line: { type: "none" } });
    s.addText(r.label, { x: legX + 0.35, y: legY - 0.05, w: 3.5, h: 0.35, fontFace: BODY_FONT, fontSize: 13, bold: true, color: NAVY, margin: 0 });
    legY += 0.55;
  });

  if (notas && notas.length) {
    s.addText(
      notas.map((t) => ({ text: t, options: { breakLine: true, bullet: true } })),
      { x: legX, y: legY + 0.25, w: 5.6, h: 2.2, fontFace: BODY_FONT, fontSize: 12.5, color: INK_MUTED, margin: 0, paraSpaceAfter: 10 }
    );
  }
  footer(s, rodape, pageNum, false);
  return s;
}

// ---------- SLIDE: Cadeia / circuito em boxes horizontais ----------
function slideCadeia(pres, { rodape, pageNum, eyebrowText, titulo, elos, notaFinal }) {
  const s = pres.addSlide();
  s.background = { color: PAPER };
  eyebrow(s, eyebrowText || "Passo 1 · Mecanismo", 0.9, 0.5, 10);
  tituloSlide(s, titulo);

  const n = elos.length;
  const gap = 0.55;
  const boxW = (W - 1.8 - (n - 1) * gap) / n;
  let cx = 0.9;
  elos.forEach((el, i) => {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: cx, y: 2.15, w: boxW, h: 2.1, rectRadius: 0.08,
      fill: { color: i === n - 1 ? TERRA : NAVY }, line: { type: "none" }, shadow: makeShadow(),
    });
    s.addText(el.titulo, { x: cx + 0.18, y: 2.35, w: boxW - 0.36, h: 0.5, fontFace: HEAD_FONT, fontSize: 15, bold: true, color: WHITE, margin: 0 });
    s.addText(el.desc, { x: cx + 0.18, y: 2.9, w: boxW - 0.36, h: 1.2, fontFace: BODY_FONT, fontSize: 11, color: "E4E9EF", margin: 0 });
    cx += boxW;
    if (i < n - 1) {
      s.addText("→", { x: cx, y: 2.15, w: gap, h: 2.1, fontFace: BODY_FONT, fontSize: 26, color: NAVY, align: "center", valign: "middle", margin: 0 });
      cx += gap;
    }
  });

  if (notaFinal) {
    s.addText(notaFinal, { x: 0.9, y: 4.9, w: 10.8, h: 0.9, fontFace: BODY_FONT, fontSize: 13.5, italic: true, color: INK_MUTED, margin: 0 });
  }
  footer(s, rodape, pageNum, false);
  return s;
}

// ---------- SLIDE: Categorias em colunas (N cards com badge redondo) ----------
function slideCategorias(pres, { rodape, pageNum, eyebrowText, titulo, categorias, notaFinal }) {
  const s = pres.addSlide();
  s.background = { color: PAPER };
  eyebrow(s, eyebrowText || "Passo 1 · Mecanismo", 0.9, 0.5, 10);
  tituloSlide(s, titulo);

  const n = categorias.length;
  const cw = Math.min(3.5, (W - 1.8 - (n - 1) * 0.4) / n);
  const gap = 0.4;
  let cx = (W - (n * cw + (n - 1) * gap)) / 2;
  categorias.forEach((c) => {
    drawBadge(pres, s, cx + cw / 2 - 0.45, 2.1, 0.9, c.sigla || "", c.color || TERRA, WHITE);
    s.addText(c.titulo, { x: cx, y: 3.2, w: cw, h: 0.55, fontFace: HEAD_FONT, fontSize: 20, bold: true, color: NAVY, align: "center", margin: 0 });
    s.addText(c.desc, { x: cx + 0.2, y: 3.8, w: cw - 0.4, h: 1.6, fontFace: BODY_FONT, fontSize: 13, color: INK_MUTED, align: "center", margin: 0 });
    cx += cw + gap;
  });

  if (notaFinal) {
    s.addText(notaFinal, { x: 0.9, y: 5.7, w: 10.5, h: 0.6, fontFace: BODY_FONT, fontSize: 13, italic: true, color: INK_MUTED, align: "center", margin: 0 });
  }
  footer(s, rodape, pageNum, false);
  return s;
}

// ---------- SLIDE: Lista de sinais (linhas com bullet redondo) ----------
function slideSinais(pres, { rodape, pageNum, eyebrowText, titulo, itens }) {
  const s = pres.addSlide();
  s.background = { color: PAPER };
  eyebrow(s, eyebrowText || "Passo 2 · Sinais de alerta", 0.9, 0.5, 10);
  tituloSlide(s, titulo);

  let ry = 2.05;
  const step = Math.min(0.95, (H - 2.5) / itens.length);
  itens.forEach((it) => {
    s.addShape(pres.shapes.OVAL, { x: 0.9, y: ry + 0.06, w: 0.22, h: 0.22, fill: { color: TERRA }, line: { type: "none" } });
    s.addText(it.titulo, { x: 1.3, y: ry, w: 2.6, h: 0.45, fontFace: BODY_FONT, fontSize: 15, bold: true, color: NAVY, margin: 0 });
    s.addText(it.desc, { x: 4.0, y: ry, w: 8.3, h: 0.7, fontFace: BODY_FONT, fontSize: 13.5, color: INK_MUTED, margin: 0 });
    ry += step;
  });
  footer(s, rodape, pageNum, false);
  return s;
}

// ---------- SLIDE: Cards de diagnóstico diferencial (com cabeçalho colorido) ----------
function slideDiferencial(pres, { rodape, pageNum, eyebrowText, titulo, cards }) {
  const s = pres.addSlide();
  s.background = { color: PAPER };
  eyebrow(s, eyebrowText || "Passo 2 · Sinais de alerta", 0.9, 0.5, 10);
  tituloSlide(s, titulo);

  const n = cards.length;
  const cw = Math.min(3.6, (W - 1.8 - (n - 1) * 0.45) / n);
  const gap = 0.45;
  let cx = (W - (n * cw + (n - 1) * gap)) / 2;
  cards.forEach((c) => {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: cx, y: 2.1, w: cw, h: 3.6, rectRadius: 0.08, fill: { color: WHITE }, line: { type: "none" }, shadow: makeShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: cx, y: 2.1, w: cw, h: 0.7, fill: { color: NAVY }, line: { type: "none" } });
    s.addText(c.titulo, { x: cx, y: 2.1, w: cw, h: 0.7, fontFace: HEAD_FONT, fontSize: 15, bold: true, color: WHITE, align: "center", valign: "middle", margin: 0 });
    s.addText(c.desc, { x: cx + 0.25, y: 3.0, w: cw - 0.5, h: 2.5, fontFace: BODY_FONT, fontSize: 12.5, color: INK_MUTED, margin: 0 });
    cx += cw + gap;
  });
  footer(s, rodape, pageNum, false);
  return s;
}

// ---------- SLIDE: Instrumentos de avaliação (N cards) ----------
function slideInstrumentos(pres, { rodape, pageNum, eyebrowText, titulo, instrumentos }) {
  const s = pres.addSlide();
  s.background = { color: PAPER };
  eyebrow(s, eyebrowText || "Passo 3 · Instrumento", 0.9, 0.5, 10);
  tituloSlide(s, titulo);

  const n = instrumentos.length;
  const cw = Math.min(3.6, (W - 1.8 - (n - 1) * 0.45) / n);
  const gap = 0.45;
  let cx = (W - (n * cw + (n - 1) * gap)) / 2;
  instrumentos.forEach((it) => {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: cx, y: 2.1, w: cw, h: 3.9, rectRadius: 0.08, fill: { color: WHITE }, line: { type: "none" }, shadow: makeShadow() });
    s.addText(it.sigla, { x: cx + 0.25, y: 2.3, w: cw - 0.5, h: 0.6, fontFace: HEAD_FONT, fontSize: 22, bold: true, color: TERRA, margin: 0 });
    s.addText(it.nome, { x: cx + 0.25, y: 2.85, w: cw - 0.5, h: 0.5, fontFace: BODY_FONT, fontSize: 11, italic: true, color: NAVY, margin: 0 });
    s.addText(it.desc, { x: cx + 0.25, y: 3.4, w: cw - 0.5, h: 2.5, fontFace: BODY_FONT, fontSize: 12, color: INK_MUTED, margin: 0 });
    cx += cw + gap;
  });
  footer(s, rodape, pageNum, false);
  return s;
}

// ---------- SLIDE: Protocolo em N passos (overview) ----------
function slideProtocoloOverview(pres, { rodape, pageNum, eyebrowText, titulo, passos, notaFinal }) {
  const s = pres.addSlide();
  s.background = { color: PAPER };
  eyebrow(s, eyebrowText || "Passo 4 · Protocolo", 0.9, 0.5, 10);
  tituloSlide(s, titulo, 0.8);

  const n = passos.length;
  const cw = Math.min(2.6, (W - 2.0 - (n - 1) * 0.35) / n);
  const gap = 0.35;
  let cx = (W - (n * cw + (n - 1) * gap)) / 2;
  passos.forEach((p, i) => {
    drawBadge(pres, s, cx + cw / 2 - 0.4, 2.5, 0.8, i + 1, TERRA, WHITE);
    const linhas = p.titulo.split("\n");
    s.addText(
      linhas.map((l, idx) => ({ text: l, options: { breakLine: idx < linhas.length - 1 } })),
      { x: cx, y: 3.55, w: cw, h: 0.9, fontFace: BODY_FONT, fontSize: 14, bold: true, color: NAVY, align: "center", margin: 0 }
    );
    s.addText(p.desc, { x: cx + 0.15, y: 4.5, w: cw - 0.3, h: 0.8, fontFace: BODY_FONT, fontSize: 11, color: INK_MUTED, align: "center", margin: 0 });
    cx += cw;
    if (i < n - 1) {
      s.addText("→", { x: cx, y: 2.5, w: gap, h: 0.8, fontFace: BODY_FONT, fontSize: 22, color: "B7C2CE", align: "center", valign: "middle", margin: 0 });
      cx += gap;
    }
  });

  if (notaFinal) {
    s.addText(notaFinal, { x: 0.9, y: 5.85, w: 10.5, h: 0.5, fontFace: BODY_FONT, fontSize: 13, italic: true, color: INK_MUTED, align: "center", margin: 0 });
  }
  footer(s, rodape, pageNum, false);
  return s;
}

// ---------- SLIDE: Protocolo detalhado (2 colunas: card com badge + conteúdo livre) ----------
function slideProtocoloDetalhe(pres, { rodape, pageNum, eyebrowText, titulo, colunas }) {
  const s = pres.addSlide();
  s.background = { color: PAPER };
  eyebrow(s, eyebrowText || "Passo 4 · Protocolo", 0.9, 0.5, 10);
  tituloSlide(s, titulo);

  const largura = 5.6, gap = 0.35;
  let cx = 0.9;
  colunas.forEach((col) => {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: cx, y: 2.0, w: largura, h: 4.4, rectRadius: 0.08, fill: { color: WHITE }, line: { type: "none" }, shadow: makeShadow() });
    drawBadge(pres, s, cx + 0.25, 2.25, 0.5, col.numero, TERRA, WHITE);
    s.addText(col.titulo, { x: cx + 0.9, y: 2.28, w: largura - 1.1, h: 0.45, fontFace: HEAD_FONT, fontSize: 16, bold: true, color: NAVY, margin: 0 });

    if (col.fala) {
      s.addText(col.fala, { x: cx + 0.25, y: 2.95, w: largura - 0.5, h: 1.3, fontFace: BODY_FONT, fontSize: 13, italic: true, color: INK_MUTED, margin: 0 });
    }
    if (col.bullets) {
      s.addText(
        col.bullets.map((t) => ({ text: t, options: { breakLine: true, bullet: true } })),
        { x: cx + 0.25, y: col.fala ? 4.4 : 2.95, w: largura - 0.5, h: 1.8, fontFace: BODY_FONT, fontSize: 12.5, color: INK, margin: 0, paraSpaceAfter: 6 }
      );
    }
    if (col.tabela) {
      const tableData = [
        col.tabela.header.map((h) => ({ text: h, options: { bold: true, fill: { color: NAVY }, color: WHITE } })),
        ...col.tabela.linhas,
      ];
      s.addTable(tableData, { x: cx + 0.25, y: 2.9, w: largura - 0.5, h: 2.2, fontFace: BODY_FONT, fontSize: 11, border: { pt: 0.5, color: "DCD3C2" }, autoPage: false, valign: "middle" });
      if (col.notaTabela) {
        s.addText(col.notaTabela, { x: cx + 0.25, y: 5.35, w: largura - 0.5, h: 0.5, fontFace: BODY_FONT, fontSize: 12, italic: true, color: INK_MUTED, margin: 0 });
      }
    }
    cx += largura + gap;
  });
  footer(s, rodape, pageNum, false);
  return s;
}

// ---------- SLIDE: Estudo de caso ----------
function slideCaso(pres, { rodape, pageNum, eyebrowText, titulo, vinheta, perguntas }) {
  const s = pres.addSlide();
  s.background = { color: PAPER };
  eyebrow(s, eyebrowText || "Aplicação", 0.9, 0.5, 10);
  tituloSlide(s, titulo || "Estudo de caso");

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.9, y: 1.95, w: 11.5, h: 2.0, rectRadius: 0.08, fill: { color: WHITE }, line: { type: "none" }, shadow: makeShadow() });
  s.addText(vinheta, { x: 1.2, y: 2.15, w: 10.9, h: 1.6, fontFace: BODY_FONT, fontSize: 15, color: INK, margin: 0, valign: "middle" });

  s.addText("Discussão guiada", { x: 0.9, y: 4.25, w: 6, h: 0.4, fontFace: HEAD_FONT, fontSize: 16, bold: true, color: NAVY, margin: 0 });
  s.addText(
    perguntas.map((t, idx) => ({ text: t, options: { bullet: true, breakLine: idx < perguntas.length - 1 } })),
    { x: 0.9, y: 4.7, w: 11, h: 1.8, fontFace: BODY_FONT, fontSize: 14, color: INK_MUTED, margin: 0, paraSpaceAfter: 8 }
  );
  footer(s, rodape, pageNum, false);
  return s;
}

// ---------- SLIDE: Critérios de encaminhamento ----------
function slideEncaminhamento(pres, { rodape, pageNum, eyebrowText, titulo, criterios }) {
  const s = pres.addSlide();
  s.background = { color: PAPER };
  eyebrow(s, eyebrowText || "Passo 5 · Encaminhamento", 0.9, 0.5, 10);
  tituloSlide(s, titulo || "Quando isso não basta");

  let fy = 2.15;
  const step = Math.min(1.05, (H - 2.6) / criterios.length);
  criterios.forEach((f) => {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.9, y: fy, w: 11.5, h: 0.85, rectRadius: 0.06, fill: { color: WHITE }, line: { type: "none" }, shadow: makeShadow() });
    s.addShape(pres.shapes.OVAL, { x: 1.15, y: fy + 0.27, w: 0.3, h: 0.3, fill: { color: TERRA }, line: { type: "none" } });
    s.addText(f, { x: 1.65, y: fy, w: 10.5, h: 0.85, fontFace: BODY_FONT, fontSize: 13, color: INK, valign: "middle", margin: 0 });
    fy += step;
  });
  footer(s, rodape, pageNum, false);
  return s;
}

// ---------- SLIDE: Recap (dark) ----------
function slideRecap(pres, { rodape, pageNum, titulo, pontos, proximoTexto }) {
  const s = pres.addSlide();
  s.background = { color: NAVY };
  eyebrow(s, "Recapitulando", 0.9, 0.9, 10, TERRA);
  s.addText(titulo || "O que leva desta aula", { x: 0.85, y: 1.3, w: 10, h: 0.8, fontFace: HEAD_FONT, fontSize: 32, bold: true, color: WHITE, margin: 0 });

  s.addText(
    pontos.map((t, idx) => ({ text: t, options: { bullet: true, breakLine: idx < pontos.length - 1 } })),
    { x: 0.9, y: 2.4, w: 9.7, h: 2.6, fontFace: BODY_FONT, fontSize: 17, color: "E4E9EF", margin: 0, paraSpaceAfter: 12 }
  );

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.9, y: 5.3, w: 9.5, h: 1.15, rectRadius: 0.08, fill: { color: NAVY2 }, line: { type: "none" } });
  s.addText(proximoTexto, { x: 1.2, y: 5.3, w: 9, h: 1.15, fontFace: BODY_FONT, fontSize: 15, bold: true, color: TERRA_TINT, valign: "middle", margin: 0 });

  footer(s, rodape, pageNum, true);
  return s;
}

module.exports = {
  NAVY, NAVY2, NAVY_TINT, TERRA, TERRA_DIM, TERRA_TINT, PAPER, PAPER2, INK, INK_MUTED, WHITE,
  HEAD_FONT, BODY_FONT, W, H,
  novaApresentacao, footer, eyebrow, tituloSlide, drawBadge, makeShadow,
  slideTitulo, slideRoteiro, slideHook, slideCircuito, slideCadeia, slideCategorias,
  slideSinais, slideDiferencial, slideInstrumentos, slideProtocoloOverview,
  slideProtocoloDetalhe, slideCaso, slideEncaminhamento, slideRecap,
};

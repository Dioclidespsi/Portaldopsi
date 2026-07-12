const deck = require("../_lib/lib-deck.js");
const doc = require("../_lib/lib-doc.js");

const MOD = "1.3";
const NOME = "Neurociência do Desenvolvimento e do Apego";
const RODAPE_DECK = `Desenvolvimento e Apego — Módulo ${MOD}`;
const RODAPE_DOC = `Módulo ${MOD} — Desenvolvimento e Apego`;
const KICKER = "MÓDULO 1.3 · FUNDAMENTOS DE NEUROCIÊNCIA APLICADA";

// ============================================================
// 1) SLIDE DECK
// ============================================================
function construirDeck() {
  const pres = deck.novaApresentacao(`${NOME} — A Base de Todo Padrão Relacional Adulto`);

  deck.slideTitulo(pres, {
    moduloLabel: `Módulo ${MOD} · Bloco 1 · Fundamentos`,
    titulo: "Desenvolvimento e Apego",
    subtitulo: "Janelas críticas, trauma precoce e a base neurobiológica dos vínculos adultos",
    passos: ["Janelas críticas", "Apego", "Trauma precoce", "Sinais", "Aplicação"],
  });

  deck.slideRoteiro(pres, {
    rodape: RODAPE_DECK, pageNum: 2,
    cards: [
      { titulo: "Janelas críticas", desc: "Períodos de maior plasticidade no desenvolvimento" },
      { titulo: "Sistema de apego", desc: "A base neurobiológica dos padrões seguro/inseguro" },
      { titulo: "Trauma precoce", desc: "Como a adversidade programa o eixo do estresse" },
      { titulo: "Sinais adultos", desc: "Como o padrão de apego aparece na sessão hoje" },
      { titulo: "Aplicação", desc: "Pré-requisito direto pros Módulos 4.4, 4.14, 4.17 e 4.18" },
    ],
  });

  deck.slideHook(pres, {
    rodape: RODAPE_DECK, pageNum: 3,
    frase: "O padrão de apego que um adulto traz pra terapia raramente começou na vida adulta — ele foi moldado nos primeiros anos, numa janela em que o cérebro estava excepcionalmente aberto à influência do ambiente.",
    apoio: "Entender essa origem não serve pra culpar cuidadores — serve pra entender por que certos padrões relacionais são tão resistentes à mudança, e como a própria relação terapêutica pode ajudar a reescrevê-los.",
  });

  deck.slideCircuito(pres, {
    rodape: RODAPE_DECK, pageNum: 4,
    titulo: "O que se forma nas janelas críticas do desenvolvimento",
    regioes: [
      { label: "Sistema de apego (oxitocina, vínculo e busca de proximidade)", rx: 0.20, ry: 0.22, color: deck.NAVY, d: 0.5 },
      { label: "Eixo HPA (programado precocemente pela qualidade do cuidado recebido)", rx: 0.22, ry: 0.62, color: deck.TERRA, d: 0.4 },
      { label: "Amígdala e hipocampo (moldados pela experiência emocional precoce)", rx: 0.60, ry: 0.60, color: deck.NAVY_TINT, d: 0.36 },
      { label: "Córtex pré-frontal (maturação mais tardia, moldada por regulação compartilhada)", rx: 0.58, ry: 0.24, color: deck.TERRA_TINT, d: 0.36 },
    ],
    notas: [
      "O sistema de apego, dependente de oxitocina, se forma nas primeiras interações de cuidado — a base biológica da busca por proximidade e segurança.",
      "O eixo HPA é programado precocemente pela qualidade do cuidado — cuidado responsivo tende a gerar um eixo mais regulado; adversidade tende a gerar maior reatividade.",
      "O córtex pré-frontal amadurece mais tarde, moldado em grande parte pela regulação compartilhada com cuidadores — a base neurobiológica de por que aprendemos a nos regular observando outros regularem a gente primeiro.",
    ],
  });

  deck.slideCadeia(pres, {
    rodape: RODAPE_DECK, pageNum: 5,
    titulo: "Do cuidado recebido ao padrão relacional adulto",
    elos: [
      { titulo: "Qualidade do cuidado precoce", desc: "Responsividade, consistência e sintonia emocional do cuidador principal" },
      { titulo: "Formação do padrão de apego", desc: "Seguro, ansioso, evitativo ou desorganizado, consolidado na primeira infância" },
      { titulo: "Modelo interno de trabalho", desc: "Expectativas inconscientes sobre si mesmo e sobre os outros em relações" },
      { titulo: "Padrão relacional adulto", desc: "Repetição do modelo em relações românticas, terapêuticas e de amizade" },
    ],
    notaFinal: "É por isso que padrões de apego aparecem de forma tão consistente entre diferentes relações da vida adulta — o modelo interno de trabalho é generalizado, não específico de uma única relação.",
  });

  deck.slideCategorias(pres, {
    rodape: RODAPE_DECK, pageNum: 6,
    titulo: "3 elementos centrais da neurobiologia do apego",
    categorias: [
      { titulo: "Sistema de apego", desc: "Padrões seguro, ansioso, evitativo e desorganizado, com base no oxitocina", color: deck.NAVY },
      { titulo: "Programação do eixo HPA", desc: "Reatividade ao estresse moldada precocemente pela qualidade do cuidado", color: deck.TERRA },
      { titulo: "Regulação compartilhada", desc: "Aprender a se regular observando e sendo regulado por outros primeiro", color: deck.NAVY_TINT },
    ],
    notaFinal: "Esses 3 elementos são o pré-requisito neurobiológico direto pros Módulos de Relacionamento (4.4) e de vários Transtornos de Personalidade (4.14, 4.17, 4.18).",
  });

  deck.slideSinais(pres, {
    rodape: RODAPE_DECK, pageNum: 7,
    titulo: "Como o padrão de apego aparece na sessão hoje",
    itens: [
      { titulo: "Cognitivo", desc: "Crenças sobre merecer ou não cuidado, sobre confiar ou não nos outros" },
      { titulo: "Comportamental", desc: "Busca excessiva de proximidade, evitação de intimidade, ou padrão inconsistente" },
      { titulo: "Relacional", desc: "Repetição do mesmo padrão em diferentes relações, inclusive na aliança terapêutica" },
      { titulo: "Físico", desc: "Reatividade fisiológica ao estresse relacional, moldada precocemente pelo eixo HPA" },
    ],
  });

  deck.slideDiferencial(pres, {
    rodape: RODAPE_DECK, pageNum: 8,
    titulo: "Diferenciando os padrões de apego adulto",
    cards: [
      { titulo: "Apego ansioso", desc: "Busca intensa de proximidade, medo de abandono — base de vários quadros do Módulo 4.14" },
      { titulo: "Apego evitativo", desc: "Desconforto com intimidade, autossuficiência excessiva — base do Módulo 4.17" },
      { titulo: "Apego desorganizado", desc: "Combinação contraditória de busca e medo do vínculo, comum em trauma precoce" },
    ],
  });

  deck.slideInstrumentos(pres, {
    rodape: RODAPE_DECK, pageNum: 9,
    titulo: "Instrumentos pra avaliar apego e adversidade precoce",
    instrumentos: [
      { sigla: "ECR-R", nome: "Experiences in Close Relationships — Revised", desc: "Autorrelato de padrão de apego em relações adultas." },
      { sigla: "AAI", nome: "Adult Attachment Interview", desc: "Entrevista estruturada mais profunda sobre narrativa de apego." },
      { sigla: "ACE", nome: "Adverse Childhood Experiences", desc: "Questionário de rastreio de adversidade na infância." },
    ],
  });

  deck.slideProtocoloOverview(pres, {
    rodape: RODAPE_DECK, pageNum: 10,
    titulo: "Do desenvolvimento à aplicação clínica: 4 passos",
    passos: [
      { titulo: "Reconhecer\no padrão", desc: "Identificar o padrão de apego predominante do paciente" },
      { titulo: "Psicoeducar\na origem", desc: "Explicar a formação precoce sem gerar culpa nos cuidadores nem no paciente" },
      { titulo: "Usar a\naliança terapêutica", desc: "O terapeuta como base segura temporária pra praticar um novo padrão" },
      { titulo: "Conectar ao\nprotocolo certo", desc: "Direcionar pro módulo de personalidade/relacionamento mais adequado" },
    ],
    notaFinal: "A relação terapêutica em si é uma das ferramentas mais poderosas pra trabalhar apego — ela oferece uma experiência corretiva de vínculo consistente e responsivo.",
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 11,
    titulo: "Passos 1 e 2, na prática",
    colunas: [
      {
        numero: 1, titulo: "Reconhecer o padrão",
        bullets: ["Observe como o paciente se relaciona com o próprio terapeuta ao longo do tempo — é uma amostra direta do padrão", "Investigue narrativas sobre relações passadas em busca de temas recorrentes"],
      },
      {
        numero: 2, titulo: "Psicoeducar a origem",
        fala: "“Esse jeito de se relacionar começou muito cedo, como uma forma de se adaptar ao ambiente que você tinha — não é uma falha de caráter, é uma adaptação que pode ser atualizada agora.”",
        bullets: ["Evite linguagem que culpabilize cuidadores ou o próprio paciente", "Enfatize que o padrão foi adaptativo no contexto original, mesmo que custoso agora"],
      },
    ],
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 12,
    titulo: "Passos 3 e 4, na prática",
    colunas: [
      {
        numero: 3, titulo: "Usar a aliança terapêutica",
        bullets: ["Mantenha consistência e previsibilidade — a base da experiência corretiva de apego", "Nomeie, quando útil, os momentos em que o padrão relacional aparece na própria sessão"],
      },
      {
        numero: 4, titulo: "Conectar ao protocolo certo",
        bullets: ["Apego ansioso consolidado: considerar Módulo 4.14 (TP Borderline) se houver critérios completos", "Apego evitativo consolidado: considerar Módulo 4.17 (TP Evitativa)", "Padrões relacionais de casal: considerar Módulo 4.4"],
      },
    ],
  });

  deck.slideCaso(pres, {
    rodape: RODAPE_DECK, pageNum: 13,
    vinheta: "Um paciente relata que, em todas as relações românticas que já teve, sente uma necessidade intensa de confirmação constante de que é amado, e entra em pânico diante de qualquer sinal ambíguo de distanciamento do parceiro. Relata infância com um cuidador principal emocionalmente inconsistente — às vezes muito presente, às vezes distante sem explicação.",
    perguntas: [
      "Que padrão de apego parece mais consistente com a história relatada?",
      "Como a inconsistência do cuidado precoce se conecta ao padrão relacional adulto descrito?",
      "Como você usaria a própria relação terapêutica pra trabalhar esse padrão ao longo do processo?",
    ],
  });

  deck.slideEncaminhamento(pres, {
    rodape: RODAPE_DECK, pageNum: 14,
    criterios: [
      "Trauma precoce grave com sintomas de intrusão/hipervigilância: considerar sobreposição com TEPT (Módulo 4.6)",
      "Padrão de apego consolidado em quadro de personalidade completo: direcionar pro módulo correspondente (4.14, 4.17, 4.18)",
      "Impacto significativo em relação de casal atual: considerar Módulo 4.4 como complemento",
      "Histórico extenso de adversidade na infância (ACE elevado): investigar impacto cumulativo em múltiplas áreas de funcionamento",
    ],
  });

  deck.slideRecap(pres, {
    rodape: RODAPE_DECK, pageNum: 15,
    pontos: [
      "Janelas críticas do desenvolvimento moldam o sistema de apego, o eixo HPA e a capacidade de autorregulação",
      "O modelo interno de trabalho formado na infância se generaliza pras relações adultas, inclusive a terapêutica",
      "Apego ansioso, evitativo e desorganizado são os 3 padrões centrais, cada um com uma assinatura relacional própria",
      "A relação terapêutica é ferramenta direta de trabalho — consistência e previsibilidade oferecem experiência corretiva de apego",
    ],
    proximoTexto: "Próximo: exercícios práticos e avaliação do Módulo 1.3 →",
  });

  return pres.writeFile({ fileName: "Modulo-1.3-Desenvolvimento-Apego.pptx" });
}

// ============================================================
// 2) EXERCÍCIOS
// ============================================================
function construirExercicios() {
  const children = [
    ...doc.capa(KICKER, "Exercícios — Desenvolvimento e Apego", "Resolva individualmente antes da sessão de supervisão. O objetivo é testar sua leitura do mecanismo antes de comparar com a discussão em grupo — não há problema em errar."),

    doc.exNum(1, "Os elementos centrais, em suas palavras"),
    doc.pergunta(1, "Explique em até 3 frases, sem jargão técnico, por que o padrão de apego formado na infância se generaliza pra relações adultas."),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Por que é importante evitar linguagem que culpabilize cuidadores ao psicoeducar sobre a origem do apego?"),
    ...doc.linhaResposta(2),

    doc.exNum(2, "Diferenciando os padrões de apego"),
    doc.tabelaSimples(["Padrão", "Assinatura relacional típica"], [["Ansioso", ""], ["Evitativo", ""], ["Desorganizado", ""]], [2600, 6750]),

    doc.exNum(3, "A relação terapêutica como ferramenta"),
    doc.vinhetaBox("Um paciente com padrão de apego evitativo cancela repetidamente sessões nos momentos em que o vínculo terapêutico parece estar se aprofundando."),
    doc.pergunta(1, "Como você nomearia esse padrão de forma terapêutica, sem confrontar de forma que reforce a evitação?"),
    ...doc.linhaResposta(3),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),

    doc.exNum(4, "Instrumentos"),
    doc.pergunta(1, "Em que situação você optaria pelo ECR-R, e em que situação pela AAI?"),
    ...doc.linhaResposta(2),

    doc.exNum(5, "Caso integrado"),
    doc.vinhetaBox("Um paciente sente necessidade intensa de confirmação constante em relações românticas, entra em pânico diante de sinais ambíguos de distanciamento, e relata infância com cuidador principal emocionalmente inconsistente."),
    doc.pergunta(1, "Que padrão de apego parece mais consistente com a história relatada?"),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Como você usaria a relação terapêutica pra trabalhar esse padrão ao longo do processo?"),
    ...doc.linhaResposta(2),
    doc.pergunta(3, "A que módulo de personalidade essa leitura poderia se conectar, se os critérios completos estiverem presentes?"),
    ...doc.linhaResposta(1),
  ];

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-1.3-Exercicios.docx");
}

// ============================================================
// 3) AVALIAÇÃO
// ============================================================
function construirProva() {
  const objetivas = [
    ["As janelas críticas do desenvolvimento se caracterizam por:", ["Períodos de maior plasticidade e abertura à influência do ambiente", "Períodos em que o cérebro é completamente imune a qualquer influência externa", "Momentos exclusivamente da vida adulta", "Ausência total de qualquer desenvolvimento neural"]],
    ["O sistema de apego tem como base neurobiológica principal:", ["A oxitocina, ligada a vínculo e busca de proximidade", "Exclusivamente a dopamina", "Nenhum sistema neuroquímico identificável", "Apenas estruturas motoras do cerebelo"]],
    ["O eixo HPA, segundo o módulo, é:", ["Programado precocemente pela qualidade do cuidado recebido", "Completamente independente de qualquer experiência precoce", "Formado apenas na vida adulta", "Sem qualquer relação com reatividade ao estresse"]],
    ["Os 3 elementos centrais da neurobiologia do apego são:", ["Sistema de apego, programação do eixo HPA, regulação compartilhada", "Grandiosidade, necessidade de admiração, falta de empatia", "Restrição/controle, distorção da imagem corporal, comportamento compensatório", "Desatenção, impulsividade, inquietação interna"]],
    ["Instrumento de entrevista estruturada mais profunda sobre narrativa de apego:", ["AAI (Adult Attachment Interview)", "PCL-R", "Y-BOCS", "ISI"]],
    ["O apego evitativo se caracteriza por:", ["Desconforto com intimidade e autossuficiência excessiva", "Busca intensa e constante de proximidade", "Ausência completa de qualquer padrão relacional", "Combinação exclusiva de busca e medo do vínculo"]],
    ["Por que a relação terapêutica é considerada ferramenta direta de trabalho sobre apego?", ["Porque oferece uma experiência corretiva de vínculo consistente e responsivo", "Porque não tem qualquer relação com o padrão de apego do paciente", "Porque deve ser sempre evitada em pacientes com padrão de apego inseguro", "Porque substitui completamente a necessidade de qualquer outra intervenção"]],
    ["O passo \"psicoeducar a origem\", no modelo de aplicação clínica, recomenda:", ["Evitar linguagem que culpabilize cuidadores ou o próprio paciente", "Culpabilizar diretamente os cuidadores pela formação do padrão", "Ignorar completamente a origem desenvolvimental do padrão", "Focar exclusivamente em aspectos genéticos, sem considerar o ambiente"]],
    ["Trauma precoce grave com sintomas de intrusão e hipervigilância sugere considerar sobreposição com:", ["TEPT (Módulo 4.6)", "TOC (Módulo 4.8) exclusivamente", "TDAH (Módulo 4.22) exclusivamente", "Nenhum outro módulo do curso"]],
    ["O modelo interno de trabalho, formado na infância, se caracteriza por:", ["Generalizar-se pra diferentes relações da vida adulta, incluindo a terapêutica", "Ser específico de uma única relação, sem qualquer generalização", "Não ter qualquer influência sobre relações futuras", "Desaparecer completamente ao final da adolescência"]],
  ];
  const gabaritoObjetivas = ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a"];

  const children = [
    ...doc.capa(KICKER, "Avaliação — Desenvolvimento e Apego", `Avaliação formativa de encerramento do Módulo ${MOD}.`),
    doc.infoBox([
      ["Nota de corte:", "70 de 100 pontos"],
      ["Tempo sugerido:", "35 minutos"],
      ["Composição:", "10 questões objetivas (6 pts cada = 60 pts) + 1 questão de caso (40 pts)"],
      ["Consulta:", "Material da aula permitido; discussão entre colegas, não"],
    ]),
    doc.tituloH1("Parte 1 — Questões objetivas"),
  ];
  objetivas.forEach((q, i) => children.push(...doc.questaoObjetiva(i + 1, q[0], q[1])));

  children.push(
    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    doc.tituloH1("Parte 2 — Questão de caso (40 pontos)"),
    doc.vinhetaBox("Uma paciente relata que, desde muito cedo, aprendeu a \"não precisar de ninguém\", e hoje sente forte desconforto quando um parceiro tenta se aproximar emocionalmente, mesmo desejando conexão no fundo. Relata infância com cuidadores presentes fisicamente, mas emocionalmente distantes e pouco responsivos a demonstrações de necessidade."),
    new doc.Paragraph({ spacing: { before: 240 }, children: [new doc.TextRun({ text: "Com base no protocolo estudado, responda:", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    new doc.Paragraph({ spacing: { before: 220, after: 40 }, children: [new doc.TextRun({ text: "a) (10 pts) Que padrão de apego parece mais consistente com a história relatada?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "b) (10 pts) Como a qualidade do cuidado precoce descrita se conecta ao padrão relacional adulto atual?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "c) (10 pts) Escreva uma frase de psicoeducação sobre a origem desse padrão, sem culpabilizar cuidadores.", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "d) (10 pts) A que módulo de personalidade essa leitura poderia se conectar, se os critérios completos estiverem presentes?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    new doc.Paragraph({ spacing: { after: 40 }, children: [new doc.TextRun({ text: "USO EXCLUSIVO DO INSTRUTOR — remover antes de aplicar a prova", bold: true, color: doc.TERRA, font: doc.FONT, size: 20 })] }),
    doc.tituloH1("Gabarito"),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 1 — Questões objetivas", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 200 }, children: [new doc.TextRun({ text: gabaritoObjetivas.map((r, i) => `${i + 1}-${r}`).join("   ·   "), font: doc.FONT, size: 22, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 2 — Critério de correção da questão de caso", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "a) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Apego evitativo, dado o desconforto com aproximação emocional e a autossuficiência aprendida precocemente.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "b) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "A distância emocional e a pouca responsividade dos cuidadores a demonstrações de necessidade ensinaram, precocemente, que buscar proximidade emocional não trazia retorno confiável — gerando a autossuficiência defensiva observada hoje.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "c) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Ex: \"Aprender a não precisar de ninguém foi uma forma inteligente de se proteger num ambiente que nem sempre respondia ao que você precisava — isso pode ser atualizado agora, com segurança.\"", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "d) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Módulo 4.17 (TP Evitativa), caso os critérios completos de hipersensibilidade à rejeição, sentimento de inadequação e inibição social com desejo de conexão estejam presentes.", font: doc.FONT, size: 21, color: doc.INK })] }),
  );

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-1.3-Avaliacao.docx");
}

// ============================================================
// 4) ROTEIRO DE AULAS
// ============================================================
function seg(tempo, titulo, linhas) {
  const paras = [
    new doc.Paragraph({
      spacing: { before: 260, after: 100 },
      children: [
        new doc.TextRun({ text: tempo + "  ", bold: true, color: doc.TERRA, font: doc.FONT, size: 20 }),
        new doc.TextRun({ text: titulo, bold: true, color: doc.NAVY, font: doc.FONT, size: 22 }),
      ],
    }),
  ];
  linhas.forEach((l) => {
    if (typeof l === "string") {
      paras.push(new doc.Paragraph({ spacing: { after: 70 }, indent: { left: 260 }, bullet: { level: 0 }, children: [new doc.TextRun({ text: l, font: doc.FONT, size: 21, color: doc.INK })] }));
    } else if (l.fala) {
      paras.push(new doc.Paragraph({
        spacing: { before: 60, after: 90 }, indent: { left: 260, right: 260 }, shading: { type: doc.ShadingType.CLEAR, fill: doc.PAPER },
        children: [new doc.TextRun({ text: "“" + l.fala + "”", italics: true, font: doc.FONT, size: 21, color: doc.INK })],
      }));
    }
  });
  return paras;
}

function construirRoteiro() {
  const aulas = [
    {
      n: 1, titulo: "A base de todo padrão relacional adulto", duracao: "12 min", slides: "1, 2, 3, 4",
      objetivo: "Sair sabendo explicar a formação neurobiológica do apego sem jargão técnico.",
      segmentos: [
        seg("0:00–0:45", "Abertura (gancho)", [{ fala: "O padrão de apego que um adulto traz pra terapia raramente começou na vida adulta — ele foi moldado nos primeiros anos, numa janela em que o cérebro estava excepcionalmente aberto à influência do ambiente." }]),
        seg("0:45–2:00", "Por que isso importa", ["Não serve pra culpar cuidadores — serve pra entender por que certos padrões são tão resistentes à mudança."]),
        seg("2:00–8:00", "O que se forma nas janelas críticas (mostrar slide 4)", [
          "Sistema de apego, com base em oxitocina.",
          "Eixo HPA, programado pela qualidade do cuidado.",
          "Amígdala e hipocampo, moldados pela experiência emocional precoce.",
          "Córtex pré-frontal, com maturação mais tardia, moldado pela regulação compartilhada.",
        ]),
        seg("8:00–10:30", "Um ponto importante", ["Aprendemos a nos regular observando outros nos regularem primeiro."]),
        seg("10:30–12:00", "Fechamento", [{ fala: "Próxima aula: como o cuidado recebido vira padrão relacional adulto." }]),
      ],
    },
    {
      n: 2, titulo: "Do cuidado recebido ao padrão relacional adulto", duracao: "10 min", slides: "5",
      objetivo: "Explicar a cadeia entre qualidade do cuidado, apego e modelo interno de trabalho.",
      segmentos: [
        seg("0:00–1:00", "Retomada rápida", ["Vimos as estruturas envolvidas. Hoje vemos como o padrão se consolida ao longo do desenvolvimento."]),
        seg("1:00–6:30", "A cadeia (mostrar slide 5)", ["Qualidade do cuidado precoce: responsividade e sintonia emocional.", "Formação do padrão de apego: seguro, ansioso, evitativo ou desorganizado.", "Modelo interno de trabalho: expectativas inconscientes sobre relações.", "Padrão relacional adulto: repetição do modelo em diferentes relações."]),
        seg("6:30–9:00", "Por que isso se generaliza", ["O modelo interno de trabalho não é específico de uma relação — ele se aplica amplamente."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: os 3 elementos centrais da neurobiologia do apego." }]),
      ],
    },
    {
      n: 3, titulo: "Os 3 elementos centrais e os sinais adultos", duracao: "12 min", slides: "6, 7",
      objetivo: "Reconhecer os 3 elementos centrais e como aparecem na sessão.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três elementos — e como reconhecê-los na prática clínica de hoje."]),
        seg("1:00–6:00", "Os 3 elementos (mostrar slide 6)", [
          "Sistema de apego: padrões seguro, ansioso, evitativo, desorganizado.",
          "Programação do eixo HPA: reatividade moldada precocemente.",
          "Regulação compartilhada: base do autocontrole emocional adulto.",
        ]),
        seg("6:00–10:30", "Sinais na sessão de hoje (mostrar slide 7)", [
          "Cognitivo: crenças sobre merecer ou não cuidado.",
          "Comportamental: busca excessiva de proximidade ou evitação de intimidade.",
          "Relacional: repetição do padrão em diferentes relações, inclusive a terapêutica.",
          "Físico: reatividade fisiológica ao estresse relacional.",
        ]),
        seg("10:30–12:00", "Fechamento", [{ fala: "Próxima aula: como diferenciar os padrões de apego entre si." }]),
      ],
    },
    {
      n: 4, titulo: "Diferenciando os padrões de apego adulto", duracao: "11 min", slides: "8",
      objetivo: "Diferenciar apego ansioso, evitativo e desorganizado, conectando aos módulos de personalidade.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três padrões — cada um com uma assinatura relacional própria."]),
        seg("1:00–8:00", "Os 3 padrões (mostrar slide 8)", [
          "Apego ansioso: busca intensa de proximidade, medo de abandono.",
          "Apego evitativo: desconforto com intimidade, autossuficiência excessiva.",
          "Apego desorganizado: combinação contraditória de busca e medo do vínculo.",
        ]),
        seg("8:00–10:30", "A conexão com o Bloco 4", ["Esses padrões, quando consolidados em quadro completo, conectam diretamente aos Módulos 4.14, 4.17 e 4.18."]),
        seg("10:30–11:00", "Fechamento", [{ fala: "Próxima aula: os instrumentos que confirmam essa leitura com dado." }]),
      ],
    },
    {
      n: 5, titulo: "Instrumentos pra avaliar apego e adversidade precoce", duracao: "10 min", slides: "9",
      objetivo: "Saber quando usar ECR-R, AAI e ACE.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três instrumentos, três finalidades — do autorrelato à entrevista estruturada profunda."]),
        seg("1:00–4:30", "ECR-R", ["Autorrelato de padrão de apego em relações adultas."]),
        seg("4:30–7:30", "AAI", ["Entrevista estruturada mais profunda sobre narrativa de apego."]),
        seg("7:30–9:00", "ACE", ["Questionário de rastreio de adversidade na infância."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: colocamos tudo em prática — reconhecer o padrão e psicoeducar." }]),
      ],
    },
    {
      n: 6, titulo: "Aplicação — reconhecer o padrão e psicoeducar", duracao: "13 min", slides: "10, 11",
      objetivo: "Aplicar os passos 1 e 2 do modelo de aplicação clínica.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["A parte mais prática desse módulo. Hoje, os 2 primeiros passos."]),
        seg("1:00–2:00", "Visão geral (mostrar slide 10)", ["Reconhecer o padrão → Psicoeducar a origem → Usar a aliança terapêutica → Conectar ao protocolo certo."]),
        seg("2:00–7:00", "Passo 1 — Reconhecer o padrão (mostrar slide 11, esquerda)", ["Observe como o paciente se relaciona com o próprio terapeuta ao longo do tempo.", "Investigue narrativas sobre relações passadas em busca de temas recorrentes."]),
        seg("7:00–12:00", "Passo 2 — Psicoeducar a origem (mostrar slide 11, direita)", [{ fala: "Esse jeito de se relacionar começou muito cedo, como uma forma de se adaptar ao ambiente que você tinha — não é uma falha de caráter, é uma adaptação que pode ser atualizada agora." }]),
        seg("12:00–13:00", "Fechamento", [{ fala: "Próxima aula: usar a aliança terapêutica e conectar ao protocolo certo." }]),
      ],
    },
    {
      n: 7, titulo: "Aplicação — a relação terapêutica como ferramenta", duracao: "11 min", slides: "12",
      objetivo: "Trabalhar a relação terapêutica como experiência corretiva de apego.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Hoje fechamos o modelo com o uso ativo da própria relação terapêutica."]),
        seg("1:00–6:00", "Passo 3 — Usar a aliança terapêutica (mostrar slide 12, esquerda)", ["Mantenha consistência e previsibilidade.", "Nomeie, quando útil, os momentos em que o padrão aparece na própria sessão."]),
        seg("6:00–10:00", "Passo 4 — Conectar ao protocolo certo (mostrar slide 12, direita)", ["Apego ansioso consolidado: considerar Módulo 4.14.", "Apego evitativo consolidado: considerar Módulo 4.17.", "Padrões de casal: considerar Módulo 4.4."]),
        seg("10:00–11:00", "Fechamento", [{ fala: "Modelo completo. Próxima aula: um caso real e os critérios de quando escalar." }]),
      ],
    },
    {
      n: 8, titulo: "Estudo de caso, encaminhamento e recap", duracao: "14 min", slides: "13, 14, 15",
      objetivo: "Integrar todo o módulo num caso completo, com ênfase na conexão com os módulos de personalidade.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Última aula do módulo. Caso completo e os critérios de quando aprofundar ou referenciar."]),
        seg("1:00–6:00", "Estudo de caso (mostrar slide 13)", ["Leia a vinheta com calma.", "Percorra as 3 perguntas de discussão.", "Convide o aluno a pausar e responder por escrito."]),
        seg("6:00–10:00", "Quando encaminhar (mostrar slide 14)", ["Percorra os 4 critérios, com atenção à sobreposição com TEPT e transtornos de personalidade."]),
        seg("10:00–13:00", "Recapitulando o módulo (mostrar slide 15)", ["Retome os 4 pontos-chave.", "Reforce que esse módulo é pré-requisito direto pros Módulos 4.4, 4.14, 4.17 e 4.18."]),
        seg("13:00–14:00", "Fechamento do módulo", [{ fala: "Agora é hora dos exercícios e da avaliação. Te vejo no próximo módulo do Bloco 1." }]),
      ],
    },
  ];

  const totalMin = 12 + 10 + 12 + 11 + 10 + 13 + 11 + 14;

  const children = [
    ...doc.capa(KICKER, "Roteiro de Aulas — Desenvolvimento e Apego", "Módulo dividido em 8 vídeo-aulas de 10 a 15 minutos, seguindo os slides já produzidos. Cada aula tem roteiro cronometrado, pronto pra gravação."),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "Duração total do módulo em vídeo: ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: `${totalMin} minutos (${(totalMin / 60).toFixed(1)}h) em 8 aulas`, font: doc.FONT, size: 21, color: doc.INK })] }),
    doc.tituloH1("Mapa de aulas"),
    (function mapa() {
      const header = new doc.TableRow({
        children: [
          new doc.TableCell({ width: { size: 700, type: doc.WidthType.DXA }, shading: { type: doc.ShadingType.CLEAR, fill: doc.NAVY }, margins: { top: 100, bottom: 100, left: 100, right: 100 }, children: [new doc.Paragraph({ children: [new doc.TextRun({ text: "Aula", bold: true, color: "FFFFFF", font: doc.FONT, size: 18 })] })] }),
          new doc.TableCell({ width: { size: 4200, type: doc.WidthType.DXA }, shading: { type: doc.ShadingType.CLEAR, fill: doc.NAVY }, margins: { top: 100, bottom: 100, left: 100, right: 100 }, children: [new doc.Paragraph({ children: [new doc.TextRun({ text: "Título", bold: true, color: "FFFFFF", font: doc.FONT, size: 18 })] })] }),
          new doc.TableCell({ width: { size: 1200, type: doc.WidthType.DXA }, shading: { type: doc.ShadingType.CLEAR, fill: doc.NAVY }, margins: { top: 100, bottom: 100, left: 100, right: 100 }, children: [new doc.Paragraph({ children: [new doc.TextRun({ text: "Duração", bold: true, color: "FFFFFF", font: doc.FONT, size: 18 })] })] }),
          new doc.TableCell({ width: { size: 1200, type: doc.WidthType.DXA }, shading: { type: doc.ShadingType.CLEAR, fill: doc.NAVY }, margins: { top: 100, bottom: 100, left: 100, right: 100 }, children: [new doc.Paragraph({ children: [new doc.TextRun({ text: "Slides", bold: true, color: "FFFFFF", font: doc.FONT, size: 18 })] })] }),
          new doc.TableCell({ width: { size: 2050, type: doc.WidthType.DXA }, shading: { type: doc.ShadingType.CLEAR, fill: doc.NAVY }, margins: { top: 100, bottom: 100, left: 100, right: 100 }, children: [new doc.Paragraph({ children: [new doc.TextRun({ text: "Objetivo", bold: true, color: "FFFFFF", font: doc.FONT, size: 18 })] })] }),
        ],
      });
      const rows = aulas.map((a) => new doc.TableRow({
        children: [
          new doc.TableCell({ width: { size: 700, type: doc.WidthType.DXA }, margins: { top: 90, bottom: 90, left: 100, right: 100 }, children: [new doc.Paragraph({ children: [new doc.TextRun({ text: String(a.n), font: doc.FONT, size: 18, color: doc.INK })] })] }),
          new doc.TableCell({ width: { size: 4200, type: doc.WidthType.DXA }, margins: { top: 90, bottom: 90, left: 100, right: 100 }, children: [new doc.Paragraph({ children: [new doc.TextRun({ text: a.titulo, font: doc.FONT, size: 18, color: doc.INK, bold: true })] })] }),
          new doc.TableCell({ width: { size: 1200, type: doc.WidthType.DXA }, margins: { top: 90, bottom: 90, left: 100, right: 100 }, children: [new doc.Paragraph({ children: [new doc.TextRun({ text: a.duracao, font: doc.FONT, size: 18, color: doc.INK })] })] }),
          new doc.TableCell({ width: { size: 1200, type: doc.WidthType.DXA }, margins: { top: 90, bottom: 90, left: 100, right: 100 }, children: [new doc.Paragraph({ children: [new doc.TextRun({ text: a.slides, font: doc.FONT, size: 18, color: doc.INK })] })] }),
          new doc.TableCell({ width: { size: 2050, type: doc.WidthType.DXA }, margins: { top: 90, bottom: 90, left: 100, right: 100 }, children: [new doc.Paragraph({ children: [new doc.TextRun({ text: a.objetivo, font: doc.FONT, size: 18, color: doc.INK })] })] }),
        ],
      }));
      return new doc.Table({ width: { size: 9350, type: doc.WidthType.DXA }, columnWidths: [700, 4200, 1200, 1200, 2050], rows: [header, ...rows] });
    })(),
    new doc.Paragraph({ spacing: { before: 260 }, children: [new doc.TextRun({ text: "Como usar este roteiro: as falas entre aspas e em itálico são sugestões de texto pra ler quase literalmente. O resto são tópicos pra falar com suas próprias palavras.", italics: true, font: doc.FONT, size: 19, color: doc.MUTED })] }),
  ];

  aulas.forEach((aula) => {
    children.push(
      new doc.Paragraph({ children: [new doc.PageBreak()] }),
      new doc.Paragraph({ spacing: { after: 30 }, children: [new doc.TextRun({ text: `AULA ${aula.n} · ${aula.duracao.toUpperCase()}`, bold: true, color: doc.TERRA, font: doc.FONT, size: 18 })] }),
      new doc.Paragraph({ spacing: { after: 120 }, children: [new doc.TextRun({ text: aula.titulo, bold: true, color: doc.NAVY, font: doc.FONT_HEAD, size: 36 })] }),
      new doc.Paragraph({ spacing: { after: 40 }, children: [new doc.TextRun({ text: "Slides de apoio: ", bold: true, font: doc.FONT, size: 20, color: doc.NAVY }), new doc.TextRun({ text: aula.slides, font: doc.FONT, size: 20, color: doc.INK })] }),
      new doc.Paragraph({ spacing: { after: 40 }, children: [new doc.TextRun({ text: "Objetivo da aula: ", bold: true, font: doc.FONT, size: 20, color: doc.NAVY }), new doc.TextRun({ text: aula.objetivo, font: doc.FONT, size: 20, color: doc.INK })] }),
      new doc.Paragraph({ spacing: { before: 200, after: 60 }, border: { bottom: { style: doc.BorderStyle.SINGLE, size: 6, color: doc.NAVY, space: 4 } }, children: [new doc.TextRun({ text: "" })] })
    );
    aula.segmentos.forEach((s) => children.push(...s));
  });

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", `${RODAPE_DOC} — Roteiro de Aulas`, children), "Modulo-1.3-Roteiro-Aulas.docx");
}

// ============================================================
Promise.resolve()
  .then(construirDeck)
  .then(construirExercicios)
  .then(construirProva)
  .then(construirRoteiro)
  .then(() => console.log("TUDO PRONTO"))
  .catch((e) => { console.error(e); process.exit(1); });

const deck = require("../_lib/lib-deck.js");
const doc = require("../_lib/lib-doc.js");

const MOD = "4.20";
const NOME = "Transtorno Bipolar";
const RODAPE_DECK = `Transtorno Bipolar — Módulo ${MOD}`;
const RODAPE_DOC = `Módulo ${MOD} — Transtorno Bipolar`;
const KICKER = "MÓDULO 4.20 · PROTOCOLOS CLÍNICOS";

// ============================================================
// 1) SLIDE DECK
// ============================================================
function construirDeck() {
  const pres = deck.novaApresentacao(`${NOME} — Da Neurociência ao Protocolo Clínico`);

  deck.slideTitulo(pres, {
    moduloLabel: `Módulo ${MOD} · Protocolos Clínicos`,
    titulo: "Transtorno Bipolar",
    subtitulo: "Ritmo, recorrência e o limite da psicoterapia isolada",
    passos: ["Mecanismo", "Sinais", "Instrumento", "Protocolo", "Encaminhamento"],
  });

  deck.slideRoteiro(pres, {
    rodape: RODAPE_DECK, pageNum: 2,
    cards: [
      { titulo: "Mecanismo", desc: "Por que o cérebro fica mais sensível a cada episódio" },
      { titulo: "Sinais", desc: "Mania, hipomania e a fase que mais aparece na clínica" },
      { titulo: "Instrumento", desc: "MDQ, HCL-32 e YMRS na prática" },
      { titulo: "Protocolo", desc: "4 passos, centrados em ritmo e recaída precoce" },
      { titulo: "Encaminhamento", desc: "Por que farmacoterapia nunca é opcional aqui" },
    ],
  });

  deck.slideHook(pres, {
    rodape: RODAPE_DECK, pageNum: 3,
    frase: "No Transtorno Bipolar, cada episódio deixa o cérebro mais sensível ao próximo — é o chamado efeito kindling, e é por isso que prevenção de recaída pesa tanto quanto tratar o episódio atual.",
    apoio: "Essa é também a razão pela qual confundir Bipolar com Depressão Unipolar é um dos erros diagnósticos mais custosos da clínica: antidepressivo isolado pode precipitar um episódio de mania.",
  });

  deck.slideCircuito(pres, {
    rodape: RODAPE_DECK, pageNum: 4,
    titulo: "Por que o cérebro oscila entre polos tão distintos",
    regioes: [
      { label: "Estriado ventral (hiper-responsivo à recompensa na mania)", rx: 0.20, ry: 0.22, color: deck.TERRA, d: 0.5 },
      { label: "Córtex pré-frontal (regulação descendente insuficiente sobre o impulso)", rx: 0.22, ry: 0.62, color: deck.NAVY, d: 0.4 },
      { label: "Núcleo supraquiasmático (ritmo circadiano instável, gatilho e sintoma)", rx: 0.60, ry: 0.60, color: deck.NAVY_TINT, d: 0.36 },
      { label: "Efeito kindling (sensibilização progressiva a cada novo episódio)", rx: 0.58, ry: 0.24, color: deck.TERRA_TINT, d: 0.36 },
    ],
    notas: [
      "O estriado ventral, núcleo do sistema de recompensa, responde de forma amplificada durante episódios de mania/hipomania.",
      "O córtex pré-frontal não consegue regular esse impulso de forma suficiente, permitindo que a ativação do sistema de recompensa se traduza em comportamento.",
      "O núcleo supraquiasmático, regulador do ritmo circadiano, funciona de forma instável — privação de sono é tanto gatilho quanto sintoma precoce de episódio.",
    ],
  });

  deck.slideCadeia(pres, {
    rodape: RODAPE_DECK, pageNum: 5,
    titulo: "Do gatilho circadiano ao efeito kindling",
    elos: [
      { titulo: "Vulnerabilidade genética", desc: "Carga hereditária forte, uma das maiores entre os transtornos psiquiátricos" },
      { titulo: "Ruptura do ritmo social/sono", desc: "Eventos de vida que desregulam sono e rotina funcionam como gatilho" },
      { titulo: "Episódio de humor", desc: "Mania, hipomania ou depressão, conforme a polaridade predominante" },
      { titulo: "Efeito kindling", desc: "Cada episódio sensibiliza o cérebro, reduzindo o limiar pro próximo" },
    ],
    notaFinal: "É por isso que o Transtorno Bipolar tende a ter curso mais recorrente e mais grave quanto mais tempo passa sem tratamento adequado — a doença \"aprende\" a recorrer.",
  });

  deck.slideCategorias(pres, {
    rodape: RODAPE_DECK, pageNum: 6,
    titulo: "3 elementos centrais do quadro",
    categorias: [
      { titulo: "Episódios de mania/hipomania", desc: "Grandiosidade, energia excessiva, redução da necessidade de sono", color: deck.TERRA },
      { titulo: "Episódios depressivos", desc: "Dominam quantitativamente o curso, sobretudo no Tipo II", color: deck.NAVY },
      { titulo: "Instabilidade do ritmo circadiano", desc: "Gatilho e sintoma precoce, presente entre os episódios também", color: deck.NAVY_TINT },
    ],
    notaFinal: "Redução da necessidade de sono sem fadiga no dia seguinte é um dos sinais mais específicos de mania/hipomania — diferente de insônia, em que a pessoa quer dormir e não consegue.",
  });

  deck.slideSinais(pres, {
    rodape: RODAPE_DECK, pageNum: 7,
    titulo: "Como reconhecer o padrão na prática",
    itens: [
      { titulo: "Cognitivo", desc: "Pensamento acelerado e fuga de ideias na mania; lentificação na depressão" },
      { titulo: "Comportamental", desc: "Gastos impulsivos, hipersexualidade e projetos grandiosos em fase maníaca" },
      { titulo: "Relacional", desc: "Conflitos por decisões impulsivas; isolamento na fase depressiva" },
      { titulo: "Físico", desc: "Redução da necessidade de sono sem fadiga — sinal cardinal de mania" },
    ],
  });

  deck.slideDiferencial(pres, {
    rodape: RODAPE_DECK, pageNum: 8,
    titulo: "Diagnóstico diferencial rápido",
    cards: [
      { titulo: "Depressão Unipolar (Módulo 4.2)", desc: "Sempre investigar histórico de mania/hipomania antes de tratar como unipolar" },
      { titulo: "TDAH (Módulo 4.22)", desc: "TDAH é crônico e estável desde a infância; bipolar tem curso episódico" },
      { titulo: "TP Borderline (Módulo 4.14)", desc: "Borderline muda de humor em horas por gatilho interpessoal; bipolar tem episódios de dias/semanas" },
    ],
  });

  deck.slideInstrumentos(pres, {
    rodape: RODAPE_DECK, pageNum: 9,
    titulo: "Três instrumentos, três finalidades",
    instrumentos: [
      { sigla: "MDQ", nome: "Mood Disorder Questionnaire", desc: "Triagem rápida pra histórico de sintomas hipomaníacos/maníacos." },
      { sigla: "HCL-32", nome: "Hypomania Checklist", desc: "Detalha características e impacto funcional da hipomania." },
      { sigla: "YMRS", nome: "Young Mania Rating Scale", desc: "Mede gravidade de sintomas maníacos em curso." },
    ],
  });

  deck.slideProtocoloOverview(pres, {
    rodape: RODAPE_DECK, pageNum: 10,
    titulo: "Do mecanismo ao protocolo: 4 passos",
    passos: [
      { titulo: "Psicoeducação\ndo modelo", desc: "Vulnerabilidade-estresse e efeito kindling, explicados ao paciente" },
      { titulo: "Monitoramento\nde humor/ritmo", desc: "Mood chart e regularidade de sono e rotina (base do IPSRT)" },
      { titulo: "Pródromos\npessoais", desc: "Mapear os sinais de alerta específicos de cada paciente" },
      { titulo: "Manejo\nde gatilhos", desc: "Proteção do sono e redução de estimulação em risco de mania" },
    ],
    notaFinal: "A psicoterapia aqui é sempre adjuvante — estabilizadores de humor prescritos por psiquiatra são a primeira linha de tratamento, não uma opção alternativa.",
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 11,
    titulo: "Passos 1 e 2, na prática",
    colunas: [
      {
        numero: 1, titulo: "Psicoeducação do modelo",
        fala: "“Cada episódio deixa o cérebro um pouco mais sensível ao próximo — é por isso que proteger a rotina agora importa tanto quanto tratar o episódio de hoje.”",
        bullets: ["Explique o efeito kindling em linguagem acessível, sem gerar fatalismo", "Reforce que adesão à farmacoterapia reduz diretamente a frequência de novos episódios"],
      },
      {
        numero: 2, titulo: "Monitoramento de humor e ritmo",
        bullets: ["Use um mood chart diário (humor, horas de sono, eventos) como base de dados objetiva", "Baseado nos princípios da IPSRT — regularidade de rotina social protege contra recaída"],
      },
    ],
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 12,
    titulo: "Passos 3 e 4, na prática",
    colunas: [
      {
        numero: 3, titulo: "Pródromos pessoais",
        bullets: ["Ajude o paciente a identificar seus sinais de alerta específicos (ex: \"durmo menos e começo 3 projetos ao mesmo tempo\")", "Construa um plano de ação previamente combinado pra quando esses sinais aparecerem"],
      },
      {
        numero: 4, titulo: "Manejo de gatilhos",
        bullets: ["Proteja o sono ativamente em períodos de maior risco (viagens, mudanças de rotina, eventos estressantes)", "Reduza estimulação e decisões de grande impacto durante sinais prodrômicos de mania"],
      },
    ],
  });

  deck.slideCaso(pres, {
    rodape: RODAPE_DECK, pageNum: 13,
    vinheta: "Bruno, 31 anos, procura terapia após um episódio depressivo grave, já em tratamento com antidepressivo prescrito por outro profissional há 3 semanas, sem melhora. Ao investigar o histórico, ele relata dois períodos no último ano em que \"dormia 3 horas por noite e não sentia cansaço\", iniciou 4 projetos profissionais simultâneos, gastou uma quantia significativa em compras impulsivas, e se sentia \"capaz de qualquer coisa\" — episódios que ele nunca mencionou a nenhum profissional por não considerar um problema.",
    perguntas: [
      "Que elementos da vinheta sustentam a hipótese de Transtorno Bipolar, e não de Depressão Unipolar?",
      "Por que o uso isolado de antidepressivo, nesse caso, é uma preocupação clínica relevante?",
      "Que instrumento você aplicaria primeiro, e o que ele ajudaria a confirmar?",
    ],
  });

  deck.slideEncaminhamento(pres, {
    rodape: RODAPE_DECK, pageNum: 14,
    criterios: [
      "SEMPRE encaminhar para avaliação psiquiátrica — estabilizador de humor é primeira linha, a psicoterapia não substitui a farmacoterapia",
      "Risco de suicídio elevado, especialmente em episódios depressivos e estados mistos: ativar o protocolo do Módulo 4.9",
      "Sintomas psicóticos durante episódio maníaco ou risco de dano por comportamento impulsivo grave: encaminhamento emergencial",
      "Uso isolado de antidepressivo sem estabilizador de humor associado, quando há histórico de mania/hipomania não investigado",
    ],
  });

  deck.slideRecap(pres, {
    rodape: RODAPE_DECK, pageNum: 15,
    pontos: [
      "O efeito kindling explica por que cada episódio deixa o cérebro mais sensível ao próximo, tornando a prevenção de recaída central",
      "Episódios de mania/hipomania, episódios depressivos e instabilidade do ritmo circadiano são os 3 elementos centrais do quadro",
      "MDQ, HCL-32 e YMRS estruturam a triagem, o detalhamento e a gravidade dos sintomas",
      "O protocolo é sempre adjuvante à farmacoterapia — o encaminhamento psiquiátrico nunca é opcional",
    ],
    proximoTexto: "Próximo: exercícios práticos e avaliação do Módulo 4.20 →",
  });

  return pres.writeFile({ fileName: "Modulo-4.20-Transtorno-Bipolar.pptx" });
}

// ============================================================
// 2) EXERCÍCIOS
// ============================================================
function construirExercicios() {
  const children = [
    ...doc.capa(KICKER, "Exercícios — Transtorno Bipolar", "Resolva individualmente antes da sessão de supervisão. O objetivo é testar sua leitura do mecanismo e do protocolo antes de comparar com a discussão em grupo — não há problema em errar."),

    doc.exNum(1, "O mecanismo, em suas palavras"),
    doc.pergunta(1, "Explique em até 3 frases, sem jargão técnico, o que é o efeito kindling e por que ele torna a prevenção de recaída tão importante."),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Por que redução da necessidade de sono sem fadiga é considerada um sinal mais específico de mania do que insônia comum?"),
    ...doc.linhaResposta(2),

    doc.exNum(2, "Diagnóstico diferencial"),
    doc.vinhetaBox("Um paciente em tratamento para depressão relata, ao ser questionado ativamente, dois períodos no último ano de energia muito elevada, pouca necessidade de sono e múltiplos projetos simultâneos, que ele nunca mencionou por não considerar um problema."),
    doc.pergunta(1, "Por que investigar histórico de hipomania/mania é essencial antes de iniciar antidepressivo isolado?"),
    ...doc.linhaResposta(2),

    doc.exNum(3, "Instrumentos"),
    doc.tabelaSimples(["Instrumento", "Quando usar"], [["MDQ", ""], ["HCL-32", ""], ["YMRS", ""]], [2600, 6750]),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),

    doc.exNum(4, "Mapeando pródromos"),
    doc.p("Liste 3 exemplos de sinais prodrômicos pessoais que um paciente poderia usar como alerta precoce de episódio maníaco."),
    doc.tabelaSimples(["Nº", "Sinal prodrômico"], [["1", ""], ["2", ""], ["3", ""]], [1200, 8150]),

    doc.exNum(5, "Caso integrado — Bruno"),
    doc.vinhetaBox("Bruno, 31 anos, em tratamento com antidepressivo há 3 semanas sem melhora, relata dois episódios no último ano de pouca necessidade de sono, múltiplos projetos simultâneos e gastos impulsivos, nunca mencionados antes."),
    doc.pergunta(1, "Que elementos sustentam a hipótese de Transtorno Bipolar, e não Depressão Unipolar?"),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Que passo do protocolo você priorizaria na primeira sessão com Bruno?"),
    ...doc.linhaResposta(2),
    doc.pergunta(3, "Que encaminhamento é obrigatório nesse caso, independente de qualquer outro fator?"),
    ...doc.linhaResposta(1),
  ];

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-4.20-Exercicios.docx");
}

// ============================================================
// 3) AVALIAÇÃO
// ============================================================
function construirProva() {
  const objetivas = [
    ["O \"efeito kindling\", no Transtorno Bipolar, descreve:", ["A sensibilização progressiva do cérebro a cada novo episódio de humor", "Uma técnica de tratamento farmacológico específica", "A ausência completa de qualquer padrão de recorrência", "Um efeito exclusivo de episódios depressivos, nunca maníacos"]],
    ["O estriado ventral, durante episódios de mania, tende a apresentar:", ["Resposta hiper-responsiva à recompensa", "Resposta reduzida a qualquer estímulo", "Nenhuma alteração relevante em relação à população geral", "Hiperfunção exclusivamente durante o sono"]],
    ["Os 3 elementos centrais do Transtorno Bipolar são:", ["Episódios de mania/hipomania, episódios depressivos, instabilidade do ritmo circadiano", "Grandiosidade, necessidade de admiração, falta de empatia", "Hipersensibilidade à crítica, sentimento de inadequação, inibição social", "Desconsideração por normas, falta de remorso, impulsividade"]],
    ["Redução da necessidade de sono sem fadiga no dia seguinte é sinal específico de:", ["Mania/hipomania", "Insônia primária", "Depressão unipolar", "TDAH exclusivamente"]],
    ["Instrumento de triagem rápida pra histórico de sintomas hipomaníacos/maníacos:", ["MDQ (Mood Disorder Questionnaire)", "PCL-R", "Y-BOCS", "ISI"]],
    ["O que diferencia Transtorno Bipolar de TP Borderline?", ["Não há diferença clínica relevante entre eles", "Borderline muda de humor em horas por gatilho interpessoal; bipolar tem episódios de dias/semanas", "Bipolar sempre envolve autolesão crônica", "Borderline nunca envolve instabilidade de humor"]],
    ["Por que confundir Bipolar com Depressão Unipolar é um erro diagnóstico particularmente custoso?", ["Porque antidepressivo isolado, sem estabilizador de humor, pode precipitar um episódio de mania", "Porque os dois transtornos têm tratamento idêntico", "Porque Depressão Unipolar nunca responde a nenhum tratamento", "Porque não há qualquer risco associado a esse erro"]],
    ["A base teórica do passo \"monitoramento de humor e ritmo\" vem principalmente de:", ["IPSRT (Terapia Interpessoal e de Ritmo Social)", "Terapia de Exposição e Prevenção de Resposta", "Terapia do Esquema", "Dessensibilização e Reprocessamento por Movimentos Oculares"]],
    ["Diante de um paciente com Transtorno Bipolar, a psicoterapia deve ser entendida como:", ["Adjuvante à farmacoterapia, nunca substituta do estabilizador de humor", "Suficiente isoladamente, sem necessidade de acompanhamento psiquiátrico", "Contraindicada nesse transtorno", "Necessária apenas durante episódios depressivos"]],
    ["Diante de sintomas psicóticos durante episódio maníaco, o protocolo recomenda:", ["Encaminhamento emergencial", "Aguardar a próxima sessão agendada, sem intervenção imediata", "Ignorar, pois é esperado nesse quadro", "Reduzir a frequência das sessões automaticamente"]],
  ];
  const gabaritoObjetivas = ["a", "a", "a", "a", "a", "b", "a", "a", "a", "a"];

  const children = [
    ...doc.capa(KICKER, "Avaliação — Transtorno Bipolar", `Avaliação formativa de encerramento do Módulo ${MOD}.`),
    doc.infoBox([
      ["Nota de corte:", "75 de 100 pontos (nota mais alta, dada a relevância da avaliação de risco e do encaminhamento psiquiátrico)"],
      ["Tempo sugerido:", "45 minutos"],
      ["Composição:", "10 questões objetivas (6 pts cada = 60 pts) + 1 questão de caso (40 pts)"],
      ["Consulta:", "Material da aula permitido; discussão entre colegas, não"],
    ]),
    doc.tituloH1("Parte 1 — Questões objetivas"),
  ];
  objetivas.forEach((q, i) => children.push(...doc.questaoObjetiva(i + 1, q[0], q[1])));

  children.push(
    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    doc.tituloH1("Parte 2 — Questão de caso (40 pontos)"),
    doc.vinhetaBox("Camila, 27 anos, é encaminhada após uma tentativa de suicídio durante um episódio depressivo grave. Ao investigar o histórico, relata dois episódios anteriores, não tratados, em que \"não dormia quase nada por dias, me sentia genial, e tomava decisões que depois me arrependia muito\", incluindo um pedido de demissão impulsivo. Está atualmente sem nenhum acompanhamento psiquiátrico."),
    new doc.Paragraph({ spacing: { before: 240 }, children: [new doc.TextRun({ text: "Com base no protocolo estudado, responda:", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    new doc.Paragraph({ spacing: { before: 220, after: 40 }, children: [new doc.TextRun({ text: "a) (10 pts) Que elementos da vinheta sustentam a hipótese de Transtorno Bipolar?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "b) (10 pts) Qual deveria ser a prioridade clínica absoluta diante da tentativa de suicídio recente?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "c) (10 pts) Por que o encaminhamento psiquiátrico é obrigatório e urgente nesse caso?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "d) (10 pts) Que instrumento ajudaria a documentar a gravidade e o histórico dos episódios de Camila?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    new doc.Paragraph({ spacing: { after: 40 }, children: [new doc.TextRun({ text: "USO EXCLUSIVO DO INSTRUTOR — remover antes de aplicar a prova", bold: true, color: doc.TERRA, font: doc.FONT, size: 20 })] }),
    doc.tituloH1("Gabarito"),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 1 — Questões objetivas", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 200 }, children: [new doc.TextRun({ text: gabaritoObjetivas.map((r, i) => `${i + 1}-${r}`).join("   ·   "), font: doc.FONT, size: 22, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 2 — Critério de correção da questão de caso", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "a) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Dois episódios prévios com redução importante da necessidade de sono, grandiosidade (\"me sentia genial\") e decisões impulsivas de alto impacto (demissão) — padrão episódico compatível com mania/hipomania não tratada.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "b) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Avaliação de risco formal e ativação do protocolo do Módulo 4.9 — a tentativa de suicídio recente exige avaliação de segurança imediata, antes de qualquer outro passo.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "c) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Porque estabilizador de humor é a primeira linha de tratamento nesse quadro, e Camila está sem qualquer acompanhamento psiquiátrico — a psicoterapia isolada não é suficiente nem substitui a farmacoterapia.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "d) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "MDQ, como triagem inicial de histórico de sintomas hipomaníacos/maníacos, complementado por HCL-32 pra detalhar o impacto funcional dos episódios relatados.", font: doc.FONT, size: 21, color: doc.INK })] }),
  );

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-4.20-Avaliacao.docx");
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
      n: 1, titulo: "O efeito kindling e por que a prevenção importa tanto", duracao: "12 min", slides: "1, 2, 3, 4",
      objetivo: "Sair sabendo explicar o mecanismo do Transtorno Bipolar sem jargão, e o risco de confundi-lo com depressão unipolar.",
      segmentos: [
        seg("0:00–0:45", "Abertura (gancho)", [{ fala: "No Transtorno Bipolar, cada episódio deixa o cérebro mais sensível ao próximo — é o chamado efeito kindling, e é por isso que prevenção de recaída pesa tanto quanto tratar o episódio atual." }]),
        seg("0:45–2:00", "Por que isso importa clinicamente", ["Confundir Bipolar com Depressão Unipolar é um dos erros diagnósticos mais custosos.", "Antidepressivo isolado pode precipitar um episódio de mania."]),
        seg("2:00–8:00", "Por que o cérebro oscila entre polos tão distintos (mostrar slide 4)", [
          "Estriado ventral hiper-responsivo à recompensa na mania.",
          "Córtex pré-frontal com regulação descendente insuficiente.",
          "Núcleo supraquiasmático com ritmo circadiano instável.",
          "Efeito kindling: sensibilização progressiva a cada novo episódio.",
        ]),
        seg("8:00–10:30", "Um ponto importante", ["Isso explica por que o curso tende a piorar quanto mais tempo passa sem tratamento adequado."]),
        seg("10:30–12:00", "Fechamento", [{ fala: "Próxima aula: como o gatilho circadiano se conecta ao ciclo de episódios." }]),
      ],
    },
    {
      n: 2, titulo: "Do gatilho circadiano ao efeito kindling", duracao: "10 min", slides: "5",
      objetivo: "Explicar a cadeia entre vulnerabilidade genética, ruptura de ritmo e recorrência de episódios.",
      segmentos: [
        seg("0:00–1:00", "Retomada rápida", ["Vimos as estruturas envolvidas. Hoje vemos como o padrão se consolida ao longo do curso do transtorno."]),
        seg("1:00–6:30", "A cadeia (mostrar slide 5)", ["Vulnerabilidade genética, uma das mais fortes entre transtornos psiquiátricos.", "Ruptura do ritmo social/sono como gatilho.", "Episódio de humor, conforme a polaridade predominante.", "Efeito kindling: cada episódio reduz o limiar pro próximo."]),
        seg("6:30–9:00", "Por que isso muda a prática clínica", ["A doença \"aprende\" a recorrer — tratamento precoce e consistente tem valor preventivo real."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: os 3 elementos centrais do quadro." }]),
      ],
    },
    {
      n: 3, titulo: "Os 3 elementos centrais", duracao: "10 min", slides: "6",
      objetivo: "Reconhecer episódios de mania/hipomania, episódios depressivos e instabilidade do ritmo circadiano.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três elementos — e um sinal físico particularmente específico."]),
        seg("1:00–7:00", "Os 3 elementos (mostrar slide 6)", [
          "Episódios de mania/hipomania: grandiosidade, energia excessiva, redução da necessidade de sono.",
          "Episódios depressivos: dominam quantitativamente o curso, sobretudo no Tipo II.",
          "Instabilidade do ritmo circadiano: gatilho e sintoma precoce.",
        ]),
        seg("7:00–9:00", "O sinal mais específico", ["Redução da necessidade de sono sem fadiga — diferente de insônia, em que a pessoa quer dormir e não consegue."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: como reconhecer esse padrão nas 4 dimensões clínicas." }]),
      ],
    },
    {
      n: 4, titulo: "Sinais de alerta", duracao: "10 min", slides: "7",
      objetivo: "Reconhecer sinais cognitivos, comportamentais, relacionais e físicos do Transtorno Bipolar.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Reconhecer o padrão com precisão orienta a investigação diagnóstica ativa."]),
        seg("1:00–7:30", "As 4 categorias (mostrar slide 7)", [
          "Cognitivo: pensamento acelerado e fuga de ideias na mania; lentificação na depressão.",
          "Comportamental: gastos impulsivos, hipersexualidade, projetos grandiosos.",
          "Relacional: conflitos por decisões impulsivas; isolamento na fase depressiva.",
          "Físico: redução da necessidade de sono sem fadiga.",
        ]),
        seg("7:30–9:00", "Por que isso importa", ["Muitos pacientes só relatam esses sinais quando ativamente questionados — a hipomania raramente é vista como problema."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: como diferenciar de quadros parecidos." }]),
      ],
    },
    {
      n: 5, titulo: "Diagnóstico diferencial rápido", duracao: "11 min", slides: "8",
      objetivo: "Diferenciar Transtorno Bipolar de Depressão Unipolar, TDAH e TP Borderline.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Um filtro rápido — a diferenciação com depressão unipolar é a mais crítica clinicamente."]),
        seg("1:00–8:00", "Os 3 comparativos (mostrar slide 8)", [
          "Depressão Unipolar: sempre investigar histórico de mania/hipomania antes de tratar como unipolar.",
          "TDAH: crônico e estável desde a infância; bipolar tem curso episódico.",
          "TP Borderline: muda de humor em horas por gatilho interpessoal; bipolar tem episódios de dias/semanas.",
        ]),
        seg("8:00–10:30", "Por que a primeira diferenciação é tão crítica", ["Erro nessa distinção pode levar a tratamento que precipita mania."]),
        seg("10:30–11:00", "Fechamento", [{ fala: "Próxima aula: os instrumentos que confirmam essa leitura com dado." }]),
      ],
    },
    {
      n: 6, titulo: "Os 3 instrumentos de avaliação", duracao: "11 min", slides: "9",
      objetivo: "Saber quando usar MDQ, HCL-32 e YMRS.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três instrumentos, três finalidades — do rastreio histórico à gravidade em curso."]),
        seg("1:00–4:30", "MDQ", ["Triagem rápida pra histórico de sintomas hipomaníacos/maníacos."]),
        seg("4:30–7:30", "HCL-32", ["Detalha características e impacto funcional da hipomania."]),
        seg("7:30–10:00", "YMRS", ["Mede gravidade de sintomas maníacos em curso."]),
        seg("10:00–11:00", "Fechamento", [{ fala: "Próxima aula: colocamos tudo em prática — psicoeducação e monitoramento." }]),
      ],
    },
    {
      n: 7, titulo: "Protocolo — psicoeducação e monitoramento de ritmo", duracao: "13 min", slides: "10, 11",
      objetivo: "Aplicar os passos 1 e 2 do protocolo, com foco em ritmo social e adesão à farmacoterapia.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["A parte prática central desse módulo. Hoje, os 2 primeiros passos."]),
        seg("1:00–2:00", "Visão geral (mostrar slide 10)", ["Psicoeducação do modelo → Monitoramento de humor/ritmo → Pródromos pessoais → Manejo de gatilhos.", "A psicoterapia aqui é sempre adjuvante à farmacoterapia."]),
        seg("2:00–7:00", "Passo 1 — Psicoeducação do modelo (mostrar slide 11, esquerda)", [{ fala: "Cada episódio deixa o cérebro um pouco mais sensível ao próximo — é por isso que proteger a rotina agora importa tanto quanto tratar o episódio de hoje." }]),
        seg("7:00–12:00", "Passo 2 — Monitoramento de humor e ritmo (mostrar slide 11, direita)", ["Use um mood chart diário como base de dados objetiva.", "Baseado nos princípios da IPSRT — regularidade de rotina social protege contra recaída."]),
        seg("12:00–13:00", "Fechamento", [{ fala: "Próxima aula: pródromos pessoais e manejo de gatilhos." }]),
      ],
    },
    {
      n: 8, titulo: "Protocolo — pródromos pessoais e manejo de gatilhos", duracao: "13 min", slides: "12",
      objetivo: "Trabalhar identificação precoce de sinais de alerta e proteção ativa do sono.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Hoje fechamos o protocolo com o trabalho de prevenção mais direto."]),
        seg("1:00–7:00", "Passo 3 — Pródromos pessoais (mostrar slide 12, esquerda)", ["Ajude o paciente a identificar seus sinais de alerta específicos.", "Construa um plano de ação previamente combinado pra quando esses sinais aparecerem."]),
        seg("7:00–13:00", "Passo 4 — Manejo de gatilhos (mostrar slide 12, direita)", ["Proteja o sono ativamente em períodos de maior risco.", "Reduza estimulação e decisões de grande impacto durante sinais prodrômicos."]),
        seg("13:00–13:00", "Fechamento", [{ fala: "Protocolo completo. Próxima aula: um caso real e os critérios de quando escalar." }]),
      ],
    },
    {
      n: 9, titulo: "Estudo de caso, encaminhamento e recap", duracao: "15 min", slides: "13, 14, 15",
      objetivo: "Integrar mecanismo, instrumento e protocolo num caso completo, com ênfase no encaminhamento psiquiátrico obrigatório.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Última aula do módulo. Caso completo e os critérios de escalonamento que aqui são regra, não exceção."]),
        seg("1:00–7:00", "Estudo de caso — Bruno (mostrar slide 13)", ["Leia a vinheta com calma.", "Percorra as 3 perguntas de discussão.", "Convide o aluno a pausar e responder por escrito."]),
        seg("7:00–11:00", "Quando encaminhar (mostrar slide 14)", ["Percorra os 4 critérios — reforce que encaminhamento psiquiátrico nunca é opcional aqui."]),
        seg("11:00–14:00", "Recapitulando o módulo (mostrar slide 15)", ["Retome os 4 pontos-chave.", "Reforce a reformulação central: prevenção de recaída pesa tanto quanto tratar o episódio atual."]),
        seg("14:00–15:00", "Fechamento do módulo", [{ fala: "Agora é hora dos exercícios e da avaliação. Te vejo no próximo protocolo." }]),
      ],
    },
  ];

  const totalMin = 12 + 10 + 10 + 10 + 11 + 11 + 13 + 13 + 15;

  const children = [
    ...doc.capa(KICKER, "Roteiro de Aulas — Transtorno Bipolar", "Módulo dividido em 9 vídeo-aulas de 10 a 15 minutos, seguindo os slides já produzidos. Cada aula tem roteiro cronometrado, pronto pra gravação."),
    new doc.Paragraph({
      spacing: { before: 60, after: 200 },
      children: [new doc.TextRun({
        text: "Nota importante: este módulo trata de manejo clínico com componente relevante de avaliação de risco e encaminhamento psiquiátrico obrigatório. Recomenda-se supervisão específica antes de conduzir atendimentos desse perfil de forma independente.",
        italics: true, bold: true, color: doc.TERRA, font: doc.FONT, size: 20,
      })],
    }),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "Duração total do módulo em vídeo: ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: `${totalMin} minutos (${(totalMin / 60).toFixed(1)}h) em 9 aulas`, font: doc.FONT, size: 21, color: doc.INK })] }),
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

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", `${RODAPE_DOC} — Roteiro de Aulas`, children), "Modulo-4.20-Roteiro-Aulas.docx");
}

// ============================================================
Promise.resolve()
  .then(construirDeck)
  .then(construirExercicios)
  .then(construirProva)
  .then(construirRoteiro)
  .then(() => console.log("TUDO PRONTO"))
  .catch((e) => { console.error(e); process.exit(1); });

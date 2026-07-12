const deck = require("../_lib/lib-deck.js");
const doc = require("../_lib/lib-doc.js");

const MOD = "2.5";
const NOME = "Escalas de Rastreio e Gravidade por Quadro Clínico";
const RODAPE_DECK = `Escalas de Rastreio — Módulo ${MOD}`;
const RODAPE_DOC = `Módulo ${MOD} — Escalas de Rastreio`;
const KICKER = "MÓDULO 2.5 · PSICODIAGNÓSTICO E AVALIAÇÃO NEUROPSICOLÓGICA";

// ============================================================
// 1) SLIDE DECK
// ============================================================
function construirDeck() {
  const pres = deck.novaApresentacao(`${NOME} — O Kit de Instrumentos do Bloco 4`);

  deck.slideTitulo(pres, {
    moduloLabel: `Módulo ${MOD} · Bloco 2 · Avaliação`,
    titulo: "Escalas de Rastreio",
    subtitulo: "O kit organizado por demanda, pronto pra usar em cada protocolo do Bloco 4",
    passos: ["Humor", "Quadros específicos", "Risco", "Relacionamento", "Uso longitudinal"],
  });

  deck.slideRoteiro(pres, {
    rodape: RODAPE_DECK, pageNum: 2,
    cards: [
      { titulo: "Depressão e ansiedade", desc: "BDI-II, PHQ-9, HAM-D, BAI, GAD-7, HAM-A" },
      { titulo: "Quadros específicos", desc: "Y-BOCS, PCL-5, IES-R, MBI, AUDIT, DAST-10" },
      { titulo: "Relacionamento e risco", desc: "Escala de Ajustamento Diádico, C-SSRS, BSI" },
      { titulo: "Uso longitudinal", desc: "Da triagem inicial ao acompanhamento de evolução" },
      { titulo: "Aplicação prática", desc: "Conecta diretamente aos 27 módulos do Bloco 4" },
    ],
  });

  deck.slideHook(pres, {
    rodape: RODAPE_DECK, pageNum: 3,
    frase: "Uma escala aplicada uma única vez é uma fotografia; aplicada repetidamente ao longo do tratamento, ela vira um filme da evolução real do paciente.",
    apoio: "Esse módulo não introduz escalas novas — organiza, por demanda, todas as que já foram citadas ao longo dos protocolos do Bloco 4, com foco no uso prático e longitudinal.",
  });

  deck.slideCircuito(pres, {
    rodape: RODAPE_DECK, pageNum: 4,
    titulo: "4 momentos de uso de uma escala no tratamento",
    regioes: [
      { label: "Triagem inicial (primeira sessão, antes de fechar hipótese)", rx: 0.20, ry: 0.22, color: deck.NAVY, d: 0.5 },
      { label: "Confirmação de gravidade (define intensidade do protocolo)", rx: 0.22, ry: 0.62, color: deck.TERRA, d: 0.4 },
      { label: "Acompanhamento periódico (monitora evolução ao longo do tratamento)", rx: 0.60, ry: 0.60, color: deck.NAVY_TINT, d: 0.36 },
      { label: "Encerramento/alta (confirma resolução objetiva do quadro)", rx: 0.58, ry: 0.24, color: deck.TERRA_TINT, d: 0.36 },
    ],
    notas: [
      "A triagem inicial orienta se vale a pena aprofundar a investigação de um quadro específico.",
      "A confirmação de gravidade ajuda a calibrar a intensidade da intervenção — leve, moderada ou grave exigem abordagens diferentes.",
      "O acompanhamento periódico transforma a escala numa ferramenta de dado objetivo de progresso, não apenas de diagnóstico inicial.",
    ],
  });

  deck.slideCadeia(pres, {
    rodape: RODAPE_DECK, pageNum: 5,
    titulo: "Do escore inicial à decisão clínica",
    elos: [
      { titulo: "Aplicação inicial", desc: "Estabelece a linha de base antes de iniciar o protocolo clínico" },
      { titulo: "Reaplicação periódica", desc: "A cada 4 a 8 semanas, conforme o quadro e o protocolo em curso" },
      { titulo: "Comparação de escores", desc: "A mudança numérica é um dado objetivo, além da percepção subjetiva" },
      { titulo: "Decisão clínica", desc: "Ajustar, manter ou encerrar a intervenção com base em evidência concreta" },
    ],
    notaFinal: "Sem essa reaplicação periódica, a avaliação de progresso fica apoiada só na impressão clínica — útil, mas mais sujeita a viés do que o dado objetivo.",
  });

  deck.slideCategorias(pres, {
    rodape: RODAPE_DECK, pageNum: 6,
    titulo: "3 grandes grupos de escalas",
    categorias: [
      { titulo: "Humor", desc: "BDI-II/PHQ-9/HAM-D (depressão), BAI/GAD-7/HAM-A (ansiedade)", color: deck.NAVY },
      { titulo: "Quadros específicos", desc: "Y-BOCS (TOC), PCL-5/IES-R (trauma), MBI (burnout), AUDIT/DAST-10 (adicções)", color: deck.TERRA },
      { titulo: "Relacionamento e risco", desc: "Escala de Ajustamento Diádico (casal), C-SSRS/BSI (risco de suicídio)", color: deck.NAVY_TINT },
    ],
    notaFinal: "Cada uma dessas escalas já foi apresentada em seu módulo específico do Bloco 4 — aqui, a organização é por finalidade de uso, não por quadro isolado.",
  });

  deck.slideSinais(pres, {
    rodape: RODAPE_DECK, pageNum: 7,
    titulo: "Como as escalas se agrupam por finalidade",
    itens: [
      { titulo: "Autorrelato rápido", desc: "PHQ-9, GAD-7 — poucos minutos, ideal pra primeira sessão e rastreio amplo" },
      { titulo: "Aplicada por entrevistador", desc: "HAM-D, HAM-A — mais detalhada, exige treinamento específico" },
      { titulo: "Específica de quadro", desc: "Y-BOCS, MBI, AUDIT — mede a gravidade de um quadro já hipotetizado" },
      { titulo: "Risco imediato", desc: "C-SSRS — exige ação clínica direta, não apenas registro (Módulo 4.9)" },
    ],
  });

  deck.slideDiferencial(pres, {
    rodape: RODAPE_DECK, pageNum: 8,
    titulo: "Escala curta versus escala longa: quando usar cada uma",
    cards: [
      { titulo: "Autorrelato curto (PHQ-9, GAD-7)", desc: "Triagem inicial rápida, acompanhamento frequente entre sessões" },
      { titulo: "Aplicada por entrevistador (HAM-D, HAM-A)", desc: "Maior precisão, útil quando há dúvida diagnóstica relevante" },
      { titulo: "Específica de quadro (Y-BOCS, MBI)", desc: "Só depois que a hipótese diagnóstica já está razoavelmente definida" },
    ],
  });

  deck.slideInstrumentos(pres, {
    rodape: RODAPE_DECK, pageNum: 9,
    titulo: "Três exemplos, três lógicas de aplicação",
    instrumentos: [
      { sigla: "PHQ-9 / GAD-7", nome: "Autorrelato ultrarrápido", desc: "Poucos minutos, ideal pra triagem ampla e acompanhamento frequente." },
      { sigla: "HAM-D / HAM-A", nome: "Aplicada por entrevistador", desc: "Mais detalhada e precisa, exige treinamento específico de aplicação." },
      { sigla: "C-SSRS", nome: "Risco imediato", desc: "Exige ação clínica direta assim que aplicada — nunca é só registro passivo." },
    ],
  });

  deck.slideProtocoloOverview(pres, {
    rodape: RODAPE_DECK, pageNum: 10,
    titulo: "Do escore ao uso clínico real: 4 passos",
    passos: [
      { titulo: "Selecionar a\nescala certa", desc: "Com base no quadro suspeito, revisando o módulo correspondente do Bloco 4" },
      { titulo: "Aplicar na\nlinha de base", desc: "Antes de iniciar qualquer intervenção, pra ter ponto de comparação real" },
      { titulo: "Reaplicar\nperiodicamente", desc: "Em intervalos regulares ao longo do tratamento" },
      { titulo: "Usar o dado\nobjetivo", desc: "A mudança de escore orienta ajuste, manutenção ou encerramento" },
    ],
    notaFinal: "Esse é o fechamento direto do ciclo iniciado no Módulo 2.1 — da entrevista à escala, e da escala de volta ao plano terapêutico (Módulo 2.6).",
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 11,
    titulo: "Passos 1 e 2, na prática",
    colunas: [
      {
        numero: 1, titulo: "Selecionar a escala certa",
        bullets: ["Revise o módulo correspondente do Bloco 4 pra confirmar qual escala é a referência daquele quadro", "Evite aplicar escalas \"por hábito\", sem relação com a hipótese diagnóstica em curso"],
      },
      {
        numero: 2, titulo: "Aplicar na linha de base",
        fala: "“Vamos usar esse questionário agora, antes de começarmos o trabalho, pra ter um ponto de partida claro pra acompanhar sua evolução.”",
        bullets: ["Aplique antes de qualquer intervenção do protocolo escolhido, não depois de já ter começado"],
      },
    ],
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 12,
    titulo: "Passos 3 e 4, na prática",
    colunas: [
      {
        numero: 3, titulo: "Reaplicar periodicamente",
        bullets: ["Defina um intervalo regular (geralmente 4 a 8 semanas), conforme o protocolo em curso", "Use o mesmo instrumento nas reaplicações, pra manter a comparação válida"],
      },
      {
        numero: 4, titulo: "Usar o dado objetivo",
        bullets: ["Compare os escores ao longo do tempo, não apenas a impressão clínica isolada", "Ausência de melhora após reaplicações sucessivas sugere revisar o plano terapêutico"],
      },
    ],
  });

  deck.slideCaso(pres, {
    rodape: RODAPE_DECK, pageNum: 13,
    vinheta: "Um paciente em tratamento para Transtorno de Pânico (Módulo 4.25) há 8 semanas relata \"se sentir melhor\", mas a reaplicação do PDSS mostra escore quase idêntico ao da linha de base inicial.",
    perguntas: [
      "Como você conduziria essa discrepância entre percepção subjetiva e dado objetivo na sessão?",
      "Que decisões clínicas essa discrepância poderia orientar?",
      "Por que o uso do mesmo instrumento nas reaplicações é importante pra essa comparação ser válida?",
    ],
  });

  deck.slideEncaminhamento(pres, {
    rodape: RODAPE_DECK, pageNum: 14,
    criterios: [
      "Pontuação de risco na C-SSRS: ativar imediatamente o protocolo do Módulo 4.9, sem aguardar próxima sessão",
      "Ausência de melhora após múltiplas reaplicações: reavaliar diagnóstico e protocolo em curso",
      "Discrepância significativa entre relato subjetivo e escore objetivo: investigar ativamente na sessão",
      "Escore sugerindo gravidade além do que o protocolo psicológico isolado costuma resolver: considerar encaminhamento complementar (Bloco 3)",
    ],
  });

  deck.slideRecap(pres, {
    rodape: RODAPE_DECK, pageNum: 15,
    pontos: [
      "Uma escala reaplicada ao longo do tempo vira um dado objetivo de progresso, não só um retrato diagnóstico único",
      "As escalas se organizam em 3 grandes grupos: humor, quadros específicos, e relacionamento/risco",
      "Autorrelato rápido, aplicação por entrevistador e escala de risco imediato têm lógicas de uso distintas",
      "O ciclo se fecha aqui: da entrevista (Módulo 2.1) à escala, e da escala de volta ao plano terapêutico (Módulo 2.6)",
    ],
    proximoTexto: "Próximo: exercícios práticos e avaliação do Módulo 2.5 →",
  });

  return pres.writeFile({ fileName: "Modulo-2.5-Escalas-Rastreio.pptx" });
}

// ============================================================
// 2) EXERCÍCIOS
// ============================================================
function construirExercicios() {
  const children = [
    ...doc.capa(KICKER, "Exercícios — Escalas de Rastreio", "Resolva individualmente antes da sessão de supervisão. O objetivo é testar sua organização do kit de escalas antes de comparar com a discussão em grupo — não há problema em errar."),

    doc.exNum(1, "Organizando o kit"),
    doc.tabelaSimples(["Demanda clínica", "Escala(s) de referência"], [["Depressão", ""], ["Ansiedade", ""], ["TOC", ""], ["Trauma", ""], ["Burnout", ""], ["Adicções", ""], ["Casal", ""], ["Risco de suicídio", ""]], [4600, 4550]),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),

    doc.exNum(2, "Escala curta versus longa"),
    doc.pergunta(1, "Em que situação você optaria por PHQ-9 em vez de HAM-D, e vice-versa?"),
    ...doc.linhaResposta(2),

    doc.exNum(3, "Uso longitudinal"),
    doc.vinhetaBox("Um paciente relata melhora subjetiva, mas o escore da escala reaplicada permanece praticamente idêntico ao da linha de base."),
    doc.pergunta(1, "Como você conduziria essa discrepância na sessão?"),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Que decisões clínicas essa discrepância poderia orientar?"),
    ...doc.linhaResposta(2),

    doc.exNum(4, "Caso integrado"),
    doc.vinhetaBox("Um paciente em tratamento para Transtorno de Pânico há 8 semanas relata se sentir melhor, mas a reaplicação do PDSS mostra escore quase idêntico ao inicial."),
    doc.pergunta(1, "Por que o uso do mesmo instrumento nas reaplicações é importante pra essa comparação ser válida?"),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Que passo do protocolo estudado orienta a decisão clínica nesse momento?"),
    ...doc.linhaResposta(2),
  ];

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-2.5-Exercicios.docx");
}

// ============================================================
// 3) AVALIAÇÃO
// ============================================================
function construirProva() {
  const objetivas = [
    ["Os 4 momentos de uso de uma escala no tratamento são:", ["Triagem inicial, confirmação de gravidade, acompanhamento periódico, encerramento/alta", "Grandiosidade, necessidade de admiração, falta de empatia, impulsividade", "Compreensão verbal, organização perceptual, memória de trabalho, velocidade de processamento", "Serotonina, dopamina, GABA, glutamato"]],
    ["A escala de referência pra Transtorno Obsessivo-Compulsivo é:", ["Y-BOCS", "MBI", "AUDIT", "DAS"]],
    ["A escala de referência pra risco de suicídio, que exige ação clínica direta, é:", ["C-SSRS", "PHQ-9", "GAD-7", "HAM-A"]],
    ["PHQ-9 e GAD-7 são exemplos de:", ["Autorrelato rápido, ideal pra triagem ampla e acompanhamento frequente", "Escalas aplicadas exclusivamente por entrevistador treinado", "Instrumentos exclusivos de avaliação de inteligência", "Escalas específicas exclusivamente de burnout"]],
    ["HAM-D e HAM-A são exemplos de:", ["Escalas aplicadas por entrevistador, mais detalhadas e precisas", "Escalas de autorrelato ultrarrápido", "Instrumentos exclusivos de avaliação de personalidade", "Escalas específicas exclusivamente de trauma"]],
    ["A escala de referência pra burnout, estudada no Módulo 4.3, é:", ["MBI (Maslach Burnout Inventory)", "AUDIT", "DAST-10", "DAS"]],
    ["Por que a reaplicação periódica de uma escala é importante?", ["Transforma a escala num dado objetivo de progresso, além da impressão clínica isolada", "Não tem qualquer relação com o acompanhamento terapêutico", "Serve apenas pra confirmar o diagnóstico inicial, sem outra utilidade", "Deve ser feita apenas uma vez, no início do tratamento"]],
    ["Diante de discrepância entre melhora subjetiva relatada e escore objetivo inalterado, o módulo recomenda:", ["Investigar ativamente essa discrepância na sessão", "Ignorar completamente o escore objetivo", "Presumir automaticamente que a escala está incorreta", "Encerrar o tratamento imediatamente sem investigação"]],
    ["Diante de pontuação de risco na C-SSRS, o protocolo recomenda:", ["Ativar imediatamente o protocolo do Módulo 4.9, sem aguardar a próxima sessão", "Aguardar a próxima sessão agendada normalmente", "Ignorar, pois é considerado normal em qualquer avaliação", "Registrar apenas no prontuário, sem qualquer ação adicional"]],
    ["O ciclo descrito no módulo se fecha:", ["Da entrevista (Módulo 2.1) à escala, e da escala de volta ao plano terapêutico (Módulo 2.6)", "Exclusivamente dentro do Bloco 3 de Farmacologia", "Sem qualquer relação com os demais módulos do Bloco 2", "Apenas em contextos periciais, nunca clínicos"]],
  ];
  const gabaritoObjetivas = ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a"];

  const children = [
    ...doc.capa(KICKER, "Avaliação — Escalas de Rastreio", `Avaliação formativa de encerramento do Módulo ${MOD}.`),
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
    doc.vinhetaBox("Uma paciente em tratamento para Depressão Maior (Módulo 4.2) há 6 semanas teve, na linha de base, um PHQ-9 de 18 (grave). Na reaplicação atual, o escore caiu pra 14 (ainda moderado-grave), mas ela relata sentir que \"nada mudou\"."),
    new doc.Paragraph({ spacing: { before: 240 }, children: [new doc.TextRun({ text: "Com base no protocolo estudado, responda:", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    new doc.Paragraph({ spacing: { before: 220, after: 40 }, children: [new doc.TextRun({ text: "a) (10 pts) O que o dado objetivo (queda de 18 para 14) sugere, apesar da percepção subjetiva da paciente?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "b) (10 pts) Como você comunicaria esse dado à paciente, de forma que a ajude sem invalidar sua percepção?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "c) (10 pts) O escore ainda \"moderado-grave\" sugere que tipo de decisão clínica nesse momento?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "d) (10 pts) Que outro instrumento do Módulo 4.2 você consideraria aplicar em conjunto, e por quê?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    new doc.Paragraph({ spacing: { after: 40 }, children: [new doc.TextRun({ text: "USO EXCLUSIVO DO INSTRUTOR — remover antes de aplicar a prova", bold: true, color: doc.TERRA, font: doc.FONT, size: 20 })] }),
    doc.tituloH1("Gabarito"),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 1 — Questões objetivas", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 200 }, children: [new doc.TextRun({ text: gabaritoObjetivas.map((r, i) => `${i + 1}-${r}`).join("   ·   "), font: doc.FONT, size: 22, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 2 — Critério de correção da questão de caso", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "a) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Que houve progresso real e mensurável, mesmo que a paciente não esteja percebendo isso subjetivamente — um sinal comum em quadros depressivos, onde a autopercepção de melhora costuma atrasar em relação à mudança real.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "b) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Validar a experiência subjetiva da paciente, e ao mesmo tempo apresentar o dado objetivo como evidência concreta de progresso, sem minimizar o sofrimento ainda presente.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "c) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Manter o protocolo em curso, já que há progresso mensurável, mas reforçar acompanhamento próximo, já que o quadro ainda é significativo (moderado-grave).", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "d) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "C-SSRS ou BSI, pra investigar ativamente risco de suicídio, especialmente relevante dado o escore ainda elevado de depressão.", font: doc.FONT, size: 21, color: doc.INK })] }),
  );

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-2.5-Avaliacao.docx");
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
      n: 1, titulo: "O kit de instrumentos do Bloco 4", duracao: "12 min", slides: "1, 2, 3, 4",
      objetivo: "Sair sabendo explicar os 4 momentos de uso de uma escala ao longo do tratamento.",
      segmentos: [
        seg("0:00–0:45", "Abertura (gancho)", [{ fala: "Uma escala aplicada uma única vez é uma fotografia; aplicada repetidamente ao longo do tratamento, ela vira um filme da evolução real do paciente." }]),
        seg("0:45–2:00", "Por que isso importa", ["Esse módulo organiza, por finalidade de uso, todas as escalas já citadas nos protocolos do Bloco 4."]),
        seg("2:00–8:00", "Os 4 momentos de uso (mostrar slide 4)", [
          "Triagem inicial: primeira sessão, antes de fechar hipótese.",
          "Confirmação de gravidade: define intensidade do protocolo.",
          "Acompanhamento periódico: monitora evolução ao longo do tratamento.",
          "Encerramento/alta: confirma resolução objetiva do quadro.",
        ]),
        seg("8:00–10:30", "Um ponto importante", ["O acompanhamento periódico transforma a escala em dado objetivo de progresso."]),
        seg("10:30–12:00", "Fechamento", [{ fala: "Próxima aula: do escore inicial à decisão clínica." }]),
      ],
    },
    {
      n: 2, titulo: "Do escore inicial à decisão clínica", duracao: "10 min", slides: "5",
      objetivo: "Explicar a cadeia entre aplicação inicial, reaplicação e decisão clínica.",
      segmentos: [
        seg("0:00–1:00", "Retomada rápida", ["Vimos os momentos de uso. Hoje vemos como o escore se transforma em decisão prática."]),
        seg("1:00–6:30", "A cadeia (mostrar slide 5)", ["Aplicação inicial: estabelece linha de base.", "Reaplicação periódica: a cada 4 a 8 semanas.", "Comparação de escores: dado objetivo além da percepção subjetiva.", "Decisão clínica: ajustar, manter ou encerrar."]),
        seg("6:30–9:00", "Um ponto importante", ["Sem reaplicação periódica, a avaliação de progresso fica apoiada só na impressão clínica."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: os 3 grandes grupos de escalas." }]),
      ],
    },
    {
      n: 3, titulo: "Os 3 grupos e como se organizam por finalidade", duracao: "12 min", slides: "6, 7",
      objetivo: "Reconhecer os 3 grandes grupos de escalas e sua organização por finalidade de aplicação.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três grupos — organizados por demanda clínica, não por ordem alfabética."]),
        seg("1:00–6:00", "Os 3 grupos (mostrar slide 6)", [
          "Humor: BDI-II/PHQ-9/HAM-D, BAI/GAD-7/HAM-A.",
          "Quadros específicos: Y-BOCS, PCL-5/IES-R, MBI, AUDIT/DAST-10.",
          "Relacionamento e risco: Escala de Ajustamento Diádico, C-SSRS/BSI.",
        ]),
        seg("6:00–10:30", "Organização por finalidade (mostrar slide 7)", [
          "Autorrelato rápido: PHQ-9, GAD-7.",
          "Aplicada por entrevistador: HAM-D, HAM-A.",
          "Específica de quadro: Y-BOCS, MBI, AUDIT.",
          "Risco imediato: C-SSRS.",
        ]),
        seg("10:30–12:00", "Fechamento", [{ fala: "Próxima aula: quando usar escala curta versus escala longa." }]),
      ],
    },
    {
      n: 4, titulo: "Escala curta versus escala longa", duracao: "10 min", slides: "8",
      objetivo: "Diferenciar quando priorizar autorrelato rápido, entrevista estruturada ou escala específica.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Um filtro rápido — nem toda situação pede o mesmo tipo de escala."]),
        seg("1:00–8:00", "Os 3 cenários (mostrar slide 8)", [
          "Autorrelato curto: triagem rápida, acompanhamento frequente.",
          "Aplicada por entrevistador: maior precisão, útil com dúvida diagnóstica.",
          "Específica de quadro: só depois da hipótese já razoavelmente definida.",
        ]),
        seg("8:00–9:00", "Por que isso importa", ["Escolher a escala errada pro momento gera trabalho desnecessário ou dado impreciso."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: três exemplos concretos de lógicas de aplicação." }]),
      ],
    },
    {
      n: 5, titulo: "Três exemplos, três lógicas de aplicação", duracao: "10 min", slides: "9",
      objetivo: "Consolidar exemplos concretos de cada tipo de escala.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três exemplos — cada um ilustrando uma lógica de uso diferente."]),
        seg("1:00–4:30", "PHQ-9 / GAD-7", ["Poucos minutos, ideal pra triagem ampla e acompanhamento frequente."]),
        seg("4:30–7:30", "HAM-D / HAM-A", ["Mais detalhada e precisa, exige treinamento específico de aplicação."]),
        seg("7:30–9:00", "C-SSRS", ["Exige ação clínica direta assim que aplicada — nunca é só registro passivo."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: colocamos tudo em prática — do escore ao uso clínico real." }]),
      ],
    },
    {
      n: 6, titulo: "Aplicação — selecionar e aplicar na linha de base", duracao: "13 min", slides: "10, 11",
      objetivo: "Aplicar os passos 1 e 2 do modelo de uso longitudinal.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["A parte mais prática desse módulo. Hoje, os 2 primeiros passos."]),
        seg("1:00–2:00", "Visão geral (mostrar slide 10)", ["Selecionar a escala certa → Aplicar na linha de base → Reaplicar periodicamente → Usar o dado objetivo."]),
        seg("2:00–7:00", "Passo 1 — Selecionar a escala certa (mostrar slide 11, esquerda)", ["Revise o módulo correspondente do Bloco 4 pra confirmar a escala de referência.", "Evite aplicar escalas por hábito, sem relação com a hipótese em curso."]),
        seg("7:00–12:00", "Passo 2 — Aplicar na linha de base (mostrar slide 11, direita)", [{ fala: "Vamos usar esse questionário agora, antes de começarmos o trabalho, pra ter um ponto de partida claro pra acompanhar sua evolução." }]),
        seg("12:00–13:00", "Fechamento", [{ fala: "Próxima aula: reaplicar periodicamente e usar o dado objetivo." }]),
      ],
    },
    {
      n: 7, titulo: "Aplicação — reaplicar e usar o dado objetivo", duracao: "11 min", slides: "12",
      objetivo: "Trabalhar reaplicação periódica e uso do dado objetivo na decisão clínica.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Hoje fechamos o modelo com o uso concreto do dado ao longo do tempo."]),
        seg("1:00–6:00", "Passo 3 — Reaplicar periodicamente (mostrar slide 12, esquerda)", ["Defina um intervalo regular, geralmente 4 a 8 semanas.", "Use o mesmo instrumento nas reaplicações."]),
        seg("6:00–10:00", "Passo 4 — Usar o dado objetivo (mostrar slide 12, direita)", ["Compare escores ao longo do tempo, não apenas a impressão clínica.", "Ausência de melhora sucessiva sugere revisar o plano terapêutico."]),
        seg("10:00–11:00", "Fechamento", [{ fala: "Modelo completo. Próxima aula: um caso real e os critérios de quando escalar." }]),
      ],
    },
    {
      n: 8, titulo: "Estudo de caso, encaminhamento e recap", duracao: "14 min", slides: "13, 14, 15",
      objetivo: "Integrar todo o módulo num caso completo, com ênfase na discrepância entre relato e dado objetivo.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Última aula do módulo. Caso completo e os critérios de quando escalar."]),
        seg("1:00–6:00", "Estudo de caso (mostrar slide 13)", ["Leia a vinheta com calma.", "Percorra as 3 perguntas de discussão.", "Convide o aluno a pausar e responder por escrito."]),
        seg("6:00–10:00", "Quando encaminhar (mostrar slide 14)", ["Percorra os 4 critérios, com atenção especial à pontuação de risco na C-SSRS."]),
        seg("10:00–13:00", "Recapitulando o módulo (mostrar slide 15)", ["Retome os 4 pontos-chave.", "Reforce que o ciclo se fecha aqui, indo direto pro Módulo 2.6."]),
        seg("13:00–14:00", "Fechamento do módulo", [{ fala: "Agora é hora dos exercícios e da avaliação. Te vejo no último módulo do Bloco 2." }]),
      ],
    },
  ];

  const totalMin = 12 + 10 + 12 + 10 + 10 + 13 + 11 + 14;

  const children = [
    ...doc.capa(KICKER, "Roteiro de Aulas — Escalas de Rastreio", "Módulo dividido em 8 vídeo-aulas de 10 a 15 minutos, seguindo os slides já produzidos. Cada aula tem roteiro cronometrado, pronto pra gravação."),
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

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", `${RODAPE_DOC} — Roteiro de Aulas`, children), "Modulo-2.5-Roteiro-Aulas.docx");
}

// ============================================================
Promise.resolve()
  .then(construirDeck)
  .then(construirExercicios)
  .then(construirProva)
  .then(construirRoteiro)
  .then(() => console.log("TUDO PRONTO"))
  .catch((e) => { console.error(e); process.exit(1); });

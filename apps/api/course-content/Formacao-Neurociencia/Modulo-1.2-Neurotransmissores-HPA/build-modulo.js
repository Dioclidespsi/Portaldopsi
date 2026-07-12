const deck = require("../_lib/lib-deck.js");
const doc = require("../_lib/lib-doc.js");

const MOD = "1.2";
const NOME = "Neurotransmissores e Eixo HPA";
const RODAPE_DECK = `Neurotransmissores e Eixo HPA — Módulo ${MOD}`;
const RODAPE_DOC = `Módulo ${MOD} — Neurotransmissores e Eixo HPA`;
const KICKER = "MÓDULO 1.2 · FUNDAMENTOS DE NEUROCIÊNCIA APLICADA";

// ============================================================
// 1) SLIDE DECK
// ============================================================
function construirDeck() {
  const pres = deck.novaApresentacao(`${NOME} — A Química por Trás do Sintoma`);

  deck.slideTitulo(pres, {
    moduloLabel: `Módulo ${MOD} · Bloco 1 · Fundamentos`,
    titulo: "Neurotransmissores e Eixo HPA",
    subtitulo: "A química que explica sintoma, resposta a fármaco e estresse crônico",
    passos: ["Sistemas", "Eixo HPA", "Sinais", "Aplicação", "Farmacologia"],
  });

  deck.slideRoteiro(pres, {
    rodape: RODAPE_DECK, pageNum: 2,
    cards: [
      { titulo: "Serotonina e dopamina", desc: "Humor, motivação e recompensa" },
      { titulo: "GABA e glutamato", desc: "O par inibição-excitação" },
      { titulo: "Eixo HPA e cortisol", desc: "A resposta neuroendócrina ao estresse" },
      { titulo: "Sinais clínicos", desc: "Como cada desregulação aparece na sessão" },
      { titulo: "Farmacologia", desc: "A ponte com o Bloco 3" },
    ],
  });

  deck.slideHook(pres, {
    rodape: RODAPE_DECK, pageNum: 3,
    frase: "Todo sintoma que você trata tem, por trás, uma história de neurotransmissores — e todo remédio que seu paciente toma muda essa história de um jeito específico e previsível.",
    apoio: "Você não precisa prescrever pra entender essa química — precisa entender o suficiente pra ler o sintoma com mais precisão e dialogar com a psiquiatria de igual pra igual.",
  });

  deck.slideCircuito(pres, {
    rodape: RODAPE_DECK, pageNum: 4,
    titulo: "Os 4 sistemas que mais aparecem na clínica",
    regioes: [
      { label: "Serotonina (regulação de humor, sono e impulsividade)", rx: 0.20, ry: 0.22, color: deck.NAVY, d: 0.5 },
      { label: "Dopamina (motivação, recompensa e movimento)", rx: 0.22, ry: 0.62, color: deck.TERRA, d: 0.4 },
      { label: "GABA (principal neurotransmissor inibitório)", rx: 0.60, ry: 0.60, color: deck.NAVY_TINT, d: 0.36 },
      { label: "Glutamato (principal neurotransmissor excitatório)", rx: 0.58, ry: 0.24, color: deck.TERRA_TINT, d: 0.36 },
    ],
    notas: [
      "A serotonina modula amplamente humor, sono e controle de impulsos — é o alvo mais comum dos antidepressivos (Módulo 3.2).",
      "A dopamina sustenta motivação e a sensação de recompensa — sua desregulação aparece tanto em depressão quanto em adicções (Módulo 4.5).",
      "GABA e glutamato formam o par regulador de excitação: GABA freia, glutamato acelera — o alvo dos ansiolíticos (Módulo 3.3).",
    ],
  });

  deck.slideCadeia(pres, {
    rodape: RODAPE_DECK, pageNum: 5,
    titulo: "Do estressor agudo à desregulação crônica",
    elos: [
      { titulo: "Estressor percebido", desc: "O hipotálamo libera CRH em resposta a uma ameaça real ou percebida" },
      { titulo: "Ativação do eixo HPA", desc: "Cascata hipotálamo-hipófise-adrenal libera cortisol na corrente sanguínea" },
      { titulo: "Resposta adaptativa", desc: "Em curto prazo, o cortisol mobiliza energia e melhora o foco" },
      { titulo: "Desregulação crônica", desc: "Se o estressor persiste, o eixo HPA se desregula, gerando dano cumulativo" },
    ],
    notaFinal: "Esse é exatamente o mecanismo por trás do burnout (Módulo 4.3) — a exaustão do eixo HPA por estresse crônico prolongado.",
  });

  deck.slideCategorias(pres, {
    rodape: RODAPE_DECK, pageNum: 6,
    titulo: "3 categorias que organizam a farmacologia",
    categorias: [
      { titulo: "Neuromoduladores de humor", desc: "Serotonina e dopamina — alvo principal de antidepressivos", color: deck.NAVY },
      { titulo: "Par excitação-inibição", desc: "Glutamato e GABA — alvo principal de ansiolíticos", color: deck.TERRA },
      { titulo: "Eixo neuroendócrino do estresse", desc: "Cortisol — não tem \"remédio direto\", mas orienta todo manejo comportamental", color: deck.NAVY_TINT },
    ],
    notaFinal: "Essas 3 categorias são exatamente o que organiza o Bloco 3 (Farmacologia) — cada classe de medicamento atua predominantemente numa delas.",
  });

  deck.slideSinais(pres, {
    rodape: RODAPE_DECK, pageNum: 7,
    titulo: "Como cada desregulação aparece na sessão",
    itens: [
      { titulo: "Serotonina baixa", desc: "Humor deprimido, irritabilidade, alterações de sono e apetite" },
      { titulo: "Dopamina baixa", desc: "Anedonia, falta de motivação, dificuldade de sentir prazer" },
      { titulo: "GABA reduzido / glutamato excessivo", desc: "Ansiedade, hiperexcitabilidade, dificuldade de relaxar" },
      { titulo: "Cortisol cronicamente elevado", desc: "Fadiga persistente, prejuízo cognitivo, alterações de sono e imunidade" },
    ],
  });

  deck.slideDiferencial(pres, {
    rodape: RODAPE_DECK, pageNum: 8,
    titulo: "Quando essa leitura orienta encaminhamento",
    cards: [
      { titulo: "Sintoma leve e situacional", desc: "Costuma responder bem a intervenção psicológica isolada, sem necessidade farmacológica" },
      { titulo: "Sintoma moderado a grave persistente", desc: "Considerar avaliação psiquiátrica complementar — ver Módulo 3.1" },
      { titulo: "Sinais físicos de desregulação do cortisol", desc: "Fadiga extrema, alterações metabólicas: considerar avaliação médica complementar" },
    ],
  });

  deck.slideInstrumentos(pres, {
    rodape: RODAPE_DECK, pageNum: 9,
    titulo: "Como monitorar essas desregulações na prática",
    instrumentos: [
      { sigla: "Escalas de humor", nome: "BDI-II, PHQ-9, GAD-7", desc: "Rastreiam sintomas associados à desregulação de serotonina/dopamina — Módulo 2.5." },
      { sigla: "MBI", nome: "Maslach Burnout Inventory", desc: "Rastreia sinais comportamentais de exaustão do eixo HPA." },
      { sigla: "Avaliação médica laboratorial", nome: "Quando clinicamente indicada", desc: "Não é rotina, mas complementa quando há suspeita de desregulação significativa." },
    ],
  });

  deck.slideProtocoloOverview(pres, {
    rodape: RODAPE_DECK, pageNum: 10,
    titulo: "Da química à aplicação clínica: 4 passos",
    passos: [
      { titulo: "Reconhecer\no sistema", desc: "Identificar qual neurotransmissor/eixo parece mais envolvido no sintoma" },
      { titulo: "Diferenciar\nagudo de crônico", desc: "Um estresse pontual não é o mesmo que uma desregulação já consolidada" },
      { titulo: "Psicoeducar\nsem prescrever", desc: "Explicar o mecanismo sem nunca sugerir ajuste de medicação" },
      { titulo: "Conectar com\na farmacologia", desc: "Usar essa leitura pra dialogar melhor com a psiquiatria, quando aplicável" },
    ],
    notaFinal: "Essa leitura química é a ponte direta pro Bloco 3 — cada classe de medicamento discutida lá atua especificamente sobre um desses sistemas.",
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 11,
    titulo: "Passos 1 e 2, na prática",
    colunas: [
      {
        numero: 1, titulo: "Reconhecer o sistema",
        bullets: ["Anedonia e falta de motivação apontam mais pra dopamina; humor deprimido e irritabilidade, mais pra serotonina", "Ansiedade e hiperexcitabilidade apontam pro par GABA-glutamato"],
      },
      {
        numero: 2, titulo: "Diferenciar agudo de crônico",
        fala: "“Isso que você sente há 3 semanas, desde aquele evento específico, é diferente de algo que já dura meses sem melhora — vamos entender qual dos dois é o seu caso.”",
        bullets: ["Um estressor pontual resolvido tende a normalizar o eixo HPA sozinho", "Estresse prolongado sem resolução tende a exigir intervenção mais estruturada"],
      },
    ],
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 12,
    titulo: "Passos 3 e 4, na prática",
    colunas: [
      {
        numero: 3, titulo: "Psicoeducar sem prescrever",
        bullets: ["Explique o mecanismo em linguagem acessível, sempre deixando claro que decisão de medicação é médica", "Nunca sugira início, ajuste ou suspensão de qualquer fármaco — isso é sempre do médico"],
      },
      {
        numero: 4, titulo: "Conectar com a farmacologia",
        bullets: ["Use essa leitura pra formular perguntas mais precisas ao psiquiatra, quando houver encaminhamento", "Aprofunde no Bloco 3 pra entender o que cada classe de medicamento muda na prática clínica"],
      },
    ],
  });

  deck.slideCaso(pres, {
    rodape: RODAPE_DECK, pageNum: 13,
    vinheta: "Uma paciente relata que, há 4 meses, perdeu completamente o interesse em atividades que antes gostava, sente-se \"sem energia pra nada\" e não consegue sentir alegria mesmo em momentos que deveriam ser bons. Relata também dificuldade de dormir e fadiga constante. Não há evento estressor recente identificável.",
    perguntas: [
      "Que sistema neurotransmissor parece mais envolvido nesse quadro, com base nos sinais relatados?",
      "O padrão descrito é mais consistente com uma resposta aguda ou uma desregulação já consolidada? Por quê?",
      "Que instrumento de rastreio (Módulo 2.5) você aplicaria pra formalizar essa avaliação?",
    ],
  });

  deck.slideEncaminhamento(pres, {
    rodape: RODAPE_DECK, pageNum: 14,
    criterios: [
      "Sintomas moderados a graves persistentes por semanas, sem resposta a intervenção psicológica isolada",
      "Sinais físicos importantes de desregulação do cortisol (fadiga extrema, alterações metabólicas significativas)",
      "Histórico ou suspeita de necessidade de avaliação farmacológica: encaminhar conforme Módulo 3.1",
      "Sempre comunicar ao paciente que a decisão sobre medicação é médica, nunca do psicólogo",
    ],
  });

  deck.slideRecap(pres, {
    rodape: RODAPE_DECK, pageNum: 15,
    pontos: [
      "Serotonina, dopamina, GABA e glutamato são os 4 sistemas que mais aparecem na leitura clínica de sintomas",
      "O eixo HPA explica a cascata do estresse agudo à desregulação crônica, base do burnout (Módulo 4.3)",
      "Cada padrão de sinal (humor, motivação, ansiedade, fadiga) aponta pra um sistema predominante diferente",
      "Essa leitura química nunca substitui a decisão médica — ela prepara o terreno pro diálogo com a psiquiatria, aprofundado no Bloco 3",
    ],
    proximoTexto: "Próximo: exercícios práticos e avaliação do Módulo 1.2 →",
  });

  return pres.writeFile({ fileName: "Modulo-1.2-Neurotransmissores-HPA.pptx" });
}

// ============================================================
// 2) EXERCÍCIOS
// ============================================================
function construirExercicios() {
  const children = [
    ...doc.capa(KICKER, "Exercícios — Neurotransmissores e Eixo HPA", "Resolva individualmente antes da sessão de supervisão. O objetivo é testar sua leitura funcional antes de comparar com a discussão em grupo — não há problema em errar."),

    doc.exNum(1, "Os 4 sistemas, em suas palavras"),
    doc.pergunta(1, "Explique em uma frase simples a função clínica de cada sistema: serotonina, dopamina, GABA, glutamato."),
    ...doc.linhaResposta(3),
    doc.pergunta(2, "Descreva o mecanismo do eixo HPA, do estressor à liberação de cortisol."),
    ...doc.linhaResposta(2),

    doc.exNum(2, "Sinais por sistema"),
    doc.tabelaSimples(["Sistema", "Sinal clínico esperado"], [["Serotonina baixa", ""], ["Dopamina baixa", ""], ["GABA/glutamato desequilibrado", ""], ["Cortisol cronicamente elevado", ""]], [3600, 5750]),

    doc.exNum(3, "Agudo versus crônico"),
    doc.vinhetaBox("Um paciente relata ansiedade intensa há 2 semanas, coincidindo exatamente com um processo seletivo de emprego em curso."),
    doc.pergunta(1, "Esse padrão é mais consistente com resposta aguda ou desregulação crônica do eixo HPA? Justifique."),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),

    doc.exNum(4, "Psicoeducação sem prescrever"),
    doc.vinhetaBox("Um paciente pergunta diretamente: \"você acha que eu deveria tomar antidepressivo?\""),
    doc.pergunta(1, "Escreva uma resposta que psicoeduque sobre o mecanismo, sem nunca sugerir início ou ajuste de medicação."),
    ...doc.linhaResposta(3),

    doc.exNum(5, "Caso integrado"),
    doc.vinhetaBox("Uma paciente, há 4 meses, perdeu interesse em atividades que gostava, sente-se sem energia, não sente alegria mesmo em momentos bons, tem dificuldade de dormir e fadiga constante, sem estressor recente identificável."),
    doc.pergunta(1, "Que sistema neurotransmissor parece mais envolvido, com base nos sinais relatados?"),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Esse padrão é mais consistente com resposta aguda ou desregulação já consolidada?"),
    ...doc.linhaResposta(2),
    doc.pergunta(3, "Que instrumento de rastreio você aplicaria pra formalizar essa avaliação?"),
    ...doc.linhaResposta(1),
  ];

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-1.2-Exercicios.docx");
}

// ============================================================
// 3) AVALIAÇÃO
// ============================================================
function construirProva() {
  const objetivas = [
    ["A serotonina está associada principalmente à regulação de:", ["Humor, sono e impulsividade", "Exclusivamente movimento motor voluntário", "Apenas processos digestivos", "Nenhuma função clínica relevante"]],
    ["A dopamina sustenta principalmente:", ["Motivação e sensação de recompensa", "Exclusivamente controle inibitório", "Apenas percepção visual", "Regulação exclusiva de temperatura corporal"]],
    ["GABA e glutamato formam, respectivamente:", ["O principal neurotransmissor inibitório e o principal excitatório", "Dois neurotransmissores exclusivamente excitatórios", "Dois neurotransmissores sem qualquer relação com ansiedade", "Hormônios exclusivamente reprodutivos"]],
    ["O eixo HPA, diante de um estressor, libera principalmente:", ["Cortisol, através da cascata hipotálamo-hipófise-adrenal", "Apenas serotonina, sem qualquer outro hormônio", "Exclusivamente insulina", "Nenhum hormônio mensurável"]],
    ["A exaustão do eixo HPA por estresse crônico prolongado é o mecanismo central de:", ["Burnout (Módulo 4.3)", "TOC (Módulo 4.8) exclusivamente", "TEA (Módulo 4.27) exclusivamente", "Nenhum quadro clínico estudado no curso"]],
    ["Anedonia e falta de motivação apontam clinicamente mais para desregulação de:", ["Dopamina", "Exclusivamente GABA", "Exclusivamente glutamato", "Nenhum sistema neurotransmissor específico"]],
    ["As 3 categorias que organizam a farmacologia do Bloco 3 são:", ["Neuromoduladores de humor, par excitação-inibição, eixo neuroendócrino do estresse", "Apenas hormônios sexuais", "Exclusivamente neurotransmissores motores", "Vitaminas e minerais exclusivamente"]],
    ["Diante da pergunta de um paciente sobre iniciar medicação, o psicólogo deve:", ["Psicoeducar sobre o mecanismo, sem nunca sugerir início, ajuste ou suspensão de fármaco", "Recomendar diretamente qual medicação tomar", "Ignorar completamente a pergunta", "Sugerir que o paciente pare qualquer medicação em uso"]],
    ["Sintomas moderados a graves persistentes, sem resposta a intervenção psicológica isolada, sugerem:", ["Considerar avaliação psiquiátrica complementar", "Ignorar, pois nunca exigem avaliação adicional", "Suspender automaticamente o acompanhamento psicológico", "Não têm qualquer relação com decisão de encaminhamento"]],
    ["A leitura dos sistemas neurotransmissores estudada neste módulo serve principalmente para:", ["Ler o sintoma com mais precisão e dialogar melhor com a psiquiatria, nunca para prescrever", "Substituir completamente a necessidade de avaliação médica", "Permitir que o psicólogo prescreva medicação diretamente", "Eliminar a necessidade de qualquer escala de rastreio"]],
  ];
  const gabaritoObjetivas = ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a"];

  const children = [
    ...doc.capa(KICKER, "Avaliação — Neurotransmissores e Eixo HPA", `Avaliação formativa de encerramento do Módulo ${MOD}.`),
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
    doc.vinhetaBox("Um paciente relata episódios de ansiedade intensa e dificuldade de relaxar há mais de 6 meses, sem estressor específico identificável, junto com tensão muscular constante e dificuldade de desligar pensamentos à noite. Pergunta se \"tem algum remédio que resolveria isso rápido\"."),
    new doc.Paragraph({ spacing: { before: 240 }, children: [new doc.TextRun({ text: "Com base no protocolo estudado, responda:", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    new doc.Paragraph({ spacing: { before: 220, after: 40 }, children: [new doc.TextRun({ text: "a) (10 pts) Que sistema neurotransmissor parece mais envolvido nesse quadro?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "b) (10 pts) Esse padrão é mais consistente com resposta aguda ou desregulação crônica? Justifique.", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "c) (10 pts) Como você responderia à pergunta sobre \"remédio que resolveria isso rápido\", sem prescrever nem desencorajar indevidamente?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "d) (10 pts) Que módulo deste curso você indicaria pro paciente aprofundar essa dúvida especificamente sobre medicação?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    new doc.Paragraph({ spacing: { after: 40 }, children: [new doc.TextRun({ text: "USO EXCLUSIVO DO INSTRUTOR — remover antes de aplicar a prova", bold: true, color: doc.TERRA, font: doc.FONT, size: 20 })] }),
    doc.tituloH1("Gabarito"),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 1 — Questões objetivas", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 200 }, children: [new doc.TextRun({ text: gabaritoObjetivas.map((r, i) => `${i + 1}-${r}`).join("   ·   "), font: doc.FONT, size: 22, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 2 — Critério de correção da questão de caso", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "a) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "O par GABA-glutamato, dado o padrão de ansiedade, tensão e hiperexcitabilidade persistente.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "b) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Desregulação crônica, dada a duração de mais de 6 meses sem estressor específico identificável, sugerindo padrão já consolidado.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "c) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Explicar que a decisão sobre medicação é médica, oferecer-se pra construir junto uma avaliação mais completa (escalas), e sugerir avaliação psiquiátrica se o quadro persistir apesar da intervenção psicológica.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "d) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Módulo 3.3 (Ansiolíticos e hipnóticos) e, de forma mais ampla, o Bloco 3 (Farmacologia Aplicada à Psicoterapia).", font: doc.FONT, size: 21, color: doc.INK })] }),
  );

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-1.2-Avaliacao.docx");
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
      n: 1, titulo: "A química por trás do sintoma", duracao: "12 min", slides: "1, 2, 3, 4",
      objetivo: "Sair sabendo explicar os 4 sistemas neurotransmissores principais sem jargão técnico.",
      segmentos: [
        seg("0:00–0:45", "Abertura (gancho)", [{ fala: "Todo sintoma que você trata tem, por trás, uma história de neurotransmissores — e todo remédio que seu paciente toma muda essa história de um jeito específico e previsível." }]),
        seg("0:45–2:00", "Por que isso importa", ["Você não precisa prescrever — precisa entender o suficiente pra ler o sintoma com precisão e dialogar com a psiquiatria."]),
        seg("2:00–8:00", "Os 4 sistemas (mostrar slide 4)", [
          "Serotonina: humor, sono e impulsividade.",
          "Dopamina: motivação, recompensa e movimento.",
          "GABA: principal neurotransmissor inibitório.",
          "Glutamato: principal neurotransmissor excitatório.",
        ]),
        seg("8:00–10:30", "Um ponto importante", ["Cada classe de antidepressivo/ansiolítico do Bloco 3 atua predominantemente sobre um desses sistemas."]),
        seg("10:30–12:00", "Fechamento", [{ fala: "Próxima aula: o eixo HPA e como o estresse agudo vira desregulação crônica." }]),
      ],
    },
    {
      n: 2, titulo: "Do estressor agudo à desregulação crônica", duracao: "11 min", slides: "5",
      objetivo: "Explicar o mecanismo do eixo HPA e sua conexão com o burnout.",
      segmentos: [
        seg("0:00–1:00", "Retomada rápida", ["Vimos os neurotransmissores. Hoje vemos o eixo neuroendócrino do estresse."]),
        seg("1:00–6:30", "A cadeia (mostrar slide 5)", ["Estressor percebido: hipotálamo libera CRH.", "Ativação do eixo HPA: cascata libera cortisol.", "Resposta adaptativa: cortisol mobiliza energia em curto prazo.", "Desregulação crônica: se o estressor persiste, o eixo se desregula."]),
        seg("6:30–9:30", "A conexão com o burnout", ["Esse é exatamente o mecanismo por trás do Módulo 4.3 (Burnout) — exaustão do eixo HPA por estresse crônico."]),
        seg("9:30–11:00", "Fechamento", [{ fala: "Próxima aula: as 3 categorias que organizam a farmacologia, e os sinais clínicos de cada desregulação." }]),
      ],
    },
    {
      n: 3, titulo: "As 3 categorias e os sinais clínicos", duracao: "12 min", slides: "6, 7",
      objetivo: "Reconhecer as 3 categorias farmacológicas e seus sinais de desregulação na sessão.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três categorias — e como cada desregulação aparece concretamente na sessão."]),
        seg("1:00–6:00", "As 3 categorias (mostrar slide 6)", [
          "Neuromoduladores de humor: serotonina e dopamina.",
          "Par excitação-inibição: glutamato e GABA.",
          "Eixo neuroendócrino do estresse: cortisol.",
        ]),
        seg("6:00–10:30", "Sinais de cada desregulação (mostrar slide 7)", [
          "Serotonina baixa: humor deprimido, irritabilidade.",
          "Dopamina baixa: anedonia, falta de motivação.",
          "GABA/glutamato desequilibrado: ansiedade, hiperexcitabilidade.",
          "Cortisol elevado: fadiga persistente, prejuízo cognitivo.",
        ]),
        seg("10:30–12:00", "Fechamento", [{ fala: "Próxima aula: quando essa leitura orienta encaminhamento." }]),
      ],
    },
    {
      n: 4, titulo: "Quando essa leitura orienta encaminhamento", duracao: "10 min", slides: "8",
      objetivo: "Diferenciar sintoma leve/situacional de sintoma que exige avaliação complementar.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Um filtro rápido — nem todo sintoma exige avaliação farmacológica."]),
        seg("1:00–8:00", "Os 3 cenários (mostrar slide 8)", [
          "Sintoma leve e situacional: costuma responder bem à intervenção psicológica isolada.",
          "Sintoma moderado a grave persistente: considerar avaliação psiquiátrica complementar.",
          "Sinais físicos de desregulação do cortisol: considerar avaliação médica complementar.",
        ]),
        seg("8:00–9:00", "Por que isso importa", ["Evita tanto o subtratamento quanto o encaminhamento desnecessário."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: como monitorar essas desregulações formalmente." }]),
      ],
    },
    {
      n: 5, titulo: "Como monitorar essas desregulações na prática", duracao: "10 min", slides: "9",
      objetivo: "Conectar a leitura química aos instrumentos formais do Bloco 2.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Uma prévia do Bloco 2 — os instrumentos que confirmam essa leitura com dado."]),
        seg("1:00–4:30", "Escalas de humor", ["BDI-II, PHQ-9, GAD-7 — rastreiam sintomas associados, aprofundado no Módulo 2.5."]),
        seg("4:30–7:30", "MBI", ["Rastreia sinais comportamentais de exaustão do eixo HPA."]),
        seg("7:30–9:00", "Avaliação médica laboratorial", ["Não é rotina, mas complementa quando há suspeita de desregulação significativa."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: colocamos tudo em prática — da química à aplicação clínica." }]),
      ],
    },
    {
      n: 6, titulo: "Aplicação — reconhecer o sistema e diferenciar agudo/crônico", duracao: "13 min", slides: "10, 11",
      objetivo: "Aplicar os passos 1 e 2 do modelo de aplicação clínica.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["A parte mais prática desse módulo. Hoje, os 2 primeiros passos."]),
        seg("1:00–2:00", "Visão geral (mostrar slide 10)", ["Reconhecer o sistema → Diferenciar agudo de crônico → Psicoeducar sem prescrever → Conectar com a farmacologia."]),
        seg("2:00–7:00", "Passo 1 — Reconhecer o sistema (mostrar slide 11, esquerda)", ["Anedonia aponta mais pra dopamina; humor deprimido, mais pra serotonina.", "Ansiedade e hiperexcitabilidade apontam pro par GABA-glutamato."]),
        seg("7:00–12:00", "Passo 2 — Diferenciar agudo de crônico (mostrar slide 11, direita)", [{ fala: "Isso que você sente há 3 semanas, desde aquele evento específico, é diferente de algo que já dura meses sem melhora — vamos entender qual dos dois é o seu caso." }]),
        seg("12:00–13:00", "Fechamento", [{ fala: "Próxima aula: psicoeducar sem prescrever e conectar com a farmacologia." }]),
      ],
    },
    {
      n: 7, titulo: "Aplicação — psicoeducar sem prescrever", duracao: "11 min", slides: "12",
      objetivo: "Trabalhar psicoeducação responsável e a ponte com o Bloco 3.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Hoje fechamos o modelo com os 2 últimos passos, os mais delicados eticamente."]),
        seg("1:00–6:00", "Passo 3 — Psicoeducar sem prescrever (mostrar slide 12, esquerda)", ["Explique o mecanismo em linguagem acessível.", "Nunca sugira início, ajuste ou suspensão de qualquer fármaco."]),
        seg("6:00–10:00", "Passo 4 — Conectar com a farmacologia (mostrar slide 12, direita)", ["Use essa leitura pra formular perguntas mais precisas ao psiquiatra.", "Aprofunde no Bloco 3 pra entender o que cada classe de medicamento muda na prática."]),
        seg("10:00–11:00", "Fechamento", [{ fala: "Modelo completo. Próxima aula: um caso real e os critérios de quando escalar." }]),
      ],
    },
    {
      n: 8, titulo: "Estudo de caso, encaminhamento e recap", duracao: "14 min", slides: "13, 14, 15",
      objetivo: "Integrar todo o módulo num caso completo, com ênfase nos limites éticos da psicoeducação.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Última aula do módulo. Caso completo e os critérios de quando encaminhar."]),
        seg("1:00–6:00", "Estudo de caso (mostrar slide 13)", ["Leia a vinheta com calma.", "Percorra as 3 perguntas de discussão.", "Convide o aluno a pausar e responder por escrito."]),
        seg("6:00–10:00", "Quando encaminhar (mostrar slide 14)", ["Percorra os 4 critérios — reforce que a decisão sobre medicação é sempre médica."]),
        seg("10:00–13:00", "Recapitulando o módulo (mostrar slide 15)", ["Retome os 4 pontos-chave.", "Reforce a ponte direta com o Bloco 3 de Farmacologia."]),
        seg("13:00–14:00", "Fechamento do módulo", [{ fala: "Agora é hora dos exercícios e da avaliação. Te vejo no próximo módulo do Bloco 1." }]),
      ],
    },
  ];

  const totalMin = 12 + 11 + 12 + 10 + 10 + 13 + 11 + 14;

  const children = [
    ...doc.capa(KICKER, "Roteiro de Aulas — Neurotransmissores e Eixo HPA", "Módulo dividido em 8 vídeo-aulas de 10 a 15 minutos, seguindo os slides já produzidos. Cada aula tem roteiro cronometrado, pronto pra gravação."),
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

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", `${RODAPE_DOC} — Roteiro de Aulas`, children), "Modulo-1.2-Roteiro-Aulas.docx");
}

// ============================================================
Promise.resolve()
  .then(construirDeck)
  .then(construirExercicios)
  .then(construirProva)
  .then(construirRoteiro)
  .then(() => console.log("TUDO PRONTO"))
  .catch((e) => { console.error(e); process.exit(1); });

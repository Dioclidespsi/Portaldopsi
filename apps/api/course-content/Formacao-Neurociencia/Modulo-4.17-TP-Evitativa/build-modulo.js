const deck = require("../_lib/lib-deck.js");
const doc = require("../_lib/lib-doc.js");

const MOD = "4.17";
const NOME = "Transtorno de Personalidade Evitativa";
const RODAPE_DECK = `TP Evitativa — Módulo ${MOD}`;
const RODAPE_DOC = `Módulo ${MOD} — TP Evitativa`;
const KICKER = "MÓDULO 4.17 · TRANSTORNOS DE PERSONALIDADE · CLUSTER C";

// ============================================================
// 1) SLIDE DECK
// ============================================================
function construirDeck() {
  const pres = deck.novaApresentacao(`${NOME} — Da Neurociência ao Manejo`);

  deck.slideTitulo(pres, {
    moduloLabel: `Módulo ${MOD} · Cluster C · Transtornos de Personalidade`,
    titulo: "TP Evitativa",
    subtitulo: "Desejar conexão e temer a rejeição, ao mesmo tempo",
    passos: ["Mecanismo", "Sinais", "Instrumento", "Manejo", "Encaminhamento"],
  });

  deck.slideRoteiro(pres, {
    rodape: RODAPE_DECK, pageNum: 2,
    cards: [
      { titulo: "Mecanismo", desc: "Por que a rejeição pesa tanto mais aqui" },
      { titulo: "Sinais", desc: "O desejo de conexão que a evitação esconde" },
      { titulo: "Instrumento", desc: "PID-5, SCID-5-PD e Liebowitz na prática" },
      { titulo: "Manejo", desc: "4 passos, com exposição gradual no centro" },
      { titulo: "Encaminhamento", desc: "Quando aprofundar e quando referenciar" },
    ],
  });

  deck.slideHook(pres, {
    rodape: RODAPE_DECK, pageNum: 3,
    frase: "No TP Evitativo, a pessoa não evita o contato porque não quer conexão — evita porque quer tanto, e teme tanto ser rejeitada, que a única saída parece ser não arriscar.",
    apoio: "Essa distinção — desejo presente, mas bloqueado pelo medo — é o que separa esse quadro do TP Esquizoide, e orienta todo o manejo a seguir.",
  });

  deck.slideCircuito(pres, {
    rodape: RODAPE_DECK, pageNum: 4,
    titulo: "Por que a rejeição social pesa tanto mais aqui",
    regioes: [
      { label: "Amígdala (hiper-reativa a sinais de rejeição/crítica social)", rx: 0.20, ry: 0.22, color: deck.TERRA, d: 0.5 },
      { label: "Ínsula (ansiedade antecipatória intensa antes do contato social)", rx: 0.22, ry: 0.62, color: deck.NAVY, d: 0.4 },
      { label: "Córtex pré-frontal (regulação descendente reduzida sob ameaça social)", rx: 0.60, ry: 0.60, color: deck.NAVY_TINT, d: 0.36 },
      { label: "Baixa habituação (a ansiedade não diminui com exposição repetida)", rx: 0.58, ry: 0.24, color: deck.TERRA_TINT, d: 0.36 },
    ],
    notas: [
      "A amígdala responde de forma amplificada a sinais de rejeição ou crítica, inclusive ambíguos, tratando-os como ameaça.",
      "A ínsula gera ansiedade antecipatória intensa mesmo antes do contato social acontecer, o que já motiva a evitação preventiva.",
      "Diferente do desenvolvimento típico, a exposição repetida não reduz a ansiedade na mesma proporção — a baixa habituação mantém o ciclo de evitação.",
    ],
  });

  deck.slideCadeia(pres, {
    rodape: RODAPE_DECK, pageNum: 5,
    titulo: "Da inibição temperamental à evitação pervasiva",
    elos: [
      { titulo: "Inibição comportamental (temperamento)", desc: "Alta reatividade a estímulos novos e sociais, visível desde a infância" },
      { titulo: "Experiências repetidas de rejeição/crítica", desc: "Reais ou percebidas, reforçando a expectativa de julgamento negativo" },
      { titulo: "Crença central de inadequação", desc: "\"Sou fundamentalmente inadequado\", coexistindo com desejo genuíno de conexão" },
      { titulo: "TP Evitativa", desc: "Evitação social pervasiva como estratégia de proteção contra a rejeição prevista" },
    ],
    notaFinal: "Muitos autores consideram o TP Evitativo o extremo mais grave do mesmo espectro da fobia social generalizada — não um quadro totalmente separado.",
  });

  deck.slideCategorias(pres, {
    rodape: RODAPE_DECK, pageNum: 6,
    titulo: "3 traços centrais",
    categorias: [
      { titulo: "Hipersensibilidade à crítica/rejeição", desc: "Reação intensa e duradoura a sinais de avaliação negativa", color: deck.TERRA },
      { titulo: "Sentimento de inadequação", desc: "Autoimagem central de ser socialmente incompetente ou inferior", color: deck.NAVY },
      { titulo: "Inibição social com desejo de conexão", desc: "Evita se aproximar, apesar de querer vínculo genuinamente", color: deck.NAVY_TINT },
    ],
    notaFinal: "O terceiro traço é o que mais diferencia esse quadro na prática clínica — o desejo de conexão está presente, só bloqueado pelo medo.",
  });

  deck.slideSinais(pres, {
    rodape: RODAPE_DECK, pageNum: 7,
    titulo: "Como reconhecer o padrão na prática",
    itens: [
      { titulo: "Cognitivo", desc: "Viés de interpretação negativa (\"vão perceber que sou inadequado\")" },
      { titulo: "Comportamental", desc: "Evitação de situações sociais/profissionais com contato interpessoal significativo" },
      { titulo: "Relacional", desc: "Deseja proximidade, mas evita iniciar ou aprofundar vínculos" },
      { titulo: "Físico", desc: "Sintomas de ansiedade social — rubor, tremor, taquicardia diante de exposição" },
    ],
  });

  deck.slideDiferencial(pres, {
    rodape: RODAPE_DECK, pageNum: 8,
    titulo: "Diagnóstico diferencial rápido",
    cards: [
      { titulo: "Fobia Social generalizada", desc: "TP Evitativa é mais pervasiva, ligada à autoimagem central, não só a situações específicas" },
      { titulo: "TP Esquizoide", desc: "Evitativa deseja conexão e teme rejeição; esquizoide não deseja conexão de forma genuína" },
      { titulo: "TP Dependente", desc: "Evitativa evita se aproximar por medo; dependente se agarra excessivamente uma vez vinculada" },
    ],
  });

  deck.slideInstrumentos(pres, {
    rodape: RODAPE_DECK, pageNum: 9,
    titulo: "Três instrumentos, três finalidades",
    instrumentos: [
      { sigla: "PID-5", nome: "Personality Inventory for DSM-5", desc: "Mapeia os traços patológicos de forma dimensional." },
      { sigla: "SCID-5-PD", nome: "Entrevista Estruturada", desc: "Padrão-ouro pra diagnóstico categorial formal." },
      { sigla: "Liebowitz", nome: "Liebowitz Social Anxiety Scale", desc: "Mede gravidade da ansiedade e evitação social, útil pra monitorar evolução." },
    ],
  });

  deck.slideProtocoloOverview(pres, {
    rodape: RODAPE_DECK, pageNum: 10,
    titulo: "Do mecanismo ao manejo: 4 passos",
    passos: [
      { titulo: "Exposição\ngradual", desc: "Hierarquia de situações sociais, do menos ao mais temido" },
      { titulo: "Reestruturação\ndo viés", desc: "Questionar a expectativa automática de rejeição" },
      { titulo: "Autoestima\nindependente", desc: "Valor pessoal que não dependa da aprovação social constante" },
      { titulo: "Vínculo\nterapêutico ativo", desc: "A relação terapêutica como treino seguro de intimidade" },
    ],
    notaFinal: "A própria relação terapêutica funciona como campo de prática — muitas vezes é o primeiro vínculo em que o paciente se permite alguma exposição emocional.",
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 11,
    titulo: "Passos 1 e 2, na prática",
    colunas: [
      {
        numero: 1, titulo: "Exposição gradual",
        bullets: ["Construa uma hierarquia de situações sociais, do menos ao mais ansiogênico", "Avance apenas com o consentimento explícito do paciente a cada etapa", "Celebre pequenos avanços — o objetivo é construir tolerância, não velocidade"],
      },
      {
        numero: 2, titulo: "Reestruturação do viés de rejeição",
        fala: "“Que evidência real você tem de que essa pessoa vai te rejeitar — e que outras explicações também seriam possíveis?”",
        bullets: ["Questione a automaticidade da previsão de rejeição, sem negar que ela às vezes acontece de fato"],
      },
    ],
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 12,
    titulo: "Passos 3 e 4, na prática",
    colunas: [
      {
        numero: 3, titulo: "Autoestima independente",
        bullets: ["Ajude o paciente a reconhecer valor pessoal que não depende de aprovação social constante", "Trabalhe a diferença entre \"ser rejeitado numa situação\" e \"ser fundamentalmente inadequado\""],
      },
      {
        numero: 4, titulo: "Vínculo terapêutico ativo",
        fala: "“Aqui, mesmo quando você mostra o que teme mostrar, a relação continua — isso também é uma forma de prática.”",
        bullets: ["Use rupturas e reparos pequenos na relação terapêutica como oportunidade segura de exposição relacional", "Consistência e previsibilidade do terapeuta são especialmente importantes aqui"],
      },
    ],
  });

  deck.slideCaso(pres, {
    rodape: RODAPE_DECK, pageNum: 13,
    vinheta: "Marcos, 29 anos, procura terapia porque \"nunca consigo manter uma amizade além do superficial\". Relata que evita convites sociais por medo de \"falar besteira e todo mundo perceber que sou estranho\", mas também diz sentir uma solidão profunda nos fins de semana. No trabalho, recusou uma promoção que exigiria mais apresentações em público, mesmo tendo o desempenho técnico necessário.",
    perguntas: [
      "Que elementos da vinheta ilustram os 3 traços centrais do TP Evitativo?",
      "Como você diferenciaria esse caso de um quadro de TP Esquizoide, com base no que Marcos relata sentir?",
      "Que primeiro passo da hierarquia de exposição (passo 1) você sugeriria para Marcos, considerando a recusa da promoção?",
    ],
  });

  deck.slideEncaminhamento(pres, {
    rodape: RODAPE_DECK, pageNum: 14,
    criterios: [
      "Comorbidade com Fobia Social generalizada ou Transtorno de Ansiedade Generalizada, comum nesse perfil",
      "Sintomas depressivos associados a isolamento social prolongado e solidão crônica",
      "Prejuízo funcional severo (recusa sistemática de oportunidades profissionais, isolamento extremo)",
      "Considerar terapia de grupo como complemento, quando tolerável, pra prática social supervisionada",
    ],
  });

  deck.slideRecap(pres, {
    rodape: RODAPE_DECK, pageNum: 15,
    pontos: [
      "No TP Evitativo, o desejo de conexão está presente, mas bloqueado pelo medo intenso de rejeição",
      "Hipersensibilidade à crítica, sentimento de inadequação e inibição social com desejo de conexão são os 3 traços centrais",
      "PID-5, SCID-5-PD e Liebowitz estruturam a avaliação e o acompanhamento da gravidade",
      "O manejo combina exposição gradual, reestruturação do viés de rejeição e uso ativo do próprio vínculo terapêutico",
    ],
    proximoTexto: "Próximo: exercícios práticos e avaliação do Módulo 4.17 →",
  });

  return pres.writeFile({ fileName: "Modulo-4.17-TP-Evitativa.pptx" });
}

// ============================================================
// 2) EXERCÍCIOS
// ============================================================
function construirExercicios() {
  const children = [
    ...doc.capa(KICKER, "Exercícios — TP Evitativa", "Resolva individualmente antes da sessão de supervisão. O objetivo é testar sua leitura do mecanismo e do manejo antes de comparar com a discussão em grupo — não há problema em errar."),

    doc.exNum(1, "O mecanismo, em suas palavras"),
    doc.pergunta(1, "Explique em até 3 frases, sem jargão técnico, por que a rejeição social pesa mais nesse perfil do que na média das pessoas."),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Por que muitos autores consideram o TP Evitativo o extremo mais grave do espectro da fobia social generalizada?"),
    ...doc.linhaResposta(2),

    doc.exNum(2, "Diagnóstico diferencial"),
    doc.vinhetaBox("Um paciente evita ativamente contato social, mas relata sentir solidão profunda e desejo genuíno de ter amigos próximos."),
    doc.pergunta(1, "TP Evitativa ou TP Esquizoide? Justifique com base no elemento central presente na vinheta."),
    ...doc.linhaResposta(2),

    doc.exNum(3, "Reestruturação do viés de rejeição"),
    doc.vinhetaBox("Um paciente afirma \"tenho certeza que se eu falar no jantar da empresa, todo mundo vai perceber que sou estranho\"."),
    doc.pergunta(1, "Escreva uma pergunta terapêutica que questione essa previsão automática, sem negar que a rejeição às vezes acontece de fato."),
    ...doc.linhaResposta(3),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),

    doc.exNum(4, "Hierarquia de exposição"),
    doc.p("Construa uma hierarquia de 4 passos, do menos ao mais ansiogênico, pra um paciente que evita completamente eventos sociais no trabalho."),
    doc.tabelaSimples(["Nível", "Situação"], [["1 (mais fácil)", ""], ["2", ""], ["3", ""], ["4 (mais difícil)", ""]], [2200, 7150]),

    doc.exNum(5, "Caso integrado — Marcos"),
    doc.vinhetaBox("Marcos, 29 anos, nunca mantém amizades além do superficial, evita convites por medo de \"parecer estranho\", sente solidão profunda nos fins de semana, e recusou uma promoção que exigiria mais apresentações públicas."),
    doc.pergunta(1, "Identifique os 3 traços centrais presentes na vinheta."),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Que primeiro passo da hierarquia de exposição você sugeriria para Marcos?"),
    ...doc.linhaResposta(2),
    doc.pergunta(3, "Que critério de encaminhamento (dentre os 4 estudados) pode estar relacionado à recusa da promoção?"),
    ...doc.linhaResposta(1),
  ];

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-4.17-Exercicios.docx");
}

// ============================================================
// 3) AVALIAÇÃO
// ============================================================
function construirProva() {
  const objetivas = [
    ["No TP Evitativo, a amígdala tende a apresentar:", ["Resposta amplificada a sinais de rejeição ou crítica social, inclusive ambíguos", "Resposta reduzida a qualquer estímulo social", "Nenhuma alteração relevante em relação à população geral", "Hiperfunção exclusivamente durante o sono"]],
    ["\"Baixa habituação\", nesse perfil, significa que:", ["A ansiedade não diminui na mesma proporção com exposição repetida", "A ansiedade desaparece completamente após uma única exposição", "Não há qualquer resposta de ansiedade nesse quadro", "A habituação ocorre de forma mais rápida do que na população geral"]],
    ["Os 3 traços centrais do TP Evitativo são:", ["Hipersensibilidade à crítica/rejeição, sentimento de inadequação, inibição social com desejo de conexão", "Grandiosidade, necessidade de admiração, falta de empatia", "Desconsideração por normas, falta de remorso, impulsividade", "Instabilidade afetiva, de vínculo/autoimagem, impulsividade autolesiva"]],
    ["O que diferencia TP Evitativa de TP Esquizoide?", ["Não há diferença clínica relevante entre eles", "Evitativa deseja conexão e teme rejeição; esquizoide não deseja conexão de forma genuína", "Esquizoide sempre tem mais amigos que evitativa", "Evitativa nunca sente solidão"]],
    ["Instrumento que mede gravidade da ansiedade e evitação social, útil pra monitorar evolução:", ["Liebowitz Social Anxiety Scale", "PCL-R", "Y-BOCS", "MBI"]],
    ["Muitos autores consideram o TP Evitativo:", ["O extremo mais grave do mesmo espectro da fobia social generalizada", "Um quadro totalmente independente, sem relação com ansiedade social", "Idêntico ao TP Esquizoide em todos os aspectos", "Uma condição exclusivamente biológica, sem componente ambiental"]],
    ["No passo \"exposição gradual\", a hierarquia de situações deve avançar:", ["Do menos ao mais ansiogênico, com consentimento explícito a cada etapa", "Sempre começando pela situação mais temida possível", "Sem qualquer ordem ou critério específico", "Apenas em ambiente de grupo, nunca individualmente"]],
    ["A pergunta \"que evidência real você tem de que essa pessoa vai te rejeitar?\" ilustra qual passo do manejo?", ["Reestruturação do viés de rejeição", "Exposição gradual", "Autoestima independente", "Vínculo terapêutico ativo"]],
    ["Por que o vínculo terapêutico em si é considerado parte ativa do manejo nesse perfil?", ["Porque funciona como campo de prática segura de intimidade e exposição relacional", "Porque o paciente nunca deve interagir emocionalmente com o terapeuta", "Porque a relação terapêutica não tem qualquer relevância clínica aqui", "Porque deve ser mantida sempre à distância, sem qualquer proximidade"]],
    ["Diante de prejuízo funcional severo, como recusa sistemática de oportunidades profissionais, o módulo recomenda:", ["Considerar isso um critério relevante de encaminhamento/aprofundamento", "Ignorar, pois é esperado nesse perfil", "Reduzir a frequência das sessões automaticamente", "Encaminhar apenas para orientação vocacional, sem qualquer outra intervenção"]],
  ];
  const gabaritoObjetivas = ["a", "a", "a", "b", "a", "a", "a", "a", "a", "a"];

  const children = [
    ...doc.capa(KICKER, "Avaliação — TP Evitativa", `Avaliação formativa de encerramento do Módulo ${MOD}.`),
    doc.infoBox([
      ["Nota de corte:", "70 de 100 pontos"],
      ["Tempo sugerido:", "40 minutos"],
      ["Composição:", "10 questões objetivas (6 pts cada = 60 pts) + 1 questão de caso (40 pts)"],
      ["Consulta:", "Material da aula permitido; discussão entre colegas, não"],
    ]),
    doc.tituloH1("Parte 1 — Questões objetivas"),
  ];
  objetivas.forEach((q, i) => children.push(...doc.questaoObjetiva(i + 1, q[0], q[1])));

  children.push(
    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    doc.tituloH1("Parte 2 — Questão de caso (40 pontos)"),
    doc.vinhetaBox("Juliana, 33 anos, relata que adoraria ter um relacionamento sério, mas evita aplicativos de namoro e convites de amigos porque \"tenho certeza que vou fazer alguma besteira e a pessoa vai perceber que não sou boa o suficiente\". Chora ao descrever a solidão dos últimos anos, mas diz que \"prefiro ficar sozinha do que passar pela vergonha de ser rejeitada\"."),
    new doc.Paragraph({ spacing: { before: 240 }, children: [new doc.TextRun({ text: "Com base no protocolo estudado, responda:", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    new doc.Paragraph({ spacing: { before: 220, after: 40 }, children: [new doc.TextRun({ text: "a) (10 pts) Identifique os 3 traços centrais do TP Evitativo presentes na vinheta.", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "b) (10 pts) Que diagnóstico diferencial você descartaria com base na fala de Juliana, e por quê?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "c) (10 pts) Sugira uma primeira etapa realista de exposição gradual para Juliana.", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "d) (10 pts) Escreva uma pergunta de reestruturação do viés de rejeição pra usar com a frase \"tenho certeza que vou fazer alguma besteira\".", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    new doc.Paragraph({ spacing: { after: 40 }, children: [new doc.TextRun({ text: "USO EXCLUSIVO DO INSTRUTOR — remover antes de aplicar a prova", bold: true, color: doc.TERRA, font: doc.FONT, size: 20 })] }),
    doc.tituloH1("Gabarito"),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 1 — Questões objetivas", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 200 }, children: [new doc.TextRun({ text: gabaritoObjetivas.map((r, i) => `${i + 1}-${r}`).join("   ·   "), font: doc.FONT, size: 22, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 2 — Critério de correção da questão de caso", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "a) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Hipersensibilidade à rejeição (\"vão perceber que não sou boa o suficiente\"), sentimento de inadequação, e inibição social com desejo de conexão (\"adoraria ter um relacionamento\", mas evita).", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "b) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "TP Esquizoide, descartado pelo desejo genuíno e explícito de conexão e pela dor da solidão relatada — no esquizoide, esse desejo tipicamente não está presente.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "c) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Ex: iniciar com interações sociais de baixo risco (mensagem de texto com um contato já conhecido) antes de avançar pra situações mais expostas como aplicativos de namoro.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "d) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Ex: \"Que evidência real você tem disso — e o que mais poderia explicar a reação da outra pessoa, além de rejeição?\"", font: doc.FONT, size: 21, color: doc.INK })] }),
  );

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-4.17-Avaliacao.docx");
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
      n: 1, titulo: "Desejar conexão e temer a rejeição", duracao: "12 min", slides: "1, 2, 3, 4",
      objetivo: "Sair sabendo explicar o mecanismo do TP Evitativo sem jargão, e a distinção-chave com o TP Esquizoide.",
      segmentos: [
        seg("0:00–0:45", "Abertura (gancho)", [{ fala: "No TP Evitativo, a pessoa não evita o contato porque não quer conexão — evita porque quer tanto, e teme tanto ser rejeitada, que a única saída parece ser não arriscar." }]),
        seg("0:45–2:00", "Por que essa distinção importa", ["Desejo presente, mas bloqueado pelo medo — separa esse quadro do TP Esquizoide.", "Orienta todo o manejo a seguir."]),
        seg("2:00–8:00", "Por que a rejeição pesa tanto mais aqui (mostrar slide 4)", [
          "Amígdala hiper-reativa a sinais de rejeição/crítica social.",
          "Ínsula com ansiedade antecipatória intensa antes do contato social.",
          "Córtex pré-frontal com regulação reduzida sob ameaça social.",
          "Baixa habituação — a ansiedade não diminui com exposição repetida.",
        ]),
        seg("8:00–10:30", "Um ponto importante", ["Isso explica por que \"só se expor mais\" sem suporte estruturado raramente funciona sozinho."]),
        seg("10:30–12:00", "Fechamento", [{ fala: "Próxima aula: como esse padrão se consolida ao longo do desenvolvimento." }]),
      ],
    },
    {
      n: 2, titulo: "Da inibição temperamental à evitação pervasiva", duracao: "10 min", slides: "5",
      objetivo: "Explicar a cadeia desenvolvimental entre temperamento inibido e a consolidação do padrão evitativo.",
      segmentos: [
        seg("0:00–1:00", "Retomada rápida", ["Vimos as estruturas envolvidas. Hoje vemos como o padrão se forma ao longo do tempo."]),
        seg("1:00–6:30", "A cadeia (mostrar slide 5)", ["Inibição comportamental, temperamento visível desde a infância.", "Experiências repetidas de rejeição/crítica, reais ou percebidas.", "Crença central de inadequação, coexistindo com desejo de conexão.", "TP Evitativa: evitação social pervasiva como proteção."]),
        seg("6:30–9:00", "Uma leitura importante", ["Muitos autores consideram esse o extremo mais grave do espectro da fobia social generalizada."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: os 3 traços centrais do TP Evitativo." }]),
      ],
    },
    {
      n: 3, titulo: "Os 3 traços centrais", duracao: "10 min", slides: "6",
      objetivo: "Reconhecer hipersensibilidade à crítica, sentimento de inadequação e inibição social com desejo de conexão.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três traços — o terceiro é o que mais diferencia esse quadro na prática."]),
        seg("1:00–7:00", "Os 3 traços (mostrar slide 6)", [
          "Hipersensibilidade à crítica/rejeição: reação intensa e duradoura a avaliação negativa.",
          "Sentimento de inadequação: autoimagem de ser socialmente incompetente.",
          "Inibição social com desejo de conexão: evita se aproximar, apesar de querer vínculo.",
        ]),
        seg("7:00–9:00", "Por que o 3º traço importa tanto", ["É o que diferencia esse quadro de outros perfis mais retraídos — o desejo está lá."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: como reconhecer esse padrão nas 4 dimensões clínicas." }]),
      ],
    },
    {
      n: 4, titulo: "Sinais de alerta", duracao: "10 min", slides: "7",
      objetivo: "Reconhecer sinais cognitivos, comportamentais, relacionais e físicos do padrão evitativo.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Reconhecer o padrão com precisão orienta a escolha do primeiro passo do manejo."]),
        seg("1:00–7:30", "As 4 categorias (mostrar slide 7)", [
          "Cognitivo: viés de interpretação negativa.",
          "Comportamental: evitação de situações sociais/profissionais significativas.",
          "Relacional: deseja proximidade, mas evita iniciar ou aprofundar vínculos.",
          "Físico: sintomas de ansiedade social diante de exposição.",
        ]),
        seg("7:30–9:00", "Por que isso importa", ["Esses sinais orientam a construção da hierarquia de exposição no manejo."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: como diferenciar de quadros parecidos." }]),
      ],
    },
    {
      n: 5, titulo: "Diagnóstico diferencial rápido", duracao: "11 min", slides: "8",
      objetivo: "Diferenciar TP Evitativa de Fobia Social generalizada, TP Esquizoide e TP Dependente.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Um filtro rápido — a presença ou ausência do desejo de conexão é a chave de uma dessas diferenciações."]),
        seg("1:00–8:00", "Os 3 comparativos (mostrar slide 8)", [
          "Fobia Social generalizada: TP Evitativa é mais pervasiva, ligada à autoimagem central.",
          "TP Esquizoide: evitativa deseja conexão e teme rejeição; esquizoide não deseja conexão genuína.",
          "TP Dependente: evitativa evita se aproximar; dependente se agarra excessivamente uma vez vinculada.",
        ]),
        seg("8:00–10:30", "Por que a diferenciação com esquizoide importa tanto", ["Muda completamente a leitura clínica — presença ou ausência de desejo de conexão."]),
        seg("10:30–11:00", "Fechamento", [{ fala: "Próxima aula: os instrumentos que confirmam essa leitura com dado." }]),
      ],
    },
    {
      n: 6, titulo: "Os 3 instrumentos de avaliação", duracao: "11 min", slides: "9",
      objetivo: "Saber quando usar PID-5, SCID-5-PD e Liebowitz Social Anxiety Scale.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três instrumentos, três finalidades — um deles é específico pra ansiedade e evitação social."]),
        seg("1:00–4:30", "PID-5", ["Mapeia os traços patológicos de forma dimensional."]),
        seg("4:30–7:30", "SCID-5-PD", ["Entrevista estruturada.", "Padrão-ouro pra diagnóstico categorial formal."]),
        seg("7:30–10:00", "Liebowitz Social Anxiety Scale", ["Mede gravidade da ansiedade e evitação social.", "Útil pra monitorar evolução ao longo do tratamento."]),
        seg("10:00–11:00", "Fechamento", [{ fala: "Próxima aula: colocamos tudo em prática — exposição gradual e reestruturação do viés." }]),
      ],
    },
    {
      n: 7, titulo: "Manejo — exposição gradual e reestruturação do viés", duracao: "13 min", slides: "10, 11",
      objetivo: "Aplicar os passos 1 e 2 do manejo, construindo hierarquia e questionando o viés de rejeição.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["A parte prática central desse módulo. Hoje, os 2 primeiros passos."]),
        seg("1:00–2:00", "Visão geral (mostrar slide 10)", ["Exposição gradual → Reestruturação do viés → Autoestima independente → Vínculo terapêutico ativo.", "A relação terapêutica em si funciona como campo de prática."]),
        seg("2:00–7:00", "Passo 1 — Exposição gradual (mostrar slide 11, esquerda)", ["Construa uma hierarquia de situações, do menos ao mais ansiogênico.", "Avance apenas com consentimento explícito a cada etapa.", "Celebre pequenos avanços — o objetivo é tolerância, não velocidade."]),
        seg("7:00–12:00", "Passo 2 — Reestruturação do viés (mostrar slide 11, direita)", [{ fala: "Que evidência real você tem de que essa pessoa vai te rejeitar — e que outras explicações também seriam possíveis?" }]),
        seg("12:00–13:00", "Fechamento", [{ fala: "Próxima aula: autoestima independente e o uso ativo do vínculo terapêutico." }]),
      ],
    },
    {
      n: 8, titulo: "Manejo — autoestima independente e vínculo terapêutico", duracao: "13 min", slides: "12",
      objetivo: "Trabalhar autoestima não dependente de aprovação social e usar a relação terapêutica como treino.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Hoje fechamos o manejo com o trabalho de fundo mais estrutural."]),
        seg("1:00–7:00", "Passo 3 — Autoestima independente (mostrar slide 12, esquerda)", ["Ajude o paciente a reconhecer valor pessoal que não depende de aprovação constante.", "Trabalhe a diferença entre \"ser rejeitado numa situação\" e \"ser fundamentalmente inadequado\"."]),
        seg("7:00–12:00", "Passo 4 — Vínculo terapêutico ativo (mostrar slide 12, direita)", [{ fala: "Aqui, mesmo quando você mostra o que teme mostrar, a relação continua — isso também é uma forma de prática." }, "Use rupturas e reparos pequenos na relação como oportunidade segura de exposição relacional."]),
        seg("12:00–13:00", "Fechamento", [{ fala: "Manejo completo. Próxima aula: um caso real e os critérios de quando escalar." }]),
      ],
    },
    {
      n: 9, titulo: "Estudo de caso, encaminhamento e recap", duracao: "15 min", slides: "13, 14, 15",
      objetivo: "Integrar mecanismo, instrumento e manejo num caso completo.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Última aula do módulo. Caso completo e os critérios de quando aprofundar ou referenciar."]),
        seg("1:00–7:00", "Estudo de caso — Marcos (mostrar slide 13)", ["Leia a vinheta com calma.", "Percorra as 3 perguntas de discussão.", "Convide o aluno a pausar e responder por escrito."]),
        seg("7:00–11:00", "Quando encaminhar (mostrar slide 14)", ["Percorra os 4 critérios, com atenção a comorbidades de ansiedade e depressão associada ao isolamento."]),
        seg("11:00–14:00", "Recapitulando o módulo (mostrar slide 15)", ["Retome os 4 pontos-chave.", "Reforce a reformulação central: desejo de conexão bloqueado pelo medo, não ausência de desejo."]),
        seg("14:00–15:00", "Fechamento do módulo", [{ fala: "Agora é hora dos exercícios e da avaliação. Te vejo no próximo transtorno de personalidade." }]),
      ],
    },
  ];

  const totalMin = 12 + 10 + 10 + 10 + 11 + 11 + 13 + 13 + 15;

  const children = [
    ...doc.capa(KICKER, "Roteiro de Aulas — TP Evitativa", "Módulo dividido em 9 vídeo-aulas de 10 a 15 minutos, seguindo os slides já produzidos. Cada aula tem roteiro cronometrado, pronto pra gravação."),
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

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", `${RODAPE_DOC} — Roteiro de Aulas`, children), "Modulo-4.17-Roteiro-Aulas.docx");
}

// ============================================================
Promise.resolve()
  .then(construirDeck)
  .then(construirExercicios)
  .then(construirProva)
  .then(construirRoteiro)
  .then(() => console.log("TUDO PRONTO"))
  .catch((e) => { console.error(e); process.exit(1); });

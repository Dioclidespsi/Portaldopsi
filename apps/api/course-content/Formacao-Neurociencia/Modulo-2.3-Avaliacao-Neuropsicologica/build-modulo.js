const deck = require("../_lib/lib-deck.js");
const doc = require("../_lib/lib-doc.js");

const MOD = "2.3";
const NOME = "Avaliação Neuropsicológica: Atenção, Memória e Funções Executivas";
const RODAPE_DECK = `Avaliação Neuropsicológica — Módulo ${MOD}`;
const RODAPE_DOC = `Módulo ${MOD} — Avaliação Neuropsicológica`;
const KICKER = "MÓDULO 2.3 · PSICODIAGNÓSTICO E AVALIAÇÃO NEUROPSICOLÓGICA";

// ============================================================
// 1) SLIDE DECK
// ============================================================
function construirDeck() {
  const pres = deck.novaApresentacao(`${NOME} — Testes Reais para Cada Domínio Cognitivo`);

  deck.slideTitulo(pres, {
    moduloLabel: `Módulo ${MOD} · Bloco 2 · Avaliação`,
    titulo: "Avaliação Neuropsicológica",
    subtitulo: "Atenção, memória e funções executivas: qual teste usar, e quando",
    passos: ["Atenção", "Memória", "Funções executivas", "Aplicação", "Leitura clínica"],
  });

  deck.slideRoteiro(pres, {
    rodape: RODAPE_DECK, pageNum: 2,
    cards: [
      { titulo: "Atenção", desc: "Trail Making Test e Teste de Atenção Concentrada" },
      { titulo: "Memória", desc: "RAVLT e Figura Complexa de Rey" },
      { titulo: "Funções executivas", desc: "WCST, Stroop e Torre de Londres" },
      { titulo: "Aplicação e correção", desc: "Padronização e uso de normas populacionais" },
      { titulo: "Leitura clínica", desc: "Interpretar o resultado no contexto, nunca isolado" },
    ],
  });

  deck.slideHook(pres, {
    rodape: RODAPE_DECK, pageNum: 3,
    frase: "Aplicar teste neuropsicológico não é passar o paciente por uma bateria genérica — é escolher o instrumento certo pra responder a uma pergunta clínica específica que a entrevista já levantou.",
    apoio: "Um teste aplicado sem essa pergunta prévia (Módulo 2.1) tende a gerar dados difíceis de interpretar, mesmo quando tecnicamente bem aplicado.",
  });

  deck.slideCircuito(pres, {
    rodape: RODAPE_DECK, pageNum: 4,
    titulo: "4 funções-âncora e seus testes de referência",
    regioes: [
      { label: "Atenção sustentada (Trail Making A, Teste de Atenção Concentrada)", rx: 0.20, ry: 0.22, color: deck.NAVY, d: 0.5 },
      { label: "Memória verbal (RAVLT — aprendizagem e evocação)", rx: 0.22, ry: 0.62, color: deck.TERRA, d: 0.4 },
      { label: "Flexibilidade cognitiva (Wisconsin Card Sorting Test)", rx: 0.60, ry: 0.60, color: deck.NAVY_TINT, d: 0.36 },
      { label: "Controle inibitório (Stroop, Trail Making B)", rx: 0.58, ry: 0.24, color: deck.TERRA_TINT, d: 0.36 },
    ],
    notas: [
      "Atenção sustentada é avaliada por tarefas de busca visual cronometradas, sensíveis a lentificação e desatenção.",
      "Memória verbal é avaliada por listas de palavras com múltiplas tentativas de aprendizagem e evocação tardia.",
      "Flexibilidade cognitiva e controle inibitório, ambos ligados ao córtex pré-frontal, são frequentemente os mais sensíveis a disfunção executiva sutil.",
    ],
  });

  deck.slideCadeia(pres, {
    rodape: RODAPE_DECK, pageNum: 5,
    titulo: "Da queixa cognitiva ao instrumento certo",
    elos: [
      { titulo: "Queixa relatada", desc: "\"Esqueço tudo\", \"não consigo focar\", \"me perco em decisões\"" },
      { titulo: "Hipótese de domínio", desc: "A queixa aponta pra atenção, memória ou função executiva?" },
      { titulo: "Seleção do instrumento", desc: "Escolha do teste específico que melhor testa essa hipótese" },
      { titulo: "Interpretação contextual", desc: "Resultado lido junto com a anamnese, nunca isoladamente" },
    ],
    notaFinal: "Queixas de memória, por exemplo, frequentemente refletem problema de atenção primário — só o teste certo diferencia isso com precisão.",
  });

  deck.slideCategorias(pres, {
    rodape: RODAPE_DECK, pageNum: 6,
    titulo: "3 domínios e seus testes de referência",
    categorias: [
      { titulo: "Atenção", desc: "Trail Making A, Teste de Atenção Concentrada (AC)", color: deck.NAVY },
      { titulo: "Memória", desc: "RAVLT, Figura Complexa de Rey", color: deck.TERRA },
      { titulo: "Funções executivas", desc: "WCST, Stroop, Torre de Londres, Trail Making B", color: deck.NAVY_TINT },
    ],
    notaFinal: "Muitos desses testes, na prática, avaliam mais de um domínio simultaneamente — a interpretação exige entender exatamente o que cada parte da tarefa mede.",
  });

  deck.slideSinais(pres, {
    rodape: RODAPE_DECK, pageNum: 7,
    titulo: "Sinais que orientam qual domínio investigar primeiro",
    itens: [
      { titulo: "Atenção", desc: "Dificuldade de manter foco, distração fácil, erros por desatenção" },
      { titulo: "Memória", desc: "Esquecimento de compromissos, dificuldade de reter informação nova" },
      { titulo: "Funções executivas", desc: "Dificuldade de planejar, de mudar de estratégia, impulsividade" },
      { titulo: "Combinado", desc: "Queixas amplas e difusas geralmente exigem bateria com mais de um teste" },
    ],
  });

  deck.slideDiferencial(pres, {
    rodape: RODAPE_DECK, pageNum: 8,
    titulo: "Comprometimento real versus efeito situacional",
    cards: [
      { titulo: "Comprometimento neuropsicológico real", desc: "Padrão consistente, replicável, presente em múltiplos contextos" },
      { titulo: "Pseudodemência depressiva", desc: "Desempenho cognitivo reduzido por depressão grave, reversível com tratamento" },
      { titulo: "TDAH (Módulo 4.22)", desc: "Padrão de atenção específico, pervasivo desde a infância, não situacional" },
    ],
  });

  deck.slideInstrumentos(pres, {
    rodape: RODAPE_DECK, pageNum: 9,
    titulo: "Três testes centrais, em detalhe",
    instrumentos: [
      { sigla: "Trail Making Test", nome: "Partes A e B", desc: "A mede atenção/velocidade; B acrescenta alternância, medindo flexibilidade." },
      { sigla: "RAVLT", nome: "Rey Auditory Verbal Learning Test", desc: "Lista de palavras com tentativas repetidas, mede curva de aprendizagem e evocação tardia." },
      { sigla: "WCST", nome: "Wisconsin Card Sorting Test", desc: "Mede flexibilidade cognitiva pela capacidade de mudar de regra sem instrução explícita." },
    ],
  });

  deck.slideProtocoloOverview(pres, {
    rodape: RODAPE_DECK, pageNum: 10,
    titulo: "Da seleção à interpretação: 4 passos",
    passos: [
      { titulo: "Selecionar o\nteste certo", desc: "Com base na hipótese de domínio levantada na entrevista" },
      { titulo: "Padronizar a\naplicação", desc: "Seguir rigorosamente o manual — desvios comprometem a validade" },
      { titulo: "Corrigir com\nnorma adequada", desc: "Usar tabelas normativas compatíveis com idade e escolaridade" },
      { titulo: "Interpretar em\ncontexto", desc: "Cruzar resultado com anamnese e exame do estado mental" },
    ],
    notaFinal: "Um resultado numérico isolado, sem esse contexto completo, tem valor clínico limitado — o laudo neuropsicológico é sempre uma síntese, não uma pontuação solta.",
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 11,
    titulo: "Passos 1 e 2, na prática",
    colunas: [
      {
        numero: 1, titulo: "Selecionar o teste certo",
        bullets: ["Queixa de esquecimento: priorize RAVLT e Figura Complexa de Rey", "Queixa de desorganização/impulsividade: priorize WCST, Stroop e Torre de Londres"],
      },
      {
        numero: 2, titulo: "Padronizar a aplicação",
        fala: "“Vamos fazer uma tarefa que vai te ajudar a entender melhor como sua atenção e memória estão funcionando agora.”",
        bullets: ["Siga exatamente as instruções do manual, sem improvisar instruções", "Controle o ambiente (ruído, interrupções) que pode afetar o desempenho"],
      },
    ],
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 12,
    titulo: "Passos 3 e 4, na prática",
    colunas: [
      {
        numero: 3, titulo: "Corrigir com norma adequada",
        bullets: ["Use sempre a tabela normativa compatível com idade e escolaridade do paciente", "Escolaridade, em particular, afeta fortemente o desempenho em vários desses testes"],
      },
      {
        numero: 4, titulo: "Interpretar em contexto",
        bullets: ["Cruze o resultado numérico com a queixa original e o exame do estado mental (Módulo 2.1)", "Um único teste abaixo da média não confirma, sozinho, um diagnóstico"],
      },
    ],
  });

  deck.slideCaso(pres, {
    rodape: RODAPE_DECK, pageNum: 13,
    vinheta: "Uma paciente de 45 anos relata \"esquecer tudo\" nos últimos 3 meses, coincidindo com um quadro de humor deprimido significativo, insônia e perda de interesse generalizada. Ela nunca teve queixas cognitivas antes desse período.",
    perguntas: [
      "Que hipótese diagnóstica alternativa (não neuropsicológica) deveria ser investigada antes de aplicar uma bateria extensa?",
      "Que testes você aplicaria, e por quê, se ainda assim decidisse avaliar formalmente?",
      "Como a interpretação do resultado mudaria dependendo se a queixa fosse presente desde a infância, em vez de recente?",
    ],
  });

  deck.slideEncaminhamento(pres, {
    rodape: RODAPE_DECK, pageNum: 14,
    criterios: [
      "Padrão de comprometimento consistente com causa neurológica (não apenas psiquiátrica): encaminhar pra avaliação médica/neurológica",
      "Suspeita de pseudodemência depressiva: tratar o quadro depressivo antes de reavaliar cognitivamente",
      "Padrão pervasivo desde a infância: considerar avaliação formal de TDAH (Módulo 4.22) ou TEA (Módulo 4.27)",
      "Resultado inconsistente com o relato funcional do dia a dia: investigar fatores situacionais antes de fechar conclusão",
    ],
  });

  deck.slideRecap(pres, {
    rodape: RODAPE_DECK, pageNum: 15,
    pontos: [
      "Cada teste responde a uma pergunta clínica específica — a escolha do instrumento parte da hipótese levantada na entrevista",
      "Atenção, memória e funções executivas são os 3 domínios centrais, cada um com testes de referência próprios",
      "Padronização de aplicação e uso de norma adequada são essenciais pra validade do resultado",
      "O resultado numérico só ganha significado clínico quando interpretado junto com a anamnese e o exame do estado mental",
    ],
    proximoTexto: "Próximo: exercícios práticos e avaliação do Módulo 2.3 →",
  });

  return pres.writeFile({ fileName: "Modulo-2.3-Avaliacao-Neuropsicologica.pptx" });
}

// ============================================================
// 2) EXERCÍCIOS
// ============================================================
function construirExercicios() {
  const children = [
    ...doc.capa(KICKER, "Exercícios — Avaliação Neuropsicológica", "Resolva individualmente antes da sessão de supervisão. O objetivo é testar sua leitura clínica antes de comparar com a discussão em grupo — não há problema em errar."),

    doc.exNum(1, "Os 3 domínios, em suas palavras"),
    doc.pergunta(1, "Explique em uma frase cada domínio: atenção, memória, funções executivas."),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Por que queixas de memória frequentemente refletem, na verdade, problema de atenção primário?"),
    ...doc.linhaResposta(2),

    doc.exNum(2, "Escolhendo o teste certo"),
    doc.tabelaSimples(["Queixa relatada", "Teste prioritário"], [["\"Esqueço tudo\"", ""], ["\"Não consigo focar\"", ""], ["\"Me perco em decisões, ajo por impulso\"", ""]], [4600, 4550]),

    doc.exNum(3, "Comprometimento real x pseudodemência"),
    doc.vinhetaBox("Uma paciente com depressão grave apresenta desempenho reduzido em teste de memória, mas nunca teve queixa cognitiva antes do episódio depressivo atual."),
    doc.pergunta(1, "Que hipótese alternativa deve ser considerada antes de concluir comprometimento neuropsicológico primário?"),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),

    doc.exNum(4, "Padronização e norma"),
    doc.pergunta(1, "Por que a escolaridade do paciente afeta a interpretação de vários desses testes?"),
    ...doc.linhaResposta(2),

    doc.exNum(5, "Caso integrado"),
    doc.vinhetaBox("Uma paciente de 45 anos relata esquecer tudo há 3 meses, coincidindo com humor deprimido, insônia e perda de interesse generalizada, sem queixas cognitivas anteriores."),
    doc.pergunta(1, "Que hipótese diagnóstica alternativa deveria ser investigada antes de uma bateria extensa?"),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Que testes você aplicaria, e por quê, se decidisse avaliar formalmente?"),
    ...doc.linhaResposta(2),
    doc.pergunta(3, "Como a interpretação mudaria se a queixa fosse presente desde a infância?"),
    ...doc.linhaResposta(2),
  ];

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-2.3-Exercicios.docx");
}

// ============================================================
// 3) AVALIAÇÃO
// ============================================================
function construirProva() {
  const objetivas = [
    ["Os 4 funções-âncora estudadas no módulo são:", ["Atenção sustentada, memória verbal, flexibilidade cognitiva, controle inibitório", "Grandiosidade, necessidade de admiração, falta de empatia, impulsividade", "Sintomas nucleares, duração mínima, prejuízo funcional, exclusão de causas", "Serotonina, dopamina, GABA, glutamato"]],
    ["O Trail Making Test, parte B, acrescenta em relação à parte A:", ["Alternância entre categorias, medindo flexibilidade cognitiva", "Nenhuma diferença relevante em relação à parte A", "Avaliação exclusiva de memória verbal", "Avaliação exclusiva de linguagem"]],
    ["O RAVLT avalia principalmente:", ["Curva de aprendizagem e evocação tardia de memória verbal", "Exclusivamente flexibilidade cognitiva", "Exclusivamente atenção visual", "Coordenação motora fina"]],
    ["O WCST (Wisconsin Card Sorting Test) mede:", ["Flexibilidade cognitiva pela capacidade de mudar de regra sem instrução explícita", "Exclusivamente memória de curto prazo", "Exclusivamente velocidade de processamento visual", "Coordenação motora grossa"]],
    ["Por que a escolha do teste deve partir de uma hipótese levantada na entrevista?", ["Porque cada teste responde a uma pergunta clínica específica, e aplicação sem hipótese prévia gera dados difíceis de interpretar", "Porque todos os testes medem exatamente a mesma coisa", "Porque a entrevista é irrelevante pra escolha do instrumento", "Porque testes neuropsicológicos nunca precisam de justificativa clínica"]],
    ["Pseudodemência depressiva se caracteriza por:", ["Desempenho cognitivo reduzido por depressão grave, potencialmente reversível com tratamento", "Um quadro neurológico permanente e irreversível", "Ausência completa de qualquer sintoma depressivo associado", "Um sinônimo direto de TDAH"]],
    ["A escolaridade do paciente, na interpretação desses testes, deve ser:", ["Considerada através do uso de normas compatíveis, pois afeta fortemente o desempenho", "Completamente ignorada na correção", "Relevante apenas em testes de personalidade", "Um fator sem qualquer influência nos resultados"]],
    ["Um resultado numérico isolado, sem contexto de anamnese, tem:", ["Valor clínico limitado — o laudo é sempre uma síntese, não uma pontuação solta", "Valor clínico absoluto e definitivo por si só", "Nenhuma relação com o restante da avaliação", "Prioridade sobre qualquer outro dado clínico coletado"]],
    ["Diante de padrão cognitivo pervasivo desde a infância, o módulo recomenda considerar:", ["Avaliação formal de TDAH (Módulo 4.22) ou TEA (Módulo 4.27)", "Exclusivamente causas neurológicas agudas", "Nenhuma investigação adicional é necessária", "Apenas fatores puramente situacionais recentes"]],
    ["O passo \"padronizar a aplicação\" recomenda:", ["Seguir rigorosamente o manual, sem improvisar instruções", "Adaptar livremente as instruções conforme a preferência do avaliador", "Ignorar completamente as condições do ambiente de aplicação", "Aplicar o teste sem qualquer instrução prévia ao paciente"]],
  ];
  const gabaritoObjetivas = ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a"];

  const children = [
    ...doc.capa(KICKER, "Avaliação — Avaliação Neuropsicológica", `Avaliação formativa de encerramento do Módulo ${MOD}.`),
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
    doc.vinhetaBox("Um paciente de 29 anos relata, desde sempre, dificuldade de manter foco em tarefas longas, esquecimentos frequentes de compromissos e dificuldade de organizar projetos no trabalho. A família confirma que ele sempre foi \"disperso\", desde a infância, mesmo em atividades que gostava."),
    new doc.Paragraph({ spacing: { before: 240 }, children: [new doc.TextRun({ text: "Com base no protocolo estudado, responda:", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    new doc.Paragraph({ spacing: { before: 220, after: 40 }, children: [new doc.TextRun({ text: "a) (10 pts) Que domínio(s) cognitivo(s) a queixa relatada sugere investigar primeiro?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "b) (10 pts) Que testes você priorizaria nessa avaliação, e por quê?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "c) (10 pts) Que padrão temporal da queixa (desde sempre, não recente) é clinicamente relevante aqui, e por quê?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "d) (10 pts) Que módulo deste curso essa combinação de sinais sugeriria investigar de forma mais aprofundada?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    new doc.Paragraph({ spacing: { after: 40 }, children: [new doc.TextRun({ text: "USO EXCLUSIVO DO INSTRUTOR — remover antes de aplicar a prova", bold: true, color: doc.TERRA, font: doc.FONT, size: 20 })] }),
    doc.tituloH1("Gabarito"),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 1 — Questões objetivas", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 200 }, children: [new doc.TextRun({ text: gabaritoObjetivas.map((r, i) => `${i + 1}-${r}`).join("   ·   "), font: doc.FONT, size: 22, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 2 — Critério de correção da questão de caso", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "a) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Atenção sustentada e funções executivas (organização, planejamento), dado o padrão de dificuldade de foco e desorganização relatado.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "b) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Trail Making A/B e Teste de Atenção Concentrada pra atenção; WCST ou Torre de Londres pra organização/planejamento executivo.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "c) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Um padrão presente desde a infância, confirmado por terceiros, é muito mais consistente com um quadro neurodesenvolvimental do que com uma causa situacional recente ou pseudodemência.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "d) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Módulo 4.22 (TDAH em Adultos) — o padrão pervasivo desde a infância, confirmado pela família, é um critério central desse diagnóstico.", font: doc.FONT, size: 21, color: doc.INK })] }),
  );

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-2.3-Avaliacao.docx");
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
      n: 1, titulo: "Testes reais para cada domínio cognitivo", duracao: "12 min", slides: "1, 2, 3, 4",
      objetivo: "Sair sabendo explicar as 4 funções-âncora e seus testes de referência sem jargão técnico.",
      segmentos: [
        seg("0:00–0:45", "Abertura (gancho)", [{ fala: "Aplicar teste neuropsicológico não é passar o paciente por uma bateria genérica — é escolher o instrumento certo pra responder a uma pergunta clínica específica que a entrevista já levantou." }]),
        seg("0:45–2:00", "Por que isso importa", ["Teste aplicado sem essa pergunta prévia tende a gerar dados difíceis de interpretar."]),
        seg("2:00–8:00", "As 4 funções-âncora (mostrar slide 4)", [
          "Atenção sustentada: Trail Making A, Teste de Atenção Concentrada.",
          "Memória verbal: RAVLT.",
          "Flexibilidade cognitiva: WCST.",
          "Controle inibitório: Stroop, Trail Making B.",
        ]),
        seg("8:00–10:30", "Um ponto importante", ["Flexibilidade e controle inibitório, ligados ao PFC, são frequentemente os mais sensíveis a disfunção sutil."]),
        seg("10:30–12:00", "Fechamento", [{ fala: "Próxima aula: da queixa cognitiva ao instrumento certo." }]),
      ],
    },
    {
      n: 2, titulo: "Da queixa cognitiva ao instrumento certo", duracao: "10 min", slides: "5",
      objetivo: "Explicar a cadeia entre queixa, hipótese de domínio e escolha do teste.",
      segmentos: [
        seg("0:00–1:00", "Retomada rápida", ["Vimos as funções isoladas. Hoje vemos como a queixa clínica orienta a escolha do teste."]),
        seg("1:00–6:30", "A cadeia (mostrar slide 5)", ["Queixa relatada: \"esqueço tudo\", \"não consigo focar\".", "Hipótese de domínio: atenção, memória ou função executiva?", "Seleção do instrumento: teste específico pra essa hipótese.", "Interpretação contextual: resultado lido junto com a anamnese."]),
        seg("6:30–9:00", "Um ponto importante", ["Queixas de memória frequentemente refletem, na verdade, problema de atenção primário."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: os 3 domínios e seus testes de referência." }]),
      ],
    },
    {
      n: 3, titulo: "Os 3 domínios e os sinais que orientam a escolha", duracao: "12 min", slides: "6, 7",
      objetivo: "Reconhecer os 3 domínios centrais e os sinais que sugerem qual investigar primeiro.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três domínios — e os sinais que orientam por onde começar."]),
        seg("1:00–6:00", "Os 3 domínios (mostrar slide 6)", ["Atenção: Trail Making A, Teste de Atenção Concentrada.", "Memória: RAVLT, Figura Complexa de Rey.", "Funções executivas: WCST, Stroop, Torre de Londres, Trail Making B."]),
        seg("6:00–10:30", "Sinais que orientam (mostrar slide 7)", ["Atenção: dificuldade de manter foco, distração fácil.", "Memória: esquecimento de compromissos.", "Funções executivas: dificuldade de planejar, impulsividade.", "Combinado: queixas amplas exigem bateria com mais de um teste."]),
        seg("10:30–12:00", "Fechamento", [{ fala: "Próxima aula: comprometimento real versus efeito situacional." }]),
      ],
    },
    {
      n: 4, titulo: "Comprometimento real versus efeito situacional", duracao: "10 min", slides: "8",
      objetivo: "Diferenciar comprometimento neuropsicológico real, pseudodemência e TDAH.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Um filtro rápido — essencial antes de fechar qualquer conclusão diagnóstica."]),
        seg("1:00–8:00", "Os 3 cenários (mostrar slide 8)", [
          "Comprometimento real: padrão consistente, replicável, em múltiplos contextos.",
          "Pseudodemência depressiva: reduzido por depressão grave, reversível com tratamento.",
          "TDAH (Módulo 4.22): padrão pervasivo desde a infância, não situacional.",
        ]),
        seg("8:00–9:00", "Por que isso importa", ["Evita tanto o subdiagnóstico quanto o diagnóstico precipitado."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: 3 testes centrais, em mais detalhe." }]),
      ],
    },
    {
      n: 5, titulo: "Três testes centrais, em detalhe", duracao: "11 min", slides: "9",
      objetivo: "Aprofundar Trail Making, RAVLT e WCST.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três testes, três lógicas de aplicação diferentes."]),
        seg("1:00–4:30", "Trail Making Test", ["Parte A mede atenção/velocidade; parte B acrescenta alternância."]),
        seg("4:30–7:30", "RAVLT", ["Lista de palavras com tentativas repetidas, mede curva de aprendizagem e evocação tardia."]),
        seg("7:30–10:00", "WCST", ["Mede flexibilidade cognitiva pela capacidade de mudar de regra sem instrução explícita."]),
        seg("10:00–11:00", "Fechamento", [{ fala: "Próxima aula: colocamos tudo em prática — seleção e padronização." }]),
      ],
    },
    {
      n: 6, titulo: "Aplicação — selecionar e padronizar", duracao: "13 min", slides: "10, 11",
      objetivo: "Aplicar os passos 1 e 2 do modelo de avaliação neuropsicológica.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["A parte mais prática desse módulo. Hoje, os 2 primeiros passos."]),
        seg("1:00–2:00", "Visão geral (mostrar slide 10)", ["Selecionar o teste certo → Padronizar a aplicação → Corrigir com norma adequada → Interpretar em contexto."]),
        seg("2:00–7:00", "Passo 1 — Selecionar o teste certo (mostrar slide 11, esquerda)", ["Queixa de esquecimento: priorize RAVLT e Figura Complexa de Rey.", "Queixa de desorganização: priorize WCST, Stroop e Torre de Londres."]),
        seg("7:00–12:00", "Passo 2 — Padronizar a aplicação (mostrar slide 11, direita)", [{ fala: "Vamos fazer uma tarefa que vai te ajudar a entender melhor como sua atenção e memória estão funcionando agora." }, "Siga exatamente as instruções do manual, sem improvisar."]),
        seg("12:00–13:00", "Fechamento", [{ fala: "Próxima aula: corrigir com norma adequada e interpretar em contexto." }]),
      ],
    },
    {
      n: 7, titulo: "Aplicação — correção e leitura clínica", duracao: "11 min", slides: "12",
      objetivo: "Trabalhar uso de normas populacionais e interpretação contextualizada.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Hoje fechamos o modelo com a etapa que mais separa avaliação boa de avaliação superficial."]),
        seg("1:00–6:00", "Passo 3 — Corrigir com norma adequada (mostrar slide 12, esquerda)", ["Use sempre a tabela normativa compatível com idade e escolaridade.", "Escolaridade afeta fortemente o desempenho em vários desses testes."]),
        seg("6:00–10:00", "Passo 4 — Interpretar em contexto (mostrar slide 12, direita)", ["Cruze o resultado com a queixa original e o exame do estado mental.", "Um único teste abaixo da média não confirma, sozinho, um diagnóstico."]),
        seg("10:00–11:00", "Fechamento", [{ fala: "Modelo completo. Próxima aula: um caso real e os critérios de quando aprofundar." }]),
      ],
    },
    {
      n: 8, titulo: "Estudo de caso, encaminhamento e recap", duracao: "14 min", slides: "13, 14, 15",
      objetivo: "Integrar todo o módulo num caso completo, com ênfase na diferenciação de causas.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Última aula do módulo. Caso completo e os critérios de quando aprofundar."]),
        seg("1:00–6:00", "Estudo de caso (mostrar slide 13)", ["Leia a vinheta com calma.", "Percorra as 3 perguntas de discussão.", "Convide o aluno a pausar e responder por escrito."]),
        seg("6:00–10:00", "Quando encaminhar (mostrar slide 14)", ["Percorra os 4 critérios, com atenção à diferenciação de causa neurológica, depressiva e neurodesenvolvimental."]),
        seg("10:00–13:00", "Recapitulando o módulo (mostrar slide 15)", ["Retome os 4 pontos-chave.", "Reforce que o resultado só ganha significado clínico em contexto."]),
        seg("13:00–14:00", "Fechamento do módulo", [{ fala: "Agora é hora dos exercícios e da avaliação. Te vejo no próximo módulo do Bloco 2." }]),
      ],
    },
  ];

  const totalMin = 12 + 10 + 12 + 10 + 11 + 13 + 11 + 14;

  const children = [
    ...doc.capa(KICKER, "Roteiro de Aulas — Avaliação Neuropsicológica", "Módulo dividido em 8 vídeo-aulas de 10 a 15 minutos, seguindo os slides já produzidos. Cada aula tem roteiro cronometrado, pronto pra gravação."),
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

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", `${RODAPE_DOC} — Roteiro de Aulas`, children), "Modulo-2.3-Roteiro-Aulas.docx");
}

// ============================================================
Promise.resolve()
  .then(construirDeck)
  .then(construirExercicios)
  .then(construirProva)
  .then(construirRoteiro)
  .then(() => console.log("TUDO PRONTO"))
  .catch((e) => { console.error(e); process.exit(1); });

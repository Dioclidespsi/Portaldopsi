const deck = require("../_lib/lib-deck.js");
const doc = require("../_lib/lib-doc.js");

const MOD = "5.2";
const NOME = "Neurociência da Decisão Aplicada à Carreira";
const RODAPE_DECK = `Neurociência da Decisão Aplicada à Carreira — Módulo ${MOD}`;
const RODAPE_DOC = `Módulo ${MOD} — Neurociência da Decisão Aplicada à Carreira`;
const KICKER = "MÓDULO 5.2 · INTEGRAÇÃO, CARREIRA E PRÁTICA SUPERVISIONADA";

// ============================================================
// 1) SLIDE DECK
// ============================================================
function construirDeck() {
  const pres = deck.novaApresentacao(`${NOME} — Vieses e Custo de Indecisão`);

  deck.slideTitulo(pres, {
    moduloLabel: `Módulo ${MOD} · Bloco 5 · Integração`,
    titulo: "Neurociência da Decisão",
    subtitulo: "Vieses cognitivos e custo de indecisão, aplicados à orientação de carreira",
    passos: ["Mecanismo", "Vieses", "Custo", "Método", "Aplicação"],
  });

  deck.slideRoteiro(pres, {
    rodape: RODAPE_DECK, pageNum: 2,
    cards: [
      { titulo: "O cérebro que decide", desc: "Por que decisões importantes são tão difíceis de tomar" },
      { titulo: "Vieses cognitivos", desc: "Os padrões de erro mais comuns em decisão de carreira" },
      { titulo: "Custo da indecisão", desc: "O que fica invisível quando alguém não decide" },
      { titulo: "Método aplicado", desc: "Como conduzir uma conversa de orientação com essa base" },
      { titulo: "Prática", desc: "Um caso de indecisão de carreira, passo a passo" },
    ],
  });

  deck.slideHook(pres, {
    rodape: RODAPE_DECK, pageNum: 3,
    frase: "Os mesmos circuitos que explicam por que um paciente evita um assunto na terapia explicam por que ele adia, há anos, uma decisão de carreira.",
    apoio: "Este módulo aplica os princípios do Bloco 1 (mecanismo) e do Bloco 4 (protocolo) a um contexto novo: orientação profissional, sua fronteira diferenciada além da clínica tradicional.",
  });

  deck.slideCircuito(pres, {
    rodape: RODAPE_DECK, pageNum: 4,
    titulo: "O que acontece no cérebro diante de uma decisão difícil",
    regioes: [
      { label: "Córtex pré-frontal: pesa custos e cenários futuros possíveis", rx: 0.22, ry: 0.22, color: deck.NAVY, d: 0.5 },
      { label: "Sistema límbico: gera a ansiedade do risco de errar", rx: 0.20, ry: 0.62, color: deck.TERRA, d: 0.4 },
      { label: "Recompensa: prefere o alívio imediato ao ganho futuro", rx: 0.60, ry: 0.60, color: deck.NAVY_TINT, d: 0.36 },
      { label: "Ínsula: sinaliza o desconforto da incerteza prolongada", rx: 0.58, ry: 0.24, color: deck.TERRA_TINT, d: 0.36 },
    ],
    notas: [
      "Adiar uma decisão reduz a ansiedade no curto prazo — isso reforça neurologicamente a própria indecisão, criando um ciclo difícil de quebrar sozinho.",
      "Decisões de carreira ativam os mesmos circuitos de ameaça que decisões de sobrevivência, mesmo quando o risco real é baixo.",
    ],
  });

  deck.slideCategorias(pres, {
    rodape: RODAPE_DECK, pageNum: 5,
    titulo: "3 vieses cognitivos mais comuns em decisão de carreira",
    categorias: [
      { titulo: "Viés do status quo", desc: "Preferir a opção conhecida, mesmo insatisfatória, à mudança incerta", color: deck.NAVY },
      { titulo: "Aversão à perda", desc: "Supervalorizar o que se perderia ao mudar, subestimando o que se ganharia", color: deck.TERRA },
      { titulo: "Viés de confirmação", desc: "Buscar apenas informações que confirmem a decisão que já se inclina a tomar", color: deck.NAVY_TINT },
    ],
    notaFinal: "Esses vieses não são falha de caráter — são atalhos cognitivos universais, mais visíveis sob alta incerteza e alta carga emocional.",
  });

  deck.slideCadeia(pres, {
    rodape: RODAPE_DECK, pageNum: 6,
    titulo: "Como a indecisão crônica se instala",
    elos: [
      { titulo: "Decisão importante surge", desc: "Nova oportunidade, insatisfação crescente ou prazo se aproximando" },
      { titulo: "Ansiedade antecipatória", desc: "O sistema límbico sinaliza risco diante da incerteza" },
      { titulo: "Adiamento traz alívio", desc: "Não decidir reduz a ansiedade no momento, reforçando o padrão" },
      { titulo: "Custo se acumula", desc: "No fundo, e é revisitado só quando a pressão externa aumenta" },
    ],
    notaFinal: "O alívio do adiamento é o mesmo mecanismo neurobiológico que sustenta a esquiva em quadros de ansiedade — visto no Módulo 4.1.",
  });

  deck.slideSinais(pres, {
    rodape: RODAPE_DECK, pageNum: 7,
    titulo: "Sinais de que o custo da indecisão já é alto",
    itens: [
      { titulo: "Anos revisitando a mesma dúvida", desc: "Sem avanço real, apenas repetição do mesmo raciocínio" },
      { titulo: "Busca infinita por mais informação", desc: "Adiando a decisão sob a justificativa de \"ainda não tenho dados suficientes\"" },
      { titulo: "Insatisfação crescente ignorada", desc: "Sinais claros de descontentamento tratados como \"normais\" ou temporários" },
      { titulo: "Decisão terceirizada", desc: "Esperar que um evento externo decida no lugar da pessoa" },
    ],
  });

  deck.slideDiferencial(pres, {
    rodape: RODAPE_DECK, pageNum: 8,
    titulo: "Indecisão pontual x indecisão crônica",
    cards: [
      { titulo: "Indecisão pontual", desc: "Ligada a uma escolha específica, resolvida com mais informação" },
      { titulo: "Indecisão recorrente", desc: "Padrão que se repete em diferentes decisões de vida ao longo do tempo" },
      { titulo: "Indecisão paralisante", desc: "Gera sofrimento significativo e prejuízo funcional, exigindo suporte" },
    ],
  });

  deck.slideInstrumentos(pres, {
    rodape: RODAPE_DECK, pageNum: 9,
    titulo: "3 perguntas para mapear o custo da indecisão",
    instrumentos: [
      { sigla: "Custo de esperar", nome: "O que se perde, concretamente, a cada mês adiado", desc: "Torna o custo abstrato em algo tangível e mensurável." },
      { sigla: "Visão de futuro", nome: "Como a pessoa avaliaria, daqui a 5 anos, ter adiado essa decisão", desc: "Desloca o foco do medo imediato para a perspectiva de longo prazo." },
      { sigla: "Decisão reversível", nome: "O quanto essa escolha é, de fato, definitiva", desc: "Muitas decisões de carreira são mais reversíveis do que parecem sob ansiedade." },
    ],
  });

  deck.slideProtocoloOverview(pres, {
    rodape: RODAPE_DECK, pageNum: 10,
    titulo: "Conduzindo a conversa: 4 passos",
    passos: [
      { titulo: "Nomear o\nviés em ação", desc: "Ajudar a pessoa a reconhecer qual padrão está sustentando a indecisão" },
      { titulo: "Tornar o custo\nvisível", desc: "Usar as 3 perguntas para transformar custo abstrato em concreto" },
      { titulo: "Reduzir a\nansiedade da escolha", desc: "Separar a decisão do medo de errar de forma definitiva" },
      { titulo: "Estruturar\num próximo passo", desc: "Pequeno, concreto e com prazo, não a decisão inteira de uma vez" },
    ],
    notaFinal: "O objetivo não é eliminar a incerteza — é reduzir seu peso o suficiente para que a decisão volte a ser possível.",
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 11,
    titulo: "Passos 1 e 2, na prática",
    colunas: [
      {
        numero: 1, titulo: "Nomear o viés em ação",
        fala: "“Percebo que você já considerou essa mudança várias vezes, mas sempre volta pra opção atual — o que te puxa de volta, na prática?”",
        bullets: ["Nomear o viés (status quo, aversão à perda, confirmação) sem julgamento reduz sua força automática"],
      },
      {
        numero: 2, titulo: "Tornar o custo visível",
        bullets: ["Aplique as 3 perguntas do slide 9 de forma concreta ao caso específico", "Evite abstrações — peça números, prazos e exemplos reais sempre que possível"],
      },
    ],
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 12,
    titulo: "Passos 3 e 4, na prática",
    colunas: [
      {
        numero: 3, titulo: "Reduzir a ansiedade da escolha",
        bullets: ["Explore o quanto a decisão é de fato reversível — isso costuma reduzir a ansiedade percebida", "Separe \"decidir\" de \"garantir que vai dar certo\", que não é possível para nenhuma escolha"],
      },
      {
        numero: 4, titulo: "Estruturar um próximo passo",
        fala: "“Qual seria o menor passo possível, com prazo definido, que já te tira dessa mesma dúvida repetida?”",
        bullets: ["Prazos curtos e passos pequenos quebram o ciclo de adiamento mais eficazmente que decidir tudo de uma vez"],
      },
    ],
  });

  deck.slideCaso(pres, {
    rodape: RODAPE_DECK, pageNum: 13,
    vinheta: "Carlos, 41 anos, engenheiro, relata insatisfação com a carreira atual há mais de 3 anos. Considerou por diversas vezes migrar para uma área que o atrai mais, mas sempre reconsidera: \"e se eu não conseguir me recolocar depois? Melhor esperar mais um pouco, juntar mais informação antes de decidir\". Enquanto isso, descreve estar cada vez mais desmotivado e ansioso no trabalho atual.",
    perguntas: [
      "Que viés cognitivo parece estar mais presente no discurso de Carlos?",
      "Como você tornaria o custo da indecisão de Carlos mais concreto e visível?",
      "Que pequeno próximo passo, com prazo, poderia ser proposto nessa conversa?",
    ],
  });

  deck.slideEncaminhamento(pres, {
    rodape: RODAPE_DECK, pageNum: 14,
    criterios: [
      "Indecisão paralisante causando sofrimento clínico significativo: investigar comorbidade com ansiedade (Módulo 4.1)",
      "Padrão de indecisão recorrente em múltiplas áreas da vida: considerar formulação de caso mais ampla (Módulo 5.1)",
      "Necessidade de instrumento formal de orientação profissional: indicar avaliação especializada, além do escopo deste módulo",
      "Insatisfação profissional associada a sinais de esgotamento: revisar critérios do Módulo 4.3 (Burnout)",
    ],
  });

  deck.slideRecap(pres, {
    rodape: RODAPE_DECK, pageNum: 15,
    pontos: [
      "Decisões de carreira ativam os mesmos circuitos de ameaça de decisões de sobrevivência, mesmo com risco real baixo",
      "Status quo, aversão à perda e confirmação são os 3 vieses mais comuns em decisão de carreira",
      "Tornar o custo da indecisão concreto e visível reduz seu peso emocional automático",
      "Pequenos próximos passos com prazo definido quebram o ciclo de adiamento melhor que decidir tudo de uma vez",
    ],
    proximoTexto: "Próximo: exercícios práticos e avaliação do Módulo 5.2 →",
  });

  return pres.writeFile({ fileName: "Modulo-5.2-Neurociencia-Decisao-Carreira.pptx" });
}

// ============================================================
// 2) EXERCÍCIOS
// ============================================================
function construirExercicios() {
  const children = [
    ...doc.capa(KICKER, "Exercícios — Neurociência da Decisão Aplicada à Carreira", "Resolva individualmente antes da sessão de supervisão. O objetivo é testar sua capacidade de aplicação prática, não apenas memorização."),

    doc.exNum(1, "Os 3 vieses cognitivos"),
    doc.pergunta(1, "Descreva, em suas palavras, o viés do status quo e a aversão à perda."),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Por que o viés de confirmação dificulta especialmente uma decisão de carreira já inclinada?"),
    ...doc.linhaResposta(2),

    doc.exNum(2, "Indecisão pontual x recorrente x paralisante"),
    doc.tabelaSimples(["Tipo", "Característica central"], [["Indecisão pontual", ""], ["Indecisão recorrente", ""], ["Indecisão paralisante", ""]], [3600, 5550]),

    doc.exNum(3, "As 3 perguntas de custo"),
    doc.pergunta(1, "Formule, com suas próprias palavras, a pergunta do custo de oportunidade."),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Formule a pergunta do cenário do arrependimento."),
    ...doc.linhaResposta(2),
    doc.pergunta(3, "Por que perguntar sobre reversibilidade da decisão ajuda a reduzir a ansiedade da escolha?"),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),

    doc.exNum(4, "Praticando o método — caso 1"),
    doc.vinhetaBox("Uma pessoa relata que há 2 anos pensa em pedir demissão para empreender, mas cada vez que se aproxima da decisão, lembra de \"tudo que já construiu\" na empresa atual e desiste."),
    doc.pergunta(1, "Que viés cognitivo está mais evidente nesse relato?"),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Que pergunta de custo você usaria primeiro, e por quê?"),
    ...doc.linhaResposta(2),

    doc.exNum(5, "Caso integrado — Carlos"),
    doc.vinhetaBox("Carlos, 41 anos, engenheiro insatisfeito há 3 anos, sempre reconsidera migrar de área por medo de não se recolocar, cada vez mais desmotivado e ansioso no trabalho atual."),
    doc.pergunta(1, "Que viés cognitivo parece estar mais presente no discurso de Carlos?"),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Como você tornaria o custo da indecisão de Carlos mais concreto?"),
    ...doc.linhaResposta(2),
    doc.pergunta(3, "Que pequeno próximo passo, com prazo, poderia ser proposto?"),
    ...doc.linhaResposta(2),
    doc.pergunta(4, "Que critério de encaminhamento você consideraria relevante nesse caso?"),
    ...doc.linhaResposta(2),
  ];

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-5.2-Exercicios.docx");
}

// ============================================================
// 3) AVALIAÇÃO
// ============================================================
function construirProva() {
  const objetivas = [
    ["Decisões de carreira, segundo o módulo, ativam:", ["Os mesmos circuitos de ameaça de decisões de sobrevivência, mesmo com risco real baixo", "Apenas o córtex pré-frontal, sem qualquer resposta límbica", "Nenhum circuito relacionado à ansiedade ou incerteza", "Exclusivamente o sistema de recompensa, sem componente de risco"]],
    ["O viés do status quo se caracteriza por:", ["Preferir a opção conhecida, mesmo insatisfatória, à mudança incerta", "Buscar sempre a opção mais nova e desconhecida disponível", "Ignorar completamente a opção atual em qualquer decisão", "Decidir aleatoriamente, sem qualquer preferência consistente"]],
    ["A aversão à perda consiste em:", ["Supervalorizar o que se perderia ao mudar, subestimando o que se ganharia", "Buscar perder o máximo possível antes de decidir", "Ignorar qualquer risco de perda numa decisão", "Um viés presente apenas em decisões financeiras, não de carreira"]],
    ["O alívio sentido ao adiar uma decisão, segundo o módulo:", ["Reforça neurologicamente o próprio padrão de indecisão", "Elimina completamente a ansiedade associada à decisão", "Não tem qualquer relação com os circuitos de recompensa", "É sempre um sinal de que a decisão certa foi tomar mais tempo"]],
    ["Indecisão paralisante se diferencia de indecisão pontual por:", ["Gerar sofrimento significativo e prejuízo funcional, exigindo suporte", "Ser sempre resolvida rapidamente com mais informação", "Não ter qualquer relação com sofrimento emocional", "Ser exclusiva de decisões financeiras de grande porte"]],
    ["A pergunta do \"cenário do arrependimento\" busca:", ["Deslocar o foco do medo imediato para a perspectiva de longo prazo", "Aumentar a ansiedade imediata sobre a decisão", "Eliminar qualquer consideração sobre o futuro", "Focar exclusivamente no presente, ignorando consequências futuras"]],
    ["Explorar a reversibilidade de uma decisão tende a:", ["Reduzir a ansiedade percebida associada à escolha", "Aumentar sempre o medo relacionado à decisão", "Ser irrelevante para o processo de decisão", "Tornar toda decisão automaticamente definitiva"]],
    ["O passo \"estruturar um próximo passo\", segundo o protocolo, recomenda:", ["Um passo pequeno, concreto e com prazo, não a decisão inteira de uma vez", "Sempre resolver a decisão inteira numa única conversa", "Evitar qualquer ação até que toda incerteza seja eliminada", "Delegar a decisão inteiramente para terceiros"]],
    ["Diante de indecisão paralisante com sofrimento clínico significativo, o módulo recomenda:", ["Investigar comorbidade com ansiedade (Módulo 4.1)", "Ignorar qualquer sinal de sofrimento associado", "Encerrar imediatamente o acompanhamento", "Aplicar exclusivamente instrumentos de personalidade, sem outra avaliação"]],
    ["Este módulo aplica princípios de qual outro bloco a um novo contexto (orientação de carreira)?", ["Bloco 1 (mecanismo) e Bloco 4 (protocolo)", "Apenas o Bloco 3 (farmacologia)", "Nenhum bloco anterior — conteúdo completamente independente", "Apenas o Bloco 2 (avaliação), sem relação com os demais"]],
  ];
  const gabaritoObjetivas = ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a"];

  const children = [
    ...doc.capa(KICKER, "Avaliação — Neurociência da Decisão Aplicada à Carreira", `Avaliação formativa de encerramento do Módulo ${MOD}.`),
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
    doc.vinhetaBox("Fernanda, 29 anos, recebeu uma proposta de trabalho em outra cidade há 4 meses e ainda não respondeu. Diz que \"precisa pensar mais\" a cada vez que o assunto surge, mesmo reconhecendo que a proposta atual não a satisfaz. Relata que já pediu a opinião de mais de 10 pessoas diferentes sobre a decisão."),
    new doc.Paragraph({ spacing: { before: 240 }, children: [new doc.TextRun({ text: "Com base no protocolo estudado, responda:", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    new doc.Paragraph({ spacing: { before: 220, after: 40 }, children: [new doc.TextRun({ text: "a) (10 pts) Que viés cognitivo está mais evidente no padrão de Fernanda de buscar tantas opiniões?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "b) (10 pts) Formule uma pergunta de custo de oportunidade específica para o caso de Fernanda.", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "c) (10 pts) O prazo de 4 meses sem resposta já indica qual nível de indecisão, segundo a classificação do módulo?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "d) (10 pts) Proponha um próximo passo pequeno, concreto e com prazo, para essa conversa.", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    new doc.Paragraph({ spacing: { after: 40 }, children: [new doc.TextRun({ text: "USO EXCLUSIVO DO INSTRUTOR — remover antes de aplicar a prova", bold: true, color: doc.TERRA, font: doc.FONT, size: 20 })] }),
    doc.tituloH1("Gabarito"),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 1 — Questões objetivas", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 200 }, children: [new doc.TextRun({ text: gabaritoObjetivas.map((r, i) => `${i + 1}-${r}`).join("   ·   "), font: doc.FONT, size: 22, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 2 — Critério de correção da questão de caso", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "a) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Viés de confirmação — a busca por muitas opiniões pode ser uma tentativa (não totalmente consciente) de encontrar alguém que valide a decisão que Fernanda já se inclina a tomar, adiando o compromisso.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "b) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Exemplo: \"O que você perde, concretamente, a cada mês que segue no trabalho atual insatisfatório, enquanto a proposta espera resposta?\"", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "c) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Indecisão recorrente — um padrão já se repete há meses, mas ainda não atingiu o nível de sofrimento funcional que caracterizaria indecisão paralisante.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "d) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Exemplo: definir um prazo de 7 dias para dar uma resposta à empresa, sem consultar mais nenhuma opinião externa nesse período.", font: doc.FONT, size: 21, color: doc.INK })] }),
  );

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-5.2-Avaliacao.docx");
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
      n: 1, titulo: "O cérebro que decide", duracao: "13 min", slides: "1, 2, 3, 4",
      objetivo: "Sair sabendo explicar o mecanismo neurobiológico por trás da dificuldade de decidir.",
      segmentos: [
        seg("0:00–0:45", "Abertura (gancho)", [{ fala: "Os mesmos circuitos que explicam por que um paciente evita um assunto na terapia explicam por que ele adia, há anos, uma decisão de carreira." }]),
        seg("0:45–2:00", "Por que isso importa", ["Este módulo aplica os princípios do Bloco 1 e do Bloco 4 a um novo contexto: orientação de carreira."]),
        seg("2:00–9:00", "O que acontece no cérebro (mostrar slide 4)", [
          "Córtex pré-frontal: pesa custos, benefícios e cenários futuros.",
          "Sistema límbico: gera a ansiedade associada ao risco de errar.",
          "Sistema de recompensa: compara ganho imediato de não decidir com ganho futuro incerto.",
          "Ínsula: sinaliza o desconforto físico da incerteza prolongada.",
        ]),
        seg("9:00–12:00", "Um ponto importante", ["Adiar reduz a ansiedade no curto prazo — isso reforça neurologicamente a própria indecisão."]),
        seg("12:00–13:00", "Fechamento", [{ fala: "Próxima aula: os 3 vieses cognitivos mais comuns em decisão de carreira." }]),
      ],
    },
    {
      n: 2, titulo: "Os 3 vieses cognitivos", duracao: "11 min", slides: "5",
      objetivo: "Reconhecer status quo, aversão à perda e confirmação em relatos de pacientes.",
      segmentos: [
        seg("0:00–1:00", "Retomada rápida", ["Vimos o mecanismo. Hoje, os padrões de erro mais comuns."]),
        seg("1:00–8:00", "Os 3 vieses (mostrar slide 5)", [
          "Viés do status quo: preferir a opção conhecida, mesmo insatisfatória.",
          "Aversão à perda: supervalorizar o que se perderia ao mudar.",
          "Viés de confirmação: buscar só informações que confirmem a inclinação já existente.",
        ]),
        seg("8:00–10:00", "Um ponto importante", ["Esses vieses não são falha de caráter — são atalhos cognitivos universais."]),
        seg("10:00–11:00", "Fechamento", [{ fala: "Próxima aula: como a indecisão crônica se instala." }]),
      ],
    },
    {
      n: 3, titulo: "Como a indecisão crônica se instala", duracao: "12 min", slides: "6, 7",
      objetivo: "Explicar o ciclo de reforço da indecisão e reconhecer sinais de custo elevado.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Um ciclo, e os sinais de que o custo já está alto."]),
        seg("1:00–6:00", "O ciclo (mostrar slide 6)", ["Decisão importante surge → Ansiedade antecipatória → Adiamento traz alívio → Custo se acumula."]),
        seg("6:00–11:00", "Sinais de custo alto (mostrar slide 7)", [
          "Anos revisitando a mesma dúvida.",
          "Busca infinita por mais informação.",
          "Insatisfação crescente ignorada.",
          "Decisão terceirizada a um evento externo.",
        ]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Próxima aula: os níveis de indecisão e as perguntas de custo." }]),
      ],
    },
    {
      n: 4, titulo: "Níveis de indecisão e as perguntas de custo", duracao: "12 min", slides: "8, 9",
      objetivo: "Diferenciar níveis de indecisão e aplicar as 3 perguntas que tornam o custo visível.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três níveis de indecisão — e três perguntas que ajudam em qualquer um deles."]),
        seg("1:00–5:00", "Os 3 níveis (mostrar slide 8)", ["Indecisão pontual, recorrente e paralisante — cada uma exigindo uma resposta diferente."]),
        seg("5:00–11:00", "As 3 perguntas de custo (mostrar slide 9)", [
          "Custo de oportunidade: o que se perde a cada mês adiado.",
          "Cenário do arrependimento: como avaliaria isso daqui a 5 anos.",
          "Decisão reversível: o quanto essa escolha é, de fato, definitiva.",
        ]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Próxima aula: os 4 passos do método, na prática." }]),
      ],
    },
    {
      n: 5, titulo: "Aplicação — nomear o viés e tornar o custo visível", duracao: "14 min", slides: "10, 11",
      objetivo: "Aplicar os passos 1 e 2 do método de condução da conversa.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["A parte prática do módulo. Hoje, os 2 primeiros passos."]),
        seg("1:00–2:00", "Visão geral (mostrar slide 10)", ["Nomear o viés → Tornar o custo visível → Reduzir a ansiedade → Estruturar um próximo passo."]),
        seg("2:00–8:00", "Passo 1 — Nomear o viés (mostrar slide 11, esquerda)", [{ fala: "Percebo que você já considerou essa mudança várias vezes, mas sempre volta pra opção atual — o que te puxa de volta, na prática?" }]),
        seg("8:00–13:00", "Passo 2 — Tornar o custo visível (mostrar slide 11, direita)", ["Aplique as 3 perguntas de forma concreta ao caso específico.", "Evite abstrações — peça números, prazos e exemplos reais."]),
        seg("13:00–14:00", "Fechamento", [{ fala: "Próxima aula: reduzir a ansiedade e estruturar o próximo passo." }]),
      ],
    },
    {
      n: 6, titulo: "Aplicação — reduzir ansiedade e estruturar o próximo passo", duracao: "12 min", slides: "12",
      objetivo: "Trabalhar os passos 3 e 4, fechando o método completo.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Hoje fechamos o método com os 2 últimos passos."]),
        seg("1:00–6:00", "Passo 3 — Reduzir a ansiedade da escolha (mostrar slide 12, esquerda)", ["Explore o quanto a decisão é de fato reversível.", "Separe \"decidir\" de \"garantir que vai dar certo\"."]),
        seg("6:00–11:00", "Passo 4 — Estruturar um próximo passo (mostrar slide 12, direita)", [{ fala: "Qual seria o menor passo possível, com prazo definido, que já te tira dessa mesma dúvida repetida?" }]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Método completo. Próxima aula: um caso de indecisão de carreira, do início ao fim." }]),
      ],
    },
    {
      n: 7, titulo: "Prática guiada — o caso de Carlos e recap final", duracao: "14 min", slides: "13, 14, 15",
      objetivo: "Aplicar o método completo a um caso real e consolidar os pontos-chave do módulo.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["A última aula do módulo — prática guiada completa e recap."]),
        seg("1:00–5:00", "Apresentando o caso (mostrar slide 13)", ["Leia a vinheta do Carlos com calma.", "Note o padrão de reconsideração repetida e a justificativa de \"juntar mais informação\"."]),
        seg("5:00–9:00", "Percorrendo as perguntas de discussão", ["Discuta em voz alta as 3 perguntas do slide 13.", "Esboce um próximo passo pequeno e com prazo para Carlos."]),
        seg("9:00–12:00", "Quando encaminhar (mostrar slide 14)", ["Percorra os 4 critérios de encaminhamento relevantes."]),
        seg("12:00–14:00", "Recap final (mostrar slide 15)", [{ fala: "Retome os 4 pontos-chave do módulo. Agora é hora dos exercícios e da avaliação." }]),
      ],
    },
  ];

  const totalMin = 13 + 11 + 12 + 12 + 14 + 12 + 14;

  const children = [
    ...doc.capa(KICKER, "Roteiro de Aulas — Neurociência da Decisão Aplicada à Carreira", "Módulo dividido em 7 vídeo-aulas de 11 a 14 minutos, seguindo os slides já produzidos. Cada aula tem roteiro cronometrado, pronto pra gravação."),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "Duração total do módulo em vídeo: ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: `${totalMin} minutos (${(totalMin / 60).toFixed(1)}h) em 7 aulas`, font: doc.FONT, size: 21, color: doc.INK })] }),
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

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", `${RODAPE_DOC} — Roteiro de Aulas`, children), "Modulo-5.2-Roteiro-Aulas.docx");
}

// ============================================================
Promise.resolve()
  .then(construirDeck)
  .then(construirExercicios)
  .then(construirProva)
  .then(construirRoteiro)
  .then(() => console.log("TUDO PRONTO"))
  .catch((e) => { console.error(e); process.exit(1); });

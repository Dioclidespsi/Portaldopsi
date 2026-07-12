const deck = require("../_lib/lib-deck.js");
const doc = require("../_lib/lib-doc.js");

const MOD = "3.5";
const NOME = "Farmacologia de Adicções";
const RODAPE_DECK = `Farmacologia de Adicções — Módulo ${MOD}`;
const RODAPE_DOC = `Módulo ${MOD} — Farmacologia de Adicções`;
const KICKER = "MÓDULO 3.5 · FARMACOLOGIA APLICADA À PSICOTERAPIA";

// ============================================================
// 1) SLIDE DECK
// ============================================================
function construirDeck() {
  const pres = deck.novaApresentacao(`${NOME} — Suporte Médico Sem Sobrepor Papéis`);

  deck.slideTitulo(pres, {
    moduloLabel: `Módulo ${MOD} · Bloco 3 · Farmacologia`,
    titulo: "Farmacologia de Adicções",
    subtitulo: "Naltrexona, dissulfiram e terapias de reposição, na perspectiva do psicólogo",
    passos: ["Naltrexona", "Dissulfiram", "Reposição", "Indicação", "Trabalho conjunto"],
  });

  deck.slideRoteiro(pres, {
    rodape: RODAPE_DECK, pageNum: 2,
    cards: [
      { titulo: "Naltrexona", desc: "Bloqueio de receptores opioides, reduz o prazer do consumo" },
      { titulo: "Dissulfiram", desc: "Reação aversiva ao álcool, funciona como \"seguro comportamental\"" },
      { titulo: "Terapias de reposição", desc: "Reduzem abstinência sem o pico eufórico da substância original" },
      { titulo: "Quando indicar", desc: "Sinais que sugerem que o suporte farmacológico pode ajudar" },
      { titulo: "Trabalho conjunto", desc: "Sem sobrepor papéis com a equipe médica" },
    ],
  });

  deck.slideHook(pres, {
    rodape: RODAPE_DECK, pageNum: 3,
    frase: "Saber que existe suporte farmacológico pra reduzir craving muda a forma como você trabalha a motivação do paciente — não é só força de vontade, é também química que pode ser apoiada.",
    apoio: "Este módulo não ensina a prescrever — ensina o repertório mínimo pra reconhecer quando vale a pena sugerir avaliação médica complementar, e como manter o trabalho psicológico relevante durante esse suporte.",
  });

  deck.slideCircuito(pres, {
    rodape: RODAPE_DECK, pageNum: 4,
    titulo: "3 estratégias farmacológicas, um alvo comum",
    regioes: [
      { label: "Naltrexona (bloqueia receptores opioides, reduz prazer do consumo)", rx: 0.20, ry: 0.22, color: deck.NAVY, d: 0.5 },
      { label: "Dissulfiram (bloqueia metabolização do álcool, gera reação aversiva)", rx: 0.22, ry: 0.62, color: deck.TERRA, d: 0.4 },
      { label: "Terapia de reposição (reduz abstinência sem o pico eufórico)", rx: 0.60, ry: 0.60, color: deck.NAVY_TINT, d: 0.36 },
      { label: "Sistema de recompensa dopaminérgico (o alvo comum, Módulo 4.5)", rx: 0.58, ry: 0.24, color: deck.TERRA_TINT, d: 0.36 },
    ],
    notas: [
      "A naltrexona bloqueia receptores opioides, reduzindo diretamente o prazer associado ao consumo de álcool ou opioides.",
      "O dissulfiram funciona de forma diferente: gera uma reação física desagradável se a pessoa consumir álcool, funcionando como uma barreira comportamental adicional.",
      "Terapias de reposição substituem a substância original por uma versão de ação mais estável, sem o pico eufórico, reduzindo o ciclo de busca compulsiva.",
    ],
  });

  deck.slideCadeia(pres, {
    rodape: RODAPE_DECK, pageNum: 5,
    titulo: "Do suporte farmacológico à mudança sustentável",
    elos: [
      { titulo: "Craving intenso não modulado", desc: "Dificulta que a intervenção psicológica isolada seja suficiente" },
      { titulo: "Suporte farmacológico reduz intensidade", desc: "Cria espaço pra que estratégias comportamentais tenham efeito real" },
      { titulo: "Intervenção psicológica ganha força", desc: "Trabalho de prevenção de recaída se torna mais viável" },
      { titulo: "Consolidação mais sustentável", desc: "Mudança de padrão com menor risco de recaída precoce" },
    ],
    notaFinal: "O suporte farmacológico não substitui o trabalho psicológico — ele reduz a intensidade do obstáculo biológico, tornando o trabalho comportamental mais eficaz.",
  });

  deck.slideCategorias(pres, {
    rodape: RODAPE_DECK, pageNum: 6,
    titulo: "3 categorias de suporte farmacológico",
    categorias: [
      { titulo: "Bloqueadores de receptor", desc: "Naltrexona, reduz diretamente o prazer do consumo", color: deck.NAVY },
      { titulo: "Aversivos", desc: "Dissulfiram, gera reação desagradável ao consumo", color: deck.TERRA },
      { titulo: "Terapias de reposição", desc: "Buprenorfina/metadona, reduzem abstinência sem o pico eufórico", color: deck.NAVY_TINT },
    ],
    notaFinal: "A escolha entre essas estratégias é sempre médica — o valor pro psicólogo está em saber que existem, e em reconhecer quando vale a pena sugerir avaliação.",
  });

  deck.slideSinais(pres, {
    rodape: RODAPE_DECK, pageNum: 7,
    titulo: "Sinais que sugerem investigar suporte farmacológico",
    itens: [
      { titulo: "Craving intenso recorrente", desc: "Relatado de forma consistente, mesmo com trabalho comportamental ativo" },
      { titulo: "Múltiplas recaídas", desc: "Apesar de motivação genuína e aplicação consistente das estratégias" },
      { titulo: "Dependência física estabelecida", desc: "Sinais claros de tolerância e desconforto na tentativa de reduzir" },
      { titulo: "Uso apesar de consequências graves", desc: "Persistência mesmo diante de perdas significativas relatadas" },
    ],
  });

  deck.slideDiferencial(pres, {
    rodape: RODAPE_DECK, pageNum: 8,
    titulo: "Quando cada abordagem costuma ser considerada",
    cards: [
      { titulo: "Terapia psicológica isolada", desc: "Uso leve, sem dependência física estabelecida" },
      { titulo: "Suporte farmacológico indicado", desc: "Dependência moderada a grave, craving intenso, múltiplas recaídas" },
      { titulo: "Emergência médica", desc: "Síndrome de abstinência grave, encaminhamento imediato" },
    ],
  });

  deck.slideInstrumentos(pres, {
    rodape: RODAPE_DECK, pageNum: 9,
    titulo: "Instrumentos que orientam essa decisão",
    instrumentos: [
      { sigla: "AUDIT", nome: "Alcohol Use Disorders Identification Test", desc: "Já usado no Módulo 4.5, orienta gravidade do uso de álcool." },
      { sigla: "DAST-10", nome: "Drug Abuse Screening Test", desc: "Equivalente pra uso de outras substâncias." },
      { sigla: "Relato de craving", nome: "Intensidade e frequência subjetiva", desc: "Dado clínico direto que orienta a conversa sobre suporte farmacológico." },
    ],
  });

  deck.slideProtocoloOverview(pres, {
    rodape: RODAPE_DECK, pageNum: 10,
    titulo: "Do reconhecimento ao trabalho conjunto: 4 passos",
    passos: [
      { titulo: "Avaliar padrão\nde uso e craving", desc: "Usando os instrumentos já conhecidos do Módulo 4.5" },
      { titulo: "Psicoeducar sobre\no suporte existente", desc: "Informar, sem indicar, que existem opções farmacológicas" },
      { titulo: "Encaminhar quando\napropriado", desc: "Pra avaliação médica especializada em dependência química" },
      { titulo: "Manter o trabalho\npsicológico ativo", desc: "Em paralelo ao suporte farmacológico, não em substituição" },
    ],
    notaFinal: "O suporte farmacológico funciona melhor quando combinado com intervenção psicológica ativa — nenhuma das duas abordagens isoladamente costuma ser tão eficaz quanto as duas juntas.",
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 11,
    titulo: "Passos 1 e 2, na prática",
    colunas: [
      {
        numero: 1, titulo: "Avaliar padrão de uso e craving",
        bullets: ["Use AUDIT ou DAST-10 pra objetivar a gravidade do padrão de uso", "Pergunte diretamente sobre intensidade e frequência do craving"],
      },
      {
        numero: 2, titulo: "Psicoeducar sobre o suporte existente",
        fala: "“Existem opções médicas que podem ajudar a reduzir essa vontade intensa que você sente — isso é uma decisão pra conversar com um médico especialista.”",
        bullets: ["Informe sem prometer resultado nem indicar qual opção específica seria adequada"],
      },
    ],
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 12,
    titulo: "Passos 3 e 4, na prática",
    colunas: [
      {
        numero: 3, titulo: "Encaminhar quando apropriado",
        bullets: ["Priorize encaminhamento diante de craving intenso recorrente ou múltiplas recaídas", "Encaminhe pra especialista em dependência química, não apenas psiquiatria geral, quando disponível"],
      },
      {
        numero: 4, titulo: "Manter o trabalho psicológico ativo",
        bullets: ["Continue o protocolo do Módulo 4.5 em paralelo, sem interromper por causa do suporte farmacológico", "Use a redução de craving, quando presente, como janela de oportunidade pro trabalho comportamental"],
      },
    ],
  });

  deck.slideCaso(pres, {
    rodape: RODAPE_DECK, pageNum: 13,
    vinheta: "Um paciente em terapia há 4 meses pelo Módulo 4.5 (Adicções) relata craving intenso e recorrente por álcool, mesmo aplicando consistentemente as estratégias comportamentais trabalhadas, e já teve 3 recaídas nesse período apesar da motivação genuína pra mudança.",
    perguntas: [
      "Que sinais dessa vinheta sugerem que suporte farmacológico complementar pode ser relevante?",
      "Como você apresentaria essa possibilidade ao paciente, sem indicar uma opção específica?",
      "O que muda (e o que não muda) no seu trabalho psicológico se ele decidir buscar essa avaliação?",
    ],
  });

  deck.slideEncaminhamento(pres, {
    rodape: RODAPE_DECK, pageNum: 14,
    criterios: [
      "Craving intenso recorrente apesar de intervenção psicológica consistente: sugerir avaliação médica complementar",
      "Múltiplas recaídas apesar de motivação genuína e trabalho ativo: mesmo critério de encaminhamento",
      "Sinais de dependência física estabelecida: avaliação médica especializada",
      "Qualquer sinal de síndrome de abstinência: encaminhamento médico emergencial imediato",
    ],
  });

  deck.slideRecap(pres, {
    rodape: RODAPE_DECK, pageNum: 15,
    pontos: [
      "Naltrexona, dissulfiram e terapias de reposição atuam por mecanismos diferentes, mas convergem no sistema de recompensa dopaminérgico",
      "Bloqueadores de receptor, aversivos e terapias de reposição são as 3 categorias centrais de suporte farmacológico",
      "AUDIT, DAST-10 e relato de craving orientam quando essa conversa faz sentido",
      "Suporte farmacológico e trabalho psicológico funcionam melhor juntos, não como alternativas isoladas",
    ],
    proximoTexto: "Próximo: exercícios práticos e avaliação do Módulo 3.5 →",
  });

  return pres.writeFile({ fileName: "Modulo-3.5-Farmacologia-Adiccoes.pptx" });
}

// ============================================================
// 2) EXERCÍCIOS
// ============================================================
function construirExercicios() {
  const children = [
    ...doc.capa(KICKER, "Exercícios — Farmacologia de Adicções", "Resolva individualmente antes da sessão de supervisão. O objetivo é testar sua leitura funcional antes de comparar com a discussão em grupo — não há problema em errar."),

    doc.exNum(1, "As 3 categorias, em suas palavras"),
    doc.pergunta(1, "Explique em uma frase cada categoria: bloqueadores de receptor, aversivos, terapias de reposição."),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Por que o suporte farmacológico costuma funcionar melhor combinado com trabalho psicológico, e não isoladamente?"),
    ...doc.linhaResposta(2),

    doc.exNum(2, "Quando cada abordagem é considerada"),
    doc.tabelaSimples(["Situação", "Abordagem mais provável"], [["Uso leve, sem dependência física", ""], ["Craving intenso e múltiplas recaídas", ""], ["Síndrome de abstinência grave", ""]], [5600, 3550]),

    doc.exNum(3, "Psicoeducação sem indicar"),
    doc.vinhetaBox("Um paciente pergunta diretamente: \"você acha que eu deveria tomar naltrexona?\""),
    doc.pergunta(1, "Escreva uma resposta que informe sobre a existência dessa opção sem indicar diretamente seu uso."),
    ...doc.linhaResposta(3),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),

    doc.exNum(4, "Caso integrado"),
    doc.vinhetaBox("Um paciente em terapia há 4 meses pelo Módulo 4.5 relata craving intenso e recorrente, mesmo aplicando as estratégias comportamentais consistentemente, e já teve 3 recaídas apesar de motivação genuína."),
    doc.pergunta(1, "Que sinais sugerem que suporte farmacológico complementar pode ser relevante?"),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Como você apresentaria essa possibilidade sem indicar uma opção específica?"),
    ...doc.linhaResposta(2),
    doc.pergunta(3, "O que muda e o que não muda no seu trabalho psicológico se ele buscar essa avaliação?"),
    ...doc.linhaResposta(2),
  ];

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-3.5-Exercicios.docx");
}

// ============================================================
// 3) AVALIAÇÃO
// ============================================================
function construirProva() {
  const objetivas = [
    ["A naltrexona atua principalmente:", ["Bloqueando receptores opioides, reduzindo o prazer do consumo", "Aumentando indefinidamente a dopamina disponível", "Bloqueando exclusivamente receptores de serotonina", "Sem qualquer efeito sobre o sistema de recompensa"]],
    ["O dissulfiram funciona como:", ["Um agente aversivo, gerando reação desagradável ao consumo de álcool", "Um bloqueador direto de receptores opioides", "Uma terapia de reposição com ação prolongada", "Um antidepressivo de ação rápida"]],
    ["Terapias de reposição, como buprenorfina, têm como objetivo:", ["Reduzir sintomas de abstinência sem o pico eufórico da substância original", "Aumentar o pico eufórico da substância original", "Eliminar completamente qualquer efeito no sistema nervoso central", "Substituir completamente a necessidade de intervenção psicológica"]],
    ["As 3 categorias de suporte farmacológico estudadas são:", ["Bloqueadores de receptor, aversivos, terapias de reposição", "ISRS, IRSN, tricíclicos", "Benzodiazepínicos, buspirona, hipnóticos", "Estabilizadores de humor, antipsicóticos típicos, atípicos"]],
    ["O suporte farmacológico, segundo o módulo, funciona melhor quando:", ["Combinado com trabalho psicológico ativo, não como alternativa isolada", "Usado isoladamente, sem qualquer intervenção psicológica", "Aplicado apenas após o encerramento completo da terapia", "Nunca combinado com qualquer outra intervenção"]],
    ["Diante de craving intenso recorrente apesar de intervenção psicológica consistente, o módulo recomenda:", ["Sugerir avaliação médica complementar", "Ignorar, pois craving nunca justifica avaliação adicional", "Interromper imediatamente o trabalho psicológico em curso", "Aconselhar diretamente qual medicação específica usar"]],
    ["O papel do psicólogo diante da pergunta \"devo tomar naltrexona?\" é:", ["Informar sobre a existência da opção, sem indicar diretamente seu uso", "Responder diretamente sim ou não sobre qual medicação tomar", "Ignorar completamente a pergunta do paciente", "Desencorajar qualquer busca por avaliação médica"]],
    ["AUDIT e DAST-10, revisados neste módulo, servem para:", ["Objetivar a gravidade do padrão de uso de álcool e outras substâncias", "Avaliar exclusivamente funções executivas", "Avaliar exclusivamente sintomas depressivos", "Substituir completamente a necessidade de entrevista clínica"]],
    ["Diante de sinais de síndrome de abstinência, o módulo recomenda:", ["Encaminhamento médico emergencial imediato", "Aguardar a próxima sessão agendada, sem qualquer ação imediata", "Ignorar, pois nunca representa risco real", "Recomendar apenas técnicas de relaxamento, sem qualquer encaminhamento"]],
    ["O suporte farmacológico, segundo o módulo, atua criando:", ["Espaço pra que estratégias comportamentais tenham efeito mais consistente", "Uma cura definitiva e completa, sem necessidade de qualquer trabalho adicional", "Um efeito que elimina totalmente a necessidade de acompanhamento psicológico", "Nenhum impacto relevante sobre o processo terapêutico"]],
  ];
  const gabaritoObjetivas = ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a"];

  const children = [
    ...doc.capa(KICKER, "Avaliação — Farmacologia de Adicções", `Avaliação formativa de encerramento do Módulo ${MOD}.`),
    doc.infoBox([
      ["Nota de corte:", "70 de 100 pontos"],
      ["Tempo sugerido:", "30 minutos"],
      ["Composição:", "10 questões objetivas (6 pts cada = 60 pts) + 1 questão de caso (40 pts)"],
      ["Consulta:", "Material da aula permitido; discussão entre colegas, não"],
    ]),
    doc.tituloH1("Parte 1 — Questões objetivas"),
  ];
  objetivas.forEach((q, i) => children.push(...doc.questaoObjetiva(i + 1, q[0], q[1])));

  children.push(
    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    doc.tituloH1("Parte 2 — Questão de caso (40 pontos)"),
    doc.vinhetaBox("Uma paciente em tratamento para dependência de opioides relata que o médico sugeriu terapia de reposição com buprenorfina, mas ela está receosa, dizendo \"não quero trocar um vício por outro\"."),
    new doc.Paragraph({ spacing: { before: 240 }, children: [new doc.TextRun({ text: "Com base no protocolo estudado, responda:", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    new doc.Paragraph({ spacing: { before: 220, after: 40 }, children: [new doc.TextRun({ text: "a) (10 pts) Como você explicaria, em linguagem acessível, a diferença entre a terapia de reposição e o consumo da substância original?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "b) (10 pts) Qual é o limite da sua atuação nessa conversa, considerando que a decisão já envolve orientação médica?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "c) (10 pts) Como o trabalho psicológico continuaria relevante se ela decidir seguir com a terapia de reposição?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "d) (10 pts) Que validação você daria à preocupação dela, sem desencorajar nem forçar a decisão médica?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    new doc.Paragraph({ spacing: { after: 40 }, children: [new doc.TextRun({ text: "USO EXCLUSIVO DO INSTRUTOR — remover antes de aplicar a prova", bold: true, color: doc.TERRA, font: doc.FONT, size: 20 })] }),
    doc.tituloH1("Gabarito"),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 1 — Questões objetivas", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 200 }, children: [new doc.TextRun({ text: gabaritoObjetivas.map((r, i) => `${i + 1}-${r}`).join("   ·   "), font: doc.FONT, size: 22, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 2 — Critério de correção da questão de caso", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "a) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Explicar que a terapia de reposição reduz sintomas de abstinência sem gerar o pico eufórico intenso da substância original, permitindo estabilidade suficiente pra trabalhar mudança de forma mais segura.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "b) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Apoiar a reflexão dela sem opinar tecnicamente sobre a decisão médica em si — a escolha final é entre ela e o médico responsável.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "c) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "O trabalho psicológico continua central — a terapia de reposição reduz o obstáculo biológico, mas as estratégias comportamentais de prevenção de recaída (Módulo 4.5) seguem sendo o que sustenta a mudança de padrão.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "d) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Validar que é uma preocupação comum e compreensível, e que vale a pena levar essa dúvida diretamente ao médico responsável pra entender melhor a diferença entre as duas situações.", font: doc.FONT, size: 21, color: doc.INK })] }),
  );

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-3.5-Avaliacao.docx");
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
      n: 1, titulo: "Suporte médico sem sobrepor papéis", duracao: "12 min", slides: "1, 2, 3, 4",
      objetivo: "Sair sabendo explicar as 3 estratégias farmacológicas de apoio ao tratamento de adicções sem jargão técnico.",
      segmentos: [
        seg("0:00–0:45", "Abertura (gancho)", [{ fala: "Saber que existe suporte farmacológico pra reduzir craving muda a forma como você trabalha a motivação do paciente — não é só força de vontade, é também química que pode ser apoiada." }]),
        seg("0:45–2:00", "Por que isso importa", ["Não é sobre prescrever — é sobre reconhecer quando vale sugerir avaliação médica complementar."]),
        seg("2:00–8:00", "As 3 estratégias (mostrar slide 4)", [
          "Naltrexona: bloqueia receptores opioides, reduz o prazer do consumo.",
          "Dissulfiram: bloqueia metabolização do álcool, gera reação aversiva.",
          "Terapia de reposição: reduz abstinência sem o pico eufórico.",
          "Sistema de recompensa dopaminérgico: o alvo comum entre elas.",
        ]),
        seg("8:00–10:30", "Um ponto importante", ["Cada estratégia atua por um mecanismo diferente, mas convergem no mesmo sistema."]),
        seg("10:30–12:00", "Fechamento", [{ fala: "Próxima aula: do suporte farmacológico à mudança sustentável." }]),
      ],
    },
    {
      n: 2, titulo: "Do suporte farmacológico à mudança sustentável", duracao: "10 min", slides: "5, 6",
      objetivo: "Explicar como o suporte farmacológico cria espaço pra intervenção psicológica, e as 3 categorias centrais.",
      segmentos: [
        seg("0:00–1:00", "Retomada rápida", ["Vimos os mecanismos. Hoje vemos como eles se conectam ao trabalho psicológico."]),
        seg("1:00–5:00", "A cadeia (mostrar slide 5)", ["Craving intenso não modulado dificulta a intervenção isolada.", "Suporte farmacológico reduz intensidade.", "Intervenção psicológica ganha força.", "Consolidação mais sustentável."]),
        seg("5:00–9:00", "As 3 categorias (mostrar slide 6)", ["Bloqueadores de receptor: naltrexona.", "Aversivos: dissulfiram.", "Terapias de reposição: buprenorfina/metadona."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: quando cada abordagem costuma ser considerada." }]),
      ],
    },
    {
      n: 3, titulo: "Sinais de alerta, quando cada abordagem é considerada, e os instrumentos", duracao: "13 min", slides: "7, 8, 9",
      objetivo: "Reconhecer sinais de que suporte farmacológico pode ser relevante, diferenciar situações clínicas, e conhecer os instrumentos que orientam essa decisão.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Um filtro rápido — nem todo caso de adicção precisa de suporte farmacológico."]),
        seg("1:00–5:00", "Sinais de alerta (mostrar slide 7)", [
          "Craving intenso recorrente, mesmo com trabalho comportamental ativo.",
          "Múltiplas recaídas apesar de motivação genuína.",
          "Dependência física estabelecida.",
          "Uso apesar de consequências graves.",
        ]),
        seg("5:00–9:00", "Os 3 cenários (mostrar slide 8)", [
          "Terapia psicológica isolada: uso leve, sem dependência física.",
          "Suporte farmacológico indicado: dependência moderada-grave, múltiplas recaídas.",
          "Emergência médica: síndrome de abstinência grave.",
        ]),
        seg("9:00–12:30", "Os instrumentos (mostrar slide 9)", [
          "AUDIT: já usado no Módulo 4.5, orienta gravidade do uso de álcool.",
          "DAST-10: equivalente pra outras substâncias.",
          "Relato de craving: dado clínico direto pra essa conversa.",
        ]),
        seg("12:30–13:00", "Fechamento", [{ fala: "Próxima aula: colocamos tudo em prática — avaliar e psicoeducar." }]),
      ],
    },
    {
      n: 4, titulo: "Aplicação — avaliar e psicoeducar sem indicar", duracao: "13 min", slides: "10, 11",
      objetivo: "Aplicar os passos 1 e 2 do modelo de trabalho conjunto.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["A parte mais prática desse módulo. Hoje, os 2 primeiros passos."]),
        seg("1:00–2:00", "Visão geral (mostrar slide 10)", ["Avaliar padrão de uso e craving → Psicoeducar sobre o suporte existente → Encaminhar quando apropriado → Manter o trabalho psicológico ativo."]),
        seg("2:00–7:00", "Passo 1 — Avaliar padrão de uso e craving (mostrar slide 11, esquerda)", ["Use AUDIT ou DAST-10 pra objetivar a gravidade.", "Pergunte diretamente sobre intensidade e frequência do craving."]),
        seg("7:00–12:00", "Passo 2 — Psicoeducar sem indicar (mostrar slide 11, direita)", [{ fala: "Existem opções médicas que podem ajudar a reduzir essa vontade intensa que você sente — isso é uma decisão pra conversar com um médico especialista." }]),
        seg("12:00–13:00", "Fechamento", [{ fala: "Próxima aula: encaminhar quando apropriado e manter o trabalho ativo." }]),
      ],
    },
    {
      n: 5, titulo: "Aplicação — encaminhar e manter o trabalho ativo", duracao: "11 min", slides: "12",
      objetivo: "Trabalhar os critérios de encaminhamento e a continuidade do trabalho psicológico.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Hoje fechamos o modelo com os 2 últimos passos."]),
        seg("1:00–6:00", "Passo 3 — Encaminhar quando apropriado (mostrar slide 12, esquerda)", ["Priorize diante de craving intenso recorrente ou múltiplas recaídas.", "Encaminhe pra especialista em dependência química quando disponível."]),
        seg("6:00–10:00", "Passo 4 — Manter o trabalho psicológico ativo (mostrar slide 12, direita)", ["Continue o protocolo do Módulo 4.5 em paralelo.", "Use a redução de craving como janela de oportunidade comportamental."]),
        seg("10:00–11:00", "Fechamento", [{ fala: "Modelo completo. Próxima aula: um caso real e os critérios de quando escalar." }]),
      ],
    },
    {
      n: 6, titulo: "Estudo de caso, encaminhamento e recap", duracao: "14 min", slides: "13, 14, 15",
      objetivo: "Integrar todo o módulo num caso completo, com ênfase no trabalho conjunto sem sobreposição de papéis.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Última aula do módulo. Caso completo e os critérios de quando encaminhar."]),
        seg("1:00–6:00", "Estudo de caso (mostrar slide 13)", ["Leia a vinheta com calma.", "Percorra as 3 perguntas de discussão.", "Convide o aluno a pausar e responder por escrito."]),
        seg("6:00–10:00", "Quando encaminhar (mostrar slide 14)", ["Percorra os 4 critérios, com atenção especial a sinais de síndrome de abstinência."]),
        seg("10:00–13:00", "Recapitulando o módulo (mostrar slide 15)", ["Retome os 4 pontos-chave.", "Reforce que suporte farmacológico e trabalho psicológico funcionam melhor juntos."]),
        seg("13:00–14:00", "Fechamento do módulo", [{ fala: "Agora é hora dos exercícios e da avaliação. Te vejo no último módulo do Bloco 3." }]),
      ],
    },
  ];

  const totalMin = 12 + 10 + 13 + 13 + 11 + 14;

  const children = [
    ...doc.capa(KICKER, "Roteiro de Aulas — Farmacologia de Adicções", "Módulo dividido em 6 vídeo-aulas de 10 a 15 minutos, seguindo os slides já produzidos. Cada aula tem roteiro cronometrado, pronto pra gravação."),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "Duração total do módulo em vídeo: ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: `${totalMin} minutos (${(totalMin / 60).toFixed(1)}h) em 6 aulas`, font: doc.FONT, size: 21, color: doc.INK })] }),
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

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", `${RODAPE_DOC} — Roteiro de Aulas`, children), "Modulo-3.5-Roteiro-Aulas.docx");
}

// ============================================================
Promise.resolve()
  .then(construirDeck)
  .then(construirExercicios)
  .then(construirProva)
  .then(construirRoteiro)
  .then(() => console.log("TUDO PRONTO"))
  .catch((e) => { console.error(e); process.exit(1); });

const deck = require("../_lib/lib-deck.js");
const doc = require("../_lib/lib-doc.js");

const MOD = "4.7";
const NOME = "Procrastinação e Autorregulação";
const RODAPE_DECK = `Procrastinação — Módulo ${MOD}`;
const RODAPE_DOC = `Módulo ${MOD} — Procrastinação`;
const KICKER = "MÓDULO 4.7 · PROTOCOLOS CLÍNICOS DIRETOS AO PONTO";

// ============================================================
// 1) SLIDE DECK
// ============================================================
function construirDeck() {
  const pres = deck.novaApresentacao(`${NOME} — Da Neurociência ao Protocolo Clínico`);

  deck.slideTitulo(pres, {
    moduloLabel: `Módulo ${MOD} · Protocolos Clínicos Diretos ao Ponto`,
    titulo: "Procrastinação",
    subtitulo: "A neurociência da autorregulação, aplicada à sessão",
    passos: ["Mecanismo", "Sinais", "Instrumento", "Protocolo", "Encaminhamento"],
  });

  deck.slideRoteiro(pres, {
    rodape: RODAPE_DECK, pageNum: 2,
    cards: [
      { titulo: "Mecanismo", desc: "O conflito entre função executiva e desconforto imediato" },
      { titulo: "Sinais", desc: "O que avisa que virou padrão, não só um dia ruim" },
      { titulo: "Instrumento", desc: "Escalas de procrastinação e rastreio de TDAH" },
      { titulo: "Protocolo", desc: "4 passos, prontos pra sessão" },
      { titulo: "Encaminhamento", desc: "Quando isso não basta" },
    ],
  });

  deck.slideHook(pres, {
    rodape: RODAPE_DECK, pageNum: 3,
    frase: "Procrastinar não é preguiça. É o cérebro escolhendo alívio imediato em vez de uma recompensa maior, porém distante.",
    apoio: "Essa distinção tira o paciente do \"eu sou desorganizado\" e coloca o problema onde ele realmente está: um conflito entre dois sistemas cerebrais.",
  });

  deck.slideCircuito(pres, {
    rodape: RODAPE_DECK, pageNum: 4,
    titulo: "O conflito por trás da procrastinação",
    regioes: [
      { label: "Córtex pré-frontal (função executiva, planejamento)", rx: 0.18, ry: 0.20, color: deck.NAVY, d: 0.5 },
      { label: "Amígdala (desconforto antecipatório da tarefa)", rx: 0.24, ry: 0.64, color: deck.TERRA, d: 0.4 },
      { label: "Sistema de recompensa (prefere alívio imediato)", rx: 0.58, ry: 0.64, color: deck.NAVY_TINT, d: 0.36 },
      { label: "Córtex cingulado anterior (monitora o conflito entre os dois)", rx: 0.60, ry: 0.26, color: deck.TERRA_TINT, d: 0.32 },
    ],
    notas: [
      "A amígdala gera desconforto só de pensar na tarefa — e o cérebro busca alívio imediato.",
      "\"Desconto temporal\": o cérebro valoriza mais uma recompensa pequena agora do que uma recompensa maior no futuro.",
      "O córtex cingulado anterior registra esse conflito — é a sensação de \"eu sei que devia estar fazendo isso\".",
    ],
  });

  deck.slideCadeia(pres, {
    rodape: RODAPE_DECK, pageNum: 5,
    titulo: "Do desconforto ao ciclo de evitação",
    elos: [
      { titulo: "Tarefa desconfortável", desc: "Amígdala gera ansiedade antecipatória só de pensar nela" },
      { titulo: "Busca de alívio", desc: "Cérebro procura uma distração que traga alívio imediato" },
      { titulo: "Reforço da evitação", desc: "O alívio da distração reforça repetir o padrão" },
      { titulo: "Função executiva enfraquece", desc: "A cada repetição, fica mais difícil tolerar o desconforto da próxima vez" },
    ],
    notaFinal: "É um ciclo, não um traço de personalidade — e ciclos podem ser quebrados com o protocolo certo.",
  });

  deck.slideCategorias(pres, {
    rodape: RODAPE_DECK, pageNum: 6,
    titulo: "3 funções da procrastinação",
    categorias: [
      { titulo: "Evitação do desconforto", desc: "Foge da ansiedade antecipatória gerada pela tarefa", color: deck.TERRA },
      { titulo: "Busca de estimulação", desc: "Só começa sob pressão do prazo, busca a adrenalina do limite", color: deck.NAVY },
      { titulo: "Indecisão / perfeccionismo", desc: "Trava por medo de errar — \"não começa até estar perfeito\"", color: deck.NAVY_TINT },
    ],
    notaFinal: "Identificar a função predominante muda qual técnica do protocolo vai funcionar melhor.",
  });

  deck.slideSinais(pres, {
    rodape: RODAPE_DECK, pageNum: 7,
    titulo: "O que avisa que virou padrão, não só um dia ruim",
    itens: [
      { titulo: "Cognitivo", desc: "Racionalização (\"trabalho melhor sob pressão\"), pensamento perfeccionista" },
      { titulo: "Físico", desc: "Tensão ao pensar na tarefa, fadiga mental desproporcional" },
      { titulo: "Comportamental", desc: "Troca de tarefa importante por tarefas triviais, adiamento repetido" },
      { titulo: "Relacional", desc: "Conflitos por prazos perdidos, promessas não cumpridas" },
    ],
  });

  deck.slideDiferencial(pres, {
    rodape: RODAPE_DECK, pageNum: 8,
    titulo: "Diagnóstico diferencial rápido",
    cards: [
      { titulo: "Procrastinação situacional", desc: "Ocasional, ligada a uma tarefa específica desagradável" },
      { titulo: "Procrastinação crônica", desc: "Padrão generalizado, afeta múltiplas áreas da vida" },
      { titulo: "TDAH não diagnosticado", desc: "Dificuldade de função executiva mais ampla e persistente, desde a infância" },
    ],
  });

  deck.slideInstrumentos(pres, {
    rodape: RODAPE_DECK, pageNum: 9,
    titulo: "Três instrumentos, três finalidades",
    instrumentos: [
      { sigla: "GPS", nome: "General Procrastination Scale (Lay)", desc: "Escala validada de procrastinação geral — traço, não situacional." },
      { sigla: "EAO", nome: "Escala de Adiamento Acadêmico/Ocupacional", desc: "Mede procrastinação em contexto específico de estudo ou trabalho." },
      { sigla: "ASRS", nome: "Adult ADHD Self-Report Scale", desc: "Rastreio breve de TDAH adulto — essencial pro diagnóstico diferencial." },
    ],
  });

  deck.slideProtocoloOverview(pres, {
    rodape: RODAPE_DECK, pageNum: 10,
    titulo: "Do mecanismo à intervenção: 4 passos",
    passos: [
      { titulo: "Psicoeducação\ndo mecanismo", desc: "Nomear a evitação de desconforto, não é falta de caráter" },
      { titulo: "Quebra de\ntarefas", desc: "Dividir tarefas grandes, reduzir a carga de decisão" },
      { titulo: "Técnicas de\nativação", desc: "Regra dos 5 minutos, remoção de fricção pra começar" },
      { titulo: "Tolerância ao\ndesconforto", desc: "Agir mesmo com desconforto presente, prevenção de recaída" },
    ],
    notaFinal: "Nas próximas 2 telas, cada passo ganha um exemplo pronto pra levar pra sessão.",
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 11,
    titulo: "Passos 1 e 2, na prática",
    colunas: [
      {
        numero: 1, titulo: "Psicoeducação do mecanismo",
        fala: "“Seu cérebro está processando essa tarefa como uma ameaça — por isso busca alívio imediato em outra coisa. Isso não é falta de disciplina.”",
        bullets: ["Reduz a culpa que costuma alimentar o próprio ciclo", "Prepara o terreno pra quebra de tarefas"],
      },
      {
        numero: 2, titulo: "Quebra de tarefas",
        bullets: ["Divida a tarefa grande em passos pequenos e concretos", "Cada passo deve ser específico o suficiente pra não exigir decisão extra", "O primeiro passo deve ser propositalmente muito fácil"],
      },
    ],
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 12,
    titulo: "Passos 3 e 4, na prática",
    colunas: [
      {
        numero: 3, titulo: "Técnicas de ativação",
        bullets: ["Regra dos 5 minutos: comprometer-se a começar por só 5 minutos", "Remover fricção: deixar o material da tarefa já visível/acessível antes de começar", "Reduzir distrações do ambiente antes de iniciar, não durante"],
      },
      {
        numero: 4, titulo: "Tolerância ao desconforto",
        bullets: ["Praticar agir mesmo com o desconforto presente, sem esperar ele passar", "Mapear os gatilhos de evitação mais comuns do paciente", "Revisar o plano periodicamente — recaída é esperada, não é fracasso"],
      },
    ],
  });

  deck.slideCaso(pres, {
    rodape: RODAPE_DECK, pageNum: 13,
    vinheta: "Bruno, 30 anos, redator freelancer, relata que sempre entrega os projetos \"em cima da hora\", mesmo tendo semanas de prazo. Diz que \"só consegue trabalhar sob pressão\" e passa a maior parte do tempo disponível em tarefas triviais. Isso já causou perda de 2 clientes importantes. Relata esse padrão desde a adolescência, em praticamente todas as áreas da vida, incluindo estudos.",
    perguntas: [
      "Que função de procrastinação está mais evidente na vinheta?",
      "O padrão \"desde a adolescência, em praticamente todas as áreas\" levanta que hipótese diagnóstica diferencial importante?",
      "Sugira uma técnica de quebra de tarefas (passo 2) pro próximo projeto de Bruno.",
    ],
  });

  deck.slideEncaminhamento(pres, {
    rodape: RODAPE_DECK, pageNum: 14,
    criterios: [
      "Suspeita de TDAH não diagnosticado — encaminhar pra avaliação neuropsicológica (conecta com o Bloco 2 da formação)",
      "Comorbidade significativa com depressão ou ansiedade",
      "Procrastinação causando prejuízo funcional grave (perda de emprego, risco acadêmico real)",
      "Padrão pervasivo desde a infância/adolescência, em múltiplas áreas da vida",
    ],
  });

  deck.slideRecap(pres, {
    rodape: RODAPE_DECK, pageNum: 15,
    pontos: [
      "Procrastinar é o cérebro escolhendo alívio imediato — não é falta de caráter",
      "As 3 funções (evitação, estimulação, indecisão) direcionam qual técnica usar",
      "GPS, EAO e ASRS cobrem traço geral, contexto específico e rastreio de TDAH",
      "O protocolo de 4 passos vai de psicoeducação a tolerância ao desconforto",
    ],
    proximoTexto: "Próximo: exercícios práticos e avaliação do Módulo 4.7 →",
  });

  return pres.writeFile({ fileName: "Modulo-4.7-Procrastinacao.pptx" });
}

// ============================================================
// 2) EXERCÍCIOS
// ============================================================
function construirExercicios() {
  const children = [
    ...doc.capa(KICKER, "Exercícios — Procrastinação", "Resolva individualmente antes da sessão de supervisão. O objetivo é testar sua leitura do mecanismo e do protocolo antes de comparar com a discussão em grupo — não há problema em errar."),

    doc.exNum(1, "O mecanismo, em suas palavras"),
    doc.pergunta(1, "Explique em até 3 frases, sem jargão técnico, por que \"força de vontade\" sozinha raramente resolve procrastinação crônica."),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Cite as 3 funções da procrastinação vistas na aula e dê um exemplo de fala de paciente pra cada uma."),
    ...doc.linhaResposta(2),

    doc.exNum(2, "Leitura de escala"),
    doc.vinhetaBox("Paciente pontua alto na General Procrastination Scale (traço geral), mas relata que o padrão só apareceu nos últimos 6 meses, após uma mudança de cargo."),
    doc.pergunta(1, "Isso sugere procrastinação situacional ou crônica? Por quê?"),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Isso muda a prioridade do protocolo? Como?"),
    ...doc.linhaResposta(1),

    doc.exNum(3, "Diagnóstico diferencial"),
    doc.vinhetaBox("Camila, 22 anos, relata que sempre teve dificuldade de terminar tarefas desde criança, se distrai facilmente mesmo em atividades que gosta, e perde prazos em quase todas as áreas da vida — não só no trabalho."),
    doc.pergunta(1, "Que hipótese diagnóstica diferencial merece investigação aqui? Justifique."),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Que instrumento você aplicaria, e pra qual finalidade?"),
    ...doc.linhaResposta(1),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),

    doc.exNum(4, "Quebra de tarefas"),
    doc.p("Para o caso de Bruno (vinheta da aula), quebre o próximo projeto de redação dele em 4 passos pequenos e concretos."),
    doc.tabelaSimples(["Nº", "Passo"], [["1", ""], ["2", ""], ["3", ""], ["4", ""]], [1200, 8150]),

    doc.exNum(5, "Caso integrado — Bruno"),
    doc.vinhetaBox("Bruno, 30 anos, redator freelancer, sempre entrega \"em cima da hora\", diz que \"só trabalha sob pressão\", passa o tempo disponível em tarefas triviais. Já perdeu 2 clientes. Padrão desde a adolescência, em quase todas as áreas."),
    doc.pergunta(1, "Escreva a frase de psicoeducação que você usaria com Bruno."),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Sugira uma técnica de ativação (passo 3) adequada pro perfil de Bruno."),
    ...doc.linhaResposta(2),
    doc.pergunta(3, "Em que ponto você consideraria encaminhar Bruno pra avaliação neuropsicológica?"),
    ...doc.linhaResposta(2),
  ];

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-4.7-Exercicios.docx");
}

// ============================================================
// 3) AVALIAÇÃO
// ============================================================
function construirProva() {
  const objetivas = [
    ["Qual par de sistemas está em conflito na procrastinação?", ["Córtex pré-frontal (função executiva) x sistema límbico (desconforto imediato)", "Cerebelo x tálamo", "Sistema auditivo x sistema visual", "Não há conflito neural relevante"]],
    ["\"Desconto temporal\" (temporal discounting) se refere a:", ["Preferir uma recompensa imediata pequena a uma recompensa maior mas distante", "Um desconto financeiro literal em compras", "Falta de memória de curto prazo", "Um fenômeno sem relação com procrastinação"]],
    ["A cada ciclo de evitação-alívio na procrastinação:", ["A função executiva se fortalece progressivamente", "A função executiva tende a enfraquecer com a repetição", "Não há nenhum efeito cerebral mensurável", "A tarefa deixa de existir"]],
    ["Qual NÃO é uma das 3 funções de procrastinação vistas na aula?", ["Evitação do desconforto", "Busca de estimulação", "Indecisão/perfeccionismo", "Alucinação"]],
    ["Escala validada pra medir procrastinação geral (traço):", ["General Procrastination Scale (Lay)", "BAI", "MBI", "Y-BOCS"]],
    ["Por que é importante rastrear TDAH no diagnóstico diferencial de procrastinação?", ["Não é realmente importante", "TDAH não diagnosticado pode ser a causa real da dificuldade de função executiva, exigindo abordagem diferente", "TDAH e procrastinação são sempre a mesma condição", "Só é relevante em crianças"]],
    ["A \"regra dos 5 minutos\" (passo 3) consiste em:", ["Trabalhar exatamente 5 minutos e nunca mais que isso", "Comprometer-se a começar a tarefa por só 5 minutos, reduzindo a resistência inicial", "Adiar a tarefa por 5 minutos antes de decidir se vai fazer", "Fazer pausas de 5 minutos a cada hora de trabalho"]],
    ["Quebra de tarefas (passo 2) tem como objetivo principal:", ["Aumentar a carga cognitiva da tarefa", "Reduzir a carga de decisão, tornando o primeiro passo menos ameaçador", "Tornar a tarefa mais longa e complexa", "Confundir o paciente propositalmente"]],
    ["É critério de encaminhamento:", ["O paciente procrastinar uma tarefa uma única vez", "Suspeita de TDAH não diagnosticado, exigindo avaliação neuropsicológica", "O paciente ter menos de 25 anos", "A tarefa ser relacionada ao trabalho"]],
    ["Tolerância ao desconforto (passo 4) significa:", ["Eliminar todo desconforto antes de agir", "Construir capacidade de agir mesmo com o desconforto presente, sem esperar ele passar", "Ignorar completamente todos os prazos", "Delegar todas as tarefas difíceis pra outra pessoa"]],
  ];
  const gabaritoObjetivas = ["a", "a", "b", "d", "a", "b", "b", "b", "b", "b"];

  const children = [
    ...doc.capa(KICKER, "Avaliação — Procrastinação", `Avaliação formativa de encerramento do Módulo ${MOD}.`),
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
    doc.vinhetaBox("Patrícia, 27 anos, mestranda, relata que não consegue avançar na dissertação há meses. Diz que \"precisa ler mais um pouco antes de escrever\" repetidamente, e que tem medo de \"escrever algo ruim\". Reconhece que o problema começou só depois de ingressar no mestrado — antes sempre entregava tudo dentro do prazo, inclusive na graduação. GPS (procrastinação geral) indica escore baixo-moderado."),
    new doc.Paragraph({ spacing: { before: 240 }, children: [new doc.TextRun({ text: "Com base no protocolo estudado, responda:", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    new doc.Paragraph({ spacing: { before: 220, after: 40 }, children: [new doc.TextRun({ text: "a) (10 pts) Que função de procrastinação está mais evidente no caso de Patrícia?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "b) (10 pts) O escore baixo-moderado no GPS, combinado com o início recente do padrão, sugere procrastinação situacional ou crônica? Justifique.", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "c) (10 pts) Descreva a frase de psicoeducação que você usaria com Patrícia.", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "d) (10 pts) Sugira uma técnica de quebra de tarefas (passo 2) específica pro bloqueio de escrita de Patrícia.", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    new doc.Paragraph({ spacing: { after: 40 }, children: [new doc.TextRun({ text: "USO EXCLUSIVO DO INSTRUTOR — remover antes de aplicar a prova", bold: true, color: doc.TERRA, font: doc.FONT, size: 20 })] }),
    doc.tituloH1("Gabarito"),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 1 — Questões objetivas", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 200 }, children: [new doc.TextRun({ text: gabaritoObjetivas.map((r, i) => `${i + 1}-${r}`).join("   ·   "), font: doc.FONT, size: 22, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 2 — Critério de correção da questão de caso", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "a) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Indecisão/perfeccionismo — medo de \"escrever algo ruim\" e a racionalização de \"precisar ler mais antes\" são evitação por medo de errar.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "b) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Situacional — escore geral baixo-moderado e início recente, ligado especificamente à exigência nova do mestrado, não um padrão de vida inteira.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "c) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Espera-se nomear que o cérebro de Patrícia está tratando a escrita como uma ameaça (medo de errar), e por isso busca alívio na leitura infinita — não é falta de competência.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "d) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Ex: comprometer-se a escrever um parágrafo \"propositalmente ruim\" (rascunho descartável), removendo a exigência de perfeição do primeiro passo.", font: doc.FONT, size: 21, color: doc.INK })] }),
  );

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-4.7-Avaliacao.docx");
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
      n: 1, titulo: "O cérebro escolhendo alívio imediato", duracao: "12 min", slides: "1, 2, 3, 4",
      objetivo: "Sair sabendo explicar o mecanismo da procrastinação sem jargão, tirando o paciente do \"eu sou desorganizado\".",
      segmentos: [
        seg("0:00–0:45", "Abertura (gancho)", [{ fala: "Procrastinar não é preguiça. É o cérebro escolhendo alívio imediato em vez de uma recompensa maior, porém distante." }]),
        seg("0:45–2:00", "Por que isso importa clinicamente", ["Coloca o problema no lugar certo: um conflito entre dois sistemas cerebrais, não um defeito de caráter.", "Isso é o Passo 1 da anatomia de todo protocolo do curso: Mecanismo."]),
        seg("2:00–8:00", "O conflito por trás da procrastinação (mostrar slide 4)", [
          "Córtex pré-frontal planeja e quer cumprir a meta.",
          "Amígdala gera desconforto antecipatório só de pensar na tarefa.",
          "Sistema de recompensa prefere o alívio imediato — o \"desconto temporal\".",
          "Córtex cingulado anterior registra o conflito entre os dois.",
        ]),
        seg("8:00–10:30", "Como levar isso pra sessão", [{ fala: "Seu cérebro está processando essa tarefa como uma ameaça — por isso busca alívio imediato em outra coisa." }]),
        seg("10:30–12:00", "Fechamento", [{ fala: "Próxima aula: o ciclo completo, do desconforto à evitação repetida." }]),
      ],
    },
    {
      n: 2, titulo: "Do desconforto ao ciclo de evitação", duracao: "10 min", slides: "5",
      objetivo: "Explicar a cadeia desconforto–alívio–reforço–enfraquecimento da função executiva.",
      segmentos: [
        seg("0:00–1:00", "Retomada rápida", ["Vimos os sistemas em conflito. Hoje vemos como isso vira ciclo repetido."]),
        seg("1:00–6:30", "A cadeia (mostrar slide 5)", ["Tarefa desconfortável gera ansiedade antecipatória.", "Cérebro busca alívio numa distração.", "O alívio reforça repetir o padrão.", "Função executiva enfraquece a cada repetição."]),
        seg("6:30–9:00", "Por que isso não é traço de personalidade", ["É um ciclo aprendido — e ciclos podem ser quebrados com o protocolo certo."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: as 3 funções da procrastinação — nem toda procrastinação é igual." }]),
      ],
    },
    {
      n: 3, titulo: "As 3 funções da procrastinação", duracao: "10 min", slides: "6",
      objetivo: "Reconhecer evitação, busca de estimulação e indecisão/perfeccionismo como funções distintas.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três funções diferentes — e cada uma pede uma ênfase diferente no protocolo."]),
        seg("1:00–7:00", "Evitação, estimulação, indecisão (mostrar slide 6)", [
          "Evitação do desconforto: foge da ansiedade da tarefa.",
          "Busca de estimulação: só começa sob pressão do prazo.",
          "Indecisão/perfeccionismo: trava por medo de errar.",
        ]),
        seg("7:00–9:00", "Aplicação prática", ["Pergunte: \"o que você sente quando pensa na tarefa — desconforto, tédio, ou medo de fazer errado?\"", "A resposta direciona qual técnica do protocolo priorizar."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: os sinais de que virou padrão, não só um dia ruim." }]),
      ],
    },
    {
      n: 4, titulo: "Sinais de alerta", duracao: "10 min", slides: "7",
      objetivo: "Reconhecer sinais de que a procrastinação virou padrão recorrente.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Todo mundo adia algo às vezes. O padrão é diferente do episódio isolado."]),
        seg("1:00–7:30", "As 4 categorias (mostrar slide 7)", [
          "Cognitivo: racionalização, pensamento perfeccionista.",
          "Físico: tensão ao pensar na tarefa, fadiga desproporcional.",
          "Comportamental: troca por tarefas triviais, adiamento repetido.",
          "Relacional: conflitos por prazos perdidos.",
        ]),
        seg("7:30–9:00", "Por que isso importa", ["Esses sinais ajudam a diferenciar um mau dia de um padrão que precisa de intervenção."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: como diferenciar procrastinação situacional, crônica e TDAH." }]),
      ],
    },
    {
      n: 5, titulo: "Diagnóstico diferencial rápido", duracao: "12 min", slides: "8",
      objetivo: "Diferenciar procrastinação situacional, crônica e TDAH não diagnosticado.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Um filtro rápido — e o TDAH merece atenção especial aqui."]),
        seg("1:00–8:00", "Os 3 quadros (mostrar slide 8)", [
          "Situacional: ocasional, ligada a uma tarefa específica.",
          "Crônica: padrão generalizado, múltiplas áreas.",
          "TDAH não diagnosticado: função executiva comprometida desde a infância.",
        ]),
        seg("8:00–10:30", "Por que TDAH merece atenção especial", ["Se a causa real é TDAH, o protocolo de procrastinação sozinho não é suficiente — precisa de avaliação neuropsicológica."]),
        seg("10:30–12:00", "Fechamento", [{ fala: "Próxima aula: os instrumentos que confirmam essa leitura com dado." }]),
      ],
    },
    {
      n: 6, titulo: "Os 3 instrumentos de avaliação", duracao: "12 min", slides: "9",
      objetivo: "Saber quando usar GPS, EAO e ASRS.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três instrumentos, três finalidades diferentes."]),
        seg("1:00–4:30", "GPS (General Procrastination Scale)", ["Mede procrastinação como traço geral, não situacional."]),
        seg("4:30–7:30", "EAO (Escala de Adiamento Acadêmico/Ocupacional)", ["Mede procrastinação em contexto específico."]),
        seg("7:30–10:00", "ASRS", ["Rastreio breve de TDAH adulto — essencial pro diagnóstico diferencial."]),
        seg("10:00–12:00", "Como escolher na prática", ["GPS pra traço geral; EAO quando o problema é contextual; ASRS sempre que o padrão parecer pervasivo.", { fala: "Próxima aula: colocamos tudo em prática — psicoeducação e quebra de tarefas." }]),
      ],
    },
    {
      n: 7, titulo: "Protocolo — psicoeducação e quebra de tarefas", duracao: "14 min", slides: "10, 11",
      objetivo: "Aplicar os passos 1 e 2 do protocolo com script de psicoeducação e técnica de quebra de tarefas.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["A parte que você vai usar amanhã. Hoje, os 2 primeiros passos."]),
        seg("1:00–2:00", "Visão geral (mostrar slide 10)", ["Psicoeducação → Quebra de tarefas → Ativação → Tolerância ao desconforto."]),
        seg("2:00–7:00", "Passo 1 — Psicoeducação (mostrar slide 11, esquerda)", [{ fala: "Seu cérebro está processando essa tarefa como uma ameaça — por isso busca alívio imediato em outra coisa." }]),
        seg("7:00–13:00", "Passo 2 — Quebra de tarefas (mostrar slide 11, direita)", ["Divida a tarefa em passos pequenos e concretos.", "O primeiro passo deve ser propositalmente muito fácil."]),
        seg("13:00–14:00", "Fechamento", [{ fala: "Próxima aula: técnicas de ativação e tolerância ao desconforto." }]),
      ],
    },
    {
      n: 8, titulo: "Protocolo — ativação e tolerância ao desconforto", duracao: "14 min", slides: "12",
      objetivo: "Aplicar técnicas de ativação e construir tolerância ao desconforto de forma sustentável.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Hoje fechamos o protocolo com a parte mais prática."]),
        seg("1:00–7:00", "Passo 3 — Técnicas de ativação (mostrar slide 12, esquerda)", ["Regra dos 5 minutos: comprometer-se a começar por pouco tempo.", "Remover fricção: deixar o material já acessível antes de começar."]),
        seg("7:00–13:00", "Passo 4 — Tolerância ao desconforto (mostrar slide 12, direita)", ["Praticar agir mesmo com desconforto presente.", "Mapear os gatilhos de evitação mais comuns.", "Recaída é esperada — revisar o plano periodicamente."]),
        seg("13:00–14:00", "Fechamento", [{ fala: "Protocolo completo. Próxima aula: um caso real e os critérios de quando encaminhar." }]),
      ],
    },
    {
      n: 9, titulo: "Estudo de caso, encaminhamento e recap", duracao: "15 min", slides: "13, 14, 15",
      objetivo: "Integrar mecanismo, instrumento e protocolo num caso completo, com ênfase no diferencial de TDAH.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Última aula do módulo. Caso completo e os limites do protocolo sozinho."]),
        seg("1:00–7:00", "Estudo de caso — Bruno (mostrar slide 13)", ["Leia a vinheta com calma.", "Percorra as 3 perguntas de discussão.", "Convide o aluno a pausar e responder por escrito."]),
        seg("7:00–11:00", "Quando encaminhar (mostrar slide 14)", ["Percorra os 4 critérios — ênfase em suspeita de TDAH e a ponte com o Bloco 2 (avaliação neuropsicológica)."]),
        seg("11:00–14:00", "Recapitulando o módulo (mostrar slide 15)", ["Retome os 4 pontos-chave.", "Reforce a anatomia de 5 passos, comum a todo protocolo do curso."]),
        seg("14:00–15:00", "Fechamento do módulo", [{ fala: "Agora é hora dos exercícios e da avaliação. Te vejo no próximo protocolo." }]),
      ],
    },
  ];

  const totalMin = 12 + 10 + 10 + 10 + 12 + 12 + 14 + 14 + 15;

  const children = [
    ...doc.capa(KICKER, "Roteiro de Aulas — Procrastinação", "Módulo dividido em 9 vídeo-aulas de 10 a 15 minutos, seguindo os slides já produzidos. Cada aula tem roteiro cronometrado, pronto pra gravação."),
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

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", `${RODAPE_DOC} — Roteiro de Aulas`, children), "Modulo-4.7-Roteiro-Aulas.docx");
}

// ============================================================
Promise.resolve()
  .then(construirDeck)
  .then(construirExercicios)
  .then(construirProva)
  .then(construirRoteiro)
  .then(() => console.log("TUDO PRONTO"))
  .catch((e) => { console.error(e); process.exit(1); });

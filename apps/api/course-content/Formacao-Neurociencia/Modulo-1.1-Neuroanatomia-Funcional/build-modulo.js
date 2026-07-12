const deck = require("../_lib/lib-deck.js");
const doc = require("../_lib/lib-doc.js");

const MOD = "1.1";
const NOME = "Neuroanatomia Funcional para a Clínica";
const RODAPE_DECK = `Neuroanatomia Funcional — Módulo ${MOD}`;
const RODAPE_DOC = `Módulo ${MOD} — Neuroanatomia Funcional`;
const KICKER = "MÓDULO 1.1 · FUNDAMENTOS DE NEUROCIÊNCIA APLICADA";

// ============================================================
// 1) SLIDE DECK
// ============================================================
function construirDeck() {
  const pres = deck.novaApresentacao(`${NOME} — O Mapa Cerebral da Prática Clínica`);

  deck.slideTitulo(pres, {
    moduloLabel: `Módulo ${MOD} · Bloco 1 · Fundamentos`,
    titulo: "Neuroanatomia Funcional",
    subtitulo: "O mapa cerebral que sustenta toda decisão terapêutica",
    passos: ["Estruturas", "Circuitos", "Sinais", "Avaliação", "Aplicação"],
  });

  deck.slideRoteiro(pres, {
    rodape: RODAPE_DECK, pageNum: 2,
    cards: [
      { titulo: "Estruturas-chave", desc: "PFC, sistema límbico, hipocampo, ínsula, cerebelo" },
      { titulo: "Circuitos", desc: "Como as estruturas conversam entre si na regulação emocional" },
      { titulo: "Sinais clínicos", desc: "Como cada disfunção aparece dentro da sessão" },
      { titulo: "Avaliação", desc: "Quando suspeitar de causa estrutural real" },
      { titulo: "Aplicação", desc: "Da anatomia à psicoeducação que aumenta adesão" },
    ],
  });

  deck.slideHook(pres, {
    rodape: RODAPE_DECK, pageNum: 3,
    frase: "Você não precisa decorar neuroanatomia — precisa entender o suficiente pra explicar ao paciente, em duas frases, por que ele reage do jeito que reage.",
    apoio: "Esse é o objetivo deste módulo: não memorização, mas um vocabulário funcional que sustenta a psicoeducação em qualquer protocolo clínico do curso.",
  });

  deck.slideCircuito(pres, {
    rodape: RODAPE_DECK, pageNum: 4,
    titulo: "O circuito que mais aparece na prática clínica",
    regioes: [
      { label: "Córtex pré-frontal (planejamento, regulação e controle inibitório)", rx: 0.20, ry: 0.22, color: deck.NAVY, d: 0.5 },
      { label: "Amígdala (detecção de ameaça e resposta emocional rápida)", rx: 0.22, ry: 0.62, color: deck.TERRA, d: 0.4 },
      { label: "Hipocampo (consolidação de memória e contexto temporal)", rx: 0.60, ry: 0.60, color: deck.NAVY_TINT, d: 0.36 },
      { label: "Ínsula (processamento interoceptivo, consciência do corpo)", rx: 0.58, ry: 0.24, color: deck.TERRA_TINT, d: 0.36 },
    ],
    notas: [
      "O córtex pré-frontal funciona como o \"freio\" regulador — ele modula a resposta gerada por estruturas mais primitivas do cérebro.",
      "A amígdala detecta ameaça de forma extremamente rápida, antes mesmo do processamento cortical consciente — por isso reações emocionais parecem \"automáticas\".",
      "O hipocampo e a ínsula fecham o quadro: contexto temporal/espacial da memória, e consciência das próprias sensações corporais.",
    ],
  });

  deck.slideCadeia(pres, {
    rodape: RODAPE_DECK, pageNum: 5,
    titulo: "Da percepção à resposta regulada",
    elos: [
      { titulo: "Estímulo percebido", desc: "Informação sensorial chega ao cérebro, processada inicialmente de forma rápida" },
      { titulo: "Resposta límbica inicial", desc: "Amígdala avalia ameaça antes de qualquer análise consciente completa" },
      { titulo: "Modulação pré-frontal", desc: "O córtex pré-frontal reavalia e regula a intensidade da resposta inicial" },
      { titulo: "Resposta final integrada", desc: "Comportamento observável, regulado ou não, dependendo do equilíbrio anterior" },
    ],
    notaFinal: "Grande parte da psicoterapia, em diferentes abordagens, atua justamente nesse terceiro elo — fortalecendo a modulação pré-frontal sobre a resposta límbica inicial.",
  });

  deck.slideCategorias(pres, {
    rodape: RODAPE_DECK, pageNum: 6,
    titulo: "3 sistemas funcionais que organizam a clínica",
    categorias: [
      { titulo: "Sistema executivo", desc: "Planejamento, controle inibitório e tomada de decisão (córtex pré-frontal)", color: deck.NAVY },
      { titulo: "Sistema de memória", desc: "Consolidação, contexto e aprendizagem (hipocampo e estruturas associadas)", color: deck.TERRA },
      { titulo: "Sistema emocional/interoceptivo", desc: "Detecção de ameaça e consciência corporal (amígdala e ínsula)", color: deck.NAVY_TINT },
    ],
    notaFinal: "Praticamente todo protocolo clínico deste curso pode ser lido como uma intervenção sobre o equilíbrio entre esses 3 sistemas.",
  });

  deck.slideSinais(pres, {
    rodape: RODAPE_DECK, pageNum: 7,
    titulo: "Como a disfunção de cada estrutura aparece na sessão",
    itens: [
      { titulo: "Córtex pré-frontal", desc: "Impulsividade, dificuldade de planejar, dificuldade de conter reações" },
      { titulo: "Amígdala", desc: "Reatividade emocional desproporcional, hipervigilância a ameaça" },
      { titulo: "Hipocampo", desc: "Dificuldade de consolidar memória, comum em estresse crônico prolongado" },
      { titulo: "Ínsula", desc: "Dificuldade de identificar e nomear as próprias emoções (alexitimia)" },
    ],
  });

  deck.slideDiferencial(pres, {
    rodape: RODAPE_DECK, pageNum: 8,
    titulo: "Quando suspeitar de causa estrutural real",
    cards: [
      { titulo: "Sintoma funcional (maioria dos casos)", desc: "Padrão consistente com história de vida e contexto emocional, sem sinais neurológicos" },
      { titulo: "Lesão neurológica real", desc: "Início súbito, assimetria, sinais motores/sensoriais associados — exige avaliação médica" },
      { titulo: "Quadro neurodesenvolvimental", desc: "Padrão presente desde a infância, pervasivo — ver Módulos 4.22 (TDAH) e 4.27 (TEA)" },
    ],
  });

  deck.slideInstrumentos(pres, {
    rodape: RODAPE_DECK, pageNum: 9,
    titulo: "Como essas funções são avaliadas formalmente",
    instrumentos: [
      { sigla: "Funções executivas", nome: "Trail Making, Stroop, Torre de Londres", desc: "Avaliam planejamento e controle inibitório — aprofundado no Módulo 2.3." },
      { sigla: "Memória", nome: "RAVLT, Figura Complexa de Rey", desc: "Avaliam consolidação e aprendizagem verbal/visual." },
      { sigla: "Entrevista clínica", nome: "Exame do estado mental", desc: "Observação direta de sinais funcionais na sessão — Módulo 2.1." },
    ],
  });

  deck.slideProtocoloOverview(pres, {
    rodape: RODAPE_DECK, pageNum: 10,
    titulo: "Da neuroanatomia à aplicação clínica: 4 passos",
    passos: [
      { titulo: "Reconhecer\no circuito", desc: "Identificar qual sistema parece mais envolvido na queixa do paciente" },
      { titulo: "Traduzir em\npsicoeducação", desc: "Explicar o mecanismo em linguagem acessível, sem jargão" },
      { titulo: "Conectar ao\nprotocolo certo", desc: "Usar essa leitura pra escolher a intervenção do Bloco 4 mais adequada" },
      { titulo: "Monitorar\na mudança", desc: "Observar sinais de que a regulação está melhorando ao longo do tempo" },
    ],
    notaFinal: "Esse é o fio condutor de todo o curso: cada protocolo clínico do Bloco 4 começa exatamente por essa leitura neuroanatômica do mecanismo.",
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 11,
    titulo: "Passos 1 e 2, na prática",
    colunas: [
      {
        numero: 1, titulo: "Reconhecer o circuito",
        bullets: ["Pergunte-se: a queixa parece mais ligada a reatividade emocional (amígdala), planejamento (PFC) ou memória (hipocampo)?", "Use a fala espontânea do paciente como pista — ela geralmente aponta o sistema mais envolvido"],
      },
      {
        numero: 2, titulo: "Traduzir em psicoeducação",
        fala: "“Seu cérebro está reagindo rápido demais antes de pensar — isso não é falta de controle, é um circuito específico funcionando dessa forma agora.”",
        bullets: ["Use metáforas simples e concretas, evitando terminologia técnica desnecessária"],
      },
    ],
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 12,
    titulo: "Passos 3 e 4, na prática",
    colunas: [
      {
        numero: 3, titulo: "Conectar ao protocolo certo",
        bullets: ["Use a leitura do circuito pra escolher entre os protocolos do Bloco 4 (ex: reatividade amigdaliana aponta pra ansiedade/pânico)", "Revise o Módulo correspondente antes de aplicar a intervenção"],
      },
      {
        numero: 4, titulo: "Monitorar a mudança",
        bullets: ["Observe sinais concretos de regulação melhorando (menos reatividade, mais planejamento) ao longo das sessões", "Use isso como parte da psicoeducação contínua — mostrar progresso reforça adesão"],
      },
    ],
  });

  deck.slideCaso(pres, {
    rodape: RODAPE_DECK, pageNum: 13,
    vinheta: "Um paciente chega relatando que \"explode\" com facilidade em discussões, mesmo sabendo que está exagerando, e se arrepende depois. Ele descreve a sensação como \"eu já grito antes de conseguir pensar\". Não há histórico de lesão neurológica, início súbito ou outros sinais de alerta médico.",
    perguntas: [
      "Que sistema funcional parece mais envolvido nessa queixa, e por quê?",
      "Como você explicaria esse mecanismo ao paciente em linguagem simples, sem jargão técnico?",
      "A que protocolo clínico do Bloco 4 essa leitura poderia conectar diretamente?",
    ],
  });

  deck.slideEncaminhamento(pres, {
    rodape: RODAPE_DECK, pageNum: 14,
    criterios: [
      "Início súbito de sintomas cognitivos ou emocionais, sem explicação psicológica clara",
      "Sinais motores ou sensoriais associados (fraqueza, alteração de fala, perda de consciência)",
      "Padrão presente desde a infância de forma pervasiva: considerar avaliação neurodesenvolvimental (Módulos 4.22, 4.27)",
      "Qualquer suspeita de causa neurológica real: encaminhar pra avaliação médica antes de aprofundar o trabalho psicológico",
    ],
  });

  deck.slideRecap(pres, {
    rodape: RODAPE_DECK, pageNum: 15,
    pontos: [
      "O objetivo não é memorizar neuroanatomia, é ter vocabulário funcional pra psicoeducação clínica",
      "PFC, amígdala, hipocampo e ínsula formam o circuito mais recorrente na prática clínica",
      "Sistema executivo, sistema de memória e sistema emocional/interoceptivo organizam a leitura de praticamente qualquer queixa",
      "Essa leitura neuroanatômica é o fio condutor que conecta este módulo a todos os protocolos do Bloco 4",
    ],
    proximoTexto: "Próximo: exercícios práticos e avaliação do Módulo 1.1 →",
  });

  return pres.writeFile({ fileName: "Modulo-1.1-Neuroanatomia-Funcional.pptx" });
}

// ============================================================
// 2) EXERCÍCIOS
// ============================================================
function construirExercicios() {
  const children = [
    ...doc.capa(KICKER, "Exercícios — Neuroanatomia Funcional", "Resolva individualmente antes da sessão de supervisão. O objetivo é testar sua leitura funcional das estruturas antes de comparar com a discussão em grupo — não há problema em errar."),

    doc.exNum(1, "As estruturas, em suas palavras"),
    doc.pergunta(1, "Explique em uma frase simples, sem jargão, a função clínica de cada estrutura: PFC, amígdala, hipocampo, ínsula."),
    ...doc.linhaResposta(3),
    doc.pergunta(2, "Por que a resposta da amígdala é descrita como mais rápida que o processamento pré-frontal consciente?"),
    ...doc.linhaResposta(2),

    doc.exNum(2, "Os 3 sistemas funcionais"),
    doc.tabelaSimples(["Sistema", "Estrutura principal", "Exemplo de disfunção clínica"], [["Executivo", "", ""], ["Memória", "", ""], ["Emocional/interoceptivo", "", ""]], [2600, 2600, 4150]),

    doc.exNum(3, "Quando suspeitar de causa estrutural real"),
    doc.vinhetaBox("Um paciente relata início súbito de dificuldade de fala e fraqueza num dos lados do corpo, junto com alteração de humor recente."),
    doc.pergunta(1, "Que sinais dessa vinheta indicam necessidade de encaminhamento médico imediato, antes de qualquer intervenção psicológica?"),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),

    doc.exNum(4, "Psicoeducação em linguagem simples"),
    doc.vinhetaBox("Um paciente pergunta: \"por que eu grito antes de conseguir pensar direito?\""),
    doc.pergunta(1, "Escreva uma resposta de psicoeducação, em linguagem acessível, explicando o mecanismo amígdala-PFC."),
    ...doc.linhaResposta(3),

    doc.exNum(5, "Caso integrado"),
    doc.vinhetaBox("Um paciente relata \"explodir\" com facilidade em discussões, mesmo sabendo que está exagerando, sem histórico de lesão neurológica ou início súbito."),
    doc.pergunta(1, "Que sistema funcional parece mais envolvido, e por quê?"),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "A que protocolo do Bloco 4 essa leitura poderia se conectar diretamente?"),
    ...doc.linhaResposta(1),
  ];

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-1.1-Exercicios.docx");
}

// ============================================================
// 3) AVALIAÇÃO
// ============================================================
function construirProva() {
  const objetivas = [
    ["O córtex pré-frontal, na leitura funcional clínica, é responsável principalmente por:", ["Planejamento, regulação e controle inibitório", "Detecção de ameaça imediata, sem qualquer regulação", "Consolidação exclusiva de memórias de longo prazo", "Processamento visual básico"]],
    ["A amígdala processa ameaça:", ["De forma extremamente rápida, antes do processamento cortical consciente completo", "Apenas após análise consciente detalhada", "Exclusivamente durante o sono", "Sem qualquer relação com resposta emocional"]],
    ["Os 3 sistemas funcionais que organizam a leitura clínica são:", ["Sistema executivo, sistema de memória, sistema emocional/interoceptivo", "Sistema motor, sistema visual, sistema auditivo", "Sistema digestivo, sistema circulatório, sistema respiratório", "Nenhum sistema específico organiza essa leitura"]],
    ["Dificuldade de identificar e nomear as próprias emoções (alexitimia) está mais associada a:", ["Disfunção da ínsula", "Disfunção exclusiva do cerebelo", "Ausência total de qualquer estrutura límbica", "Função motora comprometida"]],
    ["Um sinal de alerta pra suspeitar de causa neurológica real, e não apenas funcional, é:", ["Início súbito de sintomas com sinais motores ou sensoriais associados", "Padrão consistente com a história de vida do paciente", "Sintomas presentes desde a infância de forma estável", "Ausência completa de qualquer sintoma"]],
    ["O terceiro elo da cadeia \"percepção → resposta límbica → modulação pré-frontal → resposta final\" é onde:", ["Grande parte da psicoterapia atua, fortalecendo a regulação sobre a resposta inicial", "Nenhuma intervenção psicológica tem qualquer efeito", "Apenas a farmacologia pode atuar, nunca a psicoterapia", "A resposta comportamental já está definida sem possibilidade de mudança"]],
    ["O passo \"reconhecer o circuito\", no modelo de aplicação clínica, envolve:", ["Identificar qual sistema funcional parece mais envolvido na queixa do paciente", "Aplicar imediatamente um protocolo, sem qualquer leitura prévia", "Ignorar completamente a fala espontânea do paciente", "Memorizar a neuroanatomia completa antes de qualquer atendimento"]],
    ["O objetivo central deste módulo, segundo o material, é:", ["Ter vocabulário funcional suficiente pra psicoeducação clínica, não memorização anatômica", "Memorizar detalhadamente toda a neuroanatomia cerebral", "Substituir a necessidade de qualquer protocolo clínico", "Eliminar completamente a necessidade de avaliação médica em qualquer caso"]],
    ["Padrões presentes desde a infância de forma pervasiva sugerem investigar:", ["Quadro neurodesenvolvimental, como TDAH ou TEA", "Exclusivamente lesão neurológica aguda", "Ausência de qualquer função cerebral", "Nenhuma hipótese adicional precisa ser considerada"]],
    ["A leitura neuroanatômica funcional deste módulo se conecta ao restante do curso:", ["Sendo o fio condutor que sustenta a psicoeducação de cada protocolo do Bloco 4", "Sem qualquer relação com os demais módulos do curso", "Apenas com o Bloco 5, sem relação com o Bloco 4", "Apenas com módulos de farmacologia, sem relação com protocolos clínicos"]],
  ];
  const gabaritoObjetivas = ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a"];

  const children = [
    ...doc.capa(KICKER, "Avaliação — Neuroanatomia Funcional", `Avaliação formativa de encerramento do Módulo ${MOD}.`),
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
    doc.vinhetaBox("Um paciente relata dificuldade crescente de se lembrar de compromissos recentes e de manter o fio de conversas, num período de estresse intenso e prolongado no trabalho, sem qualquer outro sinal neurológico associado."),
    new doc.Paragraph({ spacing: { before: 240 }, children: [new doc.TextRun({ text: "Com base no protocolo estudado, responda:", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    new doc.Paragraph({ spacing: { before: 220, after: 40 }, children: [new doc.TextRun({ text: "a) (10 pts) Que estrutura/sistema funcional parece mais envolvido na queixa desse paciente?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "b) (10 pts) Por que o estresse crônico prolongado pode afetar especificamente essa estrutura?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "c) (10 pts) Que sinais, se presentes, indicariam a necessidade de encaminhamento médico nesse caso?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "d) (10 pts) Escreva uma frase de psicoeducação pra explicar esse mecanismo ao paciente.", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    new doc.Paragraph({ spacing: { after: 40 }, children: [new doc.TextRun({ text: "USO EXCLUSIVO DO INSTRUTOR — remover antes de aplicar a prova", bold: true, color: doc.TERRA, font: doc.FONT, size: 20 })] }),
    doc.tituloH1("Gabarito"),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 1 — Questões objetivas", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 200 }, children: [new doc.TextRun({ text: gabaritoObjetivas.map((r, i) => `${i + 1}-${r}`).join("   ·   "), font: doc.FONT, size: 22, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 2 — Critério de correção da questão de caso", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "a) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Sistema de memória (hipocampo), pela dificuldade de consolidar informações recentes e manter contexto de conversas.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "b) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "O estresse crônico está associado a impacto sobre o hipocampo, prejudicando a consolidação de memória de forma mensurável.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "c) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Início súbito, assimetria de sintomas, sinais motores/sensoriais associados, ou piora progressiva rápida fora do padrão de estresse relatado.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "d) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Ex: \"Seu cérebro está sob tanta sobrecarga agora que a parte responsável por guardar informações novas está funcionando com menos eficiência — isso tende a melhorar conforme reduzirmos essa sobrecarga.\"", font: doc.FONT, size: 21, color: doc.INK })] }),
  );

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-1.1-Avaliacao.docx");
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
      n: 1, titulo: "O mapa cerebral da prática clínica", duracao: "12 min", slides: "1, 2, 3, 4",
      objetivo: "Sair sabendo explicar o circuito PFC-amígdala-hipocampo-ínsula sem jargão técnico.",
      segmentos: [
        seg("0:00–0:45", "Abertura (gancho)", [{ fala: "Você não precisa decorar neuroanatomia — precisa entender o suficiente pra explicar ao paciente, em duas frases, por que ele reage do jeito que reage." }]),
        seg("0:45–2:00", "Por que isso importa", ["Vocabulário funcional, não memorização — a base de toda a psicoeducação do curso."]),
        seg("2:00–8:00", "O circuito mais recorrente (mostrar slide 4)", [
          "Córtex pré-frontal: planejamento, regulação, controle inibitório.",
          "Amígdala: detecção de ameaça e resposta emocional rápida.",
          "Hipocampo: consolidação de memória e contexto temporal.",
          "Ínsula: processamento interoceptivo, consciência do corpo.",
        ]),
        seg("8:00–10:30", "Um ponto importante", ["A amígdala reage antes mesmo do processamento consciente completo — por isso reações parecem automáticas."]),
        seg("10:30–12:00", "Fechamento", [{ fala: "Próxima aula: como esse circuito trabalha em conjunto, do estímulo à resposta regulada." }]),
      ],
    },
    {
      n: 2, titulo: "Da percepção à resposta regulada", duracao: "10 min", slides: "5",
      objetivo: "Explicar a cadeia entre estímulo, resposta límbica e modulação pré-frontal.",
      segmentos: [
        seg("0:00–1:00", "Retomada rápida", ["Vimos as estruturas isoladas. Hoje vemos como elas trabalham em sequência."]),
        seg("1:00–6:30", "A cadeia (mostrar slide 5)", ["Estímulo percebido: informação sensorial processada rapidamente.", "Resposta límbica inicial: amígdala avalia ameaça antes da análise consciente.", "Modulação pré-frontal: reavaliação e regulação da resposta inicial.", "Resposta final integrada: comportamento observável, regulado ou não."]),
        seg("6:30–9:00", "Onde a psicoterapia atua", ["Grande parte da terapia fortalece justamente o terceiro elo — a modulação pré-frontal."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: os 3 sistemas funcionais que organizam a clínica." }]),
      ],
    },
    {
      n: 3, titulo: "Os 3 sistemas funcionais e os sinais clínicos", duracao: "12 min", slides: "6, 7",
      objetivo: "Reconhecer os 3 sistemas funcionais e seus sinais de disfunção na sessão.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três sistemas — e como cada um se manifesta clinicamente quando desregulado."]),
        seg("1:00–6:00", "Os 3 sistemas (mostrar slide 6)", [
          "Sistema executivo: planejamento e controle inibitório (PFC).",
          "Sistema de memória: consolidação e aprendizagem (hipocampo).",
          "Sistema emocional/interoceptivo: detecção de ameaça e consciência corporal (amígdala/ínsula).",
        ]),
        seg("6:00–10:30", "Sinais de disfunção na sessão (mostrar slide 7)", [
          "PFC: impulsividade, dificuldade de planejar.",
          "Amígdala: reatividade emocional desproporcional.",
          "Hipocampo: dificuldade de consolidar memória.",
          "Ínsula: dificuldade de nomear emoções (alexitimia).",
        ]),
        seg("10:30–12:00", "Fechamento", [{ fala: "Próxima aula: quando suspeitar de causa estrutural real." }]),
      ],
    },
    {
      n: 4, titulo: "Quando suspeitar de causa estrutural real", duracao: "10 min", slides: "8",
      objetivo: "Diferenciar sintoma funcional de lesão neurológica real e quadro neurodesenvolvimental.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Um filtro rápido, essencial antes de qualquer intervenção psicológica mais profunda."]),
        seg("1:00–8:00", "Os 3 cenários (mostrar slide 8)", [
          "Sintoma funcional: consistente com história de vida, sem sinais neurológicos — a maioria dos casos.",
          "Lesão neurológica real: início súbito, assimetria, sinais motores/sensoriais.",
          "Quadro neurodesenvolvimental: padrão presente desde a infância, pervasivo.",
        ]),
        seg("8:00–9:00", "Por que isso importa", ["Esse filtro orienta se você segue com trabalho psicológico ou encaminha primeiro."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: como essas funções são avaliadas formalmente." }]),
      ],
    },
    {
      n: 5, titulo: "Como avaliar essas funções formalmente", duracao: "10 min", slides: "9",
      objetivo: "Conectar a leitura funcional aos instrumentos formais do Bloco 2.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Uma prévia do Bloco 2 — os instrumentos que confirmam essa leitura com dado."]),
        seg("1:00–4:30", "Funções executivas", ["Trail Making, Stroop, Torre de Londres — aprofundado no Módulo 2.3."]),
        seg("4:30–7:30", "Memória", ["RAVLT, Figura Complexa de Rey."]),
        seg("7:30–9:00", "Entrevista clínica", ["Exame do estado mental — observação direta na sessão, Módulo 2.1."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: colocamos tudo em prática — da neuroanatomia à aplicação clínica." }]),
      ],
    },
    {
      n: 6, titulo: "Aplicação — reconhecer o circuito e psicoeducação", duracao: "13 min", slides: "10, 11",
      objetivo: "Aplicar os passos 1 e 2 do modelo de aplicação clínica.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["A parte mais prática desse módulo. Hoje, os 2 primeiros passos."]),
        seg("1:00–2:00", "Visão geral (mostrar slide 10)", ["Reconhecer o circuito → Traduzir em psicoeducação → Conectar ao protocolo certo → Monitorar a mudança."]),
        seg("2:00–7:00", "Passo 1 — Reconhecer o circuito (mostrar slide 11, esquerda)", ["Pergunte-se: a queixa parece mais ligada a reatividade emocional, planejamento ou memória?", "A fala espontânea do paciente geralmente aponta o sistema mais envolvido."]),
        seg("7:00–12:00", "Passo 2 — Traduzir em psicoeducação (mostrar slide 11, direita)", [{ fala: "Seu cérebro está reagindo rápido demais antes de pensar — isso não é falta de controle, é um circuito específico funcionando dessa forma agora." }]),
        seg("12:00–13:00", "Fechamento", [{ fala: "Próxima aula: conectar ao protocolo certo e monitorar a mudança." }]),
      ],
    },
    {
      n: 7, titulo: "Aplicação — conectar ao protocolo e monitorar", duracao: "11 min", slides: "12",
      objetivo: "Trabalhar a conexão entre a leitura neuroanatômica e os protocolos do Bloco 4.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Hoje fechamos o modelo com os 2 últimos passos."]),
        seg("1:00–6:00", "Passo 3 — Conectar ao protocolo certo (mostrar slide 12, esquerda)", ["Use a leitura do circuito pra escolher entre os protocolos do Bloco 4.", "Revise o módulo correspondente antes de aplicar a intervenção."]),
        seg("6:00–10:00", "Passo 4 — Monitorar a mudança (mostrar slide 12, direita)", ["Observe sinais concretos de regulação melhorando ao longo das sessões.", "Use isso como parte da psicoeducação contínua."]),
        seg("10:00–11:00", "Fechamento", [{ fala: "Modelo completo. Próxima aula: um caso real e os critérios de quando escalar." }]),
      ],
    },
    {
      n: 8, titulo: "Estudo de caso, encaminhamento e recap", duracao: "14 min", slides: "13, 14, 15",
      objetivo: "Integrar todo o módulo num caso completo, com ênfase nos critérios de encaminhamento médico.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Última aula do módulo. Caso completo e os critérios de quando encaminhar."]),
        seg("1:00–6:00", "Estudo de caso (mostrar slide 13)", ["Leia a vinheta com calma.", "Percorra as 3 perguntas de discussão.", "Convide o aluno a pausar e responder por escrito."]),
        seg("6:00–10:00", "Quando encaminhar (mostrar slide 14)", ["Percorra os 4 critérios — reforce a importância de descartar causa médica quando presente."]),
        seg("10:00–13:00", "Recapitulando o módulo (mostrar slide 15)", ["Retome os 4 pontos-chave.", "Reforce que esse é o fio condutor de todo o curso."]),
        seg("13:00–14:00", "Fechamento do módulo", [{ fala: "Agora é hora dos exercícios e da avaliação. Te vejo no próximo módulo do Bloco 1." }]),
      ],
    },
  ];

  const totalMin = 12 + 10 + 12 + 10 + 10 + 13 + 11 + 14;

  const children = [
    ...doc.capa(KICKER, "Roteiro de Aulas — Neuroanatomia Funcional", "Módulo dividido em 8 vídeo-aulas de 10 a 15 minutos, seguindo os slides já produzidos. Cada aula tem roteiro cronometrado, pronto pra gravação."),
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

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", `${RODAPE_DOC} — Roteiro de Aulas`, children), "Modulo-1.1-Roteiro-Aulas.docx");
}

// ============================================================
Promise.resolve()
  .then(construirDeck)
  .then(construirExercicios)
  .then(construirProva)
  .then(construirRoteiro)
  .then(() => console.log("TUDO PRONTO"))
  .catch((e) => { console.error(e); process.exit(1); });

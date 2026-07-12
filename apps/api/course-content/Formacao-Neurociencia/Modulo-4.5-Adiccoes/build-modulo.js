const deck = require("../_lib/lib-deck.js");
const doc = require("../_lib/lib-doc.js");

const MOD = "4.5";
const NOME = "Adicções";
const RODAPE_DECK = `${NOME} — Módulo ${MOD}`;
const RODAPE_DOC = `Módulo ${MOD} — ${NOME}`;
const KICKER = "MÓDULO 4.5 · PROTOCOLOS CLÍNICOS DIRETOS AO PONTO";

// ============================================================
// 1) SLIDE DECK
// ============================================================
function construirDeck() {
  const pres = deck.novaApresentacao(`${NOME} — Da Neurociência ao Protocolo Clínico`);

  deck.slideTitulo(pres, {
    moduloLabel: `Módulo ${MOD} · Protocolos Clínicos Diretos ao Ponto`,
    titulo: NOME,
    subtitulo: "Química e comportamental — da neurociência ao protocolo clínico",
    passos: ["Mecanismo", "Sinais", "Instrumento", "Protocolo", "Encaminhamento"],
  });

  deck.slideRoteiro(pres, {
    rodape: RODAPE_DECK, pageNum: 2,
    cards: [
      { titulo: "Mecanismo", desc: "O que acontece no sistema de recompensa" },
      { titulo: "Sinais", desc: "O que avisa que o uso virou dependência" },
      { titulo: "Instrumento", desc: "AUDIT, DAST-10 e escalas comportamentais" },
      { titulo: "Protocolo", desc: "4 passos, prontos pra sessão" },
      { titulo: "Encaminhamento", desc: "Quando isso não basta" },
    ],
  });

  deck.slideHook(pres, {
    rodape: RODAPE_DECK, pageNum: 3,
    frase: "Adicção não é falta de caráter. É um sistema de recompensa que aprendeu, com muita eficiência, a repetir o que libera dopamina.",
    apoio: "Isso vale tanto pra substância quanto pra comportamento — telas, jogos, compras. O circuito por trás é essencialmente o mesmo.",
  });

  deck.slideCircuito(pres, {
    rodape: RODAPE_DECK, pageNum: 4,
    titulo: "O sistema de recompensa na adicção",
    regioes: [
      { label: "Núcleo accumbens (\"quero mais\")", rx: 0.24, ry: 0.64, color: deck.TERRA, d: 0.4 },
      { label: "Área tegmental ventral — VTA (origem da dopamina)", rx: 0.58, ry: 0.64, color: deck.NAVY_TINT, d: 0.36 },
      { label: "Córtex pré-frontal (controle de impulso enfraquecido)", rx: 0.18, ry: 0.20, color: deck.NAVY, d: 0.5 },
      { label: "Amígdala (associa gatilhos emocionais ao uso)", rx: 0.60, ry: 0.26, color: deck.TERRA_TINT, d: 0.32 },
    ],
    notas: [
      "A VTA libera dopamina que o núcleo accumbens interpreta como \"recompensa\" — reforçando o comportamento.",
      "Uso repetido enfraquece o córtex pré-frontal, reduzindo a capacidade de conter o impulso.",
      "A amígdala liga emoções e contextos específicos ao uso — por isso certos lugares ou humores viram gatilho.",
    ],
  });

  deck.slideCadeia(pres, {
    rodape: RODAPE_DECK, pageNum: 5,
    titulo: "Do uso ao ciclo de dependência",
    elos: [
      { titulo: "Uso / comportamento", desc: "Substância ou ação dispara dopamina no accumbens" },
      { titulo: "Reforço da via", desc: "O cérebro aprende a repetir o que gera a recompensa" },
      { titulo: "Tolerância", desc: "Precisa de mais estímulo pra sentir o mesmo efeito" },
      { titulo: "Controle enfraquecido", desc: "Córtex pré-frontal perde força pra conter o impulso" },
    ],
    notaFinal: "Esse ciclo explica por que \"força de vontade\" sozinha raramente é suficiente — o circuito já foi reprogramado.",
  });

  deck.slideCategorias(pres, {
    rodape: RODAPE_DECK, pageNum: 6,
    titulo: "3 pilares clássicos de dependência",
    categorias: [
      { titulo: "Compulsão", desc: "Uso apesar de consequências claras e conhecidas", color: deck.TERRA },
      { titulo: "Tolerância", desc: "Precisa de doses ou intensidade crescente pro mesmo efeito", color: deck.NAVY },
      { titulo: "Abstinência", desc: "Sintomas físicos ou psicológicos desconfortáveis ao parar", color: deck.NAVY_TINT },
    ],
    notaFinal: "Os 3 juntos formam o quadro clássico — mas cada um sozinho já merece atenção clínica.",
  });

  deck.slideSinais(pres, {
    rodape: RODAPE_DECK, pageNum: 7,
    titulo: "O que avisa que o uso virou dependência",
    itens: [
      { titulo: "Cognitivo", desc: "Pensamento obsessivo sobre a substância/comportamento, racionalização" },
      { titulo: "Físico", desc: "Tolerância crescente, sintomas de abstinência ao reduzir o uso" },
      { titulo: "Comportamental", desc: "Uso apesar de consequências, tentativas fracassadas de reduzir/parar" },
      { titulo: "Relacional", desc: "Isolamento, mentiras sobre o uso, conflitos familiares recorrentes" },
    ],
  });

  deck.slideDiferencial(pres, {
    rodape: RODAPE_DECK, pageNum: 8,
    titulo: "Diagnóstico diferencial rápido",
    cards: [
      { titulo: "Uso recreativo", desc: "Controlado, social, sem prejuízo funcional identificável" },
      { titulo: "Uso nocivo", desc: "Já traz consequências reais, mas ainda sem dependência plena" },
      { titulo: "Dependência", desc: "Critérios de tolerância, abstinência e perda de controle presentes" },
    ],
  });

  deck.slideInstrumentos(pres, {
    rodape: RODAPE_DECK, pageNum: 9,
    titulo: "Três escalas, três focos",
    instrumentos: [
      { sigla: "AUDIT", nome: "Alcohol Use Disorders Identification Test", desc: "Rastreio de uso de álcool — 10 itens, indica faixa de risco." },
      { sigla: "DAST-10", nome: "Drug Abuse Screening Test", desc: "Rastreio de uso de drogas (exceto álcool) — 10 itens, rápido." },
      { sigla: "EUPT", nome: "Escala de Uso Problemático de Telas/Jogos", desc: "Avalia adicção comportamental — tempo, perda de controle, prejuízo funcional." },
    ],
  });

  deck.slideProtocoloOverview(pres, {
    rodape: RODAPE_DECK, pageNum: 10,
    titulo: "Do mecanismo à intervenção: 4 passos",
    passos: [
      { titulo: "Psicoeducação\ndo mecanismo", desc: "Nomear o sistema de recompensa, reforçar que não é falta de caráter" },
      { titulo: "Entrevista\nmotivacional", desc: "Explorar ambivalência, avaliar estágio de mudança" },
      { titulo: "Manejo de\ngatilhos", desc: "Identificar gatilhos e montar estratégias de enfrentamento" },
      { titulo: "Rede de apoio\ne monitoramento", desc: "Envolvimento social e acompanhamento contínuo" },
    ],
    notaFinal: "Nas próximas 2 telas, cada passo ganha um exemplo pronto pra levar pra sessão.",
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 11,
    titulo: "Passos 1 e 2, na prática",
    colunas: [
      {
        numero: 1, titulo: "Psicoeducação do mecanismo",
        fala: "“Seu cérebro aprendeu, com muita eficiência, a repetir o que libera dopamina. Isso não é falta de caráter — é um circuito que pode ser retreinado.”",
        bullets: ["Reduz a vergonha que costuma travar o pedido de ajuda", "Prepara terreno pra entrevista motivacional"],
      },
      {
        numero: 2, titulo: "Entrevista motivacional",
        bullets: ["Pergunte: \"numa escala de 0 a 10, o quanto você quer mudar isso hoje?\"", "Explore a ambivalência sem julgamento — \"o que o uso te dá, e o que ele te custa?\"", "Respeite o estágio de mudança do paciente, não empurre abstinência imediata"],
      },
    ],
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 12,
    titulo: "Passos 3 e 4, na prática",
    colunas: [
      {
        numero: 3, titulo: "Manejo de gatilhos",
        tabela: { header: ["Gatilho", "Estratégia de enfrentamento"], linhas: [["Estresse no trabalho", "Pausa de 5 min + respiração antes de decidir"], ["Encontro social específico", "Plano de saída combinado com antecedência"]] },
        notaTabela: "Cada paciente tem gatilhos próprios — mapear é tão importante quanto a estratégia em si.",
      },
      {
        numero: 4, titulo: "Rede de apoio e monitoramento",
        bullets: ["Envolver família/rede de apoio quando o paciente autorizar", "Considerar grupos de apoio como complemento à terapia individual", "Monitoramento contínuo — recaída faz parte do processo, não é fracasso"],
      },
    ],
  });

  deck.slideCaso(pres, {
    rodape: RODAPE_DECK, pageNum: 13,
    vinheta: "Rodrigo, 38 anos, procura terapia após a esposa ameaçar se separar por causa do consumo de álcool. Bebe diariamente há 3 anos, já tentou parar sozinho \"várias vezes\" sem sucesso, e diz que precisa de cada vez mais doses pra \"sentir o efeito de antes\". Nega qualquer sintoma físico grave ao tentar parar. AUDIT = 22.",
    perguntas: [
      "Que pilares de dependência aparecem na vinheta?",
      "Interprete o AUDIT = 22.",
      "Que estágio de mudança Rodrigo provavelmente está, dado que já tentou parar sozinho várias vezes?",
    ],
  });

  deck.slideEncaminhamento(pres, {
    rodape: RODAPE_DECK, pageNum: 14,
    criterios: [
      "Síndrome de abstinência grave, com risco de complicação médica (ex: convulsão em abstinência de álcool)",
      "Necessidade de desintoxicação médica supervisionada antes de qualquer cessação abrupta",
      "Comorbidade psiquiátrica grave associada ao uso",
      "Risco de vida — overdose, uso combinado de substâncias de alto risco",
    ],
  });

  deck.slideRecap(pres, {
    rodape: RODAPE_DECK, pageNum: 15,
    pontos: [
      "Adicção é sistema de recompensa reprogramado — não é falta de caráter",
      "Compulsão, tolerância e abstinência são os 3 pilares clássicos de dependência",
      "AUDIT, DAST-10 e escalas comportamentais cobrem os principais contextos de uso",
      "O protocolo de 4 passos vai de psicoeducação a rede de apoio e monitoramento contínuo",
    ],
    proximoTexto: "Próximo: exercícios práticos e avaliação do Módulo 4.5 →",
  });

  return pres.writeFile({ fileName: "Modulo-4.5-Adiccoes.pptx" });
}

// ============================================================
// 2) EXERCÍCIOS
// ============================================================
function construirExercicios() {
  const children = [
    ...doc.capa(KICKER, `Exercícios — ${NOME}`, "Resolva individualmente antes da sessão de supervisão. O objetivo é testar sua leitura do mecanismo e do protocolo antes de comparar com a discussão em grupo — não há problema em errar."),

    doc.exNum(1, "O mecanismo, em suas palavras"),
    doc.pergunta(1, "Explique em até 3 frases, sem jargão técnico, por que \"força de vontade\" sozinha raramente resolve uma dependência."),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Cite os 3 pilares clássicos de dependência e dê um exemplo de fala de paciente pra cada um."),
    ...doc.linhaResposta(2),

    doc.exNum(2, "Leitura de escala"),
    doc.vinhetaBox("Paciente pontua 9 no DAST-10."),
    doc.pergunta(1, "Essa pontuação indica risco baixo, moderado ou alto de dependência?"),
    ...doc.linhaResposta(1),
    doc.pergunta(2, "Isso muda a urgência do encaminhamento? Por quê?"),
    ...doc.linhaResposta(1),

    doc.exNum(3, "Diagnóstico diferencial"),
    doc.vinhetaBox("Larissa joga videogame 3-4h por dia nos fins de semana, mas mantém desempenho no trabalho e nos relacionamentos, e consegue ficar sem jogar durante a semana sem desconforto."),
    doc.pergunta(1, "Uso recreativo, uso nocivo ou dependência? Justifique com elementos da vinheta."),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Que instrumento você aplicaria, se algum, nesse momento?"),
    ...doc.linhaResposta(1),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),

    doc.exNum(4, "Manejo de gatilhos"),
    doc.p("Para o caso de Rodrigo (vinheta da aula), liste 3 gatilhos prováveis pro consumo de álcool e uma estratégia de enfrentamento pra cada um."),
    doc.tabelaSimples(["Nº", "Gatilho provável", "Estratégia de enfrentamento"], [["1", "", ""], ["2", "", ""], ["3", "", ""]], [700, 4200, 4450]),

    doc.exNum(5, "Caso integrado — Rodrigo"),
    doc.vinhetaBox("Rodrigo, 38 anos, bebe diariamente há 3 anos, já tentou parar sozinho várias vezes sem sucesso, precisa de cada vez mais doses pra sentir o efeito de antes. Nega sintomas físicos graves ao tentar parar. AUDIT = 22."),
    doc.pergunta(1, "Escreva a frase de psicoeducação que você usaria com Rodrigo."),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Escreva uma pergunta de entrevista motivacional adequada pro estágio de mudança de Rodrigo."),
    ...doc.linhaResposta(2),
    doc.pergunta(3, "Em que ponto você consideraria encaminhar Rodrigo pra desintoxicação médica supervisionada?"),
    ...doc.linhaResposta(2),
  ];

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-4.5-Exercicios.docx");
}

// ============================================================
// 3) AVALIAÇÃO
// ============================================================
function construirProva() {
  const objetivas = [
    ["Qual estrutura é o centro do \"quero mais\" no sistema de recompensa?", ["Núcleo accumbens", "Cerebelo", "Córtex occipital", "Tálamo"]],
    ["A área tegmental ventral (VTA) é:", ["Origem da dopamina que reforça o comportamento de uso", "Responsável pela visão", "Parte do sistema auditivo", "Uma estrutura sem relação com adicção"]],
    ["O uso crônico de substâncias tende a:", ["Fortalecer o córtex pré-frontal", "Enfraquecer o controle de impulso do córtex pré-frontal", "Não afetar nenhuma estrutura cerebral", "Aumentar apenas a memória de longo prazo"]],
    ["Os 3 pilares clássicos de dependência são:", ["Luta, fuga, paralisia", "Compulsão, tolerância, abstinência", "Ansiedade, depressão, estresse", "Anedonia, retardo, ruminação"]],
    ["Instrumento de rastreio pra uso de álcool:", ["AUDIT", "Y-BOCS", "MBI", "DAS"]],
    ["O DAST-10 é usado pra rastrear:", ["Uso de álcool exclusivamente", "Uso de drogas (exceto álcool)", "Burnout", "Ansiedade generalizada"]],
    ["É sinal comportamental de alerta em adicção:", ["Uso controlado e ocasional", "Tentativas fracassadas repetidas de reduzir/parar o uso", "Ausência total de qualquer consequência", "Melhora em todas as áreas da vida"]],
    ["A entrevista motivacional (passo 2) tem como foco:", ["Confrontar o paciente diretamente sobre seus erros", "Explorar a ambivalência do paciente sobre mudar, respeitando o estágio dele", "Impor a abstinência imediata sempre", "Ignorar a motivação do paciente"]],
    ["É critério de encaminhamento:", ["O paciente usar substância uma vez por mês", "Síndrome de abstinência grave que exige desintoxicação médica", "O paciente ter menos de 30 anos", "Uso recreativo controlado"]],
    ["Por que a rede de apoio (passo 4) é parte do protocolo?", ["Não tem relação real com o tratamento", "Envolvimento familiar/social melhora a sustentação da mudança a longo prazo", "Serve só pra fiscalizar o paciente", "É opcional e raramente ajuda"]],
  ];
  const gabaritoObjetivas = ["a", "a", "b", "b", "a", "b", "b", "b", "b", "b"];

  const children = [
    ...doc.capa(KICKER, `Avaliação — ${NOME}`, `Avaliação formativa de encerramento do Módulo ${MOD}.`),
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
    doc.vinhetaBox("Fernanda, 26 anos, procura terapia relatando que passa mais de 8h por dia em redes sociais e jogos no celular, perdeu 2 empregos por atraso e queda de desempenho, e diz sentir \"ansiedade insuportável\" quando fica sem o celular por mais de 1 hora. Já tentou reduzir o uso, mas volta ao padrão em poucos dias. EUPT indica uso de alto risco."),
    new doc.Paragraph({ spacing: { before: 240 }, children: [new doc.TextRun({ text: "Com base no protocolo estudado, responda:", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    new doc.Paragraph({ spacing: { before: 220, after: 40 }, children: [new doc.TextRun({ text: "a) (10 pts) Que pilares de dependência aparecem na vinheta de Fernanda?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "b) (10 pts) Isso se qualifica como adicção comportamental? Justifique com base no mecanismo estudado.", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "c) (10 pts) Descreva a frase de psicoeducação que você usaria com Fernanda.", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "d) (10 pts) Sugira uma estratégia de manejo de gatilho (passo 3) adequada pro caso de Fernanda.", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    new doc.Paragraph({ spacing: { after: 40 }, children: [new doc.TextRun({ text: "USO EXCLUSIVO DO INSTRUTOR — remover antes de aplicar a prova", bold: true, color: doc.TERRA, font: doc.FONT, size: 20 })] }),
    doc.tituloH1("Gabarito"),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 1 — Questões objetivas", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 200 }, children: [new doc.TextRun({ text: gabaritoObjetivas.map((r, i) => `${i + 1}-${r}`).join("   ·   "), font: doc.FONT, size: 22, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 2 — Critério de correção da questão de caso", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "a) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Compulsão (uso apesar de perder empregos) e abstinência (ansiedade intensa sem o celular).", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "b) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Sim — o mesmo circuito de recompensa dopaminérgica se aplica a comportamentos, não só substâncias; os critérios de compulsão e abstinência estão presentes.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "c) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Espera-se nomear que o cérebro aprendeu a repetir o que libera dopamina, e que isso vale tanto pra celular quanto pra substância — não é falta de caráter.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "d) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Ex: identificar o horário/contexto de maior uso e substituir por uma atividade incompatível (ex: deixar o celular fora do quarto à noite, atividade física em horário de pico de uso).", font: doc.FONT, size: 21, color: doc.INK })] }),
  );

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-4.5-Avaliacao.docx");
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
      n: 1, titulo: "Um circuito que aprendeu a repetir", duracao: "12 min", slides: "1, 2, 3, 4",
      objetivo: "Sair sabendo explicar o mecanismo da adicção sem jargão, reduzindo a vergonha que trava o pedido de ajuda.",
      segmentos: [
        seg("0:00–0:45", "Abertura (gancho)", [{ fala: "Adicção não é falta de caráter. É um sistema de recompensa que aprendeu, com muita eficiência, a repetir o que libera dopamina." }]),
        seg("0:45–2:00", "Por que isso importa clinicamente", ["Reduz a vergonha que trava o pedido de ajuda.", "Isso é o Passo 1 da anatomia de todo protocolo do curso: Mecanismo."]),
        seg("2:00–8:00", "O sistema de recompensa (mostrar slide 4)", [
          "Núcleo accumbens: centro do \"quero mais\".",
          "VTA libera a dopamina que reforça o comportamento.",
          "Córtex pré-frontal fica enfraquecido no controle de impulso com o uso repetido.",
          "Amígdala liga emoções e contextos específicos ao uso — a base dos gatilhos.",
        ]),
        seg("8:00–10:30", "Como levar isso pra sessão", [{ fala: "Seu cérebro aprendeu, com muita eficiência, a repetir o que libera dopamina. Isso não é falta de caráter." }]),
        seg("10:30–12:00", "Fechamento", [{ fala: "Próxima aula: a cadeia completa, do uso ao ciclo de dependência." }]),
      ],
    },
    {
      n: 2, titulo: "Do uso ao ciclo de dependência", duracao: "10 min", slides: "5",
      objetivo: "Explicar a cadeia uso–reforço–tolerância–controle enfraquecido.",
      segmentos: [
        seg("0:00–1:00", "Retomada rápida", ["Vimos as estruturas envolvidas. Hoje vemos como o ciclo se forma."]),
        seg("1:00–6:30", "A cadeia (mostrar slide 5)", ["Uso dispara dopamina no accumbens.", "O cérebro aprende a repetir o que gera a recompensa.", "Tolerância exige mais estímulo pro mesmo efeito.", "Córtex pré-frontal perde força pra conter o impulso."]),
        seg("6:30–9:00", "Por que \"força de vontade\" não basta sozinha", ["O circuito já foi reprogramado — psicoeducação prepara o paciente pra entender isso sem se culpar."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: os 3 pilares clássicos de dependência." }]),
      ],
    },
    {
      n: 3, titulo: "Os 3 pilares de dependência", duracao: "10 min", slides: "6",
      objetivo: "Reconhecer compulsão, tolerância e abstinência como os 3 pilares clássicos.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três pilares — cada um sozinho já merece atenção clínica."]),
        seg("1:00–7:00", "Compulsão, tolerância, abstinência (mostrar slide 6)", [
          "Compulsão: uso apesar de consequências claras.",
          "Tolerância: precisa de mais pro mesmo efeito.",
          "Abstinência: sintomas desconfortáveis ao parar.",
        ]),
        seg("7:00–9:00", "Aplicação prática", ["Pergunte sobre cada pilar separadamente na entrevista — pacientes muitas vezes minimizam um e admitem outro."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: os sinais que avisam que o uso virou dependência." }]),
      ],
    },
    {
      n: 4, titulo: "Sinais de alerta", duracao: "10 min", slides: "7",
      objetivo: "Reconhecer sinais precoces de que o uso está evoluindo pra dependência.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Reconhecer cedo abre espaço pra intervenção antes do quadro se agravar."]),
        seg("1:00–7:30", "As 4 categorias (mostrar slide 7)", [
          "Cognitivo: pensamento obsessivo, racionalização.",
          "Físico: tolerância crescente, sintomas de abstinência.",
          "Comportamental: uso apesar de consequências, tentativas fracassadas de parar.",
          "Relacional: isolamento, mentiras sobre o uso.",
        ]),
        seg("7:30–9:00", "Diferença de sinal e dependência instalada", ["Sinal de alerta é a janela de intervenção precoce."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: como diferenciar uso recreativo, nocivo e dependência." }]),
      ],
    },
    {
      n: 5, titulo: "Diagnóstico diferencial rápido", duracao: "12 min", slides: "8",
      objetivo: "Diferenciar uso recreativo, uso nocivo e dependência na entrevista inicial.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Um filtro rápido pra guiar a primeira sessão."]),
        seg("1:00–8:00", "Os 3 níveis (mostrar slide 8)", [
          "Uso recreativo: controlado, sem prejuízo funcional.",
          "Uso nocivo: já traz consequências, mas sem dependência plena.",
          "Dependência: tolerância, abstinência e perda de controle presentes.",
        ]),
        seg("8:00–10:30", "Erro comum", ["Confundir uso recreativo controlado com dependência — nem todo uso é patológico, e rotular incorretamente prejudica o vínculo terapêutico."]),
        seg("10:30–12:00", "Fechamento", [{ fala: "Próxima aula: os instrumentos que confirmam essa leitura com dado." }]),
      ],
    },
    {
      n: 6, titulo: "Os 3 instrumentos de avaliação", duracao: "12 min", slides: "9",
      objetivo: "Saber quando usar AUDIT, DAST-10 e escalas de uso comportamental.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três escalas, três focos de avaliação."]),
        seg("1:00–4:30", "AUDIT", ["10 itens, rastreio de uso de álcool.", "Indica faixa de risco — do uso de baixo risco à provável dependência."]),
        seg("4:30–7:30", "DAST-10", ["Rastreio de uso de drogas, exceto álcool.", "Rápido de aplicar, boa triagem inicial."]),
        seg("7:30–10:00", "Escalas comportamentais", ["Avaliam tempo de uso, perda de controle e prejuízo funcional em telas/jogos."]),
        seg("10:00–12:00", "Como escolher na prática", ["AUDIT ou DAST-10 conforme a substância relatada; escala comportamental quando o uso é de tela/jogo/compras.", { fala: "Próxima aula: colocamos tudo em prática — psicoeducação e entrevista motivacional." }]),
      ],
    },
    {
      n: 7, titulo: "Protocolo — psicoeducação e entrevista motivacional", duracao: "14 min", slides: "10, 11",
      objetivo: "Aplicar os passos 1 e 2 do protocolo com script de psicoeducação e perguntas de entrevista motivacional.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["A parte que você vai usar amanhã. Hoje, os 2 primeiros passos."]),
        seg("1:00–2:00", "Visão geral (mostrar slide 10)", ["Psicoeducação → Entrevista motivacional → Manejo de gatilhos → Rede de apoio."]),
        seg("2:00–7:00", "Passo 1 — Psicoeducação (mostrar slide 11, esquerda)", [{ fala: "Seu cérebro aprendeu, com muita eficiência, a repetir o que libera dopamina. Isso não é falta de caráter." }]),
        seg("7:00–13:00", "Passo 2 — Entrevista motivacional (mostrar slide 11, direita)", ["Pergunte numa escala de 0 a 10 o quanto o paciente quer mudar hoje.", "Explore ambivalência sem julgamento — o que o uso dá, e o que custa."]),
        seg("13:00–14:00", "Fechamento", [{ fala: "Próxima aula: manejo de gatilhos e rede de apoio." }]),
      ],
    },
    {
      n: 8, titulo: "Protocolo — manejo de gatilhos e rede de apoio", duracao: "14 min", slides: "12",
      objetivo: "Mapear gatilhos e montar uma rede de apoio e monitoramento contínuo.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Hoje fechamos o protocolo com a parte mais prática."]),
        seg("1:00–7:00", "Passo 3 — Manejo de gatilhos (mostrar slide 12, esquerda)", ["Percorra os exemplos da tabela.", "Cada paciente tem gatilhos próprios — mapear é tão importante quanto a estratégia em si."]),
        seg("7:00–13:00", "Passo 4 — Rede de apoio (mostrar slide 12, direita)", ["Envolver família/rede quando autorizado.", "Grupos de apoio como complemento.", "Recaída faz parte do processo — não é fracasso."]),
        seg("13:00–14:00", "Fechamento", [{ fala: "Protocolo completo. Próxima aula: um caso real e os critérios de quando encaminhar." }]),
      ],
    },
    {
      n: 9, titulo: "Estudo de caso, encaminhamento e recap", duracao: "15 min", slides: "13, 14, 15",
      objetivo: "Integrar mecanismo, instrumento e protocolo num caso completo, com ênfase em segurança médica.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Última aula do módulo. Caso completo e os limites da terapia sozinha."]),
        seg("1:00–7:00", "Estudo de caso — Rodrigo (mostrar slide 13)", ["Leia a vinheta com calma.", "Percorra as 3 perguntas de discussão.", "Convide o aluno a pausar e responder por escrito."]),
        seg("7:00–11:00", "Quando encaminhar (mostrar slide 14)", ["Percorra os 4 critérios — ênfase em risco de abstinência grave."]),
        seg("11:00–14:00", "Recapitulando o módulo (mostrar slide 15)", ["Retome os 4 pontos-chave.", "Reforce a anatomia de 5 passos, comum a todo protocolo do curso."]),
        seg("14:00–15:00", "Fechamento do módulo", [{ fala: "Agora é hora dos exercícios e da avaliação. Te vejo no próximo protocolo." }]),
      ],
    },
  ];

  const totalMin = 12 + 10 + 10 + 10 + 12 + 12 + 14 + 14 + 15;

  const children = [
    ...doc.capa(KICKER, `Roteiro de Aulas — ${NOME}`, "Módulo dividido em 9 vídeo-aulas de 10 a 15 minutos, seguindo os slides já produzidos. Cada aula tem roteiro cronometrado, pronto pra gravação."),
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

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", `${RODAPE_DOC} — Roteiro de Aulas`, children), "Modulo-4.5-Roteiro-Aulas.docx");
}

// ============================================================
Promise.resolve()
  .then(construirDeck)
  .then(construirExercicios)
  .then(construirProva)
  .then(construirRoteiro)
  .then(() => console.log("TUDO PRONTO"))
  .catch((e) => { console.error(e); process.exit(1); });

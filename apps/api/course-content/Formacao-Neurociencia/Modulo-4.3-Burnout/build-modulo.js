const deck = require("../_lib/lib-deck.js");
const doc = require("../_lib/lib-doc.js");

const MOD = "4.3";
const NOME = "Burnout";
const RODAPE_DECK = `${NOME} — Módulo ${MOD}`;
const RODAPE_DOC = `Módulo ${MOD} — ${NOME}`;
const KICKER = "MÓDULO 4.3 · PROTOCOLOS CLÍNICOS DIRETOS AO PONTO";

// ============================================================
// 1) SLIDE DECK
// ============================================================
function construirDeck() {
  const pres = deck.novaApresentacao(`${NOME} — Da Neurociência ao Protocolo Clínico`);

  deck.slideTitulo(pres, {
    moduloLabel: `Módulo ${MOD} · Protocolos Clínicos Diretos ao Ponto`,
    titulo: NOME,
    subtitulo: "Da neurociência ao protocolo clínico",
    passos: ["Mecanismo", "Sinais", "Instrumento", "Protocolo", "Encaminhamento"],
  });

  deck.slideRoteiro(pres, {
    rodape: RODAPE_DECK, pageNum: 2,
    cards: [
      { titulo: "Mecanismo", desc: "O que acontece no eixo do estresse no burnout" },
      { titulo: "Sinais", desc: "O que a mente avisa antes do esgotamento total" },
      { titulo: "Instrumento", desc: "MBI, CBI e OLBI na prática" },
      { titulo: "Protocolo", desc: "4 passos, prontos pra sessão" },
      { titulo: "Encaminhamento", desc: "Quando isso não basta" },
    ],
  });

  deck.slideHook(pres, {
    rodape: RODAPE_DECK, pageNum: 3,
    frase: "Burnout não é preguiça disfarçada de cansaço. É um sistema de resposta ao estresse que trabalhou tanto que parou de responder direito.",
    apoio: "Diferente do estresse agudo, o eixo HPA no burnout não fica só \"ligado\" — ele se desregula. Entender essa diferença muda como você conduz a psicoeducação.",
  });

  deck.slideCadeia(pres, {
    rodape: RODAPE_DECK, pageNum: 4,
    titulo: "Do estresse crônico ao esgotamento",
    elos: [
      { titulo: "Sobrecarga crônica", desc: "Demanda constante, sem recuperação suficiente" },
      { titulo: "Eixo HPA hiperativado", desc: "Cortisol elevado de forma persistente" },
      { titulo: "Exaustão do eixo", desc: "A resposta de cortisol começa a ficar achatada e desregulada" },
      { titulo: "Esgotamento de recursos", desc: "O corpo não sustenta mais a resposta — exaustão instalada" },
    ],
    notaFinal: "Isso explica por que \"só descansar no fim de semana\" não resolve — o eixo precisa de tempo real pra se reequilibrar, não de uma pausa pontual.",
  });

  deck.slideCategorias(pres, {
    rodape: RODAPE_DECK, pageNum: 5,
    titulo: "As 3 dimensões do burnout (Maslach)",
    categorias: [
      { titulo: "Exaustão emocional", desc: "Sensação de estar \"sem gasolina\", esgotado além do cansaço normal", color: deck.TERRA },
      { titulo: "Despersonalização", desc: "Cinismo e distanciamento emocional de colegas, clientes ou pacientes", color: deck.NAVY },
      { titulo: "Baixa realização", desc: "Sensação de não entregar valor, mesmo trabalhando mais", color: deck.NAVY_TINT },
    ],
    notaFinal: "As 3 dimensões nem sempre aparecem com a mesma intensidade — o MBI (aula 6) mede cada uma separadamente.",
  });

  deck.slideSinais(pres, {
    rodape: RODAPE_DECK, pageNum: 6,
    titulo: "O que a mente avisa antes do esgotamento total",
    itens: [
      { titulo: "Cognitivo", desc: "Dificuldade de concentração, embotamento, esquecimentos frequentes" },
      { titulo: "Físico", desc: "Fadiga crônica, distúrbios de sono, dores somáticas recorrentes" },
      { titulo: "Comportamental", desc: "Queda de produtividade, presenteísmo (presente mas improdutivo)" },
      { titulo: "Relacional", desc: "Cinismo com colegas, irritabilidade, isolamento da equipe" },
    ],
  });

  deck.slideDiferencial(pres, {
    rodape: RODAPE_DECK, pageNum: 7,
    titulo: "Diagnóstico diferencial rápido",
    cards: [
      { titulo: "Burnout x Depressão", desc: "Burnout costuma ficar circunscrito ao contexto ocupacional; depressão é mais global e afeta todas as áreas da vida" },
      { titulo: "Burnout x Transtorno de Ajustamento", desc: "Ajustamento é reação mais aguda e recente; burnout é processo crônico de exaustão acumulada" },
      { titulo: "Burnout x cansaço normal", desc: "Intensidade e persistência mesmo após descanso, com impacto funcional real" },
    ],
  });

  deck.slideInstrumentos(pres, {
    rodape: RODAPE_DECK, pageNum: 8,
    titulo: "Três escalas, três abordagens",
    instrumentos: [
      { sigla: "MBI", nome: "Maslach Burnout Inventory", desc: "Padrão-ouro. Mede as 3 dimensões separadamente: exaustão, despersonalização, realização." },
      { sigla: "CBI", nome: "Copenhagen Burnout Inventory", desc: "Diferencia burnout pessoal, relacionado ao trabalho e ao cliente/paciente." },
      { sigla: "OLBI", nome: "Oldenburg Burnout Inventory", desc: "Foco em exaustão e desengajamento, inclui itens físicos e cognitivos." },
    ],
  });

  deck.slideProtocoloOverview(pres, {
    rodape: RODAPE_DECK, pageNum: 9,
    titulo: "Do mecanismo à intervenção: 4 passos",
    passos: [
      { titulo: "Psicoeducação\ndo mecanismo", desc: "Nomear a exaustão do eixo HPA, diferenciar de fraqueza" },
      { titulo: "Diferenciação\nburnout x depressão", desc: "Avaliar extensão: só trabalho ou generalizado" },
      { titulo: "Manejo de\nestressores", desc: "Limites, pausas estruturadas e recursos de recuperação" },
      { titulo: "Prevenção de\nrecaída", desc: "Plano de retorno gradual e sinais de alerta" },
    ],
    notaFinal: "Nas próximas 2 telas, cada passo ganha um exemplo pronto pra levar pra sessão.",
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 10,
    titulo: "Passos 1 e 2, na prática",
    colunas: [
      {
        numero: 1, titulo: "Psicoeducação do mecanismo",
        fala: "“O que você sente não é fraqueza — seu sistema de resposta ao estresse trabalhou tanto que parou de responder direito. Isso tem tratamento.”",
        bullets: ["Nomear o mecanismo reduz a culpa por \"não aguentar mais\"", "Diferencia claramente de preguiça ou falta de comprometimento"],
      },
      {
        numero: 2, titulo: "Diferenciação burnout x depressão",
        bullets: ["Pergunte: \"fora do trabalho, você ainda consegue sentir prazer em algo?\"", "Sintomas restritos ao trabalho → mais característico de burnout", "Sintomas presentes em todas as áreas → investigar depressão associada"],
      },
    ],
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 11,
    titulo: "Passos 3 e 4, na prática",
    colunas: [
      {
        numero: 3, titulo: "Manejo de estressores e recursos",
        bullets: ["Negociar redução de carga ou realocação de tarefas quando possível", "Estabelecer limites claros de disponibilidade fora do expediente", "Incluir pausas estruturadas na rotina — não é luxo, é parte do tratamento"],
      },
      {
        numero: 4, titulo: "Prevenção de recaída",
        bullets: ["Mapear os estressores que mais pesam pro paciente especificamente", "Montar um plano de retorno gradual se houver afastamento", "Revisar o plano periodicamente, mesmo após melhora"],
      },
    ],
  });

  deck.slideCaso(pres, {
    rodape: RODAPE_DECK, pageNum: 12,
    vinheta: "Juliana, 33 anos, gerente, relata exaustão extrema há 6 meses, se sente \"sem gasolina\" pro trabalho, ironiza e se distancia da equipe que antes gostava de liderar, sente que \"não entrega nada de valor\" apesar de trabalhar 12h por dia. Nos fins de semana, ainda consegue curtir tempo com a família e retomar um hobby de pintura. MBI indica exaustão emocional alta e despersonalização alta.",
    perguntas: [
      "Burnout ou depressão? Que elemento da vinheta mais sustenta essa leitura?",
      "Quais as 3 dimensões do MBI, e qual(is) aparece(m) elevada(s) no caso de Juliana?",
      "Sugira uma intervenção do passo 3 (manejo de estressores) adequada pro caso.",
    ],
  });

  deck.slideEncaminhamento(pres, {
    rodape: RODAPE_DECK, pageNum: 13,
    criterios: [
      "Comorbidade com depressão maior — sintomas deixam de ficar circunscritos ao trabalho",
      "Exaustão comprometendo capacidade funcional básica (autocuidado, sono, alimentação)",
      "Necessidade de afastamento — avaliação médica em conjunto",
      "Sintomas físicos persistentes que pedem investigação médica antes de fechar o quadro como burnout",
    ],
  });

  deck.slideRecap(pres, {
    rodape: RODAPE_DECK, pageNum: 14,
    pontos: [
      "Burnout é exaustão do eixo HPA por sobrecarga crônica — não é fraqueza",
      "As 3 dimensões de Maslach: exaustão emocional, despersonalização, baixa realização",
      "MBI, CBI e OLBI servem a abordagens diferentes de avaliação",
      "O protocolo de 4 passos vai de psicoeducação a prevenção de recaída, com foco em estressores reais",
    ],
    proximoTexto: "Próximo: exercícios práticos e avaliação do Módulo 4.3 →",
  });

  return pres.writeFile({ fileName: "Modulo-4.3-Burnout.pptx" });
}

// ============================================================
// 2) EXERCÍCIOS
// ============================================================
function construirExercicios() {
  const children = [
    ...doc.capa(KICKER, `Exercícios — ${NOME}`, "Resolva individualmente antes da sessão de supervisão. O objetivo é testar sua leitura do mecanismo e do protocolo antes de comparar com a discussão em grupo — não há problema em errar."),

    doc.exNum(1, "O mecanismo, em suas palavras"),
    doc.pergunta(1, "Explique em até 3 frases, sem jargão técnico, por que \"descansar no fim de semana\" não costuma resolver o burnout."),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Cite as 3 dimensões do MBI e dê um exemplo de fala de paciente pra cada uma."),
    ...doc.linhaResposta(2),

    doc.exNum(2, "Leitura de escala"),
    doc.vinhetaBox("Paciente pontua alto em exaustão emocional e despersonalização no MBI, mas baixo em redução de realização profissional."),
    doc.pergunta(1, "O que esse padrão sugere sobre a experiência desse paciente no trabalho?"),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Isso muda a prioridade do protocolo? Como?"),
    ...doc.linhaResposta(1),

    doc.exNum(3, "Diagnóstico diferencial"),
    doc.vinhetaBox("Ricardo, 40 anos, relata estar exausto e cínico com o trabalho há 8 meses. Também perdeu o interesse em atividades que gostava fora do trabalho, e diz que \"nada mais faz sentido\", inclusive na vida pessoal."),
    doc.pergunta(1, "Burnout puro ou burnout com depressão associada? Justifique com elementos da vinheta."),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Que instrumento(s) você aplicaria, e por quê?"),
    ...doc.linhaResposta(1),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),

    doc.exNum(4, "Manejo de estressores"),
    doc.p("Para o caso de Ricardo (exercício 3), liste 3 estressores organizacionais prováveis e uma ação de manejo pra cada um."),
    doc.tabelaSimples(["Nº", "Estressor provável", "Ação de manejo sugerida"], [["1", "", ""], ["2", "", ""], ["3", "", ""]], [700, 4200, 4450]),

    doc.exNum(5, "Caso integrado — Juliana"),
    doc.vinhetaBox("Juliana, 33 anos, gerente, relata exaustão extrema há 6 meses, se sente \"sem gasolina\" pro trabalho, ironiza e se distancia da equipe. Nos fins de semana, ainda consegue curtir tempo com a família e retomar um hobby de pintura. MBI indica exaustão emocional alta e despersonalização alta."),
    doc.pergunta(1, "Escreva a frase de psicoeducação que você usaria com Juliana."),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Sugira 2 ações concretas do passo 3 (manejo de estressores) pro caso dela."),
    ...doc.linhaResposta(2),
    doc.pergunta(3, "Em que ponto você consideraria sugerir afastamento do trabalho pra Juliana?"),
    ...doc.linhaResposta(2),
  ];

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-4.3-Exercicios.docx");
}

// ============================================================
// 3) AVALIAÇÃO
// ============================================================
function construirProva() {
  const objetivas = [
    ["O que caracteriza a resposta do eixo HPA no burnout crônico, diferente do estresse agudo?", ["Cortisol permanece sempre elevado", "O eixo se esgota e a resposta de cortisol fica achatada/desregulada", "O eixo nunca é ativado", "Não há relação com o eixo HPA"]],
    ["As 3 dimensões clássicas do burnout (Maslach) são:", ["Ansiedade, depressão, estresse", "Exaustão emocional, despersonalização, redução da realização profissional", "Luta, fuga, paralisia", "Insônia, fadiga, dor"]],
    ["O que diferencia burnout de depressão?", ["Burnout é circunscrito ao contexto ocupacional, depressão é mais global", "Burnout nunca tem sintomas físicos", "Depressão nunca afeta o trabalho", "São exatamente a mesma condição"]],
    ["Instrumento considerado padrão-ouro pra avaliar burnout:", ["BDI-II", "MBI (Maslach Burnout Inventory)", "GAD-7", "Y-BOCS"]],
    ["Despersonalização no burnout se manifesta como:", ["Alucinações", "Cinismo e distanciamento emocional de colegas/clientes", "Perda de identidade completa", "Amnésia"]],
    ["É sinal de alerta comportamental de burnout:", ["Aumento de produtividade", "Presenteísmo (presente fisicamente, mas improdutivo)", "Excesso de sono reparador", "Melhora do humor no trabalho"]],
    ["Um paciente com burnout que ainda consegue aproveitar hobbies fora do trabalho sugere:", ["Quadro depressivo generalizado", "Sintomas mais circunscritos ao contexto ocupacional, típico de burnout", "Diagnóstico incorreto", "Necessidade de internação imediata"]],
    ["O passo 3 do protocolo (manejo de estressores) inclui:", ["Ignorar os limites organizacionais", "Pausas estruturadas, limites e recursos de recuperação como parte do tratamento", "Aumentar a carga de trabalho pra \"provar capacidade\"", "Eliminar toda atividade social"]],
    ["É critério de encaminhamento:", ["O paciente reclamar do chefe uma vez", "Comorbidade com depressão maior ou necessidade de afastamento", "Ter menos de 5 anos de empresa", "Trabalhar mais de 40h semanais"]],
    ["Por que \"só descansar no fim de semana\" costuma não resolver o burnout?", ["Porque burnout não existe clinicamente", "Porque a exaustão do eixo HPA e os estressores crônicos exigem mais que descanso pontual", "Porque descanso sempre piora o quadro", "Porque burnout é puramente físico"]],
  ];
  const gabaritoObjetivas = ["b", "b", "a", "b", "b", "b", "b", "b", "b", "b"];

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
    doc.vinhetaBox("Paulo, 29 anos, enfermeiro de UTI, relata exaustão intensa após 2 anos de plantões consecutivos. Diz que \"trata os pacientes como números\" pra conseguir seguir trabalhando, e sente que nada do que faz é suficiente. Fora do plantão, ainda joga futebol com amigos e diz \"nessas horas eu esqueço tudo\". MBI: exaustão emocional muito alta, despersonalização alta, realização profissional baixa."),
    new doc.Paragraph({ spacing: { before: 240 }, children: [new doc.TextRun({ text: "Com base no protocolo estudado, responda:", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    new doc.Paragraph({ spacing: { before: 220, after: 40 }, children: [new doc.TextRun({ text: "a) (10 pts) O quadro de Paulo é mais consistente com burnout ou depressão? Justifique.", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "b) (10 pts) Interprete o padrão do MBI de Paulo nas 3 dimensões.", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "c) (10 pts) Descreva a frase de psicoeducação que você usaria com Paulo sobre a despersonalização (\"tratar pacientes como números\").", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "d) (10 pts) Que fatores ocupacionais específicos da rotina de Paulo (plantões de UTI) você investigaria no passo 3 do protocolo?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    new doc.Paragraph({ spacing: { after: 40 }, children: [new doc.TextRun({ text: "USO EXCLUSIVO DO INSTRUTOR — remover antes de aplicar a prova", bold: true, color: doc.TERRA, font: doc.FONT, size: 20 })] }),
    doc.tituloH1("Gabarito"),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 1 — Questões objetivas", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 200 }, children: [new doc.TextRun({ text: gabaritoObjetivas.map((r, i) => `${i + 1}-${r}`).join("   ·   "), font: doc.FONT, size: 22, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 2 — Critério de correção da questão de caso", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "a) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Burnout — sintomas circunscritos ao plantão/trabalho, com capacidade preservada de prazer fora dele (futebol com amigos).", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "b) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Exaustão emocional muito alta e despersonalização alta são o padrão central; realização profissional baixa completa o quadro clássico de burnout severo.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "c) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Espera-se nomear a despersonalização como mecanismo de defesa do sistema esgotado, não falha de caráter ou de vocação profissional.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "d) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Carga de plantões consecutivos, tempo de recuperação entre turnos, suporte da equipe/instituição, possibilidade de rodízio de setor.", font: doc.FONT, size: 21, color: doc.INK })] }),
  );

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-4.3-Avaliacao.docx");
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
      n: 1, titulo: "Um sistema que parou de responder direito", duracao: "12 min", slides: "1, 2, 3, 4",
      objetivo: "Sair sabendo explicar por que burnout não é fraqueza, e por que descanso pontual não resolve.",
      segmentos: [
        seg("0:00–0:45", "Abertura (gancho)", [{ fala: "Burnout não é preguiça disfarçada de cansaço. É um sistema de resposta ao estresse que trabalhou tanto que parou de responder direito." }]),
        seg("0:45–2:00", "Por que isso importa clinicamente", ["Reduz a culpa de \"não estar aguentando\".", "Isso é o Passo 1 da anatomia de todo protocolo do curso: Mecanismo."]),
        seg("2:00–8:00", "A cadeia do esgotamento (mostrar slide 4)", [
          "Sobrecarga crônica sem recuperação suficiente.",
          "Eixo HPA hiperativado — cortisol elevado persistente.",
          "Com o tempo, a resposta do eixo fica achatada e desregulada.",
          "Resultado: esgotamento real dos recursos regulatórios.",
        ]),
        seg("8:00–10:30", "Como levar isso pra sessão", [{ fala: "O que você sente não é fraqueza — seu sistema de resposta ao estresse trabalhou tanto que parou de responder direito." }]),
        seg("10:30–12:00", "Fechamento", [{ fala: "Próxima aula: as 3 dimensões do burnout segundo Maslach." }]),
      ],
    },
    {
      n: 2, titulo: "As 3 dimensões de Maslach", duracao: "10 min", slides: "5",
      objetivo: "Reconhecer exaustão emocional, despersonalização e baixa realização como as 3 dimensões centrais do burnout.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três formas de medir o mesmo esgotamento."]),
        seg("1:00–7:00", "As 3 dimensões (mostrar slide 5)", [
          "Exaustão emocional: \"sem gasolina\", esgotado além do cansaço normal.",
          "Despersonalização: cinismo e distanciamento de colegas/clientes.",
          "Baixa realização: sensação de não entregar valor, mesmo trabalhando mais.",
        ]),
        seg("7:00–9:00", "Por que isso importa", ["Nem sempre as 3 aparecem com a mesma intensidade — o MBI (aula 6) mede cada uma separadamente."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: os sinais que a mente dá antes do esgotamento total." }]),
      ],
    },
    {
      n: 3, titulo: "Sinais de alerta", duracao: "10 min", slides: "6",
      objetivo: "Reconhecer sinais precoces de burnout antes do esgotamento se instalar por completo.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Reconhecer cedo evita meses de sofrimento acumulado."]),
        seg("1:00–7:30", "As 4 categorias (mostrar slide 6)", [
          "Cognitivo: dificuldade de concentração, embotamento.",
          "Físico: fadiga crônica, distúrbios de sono, dores somáticas.",
          "Comportamental: queda de produtividade, presenteísmo.",
          "Relacional: cinismo com colegas, isolamento da equipe.",
        ]),
        seg("7:30–9:00", "Diferença de sinal e esgotamento instalado", ["Sinal de alerta é a janela de intervenção precoce."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: como diferenciar burnout de depressão e de transtorno de ajustamento." }]),
      ],
    },
    {
      n: 4, titulo: "Diagnóstico diferencial rápido", duracao: "12 min", slides: "7",
      objetivo: "Diferenciar burnout de depressão, transtorno de ajustamento e cansaço normal.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Um filtro rápido pra guiar a primeira sessão."]),
        seg("1:00–8:00", "As 3 comparações (mostrar slide 7)", [
          "Burnout x depressão: circunscrito ao trabalho x global.",
          "Burnout x ajustamento: processo crônico x reação aguda recente.",
          "Burnout x cansaço normal: persiste mesmo após descanso, com impacto funcional.",
        ]),
        seg("8:00–10:30", "Pergunta-chave de entrevista", [{ fala: "Fora do trabalho, você ainda consegue sentir prazer em algo?" }, "Essa pergunta sozinha já direciona boa parte do diagnóstico diferencial."]),
        seg("10:30–12:00", "Fechamento", [{ fala: "Próxima aula: os 3 instrumentos que confirmam essa leitura com dado." }]),
      ],
    },
    {
      n: 5, titulo: "Os 3 instrumentos de avaliação", duracao: "12 min", slides: "8",
      objetivo: "Saber quando usar MBI, CBI e OLBI.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três escalas, três abordagens de avaliação."]),
        seg("1:00–4:30", "MBI", ["Padrão-ouro.", "Mede as 3 dimensões separadamente."]),
        seg("4:30–7:30", "CBI", ["Diferencia burnout pessoal, do trabalho e do cliente/paciente."]),
        seg("7:30–10:00", "OLBI", ["Foco em exaustão e desengajamento, com itens físicos e cognitivos."]),
        seg("10:00–12:00", "Como escolher na prática", ["MBI como primeira escolha padrão; CBI quando quer diferenciar a origem do esgotamento.", { fala: "Próxima aula: colocamos tudo em prática — psicoeducação e diferenciação diagnóstica." }]),
      ],
    },
    {
      n: 6, titulo: "Protocolo — psicoeducação e diferenciação", duracao: "14 min", slides: "9, 10",
      objetivo: "Aplicar os passos 1 e 2 do protocolo com script de psicoeducação e critério de diferenciação burnout x depressão.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["A parte que você vai usar amanhã. Hoje, os 2 primeiros passos."]),
        seg("1:00–2:00", "Visão geral (mostrar slide 9)", ["Psicoeducação → Diferenciação → Manejo de estressores → Prevenção de recaída."]),
        seg("2:00–7:00", "Passo 1 — Psicoeducação (mostrar slide 10, esquerda)", [{ fala: "O que você sente não é fraqueza — seu sistema de resposta ao estresse trabalhou tanto que parou de responder direito." }]),
        seg("7:00–13:00", "Passo 2 — Diferenciação (mostrar slide 10, direita)", ["Pergunta-chave: prazer preservado fora do trabalho?", "Sintomas restritos ao trabalho → burnout. Generalizados → investigar depressão associada."]),
        seg("13:00–14:00", "Fechamento", [{ fala: "Próxima aula: manejo de estressores e prevenção de recaída." }]),
      ],
    },
    {
      n: 7, titulo: "Protocolo — manejo de estressores e prevenção", duracao: "14 min", slides: "11",
      objetivo: "Aplicar manejo de estressores organizacionais e montar um plano de prevenção de recaída.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Hoje fechamos o protocolo com a parte mais prática."]),
        seg("1:00–7:00", "Passo 3 — Manejo de estressores (mostrar slide 11, esquerda)", ["Negociar redução de carga quando possível.", "Estabelecer limites de disponibilidade fora do expediente.", "Pausas estruturadas fazem parte do tratamento, não são luxo."]),
        seg("7:00–13:00", "Passo 4 — Prevenção de recaída (mostrar slide 11, direita)", ["Mapear estressores específicos do paciente.", "Montar plano de retorno gradual se houver afastamento.", "Revisar o plano periodicamente, mesmo após melhora."]),
        seg("13:00–14:00", "Fechamento", [{ fala: "Protocolo completo. Próxima aula: um caso real e os critérios de quando encaminhar." }]),
      ],
    },
    {
      n: 8, titulo: "Estudo de caso e encaminhamento", duracao: "13 min", slides: "12, 13",
      objetivo: "Aplicar o protocolo completo a um caso e reconhecer critérios de encaminhamento.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Vamos juntar tudo num caso real."]),
        seg("1:00–8:00", "Estudo de caso — Juliana (mostrar slide 12)", ["Leia a vinheta com calma.", "Percorra as 3 perguntas de discussão.", "Convide o aluno a pausar e responder por escrito."]),
        seg("8:00–12:00", "Quando encaminhar (mostrar slide 13)", ["Percorra os 4 critérios — ênfase em comorbidade com depressão e necessidade de afastamento."]),
        seg("12:00–13:00", "Fechamento", [{ fala: "Próxima aula fechamos o módulo com a recapitulação geral." }]),
      ],
    },
    {
      n: 9, titulo: "Recapitulando o módulo", duracao: "8 min", slides: "14",
      objetivo: "Consolidar os pontos-chave do módulo antes dos exercícios e da avaliação.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Último bloco do módulo de burnout."]),
        seg("1:00–6:00", "Recapitulando (mostrar slide 14)", ["Retome os 4 pontos-chave do módulo.", "Reforce a anatomia de 5 passos, comum a todo protocolo do curso."]),
        seg("6:00–8:00", "Fechamento do módulo", [{ fala: "Agora é hora dos exercícios e da avaliação. Te vejo no próximo protocolo." }]),
      ],
    },
  ];

  const totalMin = 12 + 10 + 10 + 12 + 12 + 14 + 14 + 13 + 8;

  const children = [
    ...doc.capa(KICKER, `Roteiro de Aulas — ${NOME}`, "Módulo dividido em 9 vídeo-aulas de 8 a 14 minutos, seguindo os slides já produzidos. Cada aula tem roteiro cronometrado, pronto pra gravação."),
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

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", `${RODAPE_DOC} — Roteiro de Aulas`, children), "Modulo-4.3-Roteiro-Aulas.docx");
}

// ============================================================
Promise.resolve()
  .then(construirDeck)
  .then(construirExercicios)
  .then(construirProva)
  .then(construirRoteiro)
  .then(() => console.log("TUDO PRONTO"))
  .catch((e) => { console.error(e); process.exit(1); });

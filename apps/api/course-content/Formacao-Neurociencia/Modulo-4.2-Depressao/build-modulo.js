const deck = require("../_lib/lib-deck.js");
const doc = require("../_lib/lib-doc.js");

const MOD = "4.2";
const NOME = "Depressão";
const RODAPE_DECK = `${NOME} — Módulo ${MOD}`;
const RODAPE_DOC = `Módulo ${MOD} — ${NOME}`;
const KICKER = "MÓDULO 4.2 · PROTOCOLOS CLÍNICOS DIRETOS AO PONTO";

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
      { titulo: "Mecanismo", desc: "O que acontece no cérebro na depressão" },
      { titulo: "Sinais", desc: "O que a mente avisa antes do quadro se instalar" },
      { titulo: "Instrumento", desc: "BDI-II, PHQ-9 e HAM-D na prática" },
      { titulo: "Protocolo", desc: "4 passos, prontos pra sessão" },
      { titulo: "Encaminhamento", desc: "Quando isso não basta" },
    ],
  });

  deck.slideHook(pres, {
    rodape: RODAPE_DECK, pageNum: 3,
    frase: "Depressão não é falta de esforço. É um cérebro com menos combustível pra sentir prazer e menos plasticidade pra mudar.",
    apoio: "É essa frase — não \"você precisa se esforçar mais\" — que costuma reduzir a culpa que alimenta o próprio quadro. O paciente para de se cobrar por um sintoma biológico.",
  });

  deck.slideCircuito(pres, {
    rodape: RODAPE_DECK, pageNum: 4,
    titulo: "O cérebro na depressão",
    regioes: [
      { label: "Córtex pré-frontal (hipoativo)", rx: 0.20, ry: 0.28, color: deck.NAVY, d: 0.5 },
      { label: "Sistema de recompensa", rx: 0.44, ry: 0.62, color: deck.TERRA, d: 0.4 },
      { label: "Hipocampo (volume reduzido)", rx: 0.46, ry: 0.56, color: deck.TERRA_TINT, d: 0.34 },
      { label: "Amígdala (hiper-reativa ao negativo)", rx: 0.30, ry: 0.66, color: deck.NAVY_TINT, d: 0.34 },
    ],
    notas: [
      "O sistema de recompensa libera menos dopamina — a base biológica da anedonia (perda de prazer).",
      "O córtex pré-frontal hipoativo explica a lentidão de raciocínio e a dificuldade de decidir.",
      "Hipocampo cronicamente exposto a cortisol perde volume — impacta memória e regulação emocional.",
    ],
  });

  deck.slideCadeia(pres, {
    rodape: RODAPE_DECK, pageNum: 5,
    titulo: "Do estresse crônico ao sintoma",
    elos: [
      { titulo: "Estresse crônico", desc: "Exposição prolongada a cortisol elevado" },
      { titulo: "Inflamação", desc: "Citocinas inflamatórias afetam circuitos de humor" },
      { titulo: "Queda de BDNF", desc: "Fator neurotrófico essencial pra plasticidade cai" },
      { titulo: "Menos neuroplasticidade", desc: "Hipocampo e córtex pré-frontal perdem capacidade de mudança" },
    ],
    notaFinal: "Antidepressivos e psicoterapia atuam em pontos diferentes dessa mesma cadeia — por isso a combinação costuma superar cada um isolado.",
  });

  deck.slideCategorias(pres, {
    rodape: RODAPE_DECK, pageNum: 6,
    titulo: "3 padrões de apresentação",
    categorias: [
      { titulo: "Anedonia", desc: "Perda de prazer e interesse em atividades antes gratificantes", color: deck.TERRA },
      { titulo: "Retardo psicomotor", desc: "Lentidão de pensamento, fala e movimento", color: deck.NAVY },
      { titulo: "Ruminação", desc: "Pensamento repetitivo e autocrítico, difícil de interromper", color: deck.NAVY_TINT },
    ],
    notaFinal: "Um paciente pode apresentar um padrão dominante ou os três combinados — isso muda a ênfase do protocolo.",
  });

  deck.slideSinais(pres, {
    rodape: RODAPE_DECK, pageNum: 7,
    titulo: "O que a mente avisa antes do quadro se instalar",
    itens: [
      { titulo: "Cognitivo", desc: "Dificuldade de concentração, indecisão, culpa excessiva" },
      { titulo: "Físico", desc: "Fadiga persistente, alteração de sono e apetite" },
      { titulo: "Comportamental", desc: "Isolamento social, queda de produtividade, adiamento de tarefas" },
      { titulo: "Relacional", desc: "Afastamento afetivo, irritabilidade, dificuldade de pedir ajuda" },
    ],
  });

  deck.slideDiferencial(pres, {
    rodape: RODAPE_DECK, pageNum: 8,
    titulo: "Diagnóstico diferencial rápido",
    cards: [
      { titulo: "Depressão unipolar", desc: "Episódio de ≥ 2 semanas, comprometimento funcional claro, múltiplos sintomas simultâneos" },
      { titulo: "Distimia", desc: "Sintomas crônicos e mais leves, persistentes por ≥ 2 anos — \"baixo grade\" constante" },
      { titulo: "Luto complicado", desc: "Gatilho claro (perda), saudade intensa e persistente além do esperado culturalmente" },
    ],
  });

  deck.slideInstrumentos(pres, {
    rodape: RODAPE_DECK, pageNum: 9,
    titulo: "Três escalas, três finalidades",
    instrumentos: [
      { sigla: "BDI-II", nome: "Beck Depression Inventory", desc: "21 itens de autorrelato. Bom pra acompanhar evolução sessão a sessão." },
      { sigla: "PHQ-9", nome: "Patient Health Questionnaire-9", desc: "Rastreio rápido de 9 itens. Ideal pra primeira sessão e monitorar resposta ao tratamento." },
      { sigla: "HAM-D", nome: "Hamilton Depression Rating Scale", desc: "Aplicada pelo clínico. Padrão em acompanhamento conjunto com psiquiatria." },
    ],
  });

  deck.slideProtocoloOverview(pres, {
    rodape: RODAPE_DECK, pageNum: 10,
    titulo: "Do mecanismo à intervenção: 4 passos",
    passos: [
      { titulo: "Psicoeducação\ndo mecanismo", desc: "Nomear a queda de dopamina/BDNF com o paciente" },
      { titulo: "Ativação\ncomportamental", desc: "Agenda de atividades prazerosas, começando pequeno" },
      { titulo: "Reestruturação\ncognitiva", desc: "Reavaliar pensamento tudo-ou-nada e autocrítica" },
      { titulo: "Prevenção\nde recaída", desc: "Plano de sinais de alerta e ação antecipada" },
    ],
    notaFinal: "Nas próximas 2 telas, cada passo ganha um exemplo pronto pra levar pra sessão.",
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 11,
    titulo: "Passos 1 e 2, na prática",
    colunas: [
      {
        numero: 1, titulo: "Psicoeducação do mecanismo",
        fala: "“O que você sente não é preguiça — é um cérebro produzindo menos dopamina e menos plasticidade por causa do estresse acumulado. Isso muda com o tratamento certo.”",
        bullets: ["Nomear o circuito reduz a culpa e a autocrítica", "Normaliza sem minimizar (\"faz sentido\", não \"é frescura\")", "Prepara o terreno pra ativação comportamental"],
      },
      {
        numero: 2, titulo: "Ativação comportamental",
        tabela: { header: ["Atividade", "Nível de energia"], linhas: [["Caminhada de 10 min", "Baixo"], ["Ligar pra 1 amigo", "Baixo"], ["Retomar um hobby", "Médio"]] },
        notaTabela: "Comece pelo nível mais baixo — o objetivo é sucesso garantido, não grande mudança.",
      },
    ],
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 12,
    titulo: "Passos 3 e 4, na prática",
    colunas: [
      {
        numero: 3, titulo: "Reestruturação cognitiva",
        tabela: { header: ["Pensamento", "Reavaliação"], linhas: [["\"Sou um fracasso\"", "\"Estou passando por um episódio, não sou definido por ele\""], ["\"Nunca vou melhorar\"", "\"A maioria dos episódios responde a tratamento\""]] },
      },
      {
        numero: 4, titulo: "Prevenção de recaída",
        bullets: ["Mapear os sinais de alerta pessoais do paciente (aula 4)", "Montar um plano de ação escrito pra quando esses sinais aparecerem", "Agendar revisão do plano a cada poucas semanas"],
      },
    ],
  });

  deck.slideCaso(pres, {
    rodape: RODAPE_DECK, pageNum: 13,
    vinheta: "Carlos, 52 anos, procura terapia após ser demitido há 4 meses. Relata perda de interesse em tudo, dorme 10h por dia mas acorda cansado, ganhou 8kg, se sente \"um fracasso\". PHQ-9 = 19. Nega pensamentos de morte.",
    perguntas: [
      "Depressão unipolar, distimia ou luto complicado? O que na vinheta sustenta essa leitura?",
      "Interprete o PHQ-9 = 19 — o que essa pontuação indica sobre a gravidade?",
      "Sugira 2 atividades de ativação comportamental adequadas pro nível de energia atual de Carlos.",
    ],
  });

  deck.slideEncaminhamento(pres, {
    rodape: RODAPE_DECK, pageNum: 14,
    criterios: [
      "Ideação suicida ativa ou plano estruturado — avaliação de risco imediata",
      "Sintomas psicóticos (delírios, alucinações) junto ao quadro depressivo",
      "Depressão resistente após 8–12 semanas de protocolo bem conduzido",
      "Histórico sugestivo de episódios de humor elevado — investigar espectro bipolar antes de tratar como unipolar",
    ],
  });

  deck.slideRecap(pres, {
    rodape: RODAPE_DECK, pageNum: 15,
    pontos: [
      "Depressão é queda de dopamina, BDNF e neuroplasticidade — não falta de esforço",
      "BDI-II, PHQ-9 e HAM-D servem a momentos diferentes do acompanhamento",
      "O protocolo de 4 passos vai de psicoeducação a prevenção de recaída",
      "Critérios claros de quando o caso pede encaminhamento — especialmente risco de suicídio",
    ],
    proximoTexto: "Próximo: exercícios práticos e avaliação do Módulo 4.2 →",
  });

  return pres.writeFile({ fileName: "Modulo-4.2-Depressao.pptx" });
}

// ============================================================
// 2) EXERCÍCIOS
// ============================================================
function construirExercicios() {
  const children = [
    ...doc.capa(KICKER, `Exercícios — ${NOME}`, "Resolva individualmente antes da sessão de supervisão. O objetivo é testar sua leitura do mecanismo e do protocolo antes de comparar com a discussão em grupo — não há problema em errar."),

    doc.exNum(1, "O mecanismo, em suas palavras"),
    doc.pergunta(1, "Explique em até 3 frases, sem jargão técnico, como você explicaria a um paciente por que ele \"não consegue sentir vontade de nada\"."),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Cite os 3 padrões de apresentação vistos na aula e dê um exemplo de comportamento observável pra cada um."),
    ...doc.linhaResposta(2),

    doc.exNum(2, "Leitura de escala"),
    doc.vinhetaBox("Paciente pontua 8 no PHQ-9."),
    doc.pergunta(1, "Essa pontuação indica depressão mínima, leve, moderada ou grave?"),
    ...doc.linhaResposta(1),
    doc.pergunta(2, "Isso muda a urgência do encaminhamento? Por quê?"),
    ...doc.linhaResposta(1),

    doc.exNum(3, "Diagnóstico diferencial"),
    doc.vinhetaBox("Beatriz, 38 anos, relata tristeza e falta de energia \"que nunca passa de verdade\" há uns 3 anos — nunca tão grave a ponto de não conseguir trabalhar, mas nunca se sentindo bem."),
    doc.pergunta(1, "Depressão unipolar, distimia ou luto complicado? Justifique com 2 elementos da vinheta."),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Que instrumento você aplicaria primeiro, e por quê?"),
    ...doc.linhaResposta(1),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),

    doc.exNum(4, "Ativação comportamental"),
    doc.p("Para o caso de Beatriz (exercício 3), monte uma agenda de 3 atividades de ativação comportamental, da mais fácil pra mais desafiadora."),
    doc.tabelaSimples(["Nº", "Atividade", "Nível de energia"], [["1", "", ""], ["2", "", ""], ["3", "", ""]], [700, 6650, 2000]),

    doc.exNum(5, "Caso integrado — Carlos"),
    doc.vinhetaBox("Carlos, 52 anos, procura terapia após ser demitido há 4 meses. Relata perda de interesse em tudo, dorme 10h por dia mas acorda cansado, ganhou 8kg, se sente \"um fracasso\". PHQ-9 = 19. Nega pensamentos de morte."),
    doc.pergunta(1, "Escreva a frase de psicoeducação que você usaria com Carlos."),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Escreva 1 pensamento autocrítico provável de Carlos e a reavaliação correspondente."),
    ...doc.linhaResposta(2),
    doc.pergunta(3, "Carlos nega pensamentos de morte hoje. Isso significa que você não precisa investigar risco de suicídio nas próximas sessões?"),
    ...doc.linhaResposta(2),
  ];

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-4.2-Exercicios.docx");
}

// ============================================================
// 3) AVALIAÇÃO
// ============================================================
function construirProva() {
  const objetivas = [
    ["Qual sistema está mais diretamente associado à anedonia na depressão?", ["Sistema de recompensa / dopamina", "Cerebelo", "Córtex occipital", "Sistema vestibular"]],
    ["BDNF é:", ["Um neurotransmissor excitatório", "Um fator neurotrófico ligado à neuroplasticidade", "Um hormônio da tireoide", "Um tipo de receptor de dopamina"]],
    ["A cadeia estresse crônico → depressão passa por:", ["Aumento de BDNF e neuroplasticidade", "Inflamação, queda de BDNF, menor neuroplasticidade", "Ativação exclusiva do cerebelo", "Redução isolada de cortisol"]],
    ["Qual NÃO é um dos 3 padrões de apresentação vistos na aula?", ["Anedonia", "Retardo psicomotor", "Ruminação", "Fobia específica"]],
    ["Qual escala é aplicada pelo clínico, e não por autorrelato do paciente?", ["BDI-II", "PHQ-9", "HAM-D", "GAD-7"]],
    ["O PHQ-9 é mais indicado para:", ["Avaliação neuropsicológica completa", "Rastreio rápido e monitorar resposta ao tratamento", "Substituir a entrevista clínica", "Avaliação exclusiva de risco de suicídio"]],
    ["O que diferencia distimia de depressão unipolar?", ["Distimia tem sintomas mais graves", "Distimia é crônica (≥ 2 anos) e mais leve", "Unipolar nunca tem componente biológico", "Distimia sempre exige internação"]],
    ["Ativação comportamental consiste em:", ["Evitar toda atividade até a energia voltar", "Agendar atividades prazerosas/de domínio, começando pequeno", "Focar só em reestruturação cognitiva", "Aguardar remissão espontânea"]],
    ["É critério claro de encaminhamento:", ["O paciente ter mais de 50 anos", "Ideação suicida ativa", "O paciente chorar em sessão", "Sintomas terem começado há menos de 1 mês"]],
    ["Luto complicado se diferencia de depressão porque:", ["Nunca apresenta sintomas depressivos", "Tem gatilho claro (perda) e persistência além do esperado culturalmente", "Sempre exige medicação", "Não afeta o sono"]],
  ];
  const gabaritoObjetivas = ["a", "b", "b", "d", "c", "b", "b", "b", "b", "b"];

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
    doc.vinhetaBox("Fábio, 45 anos, empresário, procura terapia relatando que \"não sente mais orgulho de nada\", mesmo tendo alcançado metas importantes. Dorme mal, perdeu o apetite, e diz que sua mente está \"lenta\" — demora mais pra decidir coisas simples. Os sintomas começaram há 2 meses, sem gatilho externo claro. PHQ-9 = 17."),
    new doc.Paragraph({ spacing: { before: 240 }, children: [new doc.TextRun({ text: "Com base no protocolo estudado, responda:", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    new doc.Paragraph({ spacing: { before: 220, after: 40 }, children: [new doc.TextRun({ text: "a) (10 pts) Qual hipótese diagnóstica mais provável, e por quê?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "b) (10 pts) Interprete o escore do PHQ-9 — o que essa pontuação indica sobre a gravidade?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(1),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "c) (10 pts) Descreva a frase de psicoeducação que você usaria com Fábio sobre o retardo psicomotor ('mente lenta').", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "d) (10 pts) Fábio não tem gatilho externo claro. Isso é incomum na depressão unipolar? Justifique com base no mecanismo estudado.", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    new doc.Paragraph({ spacing: { after: 40 }, children: [new doc.TextRun({ text: "USO EXCLUSIVO DO INSTRUTOR — remover antes de aplicar a prova", bold: true, color: doc.TERRA, font: doc.FONT, size: 20 })] }),
    doc.tituloH1("Gabarito"),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 1 — Questões objetivas", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 200 }, children: [new doc.TextRun({ text: gabaritoObjetivas.map((r, i) => `${i + 1}-${r}`).join("   ·   "), font: doc.FONT, size: 22, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 2 — Critério de correção da questão de caso", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "a) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Depressão unipolar — anedonia, alteração de sono/apetite, retardo psicomotor, duração ≥ 2 semanas com comprometimento funcional.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "b) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "PHQ-9 = 17 indica depressão moderadamente grave.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "c) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Espera-se menção ao córtex pré-frontal hipoativo como base biológica da lentidão — não é falha de caráter nem falta de inteligência.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "d) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Não é incomum — a cadeia estresse/inflamação/BDNF pode se acumular de forma silenciosa, sem um evento único e identificável disparando o quadro.", font: doc.FONT, size: 21, color: doc.INK })] }),
  );

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-4.2-Avaliacao.docx");
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
      n: 1, titulo: "O que a queda de dopamina explica", duracao: "12 min", slides: "1, 2, 3, 4",
      objetivo: "Sair sabendo explicar o mecanismo da depressão sem jargão, reduzindo a culpa do paciente pelo próprio quadro.",
      segmentos: [
        seg("0:00–0:45", "Abertura (gancho)", [{ fala: "Depressão não é falta de esforço. É um cérebro com menos combustível pra sentir prazer e menos plasticidade pra mudar." }]),
        seg("0:45–2:00", "Por que isso importa clinicamente", ["Reduz a culpa que alimenta o próprio quadro.", "Isso é o Passo 1 da anatomia de todo protocolo do curso: Mecanismo."]),
        seg("2:00–8:00", "O cérebro na depressão (mostrar slide 4)", [
          "Sistema de recompensa libera menos dopamina — base da anedonia.",
          "Córtex pré-frontal hipoativo — lentidão de raciocínio e decisão.",
          "Hipocampo perde volume com exposição crônica a cortisol.",
          "Amígdala fica mais reativa a estímulos negativos.",
        ]),
        seg("8:00–10:30", "Como levar isso pra sessão", [{ fala: "O que você sente não é preguiça — é um cérebro produzindo menos dopamina por causa do estresse acumulado." }]),
        seg("10:30–12:00", "Fechamento", [{ fala: "Próxima aula: a cadeia completa, do estresse crônico até o sintoma instalado." }]),
      ],
    },
    {
      n: 2, titulo: "Do estresse crônico ao sintoma", duracao: "10 min", slides: "5",
      objetivo: "Explicar a cadeia estresse–inflamação–BDNF–neuroplasticidade e por que tratamento combinado costuma funcionar melhor.",
      segmentos: [
        seg("0:00–1:00", "Retomada rápida", ["Vimos o que está fraco no cérebro. Hoje vemos como ele chega lá."]),
        seg("1:00–6:30", "A cadeia (mostrar slide 5)", ["Estresse crônico eleva cortisol.", "Isso gera inflamação, que afeta circuitos de humor.", "BDNF cai — o fator que sustenta a plasticidade.", "Resultado: menos capacidade de mudança no hipocampo e córtex pré-frontal."]),
        seg("6:30–9:00", "Por que combinar tratamentos funciona", ["Antidepressivo e psicoterapia atuam em pontos diferentes da mesma cadeia."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: os 3 padrões de apresentação — nem toda depressão parece igual." }]),
      ],
    },
    {
      n: 3, titulo: "Os 3 padrões de apresentação", duracao: "10 min", slides: "6",
      objetivo: "Reconhecer anedonia, retardo psicomotor e ruminação como padrões que podem aparecer isolados ou combinados.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três formas de a mesma condição aparecer — nem sempre juntas."]),
        seg("1:00–7:00", "Anedonia, retardo, ruminação (mostrar slide 6)", [
          "Anedonia: perda de prazer em atividades antes gratificantes.",
          "Retardo psicomotor: lentidão de pensamento, fala e movimento.",
          "Ruminação: pensamento repetitivo e autocrítico.",
        ]),
        seg("7:00–9:00", "Aplicação prática", ["Pergunte: \"o que mais pesa — não sentir vontade, estar lento, ou não parar de pensar nas mesmas coisas?\"", "A resposta direciona qual passo do protocolo priorizar primeiro."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: os sinais que a mente dá antes do quadro se instalar de vez." }]),
      ],
    },
    {
      n: 4, titulo: "Sinais de alerta", duracao: "10 min", slides: "7",
      objetivo: "Ensinar o paciente a reconhecer sinais precoces antes do quadro se agravar.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Reconhecer cedo muda o curso do tratamento."]),
        seg("1:00–7:30", "As 4 categorias (mostrar slide 7)", [
          "Cognitivo: dificuldade de concentração, indecisão, culpa excessiva.",
          "Físico: fadiga persistente, alteração de sono e apetite.",
          "Comportamental: isolamento, queda de produtividade.",
          "Relacional: afastamento afetivo, irritabilidade.",
        ]),
        seg("7:30–9:00", "Diferença entre sinal e sintoma instalado", ["Sinal de alerta é a janela de intervenção precoce."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: como diferenciar unipolar, distimia e luto complicado." }]),
      ],
    },
    {
      n: 5, titulo: "Diagnóstico diferencial rápido", duracao: "12 min", slides: "8",
      objetivo: "Diferenciar depressão unipolar, distimia e luto complicado na entrevista inicial.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Um filtro rápido pra guiar a primeira sessão."]),
        seg("1:00–8:00", "Os 3 quadros (mostrar slide 8)", [
          "Unipolar: episódio de 2+ semanas, comprometimento funcional claro.",
          "Distimia: sintomas crônicos e leves, 2+ anos, \"baixo grade\" constante.",
          "Luto complicado: gatilho de perda claro, saudade além do esperado culturalmente.",
        ]),
        seg("8:00–10:30", "Erros comuns", ["Confundir distimia com \"personalidade\" do paciente — é um quadro tratável.", "Luto complicado exige sensibilidade cultural: o \"esperado\" varia."]),
        seg("10:30–12:00", "Fechamento", [{ fala: "Próxima aula: os 3 instrumentos que confirmam essa leitura com dado." }]),
      ],
    },
    {
      n: 6, titulo: "Os 3 instrumentos de avaliação", duracao: "12 min", slides: "9",
      objetivo: "Saber quando usar BDI-II, PHQ-9 e HAM-D.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três escalas, três momentos do acompanhamento."]),
        seg("1:00–4:00", "BDI-II", ["21 itens, autorrelato.", "Uso: acompanhar evolução sessão a sessão."]),
        seg("4:00–7:00", "PHQ-9", ["Rastreio rápido de 9 itens.", "Uso: primeira sessão e monitorar resposta ao tratamento."]),
        seg("7:00–10:00", "HAM-D", ["Aplicada pelo clínico.", "Uso: acompanhamento em conjunto com psiquiatria."]),
        seg("10:00–12:00", "Como escolher na prática", ["PHQ-9 na entrada, BDI-II pra acompanhar, HAM-D quando tem psiquiatra envolvido.", { fala: "Próxima aula: colocamos tudo em prática — psicoeducação e ativação comportamental." }]),
      ],
    },
    {
      n: 7, titulo: "Protocolo — psicoeducação e ativação comportamental", duracao: "14 min", slides: "10, 11",
      objetivo: "Aplicar os passos 1 e 2 do protocolo com script de psicoeducação e uma agenda real de ativação comportamental.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["A parte que você vai usar amanhã. Hoje, os 2 primeiros passos."]),
        seg("1:00–2:00", "Visão geral (mostrar slide 10)", ["Psicoeducação → Ativação comportamental → Reestruturação → Prevenção de recaída."]),
        seg("2:00–7:00", "Passo 1 — Psicoeducação (mostrar slide 11, esquerda)", [{ fala: "O que você sente não é preguiça — é um cérebro produzindo menos dopamina e menos plasticidade." }, "Reforçar por que nomear reduz a culpa."]),
        seg("7:00–13:00", "Passo 2 — Ativação comportamental (mostrar slide 11, direita)", ["Comece pelo nível de energia mais baixo — sucesso garantido, não grande mudança.", "Percorrer os 3 exemplos da tabela."]),
        seg("13:00–14:00", "Fechamento", [{ fala: "Próxima aula: reestruturação cognitiva e prevenção de recaída." }]),
      ],
    },
    {
      n: 8, titulo: "Protocolo — reestruturação e prevenção de recaída", duracao: "14 min", slides: "12",
      objetivo: "Aplicar reestruturação cognitiva a pensamentos depressivos típicos e montar um plano de prevenção de recaída.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Hoje fechamos o protocolo."]),
        seg("1:00–7:00", "Passo 3 — Reestruturação cognitiva (mostrar slide 12, esquerda)", ["Percorrer os 2 exemplos da tabela.", "Foco em pensamento tudo-ou-nada e autocrítica global (\"sou um fracasso\")."]),
        seg("7:00–13:00", "Passo 4 — Prevenção de recaída (mostrar slide 12, direita)", ["Mapear sinais de alerta pessoais (conecta com aula 4).", "Montar plano de ação escrito.", "Agendar revisão periódica do plano."]),
        seg("13:00–14:00", "Fechamento", [{ fala: "Protocolo completo. Próxima aula: um caso real e os critérios de quando encaminhar." }]),
      ],
    },
    {
      n: 9, titulo: "Estudo de caso, encaminhamento e recap", duracao: "15 min", slides: "13, 14, 15",
      objetivo: "Integrar mecanismo, instrumento e protocolo num caso completo, com ênfase em avaliação de risco.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Última aula do módulo. Caso completo e os limites da terapia sozinha."]),
        seg("1:00–7:00", "Estudo de caso — Carlos (mostrar slide 13)", ["Leia a vinheta com calma.", "Percorra as 3 perguntas de discussão.", "Convide o aluno a pausar e responder por escrito."]),
        seg("7:00–11:00", "Quando encaminhar (mostrar slide 14)", ["Percorra os 4 critérios — ênfase especial em ideação suicida ativa.", "Encaminhar é parte do protocolo, não fracasso clínico."]),
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

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", `${RODAPE_DOC} — Roteiro de Aulas`, children), "Modulo-4.2-Roteiro-Aulas.docx");
}

// ============================================================
Promise.resolve()
  .then(construirDeck)
  .then(construirExercicios)
  .then(construirProva)
  .then(construirRoteiro)
  .then(() => console.log("TUDO PRONTO"))
  .catch((e) => { console.error(e); process.exit(1); });

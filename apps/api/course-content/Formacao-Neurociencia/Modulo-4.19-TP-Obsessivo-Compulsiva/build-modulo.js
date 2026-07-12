const deck = require("../_lib/lib-deck.js");
const doc = require("../_lib/lib-doc.js");

const MOD = "4.19";
const NOME = "Transtorno de Personalidade Obsessivo-Compulsiva";
const RODAPE_DECK = `TPOC — Módulo ${MOD}`;
const RODAPE_DOC = `Módulo ${MOD} — TPOC`;
const KICKER = "MÓDULO 4.19 · TRANSTORNOS DE PERSONALIDADE · CLUSTER C";

// ============================================================
// 1) SLIDE DECK
// ============================================================
function construirDeck() {
  const pres = deck.novaApresentacao(`${NOME} — Da Neurociência ao Manejo`);

  deck.slideTitulo(pres, {
    moduloLabel: `Módulo ${MOD} · Cluster C · Transtornos de Personalidade`,
    titulo: "TPOC",
    subtitulo: "Perfeccionismo e controle como identidade, não como sintoma",
    passos: ["Mecanismo", "Sinais", "Instrumento", "Manejo", "Encaminhamento"],
  });

  deck.slideRoteiro(pres, {
    rodape: RODAPE_DECK, pageNum: 2,
    cards: [
      { titulo: "Mecanismo", desc: "Por que rigidez e controle se tornam identidade" },
      { titulo: "Sinais", desc: "Perfeccionismo, rigidez e dificuldade de delegar" },
      { titulo: "Instrumento", desc: "PID-5, SCID-5-PD e Frost na prática" },
      { titulo: "Manejo", desc: "4 passos, flexibilizando regras aos poucos" },
      { titulo: "Encaminhamento", desc: "A conexão direta com o burnout clínico" },
    ],
  });

  deck.slideHook(pres, {
    rodape: RODAPE_DECK, pageNum: 3,
    frase: "TPOC não é TOC com outro nome — no TOC, a pessoa sofre com pensamentos intrusivos que não quer ter; no TPOC, a rigidez e o controle são sentidos como \"o jeito certo de ser\", não como sintoma.",
    apoio: "Essa diferença — ego-distônico versus ego-sintônico — muda completamente a entrada terapêutica: aqui, o paciente raramente chega pedindo ajuda com o perfeccionismo em si.",
  });

  deck.slideCircuito(pres, {
    rodape: RODAPE_DECK, pageNum: 4,
    titulo: "Por que rigidez e controle se tornam identidade",
    regioes: [
      { label: "Córtex pré-frontal dorsolateral (hiperengajamento no controle cognitivo)", rx: 0.20, ry: 0.22, color: deck.NAVY, d: 0.5 },
      { label: "Circuitos de flexibilidade cognitiva (menor capacidade de alternar regras)", rx: 0.22, ry: 0.62, color: deck.NAVY_TINT, d: 0.4 },
      { label: "Sistema de recompensa (reforçado por ordem, controle e competência, não por alívio de ansiedade)", rx: 0.60, ry: 0.60, color: deck.TERRA, d: 0.36 },
      { label: "Amígdala (ativação diante de imprevisibilidade ou perda de controle percebida)", rx: 0.58, ry: 0.24, color: deck.TERRA_TINT, d: 0.36 },
    ],
    notas: [
      "O córtex pré-frontal dorsolateral mostra hiperengajamento no controle cognitivo deliberado, sustentando o padrão de planejamento e checagem constante.",
      "Os circuitos de flexibilidade cognitiva mostram menor capacidade de alternar entre regras — a rigidez tem base mensurável, não é só \"teimosia\".",
      "Diferente do TOC, o sistema de recompensa aqui responde à ordem e ao controle em si, não ao alívio de uma ansiedade intrusiva específica — a distinção neurobiológica central entre os dois quadros.",
    ],
  });

  deck.slideCadeia(pres, {
    rodape: RODAPE_DECK, pageNum: 5,
    titulo: "Da necessidade de controle à identidade rígida",
    elos: [
      { titulo: "Temperamento com alta necessidade de previsibilidade", desc: "Desconforto elevado diante de ambiguidade ou imprevisto, desde cedo" },
      { titulo: "Ambiente com expectativas rígidas de desempenho", desc: "Reforço precoce e consistente de comportamento perfeccionista e regrado" },
      { titulo: "Identidade centrada em competência", desc: "\"Eu sou a pessoa que faz certo\" torna-se central ao autoconceito" },
      { titulo: "TPOC", desc: "Padrão pervasivo de rigidez, perfeccionismo e necessidade de controle" },
    ],
    notaFinal: "É por isso que confrontar diretamente o perfeccionismo costuma gerar resistência — ele não é sentido como problema, é sentido como quem a pessoa é.",
  });

  deck.slideCategorias(pres, {
    rodape: RODAPE_DECK, pageNum: 6,
    titulo: "3 traços centrais",
    categorias: [
      { titulo: "Perfeccionismo disfuncional", desc: "Padrões tão altos que paralisam, em vez de impulsionar", color: deck.NAVY },
      { titulo: "Rigidez e inflexibilidade", desc: "Dificuldade de adaptar regras a contextos novos", color: deck.NAVY_TINT },
      { titulo: "Necessidade excessiva de controle", desc: "Sobre tarefas, tempo e, com frequência, sobre outras pessoas", color: deck.TERRA },
    ],
    notaFinal: "O ponto-chave: são traços ego-sintônicos — vividos como parte da identidade, não como sintomas indesejados a serem eliminados.",
  });

  deck.slideSinais(pres, {
    rodape: RODAPE_DECK, pageNum: 7,
    titulo: "Como reconhecer o padrão na prática",
    itens: [
      { titulo: "Cognitivo", desc: "Pensamento rígido, dificuldade de ver \"cinza\", regras tratadas como absolutas" },
      { titulo: "Comportamental", desc: "Procrastinação por perfeccionismo, dificuldade extrema de delegar" },
      { titulo: "Relacional", desc: "Dificuldade de expressar afeto, relações por vezes vividas como \"tarefas\"" },
      { titulo: "Físico", desc: "Tensão crônica associada à hipervigilância de controle" },
    ],
  });

  deck.slideDiferencial(pres, {
    rodape: RODAPE_DECK, pageNum: 8,
    titulo: "Diagnóstico diferencial rápido",
    cards: [
      { titulo: "TOC (Módulo 4.8)", desc: "Ego-distônico, sintomas intrusivos indesejados e ansiedade específica; TPOC é estilo de personalidade ego-sintônico" },
      { titulo: "Perfeccionismo adaptativo", desc: "Funcional, flexível conforme o contexto, sem prejuízo funcional significativo" },
      { titulo: "TAG", desc: "Preocupação difusa e generalizada, diferente da necessidade específica de ordem e controle do TPOC" },
    ],
  });

  deck.slideInstrumentos(pres, {
    rodape: RODAPE_DECK, pageNum: 9,
    titulo: "Três instrumentos, três finalidades",
    instrumentos: [
      { sigla: "PID-5", nome: "Personality Inventory for DSM-5", desc: "Mapeia os traços patológicos de forma dimensional." },
      { sigla: "SCID-5-PD", nome: "Entrevista Estruturada", desc: "Padrão-ouro pra diagnóstico categorial formal." },
      { sigla: "Frost MPS", nome: "Frost Multidimensional Perfectionism Scale", desc: "Mede as dimensões específicas do perfeccionismo disfuncional." },
    ],
  });

  deck.slideProtocoloOverview(pres, {
    rodape: RODAPE_DECK, pageNum: 10,
    titulo: "Do mecanismo ao manejo: 4 passos",
    passos: [
      { titulo: "Flexibilizar\nregras rígidas", desc: "Experimentos comportamentais com \"erros\" controlados" },
      { titulo: "Tolerância ao\n\"bom o suficiente\"", desc: "Substituir o padrão de perfeição pelo padrão funcional" },
      { titulo: "Delegar e\nconfiar", desc: "Praticar ceder controle de tarefas, de forma progressiva" },
      { titulo: "Conexão\nemocional", desc: "Trabalhar expressão afetiva além da competência e da tarefa" },
    ],
    notaFinal: "Como o padrão é ego-sintônico, a motivação pra mudar costuma vir do custo funcional (esgotamento, conflitos) — não da percepção de que o perfeccionismo em si é o problema.",
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 11,
    titulo: "Passos 1 e 2, na prática",
    colunas: [
      {
        numero: 1, titulo: "Flexibilizar regras rígidas",
        fala: "“Vamos tentar deixar essa tarefa com um pequeno erro proposital, e observar juntos o que realmente acontece.”",
        bullets: ["Use experimentos comportamentais com \"erros\" controlados e de baixo risco", "Registre a discrepância entre a catástrofe prevista e o resultado real"],
      },
      {
        numero: 2, titulo: "Tolerância ao \"bom o suficiente\"",
        bullets: ["Defina, junto com o paciente, o que conta como \"suficientemente bom\" antes de iniciar a tarefa", "Trabalhe o desconforto de parar antes da perfeição percebida como habilidade a ser praticada"],
      },
    ],
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 12,
    titulo: "Passos 3 e 4, na prática",
    colunas: [
      {
        numero: 3, titulo: "Delegar e confiar",
        bullets: ["Comece delegando tarefas de baixo impacto, com critério de sucesso claramente definido antes", "Resista à tentação de refazer o trabalho delegado — isso reforça a crença de que só o próprio padrão é confiável"],
      },
      {
        numero: 4, titulo: "Conexão emocional",
        fala: "“Como foi pra você, não só o que foi feito — dá pra explorar isso também?”",
        bullets: ["Introduza perguntas que priorizem experiência emocional, não apenas desempenho ou tarefa", "Trabalhe a diferença entre ser produtivo e ser presente na relação"],
      },
    ],
  });

  deck.slideCaso(pres, {
    rodape: RODAPE_DECK, pageNum: 13,
    vinheta: "Fernando, 44 anos, gerente de projetos, procura terapia a pedido da esposa, que reclama que ele \"trata a casa como uma planilha\". Fernando relata que refaz o trabalho dos subordinados porque \"ninguém faz do jeito certo\", trabalha regularmente até tarde revisando detalhes que \"a maioria nem notaria\", e diz não entender por que a esposa se queixa, já que ele \"só está tentando fazer tudo bem feito\". Não vê problema algum em seu próprio comportamento.",
    perguntas: [
      "Que elementos da vinheta ilustram os 3 traços centrais do TPOC?",
      "Por que Fernando não reconhece seu padrão como problema — o que isso ilustra sobre a natureza ego-sintônica do quadro?",
      "Que passo do manejo você aplicaria primeiro, considerando que Fernando não busca ajuda para o perfeccionismo em si?",
    ],
  });

  deck.slideEncaminhamento(pres, {
    rodape: RODAPE_DECK, pageNum: 14,
    criterios: [
      "Sinais de esgotamento físico e emocional associados ao padrão de controle: ativar o protocolo do Módulo 4.3 (Burnout)",
      "Comorbidade com Transtorno de Ansiedade Generalizada, relativamente comum nesse perfil",
      "Conflitos conjugais ou familiares recorrentes gerados pela rigidez, considerar terapia de casal complementar",
      "Diferenciar sempre de TOC (Módulo 4.8) antes de definir o plano — a abordagem terapêutica muda conforme o diagnóstico",
    ],
  });

  deck.slideRecap(pres, {
    rodape: RODAPE_DECK, pageNum: 15,
    pontos: [
      "TPOC não é TOC — é um estilo de personalidade ego-sintônico, não sintomas intrusivos indesejados",
      "Perfeccionismo disfuncional, rigidez e necessidade excessiva de controle são os 3 traços centrais",
      "PID-5, SCID-5-PD e Frost MPS estruturam a avaliação dimensional, categorial e do perfeccionismo específico",
      "O manejo flexibiliza regras aos poucos, e a motivação pra mudar costuma vir do custo funcional, não da autopercepção do problema",
    ],
    proximoTexto: "Módulo 4.19 concluído — fim do bloco de Transtornos de Personalidade →",
  });

  return pres.writeFile({ fileName: "Modulo-4.19-TP-Obsessivo-Compulsiva.pptx" });
}

// ============================================================
// 2) EXERCÍCIOS
// ============================================================
function construirExercicios() {
  const children = [
    ...doc.capa(KICKER, "Exercícios — TPOC", "Resolva individualmente antes da sessão de supervisão. O objetivo é testar sua leitura do mecanismo e do manejo antes de comparar com a discussão em grupo — não há problema em errar."),

    doc.exNum(1, "O mecanismo, em suas palavras"),
    doc.pergunta(1, "Explique em até 3 frases, sem jargão técnico, a diferença entre um traço ego-sintônico e um sintoma ego-distônico, usando TPOC e TOC como exemplo."),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Por que confrontar diretamente o perfeccionismo costuma gerar resistência nesse perfil?"),
    ...doc.linhaResposta(2),

    doc.exNum(2, "Diagnóstico diferencial — TPOC x TOC"),
    doc.tabelaSimples(["Característica", "TOC (Módulo 4.8)", "TPOC (Módulo 4.19)"], [["Relação com o sintoma", "", ""], ["Fonte de sofrimento", "", ""]], [3000, 3100, 3250]),

    doc.exNum(3, "Flexibilizar regras rígidas"),
    doc.vinhetaBox("Um paciente se recusa a entregar um relatório porque \"ainda não está perfeito\", mesmo com o prazo vencido há dois dias."),
    doc.pergunta(1, "Descreva um experimento comportamental (passo 1) que você proporia nesse caso."),
    ...doc.linhaResposta(3),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),

    doc.exNum(4, "Delegar e confiar"),
    doc.pergunta(1, "Por que refazer o trabalho delegado reforça, em vez de reduzir, o padrão de controle excessivo?"),
    ...doc.linhaResposta(2),

    doc.exNum(5, "Caso integrado — Fernando"),
    doc.vinhetaBox("Fernando, 44 anos, refaz o trabalho dos subordinados, trabalha até tarde revisando detalhes desnecessários, e não entende por que a esposa reclama, já que ele \"só está tentando fazer tudo bem feito\". Não reconhece problema no próprio comportamento."),
    doc.pergunta(1, "Identifique os 3 traços centrais presentes na vinheta."),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Que critério de encaminhamento (dentre os 4 estudados) pode estar relacionado ao trabalho até tarde revisando detalhes?"),
    ...doc.linhaResposta(1),
    doc.pergunta(3, "Considerando que Fernando não busca ajuda para o perfeccionismo em si, por onde você começaria o manejo?"),
    ...doc.linhaResposta(2),
  ];

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-4.19-Exercicios.docx");
}

// ============================================================
// 3) AVALIAÇÃO
// ============================================================
function construirProva() {
  const objetivas = [
    ["No TPOC, o sistema de recompensa responde predominantemente a:", ["Ordem, controle e competência em si, não ao alívio de ansiedade intrusiva", "Exclusivamente à aprovação social externa", "Nenhum tipo de reforço identificável", "Apenas a estímulos de recompensa financeira"]],
    ["Os circuitos de flexibilidade cognitiva, nesse perfil, tendem a mostrar:", ["Menor capacidade de alternar entre regras", "Maior capacidade de adaptação a qualquer contexto novo", "Nenhuma alteração relevante em relação à população geral", "Hiperfunção exclusivamente durante tarefas motoras"]],
    ["Os 3 traços centrais do TPOC são:", ["Perfeccionismo disfuncional, rigidez/inflexibilidade, necessidade excessiva de controle", "Grandiosidade, necessidade de admiração, falta de empatia", "Hipersensibilidade à crítica, sentimento de inadequação, inibição social", "Dificuldade de decidir sem orientação, delegação de responsabilidade, medo de separação"]],
    ["A principal diferença entre TOC e TPOC é:", ["TOC é ego-distônico (sintomas indesejados); TPOC é ego-sintônico (traços vividos como identidade)", "Não há diferença clínica relevante entre eles", "TPOC sempre envolve rituais compulsivos específicos", "TOC nunca envolve pensamento rígido"]],
    ["Instrumento que mede as dimensões específicas do perfeccionismo disfuncional:", ["Frost Multidimensional Perfectionism Scale", "PCL-R", "ZAN-BPD", "MSI-BPD"]],
    ["Por que a motivação pra mudar, nesse perfil, costuma vir do custo funcional, e não da autopercepção do problema?", ["Porque os traços são ego-sintônicos — vividos como parte da identidade, não como sintoma", "Porque o paciente nunca sofre com as consequências do próprio padrão", "Porque TPOC sempre inclui total ausência de insight sobre qualquer aspecto da vida", "Porque não existe qualquer consequência funcional associada a esse transtorno"]],
    ["O passo \"flexibilizar regras rígidas\" recomenda, na prática:", ["Experimentos comportamentais com \"erros\" controlados e de baixo risco", "Eliminar completamente qualquer padrão de qualidade do paciente", "Confrontar diretamente e de forma intensa a rigidez logo na primeira sessão", "Evitar qualquer tipo de tarefa prática durante o tratamento"]],
    ["Por que refazer o trabalho delegado pelo paciente é um erro técnico no passo \"delegar e confiar\"?", ["Porque reforça a crença de que só o próprio padrão do paciente é confiável", "Porque delegação nunca deve ser trabalhada nesse perfil", "Porque não há qualquer relação entre isso e o padrão de controle", "Porque é sempre tecnicamente impossível delegar tarefas"]],
    ["Diante de sinais de esgotamento físico e emocional associados ao padrão de controle, o módulo recomenda:", ["Ativar o protocolo do Módulo 4.3 (Burnout)", "Ignorar, pois esgotamento é esperado e não deve ser tratado nesse perfil", "Aumentar imediatamente a carga de tarefas do paciente", "Encaminhar exclusivamente para avaliação neuropsicológica, sem outra intervenção"]],
    ["Antes de definir o plano terapêutico, o módulo recomenda diferenciar TPOC de:", ["TOC (Módulo 4.8), pois a abordagem terapêutica muda conforme o diagnóstico", "Nenhum outro transtorno, pois o diagnóstico é sempre óbvio", "Apenas transtornos do humor, sem necessidade de outras diferenciações", "TDAH exclusivamente, ignorando outras hipóteses"]],
  ];
  const gabaritoObjetivas = ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a"];

  const children = [
    ...doc.capa(KICKER, "Avaliação — TPOC", `Avaliação formativa de encerramento do Módulo ${MOD}.`),
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
    doc.vinhetaBox("Marina, 37 anos, contadora, é encaminhada pelo médico do trabalho após um episódio de exaustão extrema. Relata que revisa cada planilha \"pelo menos cinco vezes\" antes de considerar pronta, não delega nada à equipe \"porque vão errar\", e trabalha rotineiramente até tarde da noite. Diz não entender por que está exausta, já que \"só estou fazendo meu trabalho direito\", e minimiza qualquer sugestão de que seu padrão de trabalho possa ser parte do problema."),
    new doc.Paragraph({ spacing: { before: 240 }, children: [new doc.TextRun({ text: "Com base no protocolo estudado, responda:", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    new doc.Paragraph({ spacing: { before: 220, after: 40 }, children: [new doc.TextRun({ text: "a) (10 pts) Identifique os 3 traços centrais do TPOC presentes na vinheta.", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "b) (10 pts) Que módulo deste curso deveria ser ativado diante do episódio de exaustão extrema, e por quê?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "c) (10 pts) Por que Marina minimiza a relação entre seu padrão de trabalho e a exaustão? Relacione com a natureza ego-sintônica do quadro.", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "d) (10 pts) Descreva como você aplicaria o passo \"delegar e confiar\" com Marina.", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    new doc.Paragraph({ spacing: { after: 40 }, children: [new doc.TextRun({ text: "USO EXCLUSIVO DO INSTRUTOR — remover antes de aplicar a prova", bold: true, color: doc.TERRA, font: doc.FONT, size: 20 })] }),
    doc.tituloH1("Gabarito"),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 1 — Questões objetivas", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 200 }, children: [new doc.TextRun({ text: gabaritoObjetivas.map((r, i) => `${i + 1}-${r}`).join("   ·   "), font: doc.FONT, size: 22, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 2 — Critério de correção da questão de caso", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "a) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Perfeccionismo disfuncional (revisar cinco vezes), rigidez/inflexibilidade (padrão fixo de trabalho), e necessidade excessiva de controle (não delega porque \"vão errar\").", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "b) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Módulo 4.3 (Burnout) — o episódio de exaustão extrema associado ao padrão de controle exige ativação direta desse protocolo.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "c) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Porque o padrão é ego-sintônico — Marina vive seu perfeccionismo como \"fazer o trabalho direito\", parte de quem ela é, não como um sintoma a ser questionado.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "d) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Começar delegando tarefas de baixo impacto com critério de sucesso definido antes, e resistir à tentação de refazer o trabalho da equipe, mesmo que o resultado não seja idêntico ao dela.", font: doc.FONT, size: 21, color: doc.INK })] }),
  );

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-4.19-Avaliacao.docx");
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
      n: 1, titulo: "TPOC não é TOC", duracao: "12 min", slides: "1, 2, 3, 4",
      objetivo: "Sair sabendo explicar a diferença ego-sintônico versus ego-distônico entre TPOC e TOC, sem jargão.",
      segmentos: [
        seg("0:00–0:45", "Abertura (gancho)", [{ fala: "TPOC não é TOC com outro nome — no TOC, a pessoa sofre com pensamentos intrusivos que não quer ter; no TPOC, a rigidez e o controle são sentidos como o jeito certo de ser, não como sintoma." }]),
        seg("0:45–2:00", "Por que essa distinção importa", ["Ego-distônico versus ego-sintônico muda completamente a entrada terapêutica.", "Aqui, o paciente raramente chega pedindo ajuda com o perfeccionismo em si."]),
        seg("2:00–8:00", "Por que rigidez e controle viram identidade (mostrar slide 4)", [
          "Córtex pré-frontal dorsolateral com hiperengajamento no controle cognitivo.",
          "Circuitos de flexibilidade cognitiva com menor capacidade de alternar regras.",
          "Sistema de recompensa reforçado por ordem e controle, não por alívio de ansiedade intrusiva.",
          "Amígdala ativada diante de imprevisibilidade ou perda de controle percebida.",
        ]),
        seg("8:00–10:30", "Um ponto importante", ["Essa é a distinção neurobiológica central entre TPOC e TOC."]),
        seg("10:30–12:00", "Fechamento", [{ fala: "Próxima aula: como esse padrão se consolida ao longo do desenvolvimento." }]),
      ],
    },
    {
      n: 2, titulo: "Da necessidade de controle à identidade rígida", duracao: "10 min", slides: "5",
      objetivo: "Explicar como o temperamento e o ambiente formam a identidade centrada em competência/correção.",
      segmentos: [
        seg("0:00–1:00", "Retomada rápida", ["Vimos as estruturas envolvidas. Hoje vemos como o padrão se forma ao longo do tempo."]),
        seg("1:00–6:30", "A cadeia (mostrar slide 5)", ["Temperamento com alta necessidade de previsibilidade.", "Ambiente com expectativas rígidas de desempenho.", "Identidade construída em torno de competência/correção.", "TPOC: padrão pervasivo de rigidez, perfeccionismo e controle."]),
        seg("6:30–9:00", "Por que confrontar direto costuma falhar", ["O perfeccionismo não é sentido como problema — é sentido como quem a pessoa é."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: os 3 traços centrais do TPOC." }]),
      ],
    },
    {
      n: 3, titulo: "Os 3 traços centrais", duracao: "10 min", slides: "6",
      objetivo: "Reconhecer perfeccionismo disfuncional, rigidez e necessidade excessiva de controle.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três traços — todos vividos como identidade, não como sintoma."]),
        seg("1:00–7:00", "Os 3 traços (mostrar slide 6)", [
          "Perfeccionismo disfuncional: padrões tão altos que paralisam.",
          "Rigidez e inflexibilidade: dificuldade de adaptar regras a contextos novos.",
          "Necessidade excessiva de controle: sobre tarefas, tempo e pessoas.",
        ]),
        seg("7:00–9:00", "O ponto-chave", ["São traços ego-sintônicos — vividos como parte da identidade, não como sintomas indesejados."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: como reconhecer esse padrão nas 4 dimensões clínicas." }]),
      ],
    },
    {
      n: 4, titulo: "Sinais de alerta", duracao: "10 min", slides: "7",
      objetivo: "Reconhecer sinais cognitivos, comportamentais, relacionais e físicos do padrão TPOC.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Reconhecer o padrão com precisão orienta a diferenciação com TOC, o próximo passo."]),
        seg("1:00–7:30", "As 4 categorias (mostrar slide 7)", [
          "Cognitivo: pensamento rígido, regras tratadas como absolutas.",
          "Comportamental: procrastinação por perfeccionismo, dificuldade de delegar.",
          "Relacional: dificuldade de expressar afeto, relações vividas como tarefas.",
          "Físico: tensão crônica associada à hipervigilância de controle.",
        ]),
        seg("7:30–9:00", "Por que isso importa", ["Esses sinais orientam a construção do plano de manejo, mesmo quando o paciente não os nomeia como problema."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: como diferenciar de quadros parecidos, incluindo o TOC." }]),
      ],
    },
    {
      n: 5, titulo: "Diagnóstico diferencial rápido", duracao: "12 min", slides: "8",
      objetivo: "Diferenciar TPOC de TOC (Módulo 4.8), perfeccionismo adaptativo e TAG.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["A diferenciação mais importante deste módulo — e uma das mais confundidas na prática clínica."]),
        seg("1:00–8:00", "Os 3 comparativos (mostrar slide 8)", [
          "TOC (Módulo 4.8): ego-distônico, sintomas intrusivos indesejados; TPOC é estilo de personalidade ego-sintônico.",
          "Perfeccionismo adaptativo: funcional, flexível conforme o contexto, sem prejuízo funcional.",
          "TAG: preocupação difusa e generalizada, diferente da necessidade específica de ordem e controle.",
        ]),
        seg("8:00–11:00", "Por que a diferenciação com TOC é tão importante", ["Muda completamente a abordagem terapêutica — revise o Módulo 4.8 se tiver dúvida nesse ponto."]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Próxima aula: os instrumentos que confirmam essa leitura com dado." }]),
      ],
    },
    {
      n: 6, titulo: "Os 3 instrumentos de avaliação", duracao: "11 min", slides: "9",
      objetivo: "Saber quando usar PID-5, SCID-5-PD e Frost Multidimensional Perfectionism Scale.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três instrumentos, três finalidades — um deles é específico pras dimensões do perfeccionismo."]),
        seg("1:00–4:30", "PID-5", ["Mapeia os traços patológicos de forma dimensional."]),
        seg("4:30–7:30", "SCID-5-PD", ["Entrevista estruturada.", "Padrão-ouro pra diagnóstico categorial formal."]),
        seg("7:30–10:00", "Frost MPS", ["Mede as dimensões específicas do perfeccionismo disfuncional."]),
        seg("10:00–11:00", "Fechamento", [{ fala: "Próxima aula: colocamos tudo em prática — flexibilizar regras e tolerar o bom o suficiente." }]),
      ],
    },
    {
      n: 7, titulo: "Manejo — flexibilizar regras e tolerar o bom o suficiente", duracao: "13 min", slides: "10, 11",
      objetivo: "Aplicar os passos 1 e 2 do manejo, com experimentos comportamentais controlados.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["A parte prática central desse módulo. Hoje, os 2 primeiros passos."]),
        seg("1:00–2:00", "Visão geral (mostrar slide 10)", ["Flexibilizar regras rígidas → Tolerância ao \"bom o suficiente\" → Delegar e confiar → Conexão emocional.", "A motivação pra mudar costuma vir do custo funcional, não da autopercepção do problema."]),
        seg("2:00–7:00", "Passo 1 — Flexibilizar regras rígidas (mostrar slide 11, esquerda)", [{ fala: "Vamos tentar deixar essa tarefa com um pequeno erro proposital, e observar juntos o que realmente acontece." }, "Registre a discrepância entre a catástrofe prevista e o resultado real."]),
        seg("7:00–12:00", "Passo 2 — Tolerância ao \"bom o suficiente\" (mostrar slide 11, direita)", ["Defina, junto com o paciente, o que conta como suficientemente bom antes de iniciar a tarefa.", "Trabalhe o desconforto de parar antes da perfeição como habilidade a ser praticada."]),
        seg("12:00–13:00", "Fechamento", [{ fala: "Próxima aula: delegar e confiar, e conexão emocional." }]),
      ],
    },
    {
      n: 8, titulo: "Manejo — delegar e confiar, e conexão emocional", duracao: "13 min", slides: "12",
      objetivo: "Trabalhar delegação progressiva e priorizar experiência emocional além da tarefa.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Hoje fechamos o manejo com o trabalho relacional mais profundo do módulo."]),
        seg("1:00–7:00", "Passo 3 — Delegar e confiar (mostrar slide 12, esquerda)", ["Comece com tarefas de baixo impacto e critério de sucesso claro.", "Resista à tentação de refazer o trabalho delegado."]),
        seg("7:00–12:00", "Passo 4 — Conexão emocional (mostrar slide 12, direita)", [{ fala: "Como foi pra você, não só o que foi feito — dá pra explorar isso também?" }, "Trabalhe a diferença entre ser produtivo e ser presente na relação."]),
        seg("12:00–13:00", "Fechamento", [{ fala: "Manejo completo. Próxima aula: um caso real e os critérios de quando escalar." }]),
      ],
    },
    {
      n: 9, titulo: "Estudo de caso, encaminhamento e recap", duracao: "15 min", slides: "13, 14, 15",
      objetivo: "Integrar mecanismo, instrumento e manejo num caso completo, com ênfase na conexão com o protocolo de burnout.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Última aula do módulo — e do bloco inteiro de Transtornos de Personalidade. Caso completo e os critérios de escalonamento."]),
        seg("1:00–7:00", "Estudo de caso — Fernando (mostrar slide 13)", ["Leia a vinheta com calma.", "Percorra as 3 perguntas de discussão.", "Convide o aluno a pausar e responder por escrito."]),
        seg("7:00–11:00", "Quando encaminhar (mostrar slide 14)", ["Percorra os 4 critérios — reforce a conexão direta com o Módulo 4.3 (Burnout) diante de sinais de esgotamento."]),
        seg("11:00–14:00", "Recapitulando o módulo (mostrar slide 15)", ["Retome os 4 pontos-chave.", "Reforce a distinção central: TPOC como identidade ego-sintônica, não como sintoma intrusivo."]),
        seg("14:00–15:00", "Fechamento do módulo e do bloco", [{ fala: "Agora é hora dos exercícios e da avaliação. Com isso, encerramos o bloco completo de Transtornos de Personalidade." }]),
      ],
    },
  ];

  const totalMin = 12 + 10 + 10 + 10 + 12 + 11 + 13 + 13 + 15;

  const children = [
    ...doc.capa(KICKER, "Roteiro de Aulas — TPOC", "Módulo dividido em 9 vídeo-aulas de 10 a 15 minutos, seguindo os slides já produzidos. Cada aula tem roteiro cronometrado, pronto pra gravação."),
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

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", `${RODAPE_DOC} — Roteiro de Aulas`, children), "Modulo-4.19-Roteiro-Aulas.docx");
}

// ============================================================
Promise.resolve()
  .then(construirDeck)
  .then(construirExercicios)
  .then(construirProva)
  .then(construirRoteiro)
  .then(() => console.log("TUDO PRONTO"))
  .catch((e) => { console.error(e); process.exit(1); });

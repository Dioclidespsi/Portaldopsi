const deck = require("../_lib/lib-deck.js");
const doc = require("../_lib/lib-doc.js");

const MOD = "4.21";
const NOME = "Transtornos Alimentares";
const RODAPE_DECK = `Transtornos Alimentares — Módulo ${MOD}`;
const RODAPE_DOC = `Módulo ${MOD} — Transtornos Alimentares`;
const KICKER = "MÓDULO 4.21 · PROTOCOLOS CLÍNICOS";

// ============================================================
// 1) SLIDE DECK
// ============================================================
function construirDeck() {
  const pres = deck.novaApresentacao(`${NOME} — Da Neurociência ao Protocolo Clínico`);

  deck.slideTitulo(pres, {
    moduloLabel: `Módulo ${MOD} · Protocolos Clínicos`,
    titulo: "Transtornos Alimentares",
    subtitulo: "Quando o controle sobre a comida vira o problema",
    passos: ["Mecanismo", "Sinais", "Instrumento", "Protocolo", "Encaminhamento"],
  });

  deck.slideRoteiro(pres, {
    rodape: RODAPE_DECK, pageNum: 2,
    cards: [
      { titulo: "Mecanismo", desc: "Por que restringir alimenta o próprio ciclo" },
      { titulo: "Sinais", desc: "Restrição, compulsão e a distorção da imagem corporal" },
      { titulo: "Instrumento", desc: "EAT-26 e EDE-Q na prática" },
      { titulo: "Protocolo", desc: "4 passos, sempre em equipe multiprofissional" },
      { titulo: "Encaminhamento", desc: "Quando o risco médico vem antes do trabalho psicológico" },
    ],
  });

  deck.slideHook(pres, {
    rodape: RODAPE_DECK, pageNum: 3,
    frase: "Nos transtornos alimentares, restringir não é só uma escolha que sai do controle — a própria restrição altera a forma como o cérebro processa fome, saciedade e recompensa, criando um ciclo que se sustenta sozinho.",
    apoio: "É por isso que \"força de vontade\" nunca foi a explicação certa, e por que o primeiro passo do protocolo quase sempre é médico, não psicológico.",
  });

  deck.slideCircuito(pres, {
    rodape: RODAPE_DECK, pageNum: 4,
    titulo: "Por que a restrição se sustenta sozinha",
    regioes: [
      { label: "Ínsula (processamento interoceptivo distorcido de fome e saciedade)", rx: 0.20, ry: 0.22, color: deck.NAVY, d: 0.5 },
      { label: "Sistema de recompensa (resposta alterada a alimentos, conforme o subtipo)", rx: 0.22, ry: 0.62, color: deck.TERRA, d: 0.4 },
      { label: "Córtex pré-frontal (controle rígido e excessivo sobre o impulso alimentar)", rx: 0.60, ry: 0.60, color: deck.NAVY_TINT, d: 0.36 },
      { label: "Circuito de imagem corporal (distorção da autopercepção da forma física)", rx: 0.58, ry: 0.24, color: deck.TERRA_TINT, d: 0.36 },
    ],
    notas: [
      "A ínsula, responsável por processar sinais internos do corpo, distorce a percepção de fome e saciedade — parte de por que a fome real deixa de ser um guia confiável.",
      "O sistema de recompensa responde de forma alterada a alimentos: reduzida na restrição, amplificada em episódios de compulsão.",
      "O córtex pré-frontal exerce controle rígido e excessivo sobre o impulso alimentar na restrição, o oposto do que ocorre na compulsão, onde esse controle falha.",
    ],
  });

  deck.slideCadeia(pres, {
    rodape: RODAPE_DECK, pageNum: 5,
    titulo: "Da dieta inicial ao ciclo consolidado",
    elos: [
      { titulo: "Perfeccionismo e ansiedade", desc: "Combinado a pressão sociocultural de magreza e valorização do controle" },
      { titulo: "Restrição alimentar inicial", desc: "Muitas vezes começa como dieta comum, sem intenção patológica" },
      { titulo: "Adaptação neurobiológica", desc: "A restrição reforça, paradoxalmente, a sensação de controle e competência" },
      { titulo: "Ciclo consolidado", desc: "Padrão alimentar disfuncional que se sustenta independente da intenção original" },
    ],
    notaFinal: "É por isso que o transtorno raramente é sobre comida em si — a restrição vira, ao longo do tempo, uma forma (disfuncional) de regular emoção e sensação de controle.",
  });

  deck.slideCategorias(pres, {
    rodape: RODAPE_DECK, pageNum: 6,
    titulo: "3 traços centrais",
    categorias: [
      { titulo: "Restrição alimentar/controle", desc: "Regras rígidas sobre o que, quando e quanto comer", color: deck.NAVY },
      { titulo: "Distorção da imagem corporal", desc: "Peso e forma como base central da autoavaliação", color: deck.TERRA },
      { titulo: "Comportamento compensatório", desc: "Purgação, exercício excessivo ou jejum após episódios de ingestão", color: deck.NAVY_TINT },
    ],
    notaFinal: "Anorexia, Bulimia e Transtorno de Compulsão Alimentar diferem principalmente na combinação e intensidade desses 3 traços, não em traços totalmente distintos.",
  });

  deck.slideSinais(pres, {
    rodape: RODAPE_DECK, pageNum: 7,
    titulo: "Como reconhecer o padrão na prática",
    itens: [
      { titulo: "Cognitivo", desc: "Pensamento dicotômico sobre comida (\"bom/ruim\"), supervalorização do peso na autoavaliação" },
      { titulo: "Comportamental", desc: "Rituais alimentares, evitação de refeições sociais, exercício compulsivo" },
      { titulo: "Relacional", desc: "Isolamento social em torno de refeições, conflitos familiares frequentes" },
      { titulo: "Físico", desc: "Sinais de desnutrição, alterações menstruais, flutuações extremas de peso" },
    ],
  });

  deck.slideDiferencial(pres, {
    rodape: RODAPE_DECK, pageNum: 8,
    titulo: "Diagnóstico diferencial rápido",
    cards: [
      { titulo: "Anorexia x Bulimia x TCA", desc: "Diferenciar por peso corporal e presença ou ausência de comportamento purgativo" },
      { titulo: "TOC (Módulo 4.8)", desc: "Rituais alimentares aqui servem ao controle de peso/forma, não à redução de ansiedade sobre conteúdo obsessivo distinto" },
      { titulo: "Transtorno Dismórfico Corporal", desc: "Preocupação não limitada a peso/forma, mas a características corporais específicas" },
    ],
  });

  deck.slideInstrumentos(pres, {
    rodape: RODAPE_DECK, pageNum: 9,
    titulo: "Dois instrumentos e um dado objetivo",
    instrumentos: [
      { sigla: "EAT-26", nome: "Eating Attitudes Test", desc: "Triagem rápida de atitudes e comportamentos alimentares de risco." },
      { sigla: "EDE-Q", nome: "Eating Disorder Examination Questionnaire", desc: "Avaliação mais detalhada dos sintomas centrais do transtorno." },
      { sigla: "IMC/histórico", nome: "Índice de Massa Corporal e histórico ponderal", desc: "Dado objetivo complementar, nunca isolado do quadro clínico completo." },
    ],
  });

  deck.slideProtocoloOverview(pres, {
    rodape: RODAPE_DECK, pageNum: 10,
    titulo: "Do mecanismo ao protocolo: 4 passos",
    passos: [
      { titulo: "Estabilização\nmédica", desc: "Sempre o primeiro passo, em equipe multiprofissional" },
      { titulo: "Normalização\nalimentar", desc: "Reintrodução gradual, sem negociar as regras do paciente" },
      { titulo: "Reestruturação\nda imagem corporal", desc: "Trabalhar a relação com peso e forma além do número" },
      { titulo: "Prevenção\nde recaída", desc: "Atenção a gatilhos como dietas e comentários sobre peso" },
    ],
    notaFinal: "O trabalho psicológico profundo só avança com segurança quando o risco médico está estabilizado — essa ordem não é negociável.",
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 11,
    titulo: "Passos 1 e 2, na prática",
    colunas: [
      {
        numero: 1, titulo: "Estabilização médica",
        bullets: ["Trabalhe sempre em equipe com médico e nutricionista — nunca isoladamente", "Priorize sinais de risco (IMC crítico, alterações eletrolíticas) antes de qualquer intervenção psicológica profunda"],
      },
      {
        numero: 2, titulo: "Normalização do padrão alimentar",
        fala: "“Vamos reconstruir um padrão de alimentação regular, com apoio, sem negociar as regras que a restrição impôs até aqui.”",
        bullets: ["Reintroduza refeições de forma gradual e estruturada, com apoio da equipe nutricional", "Evite negociar exceções às regras alimentares rígidas do paciente durante esse processo"],
      },
    ],
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 12,
    titulo: "Passos 3 e 4, na prática",
    colunas: [
      {
        numero: 3, titulo: "Reestruturação da imagem corporal",
        bullets: ["Trabalhe a diferença entre valor pessoal e peso/forma corporal", "Questione o pensamento dicotômico sobre comida (\"bom/ruim\") de forma gradual"],
      },
      {
        numero: 4, titulo: "Prevenção de recaída",
        bullets: ["Identifique gatilhos específicos: novas dietas, comentários sobre peso, transições de vida", "Construa um plano de ação combinado pra momentos de maior risco de recaída"],
      },
    ],
  });

  deck.slideCaso(pres, {
    rodape: RODAPE_DECK, pageNum: 13,
    vinheta: "Beatriz, 22 anos, é trazida pela mãe, que notou perda de peso significativa nos últimos meses. Beatriz relata que \"só está sendo mais saudável\", mas evita refeições em família, tem regras rígidas sobre o que pode comer, e afirma se sentir \"gorda\" mesmo com o peso atual visivelmente abaixo do esperado. Relata amenorreia há 3 meses e cansaço constante, mas minimiza esses sintomas.",
    perguntas: [
      "Que elementos da vinheta ilustram os 3 traços centrais dos transtornos alimentares?",
      "Que sinais físicos exigem avaliação médica imediata, independente de qualquer trabalho psicológico?",
      "Por que insistir em \"convencer\" Beatriz a comer mais, sem envolver a equipe médica, seria uma abordagem arriscada?",
    ],
  });

  deck.slideEncaminhamento(pres, {
    rodape: RODAPE_DECK, pageNum: 14,
    criterios: [
      "IMC crítico ou sinais de instabilidade médica (alterações eletrolíticas, cardíacas): encaminhamento emergencial",
      "Equipe multiprofissional obrigatória — médico e nutricionista trabalhando junto com a psicoterapia, não depois dela",
      "Comorbidade com depressão, ansiedade ou TOC, relativamente comum nesse perfil",
      "Amenorreia, desmaios ou sinais de desnutrição significativa: avaliação médica antes de aprofundar o trabalho psicológico",
    ],
  });

  deck.slideRecap(pres, {
    rodape: RODAPE_DECK, pageNum: 15,
    pontos: [
      "A restrição alimentar altera o processamento neurobiológico de fome, saciedade e recompensa, sustentando o próprio ciclo do transtorno",
      "Restrição/controle, distorção da imagem corporal e comportamento compensatório são os 3 traços centrais",
      "EAT-26 e EDE-Q estruturam a triagem e avaliação detalhada, sempre com IMC e histórico ponderal como dado complementar",
      "O protocolo começa sempre pela estabilização médica em equipe multiprofissional — essa ordem não é negociável",
    ],
    proximoTexto: "Próximo: exercícios práticos e avaliação do Módulo 4.21 →",
  });

  return pres.writeFile({ fileName: "Modulo-4.21-Transtornos-Alimentares.pptx" });
}

// ============================================================
// 2) EXERCÍCIOS
// ============================================================
function construirExercicios() {
  const children = [
    ...doc.capa(KICKER, "Exercícios — Transtornos Alimentares", "Resolva individualmente antes da sessão de supervisão. O objetivo é testar sua leitura do mecanismo e do protocolo antes de comparar com a discussão em grupo — não há problema em errar."),

    doc.exNum(1, "O mecanismo, em suas palavras"),
    doc.pergunta(1, "Explique em até 3 frases, sem jargão técnico, por que \"força de vontade\" não é a explicação certa pra restrição alimentar persistente."),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Por que a ínsula tem papel central na distorção da percepção de fome e saciedade?"),
    ...doc.linhaResposta(2),

    doc.exNum(2, "Diagnóstico diferencial"),
    doc.vinhetaBox("Um paciente segue rituais rígidos antes de cada refeição, mas o objetivo declarado é reduzir peso e controlar a forma corporal, não aliviar uma preocupação obsessiva de conteúdo distinto."),
    doc.pergunta(1, "Transtorno Alimentar ou TOC (Módulo 4.8)? Justifique com base na função do ritual."),
    ...doc.linhaResposta(2),

    doc.exNum(3, "Ordem do protocolo"),
    doc.p("Explique por que a ordem dos 4 passos do protocolo não pode ser alterada — em particular, por que o passo 1 vem sempre antes do passo 3."),
    ...doc.linhaResposta(3),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),

    doc.exNum(4, "Sinais de risco médico"),
    doc.p("Liste 3 sinais físicos que exigiriam avaliação médica imediata antes de continuar qualquer trabalho psicológico profundo."),
    doc.tabelaSimples(["Nº", "Sinal físico de risco"], [["1", ""], ["2", ""], ["3", ""]], [1200, 8150]),

    doc.exNum(5, "Caso integrado — Beatriz"),
    doc.vinhetaBox("Beatriz, 22 anos, perda de peso significativa, evita refeições em família, regras rígidas sobre comida, sente-se \"gorda\" apesar do peso abaixo do esperado, amenorreia há 3 meses, minimiza os sintomas."),
    doc.pergunta(1, "Identifique os 3 traços centrais presentes na vinheta."),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Que sinais exigem avaliação médica imediata, independente do trabalho psicológico?"),
    ...doc.linhaResposta(2),
    doc.pergunta(3, "Por que insistir sozinho, sem equipe médica, seria uma abordagem arriscada nesse caso?"),
    ...doc.linhaResposta(2),
  ];

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-4.21-Exercicios.docx");
}

// ============================================================
// 3) AVALIAÇÃO
// ============================================================
function construirProva() {
  const objetivas = [
    ["A ínsula, nos transtornos alimentares, está associada a:", ["Processamento interoceptivo distorcido de fome e saciedade", "Aumento da capacidade de memória de longo prazo", "Nenhuma relação com o quadro clínico", "Melhora da regulação do sono"]],
    ["O córtex pré-frontal, na restrição alimentar, tende a exercer:", ["Controle rígido e excessivo sobre o impulso alimentar", "Nenhum controle sobre o comportamento alimentar", "Controle idêntico ao observado na compulsão alimentar", "Função exclusivamente motora, sem relação com alimentação"]],
    ["Os 3 traços centrais dos transtornos alimentares são:", ["Restrição/controle, distorção da imagem corporal, comportamento compensatório", "Grandiosidade, necessidade de admiração, falta de empatia", "Hipersensibilidade à crítica, sentimento de inadequação, inibição social", "Desconsideração por normas, falta de remorso, impulsividade"]],
    ["O que diferencia rituais alimentares de um Transtorno Alimentar dos rituais de TOC?", ["No Transtorno Alimentar, o ritual serve ao controle de peso/forma, não a conteúdo obsessivo distinto", "Não há diferença clínica relevante entre eles", "TOC nunca envolve qualquer ritual relacionado à alimentação", "Transtornos Alimentares nunca envolvem qualquer ritual"]],
    ["Instrumento de triagem rápida de atitudes e comportamentos alimentares de risco:", ["EAT-26 (Eating Attitudes Test)", "PCL-R", "Y-BOCS", "ISI"]],
    ["Por que o IMC e o histórico ponderal nunca devem ser usados isoladamente no diagnóstico?", ["Porque são dados objetivos complementares, que precisam ser interpretados junto ao quadro clínico completo", "Porque esses dados nunca têm qualquer relevância clínica", "Porque substituem completamente a necessidade de outros instrumentos", "Porque são os únicos critérios válidos de diagnóstico"]],
    ["O passo 1 do protocolo (estabilização médica) deve ocorrer:", ["Sempre antes do trabalho psicológico profundo, em equipe multiprofissional", "Apenas depois de completar todos os outros passos", "De forma isolada, sem qualquer envolvimento médico", "Somente se o paciente solicitar explicitamente"]],
    ["Durante a normalização do padrão alimentar (passo 2), o protocolo recomenda:", ["Reintrodução gradual e estruturada, sem negociar as regras rígidas do paciente", "Negociar amplamente todas as exceções que o paciente propuser", "Eliminar completamente o acompanhamento nutricional", "Acelerar o processo o máximo possível, sem gradualismo"]],
    ["Diante de amenorreia e sinais de desnutrição significativa, o módulo recomenda:", ["Avaliação médica antes de aprofundar o trabalho psicológico", "Ignorar, pois são sintomas irrelevantes clinicamente", "Aguardar a evolução espontânea, sem qualquer intervenção", "Focar exclusivamente em reestruturação cognitiva, sem avaliação médica"]],
    ["A comorbidade mais frequentemente associada aos transtornos alimentares, entre as citadas, é:", ["Depressão, ansiedade ou TOC", "Transtorno Bipolar exclusivamente", "TDAH exclusivamente", "Nenhuma comorbidade é observada nesse perfil"]],
  ];
  const gabaritoObjetivas = ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a"];

  const children = [
    ...doc.capa(KICKER, "Avaliação — Transtornos Alimentares", `Avaliação formativa de encerramento do Módulo ${MOD}.`),
    doc.infoBox([
      ["Nota de corte:", "75 de 100 pontos (nota mais alta, dada a relevância da avaliação de risco médico)"],
      ["Tempo sugerido:", "45 minutos"],
      ["Composição:", "10 questões objetivas (6 pts cada = 60 pts) + 1 questão de caso (40 pts)"],
      ["Consulta:", "Material da aula permitido; discussão entre colegas, não"],
    ]),
    doc.tituloH1("Parte 1 — Questões objetivas"),
  ];
  objetivas.forEach((q, i) => children.push(...doc.questaoObjetiva(i + 1, q[0], q[1])));

  children.push(
    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    doc.tituloH1("Parte 2 — Questão de caso (40 pontos)"),
    doc.vinhetaBox("Larissa, 19 anos, procura terapia relatando episódios recorrentes de ingestão de grandes quantidades de comida em pouco tempo, seguidos de vômitos autoinduzidos \"pra não engordar\". Sente muita vergonha desses episódios e os esconde da família. Seu peso está dentro da faixa considerada normal, o que já a fez ser dispensada por um profissional anterior como \"não tendo um problema real\"."),
    new doc.Paragraph({ spacing: { before: 240 }, children: [new doc.TextRun({ text: "Com base no protocolo estudado, responda:", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    new doc.Paragraph({ spacing: { before: 220, after: 40 }, children: [new doc.TextRun({ text: "a) (10 pts) Que elementos da vinheta sustentam a hipótese de Transtorno Alimentar, apesar do peso normal?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "b) (10 pts) Por que a avaliação anterior de \"não ter um problema real\" baseada apenas no peso foi um erro técnico?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "c) (10 pts) Qual deveria ser o primeiro passo do protocolo com Larissa, e por quê?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "d) (10 pts) Que instrumento você usaria pra avaliar detalhadamente os sintomas centrais do quadro de Larissa?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    new doc.Paragraph({ spacing: { after: 40 }, children: [new doc.TextRun({ text: "USO EXCLUSIVO DO INSTRUTOR — remover antes de aplicar a prova", bold: true, color: doc.TERRA, font: doc.FONT, size: 20 })] }),
    doc.tituloH1("Gabarito"),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 1 — Questões objetivas", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 200 }, children: [new doc.TextRun({ text: gabaritoObjetivas.map((r, i) => `${i + 1}-${r}`).join("   ·   "), font: doc.FONT, size: 22, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 2 — Critério de correção da questão de caso", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "a) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Episódios de compulsão alimentar seguidos de comportamento compensatório (vômitos autoinduzidos) e vergonha significativa — o peso normal não descarta Bulimia, que frequentemente ocorre com peso dentro da faixa esperada.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "b) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Porque o IMC e o peso são dados complementares, não critérios isolados — Bulimia e TCA frequentemente ocorrem em pessoas com peso normal, e ignorar isso deixa o transtorno sem diagnóstico nem tratamento.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "c) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Estabilização médica em equipe multiprofissional — os vômitos autoinduzidos recorrentes trazem risco de alterações eletrolíticas que precisam ser avaliadas antes de aprofundar o trabalho psicológico.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "d) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "EDE-Q, pela avaliação mais detalhada dos sintomas centrais do transtorno, incluindo frequência de episódios de compulsão e comportamento compensatório.", font: doc.FONT, size: 21, color: doc.INK })] }),
  );

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-4.21-Avaliacao.docx");
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
      n: 1, titulo: "Por que a restrição se sustenta sozinha", duracao: "12 min", slides: "1, 2, 3, 4",
      objetivo: "Sair sabendo explicar o mecanismo dos transtornos alimentares sem jargão, e por que \"força de vontade\" não é a explicação certa.",
      segmentos: [
        seg("0:00–0:45", "Abertura (gancho)", [{ fala: "Nos transtornos alimentares, restringir não é só uma escolha que sai do controle — a própria restrição altera a forma como o cérebro processa fome, saciedade e recompensa, criando um ciclo que se sustenta sozinho." }]),
        seg("0:45–2:00", "Por que isso importa clinicamente", ["\"Força de vontade\" nunca foi a explicação certa.", "O primeiro passo do protocolo quase sempre é médico, não psicológico."]),
        seg("2:00–8:00", "Por que a restrição se sustenta (mostrar slide 4)", [
          "Ínsula com processamento interoceptivo distorcido de fome e saciedade.",
          "Sistema de recompensa com resposta alterada a alimentos, conforme o subtipo.",
          "Córtex pré-frontal com controle rígido e excessivo sobre o impulso alimentar.",
          "Circuito de imagem corporal com distorção da autopercepção da forma física.",
        ]),
        seg("8:00–10:30", "Um ponto importante", ["Fome real deixa de ser um guia confiável quando a interocepção está distorcida."]),
        seg("10:30–12:00", "Fechamento", [{ fala: "Próxima aula: como esse padrão se consolida a partir de uma dieta comum." }]),
      ],
    },
    {
      n: 2, titulo: "Da dieta inicial ao ciclo consolidado", duracao: "10 min", slides: "5",
      objetivo: "Explicar a cadeia entre temperamento, restrição inicial e consolidação do ciclo.",
      segmentos: [
        seg("0:00–1:00", "Retomada rápida", ["Vimos as estruturas envolvidas. Hoje vemos como o padrão se forma a partir de um comportamento comum."]),
        seg("1:00–6:30", "A cadeia (mostrar slide 5)", ["Temperamento perfeccionista/ansioso, combinado a pressão sociocultural.", "Restrição alimentar inicial, muitas vezes sem intenção patológica.", "Adaptação neurobiológica que reforça a sensação de controle.", "Ciclo consolidado, independente da intenção original."]),
        seg("6:30–9:00", "Por que raramente é sobre comida", ["A restrição vira, ao longo do tempo, uma forma disfuncional de regular emoção e sensação de controle."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: os 3 traços centrais dos transtornos alimentares." }]),
      ],
    },
    {
      n: 3, titulo: "Os 3 traços centrais", duracao: "10 min", slides: "6",
      objetivo: "Reconhecer restrição/controle, distorção da imagem corporal e comportamento compensatório.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três traços — presentes, em combinações diferentes, em cada subtipo."]),
        seg("1:00–7:00", "Os 3 traços (mostrar slide 6)", [
          "Restrição alimentar/controle: regras rígidas sobre o que, quando e quanto comer.",
          "Distorção da imagem corporal: peso e forma como base central da autoavaliação.",
          "Comportamento compensatório: purgação, exercício excessivo ou jejum.",
        ]),
        seg("7:00–9:00", "Por que os subtipos se sobrepõem", ["Anorexia, Bulimia e TCA diferem na combinação e intensidade desses traços, não em traços totalmente distintos."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: como reconhecer esse padrão nas 4 dimensões clínicas." }]),
      ],
    },
    {
      n: 4, titulo: "Sinais de alerta", duracao: "10 min", slides: "7",
      objetivo: "Reconhecer sinais cognitivos, comportamentais, relacionais e físicos dos transtornos alimentares.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Reconhecer o padrão com precisão orienta a decisão mais importante: quando priorizar avaliação médica."]),
        seg("1:00–7:30", "As 4 categorias (mostrar slide 7)", [
          "Cognitivo: pensamento dicotômico sobre comida, supervalorização do peso.",
          "Comportamental: rituais alimentares, evitação de refeições sociais.",
          "Relacional: isolamento social em torno de refeições, conflitos familiares.",
          "Físico: sinais de desnutrição, alterações menstruais, flutuações de peso.",
        ]),
        seg("7:30–9:00", "Por que isso importa", ["Os sinais físicos, em especial, exigem investigação médica ativa e imediata."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: como diferenciar de quadros parecidos." }]),
      ],
    },
    {
      n: 5, titulo: "Diagnóstico diferencial rápido", duracao: "11 min", slides: "8",
      objetivo: "Diferenciar subtipos de transtorno alimentar, TOC e Transtorno Dismórfico Corporal.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Um filtro rápido — inclusive dentro da própria categoria de transtornos alimentares."]),
        seg("1:00–8:00", "Os 3 comparativos (mostrar slide 8)", [
          "Anorexia x Bulimia x TCA: diferenciar por peso corporal e presença de purgação.",
          "TOC (Módulo 4.8): ritual serve ao controle de peso/forma, não a conteúdo obsessivo distinto.",
          "Transtorno Dismórfico Corporal: preocupação não limitada a peso/forma, mas a características específicas.",
        ]),
        seg("8:00–10:30", "Um ponto importante", ["Peso normal não descarta Bulimia ou TCA — um erro diagnóstico comum na prática."]),
        seg("10:30–11:00", "Fechamento", [{ fala: "Próxima aula: os instrumentos que confirmam essa leitura com dado." }]),
      ],
    },
    {
      n: 6, titulo: "Os instrumentos de avaliação", duracao: "10 min", slides: "9",
      objetivo: "Saber quando usar EAT-26, EDE-Q e dados de IMC/histórico ponderal.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Dois instrumentos e um dado objetivo — nenhum deles usado isoladamente."]),
        seg("1:00–4:30", "EAT-26", ["Triagem rápida de atitudes e comportamentos alimentares de risco."]),
        seg("4:30–7:30", "EDE-Q", ["Avaliação mais detalhada dos sintomas centrais do transtorno."]),
        seg("7:30–9:00", "IMC e histórico ponderal", ["Dado objetivo complementar, nunca isolado do quadro clínico completo."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: colocamos tudo em prática — estabilização médica e normalização alimentar." }]),
      ],
    },
    {
      n: 7, titulo: "Protocolo — estabilização médica e normalização alimentar", duracao: "13 min", slides: "10, 11",
      objetivo: "Aplicar os passos 1 e 2 do protocolo, sempre em equipe multiprofissional.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["A parte estruturalmente mais importante desse módulo. Hoje, os 2 primeiros passos."]),
        seg("1:00–2:00", "Visão geral (mostrar slide 10)", ["Estabilização médica → Normalização alimentar → Reestruturação da imagem corporal → Prevenção de recaída.", "Essa ordem não é negociável."]),
        seg("2:00–7:00", "Passo 1 — Estabilização médica (mostrar slide 11, esquerda)", ["Trabalhe sempre em equipe com médico e nutricionista.", "Priorize sinais de risco antes de qualquer intervenção psicológica profunda."]),
        seg("7:00–12:00", "Passo 2 — Normalização alimentar (mostrar slide 11, direita)", [{ fala: "Vamos reconstruir um padrão de alimentação regular, com apoio, sem negociar as regras que a restrição impôs até aqui." }]),
        seg("12:00–13:00", "Fechamento", [{ fala: "Próxima aula: reestruturação da imagem corporal e prevenção de recaída." }]),
      ],
    },
    {
      n: 8, titulo: "Protocolo — imagem corporal e prevenção de recaída", duracao: "13 min", slides: "12",
      objetivo: "Trabalhar a relação com peso/forma e identificar gatilhos de recaída.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Hoje fechamos o protocolo com o trabalho de mais longo prazo."]),
        seg("1:00–7:00", "Passo 3 — Reestruturação da imagem corporal (mostrar slide 12, esquerda)", ["Trabalhe a diferença entre valor pessoal e peso/forma corporal.", "Questione o pensamento dicotômico sobre comida de forma gradual."]),
        seg("7:00–13:00", "Passo 4 — Prevenção de recaída (mostrar slide 12, direita)", ["Identifique gatilhos específicos: novas dietas, comentários sobre peso, transições de vida.", "Construa um plano de ação combinado pra momentos de maior risco."]),
        seg("13:00–13:00", "Fechamento", [{ fala: "Protocolo completo. Próxima aula: um caso real e os critérios de quando escalar." }]),
      ],
    },
    {
      n: 9, titulo: "Estudo de caso, encaminhamento e recap", duracao: "15 min", slides: "13, 14, 15",
      objetivo: "Integrar mecanismo, instrumento e protocolo num caso completo, com ênfase na avaliação médica obrigatória.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Última aula do módulo. Caso completo e os critérios de escalonamento que aqui são regra, não exceção."]),
        seg("1:00–7:00", "Estudo de caso — Beatriz (mostrar slide 13)", ["Leia a vinheta com calma.", "Percorra as 3 perguntas de discussão.", "Convide o aluno a pausar e responder por escrito."]),
        seg("7:00–11:00", "Quando encaminhar (mostrar slide 14)", ["Percorra os 4 critérios — reforce que a equipe multiprofissional é obrigatória, não opcional."]),
        seg("11:00–14:00", "Recapitulando o módulo (mostrar slide 15)", ["Retome os 4 pontos-chave.", "Reforce a reformulação central: restrição altera o próprio processamento neurobiológico, não é questão de força de vontade."]),
        seg("14:00–15:00", "Fechamento do módulo", [{ fala: "Agora é hora dos exercícios e da avaliação. Te vejo no próximo protocolo." }]),
      ],
    },
  ];

  const totalMin = 12 + 10 + 10 + 10 + 11 + 10 + 13 + 13 + 15;

  const children = [
    ...doc.capa(KICKER, "Roteiro de Aulas — Transtornos Alimentares", "Módulo dividido em 9 vídeo-aulas de 10 a 15 minutos, seguindo os slides já produzidos. Cada aula tem roteiro cronometrado, pronto pra gravação."),
    new doc.Paragraph({
      spacing: { before: 60, after: 200 },
      children: [new doc.TextRun({
        text: "Nota importante: este módulo trata de manejo clínico com componente relevante de risco médico. Recomenda-se supervisão específica e trabalho em equipe multiprofissional antes de conduzir atendimentos desse perfil de forma independente.",
        italics: true, bold: true, color: doc.TERRA, font: doc.FONT, size: 20,
      })],
    }),
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

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", `${RODAPE_DOC} — Roteiro de Aulas`, children), "Modulo-4.21-Roteiro-Aulas.docx");
}

// ============================================================
Promise.resolve()
  .then(construirDeck)
  .then(construirExercicios)
  .then(construirProva)
  .then(construirRoteiro)
  .then(() => console.log("TUDO PRONTO"))
  .catch((e) => { console.error(e); process.exit(1); });

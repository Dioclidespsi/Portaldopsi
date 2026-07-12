const deck = require("../_lib/lib-deck.js");
const doc = require("../_lib/lib-doc.js");

const MOD = "5.3";
const NOME = "Ética e Comunicação Responsável da Neurociência";
const RODAPE_DECK = `Ética e Comunicação da Neurociência — Módulo ${MOD}`;
const RODAPE_DOC = `Módulo ${MOD} — Ética e Comunicação Responsável da Neurociência`;
const KICKER = "MÓDULO 5.3 · INTEGRAÇÃO, CARREIRA E PRÁTICA SUPERVISIONADA";

// ============================================================
// 1) SLIDE DECK
// ============================================================
function construirDeck() {
  const pres = deck.novaApresentacao(`${NOME} — Neuro-hype e os Limites da Ciência`);

  deck.slideTitulo(pres, {
    moduloLabel: `Módulo ${MOD} · Bloco 5 · Integração`,
    titulo: "Comunicação Ética",
    subtitulo: "Neuro-hype, os limites da ciência atual, e comunicação responsável com pacientes e nas redes",
    passos: ["Neuro-hype", "Limites", "Pacientes", "Redes", "Prática"],
  });

  deck.slideRoteiro(pres, {
    rodape: RODAPE_DECK, pageNum: 2,
    cards: [
      { titulo: "O problema do neuro-hype", desc: "Como a simplificação vira distorção, e por que isso importa" },
      { titulo: "Os limites reais da ciência", desc: "O que a neurociência ainda não explica com certeza" },
      { titulo: "Comunicação com pacientes", desc: "Corrigindo informação errada sem quebrar a aliança terapêutica" },
      { titulo: "Comunicação nas redes", desc: "O mesmo cuidado, com uma audiência maior e mais exposta" },
      { titulo: "Prática", desc: "Um caso real de correção cuidadosa de informação equivocada" },
    ],
  });

  deck.slideHook(pres, {
    rodape: RODAPE_DECK, pageNum: 3,
    frase: "Toda vez que você simplifica demais um mecanismo neurobiológico pra deixá-lo mais vendável, paga um preço invisível: a confiança do paciente na próxima vez que a ciência real for mais complicada que isso.",
    apoio: "Este módulo fecha o Bloco 5 revisitando, com espírito crítico, toda a linguagem neurocientífica usada ao longo do curso — e como comunicá-la com responsabilidade.",
  });

  deck.slideCircuito(pres, {
    rodape: RODAPE_DECK, pageNum: 4,
    titulo: "4 formas comuns de neuro-hype",
    regioes: [
      { label: "Simplificação excessiva: reduzir um mecanismo complexo a uma frase de efeito", rx: 0.20, ry: 0.22, color: deck.NAVY, d: 0.5 },
      { label: "Causalidade onde há só correlação: \"isso causa\" quando o estudo mostra apenas associação", rx: 0.22, ry: 0.62, color: deck.TERRA, d: 0.4 },
      { label: "Generalização de estudo único: tratar um achado isolado como verdade estabelecida", rx: 0.60, ry: 0.60, color: deck.NAVY_TINT, d: 0.36 },
      { label: "Promessa de resultado garantido: prometer o que nenhum mecanismo biológico garante sozinho", rx: 0.58, ry: 0.24, color: deck.TERRA_TINT, d: 0.36 },
    ],
    notas: [
      "Esses 4 padrões aparecem com frequência em conteúdo popular sobre neurociência — inclusive em materiais bem-intencionados.",
      "Reconhecê-los na fonte é o primeiro passo antes de comunicar qualquer conteúdo neurocientífico a um paciente ou ao público.",
    ],
  });

  deck.slideCadeia(pres, {
    rodape: RODAPE_DECK, pageNum: 5,
    titulo: "Da pesquisa à sessão: onde a simplificação vira distorção",
    elos: [
      { titulo: "Estudo científico publicado", desc: "Com suas limitações, amostra específica e nível de evidência" },
      { titulo: "Simplificação necessária", desc: "Para tornar o achado acessível a quem não é da área" },
      { titulo: "Ponto de virada", desc: "Onde a simplificação começa a distorcer o que o estudo realmente mostrou" },
      { titulo: "Comunicação responsável", desc: "Preserva a essência sem prometer o que a ciência ainda não garante" },
    ],
    notaFinal: "O objetivo não é evitar simplificar — é notar exatamente o ponto em que a simplificação deixa de ser honesta.",
  });

  deck.slideCategorias(pres, {
    rodape: RODAPE_DECK, pageNum: 6,
    titulo: "3 tipos de neuro-hype",
    categorias: [
      { titulo: "Neuro-determinismo", desc: "Reduzir toda a experiência humana à biologia, ignorando contexto e história", color: deck.NAVY },
      { titulo: "Promessa de cura simples", desc: "Contornar a complexidade real do tratamento com uma solução biológica única", color: deck.TERRA },
      { titulo: "Jargão para parecer autoridade", desc: "Linguagem técnica usada pra impressionar, não pra esclarecer", color: deck.NAVY_TINT },
    ],
    notaFinal: "Os 3 tipos compartilham a mesma raiz: usar a autoridade da ciência pra afirmar mais do que ela, de fato, sustenta.",
  });

  deck.slideSinais(pres, {
    rodape: RODAPE_DECK, pageNum: 7,
    titulo: "Sinais de comunicação irresponsável",
    itens: [
      { titulo: "Resultado específico prometido", desc: "Com base num mecanismo neurobiológico isolado, ignorando outros fatores" },
      { titulo: "Termo técnico sem explicação", desc: "Usado pra parecer mais autoritativo, não pra esclarecer o paciente" },
      { titulo: "Estudo isolado generalizado", desc: "Apresentado como verdade estabelecida, sem menção a réplicas ou limites" },
      { titulo: "Incertezas da pesquisa ignoradas", desc: "O que a ciência ainda não sabe é omitido, não apenas simplificado" },
    ],
  });

  deck.slideDiferencial(pres, {
    rodape: RODAPE_DECK, pageNum: 8,
    titulo: "Níveis de simplificação",
    cards: [
      { titulo: "Simplificação responsável", desc: "Reduz complexidade, mas mantém a precisão do mecanismo central" },
      { titulo: "Neuro-hype leve", desc: "Exagera a confiança nos achados, sem chegar a prometer resultado" },
      { titulo: "Neuro-hype grave", desc: "Promessas enganosas com risco real de prejuízo ao paciente" },
    ],
  });

  deck.slideInstrumentos(pres, {
    rodape: RODAPE_DECK, pageNum: 9,
    titulo: "3 filtros antes de comunicar",
    instrumentos: [
      { sigla: "Base científica", nome: "Isso está de fato estabelecido pela ciência atual?", desc: "Distingue achado consolidado de hipótese ainda em investigação." },
      { sigla: "Mecanismo fiel", nome: "Essa simplificação ainda é fiel ao mecanismo real?", desc: "Simplificar não deveria significar distorcer o que está sendo explicado." },
      { sigla: "Expectativa gerada", nome: "Essa comunicação pode gerar expectativa irreal no paciente?", desc: "O teste final: o que essa frase promete, implícita ou explicitamente?" },
    ],
  });

  deck.slideProtocoloOverview(pres, {
    rodape: RODAPE_DECK, pageNum: 10,
    titulo: "Comunicando com responsabilidade: 4 passos",
    passos: [
      { titulo: "Verificar a\nbase científica", desc: "Antes de comunicar, confirme o que está de fato estabelecido" },
      { titulo: "Simplificar sem\ndistorcer", desc: "Reduza complexidade mantendo o mecanismo central intacto" },
      { titulo: "Nomear as\nincertezas", desc: "Diga explicitamente o que a ciência ainda não sabe com certeza" },
      { titulo: "Evitar promessa\nde resultado", desc: "Nenhum mecanismo biológico garante um resultado específico sozinho" },
    ],
    notaFinal: "Esses 4 passos valem tanto para uma conversa em sessão quanto para um post nas redes sociais.",
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 11,
    titulo: "Passos 1 e 2, na prática",
    colunas: [
      {
        numero: 1, titulo: "Verificar a base científica",
        bullets: ["Antes de repetir uma informação, pergunte-se de onde ela veio e com que nível de evidência", "Desconfie especialmente de afirmações muito específicas e muito confiantes ao mesmo tempo"],
      },
      {
        numero: 2, titulo: "Simplificar sem distorcer",
        fala: "“A terapia ajuda a fortalecer conexões cerebrais associadas a esse padrão — não existe um prazo garantido, mas a mudança biológica é real e mensurável.”",
        bullets: ["Simplifique a linguagem, não o mecanismo — o exemplo acima simplifica sem prometer um resultado específico"],
      },
    ],
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 12,
    titulo: "Passos 3 e 4, na prática",
    colunas: [
      {
        numero: 3, titulo: "Nomear as incertezas",
        bullets: ["Diga explicitamente quando um achado ainda é preliminar ou específico de um contexto de pesquisa", "Isso fortalece, e não enfraquece, a credibilidade da comunicação"],
      },
      {
        numero: 4, titulo: "Evitar promessa de resultado",
        bullets: ["Nunca vincule um mecanismo neurobiológico a um prazo ou resultado específico garantido", "Substitua promessas por expectativas realistas, baseadas em evidência disponível"],
      },
    ],
  });

  deck.slideCaso(pres, {
    rodape: RODAPE_DECK, pageNum: 13,
    vinheta: "Um paciente chega à sessão entusiasmado com um vídeo viral que viu nas redes: \"vi que fazer esse exercício de respiração por 21 dias reprograma completamente a amígdala e cura a ansiedade permanentemente\". Ele pergunta diretamente à terapeuta se isso é verdade e se deveria parar outras estratégias por causa disso.",
    perguntas: [
      "Que elementos desse relato são neuro-hype, segundo os padrões vistos nesse módulo?",
      "Como você corrigiria a informação sem invalidar o entusiasmo do paciente com a própria terapia?",
      "Que parte da explicação sobre amígdala e ansiedade (Módulo 1.1) pode ser usada de forma responsável aqui?",
    ],
  });

  deck.slideEncaminhamento(pres, {
    rodape: RODAPE_DECK, pageNum: 14,
    criterios: [
      "Paciente interrompe tratamento eficaz com base em informação de neuro-hype: priorizar correção imediata e cuidadosa",
      "Dúvida sobre limites éticos de comunicação em conteúdo próprio: revisar código de ética profissional antes de publicar",
      "Situação de comunicação pública com risco de dano coletivo: buscar orientação do conselho de classe",
      "Incerteza sobre nível de evidência de um achado específico: preferir cautela e checagem antes de repetir a informação",
    ],
  });

  deck.slideRecap(pres, {
    rodape: RODAPE_DECK, pageNum: 15,
    pontos: [
      "Neuro-hype se manifesta em simplificação excessiva, causalidade indevida, generalização de estudo único e promessas de resultado",
      "Neuro-determinismo, promessa de cura simples e jargão para autoridade são os 3 tipos mais comuns",
      "Base científica, fidelidade do mecanismo e expectativa gerada são os 3 filtros antes de qualquer comunicação",
      "Simplificar não deveria significar distorcer — o mecanismo central precisa se manter intacto mesmo em linguagem acessível",
    ],
    proximoTexto: "Próximo: exercícios práticos e avaliação do Módulo 5.3 →",
  });

  return pres.writeFile({ fileName: "Modulo-5.3-Etica-Comunicacao-Neurociencia.pptx" });
}

// ============================================================
// 2) EXERCÍCIOS
// ============================================================
function construirExercicios() {
  const children = [
    ...doc.capa(KICKER, "Exercícios — Ética e Comunicação Responsável da Neurociência", "Resolva individualmente antes da sessão de supervisão. O objetivo é treinar seu olhar crítico diante de conteúdo popular sobre neurociência."),

    doc.exNum(1, "Os 4 formas de neuro-hype"),
    doc.pergunta(1, "Explique, com um exemplo próprio, a diferença entre correlação e causalidade em pesquisa neurocientífica."),
    ...doc.linhaResposta(3),
    doc.pergunta(2, "Por que generalizar um estudo único é considerado uma forma de neuro-hype?"),
    ...doc.linhaResposta(2),

    doc.exNum(2, "Os 3 tipos de neuro-hype"),
    doc.tabelaSimples(["Tipo", "Característica central"], [["Neuro-determinismo", ""], ["Promessa de cura simples", ""], ["Jargão para autoridade", ""]], [3600, 5550]),

    doc.exNum(3, "Os 3 filtros, aplicados"),
    doc.vinhetaBox("Você quer publicar nas redes: \"A meditação reduz o cortisol e elimina o estresse de vez.\""),
    doc.pergunta(1, "Aplique os 3 filtros (base científica, fidelidade do mecanismo, expectativa gerada) a essa frase."),
    ...doc.linhaResposta(3),
    doc.pergunta(2, "Reescreva a frase de forma mais responsável, mantendo o interesse do público."),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),

    doc.exNum(4, "Praticando a correção — caso 1"),
    doc.vinhetaBox("Uma paciente relata ter lido que \"pessoas com TDAH têm o cérebro fisicamente diferente e por isso nunca vão conseguir se concentrar como as outras pessoas\"."),
    doc.pergunta(1, "Que elemento dessa afirmação é neuro-hype, e qual seria uma correção responsável?"),
    ...doc.linhaResposta(3),

    doc.exNum(5, "Caso integrado — o vídeo dos 21 dias"),
    doc.vinhetaBox("Paciente entusiasmado com um vídeo viral: \"fazer esse exercício de respiração por 21 dias reprograma completamente a amígdala e cura a ansiedade permanentemente\", questionando se deveria parar outras estratégias."),
    doc.pergunta(1, "Que elementos desse relato são neuro-hype, segundo os padrões vistos nesse módulo?"),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Como você corrigiria a informação sem invalidar o entusiasmo do paciente com a própria terapia?"),
    ...doc.linhaResposta(2),
    doc.pergunta(3, "Que parte da explicação sobre amígdala e ansiedade pode ser usada de forma responsável aqui?"),
    ...doc.linhaResposta(2),
  ];

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-5.3-Exercicios.docx");
}

// ============================================================
// 3) AVALIAÇÃO
// ============================================================
function construirProva() {
  const objetivas = [
    ["As 4 formas comuns de neuro-hype apresentadas no módulo são:", ["Simplificação excessiva, causalidade indevida, generalização de estudo único, promessa de resultado garantido", "Amígdala, hipocampo, córtex pré-frontal, cerebelo", "Anamnese, exame do estado mental, testes, escalas", "Serotonina, dopamina, GABA, glutamato"]],
    ["\"Causalidade onde há só correlação\" significa:", ["Afirmar que algo causa um efeito quando o estudo mostra apenas associação", "Afirmar corretamente uma relação de causa e efeito comprovada", "Ignorar completamente qualquer relação entre duas variáveis", "Um erro que só ocorre em estudos com amostras muito grandes"]],
    ["Neuro-determinismo, segundo o módulo, é:", ["Reduzir toda a experiência humana à biologia, ignorando contexto e história", "Considerar apenas fatores ambientais, sem qualquer base biológica", "Um tipo válido e recomendado de comunicação científica", "Uma técnica de avaliação neuropsicológica formal"]],
    ["O filtro \"fidelidade do mecanismo\" verifica se:", ["A simplificação ainda é fiel ao mecanismo real sendo descrito", "A frase é curta o suficiente para redes sociais", "O termo técnico usado impressiona o público-alvo", "A informação foi compartilhada por muitas pessoas"]],
    ["Simplificação responsável se diferencia de neuro-hype leve por:", ["Reduzir complexidade mantendo a precisão do mecanismo central", "Prometer sempre um resultado específico e garantido", "Ignorar completamente qualquer base científica", "Usar jargão técnico sem qualquer explicação"]],
    ["Nomear as incertezas de um achado científico, segundo o módulo:", ["Fortalece, e não enfraquece, a credibilidade da comunicação", "Enfraquece sempre a credibilidade de quem comunica", "É desnecessário quando o público não é especialista", "Deve ser evitado em qualquer comunicação pública"]],
    ["Diante de um paciente que quer parar tratamento eficaz por causa de neuro-hype, o módulo recomenda:", ["Priorizar a correção imediata e cuidadosa da informação", "Concordar com a informação para não conflitar com o paciente", "Encerrar o acompanhamento imediatamente", "Ignorar o comentário e seguir o plano original sem conversar"]],
    ["\"Promessa de resultado garantido\" como forma de neuro-hype ocorre quando:", ["Um mecanismo biológico é vinculado a um resultado específico que ele sozinho não garante", "Um resultado é descrito com as devidas ressalvas e incertezas", "Nenhuma promessa específica é feita ao paciente", "O mecanismo biológico é corretamente descrito como incerto"]],
    ["Diante de dúvida sobre limites éticos de comunicação em conteúdo próprio, o módulo recomenda:", ["Revisar o código de ética profissional antes de publicar", "Publicar imediatamente, sem qualquer revisão prévia", "Ignorar completamente considerações éticas no conteúdo", "Delegar toda responsabilidade à plataforma de publicação"]],
    ["Este módulo revisita, com espírito crítico:", ["Toda a linguagem neurocientífica usada ao longo do curso", "Apenas o conteúdo do Bloco 3 (Farmacologia)", "Nenhum conteúdo anterior — é completamente independente", "Apenas os protocolos do Bloco 4, sem relação com os demais blocos"]],
  ];
  const gabaritoObjetivas = ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a"];

  const children = [
    ...doc.capa(KICKER, "Avaliação — Ética e Comunicação Responsável da Neurociência", `Avaliação formativa de encerramento do Módulo ${MOD}.`),
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
    doc.vinhetaBox("Você é convidado a dar uma entrevista para um portal de notícias sobre \"como a neurociência explica a procrastinação\". O jornalista pede uma frase de efeito, curta, que \"as pessoas vão compartilhar\"."),
    new doc.Paragraph({ spacing: { before: 240 }, children: [new doc.TextRun({ text: "Com base no protocolo estudado, responda:", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    new doc.Paragraph({ spacing: { before: 220, after: 40 }, children: [new doc.TextRun({ text: "a) (10 pts) Que risco de neuro-hype está implícito no pedido do jornalista por uma \"frase de efeito\"?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "b) (10 pts) Escreva uma frase curta e compartilhável sobre procrastinação e neurociência que passe pelos 3 filtros do módulo.", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(3),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "c) (10 pts) Que incerteza da pesquisa sobre procrastinação seria importante nomear nessa entrevista?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "d) (10 pts) Que tipo de promessa você evitaria fazer, mesmo sob pressão editorial por uma resposta mais chamativa?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    new doc.Paragraph({ spacing: { after: 40 }, children: [new doc.TextRun({ text: "USO EXCLUSIVO DO INSTRUTOR — remover antes de aplicar a prova", bold: true, color: doc.TERRA, font: doc.FONT, size: 20 })] }),
    doc.tituloH1("Gabarito"),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 1 — Questões objetivas", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 200 }, children: [new doc.TextRun({ text: gabaritoObjetivas.map((r, i) => `${i + 1}-${r}`).join("   ·   "), font: doc.FONT, size: 22, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 2 — Critério de correção da questão de caso", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "a) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "O risco de simplificação excessiva e de promessa de resultado — frases de efeito tendem a comprimir mecanismos complexos em afirmações categóricas demais.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "b) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Exemplo: \"Procrastinar não é preguiça — é o cérebro escolhendo alívio imediato no lugar de um objetivo distante, algo que dá pra treinar a mudar.\" (aceitar variações equivalentes que não prometam resultado nem usem causalidade indevida)", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "c) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Que procrastinação tem múltiplos fatores associados (função executiva, evitação experiencial, comorbidades) e que nenhuma explicação única cobre todos os casos.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "d) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Qualquer promessa de que compreender o mecanismo, sozinho, resolve o padrão sem esforço ou acompanhamento — o entendimento ajuda, mas não substitui intervenção.", font: doc.FONT, size: 21, color: doc.INK })] }),
  );

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-5.3-Avaliacao.docx");
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
      n: 1, titulo: "O problema do neuro-hype", duracao: "13 min", slides: "1, 2, 3, 4",
      objetivo: "Sair sabendo reconhecer as 4 formas mais comuns de neuro-hype.",
      segmentos: [
        seg("0:00–0:45", "Abertura (gancho)", [{ fala: "Toda vez que você simplifica demais um mecanismo neurobiológico pra deixá-lo mais vendável, paga um preço invisível: a confiança do paciente na próxima vez que a ciência real for mais complicada que isso." }]),
        seg("0:45–2:00", "Por que isso importa", ["Este módulo fecha o Bloco 5 revisitando, com espírito crítico, a linguagem usada ao longo de todo o curso."]),
        seg("2:00–9:00", "As 4 formas de neuro-hype (mostrar slide 4)", [
          "Simplificação excessiva: reduzir um mecanismo complexo a uma frase de efeito.",
          "Causalidade indevida: \"causa\" quando o estudo mostra apenas correlação.",
          "Generalização de estudo único: tratar um achado isolado como verdade estabelecida.",
          "Promessa de resultado garantido: prometer o que nenhum mecanismo garante sozinho.",
        ]),
        seg("9:00–12:00", "Um ponto importante", ["Esses padrões aparecem até em materiais bem-intencionados — reconhecê-los é o primeiro passo."]),
        seg("12:00–13:00", "Fechamento", [{ fala: "Próxima aula: onde a simplificação vira distorção, e os 3 tipos de neuro-hype." }]),
      ],
    },
    {
      n: 2, titulo: "Da pesquisa à sessão, e os 3 tipos de neuro-hype", duracao: "12 min", slides: "5, 6",
      objetivo: "Explicar a cadeia da distorção e reconhecer os 3 tipos de neuro-hype.",
      segmentos: [
        seg("0:00–1:00", "Retomada rápida", ["Vimos as 4 formas. Hoje, onde exatamente a simplificação vira distorção."]),
        seg("1:00–5:00", "A cadeia (mostrar slide 5)", ["Estudo científico publicado → Simplificação necessária → Ponto de virada → Comunicação responsável."]),
        seg("5:00–11:00", "Os 3 tipos (mostrar slide 6)", [
          "Neuro-determinismo: reduzir toda experiência à biologia.",
          "Promessa de cura simples: contornar a complexidade real do tratamento.",
          "Jargão para parecer autoridade: linguagem técnica que impressiona sem esclarecer.",
        ]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Próxima aula: sinais de comunicação irresponsável e os níveis de simplificação." }]),
      ],
    },
    {
      n: 3, titulo: "Sinais de alerta e níveis de simplificação", duracao: "12 min", slides: "7, 8",
      objetivo: "Reconhecer sinais de comunicação irresponsável e diferenciar níveis de simplificação.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Sinais de alerta — e os 3 níveis de simplificação, do responsável ao grave."]),
        seg("1:00–6:00", "Sinais de comunicação irresponsável (mostrar slide 7)", [
          "Resultado específico prometido com base em mecanismo isolado.",
          "Termo técnico sem explicação, usado pra parecer autoridade.",
          "Estudo isolado generalizado como verdade estabelecida.",
          "Incertezas da pesquisa ignoradas, não apenas simplificadas.",
        ]),
        seg("6:00–11:00", "Os 3 níveis (mostrar slide 8)", ["Simplificação responsável, neuro-hype leve, neuro-hype grave — cada um com um grau diferente de risco."]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Próxima aula: os 3 filtros antes de comunicar qualquer coisa." }]),
      ],
    },
    {
      n: 4, titulo: "Os 3 filtros antes de comunicar", duracao: "11 min", slides: "9",
      objetivo: "Aplicar os 3 filtros de checagem antes de qualquer comunicação sobre neurociência.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três perguntas simples, aplicáveis antes de qualquer frase sobre neurociência."]),
        seg("1:00–9:00", "Os 3 filtros (mostrar slide 9)", [
          "Base científica: isso está de fato estabelecido pela ciência atual?",
          "Fidelidade do mecanismo: essa simplificação ainda é fiel ao mecanismo real?",
          "Expectativa gerada: essa comunicação pode gerar expectativa irreal no paciente?",
        ]),
        seg("9:00–11:00", "Fechamento", [{ fala: "Próxima aula: os 4 passos de comunicação responsável, na prática." }]),
      ],
    },
    {
      n: 5, titulo: "Aplicação — verificar a base e simplificar sem distorcer", duracao: "13 min", slides: "10, 11",
      objetivo: "Aplicar os passos 1 e 2 do protocolo de comunicação responsável.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["A parte prática do módulo. Hoje, os 2 primeiros passos."]),
        seg("1:00–2:00", "Visão geral (mostrar slide 10)", ["Verificar a base científica → Simplificar sem distorcer → Nomear incertezas → Evitar promessa de resultado."]),
        seg("2:00–7:00", "Passo 1 — Verificar a base científica (mostrar slide 11, esquerda)", ["Antes de repetir uma informação, pergunte de onde ela veio e com que nível de evidência."]),
        seg("7:00–12:00", "Passo 2 — Simplificar sem distorcer (mostrar slide 11, direita)", [{ fala: "A terapia ajuda a fortalecer conexões cerebrais associadas a esse padrão — não existe um prazo garantido, mas a mudança biológica é real e mensurável." }]),
        seg("12:00–13:00", "Fechamento", [{ fala: "Próxima aula: nomear incertezas e evitar promessas de resultado." }]),
      ],
    },
    {
      n: 6, titulo: "Aplicação — nomear incertezas e evitar promessas", duracao: "11 min", slides: "12",
      objetivo: "Trabalhar os passos 3 e 4, fechando o protocolo completo.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Hoje fechamos o protocolo com os 2 últimos passos."]),
        seg("1:00–6:00", "Passo 3 — Nomear as incertezas (mostrar slide 12, esquerda)", ["Diga explicitamente quando um achado ainda é preliminar ou específico de um contexto de pesquisa."]),
        seg("6:00–10:00", "Passo 4 — Evitar promessa de resultado (mostrar slide 12, direita)", ["Nunca vincule um mecanismo neurobiológico a um prazo ou resultado específico garantido."]),
        seg("10:00–11:00", "Fechamento", [{ fala: "Protocolo completo. Próxima aula: um caso real de correção cuidadosa." }]),
      ],
    },
    {
      n: 7, titulo: "Prática guiada e recap final", duracao: "14 min", slides: "13, 14, 15",
      objetivo: "Aplicar o protocolo completo a um caso real e consolidar os pontos-chave do módulo.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["A última aula do módulo — prática guiada completa e recap."]),
        seg("1:00–5:00", "Apresentando o caso (mostrar slide 13)", ["Leia a vinheta do vídeo viral sobre os 21 dias com calma.", "Note o entusiasmo genuíno do paciente — a correção precisa preservar isso."]),
        seg("5:00–9:00", "Percorrendo as perguntas de discussão", ["Discuta em voz alta as 3 perguntas do slide 13.", "Esboce uma correção que use o mecanismo real da amígdala sem invalidar o paciente."]),
        seg("9:00–12:00", "Quando buscar orientação adicional (mostrar slide 14)", ["Percorra os 4 critérios do slide 14."]),
        seg("12:00–14:00", "Recap final (mostrar slide 15)", [{ fala: "Retome os 4 pontos-chave do módulo. Agora é hora dos exercícios e da avaliação — e da última aula do Bloco 5." }]),
      ],
    },
  ];

  const totalMin = 13 + 12 + 12 + 11 + 13 + 11 + 14;

  const children = [
    ...doc.capa(KICKER, "Roteiro de Aulas — Ética e Comunicação Responsável da Neurociência", "Módulo dividido em 7 vídeo-aulas de 11 a 14 minutos, seguindo os slides já produzidos. Cada aula tem roteiro cronometrado, pronto pra gravação."),
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

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", `${RODAPE_DOC} — Roteiro de Aulas`, children), "Modulo-5.3-Roteiro-Aulas.docx");
}

// ============================================================
Promise.resolve()
  .then(construirDeck)
  .then(construirExercicios)
  .then(construirProva)
  .then(construirRoteiro)
  .then(() => console.log("TUDO PRONTO"))
  .catch((e) => { console.error(e); process.exit(1); });

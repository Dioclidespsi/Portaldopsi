const deck = require("../_lib/lib-deck.js");
const doc = require("../_lib/lib-doc.js");

const MOD = "3.6";
const NOME = "Calendário Editorial";
const RODAPE_DECK = `Calendário Editorial — Módulo ${MOD}`;
const RODAPE_DOC = `Módulo ${MOD} — Calendário Editorial`;
const KICKER = "MÓDULO 3.6 · CONTEÚDO E AUTORIDADE";
const MARCA = "Escola de Marketing para Psicólogos — by Dioclides";

// ============================================================
// 1) SLIDE DECK
// ============================================================
function construirDeck() {
  const pres = deck.novaApresentacao(`${NOME} — Planejamento Sem Esgotamento`);

  deck.slideTitulo(pres, {
    moduloLabel: `Módulo ${MOD} · Bloco 3 · Conteúdo e Autoridade`,
    titulo: "Calendário Editorial",
    subtitulo: "Um sistema simples de pauta e frequência que cabe na agenda de quem já atende em tempo integral",
    rodapeMarca: MARCA,
    passos: ["Por quê", "O sistema", "Preenchimento", "Erros", "Aplicação"],
  });

  deck.slideRoteiro(pres, {
    rodape: RODAPE_DECK, pageNum: 2,
    cards: [
      { titulo: "Por que um sistema simples", desc: "Consolidando tudo que o Bloco 3 já ensinou" },
      { titulo: "O calendário mínimo", desc: "Os 4 elementos que sustentam planejamento sem esgotar" },
      { titulo: "Como preencher", desc: "Um processo de criação em lote, não diário" },
      { titulo: "Erros de planejamento", desc: "Sinais de que o sistema virou fonte de estresse" },
      { titulo: "Aplicação prática", desc: "Organizando a agenda de quem sempre cria em cima da hora" },
    ],
  });

  deck.slideHook(pres, {
    rodape: RODAPE_DECK, pageNum: 3,
    frase: "Você não precisa de um calendário editorial de 50 posts pro trimestre inteiro — precisa de um sistema simples o bastante pra seguir de verdade, mesmo nas semanas mais cheias.",
    apoio: "Este módulo fecha o Bloco 3 transformando os Módulos 3.1 a 3.5 num único sistema de planejamento, sem exigir uma rotina que ninguém consegue manter.",
  });

  deck.slideCircuito(pres, {
    rodape: RODAPE_DECK, pageNum: 4,
    titulo: "4 elementos de um sistema sustentável",
    regioes: [
      { label: "Temas centrais já definidos, do Módulo 3.1", rx: 0.20, ry: 0.22, color: deck.NAVY, d: 0.5 },
      { label: "Formatos-pilares variados, dos Módulos 3.2 e 3.4", rx: 0.22, ry: 0.62, color: deck.TERRA, d: 0.4 },
      { label: "Frequência mínima viável, do Módulo 3.3", rx: 0.60, ry: 0.60, color: deck.NAVY_TINT, d: 0.36 },
      { label: "Canais priorizados: Instagram e email, sem dispersão", rx: 0.58, ry: 0.24, color: deck.TERRA_TINT, d: 0.36 },
    ],
    notas: [
      "Cada um desses 4 elementos já foi trabalhado separadamente nos módulos anteriores — aqui eles se juntam num único sistema prático.",
      "Tentar cobrir muitos canais ao mesmo tempo é uma das causas mais comuns de esgotamento de conteúdo.",
    ],
  });

  deck.slideCadeia(pres, {
    rodape: RODAPE_DECK, pageNum: 5,
    titulo: "Da pauta ao publicado, sem esgotamento",
    elos: [
      { titulo: "Bloco de criação", desc: "Um horário fixo, semanal ou quinzenal, reservado só pra isso" },
      { titulo: "Banco de conteúdo", desc: "Criar mais do que publica, formando uma reserva" },
      { titulo: "Publicação distribuída", desc: "O banco alimenta as publicações ao longo do período" },
      { titulo: "Revisão mensal", desc: "Ajustar o sistema com base no que realmente funcionou" },
    ],
    notaFinal: "O banco de conteúdo é o que evita a criação de última hora — sem ele, todo planejamento volta a depender de inspiração diária.",
  });

  deck.slideCategorias(pres, {
    rodape: RODAPE_DECK, pageNum: 6,
    titulo: "3 níveis de planejamento",
    categorias: [
      { titulo: "Mínimo", desc: "Uma lista simples de temas, sem calendário formal — já resolve a maioria dos casos", color: deck.NAVY },
      { titulo: "Intermediário", desc: "Banco de conteúdo quinzenal, com formato definido pra cada peça", color: deck.TERRA },
      { titulo: "Avançado", desc: "Calendário mensal, com canais integrados e datas específicas", color: deck.NAVY_TINT },
    ],
    notaFinal: "Comece pelo nível mínimo — a maioria dos psicólogos nunca precisa ir além disso pra manter consistência real.",
  });

  deck.slideSinais(pres, {
    rodape: RODAPE_DECK, pageNum: 7,
    titulo: "Sinais de esgotamento no planejamento",
    itens: [
      { titulo: "Criação em cima da hora", desc: "Toda publicação decidida na hora de postar, sem antecedência" },
      { titulo: "Nenhum banco de ideias", desc: "Cada post exige pensar do zero, sem reserva de conteúdo pronto" },
      { titulo: "\"Nunca sei o que postar\"", desc: "Sensação recorrente de bloqueio, mesmo com temas já definidos" },
      { titulo: "Sistema abandonado sob pressão", desc: "Planejamento existe, mas cai nas semanas mais cheias, sempre" },
    ],
  });

  deck.slideDiferencial(pres, {
    rodape: RODAPE_DECK, pageNum: 8,
    titulo: "3 abordagens de planejamento",
    cards: [
      { titulo: "Sem sistema", desc: "Criação improvisada, dependente de inspiração do dia" },
      { titulo: "Sistema rígido demais", desc: "Calendário detalhado que quebra na primeira semana cheia" },
      { titulo: "Sistema sustentável", desc: "Banco de conteúdo simples, revisado e ajustado mensalmente" },
    ],
  });

  deck.slideInstrumentos(pres, {
    rodape: RODAPE_DECK, pageNum: 9,
    titulo: "3 ferramentas simples de planejamento",
    instrumentos: [
      { sigla: "Lista de temas", nome: "Os 2 a 3 temas centrais, já com formato sugerido", desc: "Reaproveitada diretamente do Módulo 3.1." },
      { sigla: "Bloco de criação", nome: "Um horário fixo reservado só pra produzir conteúdo", desc: "Criação em lote reduz o esforço mental de decidir toda hora." },
      { sigla: "Banco de reserva", nome: "2 a 3 posts prontos, além do que será publicado logo", desc: "A margem de segurança pras semanas mais cheias." },
    ],
  });

  deck.slideProtocoloOverview(pres, {
    rodape: RODAPE_DECK, pageNum: 10,
    titulo: "Montando seu sistema: 4 passos",
    passos: [
      { titulo: "Reservar um\nbloco de tempo fixo", desc: "Semanal ou quinzenal, só pra criar conteúdo" },
      { titulo: "Criar mais do\nque publica", desc: "Formando um banco de reserva, não só o próximo post" },
      { titulo: "Distribuir ao\nlongo do período", desc: "Usando o banco pra manter consistência sem pressa" },
      { titulo: "Revisar\nmensalmente", desc: "Ajustando o sistema com base no que realmente funcionou" },
    ],
    notaFinal: "Esses 4 passos, junto com tudo que os Módulos 3.1 a 3.5 já ensinaram, fecham o ciclo completo de criação de conteúdo.",
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 11,
    titulo: "Passos 1 e 2, na prática",
    colunas: [
      {
        numero: 1, titulo: "Reservar um bloco de tempo fixo",
        bullets: ["Escolha um horário realista, que já esteja livre na sua agenda atual", "Trate esse bloco como um compromisso, não como algo pra encaixar se sobrar tempo"],
      },
      {
        numero: 2, titulo: "Criar mais do que publica",
        fala: "“Nesse bloco de criação, em vez de fazer só o próximo post, consigo fazer 2 ou 3 de uma vez?”",
        bullets: ["Usando os templates do Módulo 3.2, criar em lote costuma ser mais rápido do que parece"],
      },
    ],
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 12,
    titulo: "Passos 3 e 4, na prática",
    colunas: [
      {
        numero: 3, titulo: "Distribuir ao longo do período",
        bullets: ["Publique do banco de conteúdo, não do que foi criado no mesmo dia", "Isso libera espaço mental mesmo nas semanas de agenda cheia"],
      },
      {
        numero: 4, titulo: "Revisar mensalmente",
        bullets: ["Veja o que gerou mais engajamento ou contato, usando as métricas do Bloco 4", "Ajuste os temas ou formatos do próximo mês com base nisso, sem refazer tudo do zero"],
      },
    ],
  });

  deck.slideCaso(pres, {
    rodape: RODAPE_DECK, pageNum: 13,
    vinheta: "Uma psicóloga sempre decide o que postar na hora, geralmente à noite, depois de um dia cheio de sessões. Às vezes esquece de postar por dias seguidos, e quando lembra, sente culpa e posta qualquer coisa só pra \"não deixar o perfil parado\". Ela já tentou um calendário editorial detalhado antes, mas abandonou na segunda semana.",
    perguntas: [
      "Que sinais de esgotamento no planejamento essa psicóloga já apresenta?",
      "Por que o calendário detalhado anterior provavelmente falhou, segundo o slide 8?",
      "Como os 4 passos do protocolo poderiam ajudar, começando pelo nível mínimo de planejamento?",
    ],
  });

  deck.slideEncaminhamento(pres, {
    rodape: RODAPE_DECK, pageNum: 14,
    titulo: "Quando buscar ajuda especializada",
    criterios: [
      "Dificuldade persistente em manter até o nível mínimo de planejamento: simplificar ainda mais, reduzindo a frequência",
      "Volume de conteúdo grande o suficiente pra justificar apoio externo: considerar um assistente de conteúdo ou social media",
      "Sistema funcionando, mas resultado ainda fraco: revisar a estratégia do Módulo 3.1, não apenas a execução",
      "Esgotamento relacionado à pressão de manter presença online: reavaliar se a frequência escolhida realmente é sustentável"
    ],
  });

  deck.slideRecap(pres, {
    rodape: RODAPE_DECK, pageNum: 15,
    pontos: [
      "Temas centrais, formatos variados, frequência mínima viável e canais priorizados formam o sistema completo do Bloco 3",
      "Um banco de conteúdo, criado em lote, é o que evita a criação de última hora",
      "Comece pelo nível mínimo de planejamento — raramente é necessário ir além disso",
      "Este módulo encerra o Bloco 3, unindo estratégia, formatos, canais e planejamento numa rotina sustentável de conteúdo",
    ],
    proximoTexto: "Bloco 3 completo. Próximo: exercícios práticos e avaliação do Módulo 3.6 →",
  });

  return pres.writeFile({ fileName: "Modulo-3.6-Calendario-Editorial.pptx" });
}

// ============================================================
// 2) EXERCÍCIOS
// ============================================================
function construirExercicios() {
  const children = [
    ...doc.capa(KICKER, "Exercícios — Calendário Editorial", "Resolva individualmente, de preferência já montando seu próprio sistema de planejamento enquanto responde."),

    doc.exNum(1, "Os 4 elementos de um sistema sustentável"),
    doc.pergunta(1, "Liste os 4 elementos vistos no módulo, e de qual módulo anterior cada um vem."),
    ...doc.linhaResposta(4),

    doc.exNum(2, "Os 3 níveis de planejamento"),
    doc.tabelaSimples(["Nível", "Característica central"], [["Mínimo", ""], ["Intermediário", ""], ["Avançado", ""]], [3600, 5550]),

    doc.exNum(3, "Montando seu próprio sistema"),
    doc.pergunta(1, "Que horário fixo da semana você poderia reservar como bloco de criação?"),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Em que nível de planejamento (mínimo, intermediário ou avançado) você começaria hoje?"),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),

    doc.exNum(4, "Reconhecendo sinais de esgotamento"),
    doc.pergunta(1, "Você já viveu algum dos 4 sinais de esgotamento no planejamento? Qual, e o que poderia ajudar?"),
    ...doc.linhaResposta(3),

    doc.exNum(5, "Caso integrado — a criação noturna"),
    doc.vinhetaBox("Uma psicóloga sempre decide o que postar à noite, esquece dias seguidos, sente culpa e já abandonou um calendário detalhado na segunda semana."),
    doc.pergunta(1, "Que sinais de esgotamento no planejamento essa psicóloga já apresenta?"),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Por que o calendário detalhado anterior provavelmente falhou?"),
    ...doc.linhaResposta(2),
    doc.pergunta(3, "Como os 4 passos do protocolo poderiam ajudar, começando pelo nível mínimo?"),
    ...doc.linhaResposta(2),
  ];

  return doc.salvar(doc.paginaDoc("Escola de Marketing para Psicólogos", RODAPE_DOC, children), "Modulo-3.6-Exercicios.docx");
}

// ============================================================
// 3) AVALIAÇÃO
// ============================================================
function construirProva() {
  const objetivas = [
    ["Os 4 elementos de um sistema sustentável, segundo o módulo, são:", ["Temas centrais, formatos variados, frequência mínima viável, canais priorizados", "Alcance, engajamento, agendamento e custo por lead", "Identificação, veracidade, sigilo e comparação", "Feed, Stories, Carrossel e Direct"]],
    ["O \"banco de conteúdo\", segundo o módulo, serve para:", ["Evitar a criação de última hora, distribuindo publicações já prontas", "Substituir completamente a necessidade de um bloco de criação", "Aumentar artificialmente a frequência de postagem", "Eliminar a necessidade de revisão mensal"]],
    ["O nível de planejamento recomendado pra começar, segundo o módulo, é:", ["Mínimo — uma lista simples de temas, sem calendário formal", "Avançado — calendário mensal com canais integrados", "Intermediário — banco de conteúdo quinzenal obrigatório", "Nenhum nível é necessário no início"]],
    ["\"Nunca sei o que postar\", mesmo com temas já definidos, é descrito como:", ["Um sinal de esgotamento no planejamento", "Uma consequência normal e esperada de qualquer sistema", "Resolvido automaticamente por um calendário avançado", "Irrelevante para a sustentabilidade do planejamento"]],
    ["\"Sistema rígido demais\", segundo a classificação do módulo, tende a:", ["Quebrar na primeira semana de agenda cheia", "Ser a abordagem mais recomendada pelo módulo", "Funcionar exatamente como um sistema sustentável", "Eliminar completamente o risco de esgotamento"]],
    ["O passo \"criar mais do que publica\" recomenda:", ["Produzir conteúdo em lote, formando uma reserva além do próximo post", "Publicar imediatamente tudo que for criado no mesmo dia", "Reduzir a quantidade de conteúdo produzido por sessão de criação", "Substituir a necessidade de definir temas centrais"]],
    ["A revisão mensal do sistema, segundo o módulo, deve se basear em:", ["Métricas de engajamento e contato, vistas no Bloco 4", "Exclusivamente na opinião de outros profissionais da área", "Comparação direta com o número de seguidores de concorrentes", "Não é necessária revisão, uma vez que o sistema esteja definido"]],
    ["Diante de dificuldade persistente em manter o nível mínimo de planejamento, o módulo recomenda:", ["Simplificar ainda mais, reduzindo a frequência", "Migrar imediatamente para o nível avançado", "Abandonar completamente qualquer forma de planejamento", "Aumentar a pressão de manter o calendário anterior"]],
    ["Este módulo encerra o Bloco 3 unindo o conteúdo de quais aspectos anteriores?", ["Estratégia, formatos, canais e planejamento numa rotina sustentável", "Apenas as regras éticas do Bloco 2, sem outra conexão", "Exclusivamente as métricas do Bloco 4", "Somente o conteúdo do Módulo 3.5, sobre email"]],
    ["Reservar um bloco de tempo fixo pra criação, segundo o módulo, deve ser tratado como:", ["Um compromisso, não algo pra encaixar se sobrar tempo", "Opcional, dependendo da disponibilidade do dia", "Desnecessário quando já existe um banco de conteúdo", "Uma tarefa exclusivamente para os fins de semana"]],
  ];
  const gabaritoObjetivas = ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a"];

  const children = [
    ...doc.capa(KICKER, "Avaliação — Calendário Editorial", `Avaliação formativa de encerramento do Módulo ${MOD} e do Bloco 3.`),
    doc.infoBox([
      ["Nota de corte:", "70 de 100 pontos"],
      ["Tempo sugerido:", "20 minutos"],
      ["Composição:", "10 questões objetivas (6 pts cada = 60 pts) + 1 questão de caso (40 pts)"],
      ["Consulta:", "Material da aula permitido; discussão entre colegas, não"],
    ]),
    doc.tituloH1("Parte 1 — Questões objetivas"),
  ];
  objetivas.forEach((q, i) => children.push(...doc.questaoObjetiva(i + 1, q[0], q[1])));

  children.push(
    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    doc.tituloH1("Parte 2 — Questão de caso (40 pontos)"),
    doc.vinhetaBox("Um psicólogo definiu 3 temas centrais (Módulo 3.1), aprendeu os formatos-pilares (Módulo 3.2) e sabe a frequência mínima que consegue manter (Módulo 3.3), mas ainda cria cada post individualmente, no dia da publicação, sentindo que \"nunca sobra tempo\" pra planejar com antecedência."),
    new doc.Paragraph({ spacing: { before: 240 }, children: [new doc.TextRun({ text: "Com base no protocolo estudado, responda:", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    new doc.Paragraph({ spacing: { before: 220, after: 40 }, children: [new doc.TextRun({ text: "a) (10 pts) Que elemento específico do sistema sustentável está faltando nesse caso?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "b) (10 pts) Que passo do protocolo ele deveria implementar primeiro?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "c) (10 pts) Sugira um horário realista pra esse bloco de criação, considerando que ele atende em tempo integral.", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "d) (10 pts) Como o banco de conteúdo resolveria diretamente a sensação de \"nunca sobra tempo\"?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    new doc.Paragraph({ spacing: { after: 40 }, children: [new doc.TextRun({ text: "USO EXCLUSIVO DO INSTRUTOR — remover antes de aplicar a prova", bold: true, color: doc.TERRA, font: doc.FONT, size: 20 })] }),
    doc.tituloH1("Gabarito"),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 1 — Questões objetivas", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 200 }, children: [new doc.TextRun({ text: gabaritoObjetivas.map((r, i) => `${i + 1}-${r}`).join("   ·   "), font: doc.FONT, size: 22, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 2 — Critério de correção da questão de caso", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "a) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Falta o bloco de tempo fixo reservado pra criação e o banco de conteúdo — ele tem os outros 3 elementos, mas cria individualmente, sem sistema de lote.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "b) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Passo 1 — reservar um bloco de tempo fixo, já que sem esse compromisso a criação continuará dependendo de \"sobrar tempo\".", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "c) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Resposta livre — deve ser um horário realista dentro da rotina dele, por exemplo entre sessões ou num período fixo semanal já disponível.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "d) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Com uma reserva de posts já prontos, ele não precisaria criar todo dia — a publicação viria do banco, aliviando a pressão diária de encontrar tempo.", font: doc.FONT, size: 21, color: doc.INK })] }),
  );

  return doc.salvar(doc.paginaDoc("Escola de Marketing para Psicólogos", RODAPE_DOC, children), "Modulo-3.6-Avaliacao.docx");
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
      n: 1, titulo: "Por que um sistema simples, e os 4 elementos", duracao: "10 min", slides: "1, 2, 3, 4",
      objetivo: "Sair sabendo por que um sistema simples importa e quais são os 4 elementos que ele consolida.",
      segmentos: [
        seg("0:00–0:40", "Abertura (gancho)", [{ fala: "Você não precisa de um calendário editorial de 50 posts pro trimestre inteiro — precisa de um sistema simples o bastante pra seguir de verdade, mesmo nas semanas mais cheias." }]),
        seg("0:40–1:30", "Por que isso importa", ["Este módulo fecha o Bloco 3 transformando os Módulos 3.1 a 3.5 num único sistema de planejamento."]),
        seg("1:30–7:30", "Os 4 elementos (mostrar slide 4)", [
          "Temas centrais, do Módulo 3.1.",
          "Formatos-pilares variados, dos Módulos 3.2 e 3.4.",
          "Frequência mínima viável, do Módulo 3.3.",
          "Canais priorizados: Instagram e email, sem dispersão.",
        ]),
        seg("7:30–10:00", "Fechamento", [{ fala: "Próxima aula: da pauta ao publicado sem esgotamento, e os 3 níveis de planejamento." }]),
      ],
    },
    {
      n: 2, titulo: "Da pauta ao publicado, e os 3 níveis de planejamento", duracao: "10 min", slides: "5, 6",
      objetivo: "Explicar a cadeia de criação sem esgotamento e os 3 níveis de planejamento.",
      segmentos: [
        seg("0:00–1:00", "Retomada rápida", ["Vimos os 4 elementos. Hoje, como eles se transformam numa rotina de fato."]),
        seg("1:00–5:00", "A cadeia (mostrar slide 5)", ["Bloco de criação → Banco de conteúdo → Publicação distribuída → Revisão mensal."]),
        seg("5:00–9:00", "Os 3 níveis (mostrar slide 6)", ["Mínimo, intermediário e avançado — comece pelo mínimo, quase sempre suficiente."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: os sinais de esgotamento no planejamento, e 3 abordagens comparadas." }]),
      ],
    },
    {
      n: 3, titulo: "Sinais de esgotamento e 3 abordagens comparadas", duracao: "10 min", slides: "7, 8",
      objetivo: "Reconhecer sinais de esgotamento no planejamento e comparar 3 abordagens diferentes.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Quatro sinais de esgotamento — e três abordagens, da improvisada à sustentável."]),
        seg("1:00–5:00", "Sinais de esgotamento (mostrar slide 7)", [
          "Criação em cima da hora.",
          "Nenhum banco de ideias.",
          "\"Nunca sei o que postar\".",
          "Sistema abandonado sob pressão.",
        ]),
        seg("5:00–9:00", "3 abordagens (mostrar slide 8)", ["Sem sistema, sistema rígido demais e sistema sustentável — o objetivo é sempre o terceiro."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: as 3 ferramentas simples de planejamento, e os 4 passos completos." }]),
      ],
    },
    {
      n: 4, titulo: "Ferramentas simples e os 4 passos", duracao: "10 min", slides: "9, 10",
      objetivo: "Conhecer as 3 ferramentas simples de planejamento e os 4 passos de montagem do sistema.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três ferramentas simples — e um processo de 4 passos pra montar seu próprio sistema."]),
        seg("1:00–5:00", "3 ferramentas (mostrar slide 9)", ["Lista de temas, bloco de criação e banco de reserva."]),
        seg("5:00–9:00", "Os 4 passos (mostrar slide 10)", ["Reservar bloco de tempo, criar mais do que publica, distribuir ao longo do período, revisar mensalmente."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: aplicando os 4 passos na prática." }]),
      ],
    },
    {
      n: 5, titulo: "Aplicação prática dos 4 passos", duracao: "11 min", slides: "11, 12",
      objetivo: "Aplicar os 4 passos com exemplos concretos.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Hoje colocamos os 4 passos em prática, montando um sistema real."]),
        seg("1:00–6:00", "Passos 1 e 2 (mostrar slide 11)", ["Escolha um horário realista, já livre na sua agenda.", { fala: "Nesse bloco de criação, em vez de fazer só o próximo post, consigo fazer 2 ou 3 de uma vez?" }]),
        seg("6:00–10:00", "Passos 3 e 4 (mostrar slide 12)", ["Publique do banco, não do que foi criado no mesmo dia.", "Revise mensalmente com base nas métricas do Bloco 4."]),
        seg("10:00–11:00", "Fechamento", [{ fala: "Próxima aula: um caso real de criação noturna, e o recap final do Bloco 3." }]),
      ],
    },
    {
      n: 6, titulo: "Prática guiada — a criação noturna e encerramento do Bloco 3", duracao: "12 min", slides: "13, 14, 15",
      objetivo: "Aplicar tudo que foi visto a um caso real e encerrar o Bloco 3.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["A última aula do Bloco 3 — um caso real, e o recap final."]),
        seg("1:00–4:30", "Apresentando o caso (mostrar slide 13)", ["Leia a vinheta com calma.", "Note que a culpa por não postar é o sintoma, não a causa raiz."]),
        seg("4:30–8:00", "Percorrendo as perguntas de discussão", ["Discuta em voz alta as 3 perguntas do slide 13.", "Esboce um sistema mínimo pra essa psicóloga."]),
        seg("8:00–10:00", "Quando buscar ajuda especializada (mostrar slide 14)", ["Percorra os 4 critérios do slide 14."]),
        seg("10:00–12:00", "Recap final e encerramento do bloco (mostrar slide 15)", [{ fala: "Retome os 4 pontos-chave. Você concluiu o Bloco 3 — estratégia, formatos, canais e planejamento numa rotina sustentável. Agora é hora dos exercícios e da avaliação." }]),
      ],
    },
  ];

  const totalMin = 10 + 10 + 10 + 10 + 11 + 12;

  const children = [
    ...doc.capa(KICKER, "Roteiro de Aulas — Calendário Editorial", "Módulo dividido em 6 vídeo-aulas de 10 a 12 minutos, seguindo os slides já produzidos. Cada aula tem roteiro cronometrado, pronto pra gravação. Este é o último roteiro do Bloco 3."),
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

  return doc.salvar(doc.paginaDoc("Escola de Marketing para Psicólogos", `${RODAPE_DOC} — Roteiro de Aulas`, children), "Modulo-3.6-Roteiro-Aulas.docx");
}

// ============================================================
Promise.resolve()
  .then(construirDeck)
  .then(construirExercicios)
  .then(construirProva)
  .then(construirRoteiro)
  .then(() => console.log("TUDO PRONTO"))
  .catch((e) => { console.error(e); process.exit(1); });

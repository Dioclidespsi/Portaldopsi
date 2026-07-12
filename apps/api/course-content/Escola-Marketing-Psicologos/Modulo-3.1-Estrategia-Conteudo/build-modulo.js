const deck = require("../_lib/lib-deck.js");
const doc = require("../_lib/lib-doc.js");

const MOD = "3.1";
const NOME = "Estratégia de Conteúdo";
const RODAPE_DECK = `Estratégia de Conteúdo — Módulo ${MOD}`;
const RODAPE_DOC = `Módulo ${MOD} — Estratégia de Conteúdo`;
const KICKER = "MÓDULO 3.1 · CONTEÚDO E AUTORIDADE";
const MARCA = "Escola de Marketing para Psicólogos — by Dioclides";

// ============================================================
// 1) SLIDE DECK
// ============================================================
function construirDeck() {
  const pres = deck.novaApresentacao(`${NOME} — Por Que e Para Quem`);

  deck.slideTitulo(pres, {
    moduloLabel: `Módulo ${MOD} · Bloco 3 · Conteúdo e Autoridade`,
    titulo: "Estratégia de Conteúdo",
    subtitulo: "Antes do formato e da frequência, definir o objetivo real do conteúdo — e pra qual paciente ele fala",
    rodapeMarca: MARCA,
    passos: ["Por quê", "Objetivo", "Público", "Pilares", "Aplicação"],
  });

  deck.slideRoteiro(pres, {
    rodape: RODAPE_DECK, pageNum: 2,
    cards: [
      { titulo: "Estratégia antes de tática", desc: "Por que postar sem plano custa mais esforço por menos resultado" },
      { titulo: "O objetivo do conteúdo", desc: "Autoridade, nutrição de interesse, ou conversão direta" },
      { titulo: "Pra quem você fala", desc: "O paciente ideal, não \"todo mundo que tem ansiedade\"" },
      { titulo: "Os 3 pilares editoriais", desc: "O que sustenta consistência sem parecer repetitivo" },
      { titulo: "Aplicação prática", desc: "Diagnosticando um perfil sem estratégia clara" },
    ],
  });

  deck.slideHook(pres, {
    rodape: RODAPE_DECK, pageNum: 3,
    frase: "Postar sem estratégia é como abrir um consultório sem saber que especialidade você atende — pode até funcionar, mas exige muito mais esforço pra um resultado bem menor.",
    apoio: "Este módulo abre o Bloco 3 com a pergunta que a maioria pula direto pro formato sem responder: por que você está criando esse conteúdo, e pra quem?",
  });

  deck.slideCircuito(pres, {
    rodape: RODAPE_DECK, pageNum: 4,
    titulo: "4 elementos de uma estratégia de conteúdo",
    regioes: [
      { label: "Objetivo claro: autoridade, nutrição ou conversão", rx: 0.20, ry: 0.22, color: deck.NAVY, d: 0.5 },
      { label: "Paciente ideal definido, do Módulo 1.2", rx: 0.22, ry: 0.62, color: deck.TERRA, d: 0.4 },
      { label: "Tom de voz consistente em cada publicação", rx: 0.60, ry: 0.60, color: deck.NAVY_TINT, d: 0.36 },
      { label: "Frequência sustentável, que cabe na sua rotina real", rx: 0.58, ry: 0.24, color: deck.TERRA_TINT, d: 0.36 },
    ],
    notas: [
      "Sem objetivo claro, é impossível saber se um post \"funcionou\" ou não — funcionou pra fazer o quê?",
      "O paciente ideal definido no Bloco 1 deveria orientar cada escolha de tema, não só a bio do perfil.",
    ],
  });

  deck.slideCadeia(pres, {
    rodape: RODAPE_DECK, pageNum: 5,
    titulo: "Do objetivo ao conteúdo publicado",
    elos: [
      { titulo: "Definir o objetivo", desc: "O que esse conteúdo deveria gerar, especificamente" },
      { titulo: "Definir o público", desc: "Pra quem, exatamente, esse conteúdo está falando" },
      { titulo: "Escolher os temas", desc: "2 ou 3 áreas centrais, não um tema novo a cada post" },
      { titulo: "Publicar com consistência", desc: "Um ritmo sustentável, mantido ao longo do tempo" },
    ],
    notaFinal: "Pular direto pra \"escolher os temas\" sem definir objetivo e público é o motivo mais comum de conteúdo que não converte em nada.",
  });

  deck.slideCategorias(pres, {
    rodape: RODAPE_DECK, pageNum: 6,
    titulo: "3 objetivos possíveis de conteúdo",
    categorias: [
      { titulo: "Construir autoridade", desc: "Educar e demonstrar competência, sem foco imediato em conversão", color: deck.NAVY },
      { titulo: "Nutrir interesse", desc: "Aprofundar a relação com quem já segue, mantendo confiança", color: deck.TERRA },
      { titulo: "Converter em contato", desc: "Convidar diretamente quem já considera a dar o próximo passo", color: deck.NAVY_TINT },
    ],
    notaFinal: "Um perfil saudável tem conteúdo pros 3 objetivos — o erro comum é publicar só pro primeiro, esquecendo os outros dois.",
  });

  deck.slideSinais(pres, {
    rodape: RODAPE_DECK, pageNum: 7,
    titulo: "Sinais de que falta estratégia",
    itens: [
      { titulo: "Posta sem saber pra quem", desc: "O conteúdo tenta agradar todo mundo, e por isso não fala com ninguém" },
      { titulo: "Tema muda toda semana", desc: "Sem padrão nem linha editorial reconhecível" },
      { titulo: "Objetivo do perfil incerto", desc: "Não saberia dizer, em uma frase, pra que serve aquele conteúdo" },
      { titulo: "Comparação sem critério", desc: "Copia o que outros perfis fazem, sem avaliar se cabe na própria estratégia" },
    ],
  });

  deck.slideDiferencial(pres, {
    rodape: RODAPE_DECK, pageNum: 8,
    titulo: "3 níveis de estratégia",
    cards: [
      { titulo: "Sem estratégia", desc: "Posta o que vem à cabeça, sem objetivo nem público definidos" },
      { titulo: "Estratégia parcial", desc: "Sabe o tema geral, mas não o objetivo específico de cada post" },
      { titulo: "Estratégia clara", desc: "Objetivo, público e tema alinhados antes de qualquer publicação" },
    ],
  });

  deck.slideInstrumentos(pres, {
    rodape: RODAPE_DECK, pageNum: 9,
    titulo: "3 perguntas que definem a estratégia",
    instrumentos: [
      { sigla: "Pra quem?", nome: "Que paciente ideal esse conteúdo tenta alcançar", desc: "Se a resposta for \"todo mundo\", ainda não está definida." },
      { sigla: "Que problema?", nome: "Que dúvida ou dor esse conteúdo endereça", desc: "Conteúdo sem problema claro tende a ser genérico demais." },
      { sigla: "Que ação?", nome: "O que você quer que a pessoa faça depois de ver isso", desc: "Seguir, salvar, mandar mensagem, ou apenas refletir — escolha uma." },
    ],
  });

  deck.slideProtocoloOverview(pres, {
    rodape: RODAPE_DECK, pageNum: 10,
    titulo: "Construindo a estratégia: 4 passos",
    passos: [
      { titulo: "Definir o\npaciente ideal", desc: "Reaproveitando o trabalho já feito no Módulo 1.2" },
      { titulo: "Escolher\n2 a 3 temas centrais", desc: "Áreas que você domina e que interessam ao seu público" },
      { titulo: "Definir o\nobjetivo principal", desc: "Autoridade, nutrição ou conversão — comece por um" },
      { titulo: "Criar um ritmo\nsustentável", desc: "Uma frequência que você consegue manter por meses, não semanas" },
    ],
    notaFinal: "Esses 4 passos, feitos uma vez com cuidado, orientam meses de conteúdo sem precisar decidir tudo de novo a cada post.",
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 11,
    titulo: "Passos 1 e 2, na prática",
    colunas: [
      {
        numero: 1, titulo: "Definir o paciente ideal",
        bullets: ["Reveja o trabalho do Módulo 1.2 — a estratégia de conteúdo parte diretamente dali", "Se ainda não está claro, volte a esse módulo antes de seguir"],
      },
      {
        numero: 2, titulo: "Escolher 2 a 3 temas centrais",
        fala: "“Se alguém seguisse meu perfil por um ano inteiro, sobre quais 2 ou 3 assuntos essa pessoa aprenderia mais?”",
        bullets: ["Menos temas, com mais profundidade, constroem autoridade melhor que muitos temas rasos"],
      },
    ],
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 12,
    titulo: "Passos 3 e 4, na prática",
    colunas: [
      {
        numero: 3, titulo: "Definir o objetivo principal",
        bullets: ["Comece por um objetivo — autoridade, nutrição ou conversão — e domine esse antes de somar os outros", "Cada objetivo pede um tipo de conteúdo diferente, revisado no Módulo 3.2"],
      },
      {
        numero: 4, titulo: "Criar um ritmo sustentável",
        bullets: ["Prefira uma frequência menor e constante a uma alta que você abandona em poucas semanas", "Consistência ao longo de meses importa mais que volume em uma única semana"],
      },
    ],
  });

  deck.slideCaso(pres, {
    rodape: RODAPE_DECK, pageNum: 13,
    vinheta: "Um psicólogo publica quase todos os dias, mas os temas variam muito: um dia fala de ansiedade, outro de produtividade, outro compartilha uma frase motivacional, outro fala sobre um livro que está lendo. Ele sente que está sempre produzindo, mas o perfil não parece ter identidade clara, e o crescimento estagnou.",
    perguntas: [
      "Que sinal do slide 7 esse caso exemplifica com mais clareza?",
      "Em que nível de estratégia (slide 8) esse perfil está hoje?",
      "Como as 3 perguntas do slide 9 ajudariam a organizar o conteúdo desse psicólogo?",
    ],
  });

  deck.slideEncaminhamento(pres, {
    rodape: RODAPE_DECK, pageNum: 14,
    titulo: "Quando buscar ajuda especializada",
    criterios: [
      "Dificuldade persistente em definir o paciente ideal: retomar o Módulo 1.2 com mais tempo e calma",
      "Volume de conteúdo grande, mas sem direção clara: considerar consultoria de conteúdo especializada em saúde",
      "Estratégia definida, mas execução inconsistente: revisar o Módulo 3.6, sobre planejamento editorial",
      "Dúvida entre focar em autoridade ou conversão: comece pela autoridade — conversão sem confiança prévia converte menos"
    ],
  });

  deck.slideRecap(pres, {
    rodape: RODAPE_DECK, pageNum: 15,
    pontos: [
      "Estratégia antecede tática — definir objetivo e público antes de escolher formato e frequência",
      "Autoridade, nutrição de interesse e conversão são os 3 objetivos possíveis de conteúdo",
      "\"Pra quem, que problema, que ação\" são as 3 perguntas que organizam qualquer estratégia de conteúdo",
      "Menos temas, com mais profundidade e consistência, constroem mais autoridade que muitos temas rasos",
    ],
    proximoTexto: "Próximo: exercícios práticos e avaliação do Módulo 3.1 →",
  });

  return pres.writeFile({ fileName: "Modulo-3.1-Estrategia-Conteudo.pptx" });
}

// ============================================================
// 2) EXERCÍCIOS
// ============================================================
function construirExercicios() {
  const children = [
    ...doc.capa(KICKER, "Exercícios — Estratégia de Conteúdo", "Resolva individualmente, de preferência aplicando ao seu próprio perfil ou plano de conteúdo real."),

    doc.exNum(1, "Os 4 elementos da estratégia"),
    doc.pergunta(1, "Liste os 4 elementos de uma estratégia de conteúdo vistos no módulo."),
    ...doc.linhaResposta(3),

    doc.exNum(2, "Os 3 objetivos de conteúdo"),
    doc.tabelaSimples(["Objetivo", "O que busca gerar"], [["Construir autoridade", ""], ["Nutrir interesse", ""], ["Converter em contato", ""]], [3600, 5550]),

    doc.exNum(3, "As 3 perguntas aplicadas"),
    doc.pergunta(1, "Responda as 3 perguntas do slide 9 pensando no seu próprio conteúdo (ou num conteúdo que você pretende criar)."),
    ...doc.linhaResposta(4),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),

    doc.exNum(4, "Definindo seus temas centrais"),
    doc.pergunta(1, "Liste de 2 a 3 temas centrais que você dominaria por um ano inteiro de conteúdo."),
    ...doc.linhaResposta(3),

    doc.exNum(5, "Caso integrado — os temas variados"),
    doc.vinhetaBox("Um psicólogo publica quase todo dia, mas os temas variam muito (ansiedade, produtividade, frase motivacional, livro), e o perfil não parece ter identidade clara."),
    doc.pergunta(1, "Que sinal de falta de estratégia esse caso exemplifica com mais clareza?"),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Em que nível de estratégia esse perfil está hoje?"),
    ...doc.linhaResposta(2),
    doc.pergunta(3, "Como as 3 perguntas do módulo ajudariam a organizar o conteúdo desse psicólogo?"),
    ...doc.linhaResposta(2),
  ];

  return doc.salvar(doc.paginaDoc("Escola de Marketing para Psicólogos", RODAPE_DOC, children), "Modulo-3.1-Exercicios.docx");
}

// ============================================================
// 3) AVALIAÇÃO
// ============================================================
function construirProva() {
  const objetivas = [
    ["Os 4 elementos de uma estratégia de conteúdo, segundo o módulo, são:", ["Objetivo claro, paciente ideal, tom de voz consistente, frequência sustentável", "Alcance, engajamento, agendamento e custo por lead", "Identificação, veracidade, sigilo e comparação", "Reconhecimento, geração de contato e remarketing"]],
    ["Os 3 objetivos possíveis de conteúdo, segundo o módulo, são:", ["Construir autoridade, nutrir interesse, converter em contato", "Topo, meio e fundo de funil", "Preço, localização e horário de atendimento", "Depoimento, antes e depois e urgência artificial"]],
    ["Um perfil saudável, segundo o módulo, deveria ter conteúdo:", ["Para os 3 objetivos, não apenas para um deles", "Exclusivamente voltado para conversão direta", "Apenas para construção de autoridade, sem outros objetivos", "Sem qualquer relação com o paciente ideal definido"]],
    ["\"Tema muda toda semana, sem padrão\" é descrito no módulo como:", ["Um sinal de falta de estratégia de conteúdo", "Uma prática recomendada para manter o público engajado", "Um sinal de estratégia clara e bem definida", "Irrelevante para o resultado do conteúdo"]],
    ["A pergunta \"que ação eu quero que a pessoa tome depois?\" busca:", ["Definir um resultado específico esperado para aquele conteúdo", "Substituir a necessidade de definir o paciente ideal", "Ser respondida apenas em conteúdo pago, não orgânico", "Garantir automaticamente mais seguidores ao perfil"]],
    ["\"Estratégia parcial\", segundo a classificação do módulo, se caracteriza por:", ["Saber o tema geral, mas não o objetivo específico de cada post", "Não ter absolutamente nenhuma direção de conteúdo", "Ter objetivo, público e tema completamente alinhados", "Publicar exclusivamente conteúdo de conversão"]],
    ["Escolher poucos temas centrais, segundo o módulo, tende a:", ["Construir mais autoridade do que muitos temas rasos", "Reduzir o alcance do perfil de forma permanente", "Ser menos eficaz do que abordar qualquer assunto disponível", "Substituir a necessidade de definir o paciente ideal"]],
    ["Diante de dúvida entre focar em autoridade ou conversão, o módulo recomenda:", ["Começar pela autoridade, já que conversão sem confiança prévia converte menos", "Focar exclusivamente em conversão desde o primeiro conteúdo", "Ignorar completamente a construção de autoridade", "Escolher aleatoriamente entre os dois objetivos"]],
    ["O passo \"criar um ritmo sustentável\" recomenda:", ["Uma frequência menor e constante, em vez de uma alta e abandonada rápido", "Publicar todos os dias, independente da rotina real", "Frequência é irrelevante desde que o tema seja bom", "Publicar apenas uma vez por ano, para reduzir esforço"]],
    ["Este módulo abre o Bloco 3 com qual pergunta central?", ["Por que criar esse conteúdo, e para quem", "Que formato de vídeo gera mais engajamento", "Qual plataforma de anúncio pago escolher", "Como precificar uma sessão de terapia"]],
  ];
  const gabaritoObjetivas = ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a"];

  const children = [
    ...doc.capa(KICKER, "Avaliação — Estratégia de Conteúdo", `Avaliação formativa de encerramento do Módulo ${MOD}.`),
    doc.infoBox([
      ["Nota de corte:", "70 de 100 pontos"],
      ["Tempo sugerido:", "25 minutos"],
      ["Composição:", "10 questões objetivas (6 pts cada = 60 pts) + 1 questão de caso (40 pts)"],
      ["Consulta:", "Material da aula permitido; discussão entre colegas, não"],
    ]),
    doc.tituloH1("Parte 1 — Questões objetivas"),
  ];
  objetivas.forEach((q, i) => children.push(...doc.questaoObjetiva(i + 1, q[0], q[1])));

  children.push(
    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    doc.tituloH1("Parte 2 — Questão de caso (40 pontos)"),
    doc.vinhetaBox("Uma psicóloga especializada em ansiedade em adultos jovens quer começar a publicar conteúdo, mas está insegura sobre o que postar e com que frequência. Ela pede ajuda pra montar uma estratégia do zero."),
    new doc.Paragraph({ spacing: { before: 240 }, children: [new doc.TextRun({ text: "Com base no protocolo estudado, responda:", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    new doc.Paragraph({ spacing: { before: 220, after: 40 }, children: [new doc.TextRun({ text: "a) (10 pts) Responda as 3 perguntas do slide 9 para o caso dela.", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(3),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "b) (10 pts) Sugira 2 a 3 temas centrais coerentes com sua especialidade.", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "c) (10 pts) Que objetivo principal você recomendaria pra ela começar, e por quê?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "d) (10 pts) Que frequência de publicação você sugeriria como ponto de partida sustentável?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    new doc.Paragraph({ spacing: { after: 40 }, children: [new doc.TextRun({ text: "USO EXCLUSIVO DO INSTRUTOR — remover antes de aplicar a prova", bold: true, color: doc.TERRA, font: doc.FONT, size: 20 })] }),
    doc.tituloH1("Gabarito"),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 1 — Questões objetivas", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 200 }, children: [new doc.TextRun({ text: gabaritoObjetivas.map((r, i) => `${i + 1}-${r}`).join("   ·   "), font: doc.FONT, size: 22, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 2 — Critério de correção da questão de caso", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "a) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Pra quem: adultos jovens com ansiedade. Que problema: dúvidas sobre ansiedade no início da vida adulta. Que ação: gerar reconhecimento e, aos poucos, contato inicial.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "b) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Exemplos aceitáveis: mecanismos da ansiedade explicados de forma acessível; desafios específicos da vida adulta jovem; como funciona o processo terapêutico.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "c) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Autoridade — por ser um perfil novo, construir confiança e credibilidade vem antes de converter, já que conversão sem confiança prévia tende a converter menos.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "d) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Uma frequência menor e constante (por exemplo, 2 vezes por semana) que ela consiga manter por meses, em vez de uma frequência alta que corre risco de ser abandonada.", font: doc.FONT, size: 21, color: doc.INK })] }),
  );

  return doc.salvar(doc.paginaDoc("Escola de Marketing para Psicólogos", RODAPE_DOC, children), "Modulo-3.1-Avaliacao.docx");
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
      n: 1, titulo: "Estratégia antes de tática, e os 4 elementos", duracao: "13 min", slides: "1, 2, 3, 4",
      objetivo: "Sair sabendo por que estratégia importa antes do formato e quais são os 4 elementos que a compõem.",
      segmentos: [
        seg("0:00–0:45", "Abertura (gancho)", [{ fala: "Postar sem estratégia é como abrir um consultório sem saber que especialidade você atende — pode até funcionar, mas exige muito mais esforço pra um resultado bem menor." }]),
        seg("0:45–2:00", "Por que isso importa", ["Este módulo abre o Bloco 3 com a pergunta que a maioria pula: por que esse conteúdo, e pra quem?"]),
        seg("2:00–9:00", "Os 4 elementos (mostrar slide 4)", [
          "Objetivo claro: autoridade, nutrição ou conversão.",
          "Paciente ideal definido, do Módulo 1.2.",
          "Tom de voz consistente em cada publicação.",
          "Frequência sustentável, que cabe na rotina real.",
        ]),
        seg("9:00–12:00", "Um ponto importante", ["Sem objetivo claro, é impossível saber se um post \"funcionou\" ou não."]),
        seg("12:00–13:00", "Fechamento", [{ fala: "Próxima aula: do objetivo ao conteúdo publicado, e os 3 objetivos possíveis." }]),
      ],
    },
    {
      n: 2, titulo: "Do objetivo ao publicado, e os 3 objetivos possíveis", duracao: "12 min", slides: "5, 6",
      objetivo: "Explicar a cadeia da estratégia e diferenciar os 3 objetivos de conteúdo.",
      segmentos: [
        seg("0:00–1:00", "Retomada rápida", ["Vimos os 4 elementos. Hoje, o caminho completo até o conteúdo publicado."]),
        seg("1:00–6:00", "A cadeia (mostrar slide 5)", ["Definir objetivo → Definir público → Escolher temas → Publicar com consistência."]),
        seg("6:00–11:00", "Os 3 objetivos (mostrar slide 6)", ["Construir autoridade, nutrir interesse e converter em contato — um perfil saudável tem os 3."]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Próxima aula: os sinais de que falta estratégia, e 3 níveis de organização." }]),
      ],
    },
    {
      n: 3, titulo: "Sinais de alerta e os 3 níveis de estratégia", duracao: "12 min", slides: "7, 8",
      objetivo: "Reconhecer sinais de falta de estratégia e diferenciar os 3 níveis de organização.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Quatro sinais de alerta — e três níveis, do sem estratégia ao claro."]),
        seg("1:00–6:00", "Sinais de alerta (mostrar slide 7)", [
          "Posta sem saber pra quem.",
          "Tema muda toda semana.",
          "Objetivo do perfil incerto.",
          "Comparação sem critério.",
        ]),
        seg("6:00–11:00", "Os 3 níveis (mostrar slide 8)", ["Sem estratégia, estratégia parcial e estratégia clara — cada um exigindo um esforço diferente pra sair do estágio."]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Próxima aula: as 3 perguntas que definem a estratégia, e os 4 passos completos." }]),
      ],
    },
    {
      n: 4, titulo: "As 3 perguntas e os 4 passos", duracao: "11 min", slides: "9, 10",
      objetivo: "Conhecer as 3 perguntas centrais e os 4 passos de construção da estratégia.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três perguntas simples — e um processo de 4 passos pra montar sua estratégia."]),
        seg("1:00–5:00", "3 perguntas (mostrar slide 9)", ["Pra quem, que problema e que ação — as 3 perguntas que organizam qualquer estratégia."]),
        seg("5:00–10:00", "Os 4 passos (mostrar slide 10)", ["Definir o paciente ideal, escolher 2 a 3 temas, definir o objetivo principal, criar um ritmo sustentável."]),
        seg("10:00–11:00", "Fechamento", [{ fala: "Próxima aula: aplicando os 4 passos na prática." }]),
      ],
    },
    {
      n: 5, titulo: "Aplicação prática dos 4 passos", duracao: "12 min", slides: "11, 12",
      objetivo: "Aplicar os 4 passos com exemplos concretos.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Hoje colocamos os 4 passos em prática, do paciente ideal ao ritmo sustentável."]),
        seg("1:00–6:00", "Passos 1 e 2 (mostrar slide 11)", ["Reveja o trabalho do Módulo 1.2 antes de seguir.", { fala: "Se alguém seguisse meu perfil por um ano inteiro, sobre quais 2 ou 3 assuntos essa pessoa aprenderia mais?" }]),
        seg("6:00–11:00", "Passos 3 e 4 (mostrar slide 12)", ["Comece por um objetivo antes de somar os outros.", "Prefira frequência menor e constante a uma alta e abandonada."]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Próxima aula: um caso real de conteúdo sem direção clara, e o recap final." }]),
      ],
    },
    {
      n: 6, titulo: "Prática guiada — os temas variados e recap final", duracao: "13 min", slides: "13, 14, 15",
      objetivo: "Aplicar tudo que foi visto a um caso real e consolidar os pontos-chave do módulo.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["A última aula do módulo — um caso real, e o recap final."]),
        seg("1:00–5:00", "Apresentando o caso (mostrar slide 13)", ["Leia a vinheta com calma.", "Note que o problema não é falta de esforço — é falta de direção."]),
        seg("5:00–9:00", "Percorrendo as perguntas de discussão", ["Discuta em voz alta as 3 perguntas do slide 13.", "Esboce uma estratégia mais clara pra esse caso."]),
        seg("9:00–11:00", "Quando buscar ajuda especializada (mostrar slide 14)", ["Percorra os 4 critérios do slide 14."]),
        seg("11:00–13:00", "Recap final (mostrar slide 15)", [{ fala: "Retome os 4 pontos-chave do módulo. Agora é hora dos exercícios e da avaliação — e do próximo módulo, sobre pilares de conteúdo que educam sem prometer." }]),
      ],
    },
  ];

  const totalMin = 13 + 12 + 12 + 11 + 12 + 13;

  const children = [
    ...doc.capa(KICKER, "Roteiro de Aulas — Estratégia de Conteúdo", "Módulo dividido em 6 vídeo-aulas de 11 a 13 minutos, seguindo os slides já produzidos. Cada aula tem roteiro cronometrado, pronto pra gravação."),
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

  return doc.salvar(doc.paginaDoc("Escola de Marketing para Psicólogos", `${RODAPE_DOC} — Roteiro de Aulas`, children), "Modulo-3.1-Roteiro-Aulas.docx");
}

// ============================================================
Promise.resolve()
  .then(construirDeck)
  .then(construirExercicios)
  .then(construirProva)
  .then(construirRoteiro)
  .then(() => console.log("TUDO PRONTO"))
  .catch((e) => { console.error(e); process.exit(1); });

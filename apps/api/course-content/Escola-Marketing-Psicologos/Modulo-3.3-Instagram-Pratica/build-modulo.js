const deck = require("../_lib/lib-deck.js");
const doc = require("../_lib/lib-doc.js");

const MOD = "3.3";
const NOME = "Instagram na Prática";
const RODAPE_DECK = `Instagram na Prática — Módulo ${MOD}`;
const RODAPE_DOC = `Módulo ${MOD} — Instagram na Prática`;
const KICKER = "MÓDULO 3.3 · CONTEÚDO E AUTORIDADE";
const MARCA = "Escola de Marketing para Psicólogos — by Dioclides";

// ============================================================
// 1) SLIDE DECK
// ============================================================
function construirDeck() {
  const pres = deck.novaApresentacao(`${NOME} — Formatos e Frequência Sustentável`);

  deck.slideTitulo(pres, {
    moduloLabel: `Módulo ${MOD} · Bloco 3 · Conteúdo e Autoridade`,
    titulo: "Instagram na Prática",
    subtitulo: "O que realmente funciona nesse formato, sem exigir postar todo dia pra sempre",
    rodapeMarca: MARCA,
    passos: ["Por quê", "Formatos", "Frequência", "Erros", "Aplicação"],
  });

  deck.slideRoteiro(pres, {
    rodape: RODAPE_DECK, pageNum: 2,
    cards: [
      { titulo: "Por que Instagram", desc: "O que a plataforma resolve melhor que as outras" },
      { titulo: "Os formatos disponíveis", desc: "Feed, Stories e Carrossel, cada um com uma função" },
      { titulo: "Frequência sustentável", desc: "O ritmo que você consegue manter, não o ideal teórico" },
      { titulo: "Erros comuns", desc: "Sinais de que o perfil virou fonte de ansiedade" },
      { titulo: "Aplicação prática", desc: "Ajustando um perfil que está insustentável" },
    ],
  });

  deck.slideHook(pres, {
    rodape: RODAPE_DECK, pageNum: 3,
    frase: "Instagram não recompensa quem posta mais — recompensa quem entende qual formato serve pra qual objetivo, e mantém isso por meses, não por uma semana de euforia.",
    apoio: "Este módulo aplica a estratégia dos Módulos 3.1 e 3.2 especificamente ao Instagram, o canal mais usado por psicólogos no Brasil.",
  });

  deck.slideCircuito(pres, {
    rodape: RODAPE_DECK, pageNum: 4,
    titulo: "4 elementos de uma presença sustentável",
    regioes: [
      { label: "Formato certo pro objetivo de cada publicação", rx: 0.20, ry: 0.22, color: deck.NAVY, d: 0.5 },
      { label: "Frequência que cabe na sua rotina real", rx: 0.22, ry: 0.62, color: deck.TERRA, d: 0.4 },
      { label: "Bio que orienta claramente o próximo passo", rx: 0.60, ry: 0.60, color: deck.NAVY_TINT, d: 0.36 },
      { label: "Destaques organizados por tema, fáceis de navegar", rx: 0.58, ry: 0.24, color: deck.TERRA_TINT, d: 0.36 },
    ],
    notas: [
      "Um perfil sustentável não é o que posta mais — é o que mantém consistência sem gerar ansiedade em quem publica.",
      "Bio e destaques costumam ser esquecidos, mas pesam tanto quanto o conteúdo do feed na primeira impressão.",
    ],
  });

  deck.slideCadeia(pres, {
    rodape: RODAPE_DECK, pageNum: 5,
    titulo: "Do feed à conversa",
    elos: [
      { titulo: "Feed", desc: "Primeira impressão — o que alguém vê ao chegar no perfil" },
      { titulo: "Stories", desc: "Proximidade e frequência, sem exigir produção elaborada" },
      { titulo: "Bio", desc: "Orientação clara sobre quem você é e o que fazer a seguir" },
      { titulo: "Direct", desc: "Onde a conversa real acontece, fora do funil público" },
    ],
    notaFinal: "Cada elo dessa cadeia cumpre um papel diferente — negligenciar qualquer um deles enfraquece o conjunto inteiro.",
  });

  deck.slideCategorias(pres, {
    rodape: RODAPE_DECK, pageNum: 6,
    titulo: "3 formatos e sua função",
    categorias: [
      { titulo: "Feed e Reels", desc: "Alcance — atrai quem ainda não conhece seu trabalho", color: deck.NAVY },
      { titulo: "Stories", desc: "Proximidade — nutre quem já segue, com frequência leve", color: deck.TERRA },
      { titulo: "Carrossel", desc: "Profundidade — converte interesse em confiança real", color: deck.NAVY_TINT },
    ],
    notaFinal: "Os 3 formatos, junto com os 3 objetivos do Módulo 3.1, formam uma matriz simples pra decidir o que postar e onde.",
  });

  deck.slideSinais(pres, {
    rodape: RODAPE_DECK, pageNum: 7,
    titulo: "Sinais de que o ritmo está insustentável",
    itens: [
      { titulo: "Ansiedade a cada queda", desc: "Engajamento menor gera desconforto desproporcional" },
      { titulo: "Comparação constante", desc: "Medir o próprio perfil pelo de outros, sem critério claro" },
      { titulo: "Pressão de postar hoje", desc: "Sensação diária de obrigação, mesmo sem conteúdo pronto" },
      { titulo: "Queda de qualidade", desc: "Pressa de publicar comprometendo o cuidado com o conteúdo" },
    ],
  });

  deck.slideDiferencial(pres, {
    rodape: RODAPE_DECK, pageNum: 8,
    titulo: "3 ritmos possíveis",
    cards: [
      { titulo: "Insustentável", desc: "Todo dia, sem planejamento — abandonado em poucas semanas" },
      { titulo: "Mínimo viável", desc: "2 a 3 vezes por semana, com planejamento prévio simples" },
      { titulo: "Ideal", desc: "Frequência maior, mas só quando já existe rotina consolidada" },
    ],
  });

  deck.slideInstrumentos(pres, {
    rodape: RODAPE_DECK, pageNum: 9,
    titulo: "3 elementos que todo perfil deveria ter",
    instrumentos: [
      { sigla: "Bio clara", nome: "Especialidade e forma de atendimento em poucas palavras", desc: "A primeira coisa que qualquer visitante lê." },
      { sigla: "Destaques", nome: "Organizados por tema, fáceis de navegar", desc: "Funcionam como um \"sumário\" do seu trabalho." },
      { sigla: "Link visível", nome: "Contato ou agendamento fácil de encontrar", desc: "Sem isso, o interesse gerado se perde no caminho." },
    ],
  });

  deck.slideProtocoloOverview(pres, {
    rodape: RODAPE_DECK, pageNum: 10,
    titulo: "Ajustando o perfil: 4 passos",
    passos: [
      { titulo: "Definir a\nfrequência mínima", desc: "O ritmo que você mantém mesmo em semanas cheias" },
      { titulo: "Organizar\nos destaques", desc: "Por tema, refletindo os 2 a 3 temas centrais do Módulo 3.1" },
      { titulo: "Revisar\na bio", desc: "Especialidade clara e próximo passo evidente" },
      { titulo: "Revisar o perfil\ncomo visitante", desc: "Olhando como se fosse a primeira vez, sem familiaridade prévia" },
    ],
    notaFinal: "Esses 4 passos, feitos uma vez, sustentam meses de presença consistente sem exigir refazer tudo a cada semana.",
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 11,
    titulo: "Passos 1 e 2, na prática",
    colunas: [
      {
        numero: 1, titulo: "Definir a frequência mínima",
        bullets: ["Escolha o ritmo que você mantém mesmo nas semanas mais cheias, não o ideal de uma semana tranquila", "É melhor prometer menos e cumprir sempre do que prometer muito e abandonar"],
      },
      {
        numero: 2, titulo: "Organizar os destaques",
        fala: "“Se eu fosse um visitante novo, os destaques me ajudariam a entender rápido o que esse perfil oferece?”",
        bullets: ["Reflita os 2 a 3 temas centrais definidos no Módulo 3.1"],
      },
    ],
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 12,
    titulo: "Passos 3 e 4, na prática",
    colunas: [
      {
        numero: 3, titulo: "Revisar a bio",
        bullets: ["Especialidade clara em poucas palavras, sem jargão técnico desnecessário", "Um próximo passo evidente: link, mensagem direta, ou botão de contato"],
      },
      {
        numero: 4, titulo: "Revisar como visitante",
        bullets: ["Peça a alguém de fora da área pra visitar seu perfil e dizer o que entendeu em 10 segundos", "Se a resposta for confusa, o problema está na apresentação, não no conteúdo em si"],
      },
    ],
  });

  deck.slideCaso(pres, {
    rodape: RODAPE_DECK, pageNum: 13,
    vinheta: "Uma psicóloga decidiu postar todos os dias após ver um curso sobre redes sociais. Nas primeiras 2 semanas, manteve o ritmo com entusiasmo. Na terceira semana, já sentia ansiedade toda manhã por não ter conteúdo pronto, e alguns posts começaram a sair apressados, com erros de digitação e pouca profundidade. Ela está pensando em parar de postar por completo.",
    perguntas: [
      "Que sinais do slide 7 essa psicóloga já está apresentando?",
      "Em que ritmo (slide 8) ela tentou operar, e por que não era sustentável pra ela?",
      "Como os 4 passos do protocolo ajudariam a reorganizar essa situação, sem precisar parar de vez?",
    ],
  });

  deck.slideEncaminhamento(pres, {
    rodape: RODAPE_DECK, pageNum: 14,
    titulo: "Quando buscar ajuda especializada",
    criterios: [
      "Dificuldade persistente em manter até a frequência mínima viável: simplificar ainda mais, mesmo que pareça pouco",
      "Perfil tecnicamente correto, mas sem crescimento após meses: revisar a estratégia do Módulo 3.1, não só a execução",
      "Ansiedade significativa relacionada ao desempenho do perfil: tratar como prioridade, mesmo que signifique pausar temporariamente",
      "Necessidade de produção visual mais elaborada: considerar apoio de designer ou editor, dentro do orçamento disponível"
    ],
  });

  deck.slideRecap(pres, {
    rodape: RODAPE_DECK, pageNum: 15,
    pontos: [
      "Feed e Reels atraem, Stories aproximam, Carrossel aprofunda — cada formato com uma função específica",
      "Frequência mínima viável, mantida por meses, vale mais que frequência alta abandonada em semanas",
      "Bio clara, destaques organizados e link visível sustentam a primeira impressão tanto quanto o conteúdo do feed",
      "Definir frequência, organizar destaques, revisar a bio e revisar como visitante resolvem a maioria dos perfis insustentáveis",
    ],
    proximoTexto: "Próximo: exercícios práticos e avaliação do Módulo 3.3 →",
  });

  return pres.writeFile({ fileName: "Modulo-3.3-Instagram-Pratica.pptx" });
}

// ============================================================
// 2) EXERCÍCIOS
// ============================================================
function construirExercicios() {
  const children = [
    ...doc.capa(KICKER, "Exercícios — Instagram na Prática", "Resolva individualmente, de preferência revisando seu próprio perfil enquanto responde."),

    doc.exNum(1, "Os 4 elementos de uma presença sustentável"),
    doc.pergunta(1, "Liste os 4 elementos vistos no módulo."),
    ...doc.linhaResposta(3),

    doc.exNum(2, "Os 3 formatos e sua função"),
    doc.tabelaSimples(["Formato", "Função principal"], [["Feed e Reels", ""], ["Stories", ""], ["Carrossel", ""]], [3600, 5550]),

    doc.exNum(3, "Avaliando seu próprio perfil"),
    doc.pergunta(1, "Sua bio está clara sobre especialidade e próximo passo? O que mudaria?"),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Seus destaques estão organizados por tema? Refletem seus 2 a 3 temas centrais?"),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),

    doc.exNum(4, "Definindo sua frequência mínima"),
    doc.pergunta(1, "Qual frequência de postagem você consegue manter mesmo nas semanas mais cheias? Anote como compromisso."),
    ...doc.linhaResposta(2),

    doc.exNum(5, "Caso integrado — postar todos os dias"),
    doc.vinhetaBox("Uma psicóloga decidiu postar todos os dias, mas na terceira semana já sentia ansiedade e os posts saíam apressados, e ela pensa em parar de postar por completo."),
    doc.pergunta(1, "Que sinais de ritmo insustentável essa psicóloga já está apresentando?"),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Em que ritmo ela tentou operar, e por que não era sustentável pra ela?"),
    ...doc.linhaResposta(2),
    doc.pergunta(3, "Como os 4 passos do protocolo ajudariam a reorganizar essa situação, sem parar de vez?"),
    ...doc.linhaResposta(2),
  ];

  return doc.salvar(doc.paginaDoc("Escola de Marketing para Psicólogos", RODAPE_DOC, children), "Modulo-3.3-Exercicios.docx");
}

// ============================================================
// 3) AVALIAÇÃO
// ============================================================
function construirProva() {
  const objetivas = [
    ["Os 4 elementos de uma presença sustentável, segundo o módulo, são:", ["Formato certo, frequência sustentável, bio clara, destaques organizados", "Alcance, engajamento, agendamento e custo por lead", "Explicação, mito x fato, bastidores e reflexão guiada", "Identificação, veracidade, sigilo e comparação"]],
    ["A função principal do Feed e Reels, segundo o módulo, é:", ["Alcance — atrair quem ainda não conhece o trabalho", "Proximidade — nutrir quem já segue o perfil", "Profundidade — converter interesse em confiança", "Substituir completamente a necessidade de Stories"]],
    ["Stories, segundo o módulo, servem principalmente para:", ["Proximidade, com frequência leve e produção simples", "Alcançar exclusivamente desconhecidos do perfil", "Substituir a necessidade de manter um feed ativo", "Gerar conversão direta sem qualquer outro formato"]],
    ["Um sinal de que o ritmo de postagem está insustentável é:", ["Ansiedade desproporcional a cada queda de engajamento", "Manter uma frequência mínima viável ao longo dos meses", "Ter destaques organizados por tema", "Revisar a bio periodicamente"]],
    ["\"Ritmo mínimo viável\", segundo a classificação do módulo, é descrito como:", ["2 a 3 vezes por semana, com planejamento prévio simples", "Postar todos os dias, sem exceção", "Postar apenas uma vez a cada trimestre", "Ausência completa de qualquer planejamento"]],
    ["O passo \"revisar o perfil como visitante\" recomenda:", ["Avaliar a primeira impressão como se fosse a primeira vez, sem familiaridade prévia", "Comparar diretamente com o perfil de um concorrente", "Ignorar a bio e focar exclusivamente no feed", "Aumentar a frequência de postagem sem qualquer outra mudança"]],
    ["Destaques organizados por tema, segundo o módulo, deveriam refletir:", ["Os 2 a 3 temas centrais definidos no Módulo 3.1", "Exclusivamente conteúdo promocional recente", "Apenas Stories antigos sem qualquer critério de seleção", "Informações de preço e forma de pagamento"]],
    ["Diante de ansiedade significativa relacionada ao desempenho do perfil, o módulo recomenda:", ["Tratar como prioridade, mesmo que signifique pausar temporariamente", "Ignorar o desconforto e manter o ritmo anterior a qualquer custo", "Aumentar ainda mais a frequência de postagem", "Comparar-se com mais perfis pra entender o problema"]],
    ["Este módulo aplica o conteúdo de quais módulos anteriores especificamente ao Instagram?", ["Módulos 3.1 e 3.2", "Módulos 2.1 e 2.2", "Módulos 4.1 e 4.2", "Módulos 1.1 e 1.2"]],
    ["\"É melhor prometer menos e cumprir sempre do que prometer muito e abandonar\" resume o passo:", ["Definir a frequência mínima", "Organizar os destaques", "Revisar a bio", "Revisar como visitante"]],
  ];
  const gabaritoObjetivas = ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a"];

  const children = [
    ...doc.capa(KICKER, "Avaliação — Instagram na Prática", `Avaliação formativa de encerramento do Módulo ${MOD}.`),
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
    doc.vinhetaBox("Um psicólogo tem um perfil com bom conteúdo no feed, mas a bio diz apenas \"Psicólogo CRP 00/00000\", sem menção à especialidade, e os destaques não têm capas nem títulos organizados, misturando temas aleatórios."),
    new doc.Paragraph({ spacing: { before: 240 }, children: [new doc.TextRun({ text: "Com base no protocolo estudado, responda:", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    new doc.Paragraph({ spacing: { before: 220, after: 40 }, children: [new doc.TextRun({ text: "a) (10 pts) Quais dos 4 elementos de uma presença sustentável estão comprometidos nesse perfil?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "b) (10 pts) Reescreva um exemplo de bio mais eficaz pra esse profissional (invente uma especialidade coerente).", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "c) (10 pts) Sugira 3 categorias de destaque que ele poderia organizar, com base nos temas centrais.", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "d) (10 pts) Por que o feed sozinho, mesmo com bom conteúdo, não compensa uma bio e destaques mal organizados?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    new doc.Paragraph({ spacing: { after: 40 }, children: [new doc.TextRun({ text: "USO EXCLUSIVO DO INSTRUTOR — remover antes de aplicar a prova", bold: true, color: doc.TERRA, font: doc.FONT, size: 20 })] }),
    doc.tituloH1("Gabarito"),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 1 — Questões objetivas", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 200 }, children: [new doc.TextRun({ text: gabaritoObjetivas.map((r, i) => `${i + 1}-${r}`).join("   ·   "), font: doc.FONT, size: 22, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 2 — Critério de correção da questão de caso", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "a) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Bio clara (não menciona especialidade) e destaques organizados (sem capas, títulos ou critério temático).", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "b) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Exemplo: \"Psicólogo | Ansiedade e desenvolvimento de carreira | Atendimento online e presencial — agende uma conversa inicial\".", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "c) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Exemplos aceitáveis: \"Sobre mim\", \"Como funciona\", e um tema clínico central (ex.: \"Ansiedade\"), coerentes com os temas centrais do Módulo 3.1.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "d) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Porque bio e destaques são a primeira impressão de quem chega ao perfil vindo de um post específico — sem orientação clara, o interesse gerado pelo feed se perde antes de virar contato.", font: doc.FONT, size: 21, color: doc.INK })] }),
  );

  return doc.salvar(doc.paginaDoc("Escola de Marketing para Psicólogos", RODAPE_DOC, children), "Modulo-3.3-Avaliacao.docx");
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
      n: 1, titulo: "Por que Instagram, e os 4 elementos", duracao: "13 min", slides: "1, 2, 3, 4",
      objetivo: "Sair sabendo por que Instagram merece atenção específica e quais são os 4 elementos de uma presença sustentável.",
      segmentos: [
        seg("0:00–0:45", "Abertura (gancho)", [{ fala: "Instagram não recompensa quem posta mais — recompensa quem entende qual formato serve pra qual objetivo, e mantém isso por meses, não por uma semana de euforia." }]),
        seg("0:45–2:00", "Por que isso importa", ["Este módulo aplica a estratégia dos Módulos 3.1 e 3.2 especificamente ao Instagram."]),
        seg("2:00–9:00", "Os 4 elementos (mostrar slide 4)", [
          "Formato certo pro objetivo de cada publicação.",
          "Frequência que cabe na sua rotina real.",
          "Bio que orienta claramente o próximo passo.",
          "Destaques organizados por tema.",
        ]),
        seg("9:00–12:00", "Um ponto importante", ["Um perfil sustentável não é o que posta mais — é o que mantém consistência sem gerar ansiedade."]),
        seg("12:00–13:00", "Fechamento", [{ fala: "Próxima aula: do feed à conversa, e os 3 formatos e sua função." }]),
      ],
    },
    {
      n: 2, titulo: "Do feed à conversa, e os 3 formatos", duracao: "12 min", slides: "5, 6",
      objetivo: "Explicar a jornada completa do Instagram e os 3 formatos e sua função.",
      segmentos: [
        seg("0:00–1:00", "Retomada rápida", ["Vimos os 4 elementos. Hoje, a jornada completa dentro do Instagram."]),
        seg("1:00–6:00", "A cadeia (mostrar slide 5)", ["Feed → Stories → Bio → Direct — cada um cumprindo um papel diferente."]),
        seg("6:00–11:00", "Os 3 formatos (mostrar slide 6)", ["Feed e Reels, Stories e Carrossel — alcance, proximidade e profundidade."]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Próxima aula: os sinais de ritmo insustentável, e os 3 ritmos possíveis." }]),
      ],
    },
    {
      n: 3, titulo: "Sinais de alerta e os 3 ritmos possíveis", duracao: "12 min", slides: "7, 8",
      objetivo: "Reconhecer sinais de ritmo insustentável e diferenciar os 3 ritmos possíveis.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Quatro sinais de alerta — e três ritmos, do insustentável ao ideal."]),
        seg("1:00–6:00", "Sinais de alerta (mostrar slide 7)", [
          "Ansiedade a cada queda de engajamento.",
          "Comparação constante com outros perfis.",
          "Pressão de postar hoje, todo dia.",
          "Queda de qualidade pela pressa.",
        ]),
        seg("6:00–11:00", "Os 3 ritmos (mostrar slide 8)", ["Insustentável, mínimo viável e ideal — comece pelo mínimo viável, quase sempre."]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Próxima aula: os 3 elementos que todo perfil deveria ter, e os 4 passos completos." }]),
      ],
    },
    {
      n: 4, titulo: "Os 3 elementos essenciais e os 4 passos", duracao: "11 min", slides: "9, 10",
      objetivo: "Conhecer os 3 elementos essenciais do perfil e os 4 passos de ajuste.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três elementos essenciais — e um processo de 4 passos pra ajustar qualquer perfil."]),
        seg("1:00–5:00", "3 elementos (mostrar slide 9)", ["Bio clara, destaques organizados e link visível."]),
        seg("5:00–10:00", "Os 4 passos (mostrar slide 10)", ["Definir frequência mínima, organizar destaques, revisar a bio, revisar como visitante."]),
        seg("10:00–11:00", "Fechamento", [{ fala: "Próxima aula: aplicando os 4 passos na prática." }]),
      ],
    },
    {
      n: 5, titulo: "Aplicação prática dos 4 passos", duracao: "12 min", slides: "11, 12",
      objetivo: "Aplicar os 4 passos com exemplos concretos.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Hoje colocamos os 4 passos em prática, ajustando um perfil completo."]),
        seg("1:00–6:00", "Passos 1 e 2 (mostrar slide 11)", ["Escolha o ritmo que mantém mesmo em semanas cheias.", { fala: "Se eu fosse um visitante novo, os destaques me ajudariam a entender rápido o que esse perfil oferece?" }]),
        seg("6:00–11:00", "Passos 3 e 4 (mostrar slide 12)", ["Especialidade clara, sem jargão desnecessário.", "Peça a alguém de fora pra visitar e dizer o que entendeu em 10 segundos."]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Próxima aula: um caso real de esgotamento por postar todos os dias, e o recap final." }]),
      ],
    },
    {
      n: 6, titulo: "Prática guiada — postar todos os dias e recap final", duracao: "13 min", slides: "13, 14, 15",
      objetivo: "Aplicar tudo que foi visto a um caso real e consolidar os pontos-chave do módulo.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["A última aula do módulo — um caso real, e o recap final."]),
        seg("1:00–5:00", "Apresentando o caso (mostrar slide 13)", ["Leia a vinheta com calma.", "Note que o entusiasmo inicial não bastou pra sustentar o ritmo escolhido."]),
        seg("5:00–9:00", "Percorrendo as perguntas de discussão", ["Discuta em voz alta as 3 perguntas do slide 13.", "Esboce um novo ritmo mais sustentável pra essa psicóloga."]),
        seg("9:00–11:00", "Quando buscar ajuda especializada (mostrar slide 14)", ["Percorra os 4 critérios do slide 14."]),
        seg("11:00–13:00", "Recap final (mostrar slide 15)", [{ fala: "Retome os 4 pontos-chave do módulo. Agora é hora dos exercícios e da avaliação — e do próximo módulo, sobre vídeo curto e Reels." }]),
      ],
    },
  ];

  const totalMin = 13 + 12 + 12 + 11 + 12 + 13;

  const children = [
    ...doc.capa(KICKER, "Roteiro de Aulas — Instagram na Prática", "Módulo dividido em 6 vídeo-aulas de 11 a 13 minutos, seguindo os slides já produzidos. Cada aula tem roteiro cronometrado, pronto pra gravação."),
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

  return doc.salvar(doc.paginaDoc("Escola de Marketing para Psicólogos", `${RODAPE_DOC} — Roteiro de Aulas`, children), "Modulo-3.3-Roteiro-Aulas.docx");
}

// ============================================================
Promise.resolve()
  .then(construirDeck)
  .then(construirExercicios)
  .then(construirProva)
  .then(construirRoteiro)
  .then(() => console.log("TUDO PRONTO"))
  .catch((e) => { console.error(e); process.exit(1); });

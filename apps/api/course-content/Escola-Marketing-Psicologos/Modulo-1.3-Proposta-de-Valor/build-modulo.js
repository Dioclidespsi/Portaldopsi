const deck = require("../_lib/lib-deck.js");
const doc = require("../_lib/lib-doc.js");

const MOD = "1.3";
const NOME = "Sua Proposta de Valor";
const RODAPE_DECK = `Sua Proposta de Valor — Módulo ${MOD}`;
const RODAPE_DOC = `Módulo ${MOD} — Sua Proposta de Valor`;
const KICKER = "MÓDULO 1.3 · FUNDAMENTOS DE POSICIONAMENTO E NICHO";
const MARCA = "Escola de Marketing para Psicólogos — by Dioclides";

// ============================================================
// 1) SLIDE DECK
// ============================================================
function construirDeck() {
  const pres = deck.novaApresentacao(`${NOME} — Por Que Alguém Escolheria Você`);

  deck.slideTitulo(pres, {
    moduloLabel: `Módulo ${MOD} · Bloco 1 · Posicionamento e Nicho`,
    titulo: "Sua Proposta de Valor",
    subtitulo: "Diferenciação real num mercado saturado — o que comunicar além de \"abordagem X\" e \"anos de experiência\"",
    rodapeMarca: MARCA,
    passos: ["O problema", "3 níveis", "Construção", "Erros", "Aplicação"],
  });

  deck.slideRoteiro(pres, {
    rodape: RODAPE_DECK, pageNum: 2,
    cards: [
      { titulo: "Diferenciação fraca", desc: "Por que a maioria das propostas de valor soam iguais" },
      { titulo: "Os 3 níveis", desc: "Do básico ao avançado, cada um com mais poder de diferenciação" },
      { titulo: "Construindo a sua", desc: "3 perguntas que transformam credencial em proposta real" },
      { titulo: "Erros comuns", desc: "Sinais de que a proposta ainda é genérica" },
      { titulo: "Aplicação prática", desc: "Reescrevendo uma proposta de valor fraca" },
    ],
  });

  deck.slideHook(pres, {
    rodape: RODAPE_DECK, pageNum: 3,
    frase: "Se a sua proposta de valor poderia estar na página de qualquer outro psicólogo, ela não é uma proposta de valor — é só uma descrição de profissão.",
    apoio: "Este módulo usa a persona construída no Módulo 1.2 pra responder a pergunta central deste bloco: por que essa pessoa escolheria você, especificamente?",
  });

  deck.slideCircuito(pres, {
    rodape: RODAPE_DECK, pageNum: 4,
    titulo: "4 elementos de uma proposta de valor forte",
    regioes: [
      { label: "Problema específico que você resolve, não genérico", rx: 0.20, ry: 0.22, color: deck.NAVY, d: 0.5 },
      { label: "Método ou processo distinto de como você trabalha", rx: 0.22, ry: 0.62, color: deck.TERRA, d: 0.4 },
      { label: "Resultado tangível que a pessoa pode esperar", rx: 0.60, ry: 0.60, color: deck.NAVY_TINT, d: 0.36 },
      { label: "Comunicação sem depoimento, dentro dos limites do Bloco 2", rx: 0.58, ry: 0.24, color: deck.TERRA_TINT, d: 0.36 },
    ],
    notas: [
      "Os 4 elementos juntos formam uma proposta muito mais difícil de copiar do que apenas \"anos de experiência\" ou uma abordagem teórica citada isoladamente.",
      "O resultado tangível precisa respeitar o checklist do Bloco 2 — descrever o que você oferece, não prometer o desfecho.",
    ],
  });

  deck.slideCadeia(pres, {
    rodape: RODAPE_DECK, pageNum: 5,
    titulo: "Do genérico ao diferenciado",
    elos: [
      { titulo: "\"Sou psicólogo(a)\"", desc: "O nível mais básico, sem qualquer diferenciação" },
      { titulo: "\"Atendo [demanda]\"", desc: "Já mais específico, mas ainda comum entre colegas" },
      { titulo: "\"Ajudo [persona] com [problema]\"", desc: "Conecta diretamente à persona construída no Módulo 1.2" },
      { titulo: "\"Através de [método], chegando a [resultado]\"", desc: "A proposta completa, difícil de confundir com outro perfil" },
    ],
    notaFinal: "Cada elo dessa cadeia adiciona uma camada de especificidade — a maioria dos psicólogos para no segundo ou terceiro elo.",
  });

  deck.slideCategorias(pres, {
    rodape: RODAPE_DECK, pageNum: 6,
    titulo: "3 níveis de proposta de valor",
    categorias: [
      { titulo: "Básico", desc: "Credencial: formação, especialização e número do CRP", color: deck.NAVY },
      { titulo: "Intermediário", desc: "Especialidade: demanda principal combinada com público", color: deck.TERRA },
      { titulo: "Avançado", desc: "Transformação: problema, método e resultado, juntos numa frase", color: deck.NAVY_TINT },
    ],
    notaFinal: "O nível avançado é o único realmente difícil de copiar — os outros dois qualquer colega com formação parecida também comunica.",
  });

  deck.slideSinais(pres, {
    rodape: RODAPE_DECK, pageNum: 7,
    titulo: "Sinais de proposta de valor fraca",
    itens: [
      { titulo: "\"Anos de experiência\"", desc: "Usado como único diferencial, sem outro elemento de valor" },
      { titulo: "Fácil de copiar", desc: "Poderia estar na bio de qualquer outro colega, sem ajuste" },
      { titulo: "Sem problema nem método", desc: "Não menciona o que resolve nem como trabalha, de forma específica" },
      { titulo: "Fala só de você", desc: "Nunca menciona a pessoa que está do outro lado, nem o problema dela" },
    ],
  });

  deck.slideDiferencial(pres, {
    rodape: RODAPE_DECK, pageNum: 8,
    titulo: "3 propostas, o mesmo psicólogo",
    cards: [
      { titulo: "Fraca", desc: "\"Psicólogo clínico com 10 anos de experiência, abordagem cognitivo-comportamental.\"" },
      { titulo: "Mediana", desc: "\"Atendo ansiedade em adultos, com abordagem cognitivo-comportamental.\"" },
      { titulo: "Forte", desc: "\"Ajudo profissionais sobrecarregados a reduzir ansiedade no trabalho, com estratégias práticas e mensuráveis.\"" },
    ],
  });

  deck.slideInstrumentos(pres, {
    rodape: RODAPE_DECK, pageNum: 9,
    titulo: "3 perguntas que constroem a proposta",
    instrumentos: [
      { sigla: "Que problema?", nome: "Que problema específico você resolve, não genérico", desc: "Conecte diretamente à demanda principal da sua persona." },
      { sigla: "Como você faz?", nome: "Como seu método ou processo é diferente", desc: "O que caracteriza sua forma de trabalhar, além da linha teórica." },
      { sigla: "Que mudança?", nome: "Que mudança concreta a pessoa pode esperar sentir", desc: "Descreva o que você oferece, sem prometer o desfecho garantido." },
    ],
  });

  deck.slideProtocoloOverview(pres, {
    rodape: RODAPE_DECK, pageNum: 10,
    titulo: "Construindo sua proposta: 4 passos",
    passos: [
      { titulo: "Nomear o\nproblema específico", desc: "Conectado diretamente à persona do Módulo 1.2" },
      { titulo: "Descrever\nseu método", desc: "Em poucas palavras, o que diferencia sua forma de trabalhar" },
      { titulo: "Definir o\nresultado esperado", desc: "Uma mudança concreta, sem prometer garantia" },
      { titulo: "Testar\ncom alguém de fora", desc: "Pra checar se a frase realmente comunica com clareza" },
    ],
    notaFinal: "Uma boa proposta de valor costuma caber numa única frase — se precisa de um parágrafo inteiro, ainda não está clara o suficiente.",
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 11,
    titulo: "Passos 1 e 2, na prática",
    colunas: [
      {
        numero: 1, titulo: "Nomear o problema específico",
        bullets: ["Use a dimensão de demanda principal da persona do Módulo 1.2", "Prefira um problema específico (\"ansiedade no trabalho\") a um genérico (\"ansiedade\")"],
      },
      {
        numero: 2, titulo: "Descrever seu método",
        fala: "“O que eu faço de diferente de outro psicólogo que também atende esse mesmo problema?”",
        bullets: ["Não precisa ser uma técnica exclusiva — pode ser um processo, um ritmo ou uma ênfase específica"],
      },
    ],
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 12,
    titulo: "Passos 3 e 4, na prática",
    colunas: [
      {
        numero: 3, titulo: "Definir o resultado esperado",
        bullets: ["Descreva o que você oferece, sem prometer o desfecho garantido, dentro do checklist do Bloco 2", "Prefira \"trabalho com estratégias pra...\" a \"vou resolver seu...\""],
      },
      {
        numero: 4, titulo: "Testar com alguém de fora",
        bullets: ["Peça pra alguém sem formação na área ler a frase e explicar o que entendeu", "Se a explicação for confusa ou genérica, a proposta ainda precisa de ajuste"],
      },
    ],
  });

  deck.slideCaso(pres, {
    rodape: RODAPE_DECK, pageNum: 13,
    vinheta: "Uma psicóloga escreve na bio: \"Psicóloga clínica, CRP 00/00000, atendimento humanizado e acolhedor, com mais de 8 anos de experiência.\" Ela já definiu no Módulo 1.2 que sua persona ideal são mulheres em transição de carreira, buscando clareza sobre os próximos passos profissionais.",
    perguntas: [
      "Em que nível (básico, intermediário, avançado) essa proposta de valor está hoje?",
      "Que elemento das 4 dimensões do slide 4 está completamente ausente?",
      "Reescreva a proposta de valor incorporando a persona já definida, seguindo os 4 passos do protocolo.",
    ],
  });

  deck.slideEncaminhamento(pres, {
    rodape: RODAPE_DECK, pageNum: 14,
    titulo: "Quando buscar ajuda especializada",
    criterios: [
      "Dificuldade persistente em nomear um método distinto: revisar com um mentor ou supervisor a própria prática clínica",
      "Proposta de valor testada, mas ainda mal compreendida por quem ouve: simplificar ainda mais, removendo jargão técnico",
      "Múltiplas propostas parecendo igualmente válidas: escolher uma pra testar, revisando o Módulo 1.1 se necessário",
      "Insegurança sobre comunicar resultado sem prometer: revisar o checklist do Bloco 2 antes de finalizar o texto"
    ],
  });

  deck.slideRecap(pres, {
    rodape: RODAPE_DECK, pageNum: 15,
    pontos: [
      "Uma proposta de valor forte comunica problema, método e resultado — não apenas credencial ou anos de experiência",
      "Básico, intermediário e avançado são os 3 níveis, e só o avançado é realmente difícil de copiar",
      "\"Que problema, como você faz, que mudança\" são as 3 perguntas que constroem qualquer proposta de valor",
      "O teste final é simples: alguém de fora da área consegue explicar sua proposta em poucas palavras?",
    ],
    proximoTexto: "Próximo: exercícios práticos e avaliação do Módulo 1.3 →",
  });

  return pres.writeFile({ fileName: "Modulo-1.3-Proposta-de-Valor.pptx" });
}

// ============================================================
// 2) EXERCÍCIOS
// ============================================================
function construirExercicios() {
  const children = [
    ...doc.capa(KICKER, "Exercícios — Sua Proposta de Valor", "Resolva individualmente, de preferência já escrevendo sua própria proposta de valor enquanto responde."),

    doc.exNum(1, "Os 4 elementos de uma proposta forte"),
    doc.pergunta(1, "Liste os 4 elementos vistos no módulo."),
    ...doc.linhaResposta(3),

    doc.exNum(2, "Os 3 níveis de proposta de valor"),
    doc.tabelaSimples(["Nível", "Característica central"], [["Básico", ""], ["Intermediário", ""], ["Avançado", ""]], [3600, 5550]),

    doc.exNum(3, "As 3 perguntas aplicadas"),
    doc.pergunta(1, "Responda as 3 perguntas do slide 9 pra sua própria prática."),
    ...doc.linhaResposta(4),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),

    doc.exNum(4, "Escrevendo sua proposta de valor"),
    doc.pergunta(1, "Escreva sua proposta de valor completa, seguindo os 4 passos do protocolo."),
    ...doc.linhaResposta(3),
    doc.pergunta(2, "Teste a frase com alguém de fora da área. O que essa pessoa entendeu?"),
    ...doc.linhaResposta(2),

    doc.exNum(5, "Caso integrado — a bio genérica"),
    doc.vinhetaBox("Uma psicóloga escreve: \"Psicóloga clínica, CRP 00/00000, atendimento humanizado e acolhedor, com mais de 8 anos de experiência.\" Sua persona são mulheres em transição de carreira."),
    doc.pergunta(1, "Em que nível essa proposta de valor está hoje?"),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Que elemento está completamente ausente?"),
    ...doc.linhaResposta(2),
    doc.pergunta(3, "Reescreva a proposta incorporando a persona já definida."),
    ...doc.linhaResposta(2),
  ];

  return doc.salvar(doc.paginaDoc("Escola de Marketing para Psicólogos", RODAPE_DOC, children), "Modulo-1.3-Exercicios.docx");
}

// ============================================================
// 3) AVALIAÇÃO
// ============================================================
function construirProva() {
  const objetivas = [
    ["Os 4 elementos de uma proposta de valor forte, segundo o módulo, são:", ["Problema específico, método distinto, resultado tangível, comunicação sem depoimento", "Alcance, engajamento, agendamento e custo por lead", "Demográfico, demanda, momento de vida e objeção", "Identificação, veracidade, sigilo e comparação"]],
    ["Os 3 níveis de proposta de valor, segundo o módulo, são:", ["Básico, intermediário, avançado", "Topo, meio e fundo de funil", "Reconhecimento, geração de contato, remarketing", "Feed, Stories e Carrossel"]],
    ["\"Anos de experiência\" usado como único diferencial é descrito como:", ["Um sinal de proposta de valor fraca", "O elemento mais forte de qualquer proposta de valor", "Suficiente para diferenciar de qualquer colega", "Exigido pela Resolução CFP em toda divulgação"]],
    ["Apenas o nível avançado de proposta de valor, segundo o módulo, é:", ["Realmente difícil de copiar por outro profissional", "Idêntico ao nível básico em todos os aspectos", "Proibido pela Resolução CFP", "Irrelevante para a comunicação profissional"]],
    ["A pergunta \"como seu método ou processo é diferente\" busca:", ["Identificar o que caracteriza sua forma de trabalhar, além da linha teórica", "Substituir a necessidade de definir a persona do Módulo 1.2", "Ser respondida apenas por profissionais com muitos anos de experiência", "Definir exclusivamente o valor da sessão"]],
    ["O passo \"definir o resultado esperado\" deve, segundo o módulo:", ["Descrever o que você oferece, sem prometer o desfecho garantido", "Prometer explicitamente a cura ou resolução do problema", "Ser omitido completamente da proposta de valor", "Ignorar os limites do checklist do Bloco 2"]],
    ["O teste final de uma boa proposta de valor, segundo o módulo, é:", ["Verificar se alguém de fora da área consegue explicá-la com clareza", "Compará-la diretamente com a de um concorrente direto", "Medir exclusivamente o número de palavras utilizadas", "Aplicá-la apenas em campanhas pagas, não em conteúdo orgânico"]],
    ["Uma boa proposta de valor, segundo o módulo, costuma caber:", ["Numa única frase", "Num parágrafo inteiro de várias linhas", "Em um documento formal extenso", "Apenas em formato de vídeo, nunca em texto"]],
    ["Diante de dificuldade persistente em nomear um método distinto, o módulo recomenda:", ["Revisar com um mentor ou supervisor a própria prática clínica", "Copiar o método comunicado por outro colega da área", "Ignorar essa dimensão e focar apenas no problema resolvido", "Aguardar indefinidamente até que a resposta surja sozinha"]],
    ["Este módulo usa diretamente o conteúdo de qual módulo anterior?", ["Módulo 1.2 (Seu Paciente Ideal)", "Módulo 2.4 (O Checklist Antes de Publicar)", "Módulo 4.5 (Métricas que Importam)", "Módulo 3.6 (Calendário Editorial)"]],
  ];
  const gabaritoObjetivas = ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a"];

  const children = [
    ...doc.capa(KICKER, "Avaliação — Sua Proposta de Valor", `Avaliação formativa de encerramento do Módulo ${MOD}.`),
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
    doc.vinhetaBox("Um psicólogo especializado em TDAH em adultos (Módulo 1.1) e com persona definida como \"profissionais de tecnologia entre 25 e 40 anos, com dificuldade de organização no trabalho\" (Módulo 1.2), ainda escreve na bio apenas: \"Psicólogo especializado em TDAH.\""),
    new doc.Paragraph({ spacing: { before: 240 }, children: [new doc.TextRun({ text: "Com base no protocolo estudado, responda:", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    new doc.Paragraph({ spacing: { before: 220, after: 40 }, children: [new doc.TextRun({ text: "a) (10 pts) Em que nível de proposta de valor essa bio está hoje?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "b) (10 pts) Sugira um método ou processo distinto que ele poderia comunicar (invente algo plausível).", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "c) (10 pts) Sugira um resultado esperado, dentro do checklist do Bloco 2.", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "d) (10 pts) Escreva a proposta de valor completa, incorporando problema, método e resultado.", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(3),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    new doc.Paragraph({ spacing: { after: 40 }, children: [new doc.TextRun({ text: "USO EXCLUSIVO DO INSTRUTOR — remover antes de aplicar a prova", bold: true, color: doc.TERRA, font: doc.FONT, size: 20 })] }),
    doc.tituloH1("Gabarito"),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 1 — Questões objetivas", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 200 }, children: [new doc.TextRun({ text: gabaritoObjetivas.map((r, i) => `${i + 1}-${r}`).join("   ·   "), font: doc.FONT, size: 22, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 2 — Critério de correção da questão de caso", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "a) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Intermediário — já menciona a demanda (TDAH), mas ainda não incorpora a persona nem o método.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "b) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Exemplo: estratégias práticas de organização adaptadas à rotina de trabalho em tecnologia.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "c) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Exemplo: \"trabalho com ferramentas práticas pra lidar com a desorganização no dia a dia\", sem prometer resultado garantido.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "d) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Exemplo: \"Ajudo profissionais de tecnologia com TDAH a organizar a rotina de trabalho, com estratégias práticas e adaptadas ao dia a dia.\"", font: doc.FONT, size: 21, color: doc.INK })] }),
  );

  return doc.salvar(doc.paginaDoc("Escola de Marketing para Psicólogos", RODAPE_DOC, children), "Modulo-1.3-Avaliacao.docx");
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
      n: 1, titulo: "Diferenciação fraca, e os 4 elementos", duracao: "13 min", slides: "1, 2, 3, 4",
      objetivo: "Sair sabendo por que proposta de valor genérica é um problema e quais são os 4 elementos de uma proposta forte.",
      segmentos: [
        seg("0:00–0:45", "Abertura (gancho)", [{ fala: "Se a sua proposta de valor poderia estar na página de qualquer outro psicólogo, ela não é uma proposta de valor — é só uma descrição de profissão." }]),
        seg("0:45–2:00", "Por que isso importa", ["Este módulo usa a persona do Módulo 1.2 pra responder: por que essa pessoa escolheria você, especificamente?"]),
        seg("2:00–9:00", "Os 4 elementos (mostrar slide 4)", [
          "Problema específico que você resolve.",
          "Método ou processo distinto.",
          "Resultado tangível esperado.",
          "Comunicação sem depoimento, dentro do Bloco 2.",
        ]),
        seg("9:00–12:00", "Um ponto importante", ["Os 4 elementos juntos formam uma proposta muito mais difícil de copiar do que só 'anos de experiência'."]),
        seg("12:00–13:00", "Fechamento", [{ fala: "Próxima aula: do genérico ao diferenciado, e os 3 níveis de proposta de valor." }]),
      ],
    },
    {
      n: 2, titulo: "Do genérico ao diferenciado, e os 3 níveis", duracao: "12 min", slides: "5, 6",
      objetivo: "Explicar a cadeia de diferenciação e os 3 níveis de proposta de valor.",
      segmentos: [
        seg("0:00–1:00", "Retomada rápida", ["Vimos os 4 elementos. Hoje, como eles se acumulam numa proposta completa."]),
        seg("1:00–6:00", "A cadeia (mostrar slide 5)", ["\"Sou psicólogo(a)\" → \"Atendo [demanda]\" → \"Ajudo [persona] com [problema]\" → proposta completa."]),
        seg("6:00–11:00", "Os 3 níveis (mostrar slide 6)", ["Básico, intermediário e avançado — só o avançado é realmente difícil de copiar."]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Próxima aula: os sinais de proposta fraca, e 3 exemplos do mesmo psicólogo." }]),
      ],
    },
    {
      n: 3, titulo: "Sinais de alerta e 3 propostas comparadas", duracao: "12 min", slides: "7, 8",
      objetivo: "Reconhecer sinais de proposta de valor fraca e comparar 3 versões do mesmo psicólogo.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Quatro sinais de proposta fraca — e três versões, da fraca à forte."]),
        seg("1:00–6:00", "Sinais de alerta (mostrar slide 7)", [
          "\"Anos de experiência\" como único diferencial.",
          "Fácil de copiar por qualquer colega.",
          "Sem problema nem método.",
          "Fala só de você, nunca do paciente.",
        ]),
        seg("6:00–11:00", "3 propostas (mostrar slide 8)", ["Compare a versão fraca, mediana e forte, todas do mesmo psicólogo."]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Próxima aula: as 3 perguntas que constroem a proposta, e os 4 passos completos." }]),
      ],
    },
    {
      n: 4, titulo: "As 3 perguntas e os 4 passos", duracao: "11 min", slides: "9, 10",
      objetivo: "Conhecer as 3 perguntas que constroem a proposta e os 4 passos completos.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três perguntas simples — e um processo de 4 passos pra construir sua proposta."]),
        seg("1:00–5:00", "3 perguntas (mostrar slide 9)", ["Que problema, como você faz, que mudança — as 3 perguntas que sustentam a proposta."]),
        seg("5:00–10:00", "Os 4 passos (mostrar slide 10)", ["Nomear o problema, descrever o método, definir o resultado, testar com alguém de fora."]),
        seg("10:00–11:00", "Fechamento", [{ fala: "Próxima aula: aplicando os 4 passos na prática." }]),
      ],
    },
    {
      n: 5, titulo: "Aplicação prática dos 4 passos", duracao: "12 min", slides: "11, 12",
      objetivo: "Aplicar os 4 passos com exemplos concretos.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Hoje colocamos os 4 passos em prática, construindo uma proposta completa."]),
        seg("1:00–6:00", "Passos 1 e 2 (mostrar slide 11)", ["Use a demanda principal da persona do Módulo 1.2.", { fala: "O que eu faço de diferente de outro psicólogo que também atende esse mesmo problema?" }]),
        seg("6:00–11:00", "Passos 3 e 4 (mostrar slide 12)", ["Descreva o que você oferece, sem prometer desfecho garantido.", "Peça pra alguém de fora ler e explicar o que entendeu."]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Próxima aula: um caso real de bio genérica, e o recap final." }]),
      ],
    },
    {
      n: 6, titulo: "Prática guiada — a bio genérica e recap final", duracao: "13 min", slides: "13, 14, 15",
      objetivo: "Aplicar tudo que foi visto a um caso real e consolidar os pontos-chave do módulo.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["A última aula do módulo — um caso real, e o recap final."]),
        seg("1:00–5:00", "Apresentando o caso (mostrar slide 13)", ["Leia a vinheta com calma.", "Note que a persona já está definida — só falta incorporar isso na proposta de valor."]),
        seg("5:00–9:00", "Percorrendo as perguntas de discussão", ["Discuta em voz alta as 3 perguntas do slide 13.", "Esboce uma versão reescrita da proposta de valor."]),
        seg("9:00–11:00", "Quando buscar ajuda especializada (mostrar slide 14)", ["Percorra os 4 critérios do slide 14."]),
        seg("11:00–13:00", "Recap final (mostrar slide 15)", [{ fala: "Retome os 4 pontos-chave do módulo. Agora é hora dos exercícios e da avaliação — e do último módulo do Bloco 1, sobre precificação." }]),
      ],
    },
  ];

  const totalMin = 13 + 12 + 12 + 11 + 12 + 13;

  const children = [
    ...doc.capa(KICKER, "Roteiro de Aulas — Sua Proposta de Valor", "Módulo dividido em 6 vídeo-aulas de 11 a 13 minutos, seguindo os slides já produzidos. Cada aula tem roteiro cronometrado, pronto pra gravação."),
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

  return doc.salvar(doc.paginaDoc("Escola de Marketing para Psicólogos", `${RODAPE_DOC} — Roteiro de Aulas`, children), "Modulo-1.3-Roteiro-Aulas.docx");
}

// ============================================================
Promise.resolve()
  .then(construirDeck)
  .then(construirExercicios)
  .then(construirProva)
  .then(construirRoteiro)
  .then(() => console.log("TUDO PRONTO"))
  .catch((e) => { console.error(e); process.exit(1); });

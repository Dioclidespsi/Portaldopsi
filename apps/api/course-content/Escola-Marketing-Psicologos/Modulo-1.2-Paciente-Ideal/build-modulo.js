const deck = require("../_lib/lib-deck.js");
const doc = require("../_lib/lib-doc.js");

const MOD = "1.2";
const NOME = "Seu Paciente Ideal";
const RODAPE_DECK = `Seu Paciente Ideal — Módulo ${MOD}`;
const RODAPE_DOC = `Módulo ${MOD} — Seu Paciente Ideal`;
const KICKER = "MÓDULO 1.2 · FUNDAMENTOS DE POSICIONAMENTO E NICHO";
const MARCA = "Escola de Marketing para Psicólogos — by Dioclides";

// ============================================================
// 1) SLIDE DECK
// ============================================================
function construirDeck() {
  const pres = deck.novaApresentacao(`${NOME} — Da Especialidade Vaga à Persona Nítida`);

  deck.slideTitulo(pres, {
    moduloLabel: `Módulo ${MOD} · Bloco 1 · Posicionamento e Nicho`,
    titulo: "Seu Paciente Ideal",
    subtitulo: "Um processo estruturado pra sair de \"atendo ansiedade e relacionamento\" pra uma especialidade que se comunica numa frase",
    rodapeMarca: MARCA,
    passos: ["O conceito", "Dimensões", "Construção", "Erros", "Aplicação"],
  });

  deck.slideRoteiro(pres, {
    rodape: RODAPE_DECK, pageNum: 2,
    cards: [
      { titulo: "O que é paciente ideal", desc: "Não é sobre excluir — é sobre saber pra quem falar primeiro" },
      { titulo: "As 4 dimensões", desc: "O que compõe uma persona realmente útil" },
      { titulo: "Construindo a persona", desc: "3 fontes de informação pra dar nitidez ao perfil" },
      { titulo: "Erros comuns", desc: "Sinais de que a persona ainda está vaga demais" },
      { titulo: "Aplicação prática", desc: "Construindo uma persona a partir de um caso real" },
    ],
  });

  deck.slideHook(pres, {
    rodape: RODAPE_DECK, pageNum: 3,
    frase: "Paciente ideal não é sobre excluir quem precisa de ajuda — é sobre saber exatamente pra quem sua comunicação deveria falar primeiro.",
    apoio: "Este módulo aprofunda o recorte definido no Módulo 1.1, transformando-o numa pessoa específica e reconhecível, não apenas uma categoria abstrata.",
  });

  deck.slideCircuito(pres, {
    rodape: RODAPE_DECK, pageNum: 4,
    titulo: "4 dimensões do paciente ideal",
    regioes: [
      { label: "Demográfico: idade, contexto de vida, ocupação", rx: 0.20, ry: 0.22, color: deck.NAVY, d: 0.5 },
      { label: "Demanda principal: o que traz essa pessoa à terapia", rx: 0.22, ry: 0.62, color: deck.TERRA, d: 0.4 },
      { label: "Momento de vida: o que está acontecendo agora", rx: 0.60, ry: 0.60, color: deck.NAVY_TINT, d: 0.36 },
      { label: "Objeção comum: o que hesita antes de agendar", rx: 0.58, ry: 0.24, color: deck.TERRA_TINT, d: 0.36 },
    ],
    notas: [
      "A maioria dos psicólogos já domina bem a demanda principal, mas raramente pensa nas outras 3 dimensões com o mesmo cuidado.",
      "A objeção comum é a dimensão mais esquecida, e uma das mais úteis pra melhorar a comunicação e a conversão.",
    ],
  });

  deck.slideCadeia(pres, {
    rodape: RODAPE_DECK, pageNum: 5,
    titulo: "Do recorte vago à persona nítida",
    elos: [
      { titulo: "Recorte inicial", desc: "O ponto de partida definido no Módulo 1.1" },
      { titulo: "Detalhar as 4 dimensões", desc: "Preenchendo cada uma com informação específica" },
      { titulo: "Nomear a persona", desc: "Dar um nome fictício, tornando o perfil mais concreto" },
      { titulo: "Testar a comunicação", desc: "Escrever pensando nessa pessoa específica, não num público genérico" },
    ],
    notaFinal: "Nomear a persona pode parecer um detalhe pequeno, mas muda de forma real como a comunicação é escrita depois.",
  });

  deck.slideCategorias(pres, {
    rodape: RODAPE_DECK, pageNum: 6,
    titulo: "3 fontes de informação pra construir a persona",
    categorias: [
      { titulo: "Pacientes reais", desc: "Padrões observados nos casos que você já atendeu", color: deck.NAVY },
      { titulo: "Conversas informais", desc: "O que pessoas do seu público-alvo dizem fora do consultório", color: deck.TERRA },
      { titulo: "Conteúdo que engaja", desc: "Que temas geram mais resposta no que você já publica", color: deck.NAVY_TINT },
    ],
    notaFinal: "As 3 fontes juntas evitam que a persona seja construída só na imaginação, sem base em dados reais da sua prática.",
  });

  deck.slideSinais(pres, {
    rodape: RODAPE_DECK, pageNum: 7,
    titulo: "Sinais de que a persona ainda está vaga",
    itens: [
      { titulo: "Sem nome nem rosto", desc: "A persona ainda é uma categoria abstrata, não uma pessoa imaginada" },
      { titulo: "Objeção desconhecida", desc: "Você não sabe dizer o que faz essa pessoa hesitar antes de agendar" },
      { titulo: "Descrição genérica", desc: "Poderia servir pra praticamente qualquer pessoa, sem especificidade" },
      { titulo: "Nunca testada", desc: "A comunicação ainda não foi ajustada com essa persona em mente" },
    ],
  });

  deck.slideDiferencial(pres, {
    rodape: RODAPE_DECK, pageNum: 8,
    titulo: "3 níveis de definição de persona",
    cards: [
      { titulo: "Persona vaga", desc: "\"Pessoas com ansiedade\" — sem contexto, idade ou momento de vida" },
      { titulo: "Persona parcial", desc: "\"Mulheres adultas com ansiedade\" — mais específico, ainda incompleto" },
      { titulo: "Persona nítida", desc: "\"Marina, 34, executiva, ansiedade desde a promoção recente\" — completa" },
    ],
  });

  deck.slideInstrumentos(pres, {
    rodape: RODAPE_DECK, pageNum: 9,
    titulo: "3 perguntas que aprofundam a persona",
    instrumentos: [
      { sigla: "Já tentou?", nome: "O que essa pessoa já tentou antes de buscar terapia", desc: "Revela o nível de urgência e as tentativas anteriores de solução." },
      { sigla: "O que teme?", nome: "O que ela teme que aconteça se não buscar ajuda", desc: "A base emocional real por trás da decisão de agendar ou não." },
      { sigla: "O que decide?", nome: "O que faria ela decidir agendar, finalmente", desc: "O gatilho prático que sua comunicação pode ajudar a acionar." },
    ],
  });

  deck.slideProtocoloOverview(pres, {
    rodape: RODAPE_DECK, pageNum: 10,
    titulo: "Construindo sua persona: 4 passos",
    passos: [
      { titulo: "Detalhar as\n4 dimensões", desc: "Demográfico, demanda, momento de vida e objeção" },
      { titulo: "Dar um nome\nfictício", desc: "Tornando a persona mais concreta e fácil de imaginar" },
      { titulo: "Escrever um\ndia típico", desc: "Como essa pessoa vive, pensa e sente no dia a dia" },
      { titulo: "Revisar a\ncomunicação atual", desc: "Comparando com o que você já publica e comunica hoje" },
    ],
    notaFinal: "Esse processo, feito uma vez com cuidado, orienta praticamente toda decisão de conteúdo dos próximos módulos.",
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 11,
    titulo: "Passos 1 e 2, na prática",
    colunas: [
      {
        numero: 1, titulo: "Detalhar as 4 dimensões",
        bullets: ["Preencha cada dimensão do slide 4 com informação específica, não genérica", "Use as 3 fontes do slide 6 pra sustentar cada resposta com base real"],
      },
      {
        numero: 2, titulo: "Dar um nome fictício",
        fala: "“Se essa pessoa tivesse um nome, quem ela seria? Consigo imaginar o rosto dela?”",
        bullets: ["Um nome simples já muda a forma como você escreve pensando nela depois"],
      },
    ],
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 12,
    titulo: "Passos 3 e 4, na prática",
    colunas: [
      {
        numero: 3, titulo: "Escrever um dia típico",
        bullets: ["Descreva, em poucas linhas, como essa pessoa vive um dia comum", "Isso ajuda a encontrar temas de conteúdo que realmente conectam com a rotina dela"],
      },
      {
        numero: 4, titulo: "Revisar a comunicação atual",
        bullets: ["Releia sua bio e últimos posts pensando: \"isso fala com essa pessoa específica?\"", "Ajuste o que ainda soa genérico demais pra essa persona"],
      },
    ],
  });

  deck.slideCaso(pres, {
    rodape: RODAPE_DECK, pageNum: 13,
    vinheta: "Um psicólogo já definiu, no Módulo 1.1, que atende \"homens de 30 a 45 anos com ansiedade relacionada ao trabalho\". Agora ele precisa detalhar essa persona, mas trava justamente nas dimensões de momento de vida e objeção comum — ele não sabe dizer, com clareza, o que hesita nesses homens antes de agendarem a primeira sessão.",
    perguntas: [
      "Usando as 3 fontes do slide 6, como ele poderia investigar a objeção comum desses pacientes?",
      "Que pergunta do slide 9 seria mais útil pra explorar o momento de vida dessa persona?",
      "Dê um nome fictício a essa persona e descreva, em 2 frases, um dia típico dela.",
    ],
  });

  deck.slideEncaminhamento(pres, {
    rodape: RODAPE_DECK, pageNum: 14,
    titulo: "Quando buscar ajuda especializada",
    criterios: [
      "Dificuldade persistente em nomear a objeção comum: revisar diretamente com pacientes reais, perguntando sobre a decisão de buscar ajuda",
      "Múltiplas personas parecendo igualmente relevantes: escolher uma pra testar primeiro, revisitando o Módulo 1.1 se necessário",
      "Persona bem definida, mas comunicação ainda genérica: aplicar diretamente os formatos do Bloco 3",
      "Base de pacientes muito pequena pra identificar padrão: usar as conversas informais e o conteúdo que engaja como fontes complementares"
    ],
  });

  deck.slideRecap(pres, {
    rodape: RODAPE_DECK, pageNum: 15,
    pontos: [
      "Paciente ideal não exclui quem precisa de ajuda — orienta pra quem a comunicação deveria falar primeiro",
      "Demográfico, demanda principal, momento de vida e objeção comum são as 4 dimensões da persona",
      "Pacientes reais, conversas informais e conteúdo que engaja sustentam a persona com base real, não só imaginação",
      "Nomear a persona e escrever um dia típico tornam o processo concreto o suficiente pra orientar decisões de conteúdo",
    ],
    proximoTexto: "Próximo: exercícios práticos e avaliação do Módulo 1.2 →",
  });

  return pres.writeFile({ fileName: "Modulo-1.2-Paciente-Ideal.pptx" });
}

// ============================================================
// 2) EXERCÍCIOS
// ============================================================
function construirExercicios() {
  const children = [
    ...doc.capa(KICKER, "Exercícios — Seu Paciente Ideal", "Módulo com tag de exercício guiado: reserve um tempo maior aqui, você vai sair com uma persona completa."),

    doc.exNum(1, "As 4 dimensões da persona"),
    doc.pergunta(1, "Liste as 4 dimensões vistas no módulo, com suas palavras."),
    ...doc.linhaResposta(3),

    doc.exNum(2, "As 3 fontes de informação"),
    doc.tabelaSimples(["Fonte", "Como você usaria pra sua persona"], [["Pacientes reais", ""], ["Conversas informais", ""], ["Conteúdo que engaja", ""]], [3600, 5550]),

    doc.exNum(3, "Construindo sua persona — parte 1"),
    doc.pergunta(1, "Preencha as 4 dimensões da sua persona, com base no recorte do Módulo 1.1."),
    ...doc.linhaResposta(4),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),

    doc.exNum(4, "Construindo sua persona — parte 2"),
    doc.pergunta(1, "Dê um nome fictício à sua persona e escreva um dia típico dela, em poucas linhas."),
    ...doc.linhaResposta(4),
    doc.pergunta(2, "Responda as 3 perguntas do slide 9 pensando nessa persona."),
    ...doc.linhaResposta(3),

    doc.exNum(5, "Caso integrado — o momento de vida travado"),
    doc.vinhetaBox("Um psicólogo já sabe que atende homens de 30 a 45 anos com ansiedade relacionada ao trabalho, mas trava nas dimensões de momento de vida e objeção comum."),
    doc.pergunta(1, "Usando as 3 fontes, como ele poderia investigar a objeção comum desses pacientes?"),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Que pergunta do módulo seria mais útil pra explorar o momento de vida dessa persona?"),
    ...doc.linhaResposta(2),
    doc.pergunta(3, "Dê um nome fictício a essa persona e descreva um dia típico dela."),
    ...doc.linhaResposta(2),
  ];

  return doc.salvar(doc.paginaDoc("Escola de Marketing para Psicólogos", RODAPE_DOC, children), "Modulo-1.2-Exercicios.docx");
}

// ============================================================
// 3) AVALIAÇÃO
// ============================================================
function construirProva() {
  const objetivas = [
    ["As 4 dimensões do paciente ideal, segundo o módulo, são:", ["Demográfico, demanda principal, momento de vida, objeção comum", "Alcance, engajamento, agendamento e custo por lead", "Por público, por demanda, por abordagem", "Identificação, veracidade, sigilo e comparação"]],
    ["\"Paciente ideal\", segundo o módulo, não deve ser entendido como:", ["Uma forma de excluir quem precisa de ajuda", "Uma pessoa específica pra quem a comunicação fala primeiro", "Um aprofundamento do recorte definido no Módulo 1.1", "Uma ferramenta que orienta decisões de conteúdo"]],
    ["A dimensão \"objeção comum\", segundo o módulo, é descrita como:", ["A mais esquecida, e uma das mais úteis pra melhorar comunicação e conversão", "A mais fácil de identificar, dominada pela maioria dos psicólogos", "Irrelevante para a construção da persona", "Substituída automaticamente pela dimensão demográfica"]],
    ["As 3 fontes de informação pra construir a persona, segundo o módulo, são:", ["Pacientes reais, conversas informais, conteúdo que engaja", "Preço, localização e horário de atendimento", "Feed, Stories e Carrossel", "Identificação, veracidade e sigilo"]],
    ["\"Persona sem nome nem rosto\" é descrita como um sinal de:", ["Persona ainda vaga, tratada como categoria abstrata", "Persona bem definida e pronta pra uso", "Uma prática recomendada pelo módulo", "Irrelevante para a qualidade da comunicação"]],
    ["\"Mulheres adultas com ansiedade\", segundo a classificação do módulo, é um exemplo de:", ["Persona parcial — mais específica que vaga, ainda incompleta", "Persona vaga, sem qualquer especificidade", "Persona nítida, já completa e pronta pra uso", "Uma dimensão isolada, não uma persona completa"]],
    ["Dar um nome fictício à persona, segundo o módulo, serve para:", ["Tornar o perfil mais concreto, mudando como a comunicação é escrita depois", "Substituir a necessidade de detalhar as 4 dimensões", "Cumprir uma exigência formal da Resolução CFP", "Ser usado apenas em campanhas pagas"]],
    ["A pergunta \"o que ela teme que aconteça se não buscar ajuda\" busca:", ["Revelar a base emocional real por trás da decisão de agendar ou não", "Substituir a necessidade de conhecer a demanda principal", "Ser respondida apenas por pacientes já atendidos anteriormente", "Definir exclusivamente o valor da sessão a ser cobrado"]],
    ["Diante de dificuldade persistente em nomear a objeção comum, o módulo recomenda:", ["Revisar diretamente com pacientes reais, perguntando sobre a decisão de buscar ajuda", "Ignorar essa dimensão e seguir apenas com as outras 3", "Inventar uma objeção genérica sem base real", "Aguardar indefinidamente até que a resposta surja sozinha"]],
    ["Este módulo se relaciona ao Módulo 1.1 ao:", ["Aprofundar o recorte definido ali numa pessoa específica e reconhecível", "Substituir completamente o conteúdo daquele módulo", "Introduzir um recorte totalmente novo e independente", "Antecede o Módulo 1.1 na ordem lógica do curso"]],
  ];
  const gabaritoObjetivas = ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a"];

  const children = [
    ...doc.capa(KICKER, "Avaliação — Seu Paciente Ideal", `Avaliação formativa de encerramento do Módulo ${MOD}.`),
    doc.infoBox([
      ["Nota de corte:", "70 de 100 pontos"],
      ["Tempo sugerido:", "35 minutos"],
      ["Composição:", "10 questões objetivas (6 pts cada = 60 pts) + 1 questão de caso (40 pts)"],
      ["Consulta:", "Material da aula permitido; discussão entre colegas, não"],
    ]),
    doc.tituloH1("Parte 1 — Questões objetivas"),
  ];
  objetivas.forEach((q, i) => children.push(...doc.questaoObjetiva(i + 1, q[0], q[1])));

  children.push(
    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    doc.tituloH1("Parte 2 — Questão de caso (40 pontos)"),
    doc.vinhetaBox("Uma psicóloga especializada em ansiedade em adultos jovens (definido no Módulo 1.1) quer construir a persona completa, mas só tem clareza sobre a dimensão de demanda principal — as outras 3 dimensões ainda estão vagas."),
    new doc.Paragraph({ spacing: { before: 240 }, children: [new doc.TextRun({ text: "Com base no protocolo estudado, responda:", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    new doc.Paragraph({ spacing: { before: 220, after: 40 }, children: [new doc.TextRun({ text: "a) (10 pts) Sugira uma forma específica de preencher a dimensão demográfica para essa persona.", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "b) (10 pts) Sugira um momento de vida plausível pra essa persona, coerente com a demanda de ansiedade.", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "c) (10 pts) Sugira uma objeção comum plausível que essa persona teria antes de agendar.", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "d) (10 pts) Dê um nome fictício a essa persona e escreva uma frase descrevendo um dia típico dela.", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    new doc.Paragraph({ spacing: { after: 40 }, children: [new doc.TextRun({ text: "USO EXCLUSIVO DO INSTRUTOR — remover antes de aplicar a prova", bold: true, color: doc.TERRA, font: doc.FONT, size: 20 })] }),
    doc.tituloH1("Gabarito"),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 1 — Questões objetivas", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 200 }, children: [new doc.TextRun({ text: gabaritoObjetivas.map((r, i) => `${i + 1}-${r}`).join("   ·   "), font: doc.FONT, size: 22, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 2 — Critério de correção da questão de caso", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "a) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Exemplo: mulher, 26-32 anos, início de carreira, morando sozinha ou com colegas de moradia.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "b) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Exemplo: primeiro emprego de maior responsabilidade, pressão por performance, comparação constante com colegas.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "c) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Exemplo: \"será que eu realmente preciso de terapia, ou estou exagerando?\" — dúvida comum em adultos jovens no início da vida profissional.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "d) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Resposta livre — avaliar coerência entre o nome, a rotina descrita e as demais dimensões já definidas nas respostas anteriores.", font: doc.FONT, size: 21, color: doc.INK })] }),
  );

  return doc.salvar(doc.paginaDoc("Escola de Marketing para Psicólogos", RODAPE_DOC, children), "Modulo-1.2-Avaliacao.docx");
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
      n: 1, titulo: "O que é paciente ideal, e as 4 dimensões", duracao: "13 min", slides: "1, 2, 3, 4",
      objetivo: "Sair sabendo explicar o conceito de paciente ideal e as 4 dimensões que o compõem.",
      segmentos: [
        seg("0:00–0:45", "Abertura (gancho)", [{ fala: "Paciente ideal não é sobre excluir quem precisa de ajuda — é sobre saber exatamente pra quem sua comunicação deveria falar primeiro." }]),
        seg("0:45–2:00", "Por que isso importa", ["Este módulo aprofunda o recorte do Módulo 1.1, transformando-o numa pessoa específica e reconhecível."]),
        seg("2:00–9:00", "As 4 dimensões (mostrar slide 4)", [
          "Demográfico: idade, contexto de vida, ocupação.",
          "Demanda principal: o que traz essa pessoa à terapia.",
          "Momento de vida: o que está acontecendo agora.",
          "Objeção comum: o que hesita antes de agendar.",
        ]),
        seg("9:00–12:00", "Um ponto importante", ["A objeção comum é a dimensão mais esquecida, e uma das mais úteis pra melhorar conversão."]),
        seg("12:00–13:00", "Fechamento", [{ fala: "Próxima aula: do recorte vago à persona nítida, e as 3 fontes de informação." }]),
      ],
    },
    {
      n: 2, titulo: "Do recorte à persona, e as 3 fontes de informação", duracao: "12 min", slides: "5, 6",
      objetivo: "Explicar a cadeia de construção da persona e as 3 fontes de informação.",
      segmentos: [
        seg("0:00–1:00", "Retomada rápida", ["Vimos as 4 dimensões. Hoje, como transformar isso numa persona de fato."]),
        seg("1:00–6:00", "A cadeia (mostrar slide 5)", ["Recorte inicial → Detalhar as 4 dimensões → Nomear a persona → Testar a comunicação."]),
        seg("6:00–11:00", "As 3 fontes (mostrar slide 6)", ["Pacientes reais, conversas informais e conteúdo que engaja — a base real da persona."]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Próxima aula: os sinais de persona vaga, e os 3 níveis de definição." }]),
      ],
    },
    {
      n: 3, titulo: "Sinais de alerta e os 3 níveis de definição", duracao: "12 min", slides: "7, 8",
      objetivo: "Reconhecer sinais de persona vaga e diferenciar os 3 níveis de definição.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Quatro sinais de persona vaga — e três níveis, do vago ao nítido."]),
        seg("1:00–6:00", "Sinais de alerta (mostrar slide 7)", [
          "Sem nome nem rosto.",
          "Objeção desconhecida.",
          "Descrição genérica.",
          "Nunca testada.",
        ]),
        seg("6:00–11:00", "Os 3 níveis (mostrar slide 8)", ["Persona vaga, parcial e nítida — cada uma com um exemplo concreto de comparação."]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Próxima aula: as 3 perguntas que aprofundam a persona, e os 4 passos completos." }]),
      ],
    },
    {
      n: 4, titulo: "As 3 perguntas e os 4 passos", duracao: "11 min", slides: "9, 10",
      objetivo: "Conhecer as 3 perguntas de aprofundamento e os 4 passos de construção da persona.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três perguntas que aprofundam — e um processo de 4 passos pra construir sua persona."]),
        seg("1:00–5:00", "3 perguntas (mostrar slide 9)", ["O que já tentou, o que teme, o que decide — as 3 perguntas que revelam a base emocional."]),
        seg("5:00–10:00", "Os 4 passos (mostrar slide 10)", ["Detalhar as 4 dimensões, dar um nome, escrever um dia típico, revisar a comunicação atual."]),
        seg("10:00–11:00", "Fechamento", [{ fala: "Próxima aula: aplicando os 4 passos na prática." }]),
      ],
    },
    {
      n: 5, titulo: "Aplicação prática dos 4 passos", duracao: "13 min", slides: "11, 12",
      objetivo: "Aplicar os 4 passos criando uma persona completa.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Hoje colocamos os 4 passos em prática, construindo uma persona do início ao fim."]),
        seg("1:00–7:00", "Passos 1 e 2 (mostrar slide 11)", ["Preencha cada dimensão com informação específica, não genérica.", { fala: "Se essa pessoa tivesse um nome, quem ela seria? Consigo imaginar o rosto dela?" }]),
        seg("7:00–12:00", "Passos 3 e 4 (mostrar slide 12)", ["Descreva um dia comum dessa pessoa.", "Releia sua bio e últimos posts pensando nela especificamente."]),
        seg("12:00–13:00", "Fechamento", [{ fala: "Próxima aula: um caso real de persona travada, e o recap final." }]),
      ],
    },
    {
      n: 6, titulo: "Prática guiada — a persona travada e recap final", duracao: "13 min", slides: "13, 14, 15",
      objetivo: "Aplicar tudo que foi visto a um caso real e consolidar os pontos-chave do módulo.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["A última aula do módulo — um caso real, e o recap final."]),
        seg("1:00–5:00", "Apresentando o caso (mostrar slide 13)", ["Leia a vinheta com calma.", "Note que a demanda já está clara — o desafio está nas outras 3 dimensões."]),
        seg("5:00–9:00", "Percorrendo as perguntas de discussão", ["Discuta em voz alta as 3 perguntas do slide 13.", "Esboce a persona completa desse psicólogo."]),
        seg("9:00–11:00", "Quando buscar ajuda especializada (mostrar slide 14)", ["Percorra os 4 critérios do slide 14."]),
        seg("11:00–13:00", "Recap final (mostrar slide 15)", [{ fala: "Retome os 4 pontos-chave do módulo. Agora é hora dos exercícios e da avaliação — e do próximo módulo, sobre proposta de valor." }]),
      ],
    },
  ];

  const totalMin = 13 + 12 + 12 + 11 + 13 + 13;

  const children = [
    ...doc.capa(KICKER, "Roteiro de Aulas — Seu Paciente Ideal", "Módulo dividido em 6 vídeo-aulas de 11 a 13 minutos, seguindo os slides já produzidos. Cada aula tem roteiro cronometrado, pronto pra gravação."),
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

  return doc.salvar(doc.paginaDoc("Escola de Marketing para Psicólogos", `${RODAPE_DOC} — Roteiro de Aulas`, children), "Modulo-1.2-Roteiro-Aulas.docx");
}

// ============================================================
Promise.resolve()
  .then(construirDeck)
  .then(construirExercicios)
  .then(construirProva)
  .then(construirRoteiro)
  .then(() => console.log("TUDO PRONTO"))
  .catch((e) => { console.error(e); process.exit(1); });

const deck = require("../_lib/lib-deck.js");
const doc = require("../_lib/lib-doc.js");

const MOD = "5.1";
const NOME = "Acolhimento, Não Venda";
const RODAPE_DECK = `Acolhimento, Não Venda — Módulo ${MOD}`;
const RODAPE_DOC = `Módulo ${MOD} — Acolhimento, Não Venda`;
const KICKER = "MÓDULO 5.1 · VENDAS E PRIMEIRA SESSÃO";
const MARCA = "Escola de Marketing para Psicólogos — by Dioclides";

// ============================================================
// 1) SLIDE DECK
// ============================================================
function construirDeck() {
  const pres = deck.novaApresentacao(`${NOME} — Reformulando o Primeiro Contato`);

  deck.slideTitulo(pres, {
    moduloLabel: `Módulo ${MOD} · Bloco 5 · Vendas e Primeira Sessão`,
    titulo: "Acolhimento, Não Venda",
    subtitulo: "Reformulando o primeiro contato como alinhamento de expectativas, não pitch de vendas",
    rodapeMarca: MARCA,
    passos: ["A palavra errada", "O que acontece", "Estrutura", "Erros", "Aplicação"],
  });

  deck.slideRoteiro(pres, {
    rodape: RODAPE_DECK, pageNum: 2,
    cards: [
      { titulo: "Por que \"venda\" é a palavra errada", desc: "O que muda quando você troca essa lente" },
      { titulo: "O que realmente acontece", desc: "Os 3 momentos do primeiro contato" },
      { titulo: "Estrutura de acolhimento", desc: "4 elementos que sustentam um primeiro contato saudável" },
      { titulo: "Erros que soam como venda", desc: "Sinais de que a pressão entrou onde não deveria" },
      { titulo: "Aplicação prática", desc: "Corrigindo uma abordagem que soa como pitch" },
    ],
  });

  deck.slideHook(pres, {
    rodape: RODAPE_DECK, pageNum: 3,
    frase: "Ninguém quer ser \"vendido\" terapia — mas todo mundo quer ser acolhido o suficiente pra decidir com clareza se aquele é o caminho certo.",
    apoio: "Este módulo abre o Bloco 5 revisitando o primeiro contato com quem chega até você, depois de todo o trabalho de conteúdo e aquisição dos blocos anteriores.",
  });

  deck.slideCircuito(pres, {
    rodape: RODAPE_DECK, pageNum: 4,
    titulo: "4 elementos de um primeiro contato acolhedor",
    regioes: [
      { label: "Escuta genuína antes de qualquer proposta", rx: 0.20, ry: 0.22, color: deck.NAVY, d: 0.5 },
      { label: "Transparência sobre o processo, não promessa de resultado", rx: 0.22, ry: 0.62, color: deck.TERRA, d: 0.4 },
      { label: "Espaço real pra dúvidas, sem pressa nem pressão", rx: 0.60, ry: 0.60, color: deck.NAVY_TINT, d: 0.36 },
      { label: "Decisão respeitada, seja qual for a resposta da pessoa", rx: 0.58, ry: 0.24, color: deck.TERRA_TINT, d: 0.36 },
    ],
    notas: [
      "Esses 4 elementos não são incompatíveis com comunicar valor com clareza — o Módulo 5.2 aprofunda exatamente essa parte.",
      "O objetivo aqui não é evitar falar de preço ou processo, mas fazer isso sem pressão de fechamento.",
    ],
  });

  deck.slideCadeia(pres, {
    rodape: RODAPE_DECK, pageNum: 5,
    titulo: "Do primeiro contato ao vínculo inicial",
    elos: [
      { titulo: "Primeiro contato", desc: "Mensagem ou ligação inicial, geralmente cheia de dúvidas" },
      { titulo: "Explicação do processo", desc: "Como funciona a avaliação inicial, com clareza e sem pressa" },
      { titulo: "Espaço pra perguntas", desc: "Tempo real pra dúvidas, sem sinalizar impaciência" },
      { titulo: "Decisão livre", desc: "A pessoa decide agendar (ou não) sem sentir pressão" },
    ],
    notaFinal: "Esse processo pode parecer mais lento que uma abordagem de venda direta — mas costuma gerar vínculo mais sólido desde o início.",
  });

  deck.slideCategorias(pres, {
    rodape: RODAPE_DECK, pageNum: 6,
    titulo: "3 momentos do primeiro contato",
    categorias: [
      { titulo: "Antes da sessão", desc: "Mensagem inicial, onde a maioria das dúvidas básicas aparece", color: deck.NAVY },
      { titulo: "Durante a sessão", desc: "Avaliação inicial, com escuta ativa e explicação do processo", color: deck.TERRA },
      { titulo: "Depois da sessão", desc: "Proposta de continuidade, comunicada com clareza, sem pressão", color: deck.NAVY_TINT },
    ],
    notaFinal: "Cada momento pede um cuidado diferente — tratar os 3 da mesma forma é um erro comum de quem só pensa em \"fechar\".",
  });

  deck.slideSinais(pres, {
    rodape: RODAPE_DECK, pageNum: 7,
    titulo: "Sinais de que o contato soa como venda",
    itens: [
      { titulo: "Pressão pra decidir na hora", desc: "Expectativa implícita de resposta imediata sobre continuar" },
      { titulo: "Linguagem de urgência", desc: "\"Só essa semana\" ou frases parecidas, fora de contexto real" },
      { titulo: "Foco no fechamento", desc: "Mais atenção em agendar do que em entender a pessoa" },
      { titulo: "Desconforto ao comunicar valor", desc: "Insegurança perceptível que a pessoa do outro lado sente" },
    ],
  });

  deck.slideDiferencial(pres, {
    rodape: RODAPE_DECK, pageNum: 8,
    titulo: "3 abordagens de primeiro contato",
    cards: [
      { titulo: "De venda", desc: "Foco em fechar rápido, com pressão implícita ou explícita" },
      { titulo: "Neutra", desc: "Informativa, mas sem calor humano nem escuta genuína" },
      { titulo: "De acolhimento", desc: "Escuta, transparência e respeito à decisão, no ritmo da pessoa" },
    ],
  });

  deck.slideInstrumentos(pres, {
    rodape: RODAPE_DECK, pageNum: 9,
    titulo: "3 perguntas que orientam o primeiro contato",
    instrumentos: [
      { sigla: "O que saber?", nome: "O que essa pessoa precisa saber pra decidir com clareza", desc: "Informação objetiva, sem excesso nem promessa." },
      { sigla: "Que dúvida?", nome: "Que dúvida ela provavelmente tem, mesmo sem perguntar", desc: "Antecipar preocupações comuns reduz a ansiedade do contato inicial." },
      { sigla: "Sem prometer?", nome: "Como comunicar o processo sem prometer resultado", desc: "Conectando diretamente ao checklist do Bloco 2." },
    ],
  });

  deck.slideProtocoloOverview(pres, {
    rodape: RODAPE_DECK, pageNum: 10,
    titulo: "Conduzindo o primeiro contato: 4 passos",
    passos: [
      { titulo: "Escutar\nantes de explicar", desc: "Entender o que traz essa pessoa até você, primeiro" },
      { titulo: "Explicar o\nprocesso com transparência", desc: "Como funciona, sem prometer o que vai acontecer" },
      { titulo: "Abrir espaço\npra dúvidas", desc: "Tempo real, sem sinalizar pressa" },
      { titulo: "Respeitar\na decisão", desc: "Qualquer que seja a resposta da pessoa" },
    ],
    notaFinal: "Esses 4 passos valem tanto pra mensagem inicial quanto pra própria sessão de avaliação.",
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 11,
    titulo: "Passos 1 e 2, na prática",
    colunas: [
      {
        numero: 1, titulo: "Escutar antes de explicar",
        bullets: ["Antes de explicar como você trabalha, pergunte o que trouxe a pessoa até ali", "Isso muda o tom da conversa inteira, do informativo pro acolhedor"],
      },
      {
        numero: 2, titulo: "Explicar com transparência",
        fala: "“Na primeira sessão, a gente conversa pra entender melhor sua situação e ver se faz sentido seguirmos juntos.”",
        bullets: ["Note que a frase não promete resultado nem garante continuidade automática"],
      },
    ],
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 12,
    titulo: "Passos 3 e 4, na prática",
    colunas: [
      {
        numero: 3, titulo: "Abrir espaço pra dúvidas",
        bullets: ["Pergunte diretamente se restou alguma dúvida, e espere a resposta com calma", "Silêncio nesse momento não é desconforto — é parte do processo"],
      },
      {
        numero: 4, titulo: "Respeitar a decisão",
        bullets: ["Se a pessoa decidir não continuar, respeite sem insistência", "Uma decisão respeitada hoje pode se tornar uma indicação no futuro"],
      },
    ],
  });

  deck.slideCaso(pres, {
    rodape: RODAPE_DECK, pageNum: 13,
    vinheta: "Um psicólogo recém-formado está ansioso com a agenda vazia e, na primeira conversa com um possível paciente, fala rapidamente sobre sua formação, menciona que \"tem poucos horários disponíveis essa semana\" e pergunta diretamente se a pessoa quer agendar agora. A pessoa fica em silêncio por alguns segundos antes de responder que vai pensar.",
    perguntas: [
      "Que sinais de abordagem de venda (slide 7) esse psicólogo apresentou?",
      "Como ele poderia reformular essa conversa usando os 4 passos do protocolo?",
      "Por que a ansiedade com a agenda vazia tende a produzir justamente o efeito contrário do desejado?",
    ],
  });

  deck.slideEncaminhamento(pres, {
    rodape: RODAPE_DECK, pageNum: 14,
    titulo: "Quando buscar ajuda especializada",
    criterios: [
      "Ansiedade recorrente com agenda vazia afetando a forma de conduzir o primeiro contato: considerar isso como tema de supervisão ou processo terapêutico próprio",
      "Dificuldade persistente em comunicar preço sem desconforto: aprofundar no Módulo 5.2, sobre comunicação de valor",
      "Muitas pessoas decidindo não continuar após o primeiro contato: revisar se a comunicação anterior (Bloco 3) já alinhou expectativas correspondentes",
      "Dúvida sobre como estruturar formalmente a primeira sessão: buscar orientação de colega experiente ou supervisor clínico"
    ],
  });

  deck.slideRecap(pres, {
    rodape: RODAPE_DECK, pageNum: 15,
    pontos: [
      "\"Venda\" é a palavra errada pra descrever o primeiro contato — acolhimento comunica melhor o que realmente deveria acontecer",
      "Escuta genuína, transparência, espaço pra dúvidas e respeito à decisão sustentam um primeiro contato saudável",
      "Pressão pra decidir na hora e linguagem de urgência são os sinais mais claros de que o contato soa como venda",
      "Escutar, explicar, abrir espaço e respeitar a decisão — nessa ordem — conduzem qualquer primeiro contato com mais segurança",
    ],
    proximoTexto: "Próximo: exercícios práticos e avaliação do Módulo 5.1 →",
  });

  return pres.writeFile({ fileName: "Modulo-5.1-Acolhimento-Nao-Venda.pptx" });
}

// ============================================================
// 2) EXERCÍCIOS
// ============================================================
function construirExercicios() {
  const children = [
    ...doc.capa(KICKER, "Exercícios — Acolhimento, Não Venda", "Resolva individualmente, de preferência ensaiando as respostas em voz alta, como num contato real."),

    doc.exNum(1, "Os 4 elementos de um primeiro contato acolhedor"),
    doc.pergunta(1, "Liste os 4 elementos vistos no módulo."),
    ...doc.linhaResposta(3),

    doc.exNum(2, "Os 3 momentos do primeiro contato"),
    doc.tabelaSimples(["Momento", "O que exige nesse momento"], [["Antes da sessão", ""], ["Durante a sessão", ""], ["Depois da sessão", ""]], [3600, 5550]),

    doc.exNum(3, "As 3 perguntas de orientação"),
    doc.pergunta(1, "Responda as 3 perguntas do slide 9 pensando no seu próprio primeiro contato com pacientes."),
    ...doc.linhaResposta(4),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),

    doc.exNum(4, "Escrevendo sua abordagem de acolhimento"),
    doc.pergunta(1, "Escreva um exemplo de mensagem de resposta a um possível paciente, seguindo os 4 passos do protocolo."),
    ...doc.linhaResposta(4),

    doc.exNum(5, "Caso integrado — a agenda vazia"),
    doc.vinhetaBox("Um psicólogo ansioso com a agenda vazia fala rapidamente sobre formação, menciona \"poucos horários essa semana\" e pergunta diretamente se a pessoa quer agendar agora."),
    doc.pergunta(1, "Que sinais de abordagem de venda esse psicólogo apresentou?"),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Como ele poderia reformular essa conversa usando os 4 passos do protocolo?"),
    ...doc.linhaResposta(2),
    doc.pergunta(3, "Por que a ansiedade com a agenda vazia tende a produzir o efeito contrário do desejado?"),
    ...doc.linhaResposta(2),
  ];

  return doc.salvar(doc.paginaDoc("Escola de Marketing para Psicólogos", RODAPE_DOC, children), "Modulo-5.1-Exercicios.docx");
}

// ============================================================
// 3) AVALIAÇÃO
// ============================================================
function construirProva() {
  const objetivas = [
    ["Os 4 elementos de um primeiro contato acolhedor, segundo o módulo, são:", ["Escuta genuína, transparência, espaço pra dúvidas, decisão respeitada", "Alcance, engajamento, agendamento e custo por lead", "Demográfico, demanda, momento de vida e objeção", "Identificação, veracidade, sigilo e comparação"]],
    ["Os 3 momentos do primeiro contato, segundo o módulo, são:", ["Antes da sessão, durante a sessão, depois da sessão", "Topo, meio e fundo de funil", "Reconhecimento, geração de contato, remarketing", "Feed, Stories e Direct"]],
    ["Um sinal de que o primeiro contato soa como venda é:", ["Pressão pra decidir na hora", "Escuta genuína antes de qualquer proposta", "Espaço real pra dúvidas, sem pressa", "Transparência sobre o processo"]],
    ["A frase \"na primeira sessão, a gente conversa pra entender melhor sua situação e ver se faz sentido seguirmos juntos\" exemplifica:", ["Transparência sem prometer resultado nem continuidade automática", "Uma promessa explícita de resultado", "Pressão implícita pra fechamento imediato", "Linguagem de urgência artificial"]],
    ["Diante de silêncio da pessoa após uma pergunta sobre dúvidas, o módulo recomenda:", ["Esperar com calma, já que silêncio nesse momento não é desconforto", "Preencher o silêncio imediatamente com mais informação", "Interpretar como sinal de desistência automática", "Repetir a pergunta de forma mais insistente"]],
    ["Diante de decisão de não continuar, o módulo recomenda:", ["Respeitar sem insistência", "Insistir para reverter a decisão imediatamente", "Oferecer desconto para reverter a decisão", "Ignorar a resposta e agendar mesmo assim"]],
    ["\"Abordagem neutra\", segundo a classificação do módulo, se caracteriza por:", ["Informativa, mas sem calor humano nem escuta genuína", "Foco em fechar rápido, com pressão implícita", "Escuta, transparência e respeito ao ritmo da pessoa", "Idêntica à abordagem de acolhimento em todos os aspectos"]],
    ["O passo \"escutar antes de explicar\" recomenda:", ["Entender o que trouxe a pessoa até você, antes de explicar como você trabalha", "Explicar imediatamente todo o processo, sem perguntas prévias", "Substituir a necessidade de qualquer explicação posterior", "Ser aplicado apenas na sessão, nunca na mensagem inicial"]],
    ["Diante de dificuldade persistente em comunicar preço sem desconforto, o módulo recomenda:", ["Aprofundar no Módulo 5.2, sobre comunicação de valor", "Ignorar completamente o tema de preço no primeiro contato", "Encerrar o atendimento até resolver o desconforto sozinho", "Copiar a forma de comunicar preço de outro colega, sem adaptação"]],
    ["Este módulo abre o Bloco 5 revisitando:", ["O primeiro contato com quem chega depois do trabalho dos blocos anteriores", "Exclusivamente a gestão financeira do consultório", "As regras de publicidade do Bloco 2, sem relação com vendas", "Métricas de engajamento do Bloco 4"]],
  ];
  const gabaritoObjetivas = ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a"];

  const children = [
    ...doc.capa(KICKER, "Avaliação — Acolhimento, Não Venda", `Avaliação formativa de encerramento do Módulo ${MOD}.`),
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
    doc.vinhetaBox("Uma psicóloga recebe uma mensagem de uma pessoa interessada em terapia, mas insegura, perguntando \"será que funciona mesmo?\". A psicóloga responde apenas: \"Sim, funciona muito bem! Vamos agendar sua primeira sessão essa semana?\""),
    new doc.Paragraph({ spacing: { before: 240 }, children: [new doc.TextRun({ text: "Com base no protocolo estudado, responda:", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    new doc.Paragraph({ spacing: { before: 220, after: 40 }, children: [new doc.TextRun({ text: "a) (10 pts) Que elemento do primeiro contato acolhedor está ausente nessa resposta?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "b) (10 pts) Que problema ético (conectado ao Bloco 2) essa resposta também apresenta?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "c) (10 pts) Reescreva a resposta seguindo os passos 1 e 2 do protocolo.", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(3),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "d) (10 pts) Que uma das 3 perguntas do slide 9 essa pessoa provavelmente já estava tentando responder ao perguntar \"será que funciona mesmo?\"", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    new doc.Paragraph({ spacing: { after: 40 }, children: [new doc.TextRun({ text: "USO EXCLUSIVO DO INSTRUTOR — remover antes de aplicar a prova", bold: true, color: doc.TERRA, font: doc.FONT, size: 20 })] }),
    doc.tituloH1("Gabarito"),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 1 — Questões objetivas", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 200 }, children: [new doc.TextRun({ text: gabaritoObjetivas.map((r, i) => `${i + 1}-${r}`).join("   ·   "), font: doc.FONT, size: 22, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 2 — Critério de correção da questão de caso", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "a) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Escuta genuína e transparência — a resposta parte direto pra fechamento, sem explorar a dúvida real da pessoa.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "b) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "\"Funciona muito bem\" soa como promessa de resultado, o mesmo padrão de erro visto no Bloco 2.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "c) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Exemplo: \"Entendo a dúvida — pode me contar um pouco mais sobre o que está te trazendo até aqui? Assim consigo te explicar melhor como funciona o processo.\"", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "d) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "\"Como comunicar o processo sem prometer resultado\" — a pergunta da pessoa reflete exatamente essa incerteza que uma resposta transparente deveria acolher, não apenas confirmar.", font: doc.FONT, size: 21, color: doc.INK })] }),
  );

  return doc.salvar(doc.paginaDoc("Escola de Marketing para Psicólogos", RODAPE_DOC, children), "Modulo-5.1-Avaliacao.docx");
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
      n: 1, titulo: "Por que \"venda\" é a palavra errada, e os 4 elementos", duracao: "13 min", slides: "1, 2, 3, 4",
      objetivo: "Sair sabendo por que reformular \"venda\" como acolhimento importa e quais os 4 elementos que sustentam isso.",
      segmentos: [
        seg("0:00–0:45", "Abertura (gancho)", [{ fala: "Ninguém quer ser 'vendido' terapia — mas todo mundo quer ser acolhido o suficiente pra decidir com clareza se aquele é o caminho certo." }]),
        seg("0:45–2:00", "Por que isso importa", ["Este módulo abre o Bloco 5 revisitando o primeiro contato com quem chega depois do trabalho dos blocos anteriores."]),
        seg("2:00–9:00", "Os 4 elementos (mostrar slide 4)", [
          "Escuta genuína antes de qualquer proposta.",
          "Transparência sobre o processo, não promessa.",
          "Espaço real pra dúvidas, sem pressa.",
          "Decisão respeitada, seja qual for.",
        ]),
        seg("9:00–12:00", "Um ponto importante", ["Esses 4 elementos não impedem comunicar valor com clareza — o Módulo 5.2 aprofunda essa parte."]),
        seg("12:00–13:00", "Fechamento", [{ fala: "Próxima aula: do primeiro contato ao vínculo, e os 3 momentos do processo." }]),
      ],
    },
    {
      n: 2, titulo: "Do contato ao vínculo, e os 3 momentos", duracao: "12 min", slides: "5, 6",
      objetivo: "Explicar a cadeia do primeiro contato e diferenciar os 3 momentos envolvidos.",
      segmentos: [
        seg("0:00–1:00", "Retomada rápida", ["Vimos os 4 elementos. Hoje, a jornada completa do primeiro contato ao vínculo inicial."]),
        seg("1:00–6:00", "A cadeia (mostrar slide 5)", ["Primeiro contato → Explicação do processo → Espaço pra perguntas → Decisão livre."]),
        seg("6:00–11:00", "Os 3 momentos (mostrar slide 6)", ["Antes, durante e depois da sessão — cada um pedindo um cuidado diferente."]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Próxima aula: os sinais de que o contato soa como venda, e 3 abordagens comparadas." }]),
      ],
    },
    {
      n: 3, titulo: "Sinais de alerta e as 3 abordagens", duracao: "12 min", slides: "7, 8",
      objetivo: "Reconhecer sinais de que o contato soa como venda e comparar 3 abordagens possíveis.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Quatro sinais de alerta — e três abordagens, da venda ao acolhimento."]),
        seg("1:00–6:00", "Sinais de alerta (mostrar slide 7)", [
          "Pressão pra decidir na hora.",
          "Linguagem de urgência.",
          "Foco no fechamento.",
          "Desconforto ao comunicar valor.",
        ]),
        seg("6:00–11:00", "3 abordagens (mostrar slide 8)", ["De venda, neutra e de acolhimento — a diferença está no ritmo e na escuta."]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Próxima aula: as 3 perguntas que orientam o contato, e os 4 passos completos." }]),
      ],
    },
    {
      n: 4, titulo: "As 3 perguntas e os 4 passos", duracao: "11 min", slides: "9, 10",
      objetivo: "Conhecer as 3 perguntas de orientação e os 4 passos completos de condução.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três perguntas simples — e um processo de 4 passos pra conduzir qualquer primeiro contato."]),
        seg("1:00–5:00", "3 perguntas (mostrar slide 9)", ["O que saber, que dúvida, sem prometer — as 3 perguntas que orientam a conversa."]),
        seg("5:00–10:00", "Os 4 passos (mostrar slide 10)", ["Escutar antes de explicar, explicar com transparência, abrir espaço, respeitar a decisão."]),
        seg("10:00–11:00", "Fechamento", [{ fala: "Próxima aula: aplicando os 4 passos na prática." }]),
      ],
    },
    {
      n: 5, titulo: "Aplicação prática dos 4 passos", duracao: "12 min", slides: "11, 12",
      objetivo: "Aplicar os 4 passos com exemplos concretos.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Hoje colocamos os 4 passos em prática, do primeiro contato à decisão final."]),
        seg("1:00–6:00", "Passos 1 e 2 (mostrar slide 11)", ["Pergunte o que trouxe a pessoa até ali, antes de explicar como você trabalha.", { fala: "Na primeira sessão, a gente conversa pra entender melhor sua situação e ver se faz sentido seguirmos juntos." }]),
        seg("6:00–11:00", "Passos 3 e 4 (mostrar slide 12)", ["Espere a resposta com calma, sem preencher o silêncio.", "Respeite a decisão da pessoa, sem insistência."]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Próxima aula: um caso real de agenda vazia, e o recap final." }]),
      ],
    },
    {
      n: 6, titulo: "Prática guiada — a agenda vazia e recap final", duracao: "13 min", slides: "13, 14, 15",
      objetivo: "Aplicar tudo que foi visto a um caso real e consolidar os pontos-chave do módulo.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["A última aula do módulo — um caso real, e o recap final."]),
        seg("1:00–5:00", "Apresentando o caso (mostrar slide 13)", ["Leia a vinheta com calma.", "Note que a ansiedade do profissional, não má intenção, gera o problema."]),
        seg("5:00–9:00", "Percorrendo as perguntas de discussão", ["Discuta em voz alta as 3 perguntas do slide 13.", "Esboce uma versão reformulada dessa conversa."]),
        seg("9:00–11:00", "Quando buscar ajuda especializada (mostrar slide 14)", ["Percorra os 4 critérios do slide 14."]),
        seg("11:00–13:00", "Recap final (mostrar slide 15)", [{ fala: "Retome os 4 pontos-chave do módulo. Agora é hora dos exercícios e da avaliação — e do próximo módulo, sobre comunicar valor e preço sem desconforto." }]),
      ],
    },
  ];

  const totalMin = 13 + 12 + 12 + 11 + 12 + 13;

  const children = [
    ...doc.capa(KICKER, "Roteiro de Aulas — Acolhimento, Não Venda", "Módulo dividido em 6 vídeo-aulas de 11 a 13 minutos, seguindo os slides já produzidos. Cada aula tem roteiro cronometrado, pronto pra gravação."),
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

  return doc.salvar(doc.paginaDoc("Escola de Marketing para Psicólogos", `${RODAPE_DOC} — Roteiro de Aulas`, children), "Modulo-5.1-Roteiro-Aulas.docx");
}

// ============================================================
Promise.resolve()
  .then(construirDeck)
  .then(construirExercicios)
  .then(construirProva)
  .then(construirRoteiro)
  .then(() => console.log("TUDO PRONTO"))
  .catch((e) => { console.error(e); process.exit(1); });

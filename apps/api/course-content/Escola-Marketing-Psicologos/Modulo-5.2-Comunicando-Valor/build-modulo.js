const deck = require("../_lib/lib-deck.js");
const doc = require("../_lib/lib-doc.js");

const MOD = "5.2";
const NOME = "Comunicando Valor";
const RODAPE_DECK = `Comunicando Valor — Módulo ${MOD}`;
const RODAPE_DOC = `Módulo ${MOD} — Comunicando Valor`;
const KICKER = "MÓDULO 5.2 · VENDAS E PRIMEIRA SESSÃO";
const MARCA = "Escola de Marketing para Psicólogos — by Dioclides";

// ============================================================
// 1) SLIDE DECK
// ============================================================
function construirDeck() {
  const pres = deck.novaApresentacao(`${NOME} — Preço sem Desconforto`);

  deck.slideTitulo(pres, {
    moduloLabel: `Módulo ${MOD} · Bloco 5 · Vendas e Primeira Sessão`,
    titulo: "Comunicando Valor",
    subtitulo: "Como falar de preço com naturalidade, sem se desculpar nem se justificar em excesso",
    rodapeMarca: MARCA,
    passos: ["O desconforto", "A raiz", "Linguagem", "Erros", "Aplicação"],
  });

  deck.slideRoteiro(pres, {
    rodape: RODAPE_DECK, pageNum: 2,
    cards: [
      { titulo: "Por que gera desconforto", desc: "O motivo real por trás da dificuldade de falar de preço" },
      { titulo: "A raiz do desconforto", desc: "3 fontes comuns, além da falta de prática" },
      { titulo: "Linguagem sem desconforto", desc: "4 elementos que sustentam uma fala segura" },
      { titulo: "Erros comuns", desc: "Sinais de que o desconforto ainda aparece na fala" },
      { titulo: "Aplicação prática", desc: "Corrigindo uma fala de preço insegura" },
    ],
  });

  deck.slideHook(pres, {
    rodape: RODAPE_DECK, pageNum: 3,
    frase: "O desconforto que você sente ao falar de preço quase sempre chega antes na voz do que na sua explicação — e o paciente nota, mesmo sem saber nomear o que sentiu.",
    apoio: "Este módulo aprofunda um ponto específico do Módulo 5.1: como comunicar o valor da sessão sem que a insegurança apareça na fala.",
  });

  deck.slideCircuito(pres, {
    rodape: RODAPE_DECK, pageNum: 4,
    titulo: "4 elementos de comunicação de valor segura",
    regioes: [
      { label: "Tom neutro e direto, sem pedir desculpas pelo valor", rx: 0.20, ry: 0.22, color: deck.NAVY, d: 0.5 },
      { label: "Conexão com o valor entregue, não isolado da conversa", rx: 0.22, ry: 0.62, color: deck.TERRA, d: 0.4 },
      { label: "Silêncio após informar o preço, sem preencher com justificativa", rx: 0.60, ry: 0.60, color: deck.NAVY_TINT, d: 0.36 },
      { label: "Abertura genuína pra perguntas, sem se antecipar defensivamente", rx: 0.58, ry: 0.24, color: deck.TERRA_TINT, d: 0.36 },
    ],
    notas: [
      "O silêncio depois de informar o preço costuma ser o ponto mais difícil — o impulso de preencher esse espaço é o que mais sinaliza insegurança.",
      "Conectar o preço ao processo já explicado (Módulo 5.1) evita que o valor pareça um número solto, sem contexto.",
    ],
  });

  deck.slideCadeia(pres, {
    rodape: RODAPE_DECK, pageNum: 5,
    titulo: "Da insegurança à naturalidade",
    elos: [
      { titulo: "Insegurança sobre o valor", desc: "Dúvida pessoal sobre merecer cobrar aquele preço" },
      { titulo: "Justificativa excessiva", desc: "Explicações demais, antes mesmo de qualquer pergunta" },
      { titulo: "Desconforto percebido", desc: "O paciente sente a insegurança, mesmo sem nomeá-la" },
      { titulo: "Dúvida sobre o valor real", desc: "A comunicação insegura contamina a percepção do serviço" },
    ],
    notaFinal: "Essa cadeia se instala silenciosamente — a maioria dos psicólogos nem percebe que está justificando demais até parar pra observar.",
  });

  deck.slideCategorias(pres, {
    rodape: RODAPE_DECK, pageNum: 6,
    titulo: "3 fontes comuns de desconforto",
    categorias: [
      { titulo: "Comparação com colegas", desc: "Sentir que cobra mais que profissionais que cobram menos", color: deck.NAVY },
      { titulo: "Medo de perder o paciente", desc: "Receio de que o valor afaste alguém que precisa de ajuda", color: deck.TERRA },
      { titulo: "Autoestima e valor profissional", desc: "Dificuldade de separar o próprio valor pessoal do preço cobrado", color: deck.NAVY_TINT },
    ],
    notaFinal: "As 3 fontes têm uma raiz comum: tratar o preço como um julgamento pessoal, não como uma decisão de negócio.",
  });

  deck.slideSinais(pres, {
    rodape: RODAPE_DECK, pageNum: 7,
    titulo: "Sinais de que o desconforto aparece na fala",
    itens: [
      { titulo: "Fala o valor rapidamente", desc: "Quase sussurrando, como se quisesse passar por cima do assunto" },
      { titulo: "Justifica antes de ser perguntado", desc: "Explica o preço mesmo sem ninguém ter questionado ainda" },
      { titulo: "Oferece desconto sem pedido", desc: "Reduz o valor de forma espontânea, sem qualquer solicitação" },
      { titulo: "Se desculpa pelo valor", desc: "Usa frases como \"desculpa, mas...\" antes de informar o preço" },
    ],
  });

  deck.slideDiferencial(pres, {
    rodape: RODAPE_DECK, pageNum: 8,
    titulo: "3 formas de comunicar o mesmo preço",
    cards: [
      { titulo: "Insegura", desc: "\"Ah, então... desculpa, mas a sessão fica em R$ X, mas a gente pode conversar sobre isso.\"" },
      { titulo: "Neutra", desc: "\"A sessão é R$ X.\" — direto, mas sem qualquer conexão com o processo." },
      { titulo: "Confiante", desc: "\"Com base em tudo que conversamos, o valor da sessão é R$ X.\"" },
    ],
  });

  deck.slideInstrumentos(pres, {
    rodape: RODAPE_DECK, pageNum: 9,
    titulo: "3 práticas que sustentam confiança",
    instrumentos: [
      { sigla: "Ensaiar antes", nome: "Praticar a fala em voz alta antes de precisar usá-la", desc: "A primeira vez dizendo o valor não deveria ser durante o contato real." },
      { sigla: "Conectar ao processo", nome: "Ligar o preço ao que já foi explicado sobre o trabalho", desc: "Evita que o valor pareça um número solto e desconectado." },
      { sigla: "Aceitar o silêncio", nome: "Permitir uma pausa depois de informar o valor", desc: "Silêncio não é problema — é espaço pra pessoa processar a informação." },
    ],
  });

  deck.slideProtocoloOverview(pres, {
    rodape: RODAPE_DECK, pageNum: 10,
    titulo: "Comunicando preço com segurança: 4 passos",
    passos: [
      { titulo: "Praticar a\nfala em voz alta", desc: "Antes de precisar usá-la numa conversa real" },
      { titulo: "Conectar ao\nprocesso explicado", desc: "O preço como parte natural da conversa, não um anexo" },
      { titulo: "Comunicar com\ntom neutro", desc: "Sem se desculpar nem minimizar o próprio valor" },
      { titulo: "Aceitar\no silêncio", desc: "Sem preencher o espaço com justificativa excessiva" },
    ],
    notaFinal: "Esses 4 passos, praticados algumas vezes, tornam a comunicação de preço tão natural quanto qualquer outra parte da conversa inicial.",
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 11,
    titulo: "Passos 1 e 2, na prática",
    colunas: [
      {
        numero: 1, titulo: "Praticar a fala em voz alta",
        bullets: ["Diga o valor em voz alta, sozinho, várias vezes, até soar natural", "Grave e escute a si mesmo, se ajudar a identificar sinais de insegurança"],
      },
      {
        numero: 2, titulo: "Conectar ao processo explicado",
        fala: "“Com base em tudo que conversamos, o valor da sessão é R$ X.”",
        bullets: ["Essa conexão evita que o preço pareça desconectado do que já foi dito"],
      },
    ],
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 12,
    titulo: "Passos 3 e 4, na prática",
    colunas: [
      {
        numero: 3, titulo: "Comunicar com tom neutro",
        bullets: ["Fale o valor no mesmo ritmo e volume do resto da conversa, sem baixar a voz", "Evite frases como \"desculpa, mas\" ou \"infelizmente\" antes do valor"],
      },
      {
        numero: 4, titulo: "Aceitar o silêncio",
        bullets: ["Depois de informar o valor, espere — não preencha o espaço com justificativa", "Se a pessoa tiver dúvida, ela vai perguntar; seu papel é responder, não antecipar"],
      },
    ],
  });

  deck.slideCaso(pres, {
    rodape: RODAPE_DECK, pageNum: 13,
    vinheta: "Uma psicóloga, ao ser perguntada sobre o valor da sessão, respondeu: \"Ah, é R$ 200... mas eu sei que pode parecer bastante, então se for difícil a gente pode pensar em outra coisa, tenho colegas que cobram menos também.\" Ela mesma percebeu, depois, que ofereceu um desconto implícito sem ninguém ter pedido.",
    perguntas: [
      "Que sinais de desconforto do slide 7 aparecem nessa fala?",
      "Reescreva a resposta seguindo os 4 elementos de comunicação segura do slide 4.",
      "Que uma das 3 fontes de desconforto do slide 6 provavelmente está por trás dessa fala?",
    ],
  });

  deck.slideEncaminhamento(pres, {
    rodape: RODAPE_DECK, pageNum: 14,
    titulo: "Quando buscar ajuda especializada",
    criterios: [
      "Desconforto persistente mesmo após praticar a fala repetidamente: considerar isso como tema de supervisão ou processo terapêutico próprio",
      "Dúvida sobre se o valor cobrado realmente reflete o trabalho entregue: revisar o Módulo 1.4, sobre preço e posicionamento",
      "Padrão recorrente de oferecer desconto sem solicitação: mapear em que momentos específicos isso acontece, com apoio de um colega",
      "Insegurança relacionada à autoestima profissional de forma mais ampla: buscar apoio terapêutico ou de supervisão específica pra esse tema"
    ],
  });

  deck.slideRecap(pres, {
    rodape: RODAPE_DECK, pageNum: 15,
    pontos: [
      "O desconforto ao falar de preço aparece na voz antes mesmo da explicação — e o paciente percebe isso",
      "Comparação com colegas, medo de perder o paciente e autoestima profissional são as 3 fontes mais comuns de desconforto",
      "Tom neutro, conexão com o processo, silêncio aceito e abertura genuína sustentam uma comunicação segura",
      "Praticar a fala em voz alta antes de precisar usá-la é o passo mais simples que reduz a maior parte do desconforto",
    ],
    proximoTexto: "Próximo: exercícios práticos e avaliação do Módulo 5.2 →",
  });

  return pres.writeFile({ fileName: "Modulo-5.2-Comunicando-Valor.pptx" });
}

// ============================================================
// 2) EXERCÍCIOS
// ============================================================
function construirExercicios() {
  const children = [
    ...doc.capa(KICKER, "Exercícios — Comunicando Valor", "Resolva individualmente, de preferência ensaiando as respostas em voz alta."),

    doc.exNum(1, "Os 4 elementos de comunicação segura"),
    doc.pergunta(1, "Liste os 4 elementos vistos no módulo."),
    ...doc.linhaResposta(3),

    doc.exNum(2, "As 3 fontes de desconforto"),
    doc.tabelaSimples(["Fonte", "Como ela se manifesta"], [["Comparação com colegas", ""], ["Medo de perder o paciente", ""], ["Autoestima profissional", ""]], [3600, 5550]),

    doc.exNum(3, "Praticando a fala do preço"),
    doc.pergunta(1, "Escreva sua própria fala de comunicação de preço, seguindo o passo 2 (conectar ao processo explicado)."),
    ...doc.linhaResposta(3),
    doc.pergunta(2, "Diga essa frase em voz alta 3 vezes. O que você notou na sua própria voz ou postura?"),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),

    doc.exNum(4, "Reconhecendo sinais em si mesmo"),
    doc.pergunta(1, "Você já apresentou algum dos 4 sinais do slide 7? Qual, e em que situação?"),
    ...doc.linhaResposta(3),

    doc.exNum(5, "Caso integrado — o desconto implícito"),
    doc.vinhetaBox("Uma psicóloga responde sobre o valor: \"Ah, é R$ 200... mas eu sei que pode parecer bastante, então se for difícil a gente pode pensar em outra coisa, tenho colegas que cobram menos também.\""),
    doc.pergunta(1, "Que sinais de desconforto aparecem nessa fala?"),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Reescreva a resposta seguindo os 4 elementos de comunicação segura."),
    ...doc.linhaResposta(2),
    doc.pergunta(3, "Que fonte de desconforto provavelmente está por trás dessa fala?"),
    ...doc.linhaResposta(2),
  ];

  return doc.salvar(doc.paginaDoc("Escola de Marketing para Psicólogos", RODAPE_DOC, children), "Modulo-5.2-Exercicios.docx");
}

// ============================================================
// 3) AVALIAÇÃO
// ============================================================
function construirProva() {
  const objetivas = [
    ["Os 4 elementos de comunicação de valor segura, segundo o módulo, são:", ["Tom neutro, conexão com o valor entregue, silêncio aceito, abertura genuína", "Alcance, engajamento, agendamento e custo por lead", "Escuta genuína, transparência, espaço pra dúvidas, decisão respeitada", "Identificação, veracidade, sigilo e comparação"]],
    ["O desconforto ao falar de preço, segundo o módulo, costuma aparecer:", ["Na voz, antes mesmo da explicação em palavras", "Apenas no conteúdo explícito da fala, nunca no tom", "Exclusivamente em conversas por mensagem escrita", "De forma imperceptível, sem qualquer efeito na percepção do paciente"]],
    ["As 3 fontes comuns de desconforto, segundo o módulo, são:", ["Comparação com colegas, medo de perder o paciente, autoestima profissional", "Alcance, engajamento e taxa de conversão", "Preço, localização e horário de atendimento", "Identificação, veracidade e sigilo"]],
    ["\"Oferecer desconto sem ser solicitado\" é descrito como:", ["Um sinal de que o desconforto aparece na fala", "Uma prática recomendada para reduzir a insegurança", "Irrelevante para a comunicação de valor", "Exigido sempre que o paciente questiona o preço"]],
    ["O passo \"aceitar o silêncio\" recomenda:", ["Não preencher o espaço após informar o preço com justificativa excessiva", "Preencher imediatamente qualquer silêncio com mais explicações", "Evitar qualquer pausa durante toda a conversa inicial", "Substituir a necessidade de conectar o preço ao processo"]],
    ["\"Praticar a fala em voz alta antes de precisar usá-la\" busca:", ["Reduzir a insegurança percebida na primeira vez que o valor é comunicado de fato", "Substituir a necessidade de calcular o preço corretamente", "Ser feito apenas por profissionais recém-formados", "Aumentar artificialmente o valor cobrado pela sessão"]],
    ["\"Conectar ao processo explicado\" significa:", ["Ligar o preço ao que já foi dito sobre o trabalho, evitando que pareça um número solto", "Repetir o valor várias vezes dentro da mesma conversa", "Substituir completamente a necessidade de informar o valor", "Falar do preço antes de qualquer outra explicação sobre o processo"]],
    ["A fala \"desculpa, mas a sessão fica em R$ X\" é classificada como:", ["Insegura, por incluir um pedido de desculpas antes do valor", "Confiante, por já informar o valor rapidamente", "Neutra, sem qualquer elemento de insegurança", "Recomendada pelo módulo como modelo de comunicação"]],
    ["Diante de padrão recorrente de oferecer desconto sem solicitação, o módulo recomenda:", ["Mapear em que momentos específicos isso acontece, com apoio de um colega", "Aceitar esse padrão como parte normal e inevitável da profissão", "Aumentar o preço automaticamente para compensar o desconto", "Ignorar completamente o padrão, sem qualquer investigação"]],
    ["Este módulo aprofunda diretamente qual ponto do Módulo 5.1?", ["Como comunicar o valor da sessão sem que a insegurança apareça na fala", "Os critérios de encaminhamento para outro profissional", "As regras de publicidade profissional do Bloco 2", "As métricas de engajamento do Bloco 4"]],
  ];
  const gabaritoObjetivas = ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a"];

  const children = [
    ...doc.capa(KICKER, "Avaliação — Comunicando Valor", `Avaliação formativa de encerramento do Módulo ${MOD}.`),
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
    doc.vinhetaBox("Um psicólogo recém-formado sente as mãos suarem toda vez que precisa falar do valor da sessão, e percebe que fala rapidamente e muda de assunto logo em seguida, mesmo sem ninguém ter reagido negativamente ainda."),
    new doc.Paragraph({ spacing: { before: 240 }, children: [new doc.TextRun({ text: "Com base no protocolo estudado, responda:", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    new doc.Paragraph({ spacing: { before: 220, after: 40 }, children: [new doc.TextRun({ text: "a) (10 pts) Que sinal de desconforto esse psicólogo já apresenta, mesmo sem ter recebido reação negativa?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "b) (10 pts) Que passo do protocolo ele deveria praticar primeiro, antes de qualquer conversa real?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "c) (10 pts) Escreva um exemplo de fala que ele poderia ensaiar, conectando o valor ao processo.", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "d) (10 pts) Que fonte de desconforto do slide 6 provavelmente está mais presente, sendo ele recém-formado?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    new doc.Paragraph({ spacing: { after: 40 }, children: [new doc.TextRun({ text: "USO EXCLUSIVO DO INSTRUTOR — remover antes de aplicar a prova", bold: true, color: doc.TERRA, font: doc.FONT, size: 20 })] }),
    doc.tituloH1("Gabarito"),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 1 — Questões objetivas", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 200 }, children: [new doc.TextRun({ text: gabaritoObjetivas.map((r, i) => `${i + 1}-${r}`).join("   ·   "), font: doc.FONT, size: 22, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 2 — Critério de correção da questão de caso", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "a) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Falar rapidamente e mudar de assunto logo depois — sinal comportamental de desconforto, mesmo sem justificar verbalmente.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "b) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Passo 1 — praticar a fala em voz alta antes de precisar usá-la numa conversa real.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "c) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Exemplo: \"Com base em tudo que conversamos, o valor da sessão é R$ X.\"", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "d) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Autoestima e valor profissional — comum em profissionais recém-formados que ainda estão construindo confiança na própria prática.", font: doc.FONT, size: 21, color: doc.INK })] }),
  );

  return doc.salvar(doc.paginaDoc("Escola de Marketing para Psicólogos", RODAPE_DOC, children), "Modulo-5.2-Avaliacao.docx");
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
      n: 1, titulo: "Por que o preço gera desconforto, e os 4 elementos", duracao: "13 min", slides: "1, 2, 3, 4",
      objetivo: "Sair sabendo por que o desconforto aparece na fala e quais são os 4 elementos de comunicação segura.",
      segmentos: [
        seg("0:00–0:45", "Abertura (gancho)", [{ fala: "O desconforto que você sente ao falar de preço quase sempre chega antes na voz do que na sua explicação — e o paciente nota, mesmo sem saber nomear o que sentiu." }]),
        seg("0:45–2:00", "Por que isso importa", ["Este módulo aprofunda um ponto específico do Módulo 5.1: como comunicar o valor sem que a insegurança apareça."]),
        seg("2:00–9:00", "Os 4 elementos (mostrar slide 4)", [
          "Tom neutro, sem pedir desculpas pelo valor.",
          "Conexão com o valor entregue, não isolado.",
          "Silêncio após informar o preço.",
          "Abertura genuína pra perguntas.",
        ]),
        seg("9:00–12:00", "Um ponto importante", ["O silêncio depois de informar o preço costuma ser o ponto mais difícil de sustentar."]),
        seg("12:00–13:00", "Fechamento", [{ fala: "Próxima aula: da insegurança à naturalidade, e as 3 fontes de desconforto." }]),
      ],
    },
    {
      n: 2, titulo: "Da insegurança à naturalidade, e as 3 fontes", duracao: "12 min", slides: "5, 6",
      objetivo: "Explicar a cadeia da insegurança e as 3 fontes comuns de desconforto.",
      segmentos: [
        seg("0:00–1:00", "Retomada rápida", ["Vimos os 4 elementos. Hoje, como a insegurança se instala e se manifesta."]),
        seg("1:00–6:00", "A cadeia (mostrar slide 5)", ["Insegurança → Justificativa excessiva → Desconforto percebido → Dúvida sobre o valor real."]),
        seg("6:00–11:00", "As 3 fontes (mostrar slide 6)", ["Comparação com colegas, medo de perder o paciente, e autoestima profissional."]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Próxima aula: os sinais de desconforto na fala, e 3 formas de comunicar o mesmo preço." }]),
      ],
    },
    {
      n: 3, titulo: "Sinais de alerta e 3 formas de comunicar", duracao: "12 min", slides: "7, 8",
      objetivo: "Reconhecer sinais de desconforto na fala e comparar 3 formas de comunicar o mesmo preço.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Quatro sinais de desconforto — e três formas, da insegura à confiante."]),
        seg("1:00–6:00", "Sinais de alerta (mostrar slide 7)", [
          "Fala o valor rapidamente.",
          "Justifica antes de ser perguntado.",
          "Oferece desconto sem pedido.",
          "Se desculpa pelo valor.",
        ]),
        seg("6:00–11:00", "3 formas (mostrar slide 8)", ["Compare a fala insegura, neutra e confiante, todas sobre o mesmo preço."]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Próxima aula: as 3 práticas que sustentam confiança, e os 4 passos completos." }]),
      ],
    },
    {
      n: 4, titulo: "As 3 práticas e os 4 passos", duracao: "11 min", slides: "9, 10",
      objetivo: "Conhecer as 3 práticas que sustentam confiança e os 4 passos completos de comunicação.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três práticas simples — e um processo de 4 passos pra comunicar preço com segurança."]),
        seg("1:00–5:00", "3 práticas (mostrar slide 9)", ["Ensaiar antes, conectar ao processo e aceitar o silêncio."]),
        seg("5:00–10:00", "Os 4 passos (mostrar slide 10)", ["Praticar em voz alta, conectar ao processo, comunicar com tom neutro, aceitar o silêncio."]),
        seg("10:00–11:00", "Fechamento", [{ fala: "Próxima aula: aplicando os 4 passos na prática." }]),
      ],
    },
    {
      n: 5, titulo: "Aplicação prática dos 4 passos", duracao: "12 min", slides: "11, 12",
      objetivo: "Aplicar os 4 passos com exemplos concretos.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Hoje colocamos os 4 passos em prática, ensaiando a fala do preço."]),
        seg("1:00–6:00", "Passos 1 e 2 (mostrar slide 11)", ["Diga o valor em voz alta várias vezes, até soar natural.", { fala: "Com base em tudo que conversamos, o valor da sessão é R$ X." }]),
        seg("6:00–11:00", "Passos 3 e 4 (mostrar slide 12)", ["Fale no mesmo ritmo e volume do resto da conversa.", "Espere, sem preencher o silêncio com justificativa."]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Próxima aula: um caso real de desconto implícito, e o recap final." }]),
      ],
    },
    {
      n: 6, titulo: "Prática guiada — o desconto implícito e recap final", duracao: "13 min", slides: "13, 14, 15",
      objetivo: "Aplicar tudo que foi visto a um caso real e consolidar os pontos-chave do módulo.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["A última aula do módulo — um caso real, e o recap final."]),
        seg("1:00–5:00", "Apresentando o caso (mostrar slide 13)", ["Leia a vinheta com calma.", "Note que o desconto foi oferecido sem qualquer pedido — puro reflexo da insegurança."]),
        seg("5:00–9:00", "Percorrendo as perguntas de discussão", ["Discuta em voz alta as 3 perguntas do slide 13.", "Esboce uma versão reescrita dessa fala."]),
        seg("9:00–11:00", "Quando buscar ajuda especializada (mostrar slide 14)", ["Percorra os 4 critérios do slide 14."]),
        seg("11:00–13:00", "Recap final (mostrar slide 15)", [{ fala: "Retome os 4 pontos-chave do módulo. Agora é hora dos exercícios e da avaliação — e do próximo módulo, sobre lidar com objeções comuns." }]),
      ],
    },
  ];

  const totalMin = 13 + 12 + 12 + 11 + 12 + 13;

  const children = [
    ...doc.capa(KICKER, "Roteiro de Aulas — Comunicando Valor", "Módulo dividido em 6 vídeo-aulas de 11 a 13 minutos, seguindo os slides já produzidos. Cada aula tem roteiro cronometrado, pronto pra gravação."),
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

  return doc.salvar(doc.paginaDoc("Escola de Marketing para Psicólogos", `${RODAPE_DOC} — Roteiro de Aulas`, children), "Modulo-5.2-Roteiro-Aulas.docx");
}

// ============================================================
Promise.resolve()
  .then(construirDeck)
  .then(construirExercicios)
  .then(construirProva)
  .then(construirRoteiro)
  .then(() => console.log("TUDO PRONTO"))
  .catch((e) => { console.error(e); process.exit(1); });

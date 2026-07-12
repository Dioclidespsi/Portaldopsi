const deck = require("../_lib/lib-deck.js");
const doc = require("../_lib/lib-doc.js");

const MOD = "5.3";
const NOME = "Lidando com Objeções";
const RODAPE_DECK = `Lidando com Objeções — Módulo ${MOD}`;
const RODAPE_DOC = `Módulo ${MOD} — Lidando com Objeções`;
const KICKER = "MÓDULO 5.3 · VENDAS E PRIMEIRA SESSÃO";
const MARCA = "Escola de Marketing para Psicólogos — by Dioclides";

// ============================================================
// 1) SLIDE DECK
// ============================================================
function construirDeck() {
  const pres = deck.novaApresentacao(`${NOME} — Respostas que Respeitam`);

  deck.slideTitulo(pres, {
    moduloLabel: `Módulo ${MOD} · Bloco 5 · Vendas e Primeira Sessão`,
    titulo: "Lidando com Objeções",
    subtitulo: "Preço, \"vou pensar\", convênio — respostas que respeitam o paciente e o seu posicionamento",
    rodapeMarca: MARCA,
    passos: ["Não é rejeição", "As 3 objeções", "Como responder", "Erros", "Aplicação"],
  });

  deck.slideRoteiro(pres, {
    rodape: RODAPE_DECK, pageNum: 2,
    cards: [
      { titulo: "Objeção não é rejeição", desc: "Por que essa distinção muda toda a resposta" },
      { titulo: "As 3 objeções mais comuns", desc: "Preço, indecisão e acesso via convênio" },
      { titulo: "Como responder sem pressão", desc: "4 princípios que orientam qualquer resposta" },
      { titulo: "Erros comuns", desc: "Sinais de que a resposta virou insistência" },
      { titulo: "Aplicação prática", desc: "Respondendo a um \"vou pensar\" com equilíbrio" },
    ],
  });

  deck.slideHook(pres, {
    rodape: RODAPE_DECK, pageNum: 3,
    frase: "Uma objeção não é um \"não\" — é uma pergunta disfarçada, e sua resposta a essa pergunta é o que realmente decide se a pessoa vai se sentir segura pra continuar.",
    apoio: "Este módulo aplica os princípios de acolhimento do Módulo 5.1 às 3 objeções mais comuns no primeiro contato.",
  });

  deck.slideCircuito(pres, {
    rodape: RODAPE_DECK, pageNum: 4,
    titulo: "4 princípios de resposta a objeções",
    regioes: [
      { label: "Validar a objeção antes de responder a ela", rx: 0.20, ry: 0.22, color: deck.NAVY, d: 0.5 },
      { label: "Responder com informação, não com pressão", rx: 0.22, ry: 0.62, color: deck.TERRA, d: 0.4 },
      { label: "Nunca insistir além do respeito à decisão", rx: 0.60, ry: 0.60, color: deck.NAVY_TINT, d: 0.36 },
      { label: "Deixar a porta aberta pra um retorno futuro", rx: 0.58, ry: 0.24, color: deck.TERRA_TINT, d: 0.36 },
    ],
    notas: [
      "Validar não significa concordar automaticamente — significa reconhecer que a preocupação da pessoa é legítima.",
      "Uma porta deixada aberta com respeito costuma gerar retorno espontâneo depois, sem qualquer cobrança.",
    ],
  });

  deck.slideCadeia(pres, {
    rodape: RODAPE_DECK, pageNum: 5,
    titulo: "Da objeção à decisão",
    elos: [
      { titulo: "Objeção expressa", desc: "A pessoa verbaliza uma dúvida ou hesitação real" },
      { titulo: "Validação genuína", desc: "Reconhecer que a preocupação faz sentido" },
      { titulo: "Resposta informativa", desc: "Informação relevante, sem pressão pra decidir" },
      { titulo: "Decisão respeitada", desc: "Qualquer que seja o resultado, sem insistência" },
    ],
    notaFinal: "Esse caminho parece simples, mas exige resistir ao impulso de \"convencer\" — o objetivo é informar, não persuadir.",
  });

  deck.slideCategorias(pres, {
    rodape: RODAPE_DECK, pageNum: 6,
    titulo: "3 objeções mais comuns",
    categorias: [
      { titulo: "\"Está caro\"", desc: "Objeção de preço, conectada diretamente ao Módulo 5.2", color: deck.NAVY },
      { titulo: "\"Vou pensar\"", desc: "Objeção de indecisão, muitas vezes disfarçando outra dúvida", color: deck.TERRA },
      { titulo: "\"Meu convênio não cobre\"", desc: "Objeção de acesso, ligada à forma de pagamento disponível", color: deck.NAVY_TINT },
    ],
    notaFinal: "As 3 objeções raramente são definitivas — cada uma costuma esconder uma dúvida mais específica por trás.",
  });

  deck.slideSinais(pres, {
    rodape: RODAPE_DECK, pageNum: 7,
    titulo: "Sinais de que a resposta virou insistência",
    itens: [
      { titulo: "Insistência após recusa", desc: "Repetir o convite mesmo depois de uma resposta clara" },
      { titulo: "Desconto automático", desc: "Oferecer redução de valor assim que ouve \"está caro\"" },
      { titulo: "Discurso defensivo", desc: "Justificar excessivamente em vez de apenas informar" },
      { titulo: "Urgência disfarçada", desc: "Criar pressa artificial, o mesmo erro visto no Bloco 2" },
    ],
  });

  deck.slideDiferencial(pres, {
    rodape: RODAPE_DECK, pageNum: 8,
    titulo: "3 respostas à mesma objeção",
    cards: [
      { titulo: "Defensiva", desc: "\"Mas meu trabalho vale isso, viu? Não é fácil o que eu faço.\"" },
      { titulo: "Neutra", desc: "\"Entendo. Qualquer coisa, me chama.\" — sem calor nem informação real." },
      { titulo: "Acolhedora", desc: "\"Faz sentido pensar sobre isso. Fico à disposição se surgir alguma dúvida.\"" },
    ],
  });

  deck.slideInstrumentos(pres, {
    rodape: RODAPE_DECK, pageNum: 9,
    titulo: "3 respostas prontas pras objeções comuns",
    instrumentos: [
      { sigla: "\"Está caro\"", nome: "Validar, sem desconto automático", desc: "\"Entendo — o valor reflete [processo já explicado]. Fico à disposição.\"" },
      { sigla: "\"Vou pensar\"", nome: "Respeitar, sem cobrança de prazo", desc: "\"Claro, faz sentido. Se tiver qualquer dúvida, é só chamar.\"" },
      { sigla: "Convênio", nome: "Informar alternativas, sem pressão", desc: "\"Não atendo por esse convênio, mas posso te indicar outras opções se preferir.\"" },
    ],
  });

  deck.slideProtocoloOverview(pres, {
    rodape: RODAPE_DECK, pageNum: 10,
    titulo: "Respondendo a objeções: 4 passos",
    passos: [
      { titulo: "Validar a\nobjeção genuinamente", desc: "Reconhecer que a preocupação da pessoa faz sentido" },
      { titulo: "Oferecer informação\nrelevante", desc: "Sem pressão, sem discurso defensivo" },
      { titulo: "Deixar claro que\na decisão é dela", desc: "Sem insistência além do respeito inicial" },
      { titulo: "Manter a porta\naberta", desc: "Sem cobrança de retorno ou prazo definido" },
    ],
    notaFinal: "Esses 4 passos valem pras 3 objeções mais comuns e, com pequenos ajustes, pra praticamente qualquer outra que surgir.",
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 11,
    titulo: "Passos 1 e 2, na prática",
    colunas: [
      {
        numero: 1, titulo: "Validar a objeção genuinamente",
        fala: "“Entendo, faz sentido pensar sobre isso antes de decidir.”",
        bullets: ["Validar não significa concordar automaticamente — significa reconhecer a legitimidade da dúvida"],
      },
      {
        numero: 2, titulo: "Oferecer informação relevante",
        bullets: ["Responda com fato, não com justificativa emocional ou defensiva", "Conecte a informação ao que já foi explicado no Módulo 5.1"],
      },
    ],
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 12,
    titulo: "Passos 3 e 4, na prática",
    colunas: [
      {
        numero: 3, titulo: "Deixar claro que a decisão é dela",
        bullets: ["\"Fico à disposição, mas a decisão é sua\" comunica respeito sem soar indiferente", "Isso reduz a pressão percebida, mesmo quando você genuinamente gostaria que a pessoa continuasse"],
      },
      {
        numero: 4, titulo: "Manter a porta aberta",
        bullets: ["\"Se mudar de ideia, é só me chamar\" mantém a relação sem cobrança de prazo", "Muitas pessoas retornam semanas ou meses depois, justamente por não terem sentido pressão"],
      },
    ],
  });

  deck.slideCaso(pres, {
    rodape: RODAPE_DECK, pageNum: 13,
    vinheta: "Um psicólogo termina de explicar o processo da primeira sessão, e a pessoa responde: \"Ah, entendi... vou pensar e te aviso.\" Ele sente um impulso forte de perguntar \"pensar sobre o quê exatamente?\" ou oferecer um horário \"especial\" pra facilitar a decisão.",
    perguntas: [
      "Por que ceder ao impulso de questionar \"pensar sobre o quê\" pode soar como insistência?",
      "Como ele poderia responder seguindo os 4 passos do protocolo?",
      "Que dúvida específica pode estar escondida atrás desse \"vou pensar\", nesse contexto?",
    ],
  });

  deck.slideEncaminhamento(pres, {
    rodape: RODAPE_DECK, pageNum: 14,
    titulo: "Quando buscar ajuda especializada",
    criterios: [
      "Padrão recorrente de sentir necessidade de \"convencer\" após uma objeção: revisar junto ao Módulo 5.1 se a abordagem inicial está genuinamente acolhedora",
      "Volume alto de objeções de preço específico: revisar o Módulo 1.4, sobre preço e posicionamento",
      "Dificuldade em responder objeções sobre convênio: mapear alternativas reais (indicação, valor social) antes da próxima conversa",
      "Desconforto emocional recorrente diante de qualquer objeção: considerar isso como tema de supervisão ou processo terapêutico próprio"
    ],
  });

  deck.slideRecap(pres, {
    rodape: RODAPE_DECK, pageNum: 15,
    pontos: [
      "Uma objeção é uma pergunta disfarçada, não uma rejeição definitiva — a resposta certa informa, não pressiona",
      "\"Está caro\", \"vou pensar\" e \"meu convênio não cobre\" são as 3 objeções mais comuns no primeiro contato",
      "Validar, informar, respeitar a decisão e manter a porta aberta são os 4 princípios de qualquer resposta",
      "Insistência, desconto automático e urgência disfarçada são os sinais mais claros de que a resposta cruzou a linha",
    ],
    proximoTexto: "Próximo: exercícios práticos e avaliação do Módulo 5.3 →",
  });

  return pres.writeFile({ fileName: "Modulo-5.3-Lidando-Objecoes.pptx" });
}

// ============================================================
// 2) EXERCÍCIOS
// ============================================================
function construirExercicios() {
  const children = [
    ...doc.capa(KICKER, "Exercícios — Lidando com Objeções", "Resolva individualmente, de preferência ensaiando as respostas em voz alta como num contato real."),

    doc.exNum(1, "Os 4 princípios de resposta"),
    doc.pergunta(1, "Liste os 4 princípios vistos no módulo."),
    ...doc.linhaResposta(3),

    doc.exNum(2, "As 3 objeções mais comuns"),
    doc.tabelaSimples(["Objeção", "Dúvida provável por trás dela"], [["\"Está caro\"", ""], ["\"Vou pensar\"", ""], ["\"Meu convênio não cobre\"", ""]], [3600, 5550]),

    doc.exNum(3, "Escrevendo suas próprias respostas"),
    doc.pergunta(1, "Escreva sua própria resposta pra \"está caro\", seguindo os 4 passos do protocolo."),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Escreva sua própria resposta pra \"vou pensar\"."),
    ...doc.linhaResposta(2),
    doc.pergunta(3, "Escreva sua própria resposta pra \"meu convênio não cobre\"."),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),

    doc.exNum(4, "Reconhecendo insistência em si mesmo"),
    doc.pergunta(1, "Você já sentiu o impulso de insistir após uma objeção? O que ajudaria a resistir a esse impulso da próxima vez?"),
    ...doc.linhaResposta(3),

    doc.exNum(5, "Caso integrado — o vou pensar"),
    doc.vinhetaBox("Um psicólogo, após explicar o processo, ouve \"vou pensar e te aviso\" e sente impulso de perguntar \"pensar sobre o quê exatamente?\" ou oferecer horário especial."),
    doc.pergunta(1, "Por que ceder a esse impulso pode soar como insistência?"),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Como ele poderia responder seguindo os 4 passos do protocolo?"),
    ...doc.linhaResposta(2),
    doc.pergunta(3, "Que dúvida específica pode estar escondida atrás desse \"vou pensar\"?"),
    ...doc.linhaResposta(2),
  ];

  return doc.salvar(doc.paginaDoc("Escola de Marketing para Psicólogos", RODAPE_DOC, children), "Modulo-5.3-Exercicios.docx");
}

// ============================================================
// 3) AVALIAÇÃO
// ============================================================
function construirProva() {
  const objetivas = [
    ["Os 4 princípios de resposta a objeções, segundo o módulo, são:", ["Validar, responder com informação, respeitar a decisão, manter a porta aberta", "Alcance, engajamento, agendamento e custo por lead", "Escuta genuína, transparência, espaço pra dúvidas, decisão respeitada", "Tom neutro, conexão com valor, silêncio aceito, abertura genuína"]],
    ["As 3 objeções mais comuns, segundo o módulo, são:", ["\"Está caro\", \"vou pensar\", \"meu convênio não cobre\"", "Preço, localização e horário de atendimento", "Alcance, engajamento e conversão", "Depoimento, urgência e comparação"]],
    ["Uma objeção, segundo o módulo, deve ser entendida como:", ["Uma pergunta disfarçada, não uma rejeição definitiva", "Sempre um \"não\" definitivo e final", "Um sinal de que o profissional deve insistir mais", "Irrelevante para a condução da conversa"]],
    ["\"Validar a objeção\", segundo o módulo, significa:", ["Reconhecer que a preocupação da pessoa é legítima, sem necessariamente concordar", "Concordar automaticamente com qualquer objeção apresentada", "Ignorar completamente a preocupação expressa", "Oferecer desconto imediato como resposta padrão"]],
    ["Um sinal de que a resposta virou insistência é:", ["Repetir o convite mesmo depois de uma resposta clara", "Deixar a porta aberta sem cobrança de prazo", "Responder com informação relevante, sem pressão", "Validar a objeção antes de responder"]],
    ["Oferecer desconto automaticamente diante de \"está caro\" é descrito como:", ["Um sinal de que a resposta virou insistência", "A prática mais recomendada pelo módulo", "Uma forma de validar genuinamente a objeção", "Exigido sempre que o preço é questionado"]],
    ["\"Urgência disfarçada\" como erro na resposta a objeções se conecta a:", ["O mesmo padrão de erro visto no Bloco 2", "Uma prática recomendada de comunicação de valor", "Uma exigência da Resolução CFP", "Um elemento essencial de validação genuína"]],
    ["\"Manter a porta aberta\", segundo o módulo, tende a:", ["Gerar retorno espontâneo, sem qualquer cobrança de prazo", "Reduzir automaticamente a confiança do paciente", "Ser incompatível com o respeito à decisão da pessoa", "Substituir a necessidade de informar sobre o processo"]],
    ["Diante de volume alto de objeções de preço específico, o módulo recomenda:", ["Revisar o Módulo 1.4, sobre preço e posicionamento", "Reduzir imediatamente o valor cobrado, sem outra análise", "Ignorar completamente o padrão observado", "Aumentar a pressão nas próximas conversas"]],
    ["Este módulo aplica diretamente os princípios de qual módulo anterior?", ["Módulo 5.1, sobre acolhimento no primeiro contato", "Módulo 2.4, sobre o checklist de conformidade", "Módulo 4.5, sobre métricas de aquisição", "Módulo 3.6, sobre planejamento editorial"]],
  ];
  const gabaritoObjetivas = ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a"];

  const children = [
    ...doc.capa(KICKER, "Avaliação — Lidando com Objeções", `Avaliação formativa de encerramento do Módulo ${MOD}.`),
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
    doc.vinhetaBox("Uma psicóloga ouve de uma possível paciente: \"meu convênio não cobre psicólogo particular, só psiquiatra.\" Ela sente vontade de imediatamente propor um desconto significativo pra reter a pessoa."),
    new doc.Paragraph({ spacing: { before: 240 }, children: [new doc.TextRun({ text: "Com base no protocolo estudado, responda:", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    new doc.Paragraph({ spacing: { before: 220, after: 40 }, children: [new doc.TextRun({ text: "a) (10 pts) Por que ceder ao impulso do desconto imediato pode ser um erro, segundo o módulo?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "b) (10 pts) Escreva uma resposta seguindo o passo 1 (validar) pra essa objeção específica.", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "c) (10 pts) Que informação relevante (passo 2) ela poderia oferecer, sem prometer desconto?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "d) (10 pts) Escreva a resposta completa, unindo os 4 passos do protocolo.", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(3),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    new doc.Paragraph({ spacing: { after: 40 }, children: [new doc.TextRun({ text: "USO EXCLUSIVO DO INSTRUTOR — remover antes de aplicar a prova", bold: true, color: doc.TERRA, font: doc.FONT, size: 20 })] }),
    doc.tituloH1("Gabarito"),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 1 — Questões objetivas", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 200 }, children: [new doc.TextRun({ text: gabaritoObjetivas.map((r, i) => `${i + 1}-${r}`).join("   ·   "), font: doc.FONT, size: 22, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 2 — Critério de correção da questão de caso", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "a) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Desconto oferecido por impulso, sem planejamento (Módulo 1.4), pode comprometer a sustentabilidade financeira e desalinhar o preço do posicionamento.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "b) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Exemplo: \"Entendo, essa é uma dúvida comum — muitos convênios realmente não cobrem atendimento particular.\"", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "c) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Informar sobre reembolso via nota fiscal, se aplicável, ou indicar outras opções de atendimento, sem prometer desconto imediato.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "d) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Resposta livre — deve validar, informar sem pressão, deixar a decisão clara como da paciente, e manter a porta aberta pra retorno futuro.", font: doc.FONT, size: 21, color: doc.INK })] }),
  );

  return doc.salvar(doc.paginaDoc("Escola de Marketing para Psicólogos", RODAPE_DOC, children), "Modulo-5.3-Avaliacao.docx");
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
      n: 1, titulo: "Objeção não é rejeição, e os 4 princípios", duracao: "13 min", slides: "1, 2, 3, 4",
      objetivo: "Sair sabendo por que objeção não é rejeição e quais são os 4 princípios de resposta.",
      segmentos: [
        seg("0:00–0:45", "Abertura (gancho)", [{ fala: "Uma objeção não é um 'não' — é uma pergunta disfarçada, e sua resposta a essa pergunta é o que realmente decide se a pessoa vai se sentir segura pra continuar." }]),
        seg("0:45–2:00", "Por que isso importa", ["Este módulo aplica os princípios de acolhimento do Módulo 5.1 às 3 objeções mais comuns."]),
        seg("2:00–9:00", "Os 4 princípios (mostrar slide 4)", [
          "Validar a objeção antes de responder.",
          "Responder com informação, não pressão.",
          "Nunca insistir além do respeito à decisão.",
          "Deixar a porta aberta pra retorno futuro.",
        ]),
        seg("9:00–12:00", "Um ponto importante", ["Validar não significa concordar automaticamente — significa reconhecer que a preocupação faz sentido."]),
        seg("12:00–13:00", "Fechamento", [{ fala: "Próxima aula: da objeção à decisão, e as 3 objeções mais comuns." }]),
      ],
    },
    {
      n: 2, titulo: "Da objeção à decisão, e as 3 objeções mais comuns", duracao: "12 min", slides: "5, 6",
      objetivo: "Explicar a cadeia da resposta a objeções e as 3 objeções mais comuns.",
      segmentos: [
        seg("0:00–1:00", "Retomada rápida", ["Vimos os 4 princípios. Hoje, o caminho completo até a decisão respeitada."]),
        seg("1:00–6:00", "A cadeia (mostrar slide 5)", ["Objeção expressa → Validação genuína → Resposta informativa → Decisão respeitada."]),
        seg("6:00–11:00", "As 3 objeções (mostrar slide 6)", ["\"Está caro\", \"vou pensar\" e \"meu convênio não cobre\" — cada uma escondendo uma dúvida específica."]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Próxima aula: os sinais de insistência, e 3 respostas à mesma objeção." }]),
      ],
    },
    {
      n: 3, titulo: "Sinais de alerta e 3 respostas comparadas", duracao: "12 min", slides: "7, 8",
      objetivo: "Reconhecer sinais de resposta que virou insistência e comparar 3 formas de responder.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Quatro sinais de insistência — e três respostas, da defensiva à acolhedora."]),
        seg("1:00–6:00", "Sinais de alerta (mostrar slide 7)", [
          "Insistência após recusa.",
          "Desconto automático.",
          "Discurso defensivo.",
          "Urgência disfarçada.",
        ]),
        seg("6:00–11:00", "3 respostas (mostrar slide 8)", ["Compare a resposta defensiva, neutra e acolhedora, todas pra mesma objeção."]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Próxima aula: as 3 respostas prontas, e os 4 passos completos." }]),
      ],
    },
    {
      n: 4, titulo: "As 3 respostas prontas e os 4 passos", duracao: "11 min", slides: "9, 10",
      objetivo: "Conhecer as 3 respostas prontas e os 4 passos completos de resposta a objeções.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três respostas prontas — e um processo de 4 passos pra qualquer objeção."]),
        seg("1:00–5:00", "3 respostas prontas (mostrar slide 9)", ["Modelos pra \"está caro\", \"vou pensar\" e questões de convênio."]),
        seg("5:00–10:00", "Os 4 passos (mostrar slide 10)", ["Validar, oferecer informação, deixar a decisão clara, manter a porta aberta."]),
        seg("10:00–11:00", "Fechamento", [{ fala: "Próxima aula: aplicando os 4 passos na prática." }]),
      ],
    },
    {
      n: 5, titulo: "Aplicação prática dos 4 passos", duracao: "12 min", slides: "11, 12",
      objetivo: "Aplicar os 4 passos com exemplos concretos.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Hoje colocamos os 4 passos em prática, com as 3 objeções mais comuns."]),
        seg("1:00–6:00", "Passos 1 e 2 (mostrar slide 11)", [{ fala: "Entendo, faz sentido pensar sobre isso antes de decidir." }, "Responda com fato, não com justificativa defensiva."]),
        seg("6:00–11:00", "Passos 3 e 4 (mostrar slide 12)", ["\"Fico à disposição, mas a decisão é sua.\"", "\"Se mudar de ideia, é só me chamar.\""]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Próxima aula: um caso real de 'vou pensar', e o recap final." }]),
      ],
    },
    {
      n: 6, titulo: "Prática guiada — o vou pensar e recap final", duracao: "13 min", slides: "13, 14, 15",
      objetivo: "Aplicar tudo que foi visto a um caso real e consolidar os pontos-chave do módulo.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["A última aula do módulo — um caso real, e o recap final."]),
        seg("1:00–5:00", "Apresentando o caso (mostrar slide 13)", ["Leia a vinheta com calma.", "Note o impulso genuíno, mas arriscado, de questionar a objeção."]),
        seg("5:00–9:00", "Percorrendo as perguntas de discussão", ["Discuta em voz alta as 3 perguntas do slide 13.", "Esboce uma resposta que siga os 4 passos do protocolo."]),
        seg("9:00–11:00", "Quando buscar ajuda especializada (mostrar slide 14)", ["Percorra os 4 critérios do slide 14."]),
        seg("11:00–13:00", "Recap final (mostrar slide 15)", [{ fala: "Retome os 4 pontos-chave do módulo. Agora é hora dos exercícios e da avaliação — e do último módulo do Bloco 5, sobre reduzir faltas e cancelamentos." }]),
      ],
    },
  ];

  const totalMin = 13 + 12 + 12 + 11 + 12 + 13;

  const children = [
    ...doc.capa(KICKER, "Roteiro de Aulas — Lidando com Objeções", "Módulo dividido em 6 vídeo-aulas de 11 a 13 minutos, seguindo os slides já produzidos. Cada aula tem roteiro cronometrado, pronto pra gravação."),
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

  return doc.salvar(doc.paginaDoc("Escola de Marketing para Psicólogos", `${RODAPE_DOC} — Roteiro de Aulas`, children), "Modulo-5.3-Roteiro-Aulas.docx");
}

// ============================================================
Promise.resolve()
  .then(construirDeck)
  .then(construirExercicios)
  .then(construirProva)
  .then(construirRoteiro)
  .then(() => console.log("TUDO PRONTO"))
  .catch((e) => { console.error(e); process.exit(1); });

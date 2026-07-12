const deck = require("../_lib/lib-deck.js");
const doc = require("../_lib/lib-doc.js");

const MOD = "2.3";
const NOME = "Autoridade sem Prometer Cura";
const RODAPE_DECK = `Autoridade sem Prometer Cura — Módulo ${MOD}`;
const RODAPE_DOC = `Módulo ${MOD} — Autoridade sem Prometer Cura`;
const KICKER = "MÓDULO 2.3 · ÉTICA NA PUBLICIDADE EM PSICOLOGIA";
const MARCA = "Escola de Marketing para Psicólogos — by Dioclides";

// ============================================================
// 1) SLIDE DECK
// ============================================================
function construirDeck() {
  const pres = deck.novaApresentacao(`${NOME} — Educar sem Prometer`);

  deck.slideTitulo(pres, {
    moduloLabel: `Módulo ${MOD} · Bloco 2 · Ética na Publicidade`,
    titulo: "Construindo Autoridade",
    subtitulo: "A linha entre educar o público e prometer o que a terapia não garante",
    rodapeMarca: MARCA,
    passos: ["Autoridade", "A linha", "Linguagem", "Erros", "Prática"],
  });

  deck.slideRoteiro(pres, {
    rodape: RODAPE_DECK, pageNum: 2,
    cards: [
      { titulo: "Autoridade legítima", desc: "O que realmente constrói confiança, sem depender de promessa" },
      { titulo: "A linha", desc: "Onde educar termina e prometer começa" },
      { titulo: "Linguagem que funciona", desc: "3 formas de comunicar competência com segurança" },
      { titulo: "Erros comuns", desc: "Sinais de que a comunicação já cruzou a linha" },
      { titulo: "Prática", desc: "Aplicando tudo isso a um caso real" },
    ],
  });

  deck.slideHook(pres, {
    rodape: RODAPE_DECK, pageNum: 3,
    frase: "Autoridade não vem de prometer resultado — vem de mostrar, com consistência, que você entende profundamente o problema que a pessoa está vivendo.",
    apoio: "Este módulo conecta o raciocínio dos Módulos 2.1 e 2.2 a uma pergunta prática: como parecer competente sem prometer nada que a terapia não garante?",
  });

  deck.slideCircuito(pres, {
    rodape: RODAPE_DECK, pageNum: 4,
    titulo: "4 pilares da autoridade legítima",
    regioes: [
      { label: "Conhecimento demonstrado: explicar bem um conceito complexo", rx: 0.20, ry: 0.22, color: deck.NAVY, d: 0.5 },
      { label: "Consistência: aparecer regularmente, com qualidade constante", rx: 0.22, ry: 0.62, color: deck.TERRA, d: 0.4 },
      { label: "Transparência de método: dizer o que você faz, não o que promete", rx: 0.60, ry: 0.60, color: deck.NAVY_TINT, d: 0.36 },
      { label: "Prova social ética: formação e experiência, não depoimento", rx: 0.58, ry: 0.24, color: deck.TERRA_TINT, d: 0.36 },
    ],
    notas: [
      "Nenhum desses 4 pilares depende de prometer resultado — todos se sustentam sozinhos, sem cruzar a linha ética.",
      "Autoridade construída assim é mais lenta, mas também mais resistente: não depende de um caso de sucesso isolado.",
    ],
  });

  deck.slideCadeia(pres, {
    rodape: RODAPE_DECK, pageNum: 5,
    titulo: "Do conhecimento à autoridade percebida",
    elos: [
      { titulo: "Domínio real do tema", desc: "Formação, experiência e estudo contínuo genuínos" },
      { titulo: "Comunicação clara", desc: "Explicar esse domínio de forma acessível, sem jargão" },
      { titulo: "Reconhecimento do público", desc: "As pessoas passam a associar você àquele tema" },
      { titulo: "Confiança que converte", desc: "Sem prometer nada além da sua própria competência" },
    ],
    notaFinal: "O último elo é o que diferencia autoridade de hype: a confiança nasce da competência real, não de uma promessa sobre o futuro do paciente.",
  });

  deck.slideCategorias(pres, {
    rodape: RODAPE_DECK, pageNum: 6,
    titulo: "3 formas de construir autoridade",
    categorias: [
      { titulo: "Por competência", desc: "Demonstrar domínio real de um tema, de forma clara e acessível", color: deck.NAVY },
      { titulo: "Por proximidade", desc: "Ser presente e consistente, criando familiaridade ao longo do tempo", color: deck.TERRA },
      { titulo: "Por resultado", desc: "Prometer ou insinuar o desfecho do tratamento — a única forma proibida", color: deck.NAVY_TINT },
    ],
    notaFinal: "As 2 primeiras formas sustentam autoridade duradoura. A terceira é exatamente o que os Módulos 2.1 e 2.2 pedem pra evitar.",
  });

  deck.slideSinais(pres, {
    rodape: RODAPE_DECK, pageNum: 7,
    titulo: "Sinais de que a comunicação cruzou a linha",
    itens: [
      { titulo: "Estatística de \"sucesso\"", desc: "Números sem base real, usados como argumento de venda" },
      { titulo: "Testemunho reformulado", desc: "\"Uma história genérica\" que ainda funciona como depoimento disfarçado" },
      { titulo: "Garantia implícita de prazo", desc: "\"Em poucas sessões você vai...\" — previsão de tempo pra resultado" },
      { titulo: "Comparação de \"taxa de sucesso\"", desc: "Colocar seu método acima de outros em termos de eficácia" },
    ],
  });

  deck.slideDiferencial(pres, {
    rodape: RODAPE_DECK, pageNum: 8,
    titulo: "3 frases, a mesma ideia",
    cards: [
      { titulo: "Permitida", desc: "\"Eu explico como a ansiedade funciona no corpo, e como a terapia trabalha com isso.\"" },
      { titulo: "Zona de risco", desc: "\"Isso costuma ajudar muita gente a se sentir melhor rapidamente.\"" },
      { titulo: "Proibida", desc: "\"Isso vai resolver seu problema de ansiedade.\"" },
    ],
  });

  deck.slideInstrumentos(pres, {
    rodape: RODAPE_DECK, pageNum: 9,
    titulo: "3 formas legítimas de mostrar autoridade",
    instrumentos: [
      { sigla: "Formação", nome: "Especialização, cursos e formação continuada", desc: "Comunicada como fato verificável, não como promessa de resultado." },
      { sigla: "Conteúdo", nome: "Educação consistente sobre temas da sua área", desc: "Ensinar um conceito bem é a forma mais sólida de autoridade." },
      { sigla: "Transparência", nome: "Clareza sobre método e abordagem utilizados", desc: "Dizer como você trabalha, sem prometer o que esse trabalho vai gerar." },
    ],
  });

  deck.slideProtocoloOverview(pres, {
    rodape: RODAPE_DECK, pageNum: 10,
    titulo: "Comunicando autoridade: 4 passos",
    passos: [
      { titulo: "Escolher um\nconceito pra explicar", desc: "Um tema da sua área que você domina de verdade" },
      { titulo: "Comunicar com\nclareza, sem jargão", desc: "Linguagem acessível, sem perder precisão" },
      { titulo: "Convidar à\nreflexão", desc: "Não à conclusão — deixe a pessoa pensar, não prometa a resposta" },
      { titulo: "Terminar com\num convite", desc: "Não com uma promessa sobre o que vai acontecer" },
    ],
    notaFinal: "Esses 4 passos funcionam pra qualquer formato: post, vídeo curto, email ou legenda de story.",
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 11,
    titulo: "Passos 1 e 2, na prática",
    colunas: [
      {
        numero: 1, titulo: "Escolher um conceito",
        bullets: ["Prefira um tema específico ao invés de um tema amplo demais", "Um conceito bem explicado vale mais que dez dicas soltas"],
      },
      {
        numero: 2, titulo: "Comunicar com clareza",
        fala: "“Se eu explicasse isso pra alguém sem formação nenhuma, essa pessoa entenderia?”",
        bullets: ["Jargão técnico impressiona menos do que parece — e afasta quem mais precisa entender"],
      },
    ],
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 12,
    titulo: "Passos 3 e 4, na prática",
    colunas: [
      {
        numero: 3, titulo: "Convidar à reflexão",
        bullets: ["Termine com uma pergunta ou reflexão, não com uma conclusão fechada", "Isso respeita a complexidade real de cada caso, sem generalizar"],
      },
      {
        numero: 4, titulo: "Terminar com convite",
        bullets: ["\"Se isso faz sentido pra você, vamos conversar\" — convite, não promessa", "Evite qualquer frase que sugira o que vai acontecer depois da conversa"],
      },
    ],
  });

  deck.slideCaso(pres, {
    rodape: RODAPE_DECK, pageNum: 13,
    vinheta: "Um psicólogo, animado com o crescimento do perfil, está preparando um post sobre TDAH em adultos. No rascunho, escreveu: \"90% dos meus pacientes com TDAH relatam melhora significativa já nas primeiras semanas de acompanhamento.\" Ele pergunta se pode publicar assim, já que o número reflete sua experiência real.",
    perguntas: [
      "Mesmo sendo uma percepção genuína, por que esse número específico é arriscado de publicar?",
      "Que pilar de autoridade legítima (slide 4) esse post poderia usar em vez da estatística?",
      "Como reescrever o post mantendo a força da mensagem, sem prometer resultado?",
    ],
  });

  deck.slideEncaminhamento(pres, {
    rodape: RODAPE_DECK, pageNum: 14,
    titulo: "Quando buscar orientação adicional",
    criterios: [
      "Dúvida se um dado ou estatística pode ser usado: prefira não publicar até confirmar a fonte e a formulação",
      "Pressão para \"provar resultado\" vinda de estratégia de marketing externa: revisar com base nos 4 pilares deste módulo",
      "Conteúdo educativo sobre tema sensível ou pouco dominado: buscar mentoria de conteúdo antes de publicar",
      "Insegurança recorrente sobre onde está a linha: revisitar os Módulos 2.1 e 2.2 antes de continuar produzindo conteúdo",
    ],
  });

  deck.slideRecap(pres, {
    rodape: RODAPE_DECK, pageNum: 15,
    pontos: [
      "Autoridade legítima nasce de competência demonstrada, consistência e transparência — não de promessa de resultado",
      "As 3 formas de construir autoridade: por competência, por proximidade, e por resultado (a única proibida)",
      "Estatística de sucesso, testemunho reformulado e garantia implícita de prazo são sinais de que a linha foi cruzada",
      "Os 4 passos — escolher, explicar com clareza, convidar à reflexão, terminar com convite — funcionam em qualquer formato",
    ],
    proximoTexto: "Próximo: exercícios práticos e avaliação do Módulo 2.3 →",
  });

  return pres.writeFile({ fileName: "Modulo-2.3-Autoridade-Sem-Prometer-Cura.pptx" });
}

// ============================================================
// 2) EXERCÍCIOS
// ============================================================
function construirExercicios() {
  const children = [
    ...doc.capa(KICKER, "Exercícios — Autoridade sem Prometer Cura", "Resolva individualmente. O objetivo é treinar a diferença entre comunicar competência e prometer resultado."),

    doc.exNum(1, "Os 4 pilares da autoridade legítima"),
    doc.pergunta(1, "Liste os 4 pilares vistos no módulo, com suas palavras."),
    ...doc.linhaResposta(3),

    doc.exNum(2, "As 3 formas de construir autoridade"),
    doc.tabelaSimples(["Forma", "Característica central"], [["Por competência", ""], ["Por proximidade", ""], ["Por resultado (proibida)", ""]], [3600, 5550]),

    doc.exNum(3, "Reescrevendo frases de risco"),
    doc.pergunta(1, "Reescreva de forma permitida: \"Isso costuma ajudar muita gente a se sentir melhor rapidamente.\""),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Reescreva de forma permitida: \"Meu método tem taxa de sucesso maior que a terapia tradicional.\""),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),

    doc.exNum(4, "Aplicando os 4 passos"),
    doc.pergunta(1, "Escolha um conceito da sua área e escreva uma legenda curta seguindo os 4 passos do módulo."),
    ...doc.linhaResposta(4),

    doc.exNum(5, "Caso integrado — os 90%"),
    doc.vinhetaBox("Um psicólogo quer publicar: \"90% dos meus pacientes com TDAH relatam melhora significativa já nas primeiras semanas de acompanhamento.\""),
    doc.pergunta(1, "Mesmo sendo uma percepção genuína, por que esse número específico é arriscado de publicar?"),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Que pilar de autoridade legítima esse post poderia usar em vez da estatística?"),
    ...doc.linhaResposta(2),
    doc.pergunta(3, "Reescreva o post mantendo a força da mensagem, sem prometer resultado."),
    ...doc.linhaResposta(2),
  ];

  return doc.salvar(doc.paginaDoc("Escola de Marketing para Psicólogos", RODAPE_DOC, children), "Modulo-2.3-Exercicios.docx");
}

// ============================================================
// 3) AVALIAÇÃO
// ============================================================
function construirProva() {
  const objetivas = [
    ["Os 4 pilares da autoridade legítima, segundo o módulo, são:", ["Conhecimento demonstrado, consistência, transparência de método, prova social ética", "Preço, localização, horário de atendimento e forma de pagamento", "Depoimento, antes e depois, urgência artificial e comparação", "Diagnóstico, procedimento, resultado e prognóstico"]],
    ["Autoridade \"por resultado\", segundo o módulo, é:", ["A única das 3 formas de construir autoridade que é proibida", "A forma mais recomendada de construir autoridade rapidamente", "Sinônimo de autoridade por competência", "Permitida apenas quando o resultado é verdadeiro"]],
    ["\"Isso costuma ajudar muita gente a se sentir melhor rapidamente\" é classificada no módulo como:", ["Zona de risco — emocional, mas sem promessa totalmente explícita", "Frase permitida sem qualquer ressalva", "Frase proibida por conter dado estatístico falso", "Um exemplo de transparência de método"]],
    ["Um sinal de que a comunicação de autoridade cruzou a linha é:", ["Uso de estatística de \"sucesso\" sem base real", "Explicar com clareza como um conceito clínico funciona", "Comunicar formação e especialização de forma verificável", "Convidar o público a refletir sobre um tema"]],
    ["O passo \"convidar à reflexão\", segundo o protocolo, recomenda:", ["Terminar com pergunta ou reflexão, não com conclusão fechada", "Sempre apresentar uma conclusão definitiva sobre o tema", "Evitar qualquer tipo de interação com o público", "Garantir uma resposta específica para cada leitor"]],
    ["Comparar a própria \"taxa de sucesso\" com a de outros métodos é:", ["Um sinal de que a comunicação cruzou a linha ética", "Uma prática recomendada para demonstrar competência", "Permitido desde que os dados sejam verdadeiros", "Exigido pela Nota Técnica CFP nº 01/2022"]],
    ["O passo final do protocolo (\"terminar com convite\") busca:", ["Convidar à conversa, sem prometer o que vai acontecer depois dela", "Garantir ao leitor um resultado específico e imediato", "Encerrar sempre com uma oferta de desconto", "Evitar qualquer chamada para ação no conteúdo"]],
    ["Diante de dúvida se um dado ou estatística pode ser usado, o módulo recomenda:", ["Preferir não publicar até confirmar a fonte e a formulação", "Publicar mesmo assim, já que reflete a experiência pessoal", "Ignorar a dúvida, pois estatísticas não têm relação com ética", "Publicar apenas em stories, já que somem em 24 horas"]],
    ["Um testemunho \"reformulado como história genérica\" é considerado, segundo o módulo:", ["Ainda um depoimento disfarçado, e por isso arriscado", "Uma forma segura de contornar a proibição de depoimentos", "Permitido, desde que a pessoa não seja citada pelo nome", "Recomendado como prova social ética"]],
    ["Este módulo se conecta aos Módulos 2.1 e 2.2 ao:", ["Aplicar o mesmo raciocínio ético especificamente à construção de autoridade", "Substituir completamente o conteúdo desses dois módulos anteriores", "Não ter qualquer relação temática com os módulos anteriores", "Introduzir uma nova resolução do CFP, diferente das já vistas"]],
  ];
  const gabaritoObjetivas = ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a"];

  const children = [
    ...doc.capa(KICKER, "Avaliação — Autoridade sem Prometer Cura", `Avaliação formativa de encerramento do Módulo ${MOD}.`),
    doc.infoBox([
      ["Nota de corte:", "75 de 100 pontos"],
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
    doc.vinhetaBox("Uma psicóloga especializada em luto quer se posicionar como referência no tema. Ela está em dúvida entre dois caminhos: (1) publicar semanalmente explicando conceitos sobre o processo de luto, ou (2) publicar comparações de \"antes e depois\" de pacientes que ela acompanhou, sem citar nomes."),
    new doc.Paragraph({ spacing: { before: 240 }, children: [new doc.TextRun({ text: "Com base no protocolo estudado, responda:", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    new doc.Paragraph({ spacing: { before: 220, after: 40 }, children: [new doc.TextRun({ text: "a) (10 pts) Qual dos 2 caminhos você recomendaria, e por quê?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "b) (10 pts) Que pilar de autoridade legítima (slide 4) o caminho recomendado exemplifica?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "c) (10 pts) Por que \"antes e depois\" sem nomes ainda é arriscado, segundo os módulos anteriores?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "d) (10 pts) Esboce um exemplo de post seguindo os 4 passos do protocolo, sobre um conceito de luto.", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(3),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    new doc.Paragraph({ spacing: { after: 40 }, children: [new doc.TextRun({ text: "USO EXCLUSIVO DO INSTRUTOR — remover antes de aplicar a prova", bold: true, color: doc.TERRA, font: doc.FONT, size: 20 })] }),
    doc.tituloH1("Gabarito"),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 1 — Questões objetivas", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 200 }, children: [new doc.TextRun({ text: gabaritoObjetivas.map((r, i) => `${i + 1}-${r}`).join("   ·   "), font: doc.FONT, size: 22, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 2 — Critério de correção da questão de caso", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "a) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "O caminho 1 (explicar conceitos) — sustenta autoridade duradoura sem risco ético; o caminho 2 (antes e depois) repete o padrão de erro visto no Módulo 2.2.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "b) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Conhecimento demonstrado — explicar bem um conceito complexo do processo de luto.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "c) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Porque o nível de detalhe da narrativa pode tornar a pessoa reconhecível por conhecidos, e ainda funciona como promessa implícita de resultado — visto nos Módulos 2.1 e 2.2.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "d) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Resposta livre — avaliar se o exemplo escolhe um conceito específico, usa linguagem acessível, termina com reflexão (não conclusão) e convida à conversa sem prometer resultado.", font: doc.FONT, size: 21, color: doc.INK })] }),
  );

  return doc.salvar(doc.paginaDoc("Escola de Marketing para Psicólogos", RODAPE_DOC, children), "Modulo-2.3-Avaliacao.docx");
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
      n: 1, titulo: "Os 4 pilares da autoridade legítima", duracao: "9 min", slides: "1, 2, 3, 4",
      objetivo: "Sair sabendo explicar os 4 pilares que sustentam autoridade sem prometer resultado.",
      segmentos: [
        seg("0:00–0:40", "Abertura (gancho)", [{ fala: "Autoridade não vem de prometer resultado — vem de mostrar, com consistência, que você entende profundamente o problema que a pessoa está vivendo." }]),
        seg("0:40–1:30", "Por que isso importa", ["Este módulo conecta o raciocínio dos Módulos 2.1 e 2.2 a uma pergunta prática: como parecer competente sem prometer nada?"]),
        seg("1:30–7:00", "Os 4 pilares (mostrar slide 4)", [
          "Conhecimento demonstrado: explicar bem um conceito complexo.",
          "Consistência: aparecer regularmente, com qualidade constante.",
          "Transparência de método: dizer o que você faz, não o que promete.",
          "Prova social ética: formação e experiência, não depoimento.",
        ]),
        seg("7:00–9:00", "Fechamento", [{ fala: "Próxima aula: da competência à autoridade percebida, e as 3 formas de construir isso." }]),
      ],
    },
    {
      n: 2, titulo: "Da competência à autoridade, e as 3 formas", duracao: "9 min", slides: "5, 6",
      objetivo: "Explicar como competência vira autoridade percebida e diferenciar as 3 formas de construí-la.",
      segmentos: [
        seg("0:00–1:00", "Retomada rápida", ["Vimos os 4 pilares. Hoje, como isso se transforma em autoridade percebida."]),
        seg("1:00–4:30", "A cadeia (mostrar slide 5)", ["Domínio real → Comunicação clara → Reconhecimento do público → Confiança que converte."]),
        seg("4:30–8:00", "As 3 formas (mostrar slide 6)", ["Por competência, por proximidade — sólidas — e por resultado, a única proibida."]),
        seg("8:00–9:00", "Fechamento", [{ fala: "Próxima aula: os sinais de que a linha foi cruzada, e 3 frases lado a lado." }]),
      ],
    },
    {
      n: 3, titulo: "Sinais de alerta e as formas legítimas de mostrar autoridade", duracao: "9 min", slides: "7, 8, 9",
      objetivo: "Reconhecer sinais de excesso e as 3 formas legítimas de comunicar autoridade.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Sinais de que a linha foi cruzada — e 3 formas seguras de mostrar autoridade."]),
        seg("1:00–4:30", "Sinais de alerta (mostrar slide 7)", ["Estatística de \"sucesso\", testemunho reformulado, garantia implícita de prazo, comparação de \"taxa de sucesso\"."]),
        seg("4:30–8:00", "3 frases e 3 formas legítimas (mostrar slides 8 e 9)", ["Compare as 3 frases do slide 8.", "Formação, conteúdo e transparência — as 3 formas seguras do slide 9."]),
        seg("8:00–9:00", "Fechamento", [{ fala: "Próxima aula: os 4 passos pra comunicar autoridade, na prática." }]),
      ],
    },
    {
      n: 4, titulo: "Aplicação prática dos 4 passos", duracao: "10 min", slides: "10, 11, 12",
      objetivo: "Aplicar os 4 passos do protocolo com exemplos concretos.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Hoje colocamos os 4 passos em prática, com exemplos."]),
        seg("1:00–2:00", "Visão geral (mostrar slide 10)", ["Escolher conceito → Comunicar com clareza → Convidar à reflexão → Terminar com convite."]),
        seg("2:00–6:00", "Passos 1 e 2 (mostrar slide 11)", ["Prefira um tema específico.", { fala: "Se eu explicasse isso pra alguém sem formação nenhuma, essa pessoa entenderia?" }]),
        seg("6:00–9:00", "Passos 3 e 4 (mostrar slide 12)", ["Termine com pergunta ou reflexão, não conclusão fechada.", "Convite, não promessa, sobre o que vai acontecer depois."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: um caso real sobre estatística de sucesso, e o recap final." }]),
      ],
    },
    {
      n: 5, titulo: "Prática guiada — os 90% e recap final", duracao: "11 min", slides: "13, 14, 15",
      objetivo: "Aplicar tudo que foi visto a um caso real e consolidar os pontos-chave do módulo.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["A última aula do módulo — um caso real, e o recap final."]),
        seg("1:00–4:00", "Apresentando o caso (mostrar slide 13)", ["Leia a vinheta com calma.", "Note que o número reflete experiência genuína — o problema não é a intenção."]),
        seg("4:00–7:00", "Percorrendo as perguntas de discussão", ["Discuta em voz alta as 3 perguntas do slide 13.", "Esboce uma versão reescrita do post sem a estatística."]),
        seg("7:00–9:00", "Quando buscar orientação adicional (mostrar slide 14)", ["Percorra os 4 critérios do slide 14."]),
        seg("9:00–11:00", "Recap final (mostrar slide 15)", [{ fala: "Retome os 4 pontos-chave do módulo. Agora é hora dos exercícios e da avaliação — e do último módulo do Bloco 2, o checklist de conformidade." }]),
      ],
    },
  ];

  const totalMin = 9 + 9 + 9 + 10 + 11;

  const children = [
    ...doc.capa(KICKER, "Roteiro de Aulas — Autoridade sem Prometer Cura", "Módulo dividido em 5 vídeo-aulas de 9 a 11 minutos, seguindo os slides já produzidos. Cada aula tem roteiro cronometrado, pronto pra gravação."),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "Duração total do módulo em vídeo: ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: `${totalMin} minutos (${(totalMin / 60).toFixed(1)}h) em 5 aulas`, font: doc.FONT, size: 21, color: doc.INK })] }),
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

  return doc.salvar(doc.paginaDoc("Escola de Marketing para Psicólogos", `${RODAPE_DOC} — Roteiro de Aulas`, children), "Modulo-2.3-Roteiro-Aulas.docx");
}

// ============================================================
Promise.resolve()
  .then(construirDeck)
  .then(construirExercicios)
  .then(construirProva)
  .then(construirRoteiro)
  .then(() => console.log("TUDO PRONTO"))
  .catch((e) => { console.error(e); process.exit(1); });

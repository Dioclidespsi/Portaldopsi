const deck = require("../_lib/lib-deck.js");
const doc = require("../_lib/lib-doc.js");

const MOD = "3.3";
const NOME = "Ansiolíticos e Hipnóticos";
const RODAPE_DECK = `Ansiolíticos e Hipnóticos — Módulo ${MOD}`;
const RODAPE_DOC = `Módulo ${MOD} — Ansiolíticos e Hipnóticos`;
const KICKER = "MÓDULO 3.3 · FARMACOLOGIA APLICADA À PSICOTERAPIA";

// ============================================================
// 1) SLIDE DECK
// ============================================================
function construirDeck() {
  const pres = deck.novaApresentacao(`${NOME} — Risco de Dependência e a Conversa Sobre Desmame`);

  deck.slideTitulo(pres, {
    moduloLabel: `Módulo ${MOD} · Bloco 3 · Farmacologia`,
    titulo: "Ansiolíticos e Hipnóticos",
    subtitulo: "Benzodiazepínicos e buspirona: velocidade de alívio e risco de dependência",
    passos: ["Benzodiazepínicos", "Buspirona", "Tolerância", "Uso crônico", "Desmame"],
  });

  deck.slideRoteiro(pres, {
    rodape: RODAPE_DECK, pageNum: 2,
    cards: [
      { titulo: "Benzodiazepínicos", desc: "Ação rápida, alto potencial de dependência" },
      { titulo: "Buspirona", desc: "Ação mais lenta, perfil de dependência bem menor" },
      { titulo: "Tolerância e dependência", desc: "Como o uso prolongado muda a resposta ao fármaco" },
      { titulo: "Uso crônico", desc: "O que observar num paciente em uso prolongado" },
      { titulo: "Desmame", desc: "Por que é sempre processo médico, nunca decisão isolada" },
    ],
  });

  deck.slideHook(pres, {
    rodape: RODAPE_DECK, pageNum: 3,
    frase: "O mesmo motivo que faz o benzodiazepínico funcionar tão rápido é o motivo pelo qual ele pode virar dependência — velocidade de alívio e potencial de dependência caminham juntos nessa classe.",
    apoio: "Entender esse paradoxo ajuda o psicólogo a reconhecer, sem julgamento, quando um uso legítimo de curto prazo está deslizando pra um padrão de risco.",
  });

  deck.slideCircuito(pres, {
    rodape: RODAPE_DECK, pageNum: 4,
    titulo: "O que muda no cérebro com o uso de benzodiazepínicos",
    regioes: [
      { label: "Potencialização do GABA (alívio rápido da ansiedade)", rx: 0.20, ry: 0.22, color: deck.NAVY, d: 0.5 },
      { label: "Tolerância (receptores se adaptam, exigindo doses maiores)", rx: 0.22, ry: 0.62, color: deck.TERRA, d: 0.4 },
      { label: "Dependência física (o corpo passa a exigir a substância)", rx: 0.60, ry: 0.60, color: deck.NAVY_TINT, d: 0.36 },
      { label: "Rebote de ansiedade (retirada abrupta gera efeito oposto ao esperado)", rx: 0.58, ry: 0.24, color: deck.TERRA_TINT, d: 0.36 },
    ],
    notas: [
      "A potencialização do GABA, principal neurotransmissor inibitório (Módulo 1.2), explica o alívio rápido e eficaz de sintomas agudos de ansiedade.",
      "Com o uso prolongado, os receptores GABA se adaptam, exigindo doses cada vez maiores pro mesmo efeito — a base da tolerância.",
      "A interrupção abrupta após uso prolongado pode gerar rebote de ansiedade, às vezes pior que o sintoma original — por isso o desmame precisa ser sempre gradual e médico.",
    ],
  });

  deck.slideCadeia(pres, {
    rodape: RODAPE_DECK, pageNum: 5,
    titulo: "Do alívio imediato à dependência estabelecida",
    elos: [
      { titulo: "Uso inicial apropriado", desc: "Alívio rápido e eficaz de ansiedade aguda ou crise específica" },
      { titulo: "Tolerância progressiva", desc: "A mesma dose passa a gerar efeito cada vez menor" },
      { titulo: "Uso continuado além do indicado", desc: "Prazo recomendado ultrapassado sem reavaliação médica" },
      { titulo: "Dependência consolidada", desc: "Física e psicológica, com sintomas de abstinência ao reduzir" },
    ],
    notaFinal: "Esse deslizamento costuma ser gradual e silencioso — raramente há um único momento em que o uso apropriado \"vira\" dependência de forma óbvia.",
  });

  deck.slideCategorias(pres, {
    rodape: RODAPE_DECK, pageNum: 6,
    titulo: "3 categorias principais",
    categorias: [
      { titulo: "Benzodiazepínicos", desc: "Ação rápida, alto potencial de dependência com uso prolongado", color: deck.NAVY },
      { titulo: "Buspirona", desc: "Ação mais lenta, perfil de dependência muito menor", color: deck.TERRA },
      { titulo: "Hipnóticos não-benzodiazepínicos", desc: "Voltados especificamente pro manejo do sono", color: deck.NAVY_TINT },
    ],
    notaFinal: "A buspirona costuma ser preferida pra tratamento de ansiedade de longo prazo, justamente por não carregar o mesmo risco de dependência dos benzodiazepínicos.",
  });

  deck.slideSinais(pres, {
    rodape: RODAPE_DECK, pageNum: 7,
    titulo: "Sinais de uso crônico problemático",
    itens: [
      { titulo: "Doses crescentes", desc: "Necessidade de mais medicação pro mesmo efeito (tolerância)" },
      { titulo: "Ansiedade rebote", desc: "Piora entre uma dose e outra, mesmo em uso regular" },
      { titulo: "Uso expandido", desc: "Passa a ser usado pra situações cada vez mais amplas, não só a original" },
      { titulo: "Dificuldade de reduzir", desc: "Tentativas de diminuir a dose geram desconforto significativo" },
    ],
  });

  deck.slideDiferencial(pres, {
    rodape: RODAPE_DECK, pageNum: 8,
    titulo: "Uso apropriado versus uso de risco",
    cards: [
      { titulo: "Uso agudo apropriado", desc: "Crise específica, tempo limitado, com reavaliação programada" },
      { titulo: "Uso crônico de risco", desc: "Diário e prolongado, sem revisão médica recente" },
      { titulo: "Dependência estabelecida", desc: "Sintomas de abstinência presentes ao tentar reduzir a dose" },
    ],
  });

  deck.slideInstrumentos(pres, {
    rodape: RODAPE_DECK, pageNum: 9,
    titulo: "Ferramentas práticas de acompanhamento",
    instrumentos: [
      { sigla: "Diário de uso", nome: "Registro de frequência e dose", desc: "Ajuda a identificar padrão de aumento gradual ao longo do tempo." },
      { sigla: "Conversa estruturada", nome: "Sobre o padrão de uso atual", desc: "Investigar ativamente, sem julgamento, o contexto do uso." },
      { sigla: "Comunicação com o psiquiatra", nome: "Sobre tempo total de uso", desc: "Especialmente relevante se o uso já ultrapassou várias semanas." },
    ],
  });

  deck.slideProtocoloOverview(pres, {
    rodape: RODAPE_DECK, pageNum: 10,
    titulo: "Do reconhecimento ao apoio no desmame: 4 passos",
    passos: [
      { titulo: "Identificar\no padrão de uso", desc: "Agudo apropriado ou crônico prolongado" },
      { titulo: "Reconhecer sinais\nde tolerância", desc: "Doses crescentes, ansiedade rebote, uso expandido" },
      { titulo: "Nunca aconselhar\ndesmame sozinho", desc: "Interrupção abrupta pode ser perigosa — sempre processo médico" },
      { titulo: "Apoiar\npsicologicamente", desc: "Quando o desmame já estiver em curso, sob orientação médica" },
    ],
    notaFinal: "O papel do psicólogo aqui é de parceria — reconhecer o padrão, comunicar, e sustentar emocionalmente o processo, nunca conduzir a retirada sozinho.",
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 11,
    titulo: "Passos 1 e 2, na prática",
    colunas: [
      {
        numero: 1, titulo: "Identificar o padrão de uso",
        bullets: ["Pergunte diretamente há quanto tempo e com que frequência o paciente usa a medicação", "Diferencie uso pontual em crise específica de uso diário prolongado"],
      },
      {
        numero: 2, titulo: "Reconhecer sinais de tolerância",
        fala: "“Percebo que você tem falado em precisar de mais comprimido pro mesmo efeito — isso é importante conversarmos com seu psiquiatra.”",
        bullets: ["Nomeie o padrão sem julgamento, como informação clínica relevante, não como falha pessoal"],
      },
    ],
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 12,
    titulo: "Passos 3 e 4, na prática",
    colunas: [
      {
        numero: 3, titulo: "Nunca aconselhar desmame sozinho",
        bullets: ["Explique que interrupção abrupta pode ser perigosa, inclusive com risco de convulsão em uso prolongado de doses altas", "Sempre direcione decisões sobre redução ou suspensão ao psiquiatra responsável"],
      },
      {
        numero: 4, titulo: "Apoiar psicologicamente",
        bullets: ["Quando o desmame já estiver em curso, ofereça suporte pra tolerar o desconforto transitório", "Trabalhe estratégias de regulação emocional que não dependam da medicação (conecta ao Módulo 4.1)"],
      },
    ],
  });

  deck.slideCaso(pres, {
    rodape: RODAPE_DECK, pageNum: 13,
    vinheta: "Um paciente relata que usa um benzodiazepínico diariamente há mais de 2 anos, prescrito inicialmente pra uma crise pontual, e que \"sem ele, não consegue nem sair de casa\". Relata que já tentou reduzir sozinho uma vez e \"passou muito mal\", por isso nunca mais tentou.",
    perguntas: [
      "Que padrão de uso essa vinheta descreve, considerando o tempo e a frequência relatados?",
      "Por que a tentativa anterior de reduzir sozinho é um dado clínico importante a considerar?",
      "Como você abordaria esse tema com o paciente, sem julgamento e sem sugerir desmame diretamente?",
    ],
  });

  deck.slideEncaminhamento(pres, {
    rodape: RODAPE_DECK, pageNum: 14,
    criterios: [
      "Uso crônico prolongado sem revisão médica recente: comunicar ao psiquiatra pra reavaliação",
      "Sinais de abstinência relatados em tentativa anterior de redução: informar o psiquiatra antes de qualquer nova tentativa",
      "Uso concomitante com álcool ou outras substâncias depressoras: risco elevado, comunicar prontamente",
      "Qualquer sinal de uso indevido ou além da prescrição: abordar com cuidado e comunicar a equipe médica",
    ],
  });

  deck.slideRecap(pres, {
    rodape: RODAPE_DECK, pageNum: 15,
    pontos: [
      "A potencialização do GABA explica o alívio rápido dos benzodiazepínicos — e também o risco de tolerância e dependência",
      "Benzodiazepínicos, buspirona e hipnóticos não-benzodiazepínicos formam as 3 categorias centrais desse módulo",
      "Doses crescentes, ansiedade rebote e uso expandido são os sinais mais relevantes de uso crônico problemático",
      "O papel do psicólogo é reconhecer, comunicar e apoiar — nunca conduzir ou aconselhar desmame sozinho",
    ],
    proximoTexto: "Próximo: exercícios práticos e avaliação do Módulo 3.3 →",
  });

  return pres.writeFile({ fileName: "Modulo-3.3-Ansioliticos-Hipnoticos.pptx" });
}

// ============================================================
// 2) EXERCÍCIOS
// ============================================================
function construirExercicios() {
  const children = [
    ...doc.capa(KICKER, "Exercícios — Ansiolíticos e Hipnóticos", "Resolva individualmente antes da sessão de supervisão. O objetivo é testar sua leitura funcional antes de comparar com a discussão em grupo — não há problema em errar."),

    doc.exNum(1, "O paradoxo, em suas palavras"),
    doc.pergunta(1, "Explique em até 3 frases por que a mesma característica que torna os benzodiazepínicos eficazes também os torna arriscados."),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "O que é rebote de ansiedade, e por que ele torna a interrupção abrupta perigosa?"),
    ...doc.linhaResposta(2),

    doc.exNum(2, "Uso apropriado versus uso de risco"),
    doc.tabelaSimples(["Padrão de uso", "Apropriado ou de risco?"], [["Uso diário há 2 anos, sem revisão médica recente", ""], ["Uso pontual numa crise específica, com reavaliação programada", ""], ["Doses crescentes pro mesmo efeito", ""]], [5600, 3550]),

    doc.exNum(3, "Reconhecendo sem julgamento"),
    doc.vinhetaBox("Um paciente relata usar mais comprimidos do que a dose prescrita original, \"porque não sente mais o mesmo efeito\"."),
    doc.pergunta(1, "Escreva uma resposta que nomeie esse padrão sem julgamento, como informação clínica relevante."),
    ...doc.linhaResposta(3),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),

    doc.exNum(4, "Por que nunca aconselhar desmame sozinho"),
    doc.pergunta(1, "Explique por que interrupção abrupta de benzodiazepínico em uso prolongado pode ser perigosa."),
    ...doc.linhaResposta(2),

    doc.exNum(5, "Caso integrado"),
    doc.vinhetaBox("Um paciente usa benzodiazepínico diariamente há mais de 2 anos, prescrito inicialmente pra crise pontual, relata que \"sem ele não consegue nem sair de casa\", e já teve uma tentativa de redução sozinho que \"passou muito mal\"."),
    doc.pergunta(1, "Que padrão de uso essa vinheta descreve?"),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Por que a tentativa anterior de reduzir sozinho é um dado clínico importante?"),
    ...doc.linhaResposta(2),
    doc.pergunta(3, "Como você abordaria esse tema com o paciente, sem julgamento e sem sugerir desmame diretamente?"),
    ...doc.linhaResposta(2),
  ];

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-3.3-Exercicios.docx");
}

// ============================================================
// 3) AVALIAÇÃO
// ============================================================
function construirProva() {
  const objetivas = [
    ["Os benzodiazepínicos atuam potencializando:", ["O GABA, principal neurotransmissor inibitório", "Exclusivamente a dopamina", "Exclusivamente a serotonina", "O glutamato, principal neurotransmissor excitatório"]],
    ["A tolerância aos benzodiazepínicos se caracteriza por:", ["Necessidade de doses crescentes pro mesmo efeito", "Efeito que aumenta indefinidamente sem qualquer adaptação", "Ausência completa de qualquer resposta ao fármaco desde o início", "Um fenômeno que nunca ocorre com uso prolongado"]],
    ["\"Rebote de ansiedade\" se refere a:", ["Piora da ansiedade após interrupção abrupta, às vezes pior que o sintoma original", "Uma melhora permanente e definitiva da ansiedade", "Um efeito que ocorre exclusivamente na primeira dose", "Ausência total de qualquer sintoma após parar a medicação"]],
    ["A buspirona, em comparação aos benzodiazepínicos, tem:", ["Ação mais lenta e perfil de dependência muito menor", "Ação instantânea e risco de dependência idêntico", "Nenhuma indicação para tratamento de ansiedade", "Uso exclusivo em quadros psicóticos"]],
    ["Um sinal de uso crônico problemático é:", ["Uso expandido pra situações cada vez mais amplas, além da indicação original", "Uso pontual numa única crise específica, com reavaliação programada", "Redução espontânea da dose sem qualquer desconforto", "Ausência completa de qualquer necessidade contínua"]],
    ["Diante de um paciente relatando doses crescentes pro mesmo efeito, o módulo recomenda:", ["Nomear o padrão sem julgamento e comunicar ao psiquiatra", "Ignorar completamente o relato", "Aconselhar diretamente que ele reduza a dose sozinho", "Encerrar o acompanhamento psicológico imediatamente"]],
    ["Por que a interrupção abrupta de benzodiazepínico em uso prolongado pode ser perigosa?", ["Pode gerar rebote de ansiedade e, em doses altas, risco de convulsão", "Nunca traz qualquer risco, independente do tempo de uso", "É sempre a abordagem recomendada pra qualquer paciente", "Elimina instantaneamente qualquer dependência já formada"]],
    ["O papel do psicólogo diante de um paciente em processo de desmame já em curso é:", ["Apoiar psicologicamente, oferecendo suporte pra tolerar o desconforto transitório", "Conduzir tecnicamente a redução da dose", "Ignorar completamente esse processo", "Aconselhar a retomada imediata da dose anterior sem consultar o psiquiatra"]],
    ["Diante de uso concomitante de benzodiazepínico com álcool, o módulo recomenda:", ["Comunicar prontamente, dado o risco elevado dessa combinação", "Ignorar, pois não há qualquer risco relevante nessa combinação", "Aguardar a próxima consulta médica agendada sem qualquer ação imediata", "Recomendar diretamente que o paciente pare de beber sem qualquer outra orientação"]],
    ["O deslizamento de uso apropriado para dependência costuma ser:", ["Gradual e silencioso, sem um momento único e óbvio de transição", "Sempre súbito e claramente identificável em um único dia", "Impossível de ocorrer com qualquer benzodiazepínico", "Um processo que nunca precisa de atenção clínica"]],
  ];
  const gabaritoObjetivas = ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a"];

  const children = [
    ...doc.capa(KICKER, "Avaliação — Ansiolíticos e Hipnóticos", `Avaliação formativa de encerramento do Módulo ${MOD}.`),
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
    doc.vinhetaBox("Uma paciente relata que, nas últimas semanas, começou a tomar o benzodiazepínico prescrito \"também quando bebe socialmente, pra relaxar mais\", além do uso original pra insônia. Diz não ver problema, já que \"os dois foram receitados por médicos diferentes\"."),
    new doc.Paragraph({ spacing: { before: 240 }, children: [new doc.TextRun({ text: "Com base no protocolo estudado, responda:", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    new doc.Paragraph({ spacing: { before: 220, after: 40 }, children: [new doc.TextRun({ text: "a) (10 pts) Que risco específico essa combinação de substâncias apresenta?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "b) (10 pts) Que sinal de uso expandido está presente na vinheta?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "c) (10 pts) Como você abordaria a crença da paciente de que não há problema, já que \"foram receitados por médicos diferentes\"?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "d) (10 pts) Que ação de comunicação você tomaria imediatamente, dado o risco identificado?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    new doc.Paragraph({ spacing: { after: 40 }, children: [new doc.TextRun({ text: "USO EXCLUSIVO DO INSTRUTOR — remover antes de aplicar a prova", bold: true, color: doc.TERRA, font: doc.FONT, size: 20 })] }),
    doc.tituloH1("Gabarito"),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 1 — Questões objetivas", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 200 }, children: [new doc.TextRun({ text: gabaritoObjetivas.map((r, i) => `${i + 1}-${r}`).join("   ·   "), font: doc.FONT, size: 22, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 2 — Critério de correção da questão de caso", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "a) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Risco elevado de depressão respiratória grave, dado que álcool e benzodiazepínicos são ambos depressores do sistema nervoso central com efeito potencializador quando combinados.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "b) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "O uso passou de uma indicação específica (insônia) pra uma situação social adicional (relaxar bebendo), ampliando o contexto de uso além do originalmente prescrito.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "c) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Explicar, sem julgamento, que o risco está na combinação em si, independente de quem prescreveu cada substância separadamente — nenhum dos dois médicos necessariamente sabe do uso combinado.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "d) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Comunicar prontamente ao psiquiatra sobre o uso concomitante com álcool, dado o risco elevado dessa combinação específica.", font: doc.FONT, size: 21, color: doc.INK })] }),
  );

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-3.3-Avaliacao.docx");
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
      n: 1, titulo: "Velocidade de alívio e risco de dependência", duracao: "12 min", slides: "1, 2, 3, 4",
      objetivo: "Sair sabendo explicar o mecanismo GABA-benzodiazepínico e o paradoxo velocidade-risco sem jargão técnico.",
      segmentos: [
        seg("0:00–0:45", "Abertura (gancho)", [{ fala: "O mesmo motivo que faz o benzodiazepínico funcionar tão rápido é o motivo pelo qual ele pode virar dependência — velocidade de alívio e potencial de dependência caminham juntos nessa classe." }]),
        seg("0:45–2:00", "Por que isso importa", ["Ajuda a reconhecer, sem julgamento, quando um uso legítimo desliza pra um padrão de risco."]),
        seg("2:00–8:00", "O que muda no cérebro (mostrar slide 4)", [
          "Potencialização do GABA: alívio rápido da ansiedade.",
          "Tolerância: receptores se adaptam, exigindo doses maiores.",
          "Dependência física: o corpo passa a exigir a substância.",
          "Rebote de ansiedade: retirada abrupta gera efeito oposto.",
        ]),
        seg("8:00–10:30", "Um ponto importante", ["Por isso o desmame precisa ser sempre gradual e conduzido pela medicina."]),
        seg("10:30–12:00", "Fechamento", [{ fala: "Próxima aula: do alívio imediato à dependência estabelecida." }]),
      ],
    },
    {
      n: 2, titulo: "Do alívio imediato à dependência estabelecida", duracao: "10 min", slides: "5",
      objetivo: "Explicar a cadeia entre uso inicial apropriado e dependência consolidada.",
      segmentos: [
        seg("0:00–1:00", "Retomada rápida", ["Vimos o mecanismo. Hoje vemos como o padrão evolui ao longo do tempo."]),
        seg("1:00–6:30", "A cadeia (mostrar slide 5)", ["Uso inicial apropriado: alívio rápido de ansiedade aguda.", "Tolerância progressiva: mesma dose, efeito cada vez menor.", "Uso continuado além do indicado: sem reavaliação médica.", "Dependência consolidada: física e psicológica."]),
        seg("6:30–9:00", "Um ponto importante", ["Esse deslizamento costuma ser gradual e silencioso, sem um momento óbvio de transição."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: as 3 categorias principais." }]),
      ],
    },
    {
      n: 3, titulo: "As 3 categorias e os sinais de uso crônico", duracao: "12 min", slides: "6, 7",
      objetivo: "Reconhecer as 3 categorias de ansiolíticos/hipnóticos e os sinais de uso problemático.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três categorias — e os sinais mais relevantes de observar num paciente em uso prolongado."]),
        seg("1:00–6:00", "As 3 categorias (mostrar slide 6)", [
          "Benzodiazepínicos: ação rápida, alto potencial de dependência.",
          "Buspirona: ação mais lenta, dependência muito menor.",
          "Hipnóticos não-benzodiazepínicos: voltados pro sono.",
        ]),
        seg("6:00–10:30", "Sinais de uso crônico (mostrar slide 7)", [
          "Doses crescentes: necessidade de mais medicação.",
          "Ansiedade rebote: piora entre uma dose e outra.",
          "Uso expandido: além da indicação original.",
          "Dificuldade de reduzir: mesmo quando desejado.",
        ]),
        seg("10:30–12:00", "Fechamento", [{ fala: "Próxima aula: uso apropriado versus uso de risco." }]),
      ],
    },
    {
      n: 4, titulo: "Uso apropriado versus uso de risco", duracao: "11 min", slides: "8, 9",
      objetivo: "Diferenciar uso agudo apropriado, uso crônico de risco e dependência estabelecida, e conhecer ferramentas práticas.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Um filtro rápido — essencial pra calibrar o nível de atenção clínica necessária."]),
        seg("1:00–6:00", "Os 3 cenários (mostrar slide 8)", [
          "Uso agudo apropriado: crise específica, tempo limitado.",
          "Uso crônico de risco: diário, sem revisão médica recente.",
          "Dependência estabelecida: sintomas de abstinência ao reduzir.",
        ]),
        seg("6:00–10:00", "Ferramentas práticas (mostrar slide 9)", [
          "Diário de uso: identifica padrão de aumento gradual.",
          "Conversa estruturada: investiga o contexto sem julgamento.",
          "Comunicação com o psiquiatra: sobre tempo total de uso.",
        ]),
        seg("10:00–11:00", "Fechamento", [{ fala: "Próxima aula: colocamos tudo em prática — identificar o padrão e reconhecer sinais." }]),
      ],
    },
    {
      n: 5, titulo: "Aplicação — identificar o padrão e reconhecer sinais", duracao: "13 min", slides: "10, 11",
      objetivo: "Aplicar os passos 1 e 2 do modelo de acompanhamento.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["A parte mais prática desse módulo. Hoje, os 2 primeiros passos."]),
        seg("1:00–2:00", "Visão geral (mostrar slide 10)", ["Identificar o padrão de uso → Reconhecer sinais de tolerância → Nunca aconselhar desmame sozinho → Apoiar psicologicamente."]),
        seg("2:00–7:00", "Passo 1 — Identificar o padrão de uso (mostrar slide 11, esquerda)", ["Pergunte diretamente há quanto tempo e com que frequência.", "Diferencie uso pontual de uso diário prolongado."]),
        seg("7:00–12:00", "Passo 2 — Reconhecer sinais de tolerância (mostrar slide 11, direita)", [{ fala: "Percebo que você tem falado em precisar de mais comprimido pro mesmo efeito — isso é importante conversarmos com seu psiquiatra." }]),
        seg("12:00–13:00", "Fechamento", [{ fala: "Próxima aula: por que nunca aconselhar desmame sozinho, e como apoiar psicologicamente." }]),
      ],
    },
    {
      n: 6, titulo: "Aplicação — nunca aconselhar desmame sozinho", duracao: "11 min", slides: "12",
      objetivo: "Trabalhar os limites da comunicação sobre desmame e o apoio psicológico apropriado.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Hoje fechamos o modelo com os 2 passos mais delicados eticamente."]),
        seg("1:00–6:00", "Passo 3 — Nunca aconselhar desmame sozinho (mostrar slide 12, esquerda)", ["Explique o risco de interrupção abrupta, inclusive risco de convulsão.", "Sempre direcione decisões de redução ao psiquiatra."]),
        seg("6:00–10:00", "Passo 4 — Apoiar psicologicamente (mostrar slide 12, direita)", ["Ofereça suporte pra tolerar o desconforto transitório do desmame já em curso.", "Trabalhe estratégias de regulação emocional que não dependam da medicação."]),
        seg("10:00–11:00", "Fechamento", [{ fala: "Modelo completo. Próxima aula: um caso real e os critérios de quando escalar." }]),
      ],
    },
    {
      n: 7, titulo: "Estudo de caso, encaminhamento e recap", duracao: "14 min", slides: "13, 14, 15",
      objetivo: "Integrar todo o módulo num caso completo, com ênfase no risco de uso combinado com álcool.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Última aula do módulo. Caso completo e os critérios de quando encaminhar."]),
        seg("1:00–6:00", "Estudo de caso (mostrar slide 13)", ["Leia a vinheta com calma.", "Percorra as 3 perguntas de discussão.", "Convide o aluno a pausar e responder por escrito."]),
        seg("6:00–10:00", "Quando encaminhar (mostrar slide 14)", ["Percorra os 4 critérios, com atenção especial ao uso combinado com álcool."]),
        seg("10:00–13:00", "Recapitulando o módulo (mostrar slide 15)", ["Retome os 4 pontos-chave.", "Reforce que o papel do psicólogo é reconhecer, comunicar e apoiar, nunca conduzir o desmame."]),
        seg("13:00–14:00", "Fechamento do módulo", [{ fala: "Agora é hora dos exercícios e da avaliação. Te vejo no próximo módulo do Bloco 3." }]),
      ],
    },
  ];

  const totalMin = 12 + 10 + 12 + 11 + 13 + 11 + 14;

  const children = [
    ...doc.capa(KICKER, "Roteiro de Aulas — Ansiolíticos e Hipnóticos", "Módulo dividido em 7 vídeo-aulas de 10 a 15 minutos, seguindo os slides já produzidos. Cada aula tem roteiro cronometrado, pronto pra gravação."),
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

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", `${RODAPE_DOC} — Roteiro de Aulas`, children), "Modulo-3.3-Roteiro-Aulas.docx");
}

// ============================================================
Promise.resolve()
  .then(construirDeck)
  .then(construirExercicios)
  .then(construirProva)
  .then(construirRoteiro)
  .then(() => console.log("TUDO PRONTO"))
  .catch((e) => { console.error(e); process.exit(1); });

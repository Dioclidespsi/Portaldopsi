const deck = require("../_lib/lib-deck.js");
const doc = require("../_lib/lib-doc.js");

const MOD = "3.1";
const NOME = "Por Que o Psicólogo Precisa Entender Psicofarmacologia";
const RODAPE_DECK = `Por Que Psicofarmacologia — Módulo ${MOD}`;
const RODAPE_DOC = `Módulo ${MOD} — Por Que Psicofarmacologia`;
const KICKER = "MÓDULO 3.1 · FARMACOLOGIA APLICADA À PSICOTERAPIA";

// ============================================================
// 1) SLIDE DECK
// ============================================================
function construirDeck() {
  const pres = deck.novaApresentacao(`${NOME} — A Fronteira Entre Clínica e Prescrição`);

  deck.slideTitulo(pres, {
    moduloLabel: `Módulo ${MOD} · Bloco 3 · Farmacologia`,
    titulo: "Por Que Psicofarmacologia",
    subtitulo: "Onde termina a competência do psicólogo e começa a decisão médica",
    passos: ["Fronteira", "Zonas", "Sinais", "Comunicação", "Aplicação"],
  });

  deck.slideRoteiro(pres, {
    rodape: RODAPE_DECK, pageNum: 2,
    cards: [
      { titulo: "A fronteira de competência", desc: "Por que essa linha não é neutra nem óbvia" },
      { titulo: "3 zonas", desc: "Do psicólogo, compartilhada, e exclusiva da medicina" },
      { titulo: "Sinais na sessão", desc: "O que todo psicólogo deveria saber reconhecer" },
      { titulo: "Comunicação técnica", desc: "Dialogar com a psiquiatria sem ultrapassar limites" },
      { titulo: "Aplicação", desc: "A base que sustenta todo o restante do Bloco 3" },
    ],
  });

  deck.slideHook(pres, {
    rodape: RODAPE_DECK, pageNum: 3,
    frase: "Não entender psicofarmacologia não deixa o psicólogo neutro — deixa ele cego pra metade do que está acontecendo com o paciente que já está em tratamento medicamentoso.",
    apoio: "Este módulo não ensina a prescrever — ensina o repertório mínimo pra reconhecer o que o fármaco está mudando na sessão, e pra dialogar com a psiquiatria com precisão técnica.",
  });

  deck.slideCircuito(pres, {
    rodape: RODAPE_DECK, pageNum: 4,
    titulo: "4 competências na fronteira psicólogo-psiquiatra",
    regioes: [
      { label: "Reconhecer efeito relevante pra sessão (ex: achatamento afetivo)", rx: 0.20, ry: 0.22, color: deck.NAVY, d: 0.5 },
      { label: "Diferenciar sintoma do transtorno de efeito da medicação", rx: 0.22, ry: 0.62, color: deck.TERRA, d: 0.4 },
      { label: "Comunicar-se tecnicamente com a psiquiatria", rx: 0.60, ry: 0.60, color: deck.NAVY_TINT, d: 0.36 },
      { label: "Saber quando e como encaminhar com precisão", rx: 0.58, ry: 0.24, color: deck.TERRA_TINT, d: 0.36 },
    ],
    notas: [
      "Reconhecer efeitos como achatamento afetivo ou ativação inicial evita interpretar erroneamente esses sinais como piora do quadro psicológico.",
      "Diferenciar sintoma de efeito colateral é frequentemente a chave pra saber se o problema é terapêutico ou farmacológico.",
      "Comunicação técnica precisa, sem invadir o campo médico, fortalece a parceria entre os dois profissionais — e o cuidado do paciente.",
    ],
  });

  deck.slideCadeia(pres, {
    rodape: RODAPE_DECK, pageNum: 5,
    titulo: "Do desconhecimento ao dano evitável",
    elos: [
      { titulo: "Psicólogo sem repertório", desc: "Não reconhece sinais farmacológicos relevantes durante a sessão" },
      { titulo: "Sinal não identificado", desc: "Efeito colateral ou resposta inadequada passa despercebido" },
      { titulo: "Encaminhamento tardio", desc: "A oportunidade de ajuste médico oportuno se perde" },
      { titulo: "Sofrimento evitável", desc: "O paciente permanece em risco ou desconforto que poderia ter sido identificado antes" },
    ],
    notaFinal: "Essa cadeia raramente é dramática — geralmente é silenciosa, um sinal sutil não nomeado que se acumula ao longo de semanas.",
  });

  deck.slideCategorias(pres, {
    rodape: RODAPE_DECK, pageNum: 6,
    titulo: "3 zonas de competência",
    categorias: [
      { titulo: "Zona do psicólogo", desc: "Efeito na sessão, adesão ao tratamento, psicoeducação", color: deck.NAVY },
      { titulo: "Zona compartilhada", desc: "Comunicação e monitoramento conjunto com a psiquiatria", color: deck.TERRA },
      { titulo: "Zona exclusiva da medicina", desc: "Prescrição, ajuste de dose, diagnóstico diferencial médico", color: deck.NAVY_TINT },
    ],
    notaFinal: "A distinção central deste módulo: \"não poder prescrever\" é diferente de \"não precisar entender\" — a segunda frase é o erro mais comum na formação tradicional.",
  });

  deck.slideSinais(pres, {
    rodape: RODAPE_DECK, pageNum: 7,
    titulo: "Sinais que todo psicólogo deveria reconhecer",
    itens: [
      { titulo: "Ativação inicial", desc: "Aumento paradoxal de ansiedade nas primeiras semanas de ISRS" },
      { titulo: "Achatamento afetivo", desc: "Redução da amplitude emocional, frequentemente confundida com \"melhora\"" },
      { titulo: "Sinais de desmame abrupto", desc: "Descompensação súbita após interrupção sem orientação médica" },
      { titulo: "Possível interação medicamentosa", desc: "Mudança de padrão de sintomas após início de novo fármaco" },
    ],
  });

  deck.slideDiferencial(pres, {
    rodape: RODAPE_DECK, pageNum: 8,
    titulo: "Três posturas possíveis, uma só é adequada",
    cards: [
      { titulo: "Ignorar a medicação", desc: "Perde informação clínica relevante presente na sessão" },
      { titulo: "Dialogar tecnicamente (postura adequada)", desc: "Reconhece, documenta e comunica, sem opinar sobre dose ou fármaco" },
      { titulo: "Ultrapassar a fronteira", desc: "Sugerir ajuste de dose ou troca de medicação — sempre inadequado" },
    ],
  });

  deck.slideInstrumentos(pres, {
    rodape: RODAPE_DECK, pageNum: 9,
    titulo: "Três fontes de informação confiável",
    instrumentos: [
      { sigla: "Bula/manual técnico", nome: "Informação farmacológica oficial", desc: "Referência primária pra mecanismo, efeitos e interações conhecidas." },
      { sigla: "Contato direto", nome: "Comunicação com o psiquiatra responsável", desc: "A fonte mais precisa pro caso específico em curso." },
      { sigla: "Literatura científica", nome: "Atualização contínua", desc: "Mantém o repertório técnico atualizado além do caso pontual." },
    ],
  });

  deck.slideProtocoloOverview(pres, {
    rodape: RODAPE_DECK, pageNum: 10,
    titulo: "Da observação à comunicação responsável: 4 passos",
    passos: [
      { titulo: "Reconhecer\nsinais relevantes", desc: "Na fala, no afeto, no padrão de sintomas ao longo do tempo" },
      { titulo: "Documentar\nobjetivamente", desc: "Sem interpretar como se fosse uma avaliação médica" },
      { titulo: "Comunicar com\nprecisão técnica", desc: "Ao psiquiatra, de forma clara e não invasiva" },
      { titulo: "Nunca sugerir\najuste diretamente", desc: "Ao paciente, mesmo que pareça uma sugestão óbvia" },
    ],
    notaFinal: "Esse é o fio condutor de todo o Bloco 3 — cada módulo seguinte aprofunda uma classe farmacológica específica, sempre dentro dessa mesma fronteira de competência.",
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 11,
    titulo: "Passos 1 e 2, na prática",
    colunas: [
      {
        numero: 1, titulo: "Reconhecer sinais relevantes",
        bullets: ["Observe mudanças no padrão emocional que coincidem com início ou ajuste de medicação", "Pergunte ativamente sobre efeitos colaterais, não espere que o paciente mencione espontaneamente"],
      },
      {
        numero: 2, titulo: "Documentar objetivamente",
        fala: "“Vou registrar o que você está relatando, com suas palavras, pra podermos conversar com seu psiquiatra sobre isso.”",
        bullets: ["Registre fatos observáveis, não conclusões diagnósticas médicas", "Inclua data de início do sintoma em relação ao início/ajuste da medicação"],
      },
    ],
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 12,
    titulo: "Passos 3 e 4, na prática",
    colunas: [
      {
        numero: 3, titulo: "Comunicar com precisão técnica",
        bullets: ["Use linguagem objetiva e específica ao relatar ao psiquiatra, evitando generalizações vagas", "Sempre com consentimento do paciente pra esse contato, exceto em situações de risco"],
      },
      {
        numero: 4, titulo: "Nunca sugerir ajuste diretamente",
        bullets: ["Mesmo que o padrão pareça óbvio, a decisão de ajuste é sempre médica", "Encaminhe a dúvida do paciente sobre medicação diretamente pro psiquiatra, sem opinar tecnicamente sobre ela"],
      },
    ],
  });

  deck.slideCaso(pres, {
    rodape: RODAPE_DECK, pageNum: 13,
    vinheta: "Um paciente iniciou um antidepressivo há 10 dias e relata, nesta sessão, um aumento significativo da ansiedade e agitação, dizendo que \"o remédio só piorou tudo\" e que está pensando em parar de tomar por conta própria.",
    perguntas: [
      "Que fenômeno farmacológico conhecido pode explicar esse padrão temporal específico?",
      "Como você documentaria esse relato de forma objetiva, sem fazer uma interpretação médica?",
      "Que orientação você daria ao paciente sobre a ideia de parar a medicação por conta própria?",
    ],
  });

  deck.slideEncaminhamento(pres, {
    rodape: RODAPE_DECK, pageNum: 14,
    criterios: [
      "Sinais sugestivos de efeito colateral significativo: comunicar ao psiquiatra com urgência apropriada",
      "Paciente considerando interromper medicação por conta própria: orientar contra desmame abrupto e comunicar o psiquiatra",
      "Adesão comprometida por desinformação: psicoeducar dentro da zona de competência do psicólogo",
      "Qualquer sinal de risco associado a mudança recente de medicação: ativar avaliação de risco formal (Módulo 4.9)",
    ],
  });

  deck.slideRecap(pres, {
    rodape: RODAPE_DECK, pageNum: 15,
    pontos: [
      "\"Não poder prescrever\" é diferente de \"não precisar entender\" — essa distinção organiza todo o Bloco 3",
      "Zona do psicólogo, zona compartilhada e zona exclusiva da medicina delimitam onde cada competência atua",
      "Reconhecer sinais como ativação inicial e achatamento afetivo evita interpretações clínicas equivocadas",
      "O objetivo é sempre comunicação técnica precisa, nunca opinião sobre dose ou substituição de fármaco",
    ],
    proximoTexto: "Próximo: exercícios práticos e avaliação do Módulo 3.1 →",
  });

  return pres.writeFile({ fileName: "Modulo-3.1-Por-Que-Psicofarmacologia.pptx" });
}

// ============================================================
// 2) EXERCÍCIOS
// ============================================================
function construirExercicios() {
  const children = [
    ...doc.capa(KICKER, "Exercícios — Por Que Psicofarmacologia", "Resolva individualmente antes da sessão de supervisão. O objetivo é testar sua leitura da fronteira de competência antes de comparar com a discussão em grupo — não há problema em errar."),

    doc.exNum(1, "As 3 zonas, em suas palavras"),
    doc.pergunta(1, "Explique em uma frase cada zona de competência: do psicólogo, compartilhada, exclusiva da medicina."),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Por que \"não poder prescrever\" é diferente de \"não precisar entender\"?"),
    ...doc.linhaResposta(2),

    doc.exNum(2, "Reconhecendo sinais"),
    doc.vinhetaBox("Um paciente relata que, desde que começou um antidepressivo, \"não sente mais tanto as coisas\", nem tristeza nem alegria."),
    doc.pergunta(1, "Que sinal farmacológico esse relato pode indicar? Por que é importante não interpretá-lo automaticamente como piora do quadro?"),
    ...doc.linhaResposta(2),

    doc.exNum(3, "As 3 posturas"),
    doc.tabelaSimples(["Postura", "Consequência"], [["Ignorar completamente a medicação", ""], ["Dialogar tecnicamente", ""], ["Ultrapassar a fronteira", ""]], [3600, 5550]),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),

    doc.exNum(4, "Comunicação responsável"),
    doc.pergunta(1, "Reescreva a frase \"acho que o remédio dele está errado\" de forma tecnicamente adequada pra comunicar ao psiquiatra."),
    ...doc.linhaResposta(2),

    doc.exNum(5, "Caso integrado"),
    doc.vinhetaBox("Um paciente iniciou antidepressivo há 10 dias, relata aumento significativo de ansiedade e agitação, e considera parar por conta própria."),
    doc.pergunta(1, "Que fenômeno farmacológico pode explicar esse padrão temporal?"),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Como você documentaria isso de forma objetiva?"),
    ...doc.linhaResposta(2),
    doc.pergunta(3, "Que orientação você daria sobre a ideia de parar por conta própria?"),
    ...doc.linhaResposta(2),
  ];

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-3.1-Exercicios.docx");
}

// ============================================================
// 3) AVALIAÇÃO
// ============================================================
function construirProva() {
  const objetivas = [
    ["As 4 competências na fronteira psicólogo-psiquiatra são:", ["Reconhecer efeito relevante, diferenciar sintoma de efeito, comunicar tecnicamente, saber quando encaminhar", "Grandiosidade, necessidade de admiração, falta de empatia, impulsividade", "Compreensão verbal, organização perceptual, memória de trabalho, velocidade de processamento", "Serotonina, dopamina, GABA, glutamato"]],
    ["\"Ativação inicial\" se refere a:", ["Aumento paradoxal de ansiedade nas primeiras semanas de uso de ISRS", "Uma melhora instantânea garantida em qualquer paciente", "Um efeito exclusivo de estabilizadores de humor", "A ausência completa de qualquer resposta ao fármaco"]],
    ["As 3 zonas de competência descritas no módulo são:", ["Zona do psicólogo, zona compartilhada, zona exclusiva da medicina", "Sintomas nucleares, duração mínima, prejuízo funcional", "Atenção, memória, funções executivas", "Autorrelato rápido, entrevista estruturada, escala de risco"]],
    ["A distinção central deste módulo é:", ["\"Não poder prescrever\" é diferente de \"não precisar entender\"", "Psicólogos devem aprender a prescrever medicação diretamente", "Farmacologia é irrelevante pra prática psicológica", "Apenas psiquiatras devem conhecer qualquer aspecto de farmacologia"]],
    ["Achatamento afetivo, efeito comum de certos antidepressivos, pode ser confundido com:", ["Melhora do quadro, quando na verdade é um efeito colateral a ser monitorado", "Um sinal exclusivo de causa neurológica não relacionada a medicação", "Um sintoma que nunca precisa de investigação", "Prova definitiva de resposta terapêutica completa"]],
    ["Diante de sinais de desmame abrupto, o módulo recomenda:", ["Orientar contra a interrupção por conta própria e comunicar o psiquiatra", "Incentivar o paciente a interromper imediatamente sem orientação médica", "Ignorar completamente o relato do paciente", "Sugerir diretamente uma dose alternativa ao paciente"]],
    ["A postura tecnicamente adequada do psicólogo em relação à medicação do paciente é:", ["Dialogar tecnicamente, reconhecendo e comunicando sem opinar sobre dose ou fármaco", "Ignorar completamente qualquer menção à medicação", "Sugerir ativamente ajustes de dose ao psiquiatra", "Recomendar diretamente ao paciente que troque de medicação"]],
    ["O passo \"documentar objetivamente\" recomenda:", ["Registrar fatos observáveis, não conclusões diagnósticas médicas", "Registrar exclusivamente opiniões pessoais sobre o tratamento médico", "Evitar qualquer registro sobre efeitos relatados pelo paciente", "Presumir automaticamente a causa de qualquer sintoma relatado"]],
    ["Diante de sinais sugestivos de efeito colateral significativo, o módulo recomenda:", ["Comunicar ao psiquiatra com urgência apropriada", "Aguardar a próxima consulta médica já agendada, sem qualquer contato adicional", "Sugerir diretamente ao paciente que pare a medicação", "Ignorar, pois não é da competência do psicólogo notar isso"]],
    ["Este módulo, segundo o material, serve como:", ["Fio condutor de todo o Bloco 3, base pra cada classe farmacológica estudada a seguir", "Um módulo isolado, sem relação com os demais do Bloco 3", "Um substituto completo pra formação médica em psiquiatria", "Uma introdução exclusiva à prescrição de medicamentos"]],
  ];
  const gabaritoObjetivas = ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a"];

  const children = [
    ...doc.capa(KICKER, "Avaliação — Por Que Psicofarmacologia", `Avaliação formativa de encerramento do Módulo ${MOD}.`),
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
    doc.vinhetaBox("Uma paciente em tratamento com estabilizador de humor há 2 anos relata, nesta sessão, que \"decidiu parar de tomar sozinha há 3 semanas porque estava se sentindo bem\", e agora nota que está \"mais irritada e impulsiva de novo\"."),
    new doc.Paragraph({ spacing: { before: 240 }, children: [new doc.TextRun({ text: "Com base no protocolo estudado, responda:", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    new doc.Paragraph({ spacing: { before: 220, after: 40 }, children: [new doc.TextRun({ text: "a) (10 pts) Que zona de competência está mais diretamente envolvida na primeira ação a ser tomada aqui?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "b) (10 pts) Como você documentaria esse relato de forma objetiva?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "c) (10 pts) Que orientação imediata você daria à paciente sobre a interrupção por conta própria?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "d) (10 pts) Por que esse caso ilustra bem a diferença entre \"não poder prescrever\" e \"não precisar entender\"?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    new doc.Paragraph({ spacing: { after: 40 }, children: [new doc.TextRun({ text: "USO EXCLUSIVO DO INSTRUTOR — remover antes de aplicar a prova", bold: true, color: doc.TERRA, font: doc.FONT, size: 20 })] }),
    doc.tituloH1("Gabarito"),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 1 — Questões objetivas", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 200 }, children: [new doc.TextRun({ text: gabaritoObjetivas.map((r, i) => `${i + 1}-${r}`).join("   ·   "), font: doc.FONT, size: 22, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 2 — Critério de correção da questão de caso", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "a) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Zona compartilhada — comunicar imediatamente ao psiquiatra sobre a interrupção não orientada e o retorno de sintomas.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "b) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Registrar a data de interrupção relatada (há 3 semanas, por decisão própria) e os sintomas relatados (irritabilidade, impulsividade) sem concluir se há relação causal — isso é análise médica.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "c) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Orientar que decisões sobre medicação, incluindo retomar ou não, devem ser discutidas com o psiquiatra, e que a comunicação será feita entre os profissionais com o consentimento dela.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "d) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Porque, mesmo sem poder ajustar a medicação, o psicólogo que entende psicofarmacologia reconhece o padrão temporal (interrupção → retorno de sintomas) e age rapidamente — um psicólogo sem esse repertório poderia trabalhar a irritabilidade apenas como questão comportamental, perdendo a causa real.", font: doc.FONT, size: 21, color: doc.INK })] }),
  );

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-3.1-Avaliacao.docx");
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
      n: 1, titulo: "A fronteira entre clínica e prescrição", duracao: "12 min", slides: "1, 2, 3, 4",
      objetivo: "Sair sabendo explicar as 4 competências na fronteira psicólogo-psiquiatra sem jargão técnico.",
      segmentos: [
        seg("0:00–0:45", "Abertura (gancho)", [{ fala: "Não entender psicofarmacologia não deixa o psicólogo neutro — deixa ele cego pra metade do que está acontecendo com o paciente que já está em tratamento medicamentoso." }]),
        seg("0:45–2:00", "Por que isso importa", ["Este módulo não ensina a prescrever — ensina o repertório mínimo pra reconhecer e dialogar com precisão."]),
        seg("2:00–8:00", "As 4 competências (mostrar slide 4)", [
          "Reconhecer efeito relevante pra sessão.",
          "Diferenciar sintoma do transtorno de efeito da medicação.",
          "Comunicar-se tecnicamente com a psiquiatria.",
          "Saber quando e como encaminhar.",
        ]),
        seg("8:00–10:30", "Um ponto importante", ["Diferenciar sintoma de efeito colateral é frequentemente a chave pra saber se o problema é terapêutico ou farmacológico."]),
        seg("10:30–12:00", "Fechamento", [{ fala: "Próxima aula: como o desconhecimento vira dano evitável, passo a passo." }]),
      ],
    },
    {
      n: 2, titulo: "Do desconhecimento ao dano evitável", duracao: "10 min", slides: "5",
      objetivo: "Explicar a cadeia entre falta de repertório e sofrimento evitável.",
      segmentos: [
        seg("0:00–1:00", "Retomada rápida", ["Vimos as 4 competências. Hoje vemos o que acontece quando elas faltam."]),
        seg("1:00–6:30", "A cadeia (mostrar slide 5)", ["Psicólogo sem repertório: não reconhece sinais farmacológicos.", "Sinal não identificado: efeito colateral passa despercebido.", "Encaminhamento tardio: oportunidade de ajuste se perde.", "Sofrimento evitável: paciente permanece em risco ou desconforto."]),
        seg("6:30–9:00", "Um ponto importante", ["Essa cadeia raramente é dramática — geralmente é silenciosa, ao longo de semanas."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: as 3 zonas de competência." }]),
      ],
    },
    {
      n: 3, titulo: "As 3 zonas e os sinais a reconhecer", duracao: "12 min", slides: "6, 7",
      objetivo: "Reconhecer as 3 zonas de competência e os sinais farmacológicos mais relevantes.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três zonas — e a distinção central que organiza todo o módulo."]),
        seg("1:00–6:00", "As 3 zonas (mostrar slide 6)", [
          "Zona do psicólogo: efeito na sessão, adesão, psicoeducação.",
          "Zona compartilhada: comunicação e monitoramento conjunto.",
          "Zona exclusiva da medicina: prescrição, ajuste de dose.",
        ]),
        seg("6:00–10:30", "Sinais a reconhecer (mostrar slide 7)", [
          "Ativação inicial: aumento paradoxal de ansiedade com ISRS.",
          "Achatamento afetivo: confundido com melhora.",
          "Sinais de desmame abrupto.",
          "Possível interação medicamentosa.",
        ]),
        seg("10:30–12:00", "Fechamento", [{ fala: "Próxima aula: as 3 posturas possíveis, e só uma é adequada." }]),
      ],
    },
    {
      n: 4, titulo: "Três posturas e as fontes confiáveis", duracao: "11 min", slides: "8, 9",
      objetivo: "Diferenciar posturas em relação à medicação do paciente e conhecer fontes confiáveis de informação.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três posturas possíveis — só uma delas é tecnicamente adequada."]),
        seg("1:00–6:00", "As 3 posturas (mostrar slide 8)", [
          "Ignorar completamente: perde informação clínica relevante.",
          "Dialogar tecnicamente: postura adequada.",
          "Ultrapassar a fronteira: sempre inadequado.",
        ]),
        seg("6:00–10:00", "As 3 fontes confiáveis (mostrar slide 9)", [
          "Bula/manual técnico: referência primária.",
          "Contato direto com o psiquiatra: fonte mais precisa pro caso.",
          "Literatura científica: atualização contínua.",
        ]),
        seg("10:00–11:00", "Fechamento", [{ fala: "Próxima aula: colocamos tudo em prática — reconhecer e documentar." }]),
      ],
    },
    {
      n: 5, titulo: "Aplicação — reconhecer e documentar", duracao: "13 min", slides: "10, 11",
      objetivo: "Aplicar os passos 1 e 2 do modelo de comunicação responsável.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["A parte mais prática desse módulo. Hoje, os 2 primeiros passos."]),
        seg("1:00–2:00", "Visão geral (mostrar slide 10)", ["Reconhecer sinais relevantes → Documentar objetivamente → Comunicar com precisão técnica → Nunca sugerir ajuste diretamente."]),
        seg("2:00–7:00", "Passo 1 — Reconhecer sinais relevantes (mostrar slide 11, esquerda)", ["Observe mudanças que coincidem com início ou ajuste de medicação.", "Pergunte ativamente sobre efeitos colaterais."]),
        seg("7:00–12:00", "Passo 2 — Documentar objetivamente (mostrar slide 11, direita)", [{ fala: "Vou registrar o que você está relatando, com suas palavras, pra podermos conversar com seu psiquiatra sobre isso." }]),
        seg("12:00–13:00", "Fechamento", [{ fala: "Próxima aula: comunicar com precisão técnica e nunca sugerir ajuste diretamente." }]),
      ],
    },
    {
      n: 6, titulo: "Aplicação — comunicação técnica responsável", duracao: "11 min", slides: "12",
      objetivo: "Trabalhar comunicação técnica com a psiquiatria e os limites dessa comunicação.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Hoje fechamos o modelo com a etapa mais delicada eticamente."]),
        seg("1:00–6:00", "Passo 3 — Comunicar com precisão técnica (mostrar slide 12, esquerda)", ["Use linguagem objetiva e específica.", "Sempre com consentimento do paciente, exceto em situações de risco."]),
        seg("6:00–10:00", "Passo 4 — Nunca sugerir ajuste diretamente (mostrar slide 12, direita)", ["A decisão de ajuste é sempre médica.", "Encaminhe a dúvida do paciente diretamente pro psiquiatra."]),
        seg("10:00–11:00", "Fechamento", [{ fala: "Modelo completo. Próxima aula: um caso real e os critérios de quando escalar." }]),
      ],
    },
    {
      n: 7, titulo: "Estudo de caso, encaminhamento e recap", duracao: "14 min", slides: "13, 14, 15",
      objetivo: "Integrar todo o módulo num caso completo, com ênfase na comunicação responsável.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Última aula do módulo. Caso completo e os critérios de quando encaminhar."]),
        seg("1:00–6:00", "Estudo de caso (mostrar slide 13)", ["Leia a vinheta com calma.", "Percorra as 3 perguntas de discussão.", "Convide o aluno a pausar e responder por escrito."]),
        seg("6:00–10:00", "Quando encaminhar (mostrar slide 14)", ["Percorra os 4 critérios, com atenção especial ao risco associado a mudanças recentes de medicação."]),
        seg("10:00–13:00", "Recapitulando o módulo (mostrar slide 15)", ["Retome os 4 pontos-chave.", "Reforce que esse módulo é o fio condutor de todo o Bloco 3."]),
        seg("13:00–14:00", "Fechamento do módulo", [{ fala: "Agora é hora dos exercícios e da avaliação. Te vejo no próximo módulo do Bloco 3." }]),
      ],
    },
  ];

  const totalMin = 12 + 10 + 12 + 11 + 13 + 11 + 14;

  const children = [
    ...doc.capa(KICKER, "Roteiro de Aulas — Por Que Psicofarmacologia", "Módulo dividido em 7 vídeo-aulas de 10 a 15 minutos, seguindo os slides já produzidos. Cada aula tem roteiro cronometrado, pronto pra gravação."),
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

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", `${RODAPE_DOC} — Roteiro de Aulas`, children), "Modulo-3.1-Roteiro-Aulas.docx");
}

// ============================================================
Promise.resolve()
  .then(construirDeck)
  .then(construirExercicios)
  .then(construirProva)
  .then(construirRoteiro)
  .then(() => console.log("TUDO PRONTO"))
  .catch((e) => { console.error(e); process.exit(1); });

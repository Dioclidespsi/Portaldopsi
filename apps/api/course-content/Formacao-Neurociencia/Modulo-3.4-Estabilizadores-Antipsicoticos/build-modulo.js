const deck = require("../_lib/lib-deck.js");
const doc = require("../_lib/lib-doc.js");

const MOD = "3.4";
const NOME = "Estabilizadores de Humor e Antipsicóticos";
const RODAPE_DECK = `Estabilizadores e Antipsicóticos — Módulo ${MOD}`;
const RODAPE_DOC = `Módulo ${MOD} — Estabilizadores e Antipsicóticos`;
const KICKER = "MÓDULO 3.4 · FARMACOLOGIA APLICADA À PSICOTERAPIA";

// ============================================================
// 1) SLIDE DECK
// ============================================================
function construirDeck() {
  const pres = deck.novaApresentacao(`${NOME} — Reconhecendo Sinais no Meio do Processo Terapêutico`);

  deck.slideTitulo(pres, {
    moduloLabel: `Módulo ${MOD} · Bloco 3 · Farmacologia`,
    titulo: "Humor e Psicose",
    subtitulo: "Estabilizadores e antipsicóticos: o que reconhecer quando emergem em terapia",
    passos: ["Estabilizadores", "Antipsicóticos", "Sinais de mania", "Sinais psicóticos", "Aplicação"],
  });

  deck.slideRoteiro(pres, {
    rodape: RODAPE_DECK, pageNum: 2,
    cards: [
      { titulo: "Estabilizadores de humor", desc: "Lítio e anticonvulsivantes, base do Módulo 4.20" },
      { titulo: "Antipsicóticos", desc: "Típicos e atípicos, perfis distintos de efeito" },
      { titulo: "Sinais de mania emergente", desc: "O que observar antes de uma crise se instalar" },
      { titulo: "Sinais psicóticos emergentes", desc: "Reconhecer sem confrontar o conteúdo" },
      { titulo: "Aplicação", desc: "Por que o psicólogo é frequentemente quem nota primeiro" },
    ],
  });

  deck.slideHook(pres, {
    rodape: RODAPE_DECK, pageNum: 3,
    frase: "Muitas vezes é o psicólogo, não o psiquiatra, quem primeiro percebe os sinais de um episódio maníaco ou psicótico emergindo — porque é ele quem vê o paciente semana a semana, e nota a mudança de padrão.",
    apoio: "Esse módulo não ensina a tratar esses quadros — ensina a reconhecer sinais precocemente, documentar com precisão, e encaminhar antes que a situação se agrave.",
  });

  deck.slideCircuito(pres, {
    rodape: RODAPE_DECK, pageNum: 4,
    titulo: "O que essas duas classes regulam no cérebro",
    regioes: [
      { label: "Lítio/anticonvulsivantes (estabilização do circuito de humor)", rx: 0.20, ry: 0.22, color: deck.NAVY, d: 0.5 },
      { label: "Antipsicóticos típicos (bloqueio dopaminérgico, sintomas positivos)", rx: 0.22, ry: 0.62, color: deck.TERRA, d: 0.4 },
      { label: "Antipsicóticos atípicos (perfil mais amplo, menos efeitos motores)", rx: 0.60, ry: 0.60, color: deck.NAVY_TINT, d: 0.36 },
      { label: "Circuito extrapiramidal (fonte dos efeitos motores colaterais)", rx: 0.58, ry: 0.24, color: deck.TERRA_TINT, d: 0.36 },
    ],
    notas: [
      "Lítio e anticonvulsivantes agem estabilizando a excitabilidade neuronal, reduzindo a amplitude e frequência de episódios de humor (Módulo 4.20).",
      "Antipsicóticos típicos bloqueiam receptores de dopamina de forma mais ampla, eficazes em sintomas positivos, mas com maior risco de efeitos motores.",
      "Antipsicóticos atípicos têm perfil de ação mais amplo, geralmente com menos efeitos extrapiramidais, mas com outros riscos metabólicos a monitorar.",
    ],
  });

  deck.slideCadeia(pres, {
    rodape: RODAPE_DECK, pageNum: 5,
    titulo: "Do sinal sutil ao encaminhamento oportuno",
    elos: [
      { titulo: "Sinal comportamental sutil", desc: "Fala acelerada, desconfiança incomum, mudança perceptível de padrão" },
      { titulo: "Padrão se consolida", desc: "Ao longo de semanas, os sinais se tornam mais consistentes" },
      { titulo: "Psicólogo reconhece e documenta", desc: "Observação estruturada, sem confrontar diretamente o conteúdo" },
      { titulo: "Encaminhamento oportuno", desc: "Previne que a situação evolua pra uma crise maior" },
    ],
    notaFinal: "A janela entre o primeiro sinal sutil e uma crise plena costuma ser de semanas — é exatamente essa janela que a observação clínica cuidadosa consegue capturar.",
  });

  deck.slideCategorias(pres, {
    rodape: RODAPE_DECK, pageNum: 6,
    titulo: "3 categorias principais",
    categorias: [
      { titulo: "Estabilizadores de humor", desc: "Lítio e anticonvulsivantes, base do tratamento do Transtorno Bipolar", color: deck.NAVY },
      { titulo: "Antipsicóticos típicos", desc: "Primeira geração, mais efeitos motores colaterais", color: deck.TERRA },
      { titulo: "Antipsicóticos atípicos", desc: "Segunda geração, perfil mais amplo de indicações", color: deck.NAVY_TINT },
    ],
    notaFinal: "Antipsicóticos, apesar do nome, também são usados como estabilizadores adjuvantes em alguns quadros de Transtorno Bipolar — a nomenclatura não limita totalmente a indicação clínica.",
  });

  deck.slideSinais(pres, {
    rodape: RODAPE_DECK, pageNum: 7,
    titulo: "Sinais a observar na sessão",
    itens: [
      { titulo: "Mania emergente", desc: "Fala acelerada, grandiosidade nova, redução da necessidade de sono relatada" },
      { titulo: "Sintomas psicóticos positivos", desc: "Delírios, alucinações, discurso desorganizado" },
      { titulo: "Sintomas psicóticos negativos", desc: "Retraimento intenso, embotamento, podem ser confundidos com depressão" },
      { titulo: "Efeitos motores colaterais", desc: "Tremores, rigidez ou inquietação motora em paciente já em uso de antipsicótico" },
    ],
  });

  deck.slideDiferencial(pres, {
    rodape: RODAPE_DECK, pageNum: 8,
    titulo: "Diferenciando quadros que podem se confundir",
    cards: [
      { titulo: "Sintoma psicótico transitório", desc: "Breve, reativo a estresse extremo, geralmente com algum insight preservado" },
      { titulo: "Quadro psicótico estabelecido", desc: "Persistente, sem insight, exige avaliação psiquiátrica urgente" },
      { titulo: "Negativos x depressão", desc: "Retraimento psicótico pode ser confundido com quadro depressivo isolado" },
    ],
  });

  deck.slideInstrumentos(pres, {
    rodape: RODAPE_DECK, pageNum: 9,
    titulo: "Instrumentos e observação estruturada",
    instrumentos: [
      { sigla: "YMRS", nome: "Young Mania Rating Scale", desc: "Já usada no Módulo 4.20, mede gravidade de sintomas maníacos." },
      { sigla: "PANSS", nome: "Positive and Negative Syndrome Scale", desc: "Referência formal pra gravidade de sintomas psicóticos, aplicação especializada." },
      { sigla: "Observação estruturada", nome: "Registro sistemático de mudanças de padrão", desc: "A ferramenta mais acessível pro psicólogo no dia a dia." },
    ],
  });

  deck.slideProtocoloOverview(pres, {
    rodape: RODAPE_DECK, pageNum: 10,
    titulo: "Do sinal ao encaminhamento: 4 passos",
    passos: [
      { titulo: "Reconhecer\nsinais precocemente", desc: "Comparar o padrão atual com o padrão habitual do paciente" },
      { titulo: "Não confrontar\nconteúdo delirante", desc: "Validar o sofrimento sem confirmar nem refutar o conteúdo" },
      { titulo: "Documentar\nobjetivamente", desc: "Fatos observáveis, com data e contexto" },
      { titulo: "Encaminhar com\nurgência apropriada", desc: "A depender da gravidade e do risco identificado" },
    ],
    notaFinal: "O passo 2 é frequentemente o mais difícil na prática — a tentação de \"corrigir\" o conteúdo delirante raramente ajuda, e pode romper a aliança terapêutica.",
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 11,
    titulo: "Passos 1 e 2, na prática",
    colunas: [
      {
        numero: 1, titulo: "Reconhecer sinais precocemente",
        bullets: ["Compare o padrão atual de fala, sono e comportamento com o padrão habitual já conhecido do paciente", "Pergunte ativamente sobre sono e energia, sinais precoces frequentemente negligenciados"],
      },
      {
        numero: 2, titulo: "Não confrontar conteúdo delirante",
        fala: "“Percebo que isso é muito real e angustiante pra você agora — vamos conversar sobre como você está se sentindo.”",
        bullets: ["Valide o sofrimento emocional associado, sem confirmar nem refutar diretamente o conteúdo do delírio"],
      },
    ],
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 12,
    titulo: "Passos 3 e 4, na prática",
    colunas: [
      {
        numero: 3, titulo: "Documentar objetivamente",
        bullets: ["Registre fatos observáveis (fala, comportamento, conteúdo relatado) com data e contexto", "Evite linguagem interpretativa ou diagnóstica nesse registro inicial"],
      },
      {
        numero: 4, titulo: "Encaminhar com urgência apropriada",
        bullets: ["Sintomas psicóticos agudos com risco: encaminhamento emergencial", "Sinais de mania emergente sem risco imediato: encaminhamento urgente, mas não necessariamente de emergência"],
      },
    ],
  });

  deck.slideCaso(pres, {
    rodape: RODAPE_DECK, pageNum: 13,
    vinheta: "Um paciente em terapia há 8 meses por ansiedade generalizada chega a uma sessão falando muito mais rápido que o habitual, contando planos grandiosos de \"revolucionar\" seu setor de trabalho, e menciona ter dormido \"só 2 horas essa semana, mas nunca me senti tão bem\".",
    perguntas: [
      "Que sinais dessa vinheta destoam do padrão de ansiedade que trouxe o paciente à terapia originalmente?",
      "Que quadro esses sinais, em conjunto, sugerem investigar?",
      "Como você conduziria o restante dessa sessão, considerando a possibilidade desse quadro?",
    ],
  });

  deck.slideEncaminhamento(pres, {
    rodape: RODAPE_DECK, pageNum: 14,
    criterios: [
      "Sintomas psicóticos agudos com risco associado: encaminhamento emergencial imediato",
      "Sinais consistentes de mania emergente, mesmo sem risco imediato: encaminhamento psiquiátrico urgente",
      "Efeitos motores colaterais significativos em paciente já em uso de antipsicótico: comunicar prontamente",
      "Qualquer sinal de risco associado a esses quadros: ativar também o protocolo do Módulo 4.9",
    ],
  });

  deck.slideRecap(pres, {
    rodape: RODAPE_DECK, pageNum: 15,
    pontos: [
      "O psicólogo frequentemente é quem primeiro percebe sinais de mania ou psicose, pela proximidade semanal com o paciente",
      "Estabilizadores de humor, antipsicóticos típicos e atípicos são as 3 categorias centrais desse módulo",
      "Sinais de mania emergente e sinais psicóticos exigem reconhecimento precoce, sem confronto direto do conteúdo",
      "Documentação objetiva e encaminhamento com urgência apropriada fecham o ciclo de manejo responsável",
    ],
    proximoTexto: "Próximo: exercícios práticos e avaliação do Módulo 3.4 →",
  });

  return pres.writeFile({ fileName: "Modulo-3.4-Estabilizadores-Antipsicoticos.pptx" });
}

// ============================================================
// 2) EXERCÍCIOS
// ============================================================
function construirExercicios() {
  const children = [
    ...doc.capa(KICKER, "Exercícios — Estabilizadores e Antipsicóticos", "Resolva individualmente antes da sessão de supervisão. O objetivo é testar sua leitura clínica antes de comparar com a discussão em grupo — não há problema em errar."),

    doc.exNum(1, "As 3 categorias, em suas palavras"),
    doc.pergunta(1, "Explique em uma frase cada categoria: estabilizadores de humor, antipsicóticos típicos, antipsicóticos atípicos."),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Por que o psicólogo é frequentemente quem primeiro percebe sinais de mania ou psicose emergindo?"),
    ...doc.linhaResposta(2),

    doc.exNum(2, "Diferenciando quadros"),
    doc.tabelaSimples(["Situação", "Categoria"], [["Sintoma breve, reativo a estresse extremo, com algum insight", ""], ["Retraimento intenso que pode ser confundido com depressão", ""], ["Sintoma persistente, sem insight algum", ""]], [5600, 3550]),

    doc.exNum(3, "Não confrontar o conteúdo"),
    doc.vinhetaBox("Um paciente relata, com convicção, que está sendo perseguido por uma organização específica."),
    doc.pergunta(1, "Escreva uma resposta que valide o sofrimento sem confirmar nem refutar diretamente o conteúdo relatado."),
    ...doc.linhaResposta(3),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),

    doc.exNum(4, "Documentação objetiva"),
    doc.pergunta(1, "Reescreva a observação \"paciente parece estar tendo um surto\" de forma objetiva, sem linguagem diagnóstica."),
    ...doc.linhaResposta(2),

    doc.exNum(5, "Caso integrado"),
    doc.vinhetaBox("Um paciente em terapia há 8 meses por ansiedade chega falando muito mais rápido que o habitual, com planos grandiosos, e relata ter dormido só 2 horas na semana \"mas nunca se sentiu tão bem\"."),
    doc.pergunta(1, "Que sinais destoam do padrão original de ansiedade?"),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Que quadro esses sinais sugerem investigar?"),
    ...doc.linhaResposta(1),
    doc.pergunta(3, "Como você conduziria o restante dessa sessão?"),
    ...doc.linhaResposta(2),
  ];

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-3.4-Exercicios.docx");
}

// ============================================================
// 3) AVALIAÇÃO
// ============================================================
function construirProva() {
  const objetivas = [
    ["Lítio e anticonvulsivantes atuam principalmente:", ["Estabilizando a excitabilidade neuronal, reduzindo episódios de humor", "Bloqueando exclusivamente receptores de dopamina", "Aumentando indefinidamente a serotonina disponível", "Sem qualquer efeito sobre o sistema nervoso central"]],
    ["Antipsicóticos típicos, em comparação aos atípicos, tendem a apresentar:", ["Maior risco de efeitos motores colaterais (extrapiramidais)", "Ausência completa de qualquer efeito colateral", "Ação exclusiva sobre serotonina, sem qualquer efeito dopaminérgico", "Uso exclusivo em transtornos de ansiedade"]],
    ["As 3 categorias centrais deste módulo são:", ["Estabilizadores de humor, antipsicóticos típicos, antipsicóticos atípicos", "ISRS, IRSN, tricíclicos", "Benzodiazepínicos, buspirona, hipnóticos não-benzodiazepínicos", "Sintomas nucleares, duração mínima, prejuízo funcional"]],
    ["Sintomas psicóticos negativos podem ser confundidos com:", ["Depressão, devido ao retraimento e embotamento presentes em ambos", "Mania, devido à energia elevada presente em ambos", "TDAH, devido à hiperatividade presente em ambos", "Nenhum outro quadro, pois são inconfundíveis"]],
    ["O passo \"não confrontar conteúdo delirante\" recomenda:", ["Validar o sofrimento emocional, sem confirmar nem refutar diretamente o conteúdo", "Confirmar ativamente a veracidade do conteúdo delirante", "Refutar diretamente e de forma enfática o conteúdo relatado", "Ignorar completamente qualquer relato do paciente"]],
    ["Diante de sintomas psicóticos agudos com risco associado, o módulo recomenda:", ["Encaminhamento emergencial imediato", "Aguardar a próxima sessão agendada, sem intervenção imediata", "Ignorar, pois não é da competência do psicólogo notar isso", "Reduzir a frequência das sessões automaticamente"]],
    ["A YMRS, já estudada no Módulo 4.20, é usada para:", ["Medir gravidade de sintomas maníacos", "Medir exclusivamente sintomas depressivos", "Avaliar exclusivamente funções executivas", "Avaliar exclusivamente traços de personalidade"]],
    ["Sinais precoces frequentemente negligenciados de mania emergente incluem:", ["Mudanças no padrão de sono e energia", "Exclusivamente alterações de apetite", "Apenas sintomas motores colaterais", "Nenhum sinal específico pode ser observado precocemente"]],
    ["Diante de efeitos motores colaterais significativos em paciente já em uso de antipsicótico, o módulo recomenda:", ["Comunicar prontamente ao psiquiatra responsável", "Ignorar, pois são sempre esperados e nunca relevantes", "Aconselhar o paciente a interromper a medicação por conta própria", "Aguardar meses antes de qualquer comunicação"]],
    ["Por que a janela entre o primeiro sinal sutil e uma crise plena é clinicamente importante?", ["Porque a observação clínica cuidadosa nesse período pode permitir encaminhamento oportuno, prevenindo agravamento", "Porque essa janela nunca existe na prática real", "Porque não há qualquer ação possível durante esse período", "Porque essa janela dura sempre exatamente 24 horas em todos os casos"]],
  ];
  const gabaritoObjetivas = ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a"];

  const children = [
    ...doc.capa(KICKER, "Avaliação — Estabilizadores e Antipsicóticos", `Avaliação formativa de encerramento do Módulo ${MOD}.`),
    doc.infoBox([
      ["Nota de corte:", "75 de 100 pontos (nota mais alta, dada a relevância do reconhecimento precoce de risco)"],
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
    doc.vinhetaBox("Uma paciente em acompanhamento há 1 ano por depressão relata, nas últimas 3 sessões, um retraimento progressivo, discurso cada vez mais desorganizado, e menciona, de forma vaga, que \"sente que estão mandando mensagens pra ela através da televisão\"."),
    new doc.Paragraph({ spacing: { before: 240 }, children: [new doc.TextRun({ text: "Com base no protocolo estudado, responda:", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    new doc.Paragraph({ spacing: { before: 220, after: 40 }, children: [new doc.TextRun({ text: "a) (10 pts) Que sinais dessa vinheta sugerem investigar além do quadro depressivo original?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "b) (10 pts) Como você responderia à paciente sobre as \"mensagens da televisão\", seguindo o protocolo estudado?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "c) (10 pts) Como você documentaria esse relato de forma objetiva?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "d) (10 pts) Que nível de urgência de encaminhamento essa situação exige, e por quê?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    new doc.Paragraph({ spacing: { after: 40 }, children: [new doc.TextRun({ text: "USO EXCLUSIVO DO INSTRUTOR — remover antes de aplicar a prova", bold: true, color: doc.TERRA, font: doc.FONT, size: 20 })] }),
    doc.tituloH1("Gabarito"),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 1 — Questões objetivas", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 200 }, children: [new doc.TextRun({ text: gabaritoObjetivas.map((r, i) => `${i + 1}-${r}`).join("   ·   "), font: doc.FONT, size: 22, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 2 — Critério de correção da questão de caso", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "a) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Discurso desorganizado progressivo e conteúdo sugestivo de possível sintoma psicótico (mensagens através da televisão) — sinais que vão além do quadro depressivo original.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "b) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Validar o sofrimento associado a essa experiência, sem confirmar nem refutar diretamente o conteúdo relatado — ex: \"percebo que isso é muito angustiante pra você.\"", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "c) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Registrar as palavras exatas usadas pela paciente sobre as \"mensagens\", a data, e o padrão de retraimento e desorganização observado ao longo das 3 sessões, sem usar termos diagnósticos como \"delírio\" ou \"psicose\" nesse registro inicial.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "d) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Encaminhamento urgente, dado o padrão progressivo ao longo de 3 sessões e a presença de possível sintoma psicótico emergente, mesmo sem indicação clara de risco imediato — a rapidez evita agravamento.", font: doc.FONT, size: 21, color: doc.INK })] }),
  );

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-3.4-Avaliacao.docx");
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
      n: 1, titulo: "Reconhecendo sinais no meio do processo terapêutico", duracao: "12 min", slides: "1, 2, 3, 4",
      objetivo: "Sair sabendo explicar as 3 categorias e seus mecanismos sem jargão técnico.",
      segmentos: [
        seg("0:00–0:45", "Abertura (gancho)", [{ fala: "Muitas vezes é o psicólogo, não o psiquiatra, quem primeiro percebe os sinais de um episódio maníaco ou psicótico emergindo — porque é ele quem vê o paciente semana a semana, e nota a mudança de padrão." }]),
        seg("0:45–2:00", "Por que isso importa", ["Reconhecer sinais precocemente, documentar com precisão, e encaminhar antes que a situação se agrave."]),
        seg("2:00–8:00", "O que essas classes regulam (mostrar slide 4)", [
          "Lítio/anticonvulsivantes: estabilização do circuito de humor.",
          "Antipsicóticos típicos: bloqueio dopaminérgico, sintomas positivos.",
          "Antipsicóticos atípicos: perfil mais amplo, menos efeitos motores.",
          "Circuito extrapiramidal: fonte dos efeitos motores colaterais.",
        ]),
        seg("8:00–10:30", "Um ponto importante", ["Antipsicóticos, apesar do nome, também são usados como estabilizadores adjuvantes em Bipolar."]),
        seg("10:30–12:00", "Fechamento", [{ fala: "Próxima aula: do sinal sutil ao encaminhamento oportuno." }]),
      ],
    },
    {
      n: 2, titulo: "Do sinal sutil ao encaminhamento oportuno", duracao: "10 min", slides: "5",
      objetivo: "Explicar a cadeia entre sinal comportamental sutil e encaminhamento oportuno.",
      segmentos: [
        seg("0:00–1:00", "Retomada rápida", ["Vimos as classes farmacológicas. Hoje vemos como reconhecer o momento certo de agir."]),
        seg("1:00–6:30", "A cadeia (mostrar slide 5)", ["Sinal comportamental sutil: fala acelerada, desconfiança incomum.", "Padrão se consolida ao longo de semanas.", "Psicólogo reconhece e documenta.", "Encaminhamento oportuno previne crise maior."]),
        seg("6:30–9:00", "Um ponto importante", ["A janela entre o primeiro sinal e uma crise plena costuma ser de semanas."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: as 3 categorias principais em detalhe." }]),
      ],
    },
    {
      n: 3, titulo: "As 3 categorias e os sinais a observar", duracao: "12 min", slides: "6, 7",
      objetivo: "Reconhecer as 3 categorias farmacológicas e os sinais mais relevantes na sessão.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três categorias — e os sinais que exigem atenção redobrada na sessão."]),
        seg("1:00–6:00", "As 3 categorias (mostrar slide 6)", [
          "Estabilizadores de humor: base do Transtorno Bipolar.",
          "Antipsicóticos típicos: mais efeitos motores.",
          "Antipsicóticos atípicos: perfil mais amplo.",
        ]),
        seg("6:00–10:30", "Sinais a observar (mostrar slide 7)", [
          "Mania emergente: fala acelerada, grandiosidade, sono reduzido.",
          "Sintomas psicóticos positivos: delírios, alucinações, desorganização.",
          "Sintomas psicóticos negativos: podem ser confundidos com depressão.",
          "Efeitos motores colaterais em uso de antipsicótico.",
        ]),
        seg("10:30–12:00", "Fechamento", [{ fala: "Próxima aula: diferenciando quadros que podem se confundir." }]),
      ],
    },
    {
      n: 4, titulo: "Diferenciando quadros e os instrumentos disponíveis", duracao: "11 min", slides: "8, 9",
      objetivo: "Diferenciar sintoma transitório de quadro estabelecido, e conhecer instrumentos de referência.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Um filtro rápido — nem todo sintoma sugestivo indica quadro estabelecido."]),
        seg("1:00–6:00", "Os 3 cenários (mostrar slide 8)", [
          "Sintoma transitório: breve, reativo, com algum insight.",
          "Quadro estabelecido: persistente, sem insight.",
          "Sintomas negativos versus depressão: podem se confundir.",
        ]),
        seg("6:00–10:00", "Os instrumentos (mostrar slide 9)", [
          "YMRS: gravidade de sintomas maníacos, já vista no Módulo 4.20.",
          "PANSS: referência formal pra gravidade de sintomas psicóticos.",
          "Observação estruturada: a ferramenta mais acessível no dia a dia.",
        ]),
        seg("10:00–11:00", "Fechamento", [{ fala: "Próxima aula: colocamos tudo em prática — reconhecer e não confrontar." }]),
      ],
    },
    {
      n: 5, titulo: "Aplicação — reconhecer sinais e não confrontar", duracao: "13 min", slides: "10, 11",
      objetivo: "Aplicar os passos 1 e 2 do modelo de manejo responsável.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["A parte mais delicada tecnicamente desse módulo. Hoje, os 2 primeiros passos."]),
        seg("1:00–2:00", "Visão geral (mostrar slide 10)", ["Reconhecer sinais precocemente → Não confrontar conteúdo delirante → Documentar objetivamente → Encaminhar com urgência apropriada."]),
        seg("2:00–7:00", "Passo 1 — Reconhecer sinais precocemente (mostrar slide 11, esquerda)", ["Compare o padrão atual com o padrão habitual já conhecido.", "Pergunte ativamente sobre sono e energia."]),
        seg("7:00–12:00", "Passo 2 — Não confrontar conteúdo delirante (mostrar slide 11, direita)", [{ fala: "Percebo que isso é muito real e angustiante pra você agora — vamos conversar sobre como você está se sentindo." }]),
        seg("12:00–13:00", "Fechamento", [{ fala: "Próxima aula: documentar objetivamente e encaminhar com urgência apropriada." }]),
      ],
    },
    {
      n: 6, titulo: "Aplicação — documentar e encaminhar", duracao: "11 min", slides: "12",
      objetivo: "Trabalhar documentação objetiva e critérios de urgência de encaminhamento.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Hoje fechamos o modelo com os passos que definem a resposta clínica final."]),
        seg("1:00–6:00", "Passo 3 — Documentar objetivamente (mostrar slide 12, esquerda)", ["Registre fatos observáveis, com data e contexto.", "Evite linguagem interpretativa nesse registro inicial."]),
        seg("6:00–10:00", "Passo 4 — Encaminhar com urgência apropriada (mostrar slide 12, direita)", ["Sintomas psicóticos agudos com risco: emergencial.", "Mania emergente sem risco imediato: urgente, mas não necessariamente emergencial."]),
        seg("10:00–11:00", "Fechamento", [{ fala: "Modelo completo. Próxima aula: um caso real e os critérios de quando escalar." }]),
      ],
    },
    {
      n: 7, titulo: "Estudo de caso, encaminhamento e recap", duracao: "14 min", slides: "13, 14, 15",
      objetivo: "Integrar todo o módulo num caso completo, com ênfase na diferenciação com o quadro original do paciente.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Última aula do módulo. Caso completo e os critérios de quando escalar."]),
        seg("1:00–6:00", "Estudo de caso (mostrar slide 13)", ["Leia a vinheta com calma.", "Percorra as 3 perguntas de discussão.", "Convide o aluno a pausar e responder por escrito."]),
        seg("6:00–10:00", "Quando encaminhar (mostrar slide 14)", ["Percorra os 4 critérios, com atenção à conexão com o Módulo 4.9 quando houver risco."]),
        seg("10:00–13:00", "Recapitulando o módulo (mostrar slide 15)", ["Retome os 4 pontos-chave.", "Reforce o papel único do psicólogo em notar mudanças de padrão semana a semana."]),
        seg("13:00–14:00", "Fechamento do módulo", [{ fala: "Agora é hora dos exercícios e da avaliação. Te vejo no próximo módulo do Bloco 3." }]),
      ],
    },
  ];

  const totalMin = 12 + 10 + 12 + 11 + 13 + 11 + 14;

  const children = [
    ...doc.capa(KICKER, "Roteiro de Aulas — Estabilizadores e Antipsicóticos", "Módulo dividido em 7 vídeo-aulas de 10 a 15 minutos, seguindo os slides já produzidos. Cada aula tem roteiro cronometrado, pronto pra gravação."),
    new doc.Paragraph({
      spacing: { before: 60, after: 200 },
      children: [new doc.TextRun({
        text: "Nota importante: este módulo trata de reconhecimento de quadros psiquiátricos graves emergentes. Recomenda-se supervisão específica antes de conduzir atendimentos com esses sinais de forma independente.",
        italics: true, bold: true, color: doc.TERRA, font: doc.FONT, size: 20,
      })],
    }),
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

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", `${RODAPE_DOC} — Roteiro de Aulas`, children), "Modulo-3.4-Roteiro-Aulas.docx");
}

// ============================================================
Promise.resolve()
  .then(construirDeck)
  .then(construirExercicios)
  .then(construirProva)
  .then(construirRoteiro)
  .then(() => console.log("TUDO PRONTO"))
  .catch((e) => { console.error(e); process.exit(1); });

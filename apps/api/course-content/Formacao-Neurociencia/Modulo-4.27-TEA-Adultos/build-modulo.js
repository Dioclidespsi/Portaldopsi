const deck = require("../_lib/lib-deck.js");
const doc = require("../_lib/lib-doc.js");

const MOD = "4.27";
const NOME = "Transtorno do Espectro Autista em Adultos";
const RODAPE_DECK = `TEA em Adultos — Módulo ${MOD}`;
const RODAPE_DOC = `Módulo ${MOD} — TEA em Adultos`;
const KICKER = "MÓDULO 4.27 · PROTOCOLOS CLÍNICOS";

// ============================================================
// 1) SLIDE DECK
// ============================================================
function construirDeck() {
  const pres = deck.novaApresentacao(`${NOME} — Da Neurociência ao Manejo Afirmativo`);

  deck.slideTitulo(pres, {
    moduloLabel: `Módulo ${MOD} · Protocolos Clínicos`,
    titulo: "TEA em Adultos",
    subtitulo: "Uma diferença de processamento, não um déficit a corrigir",
    passos: ["Mecanismo", "Sinais", "Instrumento", "Manejo", "Encaminhamento"],
  });

  deck.slideRoteiro(pres, {
    rodape: RODAPE_DECK, pageNum: 2,
    cards: [
      { titulo: "Mecanismo", desc: "Como o cérebro autista processa o mundo de forma diferente" },
      { titulo: "Sinais", desc: "Por que o diagnóstico em adultos costuma vir tarde" },
      { titulo: "Instrumento", desc: "AQ, RAADS-R e avaliação neuropsicológica" },
      { titulo: "Manejo", desc: "4 passos, numa abordagem afirmativa de neurodiversidade" },
      { titulo: "Encaminhamento", desc: "Comorbidades e a importância da confirmação formal" },
    ],
  });

  deck.slideHook(pres, {
    rodape: RODAPE_DECK, pageNum: 3,
    frase: "Muitos adultos autistas, especialmente mulheres, passam décadas mascarando suas diferenças com tanta eficiência que só descobrem o motivo do próprio esgotamento crônico depois dos 30 anos.",
    apoio: "Este módulo adota a perspectiva afirmativa de neurodiversidade: o objetivo não é fazer a pessoa autista parecer neurotípica, é reduzir sofrimento e construir acomodações reais.",
  });

  deck.slideCircuito(pres, {
    rodape: RODAPE_DECK, pageNum: 4,
    titulo: "Como o cérebro autista processa o mundo de forma diferente",
    regioes: [
      { label: "Conectividade neural (menor conectividade de longo alcance, maior local)", rx: 0.20, ry: 0.22, color: deck.NAVY, d: 0.5 },
      { label: "Processamento sensorial (hiper ou hipossensibilidade a estímulos)", rx: 0.22, ry: 0.62, color: deck.TERRA, d: 0.4 },
      { label: "Processamento social (estilo comunicativo diferente, não deficitário)", rx: 0.60, ry: 0.60, color: deck.NAVY_TINT, d: 0.36 },
      { label: "Predição sensorial (menor filtragem automática do que é \"esperado\")", rx: 0.58, ry: 0.24, color: deck.TERRA_TINT, d: 0.36 },
    ],
    notas: [
      "A conectividade neural atípica combina menor conectividade de longo alcance entre regiões distantes com maior conectividade local — um padrão de organização diferente, não uma falha.",
      "O processamento sensorial frequentemente envolve hiper ou hipossensibilidade a som, luz, textura ou toque, explicando parte do esgotamento em ambientes muito estimulantes.",
      "A dificuldade de filtrar automaticamente estímulos \"esperados\" contribui pra fadiga sensorial e social cumulativa ao longo do dia.",
    ],
  });

  deck.slideCadeia(pres, {
    rodape: RODAPE_DECK, pageNum: 5,
    titulo: "Do mascaramento precoce ao diagnóstico tardio",
    elos: [
      { titulo: "Diferenças desde a infância", desc: "Presentes cedo, mas frequentemente não reconhecidas, sobretudo em meninas" },
      { titulo: "Desenvolvimento do mascaramento", desc: "Estratégias aprendidas pra parecer \"encaixar\" em expectativas neurotípicas" },
      { titulo: "Esgotamento autista", desc: "Exaustão crônica pelo esforço sustentado de manter o mascaramento" },
      { titulo: "Diagnóstico tardio", desc: "Frequentemente após anos de ansiedade/depressão mal compreendidas" },
    ],
    notaFinal: "O termo \"esgotamento autista\" (autistic burnout) descreve especificamente essa exaustão acumulada — diferente de burnout ocupacional (Módulo 4.3), embora possam coexistir.",
  });

  deck.slideCategorias(pres, {
    rodape: RODAPE_DECK, pageNum: 6,
    titulo: "3 traços centrais",
    categorias: [
      { titulo: "Comunicação social diferente", desc: "Estilo comunicativo distinto, não déficit — o \"problema da dupla empatia\"", color: deck.NAVY },
      { titulo: "Padrões restritos e repetitivos", desc: "Interesses intensos, necessidade de rotina e previsibilidade", color: deck.TERRA },
      { titulo: "Processamento sensorial diferente", desc: "Hiper ou hipossensibilidade a estímulos do ambiente", color: deck.NAVY_TINT },
    ],
    notaFinal: "O \"problema da dupla empatia\" propõe que a dificuldade de comunicação é bidirecional — pessoas neurotípicas também têm dificuldade de interpretar pessoas autistas, não é uma falha unilateral.",
  });

  deck.slideSinais(pres, {
    rodape: RODAPE_DECK, pageNum: 7,
    titulo: "Como reconhecer o padrão na prática",
    itens: [
      { titulo: "Cognitivo", desc: "Pensamento literal, interesses intensos e focados, dificuldade com ambiguidade implícita" },
      { titulo: "Comportamental", desc: "Necessidade de rotina, comportamentos repetitivos (stimming) de autorregulação" },
      { titulo: "Relacional", desc: "Dificuldade de leitura de pistas sociais não-verbais, fadiga social após interações" },
      { titulo: "Físico", desc: "Hiper ou hipossensibilidade sensorial a som, luz, textura ou toque" },
    ],
  });

  deck.slideDiferencial(pres, {
    rodape: RODAPE_DECK, pageNum: 8,
    titulo: "Diagnóstico diferencial rápido",
    cards: [
      { titulo: "Ansiedade Social", desc: "O esgotamento social no TEA tem origem sensorial/de processamento, não medo de julgamento" },
      { titulo: "TOC (Módulo 4.8)", desc: "Rotinas no TEA servem à previsibilidade sensorial, não à redução de ansiedade sobre conteúdo obsessivo" },
      { titulo: "TP Esquizoide (Módulo 4.11)", desc: "TEA envolve diferença de processamento social, não desinteresse por vínculo — o desejo de conexão costuma estar presente" },
    ],
  });

  deck.slideInstrumentos(pres, {
    rodape: RODAPE_DECK, pageNum: 9,
    titulo: "Instrumentos e confirmação diagnóstica",
    instrumentos: [
      { sigla: "AQ", nome: "Autism Spectrum Quotient", desc: "Triagem rápida de traços do espectro autista." },
      { sigla: "RAADS-R", nome: "Ritvo Autism and Asperger Diagnostic Scale", desc: "Específico pra diagnóstico tardio em adultos." },
      { sigla: "Avaliação neuropsicológica", nome: "Bateria formal (Bloco 2 do currículo)", desc: "Necessária pra confirmação diagnóstica robusta." },
    ],
  });

  deck.slideProtocoloOverview(pres, {
    rodape: RODAPE_DECK, pageNum: 10,
    titulo: "Do mecanismo ao manejo: 4 passos",
    passos: [
      { titulo: "Psicoeducação\nafirmativa", desc: "Reformular o autismo como diferença, não deficiência a ser corrigida" },
      { titulo: "Reduzir o\nmascaramento", desc: "Prevenir esgotamento autista, sem forçar performance neurotípica" },
      { titulo: "Acomodações\nsensoriais", desc: "Ajustes práticos de ambiente, não \"tolerar\" o desconforto" },
      { titulo: "Autodefesa e\ncomunicação", desc: "Apoiar a pessoa a expressar necessidades nas relações e no trabalho" },
    ],
    notaFinal: "Diferente da maioria dos protocolos deste curso, o objetivo aqui nunca é \"normalizar\" o comportamento — é reduzir sofrimento e aumentar bem-estar dentro do próprio perfil neurológico.",
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 11,
    titulo: "Passos 1 e 2, na prática",
    colunas: [
      {
        numero: 1, titulo: "Psicoeducação afirmativa",
        fala: "“O que você chamava de estranheza pode ser, na verdade, um jeito diferente e válido de processar o mundo — não menos legítimo que o padrão mais comum.”",
        bullets: ["Reformule décadas de autocrítica com uma perspectiva de diferença, não de déficit", "Valide o impacto emocional de anos sem esse entendimento"],
      },
      {
        numero: 2, titulo: "Reduzir o mascaramento",
        bullets: ["Identifique contextos onde o mascaramento é mais custoso, e onde reduzi-lo é seguro", "Trabalhe o reconhecimento precoce de sinais de esgotamento autista"],
      },
    ],
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 12,
    titulo: "Passos 3 e 4, na prática",
    colunas: [
      {
        numero: 3, titulo: "Acomodações sensoriais",
        bullets: ["Ajuste ativamente o ambiente (som, luz, textura) em vez de pedir que o paciente \"tolere\" mais", "Valide o uso de ferramentas de autorregulação sensorial (fones, óculos escuros, objetos de stimming)"],
      },
      {
        numero: 4, titulo: "Autodefesa e comunicação",
        bullets: ["Apoie a construção de linguagem clara pra comunicar necessidades a parceiros, família e trabalho", "Trabalhe scripts práticos pra situações sociais recorrentes, quando útil ao próprio paciente"],
      },
    ],
  });

  deck.slideCaso(pres, {
    rodape: RODAPE_DECK, pageNum: 13,
    vinheta: "Juliana, 36 anos, procura terapia por exaustão crônica e ansiedade. Relata que sempre \"se esforçou o dobro\" pra parecer normal em ambientes sociais, mantém interesses muito específicos e intensos desde criança, e sente sobrecarga sensorial extrema em ambientes barulhentos, precisando de tempo sozinha pra \"recarregar\" depois de qualquer evento social. Nunca foi avaliada, mas diz que sempre se sentiu \"diferente, sem saber por quê\".",
    perguntas: [
      "Que elementos da vinheta ilustram os 3 traços centrais do TEA?",
      "Por que a fadiga social de Juliana não deveria ser automaticamente interpretada como ansiedade social clássica?",
      "Que passo do manejo você priorizaria na primeira sessão com Juliana?",
    ],
  });

  deck.slideEncaminhamento(pres, {
    rodape: RODAPE_DECK, pageNum: 14,
    criterios: [
      "Avaliação neuropsicológica formal pra confirmação diagnóstica, sempre que possível (conecta ao Bloco 2)",
      "Investigar TDAH concomitante — alta taxa de comorbidade, conhecida informalmente como \"AuDHD\"",
      "Comorbidade com ansiedade ou depressão secundária a anos de mascaramento não reconhecido",
      "Considerar grupos de apoio ou comunidade autista, valorizando perspectiva afirmativa de neurodiversidade",
    ],
  });

  deck.slideRecap(pres, {
    rodape: RODAPE_DECK, pageNum: 15,
    pontos: [
      "A conectividade neural atípica e o processamento sensorial diferente explicam o esgotamento autista, não fraqueza ou falta de esforço",
      "Comunicação social diferente, padrões restritos/repetitivos e processamento sensorial diferente são os 3 traços centrais",
      "AQ, RAADS-R e avaliação neuropsicológica formal estruturam a triagem e a confirmação diagnóstica em adultos",
      "O manejo é afirmativo: reduzir sofrimento e mascaramento, não normalizar comportamento pra parecer neurotípico",
    ],
    proximoTexto: "Módulo 4.27 concluído — fim desta expansão temática de protocolos clínicos →",
  });

  return pres.writeFile({ fileName: "Modulo-4.27-TEA-Adultos.pptx" });
}

// ============================================================
// 2) EXERCÍCIOS
// ============================================================
function construirExercicios() {
  const children = [
    ...doc.capa(KICKER, "Exercícios — TEA em Adultos", "Resolva individualmente antes da sessão de supervisão. O objetivo é testar sua leitura do mecanismo e do manejo antes de comparar com a discussão em grupo — não há problema em errar."),

    doc.exNum(1, "O mecanismo, em suas palavras"),
    doc.pergunta(1, "Explique em até 3 frases, sem jargão técnico, por que o TEA é descrito como diferença de processamento, não déficit."),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "O que é esgotamento autista, e por que ele é diferente de burnout ocupacional (Módulo 4.3)?"),
    ...doc.linhaResposta(2),

    doc.exNum(2, "Diagnóstico diferencial"),
    doc.vinhetaBox("Uma paciente relata exaustão extrema depois de interações sociais, mas atribui isso à sobrecarga sensorial do ambiente (barulho, luz), não a medo de ser julgada ou avaliada negativamente."),
    doc.pergunta(1, "TEA ou Ansiedade Social? Justifique com base na origem da fadiga descrita."),
    ...doc.linhaResposta(2),

    doc.exNum(3, "Abordagem afirmativa"),
    doc.vinhetaBox("Um paciente diz: \"sempre tive vergonha dos meus interesses tão específicos, minha família dizia que eu era estranho\"."),
    doc.pergunta(1, "Escreva uma resposta terapêutica alinhada ao passo 1 (psicoeducação afirmativa)."),
    ...doc.linhaResposta(3),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),

    doc.exNum(4, "Acomodações sensoriais"),
    doc.p("Liste 3 acomodações sensoriais práticas que poderiam reduzir a sobrecarga de um paciente em ambientes de trabalho barulhentos."),
    doc.tabelaSimples(["Nº", "Acomodação sensorial"], [["1", ""], ["2", ""], ["3", ""]], [1200, 8150]),

    doc.exNum(5, "Caso integrado — Juliana"),
    doc.vinhetaBox("Juliana, 36 anos, exaustão crônica e ansiedade, sempre \"se esforçou o dobro\" pra parecer normal, interesses muito específicos desde criança, sobrecarga sensorial em ambientes barulhentos, precisa de tempo sozinha pra recarregar, nunca foi avaliada."),
    doc.pergunta(1, "Identifique os 3 traços centrais presentes na vinheta."),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Por que a fadiga social de Juliana não deveria ser automaticamente interpretada como ansiedade social clássica?"),
    ...doc.linhaResposta(2),
    doc.pergunta(3, "Que encaminhamento você faria pra confirmar o diagnóstico de forma robusta?"),
    ...doc.linhaResposta(1),
  ];

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-4.27-Exercicios.docx");
}

// ============================================================
// 3) AVALIAÇÃO
// ============================================================
function construirProva() {
  const objetivas = [
    ["A conectividade neural no TEA é frequentemente descrita como:", ["Menor conectividade de longo alcance, com maior conectividade local", "Idêntica em todos os aspectos à população neurotípica", "Ausência completa de qualquer conectividade entre regiões", "Hiperconectividade exclusivamente de longo alcance, sem padrão local"]],
    ["Os 3 traços centrais do TEA em adultos são:", ["Comunicação social diferente, padrões restritos/repetitivos, processamento sensorial diferente", "Grandiosidade, necessidade de admiração, falta de empatia", "Desatenção, impulsividade, inquietação interna", "Crises recorrentes e inesperadas, medo de sensações corporais, esquiva fóbica"]],
    ["O \"problema da dupla empatia\" propõe que:", ["A dificuldade de comunicação entre autistas e neurotípicos é bidirecional, não uma falha unilateral", "Apenas pessoas autistas têm dificuldade de comunicação social", "Não existe qualquer diferença de comunicação no TEA", "A empatia está completamente ausente em pessoas autistas"]],
    ["\"Esgotamento autista\" (autistic burnout) se refere a:", ["Exaustão crônica pelo esforço sustentado de manter o mascaramento social", "Um sinônimo direto de burnout ocupacional, sem qualquer diferença", "Um sintoma exclusivamente físico, sem relação com mascaramento", "Uma condição que nunca ocorre em pessoas com diagnóstico tardio"]],
    ["Instrumento específico pra diagnóstico tardio de TEA em adultos:", ["RAADS-R", "PCL-R", "Y-BOCS", "PDSS"]],
    ["O que diferencia TEA de TOC (Módulo 4.8) em relação a rotinas e rituais?", ["No TEA, rotinas servem à previsibilidade sensorial; no TOC, servem à redução de ansiedade sobre conteúdo obsessivo", "Não há diferença clínica relevante entre eles", "TOC nunca envolve qualquer tipo de rotina", "TEA nunca envolve comportamentos repetitivos"]],
    ["O que diferencia TEA de TP Esquizoide (Módulo 4.11)?", ["TEA envolve diferença de processamento social, com desejo de conexão frequentemente presente", "Não há diferença clínica relevante entre eles", "TP Esquizoide sempre envolve hipersensibilidade sensorial", "TEA nunca envolve dificuldade de leitura social"]],
    ["A abordagem afirmativa de neurodiversidade, adotada nesse módulo, tem como objetivo central:", ["Reduzir sofrimento e aumentar bem-estar dentro do próprio perfil neurológico, não normalizar comportamento", "Fazer a pessoa autista parecer neurotípica o mais rápido possível", "Eliminar completamente interesses específicos e intensos", "Forçar mascaramento social constante como meta terapêutica"]],
    ["Diante de sobrecarga sensorial em ambiente barulhento, o passo \"acomodações sensoriais\" recomenda:", ["Ajustar ativamente o ambiente, em vez de pedir que o paciente apenas tolere mais", "Ignorar completamente a queixa sensorial relatada", "Expor o paciente ao estímulo sem qualquer ajuste, como única estratégia", "Eliminar qualquer ferramenta de autorregulação sensorial usada pelo paciente"]],
    ["A comorbidade informalmente chamada de \"AuDHD\" se refere à combinação de:", ["TEA e TDAH (Módulo 4.22) concomitantes", "TEA e Transtorno Bipolar (Módulo 4.20) exclusivamente", "TDAH e TOC (Módulo 4.8) exclusivamente", "Uma condição sem qualquer base em comorbidade real"]],
  ];
  const gabaritoObjetivas = ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a"];

  const children = [
    ...doc.capa(KICKER, "Avaliação — TEA em Adultos", `Avaliação formativa de encerramento do Módulo ${MOD}.`),
    doc.infoBox([
      ["Nota de corte:", "70 de 100 pontos"],
      ["Tempo sugerido:", "40 minutos"],
      ["Composição:", "10 questões objetivas (6 pts cada = 60 pts) + 1 questão de caso (40 pts)"],
      ["Consulta:", "Material da aula permitido; discussão entre colegas, não"],
    ]),
    doc.tituloH1("Parte 1 — Questões objetivas"),
  ];
  objetivas.forEach((q, i) => children.push(...doc.questaoObjetiva(i + 1, q[0], q[1])));

  children.push(
    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    doc.tituloH1("Parte 2 — Questão de caso (40 pontos)"),
    doc.vinhetaBox("Pedro, 41 anos, procura terapia após ser demitido, relatando que \"nunca entendi as regras não-ditas do escritório\". Tem um interesse muito específico por trens antigos desde a infância, ao qual dedica horas diárias, e descreve dificuldade extrema de improvisar conversas de \"small talk\". Relata que sempre preferiu rotinas fixas e se sente extremamente incomodado com mudanças de última hora na agenda."),
    new doc.Paragraph({ spacing: { before: 240 }, children: [new doc.TextRun({ text: "Com base no protocolo estudado, responda:", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    new doc.Paragraph({ spacing: { before: 220, after: 40 }, children: [new doc.TextRun({ text: "a) (10 pts) Identifique os 3 traços centrais do TEA presentes na vinheta.", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "b) (10 pts) Que encaminhamento você faria pra confirmar o diagnóstico de forma robusta?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "c) (10 pts) Descreva como você aplicaria o passo 1 (psicoeducação afirmativa) com Pedro, considerando a demissão recente.", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "d) (10 pts) Sugira uma estratégia prática de autodefesa/comunicação (passo 4) pro contexto de trabalho de Pedro.", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    new doc.Paragraph({ spacing: { after: 40 }, children: [new doc.TextRun({ text: "USO EXCLUSIVO DO INSTRUTOR — remover antes de aplicar a prova", bold: true, color: doc.TERRA, font: doc.FONT, size: 20 })] }),
    doc.tituloH1("Gabarito"),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 1 — Questões objetivas", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 200 }, children: [new doc.TextRun({ text: gabaritoObjetivas.map((r, i) => `${i + 1}-${r}`).join("   ·   "), font: doc.FONT, size: 22, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 2 — Critério de correção da questão de caso", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "a) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Comunicação social diferente (dificuldade com regras não-ditas, small talk), padrões restritos/repetitivos (interesse intenso por trens, preferência por rotina fixa), e indícios de processamento sensorial/cognitivo diferente (desconforto extremo com mudanças de agenda).", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "b) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Avaliação neuropsicológica formal pra confirmação diagnóstica robusta, considerando também investigar TDAH concomitante.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "c) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Reformular a dificuldade com \"regras não-ditas\" como diferença de processamento social, não falha pessoal — ajudando Pedro a entender a demissão nesse contexto, sem reforçar autocrítica.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "d) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Ex: construir com Pedro uma forma clara de comunicar a preferência por instruções explícitas e antecedência em mudanças de agenda em futuros ambientes de trabalho.", font: doc.FONT, size: 21, color: doc.INK })] }),
  );

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-4.27-Avaliacao.docx");
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
      n: 1, titulo: "Uma diferença de processamento, não um déficit", duracao: "12 min", slides: "1, 2, 3, 4",
      objetivo: "Sair sabendo explicar o mecanismo do TEA sem jargão, e adotar a perspectiva afirmativa de neurodiversidade desde a primeira aula.",
      segmentos: [
        seg("0:00–0:45", "Abertura (gancho)", [{ fala: "Muitos adultos autistas, especialmente mulheres, passam décadas mascarando suas diferenças com tanta eficiência que só descobrem o motivo do próprio esgotamento crônico depois dos 30 anos." }]),
        seg("0:45–2:00", "Por que a perspectiva afirmativa importa", ["O objetivo não é fazer a pessoa parecer neurotípica.", "É reduzir sofrimento e construir acomodações reais."]),
        seg("2:00–8:00", "Como o cérebro autista processa o mundo (mostrar slide 4)", [
          "Menor conectividade de longo alcance, maior conectividade local.",
          "Processamento sensorial com hiper ou hipossensibilidade a estímulos.",
          "Processamento social como estilo diferente, não deficitário.",
          "Menor filtragem automática de estímulos \"esperados\".",
        ]),
        seg("8:00–10:30", "Um ponto importante", ["Isso explica o esgotamento acumulado ao longo de um dia, não fraqueza pessoal."]),
        seg("10:30–12:00", "Fechamento", [{ fala: "Próxima aula: por que tantos adultos só descobrem isso tarde." }]),
      ],
    },
    {
      n: 2, titulo: "Do mascaramento precoce ao diagnóstico tardio", duracao: "10 min", slides: "5",
      objetivo: "Explicar a cadeia entre mascaramento, esgotamento autista e diagnóstico tardio.",
      segmentos: [
        seg("0:00–1:00", "Retomada rápida", ["Vimos as estruturas envolvidas. Hoje vemos por que o diagnóstico costuma vir tarde."]),
        seg("1:00–6:30", "A cadeia (mostrar slide 5)", ["Diferenças desde a infância, frequentemente não reconhecidas em meninas.", "Desenvolvimento do mascaramento pra parecer \"encaixar\".", "Esgotamento autista pelo esforço sustentado.", "Diagnóstico tardio, após anos de ansiedade/depressão mal compreendidas."]),
        seg("6:30–9:00", "Esgotamento autista versus burnout ocupacional", ["São conceitos diferentes, embora possam coexistir — vale diferenciar na prática clínica."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: os 3 traços centrais do TEA em adultos." }]),
      ],
    },
    {
      n: 3, titulo: "Os 3 traços centrais", duracao: "10 min", slides: "6",
      objetivo: "Reconhecer comunicação social diferente, padrões restritos/repetitivos e processamento sensorial diferente.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três traços — e um conceito que reformula a ideia de \"déficit social\"."]),
        seg("1:00–7:00", "Os 3 traços (mostrar slide 6)", [
          "Comunicação social diferente: estilo comunicativo distinto, não déficit.",
          "Padrões restritos e repetitivos: interesses intensos, necessidade de rotina.",
          "Processamento sensorial diferente: hiper ou hipossensibilidade a estímulos.",
        ]),
        seg("7:00–9:00", "O problema da dupla empatia", ["A dificuldade de comunicação é bidirecional — não é falha unilateral da pessoa autista."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: como reconhecer esse padrão nas 4 dimensões clínicas." }]),
      ],
    },
    {
      n: 4, titulo: "Sinais de alerta", duracao: "10 min", slides: "7",
      objetivo: "Reconhecer sinais cognitivos, comportamentais, relacionais e físicos do TEA em adultos.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Reconhecer o padrão com precisão orienta a diferenciação com outros quadros, o próximo passo."]),
        seg("1:00–7:30", "As 4 categorias (mostrar slide 7)", [
          "Cognitivo: pensamento literal, interesses intensos, dificuldade com ambiguidade implícita.",
          "Comportamental: necessidade de rotina, comportamentos repetitivos de autorregulação.",
          "Relacional: dificuldade de leitura de pistas não-verbais, fadiga social.",
          "Físico: hiper ou hipossensibilidade sensorial.",
        ]),
        seg("7:30–9:00", "Por que isso importa", ["Esses sinais, presentes desde cedo mesmo que não reconhecidos, sustentam a investigação diagnóstica."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: como diferenciar de quadros parecidos." }]),
      ],
    },
    {
      n: 5, titulo: "Diagnóstico diferencial rápido", duracao: "11 min", slides: "8",
      objetivo: "Diferenciar TEA de Ansiedade Social, TOC e TP Esquizoide.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Um filtro rápido — a origem da fadiga social é a chave de uma dessas diferenciações."]),
        seg("1:00–8:00", "Os 3 comparativos (mostrar slide 8)", [
          "Ansiedade Social: esgotamento no TEA tem origem sensorial/de processamento, não medo de julgamento.",
          "TOC (Módulo 4.8): rotinas servem à previsibilidade sensorial, não à redução de ansiedade obsessiva.",
          "TP Esquizoide (Módulo 4.11): TEA envolve diferença de processamento, com desejo de conexão frequentemente presente.",
        ]),
        seg("8:00–10:30", "Por que essas diferenciações importam", ["Mudam completamente a leitura da motivação por trás do comportamento observado."]),
        seg("10:30–11:00", "Fechamento", [{ fala: "Próxima aula: os instrumentos que confirmam essa leitura com dado." }]),
      ],
    },
    {
      n: 6, titulo: "Instrumentos e confirmação diagnóstica", duracao: "11 min", slides: "9",
      objetivo: "Saber quando usar AQ, RAADS-R e avaliação neuropsicológica formal.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Dois instrumentos e uma avaliação formal — do rastreio rápido à confirmação diagnóstica."]),
        seg("1:00–4:30", "AQ", ["Triagem rápida de traços do espectro autista."]),
        seg("4:30–7:30", "RAADS-R", ["Específico pra diagnóstico tardio em adultos."]),
        seg("7:30–10:00", "Avaliação neuropsicológica", ["Necessária pra confirmação diagnóstica robusta — conecta ao Bloco 2 do currículo."]),
        seg("10:00–11:00", "Fechamento", [{ fala: "Próxima aula: colocamos tudo em prática — psicoeducação afirmativa e redução do mascaramento." }]),
      ],
    },
    {
      n: 7, titulo: "Manejo — psicoeducação afirmativa e redução do mascaramento", duracao: "13 min", slides: "10, 11",
      objetivo: "Aplicar os passos 1 e 2 do manejo, numa perspectiva afirmativa de neurodiversidade.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["A parte central desse módulo, com a virada de perspectiva mais importante. Hoje, os 2 primeiros passos."]),
        seg("1:00–2:00", "Visão geral (mostrar slide 10)", ["Psicoeducação afirmativa → Reduzir o mascaramento → Acomodações sensoriais → Autodefesa e comunicação.", "O objetivo nunca é normalizar comportamento."]),
        seg("2:00–7:30", "Passo 1 — Psicoeducação afirmativa (mostrar slide 11, esquerda)", [{ fala: "O que você chamava de estranheza pode ser, na verdade, um jeito diferente e válido de processar o mundo — não menos legítimo que o padrão mais comum." }]),
        seg("7:30–13:00", "Passo 2 — Reduzir o mascaramento (mostrar slide 11, direita)", ["Identifique contextos onde o mascaramento é mais custoso, e onde reduzi-lo é seguro.", "Trabalhe o reconhecimento precoce de sinais de esgotamento autista."]),
        seg("13:00–13:00", "Fechamento", [{ fala: "Próxima aula: acomodações sensoriais e autodefesa." }]),
      ],
    },
    {
      n: 8, titulo: "Manejo — acomodações sensoriais e autodefesa", duracao: "13 min", slides: "12",
      objetivo: "Trabalhar ajustes ambientais práticos e comunicação de necessidades.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Hoje fechamos o manejo com os ajustes mais concretos do dia a dia."]),
        seg("1:00–7:00", "Passo 3 — Acomodações sensoriais (mostrar slide 12, esquerda)", ["Ajuste ativamente o ambiente, em vez de pedir que o paciente apenas tolere mais.", "Valide o uso de ferramentas de autorregulação sensorial."]),
        seg("7:00–13:00", "Passo 4 — Autodefesa e comunicação (mostrar slide 12, direita)", ["Apoie a construção de linguagem clara pra comunicar necessidades.", "Trabalhe scripts práticos pra situações sociais recorrentes, quando útil."]),
        seg("13:00–13:00", "Fechamento", [{ fala: "Manejo completo. Próxima aula: um caso real e os critérios de quando escalar." }]),
      ],
    },
    {
      n: 9, titulo: "Estudo de caso, encaminhamento e recap", duracao: "15 min", slides: "13, 14, 15",
      objetivo: "Integrar mecanismo, instrumento e manejo num caso completo, com ênfase na confirmação diagnóstica formal.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Última aula do módulo. Caso completo e os critérios de quando aprofundar ou referenciar."]),
        seg("1:00–7:00", "Estudo de caso — Juliana (mostrar slide 13)", ["Leia a vinheta com calma.", "Percorra as 3 perguntas de discussão.", "Convide o aluno a pausar e responder por escrito."]),
        seg("7:00–11:00", "Quando encaminhar (mostrar slide 14)", ["Percorra os 4 critérios, com atenção à confirmação diagnóstica formal e à comorbidade com TDAH."]),
        seg("11:00–14:00", "Recapitulando o módulo (mostrar slide 15)", ["Retome os 4 pontos-chave.", "Reforce a reformulação central: reduzir sofrimento dentro do próprio perfil neurológico, não normalizar."]),
        seg("14:00–15:00", "Fechamento do módulo", [{ fala: "Agora é hora dos exercícios e da avaliação. Com isso, encerramos esta expansão temática de protocolos clínicos." }]),
      ],
    },
  ];

  const totalMin = 12 + 10 + 10 + 10 + 11 + 11 + 13 + 13 + 15;

  const children = [
    ...doc.capa(KICKER, "Roteiro de Aulas — TEA em Adultos", "Módulo dividido em 9 vídeo-aulas de 10 a 15 minutos, seguindo os slides já produzidos. Cada aula tem roteiro cronometrado, pronto pra gravação."),
    new doc.Paragraph({
      spacing: { before: 60, after: 200 },
      children: [new doc.TextRun({
        text: "Nota importante: este módulo adota a perspectiva afirmativa de neurodiversidade. Evite linguagem que trate o autismo como deficiência a ser corrigida — o objetivo é acomodação e bem-estar, não normalização.",
        italics: true, bold: true, color: doc.TERRA, font: doc.FONT, size: 20,
      })],
    }),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "Duração total do módulo em vídeo: ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: `${totalMin} minutos (${(totalMin / 60).toFixed(1)}h) em 9 aulas`, font: doc.FONT, size: 21, color: doc.INK })] }),
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

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", `${RODAPE_DOC} — Roteiro de Aulas`, children), "Modulo-4.27-Roteiro-Aulas.docx");
}

// ============================================================
Promise.resolve()
  .then(construirDeck)
  .then(construirExercicios)
  .then(construirProva)
  .then(construirRoteiro)
  .then(() => console.log("TUDO PRONTO"))
  .catch((e) => { console.error(e); process.exit(1); });

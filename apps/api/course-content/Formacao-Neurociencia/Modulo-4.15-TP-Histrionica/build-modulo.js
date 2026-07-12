const deck = require("../_lib/lib-deck.js");
const doc = require("../_lib/lib-doc.js");

const MOD = "4.15";
const NOME = "Transtorno de Personalidade Histriônica";
const RODAPE_DECK = `TP Histriônica — Módulo ${MOD}`;
const RODAPE_DOC = `Módulo ${MOD} — TP Histriônica`;
const KICKER = "MÓDULO 4.15 · TRANSTORNOS DE PERSONALIDADE · CLUSTER B";

// ============================================================
// 1) SLIDE DECK
// ============================================================
function construirDeck() {
  const pres = deck.novaApresentacao(`${NOME} — Da Neurociência ao Manejo`);

  deck.slideTitulo(pres, {
    moduloLabel: `Módulo ${MOD} · Cluster B · Transtornos de Personalidade`,
    titulo: "TP Histriônica",
    subtitulo: "Atenção, emoção e autoestima não-contingente",
    passos: ["Mecanismo", "Sinais", "Instrumento", "Manejo", "Encaminhamento"],
  });

  deck.slideRoteiro(pres, {
    rodape: RODAPE_DECK, pageNum: 2,
    cards: [
      { titulo: "Mecanismo", desc: "Por que a atenção externa vira necessidade" },
      { titulo: "Sinais", desc: "Dramatização, sedução e vínculos superficiais" },
      { titulo: "Instrumento", desc: "PID-5, SCID-5-PD e MCMI-IV na prática" },
      { titulo: "Manejo", desc: "4 passos, sem reforçar a dramatização" },
      { titulo: "Encaminhamento", desc: "Quando aprofundar e quando referenciar" },
    ],
  });

  deck.slideHook(pres, {
    rodape: RODAPE_DECK, pageNum: 3,
    frase: "No TP Histriônico, a autoestima não é construída de dentro pra fora — ela depende, momento a momento, de quanto de atenção o ambiente está devolvendo.",
    apoio: "Isso muda completamente como pensamos o manejo: não é sobre reduzir o \"drama\", é sobre construir uma fonte de valor pessoal que não dependa de plateia.",
  });

  deck.slideCircuito(pres, {
    rodape: RODAPE_DECK, pageNum: 4,
    titulo: "Por que a atenção externa se torna necessidade",
    regioes: [
      { label: "Sistema de recompensa (hiper-responsivo à atenção/aprovação social)", rx: 0.20, ry: 0.22, color: deck.TERRA, d: 0.5 },
      { label: "Sistema límbico (alta reatividade emocional expressiva)", rx: 0.22, ry: 0.62, color: deck.NAVY, d: 0.4 },
      { label: "Córtex pré-frontal (controle cognitivo reduzido no processamento social)", rx: 0.60, ry: 0.60, color: deck.NAVY_TINT, d: 0.36 },
      { label: "Circuito de sugestionabilidade (alta permeabilidade a pistas externas)", rx: 0.58, ry: 0.24, color: deck.TERRA_TINT, d: 0.36 },
    ],
    notas: [
      "O sistema de recompensa responde de forma amplificada a sinais de atenção e aprovação social — a atenção alheia funciona quase como reforçador primário.",
      "A alta reatividade límbica se traduz em expressão emocional intensa e rapidamente visível, mesmo diante de estímulos moderados.",
      "O controle cognitivo reduzido no processamento social contribui pra sugestionabilidade — opiniões e humor mudam com facilidade conforme o contexto interpessoal.",
    ],
  });

  deck.slideCadeia(pres, {
    rodape: RODAPE_DECK, pageNum: 5,
    titulo: "Da recompensa social à dependência de plateia",
    elos: [
      { titulo: "Temperamento sensível à recompensa social", desc: "Alta responsividade a atenção e aprovação desde cedo" },
      { titulo: "Reforço precoce do comportamento dramático", desc: "Comportamentos expressivos/chamativos recebem atenção consistente do ambiente" },
      { titulo: "Autoestima ancorada na atenção externa", desc: "O senso de valor pessoal passa a depender de validação momento a momento" },
      { titulo: "TP Histriônica", desc: "Padrão pervasivo de busca de atenção e emocionalidade excessiva" },
    ],
    notaFinal: "Diferente do TP Narcisista, aqui a necessidade não é de admiração por grandiosidade — é de atenção em si, de qualquer natureza, inclusive negativa.",
  });

  deck.slideCategorias(pres, {
    rodape: RODAPE_DECK, pageNum: 6,
    titulo: "3 traços centrais",
    categorias: [
      { titulo: "Busca excessiva de atenção", desc: "Desconforto genuíno quando não é o centro das atenções", color: deck.TERRA },
      { titulo: "Emocionalidade dramática", desc: "Expressão emocional intensa, rápida e por vezes desproporcional", color: deck.NAVY },
      { titulo: "Sugestionabilidade", desc: "Opiniões e humor facilmente influenciados pelo contexto ou por outras pessoas", color: deck.NAVY_TINT },
    ],
    notaFinal: "Esses traços não são \"escolhas\" conscientes de manipular — são a expressão de uma autoestima que nunca aprendeu a ser autossustentada.",
  });

  deck.slideSinais(pres, {
    rodape: RODAPE_DECK, pageNum: 7,
    titulo: "Como reconhecer o padrão na prática",
    itens: [
      { titulo: "Cognitivo", desc: "Pensamento impressionista, vago, carente de detalhe e de análise crítica" },
      { titulo: "Comportamental", desc: "Dramatização, comportamento sedutor ou provocativo fora de contexto" },
      { titulo: "Relacional", desc: "Vínculos percebidos como mais íntimos do que realmente são" },
      { titulo: "Físico", desc: "Uso ativo da aparência física pra atrair e manter atenção" },
    ],
  });

  deck.slideDiferencial(pres, {
    rodape: RODAPE_DECK, pageNum: 8,
    titulo: "Diagnóstico diferencial rápido",
    cards: [
      { titulo: "TP Borderline", desc: "Histriônica sem autolesão crônica nem instabilidade extrema de identidade" },
      { titulo: "TP Narcisista", desc: "Histriônica busca atenção em geral; narcisista busca admiração específica por grandiosidade" },
      { titulo: "TDAH em adultos", desc: "Impulsividade sem o componente central de busca dramática de atenção interpessoal" },
    ],
  });

  deck.slideInstrumentos(pres, {
    rodape: RODAPE_DECK, pageNum: 9,
    titulo: "Três instrumentos, três finalidades",
    instrumentos: [
      { sigla: "PID-5", nome: "Personality Inventory for DSM-5", desc: "Mapeia os traços patológicos de forma dimensional." },
      { sigla: "SCID-5-PD", nome: "Entrevista Estruturada", desc: "Padrão-ouro pra diagnóstico categorial formal." },
      { sigla: "MCMI-IV", nome: "Millon Clinical Multiaxial Inventory", desc: "Bom pra capturar o estilo de personalidade de forma ampla, além do diagnóstico categorial." },
    ],
  });

  deck.slideProtocoloOverview(pres, {
    rodape: RODAPE_DECK, pageNum: 10,
    titulo: "Do mecanismo ao manejo: 4 passos",
    passos: [
      { titulo: "Validar sem\nreforçar drama", desc: "Reconhecer a emoção sem alimentar a intensificação teatral dela" },
      { titulo: "Tolerância\nà neutralidade", desc: "Construir capacidade de estar bem sem ser o centro das atenções" },
      { titulo: "Autoestima\nnão-contingente", desc: "Fontes internas de valor pessoal, não dependentes de plateia" },
      { titulo: "Estrutura e\nlimites claros", desc: "Contrato terapêutico consistente, sem dramatizações no vínculo" },
    ],
    notaFinal: "O maior erro técnico aqui é reforçar, sem perceber, o próprio padrão que se está tentando tratar — reagindo com intensidade extra ao drama do paciente.",
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 11,
    titulo: "Passos 1 e 2, na prática",
    colunas: [
      {
        numero: 1, titulo: "Validar sem reforçar o drama",
        fala: "“Percebo que isso foi importante pra você — vamos entender o que realmente aconteceu, com calma.”",
        bullets: ["Valide a emoção genuína por trás da dramatização, sem validar a intensificação teatral em si", "Mantenha o tom da sessão estável, mesmo quando o paciente escala"],
      },
      {
        numero: 2, titulo: "Tolerância à neutralidade",
        bullets: ["Exponha gradualmente a situações sociais neutras, sem papel de destaque, como treino de tolerância", "Trabalhe o desconforto de \"não ser o centro\" como habilidade, não como ameaça"],
      },
    ],
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 12,
    titulo: "Passos 3 e 4, na prática",
    colunas: [
      {
        numero: 3, titulo: "Autoestima não-contingente",
        bullets: ["Ajude o paciente a identificar valores e conquistas que não dependem da reação de outras pessoas", "Trabalhe a diferença entre \"ser visto\" e \"ser valorizado por quem se é\""],
      },
      {
        numero: 4, titulo: "Estrutura e limites claros",
        fala: "“Nosso combinado continua o mesmo, independente de como a sessão de hoje começou.”",
        bullets: ["Mantenha horários, duração e regras da terapia estáveis, sem exceções dramáticas", "Consistência do terapeuta modela a própria regulação que está sendo trabalhada"],
      },
    ],
  });

  deck.slideCaso(pres, {
    rodape: RODAPE_DECK, pageNum: 13,
    vinheta: "Larissa, 30 anos, chega à sessão em prantos, contando uma história confusa e cheia de detalhes vagos sobre um desentendimento no trabalho, dizendo que \"foi a pior coisa que já aconteceu\" com ela. No meio do relato, muda de assunto e comenta como está se sentindo bonita hoje. Relata que se sente \"invisível\" quando não é o centro das conversas em grupo, e que já teve vários relacionamentos rápidos e intensos que \"pareciam mais sérios do que realmente eram\".",
    perguntas: [
      "Que elementos da vinheta ilustram os 3 traços centrais do TP Histriônico?",
      "Como você distinguiria esse quadro de um TP Borderline, com base no que está (e no que não está) presente na vinheta?",
      "Que resposta terapêutica, no passo 1 (validar sem reforçar), você daria ao relato inicial de Larissa?",
    ],
  });

  deck.slideEncaminhamento(pres, {
    rodape: RODAPE_DECK, pageNum: 14,
    criterios: [
      "Sintomas depressivos significativos quando a atenção externa não vem — investigar risco associado",
      "Comorbidade com TP Borderline ou uso de substâncias, relativamente comuns nesse perfil",
      "Padrão de relações interpessoais gerando prejuízo funcional recorrente (trabalho, vínculos de longo prazo)",
      "Considerar terapia de longo prazo com foco em esquemas, quando a autoestima contingente estiver muito enraizada",
    ],
  });

  deck.slideRecap(pres, {
    rodape: RODAPE_DECK, pageNum: 15,
    pontos: [
      "No TP Histriônico, a autoestima depende momento a momento da atenção externa recebida",
      "Busca excessiva de atenção, emocionalidade dramática e sugestionabilidade são os 3 traços centrais",
      "PID-5, SCID-5-PD e MCMI-IV estruturam a avaliação dimensional e categorial",
      "O manejo evita reforçar o drama e constrói, aos poucos, uma autoestima não-contingente à plateia",
    ],
    proximoTexto: "Próximo: exercícios práticos e avaliação do Módulo 4.15 →",
  });

  return pres.writeFile({ fileName: "Modulo-4.15-TP-Histrionica.pptx" });
}

// ============================================================
// 2) EXERCÍCIOS
// ============================================================
function construirExercicios() {
  const children = [
    ...doc.capa(KICKER, "Exercícios — TP Histriônica", "Resolva individualmente antes da sessão de supervisão. O objetivo é testar sua leitura do mecanismo e do manejo antes de comparar com a discussão em grupo — não há problema em errar."),

    doc.exNum(1, "O mecanismo, em suas palavras"),
    doc.pergunta(1, "Explique em até 3 frases, sem jargão técnico, por que a atenção externa se torna uma necessidade nesse perfil."),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Por que se diz que a autoestima aqui é \"não-contingente\" o objetivo do tratamento, e não o oposto?"),
    ...doc.linhaResposta(2),

    doc.exNum(2, "Diagnóstico diferencial"),
    doc.vinhetaBox("Uma paciente busca constantemente ser o centro das atenções em qualquer ambiente social, mas não apresenta autolesão, instabilidade extrema de identidade nem medo intenso de abandono."),
    doc.pergunta(1, "TP Histriônica ou TP Borderline? Justifique com base no que está ausente na vinheta."),
    ...doc.linhaResposta(2),

    doc.exNum(3, "Validar sem reforçar"),
    doc.vinhetaBox("Um paciente chega à sessão contando, de forma muito dramática, um pequeno atraso de ônibus como se fosse uma catástrofe."),
    doc.pergunta(1, "Escreva uma resposta terapêutica que valide a emoção genuína sem reforçar a intensificação teatral."),
    ...doc.linhaResposta(3),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),

    doc.exNum(4, "Os 4 passos do manejo"),
    doc.tabelaSimples(["Passo", "Ação concreta na prática"], [["Validar sem reforçar", ""], ["Tolerância à neutralidade", ""], ["Autoestima não-contingente", ""], ["Estrutura e limites claros", ""]], [3200, 6150]),

    doc.exNum(5, "Caso integrado — Larissa"),
    doc.vinhetaBox("Larissa, 30 anos, chega em prantos com relato confuso e cheio de detalhes vagos, muda de assunto no meio da fala, sente-se \"invisível\" fora do centro das atenções, e tem histórico de relacionamentos rápidos e intensos."),
    doc.pergunta(1, "Identifique os 3 traços centrais presentes na vinheta."),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Descreva como você aplicaria o passo 1 (validar sem reforçar) no relato inicial de Larissa."),
    ...doc.linhaResposta(2),
    doc.pergunta(3, "Que sinal, se presente no caso, justificaria investigar risco de sintomas depressivos associados?"),
    ...doc.linhaResposta(2),
  ];

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-4.15-Exercicios.docx");
}

// ============================================================
// 3) AVALIAÇÃO
// ============================================================
function construirProva() {
  const objetivas = [
    ["No TP Histriônico, o sistema de recompensa tende a apresentar:", ["Resposta amplificada à atenção e aprovação social", "Resposta reduzida a qualquer estímulo social", "Nenhuma alteração relevante em relação à população geral", "Hiperfunção exclusivamente durante o sono"]],
    ["Os 3 traços centrais do TP Histriônico são:", ["Busca excessiva de atenção, emocionalidade dramática, sugestionabilidade", "Grandiosidade, necessidade de admiração, falta de empatia", "Desconsideração por normas, falta de remorso, impulsividade", "Desconfiança generalizada, hipervigilância, rancor persistente"]],
    ["O que diferencia TP Histriônica de TP Narcisista?", ["Não há diferença clínica relevante entre eles", "Histriônica busca atenção em geral; narcisista busca admiração específica por grandiosidade", "Narcisista sempre apresenta comportamento sedutor", "Histriônica nunca busca validação externa"]],
    ["Pensamento impressionista, vago e carente de detalhe é um sinal de qual categoria clínica desse perfil?", ["Cognitivo", "Comportamental", "Relacional", "Físico"]],
    ["Instrumento útil pra capturar o estilo de personalidade de forma ampla, além do diagnóstico categorial:", ["MCMI-IV", "PCL-R", "Y-BOCS", "MBI"]],
    ["O que diferencia TP Histriônica de TDAH em adultos?", ["Não há diferença clínica relevante entre eles", "TDAH não tem o componente central de busca dramática de atenção interpessoal", "TDAH sempre envolve dramatização intensa", "Histriônica nunca envolve impulsividade"]],
    ["Qual é o principal risco técnico do terapeuta ao atender esse perfil?", ["Reforçar, sem perceber, o próprio padrão de dramatização que está sendo tratado", "Ser excessivamente frio e distante desde a primeira sessão", "Recusar-se a validar qualquer emoção do paciente", "Encerrar o vínculo terapêutico na primeira sessão"]],
    ["\"Tolerância à neutralidade\", no manejo desse perfil, significa:", ["Construir capacidade de estar bem sem ser o centro das atenções", "Evitar completamente qualquer interação social", "Reprimir toda expressão emocional do paciente", "Aumentar a exposição a situações de destaque social"]],
    ["A meta do passo \"autoestima não-contingente\" é:", ["Construir fontes internas de valor pessoal, não dependentes da reação de outras pessoas", "Aumentar a dependência da aprovação externa", "Eliminar completamente a autoestima do paciente", "Focar exclusivamente na aparência física"]],
    ["Diante de sintomas depressivos quando a atenção externa não vem, o módulo recomenda:", ["Investigar o risco associado a esses sintomas", "Ignorar, pois é esperado nesse perfil", "Reduzir a frequência das sessões automaticamente", "Encaminhar apenas para tratamento estético"]],
  ];
  const gabaritoObjetivas = ["a", "a", "b", "a", "a", "b", "a", "a", "a", "a"];

  const children = [
    ...doc.capa(KICKER, "Avaliação — TP Histriônica", `Avaliação formativa de encerramento do Módulo ${MOD}.`),
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
    doc.vinhetaBox("Rafael, 26 anos, relata que se sente \"apagado\" quando não é notado em festas ou reuniões de trabalho, e descreve suas próprias emoções como \"muito intensas, mas que passam rápido\". Conta suas histórias de forma vívida e cheia de exagero, mas tem dificuldade de lembrar detalhes específicos quando questionado. Já terminou relacionamentos de poucos meses descrevendo-os como \"o amor da minha vida\"."),
    new doc.Paragraph({ spacing: { before: 240 }, children: [new doc.TextRun({ text: "Com base no protocolo estudado, responda:", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    new doc.Paragraph({ spacing: { before: 220, after: 40 }, children: [new doc.TextRun({ text: "a) (10 pts) Identifique os 3 traços centrais do TP Histriônico presentes na vinheta.", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "b) (10 pts) Que diagnóstico diferencial você consideraria e descartaria, e com base em quê?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "c) (10 pts) Descreva como aplicaria o passo 2 (tolerância à neutralidade) com Rafael.", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "d) (10 pts) Que pergunta você faria pra começar a trabalhar autoestima não-contingente (passo 3) com Rafael?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    new doc.Paragraph({ spacing: { after: 40 }, children: [new doc.TextRun({ text: "USO EXCLUSIVO DO INSTRUTOR — remover antes de aplicar a prova", bold: true, color: doc.TERRA, font: doc.FONT, size: 20 })] }),
    doc.tituloH1("Gabarito"),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 1 — Questões objetivas", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 200 }, children: [new doc.TextRun({ text: gabaritoObjetivas.map((r, i) => `${i + 1}-${r}`).join("   ·   "), font: doc.FONT, size: 22, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 2 — Critério de correção da questão de caso", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "a) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Busca de atenção (sentir-se \"apagado\"), emocionalidade dramática (emoções intensas, relatos vívidos e exagerados), sugestionabilidade/impressionismo (dificuldade de detalhes específicos).", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "b) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "TP Borderline poderia ser considerado pela intensidade emocional e pelos relacionamentos rápidos e intensos, mas é descartado pela ausência de autolesão e de instabilidade extrema de identidade na vinheta.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "c) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Expor gradualmente Rafael a situações sociais neutras, sem papel de destaque, trabalhando o desconforto de \"não ser notado\" como habilidade a ser desenvolvida.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "d) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Ex: \"O que você valoriza em si mesmo que não depende de estar sendo notado por outras pessoas agora?\" — abrindo espaço pra fontes internas de valor pessoal.", font: doc.FONT, size: 21, color: doc.INK })] }),
  );

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-4.15-Avaliacao.docx");
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
      n: 1, titulo: "Por que a atenção externa vira necessidade", duracao: "12 min", slides: "1, 2, 3, 4",
      objetivo: "Sair sabendo explicar o mecanismo do TP Histriônico sem jargão, e reformular o \"drama\" como sintoma, não escolha.",
      segmentos: [
        seg("0:00–0:45", "Abertura (gancho)", [{ fala: "No TP Histriônico, a autoestima não é construída de dentro pra fora — ela depende, momento a momento, de quanto de atenção o ambiente está devolvendo." }]),
        seg("0:45–2:00", "Por que isso importa clinicamente", ["Muda o objetivo do manejo: não é reduzir o drama, é construir uma fonte de valor pessoal que não dependa de plateia."]),
        seg("2:00–8:00", "Por que a atenção vira necessidade (mostrar slide 4)", [
          "Sistema de recompensa hiper-responsivo à atenção/aprovação social.",
          "Sistema límbico com alta reatividade emocional expressiva.",
          "Córtex pré-frontal com controle cognitivo reduzido no processamento social.",
          "Circuito de sugestionabilidade, com alta permeabilidade a pistas externas.",
        ]),
        seg("8:00–10:30", "Um ponto importante", ["Isso não é manipulação consciente — é uma autoestima que nunca aprendeu a se autossustentar."]),
        seg("10:30–12:00", "Fechamento", [{ fala: "Próxima aula: como esse padrão se consolida ao longo do desenvolvimento." }]),
      ],
    },
    {
      n: 2, titulo: "Da recompensa social à dependência de plateia", duracao: "10 min", slides: "5",
      objetivo: "Explicar como o reforço precoce do comportamento dramático consolida a dependência de atenção externa.",
      segmentos: [
        seg("0:00–1:00", "Retomada rápida", ["Vimos as estruturas envolvidas. Hoje vemos como o padrão se forma ao longo do tempo."]),
        seg("1:00–6:30", "A cadeia (mostrar slide 5)", ["Temperamento sensível à recompensa social, desde cedo.", "Reforço precoce do comportamento dramático pelo ambiente.", "Autoestima ancorada na atenção externa.", "TP Histriônica: padrão pervasivo de busca de atenção e emocionalidade excessiva."]),
        seg("6:30–9:00", "Diferença central com o narcisismo", ["Aqui a necessidade não é de admiração por grandiosidade — é de atenção em si, de qualquer natureza, inclusive negativa."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: os 3 traços centrais do TP Histriônico." }]),
      ],
    },
    {
      n: 3, titulo: "Os 3 traços centrais", duracao: "10 min", slides: "6",
      objetivo: "Reconhecer busca excessiva de atenção, emocionalidade dramática e sugestionabilidade.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três traços — e um lembrete importante sobre intenção versus sintoma."]),
        seg("1:00–7:00", "Os 3 traços (mostrar slide 6)", [
          "Busca excessiva de atenção: desconforto genuíno quando não é o centro das atenções.",
          "Emocionalidade dramática: expressão emocional intensa, rápida e por vezes desproporcional.",
          "Sugestionabilidade: opiniões e humor facilmente influenciados pelo contexto ou por outros.",
        ]),
        seg("7:00–9:00", "Um lembrete importante", ["Esses traços não são escolhas conscientes de manipular."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: como reconhecer esse padrão nas 4 dimensões clínicas." }]),
      ],
    },
    {
      n: 4, titulo: "Sinais de alerta", duracao: "10 min", slides: "7",
      objetivo: "Reconhecer sinais cognitivos, comportamentais, relacionais e físicos do padrão histriônico.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Reconhecer o padrão com precisão orienta o resto do manejo."]),
        seg("1:00–7:30", "As 4 categorias (mostrar slide 7)", [
          "Cognitivo: pensamento impressionista, vago, carente de detalhe.",
          "Comportamental: dramatização, comportamento sedutor ou provocativo fora de contexto.",
          "Relacional: vínculos percebidos como mais íntimos do que realmente são.",
          "Físico: uso ativo da aparência física pra atrair e manter atenção.",
        ]),
        seg("7:30–9:00", "Por que isso importa", ["Esses sinais, juntos e persistentes, sustentam a hipótese diagnóstica."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: como diferenciar de quadros parecidos." }]),
      ],
    },
    {
      n: 5, titulo: "Diagnóstico diferencial rápido", duracao: "11 min", slides: "8",
      objetivo: "Diferenciar TP Histriônica de TP Borderline, TP Narcisista e TDAH em adultos.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Um filtro rápido — o alvo da busca de atenção é a chave de uma das diferenciações."]),
        seg("1:00–8:00", "Os 3 quadros (mostrar slide 8)", [
          "TP Borderline: histriônica sem autolesão crônica nem instabilidade extrema de identidade.",
          "TP Narcisista: histriônica busca atenção em geral; narcisista busca admiração por grandiosidade.",
          "TDAH em adultos: impulsividade sem o componente central de busca dramática de atenção.",
        ]),
        seg("8:00–10:30", "Por que a diferenciação com narcisismo importa", ["Muda a leitura da motivação central — atenção em si versus admiração específica por grandiosidade."]),
        seg("10:30–11:00", "Fechamento", [{ fala: "Próxima aula: os instrumentos que confirmam essa leitura com dado." }]),
      ],
    },
    {
      n: 6, titulo: "Os 3 instrumentos de avaliação", duracao: "11 min", slides: "9",
      objetivo: "Saber quando usar PID-5, SCID-5-PD e MCMI-IV.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três instrumentos, três finalidades — do mapeamento dimensional ao estilo amplo de personalidade."]),
        seg("1:00–4:30", "PID-5", ["Mapeia os traços patológicos de forma dimensional."]),
        seg("4:30–7:30", "SCID-5-PD", ["Entrevista estruturada.", "Padrão-ouro pra diagnóstico categorial formal."]),
        seg("7:30–10:00", "MCMI-IV", ["Bom pra capturar o estilo de personalidade de forma ampla, além do diagnóstico categorial."]),
        seg("10:00–11:00", "Fechamento", [{ fala: "Próxima aula: colocamos tudo em prática — validar sem reforçar e tolerância à neutralidade." }]),
      ],
    },
    {
      n: 7, titulo: "Manejo — validar sem reforçar e tolerância à neutralidade", duracao: "13 min", slides: "10, 11",
      objetivo: "Aplicar os passos 1 e 2 do manejo, evitando reforçar o padrão de dramatização.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["A parte mais delicada tecnicamente — hoje, os 2 primeiros passos."]),
        seg("1:00–2:00", "Visão geral (mostrar slide 10)", ["Validar sem reforçar drama → Tolerância à neutralidade → Autoestima não-contingente → Estrutura e limites claros.", "O maior erro técnico aqui é reforçar, sem perceber, o próprio padrão que se está tentando tratar."]),
        seg("2:00–7:00", "Passo 1 — Validar sem reforçar (mostrar slide 11, esquerda)", [{ fala: "Percebo que isso foi importante pra você — vamos entender o que realmente aconteceu, com calma." }, "Valide a emoção genuína sem validar a intensificação teatral.", "Mantenha o tom da sessão estável, mesmo quando o paciente escala."]),
        seg("7:00–12:00", "Passo 2 — Tolerância à neutralidade (mostrar slide 11, direita)", ["Exponha gradualmente a situações sociais neutras, sem papel de destaque.", "Trabalhe o desconforto de \"não ser o centro\" como habilidade, não ameaça."]),
        seg("12:00–13:00", "Fechamento", [{ fala: "Próxima aula: autoestima não-contingente e estrutura terapêutica." }]),
      ],
    },
    {
      n: 8, titulo: "Manejo — autoestima não-contingente e estrutura", duracao: "13 min", slides: "12",
      objetivo: "Trabalhar fontes internas de valor pessoal e manter consistência terapêutica.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Hoje fechamos o manejo com o trabalho de fundo mais estrutural."]),
        seg("1:00–7:00", "Passo 3 — Autoestima não-contingente (mostrar slide 12, esquerda)", ["Ajude o paciente a identificar valores e conquistas que não dependem da reação alheia.", "Trabalhe a diferença entre \"ser visto\" e \"ser valorizado por quem se é\"."]),
        seg("7:00–12:00", "Passo 4 — Estrutura e limites claros (mostrar slide 12, direita)", [{ fala: "Nosso combinado continua o mesmo, independente de como a sessão de hoje começou." }, "Mantenha horários, duração e regras da terapia estáveis, sem exceções dramáticas.", "Consistência do terapeuta modela a própria regulação que está sendo trabalhada."]),
        seg("12:00–13:00", "Fechamento", [{ fala: "Manejo completo. Próxima aula: um caso real e os critérios de quando escalar." }]),
      ],
    },
    {
      n: 9, titulo: "Estudo de caso, encaminhamento e recap", duracao: "15 min", slides: "13, 14, 15",
      objetivo: "Integrar mecanismo, instrumento e manejo num caso completo.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Última aula do módulo. Caso completo e os critérios de quando aprofundar ou referenciar."]),
        seg("1:00–7:00", "Estudo de caso — Larissa (mostrar slide 13)", ["Leia a vinheta com calma.", "Percorra as 3 perguntas de discussão.", "Convide o aluno a pausar e responder por escrito."]),
        seg("7:00–11:00", "Quando encaminhar (mostrar slide 14)", ["Percorra os 4 critérios, com atenção especial a sintomas depressivos quando a atenção externa não vem."]),
        seg("11:00–14:00", "Recapitulando o módulo (mostrar slide 15)", ["Retome os 4 pontos-chave.", "Reforce a reformulação central: autoestima que depende de plateia, não escolha consciente de manipular."]),
        seg("14:00–15:00", "Fechamento do módulo", [{ fala: "Agora é hora dos exercícios e da avaliação. Te vejo no próximo transtorno de personalidade." }]),
      ],
    },
  ];

  const totalMin = 12 + 10 + 10 + 10 + 11 + 11 + 13 + 13 + 15;

  const children = [
    ...doc.capa(KICKER, "Roteiro de Aulas — TP Histriônica", "Módulo dividido em 9 vídeo-aulas de 10 a 15 minutos, seguindo os slides já produzidos. Cada aula tem roteiro cronometrado, pronto pra gravação."),
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

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", `${RODAPE_DOC} — Roteiro de Aulas`, children), "Modulo-4.15-Roteiro-Aulas.docx");
}

// ============================================================
Promise.resolve()
  .then(construirDeck)
  .then(construirExercicios)
  .then(construirProva)
  .then(construirRoteiro)
  .then(() => console.log("TUDO PRONTO"))
  .catch((e) => { console.error(e); process.exit(1); });

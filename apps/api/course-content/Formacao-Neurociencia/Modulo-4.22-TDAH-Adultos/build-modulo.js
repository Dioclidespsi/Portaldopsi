const deck = require("../_lib/lib-deck.js");
const doc = require("../_lib/lib-doc.js");

const MOD = "4.22";
const NOME = "TDAH em Adultos";
const RODAPE_DECK = `TDAH em Adultos — Módulo ${MOD}`;
const RODAPE_DOC = `Módulo ${MOD} — TDAH em Adultos`;
const KICKER = "MÓDULO 4.22 · PROTOCOLOS CLÍNICOS";

// ============================================================
// 1) SLIDE DECK
// ============================================================
function construirDeck() {
  const pres = deck.novaApresentacao(`${NOME} — Da Neurociência ao Protocolo Clínico`);

  deck.slideTitulo(pres, {
    moduloLabel: `Módulo ${MOD} · Protocolos Clínicos`,
    titulo: "TDAH em Adultos",
    subtitulo: "Reescrevendo décadas de autocrítica por \"preguiça\"",
    passos: ["Mecanismo", "Sinais", "Instrumento", "Protocolo", "Encaminhamento"],
  });

  deck.slideRoteiro(pres, {
    rodape: RODAPE_DECK, pageNum: 2,
    cards: [
      { titulo: "Mecanismo", desc: "Por que o circuito de controle executivo funciona diferente" },
      { titulo: "Sinais", desc: "Como o TDAH muda de cara na vida adulta" },
      { titulo: "Instrumento", desc: "ASRS-18, CAARS e avaliação neuropsicológica" },
      { titulo: "Protocolo", desc: "4 passos, começando pela reformulação da autoimagem" },
      { titulo: "Encaminhamento", desc: "Confirmação diagnóstica e discussão de farmacoterapia" },
    ],
  });

  deck.slideHook(pres, {
    rodape: RODAPE_DECK, pageNum: 3,
    frase: "Muitos adultos com TDAH chegam à terapia depois de décadas se chamando de preguiçosos ou desorganizados — quando na verdade sempre foi um circuito de controle executivo funcionando com menos dopamina disponível do que o esperado.",
    apoio: "Diferenciar isso de procrastinação comum, ou de um traço situacional, é o que evita anos a mais de autocrítica desnecessária — e orienta se farmacoterapia deve entrar na conversa.",
  });

  deck.slideCircuito(pres, {
    rodape: RODAPE_DECK, pageNum: 4,
    titulo: "Por que o controle executivo funciona diferente",
    regioes: [
      { label: "Circuito fronto-estriatal (hipofunção no controle executivo)", rx: 0.20, ry: 0.22, color: deck.NAVY, d: 0.5 },
      { label: "Sistema dopaminérgico (menor disponibilidade/sinalização de dopamina)", rx: 0.22, ry: 0.62, color: deck.TERRA, d: 0.4 },
      { label: "Rede de modo padrão (hiperativa, difícil de suprimir durante tarefas)", rx: 0.60, ry: 0.60, color: deck.NAVY_TINT, d: 0.36 },
      { label: "Córtex pré-frontal dorsolateral (dificuldade sustentada de foco)", rx: 0.58, ry: 0.24, color: deck.TERRA_TINT, d: 0.36 },
    ],
    notas: [
      "O circuito fronto-estriatal, base do controle executivo, mostra hipofunção — a dificuldade de iniciar e sustentar tarefas tem base neurobiológica, não é falta de esforço.",
      "A menor disponibilidade e sinalização de dopamina afeta diretamente a motivação e a regulação da atenção.",
      "A rede de modo padrão, ativa durante divagação mental, é mais difícil de suprimir durante tarefas que exigem foco — daí a sensação de \"mente que não para\".",
    ],
  });

  deck.slideCadeia(pres, {
    rodape: RODAPE_DECK, pageNum: 5,
    titulo: "Da infância mascarada ao diagnóstico tardio",
    elos: [
      { titulo: "Vulnerabilidade neurobiológica", desc: "Base genética forte, presente desde antes dos 12 anos por critério diagnóstico" },
      { titulo: "Adaptações compensatórias", desc: "Mascaramento na infância e adolescência, mais comum em mulheres" },
      { titulo: "Mudança de apresentação", desc: "Menos hiperatividade motora visível, mais inquietação interna e desorganização" },
      { titulo: "Diagnóstico tardio", desc: "Muitas vezes só reconhecido na vida adulta, após anos de autocrítica" },
    ],
    notaFinal: "O mascaramento explica por que tantos adultos, especialmente mulheres, só recebem o diagnóstico depois dos 30 anos — não porque o TDAH surgiu tarde, mas porque foi compensado por anos.",
  });

  deck.slideCategorias(pres, {
    rodape: RODAPE_DECK, pageNum: 6,
    titulo: "3 traços centrais",
    categorias: [
      { titulo: "Desatenção", desc: "Dificuldade sustentada de foco e desorganização persistente", color: deck.NAVY },
      { titulo: "Impulsividade", desc: "Decisões precipitadas, dificuldade de regular resposta", color: deck.TERRA },
      { titulo: "Inquietação interna", desc: "Mais sutil na vida adulta do que a hiperatividade motora da infância", color: deck.NAVY_TINT },
    ],
    notaFinal: "Na vida adulta, a hiperatividade raramente aparece como agitação motora visível — costuma se manifestar como inquietação interna, mente acelerada e dificuldade de relaxar.",
  });

  deck.slideSinais(pres, {
    rodape: RODAPE_DECK, pageNum: 7,
    titulo: "Como reconhecer o padrão na prática",
    itens: [
      { titulo: "Cognitivo", desc: "Dificuldade de iniciar/finalizar tarefas, esquecimentos frequentes" },
      { titulo: "Comportamental", desc: "Procrastinação crônica, mudanças frequentes de emprego ou relacionamento" },
      { titulo: "Relacional", desc: "Dificuldade de acompanhar conversas, parecer \"não estar presente\"" },
      { titulo: "Físico", desc: "Inquietação motora sutil, dificuldade de ficar parado por longos períodos" },
    ],
  });

  deck.slideDiferencial(pres, {
    rodape: RODAPE_DECK, pageNum: 8,
    titulo: "Diagnóstico diferencial rápido",
    cards: [
      { titulo: "Procrastinação (Módulo 4.7)", desc: "TDAH tem base neurobiológica pervasiva desde a infância, com prejuízo funcional amplo, não situacional" },
      { titulo: "Transtorno Bipolar (Módulo 4.20)", desc: "TDAH é crônico e estável; bipolar tem curso episódico" },
      { titulo: "Transtornos de Ansiedade", desc: "Desatenção por preocupação difusa é diferente da desatenção primária do TDAH" },
    ],
  });

  deck.slideInstrumentos(pres, {
    rodape: RODAPE_DECK, pageNum: 9,
    titulo: "Três instrumentos, três finalidades",
    instrumentos: [
      { sigla: "ASRS-18", nome: "Adult ADHD Self-Report Scale", desc: "Triagem rápida e amplamente validada pra sintomas de TDAH em adultos." },
      { sigla: "CAARS", nome: "Conners' Adult ADHD Rating Scales", desc: "Avaliação mais detalhada de sintomas e impacto funcional." },
      { sigla: "Avaliação neuropsicológica", nome: "Bateria formal (Bloco 2 do currículo)", desc: "Necessária pra confirmação diagnóstica robusta, além da triagem." },
    ],
  });

  deck.slideProtocoloOverview(pres, {
    rodape: RODAPE_DECK, pageNum: 10,
    titulo: "Do mecanismo ao protocolo: 4 passos",
    passos: [
      { titulo: "Reformular\na autoimagem", desc: "Desfazer anos de autocrítica por \"preguiça\" ou \"falta de esforço\"" },
      { titulo: "Estruturação\nexterna", desc: "Compensar o déficit executivo com organização e lembretes externos" },
      { titulo: "Regular\nestimulação", desc: "Ajustar ambiente e ritmo de trabalho às necessidades reais" },
      { titulo: "Avaliar\nfarmacoterapia", desc: "Encaminhar pra discussão médica quando indicado" },
    ],
    notaFinal: "O primeiro passo raramente é o mais óbvio — antes de qualquer estratégia prática, a autoimagem construída sobre décadas de autocrítica precisa ser revista.",
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 11,
    titulo: "Passos 1 e 2, na prática",
    colunas: [
      {
        numero: 1, titulo: "Reformular a autoimagem",
        fala: "“O que você chamava de preguiça talvez sempre tenha sido um circuito de atenção funcionando de um jeito diferente, não menos válido.”",
        bullets: ["Nomeie explicitamente a diferença entre déficit neurobiológico e falta de caráter", "Investigue e valide o impacto emocional de anos de autocrítica antes de avançar"],
      },
      {
        numero: 2, titulo: "Estruturação externa",
        bullets: ["Use listas, lembretes e sistemas visuais como scaffolding externo pro déficit executivo", "Simplifique o sistema o quanto possível — sistemas complexos demais tendem a ser abandonados"],
      },
    ],
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 12,
    titulo: "Passos 3 e 4, na prática",
    colunas: [
      {
        numero: 3, titulo: "Regular estimulação e ambiente",
        bullets: ["Ajuste o ambiente de trabalho pra reduzir distrações desnecessárias", "Identifique o nível de estimulação que favorece o foco de cada paciente — nem sempre é silêncio total"],
      },
      {
        numero: 4, titulo: "Avaliar farmacoterapia",
        bullets: ["Encaminhe pra avaliação psiquiátrica quando o prejuízo funcional for significativo", "Estimulantes têm forte evidência como primeira linha farmacológica, mas a decisão é médica"],
      },
    ],
  });

  deck.slideCaso(pres, {
    rodape: RODAPE_DECK, pageNum: 13,
    vinheta: "Camila, 34 anos, procura terapia dizendo \"acho que sou só desorganizada mesmo, sempre fui assim\". Relata que perde prazos com frequência, esquece compromissos mesmo com lembretes, e já mudou de emprego 5 vezes em 8 anos por \"não conseguir se adaptar\". Conta que na escola era vista como \"sonhadora\", nunca teve problemas de comportamento visíveis, e sempre se saiu bem academicamente \"com muito esforço a mais que os colegas pareciam precisar\".",
    perguntas: [
      "Que elementos da vinheta sugerem TDAH mascarado, e não apenas desorganização pessoal?",
      "Por que a ausência de problemas de comportamento na escola não descarta TDAH, especialmente em mulheres?",
      "Que passo do protocolo você priorizaria na primeira sessão, considerando a fala inicial de Camila?",
    ],
  });

  deck.slideEncaminhamento(pres, {
    rodape: RODAPE_DECK, pageNum: 14,
    criterios: [
      "Avaliação neuropsicológica formal pra confirmação diagnóstica, sempre que possível (conecta ao Bloco 2 do currículo)",
      "Avaliação psiquiátrica pra discutir farmacoterapia, especialmente diante de prejuízo funcional significativo",
      "Comorbidade frequente com ansiedade ou depressão secundária ao impacto funcional crônico não tratado",
      "Sempre descartar Transtorno Bipolar (Módulo 4.20) antes de confirmar TDAH isolado, dada a sobreposição de sintomas de impulsividade",
    ],
  });

  deck.slideRecap(pres, {
    rodape: RODAPE_DECK, pageNum: 15,
    pontos: [
      "A hipofunção do circuito fronto-estriatal e a menor disponibilidade de dopamina explicam a dificuldade de iniciar e sustentar tarefas — não é falta de esforço",
      "Desatenção, impulsividade e inquietação interna são os 3 traços centrais, com apresentação diferente na vida adulta",
      "ASRS-18, CAARS e avaliação neuropsicológica formal estruturam a triagem e a confirmação diagnóstica",
      "O protocolo começa pela reformulação da autoimagem, antes mesmo das estratégias práticas de organização",
    ],
    proximoTexto: "Próximo: exercícios práticos e avaliação do Módulo 4.22 →",
  });

  return pres.writeFile({ fileName: "Modulo-4.22-TDAH-Adultos.pptx" });
}

// ============================================================
// 2) EXERCÍCIOS
// ============================================================
function construirExercicios() {
  const children = [
    ...doc.capa(KICKER, "Exercícios — TDAH em Adultos", "Resolva individualmente antes da sessão de supervisão. O objetivo é testar sua leitura do mecanismo e do protocolo antes de comparar com a discussão em grupo — não há problema em errar."),

    doc.exNum(1, "O mecanismo, em suas palavras"),
    doc.pergunta(1, "Explique em até 3 frases, sem jargão técnico, por que a dificuldade de iniciar tarefas no TDAH tem base neurobiológica, não é falta de esforço."),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Por que o TDAH muitas vezes só é diagnosticado na vida adulta, especialmente em mulheres?"),
    ...doc.linhaResposta(2),

    doc.exNum(2, "Diagnóstico diferencial"),
    doc.vinhetaBox("Um paciente relata dificuldade de concentração e desorganização, mas esses sintomas começaram há apenas 6 meses, coincidindo com um período de sobrecarga no trabalho, sem histórico prévio na infância."),
    doc.pergunta(1, "TDAH ou outra hipótese? Justifique com base no critério de início dos sintomas."),
    ...doc.linhaResposta(2),

    doc.exNum(3, "Instrumentos"),
    doc.tabelaSimples(["Instrumento", "Quando usar"], [["ASRS-18", ""], ["CAARS", ""], ["Avaliação neuropsicológica", ""]], [3200, 6150]),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),

    doc.exNum(4, "Reformulando a autoimagem"),
    doc.vinhetaBox("Um paciente diz: \"sempre fui preguiçoso, é isso, não tem outra explicação\"."),
    doc.pergunta(1, "Escreva uma resposta terapêutica alinhada ao passo 1 (reformular a autoimagem)."),
    ...doc.linhaResposta(3),

    doc.exNum(5, "Caso integrado — Camila"),
    doc.vinhetaBox("Camila, 34 anos, acha que é \"só desorganizada\", perde prazos, esquece compromissos mesmo com lembretes, mudou de emprego 5 vezes em 8 anos, era vista como \"sonhadora\" na escola sem problemas de comportamento visíveis."),
    doc.pergunta(1, "Que elementos sugerem TDAH mascarado, e não apenas desorganização pessoal?"),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Por que a ausência de problemas de comportamento na escola não descarta TDAH?"),
    ...doc.linhaResposta(2),
    doc.pergunta(3, "Que encaminhamento você faria pra confirmar o diagnóstico de forma robusta?"),
    ...doc.linhaResposta(1),
  ];

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-4.22-Exercicios.docx");
}

// ============================================================
// 3) AVALIAÇÃO
// ============================================================
function construirProva() {
  const objetivas = [
    ["O circuito fronto-estriatal, no TDAH, tende a apresentar:", ["Hipofunção no controle executivo", "Hiperfunção generalizada sem qualquer déficit", "Nenhuma alteração relevante em relação à população geral", "Hiperfunção exclusiva durante o sono"]],
    ["A menor disponibilidade e sinalização de dopamina, no TDAH, afeta diretamente:", ["Motivação e regulação da atenção", "Apenas a coordenação motora fina", "Exclusivamente a memória de longo prazo", "Nenhum aspecto cognitivo relevante"]],
    ["Os 3 traços centrais do TDAH em adultos são:", ["Desatenção, impulsividade, inquietação interna", "Grandiosidade, necessidade de admiração, falta de empatia", "Restrição alimentar/controle, distorção da imagem corporal, comportamento compensatório", "Episódios de mania/hipomania, episódios depressivos, instabilidade do ritmo circadiano"]],
    ["O que diferencia TDAH de Procrastinação (Módulo 4.7)?", ["TDAH tem base neurobiológica pervasiva desde a infância, com prejuízo funcional amplo", "Não há diferença clínica relevante entre eles", "Procrastinação sempre tem início antes dos 12 anos", "TDAH nunca envolve dificuldade de iniciar tarefas"]],
    ["Instrumento de triagem rápida e amplamente validado pra sintomas de TDAH em adultos:", ["ASRS-18", "PCL-R", "Y-BOCS", "ISI"]],
    ["Por que o TDAH costuma ser mascarado na infância, especialmente em mulheres?", ["Por adaptações compensatórias que escondem o prejuízo funcional por anos", "Porque mulheres nunca desenvolvem TDAH", "Porque o TDAH surge exclusivamente na vida adulta em mulheres", "Porque não há qualquer diferença de apresentação entre gêneros"]],
    ["Na vida adulta, a hiperatividade do TDAH costuma se manifestar como:", ["Inquietação interna, mais sutil que a agitação motora da infância", "Agitação motora idêntica à observada na infância", "Ausência completa de qualquer sintoma de hiperatividade", "Exclusivamente como comportamento agressivo"]],
    ["O passo 1 do protocolo (reformular a autoimagem) é descrito como:", ["Frequentemente o primeiro passo, antes mesmo das estratégias práticas de organização", "Desnecessário, pois a autoimagem não tem relação com o tratamento", "O último passo do protocolo, depois de todos os outros", "Uma etapa exclusivamente farmacológica"]],
    ["Antes de confirmar TDAH isolado, o módulo recomenda sempre descartar:", ["Transtorno Bipolar (Módulo 4.20), dada a sobreposição de sintomas de impulsividade", "Transtorno Dismórfico Corporal, sem qualquer relação com o quadro", "Fobia específica, sem qualquer sobreposição de sintomas", "Nenhum outro diagnóstico precisa ser descartado"]],
    ["A confirmação diagnóstica robusta do TDAH em adultos geralmente requer:", ["Avaliação neuropsicológica formal, além da triagem inicial", "Apenas uma conversa informal, sem qualquer instrumento estruturado", "Exclusivamente exames de imagem cerebral", "Nenhuma avaliação adicional além da queixa do paciente"]],
  ];
  const gabaritoObjetivas = ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a"];

  const children = [
    ...doc.capa(KICKER, "Avaliação — TDAH em Adultos", `Avaliação formativa de encerramento do Módulo ${MOD}.`),
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
    doc.vinhetaBox("Rodrigo, 29 anos, relata que \"nunca consegue terminar nada\", tem uma lista enorme de projetos pessoais abandonados, e foi chamado de \"disperso\" a vida inteira pela família. Diz que sempre se sentiu \"menos capaz\" que os colegas, apesar de ser reconhecido como criativo no trabalho. Nunca foi avaliado formalmente, mas relata que desde criança tinha dificuldade de prestar atenção em aula, mesmo em matérias que gostava."),
    new doc.Paragraph({ spacing: { before: 240 }, children: [new doc.TextRun({ text: "Com base no protocolo estudado, responda:", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    new doc.Paragraph({ spacing: { before: 220, after: 40 }, children: [new doc.TextRun({ text: "a) (10 pts) Que elementos da vinheta sustentam a hipótese de TDAH?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "b) (10 pts) Por que a fala \"me sentia menos capaz que os colegas\" é relevante pro passo 1 do protocolo?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "c) (10 pts) Que encaminhamento você faria pra confirmar o diagnóstico de forma robusta?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "d) (10 pts) Sugira uma estratégia de estruturação externa (passo 2) pra lidar com os projetos abandonados.", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    new doc.Paragraph({ spacing: { after: 40 }, children: [new doc.TextRun({ text: "USO EXCLUSIVO DO INSTRUTOR — remover antes de aplicar a prova", bold: true, color: doc.TERRA, font: doc.FONT, size: 20 })] }),
    doc.tituloH1("Gabarito"),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 1 — Questões objetivas", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 200 }, children: [new doc.TextRun({ text: gabaritoObjetivas.map((r, i) => `${i + 1}-${r}`).join("   ·   "), font: doc.FONT, size: 22, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 2 — Critério de correção da questão de caso", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "a) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Dificuldade crônica de finalizar tarefas, múltiplos projetos abandonados, histórico desde a infância (dificuldade de prestar atenção mesmo em matérias que gostava), rótulo de \"disperso\" desde cedo.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "b) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Porque ilustra o impacto emocional acumulado de anos de autocrítica, que precisa ser reformulado como consequência de um circuito de atenção diferente, não como falha pessoal, antes de avançar pras estratégias práticas.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "c) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Avaliação neuropsicológica formal pra confirmação diagnóstica robusta, e avaliação psiquiátrica pra discutir eventual indicação de farmacoterapia.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "d) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Ex: reduzir o número de projetos simultâneos, usar um sistema visual simples de acompanhamento com marcos pequenos e lembretes externos, evitando sistemas complexos demais que tendem a ser abandonados.", font: doc.FONT, size: 21, color: doc.INK })] }),
  );

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-4.22-Avaliacao.docx");
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
      n: 1, titulo: "Por que o controle executivo funciona diferente", duracao: "12 min", slides: "1, 2, 3, 4",
      objetivo: "Sair sabendo explicar o mecanismo do TDAH sem jargão, e desfazer a narrativa de \"preguiça\".",
      segmentos: [
        seg("0:00–0:45", "Abertura (gancho)", [{ fala: "Muitos adultos com TDAH chegam à terapia depois de décadas se chamando de preguiçosos ou desorganizados — quando na verdade sempre foi um circuito de controle executivo funcionando com menos dopamina disponível do que o esperado." }]),
        seg("0:45–2:00", "Por que essa reformulação importa", ["Diferenciar de procrastinação comum evita anos a mais de autocrítica desnecessária.", "Orienta se farmacoterapia deve entrar na conversa."]),
        seg("2:00–8:00", "Por que o controle executivo funciona diferente (mostrar slide 4)", [
          "Circuito fronto-estriatal com hipofunção no controle executivo.",
          "Sistema dopaminérgico com menor disponibilidade e sinalização.",
          "Rede de modo padrão hiperativa, difícil de suprimir durante tarefas.",
          "Córtex pré-frontal dorsolateral com dificuldade sustentada de foco.",
        ]),
        seg("8:00–10:30", "Um ponto importante", ["A dificuldade de iniciar e sustentar tarefas tem base neurobiológica, não é falta de esforço."]),
        seg("10:30–12:00", "Fechamento", [{ fala: "Próxima aula: por que tantos adultos só descobrem isso tarde." }]),
      ],
    },
    {
      n: 2, titulo: "Da infância mascarada ao diagnóstico tardio", duracao: "10 min", slides: "5",
      objetivo: "Explicar como o mascaramento na infância adia o diagnóstico, especialmente em mulheres.",
      segmentos: [
        seg("0:00–1:00", "Retomada rápida", ["Vimos as estruturas envolvidas. Hoje vemos por que o diagnóstico costuma vir tarde."]),
        seg("1:00–6:30", "A cadeia (mostrar slide 5)", ["Vulnerabilidade neurobiológica, presente desde antes dos 12 anos por critério diagnóstico.", "Adaptações compensatórias, mais comuns em mulheres.", "Mudança de apresentação: menos hiperatividade motora, mais inquietação interna.", "Diagnóstico tardio, muitas vezes após anos de autocrítica."]),
        seg("6:30–9:00", "Um ponto importante", ["O TDAH não surgiu tarde — foi compensado por anos."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: os 3 traços centrais do TDAH em adultos." }]),
      ],
    },
    {
      n: 3, titulo: "Os 3 traços centrais", duracao: "10 min", slides: "6",
      objetivo: "Reconhecer desatenção, impulsividade e inquietação interna na apresentação adulta.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três traços — com uma apresentação bem diferente da infância."]),
        seg("1:00–7:00", "Os 3 traços (mostrar slide 6)", [
          "Desatenção: dificuldade sustentada de foco e desorganização persistente.",
          "Impulsividade: decisões precipitadas, dificuldade de regular resposta.",
          "Inquietação interna: mais sutil que a hiperatividade motora da infância.",
        ]),
        seg("7:00–9:00", "Um ponto importante", ["Raramente aparece como agitação motora visível na vida adulta — mais como mente acelerada e dificuldade de relaxar."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: como reconhecer esse padrão nas 4 dimensões clínicas." }]),
      ],
    },
    {
      n: 4, titulo: "Sinais de alerta", duracao: "10 min", slides: "7",
      objetivo: "Reconhecer sinais cognitivos, comportamentais, relacionais e físicos do TDAH em adultos.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Reconhecer o padrão com precisão orienta a decisão de investigar histórico desde a infância."]),
        seg("1:00–7:30", "As 4 categorias (mostrar slide 7)", [
          "Cognitivo: dificuldade de iniciar/finalizar tarefas, esquecimentos frequentes.",
          "Comportamental: procrastinação crônica, mudanças frequentes de emprego/relacionamento.",
          "Relacional: dificuldade de acompanhar conversas, parecer \"não estar presente\".",
          "Físico: inquietação motora sutil, dificuldade de ficar parado.",
        ]),
        seg("7:30–9:00", "Por que isso importa", ["Esses sinais, presentes desde a infância, orientam a diferenciação com quadros situacionais."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: como diferenciar de quadros parecidos." }]),
      ],
    },
    {
      n: 5, titulo: "Diagnóstico diferencial rápido", duracao: "11 min", slides: "8",
      objetivo: "Diferenciar TDAH de Procrastinação, Transtorno Bipolar e Transtornos de Ansiedade.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Um filtro rápido — a diferenciação com procrastinação é a mais frequente na prática."]),
        seg("1:00–8:00", "Os 3 comparativos (mostrar slide 8)", [
          "Procrastinação (Módulo 4.7): TDAH tem base neurobiológica pervasiva desde a infância, prejuízo amplo.",
          "Transtorno Bipolar (Módulo 4.20): TDAH é crônico e estável; bipolar tem curso episódico.",
          "Ansiedade: desatenção por preocupação difusa é diferente da desatenção primária do TDAH.",
        ]),
        seg("8:00–10:30", "Por que a diferenciação com bipolar importa", ["Sempre descartar bipolar antes de confirmar TDAH isolado, dada a sobreposição de impulsividade."]),
        seg("10:30–11:00", "Fechamento", [{ fala: "Próxima aula: os instrumentos que confirmam essa leitura com dado." }]),
      ],
    },
    {
      n: 6, titulo: "Os instrumentos de avaliação", duracao: "11 min", slides: "9",
      objetivo: "Saber quando usar ASRS-18, CAARS e avaliação neuropsicológica formal.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três instrumentos, três finalidades — do rastreio rápido à confirmação diagnóstica formal."]),
        seg("1:00–4:30", "ASRS-18", ["Triagem rápida e amplamente validada."]),
        seg("4:30–7:30", "CAARS", ["Avaliação mais detalhada de sintomas e impacto funcional."]),
        seg("7:30–10:00", "Avaliação neuropsicológica", ["Necessária pra confirmação diagnóstica robusta, além da triagem — conecta ao Bloco 2 do currículo."]),
        seg("10:00–11:00", "Fechamento", [{ fala: "Próxima aula: colocamos tudo em prática — reformular a autoimagem e estruturação externa." }]),
      ],
    },
    {
      n: 7, titulo: "Protocolo — reformular a autoimagem e estruturação externa", duracao: "13 min", slides: "10, 11",
      objetivo: "Aplicar os passos 1 e 2 do protocolo, começando pela reformulação da autocrítica.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["A parte prática central desse módulo. Hoje, os 2 primeiros passos."]),
        seg("1:00–2:00", "Visão geral (mostrar slide 10)", ["Reformular a autoimagem → Estruturação externa → Regular estimulação → Avaliar farmacoterapia.", "O primeiro passo raramente é o mais óbvio."]),
        seg("2:00–7:00", "Passo 1 — Reformular a autoimagem (mostrar slide 11, esquerda)", [{ fala: "O que você chamava de preguiça talvez sempre tenha sido um circuito de atenção funcionando de um jeito diferente, não menos válido." }]),
        seg("7:00–12:00", "Passo 2 — Estruturação externa (mostrar slide 11, direita)", ["Use listas, lembretes e sistemas visuais como scaffolding externo.", "Simplifique o sistema — sistemas complexos demais tendem a ser abandonados."]),
        seg("12:00–13:00", "Fechamento", [{ fala: "Próxima aula: regular estimulação e avaliar farmacoterapia." }]),
      ],
    },
    {
      n: 8, titulo: "Protocolo — regular estimulação e avaliar farmacoterapia", duracao: "13 min", slides: "12",
      objetivo: "Ajustar ambiente de trabalho e encaminhar pra avaliação médica quando indicado.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Hoje fechamos o protocolo com o ajuste de ambiente e a discussão médica."]),
        seg("1:00–7:00", "Passo 3 — Regular estimulação (mostrar slide 12, esquerda)", ["Ajuste o ambiente pra reduzir distrações desnecessárias.", "Identifique o nível de estimulação que favorece o foco — nem sempre é silêncio total."]),
        seg("7:00–13:00", "Passo 4 — Avaliar farmacoterapia (mostrar slide 12, direita)", ["Encaminhe pra avaliação psiquiátrica diante de prejuízo funcional significativo.", "Estimulantes têm forte evidência, mas a decisão é médica."]),
        seg("13:00–13:00", "Fechamento", [{ fala: "Protocolo completo. Próxima aula: um caso real e os critérios de quando escalar." }]),
      ],
    },
    {
      n: 9, titulo: "Estudo de caso, encaminhamento e recap", duracao: "15 min", slides: "13, 14, 15",
      objetivo: "Integrar mecanismo, instrumento e protocolo num caso completo, com ênfase na confirmação diagnóstica.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Última aula do módulo. Caso completo e os critérios de quando aprofundar ou referenciar."]),
        seg("1:00–7:00", "Estudo de caso — Camila (mostrar slide 13)", ["Leia a vinheta com calma.", "Percorra as 3 perguntas de discussão.", "Convide o aluno a pausar e responder por escrito."]),
        seg("7:00–11:00", "Quando encaminhar (mostrar slide 14)", ["Percorra os 4 critérios, com atenção à confirmação diagnóstica formal antes de avançar."]),
        seg("11:00–14:00", "Recapitulando o módulo (mostrar slide 15)", ["Retome os 4 pontos-chave.", "Reforce a reformulação central: circuito de atenção diferente, não falta de esforço."]),
        seg("14:00–15:00", "Fechamento do módulo", [{ fala: "Agora é hora dos exercícios e da avaliação. Te vejo no próximo protocolo." }]),
      ],
    },
  ];

  const totalMin = 12 + 10 + 10 + 10 + 11 + 11 + 13 + 13 + 15;

  const children = [
    ...doc.capa(KICKER, "Roteiro de Aulas — TDAH em Adultos", "Módulo dividido em 9 vídeo-aulas de 10 a 15 minutos, seguindo os slides já produzidos. Cada aula tem roteiro cronometrado, pronto pra gravação."),
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

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", `${RODAPE_DOC} — Roteiro de Aulas`, children), "Modulo-4.22-Roteiro-Aulas.docx");
}

// ============================================================
Promise.resolve()
  .then(construirDeck)
  .then(construirExercicios)
  .then(construirProva)
  .then(construirRoteiro)
  .then(() => console.log("TUDO PRONTO"))
  .catch((e) => { console.error(e); process.exit(1); });

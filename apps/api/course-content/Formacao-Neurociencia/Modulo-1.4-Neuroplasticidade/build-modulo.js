const deck = require("../_lib/lib-deck.js");
const doc = require("../_lib/lib-doc.js");

const MOD = "1.4";
const NOME = "Neuroplasticidade e Mudança Terapêutica";
const RODAPE_DECK = `Neuroplasticidade — Módulo ${MOD}`;
const RODAPE_DOC = `Módulo ${MOD} — Neuroplasticidade`;
const KICKER = "MÓDULO 1.4 · FUNDAMENTOS DE NEUROCIÊNCIA APLICADA";

// ============================================================
// 1) SLIDE DECK
// ============================================================
function construirDeck() {
  const pres = deck.novaApresentacao(`${NOME} — Por que a Terapia Funciona`);

  deck.slideTitulo(pres, {
    moduloLabel: `Módulo ${MOD} · Bloco 1 · Fundamentos`,
    titulo: "Neuroplasticidade",
    subtitulo: "A base biológica de por que a terapia funciona — e como isso aumenta adesão",
    passos: ["Mecanismo", "Fatores", "Sinais", "Aplicação", "Adesão"],
  });

  deck.slideRoteiro(pres, {
    rodape: RODAPE_DECK, pageNum: 2,
    cards: [
      { titulo: "Plasticidade sináptica", desc: "Como a repetição fortalece novos caminhos neurais" },
      { titulo: "Neurogênese", desc: "A formação de novos neurônios ao longo da vida adulta" },
      { titulo: "Fatores moduladores", desc: "O que acelera e o que trava a plasticidade" },
      { titulo: "Aplicação clínica", desc: "Prática deliberada entre sessões, não só insight" },
      { titulo: "Adesão", desc: "Como essa psicoeducação aumenta o compromisso com o tratamento" },
    ],
  });

  deck.slideHook(pres, {
    rodape: RODAPE_DECK, pageNum: 3,
    frase: "Terapia não é uma conversa que muda a forma como você pensa — é uma prática repetida que muda, literalmente, a estrutura física das conexões no seu cérebro.",
    apoio: "Essa reformulação, quando bem explicada ao paciente, costuma aumentar significativamente a adesão às tarefas entre sessões — porque deixa de parecer \"dever de casa\" e passa a ser entendido como parte central do próprio mecanismo de mudança.",
  });

  deck.slideCircuito(pres, {
    rodape: RODAPE_DECK, pageNum: 4,
    titulo: "O que muda fisicamente com a prática repetida",
    regioes: [
      { label: "Sinapses (fortalecimento por potenciação de longo prazo — LTP)", rx: 0.20, ry: 0.22, color: deck.NAVY, d: 0.5 },
      { label: "BDNF (fator neurotrófico que sustenta crescimento de novas conexões)", rx: 0.22, ry: 0.62, color: deck.TERRA, d: 0.4 },
      { label: "Hipocampo (um dos poucos locais de neurogênese na vida adulta)", rx: 0.60, ry: 0.60, color: deck.NAVY_TINT, d: 0.36 },
      { label: "Vias não utilizadas (enfraquecidas por poda sináptica adaptativa)", rx: 0.58, ry: 0.24, color: deck.TERRA_TINT, d: 0.36 },
    ],
    notas: [
      "A potenciação de longo prazo (LTP) fortalece sinapses usadas repetidamente — a base biológica de \"praticar até ficar automático\".",
      "O BDNF (fator neurotrófico derivado do cérebro) sustenta o crescimento físico de novas conexões — reduzido por estresse crônico, aumentado por exercício e sono adequado.",
      "O hipocampo é uma das raras regiões com neurogênese comprovada na vida adulta — diretamente sensível a fatores de estilo de vida.",
    ],
  });

  deck.slideCadeia(pres, {
    rodape: RODAPE_DECK, pageNum: 5,
    titulo: "Da prática repetida à mudança consolidada",
    elos: [
      { titulo: "Experiência repetida", desc: "Novo padrão de pensamento ou comportamento praticado de forma consistente" },
      { titulo: "Fortalecimento sináptico", desc: "LTP e BDNF sustentam o crescimento físico das conexões envolvidas" },
      { titulo: "Nova via mais eficiente", desc: "O caminho novo compete com o antigo, tornando-se cada vez mais automático" },
      { titulo: "Padrão consolidado", desc: "A mudança se torna menos dependente de esforço consciente contínuo" },
    ],
    notaFinal: "\"Neurônios que disparam juntos, se conectam juntos\" — o princípio de Hebb resume, numa frase, por que repetição consistente é mais eficaz que um único insight profundo.",
  });

  deck.slideCategorias(pres, {
    rodape: RODAPE_DECK, pageNum: 6,
    titulo: "3 elementos centrais da neuroplasticidade",
    categorias: [
      { titulo: "Plasticidade sináptica", desc: "Fortalecimento de conexões usadas repetidamente (LTP)", color: deck.NAVY },
      { titulo: "Neurogênese", desc: "Formação de novos neurônios, especialmente no hipocampo", color: deck.TERRA },
      { titulo: "Poda sináptica adaptativa", desc: "Enfraquecimento de vias não utilizadas — \"use ou perca\"", color: deck.NAVY_TINT },
    ],
    notaFinal: "Os 3 elementos trabalham juntos: fortalecer o novo padrão e, ao mesmo tempo, deixar de praticar o antigo, acelera a consolidação da mudança.",
  });

  deck.slideSinais(pres, {
    rodape: RODAPE_DECK, pageNum: 7,
    titulo: "O que acelera e o que trava a plasticidade",
    itens: [
      { titulo: "Favorece", desc: "Sono adequado, exercício físico regular, atenção focada durante a prática" },
      { titulo: "Favorece", desc: "Novidade e desafio moderado — nem fácil demais, nem impossível" },
      { titulo: "Trava", desc: "Estresse crônico e cortisol elevado, reduzindo BDNF (conecta ao Módulo 1.2)" },
      { titulo: "Trava", desc: "Prática inconsistente ou sem repetição suficiente pra consolidar o novo caminho" },
    ],
  });

  deck.slideDiferencial(pres, {
    rodape: RODAPE_DECK, pageNum: 8,
    titulo: "Expectativas realistas sobre o ritmo da mudança",
    cards: [
      { titulo: "Insight isolado", desc: "Compreensão cognitiva sem prática repetida raramente consolida mudança estrutural" },
      { titulo: "Prática consistente", desc: "Repetição regular, mesmo que pequena, sustenta a plasticidade de forma mais confiável" },
      { titulo: "Mudança sob estresse crônico", desc: "Tende a ser mais lenta — cortisol elevado reduz a plasticidade disponível" },
    ],
  });

  deck.slideInstrumentos(pres, {
    rodape: RODAPE_DECK, pageNum: 9,
    titulo: "Marcadores indiretos de progresso terapêutico",
    instrumentos: [
      { sigla: "Escalas seriadas", nome: "Reaplicação de BDI-II, GAD-7 etc ao longo do tempo", desc: "Mede evolução sintomática indireta da mudança estrutural — Módulo 2.5." },
      { sigla: "Diário de prática", nome: "Registro de exercícios/tarefas entre sessões", desc: "Indicador direto de repetição, o fator mais associado à consolidação." },
      { sigla: "Observação clínica", nome: "Automaticidade crescente do novo padrão", desc: "Sinal qualitativo de que a via nova está ficando mais eficiente." },
    ],
  });

  deck.slideProtocoloOverview(pres, {
    rodape: RODAPE_DECK, pageNum: 10,
    titulo: "Da neuroplasticidade à adesão ao tratamento: 4 passos",
    passos: [
      { titulo: "Psicoeducar\nsobre o mecanismo", desc: "Explicar por que prática entre sessões é parte do tratamento, não extra" },
      { titulo: "Prescrever\nprática deliberada", desc: "Tarefas específicas e repetíveis, não apenas \"pensar sobre isso\"" },
      { titulo: "Otimizar\nfatores de base", desc: "Sono, estresse e rotina, que sustentam ou travam a plasticidade" },
      { titulo: "Celebrar\nprogresso incremental", desc: "Pequenas mudanças são evidência real de reorganização estrutural" },
    ],
    notaFinal: "Reformular \"dever de casa\" como \"a parte que efetivamente reorganiza seu cérebro\" costuma ser, sozinho, um dos maiores aumentos de adesão que a psicoeducação consegue gerar.",
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 11,
    titulo: "Passos 1 e 2, na prática",
    colunas: [
      {
        numero: 1, titulo: "Psicoeducar sobre o mecanismo",
        fala: "“Terapia não é só uma conversa que muda como você pensa — é uma prática repetida que muda, literalmente, as conexões no seu cérebro.”",
        bullets: ["Use a metáfora de \"criar uma trilha nova\" que precisa ser percorrida repetidamente até virar caminho natural"],
      },
      {
        numero: 2, titulo: "Prescrever prática deliberada",
        bullets: ["Defina tarefas específicas, mensuráveis e repetíveis entre sessões, não apenas reflexão geral", "Comece pequeno — consistência importa mais que intensidade pra consolidação"],
      },
    ],
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 12,
    titulo: "Passos 3 e 4, na prática",
    colunas: [
      {
        numero: 3, titulo: "Otimizar fatores de base",
        bullets: ["Investigue sono e estresse crônico como possíveis fatores limitantes da plasticidade disponível", "Considere protocolos complementares (Módulo 4.3 Burnout, Módulo 4.23 Insônia) quando relevante"],
      },
      {
        numero: 4, titulo: "Celebrar progresso incremental",
        bullets: ["Nomeie explicitamente pequenas mudanças como evidência de reorganização neural real", "Isso reforça a crença de autoeficácia, que por sua vez sustenta mais prática consistente"],
      },
    ],
  });

  deck.slideCaso(pres, {
    rodape: RODAPE_DECK, pageNum: 13,
    vinheta: "Um paciente relata frustração porque, após 3 sessões de terapia, \"ainda reage do mesmo jeito automático\" nas situações que o incomodam, e questiona se a terapia está funcionando. Ele entende racionalmente o que precisa mudar, mas diz que \"na hora, é como se o corpo agisse sozinho\".",
    perguntas: [
      "Como você explicaria, com base na neuroplasticidade, por que 3 sessões geralmente não são suficientes pra consolidar mudança de padrão automático?",
      "Que fatores de base você investigaria que poderiam estar travando a plasticidade desse paciente?",
      "Como você reformularia a queixa dele em termos de progresso incremental esperado?",
    ],
  });

  deck.slideEncaminhamento(pres, {
    rodape: RODAPE_DECK, pageNum: 14,
    criterios: [
      "Estresse crônico não endereçado limitando a plasticidade disponível: considerar Módulo 4.3 (Burnout)",
      "Insônia ou sono cronicamente inadequado, fator direto de redução de BDNF: considerar Módulo 4.23",
      "Uso de substâncias impactando neurogênese/plasticidade: considerar Módulo 4.5 (Adicções)",
      "Ausência completa de progresso mesmo com prática consistente e fatores de base otimizados: reavaliar diagnóstico e protocolo",
    ],
  });

  deck.slideRecap(pres, {
    rodape: RODAPE_DECK, pageNum: 15,
    pontos: [
      "LTP, BDNF e neurogênese explicam por que a prática repetida muda fisicamente as conexões neurais",
      "Plasticidade sináptica, neurogênese e poda adaptativa são os 3 elementos centrais do mecanismo",
      "Sono, exercício e baixo estresse favorecem a plasticidade; estresse crônico e prática inconsistente a travam",
      "Psicoeducar sobre esse mecanismo é uma das formas mais diretas de aumentar adesão à prática entre sessões",
    ],
    proximoTexto: "Módulo 1.4 concluído — fim do Bloco 1 (Fundamentos) →",
  });

  return pres.writeFile({ fileName: "Modulo-1.4-Neuroplasticidade.pptx" });
}

// ============================================================
// 2) EXERCÍCIOS
// ============================================================
function construirExercicios() {
  const children = [
    ...doc.capa(KICKER, "Exercícios — Neuroplasticidade", "Resolva individualmente antes da sessão de supervisão. O objetivo é testar sua leitura do mecanismo antes de comparar com a discussão em grupo — não há problema em errar."),

    doc.exNum(1, "O mecanismo, em suas palavras"),
    doc.pergunta(1, "Explique em até 3 frases, sem jargão técnico, por que a prática repetida muda fisicamente o cérebro."),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "O que significa o princípio de Hebb (\"neurônios que disparam juntos, se conectam juntos\") aplicado à terapia?"),
    ...doc.linhaResposta(2),

    doc.exNum(2, "Fatores que favorecem e travam a plasticidade"),
    doc.tabelaSimples(["Fator", "Favorece ou trava?", "Por quê"], [["Sono adequado", "", ""], ["Estresse crônico", "", ""], ["Prática inconsistente", "", ""]], [2400, 2200, 4750]),

    doc.exNum(3, "Reformulando o \"dever de casa\""),
    doc.vinhetaBox("Um paciente diz: \"eu odeio fazer tarefa de casa, prefiro só conversar na sessão\"."),
    doc.pergunta(1, "Escreva uma resposta de psicoeducação que reformule a prática entre sessões como parte do mecanismo de mudança, não como \"extra\"."),
    ...doc.linhaResposta(3),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),

    doc.exNum(4, "Expectativa realista de ritmo"),
    doc.pergunta(1, "Por que insight isolado, sem prática repetida, raramente consolida mudança estrutural duradoura?"),
    ...doc.linhaResposta(2),

    doc.exNum(5, "Caso integrado"),
    doc.vinhetaBox("Um paciente, após 3 sessões, relata frustração porque \"ainda reage do mesmo jeito automático\", mesmo entendendo racionalmente o que precisa mudar."),
    doc.pergunta(1, "Como você explicaria, com base na neuroplasticidade, por que 3 sessões geralmente não bastam?"),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Que fatores de base você investigaria que poderiam estar travando a plasticidade desse paciente?"),
    ...doc.linhaResposta(2),
    doc.pergunta(3, "Como você reformularia a queixa dele em termos de progresso incremental esperado?"),
    ...doc.linhaResposta(2),
  ];

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-1.4-Exercicios.docx");
}

// ============================================================
// 3) AVALIAÇÃO
// ============================================================
function construirProva() {
  const objetivas = [
    ["A potenciação de longo prazo (LTP) explica:", ["O fortalecimento de sinapses usadas repetidamente", "O enfraquecimento imediato de qualquer sinapse", "Um processo exclusivo da vida intrauterina", "A ausência total de mudança estrutural no cérebro adulto"]],
    ["O BDNF é descrito no módulo como:", ["Fator neurotrófico que sustenta o crescimento de novas conexões", "Um neurotransmissor exclusivamente inibitório", "Um hormônio exclusivamente reprodutivo", "Uma estrutura anatômica, não uma molécula"]],
    ["Os 3 elementos centrais da neuroplasticidade são:", ["Plasticidade sináptica, neurogênese, poda sináptica adaptativa", "Grandiosidade, necessidade de admiração, falta de empatia", "Sistema de apego, programação do eixo HPA, regulação compartilhada", "Serotonina, dopamina, GABA"]],
    ["O hipocampo é notável por ser:", ["Uma das poucas regiões com neurogênese comprovada na vida adulta", "A única estrutura cerebral sem qualquer plasticidade", "Uma estrutura exclusivamente motora", "Uma região sem qualquer relação com aprendizagem"]],
    ["O princípio de Hebb resume que:", ["Neurônios que disparam juntos, se conectam juntos", "Neurônios nunca se conectam entre si", "A prática repetida enfraquece automaticamente qualquer conexão", "Apenas experiências únicas e intensas geram mudança neural"]],
    ["Estresse crônico e cortisol elevado tendem a:", ["Reduzir o BDNF disponível, travando a plasticidade", "Aumentar indefinidamente a plasticidade sináptica", "Não ter qualquer relação com neuroplasticidade", "Acelerar exclusivamente a neurogênese hipocampal"]],
    ["Por que insight isolado, sem prática repetida, raramente consolida mudança duradoura?", ["Porque a mudança estrutural depende de repetição consistente, não apenas compreensão cognitiva", "Porque insight nunca tem qualquer relação com mudança neural", "Porque a prática repetida é irrelevante pra consolidação", "Porque qualquer mudança ocorre instantaneamente, sem necessidade de repetição"]],
    ["O passo \"psicoeducar sobre o mecanismo\", no modelo de aplicação, tem como objetivo principal:", ["Aumentar a adesão à prática entre sessões, reformulando-a como parte do mecanismo de mudança", "Substituir completamente a necessidade de qualquer prática entre sessões", "Desencorajar o paciente a praticar fora da sessão", "Eliminar a necessidade de qualquer acompanhamento contínuo"]],
    ["Diante de insônia crônica limitando a plasticidade de um paciente, o módulo recomenda considerar:", ["Módulo 4.23 (Insônia)", "Nenhuma intervenção complementar é necessária", "Apenas aumentar a intensidade da prática, ignorando o sono", "Encerrar o acompanhamento imediatamente"]],
    ["Progresso incremental pequeno, ao longo do tempo, deve ser interpretado como:", ["Evidência real de reorganização neural em curso, não como falta de resultado", "Sinal de que a terapia não está funcionando", "Irrelevante pro processo terapêutico", "Prova de que o diagnóstico está incorreto"]],
  ];
  const gabaritoObjetivas = ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a"];

  const children = [
    ...doc.capa(KICKER, "Avaliação — Neuroplasticidade", `Avaliação formativa de encerramento do Módulo ${MOD}.`),
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
    doc.vinhetaBox("Uma paciente relata que entende perfeitamente, de forma racional, o que precisa fazer diferente em conflitos familiares, mas continua reagindo do mesmo jeito \"antigo\" toda vez. Relata dormir mal há meses e estar sob estresse constante no trabalho, e não realizou nenhuma das tarefas práticas sugeridas nas últimas sessões."),
    new doc.Paragraph({ spacing: { before: 240 }, children: [new doc.TextRun({ text: "Com base no protocolo estudado, responda:", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    new doc.Paragraph({ spacing: { before: 220, after: 40 }, children: [new doc.TextRun({ text: "a) (10 pts) Que 2 fatores de base podem estar travando a plasticidade dessa paciente?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "b) (10 pts) Por que o insight racional dela não é suficiente pra gerar mudança de comportamento automático?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "c) (10 pts) Que módulo complementar você consideraria, dado o padrão de sono relatado?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "d) (10 pts) Como você abordaria a não realização das tarefas práticas, à luz da psicoeducação sobre neuroplasticidade?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    new doc.Paragraph({ spacing: { after: 40 }, children: [new doc.TextRun({ text: "USO EXCLUSIVO DO INSTRUTOR — remover antes de aplicar a prova", bold: true, color: doc.TERRA, font: doc.FONT, size: 20 })] }),
    doc.tituloH1("Gabarito"),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 1 — Questões objetivas", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 200 }, children: [new doc.TextRun({ text: gabaritoObjetivas.map((r, i) => `${i + 1}-${r}`).join("   ·   "), font: doc.FONT, size: 22, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 2 — Critério de correção da questão de caso", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "a) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Sono inadequado prolongado e estresse crônico no trabalho — ambos reduzem BDNF e a plasticidade disponível.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "b) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Porque a mudança de padrão automático depende de fortalecimento sináptico repetido (LTP), não apenas de compreensão cognitiva — o insight sozinho não reorganiza a via neural antiga.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "c) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Módulo 4.23 (Insônia), dado o padrão de sono ruim relatado há meses.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "d) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Explorar, sem julgamento, o que dificultou a prática, reformular as tarefas como parte central do mecanismo de mudança (não \"extra\"), e considerar começar com metas menores e mais viáveis dado o contexto de sobrecarga atual.", font: doc.FONT, size: 21, color: doc.INK })] }),
  );

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-1.4-Avaliacao.docx");
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
      n: 1, titulo: "Por que a terapia funciona", duracao: "12 min", slides: "1, 2, 3, 4",
      objetivo: "Sair sabendo explicar o mecanismo da neuroplasticidade sem jargão técnico.",
      segmentos: [
        seg("0:00–0:45", "Abertura (gancho)", [{ fala: "Terapia não é uma conversa que muda a forma como você pensa — é uma prática repetida que muda, literalmente, a estrutura física das conexões no seu cérebro." }]),
        seg("0:45–2:00", "Por que essa reformulação importa", ["Aumenta significativamente a adesão às tarefas entre sessões."]),
        seg("2:00–8:00", "O que muda fisicamente (mostrar slide 4)", [
          "Sinapses: fortalecimento por potenciação de longo prazo (LTP).",
          "BDNF: fator neurotrófico que sustenta crescimento de conexões.",
          "Hipocampo: um dos poucos locais de neurogênese na vida adulta.",
          "Vias não utilizadas: enfraquecidas por poda sináptica adaptativa.",
        ]),
        seg("8:00–10:30", "Um ponto importante", ["\"Praticar até ficar automático\" tem, literalmente, base biológica."]),
        seg("10:30–12:00", "Fechamento", [{ fala: "Próxima aula: como a prática repetida vira mudança consolidada." }]),
      ],
    },
    {
      n: 2, titulo: "Da prática repetida à mudança consolidada", duracao: "10 min", slides: "5",
      objetivo: "Explicar a cadeia entre experiência repetida, fortalecimento sináptico e consolidação.",
      segmentos: [
        seg("0:00–1:00", "Retomada rápida", ["Vimos as estruturas envolvidas. Hoje vemos como elas trabalham em sequência."]),
        seg("1:00–6:30", "A cadeia (mostrar slide 5)", ["Experiência repetida: novo padrão praticado de forma consistente.", "Fortalecimento sináptico: LTP e BDNF sustentam o crescimento.", "Nova via mais eficiente: compete com o caminho antigo.", "Padrão consolidado: menos dependente de esforço consciente."]),
        seg("6:30–9:00", "O princípio de Hebb", ["\"Neurônios que disparam juntos, se conectam juntos\" — por que repetição consistente vence insight isolado."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: os 3 elementos centrais da neuroplasticidade." }]),
      ],
    },
    {
      n: 3, titulo: "Os 3 elementos e o que favorece ou trava", duracao: "12 min", slides: "6, 7",
      objetivo: "Reconhecer os 3 elementos centrais e os fatores que aceleram ou travam a plasticidade.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três elementos — e fatores concretos que você pode orientar o paciente a otimizar."]),
        seg("1:00–6:00", "Os 3 elementos (mostrar slide 6)", [
          "Plasticidade sináptica: fortalecimento por LTP.",
          "Neurogênese: formação de novos neurônios, especialmente no hipocampo.",
          "Poda sináptica adaptativa: enfraquecimento de vias não utilizadas.",
        ]),
        seg("6:00–10:30", "O que favorece e o que trava (mostrar slide 7)", [
          "Favorece: sono adequado, exercício, atenção focada, novidade com desafio moderado.",
          "Trava: estresse crônico/cortisol elevado, prática inconsistente.",
        ]),
        seg("10:30–12:00", "Fechamento", [{ fala: "Próxima aula: expectativas realistas sobre o ritmo da mudança." }]),
      ],
    },
    {
      n: 4, titulo: "Expectativas realistas sobre o ritmo da mudança", duracao: "10 min", slides: "8",
      objetivo: "Diferenciar insight isolado de prática consistente, e o impacto do estresse crônico.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Um filtro rápido — útil pra você e pro próprio paciente entenderem o ritmo esperado."]),
        seg("1:00–8:00", "Os 3 cenários (mostrar slide 8)", [
          "Insight isolado: raramente consolida mudança estrutural sozinho.",
          "Prática consistente: sustenta a plasticidade de forma mais confiável.",
          "Mudança sob estresse crônico: tende a ser mais lenta.",
        ]),
        seg("8:00–9:00", "Por que isso importa", ["Evita frustração precoce do paciente com o ritmo natural do processo."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: como monitorar o progresso de forma indireta." }]),
      ],
    },
    {
      n: 5, titulo: "Marcadores indiretos de progresso terapêutico", duracao: "10 min", slides: "9",
      objetivo: "Conectar a leitura de neuroplasticidade a formas práticas de monitorar evolução.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Não existe um teste direto de plasticidade — mas há marcadores indiretos úteis."]),
        seg("1:00–4:30", "Escalas seriadas", ["Reaplicação de BDI-II, GAD-7 etc ao longo do tempo — Módulo 2.5."]),
        seg("4:30–7:30", "Diário de prática", ["Registro de exercícios entre sessões — indicador direto de repetição."]),
        seg("7:30–9:00", "Observação clínica", ["Automaticidade crescente do novo padrão."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: colocamos tudo em prática — psicoeducação e prescrição de prática." }]),
      ],
    },
    {
      n: 6, titulo: "Aplicação — psicoeducar e prescrever prática deliberada", duracao: "13 min", slides: "10, 11",
      objetivo: "Aplicar os passos 1 e 2 do modelo, aumentando adesão desde a primeira sessão.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["A parte mais prática desse módulo. Hoje, os 2 primeiros passos."]),
        seg("1:00–2:00", "Visão geral (mostrar slide 10)", ["Psicoeducar sobre o mecanismo → Prescrever prática deliberada → Otimizar fatores de base → Celebrar progresso incremental."]),
        seg("2:00–7:00", "Passo 1 — Psicoeducar sobre o mecanismo (mostrar slide 11, esquerda)", [{ fala: "Terapia não é só uma conversa que muda como você pensa — é uma prática repetida que muda, literalmente, as conexões no seu cérebro." }]),
        seg("7:00–12:00", "Passo 2 — Prescrever prática deliberada (mostrar slide 11, direita)", ["Defina tarefas específicas, mensuráveis e repetíveis.", "Comece pequeno — consistência importa mais que intensidade."]),
        seg("12:00–13:00", "Fechamento", [{ fala: "Próxima aula: otimizar fatores de base e celebrar progresso incremental." }]),
      ],
    },
    {
      n: 7, titulo: "Aplicação — otimizar fatores e celebrar progresso", duracao: "11 min", slides: "12",
      objetivo: "Trabalhar fatores de base e reforço de progresso incremental.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Hoje fechamos o modelo com os fatores que sustentam a mudança no longo prazo."]),
        seg("1:00–6:00", "Passo 3 — Otimizar fatores de base (mostrar slide 12, esquerda)", ["Investigue sono e estresse crônico como fatores limitantes.", "Considere protocolos complementares (Módulos 4.3 e 4.23) quando relevante."]),
        seg("6:00–10:00", "Passo 4 — Celebrar progresso incremental (mostrar slide 12, direita)", ["Nomeie pequenas mudanças como evidência de reorganização neural real.", "Isso reforça autoeficácia, que sustenta mais prática consistente."]),
        seg("10:00–11:00", "Fechamento", [{ fala: "Modelo completo. Próxima aula: um caso real e os critérios de quando escalar." }]),
      ],
    },
    {
      n: 8, titulo: "Estudo de caso, encaminhamento e recap", duracao: "14 min", slides: "13, 14, 15",
      objetivo: "Integrar todo o módulo num caso completo, encerrando o Bloco 1.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Última aula do módulo — e do Bloco 1 inteiro. Caso completo e os critérios de quando aprofundar."]),
        seg("1:00–6:00", "Estudo de caso (mostrar slide 13)", ["Leia a vinheta com calma.", "Percorra as 3 perguntas de discussão.", "Convide o aluno a pausar e responder por escrito."]),
        seg("6:00–10:00", "Quando encaminhar (mostrar slide 14)", ["Percorra os 4 critérios, com atenção aos fatores de base que podem estar travando o progresso."]),
        seg("10:00–13:00", "Recapitulando o módulo (mostrar slide 15)", ["Retome os 4 pontos-chave.", "Reforce a reformulação central: prática, não apenas insight, é o que consolida mudança."]),
        seg("13:00–14:00", "Fechamento do módulo e do bloco", [{ fala: "Agora é hora dos exercícios e da avaliação. Com isso, encerramos o Bloco 1 completo de Fundamentos." }]),
      ],
    },
  ];

  const totalMin = 12 + 10 + 12 + 10 + 10 + 13 + 11 + 14;

  const children = [
    ...doc.capa(KICKER, "Roteiro de Aulas — Neuroplasticidade", "Módulo dividido em 8 vídeo-aulas de 10 a 15 minutos, seguindo os slides já produzidos. Cada aula tem roteiro cronometrado, pronto pra gravação."),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "Duração total do módulo em vídeo: ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: `${totalMin} minutos (${(totalMin / 60).toFixed(1)}h) em 8 aulas`, font: doc.FONT, size: 21, color: doc.INK })] }),
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

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", `${RODAPE_DOC} — Roteiro de Aulas`, children), "Modulo-1.4-Roteiro-Aulas.docx");
}

// ============================================================
Promise.resolve()
  .then(construirDeck)
  .then(construirExercicios)
  .then(construirProva)
  .then(construirRoteiro)
  .then(() => console.log("TUDO PRONTO"))
  .catch((e) => { console.error(e); process.exit(1); });

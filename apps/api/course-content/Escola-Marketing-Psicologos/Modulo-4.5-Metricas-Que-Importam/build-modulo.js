const deck = require("../_lib/lib-deck.js");
const doc = require("../_lib/lib-doc.js");

const MOD = "4.5";
const NOME = "Métricas que Importam";
const RODAPE_DECK = `Métricas que Importam — Módulo ${MOD}`;
const RODAPE_DOC = `Módulo ${MOD} — Métricas que Importam`;
const KICKER = "MÓDULO 4.5 · AQUISIÇÃO DE PACIENTES: ORGÂNICO E PAGO";
const MARCA = "Escola de Marketing para Psicólogos — by Dioclides";

// ============================================================
// 1) SLIDE DECK
// ============================================================
function construirDeck() {
  const pres = deck.novaApresentacao(`${NOME} — O Painel Mínimo Pra Decidir com Clareza`);

  deck.slideTitulo(pres, {
    moduloLabel: `Módulo ${MOD} · Bloco 4 · Aquisição de Pacientes`,
    titulo: "Métricas que Importam",
    subtitulo: "O painel mínimo de números pra saber se a aquisição está funcionando, sem virar analista de dados",
    rodapeMarca: MARCA,
    passos: ["Por quê", "As métricas", "Interpretar", "Erros", "Aplicação"],
  });

  deck.slideRoteiro(pres, {
    rodape: RODAPE_DECK, pageNum: 2,
    cards: [
      { titulo: "Por que medir", desc: "A diferença entre achar que funciona e saber que funciona" },
      { titulo: "As métricas certas", desc: "4 números que resumem todo o Bloco 4" },
      { titulo: "Como interpretar", desc: "Do número isolado à decisão concreta" },
      { titulo: "Erros comuns", desc: "As formas mais frequentes de medir errado" },
      { titulo: "Aplicação prática", desc: "Diagnosticando um caso de métricas confusas" },
    ],
  });

  deck.slideHook(pres, {
    rodape: RODAPE_DECK, pageNum: 3,
    frase: "Você não precisa de um dashboard complexo pra saber se o marketing está funcionando — precisa de 4 números, olhados com regularidade, que dizem exatamente onde investir energia.",
    apoio: "Este módulo fecha o Bloco 4 consolidando as métricas já mencionadas nos Módulos 4.1 e 4.4 num painel único e simples de manter.",
  });

  deck.slideCircuito(pres, {
    rodape: RODAPE_DECK, pageNum: 4,
    titulo: "4 métricas que resumem o Bloco 4",
    regioes: [
      { label: "Alcance: quantas pessoas novas viram seu conteúdo", rx: 0.20, ry: 0.22, color: deck.NAVY, d: 0.5 },
      { label: "Engajamento: comentários, salvamentos e mensagens", rx: 0.22, ry: 0.62, color: deck.TERRA, d: 0.4 },
      { label: "Agendamento: quantos contatos viraram sessão marcada", rx: 0.60, ry: 0.60, color: deck.NAVY_TINT, d: 0.36 },
      { label: "Custo por lead: relevante só quando há investimento pago", rx: 0.58, ry: 0.24, color: deck.TERRA_TINT, d: 0.36 },
    ],
    notas: [
      "As 3 primeiras métricas já apareceram no Módulo 4.1, mapeadas por estágio do funil — aqui elas se tornam um hábito de acompanhamento.",
      "Custo por lead só entra na conta pra quem já investe em anúncios pagos, tema do Módulo 4.4.",
    ],
  });

  deck.slideCadeia(pres, {
    rodape: RODAPE_DECK, pageNum: 5,
    titulo: "Do número à decisão",
    elos: [
      { titulo: "Coletar o dado", desc: "Registrar as 4 métricas, sempre no mesmo dia do mês" },
      { titulo: "Comparar", desc: "Com o mês anterior, não com \"a média do mercado\"" },
      { titulo: "Identificar o que mudou", desc: "Que ação recente pode explicar a diferença observada" },
      { titulo: "Ajustar uma variável", desc: "Uma coisa de cada vez, pra saber o que realmente funcionou" },
    ],
    notaFinal: "Mudar tudo ao mesmo tempo é o erro mais comum — sem isolar a variável, nenhum número ensina nada sobre o que fazer a seguir.",
  });

  deck.slideCategorias(pres, {
    rodape: RODAPE_DECK, pageNum: 6,
    titulo: "3 níveis de acompanhamento",
    categorias: [
      { titulo: "Mínimo", desc: "Revisão mensal das 4 métricas — suficiente pra maioria dos consultórios individuais", color: deck.NAVY },
      { titulo: "Intermediário", desc: "Revisão quinzenal, separando por canal (Instagram, Google, indicação)", color: deck.TERRA },
      { titulo: "Avançado", desc: "Revisão semanal, com testes comparando diferentes versões de conteúdo", color: deck.NAVY_TINT },
    ],
    notaFinal: "Comece pelo nível mínimo — a maioria dos problemas de aquisição aparece já nesse acompanhamento mais simples.",
  });

  deck.slideSinais(pres, {
    rodape: RODAPE_DECK, pageNum: 7,
    titulo: "Sinais de que você está medindo errado",
    itens: [
      { titulo: "Só olha seguidores", desc: "Número de seguidores diz pouco sobre agendamento real" },
      { titulo: "Compara sem contexto", desc: "Olhar concorrente sem saber o histórico ou estratégia por trás" },
      { titulo: "Muda tudo de uma vez", desc: "Impossível saber qual ajuste específico funcionou" },
      { titulo: "Nunca revisita o passado", desc: "Sem comparação histórica, todo número parece isolado" },
    ],
  });

  deck.slideDiferencial(pres, {
    rodape: RODAPE_DECK, pageNum: 8,
    titulo: "3 tipos de métrica",
    cards: [
      { titulo: "Métrica de vaidade", desc: "Seguidores, curtidas — impressiona, mas diz pouco sobre agenda" },
      { titulo: "Métrica de processo", desc: "Alcance, engajamento — mostra se o funil está em movimento" },
      { titulo: "Métrica de resultado", desc: "Agendamento, comparecimento — o que realmente sustenta o consultório" },
    ],
  });

  deck.slideInstrumentos(pres, {
    rodape: RODAPE_DECK, pageNum: 9,
    titulo: "3 ferramentas simples de acompanhamento",
    instrumentos: [
      { sigla: "Planilha", nome: "Uma planilha mensal simples, sem fórmulas complexas", desc: "4 colunas, uma por métrica, uma linha por mês." },
      { sigla: "Nativas", nome: "Instagram Insights e Google Perfil da Empresa", desc: "Já trazem alcance e engajamento prontos, sem custo extra." },
      { sigla: "Pergunta direta", nome: "\"Como você me encontrou?\" a cada novo paciente", desc: "O dado mais simples e mais subestimado de todos." },
    ],
  });

  deck.slideProtocoloOverview(pres, {
    rodape: RODAPE_DECK, pageNum: 10,
    titulo: "Montando seu painel: 4 passos",
    passos: [
      { titulo: "Escolher as\n4 métricas certas", desc: "Pro seu momento atual, começando pelo nível mínimo" },
      { titulo: "Registrar\nmensalmente", desc: "Sempre no mesmo dia, sem pular o mês" },
      { titulo: "Comparar com\no mês anterior", desc: "Não com concorrentes ou médias genéricas de mercado" },
      { titulo: "Ajustar uma\nvariável por vez", desc: "Pra saber, de fato, o que causou a mudança observada" },
    ],
    notaFinal: "Esses 4 passos levam menos de 15 minutos por mês e substituem qualquer dashboard complexo pra quem está começando.",
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 11,
    titulo: "Passos 1 e 2, na prática",
    colunas: [
      {
        numero: 1, titulo: "Escolher as 4 métricas certas",
        bullets: ["Comece pelo nível mínimo: alcance, engajamento, agendamento e custo por lead (se houver anúncio)", "Adicione métricas por canal só quando o nível mínimo já estiver consolidado"],
      },
      {
        numero: 2, titulo: "Registrar mensalmente",
        fala: "“Se eu escolher o dia 1 de cada mês pra registrar essas 4 métricas, consigo manter esse hábito por 6 meses seguidos?”",
        bullets: ["Escolha uma data fixa e reserve 15 minutos — consistência importa mais que sofisticação"],
      },
    ],
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 12,
    titulo: "Passos 3 e 4, na prática",
    colunas: [
      {
        numero: 3, titulo: "Comparar com o mês anterior",
        bullets: ["A pergunta certa é \"melhorou ou piorou em relação a mim mesmo?\", não \"estou pior que o colega?\"", "Guarde o histórico — sem ele, toda comparação futura fica impossível"],
      },
      {
        numero: 4, titulo: "Ajustar uma variável por vez",
        bullets: ["Mudou o tipo de conteúdo? Espere um mês antes de mudar mais alguma coisa", "Isso vale tanto pra conteúdo orgânico quanto pra ajustes em campanha paga"],
      },
    ],
  });

  deck.slideCaso(pres, {
    rodape: RODAPE_DECK, pageNum: 13,
    vinheta: "Um psicólogo mudou o horário de postagem, trocou o tipo de conteúdo, começou a investir em anúncio pago e mudou a foto de perfil, tudo na mesma semana. No mês seguinte, os agendamentos aumentaram, mas ele não sabe dizer qual mudança causou o resultado — e está pensando em manter tudo igual, com medo de que qualquer alteração atrapalhe.",
    perguntas: [
      "Que erro de medição do slide 7 esse caso exemplifica claramente?",
      "Por que o medo de mudar qualquer coisa agora é uma consequência direta desse erro?",
      "Como ele deveria proceder daqui pra frente, seguindo os 4 passos do protocolo?",
    ],
  });

  deck.slideEncaminhamento(pres, {
    rodape: RODAPE_DECK, pageNum: 14,
    titulo: "Quando buscar ajuda especializada",
    criterios: [
      "Volume de dados grande o suficiente pra justificar ferramenta dedicada: considerar planilha mais robusta ou software simples de gestão",
      "Investimento em anúncios pagos crescente: acompanhar com apoio de gestor de tráfego (Módulo 4.4)",
      "Dificuldade persistente em manter o hábito de registro mensal: simplificar ainda mais, reduzindo pra 2 métricas se necessário",
      "Métricas boas, mas agenda ainda não enchendo: revisar o funil completo (Módulo 4.1) e a etapa de conversão (Bloco 5)",
    ],
  });

  deck.slideRecap(pres, {
    rodape: RODAPE_DECK, pageNum: 15,
    pontos: [
      "Alcance, engajamento, agendamento e custo por lead resumem tudo que o Bloco 4 ensinou sobre aquisição",
      "Métricas de vaidade impressionam, mas métricas de resultado sustentam o consultório",
      "Comparar com o mês anterior, não com concorrentes, é o hábito que realmente orienta decisão",
      "Ajustar uma variável de cada vez é o que transforma dado solto em aprendizado real",
    ],
    proximoTexto: "Bloco 4 completo. Próximo: exercícios práticos e avaliação do Módulo 4.5 →",
  });

  return pres.writeFile({ fileName: "Modulo-4.5-Metricas-Que-Importam.pptx" });
}

// ============================================================
// 2) EXERCÍCIOS
// ============================================================
function construirExercicios() {
  const children = [
    ...doc.capa(KICKER, "Exercícios — Métricas que Importam", "Resolva individualmente, de preferência já criando sua própria planilha de acompanhamento enquanto responde."),

    doc.exNum(1, "As 4 métricas essenciais"),
    doc.pergunta(1, "Liste as 4 métricas do painel mínimo e o que cada uma mede."),
    ...doc.linhaResposta(3),

    doc.exNum(2, "Os 3 tipos de métrica"),
    doc.tabelaSimples(["Tipo", "O que revela"], [["Métrica de vaidade", ""], ["Métrica de processo", ""], ["Métrica de resultado", ""]], [3600, 5550]),

    doc.exNum(3, "Montando seu próprio painel"),
    doc.pergunta(1, "Em que nível de acompanhamento (mínimo, intermediário, avançado) você está hoje?"),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Escolha uma data fixa do mês pra registrar suas 4 métricas, e anote aqui como compromisso."),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),

    doc.exNum(4, "Reconhecendo erros de medição"),
    doc.pergunta(1, "Por que comparar seu número de seguidores com o de um concorrente costuma ser pouco útil?"),
    ...doc.linhaResposta(2),

    doc.exNum(5, "Caso integrado — as mudanças simultâneas"),
    doc.vinhetaBox("Um psicólogo mudou horário de postagem, tipo de conteúdo, começou anúncio pago e trocou a foto de perfil na mesma semana; agendamentos aumentaram, mas ele não sabe qual mudança causou o resultado."),
    doc.pergunta(1, "Que erro de medição esse caso exemplifica claramente?"),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Por que o medo de mudar qualquer coisa agora é uma consequência direta desse erro?"),
    ...doc.linhaResposta(2),
    doc.pergunta(3, "Como ele deveria proceder daqui pra frente, seguindo os 4 passos do protocolo?"),
    ...doc.linhaResposta(2),
  ];

  return doc.salvar(doc.paginaDoc("Escola de Marketing para Psicólogos", RODAPE_DOC, children), "Modulo-4.5-Exercicios.docx");
}

// ============================================================
// 3) AVALIAÇÃO
// ============================================================
function construirProva() {
  const objetivas = [
    ["As 4 métricas do painel mínimo, segundo o módulo, são:", ["Alcance, engajamento, agendamento e custo por lead", "Seguidores, curtidas, comentários e compartilhamentos", "Preço, localização, horário e forma de pagamento", "Identificação, veracidade, sigilo e comparação"]],
    ["\"Custo por lead\" só é relevante, segundo o módulo, quando:", ["Há investimento em anúncios pagos", "O consultório atende exclusivamente de forma presencial", "O profissional já atingiu o nível avançado de acompanhamento", "Não há qualquer conteúdo publicado nas redes sociais"]],
    ["Métrica de vaidade, segundo a classificação do módulo, é exemplificada por:", ["Número de seguidores e curtidas", "Taxa de agendamento e comparecimento", "Alcance e engajamento", "Custo por lead em campanha paga"]],
    ["O erro \"mudar tudo ao mesmo tempo\" torna difícil:", ["Saber qual ajuste específico causou a mudança observada", "Registrar as métricas mensalmente", "Definir o nível de acompanhamento adequado", "Escolher entre métricas de processo e de resultado"]],
    ["A pergunta certa ao comparar métricas, segundo o módulo, é:", ["\"Melhorou ou piorou em relação a mim mesmo?\"", "\"Estou pior que meu concorrente direto?\"", "\"Qual é a média geral do mercado?\"", "\"Quantos seguidores tem o maior perfil da minha área?\""]],
    ["O nível de acompanhamento recomendado pra começar, segundo o módulo, é:", ["Mínimo — revisão mensal das 4 métricas", "Avançado — revisão semanal com testes A/B", "Intermediário — revisão quinzenal por canal", "Nenhum nível é necessário no início"]],
    ["\"Pergunta direta\" como ferramenta de acompanhamento consiste em:", ["Perguntar \"como você me encontrou?\" a cada novo paciente", "Aplicar uma escala validada de satisfação", "Solicitar avaliação obrigatória no Google", "Comparar diretamente com a concorrência"]],
    ["Diante de dificuldade persistente em manter o hábito de registro mensal, o módulo recomenda:", ["Simplificar ainda mais, reduzindo pra 2 métricas se necessário", "Abandonar completamente o acompanhamento de métricas", "Aumentar a frequência para registro diário obrigatório", "Contratar imediatamente um analista de dados"]],
    ["Diante de métricas boas, mas agenda ainda não enchendo, o módulo recomenda revisar:", ["O funil completo e a etapa de conversão", "Apenas o número de seguidores do perfil", "Exclusivamente o valor cobrado pela sessão", "Nenhuma ação adicional é necessária nesse cenário"]],
    ["Este módulo encerra o Bloco 4 consolidando métricas já mencionadas em quais módulos anteriores?", ["Módulos 4.1 e 4.4", "Módulos 2.1 e 2.2", "Módulos 1.1 e 1.2", "Módulos 5.1 e 5.2"]],
  ];
  const gabaritoObjetivas = ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a"];

  const children = [
    ...doc.capa(KICKER, "Avaliação — Métricas que Importam", `Avaliação formativa de encerramento do Módulo ${MOD} e do Bloco 4.`),
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
    doc.vinhetaBox("Uma psicóloga acompanha há 4 meses apenas o número de seguidores do Instagram, que cresceu de 500 para 2.000. Mesmo assim, ela sente que a agenda não mudou muito nesse período e não sabe explicar por quê."),
    new doc.Paragraph({ spacing: { before: 240 }, children: [new doc.TextRun({ text: "Com base no protocolo estudado, responda:", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    new doc.Paragraph({ spacing: { before: 220, after: 40 }, children: [new doc.TextRun({ text: "a) (10 pts) Que tipo de métrica ela está acompanhando, e por que isso não explica o resultado na agenda?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "b) (10 pts) Quais métricas de resultado ela deveria passar a acompanhar a partir de agora?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "c) (10 pts) Que ferramenta simples ela poderia usar imediatamente, sem qualquer custo, pra começar a medir melhor?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "d) (10 pts) Proponha um plano de 4 passos pra ela reorganizar seu acompanhamento de métricas.", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(3),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    new doc.Paragraph({ spacing: { after: 40 }, children: [new doc.TextRun({ text: "USO EXCLUSIVO DO INSTRUTOR — remover antes de aplicar a prova", bold: true, color: doc.TERRA, font: doc.FONT, size: 20 })] }),
    doc.tituloH1("Gabarito"),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 1 — Questões objetivas", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 200 }, children: [new doc.TextRun({ text: gabaritoObjetivas.map((r, i) => `${i + 1}-${r}`).join("   ·   "), font: doc.FONT, size: 22, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 2 — Critério de correção da questão de caso", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "a) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Métrica de vaidade — seguidores medem alcance de audiência, não conversão em agendamento, que é o que sustenta o consultório.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "b) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Taxa de agendamento (quantos contatos viraram sessão marcada) e, se aplicável, custo por lead — as métricas de resultado do painel mínimo.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "c) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Perguntar diretamente \"como você me encontrou?\" a cada novo paciente — a ferramenta mais simples e sem custo.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "d) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Escolher as 4 métricas certas (incluindo agendamento), registrar mensalmente numa data fixa, comparar com o mês anterior, e ajustar uma variável de cada vez.", font: doc.FONT, size: 21, color: doc.INK })] }),
  );

  return doc.salvar(doc.paginaDoc("Escola de Marketing para Psicólogos", RODAPE_DOC, children), "Modulo-4.5-Avaliacao.docx");
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
      n: 1, titulo: "Por que medir, e as 4 métricas essenciais", duracao: "12 min", slides: "1, 2, 3, 4",
      objetivo: "Sair sabendo por que medir importa e quais são as 4 métricas do painel mínimo.",
      segmentos: [
        seg("0:00–0:45", "Abertura (gancho)", [{ fala: "Você não precisa de um dashboard complexo pra saber se o marketing está funcionando — precisa de 4 números, olhados com regularidade, que dizem exatamente onde investir energia." }]),
        seg("0:45–2:00", "Por que isso importa", ["Este módulo fecha o Bloco 4 consolidando as métricas já mencionadas nos Módulos 4.1 e 4.4."]),
        seg("2:00–8:00", "As 4 métricas (mostrar slide 4)", [
          "Alcance: quantas pessoas novas viram seu conteúdo.",
          "Engajamento: comentários, salvamentos e mensagens.",
          "Agendamento: quantos contatos viraram sessão marcada.",
          "Custo por lead: só quando há investimento pago.",
        ]),
        seg("8:00–11:00", "Um ponto importante", ["As 3 primeiras métricas já apareceram no Módulo 4.1 — aqui elas se tornam um hábito de acompanhamento."]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Próxima aula: do número à decisão, e os 3 níveis de acompanhamento." }]),
      ],
    },
    {
      n: 2, titulo: "Do número à decisão, e os 3 níveis de acompanhamento", duracao: "11 min", slides: "5, 6",
      objetivo: "Explicar a cadeia de interpretação de métricas e os 3 níveis de acompanhamento.",
      segmentos: [
        seg("0:00–1:00", "Retomada rápida", ["Vimos as 4 métricas. Hoje, como transformar número em decisão."]),
        seg("1:00–5:00", "A cadeia (mostrar slide 5)", ["Coletar → Comparar → Identificar o que mudou → Ajustar uma variável."]),
        seg("5:00–10:00", "Os 3 níveis (mostrar slide 6)", ["Mínimo, intermediário e avançado — comece pelo mínimo, quase sempre suficiente."]),
        seg("10:00–11:00", "Fechamento", [{ fala: "Próxima aula: os erros mais comuns de medição, e os 3 tipos de métrica." }]),
      ],
    },
    {
      n: 3, titulo: "Erros comuns e os 3 tipos de métrica", duracao: "12 min", slides: "7, 8",
      objetivo: "Reconhecer erros comuns de medição e diferenciar os 3 tipos de métrica.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Quatro erros comuns — e três tipos de métrica, do menos ao mais relevante."]),
        seg("1:00–6:00", "Erros comuns (mostrar slide 7)", [
          "Só olhar seguidores.",
          "Comparar sem contexto.",
          "Mudar tudo de uma vez.",
          "Nunca revisitar o passado.",
        ]),
        seg("6:00–11:00", "3 tipos de métrica (mostrar slide 8)", ["Vaidade, processo e resultado — cada uma dizendo algo diferente sobre o consultório."]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Próxima aula: as ferramentas simples de acompanhamento, e os 4 passos completos." }]),
      ],
    },
    {
      n: 4, titulo: "Ferramentas simples e os 4 passos do painel", duracao: "11 min", slides: "9, 10",
      objetivo: "Conhecer as 3 ferramentas simples de acompanhamento e os 4 passos de montagem do painel.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três ferramentas simples — e um processo de 4 passos pra montar seu próprio painel."]),
        seg("1:00–5:00", "3 ferramentas (mostrar slide 9)", ["Planilha simples, métricas nativas das plataformas, e a pergunta direta ao paciente."]),
        seg("5:00–10:00", "Os 4 passos (mostrar slide 10)", ["Escolher as métricas certas, registrar mensalmente, comparar com o mês anterior, ajustar uma variável por vez."]),
        seg("10:00–11:00", "Fechamento", [{ fala: "Próxima aula: aplicando os 4 passos na prática." }]),
      ],
    },
    {
      n: 5, titulo: "Aplicação prática dos 4 passos", duracao: "12 min", slides: "11, 12",
      objetivo: "Aplicar os 4 passos com exemplos concretos.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Hoje colocamos os 4 passos em prática, criando o hábito de medir."]),
        seg("1:00–6:00", "Passos 1 e 2 (mostrar slide 11)", ["Comece pelo nível mínimo, com 4 métricas simples.", { fala: "Se eu escolher o dia 1 de cada mês pra registrar essas 4 métricas, consigo manter esse hábito por 6 meses seguidos?" }]),
        seg("6:00–11:00", "Passos 3 e 4 (mostrar slide 12)", ["Compare sempre com você mesmo, não com concorrentes.", "Ajuste uma variável de cada vez, com paciência de esperar o resultado."]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Próxima aula: um caso real de mudanças simultâneas, e o recap final do Bloco 4." }]),
      ],
    },
    {
      n: 6, titulo: "Prática guiada — as mudanças simultâneas e encerramento do Bloco 4", duracao: "13 min", slides: "13, 14, 15",
      objetivo: "Aplicar tudo que foi visto a um caso real e encerrar o Bloco 4.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["A última aula do Bloco 4 — um caso real, e o recap final."]),
        seg("1:00–5:00", "Apresentando o caso (mostrar slide 13)", ["Leia a vinheta com calma.", "Note que o resultado até melhorou — o problema é não saber por quê."]),
        seg("5:00–9:00", "Percorrendo as perguntas de discussão", ["Discuta em voz alta as 3 perguntas do slide 13.", "Esboce um plano de reorganização de métricas pra esse caso."]),
        seg("9:00–11:00", "Quando buscar ajuda especializada (mostrar slide 14)", ["Percorra os 4 critérios do slide 14."]),
        seg("11:00–13:00", "Recap final e encerramento do bloco (mostrar slide 15)", [{ fala: "Retome os 4 pontos-chave. Você concluiu o Bloco 4 — aquisição de pacientes documentada, ativa e mensurável. Agora é hora dos exercícios e da avaliação." }]),
      ],
    },
  ];

  const totalMin = 12 + 11 + 12 + 11 + 12 + 13;

  const children = [
    ...doc.capa(KICKER, "Roteiro de Aulas — Métricas que Importam", "Módulo dividido em 6 vídeo-aulas de 11 a 13 minutos, seguindo os slides já produzidos. Cada aula tem roteiro cronometrado, pronto pra gravação. Este é o último roteiro do Bloco 4."),
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

  return doc.salvar(doc.paginaDoc("Escola de Marketing para Psicólogos", `${RODAPE_DOC} — Roteiro de Aulas`, children), "Modulo-4.5-Roteiro-Aulas.docx");
}

// ============================================================
Promise.resolve()
  .then(construirDeck)
  .then(construirExercicios)
  .then(construirProva)
  .then(construirRoteiro)
  .then(() => console.log("TUDO PRONTO"))
  .catch((e) => { console.error(e); process.exit(1); });

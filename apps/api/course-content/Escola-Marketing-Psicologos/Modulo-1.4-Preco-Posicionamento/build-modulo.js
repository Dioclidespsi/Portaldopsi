const deck = require("../_lib/lib-deck.js");
const doc = require("../_lib/lib-doc.js");

const MOD = "1.4";
const NOME = "Preço e Posicionamento";
const RODAPE_DECK = `Preço e Posicionamento — Módulo ${MOD}`;
const RODAPE_DOC = `Módulo ${MOD} — Preço e Posicionamento`;
const KICKER = "MÓDULO 1.4 · FUNDAMENTOS DE POSICIONAMENTO E NICHO";
const MARCA = "Escola de Marketing para Psicólogos — by Dioclides";

// ============================================================
// 1) SLIDE DECK
// ============================================================
function construirDeck() {
  const pres = deck.novaApresentacao(`${NOME} — O Preço Também Comunica`);

  deck.slideTitulo(pres, {
    moduloLabel: `Módulo ${MOD} · Bloco 1 · Posicionamento e Nicho`,
    titulo: "Preço e Posicionamento",
    subtitulo: "Como o preço comunica (ou contradiz) o posicionamento escolhido",
    rodapeMarca: MARCA,
    passos: ["O sinal", "Erros", "Conexão", "Ajuste", "Aplicação"],
  });

  deck.slideRoteiro(pres, {
    rodape: RODAPE_DECK, pageNum: 2,
    cards: [
      { titulo: "O preço como sinal", desc: "O que um valor comunica, além do número em si" },
      { titulo: "Erros comuns", desc: "3 formas recorrentes de precificar sem estratégia" },
      { titulo: "Preço e posicionamento", desc: "Como os dois precisam estar alinhados" },
      { titulo: "Ajustando com segurança", desc: "3 perguntas antes de definir ou revisar o valor" },
      { titulo: "Aplicação prática", desc: "Corrigindo um preço desalinhado do posicionamento" },
    ],
  });

  deck.slideHook(pres, {
    rodape: RODAPE_DECK, pageNum: 3,
    frase: "Um preço baixo demais não atrai mais pacientes — atrai dúvida sobre a qualidade do que você oferece, mesmo sem ninguém dizer isso em voz alta.",
    apoio: "Este módulo encerra o Bloco 1 conectando tudo que você já definiu — recorte, persona e proposta de valor — a uma decisão que precisa ser coerente com todo o resto: o preço.",
  });

  deck.slideCircuito(pres, {
    rodape: RODAPE_DECK, pageNum: 4,
    titulo: "4 fatores que devem influenciar o preço",
    regioes: [
      { label: "Especialização e posicionamento, definidos neste bloco", rx: 0.20, ry: 0.22, color: deck.NAVY, d: 0.5 },
      { label: "Custo de vida e sustentabilidade real do consultório", rx: 0.22, ry: 0.62, color: deck.TERRA, d: 0.4 },
      { label: "Demanda observada na prática, não apenas suposição", rx: 0.60, ry: 0.60, color: deck.NAVY_TINT, d: 0.36 },
      { label: "Percepção de valor gerada pela comunicação, do Bloco 3", rx: 0.58, ry: 0.24, color: deck.TERRA_TINT, d: 0.36 },
    ],
    notas: [
      "\"O que o mercado cobra\" não é, sozinho, um critério suficiente — ele ignora seu posicionamento específico.",
      "Um preço bem definido reflete os outros 3 módulos deste bloco, não apenas uma pesquisa isolada de valores de colegas.",
    ],
  });

  deck.slideCadeia(pres, {
    rodape: RODAPE_DECK, pageNum: 5,
    titulo: "Do preço ao posicionamento percebido",
    elos: [
      { titulo: "Preço definido", desc: "O número que aparece na primeira conversa ou na bio" },
      { titulo: "Comparação implícita", desc: "A pessoa compara, mesmo sem dizer, com outras opções" },
      { titulo: "Percepção de valor", desc: "O preço molda a expectativa sobre a qualidade do serviço" },
      { titulo: "Decisão de agendar", desc: "Coerência entre preço e posicionamento aumenta a confiança" },
    ],
    notaFinal: "Um preço incoerente com o posicionamento gera dúvida nos dois sentidos: caro demais parece arrogante, barato demais parece inseguro.",
  });

  deck.slideCategorias(pres, {
    rodape: RODAPE_DECK, pageNum: 6,
    titulo: "3 erros comuns de precificação",
    categorias: [
      { titulo: "Preço por insegurança", desc: "Definido baixo por medo de não conseguir justificar um valor maior", color: deck.NAVY },
      { titulo: "Preço copiado", desc: "Igual ao de um colega, sem considerar contexto ou posicionamento próprio", color: deck.TERRA },
      { titulo: "Preço nunca revisto", desc: "O mesmo valor desde o início, mesmo com anos de experiência acumulada", color: deck.NAVY_TINT },
    ],
    notaFinal: "Os 3 erros têm uma coisa em comum: nenhum parte de uma análise real do próprio posicionamento e sustentabilidade.",
  });

  deck.slideSinais(pres, {
    rodape: RODAPE_DECK, pageNum: 7,
    titulo: "Sinais de que o preço está desalinhado",
    itens: [
      { titulo: "Vergonha de falar o valor", desc: "Desconforto perceptível ao comunicar o preço da sessão" },
      { titulo: "Abaixo de colegas parecidos", desc: "Valor menor que profissionais com formação e experiência similares" },
      { titulo: "Nunca reajustado", desc: "O mesmo preço desde o início da carreira, sem qualquer revisão" },
      { titulo: "Pedidos de desconto frequentes", desc: "Muitos pacientes questionando o valor logo na primeira conversa" },
    ],
  });

  deck.slideDiferencial(pres, {
    rodape: RODAPE_DECK, pageNum: 8,
    titulo: "3 posicionamentos de preço",
    cards: [
      { titulo: "Abaixo do mercado", desc: "Gera dúvida sobre qualidade, mesmo quando o trabalho é bom" },
      { titulo: "Alinhado", desc: "Coerente com posicionamento, formação e sustentabilidade real" },
      { titulo: "Acima, com posicionamento forte", desc: "Sustentável quando a proposta de valor justifica claramente a diferença" },
    ],
  });

  deck.slideInstrumentos(pres, {
    rodape: RODAPE_DECK, pageNum: 9,
    titulo: "3 perguntas antes de definir o preço",
    instrumentos: [
      { sigla: "Cobre custos?", nome: "Esse valor sustenta seu custo de vida e o consultório", desc: "A base mínima antes de qualquer outra consideração." },
      { sigla: "É coerente?", nome: "Esse valor é coerente com a especialização que você comunica", desc: "Posicionamento e preço precisam contar a mesma história." },
      { sigla: "Você justifica?", nome: "Você conseguiria justificar esse valor com confiança, se perguntado", desc: "Se a resposta for insegura, o preço provavelmente também está." },
    ],
  });

  deck.slideProtocoloOverview(pres, {
    rodape: RODAPE_DECK, pageNum: 10,
    titulo: "Ajustando seu preço: 4 passos",
    passos: [
      { titulo: "Calcular o\ncusto real", desc: "De sustentar sua vida e o consultório, com números concretos" },
      { titulo: "Pesquisar\ncolegas parecidos", desc: "Com posicionamento e formação semelhantes ao seu" },
      { titulo: "Definir um valor\njustificável", desc: "Que você comunicaria com confiança, sem hesitação" },
      { titulo: "Revisar\nperiodicamente", desc: "Não apenas quando o desconforto se tornar insustentável" },
    ],
    notaFinal: "Reajustar preço não é um evento único — é parte do mesmo cuidado contínuo dado à comunicação e ao posicionamento.",
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 11,
    titulo: "Passos 1 e 2, na prática",
    colunas: [
      {
        numero: 1, titulo: "Calcular o custo real",
        bullets: ["Some despesas pessoais, custos do consultório e uma margem de reserva", "Divida pelo número real de sessões que você consegue sustentar por mês"],
      },
      {
        numero: 2, titulo: "Pesquisar colegas parecidos",
        fala: "“Profissionais com posicionamento e formação semelhantes ao meu cobram quanto, nessa mesma região?”",
        bullets: ["Compare com quem tem posicionamento parecido, não com qualquer psicólogo disponível"],
      },
    ],
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 12,
    titulo: "Passos 3 e 4, na prática",
    colunas: [
      {
        numero: 3, titulo: "Definir um valor justificável",
        bullets: ["Use as 3 perguntas do slide 9 pra confirmar que o valor é sustentável e coerente", "Se a resposta a alguma pergunta for \"não\", ajuste antes de comunicar o preço"],
      },
      {
        numero: 4, titulo: "Revisar periodicamente",
        bullets: ["Reavalie o valor a cada 6 a 12 meses, considerando experiência e posicionamento", "Não espere o desconforto virar insustentável pra fazer o primeiro reajuste"],
      },
    ],
  });

  deck.slideCaso(pres, {
    rodape: RODAPE_DECK, pageNum: 13,
    vinheta: "Uma psicóloga com 6 anos de experiência, já com especialização clara (Módulo 1.1), persona definida (Módulo 1.2) e proposta de valor forte (Módulo 1.3), ainda cobra o mesmo valor que definiu no primeiro ano de consultório. Ela sente desconforto ao pensar em aumentar, achando que pode \"perder pacientes\".",
    perguntas: [
      "Que erro comum de precificação (slide 6) essa psicóloga apresenta?",
      "Como o trabalho já feito nos Módulos 1.1 a 1.3 justificaria um reajuste de preço?",
      "Rode as 3 perguntas do slide 9 pra esse caso — o que cada resposta sugere?",
    ],
  });

  deck.slideEncaminhamento(pres, {
    rodape: RODAPE_DECK, pageNum: 14,
    titulo: "Quando buscar ajuda especializada",
    criterios: [
      "Dificuldade persistente em calcular o custo real do consultório: buscar apoio de um contador ou consultor financeiro",
      "Insegurança emocional recorrente ao comunicar valor: considerar isso como tema de supervisão ou processo terapêutico próprio",
      "Reajuste gerando perda significativa e inesperada de pacientes: revisar se o posicionamento comunicado realmente sustenta o novo valor",
      "Dúvida sobre a legalidade de formas específicas de cobrança: consultar orientação do CRP regional ou de um profissional contábil"
    ],
  });

  deck.slideRecap(pres, {
    rodape: RODAPE_DECK, pageNum: 15,
    pontos: [
      "O preço comunica algo, mesmo em silêncio — coerência com o posicionamento reduz dúvida em ambas as direções",
      "Preço por insegurança, copiado ou nunca revisto são os 3 erros mais comuns de precificação",
      "\"Cobre custos, é coerente, você justifica\" são as 3 perguntas que sustentam qualquer decisão de preço",
      "Este módulo encerra o Bloco 1 — especialidade, persona, proposta de valor e preço, todos alinhados numa mesma direção",
    ],
    proximoTexto: "Bloco 1 completo. Próximo: exercícios práticos e avaliação do Módulo 1.4 →",
  });

  return pres.writeFile({ fileName: "Modulo-1.4-Preco-Posicionamento.pptx" });
}

// ============================================================
// 2) EXERCÍCIOS
// ============================================================
function construirExercicios() {
  const children = [
    ...doc.capa(KICKER, "Exercícios — Preço e Posicionamento", "Resolva individualmente, de preferência revisando seu próprio preço atual enquanto responde."),

    doc.exNum(1, "Os 4 fatores que influenciam o preço"),
    doc.pergunta(1, "Liste os 4 fatores vistos no módulo."),
    ...doc.linhaResposta(3),

    doc.exNum(2, "Os 3 erros comuns de precificação"),
    doc.tabelaSimples(["Erro", "Por que acontece"], [["Preço por insegurança", ""], ["Preço copiado", ""], ["Preço nunca revisto", ""]], [3600, 5550]),

    doc.exNum(3, "As 3 perguntas aplicadas ao seu preço"),
    doc.pergunta(1, "Responda as 3 perguntas do slide 9 pro seu preço atual."),
    ...doc.linhaResposta(4),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),

    doc.exNum(4, "Calculando seu custo real"),
    doc.pergunta(1, "Faça uma estimativa simples do seu custo mensal de vida e consultório, dividido pelo número de sessões que você consegue sustentar."),
    ...doc.linhaResposta(3),

    doc.exNum(5, "Caso integrado — o preço congelado"),
    doc.vinhetaBox("Uma psicóloga com 6 anos de experiência e posicionamento claro ainda cobra o mesmo valor do primeiro ano de consultório, com medo de \"perder pacientes\" ao reajustar."),
    doc.pergunta(1, "Que erro comum de precificação essa psicóloga apresenta?"),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Como o trabalho já feito nos módulos anteriores justificaria um reajuste?"),
    ...doc.linhaResposta(2),
    doc.pergunta(3, "Rode as 3 perguntas do módulo pra esse caso — o que cada resposta sugere?"),
    ...doc.linhaResposta(2),
  ];

  return doc.salvar(doc.paginaDoc("Escola de Marketing para Psicólogos", RODAPE_DOC, children), "Modulo-1.4-Exercicios.docx");
}

// ============================================================
// 3) AVALIAÇÃO
// ============================================================
function construirProva() {
  const objetivas = [
    ["Os 4 fatores que devem influenciar o preço, segundo o módulo, são:", ["Especialização, custo de vida, demanda observada, percepção de valor", "Alcance, engajamento, agendamento e custo por lead", "Demográfico, demanda, momento de vida e objeção", "Feed, Stories, Carrossel e Direct"]],
    ["Um preço baixo demais, segundo o módulo, tende a:", ["Gerar dúvida sobre a qualidade do serviço, mesmo sem ser dito", "Aumentar automaticamente a percepção de qualidade", "Ser sempre a melhor estratégia para atrair pacientes", "Eliminar completamente qualquer questionamento de valor"]],
    ["Os 3 erros comuns de precificação, segundo o módulo, são:", ["Preço por insegurança, preço copiado, preço nunca revisto", "Preço alto, preço médio, preço baixo", "Preço mensal, preço por sessão, preço por pacote", "Preço fixo, preço variável, preço promocional"]],
    ["\"Preço copiado\", segundo o módulo, é definido como:", ["Igual ao de um colega, sem considerar contexto ou posicionamento próprio", "Calculado a partir do custo real de vida e consultório", "Revisado periodicamente com base em dados concretos", "Definido exclusivamente por pesquisa de mercado ampla"]],
    ["Um sinal de que o preço está desalinhado é:", ["Vergonha perceptível ao comunicar o valor da sessão", "Reajuste periódico realizado a cada poucos meses", "Coerência entre posicionamento e valor cobrado", "Ausência de qualquer pedido de desconto"]],
    ["A pergunta \"você conseguiria justificar esse valor com confiança\" busca:", ["Verificar se a insegurança em relação ao preço já foi resolvida", "Substituir a necessidade de calcular o custo real do consultório", "Ser respondida apenas por profissionais recém-formados", "Definir exclusivamente a especialização a ser comunicada"]],
    ["O passo \"revisar periodicamente\" recomenda reavaliar o preço:", ["A cada 6 a 12 meses, sem esperar desconforto insustentável", "Apenas uma vez, no início da carreira", "Exclusivamente quando solicitado por um paciente", "Nunca, uma vez que o valor inicial já foi definido"]],
    ["\"Preço acima do mercado, com posicionamento forte\" é descrito como:", ["Sustentável quando a proposta de valor justifica claramente a diferença", "Sempre um erro, independente do posicionamento comunicado", "Impossível de sustentar em qualquer circunstância", "Irrelevante para a percepção do paciente"]],
    ["Diante de dificuldade persistente em calcular o custo real do consultório, o módulo recomenda:", ["Buscar apoio de um contador ou consultor financeiro", "Ignorar esse cálculo e definir o preço por intuição", "Copiar diretamente o preço de um colega, sem cálculo próprio", "Aguardar indefinidamente até sentir mais segurança"]],
    ["Este módulo encerra o Bloco 1 conectando o preço a quais elementos definidos antes?", ["Recorte de especialidade, persona e proposta de valor", "Métricas de engajamento e alcance do Bloco 4", "Checklist de conformidade do Bloco 2", "Objeções de venda do Bloco 5"]],
  ];
  const gabaritoObjetivas = ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a"];

  const children = [
    ...doc.capa(KICKER, "Avaliação — Preço e Posicionamento", `Avaliação formativa de encerramento do Módulo ${MOD} e do Bloco 1.`),
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
    doc.vinhetaBox("Um psicólogo recém-formado define seu preço olhando apenas o valor cobrado por um colega de faculdade que já atende há 10 anos numa região diferente, sem considerar seu próprio custo de vida ou posicionamento."),
    new doc.Paragraph({ spacing: { before: 240 }, children: [new doc.TextRun({ text: "Com base no protocolo estudado, responda:", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    new doc.Paragraph({ spacing: { before: 220, after: 40 }, children: [new doc.TextRun({ text: "a) (10 pts) Que erro comum de precificação esse psicólogo está cometendo?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "b) (10 pts) Que passo do protocolo ele deveria seguir primeiro, antes de definir qualquer valor?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "c) (10 pts) Por que comparar com um colega de 10 anos de experiência, numa região diferente, é problemático?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "d) (10 pts) Rode as 3 perguntas do slide 9 nesse caso — que resposta você esperaria pra cada uma?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(3),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    new doc.Paragraph({ spacing: { after: 40 }, children: [new doc.TextRun({ text: "USO EXCLUSIVO DO INSTRUTOR — remover antes de aplicar a prova", bold: true, color: doc.TERRA, font: doc.FONT, size: 20 })] }),
    doc.tituloH1("Gabarito"),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 1 — Questões objetivas", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 200 }, children: [new doc.TextRun({ text: gabaritoObjetivas.map((r, i) => `${i + 1}-${r}`).join("   ·   "), font: doc.FONT, size: 22, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 2 — Critério de correção da questão de caso", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "a) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Preço copiado — definido a partir do valor de um colega, sem considerar contexto próprio.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "b) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Passo 1 — calcular o custo real de sustentar sua própria vida e consultório, antes de olhar qualquer referência externa.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "c) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Porque experiência, posicionamento, região e custo de vida diferentes tornam a comparação direta pouco representativa da sua própria realidade.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "d) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Resposta livre — provavelmente \"não\" pra todas as 3, já que o preço não foi calculado com base em custo, posicionamento próprio ou confiança pessoal.", font: doc.FONT, size: 21, color: doc.INK })] }),
  );

  return doc.salvar(doc.paginaDoc("Escola de Marketing para Psicólogos", RODAPE_DOC, children), "Modulo-1.4-Avaliacao.docx");
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
      n: 1, titulo: "O preço como sinal, e os 4 fatores", duracao: "12 min", slides: "1, 2, 3, 4",
      objetivo: "Sair sabendo por que o preço comunica algo e quais são os 4 fatores que deveriam influenciá-lo.",
      segmentos: [
        seg("0:00–0:45", "Abertura (gancho)", [{ fala: "Um preço baixo demais não atrai mais pacientes — atrai dúvida sobre a qualidade do que você oferece, mesmo sem ninguém dizer isso em voz alta." }]),
        seg("0:45–2:00", "Por que isso importa", ["Este módulo encerra o Bloco 1 conectando recorte, persona e proposta de valor ao preço."]),
        seg("2:00–8:00", "Os 4 fatores (mostrar slide 4)", [
          "Especialização e posicionamento.",
          "Custo de vida e sustentabilidade do consultório.",
          "Demanda observada na prática.",
          "Percepção de valor gerada pela comunicação.",
        ]),
        seg("8:00–11:00", "Um ponto importante", ["\"O que o mercado cobra\" sozinho ignora seu posicionamento específico."]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Próxima aula: do preço ao posicionamento percebido, e os 3 erros comuns." }]),
      ],
    },
    {
      n: 2, titulo: "Do preço à percepção, e os 3 erros comuns", duracao: "12 min", slides: "5, 6",
      objetivo: "Explicar como o preço molda percepção e reconhecer os 3 erros comuns de precificação.",
      segmentos: [
        seg("0:00–1:00", "Retomada rápida", ["Vimos os 4 fatores. Hoje, como o preço molda a percepção de quem escolhe."]),
        seg("1:00–6:00", "A cadeia (mostrar slide 5)", ["Preço definido → Comparação implícita → Percepção de valor → Decisão de agendar."]),
        seg("6:00–11:00", "Os 3 erros (mostrar slide 6)", ["Preço por insegurança, preço copiado e preço nunca revisto."]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Próxima aula: os sinais de preço desalinhado, e 3 posicionamentos de preço." }]),
      ],
    },
    {
      n: 3, titulo: "Sinais de alerta e os 3 posicionamentos de preço", duracao: "12 min", slides: "7, 8",
      objetivo: "Reconhecer sinais de preço desalinhado e diferenciar os 3 posicionamentos de preço.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Quatro sinais de desalinhamento — e três posicionamentos, do abaixo do mercado ao acima."]),
        seg("1:00–6:00", "Sinais de alerta (mostrar slide 7)", [
          "Vergonha de falar o valor.",
          "Abaixo de colegas parecidos.",
          "Nunca reajustado.",
          "Pedidos de desconto frequentes.",
        ]),
        seg("6:00–11:00", "Os 3 posicionamentos (mostrar slide 8)", ["Abaixo do mercado, alinhado, e acima com posicionamento forte."]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Próxima aula: as 3 perguntas antes de definir o preço, e os 4 passos completos." }]),
      ],
    },
    {
      n: 4, titulo: "As 3 perguntas e os 4 passos", duracao: "11 min", slides: "9, 10",
      objetivo: "Conhecer as 3 perguntas antes de definir o preço e os 4 passos completos de ajuste.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três perguntas — e um processo de 4 passos pra ajustar seu preço com segurança."]),
        seg("1:00–5:00", "3 perguntas (mostrar slide 9)", ["Cobre custos, é coerente, você justifica — as 3 perguntas antes de qualquer decisão."]),
        seg("5:00–10:00", "Os 4 passos (mostrar slide 10)", ["Calcular o custo real, pesquisar colegas parecidos, definir um valor justificável, revisar periodicamente."]),
        seg("10:00–11:00", "Fechamento", [{ fala: "Próxima aula: aplicando os 4 passos na prática." }]),
      ],
    },
    {
      n: 5, titulo: "Aplicação prática dos 4 passos", duracao: "12 min", slides: "11, 12",
      objetivo: "Aplicar os 4 passos com exemplos concretos.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Hoje colocamos os 4 passos em prática, do cálculo de custo ao valor final."]),
        seg("1:00–6:00", "Passos 1 e 2 (mostrar slide 11)", ["Some despesas e divida pelo número real de sessões sustentáveis.", { fala: "Profissionais com posicionamento e formação semelhantes ao meu cobram quanto, nessa mesma região?" }]),
        seg("6:00–11:00", "Passos 3 e 4 (mostrar slide 12)", ["Use as 3 perguntas pra confirmar o valor.", "Reavalie a cada 6 a 12 meses."]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Próxima aula: um caso real de preço congelado, e o recap final do Bloco 1." }]),
      ],
    },
    {
      n: 6, titulo: "Prática guiada — o preço congelado e encerramento do Bloco 1", duracao: "13 min", slides: "13, 14, 15",
      objetivo: "Aplicar tudo que foi visto a um caso real e encerrar o Bloco 1.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["A última aula do Bloco 1 — um caso real, e o recap final."]),
        seg("1:00–5:00", "Apresentando o caso (mostrar slide 13)", ["Leia a vinheta com calma.", "Note que o trabalho de posicionamento já está pronto — só falta o preço acompanhar."]),
        seg("5:00–9:00", "Percorrendo as perguntas de discussão", ["Discuta em voz alta as 3 perguntas do slide 13.", "Rode as 3 perguntas de precificação pra esse caso."]),
        seg("9:00–11:00", "Quando buscar ajuda especializada (mostrar slide 14)", ["Percorra os 4 critérios do slide 14."]),
        seg("11:00–13:00", "Recap final e encerramento do bloco (mostrar slide 15)", [{ fala: "Retome os 4 pontos-chave. Você concluiu o Bloco 1 — especialidade, persona, proposta de valor e preço, todos alinhados. Agora é hora dos exercícios e da avaliação." }]),
      ],
    },
  ];

  const totalMin = 12 + 12 + 12 + 11 + 12 + 13;

  const children = [
    ...doc.capa(KICKER, "Roteiro de Aulas — Preço e Posicionamento", "Módulo dividido em 6 vídeo-aulas de 11 a 13 minutos, seguindo os slides já produzidos. Cada aula tem roteiro cronometrado, pronto pra gravação. Este é o último roteiro do Bloco 1."),
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

  return doc.salvar(doc.paginaDoc("Escola de Marketing para Psicólogos", `${RODAPE_DOC} — Roteiro de Aulas`, children), "Modulo-1.4-Roteiro-Aulas.docx");
}

// ============================================================
Promise.resolve()
  .then(construirDeck)
  .then(construirExercicios)
  .then(construirProva)
  .then(construirRoteiro)
  .then(() => console.log("TUDO PRONTO"))
  .catch((e) => { console.error(e); process.exit(1); });

const deck = require("../_lib/lib-deck.js");
const doc = require("../_lib/lib-doc.js");

const MOD = "6.1";
const NOME = "Organização Financeira";
const RODAPE_DECK = `Organização Financeira — Módulo ${MOD}`;
const RODAPE_DOC = `Módulo ${MOD} — Organização Financeira`;
const KICKER = "MÓDULO 6.1 · GESTÃO E ESCALA DO CONSULTÓRIO";
const MARCA = "Escola de Marketing para Psicólogos — by Dioclides";

// ============================================================
// 1) SLIDE DECK
// ============================================================
function construirDeck() {
  const pres = deck.novaApresentacao(`${NOME} — O Mínimo Pra Não Misturar as Contas`);

  deck.slideTitulo(pres, {
    moduloLabel: `Módulo ${MOD} · Bloco 6 · Gestão e Escala`,
    titulo: "Organização Financeira",
    subtitulo: "Precificação, fluxo de caixa e reserva — o mínimo pra não misturar consultório com pessoal",
    rodapeMarca: MARCA,
    passos: ["Por quê", "4 elementos", "Separação", "Erros", "Aplicação"],
  });

  deck.slideRoteiro(pres, {
    rodape: RODAPE_DECK, pageNum: 2,
    cards: [
      { titulo: "Por que organizar as finanças", desc: "O custo invisível de não separar dinheiro pessoal e profissional" },
      { titulo: "Os 4 elementos básicos", desc: "O mínimo que sustenta clareza financeira" },
      { titulo: "Separando pessoal e profissional", desc: "3 níveis, do mínimo ao avançado" },
      { titulo: "Erros comuns", desc: "Sinais de que as finanças precisam de atenção" },
      { titulo: "Aplicação prática", desc: "Organizando as finanças de um consultório real" },
    ],
  });

  deck.slideHook(pres, {
    rodape: RODAPE_DECK, pageNum: 3,
    frase: "Muitos psicólogos sabem exatamente como ajudar um paciente a organizar a própria vida, mas nunca separaram o dinheiro do consultório do dinheiro pessoal — e isso cobra um preço, cedo ou tarde.",
    apoio: "Este módulo abre o Bloco 6, que pressupõe que você já tem pacientes entrando — agora é hora de organizar o que já está acontecendo.",
  });

  deck.slideCircuito(pres, {
    rodape: RODAPE_DECK, pageNum: 4,
    titulo: "4 elementos de organização financeira básica",
    regioes: [
      { label: "Conta bancária separada, mesmo como pessoa física", rx: 0.20, ry: 0.22, color: deck.NAVY, d: 0.5 },
      { label: "Registro simples de todas as entradas e saídas", rx: 0.22, ry: 0.62, color: deck.TERRA, d: 0.4 },
      { label: "Reserva pra meses de baixa demanda ou imprevistos", rx: 0.60, ry: 0.60, color: deck.NAVY_TINT, d: 0.36 },
      { label: "Previsão clara de custos fixos e variáveis", rx: 0.58, ry: 0.24, color: deck.TERRA_TINT, d: 0.36 },
    ],
    notas: [
      "Uma conta separada não exige abrir CNPJ — mesmo como pessoa física, dedicar uma conta só ao consultório já muda tudo.",
      "Sem esses 4 elementos, o preço definido no Módulo 1.4 fica difícil de validar com dados reais.",
    ],
  });

  deck.slideCadeia(pres, {
    rodape: RODAPE_DECK, pageNum: 5,
    titulo: "Do caos financeiro à clareza",
    elos: [
      { titulo: "Dinheiro misturado", desc: "Pessoal e profissional na mesma conta, sem distinção" },
      { titulo: "Registro implementado", desc: "Começar a anotar entradas e saídas, mesmo de forma simples" },
      { titulo: "Conta separada", desc: "Dedicar uma conta só ao consultório, ainda que como pessoa física" },
      { titulo: "Decisões com dados reais", desc: "Preço, investimento e reserva baseados em números, não intuição" },
    ],
    notaFinal: "Cada elo dessa cadeia é pequeno isoladamente, mas juntos transformam completamente a clareza sobre a saúde financeira do consultório.",
  });

  deck.slideCategorias(pres, {
    rodape: RODAPE_DECK, pageNum: 6,
    titulo: "3 níveis de organização financeira",
    categorias: [
      { titulo: "Mínimo", desc: "Conta separada e registro simples de entradas e saídas", color: deck.NAVY },
      { titulo: "Intermediário", desc: "Categorização de despesas e início de uma reserva", color: deck.TERRA },
      { titulo: "Avançado", desc: "Planejamento tributário e estratégia de investimento", color: deck.NAVY_TINT },
    ],
    notaFinal: "Comece pelo nível mínimo — a maioria dos problemas financeiros de consultório se resolve já nesse primeiro estágio.",
  });

  deck.slideSinais(pres, {
    rodape: RODAPE_DECK, pageNum: 7,
    titulo: "Sinais de que as finanças precisam de atenção",
    itens: [
      { titulo: "Não sabe quanto sobra", desc: "Ausência de clareza sobre o que realmente sobra no fim do mês" },
      { titulo: "Mesma conta pra tudo", desc: "Dinheiro pessoal e do consultório misturados na mesma conta" },
      { titulo: "Nenhuma reserva", desc: "Sem margem pra emergência ou período de baixa demanda" },
      { titulo: "Preço \"no feeling\"", desc: "Decisão de valor sem qualquer dado real de custo por trás" },
    ],
  });

  deck.slideDiferencial(pres, {
    rodape: RODAPE_DECK, pageNum: 8,
    titulo: "3 níveis de organização",
    cards: [
      { titulo: "Sem organização", desc: "Tudo misturado, decisões financeiras feitas por intuição" },
      { titulo: "Organização básica", desc: "Conta separada e registro simples, já trazendo clareza real" },
      { titulo: "Organização estruturada", desc: "Categorias, reserva e planejamento de médio prazo" },
    ],
  });

  deck.slideInstrumentos(pres, {
    rodape: RODAPE_DECK, pageNum: 9,
    titulo: "3 ferramentas simples pra começar",
    instrumentos: [
      { sigla: "Registro simples", nome: "Planilha ou app de controle financeiro básico", desc: "Não precisa ser sofisticado — precisa ser usado com consistência." },
      { sigla: "Conta dedicada", nome: "Uma conta bancária só pro consultório", desc: "Separa imediatamente o que é pessoal do que é profissional." },
      { sigla: "Meta de reserva", nome: "Um valor-alvo, como 3 meses de custo fixo", desc: "Dá segurança em períodos de baixa demanda ou imprevisto." },
    ],
  });

  deck.slideProtocoloOverview(pres, {
    rodape: RODAPE_DECK, pageNum: 10,
    titulo: "Organizando suas finanças: 4 passos",
    passos: [
      { titulo: "Dedicar uma\nconta ao consultório", desc: "Mesmo sem CNPJ, uma conta separada já ajuda muito" },
      { titulo: "Registrar por\num mês completo", desc: "Todas as entradas e saídas, sem exceção" },
      { titulo: "Calcular o\ncusto fixo real", desc: "Com base no registro, não em estimativa aproximada" },
      { titulo: "Definir uma\nmeta de reserva", desc: "E começar a construí-la aos poucos, de forma consistente" },
    ],
    notaFinal: "Esses 4 passos, feitos com disciplina por um mês, já trazem clareza suficiente pra decisões financeiras muito mais seguras.",
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 11,
    titulo: "Passos 1 e 2, na prática",
    colunas: [
      {
        numero: 1, titulo: "Dedicar uma conta ao consultório",
        bullets: ["Não precisa ser conta empresarial — uma conta pessoal dedicada já resolve o essencial", "O importante é nunca misturar com gastos pessoais do dia a dia"],
      },
      {
        numero: 2, titulo: "Registrar por um mês completo",
        fala: "“Se eu anotasse literalmente tudo que entra e sai por 30 dias, o que eu descobriria sobre minhas finanças?”",
        bullets: ["Um app simples de controle ou até uma planilha básica já são suficientes"],
      },
    ],
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 12,
    titulo: "Passos 3 e 4, na prática",
    colunas: [
      {
        numero: 3, titulo: "Calcular o custo fixo real",
        bullets: ["Some aluguel, plataformas, materiais e qualquer despesa recorrente do consultório", "Esse número é a base real pro cálculo de preço do Módulo 1.4"],
      },
      {
        numero: 4, titulo: "Definir uma meta de reserva",
        bullets: ["Comece com um valor pequeno e realista, como 1 mês de custo fixo", "Aumente a meta aos poucos, conforme a organização se consolida"],
      },
    ],
  });

  deck.slideCaso(pres, {
    rodape: RODAPE_DECK, pageNum: 13,
    vinheta: "Um psicólogo recebe os pagamentos dos pacientes na mesma conta que usa pra despesas pessoais, e no fim do mês nunca sabe ao certo quanto realmente ganhou com o consultório. Ele já teve um mês de agenda mais fraca e sentiu dificuldade real de pagar as contas, sem entender exatamente o motivo.",
    perguntas: [
      "Quais dos 4 elementos do slide 4 estão completamente ausentes nesse caso?",
      "Como a falta de reserva se conectou diretamente ao problema do mês de agenda fraca?",
      "Por onde ele deveria começar, seguindo os 4 passos do protocolo?",
    ],
  });

  deck.slideEncaminhamento(pres, {
    rodape: RODAPE_DECK, pageNum: 14,
    titulo: "Quando buscar ajuda especializada",
    criterios: [
      "Dificuldade persistente em manter o registro financeiro básico: buscar um aplicativo mais simples ou apoio de um contador",
      "Dúvida sobre abrir CNPJ ou continuar como pessoa física: consultar um contador especializado em profissionais liberais",
      "Complexidade tributária crescente com o aumento da renda: buscar planejamento tributário formal",
      "Insegurança recorrente sobre decisões financeiras do consultório: considerar mentoria específica de gestão financeira pra profissionais de saúde"
    ],
  });

  deck.slideRecap(pres, {
    rodape: RODAPE_DECK, pageNum: 15,
    pontos: [
      "Misturar dinheiro pessoal e profissional cobra um preço, mesmo quando parece inofensivo no curto prazo",
      "Conta separada, registro simples, reserva e previsão de custos são os 4 elementos do nível mínimo de organização",
      "Comece pelo nível mínimo — a maioria dos problemas financeiros de consultório se resolve já nesse estágio",
      "O custo fixo calculado aqui é a base real pro preço definido no Módulo 1.4",
    ],
    proximoTexto: "Próximo: exercícios práticos e avaliação do Módulo 6.1 →",
  });

  return pres.writeFile({ fileName: "Modulo-6.1-Organizacao-Financeira.pptx" });
}

// ============================================================
// 2) EXERCÍCIOS
// ============================================================
function construirExercicios() {
  const children = [
    ...doc.capa(KICKER, "Exercícios — Organização Financeira", "Resolva individualmente, de preferência já começando o registro financeiro do seu próprio consultório."),

    doc.exNum(1, "Os 4 elementos básicos"),
    doc.pergunta(1, "Liste os 4 elementos vistos no módulo."),
    ...doc.linhaResposta(3),

    doc.exNum(2, "Os 3 níveis de organização"),
    doc.tabelaSimples(["Nível", "O que inclui"], [["Mínimo", ""], ["Intermediário", ""], ["Avançado", ""]], [3600, 5550]),

    doc.exNum(3, "Avaliando sua própria organização"),
    doc.pergunta(1, "Você tem uma conta dedicada ao consultório? Se não, o que impede essa separação hoje?"),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Em que nível (mínimo, intermediário, avançado) você classificaria sua organização financeira hoje?"),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),

    doc.exNum(4, "Calculando seu custo fixo"),
    doc.pergunta(1, "Liste suas principais despesas fixas mensais relacionadas ao consultório."),
    ...doc.linhaResposta(3),

    doc.exNum(5, "Caso integrado — a conta misturada"),
    doc.vinhetaBox("Um psicólogo recebe pagamentos na mesma conta pessoal, nunca sabe quanto ganhou de fato, e teve dificuldade real num mês de agenda mais fraca."),
    doc.pergunta(1, "Quais dos 4 elementos estão completamente ausentes nesse caso?"),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Como a falta de reserva se conectou ao problema do mês de agenda fraca?"),
    ...doc.linhaResposta(2),
    doc.pergunta(3, "Por onde ele deveria começar, seguindo os 4 passos do protocolo?"),
    ...doc.linhaResposta(2),
  ];

  return doc.salvar(doc.paginaDoc("Escola de Marketing para Psicólogos", RODAPE_DOC, children), "Modulo-6.1-Exercicios.docx");
}

// ============================================================
// 3) AVALIAÇÃO
// ============================================================
function construirProva() {
  const objetivas = [
    ["Os 4 elementos de organização financeira básica, segundo o módulo, são:", ["Conta separada, registro simples, reserva, previsão de custos", "Alcance, engajamento, agendamento e custo por lead", "Escuta genuína, transparência, espaço pra dúvidas, decisão respeitada", "Identificação, veracidade, sigilo e comparação"]],
    ["Uma conta separada, segundo o módulo, exige:", ["Não necessariamente CNPJ — mesmo como pessoa física já ajuda muito", "Obrigatoriamente a abertura de uma empresa formal", "Um contador especializado desde o primeiro momento", "Ser aberta exclusivamente em banco digital"]],
    ["Os 3 níveis de organização financeira, segundo o módulo, são:", ["Mínimo, intermediário, avançado", "Alcance, engajamento e conversão", "Preço, localização e horário", "Identificação, veracidade e sigilo"]],
    ["\"Preço definido no feeling, sem dado real de custo\" é descrito como:", ["Um sinal de que as finanças precisam de atenção", "A forma mais recomendada de definir preço", "Irrelevante para a organização financeira do consultório", "Uma prática exigida pela Resolução CFP"]],
    ["O nível recomendado pra começar, segundo o módulo, é:", ["Mínimo — conta separada e registro simples", "Avançado — planejamento tributário completo", "Intermediário — categorização detalhada de despesas", "Nenhum nível é necessário no início"]],
    ["O passo \"registrar por um mês completo\" recomenda:", ["Anotar todas as entradas e saídas, sem exceção, durante 30 dias", "Registrar apenas as entradas, ignorando as saídas", "Fazer isso apenas uma vez por ano", "Substituir a necessidade de calcular o custo fixo"]],
    ["O custo fixo calculado neste módulo serve como base para:", ["O preço definido no Módulo 1.4", "As métricas de engajamento do Bloco 4", "O checklist de conformidade do Bloco 2", "Os critérios de encaminhamento do Bloco 5"]],
    ["A meta de reserva sugerida pelo módulo para começar é:", ["Um valor pequeno e realista, como 1 mês de custo fixo", "Um valor equivalente a 2 anos de custo fixo, desde o início", "Não é necessário definir nenhuma meta inicial", "Deve ser sempre igual ao valor de uma sessão"]],
    ["Diante de complexidade tributária crescente com aumento de renda, o módulo recomenda:", ["Buscar planejamento tributário formal", "Ignorar completamente a questão tributária", "Reduzir a renda para evitar essa complexidade", "Resolver isso sem qualquer apoio especializado"]],
    ["Este módulo abre o Bloco 6, que pressupõe:", ["Que já existe fluxo de pacientes entrando no consultório", "Que o profissional ainda não iniciou o atendimento", "Que o Bloco 1 ainda não foi estudado", "Que não há qualquer necessidade de organização prévia"]],
  ];
  const gabaritoObjetivas = ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a"];

  const children = [
    ...doc.capa(KICKER, "Avaliação — Organização Financeira", `Avaliação formativa de encerramento do Módulo ${MOD}.`),
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
    doc.vinhetaBox("Uma psicóloga tem conta separada pro consultório e registra as entradas, mas nunca calculou seu custo fixo real nem tem qualquer reserva financeira. Ela define seus preços olhando apenas o que colegas cobram."),
    new doc.Paragraph({ spacing: { before: 240 }, children: [new doc.TextRun({ text: "Com base no protocolo estudado, responda:", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    new doc.Paragraph({ spacing: { before: 220, after: 40 }, children: [new doc.TextRun({ text: "a) (10 pts) Quais dos 4 elementos ela já tem, e quais ainda faltam?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "b) (10 pts) Que passo do protocolo ela deveria implementar a seguir?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "c) (10 pts) Como o cálculo do custo fixo real poderia mudar a forma como ela define preço?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "d) (10 pts) Sugira uma meta de reserva inicial e explique por que ela é importante nesse caso.", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    new doc.Paragraph({ spacing: { after: 40 }, children: [new doc.TextRun({ text: "USO EXCLUSIVO DO INSTRUTOR — remover antes de aplicar a prova", bold: true, color: doc.TERRA, font: doc.FONT, size: 20 })] }),
    doc.tituloH1("Gabarito"),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 1 — Questões objetivas", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 200 }, children: [new doc.TextRun({ text: gabaritoObjetivas.map((r, i) => `${i + 1}-${r}`).join("   ·   "), font: doc.FONT, size: 22, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 2 — Critério de correção da questão de caso", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "a) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Já tem conta separada e registro; faltam previsão de custos (custo fixo calculado) e reserva financeira.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "b) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Passo 3 — calcular o custo fixo real, já que os passos 1 e 2 (conta e registro) já estão feitos.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "c) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Ela passaria a definir preço com base em dados reais de sustentabilidade, e não apenas em comparação com colegas — conectando diretamente ao Módulo 1.4.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "d) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Exemplo: 1 mês de custo fixo como meta inicial — dá segurança básica pra períodos de baixa demanda, sem exigir esforço imediato grande demais.", font: doc.FONT, size: 21, color: doc.INK })] }),
  );

  return doc.salvar(doc.paginaDoc("Escola de Marketing para Psicólogos", RODAPE_DOC, children), "Modulo-6.1-Avaliacao.docx");
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
      n: 1, titulo: "Por que organizar as finanças, e os 4 elementos", duracao: "13 min", slides: "1, 2, 3, 4",
      objetivo: "Sair sabendo por que separar finanças importa e quais são os 4 elementos básicos.",
      segmentos: [
        seg("0:00–0:45", "Abertura (gancho)", [{ fala: "Muitos psicólogos sabem exatamente como ajudar um paciente a organizar a própria vida, mas nunca separaram o dinheiro do consultório do dinheiro pessoal — e isso cobra um preço, cedo ou tarde." }]),
        seg("0:45–2:00", "Por que isso importa", ["Este módulo abre o Bloco 6, que pressupõe que você já tem pacientes entrando — agora é hora de organizar."]),
        seg("2:00–9:00", "Os 4 elementos (mostrar slide 4)", [
          "Conta bancária separada, mesmo como pessoa física.",
          "Registro simples de entradas e saídas.",
          "Reserva pra meses de baixa demanda.",
          "Previsão clara de custos fixos e variáveis.",
        ]),
        seg("9:00–12:00", "Um ponto importante", ["Sem esses 4 elementos, o preço definido no Módulo 1.4 fica difícil de validar com dados reais."]),
        seg("12:00–13:00", "Fechamento", [{ fala: "Próxima aula: do caos financeiro à clareza, e os 3 níveis de organização." }]),
      ],
    },
    {
      n: 2, titulo: "Do caos à clareza, e os 3 níveis de organização", duracao: "12 min", slides: "5, 6",
      objetivo: "Explicar a cadeia de organização financeira e os 3 níveis possíveis.",
      segmentos: [
        seg("0:00–1:00", "Retomada rápida", ["Vimos os 4 elementos. Hoje, o caminho completo do caos financeiro à clareza."]),
        seg("1:00–6:00", "A cadeia (mostrar slide 5)", ["Dinheiro misturado → Registro implementado → Conta separada → Decisões com dados reais."]),
        seg("6:00–11:00", "Os 3 níveis (mostrar slide 6)", ["Mínimo, intermediário e avançado — comece pelo mínimo, quase sempre suficiente pra começar."]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Próxima aula: os sinais de que as finanças precisam de atenção, e 3 níveis comparados." }]),
      ],
    },
    {
      n: 3, titulo: "Sinais de alerta e os 3 níveis comparados", duracao: "12 min", slides: "7, 8",
      objetivo: "Reconhecer sinais de que as finanças precisam de atenção e comparar os 3 níveis de organização.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Quatro sinais de alerta — e três níveis, do sem organização ao estruturado."]),
        seg("1:00–6:00", "Sinais de alerta (mostrar slide 7)", [
          "Não sabe quanto sobra no fim do mês.",
          "Usa a mesma conta pra tudo.",
          "Nenhuma reserva pra emergência.",
          "Preço definido \"no feeling\".",
        ]),
        seg("6:00–11:00", "Os 3 níveis (mostrar slide 8)", ["Sem organização, organização básica e organização estruturada."]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Próxima aula: as 3 ferramentas simples, e os 4 passos completos." }]),
      ],
    },
    {
      n: 4, titulo: "As 3 ferramentas e os 4 passos", duracao: "11 min", slides: "9, 10",
      objetivo: "Conhecer as 3 ferramentas simples e os 4 passos completos de organização.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três ferramentas simples — e um processo de 4 passos pra organizar suas finanças."]),
        seg("1:00–5:00", "3 ferramentas (mostrar slide 9)", ["Registro simples, conta dedicada e meta de reserva."]),
        seg("5:00–10:00", "Os 4 passos (mostrar slide 10)", ["Dedicar uma conta, registrar por um mês, calcular o custo fixo real, definir uma meta de reserva."]),
        seg("10:00–11:00", "Fechamento", [{ fala: "Próxima aula: aplicando os 4 passos na prática." }]),
      ],
    },
    {
      n: 5, titulo: "Aplicação prática dos 4 passos", duracao: "12 min", slides: "11, 12",
      objetivo: "Aplicar os 4 passos com exemplos concretos.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Hoje colocamos os 4 passos em prática, organizando as finanças do zero."]),
        seg("1:00–6:00", "Passos 1 e 2 (mostrar slide 11)", ["Uma conta pessoal dedicada já resolve o essencial.", { fala: "Se eu anotasse literalmente tudo que entra e sai por 30 dias, o que eu descobriria sobre minhas finanças?" }]),
        seg("6:00–11:00", "Passos 3 e 4 (mostrar slide 12)", ["Some todas as despesas recorrentes do consultório.", "Comece com uma meta pequena e realista de reserva."]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Próxima aula: um caso real de conta misturada, e o recap final." }]),
      ],
    },
    {
      n: 6, titulo: "Prática guiada — a conta misturada e recap final", duracao: "13 min", slides: "13, 14, 15",
      objetivo: "Aplicar tudo que foi visto a um caso real e consolidar os pontos-chave do módulo.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["A última aula do módulo — um caso real, e o recap final."]),
        seg("1:00–5:00", "Apresentando o caso (mostrar slide 13)", ["Leia a vinheta com calma.", "Note que a falta de clareza financeira só apareceu como problema num momento de aperto real."]),
        seg("5:00–9:00", "Percorrendo as perguntas de discussão", ["Discuta em voz alta as 3 perguntas do slide 13.", "Esboce um plano de organização financeira pra esse caso."]),
        seg("9:00–11:00", "Quando buscar ajuda especializada (mostrar slide 14)", ["Percorra os 4 critérios do slide 14."]),
        seg("11:00–13:00", "Recap final (mostrar slide 15)", [{ fala: "Retome os 4 pontos-chave do módulo. Agora é hora dos exercícios e da avaliação — e do próximo módulo, sobre ferramentas de agenda e prontuário." }]),
      ],
    },
  ];

  const totalMin = 13 + 12 + 12 + 11 + 12 + 13;

  const children = [
    ...doc.capa(KICKER, "Roteiro de Aulas — Organização Financeira", "Módulo dividido em 6 vídeo-aulas de 11 a 13 minutos, seguindo os slides já produzidos. Cada aula tem roteiro cronometrado, pronto pra gravação."),
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

  return doc.salvar(doc.paginaDoc("Escola de Marketing para Psicólogos", `${RODAPE_DOC} — Roteiro de Aulas`, children), "Modulo-6.1-Roteiro-Aulas.docx");
}

// ============================================================
Promise.resolve()
  .then(construirDeck)
  .then(construirExercicios)
  .then(construirProva)
  .then(construirRoteiro)
  .then(() => console.log("TUDO PRONTO"))
  .catch((e) => { console.error(e); process.exit(1); });

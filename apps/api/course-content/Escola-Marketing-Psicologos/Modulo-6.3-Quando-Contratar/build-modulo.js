const deck = require("../_lib/lib-deck.js");
const doc = require("../_lib/lib-doc.js");

const MOD = "6.3";
const NOME = "Quando Contratar";
const RODAPE_DECK = `Quando Contratar — Módulo ${MOD}`;
const RODAPE_DOC = `Módulo ${MOD} — Quando Contratar`;
const KICKER = "MÓDULO 6.3 · GESTÃO E ESCALA DO CONSULTÓRIO";
const MARCA = "Escola de Marketing para Psicólogos — by Dioclides";

// ============================================================
// 1) SLIDE DECK
// ============================================================
function construirDeck() {
  const pres = deck.novaApresentacao(`${NOME} — Secretária, Sócio ou Clínica`);

  deck.slideTitulo(pres, {
    moduloLabel: `Módulo ${MOD} · Bloco 6 · Gestão e Escala`,
    titulo: "Quando Contratar",
    subtitulo: "Sinais de que chegou a hora de contratar apoio, outro psicólogo, ou formalizar uma clínica",
    rodapeMarca: MARCA,
    passos: ["O passo grande", "3 tipos", "Sinais", "Erros", "Aplicação"],
  });

  deck.slideRoteiro(pres, {
    rodape: RODAPE_DECK, pageNum: 2,
    cards: [
      { titulo: "Por que é um passo grande", desc: "O que muda de verdade quando você deixa de trabalhar sozinho" },
      { titulo: "Os 3 tipos de contratação", desc: "Apoio administrativo, parceria clínica, ou clínica formal" },
      { titulo: "Sinais de que é hora", desc: "4 indicadores de prontidão real, não só vontade" },
      { titulo: "Erros comuns", desc: "Sinais de que ainda não é o momento certo" },
      { titulo: "Aplicação prática", desc: "Avaliando se um consultório está pronto pra contratar" },
    ],
  });

  deck.slideHook(pres, {
    rodape: RODAPE_DECK, pageNum: 3,
    frase: "Contratar cedo demais quebra o caixa. Contratar tarde demais quebra você — o segredo está em reconhecer o momento certo, não em ter pressa ou medo.",
    apoio: "Este módulo trata da decisão que expande a estrutura construída em todo o curso até aqui: do trabalho individual pra algo maior.",
  });

  deck.slideCircuito(pres, {
    rodape: RODAPE_DECK, pageNum: 4,
    titulo: "4 sinais de prontidão pra contratar",
    regioes: [
      { label: "Receita estável por vários meses seguidos", rx: 0.20, ry: 0.22, color: deck.NAVY, d: 0.5 },
      { label: "Tarefas administrativas consumindo tempo clínico real", rx: 0.22, ry: 0.62, color: deck.TERRA, d: 0.4 },
      { label: "Demanda maior do que a capacidade individual atual", rx: 0.60, ry: 0.60, color: deck.NAVY_TINT, d: 0.36 },
      { label: "Reserva financeira suficiente pra sustentar o risco", rx: 0.58, ry: 0.24, color: deck.TERRA_TINT, d: 0.36 },
    ],
    notas: [
      "Nenhum sinal isolado é suficiente — a decisão fica mais segura quando vários desses sinais aparecem juntos.",
      "A reserva do Módulo 6.1 é exatamente o que sustenta esse risco sem comprometer a estabilidade pessoal.",
    ],
  });

  deck.slideCadeia(pres, {
    rodape: RODAPE_DECK, pageNum: 5,
    titulo: "Do sozinho ao time",
    elos: [
      { titulo: "Sobrecarga percebida", desc: "A sensação inicial de que algo precisa mudar" },
      { titulo: "Avaliação de sinais reais", desc: "Checar dados concretos, não apenas a sensação" },
      { titulo: "Decisão de contratar", desc: "Com base em evidência, não em ansiedade do momento" },
      { titulo: "Estruturação do papel", desc: "Definição clara de função, antes de qualquer contratação" },
    ],
    notaFinal: "Pular direto da sobrecarga pra decisão, sem avaliar os sinais reais, é o erro mais comum nesse processo.",
  });

  deck.slideCategorias(pres, {
    rodape: RODAPE_DECK, pageNum: 6,
    titulo: "3 tipos de contratação",
    categorias: [
      { titulo: "Apoio administrativo", desc: "Secretária ou assistente pra tarefas não clínicas", color: deck.NAVY },
      { titulo: "Outro psicólogo", desc: "Parceria ou associação com colega, dividindo demanda", color: deck.TERRA },
      { titulo: "Clínica formal", desc: "Estrutura maior, com CNPJ e organização mais complexa", color: deck.NAVY_TINT },
    ],
    notaFinal: "Cada tipo resolve um problema diferente — contratar apoio administrativo não resolve excesso de demanda clínica, por exemplo.",
  });

  deck.slideSinais(pres, {
    rodape: RODAPE_DECK, pageNum: 7,
    titulo: "Sinais de que ainda não é hora",
    itens: [
      { titulo: "Receita instável", desc: "Variação grande de mês pra mês, sem previsibilidade real" },
      { titulo: "Sem reserva construída", desc: "Ausência da reserva financeira vista no Módulo 6.1" },
      { titulo: "Decisão por ansiedade", desc: "Motivada por desespero do momento, não por dado concreto" },
      { titulo: "Papel indefinido", desc: "Falta de clareza sobre o que exatamente a contratação faria" },
    ],
  });

  deck.slideDiferencial(pres, {
    rodape: RODAPE_DECK, pageNum: 8,
    titulo: "3 momentos de decisão",
    cards: [
      { titulo: "Cedo demais", desc: "Sem receita nem demanda suficiente pra sustentar o custo" },
      { titulo: "Momento certo", desc: "Sinais reais presentes, decisão sustentada por dados" },
      { titulo: "Tarde demais", desc: "Sobrecarga já afetando qualidade de atendimento e saúde" },
    ],
  });

  deck.slideInstrumentos(pres, {
    rodape: RODAPE_DECK, pageNum: 9,
    titulo: "3 perguntas antes de contratar",
    instrumentos: [
      { sigla: "Sustenta 6 meses?", nome: "Minha receita sustenta esse custo mesmo em cenário ruim", desc: "Considera queda de demanda, não apenas o melhor cenário." },
      { sigla: "Que tarefa exata?", nome: "Que tarefa específica essa contratação assumiria", desc: "Papel vago tende a gerar frustração dos dois lados." },
      { sigla: "E se não der certo?", nome: "Tenho clareza de como agir se a parceria não funcionar", desc: "Pensar nisso antes evita decisões difíceis sob pressão depois." },
    ],
  });

  deck.slideProtocoloOverview(pres, {
    rodape: RODAPE_DECK, pageNum: 10,
    titulo: "Decidindo contratar: 4 passos",
    passos: [
      { titulo: "Avaliar os\n4 sinais de prontidão", desc: "Com dados reais, não apenas sensação de sobrecarga" },
      { titulo: "Definir o\npapel claramente", desc: "O que exatamente a nova pessoa faria no dia a dia" },
      { titulo: "Calcular o\nimpacto financeiro", desc: "Custo real, considerando cenários bons e ruins" },
      { titulo: "Formalizar\ncom contrato claro", desc: "Mesmo entre colegas de confiança, por escrito" },
    ],
    notaFinal: "Esses 4 passos reduzem tanto o risco financeiro quanto o desgaste emocional de uma decisão mal estruturada.",
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 11,
    titulo: "Passos 1 e 2, na prática",
    colunas: [
      {
        numero: 1, titulo: "Avaliar os 4 sinais",
        bullets: ["Revise os últimos 6 meses de receita, não apenas o mês mais recente", "Verifique se pelo menos 3 dos 4 sinais do slide 4 estão realmente presentes"],
      },
      {
        numero: 2, titulo: "Definir o papel claramente",
        fala: "“Se eu descrevesse essa vaga em 3 frases, o que exatamente essa pessoa faria no meu consultório?”",
        bullets: ["Papel vago gera expectativa desalinhada e frustração precoce dos dois lados"],
      },
    ],
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 12,
    titulo: "Passos 3 e 4, na prática",
    colunas: [
      {
        numero: 3, titulo: "Calcular o impacto financeiro",
        bullets: ["Considere o custo mesmo num cenário de queda de 20 a 30% na demanda", "Use o custo fixo já calculado no Módulo 6.1 como base"],
      },
      {
        numero: 4, titulo: "Formalizar com contrato claro",
        bullets: ["Mesmo entre amigos ou colegas de confiança, um contrato evita desgaste futuro", "Defina expectativas, prazos e critérios de encerramento por escrito"],
      },
    ],
  });

  deck.slideCaso(pres, {
    rodape: RODAPE_DECK, pageNum: 13,
    vinheta: "Uma psicóloga tem lista de espera crescente há 4 meses, receita estável nesse mesmo período, e já reservou o equivalente a 3 meses de custo fixo (Módulo 6.1). Ela está considerando convidar uma colega pra dividir o espaço e a demanda, mas ainda não conversou claramente sobre como seria essa parceria na prática.",
    perguntas: [
      "Quantos dos 4 sinais de prontidão (slide 4) essa psicóloga já apresenta?",
      "Que passo do protocolo ela ainda não deu, mesmo com os sinais presentes?",
      "Que tipo de contratação (slide 6) parece mais adequado pra esse caso específico?",
    ],
  });

  deck.slideEncaminhamento(pres, {
    rodape: RODAPE_DECK, pageNum: 14,
    titulo: "Quando buscar ajuda especializada",
    criterios: [
      "Dúvida sobre aspectos legais e trabalhistas da contratação: consultar um advogado especializado em relações de trabalho",
      "Formalização como clínica (CNPJ, sociedade): buscar apoio de um contador especializado em saúde",
      "Dúvida sobre estrutura de parceria entre psicólogos: consultar orientação do CRP regional sobre modelos possíveis",
      "Insegurança recorrente mesmo com os sinais presentes: considerar conversar com outros profissionais que já passaram por essa decisão"
    ],
  });

  deck.slideRecap(pres, {
    rodape: RODAPE_DECK, pageNum: 15,
    pontos: [
      "Contratar cedo demais quebra o caixa; contratar tarde demais quebra o profissional — o momento certo depende de sinais reais",
      "Apoio administrativo, parceria com outro psicólogo e clínica formal resolvem problemas diferentes",
      "Receita estável, sobrecarga administrativa, demanda excedente e reserva financeira são os 4 sinais de prontidão",
      "Avaliar sinais, definir o papel, calcular impacto financeiro e formalizar por escrito reduzem o risco dessa decisão",
    ],
    proximoTexto: "Próximo: exercícios práticos e avaliação do Módulo 6.3 →",
  });

  return pres.writeFile({ fileName: "Modulo-6.3-Quando-Contratar.pptx" });
}

// ============================================================
// 2) EXERCÍCIOS
// ============================================================
function construirExercicios() {
  const children = [
    ...doc.capa(KICKER, "Exercícios — Quando Contratar", "Resolva individualmente, de preferência avaliando sua própria situação atual enquanto responde."),

    doc.exNum(1, "Os 4 sinais de prontidão"),
    doc.pergunta(1, "Liste os 4 sinais vistos no módulo."),
    ...doc.linhaResposta(3),

    doc.exNum(2, "Os 3 tipos de contratação"),
    doc.tabelaSimples(["Tipo", "Que problema resolve"], [["Apoio administrativo", ""], ["Outro psicólogo", ""], ["Clínica formal", ""]], [3600, 5550]),

    doc.exNum(3, "Avaliando sua própria prontidão"),
    doc.pergunta(1, "Quantos dos 4 sinais de prontidão você já apresenta hoje?"),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Responda as 3 perguntas do slide 9 pensando na sua própria situação."),
    ...doc.linhaResposta(3),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),

    doc.exNum(4, "Definindo um papel claro"),
    doc.pergunta(1, "Se você fosse contratar alguém hoje, descreva em 3 frases o que essa pessoa faria."),
    ...doc.linhaResposta(3),

    doc.exNum(5, "Caso integrado — a lista de espera"),
    doc.vinhetaBox("Uma psicóloga tem lista de espera crescente, receita estável e reserva de 3 meses, mas ainda não conversou claramente sobre parceria com uma colega."),
    doc.pergunta(1, "Quantos dos 4 sinais de prontidão essa psicóloga já apresenta?"),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Que passo do protocolo ela ainda não deu?"),
    ...doc.linhaResposta(2),
    doc.pergunta(3, "Que tipo de contratação parece mais adequado pra esse caso?"),
    ...doc.linhaResposta(2),
  ];

  return doc.salvar(doc.paginaDoc("Escola de Marketing para Psicólogos", RODAPE_DOC, children), "Modulo-6.3-Exercicios.docx");
}

// ============================================================
// 3) AVALIAÇÃO
// ============================================================
function construirProva() {
  const objetivas = [
    ["Os 4 sinais de prontidão pra contratar, segundo o módulo, são:", ["Receita estável, sobrecarga administrativa, demanda excedente, reserva financeira", "Alcance, engajamento, agendamento e custo por lead", "Segurança, facilidade de uso, custo compatível", "Identificação, veracidade, sigilo e comparação"]],
    ["Os 3 tipos de contratação, segundo o módulo, são:", ["Apoio administrativo, outro psicólogo, clínica formal", "Preço, localização e horário de atendimento", "Alcance, engajamento e conversão", "Reconhecimento, geração de contato e remarketing"]],
    ["\"Decisão por ansiedade\", segundo o módulo, é descrita como:", ["Um sinal de que ainda não é hora de contratar", "O critério mais confiável pra decidir contratar", "Irrelevante para a decisão de contratação", "Exigido antes de qualquer contratação"]],
    ["Contratar apoio administrativo, segundo o módulo, resolve principalmente:", ["Tarefas não clínicas consumindo tempo do profissional", "Excesso de demanda clínica além da capacidade individual", "A necessidade de formalizar uma clínica com CNPJ", "A falta de reserva financeira do consultório"]],
    ["A pergunta \"minha receita sustenta esse custo mesmo em cenário ruim\" busca:", ["Considerar queda de demanda, não apenas o melhor cenário possível", "Substituir a necessidade de definir claramente o papel da contratação", "Ser respondida apenas após a contratação já ter sido feita", "Garantir automaticamente o sucesso da parceria"]],
    ["\"Papel indefinido\" na contratação tende a gerar:", ["Expectativa desalinhada e frustração precoce dos dois lados", "Maior clareza sobre as responsabilidades de cada parte", "Redução automática do risco financeiro envolvido", "Nenhum efeito relevante sobre o resultado da parceria"]],
    ["O cálculo do impacto financeiro, segundo o protocolo, deve considerar:", ["Uma queda de 20 a 30% na demanda, não apenas o cenário ideal", "Exclusivamente o cenário mais otimista possível", "Apenas o primeiro mês após a contratação", "Nenhuma variação possível na receita futura"]],
    ["\"Formalizar com contrato claro\", segundo o módulo, deve ser feito:", ["Mesmo entre amigos ou colegas de confiança", "Apenas quando não há relação de confiança prévia", "Somente em contratações de apoio administrativo", "Nunca é necessário entre profissionais da mesma área"]],
    ["Diante de dúvida sobre formalização como clínica, o módulo recomenda:", ["Buscar apoio de um contador especializado em saúde", "Formalizar imediatamente, sem qualquer consulta prévia", "Evitar completamente esse tipo de estrutura", "Resolver isso sem qualquer apoio especializado"]],
    ["Este módulo trata de qual tipo de decisão em relação ao curso como um todo?", ["A expansão da estrutura individual construída em todo o curso", "A escolha inicial de especialidade, do Bloco 1", "As regras de publicidade profissional, do Bloco 2", "A estratégia de conteúdo, do Bloco 3"]],
  ];
  const gabaritoObjetivas = ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a"];

  const children = [
    ...doc.capa(KICKER, "Avaliação — Quando Contratar", `Avaliação formativa de encerramento do Módulo ${MOD}.`),
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
    doc.vinhetaBox("Um psicólogo, exausto com o volume de tarefas administrativas, decide contratar uma secretária no mesmo dia em que se sentiu mais sobrecarregado, sem revisar receita, reserva ou definir claramente as tarefas dela."),
    new doc.Paragraph({ spacing: { before: 240 }, children: [new doc.TextRun({ text: "Com base no protocolo estudado, responda:", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    new doc.Paragraph({ spacing: { before: 220, after: 40 }, children: [new doc.TextRun({ text: "a) (10 pts) Que erro comum esse psicólogo cometeu ao decidir dessa forma?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "b) (10 pts) Que passo do protocolo ele pulou completamente?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "c) (10 pts) Mesmo que a decisão acabe se mostrando correta, por que o processo usado ainda foi arriscado?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "d) (10 pts) Que 2 passos ele deveria seguir agora, mesmo já tendo contratado?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    new doc.Paragraph({ spacing: { after: 40 }, children: [new doc.TextRun({ text: "USO EXCLUSIVO DO INSTRUTOR — remover antes de aplicar a prova", bold: true, color: doc.TERRA, font: doc.FONT, size: 20 })] }),
    doc.tituloH1("Gabarito"),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 1 — Questões objetivas", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 200 }, children: [new doc.TextRun({ text: gabaritoObjetivas.map((r, i) => `${i + 1}-${r}`).join("   ·   "), font: doc.FONT, size: 22, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 2 — Critério de correção da questão de caso", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "a) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Decisão por ansiedade, motivada pelo desespero do momento, não por avaliação real dos sinais de prontidão.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "b) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Passo 1 (avaliar os 4 sinais de prontidão) e passo 3 (calcular o impacto financeiro) — nenhum dos dois foi feito.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "c) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Porque um processo sem base em dados reais tende a se repetir de forma ainda mais arriscada em decisões futuras, mesmo quando o resultado dessa vez foi favorável por sorte.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "d) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Passo 2 (definir claramente o papel, mesmo que retroativamente) e passo 4 (formalizar com contrato claro).", font: doc.FONT, size: 21, color: doc.INK })] }),
  );

  return doc.salvar(doc.paginaDoc("Escola de Marketing para Psicólogos", RODAPE_DOC, children), "Modulo-6.3-Avaliacao.docx");
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
      n: 1, titulo: "Por que é um passo grande, e os 4 sinais", duracao: "13 min", slides: "1, 2, 3, 4",
      objetivo: "Sair sabendo por que contratar é uma decisão significativa e quais os 4 sinais de prontidão.",
      segmentos: [
        seg("0:00–0:45", "Abertura (gancho)", [{ fala: "Contratar cedo demais quebra o caixa. Contratar tarde demais quebra você — o segredo está em reconhecer o momento certo, não em ter pressa ou medo." }]),
        seg("0:45–2:00", "Por que isso importa", ["Este módulo trata da decisão que expande a estrutura construída em todo o curso até aqui."]),
        seg("2:00–9:00", "Os 4 sinais (mostrar slide 4)", [
          "Receita estável por vários meses seguidos.",
          "Tarefas administrativas consumindo tempo clínico.",
          "Demanda maior que a capacidade individual.",
          "Reserva financeira suficiente pra sustentar o risco.",
        ]),
        seg("9:00–12:00", "Um ponto importante", ["Nenhum sinal isolado é suficiente — a decisão fica mais segura quando vários aparecem juntos."]),
        seg("12:00–13:00", "Fechamento", [{ fala: "Próxima aula: do sozinho ao time, e os 3 tipos de contratação." }]),
      ],
    },
    {
      n: 2, titulo: "Do sozinho ao time, e os 3 tipos de contratação", duracao: "12 min", slides: "5, 6",
      objetivo: "Explicar a cadeia de decisão e diferenciar os 3 tipos de contratação.",
      segmentos: [
        seg("0:00–1:00", "Retomada rápida", ["Vimos os 4 sinais. Hoje, o caminho completo da sobrecarga à decisão estruturada."]),
        seg("1:00–6:00", "A cadeia (mostrar slide 5)", ["Sobrecarga percebida → Avaliação de sinais → Decisão de contratar → Estruturação do papel."]),
        seg("6:00–11:00", "Os 3 tipos (mostrar slide 6)", ["Apoio administrativo, outro psicólogo, e clínica formal — cada um resolve um problema diferente."]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Próxima aula: os sinais de que ainda não é hora, e 3 momentos de decisão." }]),
      ],
    },
    {
      n: 3, titulo: "Sinais de alerta e os 3 momentos de decisão", duracao: "12 min", slides: "7, 8",
      objetivo: "Reconhecer sinais de que ainda não é hora e diferenciar os 3 momentos de decisão.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Quatro sinais de que ainda não é hora — e três momentos, do cedo demais ao tarde demais."]),
        seg("1:00–6:00", "Sinais de alerta (mostrar slide 7)", [
          "Receita instável.",
          "Sem reserva construída.",
          "Decisão por ansiedade.",
          "Papel indefinido.",
        ]),
        seg("6:00–11:00", "Os 3 momentos (mostrar slide 8)", ["Cedo demais, momento certo e tarde demais."]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Próxima aula: as 3 perguntas antes de contratar, e os 4 passos completos." }]),
      ],
    },
    {
      n: 4, titulo: "As 3 perguntas e os 4 passos", duracao: "11 min", slides: "9, 10",
      objetivo: "Conhecer as 3 perguntas antes de contratar e os 4 passos completos de decisão.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três perguntas simples — e um processo de 4 passos pra decidir contratar com segurança."]),
        seg("1:00–5:00", "3 perguntas (mostrar slide 9)", ["Sustenta 6 meses, que tarefa exata, e se não der certo — as 3 perguntas centrais."]),
        seg("5:00–10:00", "Os 4 passos (mostrar slide 10)", ["Avaliar os 4 sinais, definir o papel, calcular impacto financeiro, formalizar com contrato claro."]),
        seg("10:00–11:00", "Fechamento", [{ fala: "Próxima aula: aplicando os 4 passos na prática." }]),
      ],
    },
    {
      n: 5, titulo: "Aplicação prática dos 4 passos", duracao: "12 min", slides: "11, 12",
      objetivo: "Aplicar os 4 passos com exemplos concretos.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Hoje colocamos os 4 passos em prática, avaliando prontidão real."]),
        seg("1:00–6:00", "Passos 1 e 2 (mostrar slide 11)", ["Revise os últimos 6 meses de receita.", { fala: "Se eu descrevesse essa vaga em 3 frases, o que exatamente essa pessoa faria no meu consultório?" }]),
        seg("6:00–11:00", "Passos 3 e 4 (mostrar slide 12)", ["Considere uma queda de 20 a 30% na demanda.", "Formalize por escrito, mesmo entre colegas de confiança."]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Próxima aula: um caso real de lista de espera crescente, e o recap final." }]),
      ],
    },
    {
      n: 6, titulo: "Prática guiada — a lista de espera e recap final", duracao: "13 min", slides: "13, 14, 15",
      objetivo: "Aplicar tudo que foi visto a um caso real e consolidar os pontos-chave do módulo.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["A última aula do módulo — um caso real, e o recap final."]),
        seg("1:00–5:00", "Apresentando o caso (mostrar slide 13)", ["Leia a vinheta com calma.", "Note que os sinais financeiros estão presentes, mas falta clareza sobre a estrutura da parceria."]),
        seg("5:00–9:00", "Percorrendo as perguntas de discussão", ["Discuta em voz alta as 3 perguntas do slide 13.", "Esboce como essa psicóloga definiria o papel da parceria."]),
        seg("9:00–11:00", "Quando buscar ajuda especializada (mostrar slide 14)", ["Percorra os 4 critérios do slide 14."]),
        seg("11:00–13:00", "Recap final (mostrar slide 15)", [{ fala: "Retome os 4 pontos-chave do módulo. Agora é hora dos exercícios e da avaliação — e do último módulo do Bloco 6, sobre diversificar receita." }]),
      ],
    },
  ];

  const totalMin = 13 + 12 + 12 + 11 + 12 + 13;

  const children = [
    ...doc.capa(KICKER, "Roteiro de Aulas — Quando Contratar", "Módulo dividido em 6 vídeo-aulas de 11 a 13 minutos, seguindo os slides já produzidos. Cada aula tem roteiro cronometrado, pronto pra gravação."),
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

  return doc.salvar(doc.paginaDoc("Escola de Marketing para Psicólogos", `${RODAPE_DOC} — Roteiro de Aulas`, children), "Modulo-6.3-Roteiro-Aulas.docx");
}

// ============================================================
Promise.resolve()
  .then(construirDeck)
  .then(construirExercicios)
  .then(construirProva)
  .then(construirRoteiro)
  .then(() => console.log("TUDO PRONTO"))
  .catch((e) => { console.error(e); process.exit(1); });

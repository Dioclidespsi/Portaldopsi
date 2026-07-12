const deck = require("../_lib/lib-deck.js");
const doc = require("../_lib/lib-doc.js");

const MOD = "5.4";
const NOME = "Prática Supervisionada e Casos Finais";
const RODAPE_DECK = `Prática Supervisionada e Casos Finais — Módulo ${MOD}`;
const RODAPE_DOC = `Módulo ${MOD} — Prática Supervisionada e Casos Finais`;
const KICKER = "MÓDULO 5.4 · INTEGRAÇÃO, CARREIRA E PRÁTICA SUPERVISIONADA";

// ============================================================
// 1) SLIDE DECK
// ============================================================
function construirDeck() {
  const pres = deck.novaApresentacao(`${NOME} — Preparação Final para Certificação`);

  deck.slideTitulo(pres, {
    moduloLabel: `Módulo ${MOD} · Bloco 5 · Encerramento`,
    titulo: "Casos Finais",
    subtitulo: "Casos combinando múltiplas demandas no mesmo paciente — preparação final para certificação",
    passos: ["Combinação", "Hierarquia", "Prática", "Revisão", "Certificação"],
  });

  deck.slideRoteiro(pres, {
    rodape: RODAPE_DECK, pageNum: 2,
    cards: [
      { titulo: "Por que praticar casos combinados", desc: "Pacientes reais raramente chegam com uma única demanda isolada" },
      { titulo: "Caso 1: ansiedade e burnout", desc: "Um padrão de comorbidade muito comum no consultório" },
      { titulo: "Caso 2: trauma e adicção", desc: "Quando o uso de substância funciona como automedicação" },
      { titulo: "Caso 3: depressão e relacionamento", desc: "Quando o sofrimento individual transborda para o casal" },
      { titulo: "Preparação final", desc: "O que revisar antes da avaliação de certificação" },
    ],
  });

  deck.slideHook(pres, {
    rodape: RODAPE_DECK, pageNum: 3,
    frase: "Na vida real, pacientes não chegam com um único protocolo do Bloco 4 escrito na testa — eles chegam com 2, 3 demandas entrelaçadas, e sua tarefa é decidir por onde começar.",
    apoio: "Este é o módulo final da Formação Completa. Ele não traz protocolo novo — ele testa sua capacidade de combinar tudo que você já construiu, sob supervisão, antes da certificação.",
  });

  deck.slideCircuito(pres, {
    rodape: RODAPE_DECK, pageNum: 4,
    titulo: "O que compõe a prática supervisionada",
    regioes: [
      { label: "Casos combinados: mais de uma demanda clínica no mesmo paciente", rx: 0.20, ry: 0.22, color: deck.NAVY, d: 0.5 },
      { label: "Hierarquização: decidir por onde começar com segurança", rx: 0.22, ry: 0.62, color: deck.TERRA, d: 0.4 },
      { label: "Múltiplos protocolos: aplicados em sequência, não ao mesmo tempo", rx: 0.60, ry: 0.60, color: deck.NAVY_TINT, d: 0.36 },
      { label: "Preparação para certificação: consolidação final do curso", rx: 0.58, ry: 0.24, color: deck.TERRA_TINT, d: 0.36 },
    ],
    notas: [
      "Casos combinados são a regra, não a exceção, na prática clínica real — este módulo prepara você para essa realidade.",
      "A ordem de aplicação dos protocolos, definida pela hierarquia de risco e impacto, é tão importante quanto os protocolos em si.",
    ],
  });

  deck.slideCadeia(pres, {
    rodape: RODAPE_DECK, pageNum: 5,
    titulo: "Como abordar um caso com múltiplas demandas",
    elos: [
      { titulo: "Mapear as demandas", desc: "Todas as queixas e padrões presentes, sem hierarquizar ainda" },
      { titulo: "Hierarquizar", desc: "Por risco e impacto, seguindo o critério do Módulo 2.6" },
      { titulo: "Aplicar o protocolo prioritário", desc: "Antes de introduzir o(s) protocolo(s) seguinte(s)" },
      { titulo: "Reavaliar e ajustar", desc: "Conforme o progresso, revisando a hierarquia inicial se necessário" },
    ],
    notaFinal: "Tratar duas demandas ao mesmo tempo, sem hierarquia, é o erro mais comum em casos combinados — e o que mais compromete o resultado.",
  });

  deck.slideCategorias(pres, {
    rodape: RODAPE_DECK, pageNum: 6,
    titulo: "3 padrões comuns de comorbidade",
    categorias: [
      { titulo: "Ansiedade e burnout", desc: "O padrão mais comum — esgotamento profissional alimentando ansiedade crônica", color: deck.NAVY },
      { titulo: "Trauma e adicção", desc: "Uso de substância funcionando como automedicação do sofrimento traumático", color: deck.TERRA },
      { titulo: "Depressão e relacionamento", desc: "Sofrimento individual transbordando para o funcionamento do casal", color: deck.NAVY_TINT },
    ],
    notaFinal: "Esses 3 padrões não são os únicos possíveis — são os mais frequentes, e por isso o foco da prática guiada deste módulo.",
  });

  deck.slideSinais(pres, {
    rodape: RODAPE_DECK, pageNum: 7,
    titulo: "Sinais de que um caso exige coordenação de múltiplos protocolos",
    itens: [
      { titulo: "Mais de uma categoria clínica presente", desc: "Sintomas de categorias diferentes aparecendo simultaneamente" },
      { titulo: "Tratamento sem melhora aparente", desc: "Por não abordar uma segunda demanda que sustenta a primeira" },
      { titulo: "Risco elevado em mais de uma dimensão", desc: "Exigindo atenção simultânea a diferentes fontes de risco" },
      { titulo: "Sobreposição de causas relatada", desc: "O próprio paciente descreve conexão entre queixas aparentemente distintas" },
    ],
  });

  deck.slideDiferencial(pres, {
    rodape: RODAPE_DECK, pageNum: 8,
    titulo: "3 casos-tipo praticados neste módulo",
    cards: [
      { titulo: "Caso A: Ansiedade + Burnout", desc: "Esgotamento profissional alimentando um quadro ansioso crônico" },
      { titulo: "Caso B: Trauma + Adicção", desc: "Uso de substância como automedicação de sofrimento traumático" },
      { titulo: "Caso C: Depressão + Casal", desc: "Sofrimento individual comprometendo o funcionamento da relação" },
    ],
  });

  deck.slideInstrumentos(pres, {
    rodape: RODAPE_DECK, pageNum: 9,
    titulo: "3 pilares da preparação para certificação",
    instrumentos: [
      { sigla: "Checklist de conteúdo", nome: "Revisão dos 4 blocos e dos 8 protocolos clínicos", desc: "Garante que nenhuma área central do curso ficou sem revisão." },
      { sigla: "Portfólio de casos", nome: "Casos combinados praticados ao longo deste módulo", desc: "Evidência prática da capacidade de formulação integrada." },
      { sigla: "Autoavaliação", nome: "Reflexão honesta sobre pontos fortes e lacunas", desc: "Base para decidir onde buscar supervisão contínua após o curso." },
    ],
  });

  deck.slideProtocoloOverview(pres, {
    rodape: RODAPE_DECK, pageNum: 10,
    titulo: "Preparando a certificação: 4 passos",
    passos: [
      { titulo: "Revisar os 8\nprotocolos", desc: "Do Bloco 4, com atenção aos critérios de encaminhamento de cada um" },
      { titulo: "Revisar os\ninstrumentos", desc: "Do Bloco 2, principalmente as escalas de rastreio e gravidade" },
      { titulo: "Praticar casos\ncombinados", desc: "Pelo menos os 3 casos-tipo trabalhados neste módulo" },
      { titulo: "Realizar a\navaliação final", desc: "A etapa que conclui formalmente a Formação Completa" },
    ],
    notaFinal: "Esses 4 passos não substituem a supervisão contínua — são a base mínima antes da certificação formal.",
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 11,
    titulo: "Caso A, na prática: Ansiedade + Burnout",
    colunas: [
      {
        numero: 1, titulo: "Mapeando as demandas",
        bullets: ["Sintomas de ansiedade generalizada (Módulo 4.1) somados a exaustão emocional e cinismo (Módulo 4.3)", "Aplicar GAD-7 e MBI para confirmar e quantificar ambos os quadros"],
      },
      {
        numero: 2, titulo: "Hierarquizando",
        fala: "“O esgotamento profissional parece estar alimentando a ansiedade, ou a ansiedade de base é que tornou o trabalho insustentável?”",
        bullets: ["A resposta dessa pergunta orienta qual protocolo aplicar primeiro"],
      },
    ],
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 12,
    titulo: "Caso B, na prática: Trauma + Adicção",
    colunas: [
      {
        numero: 1, titulo: "Mapeando as demandas",
        bullets: ["Sintomas de TEPT (Módulo 4.6) coexistindo com padrão de uso de substância (Módulo 4.5)", "Investigar se o uso funciona como estratégia de regulação do sofrimento traumático"],
      },
      {
        numero: 2, titulo: "Hierarquizando",
        bullets: ["Priorizar estabilização do uso de substância antes de aprofundar o trabalho com a memória traumática", "Manter comunicação estreita com suporte médico quando houver risco de abstinência (Módulo 3.5)"],
      },
    ],
  });

  deck.slideCaso(pres, {
    rodape: RODAPE_DECK, pageNum: 13,
    vinheta: "Renata, 38 anos, procura terapia relatando tristeza persistente há 8 meses e conflitos crescentes com o marido. Descreve que \"não consegue mais sentir prazer em nada\", inclusive no relacionamento, que era antes uma fonte de apoio. O marido, segundo ela, \"não entende por que ela mudou\" e as brigas têm aumentado. As escalas aplicadas confirmam depressão moderada (PHQ-9) e ajustamento diádico comprometido (DAS).",
    perguntas: [
      "Que dois módulos do Bloco 4 esse caso conecta, e qual você priorizaria primeiro?",
      "Como a queda de prazer relatada pode estar afetando diretamente a dinâmica do casal?",
      "Que critério guiaria a decisão de incluir o marido em alguma etapa do processo terapêutico?",
    ],
  });

  deck.slideEncaminhamento(pres, {
    rodape: RODAPE_DECK, pageNum: 14,
    criterios: [
      "Caso combina 3 ou mais demandas clínicas simultâneas: considerar equipe multiprofissional coordenada",
      "Qualquer sinal de risco identificado em meio à formulação combinada: ativar o Módulo 4.9 imediatamente",
      "Progresso estagnado apesar de hierarquia bem definida: buscar supervisão clínica externa",
      "Caso excede o escopo prático desenvolvido durante a formação: reconhecer o limite é parte da prática ética",
    ],
  });

  deck.slideRecap(pres, {
    rodape: RODAPE_DECK, pageNum: 15,
    pontos: [
      "Pacientes reais raramente chegam com uma única demanda isolada — casos combinados são a regra",
      "Mapear, hierarquizar, aplicar o protocolo prioritário e reavaliar são os 4 passos de qualquer caso combinado",
      "Ansiedade+burnout, trauma+adicção e depressão+relacionamento são os padrões de comorbidade mais frequentes",
      "Este módulo encerra a Formação Completa — a certificação reconhece a base construída, e a supervisão contínua sustenta a prática",
    ],
    proximoTexto: "Próximo: exercícios finais e avaliação de certificação →",
  });

  return pres.writeFile({ fileName: "Modulo-5.4-Pratica-Supervisionada-Casos-Finais.pptx" });
}

// ============================================================
// 2) EXERCÍCIOS
// ============================================================
function construirExercicios() {
  const children = [
    ...doc.capa(KICKER, "Exercícios — Prática Supervisionada e Casos Finais", "Resolva individualmente antes da sessão de supervisão. Este é o último conjunto de exercícios antes da avaliação de certificação."),

    doc.exNum(1, "Os 4 passos do caso combinado"),
    doc.pergunta(1, "Descreva, em suas palavras, por que tratar duas demandas ao mesmo tempo sem hierarquia costuma comprometer o resultado."),
    ...doc.linhaResposta(3),

    doc.exNum(2, "Os 3 padrões de comorbidade"),
    doc.tabelaSimples(["Padrão", "Característica central"], [["Ansiedade + Burnout", ""], ["Trauma + Adicção", ""], ["Depressão + Relacionamento", ""]], [3600, 5550]),

    doc.exNum(3, "Praticando o Caso A — Ansiedade e Burnout"),
    doc.vinhetaBox("Um paciente relata ansiedade constante e exaustão emocional crescente, ambos surgidos após um aumento de responsabilidades no trabalho há 6 meses."),
    doc.pergunta(1, "Que pergunta de hierarquização você faria primeiro?"),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Que instrumentos do Bloco 2 você aplicaria para confirmar ambos os quadros?"),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),

    doc.exNum(4, "Praticando o Caso B — Trauma e Adicção"),
    doc.vinhetaBox("Um paciente com histórico de trauma relata uso crescente de álcool nos últimos meses, especialmente em dias com mais lembranças intrusivas do evento."),
    doc.pergunta(1, "Qual demanda você priorizaria estabilizar primeiro, e por quê?"),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Que módulo do Bloco 3 seria relevante consultar nesse caso?"),
    ...doc.linhaResposta(2),

    doc.exNum(5, "Caso final integrado — Renata"),
    doc.vinhetaBox("Renata, 38 anos, tristeza persistente há 8 meses, anedonia, conflitos crescentes com o marido, PHQ-9 confirmando depressão moderada e DAS confirmando ajustamento diádico comprometido."),
    doc.pergunta(1, "Que dois módulos do Bloco 4 esse caso conecta, e qual você priorizaria primeiro?"),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Como a queda de prazer relatada pode estar afetando a dinâmica do casal?"),
    ...doc.linhaResposta(2),
    doc.pergunta(3, "Que critério guiaria a decisão de incluir o marido em alguma etapa do processo?"),
    ...doc.linhaResposta(2),
    doc.pergunta(4, "Que critério de encaminhamento você consideraria relevante nesse caso?"),
    ...doc.linhaResposta(2),
  ];

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-5.4-Exercicios.docx");
}

// ============================================================
// 3) AVALIAÇÃO
// ============================================================
function construirProva() {
  const objetivas = [
    ["O erro mais comum em casos combinados, segundo o módulo, é:", ["Tratar duas demandas ao mesmo tempo, sem hierarquia definida", "Hierarquizar as demandas antes de iniciar o tratamento", "Aplicar apenas um protocolo por vez, em sequência clara", "Reavaliar o caso periodicamente conforme a evolução"]],
    ["Os 4 passos de abordagem de um caso combinado são:", ["Mapear, hierarquizar, aplicar o protocolo prioritário, reavaliar", "Diagnosticar, medicar, encaminhar, encerrar", "Aplicar todos os protocolos simultaneamente, sem ordem definida", "Ignorar demandas secundárias até a alta do paciente"]],
    ["O padrão de comorbidade \"ansiedade e burnout\" se caracteriza por:", ["Esgotamento profissional alimentando ansiedade crônica", "Uso de substância como automedicação de trauma", "Sofrimento individual transbordando para o relacionamento", "Ausência completa de qualquer relação entre os dois quadros"]],
    ["No caso de trauma e adicção, o módulo recomenda:", ["Priorizar estabilização do uso de substância antes de aprofundar o trabalho com a memória traumática", "Aprofundar imediatamente o trabalho com a memória traumática, ignorando o uso de substância", "Tratar exclusivamente a adicção, sem qualquer atenção ao trauma", "Encerrar o acompanhamento até que o paciente resolva o uso sozinho"]],
    ["Um sinal de que um caso exige coordenação de múltiplos protocolos é:", ["Tratamento sem melhora por não abordar uma segunda demanda que sustenta a primeira", "Presença de uma única categoria clínica isolada", "Ausência completa de qualquer risco identificado", "Progresso consistente e linear em todas as áreas simultaneamente"]],
    ["Os 3 pilares da preparação para certificação, segundo o módulo, são:", ["Checklist de conteúdo, portfólio de casos, autoavaliação", "Apenas a nota da avaliação final, sem outros critérios", "Exclusivamente a prática de um único caso combinado", "Revisão de farmacologia, sem qualquer outro conteúdo"]],
    ["Diante de um caso que combina 3 ou mais demandas clínicas simultâneas, o módulo recomenda:", ["Considerar equipe multiprofissional coordenada", "Tratar todas as demandas sozinho, sem qualquer apoio adicional", "Encerrar o acompanhamento imediatamente", "Ignorar as demandas secundárias por completo"]],
    ["Reconhecer que um caso excede o escopo prático desenvolvido durante a formação é descrito no módulo como:", ["Parte da prática ética", "Um sinal de fracasso profissional", "Algo que nunca deve ser comunicado ao paciente", "Irrelevante para a conduta clínica"]],
    ["Diante de qualquer sinal de risco identificado em meio à formulação combinada, o módulo recomenda:", ["Ativar o Módulo 4.9 imediatamente", "Continuar a formulação normalmente, sem prioridade adicional", "Registrar o sinal para revisão em consulta futura", "Ignorar, pois raramente é relevante nesse contexto"]],
    ["Este módulo, segundo o material, representa:", ["O encerramento da Formação Completa, testando a integração de tudo que foi construído", "Um conteúdo teórico novo, sem relação com os módulos anteriores", "Um substituto para a supervisão clínica contínua após o curso", "Um módulo opcional, sem relevância para a certificação"]],
  ];
  const gabaritoObjetivas = ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a"];

  const children = [
    ...doc.capa(KICKER, "Avaliação — Prática Supervisionada e Casos Finais", `Avaliação final de certificação da Formação Completa, encerrando o Módulo ${MOD}.`),
    doc.infoBox([
      ["Nota de corte:", "75 de 100 pontos"],
      ["Tempo sugerido:", "50 minutos"],
      ["Composição:", "10 questões objetivas (6 pts cada = 60 pts) + 1 questão de caso (40 pts)"],
      ["Consulta:", "Material da aula permitido; discussão entre colegas, não"],
    ]),
    doc.tituloH1("Parte 1 — Questões objetivas"),
  ];
  objetivas.forEach((q, i) => children.push(...doc.questaoObjetiva(i + 1, q[0], q[1])));

  children.push(
    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    doc.tituloH1("Parte 2 — Questão de caso (40 pontos)"),
    doc.vinhetaBox("Bruno, 27 anos, procura terapia relatando procrastinação crônica no trabalho e uso crescente de jogos online \"para relaxar\", ao ponto de comprometer o sono e os prazos profissionais. Relata que a procrastinação já existia antes, mas piorou muito nos últimos 4 meses, coincidindo com o aumento do uso de jogos."),
    new doc.Paragraph({ spacing: { before: 240 }, children: [new doc.TextRun({ text: "Com base em tudo que foi estudado ao longo da Formação Completa, construa uma formulação de caso resumida, respondendo:", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    new doc.Paragraph({ spacing: { before: 220, after: 40 }, children: [new doc.TextRun({ text: "a) (10 pts) Que dois módulos do Bloco 4 esse caso conecta?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "b) (10 pts) Qual demanda você hierarquizaria primeiro, e com que justificativa?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "c) (10 pts) Que instrumentos do Bloco 2 você aplicaria para confirmar e quantificar ambos os quadros?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "d) (10 pts) Que critério de encaminhamento você consideraria relevante nesse caso?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    new doc.Paragraph({ spacing: { after: 40 }, children: [new doc.TextRun({ text: "USO EXCLUSIVO DO INSTRUTOR — remover antes de aplicar a prova", bold: true, color: doc.TERRA, font: doc.FONT, size: 20 })] }),
    doc.tituloH1("Gabarito"),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 1 — Questões objetivas", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 200 }, children: [new doc.TextRun({ text: gabaritoObjetivas.map((r, i) => `${i + 1}-${r}`).join("   ·   "), font: doc.FONT, size: 22, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 2 — Critério de correção da questão de caso", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "a) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Módulo 4.7 (Procrastinação e autorregulação) e Módulo 4.5 (Adicções), dado o padrão de uso crescente de jogos comprometendo funcionamento.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "b) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "O uso de jogos, por ter surgido e se intensificado mais recentemente e estar comprometendo diretamente o sono e o desempenho — estabilizar esse padrão tende a facilitar o trabalho posterior com a procrastinação de base.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "c) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Escala de procrastinação geral adaptada e escala de uso de telas/jogos (Módulo 2.5), além de investigação qualitativa do impacto no sono e nos prazos.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "d) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Investigar comorbidade com TDAH não diagnosticado (critério do Módulo 4.7), especialmente diante de procrastinação crônica de longa data.", font: doc.FONT, size: 21, color: doc.INK })] }),
  );

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-5.4-Avaliacao.docx");
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
      n: 1, titulo: "Por que praticar casos combinados", duracao: "13 min", slides: "1, 2, 3, 4",
      objetivo: "Sair sabendo por que a prática de casos combinados é essencial antes da certificação.",
      segmentos: [
        seg("0:00–0:45", "Abertura (gancho)", [{ fala: "Na vida real, pacientes não chegam com um único protocolo do Bloco 4 escrito na testa — eles chegam com 2, 3 demandas entrelaçadas, e sua tarefa é decidir por onde começar." }]),
        seg("0:45–2:00", "Por que isso importa", ["Este é o módulo final da Formação Completa — testa sua capacidade de combinar tudo que você já construiu."]),
        seg("2:00–9:00", "O que compõe a prática (mostrar slide 4)", [
          "Casos combinados: mais de uma demanda clínica no mesmo paciente.",
          "Hierarquização: decidir por onde começar com segurança.",
          "Múltiplos protocolos: aplicados em sequência, não ao mesmo tempo.",
          "Preparação para certificação: consolidação final do curso.",
        ]),
        seg("9:00–12:00", "Um ponto importante", ["Casos combinados são a regra, não a exceção, na prática clínica real."]),
        seg("12:00–13:00", "Fechamento", [{ fala: "Próxima aula: como abordar um caso com múltiplas demandas, passo a passo." }]),
      ],
    },
    {
      n: 2, titulo: "Como abordar um caso combinado", duracao: "11 min", slides: "5",
      objetivo: "Explicar os 4 passos de abordagem de qualquer caso com múltiplas demandas.",
      segmentos: [
        seg("0:00–1:00", "Retomada rápida", ["Vimos os elementos da prática. Hoje, o passo a passo de abordagem."]),
        seg("1:00–8:00", "Os 4 passos (mostrar slide 5)", ["Mapear as demandas → Hierarquizar → Aplicar o protocolo prioritário → Reavaliar e ajustar."]),
        seg("8:00–10:00", "Um ponto importante", ["Tratar duas demandas ao mesmo tempo, sem hierarquia, é o erro mais comum em casos combinados."]),
        seg("10:00–11:00", "Fechamento", [{ fala: "Próxima aula: os 3 padrões de comorbidade mais comuns." }]),
      ],
    },
    {
      n: 3, titulo: "Os 3 padrões de comorbidade e seus sinais", duracao: "13 min", slides: "6, 7",
      objetivo: "Reconhecer os 3 padrões de comorbidade mais frequentes e os sinais de coordenação necessária.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três padrões — e os sinais de que um caso precisa de coordenação entre protocolos."]),
        seg("1:00–6:00", "Os 3 padrões (mostrar slide 6)", [
          "Ansiedade e burnout: o padrão mais comum.",
          "Trauma e adicção: uso como automedicação.",
          "Depressão e relacionamento: sofrimento transbordando para o casal.",
        ]),
        seg("6:00–11:30", "Sinais de coordenação necessária (mostrar slide 7)", [
          "Mais de uma categoria clínica presente.",
          "Tratamento sem melhora aparente.",
          "Risco elevado em mais de uma dimensão.",
          "Sobreposição de causas relatada pelo próprio paciente.",
        ]),
        seg("11:30–13:00", "Fechamento", [{ fala: "Próxima aula: os 3 casos-tipo que vamos praticar e os pilares da certificação." }]),
      ],
    },
    {
      n: 4, titulo: "Os 3 casos-tipo e os pilares da certificação", duracao: "12 min", slides: "8, 9",
      objetivo: "Apresentar os 3 casos-tipo do módulo e os 3 pilares de preparação para certificação.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Os 3 casos que vamos praticar — e o que sustenta a preparação para a certificação."]),
        seg("1:00–5:30", "Os 3 casos-tipo (mostrar slide 8)", ["Caso A: Ansiedade + Burnout.", "Caso B: Trauma + Adicção.", "Caso C: Depressão + Casal."]),
        seg("5:30–11:00", "Os 3 pilares da certificação (mostrar slide 9)", [
          "Checklist de conteúdo: revisão dos 4 blocos e dos 8 protocolos.",
          "Portfólio de casos: os casos combinados praticados neste módulo.",
          "Autoavaliação: reflexão honesta sobre pontos fortes e lacunas.",
        ]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Próxima aula: os 4 passos finais antes da avaliação de certificação." }]),
      ],
    },
    {
      n: 5, titulo: "Os 4 passos finais de preparação", duracao: "11 min", slides: "10",
      objetivo: "Apresentar os 4 passos finais antes da avaliação de certificação.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["A reta final antes da avaliação de certificação."]),
        seg("1:00–9:00", "Os 4 passos (mostrar slide 10)", [
          "Revisar os 8 protocolos do Bloco 4, com atenção aos critérios de encaminhamento.",
          "Revisar os instrumentos do Bloco 2, principalmente escalas de rastreio.",
          "Praticar pelo menos os 3 casos-tipo deste módulo.",
          "Realizar a avaliação final de certificação.",
        ]),
        seg("9:00–11:00", "Fechamento", [{ fala: "Próxima aula: praticando o Caso A, ansiedade e burnout, na prática." }]),
      ],
    },
    {
      n: 6, titulo: "Prática guiada — Caso A: Ansiedade e Burnout", duracao: "12 min", slides: "11",
      objetivo: "Aplicar o método completo ao primeiro caso combinado do módulo.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["O primeiro dos 3 casos combinados praticados neste módulo."]),
        seg("1:00–6:00", "Mapeando as demandas (mostrar slide 11, esquerda)", ["Sintomas de ansiedade generalizada somados a exaustão emocional e cinismo.", "Aplicar GAD-7 e MBI para confirmar e quantificar ambos os quadros."]),
        seg("6:00–11:00", "Hierarquizando (mostrar slide 11, direita)", [{ fala: "O esgotamento profissional parece estar alimentando a ansiedade, ou a ansiedade de base é que tornou o trabalho insustentável?" }]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Próxima aula: praticando o Caso B, trauma e adicção." }]),
      ],
    },
    {
      n: 7, titulo: "Prática guiada — Caso B: Trauma e Adicção", duracao: "12 min", slides: "12",
      objetivo: "Aplicar o método completo ao segundo caso combinado do módulo.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["O segundo caso combinado — trauma e uso de substância."]),
        seg("1:00–6:00", "Mapeando as demandas (mostrar slide 12, esquerda)", ["Sintomas de TEPT coexistindo com padrão de uso de substância.", "Investigar se o uso funciona como estratégia de regulação do sofrimento traumático."]),
        seg("6:00–11:00", "Hierarquizando (mostrar slide 12, direita)", ["Priorizar estabilização do uso de substância antes de aprofundar o trabalho com a memória traumática.", "Manter comunicação estreita com suporte médico quando houver risco de abstinência."]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Próxima aula: um último caso completo, do início ao fim, e o encerramento do curso." }]),
      ],
    },
    {
      n: 8, titulo: "Prática guiada final — o caso de Renata e encerramento", duracao: "16 min", slides: "13, 14, 15",
      objetivo: "Aplicar o modelo completo a um último caso complexo e encerrar formalmente a Formação Completa.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["A última prática guiada de toda a Formação Completa."]),
        seg("1:00–5:00", "Apresentando o caso (mostrar slide 13)", ["Leia a vinheta da Renata com calma.", "Note a conexão entre a anedonia individual e o conflito crescente com o marido."]),
        seg("5:00–10:00", "Percorrendo as perguntas de discussão", ["Discuta em voz alta as 3 perguntas do slide 13.", "Esboce a hierarquia de prioridades para esse caso."]),
        seg("10:00–13:00", "Quando encaminhar (mostrar slide 14)", ["Percorra os 4 critérios finais de encaminhamento do curso."]),
        seg("13:00–16:00", "Encerramento da Formação Completa (mostrar slide 15)", [{ fala: "Retome os 4 pontos-chave finais. Você concluiu os 5 blocos da Formação Completa — a certificação reconhece essa base, e a prática contínua, com supervisão, é o que vai sustentá-la daqui pra frente. Parabéns pela jornada." }]),
      ],
    },
  ];

  const totalMin = 13 + 11 + 13 + 12 + 11 + 12 + 12 + 16;

  const children = [
    ...doc.capa(KICKER, "Roteiro de Aulas — Prática Supervisionada e Casos Finais", "Módulo dividido em 8 vídeo-aulas de 11 a 16 minutos, seguindo os slides já produzidos. Cada aula tem roteiro cronometrado, pronto pra gravação. Este é o último roteiro da Formação Completa."),
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

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", `${RODAPE_DOC} — Roteiro de Aulas`, children), "Modulo-5.4-Roteiro-Aulas.docx");
}

// ============================================================
Promise.resolve()
  .then(construirDeck)
  .then(construirExercicios)
  .then(construirProva)
  .then(construirRoteiro)
  .then(() => console.log("TUDO PRONTO"))
  .catch((e) => { console.error(e); process.exit(1); });

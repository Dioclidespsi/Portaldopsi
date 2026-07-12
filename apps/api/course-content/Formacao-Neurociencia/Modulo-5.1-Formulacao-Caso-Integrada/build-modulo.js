const deck = require("../_lib/lib-deck.js");
const doc = require("../_lib/lib-doc.js");

const MOD = "5.1";
const NOME = "Formulação de Caso Integrada";
const RODAPE_DECK = `Formulação de Caso Integrada — Módulo ${MOD}`;
const RODAPE_DOC = `Módulo ${MOD} — Formulação de Caso Integrada`;
const KICKER = "MÓDULO 5.1 · INTEGRAÇÃO, CARREIRA E PRÁTICA SUPERVISIONADA";

// ============================================================
// 1) SLIDE DECK
// ============================================================
function construirDeck() {
  const pres = deck.novaApresentacao(`${NOME} — Onde Tudo Que Você Aprendeu Converge`);

  deck.slideTitulo(pres, {
    moduloLabel: `Módulo ${MOD} · Bloco 5 · Integração`,
    titulo: "Formulação de Caso Integrada",
    subtitulo: "Mecanismo, diagnóstico, farmacologia e protocolo numa única história coerente",
    passos: ["Mecanismo", "Diagnóstico", "Farmacologia", "Protocolo", "Prática guiada"],
  });

  deck.slideRoteiro(pres, {
    rodape: RODAPE_DECK, pageNum: 2,
    cards: [
      { titulo: "Mecanismo (Bloco 1)", desc: "Por que esse padrão existe nessa pessoa específica" },
      { titulo: "Diagnóstico (Bloco 2)", desc: "O que os dados coletados significam clinicamente" },
      { titulo: "Farmacologia (Bloco 3)", desc: "Fatores medicamentosos relevantes, quando aplicável" },
      { titulo: "Protocolo (Bloco 4)", desc: "A intervenção selecionada e adaptada ao caso" },
      { titulo: "Prática guiada", desc: "Um caso complexo, passo a passo, do início ao fim" },
    ],
  });

  deck.slideHook(pres, {
    rodape: RODAPE_DECK, pageNum: 3,
    frase: "Um bom terapeuta não aplica um protocolo isolado — ele constrói uma formulação de caso que integra mecanismo, diagnóstico, instrumento e intervenção numa única história coerente sobre aquela pessoa específica.",
    apoio: "Este módulo não traz conteúdo novo — ele é o ponto de convergência de tudo que os Blocos 1 a 4 construíram, praticado com um caso completo e complexo.",
  });

  deck.slideCircuito(pres, {
    rodape: RODAPE_DECK, pageNum: 4,
    titulo: "Os 4 blocos que convergem na formulação de caso",
    regioes: [
      { label: "Fundamentos (Bloco 1): mecanismo neurobiológico do padrão observado", rx: 0.20, ry: 0.22, color: deck.NAVY, d: 0.5 },
      { label: "Avaliação (Bloco 2): diagnóstico formal e instrumentos aplicados", rx: 0.22, ry: 0.62, color: deck.TERRA, d: 0.4 },
      { label: "Farmacologia (Bloco 3): contexto medicamentoso, quando aplicável", rx: 0.60, ry: 0.60, color: deck.NAVY_TINT, d: 0.36 },
      { label: "Protocolos (Bloco 4): intervenção clínica selecionada e adaptada", rx: 0.58, ry: 0.24, color: deck.TERRA_TINT, d: 0.36 },
    ],
    notas: [
      "O mecanismo neurobiológico (Bloco 1) explica o \"por quê\" — a base que sustenta toda a psicoeducação ao longo do tratamento.",
      "O diagnóstico formal (Bloco 2) traduz a observação clínica numa linguagem precisa e compartilhável entre profissionais.",
      "A farmacologia (Bloco 3), quando presente no caso, precisa ser considerada na leitura de sintomas e na comunicação com a equipe médica.",
    ],
  });

  deck.slideCadeia(pres, {
    rodape: RODAPE_DECK, pageNum: 5,
    titulo: "Da anamnese à formulação integrada",
    elos: [
      { titulo: "Coleta ampla de dados", desc: "Entrevista, testes, escalas e histórico completo (Bloco 2)" },
      { titulo: "Síntese com hierarquia", desc: "Priorização clínica das demandas identificadas (Módulo 2.6)" },
      { titulo: "Seleção do protocolo", desc: "Escolha e adaptação da intervenção ao caso específico (Bloco 4)" },
      { titulo: "Formulação registrada", desc: "Documento vivo que guia e é revisado ao longo do tratamento" },
    ],
    notaFinal: "A formulação de caso não é um documento estático — ela é revisada e ajustada conforme o tratamento avança e novos dados aparecem.",
  });

  deck.slideCategorias(pres, {
    rodape: RODAPE_DECK, pageNum: 6,
    titulo: "3 elementos de uma formulação completa",
    categorias: [
      { titulo: "Compreensão do mecanismo", desc: "Por que esse padrão existe nessa pessoa, com essa história específica", color: deck.NAVY },
      { titulo: "Leitura diagnóstica formal", desc: "O que os dados coletados significam clinicamente, com especificadores", color: deck.TERRA },
      { titulo: "Plano de ação específico", desc: "O que fazer, em que ordem, com qual protocolo adaptado", color: deck.NAVY_TINT },
    ],
    notaFinal: "Uma formulação que tem só um desses 3 elementos é incompleta — mecanismo sem plano de ação não orienta a prática; plano sem mecanismo carece de fundamento.",
  });

  deck.slideSinais(pres, {
    rodape: RODAPE_DECK, pageNum: 7,
    titulo: "Sinais de uma formulação malfeita",
    itens: [
      { titulo: "Sintomas isolados sem hierarquia", desc: "Tentar tratar tudo ao mesmo tempo, sem priorização clara (Módulo 2.6)" },
      { titulo: "Protocolo aplicado sem adaptação", desc: "Usar o protocolo padrão ignorando particularidades do caso" },
      { titulo: "Fatores farmacológicos ignorados", desc: "Não considerar medicação em uso na leitura dos sintomas" },
      { titulo: "Formulação nunca revisada", desc: "Manter o mesmo plano mesmo diante de evolução ou estagnação clara" },
    ],
  });

  deck.slideDiferencial(pres, {
    rodape: RODAPE_DECK, pageNum: 8,
    titulo: "Níveis de complexidade da formulação",
    cards: [
      { titulo: "Formulação simples", desc: "Um diagnóstico claro, um protocolo aplicado diretamente" },
      { titulo: "Formulação com comorbidade", desc: "Múltiplos diagnósticos coexistentes, exigindo hierarquia clara" },
      { titulo: "Formulação multifatorial", desc: "Farmacologia, personalidade e fatores situacionais concomitantes" },
    ],
  });

  deck.slideInstrumentos(pres, {
    rodape: RODAPE_DECK, pageNum: 9,
    titulo: "Os 3 documentos que sustentam a formulação",
    instrumentos: [
      { sigla: "Anamnese completa", nome: "Entrevista e exame do estado mental (Módulo 2.1)", desc: "A base de qualquer formulação, coletada com rigor." },
      { sigla: "Bateria de avaliação", nome: "Testes e escalas aplicados (Módulos 2.3 a 2.5)", desc: "Dados objetivos que sustentam ou refinam as hipóteses." },
      { sigla: "Plano terapêutico", nome: "Síntese e priorização (Módulo 2.6)", desc: "O documento que efetivamente orienta o trabalho sessão a sessão." },
    ],
  });

  deck.slideProtocoloOverview(pres, {
    rodape: RODAPE_DECK, pageNum: 10,
    titulo: "Construindo a formulação: 4 passos",
    passos: [
      { titulo: "Integrar os\ndados coletados", desc: "Numa narrativa coerente, não numa lista solta de achados" },
      { titulo: "Identificar o\nmecanismo central", desc: "O que conecta os diferentes sintomas observados" },
      { titulo: "Selecionar e\nadaptar o protocolo", desc: "Ajustado às particularidades desse caso específico" },
      { titulo: "Revisar\nperiodicamente", desc: "Com base na evolução real, não apenas no plano inicial" },
    ],
    notaFinal: "Esses 4 passos resumem, na prática, todo o percurso deste curso — do mecanismo neurobiológico ao plano de ação concreto.",
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 11,
    titulo: "Passos 1 e 2, na prática",
    colunas: [
      {
        numero: 1, titulo: "Integrar os dados coletados",
        bullets: ["Reúna anamnese, exame do estado mental, testes e escalas numa única narrativa clínica", "Procure ativamente convergências e discrepâncias entre as diferentes fontes"],
      },
      {
        numero: 2, titulo: "Identificar o mecanismo central",
        fala: "“O que conecta a ansiedade, a dificuldade de dormir e o padrão de evitação que você descreve — existe um fio condutor comum?”",
        bullets: ["Busque o mecanismo neurobiológico (Bloco 1) que melhor explica o conjunto de sintomas, não apenas cada um isoladamente"],
      },
    ],
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 12,
    titulo: "Passos 3 e 4, na prática",
    colunas: [
      {
        numero: 3, titulo: "Selecionar e adaptar o protocolo",
        bullets: ["Escolha o protocolo do Bloco 4 mais alinhado à hierarquia de prioridades definida", "Adapte a linguagem, o ritmo e a ênfase conforme as particularidades do paciente"],
      },
      {
        numero: 4, titulo: "Revisar periodicamente",
        bullets: ["Reaplique escalas (Módulo 2.5) e compare com a linha de base regularmente", "Ajuste a formulação — não apenas o protocolo — quando a evolução real destoar do esperado"],
      },
    ],
  });

  deck.slideCaso(pres, {
    rodape: RODAPE_DECK, pageNum: 13,
    vinheta: "Marina, 34 anos, chega relatando ansiedade intensa e insônia há 6 meses, desde que assumiu um cargo de liderança. A anamnese revela padrão de perfeccionismo extremo desde a adolescência e dificuldade histórica de delegar tarefas. Ela está em uso de um ansiolítico prescrito recentemente, que a deixa \"mais calma, mas meio apagada\". As escalas aplicadas confirmam ansiedade moderada (GAD-7) e sinais de esgotamento profissional (MBI) já em estágio avançado. Ela nega qualquer histórico de queixas assim antes desse cargo.",
    perguntas: [
      "Que módulos do Bloco 4 esse caso conecta, considerando o perfeccionismo de longa data e o quadro atual?",
      "Como você hierarquizaria as demandas (ansiedade, insônia, burnout, uso de ansiolítico) numa formulação integrada?",
      "Que mecanismo central (Bloco 1) melhor conecta esses diferentes sintomas relatados?",
    ],
  });

  deck.slideEncaminhamento(pres, {
    rodape: RODAPE_DECK, pageNum: 14,
    criterios: [
      "Complexidade do caso excede a competência de um único profissional: considerar equipe multiprofissional",
      "Revisão periódica revela estagnação apesar de protocolo bem aplicado: reformular a hipótese diagnóstica",
      "Fatores farmacológicos relevantes não endereçados: comunicar à psiquiatria (Bloco 3) antes de aprofundar",
      "Qualquer sinal de risco identificado durante a formulação: ativar o Módulo 4.9 imediatamente, antes de qualquer outro passo",
    ],
  });

  deck.slideRecap(pres, {
    rodape: RODAPE_DECK, pageNum: 15,
    pontos: [
      "A formulação de caso integra mecanismo (Bloco 1), diagnóstico (Bloco 2), farmacologia (Bloco 3) e protocolo (Bloco 4) numa única narrativa",
      "Compreensão do mecanismo, leitura diagnóstica formal e plano de ação específico são os 3 elementos que compõem uma formulação completa",
      "Formulação simples, com comorbidade, e multifatorial exigem níveis crescentes de coordenação e cuidado",
      "A formulação é um documento vivo — revisado com a evolução real do caso, não fixado apenas na avaliação inicial",
    ],
    proximoTexto: "Próximo: exercícios práticos e avaliação do Módulo 5.1 →",
  });

  return pres.writeFile({ fileName: "Modulo-5.1-Formulacao-Caso-Integrada.pptx" });
}

// ============================================================
// 2) EXERCÍCIOS
// ============================================================
function construirExercicios() {
  const children = [
    ...doc.capa(KICKER, "Exercícios — Formulação de Caso Integrada", "Resolva individualmente antes da sessão de supervisão. O objetivo é testar sua capacidade de síntese antes de comparar com a discussão em grupo — não há problema em errar."),

    doc.exNum(1, "Os 3 elementos, em suas palavras"),
    doc.pergunta(1, "Explique em uma frase cada elemento: compreensão do mecanismo, leitura diagnóstica formal, plano de ação específico."),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Por que uma formulação com apenas um desses 3 elementos é considerada incompleta?"),
    ...doc.linhaResposta(2),

    doc.exNum(2, "Níveis de complexidade"),
    doc.tabelaSimples(["Nível", "Característica central"], [["Formulação simples", ""], ["Formulação com comorbidade", ""], ["Formulação multifatorial", ""]], [3600, 5550]),

    doc.exNum(3, "Praticando a integração — caso 1"),
    doc.vinhetaBox("Um paciente de 28 anos relata procrastinação crônica no trabalho, e a avaliação neuropsicológica (Módulo 2.3) revela padrão de desatenção presente desde a infância, confirmado pela família."),
    doc.pergunta(1, "Que módulos dos Blocos 1, 2 e 4 essa formulação integraria, e por quê?"),
    ...doc.linhaResposta(3),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),

    doc.exNum(4, "Praticando a integração — caso 2 (mais complexo)"),
    doc.vinhetaBox("Uma paciente de 45 anos relata sintomas depressivos há 3 meses, uso recente de um novo antidepressivo prescrito, e um padrão de relacionamento historicamente marcado por medo intenso de abandono e instabilidade afetiva."),
    doc.pergunta(1, "Que hierarquia de prioridades você estabeleceria entre esses elementos?"),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Que módulos específicos do Bloco 4 essa formulação provavelmente conectaria?"),
    ...doc.linhaResposta(2),
    doc.pergunta(3, "Que fator do Bloco 3 precisa ser considerado antes de aprofundar o trabalho psicológico?"),
    ...doc.linhaResposta(2),

    doc.exNum(5, "Caso integrado — Marina"),
    doc.vinhetaBox("Marina, 34 anos, ansiedade e insônia há 6 meses desde que assumiu cargo de liderança, perfeccionismo extremo desde a adolescência, uso recente de ansiolítico, escalas confirmando ansiedade moderada e burnout avançado."),
    doc.pergunta(1, "Que módulos do Bloco 4 esse caso conecta?"),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Como você hierarquizaria as demandas identificadas?"),
    ...doc.linhaResposta(2),
    doc.pergunta(3, "Que mecanismo central melhor conecta os sintomas relatados?"),
    ...doc.linhaResposta(2),
  ];

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-5.1-Exercicios.docx");
}

// ============================================================
// 3) AVALIAÇÃO
// ============================================================
function construirProva() {
  const objetivas = [
    ["Os 4 blocos que convergem na formulação de caso são:", ["Fundamentos, Avaliação, Farmacologia, Protocolos", "Sintomas nucleares, duração mínima, prejuízo funcional, exclusão de causas", "Grandiosidade, necessidade de admiração, falta de empatia, impulsividade", "Serotonina, dopamina, GABA, glutamato"]],
    ["Os 3 elementos de uma formulação completa são:", ["Compreensão do mecanismo, leitura diagnóstica formal, plano de ação específico", "Atenção, memória, funções executivas", "Sistema de apego, programação do eixo HPA, regulação compartilhada", "Autorrelato rápido, entrevista estruturada, escala de risco"]],
    ["A formulação de caso, segundo o módulo, deve ser entendida como:", ["Um documento vivo, revisado com a evolução real do caso", "Um documento fixo, definido apenas na primeira avaliação", "Algo irrelevante depois que o protocolo é escolhido", "Um registro que nunca precisa ser atualizado"]],
    ["Formulação com comorbidade se caracteriza por:", ["Múltiplos diagnósticos coexistentes, exigindo hierarquia clara", "Ausência completa de qualquer diagnóstico formal", "Um único protocolo aplicado sem qualquer adaptação", "Exclusão automática de qualquer intervenção farmacológica"]],
    ["Um sinal de formulação malfeita é:", ["Aplicar o protocolo padrão ignorando particularidades do caso", "Adaptar a linguagem e o ritmo às particularidades do paciente", "Revisar periodicamente a formulação com a evolução real", "Hierarquizar claramente as demandas identificadas"]],
    ["O passo \"identificar o mecanismo central\" busca:", ["O que conecta os diferentes sintomas observados, não apenas cada um isoladamente", "Ignorar completamente a base neurobiológica dos sintomas", "Focar exclusivamente no sintoma mais recente relatado", "Evitar qualquer conexão entre Bloco 1 e o caso em formulação"]],
    ["Diante de estagnação apesar de protocolo bem aplicado, o módulo recomenda:", ["Reformular a hipótese diagnóstica", "Manter exatamente o mesmo plano indefinidamente", "Encerrar o acompanhamento imediatamente", "Ignorar a ausência de progresso"]],
    ["Fatores farmacológicos relevantes num caso devem ser:", ["Considerados na leitura de sintomas e comunicados à psiquiatria quando necessário", "Sempre ignorados na formulação de caso", "Motivo automático de encerramento do acompanhamento psicológico", "Irrelevantes pra qualquer formulação de caso"]],
    ["Diante de qualquer sinal de risco identificado durante a formulação, o módulo recomenda:", ["Ativar o Módulo 4.9 imediatamente, antes de qualquer outro passo", "Continuar a formulação normalmente, sem qualquer prioridade adicional", "Registrar o sinal para revisão em uma consulta futura", "Ignorar, pois raramente é relevante nesse contexto"]],
    ["Este módulo, segundo o material, representa:", ["O ponto de convergência de tudo que os Blocos 1 a 4 construíram", "Um conteúdo completamente novo, sem relação com os blocos anteriores", "Um substituto completo para a aplicação de qualquer protocolo do Bloco 4", "Um módulo opcional, sem relevância prática real"]],
  ];
  const gabaritoObjetivas = ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a"];

  const children = [
    ...doc.capa(KICKER, "Avaliação — Formulação de Caso Integrada", `Avaliação formativa de encerramento do Módulo ${MOD}.`),
    doc.infoBox([
      ["Nota de corte:", "75 de 100 pontos (nota mais alta, dada a natureza integradora deste módulo)"],
      ["Tempo sugerido:", "45 minutos"],
      ["Composição:", "10 questões objetivas (6 pts cada = 60 pts) + 1 questão de caso (40 pts)"],
      ["Consulta:", "Material da aula permitido; discussão entre colegas, não"],
    ]),
    doc.tituloH1("Parte 1 — Questões objetivas"),
  ];
  objetivas.forEach((q, i) => children.push(...doc.questaoObjetiva(i + 1, q[0], q[1])));

  children.push(
    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    doc.tituloH1("Parte 2 — Questão de caso (40 pontos)"),
    doc.vinhetaBox("Rafael, 39 anos, procura terapia após uma recaída no uso de álcool, depois de 8 meses de abstinência. Relata que a recaída coincidiu com um período de sintomas depressivos intensos, incluindo um comentário isolado sobre \"não ver sentido em continuar assim\". Está em acompanhamento psiquiátrico, mas relata que \"não sente que o remédio está fazendo efeito\". A avaliação revela também um padrão histórico de relações instáveis e medo intenso de abandono."),
    new doc.Paragraph({ spacing: { before: 240 }, children: [new doc.TextRun({ text: "Com base no protocolo estudado, construa uma formulação de caso resumida, respondendo:", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    new doc.Paragraph({ spacing: { before: 220, after: 40 }, children: [new doc.TextRun({ text: "a) (10 pts) Qual é a prioridade clínica absoluta, considerando o comentário relatado, antes de qualquer outra ação?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "b) (10 pts) Que módulos do Bloco 4 essa formulação provavelmente integraria, além do Módulo 4.9?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "c) (10 pts) Que ação de comunicação (Bloco 3) é relevante, dado o relato sobre a medicação?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "d) (10 pts) Que mecanismo central (Bloco 1) poderia conectar o padrão relacional histórico à recaída recente?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    new doc.Paragraph({ spacing: { after: 40 }, children: [new doc.TextRun({ text: "USO EXCLUSIVO DO INSTRUTOR — remover antes de aplicar a prova", bold: true, color: doc.TERRA, font: doc.FONT, size: 20 })] }),
    doc.tituloH1("Gabarito"),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 1 — Questões objetivas", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 200 }, children: [new doc.TextRun({ text: gabaritoObjetivas.map((r, i) => `${i + 1}-${r}`).join("   ·   "), font: doc.FONT, size: 22, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 2 — Critério de correção da questão de caso", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "a) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Avaliação de risco formal, ativando o protocolo do Módulo 4.9 imediatamente — o comentário sobre \"não ver sentido\" exige investigação antes de qualquer outra intervenção.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "b) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Módulo 4.5 (Adicções), Módulo 4.2 (Depressão), e possivelmente Módulo 4.14 (TP Borderline) ou 4.18 (TP Dependente), dado o padrão de medo de abandono e instabilidade relacional.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "c) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Comunicar ao psiquiatra a percepção de ausência de resposta ao tratamento, com contexto temporal (tempo de uso, relação com a recaída), sem opinar sobre ajuste de dose.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "d) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "O sistema de apego (Módulo 1.3), com padrão de apego inseguro, pode conectar o medo de abandono, a instabilidade relacional, e o uso de substância como estratégia de regulação emocional diante de ameaça de perda percebida.", font: doc.FONT, size: 21, color: doc.INK })] }),
  );

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-5.1-Avaliacao.docx");
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
      n: 1, titulo: "Onde tudo que você aprendeu converge", duracao: "13 min", slides: "1, 2, 3, 4",
      objetivo: "Sair sabendo explicar como os 4 blocos anteriores convergem numa formulação de caso.",
      segmentos: [
        seg("0:00–0:45", "Abertura (gancho)", [{ fala: "Um bom terapeuta não aplica um protocolo isolado — ele constrói uma formulação de caso que integra mecanismo, diagnóstico, instrumento e intervenção numa única história coerente sobre aquela pessoa específica." }]),
        seg("0:45–2:00", "Por que isso importa", ["Este módulo não traz conteúdo novo — é o ponto de convergência de tudo que os Blocos 1 a 4 construíram."]),
        seg("2:00–9:00", "Os 4 blocos (mostrar slide 4)", [
          "Fundamentos: mecanismo neurobiológico do padrão observado.",
          "Avaliação: diagnóstico formal e instrumentos aplicados.",
          "Farmacologia: contexto medicamentoso, quando aplicável.",
          "Protocolos: intervenção clínica selecionada e adaptada.",
        ]),
        seg("9:00–12:00", "Um ponto importante", ["Nenhum desses blocos, isoladamente, sustenta uma formulação completa."]),
        seg("12:00–13:00", "Fechamento", [{ fala: "Próxima aula: da anamnese à formulação integrada, passo a passo." }]),
      ],
    },
    {
      n: 2, titulo: "Da anamnese à formulação integrada", duracao: "11 min", slides: "5",
      objetivo: "Explicar a cadeia entre coleta de dados, síntese e formulação registrada.",
      segmentos: [
        seg("0:00–1:00", "Retomada rápida", ["Vimos os 4 blocos. Hoje vemos como eles se organizam em sequência prática."]),
        seg("1:00–7:00", "A cadeia (mostrar slide 5)", ["Coleta ampla de dados: entrevista, testes, escalas, histórico.", "Síntese com hierarquia: priorização clínica (Módulo 2.6).", "Seleção do protocolo: escolha e adaptação (Bloco 4).", "Formulação registrada: documento vivo, revisado ao longo do tratamento."]),
        seg("7:00–10:00", "Um ponto importante", ["A formulação não é estática — é ajustada conforme o tratamento avança."]),
        seg("10:00–11:00", "Fechamento", [{ fala: "Próxima aula: os 3 elementos de uma formulação completa." }]),
      ],
    },
    {
      n: 3, titulo: "Os 3 elementos e os sinais de formulação malfeita", duracao: "13 min", slides: "6, 7",
      objetivo: "Reconhecer os 3 elementos centrais de uma boa formulação e os erros mais comuns.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três elementos — e os sinais de que algo está faltando na formulação."]),
        seg("1:00–6:00", "Os 3 elementos (mostrar slide 6)", [
          "Compreensão do mecanismo: por que esse padrão existe nessa pessoa.",
          "Leitura diagnóstica formal: o que os dados significam clinicamente.",
          "Plano de ação específico: o que fazer, em que ordem.",
        ]),
        seg("6:00–11:30", "Sinais de formulação malfeita (mostrar slide 7)", [
          "Sintomas isolados sem hierarquia.",
          "Protocolo aplicado sem adaptação.",
          "Fatores farmacológicos ignorados.",
          "Formulação nunca revisada.",
        ]),
        seg("11:30–13:00", "Fechamento", [{ fala: "Próxima aula: os níveis de complexidade da formulação." }]),
      ],
    },
    {
      n: 4, titulo: "Níveis de complexidade e os documentos de sustentação", duracao: "12 min", slides: "8, 9",
      objetivo: "Diferenciar níveis de complexidade e conhecer os documentos que sustentam a formulação.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três níveis de complexidade — cada um exigindo um grau diferente de coordenação."]),
        seg("1:00–6:00", "Os 3 níveis (mostrar slide 8)", [
          "Formulação simples: um diagnóstico, um protocolo direto.",
          "Formulação com comorbidade: múltiplos diagnósticos, hierarquia clara.",
          "Formulação multifatorial: farmacologia, personalidade, fatores situacionais.",
        ]),
        seg("6:00–11:00", "Os 3 documentos (mostrar slide 9)", [
          "Anamnese completa: a base de qualquer formulação.",
          "Bateria de avaliação: dados objetivos que sustentam hipóteses.",
          "Plano terapêutico: o documento que orienta o trabalho sessão a sessão.",
        ]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Próxima aula: colocamos tudo em prática — os 4 passos de construção." }]),
      ],
    },
    {
      n: 5, titulo: "Aplicação — integrar dados e identificar o mecanismo central", duracao: "14 min", slides: "10, 11",
      objetivo: "Aplicar os passos 1 e 2 do modelo de construção da formulação.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["A parte mais prática desse módulo. Hoje, os 2 primeiros passos."]),
        seg("1:00–2:00", "Visão geral (mostrar slide 10)", ["Integrar os dados coletados → Identificar o mecanismo central → Selecionar e adaptar o protocolo → Revisar periodicamente."]),
        seg("2:00–8:00", "Passo 1 — Integrar os dados coletados (mostrar slide 11, esquerda)", ["Reúna todas as fontes numa única narrativa clínica.", "Procure convergências e discrepâncias entre elas."]),
        seg("8:00–13:00", "Passo 2 — Identificar o mecanismo central (mostrar slide 11, direita)", [{ fala: "O que conecta a ansiedade, a dificuldade de dormir e o padrão de evitação que você descreve — existe um fio condutor comum?" }]),
        seg("13:00–14:00", "Fechamento", [{ fala: "Próxima aula: selecionar o protocolo e revisar periodicamente." }]),
      ],
    },
    {
      n: 6, titulo: "Aplicação — selecionar o protocolo e revisar periodicamente", duracao: "12 min", slides: "12",
      objetivo: "Trabalhar adaptação de protocolo e revisão contínua da formulação.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Hoje fechamos o modelo com os 2 últimos passos, ligados à execução prática."]),
        seg("1:00–6:30", "Passo 3 — Selecionar e adaptar o protocolo (mostrar slide 12, esquerda)", ["Escolha o protocolo mais alinhado à hierarquia de prioridades.", "Adapte linguagem, ritmo e ênfase ao paciente específico."]),
        seg("6:30–11:00", "Passo 4 — Revisar periodicamente (mostrar slide 12, direita)", ["Reaplique escalas e compare com a linha de base.", "Ajuste a formulação quando a evolução destoar do esperado."]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Modelo completo. Próxima aula: um caso complexo, do início ao fim." }]),
      ],
    },
    {
      n: 7, titulo: "Prática guiada — o caso de Marina", duracao: "16 min", slides: "13",
      objetivo: "Aplicar o modelo completo a um caso complexo e multifatorial, do início ao fim.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["A aula mais longa do módulo — uma prática guiada completa."]),
        seg("1:00–5:00", "Apresentando o caso (mostrar slide 13)", ["Leia a vinheta completa da Marina com calma.", "Note os múltiplos elementos: ansiedade, insônia, perfeccionismo, burnout, medicação."]),
        seg("5:00–10:00", "Construindo a formulação, passo 1 e 2", ["Integre os dados: perfeccionismo desde a adolescência + quadro atual desde o novo cargo.", "Identifique o mecanismo central que conecta os sintomas."]),
        seg("10:00–15:00", "Construindo a formulação, passo 3 e 4", ["Percorra as 3 perguntas de discussão em voz alta.", "Esboce a hierarquia de prioridades e os módulos do Bloco 4 conectados."]),
        seg("15:00–16:00", "Fechamento", [{ fala: "Próxima aula: quando encaminhar, e o recap final do módulo." }]),
      ],
    },
    {
      n: 8, titulo: "Quando encaminhar e recap final", duracao: "13 min", slides: "14, 15",
      objetivo: "Consolidar os critérios de encaminhamento e os pontos-chave de todo o módulo.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Última aula do módulo. Critérios de quando a formulação exige apoio adicional."]),
        seg("1:00–7:00", "Quando encaminhar (mostrar slide 14)", ["Percorra os 4 critérios, com atenção especial a sinais de risco identificados durante a formulação."]),
        seg("7:00–12:00", "Recapitulando o módulo (mostrar slide 15)", ["Retome os 4 pontos-chave.", "Reforce que a formulação é um documento vivo, não um retrato único e fixo."]),
        seg("12:00–13:00", "Fechamento do módulo", [{ fala: "Agora é hora dos exercícios e da avaliação. Te vejo no próximo módulo do Bloco 5." }]),
      ],
    },
  ];

  const totalMin = 13 + 11 + 13 + 12 + 14 + 12 + 16 + 13;

  const children = [
    ...doc.capa(KICKER, "Roteiro de Aulas — Formulação de Caso Integrada", "Módulo dividido em 8 vídeo-aulas de 10 a 16 minutos, seguindo os slides já produzidos. Cada aula tem roteiro cronometrado, pronto pra gravação."),
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

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", `${RODAPE_DOC} — Roteiro de Aulas`, children), "Modulo-5.1-Roteiro-Aulas.docx");
}

// ============================================================
Promise.resolve()
  .then(construirDeck)
  .then(construirExercicios)
  .then(construirProva)
  .then(construirRoteiro)
  .then(() => console.log("TUDO PRONTO"))
  .catch((e) => { console.error(e); process.exit(1); });

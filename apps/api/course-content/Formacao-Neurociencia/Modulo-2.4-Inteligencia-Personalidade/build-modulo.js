const deck = require("../_lib/lib-deck.js");
const doc = require("../_lib/lib-doc.js");

const MOD = "2.4";
const NOME = "Avaliação de Inteligência e Personalidade";
const RODAPE_DECK = `Inteligência e Personalidade — Módulo ${MOD}`;
const RODAPE_DOC = `Módulo ${MOD} — Inteligência e Personalidade`;
const KICKER = "MÓDULO 2.4 · PSICODIAGNÓSTICO E AVALIAÇÃO NEUROPSICOLÓGICA";

// ============================================================
// 1) SLIDE DECK
// ============================================================
function construirDeck() {
  const pres = deck.novaApresentacao(`${NOME} — Além do Laudo Pericial`);

  deck.slideTitulo(pres, {
    moduloLabel: `Módulo ${MOD} · Bloco 2 · Avaliação`,
    titulo: "Inteligência e Personalidade",
    subtitulo: "WAIS-IV, WISC-V, Raven e MMPI-2 no processo terapêutico, sem reducionismo",
    passos: ["WAIS/WISC", "Raven", "MMPI-2", "Uso clínico", "Devolutiva"],
  });

  deck.slideRoteiro(pres, {
    rodape: RODAPE_DECK, pageNum: 2,
    cards: [
      { titulo: "WAIS-IV / WISC-V", desc: "Perfil de inteligência em adultos e crianças/adolescentes" },
      { titulo: "Raven", desc: "Triagem não-verbal, menos influenciada por escolaridade" },
      { titulo: "MMPI-2", desc: "Avaliação ampla de personalidade e psicopatologia" },
      { titulo: "Uso clínico", desc: "Quando esses testes entram no processo terapêutico, não só pericial" },
      { titulo: "Devolutiva", desc: "Como comunicar resultado sem reducionismo" },
    ],
  });

  deck.slideHook(pres, {
    rodape: RODAPE_DECK, pageNum: 3,
    frase: "Um número de QI não define o potencial de alguém, e um perfil de personalidade não é um rótulo permanente — o valor clínico real está no perfil de forças e fraquezas, não num escore isolado.",
    apoio: "Esses instrumentos são frequentemente vistos apenas como ferramentas de laudo pericial — mas, bem utilizados, também orientam diretamente o plano terapêutico.",
  });

  deck.slideCircuito(pres, {
    rodape: RODAPE_DECK, pageNum: 4,
    titulo: "Os 4 índices que compõem o WAIS-IV",
    regioes: [
      { label: "Compreensão verbal (raciocínio com conceitos verbais)", rx: 0.20, ry: 0.22, color: deck.NAVY, d: 0.5 },
      { label: "Organização perceptual (raciocínio visual e espacial)", rx: 0.22, ry: 0.62, color: deck.TERRA, d: 0.4 },
      { label: "Memória de trabalho (manter e manipular informação temporariamente)", rx: 0.60, ry: 0.60, color: deck.NAVY_TINT, d: 0.36 },
      { label: "Velocidade de processamento (rapidez de tarefas simples)", rx: 0.58, ry: 0.24, color: deck.TERRA_TINT, d: 0.36 },
    ],
    notas: [
      "O QI Total é uma média — dois perfis muito diferentes de índices podem gerar o mesmo QI Total, escondendo informação clínica relevante.",
      "Um perfil com grande discrepância entre índices costuma ser mais informativo clinicamente do que o QI Total isoladamente.",
      "A memória de trabalho e a velocidade de processamento são frequentemente os índices mais sensíveis a quadros como TDAH e ansiedade.",
    ],
  });

  deck.slideCadeia(pres, {
    rodape: RODAPE_DECK, pageNum: 5,
    titulo: "Do QI Total ao perfil clinicamente útil",
    elos: [
      { titulo: "QI Total isolado", desc: "Um único número, que esconde variação relevante entre habilidades" },
      { titulo: "Os 4 índices", desc: "Revelam o perfil real de forças e fraquezas cognitivas" },
      { titulo: "Padrão de discrepância", desc: "Diferenças significativas entre índices orientam hipóteses específicas" },
      { titulo: "Aplicação terapêutica", desc: "O perfil orienta estratégias de intervenção, não apenas classificação" },
    ],
    notaFinal: "É por isso que um laudo de QI que só reporta o número total, sem detalhar os índices, tem valor clínico limitado.",
  });

  deck.slideCategorias(pres, {
    rodape: RODAPE_DECK, pageNum: 6,
    titulo: "3 finalidades desses instrumentos",
    categorias: [
      { titulo: "Perfil cognitivo", desc: "WAIS-IV (adultos) e WISC-V (crianças/adolescentes)", color: deck.NAVY },
      { titulo: "Triagem rápida não-verbal", desc: "Raven, menos influenciado por escolaridade e cultura", color: deck.TERRA },
      { titulo: "Perfil amplo de personalidade", desc: "MMPI-2, cobrindo traços e indicadores de psicopatologia", color: deck.NAVY_TINT },
    ],
    notaFinal: "Esses instrumentos raramente são usados isoladamente — o cruzamento entre eles costuma gerar a leitura clínica mais robusta.",
  });

  deck.slideSinais(pres, {
    rodape: RODAPE_DECK, pageNum: 7,
    titulo: "Quando indicar avaliação de inteligência e personalidade",
    itens: [
      { titulo: "Dificuldades inexplicadas", desc: "Prejuízo acadêmico ou profissional sem causa aparente óbvia" },
      { titulo: "Suspeita de deficiência intelectual", desc: "Quando a avaliação formal é necessária pra confirmação diagnóstica" },
      { titulo: "Padrão de personalidade amplo", desc: "Quando o diagnóstico categorial sozinho não captura toda a complexidade do caso" },
      { titulo: "Contexto pericial/forense", desc: "Quando o laudo formal é exigido por processo legal ou administrativo" },
    ],
  });

  deck.slideDiferencial(pres, {
    rodape: RODAPE_DECK, pageNum: 8,
    titulo: "Quando usar cada instrumento de inteligência",
    cards: [
      { titulo: "WAIS-IV", desc: "Adultos, avaliação completa de perfil cognitivo" },
      { titulo: "WISC-V", desc: "Crianças e adolescentes, mesma lógica de índices adaptada à faixa etária" },
      { titulo: "Raven", desc: "Triagem rápida, útil quando escolaridade/cultura podem enviesar outros testes" },
    ],
  });

  deck.slideInstrumentos(pres, {
    rodape: RODAPE_DECK, pageNum: 9,
    titulo: "Os 4 instrumentos deste módulo",
    instrumentos: [
      { sigla: "WAIS-IV / WISC-V", nome: "Escalas Wechsler de inteligência", desc: "Perfil completo em 4 índices, adultos e crianças/adolescentes." },
      { sigla: "Raven", nome: "Matrizes Progressivas", desc: "Triagem não-verbal rápida, menos influenciada por escolaridade." },
      { sigla: "MMPI-2", nome: "Minnesota Multiphasic Personality Inventory", desc: "Perfil amplo de personalidade e indicadores de psicopatologia." },
    ],
  });

  deck.slideProtocoloOverview(pres, {
    rodape: RODAPE_DECK, pageNum: 10,
    titulo: "Do teste à devolutiva responsável: 4 passos",
    passos: [
      { titulo: "Indicar com\npropósito claro", desc: "Nunca aplicar \"de rotina\", sempre com uma pergunta clínica específica" },
      { titulo: "Selecionar o\ninstrumento certo", desc: "Considerando idade, objetivo e contexto (clínico ou pericial)" },
      { titulo: "Interpretar\no perfil completo", desc: "Nunca reduzir a leitura a um único escore isolado" },
      { titulo: "Devolver com\ncuidado", desc: "Comunicar o resultado de forma acessível, sem rótulos definitivos" },
    ],
    notaFinal: "A devolutiva mal feita é onde mais se perde o valor terapêutico desses instrumentos — um número comunicado sem contexto pode gerar dano, não benefício.",
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 11,
    titulo: "Passos 1 e 2, na prática",
    colunas: [
      {
        numero: 1, titulo: "Indicar com propósito claro",
        bullets: ["Defina antes de aplicar: que pergunta clínica esse teste vai ajudar a responder?", "Evite aplicar bateria extensa \"por precaução\", sem hipótese que justifique"],
      },
      {
        numero: 2, titulo: "Selecionar o instrumento certo",
        fala: "“Vamos usar um instrumento que ajuda a entender melhor seu perfil de habilidades — não é uma prova de certo ou errado.”",
        bullets: ["WAIS-IV pra adultos, WISC-V pra crianças/adolescentes, Raven quando escolaridade pode enviesar outros testes"],
      },
    ],
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 12,
    titulo: "Passos 3 e 4, na prática",
    colunas: [
      {
        numero: 3, titulo: "Interpretar o perfil completo",
        bullets: ["Analise os 4 índices do WAIS-IV/WISC-V, não apenas o QI Total", "No MMPI-2, considere o perfil de escalas em conjunto, não escalas isoladas"],
      },
      {
        numero: 4, titulo: "Devolver com cuidado",
        bullets: ["Evite linguagem que soe como rótulo definitivo (\"você tem QI baixo\")", "Foque a devolutiva em forças, desafios específicos e implicações práticas"],
      },
    ],
  });

  deck.slideCaso(pres, {
    rodape: RODAPE_DECK, pageNum: 13,
    vinheta: "Um adolescente é encaminhado pela escola por \"baixo rendimento\", com um QI Total previamente registrado como \"médio\" em uma avaliação anterior que só reportou o número total, sem detalhar os índices.",
    perguntas: [
      "Por que o QI Total isolado, sem os índices, pode ter escondido informação clínica relevante nesse caso?",
      "Que instrumento você aplicaria, considerando a idade do paciente?",
      "Como você conduziria a devolutiva pra esse adolescente e sua família, evitando reducionismo?",
    ],
  });

  deck.slideEncaminhamento(pres, {
    rodape: RODAPE_DECK, pageNum: 14,
    criterios: [
      "Resultado sugestivo de deficiência intelectual: considerar avaliação médica/genética complementar",
      "Perfil do MMPI-2 sugerindo psicopatologia significativa: considerar avaliação psiquiátrica complementar",
      "Discrepância importante entre índices sugerindo TDAH: considerar aprofundar com Módulo 4.22",
      "Contexto pericial/forense: seguir protocolos formais específicos além do uso clínico deste módulo",
    ],
  });

  deck.slideRecap(pres, {
    rodape: RODAPE_DECK, pageNum: 15,
    pontos: [
      "O valor clínico está no perfil de forças e fraquezas, não num escore isolado de QI ou personalidade",
      "WAIS-IV, WISC-V, Raven e MMPI-2 cobrem inteligência adulta, infantil, triagem não-verbal e personalidade ampla",
      "Esses instrumentos vão além do contexto pericial — orientam diretamente o plano terapêutico quando bem indicados",
      "A devolutiva cuidadosa, sem rótulos definitivos, é onde mais se realiza (ou se perde) o valor clínico desses testes",
    ],
    proximoTexto: "Próximo: exercícios práticos e avaliação do Módulo 2.4 →",
  });

  return pres.writeFile({ fileName: "Modulo-2.4-Inteligencia-Personalidade.pptx" });
}

// ============================================================
// 2) EXERCÍCIOS
// ============================================================
function construirExercicios() {
  const children = [
    ...doc.capa(KICKER, "Exercícios — Inteligência e Personalidade", "Resolva individualmente antes da sessão de supervisão. O objetivo é testar sua leitura clínica antes de comparar com a discussão em grupo — não há problema em errar."),

    doc.exNum(1, "Os 4 índices, em suas palavras"),
    doc.pergunta(1, "Explique em uma frase cada um dos 4 índices do WAIS-IV: compreensão verbal, organização perceptual, memória de trabalho, velocidade de processamento."),
    ...doc.linhaResposta(3),
    doc.pergunta(2, "Por que um QI Total isolado pode esconder informação clínica relevante?"),
    ...doc.linhaResposta(2),

    doc.exNum(2, "Escolhendo o instrumento certo"),
    doc.tabelaSimples(["Situação", "Instrumento mais indicado"], [["Adulto, avaliação completa", ""], ["Criança de 10 anos", ""], ["Suspeita de viés por baixa escolaridade", ""]], [4600, 4550]),

    doc.exNum(3, "Devolutiva sem reducionismo"),
    doc.vinhetaBox("Um paciente pergunta diretamente após o teste: \"então, qual foi meu QI? Sou inteligente ou não?\""),
    doc.pergunta(1, "Escreva uma resposta de devolutiva que evite reducionismo, sem ignorar a pergunta direta do paciente."),
    ...doc.linhaResposta(3),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),

    doc.exNum(4, "MMPI-2"),
    doc.pergunta(1, "Por que interpretar o perfil de escalas do MMPI-2 em conjunto é mais robusto do que olhar escalas isoladas?"),
    ...doc.linhaResposta(2),

    doc.exNum(5, "Caso integrado"),
    doc.vinhetaBox("Um adolescente é encaminhado pela escola por baixo rendimento, com QI Total anterior registrado como \"médio\", sem detalhamento dos índices."),
    doc.pergunta(1, "Por que o QI Total isolado pode ter escondido informação relevante?"),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Que instrumento você aplicaria, considerando a idade do paciente?"),
    ...doc.linhaResposta(1),
    doc.pergunta(3, "Como você conduziria a devolutiva pra esse adolescente e sua família?"),
    ...doc.linhaResposta(2),
  ];

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-2.4-Exercicios.docx");
}

// ============================================================
// 3) AVALIAÇÃO
// ============================================================
function construirProva() {
  const objetivas = [
    ["Os 4 índices que compõem o WAIS-IV são:", ["Compreensão verbal, organização perceptual, memória de trabalho, velocidade de processamento", "Sintomas nucleares, duração mínima, prejuízo funcional, exclusão de causas", "Atenção, memória, funções executivas, linguagem", "Serotonina, dopamina, GABA, glutamato"]],
    ["O QI Total, segundo o módulo, é descrito como:", ["Uma média que pode esconder variação relevante entre os índices", "O único dado clinicamente relevante de qualquer avaliação de inteligência", "Uma medida sem qualquer relação com os índices individuais", "Um valor sempre idêntico entre diferentes pessoas"]],
    ["O WISC-V é indicado para:", ["Crianças e adolescentes", "Exclusivamente adultos acima de 60 anos", "Exclusivamente contextos periciais, nunca clínicos", "Avaliação de personalidade, não de inteligência"]],
    ["O teste de Raven é especialmente útil quando:", ["Escolaridade ou cultura podem enviesar outros testes de inteligência", "É a única opção disponível para adultos", "Substitui completamente a necessidade do WAIS-IV em qualquer contexto", "Mede exclusivamente traços de personalidade"]],
    ["O MMPI-2 é um instrumento que avalia:", ["Perfil amplo de personalidade e indicadores de psicopatologia", "Exclusivamente funções executivas", "Exclusivamente memória verbal", "Apenas coordenação motora"]],
    ["Um padrão de grande discrepância entre os 4 índices do WAIS-IV costuma ser:", ["Mais informativo clinicamente do que o QI Total isoladamente", "Sempre um erro de aplicação do teste", "Irrelevante pra qualquer decisão clínica", "Motivo automático pra invalidar o teste"]],
    ["O passo \"indicar com propósito claro\" recomenda:", ["Definir a pergunta clínica que o teste vai ajudar a responder, antes de aplicar", "Aplicar bateria extensa de rotina, sem hipótese prévia", "Nunca justificar a escolha do instrumento ao paciente", "Escolher o teste aleatoriamente entre os disponíveis"]],
    ["Na devolutiva, o módulo recomenda evitar:", ["Linguagem que soe como rótulo definitivo (\"você tem QI baixo\")", "Qualquer menção ao resultado do teste", "Explicar o perfil de forças e desafios ao paciente", "Considerar as implicações práticas do resultado"]],
    ["Diante de perfil do MMPI-2 sugerindo psicopatologia significativa, o módulo recomenda:", ["Considerar avaliação psiquiátrica complementar", "Ignorar completamente o resultado obtido", "Encerrar o acompanhamento psicológico imediatamente", "Aplicar automaticamente o mesmo teste uma segunda vez, sem outra ação"]],
    ["Esses instrumentos (WAIS-IV, WISC-V, Raven, MMPI-2), segundo o módulo, são úteis:", ["Além do contexto pericial, orientando diretamente o plano terapêutico quando bem indicados", "Exclusivamente em contexto pericial/forense", "Apenas quando aplicados sem qualquer propósito clínico definido", "Somente em processos judiciais, nunca em terapia"]],
  ];
  const gabaritoObjetivas = ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a"];

  const children = [
    ...doc.capa(KICKER, "Avaliação — Inteligência e Personalidade", `Avaliação formativa de encerramento do Módulo ${MOD}.`),
    doc.infoBox([
      ["Nota de corte:", "70 de 100 pontos"],
      ["Tempo sugerido:", "35 minutos"],
      ["Composição:", "10 questões objetivas (6 pts cada = 60 pts) + 1 questão de caso (40 pts)"],
      ["Consulta:", "Material da aula permitido; discussão entre colegas, não"],
    ]),
    doc.tituloH1("Parte 1 — Questões objetivas"),
  ];
  objetivas.forEach((q, i) => children.push(...doc.questaoObjetiva(i + 1, q[0], q[1])));

  children.push(
    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    doc.tituloH1("Parte 2 — Questão de caso (40 pontos)"),
    doc.vinhetaBox("Uma paciente adulta, encaminhada por dificuldades persistentes de organização no trabalho, tem um QI Total \"médio-superior\" em uma avaliação anterior, mas nenhum detalhamento por índice foi fornecido no laudo original. Ela relata se sentir \"burra\", apesar de sempre ter sido elogiada por sua inteligência."),
    new doc.Paragraph({ spacing: { before: 240 }, children: [new doc.TextRun({ text: "Com base no protocolo estudado, responda:", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    new doc.Paragraph({ spacing: { before: 220, after: 40 }, children: [new doc.TextRun({ text: "a) (10 pts) Que hipótese você levantaria sobre a possível causa do sofrimento relatado, apesar do QI Total elevado?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "b) (10 pts) Que reavaliação você indicaria, e com que propósito clínico específico?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "c) (10 pts) Se a discrepância entre índices for confirmada, a que módulo do curso essa leitura poderia se conectar?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "d) (10 pts) Como você conduziria a devolutiva, considerando a autoimagem de \"burra\" que a paciente já carrega?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    new doc.Paragraph({ spacing: { after: 40 }, children: [new doc.TextRun({ text: "USO EXCLUSIVO DO INSTRUTOR — remover antes de aplicar a prova", bold: true, color: doc.TERRA, font: doc.FONT, size: 20 })] }),
    doc.tituloH1("Gabarito"),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 1 — Questões objetivas", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 200 }, children: [new doc.TextRun({ text: gabaritoObjetivas.map((r, i) => `${i + 1}-${r}`).join("   ·   "), font: doc.FONT, size: 22, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 2 — Critério de correção da questão de caso", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "a) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Possível discrepância significativa entre índices (ex: memória de trabalho ou velocidade de processamento mais baixas), mascarada pelo QI Total elevado, causando sofrimento funcional específico não capturado pelo número global.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "b) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "WAIS-IV completo, com o propósito específico de detalhar o perfil por índice, não apenas confirmar o QI Total já conhecido.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "c) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Módulo 4.22 (TDAH em Adultos), caso a discrepância envolva especificamente memória de trabalho e velocidade de processamento reduzidas.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "d) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Reforçar que o QI Total elevado já demonstra capacidade real, e que a dificuldade específica (se confirmada) é um desafio pontual e trabalhável, não uma contradição da sua inteligência.", font: doc.FONT, size: 21, color: doc.INK })] }),
  );

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-2.4-Avaliacao.docx");
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
      n: 1, titulo: "Além do laudo pericial", duracao: "12 min", slides: "1, 2, 3, 4",
      objetivo: "Sair sabendo explicar os 4 índices do WAIS-IV sem jargão técnico.",
      segmentos: [
        seg("0:00–0:45", "Abertura (gancho)", [{ fala: "Um número de QI não define o potencial de alguém, e um perfil de personalidade não é um rótulo permanente — o valor clínico real está no perfil de forças e fraquezas, não num escore isolado." }]),
        seg("0:45–2:00", "Por que isso importa", ["Esses instrumentos vão além do contexto pericial — orientam diretamente o plano terapêutico."]),
        seg("2:00–8:00", "Os 4 índices do WAIS-IV (mostrar slide 4)", [
          "Compreensão verbal: raciocínio com conceitos verbais.",
          "Organização perceptual: raciocínio visual e espacial.",
          "Memória de trabalho: manter e manipular informação temporariamente.",
          "Velocidade de processamento: rapidez de tarefas simples.",
        ]),
        seg("8:00–10:30", "Um ponto importante", ["Um perfil com grande discrepância entre índices costuma ser mais informativo que o QI Total isoladamente."]),
        seg("10:30–12:00", "Fechamento", [{ fala: "Próxima aula: do QI Total ao perfil clinicamente útil." }]),
      ],
    },
    {
      n: 2, titulo: "Do QI Total ao perfil clinicamente útil", duracao: "10 min", slides: "5",
      objetivo: "Explicar a cadeia entre QI Total, índices e aplicação terapêutica.",
      segmentos: [
        seg("0:00–1:00", "Retomada rápida", ["Vimos os índices isolados. Hoje vemos como eles se conectam à aplicação clínica."]),
        seg("1:00–6:30", "A cadeia (mostrar slide 5)", ["QI Total isolado: esconde variação relevante.", "Os 4 índices: revelam o perfil real de forças e fraquezas.", "Padrão de discrepância: orienta hipóteses específicas.", "Aplicação terapêutica: orienta estratégias de intervenção."]),
        seg("6:30–9:00", "Um erro comum", ["Um laudo que só reporta o QI Total, sem detalhar os índices, tem valor clínico limitado."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: as 3 finalidades desses instrumentos." }]),
      ],
    },
    {
      n: 3, titulo: "As 3 finalidades e quando indicar cada avaliação", duracao: "12 min", slides: "6, 7",
      objetivo: "Reconhecer as 3 finalidades e os sinais que indicam avaliação de inteligência/personalidade.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três finalidades — e quando cada uma faz sentido na prática clínica."]),
        seg("1:00–6:00", "As 3 finalidades (mostrar slide 6)", [
          "Perfil cognitivo: WAIS-IV (adultos) e WISC-V (crianças/adolescentes).",
          "Triagem rápida não-verbal: Raven, menos influenciado por escolaridade.",
          "Perfil amplo de personalidade: MMPI-2.",
        ]),
        seg("6:00–10:30", "Quando indicar (mostrar slide 7)", [
          "Dificuldades inexplicadas: prejuízo sem causa aparente óbvia.",
          "Suspeita de deficiência intelectual.",
          "Padrão de personalidade amplo, além do diagnóstico categorial.",
          "Contexto pericial/forense.",
        ]),
        seg("10:30–12:00", "Fechamento", [{ fala: "Próxima aula: quando usar cada instrumento de inteligência especificamente." }]),
      ],
    },
    {
      n: 4, titulo: "Quando usar cada instrumento de inteligência", duracao: "10 min", slides: "8",
      objetivo: "Diferenciar WAIS-IV, WISC-V e Raven.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Um filtro rápido — a escolha depende principalmente de idade e possível viés."]),
        seg("1:00–8:00", "Os 3 instrumentos (mostrar slide 8)", [
          "WAIS-IV: adultos, avaliação completa de perfil cognitivo.",
          "WISC-V: crianças e adolescentes, mesma lógica adaptada à faixa etária.",
          "Raven: triagem rápida, útil quando escolaridade/cultura podem enviesar outros testes.",
        ]),
        seg("8:00–9:00", "Por que isso importa", ["Escolher o teste errado pra faixa etária invalida completamente o resultado."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: os 4 instrumentos deste módulo, revisados em conjunto." }]),
      ],
    },
    {
      n: 5, titulo: "Os 4 instrumentos deste módulo", duracao: "10 min", slides: "9",
      objetivo: "Consolidar o conhecimento sobre WAIS-IV, WISC-V, Raven e MMPI-2.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Uma revisão consolidada dos 4 instrumentos centrais desse módulo."]),
        seg("1:00–4:30", "WAIS-IV / WISC-V", ["Perfil completo em 4 índices, adultos e crianças/adolescentes."]),
        seg("4:30–7:30", "Raven", ["Triagem não-verbal rápida, menos influenciada por escolaridade."]),
        seg("7:30–9:00", "MMPI-2", ["Perfil amplo de personalidade e indicadores de psicopatologia."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: colocamos tudo em prática — indicação e seleção do instrumento certo." }]),
      ],
    },
    {
      n: 6, titulo: "Aplicação — indicar com propósito e selecionar o teste", duracao: "13 min", slides: "10, 11",
      objetivo: "Aplicar os passos 1 e 2 do modelo de aplicação clínica.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["A parte mais prática desse módulo. Hoje, os 2 primeiros passos."]),
        seg("1:00–2:00", "Visão geral (mostrar slide 10)", ["Indicar com propósito claro → Selecionar o instrumento certo → Interpretar o perfil completo → Devolver com cuidado."]),
        seg("2:00–7:00", "Passo 1 — Indicar com propósito claro (mostrar slide 11, esquerda)", ["Defina antes de aplicar: que pergunta clínica esse teste vai responder?", "Evite aplicar bateria extensa \"por precaução\"."]),
        seg("7:00–12:00", "Passo 2 — Selecionar o instrumento certo (mostrar slide 11, direita)", [{ fala: "Vamos usar um instrumento que ajuda a entender melhor seu perfil de habilidades — não é uma prova de certo ou errado." }]),
        seg("12:00–13:00", "Fechamento", [{ fala: "Próxima aula: interpretar o perfil completo e devolver com cuidado." }]),
      ],
    },
    {
      n: 7, titulo: "Aplicação — interpretar o perfil e devolver com cuidado", duracao: "11 min", slides: "12",
      objetivo: "Trabalhar interpretação do perfil completo e devolutiva responsável.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Hoje fechamos o modelo com a etapa mais delicada eticamente: a devolutiva."]),
        seg("1:00–6:00", "Passo 3 — Interpretar o perfil completo (mostrar slide 12, esquerda)", ["Analise os 4 índices, não apenas o QI Total.", "No MMPI-2, considere o perfil de escalas em conjunto."]),
        seg("6:00–10:00", "Passo 4 — Devolver com cuidado (mostrar slide 12, direita)", ["Evite linguagem que soe como rótulo definitivo.", "Foque em forças, desafios específicos e implicações práticas."]),
        seg("10:00–11:00", "Fechamento", [{ fala: "Modelo completo. Próxima aula: um caso real e os critérios de quando aprofundar." }]),
      ],
    },
    {
      n: 8, titulo: "Estudo de caso, encaminhamento e recap", duracao: "14 min", slides: "13, 14, 15",
      objetivo: "Integrar todo o módulo num caso completo, com ênfase na devolutiva sem reducionismo.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Última aula do módulo. Caso completo e os critérios de quando aprofundar."]),
        seg("1:00–6:00", "Estudo de caso (mostrar slide 13)", ["Leia a vinheta com calma.", "Percorra as 3 perguntas de discussão.", "Convide o aluno a pausar e responder por escrito."]),
        seg("6:00–10:00", "Quando encaminhar (mostrar slide 14)", ["Percorra os 4 critérios, com atenção especial à discrepância entre índices sugerindo TDAH."]),
        seg("10:00–13:00", "Recapitulando o módulo (mostrar slide 15)", ["Retome os 4 pontos-chave.", "Reforce que a devolutiva cuidadosa é onde mais se realiza o valor clínico desses testes."]),
        seg("13:00–14:00", "Fechamento do módulo", [{ fala: "Agora é hora dos exercícios e da avaliação. Te vejo no próximo módulo do Bloco 2." }]),
      ],
    },
  ];

  const totalMin = 12 + 10 + 12 + 10 + 10 + 13 + 11 + 14;

  const children = [
    ...doc.capa(KICKER, "Roteiro de Aulas — Inteligência e Personalidade", "Módulo dividido em 8 vídeo-aulas de 10 a 15 minutos, seguindo os slides já produzidos. Cada aula tem roteiro cronometrado, pronto pra gravação."),
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

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", `${RODAPE_DOC} — Roteiro de Aulas`, children), "Modulo-2.4-Roteiro-Aulas.docx");
}

// ============================================================
Promise.resolve()
  .then(construirDeck)
  .then(construirExercicios)
  .then(construirProva)
  .then(construirRoteiro)
  .then(() => console.log("TUDO PRONTO"))
  .catch((e) => { console.error(e); process.exit(1); });

const deck = require("../_lib/lib-deck.js");
const doc = require("../_lib/lib-doc.js");

const MOD = "2.2";
const NOME = "Classificações Diagnósticas na Prática";
const RODAPE_DECK = `Classificações Diagnósticas — Módulo ${MOD}`;
const RODAPE_DOC = `Módulo ${MOD} — Classificações Diagnósticas`;
const KICKER = "MÓDULO 2.2 · PSICODIAGNÓSTICO E AVALIAÇÃO NEUROPSICOLÓGICA";

// ============================================================
// 1) SLIDE DECK
// ============================================================
function construirDeck() {
  const pres = deck.novaApresentacao(`${NOME} — DSM-5-TR e CID-11 como Ferramentas de Comunicação`);

  deck.slideTitulo(pres, {
    moduloLabel: `Módulo ${MOD} · Bloco 2 · Avaliação`,
    titulo: "Classificações Diagnósticas",
    subtitulo: "DSM-5-TR e CID-11 na prática, sem perder a pessoa por trás do código",
    passos: ["DSM-5-TR", "CID-11", "Critérios", "Armadilhas", "Aplicação"],
  });

  deck.slideRoteiro(pres, {
    rodape: RODAPE_DECK, pageNum: 2,
    cards: [
      { titulo: "DSM-5-TR", desc: "Sistema categorial mais usado na prática clínica" },
      { titulo: "CID-11", desc: "Sistema oficial de saúde no Brasil e no mundo" },
      { titulo: "Critérios e especificadores", desc: "Como um diagnóstico formal é construído" },
      { titulo: "Armadilhas comuns", desc: "Onde o diagnóstico diferencial mais erra na prática" },
      { titulo: "Aplicação", desc: "Documentação precisa sem reducionismo" },
    ],
  });

  deck.slideHook(pres, {
    rodape: RODAPE_DECK, pageNum: 3,
    frase: "Um sistema classificatório não descreve a verdade sobre o sofrimento de alguém — é uma ferramenta de comunicação precisa entre profissionais, construída por consenso, revisada a cada nova edição.",
    apoio: "Entender essa diferença evita dois erros opostos: tratar o diagnóstico como rótulo definitivo, ou descartá-lo como irrelevante. Ele é útil justamente quando usado com essa consciência dos seus limites.",
  });

  deck.slideCircuito(pres, {
    rodape: RODAPE_DECK, pageNum: 4,
    titulo: "Os 4 elementos que compõem um critério diagnóstico",
    regioes: [
      { label: "Sintomas nucleares (o conjunto mínimo de sinais exigido)", rx: 0.20, ry: 0.22, color: deck.NAVY, d: 0.5 },
      { label: "Duração mínima (por quanto tempo os sintomas precisam persistir)", rx: 0.22, ry: 0.62, color: deck.TERRA, d: 0.4 },
      { label: "Prejuízo funcional (impacto significativo em áreas da vida)", rx: 0.60, ry: 0.60, color: deck.NAVY_TINT, d: 0.36 },
      { label: "Exclusão de outras causas (descartar explicações alternativas)", rx: 0.58, ry: 0.24, color: deck.TERRA_TINT, d: 0.36 },
    ],
    notas: [
      "Sintomas nucleares definem o quadro clínico central, geralmente exigindo um número mínimo presente simultaneamente.",
      "A duração mínima evita que reações transitórias e esperadas sejam patologizadas precocemente.",
      "Prejuízo funcional e exclusão de outras causas são os elementos mais frequentemente negligenciados na prática apressada.",
    ],
  });

  deck.slideCadeia(pres, {
    rodape: RODAPE_DECK, pageNum: 5,
    titulo: "Do sintoma isolado ao diagnóstico formal",
    elos: [
      { titulo: "Sintoma relatado", desc: "Uma queixa isolada, ainda sem valor diagnóstico por si só" },
      { titulo: "Critério quantitativo", desc: "Verificação do número mínimo de sintomas presentes simultaneamente" },
      { titulo: "Critério temporal", desc: "Confirmação de que a duração mínima exigida foi cumprida" },
      { titulo: "Diagnóstico com especificadores", desc: "Classificação formal, detalhada por gravidade, curso ou subtipo" },
    ],
    notaFinal: "Pular etapas dessa cadeia — como diagnosticar com base num único sintoma marcante — é a origem da maioria dos erros de diagnóstico diferencial na prática.",
  });

  deck.slideCategorias(pres, {
    rodape: RODAPE_DECK, pageNum: 6,
    titulo: "3 sistemas de classificação em uso",
    categorias: [
      { titulo: "DSM-5-TR", desc: "Sistema categorial mais detalhado, amplamente usado na prática clínica", color: deck.NAVY },
      { titulo: "CID-11", desc: "Sistema oficial da OMS, obrigatório pra faturamento no sistema de saúde brasileiro", color: deck.TERRA },
      { titulo: "Abordagem dimensional", desc: "Traços em espectro (PID-5), já usada nos módulos de personalidade do curso", color: deck.NAVY_TINT },
    ],
    notaFinal: "Na prática brasileira, é comum usar o DSM-5-TR pro raciocínio clínico detalhado e o CID-11 pro registro formal e faturamento.",
  });

  deck.slideSinais(pres, {
    rodape: RODAPE_DECK, pageNum: 7,
    titulo: "Armadilhas mais comuns do diagnóstico diferencial",
    itens: [
      { titulo: "Sintomas transdiagnósticos", desc: "Insônia, fadiga e irritabilidade aparecem em quase todos os quadros — não são específicos" },
      { titulo: "Efeito halo do primeiro diagnóstico", desc: "A primeira hipótese tende a enviesar a busca por sintomas confirmatórios" },
      { titulo: "Comorbidade real ignorada", desc: "Tentar encaixar tudo num único diagnóstico quando dois coexistem genuinamente" },
      { titulo: "Diferenças de nomenclatura", desc: "O mesmo quadro pode ter nomes e códigos diferentes entre DSM e CID" },
    ],
  });

  deck.slideDiferencial(pres, {
    rodape: RODAPE_DECK, pageNum: 8,
    titulo: "Quando usar DSM-5-TR versus CID-11",
    cards: [
      { titulo: "DSM-5-TR", desc: "Raciocínio clínico detalhado, especificadores ricos, mais comum em formação e pesquisa" },
      { titulo: "CID-11", desc: "Obrigatório pra faturamento SUS/planos de saúde e registro oficial no Brasil" },
      { titulo: "Uso combinado", desc: "Prática mais comum: pensar com DSM-5-TR, registrar oficialmente com CID-11" },
    ],
  });

  deck.slideInstrumentos(pres, {
    rodape: RODAPE_DECK, pageNum: 9,
    titulo: "Instrumentos que operacionalizam cada sistema",
    instrumentos: [
      { sigla: "SCID-5", nome: "Structured Clinical Interview for DSM-5", desc: "Já usada nos módulos de personalidade — padrão-ouro pro DSM." },
      { sigla: "CIDI", nome: "Composite International Diagnostic Interview", desc: "Entrevista estruturada alinhada à CID, usada em estudos epidemiológicos." },
      { sigla: "Julgamento clínico", nome: "Anamnese + exame do estado mental", desc: "Base indispensável antes de qualquer código formal — Módulo 2.1." },
    ],
  });

  deck.slideProtocoloOverview(pres, {
    rodape: RODAPE_DECK, pageNum: 10,
    titulo: "Chegando ao diagnóstico formal: 4 passos",
    passos: [
      { titulo: "Identificar\nsintomas nucleares", desc: "O conjunto mínimo de sinais presentes simultaneamente" },
      { titulo: "Verificar\nduração e prejuízo", desc: "Confirmar que os critérios temporais e funcionais foram cumpridos" },
      { titulo: "Checar\nespecificadores", desc: "Gravidade, curso, subtipo — detalhes que orientam o tratamento" },
      { titulo: "Documentar com\no código correto", desc: "Registro formal, alinhado ao sistema exigido pelo contexto de trabalho" },
    ],
    notaFinal: "Um diagnóstico bem construído não é apenas um código — é uma síntese que orienta diretamente a escolha do protocolo clínico mais adequado (Bloco 4).",
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 11,
    titulo: "Passos 1 e 2, na prática",
    colunas: [
      {
        numero: 1, titulo: "Identificar sintomas nucleares",
        bullets: ["Liste sistematicamente os sintomas relatados e observados, sem se prender à primeira hipótese", "Compare com os critérios formais antes de fechar qualquer conclusão"],
      },
      {
        numero: 2, titulo: "Verificar duração e prejuízo",
        fala: "“Há quanto tempo isso vem acontecendo, e como isso tem afetado seu dia a dia — trabalho, relações, autocuidado?”",
        bullets: ["Confirme ativamente a duração mínima exigida, não presuma", "Investigue prejuízo funcional em múltiplas áreas, não apenas na queixa principal"],
      },
    ],
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 12,
    titulo: "Passos 3 e 4, na prática",
    colunas: [
      {
        numero: 3, titulo: "Checar especificadores",
        bullets: ["Gravidade (leve/moderada/grave), curso (episódio único/recorrente) e subtipos mudam a leitura clínica", "Especificadores frequentemente orientam qual variação do protocolo do Bloco 4 aplicar"],
      },
      {
        numero: 4, titulo: "Documentar com o código correto",
        bullets: ["Use DSM-5-TR pro raciocínio clínico detalhado, CID-11 pro registro oficial quando exigido", "Documente de forma clara o suficiente pra outro profissional entender a base do diagnóstico"],
      },
    ],
  });

  deck.slideCaso(pres, {
    rodape: RODAPE_DECK, pageNum: 13,
    vinheta: "Um paciente apresenta sintomas de humor deprimido, insônia e fadiga há 3 semanas, após o início de um novo tratamento para hipotireoidismo mal ajustado. Um colega já sugeriu \"fechar\" o diagnóstico de Depressão Maior antes mesmo de investigar a causa hormonal.",
    perguntas: [
      "Que elemento dos 4 componentes de um critério diagnóstico está sendo negligenciado nessa situação?",
      "Por que sintomas como insônia e fadiga são descritos como \"transdiagnósticos\", e por que isso importa aqui?",
      "Que passo do protocolo estudado evitaria o erro que o colega está prestes a cometer?",
    ],
  });

  deck.slideEncaminhamento(pres, {
    rodape: RODAPE_DECK, pageNum: 14,
    criterios: [
      "Suspeita de causa médica não descartada antes de fechar diagnóstico psiquiátrico/psicológico",
      "Quadro que não se encaixa claramente em nenhuma categoria: considerar avaliação dimensional complementar",
      "Sobreposição significativa entre 2 ou mais quadros, sugerindo comorbidade real, não erro de escolha",
      "Dúvida persistente sobre qual sistema (DSM ou CID) usar no contexto de trabalho específico: consultar normas institucionais"
    ],
  });

  deck.slideRecap(pres, {
    rodape: RODAPE_DECK, pageNum: 15,
    pontos: [
      "Sistemas classificatórios são ferramentas de comunicação por consenso, não verdades absolutas sobre o sofrimento",
      "Sintomas nucleares, duração mínima, prejuízo funcional e exclusão de causas compõem qualquer critério diagnóstico sólido",
      "DSM-5-TR e CID-11 coexistem na prática brasileira, cada um com seu papel específico",
      "Sintomas transdiagnósticos, efeito halo e comorbidade real ignorada são as armadilhas mais comuns do diagnóstico diferencial",
    ],
    proximoTexto: "Próximo: exercícios práticos e avaliação do Módulo 2.2 →",
  });

  return pres.writeFile({ fileName: "Modulo-2.2-Classificacoes-Diagnosticas.pptx" });
}

// ============================================================
// 2) EXERCÍCIOS
// ============================================================
function construirExercicios() {
  const children = [
    ...doc.capa(KICKER, "Exercícios — Classificações Diagnósticas", "Resolva individualmente antes da sessão de supervisão. O objetivo é testar sua leitura crítica antes de comparar com a discussão em grupo — não há problema em errar."),

    doc.exNum(1, "Os 4 elementos, em suas palavras"),
    doc.pergunta(1, "Explique em uma frase cada um dos 4 elementos de um critério diagnóstico: sintomas nucleares, duração mínima, prejuízo funcional, exclusão de outras causas."),
    ...doc.linhaResposta(3),
    doc.pergunta(2, "Por que um sistema classificatório é descrito como \"ferramenta de comunicação\", e não como \"verdade sobre o sofrimento\"?"),
    ...doc.linhaResposta(2),

    doc.exNum(2, "DSM-5-TR versus CID-11"),
    doc.tabelaSimples(["Sistema", "Quando priorizar"], [["DSM-5-TR", ""], ["CID-11", ""]], [3000, 6350]),

    doc.exNum(3, "Identificando armadilhas"),
    doc.vinhetaBox("Um paciente relata fadiga e irritabilidade. O profissional, já suspeitando de burnout desde a primeira frase, direciona toda a entrevista seguinte apenas pra confirmar essa hipótese."),
    doc.pergunta(1, "Que armadilha do diagnóstico diferencial está ilustrada nessa vinheta?"),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),

    doc.exNum(4, "Especificadores"),
    doc.pergunta(1, "Por que especificadores (gravidade, curso, subtipo) frequentemente orientam qual variação do protocolo clínico aplicar?"),
    ...doc.linhaResposta(2),

    doc.exNum(5, "Caso integrado"),
    doc.vinhetaBox("Um paciente apresenta humor deprimido, insônia e fadiga há 3 semanas, após início de tratamento mal ajustado pra hipotireoidismo. Um colega já sugeriu fechar diagnóstico de Depressão Maior sem investigar a causa hormonal."),
    doc.pergunta(1, "Que elemento dos 4 componentes está sendo negligenciado?"),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Por que insônia e fadiga são \"transdiagnósticos\", e por que isso importa aqui?"),
    ...doc.linhaResposta(2),
    doc.pergunta(3, "Que passo do protocolo evitaria o erro do colega?"),
    ...doc.linhaResposta(1),
  ];

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-2.2-Exercicios.docx");
}

// ============================================================
// 3) AVALIAÇÃO
// ============================================================
function construirProva() {
  const objetivas = [
    ["Os 4 elementos que compõem um critério diagnóstico sólido são:", ["Sintomas nucleares, duração mínima, prejuízo funcional, exclusão de outras causas", "Grandiosidade, necessidade de admiração, falta de empatia, impulsividade", "Aparência/comportamento, afeto/humor, pensamento, sensopercepção", "Serotonina, dopamina, GABA, glutamato"]],
    ["Um sistema classificatório, segundo o módulo, deve ser entendido como:", ["Ferramenta de comunicação precisa entre profissionais, construída por consenso", "Verdade absoluta e definitiva sobre a natureza do sofrimento", "Um sistema completamente arbitrário, sem qualquer utilidade clínica", "Uma classificação imutável, nunca revisada"]],
    ["No Brasil, o sistema oficial obrigatório pra faturamento no sistema de saúde é:", ["CID-11", "Exclusivamente o DSM-5-TR", "Nenhum sistema é oficialmente exigido", "Apenas escalas dimensionais, sem qualquer sistema categorial"]],
    ["Sintomas como insônia, fadiga e irritabilidade são chamados de \"transdiagnósticos\" porque:", ["Aparecem em quase todos os quadros clínicos, não sendo específicos de um único diagnóstico", "Ocorrem exclusivamente em Transtorno Bipolar", "Nunca aparecem em mais de um quadro diagnóstico", "São sintomas exclusivamente físicos, sem relevância psiquiátrica"]],
    ["O \"efeito halo do primeiro diagnóstico\" se refere a:", ["A primeira hipótese enviesando a busca por sintomas confirmatórios", "A ausência total de qualquer viés no processo diagnóstico", "Um fenômeno exclusivo de exames de imagem", "A necessidade de sempre considerar 5 hipóteses simultâneas"]],
    ["Instrumento estruturado alinhado à CID, usado em estudos epidemiológicos:", ["CIDI (Composite International Diagnostic Interview)", "PCL-R", "Y-BOCS", "ISI"]],
    ["Diante de comorbidade real entre 2 quadros distintos, o módulo recomenda:", ["Reconhecer ambos os diagnósticos, em vez de forçar um único diagnóstico único", "Sempre escolher apenas um dos dois diagnósticos, ignorando o outro", "Ignorar completamente qualquer possibilidade de comorbidade", "Aguardar resolução espontânea antes de qualquer diagnóstico"]],
    ["O passo \"verificar duração e prejuízo\" recomenda:", ["Confirmar ativamente a duração mínima exigida, sem presumir", "Presumir automaticamente que o critério de duração foi cumprido", "Ignorar completamente o impacto funcional relatado", "Fechar o diagnóstico antes de investigar prejuízo funcional"]],
    ["Diante de suspeita de causa médica não descartada, o módulo recomenda:", ["Investigar a causa médica antes de fechar diagnóstico psiquiátrico/psicológico", "Fechar o diagnóstico psicológico imediatamente, ignorando a suspeita médica", "Ignorar qualquer possibilidade de causa orgânica", "Encerrar o acompanhamento sem qualquer investigação adicional"]],
    ["A prática mais comum no Brasil, segundo o módulo, envolve:", ["Pensar clinicamente com DSM-5-TR e registrar oficialmente com CID-11", "Usar exclusivamente o DSM-5-TR, sem qualquer uso da CID-11", "Usar exclusivamente a CID-11, sem qualquer uso do DSM-5-TR", "Não usar nenhum sistema classificatório formal"]],
  ];
  const gabaritoObjetivas = ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a"];

  const children = [
    ...doc.capa(KICKER, "Avaliação — Classificações Diagnósticas", `Avaliação formativa de encerramento do Módulo ${MOD}.`),
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
    doc.vinhetaBox("Uma paciente apresenta sintomas que, isoladamente, poderiam sugerir tanto Transtorno de Ansiedade Generalizada quanto Transtorno Depressivo Maior — preocupação excessiva, humor deprimido, insônia e fadiga, todos presentes há 4 meses, ambos com prejuízo funcional significativo e claramente documentado."),
    new doc.Paragraph({ spacing: { before: 240 }, children: [new doc.TextRun({ text: "Com base no protocolo estudado, responda:", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    new doc.Paragraph({ spacing: { before: 220, after: 40 }, children: [new doc.TextRun({ text: "a) (10 pts) Diante da sobreposição descrita, qual seria o erro técnico mais comum a evitar?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "b) (10 pts) Que abordagem alternativa poderia ser considerada se os critérios categoriais não separarem claramente os quadros?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "c) (10 pts) Que instrumentos (revisando o Módulo 2.5) ajudariam a diferenciar melhor os dois quadros?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "d) (10 pts) Como você documentaria esse caso, considerando a possibilidade real de comorbidade?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    new doc.Paragraph({ spacing: { after: 40 }, children: [new doc.TextRun({ text: "USO EXCLUSIVO DO INSTRUTOR — remover antes de aplicar a prova", bold: true, color: doc.TERRA, font: doc.FONT, size: 20 })] }),
    doc.tituloH1("Gabarito"),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 1 — Questões objetivas", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 200 }, children: [new doc.TextRun({ text: gabaritoObjetivas.map((r, i) => `${i + 1}-${r}`).join("   ·   "), font: doc.FONT, size: 22, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 2 — Critério de correção da questão de caso", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "a) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Forçar um único diagnóstico quando os dois quadros podem genuinamente coexistir como comorbidade real.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "b) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Considerar avaliação dimensional complementar, além da abordagem categorial pura.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "c) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "GAD-7/BAI/HAM-A pra ansiedade e BDI-II/PHQ-9/HAM-D pra depressão, aplicados em conjunto pra mapear a intensidade relativa de cada eixo sintomático.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "d) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Documentar ambos os diagnósticos, se os critérios completos de cada um forem preenchidos independentemente, com justificativa clínica clara da coexistência.", font: doc.FONT, size: 21, color: doc.INK })] }),
  );

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-2.2-Avaliacao.docx");
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
      n: 1, titulo: "Classificações como ferramenta, não verdade", duracao: "12 min", slides: "1, 2, 3, 4",
      objetivo: "Sair sabendo explicar os 4 elementos de um critério diagnóstico sem jargão técnico.",
      segmentos: [
        seg("0:00–0:45", "Abertura (gancho)", [{ fala: "Um sistema classificatório não descreve a verdade sobre o sofrimento de alguém — é uma ferramenta de comunicação precisa entre profissionais, construída por consenso, revisada a cada nova edição." }]),
        seg("0:45–2:00", "Por que isso importa", ["Evita tratar o diagnóstico como rótulo definitivo ou descartá-lo como irrelevante."]),
        seg("2:00–8:00", "Os 4 elementos (mostrar slide 4)", [
          "Sintomas nucleares: conjunto mínimo de sinais exigido.",
          "Duração mínima: por quanto tempo os sintomas precisam persistir.",
          "Prejuízo funcional: impacto significativo em áreas da vida.",
          "Exclusão de outras causas: descartar explicações alternativas.",
        ]),
        seg("8:00–10:30", "Um ponto importante", ["Prejuízo funcional e exclusão de causas são os mais negligenciados na prática apressada."]),
        seg("10:30–12:00", "Fechamento", [{ fala: "Próxima aula: do sintoma isolado ao diagnóstico formal." }]),
      ],
    },
    {
      n: 2, titulo: "Do sintoma isolado ao diagnóstico formal", duracao: "10 min", slides: "5",
      objetivo: "Explicar a cadeia entre sintoma relatado e diagnóstico com especificadores.",
      segmentos: [
        seg("0:00–1:00", "Retomada rápida", ["Vimos os elementos isolados. Hoje vemos como eles se organizam em sequência."]),
        seg("1:00–6:30", "A cadeia (mostrar slide 5)", ["Sintoma relatado: ainda sem valor diagnóstico por si só.", "Critério quantitativo: número mínimo de sintomas simultâneos.", "Critério temporal: duração mínima cumprida.", "Diagnóstico com especificadores: classificação formal detalhada."]),
        seg("6:30–9:00", "Um erro comum", ["Pular etapas — diagnosticar com base num único sintoma marcante — é a origem da maioria dos erros."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: os 3 sistemas de classificação em uso." }]),
      ],
    },
    {
      n: 3, titulo: "Os 3 sistemas e as armadilhas do diagnóstico diferencial", duracao: "12 min", slides: "6, 7",
      objetivo: "Reconhecer DSM-5-TR, CID-11 e abordagem dimensional, e as armadilhas mais comuns.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três sistemas — e as armadilhas que mais aparecem na prática clínica real."]),
        seg("1:00–6:00", "Os 3 sistemas (mostrar slide 6)", [
          "DSM-5-TR: sistema categorial mais detalhado, amplamente usado na prática.",
          "CID-11: sistema oficial da OMS, obrigatório pro faturamento no Brasil.",
          "Abordagem dimensional: traços em espectro, já vista nos módulos de personalidade.",
        ]),
        seg("6:00–10:30", "As armadilhas (mostrar slide 7)", [
          "Sintomas transdiagnósticos: não são específicos de um único quadro.",
          "Efeito halo do primeiro diagnóstico: enviesa a busca por confirmação.",
          "Comorbidade real ignorada: forçar um único diagnóstico.",
          "Diferenças de nomenclatura entre DSM e CID.",
        ]),
        seg("10:30–12:00", "Fechamento", [{ fala: "Próxima aula: quando usar cada sistema na prática." }]),
      ],
    },
    {
      n: 4, titulo: "Quando usar DSM-5-TR versus CID-11", duracao: "10 min", slides: "8",
      objetivo: "Diferenciar o uso prático de cada sistema no contexto brasileiro.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Um filtro rápido — muito relevante pra prática cotidiana no Brasil."]),
        seg("1:00–8:00", "Os 3 cenários (mostrar slide 8)", [
          "DSM-5-TR: raciocínio clínico detalhado, especificadores ricos.",
          "CID-11: obrigatório pro faturamento SUS/planos de saúde no Brasil.",
          "Uso combinado: pensar com DSM-5-TR, registrar com CID-11.",
        ]),
        seg("8:00–9:00", "Por que isso importa", ["Confusão entre os dois sistemas é um erro administrativo comum na prática."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: os instrumentos que operacionalizam cada sistema." }]),
      ],
    },
    {
      n: 5, titulo: "Instrumentos que operacionalizam cada sistema", duracao: "10 min", slides: "9",
      objetivo: "Saber quando usar SCID-5, CIDI e julgamento clínico estruturado.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três ferramentas, três finalidades — do DSM à epidemiologia baseada em CID."]),
        seg("1:00–4:30", "SCID-5", ["Já usada nos módulos de personalidade — padrão-ouro pro DSM."]),
        seg("4:30–7:30", "CIDI", ["Entrevista estruturada alinhada à CID, usada em estudos epidemiológicos."]),
        seg("7:30–9:00", "Julgamento clínico estruturado", ["Anamnese + exame do estado mental — base indispensável, Módulo 2.1."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: colocamos tudo em prática — como chegar ao diagnóstico formal." }]),
      ],
    },
    {
      n: 6, titulo: "Aplicação — identificar sintomas e verificar critérios", duracao: "13 min", slides: "10, 11",
      objetivo: "Aplicar os passos 1 e 2 do modelo de construção diagnóstica.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["A parte mais prática desse módulo. Hoje, os 2 primeiros passos."]),
        seg("1:00–2:00", "Visão geral (mostrar slide 10)", ["Identificar sintomas nucleares → Verificar duração/prejuízo → Checar especificadores → Documentar com código correto."]),
        seg("2:00–7:00", "Passo 1 — Identificar sintomas nucleares (mostrar slide 11, esquerda)", ["Liste sistematicamente os sintomas, sem se prender à primeira hipótese.", "Compare com os critérios formais antes de fechar qualquer conclusão."]),
        seg("7:00–12:00", "Passo 2 — Verificar duração e prejuízo (mostrar slide 11, direita)", [{ fala: "Há quanto tempo isso vem acontecendo, e como isso tem afetado seu dia a dia — trabalho, relações, autocuidado?" }]),
        seg("12:00–13:00", "Fechamento", [{ fala: "Próxima aula: checar especificadores e documentar com o código correto." }]),
      ],
    },
    {
      n: 7, titulo: "Aplicação — especificadores e documentação", duracao: "11 min", slides: "12",
      objetivo: "Trabalhar especificadores clínicos e documentação formal precisa.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Hoje fechamos o modelo com os detalhes que refinam o diagnóstico."]),
        seg("1:00–6:00", "Passo 3 — Checar especificadores (mostrar slide 12, esquerda)", ["Gravidade, curso e subtipos mudam a leitura clínica.", "Frequentemente orientam qual variação do protocolo do Bloco 4 aplicar."]),
        seg("6:00–10:00", "Passo 4 — Documentar com o código correto (mostrar slide 12, direita)", ["DSM-5-TR pro raciocínio clínico, CID-11 pro registro oficial.", "Documente de forma clara o suficiente pra outro profissional entender."]),
        seg("10:00–11:00", "Fechamento", [{ fala: "Modelo completo. Próxima aula: um caso real e os critérios de quando aprofundar." }]),
      ],
    },
    {
      n: 8, titulo: "Estudo de caso, encaminhamento e recap", duracao: "14 min", slides: "13, 14, 15",
      objetivo: "Integrar todo o módulo num caso completo, com ênfase em evitar as armadilhas comuns.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Última aula do módulo. Caso completo e os critérios de quando aprofundar."]),
        seg("1:00–6:00", "Estudo de caso (mostrar slide 13)", ["Leia a vinheta com calma.", "Percorra as 3 perguntas de discussão.", "Convide o aluno a pausar e responder por escrito."]),
        seg("6:00–10:00", "Quando encaminhar (mostrar slide 14)", ["Percorra os 4 critérios, com atenção especial a causas médicas não descartadas."]),
        seg("10:00–13:00", "Recapitulando o módulo (mostrar slide 15)", ["Retome os 4 pontos-chave.", "Reforce que classificação é ferramenta de comunicação, não verdade absoluta."]),
        seg("13:00–14:00", "Fechamento do módulo", [{ fala: "Agora é hora dos exercícios e da avaliação. Te vejo no próximo módulo do Bloco 2." }]),
      ],
    },
  ];

  const totalMin = 12 + 10 + 12 + 10 + 10 + 13 + 11 + 14;

  const children = [
    ...doc.capa(KICKER, "Roteiro de Aulas — Classificações Diagnósticas", "Módulo dividido em 8 vídeo-aulas de 10 a 15 minutos, seguindo os slides já produzidos. Cada aula tem roteiro cronometrado, pronto pra gravação."),
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

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", `${RODAPE_DOC} — Roteiro de Aulas`, children), "Modulo-2.2-Roteiro-Aulas.docx");
}

// ============================================================
Promise.resolve()
  .then(construirDeck)
  .then(construirExercicios)
  .then(construirProva)
  .then(construirRoteiro)
  .then(() => console.log("TUDO PRONTO"))
  .catch((e) => { console.error(e); process.exit(1); });

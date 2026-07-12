const deck = require("../_lib/lib-deck.js");
const doc = require("../_lib/lib-doc.js");

const MOD = "2.1";
const NOME = "Semiologia Psicopatológica e Entrevista Estruturada";
const RODAPE_DECK = `Semiologia e Entrevista — Módulo ${MOD}`;
const RODAPE_DOC = `Módulo ${MOD} — Semiologia e Entrevista`;
const KICKER = "MÓDULO 2.1 · PSICODIAGNÓSTICO E AVALIAÇÃO NEUROPSICOLÓGICA";

// ============================================================
// 1) SLIDE DECK
// ============================================================
function construirDeck() {
  const pres = deck.novaApresentacao(`${NOME} — A Base de Todo Psicodiagnóstico`);

  deck.slideTitulo(pres, {
    moduloLabel: `Módulo ${MOD} · Bloco 2 · Avaliação`,
    titulo: "Semiologia e Entrevista",
    subtitulo: "Antes de qualquer teste, a anamnese e o exame do estado mental",
    passos: ["Anamnese", "Estado mental", "Observação", "Registro", "Aplicação"],
  });

  deck.slideRoteiro(pres, {
    rodape: RODAPE_DECK, pageNum: 2,
    cards: [
      { titulo: "Anamnese", desc: "A história clínica sistemática antes de qualquer hipótese" },
      { titulo: "Exame do estado mental", desc: "Os 4 domínios de observação direta" },
      { titulo: "Tipos de entrevista", desc: "Livre, semiestruturada e estruturada" },
      { titulo: "Registro clínico", desc: "Documentar de forma clara e replicável" },
      { titulo: "Aplicação", desc: "A base que sustenta todo o resto do Bloco 2" },
    ],
  });

  deck.slideHook(pres, {
    rodape: RODAPE_DECK, pageNum: 3,
    frase: "Nenhum teste diz a você o que testar — é a entrevista clínica bem conduzida que decide quais hipóteses valem a pena investigar formalmente.",
    apoio: "Por isso este é o primeiro módulo do Bloco 2: toda a bateria de instrumentos que vem a seguir só funciona bem quando aplicada a partir de uma leitura clínica sólida da anamnese e do exame do estado mental.",
  });

  deck.slideCircuito(pres, {
    rodape: RODAPE_DECK, pageNum: 4,
    titulo: "Os 4 domínios do exame do estado mental",
    regioes: [
      { label: "Aparência e comportamento (higiene, psicomotricidade, contato visual)", rx: 0.20, ry: 0.22, color: deck.NAVY, d: 0.5 },
      { label: "Afeto e humor (congruência, amplitude, estabilidade)", rx: 0.22, ry: 0.62, color: deck.TERRA, d: 0.4 },
      { label: "Pensamento (curso e conteúdo do discurso)", rx: 0.60, ry: 0.60, color: deck.NAVY_TINT, d: 0.36 },
      { label: "Sensopercepção (presença de alterações perceptivas)", rx: 0.58, ry: 0.24, color: deck.TERRA_TINT, d: 0.36 },
    ],
    notas: [
      "Aparência e comportamento revelam informação valiosa antes mesmo do paciente falar — higiene, psicomotricidade e contato visual.",
      "Afeto (observável) e humor (relatado) precisam ser avaliados quanto à congruência entre si e com o conteúdo do discurso.",
      "O curso do pensamento (organização) e o conteúdo (temas, delírios, obsessões) são frequentemente mais informativos que qualquer teste isolado.",
    ],
  });

  deck.slideCadeia(pres, {
    rodape: RODAPE_DECK, pageNum: 5,
    titulo: "Da anamnese ao psicodiagnóstico formal",
    elos: [
      { titulo: "Coleta da anamnese", desc: "História clínica sistemática: queixa, antecedentes, contexto de vida" },
      { titulo: "Exame do estado mental", desc: "Observação direta dos 4 domínios durante a própria entrevista" },
      { titulo: "Formulação de hipóteses", desc: "Cruzamento entre história e observação gera hipóteses diagnósticas" },
      { titulo: "Confirmação formal", desc: "Instrumentos específicos (Módulos 2.2 a 2.5) testam essas hipóteses" },
    ],
    notaFinal: "Pular direto pro instrumento sem essa base geralmente leva a aplicar o teste errado, ou a interpretar mal um teste certo.",
  });

  deck.slideCategorias(pres, {
    rodape: RODAPE_DECK, pageNum: 6,
    titulo: "3 fontes de informação que se cruzam na entrevista",
    categorias: [
      { titulo: "Dados objetivos da anamnese", desc: "História, antecedentes, contexto de vida verificável", color: deck.NAVY },
      { titulo: "Observação direta", exame: true, desc: "O que você vê e nota durante a própria entrevista", color: deck.TERRA },
      { titulo: "Relato subjetivo", desc: "Queixa e percepção do próprio paciente sobre si mesmo", color: deck.NAVY_TINT },
    ],
    notaFinal: "As 3 fontes raramente coincidem perfeitamente — as discrepâncias entre elas costumam ser, elas mesmas, informação clínica valiosa.",
  });

  deck.slideSinais(pres, {
    rodape: RODAPE_DECK, pageNum: 7,
    titulo: "Sinais a observar sistematicamente",
    itens: [
      { titulo: "Aparência/higiene", desc: "Cuidado pessoal, adequação ao contexto, sinais de negligência" },
      { titulo: "Psicomotricidade", desc: "Agitação, lentificação, tensão muscular observável" },
      { titulo: "Curso do discurso", desc: "Organização, fuga de ideias, bloqueios, tangencialidade" },
      { titulo: "Congruência afeto-conteúdo", desc: "O afeto expresso combina com o que está sendo relatado?" },
    ],
  });

  deck.slideDiferencial(pres, {
    rodape: RODAPE_DECK, pageNum: 8,
    titulo: "Quando usar cada tipo de entrevista",
    cards: [
      { titulo: "Entrevista livre", desc: "Primeira sessão, construção de rapport, exploração ampla inicial" },
      { titulo: "Semiestruturada", desc: "Equilíbrio entre roteiro guia e flexibilidade — a mais usada na prática" },
      { titulo: "Estruturada", desc: "Instrumentos formais como SCID-5, quando precisão diagnóstica é prioridade" },
    ],
  });

  deck.slideInstrumentos(pres, {
    rodape: RODAPE_DECK, pageNum: 9,
    titulo: "Modelos de entrevista de referência",
    instrumentos: [
      { sigla: "MINI", nome: "Mini International Neuropsychiatric Interview", desc: "Entrevista estruturada rápida, ampla cobertura diagnóstica." },
      { sigla: "SCID-5", nome: "Structured Clinical Interview for DSM-5", desc: "Padrão-ouro de entrevista estruturada, já usada nos módulos de personalidade." },
      { sigla: "Roteiro próprio", nome: "Anamnese + exame do estado mental", desc: "O modelo mais usado no dia a dia clínico." },
    ],
  });

  deck.slideProtocoloOverview(pres, {
    rodape: RODAPE_DECK, pageNum: 10,
    titulo: "Conduzindo a entrevista: 4 passos",
    passos: [
      { titulo: "Estabelecer\nrapport", desc: "Antes de qualquer coleta sistemática de dados" },
      { titulo: "Coletar a\nanamnese", desc: "De forma sistemática, sem pular áreas relevantes" },
      { titulo: "Conduzir o exame\ndo estado mental", desc: "Observação ativa ao longo de toda a entrevista, não só ao final" },
      { titulo: "Documentar com\nclareza", desc: "Registro replicável, que outro profissional consiga entender depois" },
    ],
    notaFinal: "O exame do estado mental não é uma etapa separada no fim — é uma observação contínua que acontece durante toda a coleta da anamnese.",
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 11,
    titulo: "Passos 1 e 2, na prática",
    colunas: [
      {
        numero: 1, titulo: "Estabelecer rapport",
        fala: "“Antes de entrarmos nos detalhes, me conta um pouco sobre o que te trouxe até aqui, do seu jeito.”",
        bullets: ["Comece com perguntas abertas, permitindo que o paciente narre livremente antes de estruturar"],
      },
      {
        numero: 2, titulo: "Coletar a anamnese",
        bullets: ["Cubra sistematicamente: queixa principal, história da doença atual, antecedentes pessoais e familiares, contexto psicossocial", "Use um roteiro guia mental pra não esquecer áreas relevantes, sem tornar a entrevista mecânica"],
      },
    ],
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 12,
    titulo: "Passos 3 e 4, na prática",
    colunas: [
      {
        numero: 3, titulo: "Conduzir o exame do estado mental",
        bullets: ["Observe os 4 domínios continuamente, não apenas ao final da sessão", "Note tanto o que é dito quanto como é dito"],
      },
      {
        numero: 4, titulo: "Documentar com clareza",
        bullets: ["Registre observações objetivas, separadas de interpretações", "Um bom registro permite que outro profissional entenda o caso sem precisar reentrevistar"],
      },
    ],
  });

  deck.slideCaso(pres, {
    rodape: RODAPE_DECK, pageNum: 13,
    vinheta: "Durante a primeira sessão, um paciente relata estar \"bem, sem problema nenhum\", mas você observa higiene pessoal comprometida, discurso lentificado com pausas longas, contato visual reduzido, e um afeto visivelmente triste que não combina com o conteúdo verbal relatado.",
    perguntas: [
      "Que discrepância entre as 3 fontes de informação está presente nessa vinheta?",
      "Que domínios do exame do estado mental você registraria com mais detalhe nesse caso?",
      "Que hipóteses diagnósticas iniciais essa observação sustentaria, antes mesmo de qualquer instrumento formal?",
    ],
  });

  deck.slideEncaminhamento(pres, {
    rodape: RODAPE_DECK, pageNum: 14,
    criterios: [
      "Sinais de risco imediato identificados na entrevista: ativar avaliação de risco formal (Módulo 4.9)",
      "Sinais sugestivos de comprometimento cognitivo: aprofundar com avaliação neuropsicológica (Módulos 2.3, 2.4)",
      "Discrepância significativa entre relato e observação sugerindo quadro não reconhecido pelo paciente",
      "Sinais de possível causa médica subjacente: considerar encaminhamento médico antes de aprofundar psicologicamente",
    ],
  });

  deck.slideRecap(pres, {
    rodape: RODAPE_DECK, pageNum: 15,
    pontos: [
      "A entrevista clínica decide quais hipóteses valem a pena investigar formalmente — nenhum teste substitui essa etapa",
      "Aparência/comportamento, afeto/humor, pensamento e sensopercepção são os 4 domínios do exame do estado mental",
      "Anamnese, observação direta e relato subjetivo raramente coincidem perfeitamente — as discrepâncias são informação clínica",
      "Esse módulo é a base direta que sustenta todos os instrumentos formais estudados no restante do Bloco 2",
    ],
    proximoTexto: "Próximo: exercícios práticos e avaliação do Módulo 2.1 →",
  });

  return pres.writeFile({ fileName: "Modulo-2.1-Semiologia-Entrevista.pptx" });
}

// ============================================================
// 2) EXERCÍCIOS
// ============================================================
function construirExercicios() {
  const children = [
    ...doc.capa(KICKER, "Exercícios — Semiologia e Entrevista", "Resolva individualmente antes da sessão de supervisão. O objetivo é testar sua leitura clínica antes de comparar com a discussão em grupo — não há problema em errar."),

    doc.exNum(1, "Os 4 domínios, em suas palavras"),
    doc.pergunta(1, "Descreva, em uma frase cada, o que se observa em cada domínio do exame do estado mental: aparência/comportamento, afeto/humor, pensamento, sensopercepção."),
    ...doc.linhaResposta(3),
    doc.pergunta(2, "Por que a entrevista clínica é descrita como a base que decide \"o que testar\"?"),
    ...doc.linhaResposta(2),

    doc.exNum(2, "Tipos de entrevista"),
    doc.tabelaSimples(["Tipo", "Quando usar"], [["Livre", ""], ["Semiestruturada", ""], ["Estruturada", ""]], [2600, 6750]),

    doc.exNum(3, "Discrepâncias como informação clínica"),
    doc.vinhetaBox("Um paciente relata verbalmente que está \"tudo bem\", mas apresenta choro contido, voz trêmula e evita contato visual ao longo de toda a entrevista."),
    doc.pergunta(1, "Que discrepância está presente, e por que ela é clinicamente relevante?"),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),

    doc.exNum(4, "Registro clínico"),
    doc.pergunta(1, "Reescreva a observação \"paciente parecia deprimido\" separando dado objetivo de interpretação clínica."),
    ...doc.linhaResposta(3),

    doc.exNum(5, "Caso integrado"),
    doc.vinhetaBox("Um paciente relata estar \"bem, sem problema nenhum\", mas apresenta higiene comprometida, discurso lentificado, contato visual reduzido e afeto triste incongruente com o relato verbal."),
    doc.pergunta(1, "Que discrepância entre as 3 fontes de informação está presente?"),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Que domínios do exame do estado mental você registraria com mais detalhe?"),
    ...doc.linhaResposta(2),
    doc.pergunta(3, "Que hipóteses diagnósticas iniciais essa observação sustentaria?"),
    ...doc.linhaResposta(2),
  ];

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-2.1-Exercicios.docx");
}

// ============================================================
// 3) AVALIAÇÃO
// ============================================================
function construirProva() {
  const objetivas = [
    ["Os 4 domínios do exame do estado mental são:", ["Aparência/comportamento, afeto/humor, pensamento, sensopercepção", "Grandiosidade, necessidade de admiração, falta de empatia, impulsividade", "Memória, atenção, linguagem, função executiva", "Serotonina, dopamina, GABA, glutamato"]],
    ["A entrevista clínica, segundo o módulo, é descrita como:", ["A base que decide quais hipóteses valem investigar formalmente", "Uma etapa dispensável se houver testes disponíveis", "Um substituto completo para qualquer instrumento formal", "Uma formalidade sem impacto no diagnóstico"]],
    ["As 3 fontes de informação que se cruzam na entrevista são:", ["Dados objetivos da anamnese, observação direta, relato subjetivo", "Apenas testes psicológicos formais", "Exclusivamente exames de imagem", "Apenas o relato de terceiros, sem entrevista direta"]],
    ["Discrepâncias entre as 3 fontes de informação devem ser interpretadas como:", ["Informação clínica valiosa, não como erro a ser ignorado", "Sempre um erro de aplicação da entrevista", "Irrelevantes pro processo diagnóstico", "Motivo pra encerrar a entrevista imediatamente"]],
    ["Entrevista de referência considerada padrão-ouro de entrevista estruturada:", ["SCID-5 (Structured Clinical Interview for DSM-5)", "PCL-R", "Y-BOCS", "ISI"]],
    ["A entrevista semiestruturada é descrita como:", ["O equilíbrio mais usado na prática entre roteiro guia e flexibilidade", "Idêntica à entrevista totalmente livre", "Idêntica à entrevista totalmente estruturada", "Inadequada pra qualquer contexto clínico"]],
    ["O exame do estado mental deve ser conduzido:", ["Continuamente ao longo de toda a entrevista, não só ao final", "Apenas nos últimos 5 minutos da sessão", "Somente se o paciente relatar sintomas específicos", "Exclusivamente por meio de testes formais, nunca por observação direta"]],
    ["Um bom registro clínico, segundo o módulo, deve:", ["Separar observações objetivas de interpretações clínicas", "Misturar livremente fato e opinião pessoal", "Ser understandable apenas pelo profissional que o escreveu", "Omitir qualquer detalhe observacional relevante"]],
    ["Diante de sinais sugestivos de comprometimento cognitivo na entrevista, o módulo recomenda:", ["Aprofundar com avaliação neuropsicológica formal (Módulos 2.3, 2.4)", "Ignorar, pois a entrevista já é suficiente em qualquer caso", "Encerrar o acompanhamento imediatamente", "Presumir automaticamente uma causa psiquiátrica, sem investigação adicional"]],
    ["Pular direto pro instrumento formal sem uma boa anamnese e exame do estado mental costuma levar a:", ["Aplicar o teste errado ou interpretar mal um teste certo", "Sempre melhorar a precisão do diagnóstico", "Eliminar a necessidade de qualquer entrevista posterior", "Não ter qualquer impacto no processo diagnóstico"]],
  ];
  const gabaritoObjetivas = ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a"];

  const children = [
    ...doc.capa(KICKER, "Avaliação — Semiologia e Entrevista", `Avaliação formativa de encerramento do Módulo ${MOD}.`),
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
    doc.vinhetaBox("Durante uma primeira sessão, um paciente narra sua história de forma desorganizada, pulando entre temas sem conexão aparente, com discurso acelerado. Relata se sentir \"cheio de energia e ideias\", mas a família que o acompanhou até a sala de espera comentou brevemente que ele \"não dorme direito há semanas\"."),
    new doc.Paragraph({ spacing: { before: 240 }, children: [new doc.TextRun({ text: "Com base no protocolo estudado, responda:", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    new doc.Paragraph({ spacing: { before: 220, after: 40 }, children: [new doc.TextRun({ text: "a) (10 pts) Que domínio do exame do estado mental está mais evidente na descrição do discurso desse paciente?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "b) (10 pts) Que discrepância entre fontes de informação está presente nessa vinheta?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "c) (10 pts) Que informação da anamnese familiar seria importante investigar ativamente, dado o padrão observado?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "d) (10 pts) Que módulo deste curso essa combinação de sinais poderia sugerir investigar de forma mais aprofundada?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    new doc.Paragraph({ spacing: { after: 40 }, children: [new doc.TextRun({ text: "USO EXCLUSIVO DO INSTRUTOR — remover antes de aplicar a prova", bold: true, color: doc.TERRA, font: doc.FONT, size: 20 })] }),
    doc.tituloH1("Gabarito"),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 1 — Questões objetivas", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 200 }, children: [new doc.TextRun({ text: gabaritoObjetivas.map((r, i) => `${i + 1}-${r}`).join("   ·   "), font: doc.FONT, size: 22, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 2 — Critério de correção da questão de caso", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "a) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Pensamento — curso do discurso desorganizado, com fuga de ideias e discurso acelerado.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "b) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "O paciente relata se sentir bem (\"cheio de energia\"), enquanto a família relata um sinal preocupante (insônia prolongada) que ele não mencionou.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "c) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Investigar ativamente histórico de episódios semelhantes anteriores, duração da insônia relatada pela família, e impacto funcional (decisões impulsivas, gastos, mudanças de comportamento).", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "d) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Módulo 4.20 (Transtorno Bipolar) — o padrão de discurso acelerado, sensação subjetiva de energia elevada e redução da necessidade de sono é consistente com episódio de mania/hipomania.", font: doc.FONT, size: 21, color: doc.INK })] }),
  );

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-2.1-Avaliacao.docx");
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
      n: 1, titulo: "A base de todo psicodiagnóstico", duracao: "12 min", slides: "1, 2, 3, 4",
      objetivo: "Sair sabendo explicar os 4 domínios do exame do estado mental sem jargão técnico.",
      segmentos: [
        seg("0:00–0:45", "Abertura (gancho)", [{ fala: "Nenhum teste diz a você o que testar — é a entrevista clínica bem conduzida que decide quais hipóteses valem a pena investigar formalmente." }]),
        seg("0:45–2:00", "Por que isso importa", ["Toda a bateria de instrumentos do Bloco 2 só funciona bem a partir dessa leitura clínica sólida."]),
        seg("2:00–8:00", "Os 4 domínios (mostrar slide 4)", [
          "Aparência e comportamento: higiene, psicomotricidade, contato visual.",
          "Afeto e humor: congruência, amplitude, estabilidade.",
          "Pensamento: curso e conteúdo do discurso.",
          "Sensopercepção: presença de alterações perceptivas.",
        ]),
        seg("8:00–10:30", "Um ponto importante", ["Aparência e comportamento revelam informação valiosa antes mesmo do paciente falar."]),
        seg("10:30–12:00", "Fechamento", [{ fala: "Próxima aula: da anamnese ao psicodiagnóstico formal." }]),
      ],
    },
    {
      n: 2, titulo: "Da anamnese ao psicodiagnóstico formal", duracao: "10 min", slides: "5",
      objetivo: "Explicar a cadeia entre anamnese, observação e confirmação diagnóstica formal.",
      segmentos: [
        seg("0:00–1:00", "Retomada rápida", ["Vimos os domínios de observação. Hoje vemos como eles se conectam ao restante do processo diagnóstico."]),
        seg("1:00–6:30", "A cadeia (mostrar slide 5)", ["Coleta da anamnese: história clínica sistemática.", "Exame do estado mental: observação direta contínua.", "Formulação de hipóteses: cruzamento entre história e observação.", "Confirmação formal: instrumentos específicos dos Módulos 2.2 a 2.5."]),
        seg("6:30–9:00", "Um erro comum", ["Pular direto pro instrumento sem essa base geralmente leva a aplicar o teste errado."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: as 3 fontes de informação que se cruzam na entrevista." }]),
      ],
    },
    {
      n: 3, titulo: "As 3 fontes de informação e os sinais a observar", duracao: "12 min", slides: "6, 7",
      objetivo: "Reconhecer as 3 fontes de informação e os sinais sistemáticos de observação.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três fontes — e como as discrepâncias entre elas são, elas mesmas, informação clínica."]),
        seg("1:00–6:00", "As 3 fontes (mostrar slide 6)", [
          "Dados objetivos da anamnese: história, antecedentes.",
          "Observação direta: o que você vê durante a entrevista.",
          "Relato subjetivo: queixa e percepção do próprio paciente.",
        ]),
        seg("6:00–10:30", "Sinais a observar (mostrar slide 7)", [
          "Aparência/higiene: cuidado pessoal, sinais de negligência.",
          "Psicomotricidade: agitação ou lentificação.",
          "Curso do discurso: organização, fuga de ideias, bloqueios.",
          "Congruência afeto-conteúdo: o afeto combina com o relato?",
        ]),
        seg("10:30–12:00", "Fechamento", [{ fala: "Próxima aula: quando usar cada tipo de entrevista." }]),
      ],
    },
    {
      n: 4, titulo: "Quando usar cada tipo de entrevista", duracao: "10 min", slides: "8",
      objetivo: "Diferenciar entrevista livre, semiestruturada e estruturada.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Um filtro rápido — a escolha do tipo de entrevista depende do momento e do objetivo."]),
        seg("1:00–8:00", "Os 3 tipos (mostrar slide 8)", [
          "Livre: primeira sessão, construção de rapport.",
          "Semiestruturada: a mais usada na prática do dia a dia.",
          "Estruturada: precisão diagnóstica com instrumentos formais como SCID-5.",
        ]),
        seg("8:00–9:00", "Por que isso importa", ["Cada tipo tem seu momento certo — usar só um tipo em todos os contextos é um erro técnico comum."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: os modelos de entrevista de referência." }]),
      ],
    },
    {
      n: 5, titulo: "Modelos de entrevista de referência", duracao: "10 min", slides: "9",
      objetivo: "Saber quando usar MINI, SCID-5 e roteiro semiestruturado próprio.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três modelos, três finalidades — do rastreio rápido à entrevista estruturada completa."]),
        seg("1:00–4:30", "MINI", ["Entrevista estruturada rápida, ampla cobertura diagnóstica."]),
        seg("4:30–7:30", "SCID-5", ["Padrão-ouro de entrevista estruturada, já usada nos módulos de personalidade do curso."]),
        seg("7:30–9:00", "Roteiro semiestruturado próprio", ["Anamnese + exame do estado mental — o modelo mais usado no dia a dia clínico."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: colocamos tudo em prática — como conduzir a entrevista, passo a passo." }]),
      ],
    },
    {
      n: 6, titulo: "Conduzindo a entrevista — rapport e anamnese", duracao: "13 min", slides: "10, 11",
      objetivo: "Aplicar os passos 1 e 2 do modelo de condução da entrevista.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["A parte mais prática desse módulo. Hoje, os 2 primeiros passos."]),
        seg("1:00–2:00", "Visão geral (mostrar slide 10)", ["Estabelecer rapport → Coletar a anamnese → Conduzir o exame do estado mental → Documentar com clareza."]),
        seg("2:00–7:00", "Passo 1 — Estabelecer rapport (mostrar slide 11, esquerda)", [{ fala: "Antes de entrarmos nos detalhes, me conta um pouco sobre o que te trouxe até aqui, do seu jeito." }]),
        seg("7:00–12:00", "Passo 2 — Coletar a anamnese (mostrar slide 11, direita)", ["Cubra sistematicamente queixa, história atual, antecedentes e contexto psicossocial.", "Use um roteiro guia mental, sem tornar a entrevista mecânica."]),
        seg("12:00–13:00", "Fechamento", [{ fala: "Próxima aula: conduzir o exame do estado mental e documentar com clareza." }]),
      ],
    },
    {
      n: 7, titulo: "Conduzindo a entrevista — exame do estado mental e registro", duracao: "11 min", slides: "12",
      objetivo: "Trabalhar observação contínua e registro clínico de qualidade.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Hoje fechamos o modelo com a observação contínua e a documentação."]),
        seg("1:00–6:00", "Passo 3 — Conduzir o exame do estado mental (mostrar slide 12, esquerda)", ["Observe os 4 domínios continuamente, não apenas ao final.", "Note tanto o que é dito quanto como é dito."]),
        seg("6:00–10:00", "Passo 4 — Documentar com clareza (mostrar slide 12, direita)", ["Registre observações objetivas separadas de interpretações.", "Um bom registro permite que outro profissional entenda o caso sem reentrevistar."]),
        seg("10:00–11:00", "Fechamento", [{ fala: "Modelo completo. Próxima aula: um caso real e os critérios de quando aprofundar." }]),
      ],
    },
    {
      n: 8, titulo: "Estudo de caso, encaminhamento e recap", duracao: "14 min", slides: "13, 14, 15",
      objetivo: "Integrar todo o módulo num caso completo, com ênfase nas discrepâncias entre fontes de informação.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Última aula do módulo. Caso completo e os critérios de quando aprofundar."]),
        seg("1:00–6:00", "Estudo de caso (mostrar slide 13)", ["Leia a vinheta com calma.", "Percorra as 3 perguntas de discussão.", "Convide o aluno a pausar e responder por escrito."]),
        seg("6:00–10:00", "Quando encaminhar (mostrar slide 14)", ["Percorra os 4 critérios, com atenção às discrepâncias entre relato e observação."]),
        seg("10:00–13:00", "Recapitulando o módulo (mostrar slide 15)", ["Retome os 4 pontos-chave.", "Reforce que esse é o alicerce direto de todo o restante do Bloco 2."]),
        seg("13:00–14:00", "Fechamento do módulo", [{ fala: "Agora é hora dos exercícios e da avaliação. Te vejo no próximo módulo do Bloco 2." }]),
      ],
    },
  ];

  const totalMin = 12 + 10 + 12 + 10 + 10 + 13 + 11 + 14;

  const children = [
    ...doc.capa(KICKER, "Roteiro de Aulas — Semiologia e Entrevista", "Módulo dividido em 8 vídeo-aulas de 10 a 15 minutos, seguindo os slides já produzidos. Cada aula tem roteiro cronometrado, pronto pra gravação."),
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

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", `${RODAPE_DOC} — Roteiro de Aulas`, children), "Modulo-2.1-Roteiro-Aulas.docx");
}

// ============================================================
Promise.resolve()
  .then(construirDeck)
  .then(construirExercicios)
  .then(construirProva)
  .then(construirRoteiro)
  .then(() => console.log("TUDO PRONTO"))
  .catch((e) => { console.error(e); process.exit(1); });

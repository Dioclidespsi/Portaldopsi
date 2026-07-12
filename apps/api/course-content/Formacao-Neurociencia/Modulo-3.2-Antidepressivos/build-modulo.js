const deck = require("../_lib/lib-deck.js");
const doc = require("../_lib/lib-doc.js");

const MOD = "3.2";
const NOME = "Antidepressivos";
const RODAPE_DECK = `Antidepressivos — Módulo ${MOD}`;
const RODAPE_DOC = `Módulo ${MOD} — Antidepressivos`;
const KICKER = "MÓDULO 3.2 · FARMACOLOGIA APLICADA À PSICOTERAPIA";

// ============================================================
// 1) SLIDE DECK
// ============================================================
function construirDeck() {
  const pres = deck.novaApresentacao(`${NOME} — Mecanismo, Tempo de Resposta e Efeitos na Sessão`);

  deck.slideTitulo(pres, {
    moduloLabel: `Módulo ${MOD} · Bloco 3 · Farmacologia`,
    titulo: "Antidepressivos",
    subtitulo: "ISRS, IRSN, tricíclicos e atípicos: o que muda na sessão",
    passos: ["Classes", "Mecanismo", "Tempo de resposta", "Efeitos", "Aplicação"],
  });

  deck.slideRoteiro(pres, {
    rodape: RODAPE_DECK, pageNum: 2,
    cards: [
      { titulo: "ISRS", desc: "A classe mais prescrita, primeira linha na maioria dos casos" },
      { titulo: "IRSN", desc: "Ação dupla, frequentemente indicada em quadros mistos" },
      { titulo: "Tricíclicos e atípicos", desc: "Perfis específicos, indicações mais direcionadas" },
      { titulo: "Tempo de resposta", desc: "Por que o efeito não é imediato, e o que isso significa" },
      { titulo: "Efeitos na sessão", desc: "Achatamento afetivo, ativação inicial e o que fazer com isso" },
    ],
  });

  deck.slideHook(pres, {
    rodape: RODAPE_DECK, pageNum: 3,
    frase: "Um paciente que começa antidepressivo hoje não vai melhorar amanhã — e explicar isso com precisão, antes que a decepção bata, é uma das intervenções mais simples e mais esquecidas da prática clínica.",
    apoio: "Entender as classes de antidepressivos não é sobre escolher qual prescrever — é sobre calibrar expectativa, reconhecer efeito relevante na sessão, e psicoeducar com precisão.",
  });

  deck.slideCircuito(pres, {
    rodape: RODAPE_DECK, pageNum: 4,
    titulo: "O que os antidepressivos alteram no cérebro",
    regioes: [
      { label: "Recaptação de serotonina (ISRS, alvo mais comum)", rx: 0.20, ry: 0.22, color: deck.NAVY, d: 0.5 },
      { label: "Recaptação de serotonina e noradrenalina (IRSN, ação dupla)", rx: 0.22, ry: 0.62, color: deck.TERRA, d: 0.4 },
      { label: "Múltiplos neurotransmissores (tricíclicos, perfil mais amplo)", rx: 0.60, ry: 0.60, color: deck.NAVY_TINT, d: 0.36 },
      { label: "Neuroplasticidade (crescimento sináptico ao longo de semanas)", rx: 0.58, ry: 0.24, color: deck.TERRA_TINT, d: 0.36 },
    ],
    notas: [
      "O aumento imediato de serotonina disponível não é, sozinho, o que gera a melhora clínica — isso já acontece nas primeiras doses.",
      "A melhora clínica real depende de mudanças plásticas mais lentas, sustentadas por BDNF (Módulo 1.4) — daí o tempo de resposta de semanas.",
      "Esse é exatamente o motivo pelo qual o efeito não é imediato, mesmo que a mudança química inicial já tenha ocorrido no primeiro dia.",
    ],
  });

  deck.slideCadeia(pres, {
    rodape: RODAPE_DECK, pageNum: 5,
    titulo: "Do início do fármaco à resposta clínica plena",
    elos: [
      { titulo: "Início da medicação", desc: "Mudança química imediata, sem melhora clínica perceptível ainda" },
      { titulo: "Janela de ativação inicial", desc: "Primeiras 1-2 semanas, risco de aumento paradoxal de ansiedade" },
      { titulo: "Mudanças plásticas em curso", desc: "Crescimento sináptico gradual, sustentado por semanas" },
      { titulo: "Resposta clínica plena", desc: "Geralmente entre 4 e 8 semanas, variável entre pacientes" },
    ],
    notaFinal: "A janela de ativação inicial é justamente o período de maior risco de abandono precoce do tratamento — psicoeducação nesse momento específico é crítica.",
  });

  deck.slideCategorias(pres, {
    rodape: RODAPE_DECK, pageNum: 6,
    titulo: "3 grandes classes de antidepressivos",
    categorias: [
      { titulo: "ISRS", desc: "Inibidores seletivos de recaptação de serotonina, primeira linha mais comum", color: deck.NAVY },
      { titulo: "IRSN", desc: "Inibidores de recaptação de serotonina e noradrenalina, ação dupla", color: deck.TERRA },
      { titulo: "Tricíclicos e atípicos", desc: "Perfis mais amplos ou específicos, indicações mais direcionadas", color: deck.NAVY_TINT },
    ],
    notaFinal: "A escolha entre classes é sempre médica — o valor clínico pro psicólogo está em reconhecer qual classe o paciente usa e o que isso implica na sessão.",
  });

  deck.slideSinais(pres, {
    rodape: RODAPE_DECK, pageNum: 7,
    titulo: "Efeitos que aparecem diretamente na sessão",
    itens: [
      { titulo: "Ativação inicial", desc: "Aumento de ansiedade e inquietação nas primeiras 1-2 semanas" },
      { titulo: "Achatamento afetivo", desc: "Redução da amplitude emocional, comum com uso prolongado de ISRS" },
      { titulo: "Efeitos colaterais físicos", desc: "Náusea, alterações de sono, mudanças na libido, entre outros" },
      { titulo: "Latência terapêutica", desc: "Ausência de melhora perceptível nas primeiras semanas, apesar do uso correto" },
    ],
  });

  deck.slideDiferencial(pres, {
    rodape: RODAPE_DECK, pageNum: 8,
    titulo: "Diferenciando efeito esperado de sinal de alerta",
    cards: [
      { titulo: "Efeito esperado e transitório", desc: "Náusea leve ou sonolência nas primeiras semanas, geralmente resolve sozinho" },
      { titulo: "Ativação a monitorar de perto", desc: "Aumento significativo de agitação/ansiedade, sobretudo em jovens" },
      { titulo: "Sinal de alerta a comunicar", desc: "Piora do humor, ideação suicida nova, ou efeito colateral intenso persistente" },
    ],
  });

  deck.slideInstrumentos(pres, {
    rodape: RODAPE_DECK, pageNum: 9,
    titulo: "Como acompanhar a resposta ao longo do tempo",
    instrumentos: [
      { sigla: "Escalas seriadas", nome: "BDI-II, PHQ-9, HAM-D (Módulo 2.5)", desc: "Documentam a evolução real, além da percepção subjetiva do paciente." },
      { sigla: "C-SSRS", nome: "Monitoramento de risco", desc: "Especialmente relevante na janela de ativação inicial." },
      { sigla: "Diário de efeitos", nome: "Registro simples do paciente", desc: "Ajuda a diferenciar efeito transitório de sinal persistente." },
    ],
  });

  deck.slideProtocoloOverview(pres, {
    rodape: RODAPE_DECK, pageNum: 10,
    titulo: "Da prescrição à psicoeducação: 4 passos",
    passos: [
      { titulo: "Confirmar\na classe usada", desc: "Saber qual antidepressivo o paciente usa, e há quanto tempo" },
      { titulo: "Calibrar\nexpectativa", desc: "Explicar o tempo de resposta esperado, antes que a decepção apareça" },
      { titulo: "Monitorar a\njanela inicial", desc: "Atenção redobrada nas primeiras 1-2 semanas de uso" },
      { titulo: "Reconhecer\nachatamento afetivo", desc: "Diferenciar de melhora real, e comunicar se necessário" },
    ],
    notaFinal: "Esses 4 passos se aplicam a qualquer classe de antidepressivo — o que muda entre elas é o perfil específico de efeitos, não essa estrutura geral de acompanhamento.",
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 11,
    titulo: "Passos 1 e 2, na prática",
    colunas: [
      {
        numero: 1, titulo: "Confirmar a classe usada",
        bullets: ["Pergunte diretamente qual medicação e há quanto tempo, sem constranger o paciente", "Anote isso no prontuário como dado relevante de contexto clínico"],
      },
      {
        numero: 2, titulo: "Calibrar expectativa",
        fala: "“O efeito completo costuma levar de 4 a 8 semanas — não é sinal de que não está funcionando se você ainda não sentir mudança agora.”",
        bullets: ["Explique isso logo no início do tratamento medicamentoso, não apenas quando o paciente já estiver frustrado"],
      },
    ],
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 12,
    titulo: "Passos 3 e 4, na prática",
    colunas: [
      {
        numero: 3, titulo: "Monitorar a janela inicial",
        bullets: ["Nas primeiras 1-2 semanas, pergunte ativamente sobre aumento de ansiedade ou agitação", "Reforce que isso deve ser comunicado ao psiquiatra, não apenas tolerado em silêncio"],
      },
      {
        numero: 4, titulo: "Reconhecer achatamento afetivo",
        bullets: ["Pergunte especificamente se o paciente sente falta da amplitude emocional de antes, positiva e negativa", "Comunique ao psiquiatra se isso estiver impactando significativamente a qualidade de vida"],
      },
    ],
  });

  deck.slideCaso(pres, {
    rodape: RODAPE_DECK, pageNum: 13,
    vinheta: "Um paciente iniciou ISRS há 5 semanas e relata que, apesar de \"não estar mais tão triste\", também não sente mais alegria genuína com nada, incluindo atividades que sempre gostou. Ele pergunta se isso é \"normal\" ou se \"tem algo errado\".",
    perguntas: [
      "Que fenômeno farmacológico esse relato provavelmente descreve?",
      "Como você diferenciaria isso de uma resposta terapêutica incompleta?",
      "Como você responderia à pergunta direta do paciente, sem minimizar nem alarmar desnecessariamente?",
    ],
  });

  deck.slideEncaminhamento(pres, {
    rodape: RODAPE_DECK, pageNum: 14,
    criterios: [
      "Qualquer sinal de ideação suicida nova ou piora do humor na janela de ativação inicial: ativar o Módulo 4.9 imediatamente",
      "Achatamento afetivo impactando significativamente a qualidade de vida: comunicar ao psiquiatra",
      "Ausência completa de resposta após 8 semanas de uso adequado: sugerir reavaliação médica",
      "Efeitos colaterais físicos persistentes e intensos: comunicar prontamente, sem aguardar a próxima consulta agendada",
    ],
  });

  deck.slideRecap(pres, {
    rodape: RODAPE_DECK, pageNum: 15,
    pontos: [
      "A melhora clínica depende de mudanças plásticas graduais, não do aumento imediato de serotonina — daí o tempo de resposta de semanas",
      "ISRS, IRSN e tricíclicos/atípicos são as 3 grandes classes, cada uma com perfil de efeitos específico",
      "Ativação inicial, achatamento afetivo e latência terapêutica são os efeitos mais relevantes de reconhecer na sessão",
      "Calibrar expectativa desde o início do tratamento medicamentoso previne boa parte do abandono precoce",
    ],
    proximoTexto: "Próximo: exercícios práticos e avaliação do Módulo 3.2 →",
  });

  return pres.writeFile({ fileName: "Modulo-3.2-Antidepressivos.pptx" });
}

// ============================================================
// 2) EXERCÍCIOS
// ============================================================
function construirExercicios() {
  const children = [
    ...doc.capa(KICKER, "Exercícios — Antidepressivos", "Resolva individualmente antes da sessão de supervisão. O objetivo é testar sua leitura funcional antes de comparar com a discussão em grupo — não há problema em errar."),

    doc.exNum(1, "As 3 classes, em suas palavras"),
    doc.pergunta(1, "Explique em uma frase cada classe: ISRS, IRSN, tricíclicos/atípicos."),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Por que a melhora clínica não é imediata, mesmo que a mudança química já ocorra no primeiro dia?"),
    ...doc.linhaResposta(2),

    doc.exNum(2, "Efeito esperado versus sinal de alerta"),
    doc.tabelaSimples(["Situação", "Efeito esperado ou sinal de alerta?"], [["Náusea leve na primeira semana", ""], ["Ideação suicida nova", ""], ["Aumento significativo de agitação em jovem", ""]], [5600, 3550]),

    doc.exNum(3, "Calibrando expectativa"),
    doc.vinhetaBox("Um paciente, na segunda semana de uso de ISRS, diz: \"acho que esse remédio não está funcionando, vou parar\"."),
    doc.pergunta(1, "Escreva uma resposta de psicoeducação que calibre a expectativa dele, sem desencorajar nem garantir resultado."),
    ...doc.linhaResposta(3),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),

    doc.exNum(4, "Achatamento afetivo"),
    doc.pergunta(1, "Por que o achatamento afetivo pode ser confundido, à primeira vista, com melhora do quadro depressivo?"),
    ...doc.linhaResposta(2),

    doc.exNum(5, "Caso integrado"),
    doc.vinhetaBox("Um paciente, há 5 semanas em uso de ISRS, relata não estar mais tão triste, mas também não sentir alegria genuína com nada, e pergunta se isso é normal."),
    doc.pergunta(1, "Que fenômeno farmacológico esse relato provavelmente descreve?"),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Como você diferenciaria isso de uma resposta terapêutica incompleta?"),
    ...doc.linhaResposta(2),
    doc.pergunta(3, "Como você responderia à pergunta direta dele?"),
    ...doc.linhaResposta(2),
  ];

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-3.2-Exercicios.docx");
}

// ============================================================
// 3) AVALIAÇÃO
// ============================================================
function construirProva() {
  const objetivas = [
    ["ISRS significa:", ["Inibidores seletivos de recaptação de serotonina", "Inibidores da recaptação de dopamina exclusivamente", "Inibidores de recaptação de GABA", "Estabilizadores de humor de ação rápida"]],
    ["IRSN se diferencia de ISRS por:", ["Ter ação dupla, sobre serotonina e noradrenalina", "Não atuar sobre nenhum neurotransmissor conhecido", "Ser usado exclusivamente em quadros psicóticos", "Não ter qualquer efeito colateral conhecido"]],
    ["A melhora clínica com antidepressivos depende principalmente de:", ["Mudanças plásticas graduais, sustentadas por BDNF ao longo de semanas", "Um efeito instantâneo que ocorre já na primeira dose", "Redução completa de qualquer neurotransmissor no cérebro", "Um processo que nunca ultrapassa 48 horas"]],
    ["A \"janela de ativação inicial\" se refere a:", ["Período de risco de aumento paradoxal de ansiedade nas primeiras 1-2 semanas", "O momento em que o antidepressivo perde totalmente o efeito", "Um efeito que ocorre exclusivamente após 6 meses de uso", "Um fenômeno que nunca precisa de monitoramento"]],
    ["O tempo médio pra resposta clínica plena de um antidepressivo costuma ser:", ["Entre 4 e 8 semanas", "Menos de 24 horas", "Exatamente 2 anos em todos os casos", "Nunca ocorre, independente do tempo de uso"]],
    ["Achatamento afetivo pode ser confundido com melhora porque:", ["A tristeza intensa desaparece, mas junto dela também some a capacidade de sentir alegria genuína", "É sempre acompanhado de euforia intensa", "Elimina completamente qualquer sintoma depressivo de forma definitiva", "Não tem qualquer relação com o uso de antidepressivos"]],
    ["Diante de ideação suicida nova durante a janela de ativação inicial, o módulo recomenda:", ["Ativar imediatamente o protocolo do Módulo 4.9", "Aguardar a próxima consulta médica agendada, sem intervenção imediata", "Ignorar, pois é sempre esperado nesse período", "Reduzir a frequência das sessões automaticamente"]],
    ["O passo \"calibrar expectativa\" recomenda explicar o tempo de resposta:", ["Logo no início do tratamento medicamentoso, antes que a decepção apareça", "Somente depois que o paciente já estiver frustrado com a falta de efeito", "Nunca, pois não é papel do psicólogo comentar sobre isso", "Apenas se o paciente perguntar explicitamente sobre o assunto"]],
    ["Diante de ausência completa de resposta após 8 semanas de uso adequado, o módulo recomenda:", ["Sugerir reavaliação médica", "Aguardar indefinidamente sem qualquer ação adicional", "Recomendar diretamente que o paciente troque de medicação", "Encerrar o acompanhamento psicológico imediatamente"]],
    ["A escolha entre as classes de antidepressivos é:", ["Sempre uma decisão médica, mesmo que o psicólogo entenda o mecanismo de cada uma", "Uma decisão que o psicólogo pode tomar em conjunto direto com o paciente", "Irrelevante pra prática clínica do psicólogo", "Determinada exclusivamente pela preferência pessoal do paciente, sem avaliação médica"]],
  ];
  const gabaritoObjetivas = ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a"];

  const children = [
    ...doc.capa(KICKER, "Avaliação — Antidepressivos", `Avaliação formativa de encerramento do Módulo ${MOD}.`),
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
    doc.vinhetaBox("Um paciente iniciou ISRS há 8 dias e relata, nesta sessão, que está \"muito mais agitado e ansioso\" do que antes de começar a medicação, e questiona se deveria parar imediatamente por conta própria."),
    new doc.Paragraph({ spacing: { before: 240 }, children: [new doc.TextRun({ text: "Com base no protocolo estudado, responda:", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    new doc.Paragraph({ spacing: { before: 220, after: 40 }, children: [new doc.TextRun({ text: "a) (10 pts) Que fenômeno farmacológico esse relato provavelmente descreve, dado o tempo de uso?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "b) (10 pts) Que orientação você daria sobre a ideia de parar imediatamente por conta própria?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "c) (10 pts) Que investigação adicional é essencial fazer nesse momento, dado o risco associado a essa janela específica?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "d) (10 pts) Como você comunicaria essa situação ao psiquiatra responsável?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    new doc.Paragraph({ spacing: { after: 40 }, children: [new doc.TextRun({ text: "USO EXCLUSIVO DO INSTRUTOR — remover antes de aplicar a prova", bold: true, color: doc.TERRA, font: doc.FONT, size: 20 })] }),
    doc.tituloH1("Gabarito"),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 1 — Questões objetivas", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 200 }, children: [new doc.TextRun({ text: gabaritoObjetivas.map((r, i) => `${i + 1}-${r}`).join("   ·   "), font: doc.FONT, size: 22, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 2 — Critério de correção da questão de caso", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "a) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Ativação inicial — o aumento paradoxal de ansiedade/agitação típico das primeiras 1-2 semanas de uso de ISRS.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "b) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Orientar contra interrupção abrupta por conta própria, e que essa decisão deve ser conversada com o psiquiatra o quanto antes.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "c) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Investigar ativamente presença de ideação suicida, dado que a janela de ativação inicial é um período de risco elevado — considerar aplicar C-SSRS.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "d) ", bold: true, font: doc.FONT, size: 21, color: doc.INK }), new doc.TextRun({ text: "Comunicar de forma objetiva o tempo de uso, os sintomas relatados, o resultado da investigação de risco, e a urgência apropriada, sem opinar sobre ajuste de dose.", font: doc.FONT, size: 21, color: doc.INK })] }),
  );

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-3.2-Avaliacao.docx");
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
      n: 1, titulo: "Mecanismo, tempo de resposta e efeitos na sessão", duracao: "12 min", slides: "1, 2, 3, 4",
      objetivo: "Sair sabendo explicar por que o efeito antidepressivo não é imediato, sem jargão técnico.",
      segmentos: [
        seg("0:00–0:45", "Abertura (gancho)", [{ fala: "Um paciente que começa antidepressivo hoje não vai melhorar amanhã — e explicar isso com precisão, antes que a decepção bata, é uma das intervenções mais simples e mais esquecidas da prática clínica." }]),
        seg("0:45–2:00", "Por que isso importa", ["Não é sobre escolher qual prescrever — é sobre calibrar expectativa e reconhecer efeito relevante na sessão."]),
        seg("2:00–8:00", "O que os antidepressivos alteram (mostrar slide 4)", [
          "Recaptação de serotonina: alvo mais comum dos ISRS.",
          "Recaptação de serotonina e noradrenalina: IRSN, ação dupla.",
          "Múltiplos neurotransmissores: tricíclicos, perfil mais amplo.",
          "Neuroplasticidade: crescimento sináptico ao longo de semanas.",
        ]),
        seg("8:00–10:30", "Um ponto importante", ["A mudança química inicial já ocorre no primeiro dia — a melhora clínica depende de algo mais lento."]),
        seg("10:30–12:00", "Fechamento", [{ fala: "Próxima aula: do início do fármaco à resposta clínica plena." }]),
      ],
    },
    {
      n: 2, titulo: "Do início do fármaco à resposta clínica plena", duracao: "10 min", slides: "5",
      objetivo: "Explicar a cadeia entre início da medicação, janela de ativação e resposta plena.",
      segmentos: [
        seg("0:00–1:00", "Retomada rápida", ["Vimos o mecanismo. Hoje vemos a linha do tempo completa da resposta."]),
        seg("1:00–6:30", "A cadeia (mostrar slide 5)", ["Início da medicação: mudança química imediata, sem melhora perceptível.", "Janela de ativação inicial: primeiras 1-2 semanas, risco de ansiedade.", "Mudanças plásticas em curso: crescimento sináptico gradual.", "Resposta clínica plena: geralmente entre 4 e 8 semanas."]),
        seg("6:30–9:00", "Um ponto importante", ["A janela de ativação inicial é o período de maior risco de abandono precoce do tratamento."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: as 3 grandes classes de antidepressivos." }]),
      ],
    },
    {
      n: 3, titulo: "As 3 classes e os efeitos na sessão", duracao: "12 min", slides: "6, 7",
      objetivo: "Reconhecer as 3 classes de antidepressivos e os efeitos mais relevantes de observar na sessão.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três classes — e os efeitos que mais aparecem no consultório."]),
        seg("1:00–6:00", "As 3 classes (mostrar slide 6)", [
          "ISRS: primeira linha mais comum.",
          "IRSN: ação dupla, quadros mistos.",
          "Tricíclicos e atípicos: indicações mais direcionadas.",
        ]),
        seg("6:00–10:30", "Efeitos na sessão (mostrar slide 7)", [
          "Ativação inicial: aumento de ansiedade nas primeiras semanas.",
          "Achatamento afetivo: comum com uso prolongado.",
          "Efeitos colaterais físicos.",
          "Latência terapêutica: ausência de melhora perceptível inicial.",
        ]),
        seg("10:30–12:00", "Fechamento", [{ fala: "Próxima aula: diferenciando efeito esperado de sinal de alerta." }]),
      ],
    },
    {
      n: 4, titulo: "Efeito esperado versus sinal de alerta", duracao: "11 min", slides: "8, 9",
      objetivo: "Diferenciar efeitos transitórios de sinais que exigem comunicação imediata, e conhecer os instrumentos de acompanhamento.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Um filtro rápido — essencial pra saber quando apenas observar e quando agir."]),
        seg("1:00–6:00", "Os 3 cenários (mostrar slide 8)", [
          "Efeito esperado e transitório: geralmente resolve sozinho.",
          "Ativação a monitorar de perto: sobretudo em jovens.",
          "Sinal de alerta a comunicar: piora do humor, ideação nova.",
        ]),
        seg("6:00–10:00", "Como acompanhar (mostrar slide 9)", [
          "Escalas seriadas: documentam evolução real.",
          "C-SSRS: monitoramento de risco na janela inicial.",
          "Diário de efeitos: diferencia transitório de persistente.",
        ]),
        seg("10:00–11:00", "Fechamento", [{ fala: "Próxima aula: colocamos tudo em prática — confirmar a classe e calibrar expectativa." }]),
      ],
    },
    {
      n: 5, titulo: "Aplicação — confirmar a classe e calibrar expectativa", duracao: "13 min", slides: "10, 11",
      objetivo: "Aplicar os passos 1 e 2 do modelo de acompanhamento.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["A parte mais prática desse módulo. Hoje, os 2 primeiros passos."]),
        seg("1:00–2:00", "Visão geral (mostrar slide 10)", ["Confirmar a classe usada → Calibrar expectativa → Monitorar a janela inicial → Reconhecer achatamento afetivo."]),
        seg("2:00–7:00", "Passo 1 — Confirmar a classe usada (mostrar slide 11, esquerda)", ["Pergunte diretamente qual medicação e há quanto tempo.", "Anote no prontuário como dado relevante de contexto."]),
        seg("7:00–12:00", "Passo 2 — Calibrar expectativa (mostrar slide 11, direita)", [{ fala: "O efeito completo costuma levar de 4 a 8 semanas — não é sinal de que não está funcionando se você ainda não sentir mudança agora." }]),
        seg("12:00–13:00", "Fechamento", [{ fala: "Próxima aula: monitorar a janela inicial e reconhecer achatamento afetivo." }]),
      ],
    },
    {
      n: 6, titulo: "Aplicação — monitorar e reconhecer efeitos", duracao: "11 min", slides: "12",
      objetivo: "Trabalhar monitoramento da janela inicial e reconhecimento de achatamento afetivo.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Hoje fechamos o modelo com os 2 últimos passos, ligados diretamente ao acompanhamento contínuo."]),
        seg("1:00–6:00", "Passo 3 — Monitorar a janela inicial (mostrar slide 12, esquerda)", ["Pergunte ativamente sobre aumento de ansiedade ou agitação.", "Reforce que isso deve ser comunicado ao psiquiatra."]),
        seg("6:00–10:00", "Passo 4 — Reconhecer achatamento afetivo (mostrar slide 12, direita)", ["Pergunte especificamente sobre a amplitude emocional.", "Comunique se estiver impactando a qualidade de vida."]),
        seg("10:00–11:00", "Fechamento", [{ fala: "Modelo completo. Próxima aula: um caso real e os critérios de quando escalar." }]),
      ],
    },
    {
      n: 7, titulo: "Estudo de caso, encaminhamento e recap", duracao: "14 min", slides: "13, 14, 15",
      objetivo: "Integrar todo o módulo num caso completo, com ênfase na vigilância da janela de ativação inicial.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Última aula do módulo. Caso completo e os critérios de quando encaminhar."]),
        seg("1:00–6:00", "Estudo de caso (mostrar slide 13)", ["Leia a vinheta com calma.", "Percorra as 3 perguntas de discussão.", "Convide o aluno a pausar e responder por escrito."]),
        seg("6:00–10:00", "Quando encaminhar (mostrar slide 14)", ["Percorra os 4 critérios, com atenção especial a sinais na janela de ativação inicial."]),
        seg("10:00–13:00", "Recapitulando o módulo (mostrar slide 15)", ["Retome os 4 pontos-chave.", "Reforce que calibrar expectativa desde o início previne boa parte do abandono precoce."]),
        seg("13:00–14:00", "Fechamento do módulo", [{ fala: "Agora é hora dos exercícios e da avaliação. Te vejo no próximo módulo do Bloco 3." }]),
      ],
    },
  ];

  const totalMin = 12 + 10 + 12 + 11 + 13 + 11 + 14;

  const children = [
    ...doc.capa(KICKER, "Roteiro de Aulas — Antidepressivos", "Módulo dividido em 7 vídeo-aulas de 10 a 15 minutos, seguindo os slides já produzidos. Cada aula tem roteiro cronometrado, pronto pra gravação."),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "Duração total do módulo em vídeo: ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: `${totalMin} minutos (${(totalMin / 60).toFixed(1)}h) em 7 aulas`, font: doc.FONT, size: 21, color: doc.INK })] }),
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

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", `${RODAPE_DOC} — Roteiro de Aulas`, children), "Modulo-3.2-Roteiro-Aulas.docx");
}

// ============================================================
Promise.resolve()
  .then(construirDeck)
  .then(construirExercicios)
  .then(construirProva)
  .then(construirRoteiro)
  .then(() => console.log("TUDO PRONTO"))
  .catch((e) => { console.error(e); process.exit(1); });

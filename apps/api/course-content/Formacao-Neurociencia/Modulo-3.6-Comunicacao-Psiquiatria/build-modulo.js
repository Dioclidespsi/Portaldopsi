const deck = require("../_lib/lib-deck.js");
const doc = require("../_lib/lib-doc.js");

const MOD = "3.6";
const NOME = "Comunicação com a Psiquiatria";
const RODAPE_DECK = `Comunicação com a Psiquiatria — Módulo ${MOD}`;
const RODAPE_DOC = `Módulo ${MOD} — Comunicação com a Psiquiatria`;
const KICKER = "MÓDULO 3.6 · FARMACOLOGIA APLICADA À PSICOTERAPIA";

// ============================================================
// 1) SLIDE DECK
// ============================================================
function construirDeck() {
  const pres = deck.novaApresentacao(`${NOME} — Fechando o Ciclo do Bloco 3`);

  deck.slideTitulo(pres, {
    moduloLabel: `Módulo ${MOD} · Bloco 3 · Farmacologia`,
    titulo: "Diálogo com a Psiquiatria",
    subtitulo: "Quando e como encaminhar, sem invadir o campo médico nem abrir mão do seu papel",
    passos: ["Quando", "Como", "Adesão", "Efeitos colaterais", "Aplicação"],
  });

  deck.slideRoteiro(pres, {
    rodape: RODAPE_DECK, pageNum: 2,
    cards: [
      { titulo: "Quando encaminhar", desc: "Critérios gerais que sintetizam todo o Bloco 3" },
      { titulo: "Como encaminhar", desc: "Escolhendo o canal certo pra cada situação" },
      { titulo: "Diálogo sobre adesão", desc: "Como abordar sem julgamento" },
      { titulo: "Diálogo sobre efeitos", desc: "Comunicar sem interpretar como se fosse médico" },
      { titulo: "Aplicação", desc: "O fechamento do ciclo completo do Bloco 3" },
    ],
  });

  deck.slideHook(pres, {
    rodape: RODAPE_DECK, pageNum: 3,
    frase: "Uma boa comunicação com a psiquiatria não acontece por acaso — ela depende de linguagem técnica precisa, limites claros, e saber exatamente o que comunicar e o que não é seu papel dizer.",
    apoio: "Este módulo fecha o Bloco 3 reunindo, numa única habilidade prática, tudo que os módulos anteriores construíram sobre reconhecer sinais farmacológicos relevantes.",
  });

  deck.slideCircuito(pres, {
    rodape: RODAPE_DECK, pageNum: 4,
    titulo: "4 elementos de uma comunicação técnica eficaz",
    regioes: [
      { label: "Objetividade (fatos observáveis, não interpretações)", rx: 0.20, ry: 0.22, color: deck.NAVY, d: 0.5 },
      { label: "Contexto temporal (quando o sintoma começou em relação à medicação)", rx: 0.22, ry: 0.62, color: deck.TERRA, d: 0.4 },
      { label: "Consentimento do paciente (sempre que possível, antes do contato)", rx: 0.60, ry: 0.60, color: deck.NAVY_TINT, d: 0.36 },
      { label: "Linguagem compartilhada (termos que ambos os profissionais entendem)", rx: 0.58, ry: 0.24, color: deck.TERRA_TINT, d: 0.36 },
    ],
    notas: [
      "Objetividade significa relatar o que foi observado e dito, sem incluir conclusões diagnósticas que são de competência médica.",
      "Contexto temporal preciso — data de início do sintoma em relação ao início ou ajuste da medicação — é frequentemente o dado mais útil pro psiquiatra.",
      "Consentimento do paciente pro contato entre profissionais deve ser buscado sempre que a situação não for de risco imediato.",
    ],
  });

  deck.slideCadeia(pres, {
    rodape: RODAPE_DECK, pageNum: 5,
    titulo: "Do sinal na sessão à ação coordenada",
    elos: [
      { titulo: "Sinal relevante observado", desc: "Reconhecido com base no repertório construído ao longo do Bloco 3" },
      { titulo: "Documentação objetiva", desc: "Fatos, datas e contexto, sem interpretação diagnóstica" },
      { titulo: "Comunicação estruturada", desc: "Pelo canal apropriado à urgência da situação" },
      { titulo: "Ação coordenada", desc: "Entre psicólogo e psiquiatra, cada um dentro de sua competência" },
    ],
    notaFinal: "Essa cadeia resume, na prática, o objetivo de todo o Bloco 3 — não pra prescrever, mas pra que essa coordenação aconteça de forma fluida e eficaz.",
  });

  deck.slideCategorias(pres, {
    rodape: RODAPE_DECK, pageNum: 6,
    titulo: "3 situações de comunicação",
    categorias: [
      { titulo: "Comunicação de rotina", desc: "Atualização periódica sobre evolução, sem urgência", color: deck.NAVY },
      { titulo: "Comunicação de alerta", desc: "Sinal relevante identificado, não emergencial", color: deck.TERRA },
      { titulo: "Comunicação de urgência", desc: "Risco identificado, exige ação imediata e contato direto", color: deck.NAVY_TINT },
    ],
    notaFinal: "O canal de comunicação (carta, relatório, contato direto) deve corresponder à urgência real da situação — usar o canal errado é um erro técnico comum.",
  });

  deck.slideSinais(pres, {
    rodape: RODAPE_DECK, pageNum: 7,
    titulo: "Critérios gerais de quando encaminhar",
    itens: [
      { titulo: "Mudança significativa de sintomas", desc: "Que coincide temporalmente com início ou ajuste de medicação" },
      { titulo: "Dúvida sobre efeito colateral", desc: "Relatado pelo paciente, sem clareza se é esperado ou preocupante" },
      { titulo: "Sinais de risco", desc: "Sempre prioritários, independente de qualquer outro critério" },
      { titulo: "Adesão comprometida", desc: "Por desinformação, efeitos colaterais ou crenças sobre a medicação" },
    ],
  });

  deck.slideDiferencial(pres, {
    rodape: RODAPE_DECK, pageNum: 8,
    titulo: "Escolhendo o canal certo",
    cards: [
      { titulo: "Contato direto e imediato", desc: "Situações de risco ou urgência clínica clara" },
      { titulo: "Paciente leva a dúvida", desc: "Questões que o próprio paciente pode e deve discutir com o psiquiatra" },
      { titulo: "Documentar e aguardar", desc: "Sinais de rotina, sem urgência, pra próxima consulta já agendada" },
    ],
  });

  deck.slideInstrumentos(pres, {
    rodape: RODAPE_DECK, pageNum: 9,
    titulo: "Modelos de comunicação estruturada",
    instrumentos: [
      { sigla: "Carta de encaminhamento", nome: "Comunicação formal e estruturada", desc: "Pra situações que exigem registro claro e detalhado." },
      { sigla: "Contato direto", nome: "Telefone ou mensagem urgente", desc: "Reservado pra situações de risco ou urgência clínica." },
      { sigla: "Relatório periódico", nome: "Atualização de rotina", desc: "Resume evolução ao longo de um período, sem urgência." },
    ],
  });

  deck.slideProtocoloOverview(pres, {
    rodape: RODAPE_DECK, pageNum: 10,
    titulo: "Da observação à ação coordenada: 4 passos",
    passos: [
      { titulo: "Preparar a\ncomunicação", desc: "Separar fato de interpretação antes de escrever ou falar" },
      { titulo: "Obter\nconsentimento", desc: "Do paciente, sempre que a situação permitir" },
      { titulo: "Escolher o\ncanal certo", desc: "Urgência, alerta ou rotina, conforme a gravidade real" },
      { titulo: "Fechar o\nciclo", desc: "Registrar o que foi comunicado e a resposta recebida" },
    ],
    notaFinal: "Esse é o fio condutor final do Bloco 3 — reconhecer, documentar, comunicar e fechar o ciclo, sempre dentro dos limites da própria competência.",
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 11,
    titulo: "Passos 1 e 2, na prática",
    colunas: [
      {
        numero: 1, titulo: "Preparar a comunicação",
        bullets: ["Separe claramente o que foi observado/relatado do que seria uma conclusão diagnóstica", "Inclua data de início do sintoma em relação à medicação, quando relevante"],
      },
      {
        numero: 2, titulo: "Obter consentimento",
        fala: "“Gostaria de compartilhar isso com seu psiquiatra pra alinharmos o cuidado — você concorda?”",
        bullets: ["Busque consentimento explícito sempre que a situação não for de risco imediato"],
      },
    ],
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 12,
    titulo: "Passos 3 e 4, na prática",
    colunas: [
      {
        numero: 3, titulo: "Escolher o canal certo",
        bullets: ["Risco ou urgência clínica: contato direto e imediato", "Situação de rotina: relatório periódico ou carta estruturada"],
      },
      {
        numero: 4, titulo: "Fechar o ciclo",
        bullets: ["Registre o que foi comunicado, quando, e qual foi a resposta ou orientação recebida", "Isso sustenta a continuidade do cuidado, mesmo entre diferentes profissionais ao longo do tempo"],
      },
    ],
  });

  deck.slideCaso(pres, {
    rodape: RODAPE_DECK, pageNum: 13,
    vinheta: "Um paciente relata, numa sessão de rotina, que \"tem sentido mais sono do que o normal\" desde que o psiquiatra aumentou a dose de um medicamento há 2 semanas, mas diz que \"não é nada grave\" e não pretende mencionar isso na próxima consulta, que só ocorrerá em 6 semanas.",
    perguntas: [
      "Que tipo de comunicação (rotina, alerta ou urgência) essa situação exige?",
      "Que canal você escolheria pra essa comunicação específica?",
      "Como você abordaria a relutância do paciente em mencionar isso na consulta médica?",
    ],
  });

  deck.slideEncaminhamento(pres, {
    rodape: RODAPE_DECK, pageNum: 14,
    criterios: [
      "Qualquer sinal de risco identificado: sempre contato direto e imediato, nunca apenas registro passivo",
      "Dúvida recorrente sobre limites de competência: buscar supervisão antes de agir",
      "Paciente resistente a autorizar comunicação, mesmo diante de sinal relevante: reavaliar com cuidado, sem violar autonomia desnecessariamente",
      "Ausência de resposta do psiquiatra em situação de alerta: buscar canal alternativo ou orientar o paciente a buscar atendimento direto",
    ],
  });

  deck.slideRecap(pres, {
    rodape: RODAPE_DECK, pageNum: 15,
    pontos: [
      "Objetividade, contexto temporal, consentimento e linguagem compartilhada sustentam qualquer comunicação técnica eficaz",
      "Comunicação de rotina, de alerta e de urgência exigem canais diferentes — usar o canal errado é um erro técnico comum",
      "Critérios claros de quando encaminhar sintetizam o que foi construído ao longo de todo o Bloco 3",
      "Esse módulo fecha o ciclo: reconhecer, documentar, comunicar e fechar — sempre dentro dos limites da própria competência",
    ],
    proximoTexto: "Módulo 3.6 concluído — fim do Bloco 3 (Farmacologia) →",
  });

  return pres.writeFile({ fileName: "Modulo-3.6-Comunicacao-Psiquiatria.pptx" });
}

// ============================================================
// 2) EXERCÍCIOS
// ============================================================
function construirExercicios() {
  const children = [
    ...doc.capa(KICKER, "Exercícios — Comunicação com a Psiquiatria", "Resolva individualmente antes da sessão de supervisão. O objetivo é testar sua leitura prática antes de comparar com a discussão em grupo — não há problema em errar."),

    doc.exNum(1, "Os 4 elementos, em suas palavras"),
    doc.pergunta(1, "Explique em uma frase cada elemento: objetividade, contexto temporal, consentimento, linguagem compartilhada."),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Por que usar o canal errado de comunicação (ex: aguardar quando a situação é de risco) é um erro técnico?"),
    ...doc.linhaResposta(2),

    doc.exNum(2, "Escolhendo o canal certo"),
    doc.tabelaSimples(["Situação", "Canal apropriado"], [["Sinal de risco identificado", ""], ["Dúvida que o próprio paciente pode discutir na consulta", ""], ["Atualização de rotina sem urgência", ""]], [5600, 3550]),

    doc.exNum(3, "Preparando a comunicação"),
    doc.vinhetaBox("Você quer comunicar ao psiquiatra que \"acho que o paciente está tendo um efeito colateral do remédio novo\"."),
    doc.pergunta(1, "Reescreva essa comunicação separando fato observável de interpretação diagnóstica."),
    ...doc.linhaResposta(3),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),

    doc.exNum(4, "Caso integrado"),
    doc.vinhetaBox("Um paciente relata mais sono do que o normal desde um aumento de dose há 2 semanas, mas diz que \"não é nada grave\" e não pretende mencionar isso na próxima consulta, que só ocorre em 6 semanas."),
    doc.pergunta(1, "Que tipo de comunicação essa situação exige?"),
    ...doc.linhaResposta(1),
    doc.pergunta(2, "Que canal você escolheria?"),
    ...doc.linhaResposta(1),
    doc.pergunta(3, "Como você abordaria a relutância do paciente em mencionar isso?"),
    ...doc.linhaResposta(2),
  ];

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-3.6-Exercicios.docx");
}

// ============================================================
// 3) AVALIAÇÃO
// ============================================================
function construirProva() {
  const objetivas = [
    ["Os 4 elementos de uma comunicação técnica eficaz são:", ["Objetividade, contexto temporal, consentimento, linguagem compartilhada", "Grandiosidade, necessidade de admiração, falta de empatia, impulsividade", "Sintomas nucleares, duração mínima, prejuízo funcional, exclusão de causas", "Serotonina, dopamina, GABA, glutamato"]],
    ["As 3 situações de comunicação estudadas são:", ["Comunicação de rotina, de alerta, de urgência", "Comunicação verbal, escrita, e não-verbal exclusivamente", "Comunicação exclusivamente por e-mail, telefone e presencial", "Nenhuma categoria específica é definida no módulo"]],
    ["Diante de risco identificado, o canal de comunicação recomendado é:", ["Contato direto e imediato, nunca apenas registro passivo", "Relatório periódico de rotina, sem qualquer urgência", "Carta de encaminhamento formal, sem prazo definido", "Aguardar a próxima consulta já agendada, independente do prazo"]],
    ["O passo \"preparar a comunicação\" recomenda:", ["Separar claramente fato observável de conclusão diagnóstica", "Misturar livremente opinião pessoal e fato observado", "Evitar qualquer menção à data de início do sintoma", "Utilizar exclusivamente linguagem técnica incompreensível pro paciente"]],
    ["Consentimento do paciente pro contato entre profissionais deve ser buscado:", ["Sempre que a situação não for de risco imediato", "Nunca, independente da situação", "Apenas em situações de comunicação de rotina", "Apenas quando o psiquiatra solicitar explicitamente"]],
    ["O passo \"fechar o ciclo\" recomenda:", ["Registrar o que foi comunicado e a resposta recebida", "Nunca documentar qualquer comunicação realizada", "Interromper o acompanhamento após qualquer comunicação com a psiquiatria", "Ignorar completamente a resposta recebida do psiquiatra"]],
    ["Diante de dúvida que o próprio paciente pode discutir na consulta médica, o módulo recomenda:", ["Orientar o paciente a levar a dúvida diretamente pro psiquiatra", "Sempre fazer contato direto com o psiquiatra, mesmo sem urgência", "Ignorar completamente a dúvida do paciente", "Responder diretamente à dúvida médica no lugar do psiquiatra"]],
    ["Contexto temporal preciso, na comunicação com a psiquiatria, se refere a:", ["A data de início do sintoma em relação ao início ou ajuste da medicação", "Apenas o horário exato da sessão de terapia", "Informação irrelevante pra qualquer comunicação médica", "Um dado que nunca deve ser incluído na comunicação"]],
    ["Diante de ausência de resposta do psiquiatra em situação de alerta, o módulo recomenda:", ["Buscar canal alternativo ou orientar o paciente a buscar atendimento direto", "Aguardar indefinidamente sem qualquer ação adicional", "Assumir que a situação se resolveu sozinha", "Interromper todo o acompanhamento psicológico"]],
    ["Este módulo, segundo o material, serve como:", ["Fechamento do ciclo completo do Bloco 3, reunindo tudo que foi construído sobre reconhecimento de sinais", "Uma introdução isolada, sem relação com os módulos anteriores do Bloco 3", "Um substituto completo pra qualquer formação médica", "Uma exceção às regras de comunicação estudadas nos módulos anteriores"]],
  ];
  const gabaritoObjetivas = ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a"];

  const children = [
    ...doc.capa(KICKER, "Avaliação — Comunicação com a Psiquiatria", `Avaliação formativa de encerramento do Módulo ${MOD}.`),
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
    doc.vinhetaBox("Um paciente relata, numa sessão, pensamentos de desesperança que surgiram na última semana, coincidindo com uma troca recente de antidepressivo feita pelo psiquiatra. Ele autoriza você a entrar em contato, mas a próxima consulta médica já agendada é só daqui a 3 semanas."),
    new doc.Paragraph({ spacing: { before: 240 }, children: [new doc.TextRun({ text: "Com base no protocolo estudado, responda:", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    new doc.Paragraph({ spacing: { before: 220, after: 40 }, children: [new doc.TextRun({ text: "a) (10 pts) Que tipo de comunicação essa situação exige, considerando o conteúdo relatado?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "b) (10 pts) Que outro protocolo deste curso deve ser ativado imediatamente, antes de qualquer comunicação externa?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "c) (10 pts) Que canal de comunicação você escolheria com o psiquiatra, dado o prazo da próxima consulta?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "d) (10 pts) Que informação de contexto temporal seria essencial incluir nessa comunicação?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    new doc.Paragraph({ spacing: { after: 40 }, children: [new doc.TextRun({ text: "USO EXCLUSIVO DO INSTRUTOR — remover antes de aplicar a prova", bold: true, color: doc.TERRA, font: doc.FONT, size: 20 })] }),
    doc.tituloH1("Gabarito"),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 1 — Questões objetivas", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 200 }, children: [new doc.TextRun({ text: gabaritoObjetivas.map((r, i) => `${i + 1}-${r}`).join("   ·   "), font: doc.FONT, size: 22, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 2 — Critério de correção da questão de caso", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "a) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Comunicação de urgência — pensamentos de desesperança nova, temporalmente ligados a troca de medicação, são um sinal de risco que exige contato direto e imediato.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "b) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "O protocolo do Módulo 4.9 (Ideação Suicida e Risco de Suicídio) — avaliação de risco formal sempre vem primeiro, antes de qualquer outra ação.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "c) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Contato direto e imediato (telefone ou mensagem urgente), dado que 3 semanas é tempo demais pra um sinal de risco esperar a consulta já agendada.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "d) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "A data exata da troca de antidepressivo e a data em que os pensamentos de desesperança começaram a aparecer, pra estabelecer a relação temporal entre os dois eventos.", font: doc.FONT, size: 21, color: doc.INK })] }),
  );

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-3.6-Avaliacao.docx");
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
      n: 1, titulo: "Fechando o ciclo do Bloco 3", duracao: "12 min", slides: "1, 2, 3, 4",
      objetivo: "Sair sabendo explicar os 4 elementos de comunicação técnica eficaz sem jargão técnico.",
      segmentos: [
        seg("0:00–0:45", "Abertura (gancho)", [{ fala: "Uma boa comunicação com a psiquiatria não acontece por acaso — ela depende de linguagem técnica precisa, limites claros, e saber exatamente o que comunicar e o que não é seu papel dizer." }]),
        seg("0:45–2:00", "Por que isso importa", ["Este módulo fecha o Bloco 3, reunindo tudo que foi construído sobre reconhecer sinais relevantes."]),
        seg("2:00–8:00", "Os 4 elementos (mostrar slide 4)", [
          "Objetividade: fatos observáveis, não interpretações.",
          "Contexto temporal: quando o sintoma começou em relação à medicação.",
          "Consentimento do paciente: sempre que possível.",
          "Linguagem compartilhada: termos que ambos entendem.",
        ]),
        seg("8:00–10:30", "Um ponto importante", ["Contexto temporal preciso é frequentemente o dado mais útil pro psiquiatra."]),
        seg("10:30–12:00", "Fechamento", [{ fala: "Próxima aula: do sinal na sessão à ação coordenada." }]),
      ],
    },
    {
      n: 2, titulo: "Do sinal na sessão à ação coordenada", duracao: "10 min", slides: "5, 6",
      objetivo: "Explicar a cadeia entre sinal observado e ação coordenada, e as 3 situações de comunicação.",
      segmentos: [
        seg("0:00–1:00", "Retomada rápida", ["Vimos os elementos. Hoje vemos como eles se conectam num fluxo completo."]),
        seg("1:00–5:00", "A cadeia (mostrar slide 5)", ["Sinal relevante observado.", "Documentação objetiva.", "Comunicação estruturada.", "Ação coordenada."]),
        seg("5:00–9:00", "As 3 situações (mostrar slide 6)", ["Comunicação de rotina: sem urgência.", "Comunicação de alerta: sinal relevante, não emergencial.", "Comunicação de urgência: risco, ação imediata."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: os critérios gerais de quando encaminhar." }]),
      ],
    },
    {
      n: 3, titulo: "Critérios de quando encaminhar e como escolher o canal", duracao: "13 min", slides: "7, 8, 9",
      objetivo: "Sintetizar critérios de encaminhamento e escolha de canal de comunicação.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Uma síntese de tudo que vimos ao longo do Bloco 3 sobre quando agir."]),
        seg("1:00–5:00", "Critérios gerais (mostrar slide 7)", [
          "Mudança significativa de sintomas.",
          "Dúvida sobre efeito colateral.",
          "Sinais de risco: sempre prioritários.",
          "Adesão comprometida.",
        ]),
        seg("5:00–9:00", "Escolhendo o canal (mostrar slide 8)", [
          "Contato direto e imediato: situações de risco.",
          "Paciente leva a dúvida: questões que ele mesmo pode discutir.",
          "Documentar e aguardar: sinais de rotina.",
        ]),
        seg("9:00–12:30", "Modelos de comunicação (mostrar slide 9)", [
          "Carta de encaminhamento: registro claro e detalhado.",
          "Contato direto: risco ou urgência clínica.",
          "Relatório periódico: atualização de rotina.",
        ]),
        seg("12:30–13:00", "Fechamento", [{ fala: "Próxima aula: colocamos tudo em prática, do primeiro ao último passo." }]),
      ],
    },
    {
      n: 4, titulo: "Aplicação — preparar, consentir, escolher e fechar o ciclo", duracao: "13 min", slides: "10, 11, 12",
      objetivo: "Aplicar os 4 passos completos do modelo de comunicação responsável.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["A parte mais prática desse módulo — os 4 passos completos, numa só aula."]),
        seg("1:00–2:00", "Visão geral (mostrar slide 10)", ["Preparar a comunicação → Obter consentimento → Escolher o canal certo → Fechar o ciclo."]),
        seg("2:00–6:00", "Passos 1 e 2 (mostrar slide 11)", ["Separe fato de interpretação.", { fala: "Gostaria de compartilhar isso com seu psiquiatra pra alinharmos o cuidado — você concorda?" }]),
        seg("6:00–10:00", "Passos 3 e 4 (mostrar slide 12)", ["Risco: contato direto. Rotina: relatório periódico.", "Registre o que foi comunicado e a resposta recebida."]),
        seg("10:00–13:00", "Fechamento", [{ fala: "Modelo completo. Próxima aula: um caso real e o fechamento de todo o Bloco 3." }]),
      ],
    },
    {
      n: 5, titulo: "Estudo de caso, encaminhamento e recap final do bloco", duracao: "15 min", slides: "13, 14, 15",
      objetivo: "Integrar todo o módulo num caso completo, encerrando o Bloco 3 inteiro.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Última aula do módulo — e do Bloco 3 inteiro. Caso completo pra fechar com prática real."]),
        seg("1:00–7:00", "Estudo de caso (mostrar slide 13)", ["Leia a vinheta com calma.", "Percorra as 3 perguntas de discussão.", "Convide o aluno a pausar e responder por escrito."]),
        seg("7:00–11:00", "Quando escalar (mostrar slide 14)", ["Percorra os 4 critérios, com atenção especial a situações de risco sempre exigindo contato direto."]),
        seg("11:00–14:00", "Recapitulando o módulo e o bloco (mostrar slide 15)", ["Retome os 4 pontos-chave.", "Reforce que esse módulo fecha o ciclo completo do Bloco 3."]),
        seg("14:00–15:00", "Fechamento do módulo e do bloco", [{ fala: "Agora é hora dos exercícios e da avaliação. Com isso, encerramos o Bloco 3 completo de Farmacologia." }]),
      ],
    },
  ];

  const totalMin = 12 + 10 + 13 + 13 + 15;

  const children = [
    ...doc.capa(KICKER, "Roteiro de Aulas — Comunicação com a Psiquiatria", "Módulo dividido em 5 vídeo-aulas de 10 a 15 minutos, seguindo os slides já produzidos. Cada aula tem roteiro cronometrado, pronto pra gravação."),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "Duração total do módulo em vídeo: ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: `${totalMin} minutos (${(totalMin / 60).toFixed(1)}h) em 5 aulas`, font: doc.FONT, size: 21, color: doc.INK })] }),
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

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", `${RODAPE_DOC} — Roteiro de Aulas`, children), "Modulo-3.6-Roteiro-Aulas.docx");
}

// ============================================================
Promise.resolve()
  .then(construirDeck)
  .then(construirExercicios)
  .then(construirProva)
  .then(construirRoteiro)
  .then(() => console.log("TUDO PRONTO"))
  .catch((e) => { console.error(e); process.exit(1); });

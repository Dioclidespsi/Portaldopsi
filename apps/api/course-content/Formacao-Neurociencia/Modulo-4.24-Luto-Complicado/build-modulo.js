const deck = require("../_lib/lib-deck.js");
const doc = require("../_lib/lib-doc.js");

const MOD = "4.24";
const NOME = "Luto Complicado";
const RODAPE_DECK = `Luto Complicado — Módulo ${MOD}`;
const RODAPE_DOC = `Módulo ${MOD} — Luto Complicado`;
const KICKER = "MÓDULO 4.24 · PROTOCOLOS CLÍNICOS";

// ============================================================
// 1) SLIDE DECK
// ============================================================
function construirDeck() {
  const pres = deck.novaApresentacao(`${NOME} — Da Neurociência ao Protocolo Clínico`);

  deck.slideTitulo(pres, {
    moduloLabel: `Módulo ${MOD} · Protocolos Clínicos`,
    titulo: "Luto Complicado",
    subtitulo: "Quando a saudade não segue a trajetória esperada",
    passos: ["Mecanismo", "Sinais", "Instrumento", "Protocolo", "Encaminhamento"],
  });

  deck.slideRoteiro(pres, {
    rodape: RODAPE_DECK, pageNum: 2,
    cards: [
      { titulo: "Mecanismo", desc: "Por que o cérebro continua \"esperando\" quem partiu" },
      { titulo: "Sinais", desc: "Quando o luto deixa de seguir sua trajetória esperada" },
      { titulo: "Instrumento", desc: "ICG/PG-13 e o critério de tempo do DSM-5-TR" },
      { titulo: "Protocolo", desc: "4 passos, sem apressar nem patologizar a dor" },
      { titulo: "Encaminhamento", desc: "Risco de suicídio e sobreposição com TEPT" },
    ],
  });

  deck.slideHook(pres, {
    rodape: RODAPE_DECK, pageNum: 3,
    frase: "Parte do cérebro continua \"esperando\" a pessoa que partiu — é por isso que o luto dói tanto, e por isso que, pra uma parte das pessoas, essa espera nunca se atualiza sozinha.",
    apoio: "O objetivo do protocolo nunca é apressar o luto ou fazer a pessoa \"superar\" — é reconhecer quando o processo natural encontrou um obstáculo e precisa de ajuda pra seguir.",
  });

  deck.slideCircuito(pres, {
    rodape: RODAPE_DECK, pageNum: 4,
    titulo: "Por que a saudade se comporta como um tipo de fissura",
    regioes: [
      { label: "Sistema de recompensa (ativado por lembranças, de forma similar ao craving)", rx: 0.20, ry: 0.22, color: deck.TERRA, d: 0.5 },
      { label: "Circuito de dor social (hiperativado por lembranças da perda)", rx: 0.22, ry: 0.62, color: deck.NAVY, d: 0.4 },
      { label: "Sistema de apego (representação implícita de vínculo contínuo)", rx: 0.60, ry: 0.60, color: deck.NAVY_TINT, d: 0.36 },
      { label: "Atualização de crenças (conflito entre apego contínuo e realidade da perda)", rx: 0.58, ry: 0.24, color: deck.TERRA_TINT, d: 0.36 },
    ],
    notas: [
      "O sistema de recompensa é ativado por lembranças da pessoa falecida de forma parecida ao craving — o que explica a intensidade da saudade.",
      "O circuito de dor social, o mesmo envolvido em rejeição e exclusão, fica hiperativado diante de lembranças da perda.",
      "O sistema de apego mantém uma representação implícita de vínculo contínuo, que entra em conflito direto com a atualização cognitiva da realidade da perda.",
    ],
  });

  deck.slideCadeia(pres, {
    rodape: RODAPE_DECK, pageNum: 5,
    titulo: "Do processo natural ao luto que não se resolve",
    elos: [
      { titulo: "Perda de uma figura de apego", desc: "Início do processo natural de luto, com ondas de sofrimento e adaptação" },
      { titulo: "Obstáculos ao processamento", desc: "Apego ambivalente, morte súbita ou traumática, falta de suporte social" },
      { titulo: "Processo interrompido", desc: "O luto permanece intenso além do período esperado de adaptação" },
      { titulo: "Luto Prolongado", desc: "Critério formal do DSM-5-TR: 12 meses pra adultos, com prejuízo funcional" },
    ],
    notaFinal: "A maioria das pessoas em luto não desenvolve esse quadro — o protocolo é pra quando obstáculos específicos impedem o processo natural de seguir seu curso.",
  });

  deck.slideCategorias(pres, {
    rodape: RODAPE_DECK, pageNum: 6,
    titulo: "3 traços centrais",
    categorias: [
      { titulo: "Saudade intensa e persistente", desc: "Ou preocupação constante com a pessoa falecida", color: deck.NAVY },
      { titulo: "Dor emocional intensa", desc: "Raiva, culpa ou negação que não se atenuam com o tempo esperado", color: deck.TERRA },
      { titulo: "Dificuldade de reengajamento", desc: "Com a vida e a própria identidade após a perda", color: deck.NAVY_TINT },
    ],
    notaFinal: "O critério central não é a intensidade da dor num momento isolado — é a ausência de progressão ao longo do tempo esperado.",
  });

  deck.slideSinais(pres, {
    rodape: RODAPE_DECK, pageNum: 7,
    titulo: "Como reconhecer o padrão na prática",
    itens: [
      { titulo: "Cognitivo", desc: "Descrença persistente sobre a morte, dificuldade de aceitar a realidade da perda" },
      { titulo: "Comportamental", desc: "Evitação extrema de lembranças, ou apego excessivo a objetos/rituais do falecido" },
      { titulo: "Relacional", desc: "Dificuldade de investir em outros vínculos, sensação de que parte de si morreu junto" },
      { titulo: "Físico", desc: "Sintomas somáticos associados à dor emocional intensa e prolongada" },
    ],
  });

  deck.slideDiferencial(pres, {
    rodape: RODAPE_DECK, pageNum: 8,
    titulo: "Diagnóstico diferencial rápido",
    cards: [
      { titulo: "Luto normal", desc: "Processo doloroso, mas com trajetória gradual de adaptação, sem critério fixo de tempo" },
      { titulo: "Depressão Maior (Módulo 4.2)", desc: "Luto complicado é centrado na saudade específica do falecido, não numa tristeza generalizada" },
      { titulo: "TEPT (Módulo 4.6)", desc: "Se a morte foi traumática, avaliar sintomas de intrusão e hipervigilância além do luto em si" },
    ],
  });

  deck.slideInstrumentos(pres, {
    rodape: RODAPE_DECK, pageNum: 9,
    titulo: "Instrumento e critério formal",
    instrumentos: [
      { sigla: "ICG", nome: "Inventory of Complicated Grief", desc: "Mede intensidade e características do luto complicado." },
      { sigla: "PG-13", nome: "Prolonged Grief Disorder Scale", desc: "Instrumento específico alinhado aos critérios formais do transtorno." },
      { sigla: "DSM-5-TR", nome: "Critério de tempo formal", desc: "12 meses pra adultos, 6 meses pra crianças e adolescentes." },
    ],
  });

  deck.slideProtocoloOverview(pres, {
    rodape: RODAPE_DECK, pageNum: 10,
    titulo: "Do mecanismo ao protocolo: 4 passos",
    passos: [
      { titulo: "Validação e\npsicoeducação", desc: "Normalizar a trajetória do luto, sem apressar" },
      { titulo: "Processar a\nnarrativa da perda", desc: "Incluindo, quando aplicável, as circunstâncias da morte" },
      { titulo: "Reconstruir o\nvínculo simbólico", desc: "Integrar a perda à identidade, sem apagar a memória" },
      { titulo: "Reengajamento\ngradual", desc: "Retomar papéis e vínculos de vida, no ritmo da pessoa" },
    ],
    notaFinal: "Luto contínuo saudável não significa esquecer quem partiu — significa integrar essa perda à própria identidade, de forma que a vida siga possível.",
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 11,
    titulo: "Passos 1 e 2, na prática",
    colunas: [
      {
        numero: 1, titulo: "Validação e psicoeducação",
        fala: "“Não existe um prazo certo pra doer menos — mas quando a dor não muda de forma nenhuma com o tempo, faz sentido olhar com mais cuidado pro que pode estar bloqueando esse processo.”",
        bullets: ["Normalize a intensidade da dor sem minimizar nem patologizar prematuramente", "Explique a trajetória esperada do luto, com suas ondas naturais de sofrimento e adaptação"],
      },
      {
        numero: 2, titulo: "Processar a narrativa da perda",
        bullets: ["Ajude o paciente a construir e revisitar a narrativa da perda, no próprio ritmo", "Quando a morte foi traumática, trabalhe essa dimensão com cuidado adicional, em diálogo com o Módulo 4.6"],
      },
    ],
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 12,
    titulo: "Passos 3 e 4, na prática",
    colunas: [
      {
        numero: 3, titulo: "Reconstruir o vínculo simbólico",
        bullets: ["Explore formas de manter uma conexão simbólica saudável com a pessoa falecida", "Diferencie isso de negação — o objetivo é integração, não substituição da realidade"],
      },
      {
        numero: 4, titulo: "Reengajamento gradual",
        fala: "“Retomar a vida não é trair a memória — dá pra guardar essa pessoa com você e, ao mesmo tempo, seguir em frente, no seu tempo.”",
        bullets: ["Incentive retomada gradual de papéis e vínculos, sem forçar prazos externos", "Celebre pequenos passos de reengajamento como parte legítima do processo"],
      },
    ],
  });

  deck.slideCaso(pres, {
    rodape: RODAPE_DECK, pageNum: 13,
    vinheta: "Marcelo, 52 anos, perdeu a esposa há 18 meses, em um acidente súbito. Relata que ainda dorme do lado dela na cama \"esperando ela voltar\", não conseguiu tocar em nenhum pertence dela, e evita qualquer conversa sobre o acidente. Afirma que \"parte de mim morreu junto\" e que não vê sentido em retomar atividades que faziam juntos. Nega qualquer melhora desde o primeiro mês após a perda.",
    perguntas: [
      "Que elementos da vinheta sustentam a hipótese de Luto Prolongado, além do tempo decorrido?",
      "Que outro protocolo deste curso pode se sobrepor a esse caso, dado que a morte foi súbita?",
      "Por onde você começaria o protocolo com Marcelo, considerando a ausência total de progressão relatada?",
    ],
  });

  deck.slideEncaminhamento(pres, {
    rodape: RODAPE_DECK, pageNum: 14,
    criterios: [
      "Avaliar risco de suicídio quando presente desejo de reunião com o falecido: ativar o protocolo do Módulo 4.9",
      "Circunstâncias traumáticas da morte podem exigir trabalho conjunto com o protocolo de TEPT (Módulo 4.6)",
      "Luto com mais de 12 meses sem qualquer progressão e prejuízo funcional significativo, conforme critério do DSM-5-TR",
      "Isolamento social severo ou abandono completo de papéis de vida (trabalho, cuidado pessoal) por período prolongado",
    ],
  });

  deck.slideRecap(pres, {
    rodape: RODAPE_DECK, pageNum: 15,
    pontos: [
      "O sistema de recompensa e o circuito de dor social explicam por que a saudade pode funcionar quase como uma fissura",
      "Saudade intensa e persistente, dor emocional sem atenuação e dificuldade de reengajamento são os 3 traços centrais",
      "ICG, PG-13 e o critério de 12 meses do DSM-5-TR estruturam a avaliação formal do quadro",
      "O protocolo nunca apressa o luto — reconhece quando o processo natural encontrou um obstáculo e precisa de ajuda pra seguir",
    ],
    proximoTexto: "Módulo 4.24 concluído — fim da expansão de protocolos clínicos deste bloco →",
  });

  return pres.writeFile({ fileName: "Modulo-4.24-Luto-Complicado.pptx" });
}

// ============================================================
// 2) EXERCÍCIOS
// ============================================================
function construirExercicios() {
  const children = [
    ...doc.capa(KICKER, "Exercícios — Luto Complicado", "Resolva individualmente antes da sessão de supervisão. O objetivo é testar sua leitura do mecanismo e do protocolo antes de comparar com a discussão em grupo — não há problema em errar."),

    doc.exNum(1, "O mecanismo, em suas palavras"),
    doc.pergunta(1, "Explique em até 3 frases, sem jargão técnico, por que parte do cérebro continua \"esperando\" a pessoa que partiu."),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Qual é o critério central pra diferenciar luto normal de luto complicado — intensidade da dor ou outra coisa? Explique."),
    ...doc.linhaResposta(2),

    doc.exNum(2, "Diagnóstico diferencial"),
    doc.vinhetaBox("Um paciente em luto há 8 meses relata tristeza intensa centrada especificamente na saudade da pessoa falecida, sem os sintomas amplos de anedonia generalizada característicos de depressão maior."),
    doc.pergunta(1, "Luto Complicado, luto normal em curso, ou Depressão Maior? Justifique, considerando também o critério de tempo do DSM-5-TR."),
    ...doc.linhaResposta(2),

    doc.exNum(3, "Validação sem apressar"),
    doc.vinhetaBox("Um familiar do paciente pergunta se \"já não deveria estar melhor\" depois de 6 meses."),
    doc.pergunta(1, "Como você explicaria a trajetória esperada do luto pra esse familiar, sem patologizar nem minimizar?"),
    ...doc.linhaResposta(3),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),

    doc.exNum(4, "Reconstrução do vínculo simbólico"),
    doc.pergunta(1, "Por que manter uma conexão simbólica com a pessoa falecida não é a mesma coisa que negação?"),
    ...doc.linhaResposta(2),

    doc.exNum(5, "Caso integrado — Marcelo"),
    doc.vinhetaBox("Marcelo, 52 anos, perdeu a esposa há 18 meses em acidente súbito. Ainda dorme do lado dela \"esperando ela voltar\", não tocou em pertences dela, evita falar do acidente, sente que \"parte de mim morreu junto\", nega qualquer melhora desde o primeiro mês."),
    doc.pergunta(1, "Que elementos sustentam Luto Prolongado, além do tempo decorrido?"),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Que outro protocolo pode se sobrepor a esse caso, dado que a morte foi súbita?"),
    ...doc.linhaResposta(1),
    doc.pergunta(3, "Por onde você começaria o protocolo com Marcelo?"),
    ...doc.linhaResposta(2),
  ];

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-4.24-Exercicios.docx");
}

// ============================================================
// 3) AVALIAÇÃO
// ============================================================
function construirProva() {
  const objetivas = [
    ["O sistema de recompensa, no luto, é ativado por lembranças da pessoa falecida de forma similar a:", ["Craving", "Extinção completa da resposta emocional", "Nenhum processo neurobiológico conhecido", "Resposta motora reflexa"]],
    ["O circuito de dor social, ativado no luto, é o mesmo envolvido em:", ["Rejeição e exclusão social", "Processamento visual básico", "Regulação exclusivamente motora", "Nenhum outro processo emocional conhecido"]],
    ["Os 3 traços centrais do Luto Complicado são:", ["Saudade intensa e persistente, dor emocional sem atenuação, dificuldade de reengajamento", "Grandiosidade, necessidade de admiração, falta de empatia", "Hiperativação cognitiva, condicionamento cama-vigília, comportamentos compensatórios", "Desatenção, impulsividade, inquietação interna"]],
    ["O critério central pra diferenciar luto complicado de luto normal é:", ["A ausência de progressão ao longo do tempo esperado, não a intensidade da dor num momento isolado", "A intensidade máxima da dor sentida logo após a perda", "A idade da pessoa que está enlutada", "O tipo de relação que a pessoa tinha com o falecido"]],
    ["Critério de tempo do DSM-5-TR pra Luto Prolongado em adultos:", ["12 meses", "1 mês", "5 anos", "Não há qualquer critério de tempo estabelecido"]],
    ["O que diferencia Luto Complicado de Depressão Maior (Módulo 4.2)?", ["Luto complicado é centrado especificamente na saudade do falecido, não numa tristeza generalizada", "Não há diferença clínica relevante entre eles", "Depressão Maior sempre envolve perda recente de alguém", "Luto complicado nunca envolve tristeza"]],
    ["Diante de morte traumática/súbita, o módulo recomenda avaliar também sintomas de:", ["Intrusão e hipervigilância, característicos do TEPT (Módulo 4.6)", "Exclusivamente sintomas alimentares", "Apenas sintomas de hiperatividade motora", "Nenhum sintoma adicional precisa ser avaliado"]],
    ["O passo 3 do protocolo (reconstruir o vínculo simbólico) tem como objetivo:", ["Integrar a perda à identidade, sem apagar a memória da pessoa falecida", "Eliminar completamente qualquer lembrança do falecido", "Substituir a realidade da perda por uma narrativa alternativa", "Evitar qualquer menção à pessoa falecida nas sessões"]],
    ["Diante de desejo de reunião com o falecido relatado pelo paciente, o protocolo recomenda:", ["Avaliar risco de suicídio e ativar o protocolo do Módulo 4.9", "Ignorar, pois é considerado normal em qualquer fase do luto", "Aguardar a próxima sessão agendada, sem intervenção imediata", "Encerrar o vínculo terapêutico imediatamente"]],
    ["O objetivo central do protocolo de Luto Complicado é descrito como:", ["Reconhecer quando o processo natural encontrou um obstáculo e precisa de ajuda pra seguir, nunca apressar o luto", "Fazer o paciente esquecer a pessoa falecida o mais rápido possível", "Eliminar qualquer expressão de tristeza nas sessões", "Impor um prazo fixo pra conclusão do processo de luto"]],
  ];
  const gabaritoObjetivas = ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a"];

  const children = [
    ...doc.capa(KICKER, "Avaliação — Luto Complicado", `Avaliação formativa de encerramento do Módulo ${MOD}.`),
    doc.infoBox([
      ["Nota de corte:", "75 de 100 pontos (nota mais alta, dada a relevância da avaliação de risco de suicídio)"],
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
    doc.vinhetaBox("Sônia, 61 anos, perdeu o filho há 14 meses. Relata que ainda visita o quarto dele todos os dias, sem qualquer alteração desde a perda, e diz, num tom que preocupou o profissional que a atendeu antes, que \"seria mais fácil se eu pudesse estar onde ele está agora\". Não retomou nenhum contato social e afirma que sua vida \"não faz mais sentido nenhum\"."),
    new doc.Paragraph({ spacing: { before: 240 }, children: [new doc.TextRun({ text: "Com base no protocolo estudado, responda:", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    new doc.Paragraph({ spacing: { before: 220, after: 40 }, children: [new doc.TextRun({ text: "a) (10 pts) Que elementos da vinheta sustentam a hipótese de Luto Prolongado?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "b) (10 pts) Qual deveria ser a prioridade clínica absoluta diante da fala \"seria mais fácil se eu pudesse estar onde ele está agora\"?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "c) (10 pts) Por que essa fala não deve ser automaticamente interpretada como \"normal\" nesse contexto?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "d) (10 pts) Depois de garantida a segurança, que passo do protocolo você priorizaria com Sônia, e por quê?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    new doc.Paragraph({ spacing: { after: 40 }, children: [new doc.TextRun({ text: "USO EXCLUSIVO DO INSTRUTOR — remover antes de aplicar a prova", bold: true, color: doc.TERRA, font: doc.FONT, size: 20 })] }),
    doc.tituloH1("Gabarito"),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 1 — Questões objetivas", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 200 }, children: [new doc.TextRun({ text: gabaritoObjetivas.map((r, i) => `${i + 1}-${r}`).join("   ·   "), font: doc.FONT, size: 22, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 2 — Critério de correção da questão de caso", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "a) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "14 meses sem qualquer progressão (acima dos 12 meses do critério DSM-5-TR), manutenção idêntica do quarto do filho, ausência total de reengajamento social, e sensação de que a vida \"não faz mais sentido\".", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "b) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Avaliação de risco de suicídio formal, ativando imediatamente o protocolo do Módulo 4.9 — a fala expressa desejo de reunião com o falecido, um sinal de risco que precisa de investigação ativa.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "c) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Porque, embora pensamentos sobre a morte possam surgir no luto, uma fala que expressa desejo direto de estar onde o falecido está exige avaliação de risco específica, e não deve ser normalizada sem essa investigação.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "d) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Validação e psicoeducação (passo 1), reconhecendo a intensidade da dor sem apressar, antes de avançar pra processar a narrativa da perda ou trabalhar reengajamento.", font: doc.FONT, size: 21, color: doc.INK })] }),
  );

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-4.24-Avaliacao.docx");
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
      n: 1, titulo: "Por que o cérebro continua \"esperando\"", duracao: "12 min", slides: "1, 2, 3, 4",
      objetivo: "Sair sabendo explicar o mecanismo do luto complicado sem jargão, e por que o objetivo nunca é apressar o processo.",
      segmentos: [
        seg("0:00–0:45", "Abertura (gancho)", [{ fala: "Parte do cérebro continua esperando a pessoa que partiu — é por isso que o luto dói tanto, e por isso que, pra uma parte das pessoas, essa espera nunca se atualiza sozinha." }]),
        seg("0:45–2:00", "Por que isso importa clinicamente", ["O objetivo nunca é apressar o luto ou fazer a pessoa \"superar\".", "É reconhecer quando o processo natural encontrou um obstáculo."]),
        seg("2:00–8:00", "Por que a saudade funciona como fissura (mostrar slide 4)", [
          "Sistema de recompensa ativado por lembranças, de forma similar ao craving.",
          "Circuito de dor social hiperativado por lembranças da perda.",
          "Sistema de apego com representação implícita de vínculo contínuo.",
          "Conflito na atualização de crenças entre apego contínuo e realidade da perda.",
        ]),
        seg("8:00–10:30", "Um ponto importante", ["A maioria das pessoas em luto não desenvolve esse quadro — o mecanismo explica a intensidade, não prevê patologia em todo mundo."]),
        seg("10:30–12:00", "Fechamento", [{ fala: "Próxima aula: quando o processo natural encontra um obstáculo." }]),
      ],
    },
    {
      n: 2, titulo: "Do processo natural ao luto que não se resolve", duracao: "10 min", slides: "5",
      objetivo: "Explicar a cadeia entre perda, obstáculos ao processamento e Luto Prolongado.",
      segmentos: [
        seg("0:00–1:00", "Retomada rápida", ["Vimos as estruturas envolvidas. Hoje vemos quando e por que o processo natural se interrompe."]),
        seg("1:00–6:30", "A cadeia (mostrar slide 5)", ["Perda de uma figura de apego, início do processo natural de luto.", "Obstáculos ao processamento: apego ambivalente, morte súbita, falta de suporte.", "Processo interrompido, além do período esperado de adaptação.", "Luto Prolongado: critério formal de 12 meses, com prejuízo funcional."]),
        seg("6:30–9:00", "Um ponto importante", ["O protocolo é pra quando obstáculos específicos impedem o processo natural de seguir seu curso."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: os 3 traços centrais do Luto Complicado." }]),
      ],
    },
    {
      n: 3, titulo: "Os 3 traços centrais", duracao: "10 min", slides: "6",
      objetivo: "Reconhecer saudade persistente, dor emocional sem atenuação e dificuldade de reengajamento.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três traços — com um critério central que muda tudo."]),
        seg("1:00–7:00", "Os 3 traços (mostrar slide 6)", [
          "Saudade intensa e persistente, ou preocupação constante com a pessoa falecida.",
          "Dor emocional intensa que não se atenua com o tempo esperado.",
          "Dificuldade de reengajamento com a vida e a própria identidade.",
        ]),
        seg("7:00–9:00", "O critério central", ["Não é a intensidade da dor num momento isolado — é a ausência de progressão ao longo do tempo."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: como reconhecer esse padrão nas 4 dimensões clínicas." }]),
      ],
    },
    {
      n: 4, titulo: "Sinais de alerta", duracao: "10 min", slides: "7",
      objetivo: "Reconhecer sinais cognitivos, comportamentais, relacionais e físicos do Luto Complicado.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Reconhecer o padrão com precisão orienta a diferenciação com o luto normal, o próximo passo."]),
        seg("1:00–7:30", "As 4 categorias (mostrar slide 7)", [
          "Cognitivo: descrença persistente, dificuldade de aceitar a realidade da perda.",
          "Comportamental: evitação extrema ou apego excessivo a objetos/rituais.",
          "Relacional: dificuldade de investir em novos vínculos.",
          "Físico: sintomas somáticos associados à dor prolongada.",
        ]),
        seg("7:30–9:00", "Por que isso importa", ["Esses sinais, persistentes além do esperado, sustentam a hipótese diagnóstica."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: como diferenciar de quadros parecidos." }]),
      ],
    },
    {
      n: 5, titulo: "Diagnóstico diferencial rápido", duracao: "11 min", slides: "8",
      objetivo: "Diferenciar Luto Complicado de luto normal, Depressão Maior e TEPT.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Um filtro rápido — o foco específico da dor é a chave de uma dessas diferenciações."]),
        seg("1:00–8:00", "Os 3 comparativos (mostrar slide 8)", [
          "Luto normal: trajetória gradual de adaptação, sem critério fixo de tempo.",
          "Depressão Maior (Módulo 4.2): saudade específica do falecido, não tristeza generalizada.",
          "TEPT (Módulo 4.6): morte traumática exige avaliar intrusão e hipervigilância também.",
        ]),
        seg("8:00–10:30", "Por que a diferenciação com TEPT importa", ["Morte súbita ou violenta pode gerar sobreposição real entre os dois quadros."]),
        seg("10:30–11:00", "Fechamento", [{ fala: "Próxima aula: os instrumentos que confirmam essa leitura com dado." }]),
      ],
    },
    {
      n: 6, titulo: "Instrumento e critério formal", duracao: "10 min", slides: "9",
      objetivo: "Saber quando usar ICG, PG-13 e o critério de tempo do DSM-5-TR.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Dois instrumentos e um critério de tempo formal — a base da confirmação diagnóstica."]),
        seg("1:00–4:30", "ICG", ["Mede intensidade e características do luto complicado."]),
        seg("4:30–7:30", "PG-13", ["Instrumento específico alinhado aos critérios formais do transtorno."]),
        seg("7:30–9:00", "Critério de tempo do DSM-5-TR", ["12 meses pra adultos, 6 meses pra crianças e adolescentes."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: colocamos tudo em prática — validação e psicoeducação." }]),
      ],
    },
    {
      n: 7, titulo: "Protocolo — validação e processamento da narrativa", duracao: "13 min", slides: "10, 11",
      objetivo: "Aplicar os passos 1 e 2 do protocolo, sem apressar o processo.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["A parte prática central desse módulo. Hoje, os 2 primeiros passos."]),
        seg("1:00–2:00", "Visão geral (mostrar slide 10)", ["Validação e psicoeducação → Processar a narrativa → Reconstruir o vínculo simbólico → Reengajamento gradual.", "Luto contínuo saudável não significa esquecer quem partiu."]),
        seg("2:00–7:00", "Passo 1 — Validação e psicoeducação (mostrar slide 11, esquerda)", [{ fala: "Não existe um prazo certo pra doer menos — mas quando a dor não muda de forma nenhuma com o tempo, faz sentido olhar com mais cuidado pro que pode estar bloqueando esse processo." }]),
        seg("7:00–12:00", "Passo 2 — Processar a narrativa da perda (mostrar slide 11, direita)", ["Ajude o paciente a construir e revisitar a narrativa, no próprio ritmo.", "Se a morte foi traumática, trabalhe essa dimensão em diálogo com o Módulo 4.6."]),
        seg("12:00–13:00", "Fechamento", [{ fala: "Próxima aula: reconstruir o vínculo simbólico e reengajamento gradual." }]),
      ],
    },
    {
      n: 8, titulo: "Protocolo — vínculo simbólico e reengajamento", duracao: "13 min", slides: "12",
      objetivo: "Trabalhar conexão simbólica saudável e retomada gradual de papéis de vida.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Hoje fechamos o protocolo com o trabalho de reconstrução e retomada."]),
        seg("1:00–7:00", "Passo 3 — Reconstruir o vínculo simbólico (mostrar slide 12, esquerda)", ["Explore formas de manter uma conexão simbólica saudável com o falecido.", "Diferencie isso de negação — o objetivo é integração, não substituição da realidade."]),
        seg("7:00–13:00", "Passo 4 — Reengajamento gradual (mostrar slide 12, direita)", [{ fala: "Retomar a vida não é trair a memória — dá pra guardar essa pessoa com você e, ao mesmo tempo, seguir em frente, no seu tempo." }]),
        seg("13:00–13:00", "Fechamento", [{ fala: "Protocolo completo. Próxima aula: um caso real e os critérios de quando escalar." }]),
      ],
    },
    {
      n: 9, titulo: "Estudo de caso, encaminhamento e recap", duracao: "15 min", slides: "13, 14, 15",
      objetivo: "Integrar mecanismo, instrumento e protocolo num caso completo, com ênfase na avaliação de risco de suicídio.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Última aula do módulo. Caso completo e os critérios de escalonamento que aqui merecem atenção redobrada."]),
        seg("1:00–7:00", "Estudo de caso — Marcelo (mostrar slide 13)", ["Leia a vinheta com calma.", "Percorra as 3 perguntas de discussão.", "Convide o aluno a pausar e responder por escrito."]),
        seg("7:00–11:00", "Quando encaminhar (mostrar slide 14)", ["Percorra os 4 critérios — reforce a conexão direta com o Módulo 4.9 diante de qualquer desejo de reunião com o falecido."]),
        seg("11:00–14:00", "Recapitulando o módulo (mostrar slide 15)", ["Retome os 4 pontos-chave.", "Reforce a reformulação central: reconhecer um obstáculo ao processo natural, nunca apressar o luto."]),
        seg("14:00–15:00", "Fechamento do módulo", [{ fala: "Agora é hora dos exercícios e da avaliação. Com isso, encerramos esta expansão de protocolos clínicos." }]),
      ],
    },
  ];

  const totalMin = 12 + 10 + 10 + 10 + 11 + 10 + 13 + 13 + 15;

  const children = [
    ...doc.capa(KICKER, "Roteiro de Aulas — Luto Complicado", "Módulo dividido em 9 vídeo-aulas de 10 a 15 minutos, seguindo os slides já produzidos. Cada aula tem roteiro cronometrado, pronto pra gravação."),
    new doc.Paragraph({
      spacing: { before: 60, after: 200 },
      children: [new doc.TextRun({
        text: "Nota importante: este módulo trata de manejo clínico com componente relevante de avaliação de risco de suicídio. Recomenda-se supervisão específica antes de conduzir atendimentos desse perfil de forma independente.",
        italics: true, bold: true, color: doc.TERRA, font: doc.FONT, size: 20,
      })],
    }),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "Duração total do módulo em vídeo: ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: `${totalMin} minutos (${(totalMin / 60).toFixed(1)}h) em 9 aulas`, font: doc.FONT, size: 21, color: doc.INK })] }),
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

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", `${RODAPE_DOC} — Roteiro de Aulas`, children), "Modulo-4.24-Roteiro-Aulas.docx");
}

// ============================================================
Promise.resolve()
  .then(construirDeck)
  .then(construirExercicios)
  .then(construirProva)
  .then(construirRoteiro)
  .then(() => console.log("TUDO PRONTO"))
  .catch((e) => { console.error(e); process.exit(1); });

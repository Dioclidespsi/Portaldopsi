const deck = require("../_lib/lib-deck.js");
const doc = require("../_lib/lib-doc.js");

const MOD = "4.18";
const NOME = "Transtorno de Personalidade Dependente";
const RODAPE_DECK = `TP Dependente — Módulo ${MOD}`;
const RODAPE_DOC = `Módulo ${MOD} — TP Dependente`;
const KICKER = "MÓDULO 4.18 · TRANSTORNOS DE PERSONALIDADE · CLUSTER C";

// ============================================================
// 1) SLIDE DECK
// ============================================================
function construirDeck() {
  const pres = deck.novaApresentacao(`${NOME} — Da Neurociência ao Manejo`);

  deck.slideTitulo(pres, {
    moduloLabel: `Módulo ${MOD} · Cluster C · Transtornos de Personalidade`,
    titulo: "TP Dependente",
    subtitulo: "Autonomia como habilidade a ser reconstruída",
    passos: ["Mecanismo", "Sinais", "Instrumento", "Manejo", "Encaminhamento"],
  });

  deck.slideRoteiro(pres, {
    rodape: RODAPE_DECK, pageNum: 2,
    cards: [
      { titulo: "Mecanismo", desc: "Por que decidir sozinho gera tanta ansiedade" },
      { titulo: "Sinais", desc: "Submissão, medo de separação e tolerância a maus-tratos" },
      { titulo: "Instrumento", desc: "PID-5, SCID-5-PD e IDI na prática" },
      { titulo: "Manejo", desc: "4 passos, com autonomia gradual no centro" },
      { titulo: "Encaminhamento", desc: "Atenção especial a relações de risco" },
    ],
  });

  deck.slideHook(pres, {
    rodape: RODAPE_DECK, pageNum: 3,
    frase: "No TP Dependente, a submissão não é passividade — é uma estratégia ativa, aprendida cedo, pra manter por perto a figura de quem a pessoa acredita não conseguir sobreviver sem.",
    apoio: "Isso muda o objetivo do manejo: não é ensinar a pessoa a \"ter opinião\" — é reconstruir, com segurança, a crença de que ela é capaz de funcionar de forma autônoma.",
  });

  deck.slideCircuito(pres, {
    rodape: RODAPE_DECK, pageNum: 4,
    titulo: "Por que decidir sozinho gera tanta ansiedade",
    regioes: [
      { label: "Sistema de apego (hiperativado, alta necessidade de proximidade)", rx: 0.20, ry: 0.22, color: deck.NAVY, d: 0.5 },
      { label: "Amígdala (reatividade intensa a sinais de separação)", rx: 0.22, ry: 0.62, color: deck.TERRA, d: 0.4 },
      { label: "Córtex pré-frontal (menor autonomia funcional na tomada de decisão)", rx: 0.60, ry: 0.60, color: deck.NAVY_TINT, d: 0.36 },
      { label: "Sistema de recompensa (alívio acentuado ao ceder responsabilidade a outro)", rx: 0.58, ry: 0.24, color: deck.TERRA_TINT, d: 0.36 },
    ],
    notas: [
      "O sistema de apego funciona hiperativado, gerando necessidade intensa e constante de proximidade com a figura de referência.",
      "A amígdala reage de forma amplificada a qualquer sinal, real ou percebido, de separação iminente.",
      "O córtex pré-frontal mostra menor engajamento autônomo na tomada de decisão — parte do padrão é evitar a ansiedade de decidir sozinho, não apenas incapacidade.",
    ],
  });

  deck.slideCadeia(pres, {
    rodape: RODAPE_DECK, pageNum: 5,
    titulo: "Do apego inseguro à submissão pervasiva",
    elos: [
      { titulo: "Apego inseguro na infância", desc: "Cuidado inconsistente ou superproteção, sem espaço pra autonomia gradual" },
      { titulo: "Crença central de incapacidade", desc: "\"Não consigo funcionar sozinho\", internalizada cedo" },
      { titulo: "Busca ativa por figuras de referência", desc: "Que assumam responsabilidade e decisões pela pessoa" },
      { titulo: "TP Dependente", desc: "Padrão pervasivo de submissão e medo intenso de separação" },
    ],
    notaFinal: "A superproteção, tanto quanto a negligência, pode alimentar esse padrão — o fator comum é a ausência de espaço seguro pra praticar autonomia na infância.",
  });

  deck.slideCategorias(pres, {
    rodape: RODAPE_DECK, pageNum: 6,
    titulo: "3 traços centrais",
    categorias: [
      { titulo: "Dificuldade de decidir sem orientação", desc: "Necessidade de reasseguramento excessivo antes de qualquer decisão", color: deck.NAVY },
      { titulo: "Delegação de responsabilidade", desc: "Espera que outros assumam as principais áreas da própria vida", color: deck.TERRA },
      { titulo: "Medo de separação", desc: "Submissão ativa como estratégia pra manter o vínculo por perto", color: deck.NAVY_TINT },
    ],
    notaFinal: "É importante diferenciar isso de dependência real e adaptativa — como em contextos de doença física ou cuidado legítimo — antes de patologizar.",
  });

  deck.slideSinais(pres, {
    rodape: RODAPE_DECK, pageNum: 7,
    titulo: "Como reconhecer o padrão na prática",
    itens: [
      { titulo: "Cognitivo", desc: "Crença de incompetência pessoal (\"não consigo sozinho\")" },
      { titulo: "Comportamental", desc: "Dificuldade de discordar, busca constante de aprovação antes de agir" },
      { titulo: "Relacional", desc: "Tolerância excessiva a maus-tratos pra não perder o vínculo" },
      { titulo: "Físico", desc: "Ativação do sistema de apego/estresse diante de sinais de separação" },
    ],
  });

  deck.slideDiferencial(pres, {
    rodape: RODAPE_DECK, pageNum: 8,
    titulo: "Diagnóstico diferencial rápido",
    cards: [
      { titulo: "TP Evitativa", desc: "Evita se aproximar por medo de rejeição; dependente se agarra intensamente uma vez vinculada" },
      { titulo: "TP Borderline", desc: "Sem a instabilidade extrema de humor/identidade nem a autolesão características da Borderline" },
      { titulo: "Dependência adaptativa real", desc: "Contextos de doença física ou cuidado legítimo não configuram, por si, transtorno de personalidade" },
    ],
  });

  deck.slideInstrumentos(pres, {
    rodape: RODAPE_DECK, pageNum: 9,
    titulo: "Três instrumentos, três finalidades",
    instrumentos: [
      { sigla: "PID-5", nome: "Personality Inventory for DSM-5", desc: "Mapeia os traços patológicos de forma dimensional." },
      { sigla: "SCID-5-PD", nome: "Entrevista Estruturada", desc: "Padrão-ouro pra diagnóstico categorial formal." },
      { sigla: "IDI", nome: "Inventário de Dependência Interpessoal", desc: "Específico pra medir o grau de dependência interpessoal e submissão." },
    ],
  });

  deck.slideProtocoloOverview(pres, {
    rodape: RODAPE_DECK, pageNum: 10,
    titulo: "Do mecanismo ao manejo: 4 passos",
    passos: [
      { titulo: "Autonomia\ndecisória gradual", desc: "Começar por decisões pequenas e de baixo risco" },
      { titulo: "Tolerância a\ndiscordar", desc: "Praticar expressar opinião própria com segurança" },
      { titulo: "Tolerância à\nseparação", desc: "Construir capacidade de estar bem sem a figura de referência por perto" },
      { titulo: "Avaliar risco\nrelacional", desc: "Investigar tolerância a maus-tratos no vínculo atual" },
    ],
    notaFinal: "O passo 4 não é opcional — a submissão pode manter a pessoa em relações abusivas por medo de ficar sozinha, exigindo avaliação de segurança específica.",
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 11,
    titulo: "Passos 1 e 2, na prática",
    colunas: [
      {
        numero: 1, titulo: "Autonomia decisória gradual",
        bullets: ["Comece com decisões pequenas e de baixo risco (o que comer, que roupa usar) antes de avançar pra decisões maiores", "Resista à tentação de decidir pelo paciente durante a sessão, mesmo quando ele pedir diretamente"],
      },
      {
        numero: 2, titulo: "Tolerância a discordar",
        fala: "“O que você realmente pensa sobre isso, independente do que eu ou outra pessoa achem?”",
        bullets: ["Pratique, dentro da sessão, expressar opinião própria mesmo quando diverge da do terapeuta", "Valide o desconforto de discordar sem reforçar a busca imediata de reasseguramento"],
      },
    ],
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 12,
    titulo: "Passos 3 e 4, na prática",
    colunas: [
      {
        numero: 3, titulo: "Tolerância à separação",
        bullets: ["Trabalhe gradualmente períodos maiores sem contato com a figura de referência", "Nomeie a ansiedade de separação como sintoma treinável, não como sinal de perigo real"],
      },
      {
        numero: 4, titulo: "Avaliar risco relacional",
        bullets: ["Investigue ativamente se há tolerância a maus-tratos (emocionais, físicos ou financeiros) no vínculo atual", "Não presuma que o paciente vai relatar isso espontaneamente — o medo de separação pode silenciar o relato"],
      },
    ],
  });

  deck.slideCaso(pres, {
    rodape: RODAPE_DECK, pageNum: 13,
    vinheta: "Renata, 35 anos, procura terapia a pedido do marido, que reclama que ela \"não toma nenhuma decisão sozinha, nem escolhe o que vestir sem perguntar antes\". Renata relata pânico só de pensar em discordar dele, mesmo em assuntos pequenos, e conta que já tolerou comentários humilhantes recorrentes \"porque prefiro isso a ficar sozinha, não saberia nem por onde começar\". Nunca morou sozinha e foi criada por pais extremamente protetores, que decidiam tudo por ela.",
    perguntas: [
      "Que elementos da vinheta ilustram os 3 traços centrais do TP Dependente?",
      "Que sinal na vinheta exige investigação mais aprofundada, independente do diagnóstico de personalidade?",
      "Por onde você começaria o passo 1 (autonomia decisória gradual) com Renata?",
    ],
  });

  deck.slideEncaminhamento(pres, {
    rodape: RODAPE_DECK, pageNum: 14,
    criterios: [
      "Sinais de tolerância a maus-tratos emocionais, físicos ou financeiros: avaliar segurança e considerar rede de proteção",
      "Sintomas depressivos significativos após término de relação ou perda da figura de referência",
      "Comorbidade com TP Evitativa ou sintomas de ansiedade generalizada, relativamente comuns nesse perfil",
      "Considerar terapia de casal com cautela, apenas quando o parceiro não reforça ativamente a dependência",
    ],
  });

  deck.slideRecap(pres, {
    rodape: RODAPE_DECK, pageNum: 15,
    pontos: [
      "No TP Dependente, a submissão é uma estratégia ativa aprendida cedo, não passividade",
      "Dificuldade de decidir sem orientação, delegação de responsabilidade e medo de separação são os 3 traços centrais",
      "PID-5, SCID-5-PD e IDI estruturam a avaliação dimensional, categorial e específica de dependência interpessoal",
      "O manejo reconstrói autonomia de forma gradual e inclui avaliação ativa de risco em relações de tolerância a maus-tratos",
    ],
    proximoTexto: "Próximo: exercícios práticos e avaliação do Módulo 4.18 →",
  });

  return pres.writeFile({ fileName: "Modulo-4.18-TP-Dependente.pptx" });
}

// ============================================================
// 2) EXERCÍCIOS
// ============================================================
function construirExercicios() {
  const children = [
    ...doc.capa(KICKER, "Exercícios — TP Dependente", "Resolva individualmente antes da sessão de supervisão. O objetivo é testar sua leitura do mecanismo e do manejo antes de comparar com a discussão em grupo — não há problema em errar."),

    doc.exNum(1, "O mecanismo, em suas palavras"),
    doc.pergunta(1, "Explique em até 3 frases, sem jargão técnico, por que a submissão é descrita como estratégia ativa, e não como passividade."),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Por que superproteção na infância pode alimentar esse padrão tanto quanto negligência?"),
    ...doc.linhaResposta(2),

    doc.exNum(2, "Diagnóstico diferencial"),
    doc.vinhetaBox("Um paciente evita se aproximar de novos vínculos por medo de rejeição, mas, uma vez estabelecida a relação, não demonstra dificuldade excessiva de tomar decisões sozinho."),
    doc.pergunta(1, "TP Dependente ou TP Evitativa? Justifique com base no elemento central ausente na vinheta."),
    ...doc.linhaResposta(2),

    doc.exNum(3, "Autonomia decisória gradual"),
    doc.p("Liste 3 decisões de baixo risco que poderiam iniciar o treino de autonomia com um paciente que delega todas as decisões ao cônjuge."),
    doc.tabelaSimples(["Nº", "Decisão de baixo risco"], [["1", ""], ["2", ""], ["3", ""]], [1200, 8150]),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),

    doc.exNum(4, "Avaliação de risco relacional"),
    doc.pergunta(1, "Por que o medo de separação pode silenciar o relato espontâneo de maus-tratos no vínculo atual?"),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Formule uma pergunta direta e cuidadosa pra investigar isso ativamente numa sessão."),
    ...doc.linhaResposta(2),

    doc.exNum(5, "Caso integrado — Renata"),
    doc.vinhetaBox("Renata, 35 anos, não toma decisões sozinha, sente pânico ao pensar em discordar do marido, tolera comentários humilhantes por medo de ficar sozinha, nunca morou sozinha e foi criada por pais extremamente protetores."),
    doc.pergunta(1, "Identifique os 3 traços centrais presentes na vinheta."),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Que sinal exige investigação mais aprofundada de segurança, independente do diagnóstico de personalidade?"),
    ...doc.linhaResposta(2),
    doc.pergunta(3, "Por onde você começaria o passo 1 (autonomia decisória gradual) com Renata?"),
    ...doc.linhaResposta(2),
  ];

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-4.18-Exercicios.docx");
}

// ============================================================
// 3) AVALIAÇÃO
// ============================================================
function construirProva() {
  const objetivas = [
    ["No TP Dependente, o sistema de apego tende a funcionar:", ["Hiperativado, com necessidade intensa e constante de proximidade", "Completamente desligado, sem qualquer ativação", "Idêntico ao da população geral, sem alteração relevante", "Hiperativado apenas durante o sono"]],
    ["O córtex pré-frontal, nesse perfil, tende a apresentar:", ["Menor engajamento autônomo na tomada de decisão", "Engajamento autônomo aumentado em todas as decisões", "Nenhuma relação com o padrão de submissão observado", "Hiperfunção exclusiva em decisões financeiras"]],
    ["Os 3 traços centrais do TP Dependente são:", ["Dificuldade de decidir sem orientação, delegação de responsabilidade, medo de separação", "Grandiosidade, necessidade de admiração, falta de empatia", "Hipersensibilidade à crítica, sentimento de inadequação, inibição social", "Instabilidade afetiva, de vínculo/autoimagem, impulsividade autolesiva"]],
    ["O que diferencia TP Dependente de TP Evitativa?", ["Não há diferença clínica relevante entre eles", "Evitativa evita se aproximar por medo de rejeição; dependente se agarra intensamente uma vez vinculada", "Evitativa sempre tem mais facilidade de tomar decisões", "Dependente nunca teme a separação"]],
    ["Instrumento específico pra medir o grau de dependência interpessoal e submissão:", ["IDI (Inventário de Dependência Interpessoal)", "PCL-R", "Y-BOCS", "MBI"]],
    ["Por que é importante diferenciar TP Dependente de dependência adaptativa real (ex: contexto de doença física)?", ["Para não patologizar uma dependência legítima e contextual", "Porque dependência real nunca existe de fato", "Porque ambas exigem exatamente o mesmo tratamento", "Porque o DSM-5 proíbe qualquer menção a contexto"]],
    ["O passo \"autonomia decisória gradual\" recomenda começar por:", ["Decisões pequenas e de baixo risco, antes de avançar pra decisões maiores", "Decisões financeiras e legais de grande impacto imediatamente", "Nenhuma decisão prática, apenas discussão teórica", "Decisões tomadas exclusivamente pelo terapeuta"]],
    ["Por que o terapeuta deve resistir à tentação de decidir pelo paciente durante a sessão?", ["Porque isso reforçaria o próprio padrão de dependência que está sendo tratado", "Porque é proibido por lei dar qualquer orientação", "Porque o paciente nunca pede orientação nesse perfil", "Porque decisões do terapeuta não têm nenhum efeito psicológico"]],
    ["Diante de sinais de tolerância a maus-tratos no vínculo atual, o módulo recomenda:", ["Avaliar segurança ativamente e considerar rede de proteção", "Ignorar, pois é considerado normal nesse perfil", "Aguardar que o paciente relate isso espontaneamente, sem investigar", "Encerrar o vínculo terapêutico imediatamente"]],
    ["O medo de separação pode silenciar o relato espontâneo de maus-tratos porque:", ["A pessoa teme que revelar o problema ameace a continuidade do vínculo", "A pessoa nunca percebe que está sendo maltratada", "Maus-tratos nunca ocorrem nesse perfil", "O medo de separação não tem relação alguma com esse silêncio"]],
  ];
  const gabaritoObjetivas = ["a", "a", "a", "b", "a", "a", "a", "a", "a", "a"];

  const children = [
    ...doc.capa(KICKER, "Avaliação — TP Dependente", `Avaliação formativa de encerramento do Módulo ${MOD}.`),
    doc.infoBox([
      ["Nota de corte:", "70 de 100 pontos"],
      ["Tempo sugerido:", "40 minutos"],
      ["Composição:", "10 questões objetivas (6 pts cada = 60 pts) + 1 questão de caso (40 pts)"],
      ["Consulta:", "Material da aula permitido; discussão entre colegas, não"],
    ]),
    doc.tituloH1("Parte 1 — Questões objetivas"),
  ];
  objetivas.forEach((q, i) => children.push(...doc.questaoObjetiva(i + 1, q[0], q[1])));

  children.push(
    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    doc.tituloH1("Parte 2 — Questão de caso (40 pontos)"),
    doc.vinhetaBox("Cláudia, 42 anos, relata que sempre deixou o companheiro decidir tudo, desde onde morar até que roupa comprar, e sente uma ansiedade avassaladora quando precisa tomar qualquer decisão sozinha. Recentemente, o companheiro começou a fazer comentários cada vez mais depreciativos sobre sua aparência, e ela diz que \"prefiro aguentar isso do que ter que aprender a viver sozinha, não saberia nem começar\"."),
    new doc.Paragraph({ spacing: { before: 240 }, children: [new doc.TextRun({ text: "Com base no protocolo estudado, responda:", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    new doc.Paragraph({ spacing: { before: 220, after: 40 }, children: [new doc.TextRun({ text: "a) (10 pts) Identifique os 3 traços centrais do TP Dependente presentes na vinheta.", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "b) (10 pts) Qual deveria ser a prioridade clínica imediata diante dos comentários depreciativos do companheiro?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "c) (10 pts) Sugira uma primeira decisão de baixo risco pra iniciar o passo 1 (autonomia decisória gradual) com Cláudia.", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "d) (10 pts) Por que o relato de Cláudia sobre \"preferir aguentar\" não deve ser interpretado como ausência de sofrimento?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    new doc.Paragraph({ spacing: { after: 40 }, children: [new doc.TextRun({ text: "USO EXCLUSIVO DO INSTRUTOR — remover antes de aplicar a prova", bold: true, color: doc.TERRA, font: doc.FONT, size: 20 })] }),
    doc.tituloH1("Gabarito"),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 1 — Questões objetivas", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 200 }, children: [new doc.TextRun({ text: gabaritoObjetivas.map((r, i) => `${i + 1}-${r}`).join("   ·   "), font: doc.FONT, size: 22, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 2 — Critério de correção da questão de caso", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "a) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Delegação de responsabilidade (companheiro decide tudo), dificuldade de decidir sem orientação (ansiedade avassaladora ao decidir sozinha), e medo de separação (prefere tolerar maus-tratos a ficar sozinha).", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "b) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Avaliação de segurança ativa (passo 4) — investigar a extensão dos comentários depreciativos e o risco relacional, considerando rede de proteção se necessário.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "c) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Ex: escolher sozinha o que vestir num dia específico, ou decidir o cardápio de uma refeição — uma decisão pequena e de baixo risco emocional.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "d) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Porque o medo de separação pode silenciar ou minimizar o relato de sofrimento real — \"preferir aguentar\" reflete o medo, não ausência de dor com a situação.", font: doc.FONT, size: 21, color: doc.INK })] }),
  );

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-4.18-Avaliacao.docx");
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
      n: 1, titulo: "Por que decidir sozinho gera tanta ansiedade", duracao: "12 min", slides: "1, 2, 3, 4",
      objetivo: "Sair sabendo explicar o mecanismo do TP Dependente sem jargão, e reformular submissão como estratégia, não passividade.",
      segmentos: [
        seg("0:00–0:45", "Abertura (gancho)", [{ fala: "No TP Dependente, a submissão não é passividade — é uma estratégia ativa, aprendida cedo, pra manter por perto a figura de quem a pessoa acredita não conseguir sobreviver sem." }]),
        seg("0:45–2:00", "Por que essa reformulação importa", ["Muda o objetivo do manejo: reconstruir a crença de capacidade, não apenas \"ensinar a ter opinião\"."]),
        seg("2:00–8:00", "Por que decidir sozinho gera ansiedade (mostrar slide 4)", [
          "Sistema de apego hiperativado, com necessidade intensa de proximidade.",
          "Amígdala com reatividade intensa a sinais de separação.",
          "Córtex pré-frontal com menor autonomia funcional na tomada de decisão.",
          "Sistema de recompensa com alívio acentuado ao ceder responsabilidade a outro.",
        ]),
        seg("8:00–10:30", "Um ponto importante", ["Parte do padrão é evitar a ansiedade de decidir sozinho, não incapacidade real."]),
        seg("10:30–12:00", "Fechamento", [{ fala: "Próxima aula: como esse padrão se consolida ao longo do desenvolvimento." }]),
      ],
    },
    {
      n: 2, titulo: "Do apego inseguro à submissão pervasiva", duracao: "10 min", slides: "5",
      objetivo: "Explicar como apego inseguro (por negligência ou superproteção) consolida a crença central de incapacidade.",
      segmentos: [
        seg("0:00–1:00", "Retomada rápida", ["Vimos as estruturas envolvidas. Hoje vemos como o padrão se forma ao longo do tempo."]),
        seg("1:00–6:30", "A cadeia (mostrar slide 5)", ["Apego inseguro na infância, por cuidado inconsistente ou superproteção.", "Crença central de incapacidade: \"não consigo funcionar sozinho\".", "Busca ativa por figuras que assumam responsabilidade e decisões.", "TP Dependente: padrão pervasivo de submissão e medo de separação."]),
        seg("6:30–9:00", "Um ponto contraintuitivo", ["A superproteção alimenta esse padrão tanto quanto a negligência — falta espaço pra praticar autonomia em ambos os casos."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: os 3 traços centrais do TP Dependente." }]),
      ],
    },
    {
      n: 3, titulo: "Os 3 traços centrais", duracao: "10 min", slides: "6",
      objetivo: "Reconhecer dificuldade de decidir sem orientação, delegação de responsabilidade e medo de separação.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três traços — e um cuidado importante antes de aplicá-los na prática."]),
        seg("1:00–7:00", "Os 3 traços (mostrar slide 6)", [
          "Dificuldade de decidir sem orientação: reasseguramento excessivo antes de decidir.",
          "Delegação de responsabilidade: espera que outros assumam as principais áreas da vida.",
          "Medo de separação: submissão ativa pra manter o vínculo por perto.",
        ]),
        seg("7:00–9:00", "Um cuidado importante", ["Diferenciar isso de dependência real e adaptativa antes de patologizar."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: como reconhecer esse padrão nas 4 dimensões clínicas." }]),
      ],
    },
    {
      n: 4, titulo: "Sinais de alerta", duracao: "10 min", slides: "7",
      objetivo: "Reconhecer sinais cognitivos, comportamentais, relacionais e físicos do padrão dependente.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Reconhecer o padrão com precisão orienta o passo mais delicado do manejo: avaliação de risco relacional."]),
        seg("1:00–7:30", "As 4 categorias (mostrar slide 7)", [
          "Cognitivo: crença de incompetência pessoal.",
          "Comportamental: dificuldade de discordar, busca constante de aprovação.",
          "Relacional: tolerância excessiva a maus-tratos pra não perder o vínculo.",
          "Físico: ativação do sistema de apego/estresse diante de sinais de separação.",
        ]),
        seg("7:30–9:00", "Por que isso importa", ["O sinal relacional, em especial, exige atenção redobrada na prática clínica."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: como diferenciar de quadros parecidos." }]),
      ],
    },
    {
      n: 5, titulo: "Diagnóstico diferencial rápido", duracao: "10 min", slides: "8",
      objetivo: "Diferenciar TP Dependente de TP Evitativa, TP Borderline e dependência adaptativa real.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Um filtro rápido — inclusive um cuidado com contexto cultural e situacional."]),
        seg("1:00–7:00", "Os 3 comparativos (mostrar slide 8)", [
          "TP Evitativa: evita se aproximar por medo de rejeição; dependente se agarra intensamente uma vez vinculada.",
          "TP Borderline: sem a instabilidade extrema de humor/identidade nem a autolesão.",
          "Dependência adaptativa real: contexto de doença física ou cuidado legítimo não configura, por si, transtorno.",
        ]),
        seg("7:00–9:00", "Por que o terceiro ponto importa", ["Evita patologizar dependência situacional legítima."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: os instrumentos que confirmam essa leitura com dado." }]),
      ],
    },
    {
      n: 6, titulo: "Os 3 instrumentos de avaliação", duracao: "11 min", slides: "9",
      objetivo: "Saber quando usar PID-5, SCID-5-PD e IDI.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três instrumentos, três finalidades — um deles é específico pra dependência interpessoal."]),
        seg("1:00–4:30", "PID-5", ["Mapeia os traços patológicos de forma dimensional."]),
        seg("4:30–7:30", "SCID-5-PD", ["Entrevista estruturada.", "Padrão-ouro pra diagnóstico categorial formal."]),
        seg("7:30–10:00", "IDI", ["Específico pra medir o grau de dependência interpessoal e submissão."]),
        seg("10:00–11:00", "Fechamento", [{ fala: "Próxima aula: colocamos tudo em prática — autonomia decisória gradual e tolerância a discordar." }]),
      ],
    },
    {
      n: 7, titulo: "Manejo — autonomia decisória e tolerância a discordar", duracao: "13 min", slides: "10, 11",
      objetivo: "Aplicar os passos 1 e 2 do manejo, começando por decisões de baixo risco.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["A parte prática central desse módulo. Hoje, os 2 primeiros passos."]),
        seg("1:00–2:00", "Visão geral (mostrar slide 10)", ["Autonomia decisória gradual → Tolerância a discordar → Tolerância à separação → Avaliar risco relacional.", "O passo 4 não é opcional — voltamos a ele com atenção especial."]),
        seg("2:00–7:00", "Passo 1 — Autonomia decisória gradual (mostrar slide 11, esquerda)", ["Comece com decisões pequenas e de baixo risco.", "Resista à tentação de decidir pelo paciente, mesmo quando pedido diretamente."]),
        seg("7:00–12:00", "Passo 2 — Tolerância a discordar (mostrar slide 11, direita)", [{ fala: "O que você realmente pensa sobre isso, independente do que eu ou outra pessoa achem?" }, "Valide o desconforto de discordar sem reforçar a busca imediata de reasseguramento."]),
        seg("12:00–13:00", "Fechamento", [{ fala: "Próxima aula: tolerância à separação e avaliação de risco relacional." }]),
      ],
    },
    {
      n: 8, titulo: "Manejo — tolerância à separação e risco relacional", duracao: "14 min", slides: "12",
      objetivo: "Trabalhar tolerância gradual à separação e investigar ativamente sinais de relação de risco.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Hoje fechamos o manejo com o passo mais sensível clinicamente."]),
        seg("1:00–6:30", "Passo 3 — Tolerância à separação (mostrar slide 12, esquerda)", ["Trabalhe gradualmente períodos maiores sem contato com a figura de referência.", "Nomeie a ansiedade de separação como sintoma treinável, não sinal de perigo real."]),
        seg("6:30–13:00", "Passo 4 — Avaliar risco relacional (mostrar slide 12, direita)", ["Investigue ativamente tolerância a maus-tratos — não presuma relato espontâneo.", "O medo de separação pode silenciar o relato."]),
        seg("13:00–14:00", "Fechamento", [{ fala: "Manejo completo. Próxima aula: um caso real e os critérios de quando escalar." }]),
      ],
    },
    {
      n: 9, titulo: "Estudo de caso, encaminhamento e recap", duracao: "15 min", slides: "13, 14, 15",
      objetivo: "Integrar mecanismo, instrumento e manejo num caso completo, com ênfase na avaliação de risco relacional.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Última aula do módulo. Caso completo e os critérios de escalonamento que merecem atenção redobrada aqui."]),
        seg("1:00–7:00", "Estudo de caso — Renata (mostrar slide 13)", ["Leia a vinheta com calma.", "Percorra as 3 perguntas de discussão.", "Convide o aluno a pausar e responder por escrito."]),
        seg("7:00–11:00", "Quando encaminhar (mostrar slide 14)", ["Percorra os 4 critérios, com atenção redobrada a sinais de tolerância a maus-tratos."]),
        seg("11:00–14:00", "Recapitulando o módulo (mostrar slide 15)", ["Retome os 4 pontos-chave.", "Reforce a reformulação central: submissão como estratégia ativa aprendida, não passividade."]),
        seg("14:00–15:00", "Fechamento do módulo", [{ fala: "Agora é hora dos exercícios e da avaliação. Te vejo no próximo transtorno de personalidade." }]),
      ],
    },
  ];

  const totalMin = 12 + 10 + 10 + 10 + 10 + 11 + 13 + 14 + 15;

  const children = [
    ...doc.capa(KICKER, "Roteiro de Aulas — TP Dependente", "Módulo dividido em 9 vídeo-aulas de 10 a 15 minutos, seguindo os slides já produzidos. Cada aula tem roteiro cronometrado, pronto pra gravação."),
    new doc.Paragraph({
      spacing: { before: 60, after: 200 },
      children: [new doc.TextRun({
        text: "Nota importante: este módulo trata de manejo clínico com componente relevante de avaliação de risco relacional. Recomenda-se supervisão específica antes de conduzir atendimentos desse perfil de forma independente.",
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

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", `${RODAPE_DOC} — Roteiro de Aulas`, children), "Modulo-4.18-Roteiro-Aulas.docx");
}

// ============================================================
Promise.resolve()
  .then(construirDeck)
  .then(construirExercicios)
  .then(construirProva)
  .then(construirRoteiro)
  .then(() => console.log("TUDO PRONTO"))
  .catch((e) => { console.error(e); process.exit(1); });

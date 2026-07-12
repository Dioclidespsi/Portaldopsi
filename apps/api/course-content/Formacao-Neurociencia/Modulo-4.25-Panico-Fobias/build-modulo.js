const deck = require("../_lib/lib-deck.js");
const doc = require("../_lib/lib-doc.js");

const MOD = "4.25";
const NOME = "Transtorno de Pânico e Fobias Específicas";
const RODAPE_DECK = `Pânico e Fobias — Módulo ${MOD}`;
const RODAPE_DOC = `Módulo ${MOD} — Pânico e Fobias`;
const KICKER = "MÓDULO 4.25 · PROTOCOLOS CLÍNICOS";

// ============================================================
// 1) SLIDE DECK
// ============================================================
function construirDeck() {
  const pres = deck.novaApresentacao(`${NOME} — Da Neurociência ao Protocolo Clínico`);

  deck.slideTitulo(pres, {
    moduloLabel: `Módulo ${MOD} · Protocolos Clínicos`,
    titulo: "Pânico e Fobias Específicas",
    subtitulo: "Quando o corpo dispara o alarme sem incêndio real",
    passos: ["Mecanismo", "Sinais", "Instrumento", "Protocolo", "Encaminhamento"],
  });

  deck.slideRoteiro(pres, {
    rodape: RODAPE_DECK, pageNum: 2,
    cards: [
      { titulo: "Mecanismo", desc: "Por que uma sensação corporal vira uma crise inteira" },
      { titulo: "Sinais", desc: "Do ataque inesperado à esquiva que o mantém" },
      { titulo: "Instrumento", desc: "PDSS, Mobility Inventory e FSQ na prática" },
      { titulo: "Protocolo", desc: "4 passos, com exposição interoceptiva no centro" },
      { titulo: "Encaminhamento", desc: "Por que descartar causa médica vem primeiro" },
    ],
  });

  deck.slideHook(pres, {
    rodape: RODAPE_DECK, pageNum: 3,
    frase: "No Transtorno de Pânico, o corpo dispara o alarme de incêndio inteiro por causa de uma torrada queimada — e depois a pessoa passa a temer a própria torradeira.",
    apoio: "Essa metáfora resume o ciclo inteiro: uma sensação corporal normal é interpretada como perigo extremo, o que gera mais sensação corporal, num ciclo que se retroalimenta em minutos.",
  });

  deck.slideCircuito(pres, {
    rodape: RODAPE_DECK, pageNum: 4,
    titulo: "Por que uma sensação vira uma crise inteira",
    regioes: [
      { label: "Amígdala (resposta de alarme desproporcional a sensações corporais)", rx: 0.20, ry: 0.22, color: deck.TERRA, d: 0.5 },
      { label: "Ínsula (interpretação catastrófica de sinais interoceptivos)", rx: 0.22, ry: 0.62, color: deck.NAVY, d: 0.4 },
      { label: "Locus coeruleus (ativação noradrenérgica súbita, gatilho da crise)", rx: 0.60, ry: 0.60, color: deck.NAVY_TINT, d: 0.36 },
      { label: "Córtex pré-frontal (falha em conter a escalada do alarme em tempo real)", rx: 0.58, ry: 0.24, color: deck.TERRA_TINT, d: 0.36 },
    ],
    notas: [
      "A amígdala responde a sensações corporais neutras (coração acelerado, tontura) como se fossem sinais de perigo real e imediato.",
      "A ínsula processa esses sinais internos de forma catastrófica — \"meu coração dispara\" vira \"estou tendo um infarto\".",
      "O locus coeruleus, núcleo noradrenérgico, dispara a cascata fisiológica completa da crise em segundos, sem tempo pra avaliação racional.",
    ],
  });

  deck.slideCadeia(pres, {
    rodape: RODAPE_DECK, pageNum: 5,
    titulo: "Do primeiro ataque ao ciclo consolidado",
    elos: [
      { titulo: "Primeiro ataque de pânico", desc: "Muitas vezes disparado por estresse agudo ou hiperventilação, sem causa aparente" },
      { titulo: "Interpretação catastrófica", desc: "Sensações corporais normais são lidas como sinal de perigo extremo" },
      { titulo: "Hipervigilância corporal", desc: "Atenção constante a qualquer sinal físico que possa indicar nova crise" },
      { titulo: "Esquiva consolidada", desc: "Evitação de situações associadas, podendo evoluir pra agorafobia" },
    ],
    notaFinal: "A esquiva alivia a ansiedade no curto prazo, mas é justamente o que mantém o ciclo ativo no longo prazo — o padrão central de todo transtorno de ansiedade.",
  });

  deck.slideCategorias(pres, {
    rodape: RODAPE_DECK, pageNum: 6,
    titulo: "3 traços centrais",
    categorias: [
      { titulo: "Crises recorrentes e inesperadas", desc: "Picos abruptos de medo intenso, sem gatilho externo óbvio", color: deck.TERRA },
      { titulo: "Medo de sensações corporais", desc: "Interpretação catastrófica de sinais fisiológicos normais", color: deck.NAVY },
      { titulo: "Esquiva fóbica", desc: "Evitação de situações, lugares ou estímulos específicos temidos", color: deck.NAVY_TINT },
    ],
    notaFinal: "Em fobias específicas, o mesmo circuito de alarme se ativa, mas ligado a um estímulo bem definido (altura, agulha, animal), não a sensações corporais difusas.",
  });

  deck.slideSinais(pres, {
    rodape: RODAPE_DECK, pageNum: 7,
    titulo: "Como reconhecer o padrão na prática",
    itens: [
      { titulo: "Cognitivo", desc: "Interpretação catastrófica (\"vou infartar\", \"vou enlouquecer\", \"vou desmaiar\")" },
      { titulo: "Comportamental", desc: "Evitação de lugares/situações, comportamentos de segurança (carregar remédio, sentar perto da saída)" },
      { titulo: "Relacional", desc: "Dependência de acompanhante pra atividades consideradas \"seguras\"" },
      { titulo: "Físico", desc: "Taquicardia, sudorese, tontura e falta de ar súbitas durante as crises" },
    ],
  });

  deck.slideDiferencial(pres, {
    rodape: RODAPE_DECK, pageNum: 8,
    titulo: "Diagnóstico diferencial rápido",
    cards: [
      { titulo: "TAG (Módulo 4.1)", desc: "Preocupação difusa e contínua, diferente da crise súbita e discreta do pânico" },
      { titulo: "Causa cardíaca real", desc: "Sempre descartar antes de assumir causa exclusivamente psicológica" },
      { titulo: "TEPT (Módulo 4.6)", desc: "Sintomas parecidos com pânico, mas disparados por pistas específicas ligadas a um trauma" },
    ],
  });

  deck.slideInstrumentos(pres, {
    rodape: RODAPE_DECK, pageNum: 9,
    titulo: "Três instrumentos, três finalidades",
    instrumentos: [
      { sigla: "PDSS", nome: "Panic Disorder Severity Scale", desc: "Mede gravidade e impacto funcional das crises de pânico." },
      { sigla: "Mobility Inventory", nome: "Mobility Inventory for Agoraphobia", desc: "Avalia esquiva situacional associada à agorafobia." },
      { sigla: "FSQ", nome: "Fear Survey Schedule", desc: "Mapeia fobias específicas e sua intensidade." },
    ],
  });

  deck.slideProtocoloOverview(pres, {
    rodape: RODAPE_DECK, pageNum: 10,
    titulo: "Do mecanismo ao protocolo: 4 passos",
    passos: [
      { titulo: "Psicoeducação\ndo ciclo", desc: "Explicar o modelo de interpretação catastrófica do pânico" },
      { titulo: "Exposição\ninteroceptiva", desc: "Provocar deliberadamente as sensações temidas, em ambiente seguro" },
      { titulo: "Exposição\nsituacional", desc: "Hierarquia gradual de situações evitadas, incluindo agorafobia" },
      { titulo: "Reestruturação\ncognitiva", desc: "Questionar as interpretações catastróficas das sensações" },
    ],
    notaFinal: "A exposição interoceptiva é o passo mais específico desse protocolo — reproduzir a sensação temida em segurança quebra o ciclo de evitação do próprio corpo.",
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 11,
    titulo: "Passos 1 e 2, na prática",
    colunas: [
      {
        numero: 1, titulo: "Psicoeducação do ciclo",
        fala: "“O coração acelerado é desconfortável, mas não é perigoso — é o corpo disparando um alarme de incêndio pra uma torrada queimada.”",
        bullets: ["Explique o ciclo sensação → interpretação catastrófica → mais sensação, de forma bem concreta", "Normalize a experiência sem minimizar o sofrimento real durante as crises"],
      },
      {
        numero: 2, titulo: "Exposição interoceptiva",
        bullets: ["Use exercícios como girar em uma cadeira, hiperventilar breve ou subir escadas pra provocar sensações temidas com segurança", "Repita até que a sensação deixe de ser interpretada como perigo"],
      },
    ],
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 12,
    titulo: "Passos 3 e 4, na prática",
    colunas: [
      {
        numero: 3, titulo: "Exposição situacional",
        bullets: ["Construa uma hierarquia de situações evitadas, do menos ao mais temido", "Elimine gradualmente comportamentos de segurança durante a exposição"],
      },
      {
        numero: 4, titulo: "Reestruturação cognitiva",
        fala: "“Que evidência real você tem de que essa sensação significa perigo — e o que mais ela poderia significar?”",
        bullets: ["Questione a interpretação catastrófica com dados concretos (ex: já teve quantas crises sem nenhum dano real?)"],
      },
    ],
  });

  deck.slideCaso(pres, {
    rodape: RODAPE_DECK, pageNum: 13,
    vinheta: "Fábio, 33 anos, teve sua primeira crise de pânico no metrô há 6 meses e foi ao pronto-socorro convencido de que estava tendo um infarto — os exames deram normais. Desde então, evita o metrô, sempre senta perto da porta em qualquer lugar fechado, e carrega um comprimido ansiolítico no bolso \"só por garantia\". Relata que monitora constantemente os batimentos cardíacos e entra em pânico ao notar qualquer aceleração, mesmo depois de exercício físico leve.",
    perguntas: [
      "Que elementos da vinheta ilustram os 3 traços centrais do Transtorno de Pânico?",
      "Por que os comportamentos de segurança de Fábio (sentar perto da porta, carregar o comprimido) mantêm o problema, mesmo trazendo alívio imediato?",
      "Que exercício de exposição interoceptiva você sugeriria pra trabalhar o medo de Fábio da própria taquicardia?",
    ],
  });

  deck.slideEncaminhamento(pres, {
    rodape: RODAPE_DECK, pageNum: 14,
    criterios: [
      "Descartar causas médicas (cardíacas, tireoidianas, neurológicas) antes de assumir causa exclusivamente psicológica",
      "Comorbidade com depressão secundária ao isolamento causado por agorafobia grave",
      "Presença de sintomas de ansiedade generalizada concomitantes: considerar integração com o Módulo 4.1",
      "Uso crônico de ansiolíticos como único manejo, sem exposição associada, tende a manter o ciclo de evitação",
    ],
  });

  deck.slideRecap(pres, {
    rodape: RODAPE_DECK, pageNum: 15,
    pontos: [
      "A amígdala e a ínsula respondem a sensações corporais normais como se fossem sinal de perigo extremo, disparando o ciclo do pânico",
      "Crises recorrentes, medo de sensações corporais e esquiva fóbica são os 3 traços centrais",
      "PDSS, Mobility Inventory e FSQ estruturam a avaliação de gravidade, agorafobia e fobias específicas",
      "A exposição interoceptiva, provocando a sensação temida em segurança, é o componente mais específico e eficaz do protocolo",
    ],
    proximoTexto: "Próximo: exercícios práticos e avaliação do Módulo 4.25 →",
  });

  return pres.writeFile({ fileName: "Modulo-4.25-Panico-Fobias.pptx" });
}

// ============================================================
// 2) EXERCÍCIOS
// ============================================================
function construirExercicios() {
  const children = [
    ...doc.capa(KICKER, "Exercícios — Pânico e Fobias Específicas", "Resolva individualmente antes da sessão de supervisão. O objetivo é testar sua leitura do mecanismo e do protocolo antes de comparar com a discussão em grupo — não há problema em errar."),

    doc.exNum(1, "O mecanismo, em suas palavras"),
    doc.pergunta(1, "Explique em até 3 frases, sem jargão técnico, por que uma sensação corporal normal pode virar uma crise de pânico inteira."),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Por que comportamentos de segurança, que trazem alívio imediato, acabam mantendo o problema no longo prazo?"),
    ...doc.linhaResposta(2),

    doc.exNum(2, "Diagnóstico diferencial"),
    doc.vinhetaBox("Um paciente relata preocupação constante e difusa sobre múltiplas áreas da vida, sem crises súbitas e discretas de pânico."),
    doc.pergunta(1, "Transtorno de Pânico ou TAG (Módulo 4.1)? Justifique com base no padrão temporal do sintoma."),
    ...doc.linhaResposta(2),

    doc.exNum(3, "Exposição interoceptiva"),
    doc.p("Liste 3 exercícios que poderiam provocar, com segurança, sensações corporais comumente temidas no Transtorno de Pânico."),
    doc.tabelaSimples(["Nº", "Exercício"], [["1", ""], ["2", ""], ["3", ""]], [1200, 8150]),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),

    doc.exNum(4, "Reestruturação cognitiva"),
    doc.vinhetaBox("Um paciente diz: \"toda vez que meu coração acelera, tenho certeza que vou ter um ataque cardíaco\"."),
    doc.pergunta(1, "Escreva uma pergunta de reestruturação cognitiva (passo 4) pra essa crença."),
    ...doc.linhaResposta(3),

    doc.exNum(5, "Caso integrado — Fábio"),
    doc.vinhetaBox("Fábio, 33 anos, primeira crise no metrô há 6 meses, exames cardíacos normais, evita metrô, senta perto da porta em lugares fechados, carrega ansiolítico \"por garantia\", monitora os batimentos constantemente."),
    doc.pergunta(1, "Identifique os 3 traços centrais presentes na vinheta."),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Por que os comportamentos de segurança de Fábio mantêm o problema?"),
    ...doc.linhaResposta(2),
    doc.pergunta(3, "Que exercício de exposição interoceptiva você sugeriria pra Fábio?"),
    ...doc.linhaResposta(2),
  ];

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-4.25-Exercicios.docx");
}

// ============================================================
// 3) AVALIAÇÃO
// ============================================================
function construirProva() {
  const objetivas = [
    ["A amígdala, no Transtorno de Pânico, tende a apresentar:", ["Resposta de alarme desproporcional a sensações corporais normais", "Resposta reduzida a qualquer estímulo interno", "Nenhuma alteração relevante em relação à população geral", "Hiperfunção exclusivamente durante o sono"]],
    ["O locus coeruleus, durante uma crise de pânico, é responsável por:", ["Disparar a cascata fisiológica noradrenérgica da crise em segundos", "Processar exclusivamente estímulos visuais", "Reduzir a atividade do sistema nervoso simpático", "Nenhuma função relevante nesse quadro"]],
    ["Os 3 traços centrais do Transtorno de Pânico são:", ["Crises recorrentes e inesperadas, medo de sensações corporais, esquiva fóbica", "Grandiosidade, necessidade de admiração, falta de empatia", "Saudade intensa e persistente, dor emocional sem atenuação, dificuldade de reengajamento", "Desatenção, impulsividade, inquietação interna"]],
    ["O que diferencia Transtorno de Pânico de TAG (Módulo 4.1)?", ["Pânico envolve crises súbitas e discretas; TAG envolve preocupação difusa e contínua", "Não há diferença clínica relevante entre eles", "TAG sempre envolve crises de taquicardia súbita", "Pânico nunca envolve sintomas físicos"]],
    ["Instrumento que mede gravidade e impacto funcional das crises de pânico:", ["PDSS (Panic Disorder Severity Scale)", "PCL-R", "Y-BOCS", "ISI"]],
    ["Por que comportamentos de segurança mantêm o ciclo do pânico?", ["Porque trazem alívio de curto prazo, mas impedem a pessoa de aprender que a sensação não é perigosa", "Porque eliminam completamente qualquer sensação corporal", "Porque não têm qualquer relação com o ciclo de manutenção do transtorno", "Porque aumentam diretamente a gravidade das crises futuras"]],
    ["O passo \"exposição interoceptiva\" tem como objetivo:", ["Provocar deliberadamente as sensações temidas em ambiente seguro", "Evitar completamente qualquer sensação corporal desconfortável", "Eliminar a necessidade de qualquer outro passo do protocolo", "Substituir a reestruturação cognitiva"]],
    ["Antes de assumir causa exclusivamente psicológica pro pânico, o protocolo recomenda:", ["Descartar causas médicas, como cardíacas e tireoidianas", "Iniciar exposição interoceptiva imediatamente, sem qualquer avaliação prévia", "Prescrever ansiolítico como única intervenção", "Ignorar qualquer sintoma físico relatado"]],
    ["Fobias específicas diferem do Transtorno de Pânico principalmente por:", ["Estarem ligadas a um estímulo bem definido, não a sensações corporais difusas", "Nunca envolverem qualquer resposta de medo intenso", "Serem sempre mais graves que o Transtorno de Pânico", "Não terem qualquer base neurobiológica identificável"]],
    ["O uso crônico de ansiolíticos como único manejo, sem exposição associada, tende a:", ["Manter o ciclo de evitação ativo", "Eliminar completamente a necessidade de qualquer outro tratamento", "Curar definitivamente o transtorno em poucas semanas", "Não ter qualquer relação com o padrão de esquiva"]],
  ];
  const gabaritoObjetivas = ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a"];

  const children = [
    ...doc.capa(KICKER, "Avaliação — Pânico e Fobias Específicas", `Avaliação formativa de encerramento do Módulo ${MOD}.`),
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
    doc.vinhetaBox("Renata, 27 anos, tem fobia intensa de agulhas desde a infância, a ponto de evitar consultas médicas de rotina há anos. Recentemente, também começou a ter crises de pânico inesperadas, sem relação com agulhas, que a levaram a evitar sair sozinha. Já foi à emergência 3 vezes achando que estava passando mal gravemente, com exames sempre normais."),
    new doc.Paragraph({ spacing: { before: 240 }, children: [new doc.TextRun({ text: "Com base no protocolo estudado, responda:", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    new doc.Paragraph({ spacing: { before: 220, after: 40 }, children: [new doc.TextRun({ text: "a) (10 pts) Identifique os dois quadros distintos presentes na vinheta.", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "b) (10 pts) Por que as idas à emergência com exames normais não descartam a necessidade de investigação médica contínua?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "c) (10 pts) Que instrumento você usaria pra avaliar especificamente a fobia de agulhas?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "d) (10 pts) Que passo do protocolo você priorizaria primeiro com Renata, considerando os dois quadros presentes?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    new doc.Paragraph({ spacing: { after: 40 }, children: [new doc.TextRun({ text: "USO EXCLUSIVO DO INSTRUTOR — remover antes de aplicar a prova", bold: true, color: doc.TERRA, font: doc.FONT, size: 20 })] }),
    doc.tituloH1("Gabarito"),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 1 — Questões objetivas", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 200 }, children: [new doc.TextRun({ text: gabaritoObjetivas.map((r, i) => `${i + 1}-${r}`).join("   ·   "), font: doc.FONT, size: 22, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 2 — Critério de correção da questão de caso", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "a) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Fobia específica (agulhas), presente desde a infância, e Transtorno de Pânico, com crises inesperadas mais recentes que evoluíram pra evitação de sair sozinha (agorafobia).", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "b) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Exames normais em momentos pontuais não eliminam a necessidade de acompanhamento médico contínuo — mas sustentam, junto ao padrão clínico, a hipótese de causa psicológica primária pras crises.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "c) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "FSQ (Fear Survey Schedule), específico pra mapear fobias e sua intensidade.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "d) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Psicoeducação do ciclo do pânico primeiro, dado o impacto funcional mais recente e agudo (evitação de sair sozinha), antes de avançar pra exposição estruturada de ambos os quadros.", font: doc.FONT, size: 21, color: doc.INK })] }),
  );

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-4.25-Avaliacao.docx");
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
      n: 1, titulo: "Por que uma sensação vira uma crise inteira", duracao: "12 min", slides: "1, 2, 3, 4",
      objetivo: "Sair sabendo explicar o mecanismo do pânico sem jargão, usando a metáfora do alarme de incêndio.",
      segmentos: [
        seg("0:00–0:45", "Abertura (gancho)", [{ fala: "No Transtorno de Pânico, o corpo dispara o alarme de incêndio inteiro por causa de uma torrada queimada — e depois a pessoa passa a temer a própria torradeira." }]),
        seg("0:45–2:00", "Por que essa metáfora importa", ["Resume o ciclo inteiro: sensação normal, interpretação catastrófica, mais sensação."]),
        seg("2:00–8:00", "Por que uma sensação vira uma crise (mostrar slide 4)", [
          "Amígdala com resposta de alarme desproporcional a sensações corporais.",
          "Ínsula com interpretação catastrófica de sinais interoceptivos.",
          "Locus coeruleus disparando a cascata noradrenérgica da crise.",
          "Córtex pré-frontal falhando em conter a escalada em tempo real.",
        ]),
        seg("8:00–10:30", "Um ponto importante", ["O ciclo se retroalimenta em minutos — sensação gera interpretação, que gera mais sensação."]),
        seg("10:30–12:00", "Fechamento", [{ fala: "Próxima aula: como o primeiro ataque vira um ciclo consolidado." }]),
      ],
    },
    {
      n: 2, titulo: "Do primeiro ataque ao ciclo consolidado", duracao: "10 min", slides: "5",
      objetivo: "Explicar a cadeia entre o primeiro ataque, interpretação catastrófica e esquiva consolidada.",
      segmentos: [
        seg("0:00–1:00", "Retomada rápida", ["Vimos as estruturas envolvidas. Hoje vemos como um único evento vira um padrão persistente."]),
        seg("1:00–6:30", "A cadeia (mostrar slide 5)", ["Primeiro ataque, muitas vezes sem causa aparente.", "Interpretação catastrófica das sensações corporais.", "Hipervigilância corporal constante.", "Esquiva consolidada, podendo evoluir pra agorafobia."]),
        seg("6:30–9:00", "O padrão central de todo transtorno de ansiedade", ["A esquiva alivia no curto prazo, mas mantém o ciclo ativo no longo prazo."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: os 3 traços centrais do Transtorno de Pânico." }]),
      ],
    },
    {
      n: 3, titulo: "Os 3 traços centrais", duracao: "10 min", slides: "6",
      objetivo: "Reconhecer crises recorrentes, medo de sensações corporais e esquiva fóbica.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três traços — e a diferença entre pânico e fobia específica."]),
        seg("1:00–7:00", "Os 3 traços (mostrar slide 6)", [
          "Crises recorrentes e inesperadas: picos abruptos de medo intenso.",
          "Medo de sensações corporais: interpretação catastrófica de sinais fisiológicos.",
          "Esquiva fóbica: evitação de situações, lugares ou estímulos específicos.",
        ]),
        seg("7:00–9:00", "Pânico versus fobia específica", ["Mesmo circuito de alarme, mas ligado a um estímulo bem definido, não a sensações corporais difusas."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: como reconhecer esse padrão nas 4 dimensões clínicas." }]),
      ],
    },
    {
      n: 4, titulo: "Sinais de alerta", duracao: "10 min", slides: "7",
      objetivo: "Reconhecer sinais cognitivos, comportamentais, relacionais e físicos do pânico e das fobias.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Reconhecer o padrão com precisão orienta a construção da hierarquia de exposição."]),
        seg("1:00–7:30", "As 4 categorias (mostrar slide 7)", [
          "Cognitivo: interpretação catastrófica das sensações.",
          "Comportamental: evitação, comportamentos de segurança.",
          "Relacional: dependência de acompanhante pra atividades \"seguras\".",
          "Físico: taquicardia, sudorese, tontura súbitas durante as crises.",
        ]),
        seg("7:30–9:00", "Por que isso importa", ["Os comportamentos de segurança, em especial, precisam ser mapeados pra serem eliminados no protocolo."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: como diferenciar de quadros parecidos." }]),
      ],
    },
    {
      n: 5, titulo: "Diagnóstico diferencial rápido", duracao: "11 min", slides: "8",
      objetivo: "Diferenciar Transtorno de Pânico de TAG, causas médicas e TEPT.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Um filtro rápido — descartar causa médica é sempre o primeiro passo, não uma opção."]),
        seg("1:00–8:00", "Os 3 comparativos (mostrar slide 8)", [
          "TAG (Módulo 4.1): preocupação difusa e contínua, diferente da crise súbita e discreta.",
          "Causa cardíaca real: sempre descartar antes de assumir causa psicológica.",
          "TEPT (Módulo 4.6): sintomas parecidos, mas disparados por pistas específicas de trauma.",
        ]),
        seg("8:00–10:30", "Por que descartar causa médica vem primeiro", ["Muitos pacientes com pânico já passaram por emergências médicas achando que era um problema físico grave."]),
        seg("10:30–11:00", "Fechamento", [{ fala: "Próxima aula: os instrumentos que confirmam essa leitura com dado." }]),
      ],
    },
    {
      n: 6, titulo: "Os 3 instrumentos de avaliação", duracao: "11 min", slides: "9",
      objetivo: "Saber quando usar PDSS, Mobility Inventory e FSQ.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três instrumentos, três finalidades — da gravidade das crises à esquiva fóbica específica."]),
        seg("1:00–4:30", "PDSS", ["Mede gravidade e impacto funcional das crises de pânico."]),
        seg("4:30–7:30", "Mobility Inventory", ["Avalia esquiva situacional associada à agorafobia."]),
        seg("7:30–10:00", "FSQ", ["Mapeia fobias específicas e sua intensidade."]),
        seg("10:00–11:00", "Fechamento", [{ fala: "Próxima aula: colocamos tudo em prática — psicoeducação e exposição interoceptiva." }]),
      ],
    },
    {
      n: 7, titulo: "Protocolo — psicoeducação e exposição interoceptiva", duracao: "14 min", slides: "10, 11",
      objetivo: "Aplicar os passos 1 e 2 do protocolo, incluindo a técnica mais específica do pânico.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["A parte mais específica desse protocolo. Hoje, os 2 primeiros passos."]),
        seg("1:00–2:00", "Visão geral (mostrar slide 10)", ["Psicoeducação do ciclo → Exposição interoceptiva → Exposição situacional → Reestruturação cognitiva.", "A exposição interoceptiva é o passo mais específico do pânico."]),
        seg("2:00–7:30", "Passo 1 — Psicoeducação do ciclo (mostrar slide 11, esquerda)", [{ fala: "O coração acelerado é desconfortável, mas não é perigoso — é o corpo disparando um alarme de incêndio pra uma torrada queimada." }]),
        seg("7:30–13:00", "Passo 2 — Exposição interoceptiva (mostrar slide 11, direita)", ["Use exercícios como girar em cadeira, hiperventilar breve ou subir escadas.", "Repita até que a sensação deixe de ser interpretada como perigo."]),
        seg("13:00–14:00", "Fechamento", [{ fala: "Próxima aula: exposição situacional e reestruturação cognitiva." }]),
      ],
    },
    {
      n: 8, titulo: "Protocolo — exposição situacional e reestruturação cognitiva", duracao: "13 min", slides: "12",
      objetivo: "Trabalhar hierarquia de exposição situacional e questionamento das crenças catastróficas.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Hoje fechamos o protocolo com o trabalho situacional e cognitivo."]),
        seg("1:00–7:00", "Passo 3 — Exposição situacional (mostrar slide 12, esquerda)", ["Construa hierarquia de situações evitadas, do menos ao mais temido.", "Elimine gradualmente comportamentos de segurança durante a exposição."]),
        seg("7:00–13:00", "Passo 4 — Reestruturação cognitiva (mostrar slide 12, direita)", [{ fala: "Que evidência real você tem de que essa sensação significa perigo — e o que mais ela poderia significar?" }]),
        seg("13:00–13:00", "Fechamento", [{ fala: "Protocolo completo. Próxima aula: um caso real e os critérios de quando escalar." }]),
      ],
    },
    {
      n: 9, titulo: "Estudo de caso, encaminhamento e recap", duracao: "15 min", slides: "13, 14, 15",
      objetivo: "Integrar mecanismo, instrumento e protocolo num caso completo, com ênfase no descarte médico prévio.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Última aula do módulo. Caso completo e os critérios de quando aprofundar ou referenciar."]),
        seg("1:00–7:00", "Estudo de caso — Fábio (mostrar slide 13)", ["Leia a vinheta com calma.", "Percorra as 3 perguntas de discussão.", "Convide o aluno a pausar e responder por escrito."]),
        seg("7:00–11:00", "Quando encaminhar (mostrar slide 14)", ["Percorra os 4 critérios, com atenção ao descarte médico antes de assumir causa exclusivamente psicológica."]),
        seg("11:00–14:00", "Recapitulando o módulo (mostrar slide 15)", ["Retome os 4 pontos-chave.", "Reforce a metáfora central: alarme de incêndio disparado por uma torrada queimada."]),
        seg("14:00–15:00", "Fechamento do módulo", [{ fala: "Agora é hora dos exercícios e da avaliação. Te vejo no próximo protocolo." }]),
      ],
    },
  ];

  const totalMin = 12 + 10 + 10 + 10 + 11 + 11 + 14 + 13 + 15;

  const children = [
    ...doc.capa(KICKER, "Roteiro de Aulas — Pânico e Fobias Específicas", "Módulo dividido em 9 vídeo-aulas de 10 a 15 minutos, seguindo os slides já produzidos. Cada aula tem roteiro cronometrado, pronto pra gravação."),
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

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", `${RODAPE_DOC} — Roteiro de Aulas`, children), "Modulo-4.25-Roteiro-Aulas.docx");
}

// ============================================================
Promise.resolve()
  .then(construirDeck)
  .then(construirExercicios)
  .then(construirProva)
  .then(construirRoteiro)
  .then(() => console.log("TUDO PRONTO"))
  .catch((e) => { console.error(e); process.exit(1); });

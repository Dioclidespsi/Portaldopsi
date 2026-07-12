const deck = require("../_lib/lib-deck.js");
const doc = require("../_lib/lib-doc.js");

const MOD = "4.14";
const NOME = "Transtorno de Personalidade Borderline";
const RODAPE_DECK = `TP Borderline — Módulo ${MOD}`;
const RODAPE_DOC = `Módulo ${MOD} — TP Borderline`;
const KICKER = "MÓDULO 4.14 · TRANSTORNOS DE PERSONALIDADE · CLUSTER B";

// ============================================================
// 1) SLIDE DECK
// ============================================================
function construirDeck() {
  const pres = deck.novaApresentacao(`${NOME} — Da Neurociência ao Manejo com DBT`);

  deck.slideTitulo(pres, {
    moduloLabel: `Módulo ${MOD} · Cluster B · Transtornos de Personalidade`,
    titulo: "TP Borderline",
    subtitulo: "Desregulação emocional, DBT e segurança clínica",
    passos: ["Mecanismo", "Sinais", "Instrumento", "Manejo", "Encaminhamento"],
  });

  deck.slideRoteiro(pres, {
    rodape: RODAPE_DECK, pageNum: 2,
    cards: [
      { titulo: "Mecanismo", desc: "O modelo biossocial de Linehan, explicado" },
      { titulo: "Sinais", desc: "Instabilidade afetiva, de vínculo e de autoimagem" },
      { titulo: "Instrumento", desc: "ZAN-BPD, BSL-23 e MSI-BPD na prática" },
      { titulo: "Manejo", desc: "As 4 áreas de habilidade da DBT" },
      { titulo: "Encaminhamento", desc: "Segurança clínica é prioridade constante aqui" },
    ],
  });

  deck.slideHook(pres, {
    rodape: RODAPE_DECK, pageNum: 3,
    frase: "TP Borderline não é sobre \"drama\" ou \"manipulação\" — é sobre um sistema nervoso que sente mais rápido, mais forte e demora mais pra voltar ao equilíbrio do que a média.",
    apoio: "Essa reformulação, criada por Marsha Linehan, é a base de todo o manejo baseado em evidência desse transtorno — inclusive da sua própria experiência clínica dela.",
  });

  deck.slideCircuito(pres, {
    rodape: RODAPE_DECK, pageNum: 4,
    titulo: "O que torna a emoção tão intensa e duradoura",
    regioes: [
      { label: "Amígdala (hiper-reativa, resposta emocional amplificada)", rx: 0.22, ry: 0.22, color: deck.TERRA, d: 0.5 },
      { label: "Córtex pré-frontal (regulação descendente reduzida sob estresse)", rx: 0.20, ry: 0.62, color: deck.NAVY, d: 0.4 },
      { label: "Sistema de apego/oxitocina (hipersensível à rejeição percebida)", rx: 0.60, ry: 0.62, color: deck.NAVY_TINT, d: 0.36 },
      { label: "Retorno lento à linha de base emocional (baixa habituação)", rx: 0.58, ry: 0.24, color: deck.TERRA_TINT, d: 0.36 },
    ],
    notas: [
      "A amígdala responde de forma mais intensa e mais rápida a estímulos emocionais, inclusive ambíguos.",
      "O córtex pré-frontal tem dificuldade de \"baixar o volume\" dessa resposta sob estresse — a regulação top-down falha.",
      "O sistema de apego é hipersensível a sinais de rejeição ou abandono, mesmo quando ambíguos ou não-intencionais.",
    ],
  });

  deck.slideCadeia(pres, {
    rodape: RODAPE_DECK, pageNum: 5,
    titulo: "O modelo biossocial de Linehan",
    elos: [
      { titulo: "Vulnerabilidade emocional", desc: "Temperamento com alta sensibilidade, alta reatividade e retorno lento à linha de base" },
      { titulo: "Ambiente invalidante", desc: "Respostas emocionais da criança são repetidamente ignoradas, punidas ou trivializadas" },
      { titulo: "Falha em aprender a regular", desc: "A criança não desenvolve confiança nas próprias respostas emocionais nem habilidade de regulá-las" },
      { titulo: "Desregulação emocional pervasiva", desc: "Base transacional (temperamento × ambiente) do TP Borderline" },
    ],
    notaFinal: "É um modelo transacional: nem só biologia, nem só ambiente — a interação repetida entre os dois, ao longo do desenvolvimento, é o que consolida o padrão.",
  });

  deck.slideCategorias(pres, {
    rodape: RODAPE_DECK, pageNum: 6,
    titulo: "3 traços centrais",
    categorias: [
      { titulo: "Instabilidade afetiva", desc: "Mudanças emocionais rápidas e intensas, em resposta a gatilhos interpessoais", color: deck.TERRA },
      { titulo: "Instabilidade de vínculo/autoimagem", desc: "Idealização-desvalorização, senso de self flutuante", color: deck.NAVY },
      { titulo: "Impulsividade autolesiva", desc: "Comportamentos de risco e autolesão como regulação emocional", color: deck.NAVY_TINT },
    ],
    notaFinal: "A autolesão, nesse quadro, funciona quase sempre como estratégia (disfuncional) de regulação emocional — não como manipulação, embora possa ter efeito interpessoal também.",
  });

  deck.slideSinais(pres, {
    rodape: RODAPE_DECK, pageNum: 7,
    titulo: "Como reconhecer o padrão na prática",
    itens: [
      { titulo: "Cognitivo", desc: "Pensamento dicotômico (tudo-ou-nada), dissociação sob estresse intenso" },
      { titulo: "Comportamental", desc: "Autolesão, impulsividade (gastos, substâncias, sexo de risco)" },
      { titulo: "Relacional", desc: "Medo intenso de abandono, ciclos de idealização e desvalorização" },
      { titulo: "Físico", desc: "Reatividade fisiológica intensa e prolongada a estímulos emocionais" },
    ],
  });

  deck.slideDiferencial(pres, {
    rodape: RODAPE_DECK, pageNum: 8,
    titulo: "Diagnóstico diferencial rápido",
    cards: [
      { titulo: "TP Histriônica", desc: "Busca de atenção sem o padrão de autolesão crônica nem o medo intenso de abandono" },
      { titulo: "Transtorno Bipolar", desc: "Episódios de dias/semanas; borderline muda de humor em horas, por gatilho interpessoal" },
      { titulo: "TEPT Complexo", desc: "Trauma específico é central; borderline combina temperamento + invalidação crônica" },
    ],
  });

  deck.slideInstrumentos(pres, {
    rodape: RODAPE_DECK, pageNum: 9,
    titulo: "Três instrumentos, três finalidades",
    instrumentos: [
      { sigla: "MSI-BPD", nome: "McLean Screening Instrument", desc: "Triagem rápida — indica quando aprofundar a avaliação." },
      { sigla: "ZAN-BPD", nome: "Zanarini Rating Scale", desc: "Mede gravidade dos 9 critérios do DSM-5 e monitora evolução." },
      { sigla: "BSL-23", nome: "Borderline Symptom List", desc: "Autorrelato amplo de sintomas, útil pra acompanhamento contínuo." },
    ],
  });

  deck.slideProtocoloOverview(pres, {
    rodape: RODAPE_DECK, pageNum: 10,
    titulo: "Do mecanismo ao manejo: as 4 áreas da DBT",
    passos: [
      { titulo: "Mindfulness", desc: "Base de todas as outras habilidades — observar sem reagir automaticamente" },
      { titulo: "Tolerância\nao mal-estar", desc: "Atravessar a crise sem piorar a situação" },
      { titulo: "Regulação\nemocional", desc: "Reduzir vulnerabilidade e intensidade emocional ao longo do tempo" },
      { titulo: "Efetividade\ninterpessoal", desc: "Pedir o que precisa e dizer não, mantendo a relação e o autorrespeito" },
    ],
    notaFinal: "DBT (Terapia Comportamental Dialética, Linehan, 1993) é o tratamento com maior evidência de eficácia pra esse transtorno — reduz autolesão e hospitalizações.",
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 11,
    titulo: "Mindfulness e Tolerância ao mal-estar, na prática",
    colunas: [
      {
        numero: 1, titulo: "Mindfulness",
        fala: "“Antes de reagir, observe: o que estou sentindo agora, no corpo, sem tentar mudar isso ainda?”",
        bullets: ["Observar, descrever e participar são as 3 habilidades \"o quê\"", "Sem julgamento, uma coisa de cada vez, com efetividade são as 3 habilidades \"como\""],
      },
      {
        numero: 2, titulo: "Tolerância ao mal-estar",
        bullets: ["Habilidades de crise (STOP, respiração, autoacalmar-se com os 5 sentidos) pra atravessar o pico emocional sem piorar a situação", "Não resolve o problema — só evita que a resposta impulsiva agrave a crise", "Essencial nos momentos de risco de autolesão"],
      },
    ],
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 12,
    titulo: "Regulação emocional e Efetividade interpessoal, na prática",
    colunas: [
      {
        numero: 3, titulo: "Regulação emocional",
        bullets: ["Reduzir vulnerabilidade de base: sono, alimentação, exercício, uso de substâncias", "Nomear a emoção com precisão reduz sua intensidade (\"labeling\")", "Ação oposta: agir de forma contrária ao impulso da emoção, quando ela não é justificada pelos fatos"],
      },
      {
        numero: 4, titulo: "Efetividade interpessoal",
        fala: "“Consigo pedir o que preciso e, ao mesmo tempo, manter a relação e meu respeito por mim mesmo — as duas coisas juntas, não uma ou outra.”",
        bullets: ["DEAR MAN (pedir/recusar de forma efetiva) equilibra objetivo, relação e autorrespeito"],
      },
    ],
  });

  deck.slideCaso(pres, {
    rodape: RODAPE_DECK, pageNum: 13,
    vinheta: "Camila, 24 anos, chega em crise após o namorado demorar a responder uma mensagem. Relata pensamento de \"ele vai me deixar, sempre acontece isso\", seguido de raiva intensa e um episódio de autolesão superficial. Ela alterna entre descrever o namorado como \"a melhor coisa que já aconteceu\" e, horas depois, \"a pior pessoa do mundo\". Relata infância marcada por respostas emocionais frequentemente ignoradas pelos pais.",
    perguntas: [
      "Que elementos da vinheta ilustram o modelo biossocial de Linehan (vulnerabilidade + ambiente invalidante)?",
      "A alternância entre idealização e desvalorização do namorado ilustra qual dos 3 traços centrais?",
      "Que habilidade da DBT (dentre as 4 áreas) você priorizaria no momento agudo da crise, e qual para o trabalho de fundo?",
    ],
  });

  deck.slideEncaminhamento(pres, {
    rodape: RODAPE_DECK, pageNum: 14,
    criterios: [
      "Autolesão ou ideação suicida presentes: ativar imediatamente o protocolo do Módulo 4.9 (avaliação de risco e Safety Planning)",
      "Considerar encaminhamento pra programa estruturado de DBT (individual + grupo de habilidades), padrão-ouro de tratamento",
      "Comorbidade com uso de substâncias ou transtornos alimentares, comum nesse perfil",
      "Sinais de dissociação intensa ou sintomas psicóticos transitórios sob estresse extremo",
    ],
  });

  deck.slideRecap(pres, {
    rodape: RODAPE_DECK, pageNum: 15,
    pontos: [
      "O modelo biossocial de Linehan explica o TP Borderline como vulnerabilidade emocional + ambiente invalidante, não como \"drama\" ou \"manipulação\"",
      "Instabilidade afetiva, de vínculo/autoimagem e impulsividade autolesiva são os 3 traços centrais",
      "MSI-BPD, ZAN-BPD e BSL-23 estruturam triagem, gravidade e acompanhamento",
      "DBT — mindfulness, tolerância ao mal-estar, regulação emocional, efetividade interpessoal — é o tratamento com maior evidência",
    ],
    proximoTexto: "Próximo: exercícios práticos e avaliação do Módulo 4.14 →",
  });

  return pres.writeFile({ fileName: "Modulo-4.14-TP-Borderline.pptx" });
}

// ============================================================
// 2) EXERCÍCIOS
// ============================================================
function construirExercicios() {
  const children = [
    ...doc.capa(KICKER, "Exercícios — TP Borderline", "Resolva individualmente antes da sessão de supervisão. O objetivo é testar sua leitura do mecanismo e do manejo antes de comparar com a discussão em grupo — não há problema em errar."),

    doc.exNum(1, "O mecanismo, em suas palavras"),
    doc.pergunta(1, "Explique o modelo biossocial de Linehan em até 3 frases, sem jargão técnico."),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Por que se diz que a autolesão, nesse quadro, funciona quase sempre como estratégia de regulação emocional?"),
    ...doc.linhaResposta(2),

    doc.exNum(2, "Diagnóstico diferencial"),
    doc.vinhetaBox("Um paciente muda de humor várias vezes ao longo de um único dia, sempre em resposta direta a algo que aconteceu numa relação (uma mensagem não respondida, um comentário)."),
    doc.pergunta(1, "TP Borderline ou Transtorno Bipolar? Justifique com base no padrão temporal e no gatilho."),
    ...doc.linhaResposta(2),

    doc.exNum(3, "As 4 áreas da DBT"),
    doc.tabelaSimples(["Área", "Quando priorizar na prática"], [["Mindfulness", ""], ["Tolerância ao mal-estar", ""], ["Regulação emocional", ""], ["Efetividade interpessoal", ""]], [3000, 6350]),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),

    doc.exNum(4, "Habilidades de crise"),
    doc.pergunta(1, "Descreva uma habilidade de tolerância ao mal-estar que você usaria com um paciente em pico emocional agudo, antes de tentar resolver o problema de fundo."),
    ...doc.linhaResposta(3),

    doc.exNum(5, "Caso integrado — Camila"),
    doc.vinhetaBox("Camila, 24 anos, entra em crise após o namorado demorar a responder uma mensagem. Pensamento de abandono, raiva intensa, autolesão superficial. Alterna entre idealizar e desvalorizar o namorado. Infância com respostas emocionais frequentemente ignoradas."),
    doc.pergunta(1, "Identifique na vinheta os dois componentes do modelo biossocial de Linehan."),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Que habilidade você priorizaria no momento agudo da crise, e qual para o trabalho de fundo?"),
    ...doc.linhaResposta(2),
    doc.pergunta(3, "Que critério do Módulo 4.9 (Ideação Suicida) deveria ser verificado imediatamente aqui?"),
    ...doc.linhaResposta(2),
  ];

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-4.14-Exercicios.docx");
}

// ============================================================
// 3) AVALIAÇÃO
// ============================================================
function construirProva() {
  const objetivas = [
    ["O modelo biossocial de Linehan explica o TP Borderline como resultado de:", ["Vulnerabilidade emocional × ambiente invalidante, ao longo do desenvolvimento", "Apenas fatores genéticos, sem influência ambiental", "Apenas educação parental, sem influência biológica", "Um único evento traumático isolado na vida adulta"]],
    ["A amígdala nesse perfil tende a apresentar:", ["Resposta emocional amplificada e mais rápida a estímulos, inclusive ambíguos", "Resposta emocional reduzida a todos os estímulos", "Nenhuma alteração relevante em relação à população geral", "Hiperfunção exclusivamente durante o sono"]],
    ["Os 3 traços centrais do TP Borderline são:", ["Instabilidade afetiva, de vínculo/autoimagem, e impulsividade autolesiva", "Grandiosidade, necessidade de admiração, falta de empatia", "Desconfiança generalizada, hipervigilância, rancor persistente", "Desconsideração por normas, falta de remorso, impulsividade"]],
    ["A autolesão, no TP Borderline, funciona predominantemente como:", ["Estratégia disfuncional de regulação emocional", "Manipulação deliberada e consciente, sem função regulatória", "Sintoma exclusivamente físico, sem relação com emoção", "Comportamento sem qualquer padrão ou função identificável"]],
    ["Instrumento de triagem rápida que indica quando aprofundar a avaliação de TP Borderline:", ["MSI-BPD", "PCL-R", "Y-BOCS", "MBI"]],
    ["O que diferencia TP Borderline de Transtorno Bipolar?", ["Não há diferença clínica relevante entre eles", "Borderline muda de humor em horas, por gatilho interpessoal; bipolar tem episódios de dias/semanas", "Bipolar sempre envolve autolesão crônica", "Borderline nunca envolve instabilidade de humor"]],
    ["O tratamento com maior evidência de eficácia pro TP Borderline é:", ["DBT (Terapia Comportamental Dialética)", "Apenas medicação, sem psicoterapia associada", "Terapia de choque, sem base em evidência atual", "Não existe tratamento com evidência estabelecida"]],
    ["As 4 áreas de habilidade da DBT são:", ["Mindfulness, tolerância ao mal-estar, regulação emocional, efetividade interpessoal", "Relaxamento, respiração, meditação, ioga", "Confrontação, insight, catarse, interpretação", "Medicação, hospitalização, isolamento, contenção"]],
    ["Diante de autolesão ou ideação suicida num paciente com TP Borderline, o protocolo indicado é:", ["Ativar o protocolo do Módulo 4.9 (avaliação de risco e Safety Planning)", "Aguardar a próxima sessão agendada, sem intervenção imediata", "Ignorar, pois é considerado comportamento manipulativo típico", "Encerrar o vínculo terapêutico imediatamente"]],
    ["\"Ação oposta\", técnica de regulação emocional da DBT, consiste em:", ["Agir de forma contrária ao impulso da emoção, quando ela não é justificada pelos fatos", "Sempre reprimir qualquer expressão emocional", "Evitar completamente situações que gerem emoção", "Amplificar a emoção até que ela passe sozinha"]],
  ];
  const gabaritoObjetivas = ["a", "a", "a", "a", "a", "b", "a", "a", "a", "a"];

  const children = [
    ...doc.capa(KICKER, "Avaliação — TP Borderline", `Avaliação formativa de encerramento do Módulo ${MOD}.`),
    doc.infoBox([
      ["Nota de corte:", "75 de 100 pontos (nota mais alta, dada a relevância da avaliação de risco)"],
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
    doc.vinhetaBox("Bruna, 29 anos, relata episódios frequentes de raiva intensa seguidos de arrependimento, cortes superficiais nos braços \"pra sentir alguma coisa diferente da dor emocional\", e uma sensação crônica de vazio. Descreve as relações como \"perfeitas no início e um desastre depois\", e teve 2 idas ao pronto-socorro por ideação suicida no último ano."),
    new doc.Paragraph({ spacing: { before: 240 }, children: [new doc.TextRun({ text: "Com base no protocolo estudado, responda:", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    new doc.Paragraph({ spacing: { before: 220, after: 40 }, children: [new doc.TextRun({ text: "a) (10 pts) Que critérios do TP Borderline estão claramente presentes na vinheta?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "b) (10 pts) Qual deveria ser a prioridade clínica imediata, considerando o histórico de idas ao pronto-socorro?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "c) (10 pts) Que instrumento você usaria pra acompanhar a gravidade dos sintomas ao longo do tratamento, e por quê?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "d) (10 pts) Que habilidade da DBT ajudaria diretamente com os cortes usados \"pra sentir alguma coisa diferente da dor emocional\"?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    new doc.Paragraph({ spacing: { after: 40 }, children: [new doc.TextRun({ text: "USO EXCLUSIVO DO INSTRUTOR — remover antes de aplicar a prova", bold: true, color: doc.TERRA, font: doc.FONT, size: 20 })] }),
    doc.tituloH1("Gabarito"),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 1 — Questões objetivas", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 200 }, children: [new doc.TextRun({ text: gabaritoObjetivas.map((r, i) => `${i + 1}-${r}`).join("   ·   "), font: doc.FONT, size: 22, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 2 — Critério de correção da questão de caso", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "a) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Instabilidade afetiva (raiva intensa), autolesão como regulação emocional, sensação crônica de vazio, instabilidade de relacionamentos (idealização-desvalorização), e ideação suicida recorrente.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "b) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Avaliação de risco formal e ativação do protocolo do Módulo 4.9 — histórico de 2 idas ao pronto-socorro exige avaliação estruturada, não pode ser tratado como rotina.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "c) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "ZAN-BPD, por medir a gravidade dos 9 critérios do DSM-5 e permitir monitorar evolução ao longo do tratamento.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "d) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Tolerância ao mal-estar (habilidades de crise, como autoacalmar-se com os 5 sentidos) como substituto imediato do corte; regulação emocional pra trabalhar o vazio crônico a médio prazo.", font: doc.FONT, size: 21, color: doc.INK })] }),
  );

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-4.14-Avaliacao.docx");
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
      n: 1, titulo: "Reformulando o TP Borderline", duracao: "12 min", slides: "1, 2, 3, 4",
      objetivo: "Sair sabendo explicar o modelo biossocial sem jargão, e desfazer o estigma de \"manipulação\" e \"drama\".",
      segmentos: [
        seg("0:00–0:45", "Abertura (gancho)", [{ fala: "TP Borderline não é sobre drama ou manipulação — é sobre um sistema nervoso que sente mais rápido, mais forte e demora mais pra voltar ao equilíbrio do que a média." }]),
        seg("0:45–2:00", "Por que essa reformulação importa", ["Criada por Marsha Linehan — que teve experiência pessoal com o transtorno.", "Base de todo o manejo com evidência nesse quadro."]),
        seg("2:00–8:00", "O que torna a emoção tão intensa (mostrar slide 4)", [
          "Amígdala hiper-reativa, com resposta emocional amplificada.",
          "Córtex pré-frontal com regulação descendente reduzida sob estresse.",
          "Sistema de apego hipersensível à rejeição percebida.",
          "Retorno lento à linha de base emocional.",
        ]),
        seg("8:00–10:30", "Um ponto importante", ["Isso não é fraqueza de caráter — é uma diferença mensurável em como o cérebro processa emoção."]),
        seg("10:30–12:00", "Fechamento", [{ fala: "Próxima aula: como temperamento e ambiente se combinam pra formar o padrão completo." }]),
      ],
    },
    {
      n: 2, titulo: "O modelo biossocial de Linehan", duracao: "11 min", slides: "5",
      objetivo: "Explicar a interação transacional entre vulnerabilidade emocional e ambiente invalidante.",
      segmentos: [
        seg("0:00–1:00", "Retomada rápida", ["Vimos as estruturas envolvidas. Hoje vemos como o padrão se consolida ao longo do desenvolvimento."]),
        seg("1:00–7:00", "A cadeia (mostrar slide 5)", ["Vulnerabilidade emocional: temperamento com alta sensibilidade e retorno lento à linha de base.", "Ambiente invalidante: respostas emocionais da criança repetidamente ignoradas ou punidas.", "Falha em aprender a regular: a criança não desenvolve confiança nas próprias emoções.", "Desregulação emocional pervasiva: base transacional do TP Borderline."]),
        seg("7:00–9:30", "Por que é um modelo transacional", ["Nem só biologia, nem só ambiente — a interação repetida entre os dois é o que consolida o padrão."]),
        seg("9:30–11:00", "Fechamento", [{ fala: "Próxima aula: os 3 traços centrais do TP Borderline." }]),
      ],
    },
    {
      n: 3, titulo: "Os 3 traços centrais", duracao: "10 min", slides: "6",
      objetivo: "Reconhecer instabilidade afetiva, de vínculo/autoimagem e impulsividade autolesiva.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três traços — e uma reformulação importante sobre o papel da autolesão."]),
        seg("1:00–7:00", "Os 3 traços (mostrar slide 6)", [
          "Instabilidade afetiva: mudanças emocionais rápidas e intensas, por gatilho interpessoal.",
          "Instabilidade de vínculo/autoimagem: idealização-desvalorização, senso de self flutuante.",
          "Impulsividade autolesiva: comportamentos de risco e autolesão como regulação emocional.",
        ]),
        seg("7:00–9:00", "Sobre a autolesão", ["Funciona quase sempre como estratégia (disfuncional) de regulação emocional — não como manipulação."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: como reconhecer esse padrão nas 4 dimensões clínicas." }]),
      ],
    },
    {
      n: 4, titulo: "Sinais de alerta", duracao: "10 min", slides: "7",
      objetivo: "Reconhecer sinais cognitivos, comportamentais, relacionais e físicos do padrão borderline.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Reconhecer o padrão com precisão orienta o resto do manejo."]),
        seg("1:00–7:30", "As 4 categorias (mostrar slide 7)", [
          "Cognitivo: pensamento dicotômico, dissociação sob estresse intenso.",
          "Comportamental: autolesão, impulsividade.",
          "Relacional: medo intenso de abandono, ciclos de idealização e desvalorização.",
          "Físico: reatividade fisiológica intensa e prolongada.",
        ]),
        seg("7:30–9:00", "Por que isso importa", ["Esses sinais, juntos e persistentes, sustentam a hipótese diagnóstica e orientam a escolha de instrumento."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: como diferenciar de quadros parecidos." }]),
      ],
    },
    {
      n: 5, titulo: "Diagnóstico diferencial rápido", duracao: "11 min", slides: "8",
      objetivo: "Diferenciar TP Borderline de TP Histriônica, Transtorno Bipolar e TEPT Complexo.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Um filtro rápido — o padrão temporal é a chave de uma das diferenciações mais comuns na prática."]),
        seg("1:00–7:30", "Os 3 quadros (mostrar slide 8)", [
          "TP Histriônica: busca de atenção sem autolesão crônica nem medo intenso de abandono.",
          "Transtorno Bipolar: episódios de dias/semanas; borderline muda de humor em horas, por gatilho.",
          "TEPT Complexo: trauma específico central; borderline combina temperamento + invalidação crônica.",
        ]),
        seg("7:30–10:00", "Por que a diferenciação com bipolar importa tanto", ["É um dos erros diagnósticos mais comuns na prática — muda completamente o plano de tratamento."]),
        seg("10:00–11:00", "Fechamento", [{ fala: "Próxima aula: os instrumentos que confirmam essa leitura com dado." }]),
      ],
    },
    {
      n: 6, titulo: "Os 3 instrumentos de avaliação", duracao: "11 min", slides: "9",
      objetivo: "Saber quando usar MSI-BPD, ZAN-BPD e BSL-23.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três instrumentos, três finalidades — do rastreio rápido ao acompanhamento contínuo."]),
        seg("1:00–4:30", "MSI-BPD", ["Triagem rápida.", "Indica quando aprofundar a avaliação."]),
        seg("4:30–7:30", "ZAN-BPD", ["Mede gravidade dos 9 critérios do DSM-5.", "Útil pra monitorar evolução ao longo do tratamento."]),
        seg("7:30–10:00", "BSL-23", ["Autorrelato amplo de sintomas.", "Bom pra acompanhamento contínuo entre sessões."]),
        seg("10:00–11:00", "Fechamento", [{ fala: "Próxima aula: colocamos tudo em prática com as duas primeiras áreas da DBT." }]),
      ],
    },
    {
      n: 7, titulo: "DBT — mindfulness e tolerância ao mal-estar", duracao: "14 min", slides: "10, 11",
      objetivo: "Aplicar as 2 primeiras áreas de habilidade da DBT, com ênfase em manejo de crise aguda.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["A parte prática que você vai usar sessão a sessão. Hoje, as 2 primeiras áreas."]),
        seg("1:00–2:00", "Visão geral (mostrar slide 10)", ["Mindfulness → Tolerância ao mal-estar → Regulação emocional → Efetividade interpessoal.", "DBT é o tratamento com maior evidência de eficácia pra esse transtorno."]),
        seg("2:00–7:30", "Mindfulness (mostrar slide 11, esquerda)", [{ fala: "Antes de reagir, observe: o que estou sentindo agora, no corpo, sem tentar mudar isso ainda?" }, "Observar, descrever e participar são as 3 habilidades \"o quê\".", "Sem julgamento, uma coisa de cada vez, com efetividade são as 3 habilidades \"como\"."]),
        seg("7:30–13:00", "Tolerância ao mal-estar (mostrar slide 11, direita)", ["Habilidades de crise pra atravessar o pico emocional sem piorar a situação.", "Não resolve o problema — só evita que a resposta impulsiva agrave a crise.", "Essencial nos momentos de risco de autolesão."]),
        seg("13:00–14:00", "Fechamento", [{ fala: "Próxima aula: regulação emocional e efetividade interpessoal." }]),
      ],
    },
    {
      n: 8, titulo: "DBT — regulação emocional e efetividade interpessoal", duracao: "14 min", slides: "12",
      objetivo: "Trabalhar as duas últimas áreas de habilidade, com foco no trabalho de fundo.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Hoje fechamos as 4 áreas da DBT com o trabalho de médio prazo."]),
        seg("1:00–7:00", "Regulação emocional (mostrar slide 12, esquerda)", ["Reduzir vulnerabilidade de base: sono, alimentação, exercício, substâncias.", "Nomear a emoção com precisão reduz sua intensidade.", "Ação oposta: agir de forma contrária ao impulso, quando a emoção não é justificada pelos fatos."]),
        seg("7:00–13:00", "Efetividade interpessoal (mostrar slide 12, direita)", [{ fala: "Consigo pedir o que preciso e, ao mesmo tempo, manter a relação e meu respeito por mim mesmo — as duas coisas juntas, não uma ou outra." }, "DEAR MAN equilibra objetivo, relação e autorrespeito."]),
        seg("13:00–14:00", "Fechamento", [{ fala: "Manejo completo. Próxima aula: um caso real e os critérios de quando escalar." }]),
      ],
    },
    {
      n: 9, titulo: "Estudo de caso, encaminhamento e recap", duracao: "15 min", slides: "13, 14, 15",
      objetivo: "Integrar mecanismo, instrumento e manejo num caso completo, com ênfase na conexão com o protocolo de risco de suicídio.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Última aula do módulo. Caso completo e os critérios de escalonamento que aqui merecem atenção redobrada."]),
        seg("1:00–7:00", "Estudo de caso — Camila (mostrar slide 13)", ["Leia a vinheta com calma.", "Percorra as 3 perguntas de discussão.", "Convide o aluno a pausar e responder por escrito."]),
        seg("7:00–11:00", "Quando encaminhar (mostrar slide 14)", ["Percorra os 4 critérios — reforce a conexão direta com o Módulo 4.9 sempre que houver autolesão ou ideação suicida."]),
        seg("11:00–14:00", "Recapitulando o módulo (mostrar slide 15)", ["Retome os 4 pontos-chave.", "Reforce a reformulação central: sistema nervoso mais sensível, não \"drama\" ou \"manipulação\"."]),
        seg("14:00–15:00", "Fechamento do módulo", [{ fala: "Agora é hora dos exercícios e da avaliação. Te vejo no próximo transtorno de personalidade." }]),
      ],
    },
  ];

  const totalMin = 12 + 11 + 10 + 10 + 11 + 11 + 14 + 14 + 15;

  const children = [
    ...doc.capa(KICKER, "Roteiro de Aulas — TP Borderline", "Módulo dividido em 9 vídeo-aulas de 10 a 15 minutos, seguindo os slides já produzidos. Cada aula tem roteiro cronometrado, pronto pra gravação."),
    new doc.Paragraph({
      spacing: { before: 60, after: 200 },
      children: [new doc.TextRun({
        text: "Nota importante: este módulo trata de manejo clínico com componente relevante de risco de autolesão e suicídio. Recomenda-se supervisão específica antes de conduzir atendimentos desse perfil de forma independente.",
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

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", `${RODAPE_DOC} — Roteiro de Aulas`, children), "Modulo-4.14-Roteiro-Aulas.docx");
}

// ============================================================
Promise.resolve()
  .then(construirDeck)
  .then(construirExercicios)
  .then(construirProva)
  .then(construirRoteiro)
  .then(() => console.log("TUDO PRONTO"))
  .catch((e) => { console.error(e); process.exit(1); });

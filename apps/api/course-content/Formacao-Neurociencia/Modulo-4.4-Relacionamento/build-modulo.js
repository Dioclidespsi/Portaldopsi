const deck = require("../_lib/lib-deck.js");
const doc = require("../_lib/lib-doc.js");

const MOD = "4.4";
const NOME = "Relacionamento e Terapia de Casal";
const RODAPE_DECK = `Relacionamento — Módulo ${MOD}`;
const RODAPE_DOC = `Módulo ${MOD} — Relacionamento`;
const KICKER = "MÓDULO 4.4 · PROTOCOLOS CLÍNICOS DIRETOS AO PONTO";

// ============================================================
// 1) SLIDE DECK
// ============================================================
function construirDeck() {
  const pres = deck.novaApresentacao(`${NOME} — Da Neurociência ao Protocolo Clínico`);

  deck.slideTitulo(pres, {
    moduloLabel: `Módulo ${MOD} · Protocolos Clínicos Diretos ao Ponto`,
    titulo: "Relacionamento",
    subtitulo: "Da neurociência do vínculo ao protocolo de terapia de casal",
    passos: ["Mecanismo", "Sinais", "Instrumento", "Protocolo", "Encaminhamento"],
  });

  deck.slideRoteiro(pres, {
    rodape: RODAPE_DECK, pageNum: 2,
    cards: [
      { titulo: "Mecanismo", desc: "O que acontece no cérebro em conflito de casal" },
      { titulo: "Sinais", desc: "O que avisa que o padrão está cronificando" },
      { titulo: "Instrumento", desc: "DAS e triagem de segurança na prática" },
      { titulo: "Protocolo", desc: "4 passos, prontos pra sessão" },
      { titulo: "Encaminhamento", desc: "Quando isso não basta" },
    ],
  });

  deck.slideHook(pres, {
    rodape: RODAPE_DECK, pageNum: 3,
    frase: "Em conflito, o cérebro trata o parceiro como ameaça — não porque o amor acabou, mas porque o sistema de defesa assumiu o comando.",
    apoio: "É essa distinção que costuma tirar o casal do \"quem está certo\" e levar pra \"o que está acontecendo entre nós\".",
  });

  deck.slideCircuito(pres, {
    rodape: RODAPE_DECK, pageNum: 4,
    titulo: "O cérebro no vínculo e no conflito",
    regioes: [
      { label: "Amígdala (ameaça em conflito)", rx: 0.24, ry: 0.64, color: deck.TERRA, d: 0.4 },
      { label: "Sistema de recompensa (vínculo seguro)", rx: 0.58, ry: 0.64, color: deck.NAVY_TINT, d: 0.36 },
      { label: "Córtex pré-frontal (regulação, \"sequestrado\" em briga)", rx: 0.18, ry: 0.20, color: deck.NAVY, d: 0.5 },
      { label: "Hipocampo (memória de padrões relacionais antigos)", rx: 0.60, ry: 0.26, color: deck.TERRA_TINT, d: 0.32 },
    ],
    notas: [
      "Oxitocina liberada em vínculo seguro reduz reatividade da amígdala — e o inverso também é verdade.",
      "Em conflito, a amígdala pode \"sequestrar\" o córtex pré-frontal — por isso é tão difícil \"pensar direito\" numa briga.",
      "O hipocampo traz à tona brigas antigas — o que explica reações desproporcionais a conflitos pequenos.",
    ],
  });

  deck.slideCadeia(pres, {
    rodape: RODAPE_DECK, pageNum: 5,
    titulo: "Do gatilho ao ciclo de conflito",
    elos: [
      { titulo: "Gatilho", desc: "Um comentário, tom de voz ou silêncio é interpretado como ameaça" },
      { titulo: "Amígdala ativa defesa", desc: "O parceiro passa a ser lido como ameaça, não como aliado" },
      { titulo: "Comunicação vira defesa", desc: "Ataque-defesa substitui escuta e resolução" },
      { titulo: "Ciclo se repete", desc: "Cada repetição reforça o padrão e a desconfiança" },
    ],
    notaFinal: "Quebrar esse ciclo é justamente o que os passos 3 e 4 do protocolo (comunicação e reparação) fazem.",
  });

  deck.slideCategorias(pres, {
    rodape: RODAPE_DECK, pageNum: 6,
    titulo: "O padrão perseguir–afastar",
    categorias: [
      { titulo: "Perseguição", desc: "Busca intensa de contato, crítica, cobrança — intensifica quando não tem resposta", color: deck.TERRA },
      { titulo: "Afastamento", desc: "Retraimento, evitação, silêncio como forma de se proteger do conflito", color: deck.NAVY },
      { titulo: "Congelamento mútuo", desc: "Os dois se fecham — comunicação praticamente para", color: deck.NAVY_TINT },
    ],
    notaFinal: "Um parceiro costuma puxar mais pra perseguição, o outro pra afastamento — e cada reação alimenta a do outro.",
  });

  deck.slideSinais(pres, {
    rodape: RODAPE_DECK, pageNum: 7,
    titulo: "O que avisa que o padrão está cronificando",
    itens: [
      { titulo: "Cognitivo", desc: "Leitura automática de intenção negativa (\"ele fez de propósito\")" },
      { titulo: "Físico", desc: "Tensão corporal só de ouvir o tom de voz do parceiro" },
      { titulo: "Comportamental", desc: "Evitar tópicos inteiros, sarcasmo recorrente" },
      { titulo: "Relacional", desc: "Queda de toque físico, conversas cada vez mais superficiais" },
    ],
  });

  deck.slideDiferencial(pres, {
    rodape: RODAPE_DECK, pageNum: 8,
    titulo: "Diagnóstico diferencial rápido",
    cards: [
      { titulo: "Conflito normal", desc: "Acontece, mas se resolve — não trava a comunicação de forma persistente" },
      { titulo: "Padrão cronificado", desc: "Perseguir-afastar recorrente, ciclo se repete sem resolução real" },
      { titulo: "Violência doméstica", desc: "Não é terapia de casal padrão — exige protocolo de segurança separado" },
    ],
  });

  deck.slideInstrumentos(pres, {
    rodape: RODAPE_DECK, pageNum: 9,
    titulo: "Três instrumentos, três finalidades",
    instrumentos: [
      { sigla: "DAS", nome: "Escala de Ajustamento Diádico", desc: "Mede satisfação geral do relacionamento — consenso, coesão, expressão afetiva." },
      { sigla: "ECC", nome: "Escala de Comunicação do Casal", desc: "Avalia especificamente o padrão de comunicação e resolução de conflito." },
      { sigla: "TSR", nome: "Triagem de Segurança Relacional", desc: "Checklist breve de rastreio de violência — obrigatório antes de iniciar terapia de casal padrão." },
    ],
  });

  deck.slideProtocoloOverview(pres, {
    rodape: RODAPE_DECK, pageNum: 10,
    titulo: "Do mecanismo à intervenção: 4 passos",
    passos: [
      { titulo: "Psicoeducação\ndo mecanismo", desc: "Nomear a ativação de ameaça no conflito" },
      { titulo: "Mapeamento\ndo padrão", desc: "Identificar o ciclo perseguir-afastar específico do casal" },
      { titulo: "Intervenção em\ncomunicação", desc: "Desescalada e tempo de pausa estruturado" },
      { titulo: "Reparação\nde vínculo", desc: "Momentos de conexão e ritual de reparo pós-conflito" },
    ],
    notaFinal: "Nas próximas 2 telas, cada passo ganha um exemplo pronto pra levar pra sessão.",
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 11,
    titulo: "Passos 1 e 2, na prática",
    colunas: [
      {
        numero: 1, titulo: "Psicoeducação do mecanismo",
        fala: "“Quando vocês brigam, o cérebro de cada um está tratando o outro como ameaça — não porque o amor acabou, mas porque o sistema de defesa assumiu o comando.”",
        bullets: ["Tira o casal do \"quem está certo\"", "Cria linguagem compartilhada pra falar do padrão sem culpar"],
      },
      {
        numero: 2, titulo: "Mapeamento do padrão",
        bullets: ["Pergunte a cada um: \"o que você faz quando sente que está perdendo o outro?\"", "Identifique quem perseguiu, quem se afastou, e o gatilho mais comum", "Desenhe o ciclo junto com o casal, em voz alta"],
      },
    ],
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 12,
    titulo: "Passos 3 e 4, na prática",
    colunas: [
      {
        numero: 3, titulo: "Intervenção em comunicação",
        bullets: ["Tempo de pausa estruturado: quando a intensidade sobe, ambos concordam em pausar", "Compromisso de retomar a conversa em horário combinado — evita perseguição sem fim e afastamento sem retorno", "Escuta ativa: repetir o que o outro disse antes de responder"],
      },
      {
        numero: 4, titulo: "Reparação de vínculo",
        bullets: ["Ritual de reparo pós-conflito (ex: check-in curto no fim do dia)", "Reconstruir momentos de conexão fora do contexto de conflito", "Pequenos gestos consistentes pesam mais que grandes declarações isoladas"],
      },
    ],
  });

  deck.slideCaso(pres, {
    rodape: RODAPE_DECK, pageNum: 13,
    vinheta: "Marcos e Renata, casados há 8 anos, procuram terapia porque \"não conseguem mais conversar sem brigar\". Renata diz que Marcos \"sempre se fecha e sai da sala\" quando ela tenta discutir algo importante. Marcos diz que sente que \"nada que ele faz é suficiente\" e prefere se afastar a discutir. O toque físico praticamente sumiu. Negam episódios de violência física ou verbal grave. DAS indica baixo ajustamento diádico.",
    perguntas: [
      "Que padrão de conflito está descrito, e quem assume qual papel?",
      "A triagem de segurança é suficiente aqui pra prosseguir com terapia de casal padrão? Justifique.",
      "Sugira uma intervenção do passo 3 (comunicação) adequada pro padrão identificado.",
    ],
  });

  deck.slideEncaminhamento(pres, {
    rodape: RODAPE_DECK, pageNum: 14,
    criterios: [
      "Violência doméstica identificada — exige protocolo de segurança separado, não terapia de casal conjunta padrão",
      "Infidelidade não resolvida travando o processo — pode exigir trabalho individual antes do conjunto",
      "Um dos parceiros com quadro psiquiátrico não tratado que precisa de atenção individual primeiro",
      "Padrão de conflito sem qualquer avanço após 12 semanas de protocolo bem conduzido",
    ],
  });

  deck.slideRecap(pres, {
    rodape: RODAPE_DECK, pageNum: 15,
    pontos: [
      "Em conflito, o cérebro trata o parceiro como ameaça — não é falta de amor",
      "O padrão perseguir-afastar explica a maioria dos ciclos de conflito cronificado",
      "DAS, Escala de Comunicação e triagem de segurança formam a base da avaliação",
      "O protocolo de 4 passos vai de psicoeducação a reparação de vínculo",
    ],
    proximoTexto: "Próximo: exercícios práticos e avaliação do Módulo 4.4 →",
  });

  return pres.writeFile({ fileName: "Modulo-4.4-Relacionamento.pptx" });
}

// ============================================================
// 2) EXERCÍCIOS
// ============================================================
function construirExercicios() {
  const children = [
    ...doc.capa(KICKER, "Exercícios — Relacionamento", "Resolva individualmente antes da sessão de supervisão. O objetivo é testar sua leitura do mecanismo e do protocolo antes de comparar com a discussão em grupo — não há problema em errar."),

    doc.exNum(1, "O mecanismo, em suas palavras"),
    doc.pergunta(1, "Explique em até 3 frases, sem jargão técnico, por que um casal \"que se ama\" ainda assim se trata como inimigo numa briga."),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Cite os 3 papéis do padrão perseguir-afastar e dê um exemplo de comportamento observável pra cada um."),
    ...doc.linhaResposta(2),

    doc.exNum(2, "Leitura de escala"),
    doc.vinhetaBox("Um casal pontua baixo na DAS (Escala de Ajustamento Diádico), mas nega qualquer episódio de violência na triagem de segurança."),
    doc.pergunta(1, "Esse casal é candidato a terapia de casal padrão? Por quê?"),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Que outro instrumento você aplicaria em seguida, e com qual objetivo?"),
    ...doc.linhaResposta(1),

    doc.exNum(3, "Diagnóstico diferencial"),
    doc.vinhetaBox("Camila relata que o parceiro \"grita e a impede de sair de casa durante as discussões\", e que já teve marcas no braço numa briga há 2 meses."),
    doc.pergunta(1, "Esse caso segue pra terapia de casal padrão? Justifique com base no protocolo."),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Qual deveria ser o primeiro passo clínico aqui?"),
    ...doc.linhaResposta(1),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),

    doc.exNum(4, "Mapeamento do padrão de conflito"),
    doc.p("Para o caso de Marcos e Renata (vinheta da aula), mapeie o ciclo de conflito em 3 etapas: gatilho → reação de cada parceiro → resultado."),
    doc.tabelaSimples(["Etapa", "O que acontece"], [["Gatilho", ""], ["Reação de Renata", ""], ["Reação de Marcos", ""]], [2500, 6850]),

    doc.exNum(5, "Caso integrado — Marcos e Renata"),
    doc.vinhetaBox("Marcos e Renata, casados há 8 anos, procuram terapia porque \"não conseguem mais conversar sem brigar\". Renata busca contato e discussão; Marcos se fecha e se afasta. Toque físico praticamente sumiu. Negam violência. DAS indica baixo ajustamento diádico."),
    doc.pergunta(1, "Escreva a frase de psicoeducação que você usaria com o casal."),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Sugira um ritual de reparação de vínculo (passo 4) adequado pro casal."),
    ...doc.linhaResposta(2),
    doc.pergunta(3, "Em que ponto você consideraria que o padrão não está respondendo ao protocolo?"),
    ...doc.linhaResposta(2),
  ];

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-4.4-Exercicios.docx");
}

// ============================================================
// 3) AVALIAÇÃO
// ============================================================
function construirProva() {
  const objetivas = [
    ["Qual sistema biológico está na base do vínculo de apego adulto?", ["Sistema de apego e oxitocina", "Sistema motor", "Sistema vestibular", "Córtex occipital"]],
    ["Em conflito de casal, a amígdala tende a:", ["Desligar completamente", "Interpretar o parceiro como ameaça, ativando defesa em vez de conexão", "Não ter papel algum no processo", "Ser ativada apenas em violência física"]],
    ["O padrão \"perseguir-afastar\" descreve:", ["Um casal sempre em harmonia total", "Um parceiro busca contato/intensifica enquanto o outro se retrai/evita", "Dois parceiros fisicamente violentos", "Ausência completa de conflito"]],
    ["Qual instrumento mede satisfação geral do relacionamento?", ["DAS (Escala de Ajustamento Diádico)", "BAI", "Y-BOCS", "MBI"]],
    ["Por que uma triagem de segurança é essencial antes de terapia de casal padrão?", ["Não é realmente necessária", "Terapia de casal convencional pode ser contraindicada em contextos de violência doméstica", "Só importa em casais muito jovens", "É apenas uma formalidade burocrática"]],
    ["Sinal cognitivo de alerta num padrão de conflito cronificado:", ["Leitura automática de intenção negativa nas ações do parceiro", "Excesso de elogios mútuos", "Aumento de intimidade física", "Ausência de qualquer desconforto"]],
    ["O passo 3 do protocolo (intervenção em comunicação) inclui:", ["Ignorar o padrão de conflito", "Técnicas de desescalada e tempo de pausa estruturado", "Aumentar a intensidade das discussões", "Evitar qualquer conversa difícil pra sempre"]],
    ["Reparação de vínculo (passo 4) se refere a:", ["Apenas resolver o conflito específico daquele dia", "Momentos de conexão e rituais de reparo, reconstruindo segurança emocional", "Ignorar o que aconteceu na briga", "Culpar publicamente um dos parceiros"]],
    ["É critério de encaminhamento fora da terapia de casal padrão:", ["O casal discordar eventualmente", "Violência doméstica identificada", "Um dos parceiros ter opinião diferente", "O casal ter menos de 1 ano de relação"]],
    ["Conflito normal de casal se diferencia de padrão cronificado porque:", ["Conflito normal nunca acontece", "Conflito normal se resolve e não trava a comunicação de forma persistente", "São exatamente a mesma coisa", "Padrão cronificado é sempre físico"]],
  ];
  const gabaritoObjetivas = ["a", "b", "b", "a", "b", "a", "b", "b", "b", "b"];

  const children = [
    ...doc.capa(KICKER, "Avaliação — Relacionamento", `Avaliação formativa de encerramento do Módulo ${MOD}.`),
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
    doc.vinhetaBox("Ana e Pedro, namoram há 3 anos, procuram terapia porque \"as mesmas brigas se repetem sempre\". Pedro diz que Ana \"cobra atenção o tempo todo\" e ele \"só quer um tempo sozinho\", o que faz Ana se sentir rejeitada e insistir ainda mais. Nenhum dos dois relata violência. DAS indica ajustamento moderado-baixo. Ambos estão motivados a melhorar a relação."),
    new doc.Paragraph({ spacing: { before: 240 }, children: [new doc.TextRun({ text: "Com base no protocolo estudado, responda:", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    new doc.Paragraph({ spacing: { before: 220, after: 40 }, children: [new doc.TextRun({ text: "a) (10 pts) Que padrão de conflito está descrito, e quem assume qual papel?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "b) (10 pts) Interprete o resultado da DAS — o que esse escore indica sobre o relacionamento?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(1),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "c) (10 pts) Descreva a frase de psicoeducação que você usaria com o casal.", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "d) (10 pts) Sugira uma intervenção do passo 3 (comunicação) específica pro padrão de Ana e Pedro.", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    new doc.Paragraph({ spacing: { after: 40 }, children: [new doc.TextRun({ text: "USO EXCLUSIVO DO INSTRUTOR — remover antes de aplicar a prova", bold: true, color: doc.TERRA, font: doc.FONT, size: 20 })] }),
    doc.tituloH1("Gabarito"),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 1 — Questões objetivas", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 200 }, children: [new doc.TextRun({ text: gabaritoObjetivas.map((r, i) => `${i + 1}-${r}`).join("   ·   "), font: doc.FONT, size: 22, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 2 — Critério de correção da questão de caso", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "a) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Perseguir-afastar — Ana perseguição (cobrança de atenção, insiste mais quando rejeitada), Pedro afastamento (busca distância/tempo sozinho).", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "b) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Ajustamento moderado-baixo indica dificuldade real de satisfação conjunta, mas não um quadro extremo — combinado com motivação de ambos, bom prognóstico pra terapia de casal padrão.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "c) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Nomear que a busca de Ana e o afastamento de Pedro são duas formas do mesmo medo — perder a conexão — e que o padrão se retroalimenta, não é falta de amor de nenhum dos dois.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "d) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Tempo de pausa estruturado com compromisso de retomada combinada — atende à necessidade de espaço de Pedro sem deixar Ana com a sensação de abandono sem previsão de retorno.", font: doc.FONT, size: 21, color: doc.INK })] }),
  );

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-4.4-Avaliacao.docx");
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
      n: 1, titulo: "Por que o cérebro trata o parceiro como ameaça", duracao: "12 min", slides: "1, 2, 3, 4",
      objetivo: "Sair sabendo explicar o mecanismo do conflito de casal sem jargão, tirando o casal do \"quem está certo\".",
      segmentos: [
        seg("0:00–0:45", "Abertura (gancho)", [{ fala: "Em conflito, o cérebro trata o parceiro como ameaça — não porque o amor acabou, mas porque o sistema de defesa assumiu o comando." }]),
        seg("0:45–2:00", "Por que isso importa clinicamente", ["Tira o casal da lógica de culpa e leva pro padrão compartilhado.", "Isso é o Passo 1 da anatomia de todo protocolo do curso: Mecanismo."]),
        seg("2:00–8:00", "O cérebro no vínculo e no conflito (mostrar slide 4)", [
          "Amígdala interpreta o parceiro como ameaça durante o conflito.",
          "Sistema de recompensa e oxitocina sustentam o vínculo seguro.",
          "Córtex pré-frontal é \"sequestrado\" em briga — por isso é difícil pensar direito.",
          "Hipocampo traz brigas antigas à tona, amplificando reações pequenas.",
        ]),
        seg("8:00–10:30", "Como levar isso pra sessão", [{ fala: "Quando vocês brigam, o cérebro de cada um está tratando o outro como ameaça — não porque o amor acabou." }]),
        seg("10:30–12:00", "Fechamento", [{ fala: "Próxima aula: o ciclo completo, do gatilho ao padrão de conflito repetido." }]),
      ],
    },
    {
      n: 2, titulo: "Do gatilho ao ciclo de conflito", duracao: "10 min", slides: "5",
      objetivo: "Explicar a cadeia gatilho–defesa–ataque/defesa–repetição.",
      segmentos: [
        seg("0:00–1:00", "Retomada rápida", ["Vimos o que ativa no cérebro. Hoje vemos como isso vira ciclo."]),
        seg("1:00–6:30", "A cadeia (mostrar slide 5)", ["Um gatilho é lido como ameaça.", "Amígdala ativa defesa — o parceiro deixa de ser aliado.", "Comunicação vira ataque-defesa.", "O ciclo se repete e se reforça a cada rodada."]),
        seg("6:30–9:00", "Por que nomear isso quebra o ciclo", ["Casal para de brigar sobre o conteúdo e passa a reconhecer o padrão."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: o padrão perseguir-afastar, o mais comum em terapia de casal." }]),
      ],
    },
    {
      n: 3, titulo: "O padrão perseguir–afastar", duracao: "10 min", slides: "6",
      objetivo: "Reconhecer perseguição, afastamento e congelamento mútuo como papéis do mesmo ciclo.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Um padrão, dois papéis diferentes — e cada um alimenta o outro."]),
        seg("1:00–7:00", "Perseguir, afastar, congelar (mostrar slide 6)", [
          "Perseguição: busca intensa de contato, crítica, cobrança.",
          "Afastamento: retraimento, evitação, silêncio.",
          "Congelamento mútuo: os dois se fecham ao mesmo tempo.",
        ]),
        seg("7:00–9:00", "Aplicação prática", ["Pergunte a cada parceiro: \"o que você faz quando sente que está perdendo o outro?\"", "A resposta já revela o papel de cada um no ciclo."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: os sinais de que esse padrão está cronificando." }]),
      ],
    },
    {
      n: 4, titulo: "Sinais de alerta", duracao: "10 min", slides: "7",
      objetivo: "Reconhecer sinais precoces de cronificação do padrão de conflito.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Reconhecer cedo evita meses de desgaste acumulado."]),
        seg("1:00–7:30", "As 4 categorias (mostrar slide 7)", [
          "Cognitivo: leitura automática de intenção negativa.",
          "Físico: tensão corporal ao ouvir o tom de voz do parceiro.",
          "Comportamental: evitar tópicos inteiros, sarcasmo recorrente.",
          "Relacional: queda de toque físico, conversas cada vez mais superficiais.",
        ]),
        seg("7:30–9:00", "Por que isso importa", ["Esses sinais aparecem antes da briga explícita — é a janela de intervenção."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: como diferenciar conflito normal de padrão cronificado — e de violência." }]),
      ],
    },
    {
      n: 5, titulo: "Diagnóstico diferencial rápido", duracao: "12 min", slides: "8",
      objetivo: "Diferenciar conflito normal, padrão cronificado e contextos de violência que exigem outro protocolo.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Um filtro rápido — e essencial pra segurança do processo."]),
        seg("1:00–8:00", "Os 3 quadros (mostrar slide 8)", [
          "Conflito normal: acontece, mas se resolve.",
          "Padrão cronificado: ciclo perseguir-afastar recorrente, sem resolução real.",
          "Violência doméstica: não é terapia de casal padrão — protocolo de segurança separado.",
        ]),
        seg("8:00–10:30", "Por que a triagem de segurança vem antes de tudo", ["Terapia de casal convencional pode ser contraindicada — ou perigosa — em contexto de violência."]),
        seg("10:30–12:00", "Fechamento", [{ fala: "Próxima aula: os instrumentos que confirmam essa leitura com dado." }]),
      ],
    },
    {
      n: 6, titulo: "Os 3 instrumentos de avaliação", duracao: "12 min", slides: "9",
      objetivo: "Saber quando usar DAS, Escala de Comunicação e triagem de segurança.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três instrumentos, três finalidades diferentes."]),
        seg("1:00–4:30", "DAS", ["Mede satisfação geral: consenso, coesão, expressão afetiva."]),
        seg("4:30–7:30", "Escala de Comunicação do Casal", ["Avalia especificamente o padrão de comunicação e resolução de conflito."]),
        seg("7:30–10:00", "Triagem de Segurança Relacional", ["Checklist breve — obrigatório antes de iniciar terapia de casal padrão."]),
        seg("10:00–12:00", "Como escolher na prática", ["Triagem de segurança sempre primeiro; DAS na sequência; Escala de Comunicação pra aprofundar o padrão.", { fala: "Próxima aula: colocamos tudo em prática — psicoeducação e mapeamento do padrão." }]),
      ],
    },
    {
      n: 7, titulo: "Protocolo — psicoeducação e mapeamento", duracao: "14 min", slides: "10, 11",
      objetivo: "Aplicar os passos 1 e 2 do protocolo com script de psicoeducação e mapeamento do ciclo de conflito.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["A parte que você vai usar amanhã. Hoje, os 2 primeiros passos."]),
        seg("1:00–2:00", "Visão geral (mostrar slide 10)", ["Psicoeducação → Mapeamento → Comunicação → Reparação de vínculo."]),
        seg("2:00–7:00", "Passo 1 — Psicoeducação (mostrar slide 11, esquerda)", [{ fala: "Quando vocês brigam, o cérebro de cada um está tratando o outro como ameaça." }]),
        seg("7:00–13:00", "Passo 2 — Mapeamento do padrão (mostrar slide 11, direita)", ["Pergunte a cada um o que faz quando sente que está perdendo o outro.", "Desenhe o ciclo junto com o casal, em voz alta."]),
        seg("13:00–14:00", "Fechamento", [{ fala: "Próxima aula: intervenção em comunicação e reparação de vínculo." }]),
      ],
    },
    {
      n: 8, titulo: "Protocolo — comunicação e reparação de vínculo", duracao: "14 min", slides: "12",
      objetivo: "Aplicar técnicas de desescalada e montar rituais de reparação de vínculo.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Hoje fechamos o protocolo com a parte mais prática."]),
        seg("1:00–7:00", "Passo 3 — Intervenção em comunicação (mostrar slide 12, esquerda)", ["Tempo de pausa estruturado, com compromisso de retomada combinada.", "Escuta ativa: repetir o que o outro disse antes de responder."]),
        seg("7:00–13:00", "Passo 4 — Reparação de vínculo (mostrar slide 12, direita)", ["Ritual de reparo pós-conflito (ex: check-in curto no fim do dia).", "Pequenos gestos consistentes pesam mais que grandes declarações isoladas."]),
        seg("13:00–14:00", "Fechamento", [{ fala: "Protocolo completo. Próxima aula: um caso real e os critérios de quando encaminhar." }]),
      ],
    },
    {
      n: 9, titulo: "Estudo de caso, encaminhamento e recap", duracao: "15 min", slides: "13, 14, 15",
      objetivo: "Integrar mecanismo, instrumento e protocolo num caso completo, com ênfase em segurança.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Última aula do módulo. Caso completo e os limites da terapia de casal padrão."]),
        seg("1:00–7:00", "Estudo de caso — Marcos e Renata (mostrar slide 13)", ["Leia a vinheta com calma.", "Percorra as 3 perguntas de discussão.", "Convide o aluno a pausar e responder por escrito."]),
        seg("7:00–11:00", "Quando encaminhar (mostrar slide 14)", ["Percorra os 4 critérios — ênfase especial em violência doméstica."]),
        seg("11:00–14:00", "Recapitulando o módulo (mostrar slide 15)", ["Retome os 4 pontos-chave.", "Reforce a anatomia de 5 passos, comum a todo protocolo do curso."]),
        seg("14:00–15:00", "Fechamento do módulo", [{ fala: "Agora é hora dos exercícios e da avaliação. Te vejo no próximo protocolo." }]),
      ],
    },
  ];

  const totalMin = 12 + 10 + 10 + 10 + 12 + 12 + 14 + 14 + 15;

  const children = [
    ...doc.capa(KICKER, "Roteiro de Aulas — Relacionamento", "Módulo dividido em 9 vídeo-aulas de 10 a 15 minutos, seguindo os slides já produzidos. Cada aula tem roteiro cronometrado, pronto pra gravação."),
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

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", `${RODAPE_DOC} — Roteiro de Aulas`, children), "Modulo-4.4-Roteiro-Aulas.docx");
}

// ============================================================
Promise.resolve()
  .then(construirDeck)
  .then(construirExercicios)
  .then(construirProva)
  .then(construirRoteiro)
  .then(() => console.log("TUDO PRONTO"))
  .catch((e) => { console.error(e); process.exit(1); });

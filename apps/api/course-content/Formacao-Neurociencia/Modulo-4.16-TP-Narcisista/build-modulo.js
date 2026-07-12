const deck = require("../_lib/lib-deck.js");
const doc = require("../_lib/lib-doc.js");

const MOD = "4.16";
const NOME = "Transtorno de Personalidade Narcisista";
const RODAPE_DECK = `TP Narcisista — Módulo ${MOD}`;
const RODAPE_DOC = `Módulo ${MOD} — TP Narcisista`;
const KICKER = "MÓDULO 4.16 · TRANSTORNOS DE PERSONALIDADE · CLUSTER B";

// ============================================================
// 1) SLIDE DECK
// ============================================================
function construirDeck() {
  const pres = deck.novaApresentacao(`${NOME} — Da Neurociência ao Manejo`);

  deck.slideTitulo(pres, {
    moduloLabel: `Módulo ${MOD} · Cluster B · Transtornos de Personalidade`,
    titulo: "TP Narcisista",
    subtitulo: "Grandiosidade como defesa de um self frágil",
    passos: ["Mecanismo", "Sinais", "Instrumento", "Manejo", "Encaminhamento"],
  });

  deck.slideRoteiro(pres, {
    rodape: RODAPE_DECK, pageNum: 2,
    cards: [
      { titulo: "Mecanismo", desc: "Por que a grandiosidade é uma defesa, não um traço isolado" },
      { titulo: "Sinais", desc: "Grandioso e vulnerável: dois lados do mesmo padrão" },
      { titulo: "Instrumento", desc: "PID-5, NPI e PNI na prática" },
      { titulo: "Manejo", desc: "4 passos, sem confrontar a grandiosidade de frente" },
      { titulo: "Encaminhamento", desc: "Injúria narcísica e risco associado" },
    ],
  });

  deck.slideHook(pres, {
    rodape: RODAPE_DECK, pageNum: 3,
    frase: "A grandiosidade no TP Narcisista não é excesso de autoestima — é a defesa construída sobre um self que, no fundo, teme profundamente não ter valor.",
    apoio: "Essa é a virada teórica de Kohut e Kernberg: confrontar a grandiosidade de frente geralmente rompe o vínculo terapêutico, porque ataca exatamente a defesa que segura o paciente de pé.",
  });

  deck.slideCircuito(pres, {
    rodape: RODAPE_DECK, pageNum: 4,
    titulo: "O que sustenta a grandiosidade e a fragilidade por trás dela",
    regioes: [
      { label: "Ínsula anterior (menor ativação em tarefas de empatia)", rx: 0.20, ry: 0.22, color: deck.NAVY, d: 0.5 },
      { label: "Sistema de recompensa (hiper-responsivo à admiração externa)", rx: 0.22, ry: 0.62, color: deck.TERRA, d: 0.4 },
      { label: "Amígdala (reatividade intensa à ameaça ao ego)", rx: 0.60, ry: 0.60, color: deck.TERRA_TINT, d: 0.36 },
      { label: "Córtex cingulado anterior (processamento reduzido de crítica social)", rx: 0.58, ry: 0.24, color: deck.NAVY_TINT, d: 0.36 },
    ],
    notas: [
      "A ínsula anterior, envolvida no processamento empático, mostra menor ativação em tarefas que pedem tomada de perspectiva do outro.",
      "O sistema de recompensa responde de forma amplificada a sinais de admiração — funcionando quase como regulador externo de autoestima.",
      "A amígdala reage intensamente a qualquer ameaça percebida ao ego, o que explica a reação desproporcional a críticas — a chamada \"injúria narcísica\".",
    ],
  });

  deck.slideCadeia(pres, {
    rodape: RODAPE_DECK, pageNum: 5,
    titulo: "Da validação condicional ao self grandioso",
    elos: [
      { titulo: "Validação condicional na infância", desc: "Amor/atenção contingente a desempenho, ou superavaliação sem sintonia genuína" },
      { titulo: "Self frágil e propenso à vergonha", desc: "Núcleo de autovalor que nunca se consolidou de forma estável" },
      { titulo: "Construção de um self grandioso defensivo", desc: "Estrutura que protege o núcleo frágil de ser sentido diretamente" },
      { titulo: "TP Narcisista", desc: "Necessidade crônica de admiração externa pra manter a defesa em pé" },
    ],
    notaFinal: "É por isso que uma crítica ou fracasso pode gerar uma queda desproporcional — a chamada injúria narcísica, quando a defesa falha e o self frágil fica momentaneamente exposto.",
  });

  deck.slideCategorias(pres, {
    rodape: RODAPE_DECK, pageNum: 6,
    titulo: "3 traços centrais",
    categorias: [
      { titulo: "Grandiosidade", desc: "Senso inflado de importância e de talento", color: deck.NAVY },
      { titulo: "Necessidade de admiração", desc: "Dependência de validação externa constante", color: deck.TERRA },
      { titulo: "Falta de empatia", desc: "Dificuldade genuína de reconhecer a perspectiva emocional do outro", color: deck.NAVY_TINT },
    ],
    notaFinal: "Existem dois subtipos clínicos: o grandioso (mais visível, confiante, dominante) e o vulnerável (hipersensível, ansioso, defensivo) — ambos compartilham o núcleo frágil.",
  });

  deck.slideSinais(pres, {
    rodape: RODAPE_DECK, pageNum: 7,
    titulo: "Como reconhecer o padrão na prática",
    itens: [
      { titulo: "Cognitivo", desc: "Comparação social constante, sensibilidade extrema à crítica" },
      { titulo: "Comportamental", desc: "Exploração interpessoal, arrogância, busca de status" },
      { titulo: "Relacional", desc: "Dificuldade de reciprocidade genuína, uso do outro como \"espelho\"" },
      { titulo: "Físico", desc: "Reatividade fisiológica intensa diante de ameaça ao ego (injúria narcísica)" },
    ],
  });

  deck.slideDiferencial(pres, {
    rodape: RODAPE_DECK, pageNum: 8,
    titulo: "Diagnóstico diferencial rápido",
    cards: [
      { titulo: "TP Antissocial", desc: "Busca ganho/poder concreto, sem necessidade central de admiração" },
      { titulo: "TP Histriônica", desc: "Busca atenção em geral; narcisista busca admiração específica por grandiosidade" },
      { titulo: "Alta autoestima saudável", desc: "Tolera crítica e reconhece limites, sem depender de validação externa constante" },
    ],
  });

  deck.slideInstrumentos(pres, {
    rodape: RODAPE_DECK, pageNum: 9,
    titulo: "Três instrumentos, três finalidades",
    instrumentos: [
      { sigla: "PID-5", nome: "Personality Inventory for DSM-5", desc: "Mapeia os traços patológicos de forma dimensional." },
      { sigla: "NPI", nome: "Narcissistic Personality Inventory", desc: "Foca no subtipo grandioso, mais visível clinicamente." },
      { sigla: "PNI", nome: "Pathological Narcissism Inventory", desc: "Captura tanto o subtipo grandioso quanto o vulnerável." },
    ],
  });

  deck.slideProtocoloOverview(pres, {
    rodape: RODAPE_DECK, pageNum: 10,
    titulo: "Do mecanismo ao manejo: 4 passos",
    passos: [
      { titulo: "Aliança sem\nconfronto direto", desc: "Evitar atacar a grandiosidade de frente no início do vínculo" },
      { titulo: "Autoestima\ngenuína", desc: "Construir valor pessoal que não dependa de admiração externa" },
      { titulo: "Empatia\ngradual", desc: "Desenvolver, aos poucos, a capacidade de reconhecer a perspectiva do outro" },
      { titulo: "Tolerância\nà imperfeição", desc: "Suportar crítica e fracasso sem colapso nem retaliação" },
    ],
    notaFinal: "Confrontar a grandiosidade cedo demais costuma gerar ruptura do vínculo — a defesa precisa ser respeitada antes de ser gentilmente questionada.",
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 11,
    titulo: "Passos 1 e 2, na prática",
    colunas: [
      {
        numero: 1, titulo: "Aliança sem confronto direto",
        fala: "“Quero entender melhor como você vê essa situação, antes de qualquer outra coisa.”",
        bullets: ["Priorize compreensão empática da experiência subjetiva do paciente antes de questionar distorções", "Evite confrontações diretas sobre grandiosidade nas fases iniciais do vínculo"],
      },
      {
        numero: 2, titulo: "Autoestima genuína",
        bullets: ["Ajude o paciente a reconhecer conquistas reais, sem depender de comparação ou admiração externa", "Trabalhe a diferença entre valor pessoal e desempenho/status"],
      },
    ],
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 12,
    titulo: "Passos 3 e 4, na prática",
    colunas: [
      {
        numero: 3, titulo: "Empatia gradual",
        bullets: ["Use perguntas que convidem, sem exigir, a tomada de perspectiva do outro (\"o que você acha que essa pessoa sentiu?\")", "Progresso costuma ser lento e não-linear — não é um objetivo de curto prazo"],
      },
      {
        numero: 4, titulo: "Tolerância à imperfeição",
        fala: "“Errar aqui não muda o seu valor como pessoa — dá pra explorar isso com calma.”",
        bullets: ["Trabalhe pequenas exposições a falha e crítica, com suporte ativo do terapeuta", "Monitore sinais de injúria narcísica (retraimento, raiva intensa, desvalorização do terapeuta)"],
      },
    ],
  });

  deck.slideCaso(pres, {
    rodape: RODAPE_DECK, pageNum: 13,
    vinheta: "Eduardo, 38 anos, é encaminhado após uma demissão inesperada. Relata que sempre foi \"o melhor em tudo que fez\" e que a demissão \"só prova que ninguém reconhece talento de verdade\". Fica visivelmente irritado quando o terapeuta faz perguntas que soam como questionamento, e minimiza o impacto emocional da perda, mas nas últimas semanas relata insônia e um comentário isolado de que \"às vezes penso que seria mais fácil não estar aqui\".",
    perguntas: [
      "Que elementos da vinheta sustentam a hipótese de grandiosidade como defesa, e não como excesso de autoestima saudável?",
      "Que sinal na vinheta indica risco que precisa ser avaliado imediatamente, independente do diagnóstico de personalidade?",
      "Como você aplicaria o passo 1 (aliança sem confronto direto) na primeira resposta a Eduardo?",
    ],
  });

  deck.slideEncaminhamento(pres, {
    rodape: RODAPE_DECK, pageNum: 14,
    criterios: [
      "Qualquer menção a desejo de morte ou desesperança após injúria narcísica: ativar imediatamente o protocolo do Módulo 4.9",
      "Sintomas depressivos significativos após fracasso, perda de status ou humilhação pública",
      "Rupturas recorrentes de vínculo terapêutico por injúria narcísica não-manejada",
      "Comorbidade com uso de substâncias como forma de regular a fragilidade do self",
    ],
  });

  deck.slideRecap(pres, {
    rodape: RODAPE_DECK, pageNum: 15,
    pontos: [
      "A grandiosidade no TP Narcisista é uma defesa construída sobre um self frágil, não um excesso de autoestima",
      "Grandiosidade, necessidade de admiração e falta de empatia são os 3 traços centrais — com subtipos grandioso e vulnerável",
      "PID-5, NPI e PNI estruturam a avaliação, cobrindo os dois subtipos clínicos",
      "O manejo evita confronto direto precoce e trabalha autoestima genuína, empatia gradual e tolerância à imperfeição",
    ],
    proximoTexto: "Próximo: exercícios práticos e avaliação do Módulo 4.16 →",
  });

  return pres.writeFile({ fileName: "Modulo-4.16-TP-Narcisista.pptx" });
}

// ============================================================
// 2) EXERCÍCIOS
// ============================================================
function construirExercicios() {
  const children = [
    ...doc.capa(KICKER, "Exercícios — TP Narcisista", "Resolva individualmente antes da sessão de supervisão. O objetivo é testar sua leitura do mecanismo e do manejo antes de comparar com a discussão em grupo — não há problema em errar."),

    doc.exNum(1, "O mecanismo, em suas palavras"),
    doc.pergunta(1, "Explique em até 3 frases, sem jargão técnico, por que a grandiosidade é descrita como uma defesa, e não como excesso de autoestima."),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "O que é \"injúria narcísica\", e por que ela é clinicamente relevante?"),
    ...doc.linhaResposta(2),

    doc.exNum(2, "Diagnóstico diferencial"),
    doc.vinhetaBox("Um paciente busca constantemente reconhecimento e validação por suas conquistas, mas não apresenta desconsideração por normas nem histórico de exploração financeira ou legal de outras pessoas."),
    doc.pergunta(1, "TP Narcisista ou TP Antissocial? Justifique com base no elemento central da motivação."),
    ...doc.linhaResposta(2),

    doc.exNum(3, "Subtipos grandioso e vulnerável"),
    doc.tabelaSimples(["Característica", "Grandioso", "Vulnerável"], [["Apresentação típica", "", ""], ["Reação à crítica", "", ""]], [3200, 3100, 3050]),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),

    doc.exNum(4, "Aliança terapêutica"),
    doc.vinhetaBox("Um paciente narcisista reage com irritação visível quando o terapeuta questiona uma de suas afirmações grandiosas na segunda sessão."),
    doc.pergunta(1, "Que erro técnico provavelmente ocorreu aqui, considerando o passo 1 do manejo?"),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Reescreva a intervenção de forma mais alinhada ao passo 1 (aliança sem confronto direto)."),
    ...doc.linhaResposta(2),

    doc.exNum(5, "Caso integrado — Eduardo"),
    doc.vinhetaBox("Eduardo, 38 anos, demitido inesperadamente, minimiza o impacto emocional e atribui a demissão à falta de reconhecimento de talento. Fica irritado com perguntas que soam como questionamento. Relata insônia e um comentário isolado sobre \"seria mais fácil não estar aqui\"."),
    doc.pergunta(1, "Que sinal na vinheta exige avaliação de risco imediata, independente do diagnóstico de personalidade?"),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Como você aplicaria o passo 1 (aliança sem confronto direto) na primeira resposta a Eduardo?"),
    ...doc.linhaResposta(2),
    doc.pergunta(3, "Que módulo deste curso você ativaria diante do comentário sobre \"seria mais fácil não estar aqui\"?"),
    ...doc.linhaResposta(1),
  ];

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-4.16-Exercicios.docx");
}

// ============================================================
// 3) AVALIAÇÃO
// ============================================================
function construirProva() {
  const objetivas = [
    ["Segundo o modelo teórico apresentado, a grandiosidade no TP Narcisista funciona como:", ["Defesa construída sobre um self frágil e propenso à vergonha", "Excesso simples e direto de autoestima saudável", "Sintoma sem qualquer função psicológica identificável", "Resultado exclusivo de fatores genéticos, sem influência do desenvolvimento"]],
    ["A ínsula anterior, nesse perfil, tende a apresentar:", ["Menor ativação em tarefas de tomada de perspectiva/empatia", "Maior ativação em todas as tarefas cognitivas", "Nenhuma alteração relevante em relação à população geral", "Hiperfunção exclusivamente durante o sono"]],
    ["Os 3 traços centrais do TP Narcisista são:", ["Grandiosidade, necessidade de admiração, falta de empatia", "Desconsideração por normas, falta de remorso, impulsividade", "Busca excessiva de atenção, emocionalidade dramática, sugestionabilidade", "Desconfiança generalizada, hipervigilância, rancor persistente"]],
    ["\"Injúria narcísica\" se refere a:", ["Uma queda emocional desproporcional diante de crítica ou fracasso, quando a defesa grandiosa falha", "Um tipo de lesão física comum nesse perfil", "Sinônimo de baixa autoestima crônica sem qualquer defesa associada", "Um critério diagnóstico exclusivo do subtipo vulnerável"]],
    ["Instrumento que capta tanto o subtipo grandioso quanto o vulnerável do narcisismo patológico:", ["PNI (Pathological Narcissism Inventory)", "PCL-R", "Y-BOCS", "MBI"]],
    ["O que diferencia TP Narcisista de TP Antissocial?", ["Não há diferença clínica relevante entre eles", "Narcisista busca admiração; antissocial busca ganho/poder concreto sem essa necessidade central", "Antissocial sempre busca reconhecimento e validação social", "Narcisista nunca explora relações interpessoais"]],
    ["Por que confrontar a grandiosidade de frente logo no início do tratamento costuma ser um erro técnico?", ["Porque geralmente rompe o vínculo terapêutico, atacando a defesa que sustenta o paciente", "Porque é proibido por lei fazer qualquer questionamento nesse perfil", "Porque não há nenhuma grandiosidade real nesse transtorno", "Porque o paciente nunca percebe o confronto"]],
    ["O subtipo \"vulnerável\" do narcisismo se caracteriza por:", ["Hipersensibilidade, ansiedade e defensividade, mais do que confiança visível", "Ausência completa de qualquer necessidade de admiração", "Comportamento idêntico ao subtipo grandioso em todos os aspectos", "Presença obrigatória de autolesão crônica"]],
    ["Diante de um comentário sobre desejo de morte após injúria narcísica, o protocolo indicado é:", ["Ativar imediatamente o protocolo do Módulo 4.9 (avaliação de risco)", "Aguardar a próxima sessão agendada, sem intervenção imediata", "Ignorar, pois costuma ser apenas retórica nesse perfil", "Encerrar o vínculo terapêutico imediatamente"]],
    ["O passo \"empatia gradual\", no manejo desse perfil, é descrito como:", ["Um progresso lento e não-linear, não um objetivo de curto prazo", "Algo que se resolve completamente em poucas sessões", "Desnecessário, pois esse traço não pode ser trabalhado", "Um processo que deve ser forçado de forma direta e imediata"]],
  ];
  const gabaritoObjetivas = ["a", "a", "a", "a", "a", "b", "a", "a", "a", "a"];

  const children = [
    ...doc.capa(KICKER, "Avaliação — TP Narcisista", `Avaliação formativa de encerramento do Módulo ${MOD}.`),
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
    doc.vinhetaBox("Patrícia, 41 anos, executiva, procura terapia após ser preterida numa promoção. Descreve-se como \"claramente mais capaz que todos os outros candidatos\" e culpa a empresa por \"não reconhecer talento de verdade\". Nas sessões seguintes, alterna entre minimizar o ocorrido e demonstrar irritação intensa quando o terapeuta faz perguntas exploratórias. Relata, num tom quase casual, que tem pensado bastante sobre \"desistir de tudo\"."),
    new doc.Paragraph({ spacing: { before: 240 }, children: [new doc.TextRun({ text: "Com base no protocolo estudado, responda:", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    new doc.Paragraph({ spacing: { before: 220, after: 40 }, children: [new doc.TextRun({ text: "a) (10 pts) Que elementos da vinheta sustentam a hipótese de grandiosidade como defesa?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "b) (10 pts) Qual deveria ser a prioridade clínica imediata diante do comentário sobre \"desistir de tudo\"?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "c) (10 pts) Que erro técnico o terapeuta deveria evitar, considerando a reação de Patrícia às perguntas exploratórias?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "d) (10 pts) Descreva uma intervenção alinhada ao passo 1 (aliança sem confronto direto) pra essa primeira fase do tratamento.", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    new doc.Paragraph({ spacing: { after: 40 }, children: [new doc.TextRun({ text: "USO EXCLUSIVO DO INSTRUTOR — remover antes de aplicar a prova", bold: true, color: doc.TERRA, font: doc.FONT, size: 20 })] }),
    doc.tituloH1("Gabarito"),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 1 — Questões objetivas", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 200 }, children: [new doc.TextRun({ text: gabaritoObjetivas.map((r, i) => `${i + 1}-${r}`).join("   ·   "), font: doc.FONT, size: 22, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 2 — Critério de correção da questão de caso", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "a) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Autoavaliação inflada (\"claramente mais capaz que todos\"), atribuição externa da culpa (empresa não reconhece talento), e irritação intensa diante de questionamento — sinais de defesa sob ameaça, não de autoestima estável.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "b) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Avaliação de risco formal, ativando o protocolo do Módulo 4.9 — o tom casual não reduz a necessidade de investigação, mesmo diante de um comentário aparentemente informal.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "c) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Evitar confrontar a grandiosidade de frente nessa fase inicial — isso tende a gerar ruptura do vínculo, pois ataca diretamente a defesa que sustenta Patrícia.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "d) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Ex: \"Quero entender melhor como essa situação tem sido pra você, antes de qualquer outra coisa\" — priorizando compreensão empática da experiência subjetiva antes de questionar distorções.", font: doc.FONT, size: 21, color: doc.INK })] }),
  );

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-4.16-Avaliacao.docx");
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
      n: 1, titulo: "A grandiosidade como defesa", duracao: "12 min", slides: "1, 2, 3, 4",
      objetivo: "Sair sabendo explicar o mecanismo do TP Narcisista sem jargão, e entender por que confronto direto costuma falhar.",
      segmentos: [
        seg("0:00–0:45", "Abertura (gancho)", [{ fala: "A grandiosidade no TP Narcisista não é excesso de autoestima — é a defesa construída sobre um self que, no fundo, teme profundamente não ter valor." }]),
        seg("0:45–2:00", "Por que essa reformulação importa", ["A virada teórica de Kohut e Kernberg.", "Confrontar a grandiosidade de frente costuma romper o vínculo terapêutico."]),
        seg("2:00–8:00", "O que sustenta a grandiosidade (mostrar slide 4)", [
          "Ínsula anterior, com menor ativação em tarefas de empatia.",
          "Sistema de recompensa hiper-responsivo à admiração externa.",
          "Amígdala com reatividade intensa à ameaça ao ego.",
          "Córtex cingulado anterior com processamento reduzido de crítica social.",
        ]),
        seg("8:00–10:30", "Um ponto importante", ["Isso explica a reação desproporcional a críticas — a chamada injúria narcísica."]),
        seg("10:30–12:00", "Fechamento", [{ fala: "Próxima aula: como esse padrão se forma ao longo do desenvolvimento." }]),
      ],
    },
    {
      n: 2, titulo: "Da validação condicional ao self grandioso", duracao: "10 min", slides: "5",
      objetivo: "Explicar a cadeia desenvolvimental entre validação condicional e a construção do self grandioso.",
      segmentos: [
        seg("0:00–1:00", "Retomada rápida", ["Vimos as estruturas envolvidas. Hoje vemos como o padrão se forma ao longo do tempo."]),
        seg("1:00–6:30", "A cadeia (mostrar slide 5)", ["Validação condicional na infância, contingente a desempenho ou especialidade.", "Self frágil e propenso à vergonha.", "Construção de um self grandioso defensivo.", "TP Narcisista: necessidade crônica de admiração externa."]),
        seg("6:30–9:00", "Por que a injúria narcísica acontece", ["Uma crítica ou fracasso pode gerar queda desproporcional quando a defesa falha e o self frágil fica exposto."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: os 3 traços centrais e os dois subtipos clínicos." }]),
      ],
    },
    {
      n: 3, titulo: "Os 3 traços centrais e os 2 subtipos", duracao: "11 min", slides: "6",
      objetivo: "Reconhecer grandiosidade, necessidade de admiração e falta de empatia, e diferenciar subtipo grandioso do vulnerável.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três traços, e uma distinção clínica importante entre dois subtipos."]),
        seg("1:00–7:00", "Os 3 traços (mostrar slide 6)", [
          "Grandiosidade: senso inflado de importância e de talento.",
          "Necessidade de admiração: dependência de validação externa constante.",
          "Falta de empatia: dificuldade genuína de reconhecer a perspectiva do outro.",
        ]),
        seg("7:00–9:30", "Grandioso versus vulnerável", ["Grandioso: mais visível, confiante, dominante.", "Vulnerável: hipersensível, ansioso, defensivo.", "Ambos compartilham o mesmo núcleo frágil."]),
        seg("9:30–11:00", "Fechamento", [{ fala: "Próxima aula: como reconhecer esse padrão nas 4 dimensões clínicas." }]),
      ],
    },
    {
      n: 4, titulo: "Sinais de alerta", duracao: "10 min", slides: "7",
      objetivo: "Reconhecer sinais cognitivos, comportamentais, relacionais e físicos do padrão narcisista.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Reconhecer o padrão com precisão orienta o resto do manejo."]),
        seg("1:00–7:30", "As 4 categorias (mostrar slide 7)", [
          "Cognitivo: comparação social constante, sensibilidade extrema à crítica.",
          "Comportamental: exploração interpessoal, arrogância, busca de status.",
          "Relacional: dificuldade de reciprocidade genuína, uso do outro como espelho.",
          "Físico: reatividade fisiológica intensa diante de ameaça ao ego.",
        ]),
        seg("7:30–9:00", "Por que isso importa", ["Esses sinais orientam quando e como aplicar cada passo do manejo."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: como diferenciar de quadros parecidos." }]),
      ],
    },
    {
      n: 5, titulo: "Diagnóstico diferencial rápido", duracao: "11 min", slides: "8",
      objetivo: "Diferenciar TP Narcisista de TP Antissocial, TP Histriônica e alta autoestima saudável.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Um filtro rápido — a motivação central por trás do comportamento é a chave dessas diferenciações."]),
        seg("1:00–8:00", "Os 3 comparativos (mostrar slide 8)", [
          "TP Antissocial: busca ganho/poder concreto, sem necessidade central de admiração.",
          "TP Histriônica: busca atenção em geral; narcisista busca admiração por grandiosidade.",
          "Alta autoestima saudável: tolera crítica, sem depender de validação constante.",
        ]),
        seg("8:00–10:30", "Por que a diferenciação com autoestima saudável importa", ["Evita patologizar autoconfiança normal — o critério é a rigidez da defesa e o custo funcional."]),
        seg("10:30–11:00", "Fechamento", [{ fala: "Próxima aula: os instrumentos que confirmam essa leitura com dado." }]),
      ],
    },
    {
      n: 6, titulo: "Os 3 instrumentos de avaliação", duracao: "11 min", slides: "9",
      objetivo: "Saber quando usar PID-5, NPI e PNI, incluindo cobertura do subtipo vulnerável.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três instrumentos, três finalidades — um deles é essencial pra capturar o subtipo vulnerável."]),
        seg("1:00–4:30", "PID-5", ["Mapeia os traços patológicos de forma dimensional."]),
        seg("4:30–7:30", "NPI", ["Foca no subtipo grandioso, mais visível clinicamente."]),
        seg("7:30–10:00", "PNI", ["Captura tanto o subtipo grandioso quanto o vulnerável."]),
        seg("10:00–11:00", "Fechamento", [{ fala: "Próxima aula: colocamos tudo em prática — aliança terapêutica e autoestima genuína." }]),
      ],
    },
    {
      n: 7, titulo: "Manejo — aliança sem confronto e autoestima genuína", duracao: "14 min", slides: "10, 11",
      objetivo: "Aplicar os passos 1 e 2 do manejo, evitando ruptura precoce do vínculo.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["A parte mais delicada tecnicamente desse módulo. Hoje, os 2 primeiros passos."]),
        seg("1:00–2:00", "Visão geral (mostrar slide 10)", ["Aliança sem confronto direto → Autoestima genuína → Empatia gradual → Tolerância à imperfeição.", "Confrontar cedo demais costuma gerar ruptura do vínculo."]),
        seg("2:00–7:30", "Passo 1 — Aliança sem confronto direto (mostrar slide 11, esquerda)", [{ fala: "Quero entender melhor como você vê essa situação, antes de qualquer outra coisa." }, "Priorize compreensão empática da experiência subjetiva antes de questionar distorções."]),
        seg("7:30–13:00", "Passo 2 — Autoestima genuína (mostrar slide 11, direita)", ["Ajude o paciente a reconhecer conquistas reais, sem depender de comparação ou admiração externa.", "Trabalhe a diferença entre valor pessoal e desempenho/status."]),
        seg("13:00–14:00", "Fechamento", [{ fala: "Próxima aula: empatia gradual e tolerância à imperfeição." }]),
      ],
    },
    {
      n: 8, titulo: "Manejo — empatia gradual e tolerância à imperfeição", duracao: "14 min", slides: "12",
      objetivo: "Trabalhar desenvolvimento gradual de empatia e exposição segura a falha e crítica.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Hoje fechamos o manejo com o trabalho de mais longo prazo do módulo."]),
        seg("1:00–7:00", "Passo 3 — Empatia gradual (mostrar slide 12, esquerda)", ["Use perguntas que convidem, sem exigir, a tomada de perspectiva do outro.", "Progresso costuma ser lento e não-linear — não é meta de curto prazo."]),
        seg("7:00–13:00", "Passo 4 — Tolerância à imperfeição (mostrar slide 12, direita)", [{ fala: "Errar aqui não muda o seu valor como pessoa — dá pra explorar isso com calma." }, "Trabalhe pequenas exposições a falha e crítica, com suporte ativo.", "Monitore sinais de injúria narcísica."]),
        seg("13:00–14:00", "Fechamento", [{ fala: "Manejo completo. Próxima aula: um caso real e os critérios de quando escalar." }]),
      ],
    },
    {
      n: 9, titulo: "Estudo de caso, encaminhamento e recap", duracao: "15 min", slides: "13, 14, 15",
      objetivo: "Integrar mecanismo, instrumento e manejo num caso completo, com ênfase na conexão com o protocolo de risco de suicídio.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Última aula do módulo. Caso completo e os critérios de escalonamento que merecem atenção redobrada aqui."]),
        seg("1:00–7:00", "Estudo de caso — Eduardo (mostrar slide 13)", ["Leia a vinheta com calma.", "Percorra as 3 perguntas de discussão.", "Convide o aluno a pausar e responder por escrito."]),
        seg("7:00–11:00", "Quando encaminhar (mostrar slide 14)", ["Percorra os 4 critérios — reforce a conexão direta com o Módulo 4.9 diante de qualquer menção a desejo de morte após injúria narcísica."]),
        seg("11:00–14:00", "Recapitulando o módulo (mostrar slide 15)", ["Retome os 4 pontos-chave.", "Reforce a reformulação central: grandiosidade como defesa de um self frágil."]),
        seg("14:00–15:00", "Fechamento do módulo", [{ fala: "Agora é hora dos exercícios e da avaliação. Te vejo no próximo transtorno de personalidade." }]),
      ],
    },
  ];

  const totalMin = 12 + 10 + 11 + 10 + 11 + 11 + 14 + 14 + 15;

  const children = [
    ...doc.capa(KICKER, "Roteiro de Aulas — TP Narcisista", "Módulo dividido em 9 vídeo-aulas de 10 a 15 minutos, seguindo os slides já produzidos. Cada aula tem roteiro cronometrado, pronto pra gravação."),
    new doc.Paragraph({
      spacing: { before: 60, after: 200 },
      children: [new doc.TextRun({
        text: "Nota importante: este módulo trata de manejo clínico com componente relevante de risco após injúria narcísica. Recomenda-se supervisão específica antes de conduzir atendimentos desse perfil de forma independente.",
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

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", `${RODAPE_DOC} — Roteiro de Aulas`, children), "Modulo-4.16-Roteiro-Aulas.docx");
}

// ============================================================
Promise.resolve()
  .then(construirDeck)
  .then(construirExercicios)
  .then(construirProva)
  .then(construirRoteiro)
  .then(() => console.log("TUDO PRONTO"))
  .catch((e) => { console.error(e); process.exit(1); });

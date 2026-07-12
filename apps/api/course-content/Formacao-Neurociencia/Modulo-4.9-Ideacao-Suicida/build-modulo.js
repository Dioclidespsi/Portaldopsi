const deck = require("../_lib/lib-deck.js");
const doc = require("../_lib/lib-doc.js");

const MOD = "4.9";
const NOME = "Ideação Suicida e Risco de Suicídio";
const RODAPE_DECK = `Risco de Suicídio — Módulo ${MOD}`;
const RODAPE_DOC = `Módulo ${MOD} — Risco de Suicídio`;
const KICKER = "MÓDULO 4.9 · PROTOCOLOS CLÍNICOS DIRETOS AO PONTO";

// ============================================================
// 1) SLIDE DECK
// ============================================================
function construirDeck() {
  const pres = deck.novaApresentacao(`${NOME} — Avaliação e Manejo Clínico`);

  deck.slideTitulo(pres, {
    moduloLabel: `Módulo ${MOD} · Protocolos Clínicos Diretos ao Ponto`,
    titulo: "Risco de Suicídio",
    subtitulo: "Avaliação direta, estratificação e plano de segurança",
    passos: ["Mecanismo", "Sinais", "Instrumento", "Plano de Segurança", "Ativação de Rede"],
  });

  deck.slideRoteiro(pres, {
    rodape: RODAPE_DECK, pageNum: 2,
    cards: [
      { titulo: "Mecanismo", desc: "Por que o desejo de morrer se forma" },
      { titulo: "Sinais", desc: "O que avisa antes de uma crise" },
      { titulo: "Instrumento", desc: "C-SSRS, BSI e SAD PERSONS na prática" },
      { titulo: "Plano de Segurança", desc: "A alternativa baseada em evidência ao \"contrato\"" },
      { titulo: "Ativação de Rede", desc: "Quando e como escalar agora" },
    ],
  });

  deck.slideHook(pres, {
    rodape: RODAPE_DECK, pageNum: 3,
    frase: "Perguntar diretamente sobre suicídio não aumenta o risco. Na prática, costuma ser a primeira vez que a pessoa se sente segura pra falar sobre isso.",
    apoio: "Esse mito impede muitos profissionais de perguntar o que precisa ser perguntado. Este módulo existe pra substituir o medo por um protocolo claro.",
  });

  deck.slideCircuito(pres, {
    rodape: RODAPE_DECK, pageNum: 4,
    titulo: "O que sustenta o desejo de morrer",
    regioes: [
      { label: "Córtex pré-frontal (constrição cognitiva — \"única saída\")", rx: 0.18, ry: 0.20, color: deck.NAVY, d: 0.5 },
      { label: "Núcleo da rafe / sistema serotoninérgico (impulsividade)", rx: 0.24, ry: 0.64, color: deck.TERRA, d: 0.4 },
      { label: "Amígdala (dor psíquica intensa — \"psychache\")", rx: 0.58, ry: 0.64, color: deck.NAVY_TINT, d: 0.36 },
      { label: "Eixo HPA (estresse crônico sobreposto ao quadro de base)", rx: 0.60, ry: 0.26, color: deck.TERRA_TINT, d: 0.36 },
    ],
    notas: [
      "\"Constrição cognitiva\" (Shneidman): sob dor extrema, o córtex pré-frontal passa a enxergar cada vez menos alternativas — o suicídio parece a única saída, não porque não existam outras, mas porque o cérebro parou de vê-las.",
      "Disfunção serotoninérgica está associada a maior impulsividade — um fator de risco independente da intensidade da dor emocional.",
      "Isso não é fraqueza de caráter — é um estado neurobiológico que pode ser identificado e interrompido.",
    ],
  });

  deck.slideCadeia(pres, {
    rodape: RODAPE_DECK, pageNum: 5,
    titulo: "A Teoria Interpessoal do Suicídio (Joiner)",
    elos: [
      { titulo: "Pertencimento frustrado", desc: "Sensação de não pertencer, estar desconectado de todos" },
      { titulo: "Fardo percebido", desc: "Crença de que sua morte aliviaria os outros" },
      { titulo: "Desejo de morrer", desc: "Os dois juntos formam o desejo — ainda sem risco de ação" },
      { titulo: "+ Capacidade adquirida", desc: "Habituação à dor/medo da morte torna a tentativa possível" },
    ],
    notaFinal: "O desejo de morrer sozinho não prevê tentativa. É a soma com a capacidade adquirida que eleva o risco real de uma ação — por isso perguntar sobre histórico de autolesão e exposição prévia à dor/violência é parte essencial da avaliação.",
  });

  deck.slideCategorias(pres, {
    rodape: RODAPE_DECK, pageNum: 6,
    titulo: "Os 3 pilares da Teoria Interpessoal",
    categorias: [
      { titulo: "Pertencimento frustrado", desc: "\"Ninguém realmente se importaria se eu sumisse\"", color: deck.TERRA },
      { titulo: "Fardo percebido", desc: "\"Todos ficariam melhor sem mim\"", color: deck.NAVY },
      { titulo: "Capacidade adquirida", desc: "Habituação à dor/medo — muitas vezes por autolesão ou trauma prévio", color: deck.NAVY_TINT },
    ],
    notaFinal: "Avalie os 3 separadamente — um paciente pode ter desejo intenso de morrer e baixo risco de ação, ou o inverso.",
  });

  deck.slideSinais(pres, {
    rodape: RODAPE_DECK, pageNum: 7,
    titulo: "O que avisa antes de uma crise",
    itens: [
      { titulo: "Verbal", desc: "Comentários diretos ou indiretos sobre morrer, ser um fardo, \"sumir\"" },
      { titulo: "Comportamental", desc: "Buscar meios letais, se despedir, doar pertences, isolamento súbito" },
      { titulo: "Emocional", desc: "Desesperança, sensação de estar aprisionado, raiva desproporcional" },
      { titulo: "Mudança de padrão", desc: "Melhora súbita e inexplicada do humor pode indicar decisão já tomada" },
    ],
  });

  deck.slideDiferencial(pres, {
    rodape: RODAPE_DECK, pageNum: 8,
    titulo: "Estratificação de risco",
    cards: [
      { titulo: "Risco baixo", desc: "Ideação passiva — desejo de não existir, sem plano nem intenção" },
      { titulo: "Risco moderado a alto", desc: "Ideação ativa, com ou sem plano definido, sem meios imediatos disponíveis" },
      { titulo: "Risco iminente", desc: "Plano estruturado + acesso a meios + intenção declarada — ação imediata necessária" },
    ],
  });

  deck.slideInstrumentos(pres, {
    rodape: RODAPE_DECK, pageNum: 9,
    titulo: "Três instrumentos, três momentos",
    instrumentos: [
      { sigla: "C-SSRS", nome: "Columbia-Suicide Severity Rating Scale", desc: "Padrão-ouro. Estrutura a entrevista direta sobre ideação, plano, intenção e comportamento." },
      { sigla: "BSI", nome: "Beck Scale for Suicide Ideation", desc: "Autorrelato detalhado da intensidade e características da ideação." },
      { sigla: "SAD PERSONS", nome: "Escala de fatores de risco", desc: "Triagem rápida por mnemônica — bom pra primeira sessão ou pronto atendimento." },
    ],
  });

  deck.slideProtocoloOverview(pres, {
    rodape: RODAPE_DECK, pageNum: 10,
    titulo: "Da avaliação à ação: 4 passos",
    passos: [
      { titulo: "Avaliação\ndireta", desc: "Perguntar sem rodeios — não planta a ideia, abre a porta" },
      { titulo: "Estratificação\nde risco", desc: "Classificar o nível com base em plano, meios e intenção" },
      { titulo: "Plano de\nSegurança", desc: "Estruturado, colaborativo — não é uma promessa verbal" },
      { titulo: "Ativação de\nrede", desc: "Escalar quando necessário — aqui, não é exceção" },
    ],
    notaFinal: "Nas próximas 2 telas, cada passo ganha um exemplo pronto pra levar pra sessão.",
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 11,
    titulo: "Passos 1 e 2, na prática",
    colunas: [
      {
        numero: 1, titulo: "Avaliação direta",
        fala: "“Você mencionou estar cansado de tudo. Você tem pensado em se machucar ou em morrer?”",
        bullets: ["Use linguagem direta, sem eufemismo (\"morrer\", não \"fazer uma besteira\")", "Perguntar sobre suicídio não aumenta o risco — é mito"],
      },
      {
        numero: 2, titulo: "Estratificação de risco",
        bullets: ["Há plano específico? Há acesso a meios letais?", "Há intenção declarada, ou é só desejo de não existir?", "Houve tentativa prévia? Isso eleva significativamente o risco atual"],
      },
    ],
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 12,
    titulo: "Passos 3 e 4, na prática",
    colunas: [
      {
        numero: 3, titulo: "Plano de Segurança",
        tabela: { header: ["Etapa", "Conteúdo"], linhas: [["1. Sinais de alerta pessoais", "Pensamentos/situações que precedem a piora"], ["2. Estratégias internas", "O que a pessoa pode fazer sozinha pra se acalmar"], ["3. Contatos e redução de meios", "Rede de apoio + retirar acesso a meios letais"]] },
        notaTabela: "\"Contrato de não-suicídio\" não é baseado em evidência — use o Plano de Segurança estruturado (Stanley & Brown).",
      },
      {
        numero: 4, titulo: "Ativação de rede",
        bullets: ["Risco iminente: não deixe a pessoa sozinha, acione emergência agora", "Envolva a rede de apoio com consentimento, sempre que possível", "Encaminhamento psiquiátrico urgente pra avaliar internação ou medicação"],
      },
    ],
  });

  deck.slideCaso(pres, {
    rodape: RODAPE_DECK, pageNum: 13,
    vinheta: "Larissa, 24 anos, em acompanhamento há 3 meses por depressão, diz que está \"cansada de tudo\" e que às vezes pensa que \"seria mais fácil se ela não existisse\". Nega plano específico quando perguntada diretamente, mas relata ter doado roupas e pertences pessoais recentemente \"pra organizar a vida\". PHQ-9 = 22, item 9 pontuado como \"quase todos os dias\".",
    perguntas: [
      "Que nível de risco essa apresentação sugere, e por quê?",
      "O comportamento de \"doar pertences\" é um sinal de alerta — o que ele pode indicar clinicamente?",
      "Que 2 perguntas diretas você faria em seguida pra aprofundar a avaliação?",
    ],
  });

  deck.slideEncaminhamento(pres, {
    rodape: RODAPE_DECK, pageNum: 14,
    criterios: [
      "Plano estruturado + acesso a meios letais + intenção declarada — ativar emergência (SAMU 192 / CVV 188 / pronto-socorro) agora",
      "Tentativa de suicídio prévia, especialmente recente ou de método letal",
      "Comorbidade com uso ativo de substâncias — eleva a impulsividade e o risco",
      "Ausência de rede de apoio ou de qualquer fator de proteção identificável",
    ],
  });

  deck.slideRecap(pres, {
    rodape: RODAPE_DECK, pageNum: 15,
    pontos: [
      "Perguntar diretamente sobre suicídio não aumenta o risco — é mito a ser desfeito",
      "Pertencimento frustrado + fardo percebido + capacidade adquirida explicam o desejo e o risco de ação",
      "C-SSRS, BSI e SAD PERSONS estruturam a avaliação com dado, não só impressão",
      "Plano de Segurança estruturado substitui o \"contrato de não-suicídio\" — e ativação de rede aqui não é exceção, é parte do protocolo",
    ],
    proximoTexto: "Este módulo fecha o Bloco 4. Pratique com supervisão antes de conduzir avaliações de risco sozinho. →",
  });

  return pres.writeFile({ fileName: "Modulo-4.9-Ideacao-Suicida.pptx" });
}

// ============================================================
// 2) EXERCÍCIOS
// ============================================================
function construirExercicios() {
  const children = [
    ...doc.capa(KICKER, "Exercícios — Risco de Suicídio", "Resolva individualmente antes da sessão de supervisão. Este módulo exige prática supervisionada antes de qualquer avaliação de risco conduzida sozinho — os exercícios são o primeiro passo, não o último."),

    doc.exNum(1, "O mecanismo, em suas palavras"),
    doc.pergunta(1, "Explique em até 3 frases, sem jargão técnico, o que é \"constrição cognitiva\" e por que ela faz o suicídio parecer a única saída."),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Cite os 3 pilares da Teoria Interpessoal do Suicídio e dê um exemplo de fala de paciente pra cada um."),
    ...doc.linhaResposta(2),

    doc.exNum(2, "Leitura de escala"),
    doc.vinhetaBox("Paciente relata ideação passiva (\"às vezes penso que seria mais fácil não acordar\"), nega plano, nega intenção, nega tentativas prévias, e tem rede de apoio ativa."),
    doc.pergunta(1, "Que nível de risco essa apresentação sugere?"),
    ...doc.linhaResposta(1),
    doc.pergunta(2, "Isso significa que você não precisa fazer mais nenhuma pergunta sobre o tema? Justifique."),
    ...doc.linhaResposta(1),

    doc.exNum(3, "Desfazendo mitos"),
    doc.pergunta(1, "Um colega diz que evita perguntar sobre suicídio porque \"pode plantar a ideia\". Como você responderia, com base no que foi visto na aula?"),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Por que o \"contrato de não-suicídio\" não é a prática recomendada atualmente? O que usar no lugar?"),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),

    doc.exNum(4, "Plano de Segurança"),
    doc.p("Monte um Plano de Segurança básico pra você mesmo (ou um caso fictício), preenchendo pelo menos 3 das 6 etapas do modelo Stanley & Brown."),
    doc.tabelaSimples(["Etapa", "Conteúdo"], [["Sinais de alerta pessoais", ""], ["Estratégias internas de enfrentamento", ""], ["Contatos de apoio", ""]], [3200, 6150]),

    doc.exNum(5, "Caso integrado — Larissa"),
    doc.vinhetaBox("Larissa, 24 anos, em acompanhamento há 3 meses por depressão, diz estar \"cansada de tudo\" e que às vezes pensa que \"seria mais fácil se ela não existisse\". Nega plano quando perguntada diretamente, mas doou pertences pessoais recentemente. PHQ-9 = 22, item 9 pontuado como \"quase todos os dias\"."),
    doc.pergunta(1, "Escreva as 2 perguntas diretas que você faria a seguir com Larissa."),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Monte os 2 primeiros itens de um Plano de Segurança pra Larissa."),
    ...doc.linhaResposta(2),
    doc.pergunta(3, "Baseado só nas informações da vinheta, você encaminharia Larissa pra avaliação psiquiátrica urgente agora? Justifique."),
    ...doc.linhaResposta(2),
  ];

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-4.9-Exercicios.docx");
}

// ============================================================
// 3) AVALIAÇÃO
// ============================================================
function construirProva() {
  const objetivas = [
    ["Segundo a Teoria Interpessoal do Suicídio (Joiner), o desejo de morrer surge da combinação de:", ["Pertencimento frustrado e fardo percebido", "Apenas tristeza intensa", "Apenas impulsividade", "Uso de substâncias isolado"]],
    ["A \"capacidade adquirida\", na mesma teoria, se refere a:", ["Habilidade acadêmica ou profissional", "Habituação à dor e ao medo da morte, muitas vezes por exposição prévia (autolesão, trauma)", "Capacidade financeira do paciente", "Um fator sem relação com risco de tentativa"]],
    ["Perguntar diretamente sobre suicídio:", ["Aumenta o risco de \"plantar a ideia\"", "Não aumenta o risco — geralmente é a primeira vez que a pessoa se sente segura pra falar sobre isso", "Deve ser sempre evitado em qualquer contexto", "Só pode ser feito por psiquiatras"]],
    ["Instrumento considerado padrão-ouro pra avaliação de risco de suicídio:", ["C-SSRS (Columbia-Suicide Severity Rating Scale)", "BAI", "MBI", "Y-BOCS"]],
    ["O \"contrato de não-suicídio\" (pedir pro paciente prometer não se matar):", ["É a prática atual recomendada com base em evidência", "Não é baseado em evidência — o Plano de Segurança estruturado é a prática recomendada", "Deve substituir qualquer outra forma de avaliação", "É uma exigência legal em todo atendimento"]],
    ["É um sinal de alerta comportamental importante:", ["Melhora gradual e consistente do humor ao longo de semanas", "Doar pertences pessoais e se despedir de forma incomum", "Aumento do interesse em atividades sociais", "Melhora consistente da qualidade do sono"]],
    ["Uma \"melhora súbita e inexplicada\" do humor em alguém com ideação grave pode indicar:", ["Recuperação completa e garantida", "Possível decisão já tomada sobre o suicídio — um sinal de alerta, não necessariamente de alívio", "Que o risco desapareceu por completo", "Sempre um efeito colateral de medicação"]],
    ["O Plano de Segurança (passo 3) inclui, entre outras etapas:", ["Apenas uma promessa verbal de não se machucar", "Sinais de alerta pessoais, estratégias de enfrentamento, contatos de apoio e redução de acesso a meios letais", "Somente o número de um hospital, sem mais nenhuma etapa", "Isolamento completo do paciente de qualquer contato"]],
    ["Diante de risco iminente (plano + meios + intenção clara), a conduta é:", ["Agendar retorno em 1 mês, como de costume", "Não deixar a pessoa sozinha e acionar emergência (SAMU/CVV/pronto-socorro) imediatamente", "Pedir que ela \"pense positivo\" e aguardar", "Aguardar a próxima sessão já agendada"]],
    ["São fatores que aumentam o risco:", ["Tentativa prévia de suicídio e comorbidade com uso ativo de substâncias", "Ter uma rede de apoio presente e ativa", "Ausência total de estressores recentes", "Ter buscado ajuda profissional voluntariamente"]],
  ];
  const gabaritoObjetivas = ["a", "b", "b", "a", "b", "b", "b", "b", "b", "a"];

  const children = [
    ...doc.capa(KICKER, "Avaliação — Risco de Suicídio", `Avaliação formativa de encerramento do Módulo ${MOD}.`),
    doc.infoBox([
      ["Nota de corte:", "80 de 100 pontos (nota de corte mais alta, dada a criticidade do tema)"],
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
    doc.vinhetaBox("Vinícius, 41 anos, procura terapia após ser demitido há 1 mês. Relata que \"não vê mais sentido em nada\" e que já pensou em \"acabar com tudo de uma vez\", citando especificamente os remédios que tem em casa como método. Diz que não fez nada ainda porque pensa na filha de 8 anos. Nega tentativas prévias. Nega uso de substâncias."),
    new doc.Paragraph({ spacing: { before: 240 }, children: [new doc.TextRun({ text: "Com base no protocolo estudado, responda:", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    new doc.Paragraph({ spacing: { before: 220, after: 40 }, children: [new doc.TextRun({ text: "a) (10 pts) Que nível de risco essa apresentação sugere? Identifique os elementos de plano, meios e intenção presentes na vinheta.", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "b) (10 pts) A menção à filha como razão pra não agir é um fator de proteção. Isso é suficiente pra reduzir o nível de risco a ponto de dispensar mais avaliação? Justifique.", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "c) (10 pts) Descreva um item do Plano de Segurança voltado especificamente à redução de acesso a meios letais nesse caso.", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "d) (10 pts) Essa apresentação exige ativação de rede/encaminhamento imediato, ou acompanhamento com plano de segurança é suficiente por ora? Justifique com base nos critérios estudados.", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    new doc.Paragraph({ spacing: { after: 40 }, children: [new doc.TextRun({ text: "USO EXCLUSIVO DO INSTRUTOR — remover antes de aplicar a prova", bold: true, color: doc.TERRA, font: doc.FONT, size: 20 })] }),
    doc.tituloH1("Gabarito"),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 1 — Questões objetivas", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 200 }, children: [new doc.TextRun({ text: gabaritoObjetivas.map((r, i) => `${i + 1}-${r}`).join("   ·   "), font: doc.FONT, size: 22, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 2 — Critério de correção da questão de caso", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "a) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Risco moderado a alto — há ideação ativa e método específico citado (remédios em casa = meio disponível), mas sem intenção declarada de agir agora nem plano de execução definido no tempo.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "b) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Não. Fatores de proteção reduzem o risco, mas não eliminam a necessidade de avaliação completa e plano de segurança — a presença de meio específico citado (remédios) exige ação direta (passo 3), não só anotação do fator protetivo.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "c) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Ex: combinar com Vinícius (e, se possível, com alguém de confiança dele) a guarda temporária ou remoção dos remédios de casa, ou limitar o acesso a quantidades que reduzam a letalidade.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "d) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Dado que ele já citou um método específico e disponível, mesmo sem intenção declarada de agir imediatamente, a conduta prudente é priorizar plano de segurança completo nesta mesma sessão e considerar encaminhamento psiquiátrico em caráter de urgência (não necessariamente emergência), pela presença de método concreto somada à perda recente (demissão) como estressor agudo.", font: doc.FONT, size: 21, color: doc.INK })] }),
  );

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-4.9-Avaliacao.docx");
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
      n: 1, titulo: "Por que perguntar diretamente não aumenta o risco", duracao: "12 min", slides: "1, 2, 3, 4",
      objetivo: "Desfazer o mito central que trava a avaliação de risco, e explicar a constrição cognitiva sem jargão.",
      segmentos: [
        seg("0:00–0:45", "Abertura (gancho)", [{ fala: "Perguntar diretamente sobre suicídio não aumenta o risco. Na prática, costuma ser a primeira vez que a pessoa se sente segura pra falar sobre isso." }]),
        seg("0:45–2:00", "Por que isso importa clinicamente", ["Esse mito é a principal barreira que impede profissionais de perguntar o que precisa ser perguntado.", "Isso é o Passo 1 da anatomia de todo protocolo do curso: Mecanismo."]),
        seg("2:00–8:00", "O que sustenta o desejo de morrer (mostrar slide 4)", [
          "Córtex pré-frontal em constrição cognitiva — enxerga cada vez menos alternativas.",
          "Sistema serotoninérgico associado a maior impulsividade.",
          "Amígdala processando dor psíquica intensa (\"psychache\", conceito de Shneidman).",
          "Eixo HPA sob estresse crônico, sobreposto ao quadro de base.",
        ]),
        seg("8:00–10:30", "Um ponto importante antes de seguir", ["Isso não é fraqueza de caráter — é um estado neurobiológico identificável, e por isso tratável."]),
        seg("10:30–12:00", "Fechamento", [{ fala: "Próxima aula: a Teoria Interpessoal do Suicídio, que explica como o desejo de morrer se forma." }]),
      ],
    },
    {
      n: 2, titulo: "A Teoria Interpessoal do Suicídio", duracao: "10 min", slides: "5",
      objetivo: "Explicar pertencimento frustrado, fardo percebido e capacidade adquirida como modelo de risco.",
      segmentos: [
        seg("0:00–1:00", "Retomada rápida", ["Vimos o que acontece no cérebro. Hoje vemos o modelo psicológico mais usado pra entender o risco."]),
        seg("1:00–6:30", "A cadeia de Joiner (mostrar slide 5)", ["Pertencimento frustrado: sensação de não pertencer a ninguém.", "Fardo percebido: crença de que a própria morte aliviaria os outros.", "Os dois juntos formam o desejo de morrer.", "Capacidade adquirida (habituação à dor/medo) é o que eleva o risco de uma tentativa real."]),
        seg("6:30–9:00", "Por que isso muda a entrevista", ["Desejo de morrer sozinho não prevê tentativa — pergunte também sobre histórico de autolesão e exposição prévia à dor."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: os 3 pilares dessa teoria, em detalhe." }]),
      ],
    },
    {
      n: 3, titulo: "Os 3 pilares: pertencimento, fardo, capacidade", duracao: "10 min", slides: "6",
      objetivo: "Avaliar os 3 pilares separadamente na entrevista clínica.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três pilares — avalie cada um separadamente, não como um bloco só."]),
        seg("1:00–7:00", "Os 3 pilares (mostrar slide 6)", [
          "Pertencimento frustrado: \"ninguém realmente se importaria se eu sumisse\".",
          "Fardo percebido: \"todos ficariam melhor sem mim\".",
          "Capacidade adquirida: muitas vezes ligada a autolesão ou trauma prévio.",
        ]),
        seg("7:00–9:00", "Aplicação prática", ["Um paciente pode ter desejo intenso de morrer e baixo risco de ação — ou o inverso. Avaliar separadamente evita erro de leitura."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: os sinais que avisam antes de uma crise." }]),
      ],
    },
    {
      n: 4, titulo: "Sinais de alerta", duracao: "10 min", slides: "7",
      objetivo: "Reconhecer sinais verbais, comportamentais e emocionais — incluindo o sinal frequentemente mal-interpretado da melhora súbita.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Alguns desses sinais são amplamente conhecidos. Um deles costuma ser mal-interpretado — chegamos nele no fim."]),
        seg("1:00–7:30", "As 4 categorias (mostrar slide 7)", [
          "Verbal: comentários diretos ou indiretos sobre morrer ou ser um fardo.",
          "Comportamental: buscar meios, se despedir, doar pertences, isolamento súbito.",
          "Emocional: desesperança, sensação de estar aprisionado.",
          "Mudança de padrão: melhora súbita e inexplicada pode indicar decisão já tomada.",
        ]),
        seg("7:30–9:00", "O sinal mal-interpretado", ["Uma melhora repentina de humor, sem motivo aparente, NÃO é sempre alívio — pode ser a paz de quem já decidiu. Isso pede investigação, não menos atenção."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: como estratificar o nível de risco com base nesses sinais." }]),
      ],
    },
    {
      n: 5, titulo: "Estratificação de risco", duracao: "12 min", slides: "8",
      objetivo: "Classificar o nível de risco em baixo, moderado-alto ou iminente.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Depois de perguntar e observar os sinais, o próximo passo é classificar o nível."]),
        seg("1:00–8:00", "Os 3 níveis (mostrar slide 8)", [
          "Risco baixo: ideação passiva, sem plano nem intenção.",
          "Risco moderado a alto: ideação ativa, com ou sem plano, sem meios imediatos.",
          "Risco iminente: plano + meios + intenção declarada — ação imediata necessária.",
        ]),
        seg("8:00–10:30", "Por que isso muda a conduta", ["Cada nível pede uma resposta diferente — os passos 3 e 4 do protocolo se ajustam ao nível identificado aqui."]),
        seg("10:30–12:00", "Fechamento", [{ fala: "Próxima aula: os instrumentos que estruturam essa avaliação com dado." }]),
      ],
    },
    {
      n: 6, titulo: "Os 3 instrumentos de avaliação", duracao: "12 min", slides: "9",
      objetivo: "Saber quando usar C-SSRS, BSI e SAD PERSONS.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três instrumentos, três momentos do atendimento."]),
        seg("1:00–4:30", "C-SSRS", ["Padrão-ouro.", "Estrutura a entrevista direta sobre ideação, plano, intenção e comportamento."]),
        seg("4:30–7:30", "BSI", ["Autorrelato detalhado da intensidade e características da ideação."]),
        seg("7:30–10:00", "SAD PERSONS", ["Triagem rápida por mnemônica.", "Bom pra primeira sessão ou pronto atendimento, quando o tempo é curto."]),
        seg("10:00–12:00", "Como escolher na prática", ["C-SSRS como base da entrevista estruturada; SAD PERSONS quando o tempo for muito limitado.", { fala: "Próxima aula: colocamos tudo em prática — avaliação direta e estratificação." }]),
      ],
    },
    {
      n: 7, titulo: "Protocolo — avaliação direta e estratificação", duracao: "14 min", slides: "10, 11",
      objetivo: "Aplicar os passos 1 e 2 com script de pergunta direta e critérios objetivos de estratificação.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["A parte que você vai usar na próxima sessão em que isso surgir. Hoje, os 2 primeiros passos."]),
        seg("1:00–2:00", "Visão geral (mostrar slide 10)", ["Avaliação direta → Estratificação → Plano de Segurança → Ativação de rede."]),
        seg("2:00–7:00", "Passo 1 — Avaliação direta (mostrar slide 11, esquerda)", [{ fala: "Você mencionou estar cansado de tudo. Você tem pensado em se machucar ou em morrer?" }, "Use linguagem direta, sem eufemismo."]),
        seg("7:00–13:00", "Passo 2 — Estratificação (mostrar slide 11, direita)", ["Há plano específico? Há acesso a meios?", "Há intenção declarada?", "Houve tentativa prévia? Isso eleva o risco atual de forma significativa."]),
        seg("13:00–14:00", "Fechamento", [{ fala: "Próxima aula: Plano de Segurança e ativação de rede — a parte que substitui o \"contrato de não-suicídio\"." }]),
      ],
    },
    {
      n: 8, titulo: "Protocolo — Plano de Segurança e ativação de rede", duracao: "14 min", slides: "12",
      objetivo: "Construir um Plano de Segurança estruturado e saber quando ativar a rede de apoio e emergência.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Hoje fechamos o protocolo com as duas etapas mais decisivas."]),
        seg("1:00–7:00", "Passo 3 — Plano de Segurança (mostrar slide 12, esquerda)", ["Percorra as 3 primeiras etapas do modelo Stanley & Brown.", "Reforce: \"contrato de não-suicídio\" não é baseado em evidência — o Plano de Segurança estruturado é a prática recomendada."]),
        seg("7:00–13:00", "Passo 4 — Ativação de rede (mostrar slide 12, direita)", ["Risco iminente: não deixe a pessoa sozinha, acione emergência agora.", "Envolva a rede de apoio com consentimento, sempre que possível.", "Encaminhamento psiquiátrico urgente pra avaliar internação ou medicação."]),
        seg("13:00–14:00", "Fechamento", [{ fala: "Protocolo completo. Próxima aula: um caso real e os critérios de quando escalar imediatamente." }]),
      ],
    },
    {
      n: 9, titulo: "Estudo de caso, quando escalar e recap", duracao: "15 min", slides: "13, 14, 15",
      objetivo: "Integrar avaliação, estratificação e plano de segurança num caso completo, com ênfase em quando a escalação é obrigatória.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Última aula do módulo, e do Bloco 4. Caso completo e os critérios que exigem ação imediata."]),
        seg("1:00–7:00", "Estudo de caso — Larissa (mostrar slide 13)", ["Leia a vinheta com calma e atenção.", "Percorra as 3 perguntas de discussão.", "Convide o aluno a pausar e responder por escrito antes de continuar."]),
        seg("7:00–11:00", "Quando escalar imediatamente (mostrar slide 14)", ["Percorra os 4 critérios — todos exigem ação, não são apenas \"sinais de atenção\"."]),
        seg("11:00–14:00", "Recapitulando o módulo (mostrar slide 15)", ["Retome os 4 pontos-chave.", "Reforce: pratique avaliação de risco com supervisão antes de conduzir sozinho — este módulo é o início da competência, não o fim."]),
        seg("14:00–15:00", "Fechamento do módulo e do bloco", [{ fala: "Agora é hora dos exercícios e da avaliação. Com este módulo, o Bloco 4 está completo — 9 protocolos prontos pra sua prática clínica." }]),
      ],
    },
  ];

  const totalMin = 12 + 10 + 10 + 10 + 12 + 12 + 14 + 14 + 15;

  const children = [
    ...doc.capa(KICKER, "Roteiro de Aulas — Risco de Suicídio", "Módulo dividido em 9 vídeo-aulas de 10 a 15 minutos, seguindo os slides já produzidos. Cada aula tem roteiro cronometrado, pronto pra gravação."),
    new doc.Paragraph({
      spacing: { before: 60, after: 200 },
      children: [new doc.TextRun({
        text: "Nota importante: este módulo trata de avaliação de risco de vida. Recomenda-se que quem está aprendendo pratique as perguntas diretas e o Plano de Segurança em supervisão antes de conduzir uma avaliação real sozinho.",
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
    new doc.Paragraph({ spacing: { before: 260 }, children: [new doc.TextRun({ text: "Como usar este roteiro: as falas entre aspas e em itálico são sugestões de texto pra ler quase literalmente — são as frases que mais importam ficarem precisas. O resto são tópicos pra falar com suas próprias palavras.", italics: true, font: doc.FONT, size: 19, color: doc.MUTED })] }),
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

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", `${RODAPE_DOC} — Roteiro de Aulas`, children), "Modulo-4.9-Roteiro-Aulas.docx");
}

// ============================================================
Promise.resolve()
  .then(construirDeck)
  .then(construirExercicios)
  .then(construirProva)
  .then(construirRoteiro)
  .then(() => console.log("TUDO PRONTO"))
  .catch((e) => { console.error(e); process.exit(1); });

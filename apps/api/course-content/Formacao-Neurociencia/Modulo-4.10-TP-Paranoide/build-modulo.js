const deck = require("../_lib/lib-deck.js");
const doc = require("../_lib/lib-doc.js");

const MOD = "4.10";
const NOME = "Transtorno de Personalidade Paranoide";
const RODAPE_DECK = `TP Paranoide — Módulo ${MOD}`;
const RODAPE_DOC = `Módulo ${MOD} — TP Paranoide`;
const KICKER = "MÓDULO 4.10 · TRANSTORNOS DE PERSONALIDADE · CLUSTER A";

// ============================================================
// 1) SLIDE DECK
// ============================================================
function construirDeck() {
  const pres = deck.novaApresentacao(`${NOME} — Da Neurociência ao Manejo Clínico`);

  deck.slideTitulo(pres, {
    moduloLabel: `Módulo ${MOD} · Cluster A · Transtornos de Personalidade`,
    titulo: "TP Paranoide",
    subtitulo: "Da desconfiança generalizada ao manejo da aliança terapêutica",
    passos: ["Mecanismo", "Sinais", "Instrumento", "Manejo", "Encaminhamento"],
  });

  deck.slideRoteiro(pres, {
    rodape: RODAPE_DECK, pageNum: 2,
    cards: [
      { titulo: "Mecanismo", desc: "Como a desconfiança se torna um esquema estável" },
      { titulo: "Sinais", desc: "O que diferencia desconfiança de traço da patológica" },
      { titulo: "Instrumento", desc: "PID-5, MCMI-IV e SCID-5-PD na prática" },
      { titulo: "Manejo", desc: "4 passos, adaptados a um padrão de longo prazo" },
      { titulo: "Encaminhamento", desc: "Quando isso não basta" },
    ],
  });

  deck.slideHook(pres, {
    rodape: RODAPE_DECK, pageNum: 3,
    frase: "No TP Paranoide, o problema não é o cérebro mentir sobre ameaça — é generalizar demais uma leitura de proteção que, em algum momento da vida, já fez sentido.",
    apoio: "Isso muda o tom da psicoeducação: não é \"você está enxergando errado\", é \"esse sistema de alerta está calibrado alto demais pra maioria das situações de hoje\".",
  });

  deck.slideCircuito(pres, {
    rodape: RODAPE_DECK, pageNum: 4,
    titulo: "A base da hipervigilância interpessoal",
    regioes: [
      { label: "Amígdala (limiar reduzido pra detectar ameaça social)", rx: 0.18, ry: 0.20, color: deck.NAVY, d: 0.5 },
      { label: "Córtex pré-frontal (viés de atribuição hostil na interpretação)", rx: 0.24, ry: 0.64, color: deck.TERRA, d: 0.4 },
      { label: "Hipocampo (memórias de traição/humilhação moldam o esquema)", rx: 0.58, ry: 0.64, color: deck.NAVY_TINT, d: 0.36 },
      { label: "Estriado (reforça a vigilância como comportamento \"recompensado\")", rx: 0.60, ry: 0.26, color: deck.TERRA_TINT, d: 0.36 },
    ],
    notas: [
      "O viés de atribuição hostil faz ambiguidade social ser lida como intenção hostil por padrão, não por exceção.",
      "Isso não é escolha consciente — é o filtro automático com que a informação social chega ao córtex.",
      "Cada \"confirmação\" da desconfiança (real ou mal-interpretada) reforça o esquema — um ciclo que se autoalimenta.",
    ],
  });

  deck.slideCadeia(pres, {
    rodape: RODAPE_DECK, pageNum: 5,
    titulo: "O ciclo que mantém o esquema de desconfiança",
    elos: [
      { titulo: "Ambiguidade social", desc: "Um comentário, atraso ou silêncio sem explicação clara" },
      { titulo: "Viés de atribuição hostil", desc: "É lido automaticamente como intenção de prejudicar" },
      { titulo: "Comportamento defensivo", desc: "A pessoa se antecipa com desconfiança, cobrança ou hostilidade" },
      { titulo: "Profecia se confirma", desc: "O outro reage à defensividade, \"confirmando\" a ameaça esperada" },
    ],
    notaFinal: "É um ciclo autorreforçador — quebrar em qualquer ponto (mais frequentemente na etapa 2) é o que o manejo clínico busca fazer.",
  });

  deck.slideCategorias(pres, {
    rodape: RODAPE_DECK, pageNum: 6,
    titulo: "3 traços centrais",
    categorias: [
      { titulo: "Desconfiança generalizada", desc: "Suspeita, sem base suficiente, de que outros querem prejudicar ou explorar", color: deck.TERRA },
      { titulo: "Hipervigilância a intenções ocultas", desc: "Procura significados escondidos em comentários neutros", color: deck.NAVY },
      { titulo: "Rancor persistente", desc: "Dificuldade de perdoar ofensas reais ou percebidas", color: deck.NAVY_TINT },
    ],
    notaFinal: "O critério clínico é o grau — desconfiança seletiva e proporcional é adaptativa; aqui ela é generalizada e desproporcional.",
  });

  deck.slideSinais(pres, {
    rodape: RODAPE_DECK, pageNum: 7,
    titulo: "O que diferencia traço de padrão patológico",
    itens: [
      { titulo: "Cognitivo", desc: "Leitura hostil de comentários neutros, procura de \"segundas intenções\"" },
      { titulo: "Comportamental", desc: "Checagem repetida de lealdade, questionamento de motivos alheios" },
      { titulo: "Relacional", desc: "Dificuldade de manter vínculos por desconfiança recorrente" },
      { titulo: "Físico", desc: "Tensão constante, hipervigilância corporal ao ambiente" },
    ],
  });

  deck.slideDiferencial(pres, {
    rodape: RODAPE_DECK, pageNum: 8,
    titulo: "Diagnóstico diferencial rápido",
    cards: [
      { titulo: "TP Esquizotípica", desc: "Tem pensamento mágico e excentricidade — paranoide tem desconfiança específica, sem isso" },
      { titulo: "TEPT com hipervigilância", desc: "Tem gatilho traumático identificável e é mais recente/circunscrito" },
      { titulo: "Transtorno delirante", desc: "Paranoide mantém teste de realidade preservado; delirante, não" },
    ],
  });

  deck.slideInstrumentos(pres, {
    rodape: RODAPE_DECK, pageNum: 9,
    titulo: "Três instrumentos, três finalidades",
    instrumentos: [
      { sigla: "PID-5", nome: "Personality Inventory for DSM-5", desc: "Mede traços patológicos de forma dimensional — bom pra mapear intensidade." },
      { sigla: "MCMI-IV", nome: "Millon Clinical Multiaxial Inventory", desc: "Perfil amplo de personalidade, útil pra diferencial entre transtornos." },
      { sigla: "SCID-5-PD", nome: "Entrevista Estruturada pra Transtornos de Personalidade", desc: "Padrão-ouro pra diagnóstico categorial formal." },
    ],
  });

  deck.slideProtocoloOverview(pres, {
    rodape: RODAPE_DECK, pageNum: 10,
    titulo: "Do mecanismo ao manejo: 4 passos",
    passos: [
      { titulo: "Psicoeducação\ndo esquema", desc: "Nomear o padrão sem confrontar defensivamente" },
      { titulo: "Aliança\ngradual", desc: "Construir confiança terapêutica passo a passo — é o maior desafio aqui" },
      { titulo: "Reestruturação\ndo viés", desc: "Trabalhar a atribuição hostil automática" },
      { titulo: "Prevenção de\nruptura", desc: "Antecipar testes de confiança do paciente ao terapeuta" },
    ],
    notaFinal: "Diferente dos protocolos anteriores, aqui o ritmo é mais lento — o vínculo terapêutico É parte do tratamento, não só o meio.",
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 11,
    titulo: "Passos 1 e 2, na prática",
    colunas: [
      {
        numero: 1, titulo: "Psicoeducação do esquema",
        fala: "“Parece que seu sistema de alerta social está calibrado pra proteger você de qualquer sinal de traição — mesmo quando o risco real é baixo. Isso tem explicação, e dá pra recalibrar.”",
        bullets: ["Evite confrontar a crença diretamente logo de início — gera ruptura", "Valide a função protetora do padrão antes de questionar sua proporção"],
      },
      {
        numero: 2, titulo: "Construção de aliança gradual",
        bullets: ["Seja consistente e previsível — inconsistência é gatilho direto de desconfiança", "Explique decisões clínicas com transparência, mesmo pequenas (ex: mudança de horário)", "Não espere confiança rápida — é normal levar mais tempo que em outros perfis"],
      },
    ],
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 12,
    titulo: "Passos 3 e 4, na prática",
    colunas: [
      {
        numero: 3, titulo: "Reestruturação do viés de atribuição",
        tabela: { header: ["Situação ambígua", "Leitura automática", "Leitura alternativa"], linhas: [["Colega não responde mensagem", "\"Está me ignorando de propósito\"", "\"Pode estar ocupado ou não ter visto ainda\""]] },
        notaTabela: "Trabalhe gerando alternativas plausíveis — não peça pro paciente \"confiar mais\" de forma abstrata.",
      },
      {
        numero: 4, titulo: "Prevenção de ruptura terapêutica",
        bullets: ["Antecipe que o paciente pode testar a lealdade do terapeuta (ex: perguntas indiretas de checagem)", "Trate rupturas quando acontecerem como material clínico, não como fim do vínculo", "Rupturas e reparos bem conduzidos ensinam que a confiança pode ser reconstruída"],
      },
    ],
  });

  deck.slideCaso(pres, {
    rodape: RODAPE_DECK, pageNum: 13,
    vinheta: "Roberto, 45 anos, chega 10 minutos atrasado à sessão porque o terapeuta remarcou o horário na semana anterior. Diz, com tom hostil: \"Imagino que isso significa que você não me leva a sério como paciente.\" Relata histórico de rompimentos abruptos com colegas de trabalho por suspeitar de \"conspirações\" sem evidência concreta.",
    perguntas: [
      "Que viés cognitivo está operando na fala de Roberto sobre o atraso?",
      "Como você responderia a essa fala sem confrontar nem validar a desconfiança de forma acrítica?",
      "O que os rompimentos abruptos no trabalho sugerem sobre o padrão relacional de Roberto?",
    ],
  });

  deck.slideEncaminhamento(pres, {
    rodape: RODAPE_DECK, pageNum: 14,
    criterios: [
      "Emergência de sintomas psicóticos (perda de teste de realidade, delírios estruturados)",
      "Risco de violência baseado em crença de perseguição — avaliação de risco formal necessária",
      "Ruptura terapêutica recorrente que impede qualquer progresso, mesmo com manejo cuidadoso",
      "Comorbidade que exige tratamento próprio (ex: depressão associada ao isolamento social)",
    ],
  });

  deck.slideRecap(pres, {
    rodape: RODAPE_DECK, pageNum: 15,
    pontos: [
      "A desconfiança paranoide é um esquema autorreforçado, não uma escolha consciente",
      "Desconfiança generalizada, hipervigilância a intenções ocultas e rancor persistente são os 3 traços centrais",
      "PID-5, MCMI-IV e SCID-5-PD estruturam o diagnóstico com dado, não só impressão",
      "Aqui, construir e manter a aliança terapêutica É o tratamento — não apenas o caminho até ele",
    ],
    proximoTexto: "Próximo: exercícios práticos e avaliação do Módulo 4.10 →",
  });

  return pres.writeFile({ fileName: "Modulo-4.10-TP-Paranoide.pptx" });
}

// ============================================================
// 2) EXERCÍCIOS
// ============================================================
function construirExercicios() {
  const children = [
    ...doc.capa(KICKER, "Exercícios — TP Paranoide", "Resolva individualmente antes da sessão de supervisão. O objetivo é testar sua leitura do mecanismo e do manejo antes de comparar com a discussão em grupo — não há problema em errar."),

    doc.exNum(1, "O mecanismo, em suas palavras"),
    doc.pergunta(1, "Explique em até 3 frases, sem jargão técnico, por que confrontar diretamente a desconfiança de um paciente paranoide costuma piorar a aliança terapêutica."),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Descreva o ciclo que mantém o esquema de desconfiança, do gatilho ambíguo até a \"confirmação\"."),
    ...doc.linhaResposta(2),

    doc.exNum(2, "Diagnóstico diferencial"),
    doc.vinhetaBox("Um paciente relata que sente que \"as pessoas sabem de algo que ele não sabe\" e tem experiências perceptivas incomuns, além de desconfiança generalizada e discurso vago."),
    doc.pergunta(1, "TP Paranoide ou TP Esquizotípica? Que elemento da vinheta ajuda a diferenciar?"),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Que instrumento você aplicaria pra confirmar essa leitura?"),
    ...doc.linhaResposta(1),

    doc.exNum(3, "Reestruturação do viés de atribuição"),
    doc.vinhetaBox("Um paciente diz: \"Meu chefe me olhou de um jeito estranho na reunião. Com certeza está planejando me demitir.\""),
    doc.pergunta(1, "Gere 2 leituras alternativas plausíveis pra essa situação ambígua."),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Como você conduziria essa reestruturação sem soar como se estivesse \"corrigindo\" o paciente?"),
    ...doc.linhaResposta(1),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),

    doc.exNum(4, "Prevenção de ruptura"),
    doc.p("Liste 3 situações clínicas comuns (ex: remarcar sessão, atraso, férias do terapeuta) que podem funcionar como gatilho de desconfiança nesse perfil, e uma forma de comunicá-las que reduza esse risco."),
    doc.tabelaSimples(["Situação", "Como comunicar pra reduzir desconfiança"], [["", ""], ["", ""], ["", ""]], [4200, 5150]),

    doc.exNum(5, "Caso integrado — Roberto"),
    doc.vinhetaBox("Roberto, 45 anos, chega atrasado porque o terapeuta remarcou a sessão. Diz com tom hostil que isso significa que não é levado a sério. Relata rompimentos abruptos no trabalho por suspeitar de \"conspirações\" sem evidência."),
    doc.pergunta(1, "Escreva a frase de psicoeducação que você usaria com Roberto."),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Como você responderia à fala hostil sobre o atraso, no momento em que ela acontece?"),
    ...doc.linhaResposta(2),
    doc.pergunta(3, "Em que ponto você consideraria que a aliança terapêutica está rompida a ponto de exigir mudança de abordagem?"),
    ...doc.linhaResposta(2),
  ];

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-4.10-Exercicios.docx");
}

// ============================================================
// 3) AVALIAÇÃO
// ============================================================
function construirProva() {
  const objetivas = [
    ["O \"viés de atribuição hostil\" no TP Paranoide se refere a:", ["Interpretar ambiguidade social como intenção de prejudicar, por padrão", "Um tipo de alucinação auditiva", "A ausência completa de qualquer emoção", "Um efeito colateral de medicação"]],
    ["O ciclo que mantém o esquema de desconfiança inclui:", ["Ambiguidade → atribuição hostil → defensividade → \"confirmação\" da ameaça", "Apenas eventos traumáticos únicos e isolados", "Não existe ciclo, é um traço fixo e imutável", "Melhora espontânea sem qualquer intervenção"]],
    ["Os 3 traços centrais do TP Paranoide são:", ["Desconfiança generalizada, hipervigilância a intenções ocultas, rancor persistente", "Grandiosidade, necessidade de admiração, falta de empatia", "Impulsividade, instabilidade afetiva, medo de abandono", "Desinteresse social, restrição afetiva, isolamento"]],
    ["O que diferencia TP Paranoide de Transtorno Delirante?", ["Não há diferença clínica relevante", "No TP Paranoide o teste de realidade está preservado; no delirante, não", "TP Paranoide sempre envolve alucinações", "Transtorno delirante nunca causa desconfiança"]],
    ["Instrumento considerado padrão-ouro pra diagnóstico categorial formal de transtorno de personalidade:", ["SCID-5-PD", "BAI", "MBI", "Y-BOCS"]],
    ["Por que confrontar diretamente a crença paranoide costuma ser contraproducente no início do tratamento?", ["Porque o paciente sempre tem razão", "Porque tende a gerar ruptura da aliança terapêutica, ainda frágil", "Porque não há nenhuma técnica melhor disponível", "Porque é ilegal fazer isso"]],
    ["O passo de \"prevenção de ruptura\" no manejo do TP Paranoide envolve:", ["Evitar qualquer contato com o paciente", "Antecipar testes de confiança e tratar rupturas como material clínico, não como fim do vínculo", "Confrontar o paciente sempre que ele demonstrar desconfiança", "Terminar o tratamento na primeira ruptura"]],
    ["É sinal comportamental de alerta no TP Paranoide:", ["Confiança espontânea em pessoas novas", "Checagem repetida de lealdade e questionamento de motivos alheios", "Ausência total de qualquer desconfiança", "Facilidade extrema de perdoar ofensas"]],
    ["É critério de encaminhamento:", ["O paciente discordar do terapeuta uma vez", "Emergência de sintomas psicóticos ou risco de violência baseado em crença de perseguição", "O paciente ter mais de 40 anos", "Uma única sessão com atraso"]],
    ["Por que a construção da aliança terapêutica é descrita como \"o próprio tratamento\", não só o caminho até ele, no TP Paranoide?", ["Porque não há nenhuma outra técnica aplicável", "Porque a experiência de uma relação consistente e confiável é, em si, uma correção da expectativa de traição generalizada", "Porque a aliança não tem nenhuma relação com o esquema de desconfiança", "Porque o paciente nunca desenvolve confiança de fato"]],
  ];
  const gabaritoObjetivas = ["a", "a", "a", "b", "a", "b", "b", "b", "b", "b"];

  const children = [
    ...doc.capa(KICKER, "Avaliação — TP Paranoide", `Avaliação formativa de encerramento do Módulo ${MOD}.`),
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
    doc.vinhetaBox("Sandra, 38 anos, começou terapia há 2 meses. Na quarta sessão, pergunta ao terapeuta, de forma insistente, se ele \"comenta os casos dela com outros colegas\". Quando o terapeuta explica o sigilo profissional, ela responde: \"É fácil dizer isso, né?\" Relata ter trocado de emprego 4 vezes nos últimos 5 anos, sempre por suspeitar que colegas \"estavam armando contra ela\"."),
    new doc.Paragraph({ spacing: { before: 240 }, children: [new doc.TextRun({ text: "Com base no protocolo estudado, responda:", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    new doc.Paragraph({ spacing: { before: 220, after: 40 }, children: [new doc.TextRun({ text: "a) (10 pts) Que traço central do TP Paranoide está mais evidente na pergunta sobre sigilo?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "b) (10 pts) A resposta \"É fácil dizer isso, né?\" é um teste de confiança ao terapeuta. Como você responderia, sem confrontar nem validar acriticamente?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "c) (10 pts) O padrão de trocar de emprego por suspeitar de conspirações se encaixa em qual dos 3 traços centrais estudados?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "d) (10 pts) Descreva uma ação concreta pra reforçar a previsibilidade e consistência do enquadre terapêutico com Sandra.", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    new doc.Paragraph({ spacing: { after: 40 }, children: [new doc.TextRun({ text: "USO EXCLUSIVO DO INSTRUTOR — remover antes de aplicar a prova", bold: true, color: doc.TERRA, font: doc.FONT, size: 20 })] }),
    doc.tituloH1("Gabarito"),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 1 — Questões objetivas", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 200 }, children: [new doc.TextRun({ text: gabaritoObjetivas.map((r, i) => `${i + 1}-${r}`).join("   ·   "), font: doc.FONT, size: 22, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 2 — Critério de correção da questão de caso", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "a) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Hipervigilância a intenções ocultas — busca de confirmação de que o terapeuta pode estar agindo contra ela.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "b) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Espera-se uma resposta que reconheça a dificuldade de confiar sem invalidar, reforçando consistência (\"entendo que confiar é difícil pra você — vou seguir mostrando isso com o tempo, não só com palavras\"), sem se defender de forma ansiosa nem confrontar a desconfiança.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "c) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Desconfiança generalizada — o padrão de trocar de emprego por suspeita repetida, sem evidência, é a manifestação central desse traço.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "d) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Ex: comunicar com antecedência qualquer mudança de horário/agenda, explicar o motivo de decisões clínicas simples, manter o enquadre (horário, duração, sigilo) rigorosamente estável sessão a sessão.", font: doc.FONT, size: 21, color: doc.INK })] }),
  );

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-4.10-Avaliacao.docx");
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
      n: 1, titulo: "Uma proteção generalizada demais", duracao: "12 min", slides: "1, 2, 3, 4",
      objetivo: "Sair sabendo explicar a base do viés de atribuição hostil sem jargão, e por que confrontar diretamente costuma piorar a aliança.",
      segmentos: [
        seg("0:00–0:45", "Abertura (gancho)", [{ fala: "No TP Paranoide, o problema não é o cérebro mentir sobre ameaça — é generalizar demais uma leitura de proteção que, em algum momento da vida, já fez sentido." }]),
        seg("0:45–2:00", "Por que isso importa clinicamente", ["Muda o tom da psicoeducação: não é \"você está enxergando errado\", é \"esse alerta está calibrado alto demais\".", "Isso é o Passo 1 da anatomia de todo protocolo do curso: Mecanismo."]),
        seg("2:00–8:00", "A base da hipervigilância interpessoal (mostrar slide 4)", [
          "Amígdala com limiar reduzido pra detectar ameaça social.",
          "Córtex pré-frontal com viés de atribuição hostil na interpretação.",
          "Hipocampo guarda memórias de traição/humilhação que moldam o esquema.",
          "Estriado reforça a vigilância como comportamento \"recompensado\".",
        ]),
        seg("8:00–10:30", "Como levar isso pra sessão", [{ fala: "Parece que seu sistema de alerta social está calibrado pra proteger você de qualquer sinal de traição — mesmo quando o risco real é baixo." }]),
        seg("10:30–12:00", "Fechamento", [{ fala: "Próxima aula: o ciclo que mantém esse esquema funcionando." }]),
      ],
    },
    {
      n: 2, titulo: "O ciclo que mantém o esquema", duracao: "10 min", slides: "5",
      objetivo: "Explicar o ciclo ambiguidade–atribuição hostil–defensividade–confirmação.",
      segmentos: [
        seg("0:00–1:00", "Retomada rápida", ["Vimos as estruturas envolvidas. Hoje vemos como elas formam um ciclo que se repete."]),
        seg("1:00–6:30", "A cadeia (mostrar slide 5)", ["Ambiguidade social surge — um atraso, um comentário sem contexto.", "É lida automaticamente como intenção hostil.", "A pessoa reage com defensividade antecipada.", "O outro reage à defensividade, \"confirmando\" a ameaça esperada."]),
        seg("6:30–9:00", "Onde quebrar o ciclo", ["A etapa mais acessível clinicamente é a leitura automática — é onde o passo 3 do manejo vai atuar."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: os 3 traços centrais do TP Paranoide." }]),
      ],
    },
    {
      n: 3, titulo: "Os 3 traços centrais", duracao: "10 min", slides: "6",
      objetivo: "Reconhecer desconfiança generalizada, hipervigilância a intenções ocultas e rancor persistente.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três traços — o critério clínico é sempre o grau, não a presença isolada."]),
        seg("1:00–7:00", "Os 3 traços (mostrar slide 6)", [
          "Desconfiança generalizada: suspeita sem base suficiente.",
          "Hipervigilância a intenções ocultas: procura significados escondidos.",
          "Rancor persistente: dificuldade de perdoar ofensas percebidas.",
        ]),
        seg("7:00–9:00", "Onde fica o limite clínico", ["Desconfiança seletiva e proporcional é adaptativa — aqui ela é generalizada e desproporcional ao risco real."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: o que diferencia traço de padrão patológico na prática." }]),
      ],
    },
    {
      n: 4, titulo: "Sinais de alerta", duracao: "10 min", slides: "7",
      objetivo: "Reconhecer sinais cognitivos, comportamentais, relacionais e físicos do padrão paranoide.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Reconhecer o padrão cedo ajuda a calibrar a abordagem desde a primeira sessão."]),
        seg("1:00–7:30", "As 4 categorias (mostrar slide 7)", [
          "Cognitivo: leitura hostil de comentários neutros.",
          "Comportamental: checagem repetida de lealdade.",
          "Relacional: dificuldade de manter vínculos por desconfiança recorrente.",
          "Físico: tensão constante, hipervigilância corporal.",
        ]),
        seg("7:30–9:00", "Por que isso importa", ["Esses sinais aparecem também na relação terapêutica — antecipar isso evita ruptura precoce."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: como diferenciar TP Paranoide de quadros parecidos." }]),
      ],
    },
    {
      n: 5, titulo: "Diagnóstico diferencial rápido", duracao: "12 min", slides: "8",
      objetivo: "Diferenciar TP Paranoide de TP Esquizotípica, TEPT com hipervigilância e Transtorno Delirante.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Um filtro rápido — o teste de realidade é a chave de uma das diferenciações."]),
        seg("1:00–8:00", "Os 3 quadros (mostrar slide 8)", [
          "TP Esquizotípica: tem pensamento mágico e excentricidade, paranoide não.",
          "TEPT com hipervigilância: tem gatilho traumático identificável e é mais recente.",
          "Transtorno delirante: teste de realidade comprometido; paranoide preserva.",
        ]),
        seg("8:00–10:30", "Por que o teste de realidade importa tanto", ["É o que diferencia um traço de personalidade rígido de um quadro psicótico — muda completamente a conduta clínica."]),
        seg("10:30–12:00", "Fechamento", [{ fala: "Próxima aula: os instrumentos que confirmam essa leitura com dado." }]),
      ],
    },
    {
      n: 6, titulo: "Os 3 instrumentos de avaliação", duracao: "12 min", slides: "9",
      objetivo: "Saber quando usar PID-5, MCMI-IV e SCID-5-PD.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três instrumentos, três profundidades de avaliação."]),
        seg("1:00–4:30", "PID-5", ["Mede traços patológicos de forma dimensional.", "Bom pra mapear intensidade, não só presença/ausência."]),
        seg("4:30–7:30", "MCMI-IV", ["Perfil amplo de personalidade.", "Útil pro diagnóstico diferencial entre transtornos."]),
        seg("7:30–10:00", "SCID-5-PD", ["Entrevista estruturada.", "Padrão-ouro pra diagnóstico categorial formal."]),
        seg("10:00–12:00", "Como escolher na prática", ["PID-5 pra rastreio dimensional; SCID-5-PD quando precisar de diagnóstico formal.", { fala: "Próxima aula: colocamos tudo em prática — psicoeducação e construção de aliança." }]),
      ],
    },
    {
      n: 7, titulo: "Manejo — psicoeducação e aliança gradual", duracao: "14 min", slides: "10, 11",
      objetivo: "Aplicar os passos 1 e 2 do manejo com script de psicoeducação e estratégias de construção de aliança.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["A parte que você vai usar já na próxima sessão com esse perfil. Hoje, os 2 primeiros passos."]),
        seg("1:00–2:00", "Visão geral (mostrar slide 10)", ["Psicoeducação → Aliança gradual → Reestruturação do viés → Prevenção de ruptura.", "O ritmo aqui é mais lento que nos protocolos anteriores — e isso é esperado."]),
        seg("2:00–7:00", "Passo 1 — Psicoeducação (mostrar slide 11, esquerda)", [{ fala: "Parece que seu sistema de alerta social está calibrado pra proteger você de qualquer sinal de traição — mesmo quando o risco real é baixo." }]),
        seg("7:00–13:00", "Passo 2 — Aliança gradual (mostrar slide 11, direita)", ["Seja consistente e previsível — inconsistência é gatilho direto de desconfiança.", "Explique decisões clínicas com transparência, mesmo pequenas."]),
        seg("13:00–14:00", "Fechamento", [{ fala: "Próxima aula: reestruturação do viés de atribuição e prevenção de ruptura." }]),
      ],
    },
    {
      n: 8, titulo: "Manejo — reestruturação e prevenção de ruptura", duracao: "14 min", slides: "12",
      objetivo: "Trabalhar leituras alternativas a situações ambíguas e antecipar testes de confiança do paciente.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Hoje fechamos o manejo com as duas etapas mais delicadas."]),
        seg("1:00–7:00", "Passo 3 — Reestruturação do viés (mostrar slide 12, esquerda)", ["Percorra o exemplo da tabela.", "Gere alternativas plausíveis — não peça pro paciente \"confiar mais\" de forma abstrata."]),
        seg("7:00–13:00", "Passo 4 — Prevenção de ruptura (mostrar slide 12, direita)", ["Antecipe testes de confiança indiretos.", "Trate rupturas como material clínico, não como fim do vínculo.", "Reparos bem conduzidos ensinam que a confiança pode ser reconstruída."]),
        seg("13:00–14:00", "Fechamento", [{ fala: "Manejo completo. Próxima aula: um caso real e os critérios de quando encaminhar." }]),
      ],
    },
    {
      n: 9, titulo: "Estudo de caso, encaminhamento e recap", duracao: "15 min", slides: "13, 14, 15",
      objetivo: "Integrar mecanismo, instrumento e manejo num caso completo.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Última aula do módulo. Caso completo e os limites do manejo sem apoio adicional."]),
        seg("1:00–7:00", "Estudo de caso — Roberto (mostrar slide 13)", ["Leia a vinheta com calma.", "Percorra as 3 perguntas de discussão.", "Convide o aluno a pausar e responder por escrito."]),
        seg("7:00–11:00", "Quando encaminhar (mostrar slide 14)", ["Percorra os 4 critérios — ênfase em emergência de sintomas psicóticos e risco de violência."]),
        seg("11:00–14:00", "Recapitulando o módulo (mostrar slide 15)", ["Retome os 4 pontos-chave.", "Reforce que a aliança terapêutica É o tratamento aqui, não só o caminho até ele."]),
        seg("14:00–15:00", "Fechamento do módulo", [{ fala: "Agora é hora dos exercícios e da avaliação. Te vejo no próximo transtorno de personalidade." }]),
      ],
    },
  ];

  const totalMin = 12 + 10 + 10 + 10 + 12 + 12 + 14 + 14 + 15;

  const children = [
    ...doc.capa(KICKER, "Roteiro de Aulas — TP Paranoide", "Módulo dividido em 9 vídeo-aulas de 10 a 15 minutos, seguindo os slides já produzidos. Cada aula tem roteiro cronometrado, pronto pra gravação."),
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

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", `${RODAPE_DOC} — Roteiro de Aulas`, children), "Modulo-4.10-Roteiro-Aulas.docx");
}

// ============================================================
Promise.resolve()
  .then(construirDeck)
  .then(construirExercicios)
  .then(construirProva)
  .then(construirRoteiro)
  .then(() => console.log("TUDO PRONTO"))
  .catch((e) => { console.error(e); process.exit(1); });

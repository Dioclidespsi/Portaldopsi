const deck = require("../_lib/lib-deck.js");
const doc = require("../_lib/lib-doc.js");

const MOD = "4.11";
const NOME = "Transtorno de Personalidade Esquizoide";
const RODAPE_DECK = `TP Esquizoide — Módulo ${MOD}`;
const RODAPE_DOC = `Módulo ${MOD} — TP Esquizoide`;
const KICKER = "MÓDULO 4.11 · TRANSTORNOS DE PERSONALIDADE · CLUSTER A";

// ============================================================
// 1) SLIDE DECK
// ============================================================
function construirDeck() {
  const pres = deck.novaApresentacao(`${NOME} — Da Neurociência ao Manejo Clínico`);

  deck.slideTitulo(pres, {
    moduloLabel: `Módulo ${MOD} · Cluster A · Transtornos de Personalidade`,
    titulo: "TP Esquizoide",
    subtitulo: "Do baixo drive de afiliação social ao manejo respeitoso da solidão",
    passos: ["Mecanismo", "Sinais", "Instrumento", "Manejo", "Encaminhamento"],
  });

  deck.slideRoteiro(pres, {
    rodape: RODAPE_DECK, pageNum: 2,
    cards: [
      { titulo: "Mecanismo", desc: "Por que proximidade social não é recompensadora aqui" },
      { titulo: "Sinais", desc: "O que diferencia preferência de sofrimento" },
      { titulo: "Instrumento", desc: "PID-5, SCID-5-PD e escala de solidão" },
      { titulo: "Manejo", desc: "4 passos, sem patologizar solidão em si" },
      { titulo: "Encaminhamento", desc: "Quando isso não basta" },
    ],
  });

  deck.slideHook(pres, {
    rodape: RODAPE_DECK, pageNum: 3,
    frase: "No TP Esquizoide, o problema não é medo de proximidade — é a proximidade simplesmente não ativar a mesma recompensa que ativa na maioria das pessoas.",
    apoio: "Isso muda completamente o objetivo terapêutico: não é \"ajudar a superar o medo\", é entender o que realmente causa prejuízo, se é que causa.",
  });

  deck.slideCircuito(pres, {
    rodape: RODAPE_DECK, pageNum: 4,
    titulo: "Por que o social não recompensa da mesma forma",
    regioes: [
      { label: "Núcleo accumbens (baixa resposta a recompensa social específica)", rx: 0.18, ry: 0.20, color: deck.NAVY, d: 0.5 },
      { label: "Córtex pré-frontal (mundo interno rico, processado internamente)", rx: 0.24, ry: 0.64, color: deck.TERRA, d: 0.4 },
      { label: "Amígdala (baixa reatividade emocional expressa)", rx: 0.58, ry: 0.64, color: deck.NAVY_TINT, d: 0.36 },
      { label: "Sistema de apego (baixo drive de busca de proximidade desde cedo)", rx: 0.60, ry: 0.26, color: deck.TERRA_TINT, d: 0.36 },
    ],
    notas: [
      "Diferente da depressão, aqui a baixa resposta de recompensa é específica ao domínio social — outras áreas (hobbies solitários, ideias) podem ser plenamente recompensadoras.",
      "Isso não é anedonia global nem timidez — é um drive de afiliação social baixo desde o desenvolvimento inicial.",
      "A expressão emocional reduzida não significa ausência de vida interna — só que ela raramente é compartilhada.",
    ],
  });

  deck.slideCadeia(pres, {
    rodape: RODAPE_DECK, pageNum: 5,
    titulo: "Como o padrão se consolida ao longo da vida",
    elos: [
      { titulo: "Baixo drive de afiliação", desc: "Menor busca inata de vínculo próximo, desde cedo" },
      { titulo: "Menos prática social", desc: "Menos oportunidades de desenvolver e refinar habilidades sociais" },
      { titulo: "Isolamento vira padrão", desc: "A vida se organiza em torno de atividades e interesses solitários" },
      { titulo: "Reforço próprio", desc: "O isolamento raramente é sentido como perda — não há motivação pra mudar" },
    ],
    notaFinal: "Isso é crucial pro manejo: motivação pra tratamento raramente vem do próprio paciente pedindo \"ajuda pra ser mais social\".",
  });

  deck.slideCategorias(pres, {
    rodape: RODAPE_DECK, pageNum: 6,
    titulo: "3 traços centrais",
    categorias: [
      { titulo: "Desinteresse genuíno", desc: "Por relações próximas, incluindo familiares", color: deck.TERRA },
      { titulo: "Restrição afetiva", desc: "Gama emocional reduzida na expressão, não necessariamente na experiência", color: deck.NAVY },
      { titulo: "Preferência por solidão", desc: "Escolha ativa por atividades solitárias, não evitação por medo", color: deck.NAVY_TINT },
    ],
    notaFinal: "A palavra-chave é \"desinteresse\", não \"medo\" — essa é a diferença central com o TP Evitativo.",
  });

  deck.slideSinais(pres, {
    rodape: RODAPE_DECK, pageNum: 7,
    titulo: "O que diferencia preferência de sofrimento clínico",
    itens: [
      { titulo: "Cognitivo", desc: "Introspecção intensa, mundo interno rico mas raramente compartilhado" },
      { titulo: "Comportamental", desc: "Evita mesmo relações que outros considerariam claramente desejáveis" },
      { titulo: "Relacional", desc: "Poucas ou nenhuma relação próxima, incluindo com a família de origem" },
      { titulo: "Físico", desc: "Expressão facial e corporal pouco reativa emocionalmente" },
    ],
  });

  deck.slideDiferencial(pres, {
    rodape: RODAPE_DECK, pageNum: 8,
    titulo: "Diagnóstico diferencial rápido",
    cards: [
      { titulo: "Transtorno do Espectro Autista", desc: "Tem prejuízo de habilidade social; esquizoide tem habilidade, mas não motivação" },
      { titulo: "TP Evitativa", desc: "Evita por medo de rejeição; esquizoide não tem desejo de proximidade pra começo" },
      { titulo: "Depressão", desc: "É episódica e recente; esquizoide é padrão estável ao longo de toda a vida adulta" },
    ],
  });

  deck.slideInstrumentos(pres, {
    rodape: RODAPE_DECK, pageNum: 9,
    titulo: "Três instrumentos, três finalidades",
    instrumentos: [
      { sigla: "PID-5", nome: "Personality Inventory for DSM-5", desc: "Mapeia o traço de desapego social de forma dimensional." },
      { sigla: "SCID-5-PD", nome: "Entrevista Estruturada", desc: "Padrão-ouro pra confirmar diagnóstico categorial formal." },
      { sigla: "Escala de Solidão (UCLA)", nome: "UCLA Loneliness Scale", desc: "Diferencia isolamento egossintônico (sem sofrimento) de isolamento sofrido." },
    ],
  });

  deck.slideProtocoloOverview(pres, {
    rodape: RODAPE_DECK, pageNum: 10,
    titulo: "Do mecanismo ao manejo: 4 passos",
    passos: [
      { titulo: "Psicoeducação\nrespeitosa", desc: "Não patologizar preferência por solidão em si" },
      { titulo: "Avaliar\nmotivação", desc: "Muitos não buscam tratamento pra isso especificamente" },
      { titulo: "Expansão\ngradual", desc: "Só se desejado pelo próprio paciente, no ritmo dele" },
      { titulo: "Foco em\nfuncionamento", desc: "Trabalho e autonomia, mais que \"socializar mais\"" },
    ],
    notaFinal: "Diferente da maioria dos protocolos, aqui o objetivo não é presumido — é construído junto com o paciente.",
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 11,
    titulo: "Passos 1 e 2, na prática",
    colunas: [
      {
        numero: 1, titulo: "Psicoeducação respeitosa",
        fala: "“Prefiro entender o que te trouxe aqui hoje do que presumir que solidão é, por si só, um problema a resolver.”",
        bullets: ["Evite tratar a preferência por solidão como sintoma a ser eliminado", "Foque no que realmente causa prejuízo funcional, se houver algum"],
      },
      {
        numero: 2, titulo: "Avaliar motivação real",
        bullets: ["Pergunte quem trouxe a demanda — o próprio paciente ou a família/trabalho?", "Explore se há sofrimento genuíno ou só desconforto de terceiros com o padrão", "Se não há sofrimento nem prejuízo funcional, considere não patologizar"],
      },
    ],
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 12,
    titulo: "Passos 3 e 4, na prática",
    colunas: [
      {
        numero: 3, titulo: "Expansão gradual (se desejada)",
        bullets: ["Trabalhe apenas metas que o próprio paciente define como importantes", "Vá no ritmo dele — pressa aqui costuma gerar desistência do tratamento", "Pequenas trocas sociais com baixo custo emocional podem ser um bom início"],
      },
      {
        numero: 4, titulo: "Foco em funcionamento",
        bullets: ["Priorize áreas como trabalho, autonomia financeira, saúde física", "\"Socializar mais\" não deveria ser meta padrão — só se o paciente quiser", "Avalie prejuízo real: perda de emprego, isolamento que afeta cuidados básicos"],
      },
    ],
  });

  deck.slideCaso(pres, {
    rodape: RODAPE_DECK, pageNum: 13,
    vinheta: "Fernando, 34 anos, é trazido à terapia pela mãe, preocupada com o \"isolamento\" do filho — ele mora sozinho, trabalha como programador remoto, e raramente sai de casa fora do necessário. Fernando diz, sem sinal de desconforto: \"Não sinto falta de nada disso. Tenho meus projetos, meus livros. Vim aqui pra minha mãe parar de se preocupar.\"",
    perguntas: [
      "Fernando apresenta sofrimento clínico genuíno com base na vinheta? Justifique.",
      "Como você conduziria a primeira sessão, considerando que a demanda veio da mãe, não dele?",
      "Que pergunta ajudaria a diferenciar TP Esquizoide de TEA nesse caso?",
    ],
  });

  deck.slideEncaminhamento(pres, {
    rodape: RODAPE_DECK, pageNum: 14,
    criterios: [
      "Comorbidade com depressão que precisa de tratamento próprio e específico",
      "Investigação de espectro autista, se houver prejuízo de habilidade (não só de motivação) social",
      "Prejuízo funcional real e crescente (perda de emprego, negligência de autocuidado básico)",
      "Sofrimento genuíno relatado pelo próprio paciente, mesmo que o padrão pareça estável há anos",
    ],
  });

  deck.slideRecap(pres, {
    rodape: RODAPE_DECK, pageNum: 15,
    pontos: [
      "No TP Esquizoide, o social simplesmente não recompensa da mesma forma — não é medo, é desinteresse genuíno",
      "Desinteresse por relações, restrição afetiva e preferência por solidão são os 3 traços centrais",
      "PID-5, SCID-5-PD e a Escala de Solidão ajudam a diferenciar isolamento tranquilo de isolamento sofrido",
      "O manejo aqui não presume que \"mais socialização\" é a meta — a meta é construída com o paciente",
    ],
    proximoTexto: "Próximo: exercícios práticos e avaliação do Módulo 4.11 →",
  });

  return pres.writeFile({ fileName: "Modulo-4.11-TP-Esquizoide.pptx" });
}

// ============================================================
// 2) EXERCÍCIOS
// ============================================================
function construirExercicios() {
  const children = [
    ...doc.capa(KICKER, "Exercícios — TP Esquizoide", "Resolva individualmente antes da sessão de supervisão. O objetivo é testar sua leitura do mecanismo e do manejo antes de comparar com a discussão em grupo — não há problema em errar."),

    doc.exNum(1, "O mecanismo, em suas palavras"),
    doc.pergunta(1, "Explique em até 3 frases, sem jargão técnico, por que o TP Esquizoide não deve ser tratado como \"medo de se relacionar\"."),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Cite os 3 traços centrais do TP Esquizoide e dê um exemplo de fala de paciente pra cada um."),
    ...doc.linhaResposta(2),

    doc.exNum(2, "Diagnóstico diferencial"),
    doc.vinhetaBox("Um paciente evita eventos sociais porque \"tem certeza de que vai fazer alguma coisa errada e ser julgado\", mas relata desejo intenso de ter amigos próximos."),
    doc.pergunta(1, "TP Esquizoide ou TP Evitativa? Justifique com base no elemento central da vinheta."),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Isso muda completamente a meta do tratamento? Como?"),
    ...doc.linhaResposta(1),

    doc.exNum(3, "Avaliando motivação real"),
    doc.vinhetaBox("Um paciente chega à sessão porque a esposa insistiu, dizendo que ele \"nunca compartilha nada\". O paciente relata satisfação com sua rotina solitária de hobbies."),
    doc.pergunta(1, "Que perguntas você faria pra avaliar se há sofrimento clínico genuíno aqui?"),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Se não houver sofrimento nem prejuízo funcional, qual deveria ser sua conduta?"),
    ...doc.linhaResposta(1),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),

    doc.exNum(4, "Foco em funcionamento"),
    doc.p("Para um paciente com TP Esquizoide que relata prejuízo real no trabalho (não entrega tarefas em equipe por evitar contato), liste 3 metas de funcionamento que não dependam de \"socializar mais\"."),
    doc.tabelaSimples(["Nº", "Meta de funcionamento"], [["1", ""], ["2", ""], ["3", ""]], [1200, 8150]),

    doc.exNum(5, "Caso integrado — Fernando"),
    doc.vinhetaBox("Fernando, 34 anos, é trazido pela mãe por \"isolamento\". Trabalha remoto, mora sozinho, raramente sai. Diz não sentir falta de contato social, veio só pra mãe parar de se preocupar."),
    doc.pergunta(1, "Escreva como você conduziria a abertura dessa primeira sessão."),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Que pergunta ajudaria a diferenciar TP Esquizoide de TEA nesse caso?"),
    ...doc.linhaResposta(2),
    doc.pergunta(3, "Baseado só na vinheta, existe indicação clínica clara de tratamento aqui? Justifique."),
    ...doc.linhaResposta(2),
  ];

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-4.11-Exercicios.docx");
}

// ============================================================
// 3) AVALIAÇÃO
// ============================================================
function construirProva() {
  const objetivas = [
    ["No TP Esquizoide, a baixa resposta de recompensa social é:", ["Idêntica à anedonia global da depressão", "Específica ao domínio social — outras áreas podem ser plenamente recompensadoras", "Sempre acompanhada de medo intenso de rejeição", "Um sinal de transtorno psicótico"]],
    ["Os 3 traços centrais do TP Esquizoide são:", ["Desinteresse genuíno por relações, restrição afetiva, preferência por solidão", "Grandiosidade, necessidade de admiração, falta de empatia", "Desconfiança generalizada, hipervigilância, rancor persistente", "Impulsividade, instabilidade afetiva, medo de abandono"]],
    ["O que diferencia TP Esquizoide de TP Evitativa?", ["Não há diferença clínica relevante entre eles", "Esquizoide tem desinteresse genuíno por proximidade; evitativa deseja proximidade mas teme rejeição", "Evitativa nunca tem contato social de qualquer tipo", "Esquizoide sempre tem sintomas psicóticos associados"]],
    ["O que diferencia TP Esquizoide de Transtorno do Espectro Autista?", ["São exatamente a mesma condição", "No TEA há prejuízo de habilidade social; no esquizoide, há habilidade mas não motivação", "TEA nunca envolve isolamento social", "TP Esquizoide sempre inclui déficit de linguagem"]],
    ["Instrumento útil pra diferenciar isolamento egossintônico de isolamento sofrido:", ["Escala de Solidão (UCLA)", "Y-BOCS", "MBI", "BAI"]],
    ["Por que a motivação pra tratamento raramente vem do próprio paciente com TP Esquizoide?", ["Porque o isolamento raramente é sentido como perda por ele", "Porque o paciente sempre nega ter qualquer transtorno", "Porque não existe manejo possível pra esse perfil", "Porque é sempre um quadro exclusivamente familiar, não individual"]],
    ["O passo 1 do manejo (psicoeducação respeitosa) envolve:", ["Convencer o paciente de que solidão é sempre um problema", "Evitar tratar a preferência por solidão como sintoma a ser eliminado por padrão", "Ignorar completamente a demanda que trouxe o paciente à terapia", "Impor imediatamente metas de socialização"]],
    ["É sinal de que pode haver prejuízo funcional real, não só preferência:", ["O paciente ter poucos amigos, mas manter o emprego normalmente", "Perda de emprego ou negligência de autocuidado básico ligada ao isolamento", "O paciente gostar de atividades solitárias como leitura", "A família achar que o paciente deveria sair mais"]],
    ["É critério de encaminhamento:", ["O paciente preferir atividades solitárias no fim de semana", "Investigação de espectro autista quando há prejuízo de habilidade social, não só de motivação", "O paciente ter menos de 5 amigos próximos", "Trabalhar de forma remota"]],
    ["A meta do tratamento no TP Esquizoide deveria ser, por padrão:", ["Sempre aumentar o número de interações sociais do paciente", "Construída junto com o paciente, sem presumir que \"mais socialização\" é sempre o objetivo", "Definida exclusivamente pela família que trouxe a demanda", "Idêntica à meta usada no TP Evitativo"]],
  ];
  const gabaritoObjetivas = ["b", "a", "b", "b", "a", "a", "b", "b", "b", "b"];

  const children = [
    ...doc.capa(KICKER, "Avaliação — TP Esquizoide", `Avaliação formativa de encerramento do Módulo ${MOD}.`),
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
    doc.vinhetaBox("Marcos, 29 anos, procura terapia por iniciativa própria, dizendo que \"talvez devesse se importar mais com relacionamentos\", mas admite que, na prática, não sente falta nenhuma disso — só acha que \"é isso que as pessoas fazem\". Trabalha bem, tem rotina estável, gosta de suas atividades solitárias. Não relata sofrimento em nenhuma área concreta da vida."),
    new doc.Paragraph({ spacing: { before: 240 }, children: [new doc.TextRun({ text: "Com base no protocolo estudado, responda:", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    new doc.Paragraph({ spacing: { before: 220, after: 40 }, children: [new doc.TextRun({ text: "a) (10 pts) A busca por terapia \"por iniciativa própria\" significa automaticamente que há sofrimento clínico genuíno? Justifique.", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "b) (10 pts) Que pergunta você faria a seguir pra esclarecer a origem da ideia de que \"deveria se importar mais\"?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "c) (10 pts) Descreva como você conduziria a psicoeducação respeitosa (passo 1) com Marcos.", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "d) (10 pts) Baseado na vinheta, existe indicação clara de seguir com expansão social gradual (passo 3)? Justifique.", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    new doc.Paragraph({ spacing: { after: 40 }, children: [new doc.TextRun({ text: "USO EXCLUSIVO DO INSTRUTOR — remover antes de aplicar a prova", bold: true, color: doc.TERRA, font: doc.FONT, size: 20 })] }),
    doc.tituloH1("Gabarito"),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 1 — Questões objetivas", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 200 }, children: [new doc.TextRun({ text: gabaritoObjetivas.map((r, i) => `${i + 1}-${r}`).join("   ·   "), font: doc.FONT, size: 22, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 2 — Critério de correção da questão de caso", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "a) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Não necessariamente — Marcos parece motivado por expectativa social internalizada (\"é isso que as pessoas fazem\"), não por sofrimento genuíno relatado.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "b) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Ex: \"De onde vem essa ideia de que você deveria se importar mais? É algo que você sente falta, ou é uma expectativa que você percebe vinda de fora?\"", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "c) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Espera-se uma resposta que não trate a preferência de Marcos como problema a ser corrigido, e que explore com curiosidade genuína o que, se algo, realmente traz prejuízo pra ele.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "d) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Não claramente — Marcos não relata sofrimento nem prejuízo funcional em nenhuma área. Expansão social só deveria ser meta se ele próprio a desejar, não porque \"deveria\".", font: doc.FONT, size: 21, color: doc.INK })] }),
  );

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-4.11-Avaliacao.docx");
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
      n: 1, titulo: "Por que o social não recompensa aqui", duracao: "12 min", slides: "1, 2, 3, 4",
      objetivo: "Sair sabendo explicar por que o TP Esquizoide não é sobre medo, é sobre desinteresse genuíno.",
      segmentos: [
        seg("0:00–0:45", "Abertura (gancho)", [{ fala: "No TP Esquizoide, o problema não é medo de proximidade — é a proximidade simplesmente não ativar a mesma recompensa que ativa na maioria das pessoas." }]),
        seg("0:45–2:00", "Por que isso importa clinicamente", ["Muda completamente o objetivo terapêutico — não é \"superar o medo\", é entender o que causa prejuízo real, se é que causa.", "Isso é o Passo 1 da anatomia de todo protocolo do curso: Mecanismo."]),
        seg("2:00–8:00", "Por que o social não recompensa da mesma forma (mostrar slide 4)", [
          "Núcleo accumbens com baixa resposta a recompensa social específica.",
          "Córtex pré-frontal processando um mundo interno rico, mas internamente.",
          "Amígdala com baixa reatividade emocional expressa.",
          "Sistema de apego com baixo drive de busca de proximidade desde cedo.",
        ]),
        seg("8:00–10:30", "Um ponto importante", ["Isso não é anedonia global nem timidez — é um drive de afiliação social baixo, específico, desde o desenvolvimento inicial."]),
        seg("10:30–12:00", "Fechamento", [{ fala: "Próxima aula: como esse padrão se consolida ao longo da vida." }]),
      ],
    },
    {
      n: 2, titulo: "Como o padrão se consolida", duracao: "10 min", slides: "5",
      objetivo: "Explicar a cadeia baixo drive–menos prática–isolamento consolidado.",
      segmentos: [
        seg("0:00–1:00", "Retomada rápida", ["Vimos as estruturas envolvidas. Hoje vemos como isso se torna um padrão de vida inteira."]),
        seg("1:00–6:30", "A cadeia (mostrar slide 5)", ["Baixo drive de afiliação desde cedo.", "Menos prática social ao longo do desenvolvimento.", "Isolamento vira o padrão de organização da vida.", "O isolamento raramente é sentido como perda — não há motivação interna pra mudar."]),
        seg("6:30–9:00", "Por que isso é crucial pro manejo", ["Motivação pra tratamento raramente vem do próprio paciente — geralmente vem de terceiros."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: os 3 traços centrais do TP Esquizoide." }]),
      ],
    },
    {
      n: 3, titulo: "Os 3 traços centrais", duracao: "10 min", slides: "6",
      objetivo: "Reconhecer desinteresse genuíno, restrição afetiva e preferência por solidão.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três traços — a palavra-chave de todos eles é \"desinteresse\", não \"medo\"."]),
        seg("1:00–7:00", "Os 3 traços (mostrar slide 6)", [
          "Desinteresse genuíno por relações próximas, incluindo familiares.",
          "Restrição afetiva — gama emocional reduzida na expressão, não necessariamente na experiência.",
          "Preferência por solidão — escolha ativa, não evitação por medo.",
        ]),
        seg("7:00–9:00", "Por que essa distinção importa", ["É exatamente essa diferença — desinteresse vs. medo — que separa TP Esquizoide de TP Evitativa."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: o que diferencia preferência de sofrimento clínico." }]),
      ],
    },
    {
      n: 4, titulo: "Sinais de alerta", duracao: "10 min", slides: "7",
      objetivo: "Diferenciar sinais que indicam padrão estável de sinais de sofrimento genuíno.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Aqui, \"sinal de alerta\" tem um significado um pouco diferente — não é sobre patologia, é sobre reconhecer o padrão com precisão."]),
        seg("1:00–7:30", "As 4 categorias (mostrar slide 7)", [
          "Cognitivo: introspecção intensa, mundo interno rico mas raramente compartilhado.",
          "Comportamental: evita mesmo relações que outros considerariam desejáveis.",
          "Relacional: poucas ou nenhuma relação próxima, incluindo família.",
          "Físico: expressão facial e corporal pouco reativa.",
        ]),
        seg("7:30–9:00", "Por que isso importa", ["Reconhecer o padrão com precisão evita tanto sub quanto super-patologização."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: como diferenciar TP Esquizoide de quadros parecidos." }]),
      ],
    },
    {
      n: 5, titulo: "Diagnóstico diferencial rápido", duracao: "12 min", slides: "8",
      objetivo: "Diferenciar TP Esquizoide de TEA, TP Evitativa e depressão.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Um filtro rápido — e a diferenciação com TEA merece atenção especial."]),
        seg("1:00–8:00", "Os 3 quadros (mostrar slide 8)", [
          "TEA: prejuízo de habilidade social; esquizoide tem habilidade, mas não motivação.",
          "TP Evitativa: evita por medo de rejeição; esquizoide não tem desejo de proximidade pra começo.",
          "Depressão: episódica e recente; esquizoide é padrão estável de vida inteira.",
        ]),
        seg("8:00–10:30", "Por que a diferenciação com TEA importa tanto", ["Muda completamente a abordagem — TEA pede trabalho de habilidades sociais; esquizoide, não, salvo se o próprio paciente desejar."]),
        seg("10:30–12:00", "Fechamento", [{ fala: "Próxima aula: os instrumentos que ajudam a confirmar essa leitura." }]),
      ],
    },
    {
      n: 6, titulo: "Os 3 instrumentos de avaliação", duracao: "12 min", slides: "9",
      objetivo: "Saber quando usar PID-5, SCID-5-PD e Escala de Solidão.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três instrumentos, três finalidades diferentes."]),
        seg("1:00–4:30", "PID-5", ["Mapeia o traço de desapego social de forma dimensional."]),
        seg("4:30–7:30", "SCID-5-PD", ["Entrevista estruturada.", "Padrão-ouro pra confirmar diagnóstico categorial formal."]),
        seg("7:30–10:00", "Escala de Solidão (UCLA)", ["Diferencia isolamento egossintônico (sem sofrimento) de isolamento sofrido.", "Instrumento-chave pra decidir se há indicação real de tratamento."]),
        seg("10:00–12:00", "Como escolher na prática", ["Escala de Solidão primeiro — decide se há sofrimento; PID-5 e SCID-5-PD confirmam o traço/diagnóstico.", { fala: "Próxima aula: colocamos tudo em prática — psicoeducação respeitosa e avaliação de motivação." }]),
      ],
    },
    {
      n: 7, titulo: "Manejo — psicoeducação e avaliação de motivação", duracao: "14 min", slides: "10, 11",
      objetivo: "Aplicar os passos 1 e 2 do manejo, incluindo como avaliar se há sofrimento clínico genuíno.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["A parte que você vai usar já na primeira sessão com esse perfil. Hoje, os 2 primeiros passos."]),
        seg("1:00–2:00", "Visão geral (mostrar slide 10)", ["Psicoeducação respeitosa → Avaliar motivação → Expansão gradual → Foco em funcionamento.", "Diferente dos outros módulos, aqui o objetivo não é presumido."]),
        seg("2:00–7:00", "Passo 1 — Psicoeducação respeitosa (mostrar slide 11, esquerda)", [{ fala: "Prefiro entender o que te trouxe aqui hoje do que presumir que solidão é, por si só, um problema a resolver." }]),
        seg("7:00–13:00", "Passo 2 — Avaliar motivação real (mostrar slide 11, direita)", ["Pergunte quem trouxe a demanda — o próprio paciente ou terceiros?", "Se não há sofrimento nem prejuízo funcional, considere não patologizar."]),
        seg("13:00–14:00", "Fechamento", [{ fala: "Próxima aula: expansão gradual e foco em funcionamento, quando indicados." }]),
      ],
    },
    {
      n: 8, titulo: "Manejo — expansão gradual e foco em funcionamento", duracao: "14 min", slides: "12",
      objetivo: "Trabalhar metas definidas pelo próprio paciente, priorizando funcionamento sobre socialização.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Hoje fechamos o manejo — só quando ele for de fato indicado."]),
        seg("1:00–7:00", "Passo 3 — Expansão gradual (mostrar slide 12, esquerda)", ["Trabalhe apenas metas que o próprio paciente define como importantes.", "Vá no ritmo dele — pressa aqui costuma gerar desistência."]),
        seg("7:00–13:00", "Passo 4 — Foco em funcionamento (mostrar slide 12, direita)", ["Priorize trabalho, autonomia, saúde física.", "\"Socializar mais\" não deveria ser meta padrão — só se o paciente quiser."]),
        seg("13:00–14:00", "Fechamento", [{ fala: "Manejo completo. Próxima aula: um caso real e os critérios de quando encaminhar." }]),
      ],
    },
    {
      n: 9, titulo: "Estudo de caso, encaminhamento e recap", duracao: "15 min", slides: "13, 14, 15",
      objetivo: "Integrar mecanismo, instrumento e manejo num caso completo, com ênfase em não presumir patologia.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Última aula do módulo. Caso completo e os limites de quando este manejo não é suficiente."]),
        seg("1:00–7:00", "Estudo de caso — Fernando (mostrar slide 13)", ["Leia a vinheta com calma.", "Percorra as 3 perguntas de discussão.", "Convide o aluno a pausar e responder por escrito."]),
        seg("7:00–11:00", "Quando encaminhar (mostrar slide 14)", ["Percorra os 4 critérios — ênfase na investigação de TEA quando há prejuízo de habilidade, não só de motivação."]),
        seg("11:00–14:00", "Recapitulando o módulo (mostrar slide 15)", ["Retome os 4 pontos-chave.", "Reforce: aqui, a meta do tratamento é construída com o paciente, nunca presumida."]),
        seg("14:00–15:00", "Fechamento do módulo", [{ fala: "Agora é hora dos exercícios e da avaliação. Te vejo no próximo transtorno de personalidade." }]),
      ],
    },
  ];

  const totalMin = 12 + 10 + 10 + 10 + 12 + 12 + 14 + 14 + 15;

  const children = [
    ...doc.capa(KICKER, "Roteiro de Aulas — TP Esquizoide", "Módulo dividido em 9 vídeo-aulas de 10 a 15 minutos, seguindo os slides já produzidos. Cada aula tem roteiro cronometrado, pronto pra gravação."),
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

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", `${RODAPE_DOC} — Roteiro de Aulas`, children), "Modulo-4.11-Roteiro-Aulas.docx");
}

// ============================================================
Promise.resolve()
  .then(construirDeck)
  .then(construirExercicios)
  .then(construirProva)
  .then(construirRoteiro)
  .then(() => console.log("TUDO PRONTO"))
  .catch((e) => { console.error(e); process.exit(1); });

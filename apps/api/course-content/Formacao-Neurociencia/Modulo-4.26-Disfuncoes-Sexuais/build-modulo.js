const deck = require("../_lib/lib-deck.js");
const doc = require("../_lib/lib-doc.js");

const MOD = "4.26";
const NOME = "Disfunções Sexuais";
const RODAPE_DECK = `Disfunções Sexuais — Módulo ${MOD}`;
const RODAPE_DOC = `Módulo ${MOD} — Disfunções Sexuais`;
const KICKER = "MÓDULO 4.26 · PROTOCOLOS CLÍNICOS";

// ============================================================
// 1) SLIDE DECK
// ============================================================
function construirDeck() {
  const pres = deck.novaApresentacao(`${NOME} — Da Neurociência ao Protocolo Clínico`);

  deck.slideTitulo(pres, {
    moduloLabel: `Módulo ${MOD} · Protocolos Clínicos`,
    titulo: "Disfunções Sexuais",
    subtitulo: "O equilíbrio entre acelerador e freio",
    passos: ["Mecanismo", "Sinais", "Instrumento", "Protocolo", "Encaminhamento"],
  });

  deck.slideRoteiro(pres, {
    rodape: RODAPE_DECK, pageNum: 2,
    cards: [
      { titulo: "Mecanismo", desc: "Por que ansiedade é o freio mais comum da resposta sexual" },
      { titulo: "Sinais", desc: "Da espectatoria à evitação da intimidade" },
      { titulo: "Instrumento", desc: "FSFI, IIEF e a avaliação médica sempre em paralelo" },
      { titulo: "Protocolo", desc: "4 passos, sempre começando pelo descarte orgânico" },
      { titulo: "Encaminhamento", desc: "Quando o sintoma é do casal, não só do indivíduo" },
    ],
  });

  deck.slideHook(pres, {
    rodape: RODAPE_DECK, pageNum: 3,
    frase: "A resposta sexual depende de um equilíbrio entre um sistema acelerador e um sistema de freio — e na prática clínica, a grande maioria das disfunções sexuais vem do freio pisado fundo, não da falta de acelerador.",
    apoio: "Esse modelo, conhecido como Dual Control Model, muda completamente a pergunta clínica: em vez de \"por que não excita\", a pergunta certa costuma ser \"o que está inibindo\".",
  });

  deck.slideCircuito(pres, {
    rodape: RODAPE_DECK, pageNum: 4,
    titulo: "O equilíbrio entre o acelerador e o freio",
    regioes: [
      { label: "Sistema excitatório (SES, o \"acelerador\" da resposta sexual)", rx: 0.20, ry: 0.22, color: deck.TERRA, d: 0.5 },
      { label: "Sistema inibitório (SIS, o \"freio\", hiperativado por ansiedade/estresse)", rx: 0.22, ry: 0.62, color: deck.NAVY, d: 0.4 },
      { label: "Córtex pré-frontal (espectatoria: automonitoramento que interrompe a excitação)", rx: 0.60, ry: 0.60, color: deck.NAVY_TINT, d: 0.36 },
      { label: "Sistema dopaminérgico (desejo e motivação, reduzido por estresse crônico)", rx: 0.58, ry: 0.24, color: deck.TERRA_TINT, d: 0.36 },
    ],
    notas: [
      "O sistema excitatório (acelerador) responde a estímulos sexuais relevantes, gerando excitação.",
      "O sistema inibitório (freio) é ativado por ansiedade, estresse, medo de falha ou distração — e em muitos casos clínicos, está hiperativado.",
      "A espectatoria — se observar e avaliar durante o ato sexual — interrompe o processamento natural da excitação, sendo um dos principais mantenedores da disfunção.",
    ],
  });

  deck.slideCadeia(pres, {
    rodape: RODAPE_DECK, pageNum: 5,
    titulo: "Do desequilíbrio inicial ao ciclo de ansiedade",
    elos: [
      { titulo: "Fator inicial de inibição", desc: "Estresse, ansiedade, fadiga ou fator médico/hormonal específico" },
      { titulo: "Episódio de disfunção", desc: "Dificuldade pontual de excitação, ereção, orgasmo ou presença de dor" },
      { titulo: "Espectatoria", desc: "Automonitoramento ansioso passa a interromper a excitação nas vezes seguintes" },
      { titulo: "Ciclo consolidado", desc: "Ansiedade antecipatória sobre o próprio desempenho mantém o padrão ativo" },
    ],
    notaFinal: "Um episódio isolado de disfunção é extremamente comum e não configura transtorno — o problema surge quando a ansiedade sobre repetir o episódio se torna o novo fator de manutenção.",
  });

  deck.slideCategorias(pres, {
    rodape: RODAPE_DECK, pageNum: 6,
    titulo: "3 traços centrais",
    categorias: [
      { titulo: "Desequilíbrio excitação-inibição", desc: "O freio (ansiedade, estresse) sobrepõe o acelerador da resposta sexual", color: deck.NAVY },
      { titulo: "Ansiedade de desempenho", desc: "Espectatoria: monitoramento excessivo de si mesmo durante o ato", color: deck.TERRA },
      { titulo: "Fatores relacionais mantenedores", desc: "Comunicação insuficiente sobre desejos e limites no casal", color: deck.NAVY_TINT },
    ],
    notaFinal: "Os 3 traços raramente atuam isolados — geralmente um desequilíbrio inicial gera ansiedade de desempenho, que por sua vez tensiona a comunicação no casal.",
  });

  deck.slideSinais(pres, {
    rodape: RODAPE_DECK, pageNum: 7,
    titulo: "Como reconhecer o padrão na prática",
    itens: [
      { titulo: "Cognitivo", desc: "Pensamentos de autoavaliação durante o sexo, crenças rígidas sobre \"desempenho normal\"" },
      { titulo: "Comportamental", desc: "Evitação de intimidade, redução da frequência de iniciativa sexual" },
      { titulo: "Relacional", desc: "Comunicação insuficiente sobre desejos/limites, conflito conjugal associado" },
      { titulo: "Físico", desc: "Sintoma específico conforme o tipo — sempre exigindo descarte médico primeiro" },
    ],
  });

  deck.slideDiferencial(pres, {
    rodape: RODAPE_DECK, pageNum: 8,
    titulo: "Diagnóstico diferencial rápido",
    cards: [
      { titulo: "Causa orgânica/médica", desc: "Hormonal, vascular, neurológica ou medicamentosa — deve sempre ser descartada primeiro" },
      { titulo: "Depressão (Módulo 4.2)", desc: "Diminuição do desejo sexual é sintoma comum de depressão, não necessariamente disfunção primária" },
      { titulo: "Conflito conjugal (Módulo 4.4)", desc: "A disfunção pode ser sintoma de um problema relacional mais amplo, não causa isolada" },
    ],
  });

  deck.slideInstrumentos(pres, {
    rodape: RODAPE_DECK, pageNum: 9,
    titulo: "Instrumentos e avaliação médica complementar",
    instrumentos: [
      { sigla: "FSFI", nome: "Female Sexual Function Index", desc: "Avalia função sexual feminina em múltiplos domínios." },
      { sigla: "IIEF", nome: "International Index of Erectile Function", desc: "Avalia função erétil e domínios relacionados no homem." },
      { sigla: "Avaliação médica", nome: "Hormonal, vascular, urológica/ginecológica", desc: "Sempre necessária em paralelo, nunca opcional." },
    ],
  });

  deck.slideProtocoloOverview(pres, {
    rodape: RODAPE_DECK, pageNum: 10,
    titulo: "Do mecanismo ao protocolo: 4 passos",
    passos: [
      { titulo: "Descartar\ncausa orgânica", desc: "Sempre o primeiro passo, em parceria médica" },
      { titulo: "Psicoeducação\ndo modelo", desc: "Explicar o equilíbrio acelerador-freio e desmistificar expectativas" },
      { titulo: "Reduzir a\nespectatoria", desc: "Técnicas como o sensate focus, de Masters e Johnson" },
      { titulo: "Comunicação\nno casal", desc: "Trabalhar diálogo sobre desejos e limites, quando aplicável" },
    ],
    notaFinal: "Assim como nos transtornos alimentares, essa ordem não é negociável — avançar pro trabalho psicológico sem descartar causa orgânica é um erro técnico comum.",
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 11,
    titulo: "Passos 1 e 2, na prática",
    colunas: [
      {
        numero: 1, titulo: "Descartar causa orgânica",
        bullets: ["Encaminhe pra avaliação médica/hormonal antes de aprofundar a intervenção psicológica", "Nunca assuma causa exclusivamente psicológica sem essa etapa"],
      },
      {
        numero: 2, titulo: "Psicoeducação do modelo",
        fala: "“Não é que falte desejo — é que o freio está mais ativado do que o acelerador agora. Isso muda, e dá pra trabalhar.”",
        bullets: ["Explique o Dual Control Model de forma acessível", "Desmistifique expectativas irreais sobre \"desempenho normal\", frequentemente vindas da pornografia ou de comparações sociais"],
      },
    ],
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 12,
    titulo: "Passos 3 e 4, na prática",
    colunas: [
      {
        numero: 3, titulo: "Reduzir a espectatoria",
        bullets: ["Use o sensate focus: toque sensorial gradual, sem objetivo de desempenho, pra reduzir o automonitoramento", "Remova temporariamente a pressão pelo ato completo, focando na experiência sensorial em si"],
      },
      {
        numero: 4, titulo: "Comunicação no casal",
        bullets: ["Trabalhe diálogo aberto sobre desejos, limites e expectativas, quando houver parceiro envolvido", "Encaminhe pra terapia de casal (Módulo 4.4) quando o componente relacional for central"],
      },
    ],
  });

  deck.slideCaso(pres, {
    rodape: RODAPE_DECK, pageNum: 13,
    vinheta: "Rodrigo, 38 anos, relata dificuldade recorrente de manter ereção há 8 meses, desde um episódio isolado após uma noite de muito estresse no trabalho. Desde então, relata \"ficar se observando\" durante o sexo, com medo de que \"aconteça de novo\", o que parece piorar ainda mais a situação. Já evitou algumas oportunidades de intimidade por antecipação da ansiedade. Nunca fez avaliação médica sobre o assunto.",
    perguntas: [
      "Que elementos da vinheta ilustram os 3 traços centrais das disfunções sexuais?",
      "Por que a avaliação médica é o passo obrigatório antes de qualquer intervenção psicológica com Rodrigo?",
      "Como você explicaria o conceito de espectatoria pra Rodrigo, de forma acessível?",
    ],
  });

  deck.slideEncaminhamento(pres, {
    rodape: RODAPE_DECK, pageNum: 14,
    criterios: [
      "Avaliação médica/urológica/ginecológica sempre em paralelo, nunca como etapa opcional",
      "Terapia sexual especializada quando indicado, além do protocolo psicoterapêutico geral",
      "Terapia de casal (Módulo 4.4) quando o componente relacional for o fator central de manutenção",
      "Descartar Depressão (Módulo 4.2) como causa primária da queixa, especialmente diante de diminuição global do desejo",
    ],
  });

  deck.slideRecap(pres, {
    rodape: RODAPE_DECK, pageNum: 15,
    pontos: [
      "O Dual Control Model explica a resposta sexual como equilíbrio entre um sistema excitatório e um sistema inibitório — o freio, não a falta de acelerador, costuma ser o problema",
      "Desequilíbrio excitação-inibição, ansiedade de desempenho e fatores relacionais são os 3 traços centrais",
      "FSFI, IIEF e avaliação médica complementar estruturam a avaliação, sempre em paralelo",
      "O protocolo começa pelo descarte de causa orgânica — essa ordem não é negociável, assim como nos transtornos alimentares",
    ],
    proximoTexto: "Próximo: exercícios práticos e avaliação do Módulo 4.26 →",
  });

  return pres.writeFile({ fileName: "Modulo-4.26-Disfuncoes-Sexuais.pptx" });
}

// ============================================================
// 2) EXERCÍCIOS
// ============================================================
function construirExercicios() {
  const children = [
    ...doc.capa(KICKER, "Exercícios — Disfunções Sexuais", "Resolva individualmente antes da sessão de supervisão. O objetivo é testar sua leitura do mecanismo e do protocolo antes de comparar com a discussão em grupo — não há problema em errar."),

    doc.exNum(1, "O mecanismo, em suas palavras"),
    doc.pergunta(1, "Explique em até 3 frases, sem jargão técnico, o Dual Control Model (sistema acelerador e sistema de freio)."),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "O que é espectatoria, e por que ela mantém o ciclo da disfunção sexual ativo?"),
    ...doc.linhaResposta(2),

    doc.exNum(2, "Diagnóstico diferencial"),
    doc.vinhetaBox("Um paciente relata diminuição do desejo sexual, mas também apresenta anedonia generalizada, humor deprimido persistente e fadiga há 2 meses."),
    doc.pergunta(1, "Disfunção sexual primária ou sintoma de Depressão (Módulo 4.2)? Justifique."),
    ...doc.linhaResposta(2),

    doc.exNum(3, "Ordem do protocolo"),
    doc.p("Explique por que o passo 1 (descartar causa orgânica) precisa vir sempre antes do passo 3 (reduzir a espectatoria)."),
    ...doc.linhaResposta(3),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),

    doc.exNum(4, "Sensate focus"),
    doc.pergunta(1, "Explique, em linguagem acessível pro paciente, o que é e pra que serve o sensate focus."),
    ...doc.linhaResposta(3),

    doc.exNum(5, "Caso integrado — Rodrigo"),
    doc.vinhetaBox("Rodrigo, 38 anos, dificuldade recorrente de manter ereção há 8 meses, desde episódio isolado após estresse no trabalho. Relata \"ficar se observando\" durante o sexo, evita oportunidades de intimidade, nunca fez avaliação médica."),
    doc.pergunta(1, "Identifique os 3 traços centrais presentes na vinheta."),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Por que a avaliação médica é obrigatória antes de qualquer intervenção psicológica com Rodrigo?"),
    ...doc.linhaResposta(2),
    doc.pergunta(3, "Como você explicaria o conceito de espectatoria pra Rodrigo?"),
    ...doc.linhaResposta(2),
  ];

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-4.26-Exercicios.docx");
}

// ============================================================
// 3) AVALIAÇÃO
// ============================================================
function construirProva() {
  const objetivas = [
    ["O Dual Control Model explica a resposta sexual como:", ["Equilíbrio entre um sistema excitatório e um sistema inibitório", "Um processo exclusivamente hormonal, sem componente psicológico", "Um reflexo automático sem qualquer regulação cortical", "Um processo idêntico entre todas as pessoas, sem variação individual"]],
    ["Na maioria dos casos clínicos, a disfunção sexual está associada a:", ["Hiperativação do sistema inibitório (freio), mais do que falta de excitação", "Ausência completa de qualquer sistema excitatório", "Fatores exclusivamente genéticos, sem influência situacional", "Uma única causa universal, igual em todos os casos"]],
    ["Os 3 traços centrais das disfunções sexuais são:", ["Desequilíbrio excitação-inibição, ansiedade de desempenho, fatores relacionais mantenedores", "Grandiosidade, necessidade de admiração, falta de empatia", "Crises recorrentes e inesperadas, medo de sensações corporais, esquiva fóbica", "Restrição/controle, distorção da imagem corporal, comportamento compensatório"]],
    ["\"Espectatoria\" se refere a:", ["Automonitoramento ansioso que interrompe o processamento natural da excitação", "Uma técnica terapêutica específica de tratamento", "Um sintoma exclusivamente físico, sem componente cognitivo", "A presença de espectadores durante o ato sexual"]],
    ["Instrumento que avalia função sexual feminina em múltiplos domínios:", ["FSFI (Female Sexual Function Index)", "PCL-R", "Y-BOCS", "PDSS"]],
    ["Antes de qualquer intervenção psicológica profunda, o protocolo recomenda:", ["Descartar causa orgânica através de avaliação médica", "Iniciar sensate focus imediatamente, sem qualquer avaliação prévia", "Presumir causa exclusivamente psicológica em todos os casos", "Ignorar qualquer sintoma físico relatado"]],
    ["O \"sensate focus\", técnica de Masters e Johnson, tem como objetivo:", ["Reduzir a pressão pelo desempenho, focando na experiência sensorial gradual", "Aumentar a pressão por desempenho completo desde a primeira sessão", "Eliminar completamente qualquer contato físico entre o casal", "Substituir a necessidade de avaliação médica"]],
    ["Diante de diminuição do desejo sexual associada a anedonia generalizada e humor deprimido, o módulo recomenda:", ["Investigar Depressão (Módulo 4.2) como possível causa primária", "Tratar exclusivamente como disfunção sexual isolada, ignorando o humor", "Ignorar completamente os sintomas depressivos relatados", "Encaminhar apenas para avaliação hormonal, sem qualquer outra investigação"]],
    ["Quando o componente relacional é o fator central de manutenção da disfunção, o módulo recomenda:", ["Encaminhamento pra terapia de casal (Módulo 4.4)", "Tratar exclusivamente o indivíduo, ignorando a dinâmica do casal", "Encerrar o protocolo imediatamente", "Focar exclusivamente em aspectos médicos, sem qualquer intervenção relacional"]],
    ["Um episódio isolado de disfunção sexual, sem repetição:", ["É extremamente comum e não configura transtorno por si só", "Sempre indica um transtorno sexual estabelecido", "Exige interrupção completa da vida sexual", "Deve ser tratado com o mesmo protocolo de um caso crônico"]],
  ];
  const gabaritoObjetivas = ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a"];

  const children = [
    ...doc.capa(KICKER, "Avaliação — Disfunções Sexuais", `Avaliação formativa de encerramento do Módulo ${MOD}.`),
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
    doc.vinhetaBox("Camila e Diego, casados há 6 anos, procuram terapia porque Camila relata dor recorrente durante a relação sexual há cerca de um ano, o que fez o casal reduzir drasticamente a frequência de intimidade. Camila nunca foi a um ginecologista sobre o assunto, e ambos relatam que a comunicação sobre o tema \"sempre foi difícil\", mesmo antes do problema começar."),
    new doc.Paragraph({ spacing: { before: 240 }, children: [new doc.TextRun({ text: "Com base no protocolo estudado, responda:", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    new doc.Paragraph({ spacing: { before: 220, after: 40 }, children: [new doc.TextRun({ text: "a) (10 pts) Qual deveria ser o primeiro passo do protocolo com Camila, e por quê?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "b) (10 pts) Que elemento da vinheta sugere um fator relacional mantenedor, além do sintoma físico?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "c) (10 pts) Que instrumento você usaria pra avaliar a função sexual de Camila de forma estruturada?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "d) (10 pts) Considerando que a dificuldade de comunicação já existia antes do problema físico, que encaminhamento complementar você consideraria?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    new doc.Paragraph({ spacing: { after: 40 }, children: [new doc.TextRun({ text: "USO EXCLUSIVO DO INSTRUTOR — remover antes de aplicar a prova", bold: true, color: doc.TERRA, font: doc.FONT, size: 20 })] }),
    doc.tituloH1("Gabarito"),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 1 — Questões objetivas", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 200 }, children: [new doc.TextRun({ text: gabaritoObjetivas.map((r, i) => `${i + 1}-${r}`).join("   ·   "), font: doc.FONT, size: 22, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 2 — Critério de correção da questão de caso", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "a) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Avaliação médica/ginecológica, dado que ela nunca investigou a dor recorrente — é essencial descartar causa orgânica (ex: vaginismo, endometriose, infecção) antes de qualquer intervenção psicológica profunda.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "b) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "A comunicação sobre o tema \"sempre foi difícil\", mesmo antes do problema começar — sugerindo um padrão relacional preexistente que provavelmente contribui pra manutenção do quadro.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "c) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "FSFI (Female Sexual Function Index), que avalia função sexual feminina em múltiplos domínios, incluindo dor.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "d) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Terapia de casal (Módulo 4.4), já que a dificuldade de comunicação preexistente sugere um componente relacional central, não apenas um sintoma físico isolado.", font: doc.FONT, size: 21, color: doc.INK })] }),
  );

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-4.26-Avaliacao.docx");
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
      n: 1, titulo: "O equilíbrio entre acelerador e freio", duracao: "12 min", slides: "1, 2, 3, 4",
      objetivo: "Sair sabendo explicar o Dual Control Model sem jargão, e por que a pergunta certa é sobre o freio, não o acelerador.",
      segmentos: [
        seg("0:00–0:45", "Abertura (gancho)", [{ fala: "A resposta sexual depende de um equilíbrio entre um sistema acelerador e um sistema de freio — e na prática clínica, a grande maioria das disfunções sexuais vem do freio pisado fundo, não da falta de acelerador." }]),
        seg("0:45–2:00", "Por que essa reformulação importa", ["Muda a pergunta clínica de \"por que não excita\" pra \"o que está inibindo\"."]),
        seg("2:00–8:00", "O equilíbrio acelerador-freio (mostrar slide 4)", [
          "Sistema excitatório (SES), o acelerador da resposta sexual.",
          "Sistema inibitório (SIS), o freio, hiperativado por ansiedade/estresse.",
          "Espectatoria: automonitoramento que interrompe a excitação.",
          "Sistema dopaminérgico de desejo, reduzido por estresse crônico.",
        ]),
        seg("8:00–10:30", "Um ponto importante", ["Na maioria dos casos clínicos, o problema é o freio ativado demais, não a ausência de desejo."]),
        seg("10:30–12:00", "Fechamento", [{ fala: "Próxima aula: como um episódio isolado vira um ciclo de ansiedade." }]),
      ],
    },
    {
      n: 2, titulo: "Do desequilíbrio inicial ao ciclo de ansiedade", duracao: "10 min", slides: "5",
      objetivo: "Explicar a cadeia entre fator inicial, episódio de disfunção e ciclo consolidado.",
      segmentos: [
        seg("0:00–1:00", "Retomada rápida", ["Vimos as estruturas envolvidas. Hoje vemos como um episódio isolado vira um padrão persistente."]),
        seg("1:00–6:30", "A cadeia (mostrar slide 5)", ["Fator inicial de inibição: estresse, ansiedade, fadiga ou fator médico.", "Episódio de disfunção: dificuldade pontual.", "Espectatoria: automonitoramento ansioso nas vezes seguintes.", "Ciclo consolidado: ansiedade antecipatória sobre o próprio desempenho."]),
        seg("6:30–9:00", "Um ponto importante", ["Um episódio isolado é extremamente comum e não configura transtorno — o problema é a ansiedade sobre repetir."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: os 3 traços centrais das disfunções sexuais." }]),
      ],
    },
    {
      n: 3, titulo: "Os 3 traços centrais", duracao: "10 min", slides: "6",
      objetivo: "Reconhecer desequilíbrio excitação-inibição, ansiedade de desempenho e fatores relacionais.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três traços — que raramente atuam isolados."]),
        seg("1:00–7:00", "Os 3 traços (mostrar slide 6)", [
          "Desequilíbrio excitação-inibição: o freio sobrepõe o acelerador.",
          "Ansiedade de desempenho: espectatoria, monitoramento excessivo de si mesmo.",
          "Fatores relacionais mantenedores: comunicação insuficiente sobre desejos e limites.",
        ]),
        seg("7:00–9:00", "Como eles se conectam", ["Um desequilíbrio inicial gera ansiedade de desempenho, que tensiona a comunicação no casal."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: como reconhecer esse padrão nas 4 dimensões clínicas." }]),
      ],
    },
    {
      n: 4, titulo: "Sinais de alerta", duracao: "10 min", slides: "7",
      objetivo: "Reconhecer sinais cognitivos, comportamentais, relacionais e físicos das disfunções sexuais.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Reconhecer o padrão com precisão orienta a decisão mais importante: quando priorizar avaliação médica."]),
        seg("1:00–7:30", "As 4 categorias (mostrar slide 7)", [
          "Cognitivo: pensamentos de autoavaliação, crenças rígidas sobre desempenho.",
          "Comportamental: evitação de intimidade, redução da iniciativa sexual.",
          "Relacional: comunicação insuficiente, conflito conjugal associado.",
          "Físico: sintoma específico, sempre exigindo descarte médico primeiro.",
        ]),
        seg("7:30–9:00", "Por que isso importa", ["O sinal físico, em especial, nunca deve ser assumido como psicológico sem investigação."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: como diferenciar de quadros parecidos." }]),
      ],
    },
    {
      n: 5, titulo: "Diagnóstico diferencial rápido", duracao: "11 min", slides: "8",
      objetivo: "Diferenciar disfunção sexual primária de causa orgânica, depressão e conflito conjugal.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Um filtro rápido — descartar causa orgânica é sempre o primeiro passo, não uma opção."]),
        seg("1:00–8:00", "Os 3 comparativos (mostrar slide 8)", [
          "Causa orgânica/médica: hormonal, vascular, neurológica — sempre descartar primeiro.",
          "Depressão (Módulo 4.2): diminuição do desejo pode ser sintoma depressivo, não disfunção primária.",
          "Conflito conjugal (Módulo 4.4): a disfunção pode ser sintoma de um problema relacional mais amplo.",
        ]),
        seg("8:00–10:30", "Por que a ordem importa", ["Presumir causa psicológica sem descartar causa médica é um erro técnico comum."]),
        seg("10:30–11:00", "Fechamento", [{ fala: "Próxima aula: os instrumentos que confirmam essa leitura com dado." }]),
      ],
    },
    {
      n: 6, titulo: "Instrumentos e avaliação médica complementar", duracao: "10 min", slides: "9",
      objetivo: "Saber quando usar FSFI, IIEF e avaliação médica.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Dois instrumentos e uma avaliação médica sempre em paralelo, nunca opcional."]),
        seg("1:00–4:30", "FSFI", ["Avalia função sexual feminina em múltiplos domínios."]),
        seg("4:30–7:30", "IIEF", ["Avalia função erétil e domínios relacionados no homem."]),
        seg("7:30–9:00", "Avaliação médica", ["Hormonal, vascular, urológica/ginecológica — sempre necessária em paralelo."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: colocamos tudo em prática — descarte orgânico e psicoeducação." }]),
      ],
    },
    {
      n: 7, titulo: "Protocolo — descarte orgânico e psicoeducação", duracao: "13 min", slides: "10, 11",
      objetivo: "Aplicar os passos 1 e 2 do protocolo, sempre em parceria médica.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["A parte estruturalmente mais importante desse módulo. Hoje, os 2 primeiros passos."]),
        seg("1:00–2:00", "Visão geral (mostrar slide 10)", ["Descartar causa orgânica → Psicoeducação do modelo → Reduzir a espectatoria → Comunicação no casal.", "Essa ordem não é negociável."]),
        seg("2:00–7:00", "Passo 1 — Descartar causa orgânica (mostrar slide 11, esquerda)", ["Encaminhe pra avaliação médica/hormonal antes de aprofundar a intervenção psicológica.", "Nunca assuma causa exclusivamente psicológica sem essa etapa."]),
        seg("7:00–12:00", "Passo 2 — Psicoeducação do modelo (mostrar slide 11, direita)", [{ fala: "Não é que falte desejo — é que o freio está mais ativado do que o acelerador agora. Isso muda, e dá pra trabalhar." }]),
        seg("12:00–13:00", "Fechamento", [{ fala: "Próxima aula: reduzir a espectatoria e comunicação no casal." }]),
      ],
    },
    {
      n: 8, titulo: "Protocolo — reduzir a espectatoria e comunicação no casal", duracao: "13 min", slides: "12",
      objetivo: "Trabalhar sensate focus e diálogo sobre desejos e limites.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Hoje fechamos o protocolo com o trabalho prático e relacional."]),
        seg("1:00–7:00", "Passo 3 — Reduzir a espectatoria (mostrar slide 12, esquerda)", ["Use o sensate focus: toque sensorial gradual, sem objetivo de desempenho.", "Remova temporariamente a pressão pelo ato completo."]),
        seg("7:00–13:00", "Passo 4 — Comunicação no casal (mostrar slide 12, direita)", ["Trabalhe diálogo aberto sobre desejos, limites e expectativas.", "Encaminhe pra terapia de casal quando o componente relacional for central."]),
        seg("13:00–13:00", "Fechamento", [{ fala: "Protocolo completo. Próxima aula: um caso real e os critérios de quando escalar." }]),
      ],
    },
    {
      n: 9, titulo: "Estudo de caso, encaminhamento e recap", duracao: "15 min", slides: "13, 14, 15",
      objetivo: "Integrar mecanismo, instrumento e protocolo num caso completo, com ênfase na avaliação médica obrigatória.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Última aula do módulo. Caso completo e os critérios de quando aprofundar ou referenciar."]),
        seg("1:00–7:00", "Estudo de caso — Rodrigo (mostrar slide 13)", ["Leia a vinheta com calma.", "Percorra as 3 perguntas de discussão.", "Convide o aluno a pausar e responder por escrito."]),
        seg("7:00–11:00", "Quando encaminhar (mostrar slide 14)", ["Percorra os 4 critérios — reforce que avaliação médica nunca é opcional aqui."]),
        seg("11:00–14:00", "Recapitulando o módulo (mostrar slide 15)", ["Retome os 4 pontos-chave.", "Reforce a reformulação central: o freio, não a falta de acelerador, costuma ser o problema."]),
        seg("14:00–15:00", "Fechamento do módulo", [{ fala: "Agora é hora dos exercícios e da avaliação. Te vejo no próximo protocolo." }]),
      ],
    },
  ];

  const totalMin = 12 + 10 + 10 + 10 + 11 + 10 + 13 + 13 + 15;

  const children = [
    ...doc.capa(KICKER, "Roteiro de Aulas — Disfunções Sexuais", "Módulo dividido em 9 vídeo-aulas de 10 a 15 minutos, seguindo os slides já produzidos. Cada aula tem roteiro cronometrado, pronto pra gravação."),
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

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", `${RODAPE_DOC} — Roteiro de Aulas`, children), "Modulo-4.26-Roteiro-Aulas.docx");
}

// ============================================================
Promise.resolve()
  .then(construirDeck)
  .then(construirExercicios)
  .then(construirProva)
  .then(construirRoteiro)
  .then(() => console.log("TUDO PRONTO"))
  .catch((e) => { console.error(e); process.exit(1); });

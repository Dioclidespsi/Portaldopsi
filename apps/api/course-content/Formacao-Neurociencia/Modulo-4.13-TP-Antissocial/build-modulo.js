const deck = require("../_lib/lib-deck.js");
const doc = require("../_lib/lib-doc.js");

const MOD = "4.13";
const NOME = "Transtorno de Personalidade Antissocial";
const RODAPE_DECK = `TP Antissocial — Módulo ${MOD}`;
const RODAPE_DOC = `Módulo ${MOD} — TP Antissocial`;
const KICKER = "MÓDULO 4.13 · TRANSTORNOS DE PERSONALIDADE · CLUSTER B";

// ============================================================
// 1) SLIDE DECK
// ============================================================
function construirDeck() {
  const pres = deck.novaApresentacao(`${NOME} — Da Neurociência ao Manejo de Risco`);

  deck.slideTitulo(pres, {
    moduloLabel: `Módulo ${MOD} · Cluster B · Transtornos de Personalidade`,
    titulo: "TP Antissocial",
    subtitulo: "Avaliação de risco, limites claros e trabalho em rede",
    passos: ["Mecanismo", "Sinais", "Instrumento", "Manejo", "Encaminhamento"],
  });

  deck.slideRoteiro(pres, {
    rodape: RODAPE_DECK, pageNum: 2,
    cards: [
      { titulo: "Mecanismo", desc: "Por que punição não inibe o comportamento aqui" },
      { titulo: "Sinais", desc: "O que diferencia de outros perfis do Cluster B" },
      { titulo: "Instrumento", desc: "PCL-R, PID-5 e SCID-5-PD na prática" },
      { titulo: "Manejo", desc: "4 passos, com ênfase em risco e contingência" },
      { titulo: "Encaminhamento", desc: "Aqui, rede multiprofissional é regra" },
    ],
  });

  deck.slideHook(pres, {
    rodape: RODAPE_DECK, pageNum: 3,
    frase: "No TP Antissocial, a psicoterapia tradicional tem a menor evidência de eficácia entre todos os transtornos de personalidade — este módulo é sobre manejo de risco, não sobre \"cura\".",
    apoio: "É importante começar por essa expectativa realista: aqui, o objetivo clínico principal costuma ser reduzir dano e reincidência, não transformar a estrutura de personalidade.",
  });

  deck.slideCircuito(pres, {
    rodape: RODAPE_DECK, pageNum: 4,
    titulo: "Por que a punição não inibe o comportamento",
    regioes: [
      { label: "Córtex orbitofrontal / ventromedial (hipofunção na aprendizagem moral)", rx: 0.18, ry: 0.20, color: deck.NAVY, d: 0.5 },
      { label: "Amígdala (hiporreativa ao sofrimento alheio)", rx: 0.24, ry: 0.64, color: deck.TERRA, d: 0.4 },
      { label: "Sistema de recompensa (busca de sensação elevada)", rx: 0.58, ry: 0.64, color: deck.NAVY_TINT, d: 0.36 },
      { label: "Córtex pré-frontal (baixa resposta fisiológica ao medo/punição)", rx: 0.60, ry: 0.26, color: deck.TERRA_TINT, d: 0.36 },
    ],
    notas: [
      "O córtex orbitofrontal/ventromedial é central na aprendizagem de que uma ação teve consequência ruim — aqui, essa aprendizagem é prejudicada.",
      "A amígdala responde menos ao distress facial de outra pessoa — a base biológica do déficit empático central desse quadro.",
      "Baixa resposta fisiológica ao medo explica por que punição (inclusive legal) tem efeito inibitório reduzido, diferente do desenvolvimento típico.",
    ],
  });

  deck.slideCadeia(pres, {
    rodape: RODAPE_DECK, pageNum: 5,
    titulo: "Do temperamento à consolidação do padrão",
    elos: [
      { titulo: "Baixo medo / baixa resposta a punição", desc: "Temperamento de base, frequentemente já visível na infância" },
      { titulo: "Aprendizagem moral prejudicada", desc: "Punição não inibe o comportamento como no desenvolvimento típico" },
      { titulo: "Transtorno de Conduta (se antes dos 18)", desc: "Padrão de violação de normas se consolida na adolescência" },
      { titulo: "TP Antissocial (após os 18)", desc: "Exploração interpessoal reforçada pelo ganho obtido" },
    ],
    notaFinal: "O diagnóstico de TP Antissocial exige, por critério, histórico de Transtorno de Conduta antes dos 15 anos — não é um quadro que \"aparece do nada\" na vida adulta.",
  });

  deck.slideCategorias(pres, {
    rodape: RODAPE_DECK, pageNum: 6,
    titulo: "3 traços centrais",
    categorias: [
      { titulo: "Desconsideração por normas", desc: "Violação recorrente de regras sociais e legais", color: deck.TERRA },
      { titulo: "Falta de empatia/remorso", desc: "Dificuldade genuína de reconhecer o impacto nos outros", color: deck.NAVY },
      { titulo: "Impulsividade", desc: "Busca de sensação, baixa aversão ao risco", color: deck.NAVY_TINT },
    ],
    notaFinal: "Psicopatia é um construto relacionado, mas não idêntico — enfatiza mais o déficit afetivo central e usa o PCL-R como instrumento específico.",
  });

  deck.slideSinais(pres, {
    rodape: RODAPE_DECK, pageNum: 7,
    titulo: "O que diferencia de outros perfis do Cluster B",
    itens: [
      { titulo: "Cognitivo", desc: "Racionalização do comportamento antissocial, culpar sistematicamente outros" },
      { titulo: "Comportamental", desc: "Mentira recorrente, violação de normas, agressão" },
      { titulo: "Relacional", desc: "Exploração de vínculos, superficialidade afetiva" },
      { titulo: "Físico", desc: "Baixa resposta fisiológica a estímulos aversivos ou de medo" },
    ],
  });

  deck.slideDiferencial(pres, {
    rodape: RODAPE_DECK, pageNum: 8,
    titulo: "Diagnóstico diferencial rápido",
    cards: [
      { titulo: "TP Narcisista", desc: "Busca admiração; antissocial busca ganho/poder, sem necessidade de ser admirado" },
      { titulo: "Transtorno de Conduta", desc: "É o precursor obrigatório antes dos 15 anos — antissocial só se diagnostica após os 18" },
      { titulo: "Psicopatia (PCL-R)", desc: "Construto relacionado, com maior ênfase no déficit afetivo central" },
    ],
  });

  deck.slideInstrumentos(pres, {
    rodape: RODAPE_DECK, pageNum: 9,
    titulo: "Três instrumentos, três finalidades",
    instrumentos: [
      { sigla: "PCL-R", nome: "Psychopathy Checklist-Revised", desc: "Mede especificamente traços psicopáticos — aplicação exige treinamento formal." },
      { sigla: "PID-5", nome: "Personality Inventory for DSM-5", desc: "Mapeia os traços patológicos de forma dimensional." },
      { sigla: "SCID-5-PD", nome: "Entrevista Estruturada", desc: "Padrão-ouro pra diagnóstico categorial formal." },
    ],
  });

  deck.slideProtocoloOverview(pres, {
    rodape: RODAPE_DECK, pageNum: 10,
    titulo: "Do mecanismo ao manejo: 4 passos",
    passos: [
      { titulo: "Avaliação\nde risco", desc: "De violência e reincidência, antes de qualquer intervenção" },
      { titulo: "Limites e\ncontingências", desc: "Terapia baseada em contingência funciona melhor que insight puro" },
      { titulo: "Redução\nde dano", desc: "Foco em comportamentos específicos, não personalidade global" },
      { titulo: "Envolvimento\ndo sistema", desc: "Judicial, familiar, institucional, quando aplicável" },
    ],
    notaFinal: "Diferente de todos os módulos anteriores, aqui a avaliação de risco vem ANTES de qualquer outro passo — não depois.",
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 11,
    titulo: "Passos 1 e 2, na prática",
    colunas: [
      {
        numero: 1, titulo: "Avaliação de risco",
        bullets: ["Use instrumentos estruturados de avaliação de risco de violência antes de definir o plano terapêutico", "Investigue histórico de violência, uso de substâncias e comportamento em ambientes de baixa supervisão", "Essa avaliação não é opcional nem posterior — é o primeiro passo obrigatório aqui"],
      },
      {
        numero: 2, titulo: "Limites e contingências claras",
        fala: "“Aqui está claro o que acontece se os combinados não forem seguidos — não é ameaça, é a estrutura do nosso trabalho juntos.”",
        bullets: ["Contingências claras e consistentes funcionam melhor que apelo a insight ou empatia", "Documente combinados e consequências de forma objetiva desde o início"],
      },
    ],
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 12,
    titulo: "Passos 3 e 4, na prática",
    colunas: [
      {
        numero: 3, titulo: "Redução de dano — foco específico",
        bullets: ["Trabalhe comportamentos concretos (ex: reincidência de um tipo específico de violação), não \"mudar a personalidade\"", "Metas pequenas e mensuráveis têm mais chance real de adesão", "Reforce ganhos comportamentais concretos (ex: cumprir condicional) sem esperar mudança de caráter"],
      },
      {
        numero: 4, titulo: "Envolvimento do sistema",
        bullets: ["Trabalho isolado de um único terapeuta tem eficácia limitada nesse perfil", "Envolva sistema judicial, familiar ou institucional quando aplicável e autorizado", "Coordenação de equipe reduz risco de manipulação do processo terapêutico"],
      },
    ],
  });

  deck.slideCaso(pres, {
    rodape: RODAPE_DECK, pageNum: 13,
    vinheta: "Diego, 27 anos, é encaminhado pelo sistema judicial após condenação por fraude. Nas sessões, minimiza repetidamente as consequências de seus atos (\"todo mundo faz isso, eu só fui pego\") e atribui a responsabilidade às vítimas (\"eles deveriam ter sido mais espertos\"). Relata histórico de furtos desde os 12 anos e expulsão escolar por agressão aos 15.",
    perguntas: [
      "Que critério histórico do DSM-5 está presente na vinheta, e por que ele é obrigatório pro diagnóstico?",
      "A minimização e culpabilização da vítima ilustram qual dos 3 traços centrais?",
      "Que tipo de meta terapêutica (passo 3) seria mais realista aqui do que \"desenvolver empatia\"?",
    ],
  });

  deck.slideEncaminhamento(pres, {
    rodape: RODAPE_DECK, pageNum: 14,
    criterios: [
      "SEMPRE realizar avaliação formal de risco de violência com instrumento estruturado, não é exceção",
      "Envolvimento de equipe multiprofissional e rede (judicial, social) — trabalho isolado tem eficácia limitada",
      "Comorbidade com uso de substâncias ativo, que eleva significativamente o risco comportamental",
      "Sinais de risco iminente a terceiros ou ao próprio paciente exigem protocolo de segurança formal (ver Módulo 4.9)",
    ],
  });

  deck.slideRecap(pres, {
    rodape: RODAPE_DECK, pageNum: 15,
    pontos: [
      "No TP Antissocial, punição tem efeito inibitório reduzido por hipofunção do córtex orbitofrontal e baixa resposta ao medo",
      "Desconsideração por normas, falta de empatia/remorso e impulsividade são os 3 traços centrais",
      "PCL-R, PID-5 e SCID-5-PD estruturam a avaliação — PCL-R exige treinamento formal específico",
      "Aqui a expectativa é realista: manejo de risco e redução de dano, com avaliação de risco sempre em primeiro lugar",
    ],
    proximoTexto: "Próximo: exercícios práticos e avaliação do Módulo 4.13 →",
  });

  return pres.writeFile({ fileName: "Modulo-4.13-TP-Antissocial.pptx" });
}

// ============================================================
// 2) EXERCÍCIOS
// ============================================================
function construirExercicios() {
  const children = [
    ...doc.capa(KICKER, "Exercícios — TP Antissocial", "Resolva individualmente antes da sessão de supervisão. O objetivo é testar sua leitura do mecanismo e do manejo antes de comparar com a discussão em grupo — não há problema em errar."),

    doc.exNum(1, "O mecanismo, em suas palavras"),
    doc.pergunta(1, "Explique em até 3 frases, sem jargão técnico, por que punição costuma ter efeito reduzido em inibir o comportamento nesse perfil."),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Por que o diagnóstico de TP Antissocial exige histórico de Transtorno de Conduta antes dos 15 anos?"),
    ...doc.linhaResposta(2),

    doc.exNum(2, "Diagnóstico diferencial"),
    doc.vinhetaBox("Um paciente explora relações pra obter vantagem financeira, sem remorso aparente, mas não busca nenhum tipo de reconhecimento ou admiração por isso — só o ganho em si."),
    doc.pergunta(1, "TP Antissocial ou TP Narcisista? Justifique com base no elemento central da vinheta."),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Isso muda a abordagem de manejo? Como?"),
    ...doc.linhaResposta(1),

    doc.exNum(3, "Limites e contingências"),
    doc.vinhetaBox("Um paciente combina de chegar no horário, mas se atrasa repetidamente sem justificativa, minimizando o impacto disso no processo."),
    doc.pergunta(1, "Descreva uma contingência clara e objetiva pra essa situação, sem apelar apenas a insight ou empatia."),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Por que documentar combinados de forma objetiva é especialmente importante nesse perfil?"),
    ...doc.linhaResposta(1),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),

    doc.exNum(4, "Avaliação de risco"),
    doc.p("Liste 3 elementos que você investigaria numa avaliação de risco de violência antes de definir o plano terapêutico."),
    doc.tabelaSimples(["Nº", "Elemento a investigar"], [["1", ""], ["2", ""], ["3", ""]], [1200, 8150]),

    doc.exNum(5, "Caso integrado — Diego"),
    doc.vinhetaBox("Diego, 27 anos, encaminhado pelo sistema judicial após fraude. Minimiza consequências, culpa as vítimas. Histórico de furtos desde os 12 anos, expulsão por agressão aos 15."),
    doc.pergunta(1, "Que critério histórico do DSM-5 está presente, e por que ele é obrigatório?"),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Sugira uma meta terapêutica realista (passo 3) pra Diego, mais concreta que \"desenvolver empatia\"."),
    ...doc.linhaResposta(2),
    doc.pergunta(3, "Que partes do sistema (passo 4) você buscaria envolver nesse caso, e por quê?"),
    ...doc.linhaResposta(2),
  ];

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-4.13-Exercicios.docx");
}

// ============================================================
// 3) AVALIAÇÃO
// ============================================================
function construirProva() {
  const objetivas = [
    ["No TP Antissocial, a hipofunção do córtex orbitofrontal/ventromedial está associada a:", ["Aprendizagem moral e de punição prejudicada", "Aumento da capacidade empática", "Melhora da memória de longo prazo", "Nenhuma relação com o comportamento antissocial"]],
    ["A amígdala hiporreativa nesse perfil está ligada a:", ["Menor resposta ao sofrimento/distress facial de outras pessoas", "Maior sensibilidade emocional generalizada", "Ausência completa de qualquer emoção", "Melhora da regulação do sono"]],
    ["Os 3 traços centrais do TP Antissocial são:", ["Desconsideração por normas, falta de empatia/remorso, impulsividade", "Grandiosidade, necessidade de admiração, falta de empatia", "Desconfiança generalizada, hipervigilância, rancor persistente", "Desinteresse social, restrição afetiva, isolamento"]],
    ["Critério histórico obrigatório pro diagnóstico de TP Antissocial:", ["Histórico de Transtorno de Conduta antes dos 15 anos", "Início dos sintomas exclusivamente após os 30 anos", "Ausência completa de qualquer comportamento de risco na infância", "Diagnóstico prévio de TDAH obrigatório"]],
    ["Instrumento que mede especificamente traços psicopáticos, com aplicação exigindo treinamento formal:", ["PCL-R (Psychopathy Checklist-Revised)", "BAI", "MBI", "Y-BOCS"]],
    ["O que diferencia TP Antissocial de TP Narcisista?", ["Não há diferença clínica relevante entre eles", "Antissocial busca ganho/poder sem necessidade de admiração; narcisista busca admiração especificamente", "Narcisista sempre tem histórico de Transtorno de Conduta", "Antissocial nunca explora vínculos interpessoais"]],
    ["No manejo do TP Antissocial, o que costuma funcionar melhor que apelo a insight ou empatia?", ["Ignorar completamente o comportamento do paciente", "Contingências e limites claros e consistentes", "Confrontação emocional intensa e recorrente", "Terminar o tratamento na primeira infração"]],
    ["Por que o trabalho isolado de um único terapeuta tem eficácia limitada nesse perfil?", ["Porque terapeutas nunca deveriam atender esse perfil", "Porque o manejo de risco e a redução de dano se beneficiam de coordenação com rede judicial/social/familiar", "Porque não existe nenhum tratamento eficaz descrito na literatura", "Porque é proibido por lei atender esse tipo de paciente"]],
    ["Antes de qualquer intervenção terapêutica nesse perfil, o protocolo estudado recomenda:", ["Avaliação formal de risco de violência", "Apenas construir rapport, sem qualquer avaliação estruturada", "Confrontar diretamente o paciente sobre seus crimes", "Aguardar 6 meses antes de qualquer avaliação"]],
    ["A meta terapêutica mais realista nesse perfil, segundo o módulo, é:", ["Transformar completamente a estrutura de personalidade em poucas sessões", "Reduzir dano e reincidência, com foco em comportamentos específicos", "Garantir desenvolvimento total de empatia em todos os casos", "Não há nenhuma meta terapêutica possível"]],
  ];
  const gabaritoObjetivas = ["a", "a", "a", "a", "a", "b", "b", "b", "a", "b"];

  const children = [
    ...doc.capa(KICKER, "Avaliação — TP Antissocial", `Avaliação formativa de encerramento do Módulo ${MOD}.`),
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
    doc.vinhetaBox("Renato, 33 anos, é encaminhado após múltiplas infrações no trabalho (falsificação de documentos), e relata histórico de brigas físicas frequentes na adolescência e furtos na infância. Nas sessões, mostra-se articulado e charmoso, mas some repetidamente das sessões combinadas sem aviso, retomando semanas depois como se nada tivesse acontecido. Nega qualquer impacto emocional das consequências que já enfrentou."),
    new doc.Paragraph({ spacing: { before: 240 }, children: [new doc.TextRun({ text: "Com base no protocolo estudado, responda:", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    new doc.Paragraph({ spacing: { before: 220, after: 40 }, children: [new doc.TextRun({ text: "a) (10 pts) Que elementos da vinheta sustentam a hipótese de TP Antissocial (não apenas um comportamento isolado)?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "b) (10 pts) Qual deveria ser o primeiro passo do manejo com Renato, antes de qualquer outra intervenção?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "c) (10 pts) Descreva uma contingência clara pra lidar com o padrão de ausências sem aviso.", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "d) (10 pts) Que partes do sistema (rede) fariam sentido envolver nesse caso, considerando o contexto de trabalho?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    new doc.Paragraph({ spacing: { after: 40 }, children: [new doc.TextRun({ text: "USO EXCLUSIVO DO INSTRUTOR — remover antes de aplicar a prova", bold: true, color: doc.TERRA, font: doc.FONT, size: 20 })] }),
    doc.tituloH1("Gabarito"),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 1 — Questões objetivas", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 200 }, children: [new doc.TextRun({ text: gabaritoObjetivas.map((r, i) => `${i + 1}-${r}`).join("   ·   "), font: doc.FONT, size: 22, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 2 — Critério de correção da questão de caso", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "a) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Histórico de violação de normas desde a infância/adolescência (furtos, brigas), padrão atual de fraude, e ausência de remorso genuíno — não é um evento isolado, é um padrão consolidado ao longo do tempo.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "b) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Avaliação formal de risco (passo 1) — antes de definir metas terapêuticas ou aprofundar o vínculo.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "c) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Ex: combinar de forma explícita que ausências não avisadas repetidas resultam em reavaliação da continuidade do processo, documentando isso desde o início.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "d) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Ex: RH ou supervisor do trabalho (dentro dos limites do sigilo profissional e com autorização adequada), rede familiar, e possível acompanhamento judicial se houver processo em curso.", font: doc.FONT, size: 21, color: doc.INK })] }),
  );

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-4.13-Avaliacao.docx");
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
      n: 1, titulo: "Por que punição não inibe o comportamento aqui", duracao: "12 min", slides: "1, 2, 3, 4",
      objetivo: "Sair sabendo explicar o mecanismo do TP Antissocial sem jargão, e ajustar a expectativa terapêutica desde o início.",
      segmentos: [
        seg("0:00–0:45", "Abertura (gancho)", [{ fala: "No TP Antissocial, a psicoterapia tradicional tem a menor evidência de eficácia entre todos os transtornos de personalidade — este módulo é sobre manejo de risco, não sobre cura." }]),
        seg("0:45–2:00", "Por que isso importa clinicamente", ["Ajusta a expectativa desde o início — o objetivo principal costuma ser reduzir dano e reincidência.", "Isso é o Passo 1 da anatomia de todo protocolo do curso: Mecanismo."]),
        seg("2:00–8:00", "Por que a punição não inibe o comportamento (mostrar slide 4)", [
          "Córtex orbitofrontal/ventromedial com hipofunção na aprendizagem moral.",
          "Amígdala hiporreativa ao sofrimento alheio.",
          "Sistema de recompensa com busca de sensação elevada.",
          "Baixa resposta fisiológica ao medo/punição.",
        ]),
        seg("8:00–10:30", "Um ponto importante", ["Isso não justifica o comportamento — mas explica por que confrontação emocional e apelo à consciência raramente funcionam sozinhos aqui."]),
        seg("10:30–12:00", "Fechamento", [{ fala: "Próxima aula: como o padrão se consolida desde a infância até a vida adulta." }]),
      ],
    },
    {
      n: 2, titulo: "Do temperamento à consolidação do padrão", duracao: "10 min", slides: "5",
      objetivo: "Explicar por que o diagnóstico exige histórico de Transtorno de Conduta antes dos 15 anos.",
      segmentos: [
        seg("0:00–1:00", "Retomada rápida", ["Vimos as estruturas envolvidas. Hoje vemos como o padrão se forma ao longo do desenvolvimento."]),
        seg("1:00–6:30", "A cadeia (mostrar slide 5)", ["Baixo medo/baixa resposta a punição, temperamento de base.", "Aprendizagem moral prejudicada — punição não inibe como no desenvolvimento típico.", "Transtorno de Conduta se consolida na adolescência.", "TP Antissocial, após os 18, com exploração reforçada pelo ganho."]),
        seg("6:30–9:00", "Por que o critério histórico é obrigatório", ["Não é um quadro que \"aparece do nada\" na vida adulta — a história desenvolvimental é parte do diagnóstico."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: os 3 traços centrais do TP Antissocial." }]),
      ],
    },
    {
      n: 3, titulo: "Os 3 traços centrais", duracao: "10 min", slides: "6",
      objetivo: "Reconhecer desconsideração por normas, falta de empatia/remorso e impulsividade.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três traços — e uma diferenciação importante com o construto de psicopatia."]),
        seg("1:00–7:00", "Os 3 traços (mostrar slide 6)", [
          "Desconsideração por normas: violação recorrente de regras sociais e legais.",
          "Falta de empatia/remorso: dificuldade genuína de reconhecer impacto nos outros.",
          "Impulsividade: busca de sensação, baixa aversão ao risco.",
        ]),
        seg("7:00–9:00", "Psicopatia x TP Antissocial", ["São construtos relacionados, mas não idênticos — psicopatia enfatiza mais o déficit afetivo central, medido pelo PCL-R."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: o que diferencia esse perfil de outros do Cluster B." }]),
      ],
    },
    {
      n: 4, titulo: "Sinais de alerta", duracao: "10 min", slides: "7",
      objetivo: "Reconhecer sinais cognitivos, comportamentais, relacionais e físicos do padrão antissocial.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Reconhecer o padrão com precisão é essencial pra avaliação de risco que vem em seguida."]),
        seg("1:00–7:30", "As 4 categorias (mostrar slide 7)", [
          "Cognitivo: racionalização do comportamento, culpar sistematicamente outros.",
          "Comportamental: mentira recorrente, violação de normas, agressão.",
          "Relacional: exploração de vínculos, superficialidade afetiva.",
          "Físico: baixa resposta fisiológica a estímulos aversivos ou de medo.",
        ]),
        seg("7:30–9:00", "Por que isso importa", ["Esses sinais, quando presentes de forma persistente, sustentam a necessidade de avaliação de risco formal."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: como diferenciar TP Antissocial de quadros parecidos." }]),
      ],
    },
    {
      n: 5, titulo: "Diagnóstico diferencial rápido", duracao: "12 min", slides: "8",
      objetivo: "Diferenciar TP Antissocial de TP Narcisista, Transtorno de Conduta e Psicopatia.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Um filtro rápido — a motivação por trás do comportamento é a chave de uma das diferenciações."]),
        seg("1:00–8:00", "Os 3 quadros (mostrar slide 8)", [
          "TP Narcisista: busca admiração; antissocial busca ganho/poder sem essa necessidade.",
          "Transtorno de Conduta: precursor obrigatório antes dos 15 anos.",
          "Psicopatia (PCL-R): construto relacionado, com maior ênfase no déficit afetivo.",
        ]),
        seg("8:00–10:30", "Por que a diferenciação com narcisismo importa", ["Muda a leitura da motivação central do comportamento — ganho concreto x necessidade de admiração."]),
        seg("10:30–12:00", "Fechamento", [{ fala: "Próxima aula: os instrumentos que confirmam essa leitura com dado." }]),
      ],
    },
    {
      n: 6, titulo: "Os 3 instrumentos de avaliação", duracao: "12 min", slides: "9",
      objetivo: "Saber quando usar PCL-R, PID-5 e SCID-5-PD.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três instrumentos, três finalidades — um deles exige treinamento formal específico."]),
        seg("1:00–4:30", "PCL-R", ["Mede especificamente traços psicopáticos.", "Aplicação exige treinamento formal — não é de uso livre."]),
        seg("4:30–7:30", "PID-5", ["Mapeia os traços patológicos de forma dimensional."]),
        seg("7:30–10:00", "SCID-5-PD", ["Entrevista estruturada.", "Padrão-ouro pra diagnóstico categorial formal."]),
        seg("10:00–12:00", "Como escolher na prática", ["PID-5 e SCID-5-PD são acessíveis à maioria dos clínicos; PCL-R exige capacitação específica antes do uso.", { fala: "Próxima aula: colocamos tudo em prática — avaliação de risco e contingências." }]),
      ],
    },
    {
      n: 7, titulo: "Manejo — avaliação de risco e contingências", duracao: "14 min", slides: "10, 11",
      objetivo: "Aplicar os passos 1 e 2 do manejo, com ênfase em avaliação de risco antes de qualquer intervenção.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["A parte que você vai usar antes de qualquer outra coisa com esse perfil. Hoje, os 2 primeiros passos."]),
        seg("1:00–2:00", "Visão geral (mostrar slide 10)", ["Avaliação de risco → Limites e contingências → Redução de dano → Envolvimento do sistema.", "Diferente de todos os módulos anteriores, aqui a avaliação de risco vem antes de tudo."]),
        seg("2:00–7:00", "Passo 1 — Avaliação de risco (mostrar slide 11, esquerda)", ["Use instrumentos estruturados de avaliação de risco de violência.", "Essa avaliação não é opcional nem posterior — é o primeiro passo obrigatório."]),
        seg("7:00–13:00", "Passo 2 — Limites e contingências (mostrar slide 11, direita)", [{ fala: "Aqui está claro o que acontece se os combinados não forem seguidos — não é ameaça, é a estrutura do nosso trabalho juntos." }]),
        seg("13:00–14:00", "Fechamento", [{ fala: "Próxima aula: redução de dano com foco específico e envolvimento do sistema." }]),
      ],
    },
    {
      n: 8, titulo: "Manejo — redução de dano e envolvimento do sistema", duracao: "14 min", slides: "12",
      objetivo: "Trabalhar metas comportamentais específicas e coordenar com a rede quando aplicável.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Hoje fechamos o manejo com as duas etapas mais realistas do processo."]),
        seg("1:00–7:00", "Passo 3 — Redução de dano (mostrar slide 12, esquerda)", ["Trabalhe comportamentos concretos, não \"mudar a personalidade\".", "Metas pequenas e mensuráveis têm mais chance real de adesão."]),
        seg("7:00–13:00", "Passo 4 — Envolvimento do sistema (mostrar slide 12, direita)", ["Trabalho isolado tem eficácia limitada nesse perfil.", "Envolva sistema judicial, familiar ou institucional quando aplicável e autorizado."]),
        seg("13:00–14:00", "Fechamento", [{ fala: "Manejo completo. Próxima aula: um caso real e os critérios de quando escalar." }]),
      ],
    },
    {
      n: 9, titulo: "Estudo de caso, encaminhamento e recap", duracao: "15 min", slides: "13, 14, 15",
      objetivo: "Integrar mecanismo, instrumento e manejo num caso completo, com ênfase na avaliação de risco como regra, não exceção.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Última aula do módulo. Caso completo e os critérios que aqui são regra, não exceção."]),
        seg("1:00–7:00", "Estudo de caso — Diego (mostrar slide 13)", ["Leia a vinheta com calma.", "Percorra as 3 perguntas de discussão.", "Convide o aluno a pausar e responder por escrito."]),
        seg("7:00–11:00", "Quando encaminhar (mostrar slide 14)", ["Percorra os 4 critérios — reforce que avaliação de risco formal é sempre necessária, não opcional."]),
        seg("11:00–14:00", "Recapitulando o módulo (mostrar slide 15)", ["Retome os 4 pontos-chave.", "Reforce a expectativa realista: manejo de risco e redução de dano, com avaliação de risco sempre em primeiro lugar."]),
        seg("14:00–15:00", "Fechamento do módulo", [{ fala: "Agora é hora dos exercícios e da avaliação. Te vejo no próximo transtorno de personalidade." }]),
      ],
    },
  ];

  const totalMin = 12 + 10 + 10 + 10 + 12 + 12 + 14 + 14 + 15;

  const children = [
    ...doc.capa(KICKER, "Roteiro de Aulas — TP Antissocial", "Módulo dividido em 9 vídeo-aulas de 10 a 15 minutos, seguindo os slides já produzidos. Cada aula tem roteiro cronometrado, pronto pra gravação."),
    new doc.Paragraph({
      spacing: { before: 60, after: 200 },
      children: [new doc.TextRun({
        text: "Nota importante: este módulo trata de manejo clínico com componente relevante de avaliação de risco. Recomenda-se supervisão específica antes de conduzir atendimentos desse perfil de forma independente.",
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

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", `${RODAPE_DOC} — Roteiro de Aulas`, children), "Modulo-4.13-Roteiro-Aulas.docx");
}

// ============================================================
Promise.resolve()
  .then(construirDeck)
  .then(construirExercicios)
  .then(construirProva)
  .then(construirRoteiro)
  .then(() => console.log("TUDO PRONTO"))
  .catch((e) => { console.error(e); process.exit(1); });

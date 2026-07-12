const deck = require("../_lib/lib-deck.js");
const doc = require("../_lib/lib-doc.js");

const MOD = "4.12";
const NOME = "Transtorno de Personalidade Esquizotípica";
const RODAPE_DECK = `TP Esquizotípica — Módulo ${MOD}`;
const RODAPE_DOC = `Módulo ${MOD} — TP Esquizotípica`;
const KICKER = "MÓDULO 4.12 · TRANSTORNOS DE PERSONALIDADE · CLUSTER A";

// ============================================================
// 1) SLIDE DECK
// ============================================================
function construirDeck() {
  const pres = deck.novaApresentacao(`${NOME} — Da Neurociência ao Manejo Clínico`);

  deck.slideTitulo(pres, {
    moduloLabel: `Módulo ${MOD} · Cluster A · Transtornos de Personalidade`,
    titulo: "TP Esquizotípica",
    subtitulo: "Do espectro da esquizofrenia ao manejo sem confronto nem reforço",
    passos: ["Mecanismo", "Sinais", "Instrumento", "Manejo", "Encaminhamento"],
  });

  deck.slideRoteiro(pres, {
    rodape: RODAPE_DECK, pageNum: 2,
    cards: [
      { titulo: "Mecanismo", desc: "Por que fica no espectro, sem virar psicose" },
      { titulo: "Sinais", desc: "O que diferencia excentricidade de sintoma" },
      { titulo: "Instrumento", desc: "PID-5, SPQ e SCID-5-PD na prática" },
      { titulo: "Manejo", desc: "4 passos, sem confrontar nem reforçar a crença" },
      { titulo: "Encaminhamento", desc: "Quando isso não basta" },
    ],
  });

  deck.slideHook(pres, {
    rodape: RODAPE_DECK, pageNum: 3,
    frase: "O TP Esquizotípico está no mesmo espectro genético da esquizofrenia — mas sem cruzar a linha da psicose. Saber onde está essa linha é a habilidade central deste módulo.",
    apoio: "Isso pede um equilíbrio delicado: nem confrontar a crença incomum como se fosse um erro a corrigir, nem reforçá-la como se fosse fato.",
  });

  deck.slideCircuito(pres, {
    rodape: RODAPE_DECK, pageNum: 4,
    titulo: "O que conecta ao espectro da esquizofrenia",
    regioes: [
      { label: "Sistema dopaminérgico (disfunção sutil, sem psicose franca)", rx: 0.18, ry: 0.20, color: deck.NAVY, d: 0.5 },
      { label: "Córtex temporal (processamento perceptivo levemente alterado)", rx: 0.24, ry: 0.64, color: deck.TERRA, d: 0.4 },
      { label: "Conectividade cortical reduzida entre regiões associativas", rx: 0.58, ry: 0.64, color: deck.NAVY_TINT, d: 0.36 },
      { label: "Córtex pré-frontal (prejuízo leve de cognição social)", rx: 0.60, ry: 0.26, color: deck.TERRA_TINT, d: 0.36 },
    ],
    notas: [
      "A disfunção dopaminérgica aqui é sutil — o suficiente pra gerar pensamento mágico e experiências perceptivas incomuns, mas não delírios ou alucinações francas.",
      "A conectividade cortical reduzida está associada a vários transtornos do espectro esquizofrênico, incluindo este.",
      "É importante nomear: existe uma vulnerabilidade genética compartilhada com a esquizofrenia, mas isso não significa que vai evoluir pra ela.",
    ],
  });

  deck.slideCadeia(pres, {
    rodape: RODAPE_DECK, pageNum: 5,
    titulo: "Do processamento alterado ao isolamento",
    elos: [
      { titulo: "Vulnerabilidade genética compartilhada", desc: "Mesma carga genética de base do espectro esquizofrênico" },
      { titulo: "Processamento perceptivo alterado", desc: "Pensamento mágico, ideias de referência leves" },
      { titulo: "Excentricidade comportamental", desc: "Maneirismos, discurso vago, aparência incomum" },
      { titulo: "Isolamento social", desc: "Reforçado pela diferença percebida pelos outros, não por desinteresse" },
    ],
    notaFinal: "Diferente do TP Esquizoide (módulo anterior), aqui o isolamento vem do desconforto social e da diferença percebida — não da falta de desejo de conexão.",
  });

  deck.slideCategorias(pres, {
    rodape: RODAPE_DECK, pageNum: 6,
    titulo: "3 dimensões centrais",
    categorias: [
      { titulo: "Distorções cognitivo-perceptuais", desc: "Pensamento mágico, ideias de referência leves", color: deck.TERRA },
      { titulo: "Excentricidade comportamental", desc: "Aparência ou comportamento incomum, discurso vago", color: deck.NAVY },
      { titulo: "Desconforto social agudo", desc: "Ansiedade social que não diminui com familiaridade", color: deck.NAVY_TINT },
    ],
    notaFinal: "O terceiro ponto é uma diferença-chave: na maioria dos quadros de ansiedade social, familiaridade reduz o desconforto — aqui, não necessariamente.",
  });

  deck.slideSinais(pres, {
    rodape: RODAPE_DECK, pageNum: 7,
    titulo: "O que diferencia excentricidade de sintoma emergente",
    itens: [
      { titulo: "Cognitivo", desc: "Pensamento mágico e crenças incomuns, mantidas sem convicção delirante" },
      { titulo: "Comportamental", desc: "Maneirismos peculiares, discurso vago ou circunstancial" },
      { titulo: "Relacional", desc: "Poucos vínculos, desconforto mesmo com familiares próximos" },
      { titulo: "Físico", desc: "Afeto constrito ou inadequado ao contexto da situação" },
    ],
  });

  deck.slideDiferencial(pres, {
    rodape: RODAPE_DECK, pageNum: 8,
    titulo: "Diagnóstico diferencial rápido",
    cards: [
      { titulo: "Esquizofrenia", desc: "Teste de realidade comprometido — delírios e alucinações francos presentes" },
      { titulo: "TP Esquizoide", desc: "Tem desinteresse social simples, sem a excentricidade perceptual esquizotípica" },
      { titulo: "Transtorno do Espectro Autista", desc: "Sobreposição real — exige avaliação cuidadosa da história desenvolvimental" },
    ],
  });

  deck.slideInstrumentos(pres, {
    rodape: RODAPE_DECK, pageNum: 9,
    titulo: "Três instrumentos, três finalidades",
    instrumentos: [
      { sigla: "PID-5", nome: "Personality Inventory for DSM-5", desc: "Mapeia dimensões de excentricidade e distorção perceptual." },
      { sigla: "SPQ", nome: "Schizotypal Personality Questionnaire", desc: "Instrumento específico pra dimensão esquizotípica — o mais direcionado dos três." },
      { sigla: "SCID-5-PD", nome: "Entrevista Estruturada", desc: "Padrão-ouro pra diagnóstico categorial formal." },
    ],
  });

  deck.slideProtocoloOverview(pres, {
    rodape: RODAPE_DECK, pageNum: 10,
    titulo: "Do mecanismo ao manejo: 4 passos",
    passos: [
      { titulo: "Psicoeducação\nsem confronto", desc: "Diferenciar de \"loucura\" sem reforçar a crença mágica" },
      { titulo: "Habilidades\nsociais", desc: "Cognição social e leitura de sinais interpessoais" },
      { titulo: "Monitoramento\nprodrômico", desc: "Observar sinais de possível conversão pra quadro psicótico" },
      { titulo: "Suporte\nfuncional", desc: "Prevenção de isolamento severo, manutenção de rotina" },
    ],
    notaFinal: "Nas próximas 2 telas, cada passo ganha um exemplo pronto pra levar pra sessão.",
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 11,
    titulo: "Passos 1 e 2, na prática",
    colunas: [
      {
        numero: 1, titulo: "Psicoeducação sem confronto",
        fala: "“O jeito como você processa certas experiências é diferente do que a maioria das pessoas relata — isso não significa que algo está ‘errado’ com você, mas vale a pena entendermos juntos o que isso significa no seu dia a dia.”",
        bullets: ["Não confronte a crença como \"errada\" — isso gera ruptura sem mudar a convicção", "Não reforce a crença como fato — mantenha postura curiosa, não validadora"],
      },
      {
        numero: 2, titulo: "Habilidades sociais e cognição social",
        bullets: ["Trabalhe leitura de expressões faciais e tom de voz de forma prática", "Pratique scripts simples pra situações sociais comuns", "Vá com calma — desconforto social aqui não diminui só com exposição, como em ansiedade social típica"],
      },
    ],
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 12,
    titulo: "Passos 3 e 4, na prática",
    colunas: [
      {
        numero: 3, titulo: "Monitoramento de sinais prodrômicos",
        bullets: ["Observe mudanças na intensidade ou convicção das crenças incomuns", "Atenção a qualquer sinal de perda de teste de realidade (delírio, alucinação franca)", "Documente a evolução ao longo do tempo — mudança de padrão é o sinal mais importante"],
      },
      {
        numero: 4, titulo: "Suporte funcional",
        bullets: ["Priorize manutenção de rotina, trabalho e vínculos mínimos viáveis", "Preveja isolamento severo antes que ele se instale por completo", "Envolva rede de apoio, quando o paciente permitir"],
      },
    ],
  });

  deck.slideCaso(pres, {
    rodape: RODAPE_DECK, pageNum: 13,
    vinheta: "Camila, 26 anos, relata que \"sente quando alguém vai ligar antes do telefone tocar\" e acredita ter uma \"conexão especial\" com números que aparecem repetidamente. Fala de forma vaga e vai de um assunto a outro sem transição clara. Tem poucos amigos e relata desconforto mesmo em jantares de família, apesar de conhecer todos há anos.",
    perguntas: [
      "As crenças de Camila são mais consistentes com pensamento mágico ou com delírio estruturado? Justifique.",
      "Como você responderia à fala sobre \"sentir quando alguém vai ligar\", sem confrontar nem validar como fato?",
      "O desconforto mesmo em contextos familiares é um dado relevante — por quê?",
    ],
  });

  deck.slideEncaminhamento(pres, {
    rodape: RODAPE_DECK, pageNum: 14,
    criterios: [
      "Emergência de sintomas psicóticos francos — delírios estruturados ou alucinações",
      "Avaliação psiquiátrica pra risco de conversão pro espectro esquizofrênico completo",
      "Isolamento severo com prejuízo funcional grave (perda de emprego, negligência de autocuidado)",
      "Comorbidade com sintomas depressivos ou ansiosos que exigem tratamento próprio",
    ],
  });

  deck.slideRecap(pres, {
    rodape: RODAPE_DECK, pageNum: 15,
    pontos: [
      "TP Esquizotípica está no espectro genético da esquizofrenia, sem cruzar a linha da psicose",
      "Distorções cognitivo-perceptuais, excentricidade e desconforto social agudo são as 3 dimensões centrais",
      "PID-5, SPQ e SCID-5-PD ajudam a mapear e confirmar o diagnóstico com dado",
      "O manejo exige equilíbrio: nem confrontar a crença, nem reforçá-la — e monitorar sinais de conversão psicótica",
    ],
    proximoTexto: "Próximo: exercícios práticos e avaliação do Módulo 4.12 →",
  });

  return pres.writeFile({ fileName: "Modulo-4.12-TP-Esquizotipica.pptx" });
}

// ============================================================
// 2) EXERCÍCIOS
// ============================================================
function construirExercicios() {
  const children = [
    ...doc.capa(KICKER, "Exercícios — TP Esquizotípica", "Resolva individualmente antes da sessão de supervisão. O objetivo é testar sua leitura do mecanismo e do manejo antes de comparar com a discussão em grupo — não há problema em errar."),

    doc.exNum(1, "O mecanismo, em suas palavras"),
    doc.pergunta(1, "Explique em até 3 frases, sem jargão técnico, o que significa dizer que o TP Esquizotípico está \"no espectro\" da esquizofrenia, sem ser esquizofrenia."),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Cite as 3 dimensões centrais do TP Esquizotípico e dê um exemplo de fala de paciente pra cada uma."),
    ...doc.linhaResposta(2),

    doc.exNum(2, "Diagnóstico diferencial"),
    doc.vinhetaBox("Um paciente relata que \"tem certeza absoluta\" de que os vizinhos estão conspirando pra prejudicá-lo, com detalhes elaborados e consistentes, e reage com hostilidade a qualquer questionamento sobre isso."),
    doc.pergunta(1, "Isso é mais consistente com pensamento mágico (esquizotípico) ou delírio estruturado (psicótico)? Justifique."),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Isso muda a urgência do encaminhamento? Como?"),
    ...doc.linhaResposta(1),

    doc.exNum(3, "Nem confrontar, nem reforçar"),
    doc.vinhetaBox("Um paciente diz ao terapeuta: \"Eu sei quando alguém está mentindo só de olhar nos olhos da pessoa, sempre acerto.\""),
    doc.pergunta(1, "Escreva uma resposta que não confronte a crença como \"errada\", nem a reforce como fato."),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Por que confrontar diretamente costuma ser contraproducente aqui?"),
    ...doc.linhaResposta(1),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),

    doc.exNum(4, "Monitoramento prodrômico"),
    doc.p("Liste 3 mudanças de padrão que você observaria ao longo do tempo como possíveis sinais de conversão pra quadro psicótico."),
    doc.tabelaSimples(["Nº", "Sinal de possível conversão"], [["1", ""], ["2", ""], ["3", ""]], [1200, 8150]),

    doc.exNum(5, "Caso integrado — Camila"),
    doc.vinhetaBox("Camila, 26 anos, relata \"sentir quando alguém vai ligar\" e conexão especial com números repetidos. Fala de forma vaga, tem poucos amigos, desconforto mesmo em contextos familiares."),
    doc.pergunta(1, "Escreva a frase de psicoeducação que você usaria com Camila."),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Sugira uma atividade de habilidade social (passo 2) adequada pro perfil de Camila."),
    ...doc.linhaResposta(2),
    doc.pergunta(3, "Que mudança no relato de Camila indicaria necessidade de encaminhamento psiquiátrico urgente?"),
    ...doc.linhaResposta(2),
  ];

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-4.12-Exercicios.docx");
}

// ============================================================
// 3) AVALIAÇÃO
// ============================================================
function construirProva() {
  const objetivas = [
    ["O TP Esquizotípico está associado a:", ["Vulnerabilidade genética compartilhada com o espectro da esquizofrenia, sem psicose franca", "Nenhuma relação com quadros psicóticos", "Sempre evolução obrigatória pra esquizofrenia completa", "Disfunção exclusivamente no sistema motor"]],
    ["As 3 dimensões centrais do TP Esquizotípico são:", ["Distorções cognitivo-perceptuais, excentricidade comportamental, desconforto social agudo", "Grandiosidade, necessidade de admiração, falta de empatia", "Desconfiança generalizada, hipervigilância, rancor persistente", "Desinteresse social, restrição afetiva, preferência por solidão"]],
    ["O que diferencia TP Esquizotípico de Esquizofrenia?", ["Não há diferença clínica relevante entre eles", "No esquizotípico o teste de realidade está preservado; na esquizofrenia, comprometido por delírios/alucinações francos", "Esquizotípico sempre envolve alucinações auditivas", "Esquizofrenia nunca envolve isolamento social"]],
    ["O que diferencia TP Esquizotípico de TP Esquizoide?", ["Não há diferença relevante entre eles", "Esquizotípico tem excentricidade perceptual; esquizoide não, mas ambos têm isolamento", "Esquizoide sempre tem pensamento mágico", "Esquizotípico nunca tem qualquer isolamento social"]],
    ["Instrumento específico pra dimensão esquizotípica:", ["SPQ (Schizotypal Personality Questionnaire)", "BAI", "MBI", "Y-BOCS"]],
    ["A abordagem correta diante de uma crença de pensamento mágico é:", ["Confrontar diretamente como errada", "Reforçar como fato absoluto", "Nem confrontar nem reforçar — manter postura curiosa e exploratória", "Ignorar completamente o relato do paciente"]],
    ["Por que a familiaridade nem sempre reduz o desconforto social no TP Esquizotípico, diferente da ansiedade social típica?", ["Porque não há desconforto social nesse quadro", "Porque o desconforto está ligado a uma diferença de processamento mais estável, não só à falta de exposição", "Porque o paciente sempre evita completamente o contato", "Porque é um efeito colateral de medicação"]],
    ["É sinal de alerta comportamental no TP Esquizotípico:", ["Discurso claro e direto, sem nenhuma peculiaridade", "Maneirismos peculiares e discurso vago ou circunstancial", "Ausência total de qualquer crença incomum", "Facilidade extrema de manter conversas estruturadas"]],
    ["É critério de encaminhamento:", ["O paciente relatar uma crença incomum isolada, sem mudança de padrão", "Emergência de sintomas psicóticos francos ou risco de conversão pro espectro esquizofrênico", "O paciente ter poucos amigos", "O paciente ter menos de 30 anos"]],
    ["O passo de \"monitoramento prodrômico\" (passo 3) tem como objetivo principal:", ["Confirmar que o paciente nunca vai desenvolver psicose", "Observar mudanças de padrão que possam indicar conversão pra quadro psicótico", "Reforçar as crenças incomuns do paciente", "Encerrar o tratamento assim que possível"]],
  ];
  const gabaritoObjetivas = ["a", "a", "b", "b", "a", "c", "b", "b", "b", "b"];

  const children = [
    ...doc.capa(KICKER, "Avaliação — TP Esquizotípica", `Avaliação formativa de encerramento do Módulo ${MOD}.`),
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
    doc.vinhetaBox("Diego, 30 anos, relata que \"consegue perceber energias das pessoas\" e usa isso pra decidir com quem se relacionar. Fala com pausas incomuns e trocas abruptas de assunto. Trabalha como autônomo, com poucos contatos sociais, mas mantém rotina estável e nega qualquer alucinação ou convicção rígida sobre suas percepções — descreve como \"pressentimentos\", não certezas."),
    new doc.Paragraph({ spacing: { before: 240 }, children: [new doc.TextRun({ text: "Com base no protocolo estudado, responda:", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    new doc.Paragraph({ spacing: { before: 220, after: 40 }, children: [new doc.TextRun({ text: "a) (10 pts) Que dimensão do TP Esquizotípico está mais evidente na fala sobre \"energias\"?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "b) (10 pts) O fato de Diego descrever \"pressentimentos\", não certezas, e negar alucinações, é clinicamente relevante? Por quê?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "c) (10 pts) Descreva como você responderia à fala sobre \"energias\", sem confrontar nem reforçar.", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "d) (10 pts) A manutenção de rotina estável de Diego, apesar do isolamento, é um dado relevante pra qual dos 4 passos do manejo?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    new doc.Paragraph({ spacing: { after: 40 }, children: [new doc.TextRun({ text: "USO EXCLUSIVO DO INSTRUTOR — remover antes de aplicar a prova", bold: true, color: doc.TERRA, font: doc.FONT, size: 20 })] }),
    doc.tituloH1("Gabarito"),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 1 — Questões objetivas", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 200 }, children: [new doc.TextRun({ text: gabaritoObjetivas.map((r, i) => `${i + 1}-${r}`).join("   ·   "), font: doc.FONT, size: 22, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 2 — Critério de correção da questão de caso", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "a) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Distorções cognitivo-perceptuais — a crença de \"perceber energias\" é um exemplo de pensamento mágico.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "b) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Sim — a diferença entre \"pressentimento\" (convicção fraca, sem certeza absoluta) e delírio estruturado (convicção rígida e inabalável) é justamente o que mantém o teste de realidade preservado, distinguindo de um quadro psicótico.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "c) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Espera-se uma resposta curiosa e exploratória (\"me conta mais sobre como isso funciona pra você\"), sem validar como fato objetivo nem descartar como bobagem.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "d) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Passo 4 (suporte funcional) — a rotina estável é um recurso protetivo a ser mantido e reforçado, mesmo diante do isolamento social.", font: doc.FONT, size: 21, color: doc.INK })] }),
  );

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-4.12-Avaliacao.docx");
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
      n: 1, titulo: "No espectro, sem cruzar a linha", duracao: "12 min", slides: "1, 2, 3, 4",
      objetivo: "Sair sabendo explicar a relação do TP Esquizotípico com o espectro da esquizofrenia sem jargão.",
      segmentos: [
        seg("0:00–0:45", "Abertura (gancho)", [{ fala: "O TP Esquizotípico está no mesmo espectro genético da esquizofrenia — mas sem cruzar a linha da psicose. Saber onde está essa linha é a habilidade central deste módulo." }]),
        seg("0:45–2:00", "Por que isso importa clinicamente", ["Pede um equilíbrio delicado: nem confrontar a crença, nem reforçá-la.", "Isso é o Passo 1 da anatomia de todo protocolo do curso: Mecanismo."]),
        seg("2:00–8:00", "O que conecta ao espectro da esquizofrenia (mostrar slide 4)", [
          "Sistema dopaminérgico com disfunção sutil, sem psicose franca.",
          "Córtex temporal com processamento perceptivo levemente alterado.",
          "Conectividade cortical reduzida entre regiões associativas.",
          "Córtex pré-frontal com prejuízo leve de cognição social.",
        ]),
        seg("8:00–10:30", "Um ponto importante", ["Existe vulnerabilidade genética compartilhada, mas isso não significa que vai evoluir pra esquizofrenia completa."]),
        seg("10:30–12:00", "Fechamento", [{ fala: "Próxima aula: como esse processamento alterado leva ao isolamento social." }]),
      ],
    },
    {
      n: 2, titulo: "Do processamento alterado ao isolamento", duracao: "10 min", slides: "5",
      objetivo: "Explicar a cadeia vulnerabilidade–processamento–excentricidade–isolamento.",
      segmentos: [
        seg("0:00–1:00", "Retomada rápida", ["Vimos as estruturas envolvidas. Hoje vemos como isso vira um padrão de vida."]),
        seg("1:00–6:30", "A cadeia (mostrar slide 5)", ["Vulnerabilidade genética compartilhada com o espectro esquizofrênico.", "Processamento perceptivo alterado gera pensamento mágico.", "Excentricidade comportamental se torna visível aos outros.", "Isolamento social é reforçado pela diferença percebida."]),
        seg("6:30–9:00", "Diferença importante com o módulo anterior", ["Aqui o isolamento vem do desconforto e da diferença percebida — não da falta de desejo de conexão, como no TP Esquizoide."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: as 3 dimensões centrais do TP Esquizotípico." }]),
      ],
    },
    {
      n: 3, titulo: "As 3 dimensões centrais", duracao: "10 min", slides: "6",
      objetivo: "Reconhecer distorções cognitivo-perceptuais, excentricidade e desconforto social agudo.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três dimensões que, juntas, formam o quadro completo."]),
        seg("1:00–7:00", "As 3 dimensões (mostrar slide 6)", [
          "Distorções cognitivo-perceptuais: pensamento mágico, ideias de referência leves.",
          "Excentricidade comportamental: aparência ou comportamento incomum.",
          "Desconforto social agudo: não diminui com familiaridade.",
        ]),
        seg("7:00–9:00", "Por que o terceiro ponto é diferente", ["Na maioria dos quadros de ansiedade social, familiaridade reduz o desconforto — aqui, não necessariamente."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: o que diferencia excentricidade de sintoma emergente." }]),
      ],
    },
    {
      n: 4, titulo: "Sinais de alerta", duracao: "10 min", slides: "7",
      objetivo: "Reconhecer sinais cognitivos, comportamentais, relacionais e físicos do padrão esquizotípico.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Reconhecer o padrão com precisão evita tanto sub quanto super-patologização."]),
        seg("1:00–7:30", "As 4 categorias (mostrar slide 7)", [
          "Cognitivo: pensamento mágico e crenças incomuns, sem convicção delirante.",
          "Comportamental: maneirismos peculiares, discurso vago ou circunstancial.",
          "Relacional: poucos vínculos, desconforto mesmo com familiares.",
          "Físico: afeto constrito ou inadequado ao contexto.",
        ]),
        seg("7:30–9:00", "Por que isso importa", ["Esses sinais orientam o monitoramento contínuo do passo 3 do manejo."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: como diferenciar TP Esquizotípico de quadros parecidos." }]),
      ],
    },
    {
      n: 5, titulo: "Diagnóstico diferencial rápido", duracao: "12 min", slides: "8",
      objetivo: "Diferenciar TP Esquizotípico de esquizofrenia, TP Esquizoide e TEA.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Um filtro rápido — e o teste de realidade é, de novo, a chave central."]),
        seg("1:00–8:00", "Os 3 quadros (mostrar slide 8)", [
          "Esquizofrenia: teste de realidade comprometido, delírios e alucinações francos.",
          "TP Esquizoide: desinteresse social simples, sem excentricidade perceptual.",
          "TEA: sobreposição real, exige avaliação cuidadosa da história desenvolvimental.",
        ]),
        seg("8:00–10:30", "Por que essa diferenciação exige cuidado extra", ["A linha entre pensamento mágico e delírio pode ser sutil — errar pra qualquer lado tem custo clínico real."]),
        seg("10:30–12:00", "Fechamento", [{ fala: "Próxima aula: os instrumentos que ajudam a confirmar essa leitura." }]),
      ],
    },
    {
      n: 6, titulo: "Os 3 instrumentos de avaliação", duracao: "12 min", slides: "9",
      objetivo: "Saber quando usar PID-5, SPQ e SCID-5-PD.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três instrumentos, três níveis de profundidade."]),
        seg("1:00–4:30", "PID-5", ["Mapeia dimensões de excentricidade e distorção perceptual."]),
        seg("4:30–7:30", "SPQ", ["Instrumento específico pra dimensão esquizotípica.", "O mais direcionado dos três pra esse quadro específico."]),
        seg("7:30–10:00", "SCID-5-PD", ["Entrevista estruturada.", "Padrão-ouro pra diagnóstico categorial formal."]),
        seg("10:00–12:00", "Como escolher na prática", ["SPQ como primeira escolha específica; SCID-5-PD quando precisar de diagnóstico formal.", { fala: "Próxima aula: colocamos tudo em prática — psicoeducação sem confronto e habilidades sociais." }]),
      ],
    },
    {
      n: 7, titulo: "Manejo — psicoeducação e habilidades sociais", duracao: "14 min", slides: "10, 11",
      objetivo: "Aplicar os passos 1 e 2 do manejo, mantendo o equilíbrio entre não confrontar e não reforçar.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["A parte que você vai usar já na próxima sessão com esse perfil. Hoje, os 2 primeiros passos."]),
        seg("1:00–2:00", "Visão geral (mostrar slide 10)", ["Psicoeducação sem confronto → Habilidades sociais → Monitoramento prodrômico → Suporte funcional."]),
        seg("2:00–7:00", "Passo 1 — Psicoeducação sem confronto (mostrar slide 11, esquerda)", [{ fala: "O jeito como você processa certas experiências é diferente do que a maioria das pessoas relata — isso não significa que algo está errado com você." }]),
        seg("7:00–13:00", "Passo 2 — Habilidades sociais (mostrar slide 11, direita)", ["Trabalhe leitura de expressões faciais e tom de voz de forma prática.", "Vá com calma — o desconforto social aqui não diminui só com exposição."]),
        seg("13:00–14:00", "Fechamento", [{ fala: "Próxima aula: monitoramento prodrômico e suporte funcional." }]),
      ],
    },
    {
      n: 8, titulo: "Manejo — monitoramento e suporte funcional", duracao: "14 min", slides: "12",
      objetivo: "Monitorar sinais de conversão pra quadro psicótico e sustentar o funcionamento do paciente.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Hoje fechamos o manejo com as duas etapas de acompanhamento a longo prazo."]),
        seg("1:00–7:00", "Passo 3 — Monitoramento prodrômico (mostrar slide 12, esquerda)", ["Observe mudanças na intensidade ou convicção das crenças incomuns.", "Atenção a qualquer sinal de perda de teste de realidade."]),
        seg("7:00–13:00", "Passo 4 — Suporte funcional (mostrar slide 12, direita)", ["Priorize manutenção de rotina, trabalho e vínculos mínimos viáveis.", "Preveja isolamento severo antes que ele se instale por completo."]),
        seg("13:00–14:00", "Fechamento", [{ fala: "Manejo completo. Próxima aula: um caso real e os critérios de quando encaminhar." }]),
      ],
    },
    {
      n: 9, titulo: "Estudo de caso, encaminhamento e recap", duracao: "15 min", slides: "13, 14, 15",
      objetivo: "Integrar mecanismo, instrumento e manejo num caso completo, com ênfase na diferenciação com quadro psicótico.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Última aula do módulo. Caso completo e os critérios de quando escalar."]),
        seg("1:00–7:00", "Estudo de caso — Camila (mostrar slide 13)", ["Leia a vinheta com calma.", "Percorra as 3 perguntas de discussão.", "Convide o aluno a pausar e responder por escrito."]),
        seg("7:00–11:00", "Quando encaminhar (mostrar slide 14)", ["Percorra os 4 critérios — ênfase em emergência de sintomas psicóticos francos."]),
        seg("11:00–14:00", "Recapitulando o módulo (mostrar slide 15)", ["Retome os 4 pontos-chave.", "Reforce o equilíbrio central: nem confrontar, nem reforçar."]),
        seg("14:00–15:00", "Fechamento do módulo", [{ fala: "Agora é hora dos exercícios e da avaliação. Te vejo no próximo transtorno de personalidade." }]),
      ],
    },
  ];

  const totalMin = 12 + 10 + 10 + 10 + 12 + 12 + 14 + 14 + 15;

  const children = [
    ...doc.capa(KICKER, "Roteiro de Aulas — TP Esquizotípica", "Módulo dividido em 9 vídeo-aulas de 10 a 15 minutos, seguindo os slides já produzidos. Cada aula tem roteiro cronometrado, pronto pra gravação."),
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

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", `${RODAPE_DOC} — Roteiro de Aulas`, children), "Modulo-4.12-Roteiro-Aulas.docx");
}

// ============================================================
Promise.resolve()
  .then(construirDeck)
  .then(construirExercicios)
  .then(construirProva)
  .then(construirRoteiro)
  .then(() => console.log("TUDO PRONTO"))
  .catch((e) => { console.error(e); process.exit(1); });

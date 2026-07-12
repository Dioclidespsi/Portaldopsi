const deck = require("../_lib/lib-deck.js");
const doc = require("../_lib/lib-doc.js");

const MOD = "4.8";
const NOME = "Transtorno Obsessivo-Compulsivo";
const RODAPE_DECK = `TOC — Módulo ${MOD}`;
const RODAPE_DOC = `Módulo ${MOD} — TOC`;
const KICKER = "MÓDULO 4.8 · PROTOCOLOS CLÍNICOS DIRETOS AO PONTO";

// ============================================================
// 1) SLIDE DECK
// ============================================================
function construirDeck() {
  const pres = deck.novaApresentacao(`${NOME} — Da Neurociência ao Protocolo Clínico`);

  deck.slideTitulo(pres, {
    moduloLabel: `Módulo ${MOD} · Protocolos Clínicos Diretos ao Ponto`,
    titulo: "TOC",
    subtitulo: "Da neurociência do circuito ao protocolo de exposição",
    passos: ["Mecanismo", "Sinais", "Instrumento", "Protocolo", "Encaminhamento"],
  });

  deck.slideRoteiro(pres, {
    rodape: RODAPE_DECK, pageNum: 2,
    cards: [
      { titulo: "Mecanismo", desc: "O circuito que não consegue \"desligar o alarme\"" },
      { titulo: "Sinais", desc: "O que avisa que virou um ciclo instalado" },
      { titulo: "Instrumento", desc: "Y-BOCS, DOCS e OCI-R na prática" },
      { titulo: "Protocolo", desc: "4 passos, prontos pra sessão" },
      { titulo: "Encaminhamento", desc: "Quando isso não basta" },
    ],
  });

  deck.slideHook(pres, {
    rodape: RODAPE_DECK, pageNum: 3,
    frase: "No TOC, o cérebro não consegue \"desligar o alarme\" sozinho — a compulsão alivia por um instante, mas ensina o circuito a disparar de novo.",
    apoio: "É por isso que \"só parar de pensar\" ou \"só não fazer o ritual uma vez\" raramente funciona sem um protocolo estruturado.",
  });

  deck.slideCircuito(pres, {
    rodape: RODAPE_DECK, pageNum: 4,
    titulo: "O circuito córtico-estriado-talâmico-cortical",
    regioes: [
      { label: "Córtex orbitofrontal (sinaliza \"erro\"/perigo)", rx: 0.18, ry: 0.20, color: deck.NAVY, d: 0.5 },
      { label: "Núcleo caudado / estriado (normalmente filtra o sinal)", rx: 0.24, ry: 0.64, color: deck.TERRA, d: 0.4 },
      { label: "Tálamo (retransmite o sinal, criando o loop)", rx: 0.58, ry: 0.64, color: deck.NAVY_TINT, d: 0.36 },
      { label: "Córtex cingulado anterior (\"algo está errado\")", rx: 0.60, ry: 0.26, color: deck.TERRA_DIM, d: 0.36 },
    ],
    notas: [
      "Em condições normais, o estriado filtra sinais irrelevantes antes de chegarem ao córtex.",
      "No TOC, esse filtro falha — o sinal de \"erro\" circula em loop entre córtex, estriado e tálamo.",
      "O resultado é a sensação persistente de que \"algo está errado\", mesmo sem base real.",
    ],
  });

  deck.slideCadeia(pres, {
    rodape: RODAPE_DECK, pageNum: 5,
    titulo: "Do pensamento intrusivo ao ciclo reforçado",
    elos: [
      { titulo: "Pensamento intrusivo", desc: "Surge e o córtex orbitofrontal sinaliza \"erro\" ou perigo" },
      { titulo: "Alarme não desliga", desc: "O circuito CSTC mantém o sinal circulando" },
      { titulo: "Compulsão alivia", desc: "O ritual reduz a ansiedade por um instante" },
      { titulo: "Ciclo se reforça", desc: "O alívio ensina o circuito a repetir o padrão — mais fácil disparar da próxima vez" },
    ],
    notaFinal: "Esse é o reforço negativo clássico: a compulsão não resolve, apenas ensina o cérebro a continuar o ciclo.",
  });

  deck.slideCategorias(pres, {
    rodape: RODAPE_DECK, pageNum: 6,
    titulo: "3 dimensões clássicas do TOC",
    categorias: [
      { titulo: "Contaminação / Limpeza", desc: "Medo de contaminação, rituais de lavagem e limpeza excessivos", color: deck.TERRA },
      { titulo: "Verificação / Checagem", desc: "Dúvida patológica, necessidade de checar repetidamente", color: deck.NAVY },
      { titulo: "Simetria / Ordem", desc: "Necessidade de arrumação e ordem \"exata\", desconforto com assimetria", color: deck.NAVY_TINT },
    ],
    notaFinal: "Um mesmo paciente pode ter mais de uma dimensão presente — identificar a predominante orienta a hierarquia de exposição.",
  });

  deck.slideSinais(pres, {
    rodape: RODAPE_DECK, pageNum: 7,
    titulo: "O que avisa que virou um ciclo instalado",
    itens: [
      { titulo: "Cognitivo", desc: "Pensamento intrusivo recorrente, dúvida patológica (\"será que fechei?\")" },
      { titulo: "Físico", desc: "Tensão até completar o ritual, exaustão por repetição" },
      { titulo: "Comportamental", desc: "Rituais/compulsões, evitação de gatilhos específicos" },
      { titulo: "Relacional", desc: "Pedidos repetidos de reasseguramento a familiares" },
    ],
  });

  deck.slideDiferencial(pres, {
    rodape: RODAPE_DECK, pageNum: 8,
    titulo: "Diagnóstico diferencial rápido",
    cards: [
      { titulo: "TOC", desc: "Obsessões e compulsões ego-distônicas — o paciente reconhece que é excessivo" },
      { titulo: "Transtorno de Personalidade Obsessivo-Compulsiva", desc: "Perfeccionismo e rigidez ego-sintônicos — a pessoa não vê como problema" },
      { titulo: "Ansiedade Generalizada", desc: "Preocupação difusa, sem rituais compulsivos específicos de alívio" },
    ],
  });

  deck.slideInstrumentos(pres, {
    rodape: RODAPE_DECK, pageNum: 9,
    titulo: "Três escalas, três finalidades",
    instrumentos: [
      { sigla: "Y-BOCS", nome: "Yale-Brown Obsessive Compulsive Scale", desc: "Padrão-ouro, aplicada pelo clínico. Mede gravidade de obsessões e compulsões." },
      { sigla: "DOCS", nome: "Dimensional Obsessive-Compulsive Scale", desc: "Mede as dimensões/subtipos — útil pra planejar a hierarquia de exposição." },
      { sigla: "OCI-R", nome: "Obsessive-Compulsive Inventory-Revised", desc: "Autorrelato rápido, bom pra rastreio inicial e acompanhamento." },
    ],
  });

  deck.slideProtocoloOverview(pres, {
    rodape: RODAPE_DECK, pageNum: 10,
    titulo: "Do mecanismo à intervenção: 4 passos",
    passos: [
      { titulo: "Psicoeducação\ndo circuito", desc: "Nomear o loop CSTC, por que \"só parar de pensar\" não funciona" },
      { titulo: "Mapeamento\ndo ciclo", desc: "Gatilho → obsessão → compulsão → alívio" },
      { titulo: "Exposição com\nPrevenção de Resposta", desc: "Hierarquia de exposição + resistir à compulsão" },
      { titulo: "Prevenção\nde recaída", desc: "Generalizar ganhos, tolerar incerteza residual" },
    ],
    notaFinal: "Nas próximas 2 telas, cada passo ganha um exemplo pronto pra levar pra sessão.",
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 11,
    titulo: "Passos 1 e 2, na prática",
    colunas: [
      {
        numero: 1, titulo: "Psicoeducação do circuito",
        fala: "“Seu cérebro está preso num loop que continua mandando o sinal de \"algo está errado\", mesmo sem base real. A compulsão alivia por um instante, mas ensina o circuito a repetir. Isso tem tratamento.”",
        bullets: ["Reduz a vergonha de \"não conseguir simplesmente parar\""],
      },
      {
        numero: 2, titulo: "Mapeamento do ciclo",
        bullets: ["Identifique o gatilho específico, a obsessão que surge, a compulsão realizada e o alívio obtido", "Desenhe o ciclo junto com o paciente, em voz alta", "Isso prepara a hierarquia de exposição do passo 3"],
      },
    ],
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 12,
    titulo: "Passos 3 e 4, na prática",
    colunas: [
      {
        numero: 3, titulo: "Exposição com Prevenção de Resposta",
        tabela: { header: ["Situação", "Ansiedade (0–10)"], linhas: [["Checar a porta 1 vez e sair", "6"], ["Esperar 5 min sem checar de novo", "8"], ["Esperar 30 min sem checar", "9"]] },
        notaTabela: "Sobe um degrau só quando o nível atual cai — sempre resistindo à compulsão, não evitando a exposição.",
      },
      {
        numero: 4, titulo: "Prevenção de recaída",
        bullets: ["Generalizar os ganhos pra outras situações e dimensões do TOC", "Trabalhar tolerância à incerteza residual — TOC raramente \"zera\" 100%", "Revisar o plano periodicamente, mesmo após melhora significativa"],
      },
    ],
  });

  deck.slideCaso(pres, {
    rodape: RODAPE_DECK, pageNum: 13,
    vinheta: "Marcelo, 34 anos, relata que verifica a fechadura da porta e o fogão de 15 a 20 vezes antes de conseguir sair de casa, o que já causou atrasos frequentes no trabalho. Reconhece que \"sabe que já verificou\", mas diz que \"a dúvida não sai da cabeça até verificar de novo\". Y-BOCS = 28.",
    perguntas: [
      "Que dimensão do TOC está mais evidente na vinheta?",
      "O insight de Marcelo é preservado ou pobre? Por que isso importa clinicamente?",
      "Descreva um primeiro passo de EPR adequado pro caso de Marcelo.",
    ],
  });

  deck.slideEncaminhamento(pres, {
    rodape: RODAPE_DECK, pageNum: 14,
    criterios: [
      "Insight pobre ou ausente — paciente não reconhece que o pensamento é exagerado",
      "Sintomas incapacitantes que impedem o funcionamento básico diário",
      "Necessidade de avaliação farmacológica (TOC costuma exigir doses mais altas de ISRS)",
      "Pensamentos tabu/agressivos com qualquer risco associado — avaliação de segurança imediata",
    ],
  });

  deck.slideRecap(pres, {
    rodape: RODAPE_DECK, pageNum: 15,
    pontos: [
      "No TOC, o circuito córtico-estriado-talâmico-cortical não consegue \"desligar o alarme\" sozinho",
      "Contaminação, verificação e simetria são as 3 dimensões clássicas",
      "Y-BOCS, DOCS e OCI-R cobrem diagnóstico padrão-ouro, dimensões e rastreio rápido",
      "O protocolo de 4 passos tem a Exposição com Prevenção de Resposta como núcleo",
    ],
    proximoTexto: "Próximo: exercícios práticos e avaliação do Módulo 4.8 →",
  });

  return pres.writeFile({ fileName: "Modulo-4.8-TOC.pptx" });
}

// ============================================================
// 2) EXERCÍCIOS
// ============================================================
function construirExercicios() {
  const children = [
    ...doc.capa(KICKER, "Exercícios — TOC", "Resolva individualmente antes da sessão de supervisão. O objetivo é testar sua leitura do mecanismo e do protocolo antes de comparar com a discussão em grupo — não há problema em errar."),

    doc.exNum(1, "O mecanismo, em suas palavras"),
    doc.pergunta(1, "Explique em até 3 frases, sem jargão técnico, por que a compulsão alivia a ansiedade no curto prazo, mas piora o quadro no longo prazo."),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Cite as 3 dimensões clássicas do TOC e dê um exemplo de ritual pra cada uma."),
    ...doc.linhaResposta(2),

    doc.exNum(2, "Leitura de escala"),
    doc.vinhetaBox("Paciente pontua 15 na Y-BOCS."),
    doc.pergunta(1, "Essa pontuação indica TOC leve, moderado ou severo?"),
    ...doc.linhaResposta(1),
    doc.pergunta(2, "Isso muda o ritmo de progressão da hierarquia de exposição? Como?"),
    ...doc.linhaResposta(1),

    doc.exNum(3, "Diagnóstico diferencial"),
    doc.vinhetaBox("Eduardo é extremamente perfeccionista no trabalho, insiste que tudo seja feito \"do jeito certo\", e não entende por que os colegas reclamam — pra ele, esse é só o jeito correto de trabalhar."),
    doc.pergunta(1, "TOC ou Transtorno de Personalidade Obsessivo-Compulsiva? Justifique com base no insight."),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Isso muda a abordagem terapêutica? Como?"),
    ...doc.linhaResposta(1),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),

    doc.exNum(4, "Mapeamento do ciclo"),
    doc.p("Para o caso de Marcelo (vinheta da aula), mapeie o ciclo completo: gatilho → obsessão → compulsão → alívio."),
    doc.tabelaSimples(["Etapa", "O que acontece"], [["Gatilho", ""], ["Obsessão", ""], ["Compulsão", ""], ["Alívio", ""]], [2500, 6850]),

    doc.exNum(5, "Caso integrado — Marcelo"),
    doc.vinhetaBox("Marcelo, 34 anos, verifica a fechadura e o fogão de 15 a 20 vezes antes de sair de casa, já causou atrasos no trabalho. Reconhece que \"sabe que já verificou\", mas a dúvida não sai da cabeça. Y-BOCS = 28."),
    doc.pergunta(1, "Escreva a frase de psicoeducação que você usaria com Marcelo."),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Monte os 2 primeiros degraus de uma hierarquia de EPR pro caso dele."),
    ...doc.linhaResposta(2),
    doc.pergunta(3, "Em que ponto você consideraria encaminhar Marcelo pra avaliação farmacológica?"),
    ...doc.linhaResposta(2),
  ];

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-4.8-Exercicios.docx");
}

// ============================================================
// 3) AVALIAÇÃO
// ============================================================
function construirProva() {
  const objetivas = [
    ["O circuito envolvido no TOC é chamado de:", ["Eixo HPA", "Circuito córtico-estriado-talâmico-cortical (CSTC)", "Sistema límbico isolado", "Cerebelo motor"]],
    ["O córtex orbitofrontal no TOC tende a:", ["Ficar menos ativo que o normal", "Sinalizar \"erro\" ou perigo de forma exagerada, gerando desconforto", "Parar de funcionar completamente", "Não ter relação com o quadro"]],
    ["Por que a compulsão alivia a ansiedade, mas reforça o ciclo?", ["Porque elimina o pensamento pra sempre", "Porque o alívio imediato reforça negativamente o comportamento, tornando o loop mais fácil de disparar depois", "Porque não há relação entre compulsão e ansiedade", "Porque a compulsão cura o TOC definitivamente"]],
    ["Qual NÃO é uma das 3 dimensões clássicas do TOC vistas na aula?", ["Contaminação/Limpeza", "Verificação/Checagem", "Simetria/Ordem", "Retardo psicomotor"]],
    ["Instrumento padrão-ouro, aplicado pelo clínico:", ["Y-BOCS", "OCI-R", "DOCS", "BAI"]],
    ["O que diferencia TOC de Transtorno de Personalidade Obsessivo-Compulsiva?", ["São exatamente a mesma condição clínica", "No TOC há obsessões/compulsões ego-distônicas; no transtorno de personalidade, o perfeccionismo é ego-sintônico", "TOC nunca causa sofrimento ao paciente", "Transtorno de personalidade sempre envolve rituais de limpeza"]],
    ["Exposição com Prevenção de Resposta (EPR) consiste em:", ["Evitar completamente qualquer gatilho", "Expor o paciente ao gatilho e ajudá-lo a resistir à compulsão", "Realizar a compulsão o mais rápido possível", "Ignorar a ansiedade completamente sem qualquer exposição"]],
    ["É sinal comportamental de alerta no TOC:", ["Ausência total de qualquer ritual", "Pedidos repetidos de reasseguramento a familiares", "Melhora espontânea sem qualquer intervenção", "Redução natural da ansiedade com o tempo"]],
    ["É critério de encaminhamento:", ["O paciente ter um pensamento intrusivo isolado uma vez", "Insight pobre ou ausente sobre o caráter exagerado do pensamento", "O paciente ter menos de 20 anos", "Sintomas leves e esporádicos"]],
    ["Por que \"só parar de pensar\" não funciona no TOC?", ["Porque o paciente não quer melhorar", "Porque o circuito CSTC hiperativo não desliga o alarme por decisão consciente", "Porque não há nenhuma base neurológica pro TOC", "Porque TOC é uma escolha pessoal do paciente"]],
  ];
  const gabaritoObjetivas = ["b", "b", "b", "d", "a", "b", "b", "b", "b", "b"];

  const children = [
    ...doc.capa(KICKER, "Avaliação — TOC", `Avaliação formativa de encerramento do Módulo ${MOD}.`),
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
    doc.vinhetaBox("Camila, 22 anos, relata que precisa organizar os objetos da mesa em ordem \"perfeita\" antes de conseguir se concentrar em qualquer tarefa, e que fica extremamente angustiada se algo está \"fora de lugar\". Isso consome cerca de 2 horas do seu dia. Reconhece que é excessivo, mas diz \"não consigo simplesmente ignorar a sensação de que está errado\". OCI-R indica escore elevado."),
    new doc.Paragraph({ spacing: { before: 240 }, children: [new doc.TextRun({ text: "Com base no protocolo estudado, responda:", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    new doc.Paragraph({ spacing: { before: 220, after: 40 }, children: [new doc.TextRun({ text: "a) (10 pts) Que dimensão do TOC está mais evidente no caso de Camila?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "b) (10 pts) O insight de Camila é preservado ou pobre? Justifique com base na vinheta.", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "c) (10 pts) Descreva a frase de psicoeducação que você usaria com Camila sobre o circuito CSTC.", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "d) (10 pts) Descreva um primeiro passo de EPR adequado pro caso de Camila.", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    new doc.Paragraph({ spacing: { after: 40 }, children: [new doc.TextRun({ text: "USO EXCLUSIVO DO INSTRUTOR — remover antes de aplicar a prova", bold: true, color: doc.TERRA, font: doc.FONT, size: 20 })] }),
    doc.tituloH1("Gabarito"),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 1 — Questões objetivas", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 200 }, children: [new doc.TextRun({ text: gabaritoObjetivas.map((r, i) => `${i + 1}-${r}`).join("   ·   "), font: doc.FONT, size: 22, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 2 — Critério de correção da questão de caso", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "a) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Simetria/Ordem — necessidade de organização \"perfeita\" e angústia com assimetria.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "b) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Preservado — ela reconhece que o comportamento é excessivo (\"reconhece que é excessivo\"), mesmo sem conseguir controlá-lo. Bom prognóstico pra EPR.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "c) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Espera-se nomear que o circuito de Camila está preso num loop que sinaliza \"errado\" mesmo sem base real, e que organizar alivia por um instante mas ensina o cérebro a repetir o ciclo.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "d) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Ex: deixar um objeto propositalmente \"fora de lugar\" por um curto período combinado, resistindo ao impulso de reorganizar, aumentando o tempo gradualmente.", font: doc.FONT, size: 21, color: doc.INK })] }),
  );

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-4.8-Avaliacao.docx");
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
      n: 1, titulo: "Um alarme que não desliga sozinho", duracao: "12 min", slides: "1, 2, 3, 4",
      objetivo: "Sair sabendo explicar o circuito CSTC sem jargão, e por que \"só parar de pensar\" não funciona no TOC.",
      segmentos: [
        seg("0:00–0:45", "Abertura (gancho)", [{ fala: "No TOC, o cérebro não consegue desligar o alarme sozinho — a compulsão alivia por um instante, mas ensina o circuito a disparar de novo." }]),
        seg("0:45–2:00", "Por que isso importa clinicamente", ["Explica por que força de vontade sozinha não resolve.", "Isso é o Passo 1 da anatomia de todo protocolo do curso: Mecanismo."]),
        seg("2:00–8:00", "O circuito CSTC (mostrar slide 4)", [
          "Córtex orbitofrontal sinaliza \"erro\" ou perigo.",
          "Estriado normalmente filtra sinais irrelevantes — no TOC, esse filtro falha.",
          "Tálamo retransmite o sinal, criando o loop.",
          "Córtex cingulado anterior gera a sensação de \"algo está errado\".",
        ]),
        seg("8:00–10:30", "Como levar isso pra sessão", [{ fala: "Seu cérebro está preso num loop que continua mandando o sinal de que algo está errado, mesmo sem base real." }]),
        seg("10:30–12:00", "Fechamento", [{ fala: "Próxima aula: a cadeia completa, do pensamento intrusivo ao ciclo reforçado." }]),
      ],
    },
    {
      n: 2, titulo: "Do pensamento intrusivo ao ciclo reforçado", duracao: "10 min", slides: "5",
      objetivo: "Explicar por que a compulsão alivia no curto prazo mas piora o quadro no longo prazo.",
      segmentos: [
        seg("0:00–1:00", "Retomada rápida", ["Vimos o circuito envolvido. Hoje vemos como ele forma um ciclo."]),
        seg("1:00–6:30", "A cadeia (mostrar slide 5)", ["Pensamento intrusivo surge e o córtex orbitofrontal sinaliza erro.", "O alarme não desliga.", "A compulsão alivia a ansiedade por um instante.", "O alívio reforça o ciclo — fica mais fácil disparar da próxima vez."]),
        seg("6:30–9:00", "O reforço negativo clássico", ["A compulsão não resolve — ensina o cérebro a continuar o ciclo."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: as 3 dimensões clássicas do TOC." }]),
      ],
    },
    {
      n: 3, titulo: "As 3 dimensões clássicas do TOC", duracao: "10 min", slides: "6",
      objetivo: "Reconhecer contaminação, verificação e simetria como as 3 dimensões mais comuns.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três dimensões — um mesmo paciente pode ter mais de uma."]),
        seg("1:00–7:00", "Contaminação, verificação, simetria (mostrar slide 6)", [
          "Contaminação/Limpeza: medo de contaminação, rituais de lavagem.",
          "Verificação/Checagem: dúvida patológica, necessidade de checar repetidamente.",
          "Simetria/Ordem: necessidade de arrumação exata.",
        ]),
        seg("7:00–9:00", "Aplicação prática", ["Identificar a dimensão predominante orienta a hierarquia de exposição do passo 3."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: os sinais que avisam que virou um ciclo instalado." }]),
      ],
    },
    {
      n: 4, titulo: "Sinais de alerta", duracao: "10 min", slides: "7",
      objetivo: "Reconhecer sinais de que o padrão obsessivo-compulsivo está instalado.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Reconhecer cedo evita que o ciclo se torne mais resistente ao tratamento."]),
        seg("1:00–7:30", "As 4 categorias (mostrar slide 7)", [
          "Cognitivo: pensamento intrusivo recorrente, dúvida patológica.",
          "Físico: tensão até completar o ritual.",
          "Comportamental: rituais/compulsões, evitação de gatilhos.",
          "Relacional: pedidos repetidos de reasseguramento.",
        ]),
        seg("7:30–9:00", "Por que isso importa", ["Reasseguramento de familiares também alimenta o ciclo — vale psicoeducar a família também."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: como diferenciar TOC, transtorno de personalidade e ansiedade generalizada." }]),
      ],
    },
    {
      n: 5, titulo: "Diagnóstico diferencial rápido", duracao: "12 min", slides: "8",
      objetivo: "Diferenciar TOC, transtorno de personalidade obsessivo-compulsiva e ansiedade generalizada pelo insight.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Um filtro rápido — e o insight é a chave aqui."]),
        seg("1:00–8:00", "Os 3 quadros (mostrar slide 8)", [
          "TOC: obsessões/compulsões ego-distônicas, insight preservado.",
          "Transtorno de personalidade: perfeccionismo ego-sintônico, a pessoa não vê problema.",
          "Ansiedade generalizada: preocupação difusa, sem rituais compulsivos específicos.",
        ]),
        seg("8:00–10:30", "Por que o insight muda tudo", ["Insight preservado é bom prognóstico pra EPR; insight pobre pede reavaliação da abordagem."]),
        seg("10:30–12:00", "Fechamento", [{ fala: "Próxima aula: os instrumentos que confirmam essa leitura com dado." }]),
      ],
    },
    {
      n: 6, titulo: "Os 3 instrumentos de avaliação", duracao: "12 min", slides: "9",
      objetivo: "Saber quando usar Y-BOCS, DOCS e OCI-R.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três escalas, três finalidades diferentes."]),
        seg("1:00–4:30", "Y-BOCS", ["Padrão-ouro, aplicada pelo clínico.", "Mede gravidade de obsessões e compulsões separadamente."]),
        seg("4:30–7:30", "DOCS", ["Mede as dimensões/subtipos.", "Útil pra planejar a hierarquia de exposição."]),
        seg("7:30–10:00", "OCI-R", ["Autorrelato rápido.", "Bom pra rastreio inicial e acompanhamento."]),
        seg("10:00–12:00", "Como escolher na prática", ["Y-BOCS pra diagnóstico formal; DOCS pra planejar exposição; OCI-R pra acompanhamento rápido.", { fala: "Próxima aula: colocamos tudo em prática — psicoeducação e mapeamento do ciclo." }]),
      ],
    },
    {
      n: 7, titulo: "Protocolo — psicoeducação e mapeamento", duracao: "14 min", slides: "10, 11",
      objetivo: "Aplicar os passos 1 e 2 do protocolo com script de psicoeducação e mapeamento do ciclo obsessivo-compulsivo.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["A parte que você vai usar amanhã. Hoje, os 2 primeiros passos."]),
        seg("1:00–2:00", "Visão geral (mostrar slide 10)", ["Psicoeducação → Mapeamento → EPR → Prevenção de recaída."]),
        seg("2:00–7:00", "Passo 1 — Psicoeducação (mostrar slide 11, esquerda)", [{ fala: "Seu cérebro está preso num loop que continua mandando o sinal de que algo está errado, mesmo sem base real." }]),
        seg("7:00–13:00", "Passo 2 — Mapeamento do ciclo (mostrar slide 11, direita)", ["Identifique gatilho, obsessão, compulsão e alívio.", "Desenhe o ciclo junto com o paciente, em voz alta."]),
        seg("13:00–14:00", "Fechamento", [{ fala: "Próxima aula: Exposição com Prevenção de Resposta e prevenção de recaída." }]),
      ],
    },
    {
      n: 8, titulo: "Protocolo — EPR e prevenção de recaída", duracao: "14 min", slides: "12",
      objetivo: "Montar uma hierarquia de EPR e planejar a prevenção de recaída.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Hoje fechamos o protocolo com o núcleo do tratamento: EPR."]),
        seg("1:00–7:00", "Passo 3 — EPR (mostrar slide 12, esquerda)", ["Percorra o exemplo da hierarquia.", "Sempre resistindo à compulsão, nunca evitando a exposição.", "Sobe um degrau só quando o nível de ansiedade cai."]),
        seg("7:00–13:00", "Passo 4 — Prevenção de recaída (mostrar slide 12, direita)", ["Generalizar ganhos pra outras situações e dimensões.", "Trabalhar tolerância à incerteza residual — TOC raramente \"zera\" 100%.", "Revisar o plano periodicamente."]),
        seg("13:00–14:00", "Fechamento", [{ fala: "Protocolo completo. Próxima aula: um caso real e os critérios de quando encaminhar." }]),
      ],
    },
    {
      n: 9, titulo: "Estudo de caso, encaminhamento e recap", duracao: "15 min", slides: "13, 14, 15",
      objetivo: "Integrar mecanismo, instrumento e protocolo num caso completo, com ênfase no insight como critério clínico.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Última aula do módulo, e do Bloco 4 inteiro. Caso completo e os limites da terapia sozinha."]),
        seg("1:00–7:00", "Estudo de caso — Marcelo (mostrar slide 13)", ["Leia a vinheta com calma.", "Percorra as 3 perguntas de discussão.", "Convide o aluno a pausar e responder por escrito."]),
        seg("7:00–11:00", "Quando encaminhar (mostrar slide 14)", ["Percorra os 4 critérios — ênfase em insight pobre e necessidade de avaliação farmacológica."]),
        seg("11:00–14:00", "Recapitulando o módulo (mostrar slide 15)", ["Retome os 4 pontos-chave.", "Reforce a anatomia de 5 passos, presente em todos os 8 protocolos do Bloco 4."]),
        seg("14:00–15:00", "Fechamento do módulo e do bloco", [{ fala: "Agora é hora dos exercícios e da avaliação. Com isso, fechamos os 8 protocolos do Bloco 4 — o próximo passo da formação é o Bloco 5, de integração." }]),
      ],
    },
  ];

  const totalMin = 12 + 10 + 10 + 10 + 12 + 12 + 14 + 14 + 15;

  const children = [
    ...doc.capa(KICKER, "Roteiro de Aulas — TOC", "Módulo dividido em 9 vídeo-aulas de 10 a 15 minutos, seguindo os slides já produzidos. Cada aula tem roteiro cronometrado, pronto pra gravação."),
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

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", `${RODAPE_DOC} — Roteiro de Aulas`, children), "Modulo-4.8-Roteiro-Aulas.docx");
}

// ============================================================
Promise.resolve()
  .then(construirDeck)
  .then(construirExercicios)
  .then(construirProva)
  .then(construirRoteiro)
  .then(() => console.log("TUDO PRONTO"))
  .catch((e) => { console.error(e); process.exit(1); });

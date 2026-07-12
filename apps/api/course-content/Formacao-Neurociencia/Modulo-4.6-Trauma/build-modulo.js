const deck = require("../_lib/lib-deck.js");
const doc = require("../_lib/lib-doc.js");

const MOD = "4.6";
const NOME = "Trauma e TEPT";
const RODAPE_DECK = `${NOME} — Módulo ${MOD}`;
const RODAPE_DOC = `Módulo ${MOD} — ${NOME}`;
const KICKER = "MÓDULO 4.6 · PROTOCOLOS CLÍNICOS DIRETOS AO PONTO";

// ============================================================
// 1) SLIDE DECK
// ============================================================
function construirDeck() {
  const pres = deck.novaApresentacao(`${NOME} — Da Neurociência ao Protocolo Clínico`);

  deck.slideTitulo(pres, {
    moduloLabel: `Módulo ${MOD} · Protocolos Clínicos Diretos ao Ponto`,
    titulo: "Trauma e TEPT",
    subtitulo: "Da neurociência da memória traumática ao protocolo clínico",
    passos: ["Mecanismo", "Sinais", "Instrumento", "Protocolo", "Encaminhamento"],
  });

  deck.slideRoteiro(pres, {
    rodape: RODAPE_DECK, pageNum: 2,
    cards: [
      { titulo: "Mecanismo", desc: "Por que a memória traumática parece \"presente\"" },
      { titulo: "Sinais", desc: "O que avisa que o quadro está se instalando" },
      { titulo: "Instrumento", desc: "PCL-5, IES-R e CAPS-5 na prática" },
      { titulo: "Protocolo", desc: "4 passos, prontos pra sessão" },
      { titulo: "Encaminhamento", desc: "Quando isso não basta" },
    ],
  });

  deck.slideHook(pres, {
    rodape: RODAPE_DECK, pageNum: 3,
    frase: "Num flashback, o cérebro não está lembrando do trauma. Ele está revivendo — porque a memória nunca foi arquivada como \"passado\".",
    apoio: "Essa distinção muda tudo na psicoeducação: o paciente não está \"exagerando\" nem \"preso ao passado\" por escolha — é um erro de arquivamento da memória.",
  });

  deck.slideCircuito(pres, {
    rodape: RODAPE_DECK, pageNum: 4,
    titulo: "O cérebro na memória traumática",
    regioes: [
      { label: "Amígdala (hipervigilante, lê neutro como ameaça)", rx: 0.24, ry: 0.64, color: deck.TERRA, d: 0.4 },
      { label: "Hipocampo (falha em contextualizar no tempo)", rx: 0.58, ry: 0.64, color: deck.NAVY_TINT, d: 0.36 },
      { label: "Córtex pré-frontal medial (hipoativo, não \"desliga\" o alarme)", rx: 0.18, ry: 0.20, color: deck.NAVY, d: 0.5 },
      { label: "Tronco cerebral (resposta de congelamento/dissociação)", rx: 0.60, ry: 0.26, color: deck.TERRA_TINT, d: 0.32 },
    ],
    notas: [
      "Sem contextualização temporal do hipocampo, a memória fica \"solta\" — um gatilho a traz de volta como se fosse agora.",
      "O córtex pré-frontal medial normalmente inibe a amígdala; no trauma, essa inibição fica enfraquecida.",
      "Em ameaça extrema, o tronco cerebral pode gerar congelamento — não é escolha, é resposta automática.",
    ],
  });

  deck.slideCadeia(pres, {
    rodape: RODAPE_DECK, pageNum: 5,
    titulo: "Do evento ao flashback",
    elos: [
      { titulo: "Evento traumático", desc: "Amígdala codifica a experiência com intensidade extrema" },
      { titulo: "Falha de contextualização", desc: "Hipocampo não consegue marcar a memória como \"passado\"" },
      { titulo: "Memória fragmentada", desc: "Fica armazenada como sensação, não como narrativa organizada" },
      { titulo: "Gatilho dispara revivência", desc: "Um estímulo semelhante reativa a memória como se fosse presente" },
    ],
    notaFinal: "É por isso que \"só lembrar\" não é o problema — o problema é a memória nunca ter sido devidamente arquivada como algo que já passou.",
  });

  deck.slideCategorias(pres, {
    rodape: RODAPE_DECK, pageNum: 6,
    titulo: "3 clusters de sintomas do TEPT",
    categorias: [
      { titulo: "Reexperimentação", desc: "Flashbacks, pesadelos, memórias intrusivas do evento", color: deck.TERRA },
      { titulo: "Evitação", desc: "De lugares, pessoas ou pensamentos associados ao trauma", color: deck.NAVY },
      { titulo: "Hiperexcitação", desc: "Hipervigilância, sobressalto exagerado, irritabilidade", color: deck.NAVY_TINT },
    ],
    notaFinal: "O diagnóstico de TEPT exige sintomas presentes nos 3 clusters, não apenas em um.",
  });

  deck.slideSinais(pres, {
    rodape: RODAPE_DECK, pageNum: 7,
    titulo: "O que avisa que o quadro está se instalando",
    itens: [
      { titulo: "Cognitivo", desc: "Pensamentos intrusivos, dificuldade de concentração" },
      { titulo: "Físico", desc: "Sobressalto exagerado, tensão constante, alterações de sono" },
      { titulo: "Comportamental", desc: "Evitação de lugares, pessoas ou situações associadas ao evento" },
      { titulo: "Relacional", desc: "Distanciamento emocional, dificuldade de confiar, irritabilidade" },
    ],
  });

  deck.slideDiferencial(pres, {
    rodape: RODAPE_DECK, pageNum: 8,
    titulo: "Diagnóstico diferencial rápido",
    cards: [
      { titulo: "TEPT", desc: "Sintomas presentes há mais de 1 mês, prejuízo funcional claro, os 3 clusters presentes" },
      { titulo: "Estresse Agudo", desc: "Sintomas semelhantes, mas com menos de 1 mês — pode remitir espontaneamente" },
      { titulo: "Luto traumático", desc: "Perda como evento central, mistura elementos de luto e trauma" },
    ],
  });

  deck.slideInstrumentos(pres, {
    rodape: RODAPE_DECK, pageNum: 9,
    titulo: "Três instrumentos, três finalidades",
    instrumentos: [
      { sigla: "PCL-5", nome: "PTSD Checklist for DSM-5", desc: "Autorrelato de 20 itens. Bom pra rastreio e acompanhamento de evolução." },
      { sigla: "IES-R", nome: "Impact of Event Scale-Revised", desc: "Mede intrusão, evitação e hiperexcitação especificamente." },
      { sigla: "CAPS-5", nome: "Clinician-Administered PTSD Scale", desc: "Entrevista estruturada aplicada pelo clínico. Padrão-ouro diagnóstico." },
    ],
  });

  deck.slideProtocoloOverview(pres, {
    rodape: RODAPE_DECK, pageNum: 10,
    titulo: "Do mecanismo à intervenção: 4 passos",
    passos: [
      { titulo: "Estabilização", desc: "Segurança e regulação emocional básica, antes de tudo" },
      { titulo: "Psicoeducação\ndo mecanismo", desc: "Nomear a hipervigilância e o erro de arquivamento da memória" },
      { titulo: "Processamento", desc: "Técnicas especializadas — exige treinamento específico" },
      { titulo: "Reintegração", desc: "Retomada gradual de atividades evitadas" },
    ],
    notaFinal: "Nas próximas 2 telas, cada passo ganha um exemplo pronto pra levar pra sessão.",
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 11,
    titulo: "Passos 1 e 2, na prática",
    colunas: [
      {
        numero: 1, titulo: "Estabilização",
        bullets: ["Antes de qualquer processamento do trauma, construa segurança básica", "Técnicas de grounding e regulação emocional (respiração, ancoragem sensorial)", "Só avance pro processamento quando o paciente tiver recursos mínimos de regulação"],
      },
      {
        numero: 2, titulo: "Psicoeducação do mecanismo",
        fala: "“Num flashback, seu cérebro não está lembrando — está revivendo, porque essa memória nunca foi arquivada como passado. Isso tem explicação biológica, não é fraqueza.”",
        bullets: ["Reduz o medo do próprio sintoma (\"estou enlouquecendo?\")"],
      },
    ],
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 12,
    titulo: "Passos 3 e 4, na prática",
    colunas: [
      {
        numero: 3, titulo: "Processamento",
        bullets: ["Técnicas como EMDR, exposição prolongada ou TCC focada em trauma", "Exigem treinamento especializado — não são pra aplicar sem formação específica", "Se você não tem essa formação, esse é o momento de considerar encaminhamento"],
      },
      {
        numero: 4, titulo: "Reintegração",
        bullets: ["Retomada gradual de atividades evitadas, no ritmo do paciente", "Prevenção de recaída: identificar gatilhos residuais", "Celebrar retomadas pequenas — elas reconstroem a sensação de segurança"],
      },
    ],
  });

  deck.slideCaso(pres, {
    rodape: RODAPE_DECK, pageNum: 13,
    vinheta: "Beatriz, 27 anos, sofreu um assalto à mão armada há 4 meses. Desde então, tem pesadelos frequentes, evita passar pela rua onde ocorreu o assalto, se sobressalta com sons altos repentinos, e relata \"reviver\" o momento quando vê algo parecido com a arma usada. PCL-5 = 45.",
    perguntas: [
      "Que clusters de sintomas do TEPT aparecem na vinheta?",
      "Interprete o PCL-5 = 45.",
      "Qual deveria ser o primeiro passo do protocolo com Beatriz, antes de qualquer processamento do trauma?",
    ],
  });

  deck.slideEncaminhamento(pres, {
    rodape: RODAPE_DECK, pageNum: 14,
    criterios: [
      "Dissociação severa — amnésia dissociativa ou despersonalização incapacitante",
      "Comorbidade com uso de substâncias ativo",
      "Ideação suicida presente",
      "Necessidade de terapia especializada em processamento de trauma (ex: EMDR) quando o terapeuta não tem essa formação",
    ],
  });

  deck.slideRecap(pres, {
    rodape: RODAPE_DECK, pageNum: 15,
    pontos: [
      "No trauma, a memória não foi arquivada como \"passado\" — por isso o flashback parece presente",
      "Reexperimentação, evitação e hiperexcitação são os 3 clusters centrais do TEPT",
      "PCL-5, IES-R e CAPS-5 cobrem rastreio, medição específica e diagnóstico padrão-ouro",
      "O protocolo de 4 passos começa em estabilização — processamento exige treinamento especializado",
    ],
    proximoTexto: "Próximo: exercícios práticos e avaliação do Módulo 4.6 →",
  });

  return pres.writeFile({ fileName: "Modulo-4.6-Trauma.pptx" });
}

// ============================================================
// 2) EXERCÍCIOS
// ============================================================
function construirExercicios() {
  const children = [
    ...doc.capa(KICKER, `Exercícios — ${NOME}`, "Resolva individualmente antes da sessão de supervisão. O objetivo é testar sua leitura do mecanismo e do protocolo antes de comparar com a discussão em grupo — não há problema em errar."),

    doc.exNum(1, "O mecanismo, em suas palavras"),
    doc.pergunta(1, "Explique em até 3 frases, sem jargão técnico, por que um flashback faz a pessoa sentir que o trauma está acontecendo agora."),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Cite os 3 clusters de sintomas do TEPT e dê um exemplo de comportamento observável pra cada um."),
    ...doc.linhaResposta(2),

    doc.exNum(2, "Leitura de escala"),
    doc.vinhetaBox("Paciente pontua 38 no PCL-5."),
    doc.pergunta(1, "O que essa pontuação sugere sobre a gravidade do quadro?"),
    ...doc.linhaResposta(1),
    doc.pergunta(2, "Isso muda a urgência do encaminhamento pra processamento especializado? Por quê?"),
    ...doc.linhaResposta(1),

    doc.exNum(3, "Diagnóstico diferencial"),
    doc.vinhetaBox("Tiago sofreu um acidente de carro há 3 semanas. Relata pesadelos e sobressalto, mas diz que os sintomas já estão diminuindo naturalmente."),
    doc.pergunta(1, "TEPT ou Transtorno de Estresse Agudo? Justifique com elementos da vinheta."),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Isso muda sua conduta clínica nesse momento? Como?"),
    ...doc.linhaResposta(1),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),

    doc.exNum(4, "Estabilização antes do processamento"),
    doc.p("Para o caso de Beatriz (vinheta da aula), liste 3 técnicas de estabilização/grounding que você usaria antes de qualquer processamento do trauma."),
    doc.tabelaSimples(["Nº", "Técnica", "Objetivo"], [["1", "", ""], ["2", "", ""], ["3", "", ""]], [700, 4200, 4450]),

    doc.exNum(5, "Caso integrado — Beatriz"),
    doc.vinhetaBox("Beatriz, 27 anos, sofreu um assalto à mão armada há 4 meses. Tem pesadelos frequentes, evita a rua do assalto, se sobressalta com sons altos, e revive o momento ao ver algo parecido com a arma. PCL-5 = 45."),
    doc.pergunta(1, "Escreva a frase de psicoeducação que você usaria com Beatriz."),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Em que ponto do processo você consideraria encaminhar Beatriz pra um especialista em EMDR (se você não tiver essa formação)?"),
    ...doc.linhaResposta(2),
    doc.pergunta(3, "Sugira uma atividade de reintegração (passo 4) adequada, considerando a evitação da rua do assalto."),
    ...doc.linhaResposta(2),
  ];

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-4.6-Exercicios.docx");
}

// ============================================================
// 3) AVALIAÇÃO
// ============================================================
function construirProva() {
  const objetivas = [
    ["Na hipervigilância do TEPT, a amígdala tende a:", ["Ficar menos reativa a qualquer estímulo", "Interpretar estímulos ambíguos/neutros como ameaça", "Parar de funcionar completamente", "Não ter relação alguma com o quadro"]],
    ["O hipocampo no trauma:", ["Contextualiza perfeitamente a memória no tempo", "Falha em consolidar a memória de forma contextualizada, deixando-a fragmentada", "Aumenta de tamanho instantaneamente", "Não participa do processo de memória"]],
    ["Os 3 clusters de sintomas do TEPT são:", ["Luta, fuga, paralisia", "Reexperimentação, evitação, hiperexcitação", "Ansiedade, depressão, estresse", "Compulsão, tolerância, abstinência"]],
    ["Instrumento considerado padrão-ouro, aplicado pelo clínico:", ["PCL-5", "IES-R", "CAPS-5", "BDI-II"]],
    ["O PCL-5 é:", ["Uma entrevista estruturada aplicada pelo clínico", "Um checklist de autorrelato de 20 itens", "Um exame de neuroimagem", "Uma escala exclusiva pra crianças"]],
    ["Por que flashbacks fazem a pessoa sentir que o trauma está acontecendo \"agora\"?", ["Por escolha consciente do paciente", "Porque o hipocampo não contextualizou a memória como passada", "Porque a pessoa está mentindo sobre o sintoma", "Não há explicação neurobiológica conhecida"]],
    ["O primeiro passo do protocolo de trauma é:", ["Processamento direto do evento traumático", "Estabilização — segurança e regulação emocional básica antes de qualquer processamento", "Exposição imediata e intensa ao gatilho", "Confrontação direta do agressor"]],
    ["Técnicas de processamento de trauma (passo 3) tipicamente:", ["Podem ser aplicadas por qualquer profissional sem treinamento adicional", "Exigem treinamento especializado (ex: EMDR, exposição prolongada)", "Nunca devem ser usadas em nenhum contexto", "Substituem completamente a estabilização"]],
    ["É critério de encaminhamento:", ["O paciente relatar um pesadelo isolado uma vez", "Dissociação severa ou comorbidade com uso de substâncias ativo", "O trauma ter ocorrido há mais de 5 anos", "O paciente chorar ao relatar o evento"]],
    ["Evitação, como cluster de sintomas do TEPT, inclui:", ["Buscar ativamente reviver o trauma", "Evitar lugares, pessoas ou pensamentos associados ao evento traumático", "Aumento de interesse social generalizado", "Melhora consistente do sono"]],
  ];
  const gabaritoObjetivas = ["b", "b", "b", "c", "b", "b", "b", "b", "b", "b"];

  const children = [
    ...doc.capa(KICKER, `Avaliação — ${NOME}`, `Avaliação formativa de encerramento do Módulo ${MOD}.`),
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
    doc.vinhetaBox("Diego, 35 anos, bombeiro, presenciou a morte de um colega em um incêndio há 6 meses. Desde então, evita qualquer conversa sobre o ocorrido, tem pesadelos recorrentes, se sobressalta com o som de sirenes (mesmo fora do trabalho), e relata sensação de estar \"sempre em alerta\". Nega uso de substâncias e ideação suicida. PCL-5 = 52."),
    new doc.Paragraph({ spacing: { before: 240 }, children: [new doc.TextRun({ text: "Com base no protocolo estudado, responda:", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    new doc.Paragraph({ spacing: { before: 220, after: 40 }, children: [new doc.TextRun({ text: "a) (10 pts) Que clusters de sintomas do TEPT aparecem na vinheta de Diego?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "b) (10 pts) Interprete o PCL-5 = 52 — o que esse escore indica sobre a gravidade?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(1),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "c) (10 pts) Descreva a frase de psicoeducação que você usaria com Diego sobre a hipervigilância a sirenes.", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "d) (10 pts) Diego é bombeiro e pode ser exposto a sirenes rotineiramente no trabalho. Isso muda a prioridade dos passos do protocolo? Como?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    new doc.Paragraph({ spacing: { after: 40 }, children: [new doc.TextRun({ text: "USO EXCLUSIVO DO INSTRUTOR — remover antes de aplicar a prova", bold: true, color: doc.TERRA, font: doc.FONT, size: 20 })] }),
    doc.tituloH1("Gabarito"),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 1 — Questões objetivas", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 200 }, children: [new doc.TextRun({ text: gabaritoObjetivas.map((r, i) => `${i + 1}-${r}`).join("   ·   "), font: doc.FONT, size: 22, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 2 — Critério de correção da questão de caso", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "a) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Reexperimentação (pesadelos), evitação (evita conversar sobre o evento) e hiperexcitação (sobressalto a sirenes, \"sempre em alerta\").", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "b) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "PCL-5 = 52 indica sintomas muito severos de TEPT, bem acima do ponto de corte diagnóstico.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "c) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Espera-se nomear que a amígdala está hipervigilante e generalizou a sirene como sinal de perigo, mesmo fora do contexto original — não é exagero, é um mecanismo de sobrevivência mal calibrado.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "d) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Sim — a exposição ocupacional recorrente reforça o gatilho antes mesmo de qualquer processamento, então estabilização e recursos de regulação em tempo real (durante o trabalho) ganham prioridade adicional, e a articulação com a corporação sobre afastamento/adaptação pode ser necessária.", font: doc.FONT, size: 21, color: doc.INK })] }),
  );

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-4.6-Avaliacao.docx");
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
      n: 1, titulo: "Por que o cérebro revive, não lembra", duracao: "12 min", slides: "1, 2, 3, 4",
      objetivo: "Sair sabendo explicar por que flashbacks parecem presentes, não passados.",
      segmentos: [
        seg("0:00–0:45", "Abertura (gancho)", [{ fala: "Num flashback, o cérebro não está lembrando do trauma. Ele está revivendo — porque a memória nunca foi arquivada como passado." }]),
        seg("0:45–2:00", "Por que isso importa clinicamente", ["Tira o paciente do \"estou enlouquecendo\" ou \"não devia mais me afetar\".", "Isso é o Passo 1 da anatomia de todo protocolo do curso: Mecanismo."]),
        seg("2:00–8:00", "O cérebro na memória traumática (mostrar slide 4)", [
          "Amígdala hipervigilante lê estímulos neutros como ameaça.",
          "Hipocampo falha em contextualizar a memória no tempo.",
          "Córtex pré-frontal medial não consegue \"desligar\" o alarme.",
          "Tronco cerebral pode gerar congelamento — resposta automática, não escolha.",
        ]),
        seg("8:00–10:30", "Como levar isso pra sessão", [{ fala: "Num flashback, seu cérebro não está lembrando — está revivendo, porque essa memória nunca foi arquivada como passado." }]),
        seg("10:30–12:00", "Fechamento", [{ fala: "Próxima aula: a cadeia completa, do evento traumático ao flashback." }]),
      ],
    },
    {
      n: 2, titulo: "Do evento ao flashback", duracao: "10 min", slides: "5",
      objetivo: "Explicar a cadeia evento–falha de contextualização–memória fragmentada–gatilho.",
      segmentos: [
        seg("0:00–1:00", "Retomada rápida", ["Vimos as estruturas envolvidas. Hoje vemos como o flashback se forma."]),
        seg("1:00–6:30", "A cadeia (mostrar slide 5)", ["Amígdala codifica o evento com intensidade extrema.", "Hipocampo falha em marcar a memória como passado.", "Memória fica armazenada como sensação fragmentada.", "Um gatilho reativa a memória como se fosse presente."]),
        seg("6:30–9:00", "Por que \"só lembrar\" não é o problema", ["O problema é a memória nunca ter sido devidamente arquivada como algo que já passou."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: os 3 clusters de sintomas do TEPT." }]),
      ],
    },
    {
      n: 3, titulo: "Os 3 clusters de sintomas", duracao: "10 min", slides: "6",
      objetivo: "Reconhecer reexperimentação, evitação e hiperexcitação como os 3 clusters do TEPT.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três clusters — o diagnóstico exige os três presentes."]),
        seg("1:00–7:00", "Reexperimentação, evitação, hiperexcitação (mostrar slide 6)", [
          "Reexperimentação: flashbacks, pesadelos, memórias intrusivas.",
          "Evitação: de lugares, pessoas ou pensamentos associados.",
          "Hiperexcitação: hipervigilância, sobressalto exagerado, irritabilidade.",
        ]),
        seg("7:00–9:00", "Aplicação prática", ["Pergunte especificamente sobre cada cluster — paciente pode minimizar um e admitir outro com facilidade."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: os sinais que avisam que o quadro está se instalando." }]),
      ],
    },
    {
      n: 4, titulo: "Sinais de alerta", duracao: "10 min", slides: "7",
      objetivo: "Reconhecer sinais precoces do quadro traumático se instalando.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Reconhecer cedo ajuda a diferenciar reação aguda normal de quadro que precisa de intervenção estruturada."]),
        seg("1:00–7:30", "As 4 categorias (mostrar slide 7)", [
          "Cognitivo: pensamentos intrusivos, dificuldade de concentração.",
          "Físico: sobressalto exagerado, tensão constante.",
          "Comportamental: evitação de lugares/situações associadas.",
          "Relacional: distanciamento emocional, dificuldade de confiar.",
        ]),
        seg("7:30–9:00", "Por que isso importa", ["Esses sinais orientam quando e como iniciar a estabilização."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: como diferenciar TEPT, estresse agudo e luto traumático." }]),
      ],
    },
    {
      n: 5, titulo: "Diagnóstico diferencial rápido", duracao: "12 min", slides: "8",
      objetivo: "Diferenciar TEPT, transtorno de estresse agudo e luto traumático.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Um filtro rápido — o critério de tempo importa muito aqui."]),
        seg("1:00–8:00", "Os 3 quadros (mostrar slide 8)", [
          "TEPT: sintomas há mais de 1 mês, os 3 clusters presentes.",
          "Estresse agudo: sintomas semelhantes, mas com menos de 1 mês.",
          "Luto traumático: perda como evento central, mistura de luto e trauma.",
        ]),
        seg("8:00–10:30", "Por que o critério de tempo importa", ["Estresse agudo pode remitir espontaneamente — nem todo caso precisa do protocolo completo de imediato."]),
        seg("10:30–12:00", "Fechamento", [{ fala: "Próxima aula: os 3 instrumentos que confirmam essa leitura com dado." }]),
      ],
    },
    {
      n: 6, titulo: "Os 3 instrumentos de avaliação", duracao: "12 min", slides: "9",
      objetivo: "Saber quando usar PCL-5, IES-R e CAPS-5.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três instrumentos, três finalidades diferentes."]),
        seg("1:00–4:30", "PCL-5", ["20 itens, autorrelato.", "Bom pra rastreio e acompanhamento de evolução."]),
        seg("4:30–7:30", "IES-R", ["Mede intrusão, evitação e hiperexcitação especificamente."]),
        seg("7:30–10:00", "CAPS-5", ["Entrevista estruturada aplicada pelo clínico.", "Padrão-ouro diagnóstico."]),
        seg("10:00–12:00", "Como escolher na prática", ["PCL-5 pra triagem inicial; CAPS-5 quando precisar de diagnóstico formal.", { fala: "Próxima aula: colocamos tudo em prática — estabilização e psicoeducação." }]),
      ],
    },
    {
      n: 7, titulo: "Protocolo — estabilização e psicoeducação", duracao: "14 min", slides: "10, 11",
      objetivo: "Aplicar os passos 1 e 2 do protocolo com técnicas de estabilização e script de psicoeducação.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["A parte que você vai usar amanhã. Hoje, os 2 primeiros passos."]),
        seg("1:00–2:00", "Visão geral (mostrar slide 10)", ["Estabilização → Psicoeducação → Processamento → Reintegração."]),
        seg("2:00–7:00", "Passo 1 — Estabilização (mostrar slide 11, esquerda)", ["Segurança e regulação emocional básica antes de tudo.", "Técnicas de grounding e ancoragem sensorial.", "Só avance quando o paciente tiver recursos mínimos de regulação."]),
        seg("7:00–13:00", "Passo 2 — Psicoeducação (mostrar slide 11, direita)", [{ fala: "Num flashback, seu cérebro não está lembrando — está revivendo, porque essa memória nunca foi arquivada como passado." }]),
        seg("13:00–14:00", "Fechamento", [{ fala: "Próxima aula: processamento e reintegração — e quando isso exige encaminhamento." }]),
      ],
    },
    {
      n: 8, titulo: "Protocolo — processamento e reintegração", duracao: "14 min", slides: "12",
      objetivo: "Reconhecer os limites do processamento sem treinamento especializado e planejar reintegração gradual.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Hoje fechamos o protocolo — inclusive reconhecendo os limites da nossa própria formação."]),
        seg("1:00–7:00", "Passo 3 — Processamento (mostrar slide 12, esquerda)", ["EMDR, exposição prolongada, TCC focada em trauma — exigem treinamento especializado.", "Sem essa formação, esse é o momento de considerar encaminhamento."]),
        seg("7:00–13:00", "Passo 4 — Reintegração (mostrar slide 12, direita)", ["Retomada gradual de atividades evitadas, no ritmo do paciente.", "Identificar gatilhos residuais.", "Celebrar retomadas pequenas — reconstroem a sensação de segurança."]),
        seg("13:00–14:00", "Fechamento", [{ fala: "Protocolo completo. Próxima aula: um caso real e os critérios de quando encaminhar." }]),
      ],
    },
    {
      n: 9, titulo: "Estudo de caso, encaminhamento e recap", duracao: "15 min", slides: "13, 14, 15",
      objetivo: "Integrar mecanismo, instrumento e protocolo num caso completo, com ênfase nos limites da atuação sem formação especializada.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Última aula do módulo. Caso completo e os limites da terapia sem formação especializada."]),
        seg("1:00–7:00", "Estudo de caso — Beatriz (mostrar slide 13)", ["Leia a vinheta com calma.", "Percorra as 3 perguntas de discussão.", "Convide o aluno a pausar e responder por escrito."]),
        seg("7:00–11:00", "Quando encaminhar (mostrar slide 14)", ["Percorra os 4 critérios — ênfase em dissociação severa e necessidade de formação especializada."]),
        seg("11:00–14:00", "Recapitulando o módulo (mostrar slide 15)", ["Retome os 4 pontos-chave.", "Reforce a anatomia de 5 passos, comum a todo protocolo do curso."]),
        seg("14:00–15:00", "Fechamento do módulo", [{ fala: "Agora é hora dos exercícios e da avaliação. Te vejo no próximo protocolo." }]),
      ],
    },
  ];

  const totalMin = 12 + 10 + 10 + 10 + 12 + 12 + 14 + 14 + 15;

  const children = [
    ...doc.capa(KICKER, `Roteiro de Aulas — ${NOME}`, "Módulo dividido em 9 vídeo-aulas de 10 a 15 minutos, seguindo os slides já produzidos. Cada aula tem roteiro cronometrado, pronto pra gravação."),
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

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", `${RODAPE_DOC} — Roteiro de Aulas`, children), "Modulo-4.6-Roteiro-Aulas.docx");
}

// ============================================================
Promise.resolve()
  .then(construirDeck)
  .then(construirExercicios)
  .then(construirProva)
  .then(construirRoteiro)
  .then(() => console.log("TUDO PRONTO"))
  .catch((e) => { console.error(e); process.exit(1); });

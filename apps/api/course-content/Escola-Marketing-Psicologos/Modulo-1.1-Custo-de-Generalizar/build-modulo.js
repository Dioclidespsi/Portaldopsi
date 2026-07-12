const deck = require("../_lib/lib-deck.js");
const doc = require("../_lib/lib-doc.js");

const MOD = "1.1";
const NOME = "O Custo de Generalizar";
const RODAPE_DECK = `O Custo de Generalizar — Módulo ${MOD}`;
const RODAPE_DOC = `Módulo ${MOD} — O Custo de Generalizar`;
const KICKER = "MÓDULO 1.1 · FUNDAMENTOS DE POSICIONAMENTO E NICHO";
const MARCA = "Escola de Marketing para Psicólogos — by Dioclides";

// ============================================================
// 1) SLIDE DECK
// ============================================================
function construirDeck() {
  const pres = deck.novaApresentacao(`${NOME} — Por Que Atender Todo Mundo Custa Caro`);

  deck.slideTitulo(pres, {
    moduloLabel: `Módulo ${MOD} · Bloco 1 · Posicionamento e Nicho`,
    titulo: "O Custo de Generalizar",
    subtitulo: "O raciocínio por trás da especialização — e por que atender todo mundo atrapalha mais do que ajuda",
    rodapeMarca: MARCA,
    passos: ["O mito", "O custo", "Especializar", "Sinais", "Aplicação"],
  });

  deck.slideRoteiro(pres, {
    rodape: RODAPE_DECK, pageNum: 2,
    cards: [
      { titulo: "O mito de \"atendo tudo\"", desc: "Por que essa frase parece segura, mas custa mais do que parece" },
      { titulo: "O custo invisível", desc: "4 formas como a generalização atrapalha, sem ser óbvio" },
      { titulo: "Por que especializar funciona", desc: "3 formas possíveis de recortar sua especialidade" },
      { titulo: "Sinais de generalização", desc: "Como saber se você ainda está no modo \"atendo tudo\"" },
      { titulo: "Aplicação prática", desc: "Encontrando um recorte inicial de especialidade" },
    ],
  });

  deck.slideHook(pres, {
    rodape: RODAPE_DECK, pageNum: 3,
    frase: "\"Atendo ansiedade, depressão, relacionamento e o que mais aparecer\" parece uma forma de não perder nenhum paciente — na prática, é a forma mais eficiente de não ser lembrado por ninguém.",
    apoio: "Este módulo abre a Escola de Marketing com a decisão que sustenta todas as outras: pra quem, exatamente, você fala.",
  });

  deck.slideCircuito(pres, {
    rodape: RODAPE_DECK, pageNum: 4,
    titulo: "4 razões pelas quais generalizar custa caro",
    regioes: [
      { label: "Comunicação genérica: difícil resumir em uma frase", rx: 0.20, ry: 0.22, color: deck.NAVY, d: 0.5 },
      { label: "Concorrência ampla: disputa com todo o mercado ao mesmo tempo", rx: 0.22, ry: 0.62, color: deck.TERRA, d: 0.4 },
      { label: "Menor percepção de expertise em qualquer tema específico", rx: 0.60, ry: 0.60, color: deck.NAVY_TINT, d: 0.36 },
      { label: "Boca a boca fraco: difícil indicar \"aquele psicólogo que atende tudo\"", rx: 0.58, ry: 0.24, color: deck.TERRA_TINT, d: 0.36 },
    ],
    notas: [
      "Nenhuma dessas 4 razões é sobre perder pacientes — são sobre o esforço extra necessário pra conquistar cada um deles.",
      "Quanto mais específico o recorte, mais fácil se torna toda a comunicação construída nos blocos seguintes deste curso.",
    ],
  });

  deck.slideCadeia(pres, {
    rodape: RODAPE_DECK, pageNum: 5,
    titulo: "Do \"atendo tudo\" ao \"não lembro seu nome\"",
    elos: [
      { titulo: "Comunicação genérica", desc: "Sem foco claro em nenhum tema ou público específico" },
      { titulo: "Difícil diferenciação", desc: "Impossível dizer o que te torna diferente de outro generalista" },
      { titulo: "Esquecimento do público", desc: "Ninguém guarda na memória algo que não tem contorno definido" },
      { titulo: "Indicação rara", desc: "Sem recorte claro, fica difícil até pra quem quer indicar você" },
    ],
    notaFinal: "Essa cadeia raramente é percebida de uma vez — ela se acumula devagar, ao longo de meses ou anos de comunicação genérica.",
  });

  deck.slideCategorias(pres, {
    rodape: RODAPE_DECK, pageNum: 6,
    titulo: "3 formas de recortar uma especialidade",
    categorias: [
      { titulo: "Por público", desc: "Adultos jovens, idosos, casais — um recorte de quem você atende", color: deck.NAVY },
      { titulo: "Por demanda", desc: "Ansiedade, luto, TDAH — um recorte do que você trabalha", color: deck.TERRA },
      { titulo: "Por abordagem", desc: "TCC, psicanálise, sistêmica — um recorte de como você trabalha", color: deck.NAVY_TINT },
    ],
    notaFinal: "Não é preciso escolher só uma forma — muitos psicólogos combinam público e demanda num recorte único e específico.",
  });

  deck.slideSinais(pres, {
    rodape: RODAPE_DECK, pageNum: 7,
    titulo: "Sinais de generalização excessiva",
    itens: [
      { titulo: "Bio com muitos temas", desc: "Mais de 5 áreas de atendimento listadas ao mesmo tempo" },
      { titulo: "Especialidade sem frase clara", desc: "Dificuldade de responder \"qual sua especialidade\" rapidamente" },
      { titulo: "Conteúdo sem foco", desc: "Nenhum tema reconhecível ao olhar os últimos posts publicados" },
      { titulo: "Indicações raras", desc: "Quando acontecem, são vagas: \"ele(a) é bom(boa) psicólogo(a)\"" },
    ],
  });

  deck.slideDiferencial(pres, {
    rodape: RODAPE_DECK, pageNum: 8,
    titulo: "3 níveis de especialização",
    cards: [
      { titulo: "Generalista", desc: "\"Atendo qualquer demanda\" — comunicação ampla, sem recorte definido" },
      { titulo: "Semi-especializado", desc: "Um tema principal, mas ainda comunicado de forma pouco específica" },
      { titulo: "Especializado", desc: "Recorte claro, comunicado com precisão em uma única frase" },
    ],
  });

  deck.slideInstrumentos(pres, {
    rodape: RODAPE_DECK, pageNum: 9,
    titulo: "3 perguntas pra encontrar sua especialidade",
    instrumentos: [
      { sigla: "Você gosta?", nome: "Que tema você mais gosta de trabalhar em sessão", desc: "Especializar num tema que cansa não é sustentável a longo prazo." },
      { sigla: "Você domina?", nome: "Que público você atende com mais facilidade e resultado", desc: "Facilidade real, não apenas interesse teórico pelo tema." },
      { sigla: "Você já vê?", nome: "Que resultado mais aparece no seu consultório hoje", desc: "Muitas vezes a especialidade já existe, só falta ser nomeada." },
    ],
  });

  deck.slideProtocoloOverview(pres, {
    rodape: RODAPE_DECK, pageNum: 10,
    titulo: "Encontrando seu recorte: 4 passos",
    passos: [
      { titulo: "Revisar os\núltimos pacientes", desc: "Que temas e perfis mais aparecem na sua prática real" },
      { titulo: "Identificar o\npadrão recorrente", desc: "O que se repete com mais frequência, mesmo sem perceber" },
      { titulo: "Escolher um\nrecorte inicial", desc: "Não precisa ser definitivo — é um ponto de partida" },
      { titulo: "Testar a\ncomunicação", desc: "Por um período, ajustando conforme a resposta do público" },
    ],
    notaFinal: "O recorte inicial não precisa ser perfeito — precisa ser específico o suficiente pra começar a testar.",
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 11,
    titulo: "Passos 1 e 2, na prática",
    colunas: [
      {
        numero: 1, titulo: "Revisar os últimos pacientes",
        bullets: ["Liste os últimos 10 a 15 casos atendidos, sem detalhar informações sigilosas", "Observe idade, demanda principal e contexto de vida, de forma geral"],
      },
      {
        numero: 2, titulo: "Identificar o padrão recorrente",
        fala: "“Olhando essa lista, existe um tema ou perfil que aparece bem mais que os outros?”",
        bullets: ["O padrão muitas vezes já existe na prática, mesmo sem ter sido nomeado antes"],
      },
    ],
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 12,
    titulo: "Passos 3 e 4, na prática",
    colunas: [
      {
        numero: 3, titulo: "Escolher um recorte inicial",
        bullets: ["Use as 3 perguntas do slide 9 pra confirmar se o recorte também é sustentável pra você", "Lembre-se: esse recorte pode e deve ser revisado com o tempo"],
      },
      {
        numero: 4, titulo: "Testar a comunicação",
        bullets: ["Ajuste bio, conteúdo e forma de se apresentar em torno desse recorte por alguns meses", "Observe se a resposta do público (interesse, indicação, agendamento) melhora"],
      },
    ],
  });

  deck.slideCaso(pres, {
    rodape: RODAPE_DECK, pageNum: 13,
    vinheta: "Uma psicóloga recém-formada está montando seu primeiro perfil profissional. Ela pensa em escrever na bio: \"Atendo adolescentes, adultos, casais e idosos, com foco em ansiedade, depressão, luto, autoestima e relacionamentos.\" Ela acredita que quanto mais ampla a lista, maior a chance de atrair pacientes.",
    perguntas: [
      "Que sinais de generalização excessiva (slide 7) essa bio já apresenta?",
      "Usando as 3 formas de recorte do slide 6, como ela poderia reduzir essa lista a um recorte específico?",
      "Que pergunta do slide 9 seria mais útil pra ela responder primeiro, sendo recém-formada?",
    ],
  });

  deck.slideEncaminhamento(pres, {
    rodape: RODAPE_DECK, pageNum: 14,
    titulo: "Quando buscar ajuda especializada",
    criterios: [
      "Dificuldade persistente em identificar um padrão na própria prática: buscar supervisão clínica com esse objetivo específico",
      "Múltiplos recortes parecendo igualmente viáveis: testar um por vez, não todos simultaneamente",
      "Insegurança sobre \"perder pacientes\" ao especializar: revisar o raciocínio deste módulo antes de decidir",
      "Recorte escolhido não gerando resposta após meses de teste: reavaliar com base nos dados reais, não só na intuição"
    ],
  });

  deck.slideRecap(pres, {
    rodape: RODAPE_DECK, pageNum: 15,
    pontos: [
      "Atender todo mundo custa caro em comunicação, diferenciação, percepção de expertise e boca a boca",
      "Especialidade pode ser recortada por público, por demanda ou por abordagem — ou pela combinação dos três",
      "Bio com muitos temas e ausência de frase clara de especialidade são os sinais mais visíveis de generalização",
      "O recorte inicial não precisa ser definitivo — precisa ser específico o suficiente pra começar a testar",
    ],
    proximoTexto: "Próximo: exercícios práticos e avaliação do Módulo 1.1 →",
  });

  return pres.writeFile({ fileName: "Modulo-1.1-Custo-de-Generalizar.pptx" });
}

// ============================================================
// 2) EXERCÍCIOS
// ============================================================
function construirExercicios() {
  const children = [
    ...doc.capa(KICKER, "Exercícios — O Custo de Generalizar", "Resolva individualmente. O objetivo é sair com um primeiro recorte de especialidade pra testar."),

    doc.exNum(1, "As 4 razões pelas quais generalizar custa caro"),
    doc.pergunta(1, "Liste as 4 razões vistas no módulo, com suas palavras."),
    ...doc.linhaResposta(3),

    doc.exNum(2, "As 3 formas de recortar especialidade"),
    doc.tabelaSimples(["Forma", "Exemplo aplicado a você"], [["Por público", ""], ["Por demanda", ""], ["Por abordagem", ""]], [3600, 5550]),

    doc.exNum(3, "As 3 perguntas de especialidade"),
    doc.pergunta(1, "Responda as 3 perguntas do slide 9 pra sua própria prática."),
    ...doc.linhaResposta(4),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),

    doc.exNum(4, "Aplicando os 4 passos"),
    doc.pergunta(1, "Liste (de forma geral, sem detalhes sigilosos) os últimos pacientes atendidos e identifique um padrão recorrente."),
    ...doc.linhaResposta(3),
    doc.pergunta(2, "Com base nisso, escreva um recorte inicial de especialidade, em uma frase."),
    ...doc.linhaResposta(2),

    doc.exNum(5, "Caso integrado — a bio ampla demais"),
    doc.vinhetaBox("Uma psicóloga recém-formada pensa em escrever: \"Atendo adolescentes, adultos, casais e idosos, com foco em ansiedade, depressão, luto, autoestima e relacionamentos.\""),
    doc.pergunta(1, "Que sinais de generalização excessiva essa bio já apresenta?"),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Como ela poderia reduzir essa lista a um recorte específico?"),
    ...doc.linhaResposta(2),
    doc.pergunta(3, "Que pergunta do módulo seria mais útil pra ela responder primeiro, sendo recém-formada?"),
    ...doc.linhaResposta(2),
  ];

  return doc.salvar(doc.paginaDoc("Escola de Marketing para Psicólogos", RODAPE_DOC, children), "Modulo-1.1-Exercicios.docx");
}

// ============================================================
// 3) AVALIAÇÃO
// ============================================================
function construirProva() {
  const objetivas = [
    ["As 4 razões pelas quais generalizar custa caro, segundo o módulo, são:", ["Comunicação genérica, concorrência ampla, menor percepção de expertise, boca a boca fraco", "Alcance, engajamento, agendamento e custo por lead", "Identificação, veracidade, sigilo e comparação", "Feed, Stories, Carrossel e Direct"]],
    ["As 3 formas de recortar uma especialidade, segundo o módulo, são:", ["Por público, por demanda, por abordagem", "Por preço, por localização, por horário", "Por alcance, por engajamento, por conversão", "Por depoimento, por urgência, por comparação"]],
    ["Um sinal de generalização excessiva é:", ["Bio com mais de 5 áreas de atendimento listadas ao mesmo tempo", "Comunicação com recorte claro de público ou demanda", "Conteúdo com tema reconhecível e consistente", "Indicações frequentes e específicas de pacientes"]],
    ["A pergunta \"que resultado mais aparece no seu consultório hoje\" busca:", ["Identificar que a especialidade muitas vezes já existe, só falta ser nomeada", "Substituir a necessidade de revisar os últimos pacientes atendidos", "Ser respondida apenas por profissionais recém-formados", "Definir exclusivamente o valor da sessão"]],
    ["\"Semi-especializado\", segundo a classificação do módulo, se caracteriza por:", ["Um tema principal, mas ainda comunicado de forma pouco específica", "Nenhum recorte de especialidade definido", "Recorte claro comunicado com precisão em uma frase", "Comunicação exclusivamente por indicação de colegas"]],
    ["O passo \"escolher um recorte inicial\" recomenda:", ["Um ponto de partida que não precisa ser definitivo", "Uma decisão permanente, sem possibilidade de ajuste futuro", "Esperar ter certeza absoluta antes de qualquer escolha", "Testar todos os recortes possíveis ao mesmo tempo"]],
    ["Diante de insegurança sobre \"perder pacientes\" ao especializar, o módulo recomenda:", ["Revisar o raciocínio do módulo antes de decidir", "Evitar completamente qualquer forma de especialização", "Aumentar ainda mais a amplitude da comunicação", "Ignorar o raciocínio e manter a generalização por segurança"]],
    ["O recorte de especialidade \"por abordagem\" é exemplificado por:", ["TCC, psicanálise, sistêmica", "Ansiedade, luto, TDAH", "Adultos jovens, idosos, casais", "Preço, localização e horário de atendimento"]],
    ["Diante de recorte escolhido sem resposta após meses de teste, o módulo recomenda:", ["Reavaliar com base nos dados reais, não só na intuição", "Manter o mesmo recorte indefinidamente, sem qualquer ajuste", "Abandonar completamente a ideia de especialização", "Testar todos os recortes possíveis simultaneamente a partir daí"]],
    ["Este módulo abre a Escola de Marketing com qual decisão central?", ["Pra quem, exatamente, você fala", "Qual plataforma de anúncio pago escolher", "Como precificar a primeira sessão", "Quando encaminhar um paciente a outro profissional"]],
  ];
  const gabaritoObjetivas = ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a"];

  const children = [
    ...doc.capa(KICKER, "Avaliação — O Custo de Generalizar", `Avaliação formativa de encerramento do Módulo ${MOD}.`),
    doc.infoBox([
      ["Nota de corte:", "70 de 100 pontos"],
      ["Tempo sugerido:", "25 minutos"],
      ["Composição:", "10 questões objetivas (6 pts cada = 60 pts) + 1 questão de caso (40 pts)"],
      ["Consulta:", "Material da aula permitido; discussão entre colegas, não"],
    ]),
    doc.tituloH1("Parte 1 — Questões objetivas"),
  ];
  objetivas.forEach((q, i) => children.push(...doc.questaoObjetiva(i + 1, q[0], q[1])));

  children.push(
    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    doc.tituloH1("Parte 2 — Questão de caso (40 pontos)"),
    doc.vinhetaBox("Um psicólogo com 5 anos de consultório percebe que a maioria dos seus pacientes são homens entre 30 e 45 anos buscando ajuda com ansiedade relacionada ao trabalho, mas ele nunca comunicou isso claramente — sua bio ainda diz apenas \"Psicólogo Clínico, atendimento para todas as idades\"."),
    new doc.Paragraph({ spacing: { before: 240 }, children: [new doc.TextRun({ text: "Com base no protocolo estudado, responda:", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    new doc.Paragraph({ spacing: { before: 220, after: 40 }, children: [new doc.TextRun({ text: "a) (10 pts) Que passo do protocolo esse psicólogo já cumpriu, sem perceber?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "b) (10 pts) Usando as 3 formas de recorte, como você descreveria a especialidade dele numa frase?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "c) (10 pts) Que risco existe em ele continuar comunicando \"atendimento para todas as idades\"?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "d) (10 pts) Sugira uma nova bio, com recorte mais específico, mantendo abertura a outros casos.", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    new doc.Paragraph({ spacing: { after: 40 }, children: [new doc.TextRun({ text: "USO EXCLUSIVO DO INSTRUTOR — remover antes de aplicar a prova", bold: true, color: doc.TERRA, font: doc.FONT, size: 20 })] }),
    doc.tituloH1("Gabarito"),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 1 — Questões objetivas", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 200 }, children: [new doc.TextRun({ text: gabaritoObjetivas.map((r, i) => `${i + 1}-${r}`).join("   ·   "), font: doc.FONT, size: 22, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 2 — Critério de correção da questão de caso", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "a) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Passos 1 e 2 — ele já tem um padrão claro nos últimos pacientes, mesmo sem ter formalizado isso como recorte de especialidade.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "b) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Recorte combinado de público e demanda: \"Atendo homens de 30 a 45 anos com ansiedade relacionada ao trabalho.\"", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "c) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Comunicação genérica que dificulta diferenciação, menor percepção de expertise, e boca a boca menos eficaz — as mesmas 4 razões do slide 4.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "d) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Exemplo: \"Psicólogo | Ansiedade relacionada ao trabalho, com foco em homens adultos | Também atendo outras demandas, sob consulta.\"", font: doc.FONT, size: 21, color: doc.INK })] }),
  );

  return doc.salvar(doc.paginaDoc("Escola de Marketing para Psicólogos", RODAPE_DOC, children), "Modulo-1.1-Avaliacao.docx");
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
      n: 1, titulo: "O mito de \"atendo tudo\", e as 4 razões", duracao: "13 min", slides: "1, 2, 3, 4",
      objetivo: "Sair sabendo explicar as 4 razões pelas quais atender todo mundo custa caro.",
      segmentos: [
        seg("0:00–0:45", "Abertura (gancho)", [{ fala: "'Atendo ansiedade, depressão, relacionamento e o que mais aparecer' parece uma forma de não perder nenhum paciente — na prática, é a forma mais eficiente de não ser lembrado por ninguém." }]),
        seg("0:45–2:00", "Por que isso importa", ["Este módulo abre a Escola de Marketing com a decisão que sustenta todas as outras: pra quem você fala."]),
        seg("2:00–9:00", "As 4 razões (mostrar slide 4)", [
          "Comunicação genérica: difícil resumir em uma frase.",
          "Concorrência ampla: disputa com todo o mercado.",
          "Menor percepção de expertise em qualquer tema.",
          "Boca a boca fraco: difícil de indicar.",
        ]),
        seg("9:00–12:00", "Um ponto importante", ["Nenhuma dessas razões é sobre perder pacientes — é sobre o esforço extra pra conquistar cada um deles."]),
        seg("12:00–13:00", "Fechamento", [{ fala: "Próxima aula: do 'atendo tudo' ao esquecimento, e as 3 formas de recortar especialidade." }]),
      ],
    },
    {
      n: 2, titulo: "A cadeia do esquecimento, e as 3 formas de recorte", duracao: "12 min", slides: "5, 6",
      objetivo: "Explicar como a generalização leva ao esquecimento e diferenciar as 3 formas de recorte.",
      segmentos: [
        seg("0:00–1:00", "Retomada rápida", ["Vimos as 4 razões. Hoje, como elas se acumulam ao longo do tempo."]),
        seg("1:00–6:00", "A cadeia (mostrar slide 5)", ["Comunicação genérica → Difícil diferenciação → Esquecimento → Indicação rara."]),
        seg("6:00–11:00", "As 3 formas de recorte (mostrar slide 6)", ["Por público, por demanda e por abordagem — ou uma combinação entre elas."]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Próxima aula: os sinais de generalização excessiva, e 3 níveis de especialização." }]),
      ],
    },
    {
      n: 3, titulo: "Sinais de alerta e os 3 níveis de especialização", duracao: "12 min", slides: "7, 8",
      objetivo: "Reconhecer sinais de generalização excessiva e diferenciar os 3 níveis de especialização.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Quatro sinais de generalização — e três níveis, do generalista ao especializado."]),
        seg("1:00–6:00", "Sinais de alerta (mostrar slide 7)", [
          "Bio com muitos temas.",
          "Especialidade sem frase clara.",
          "Conteúdo sem foco.",
          "Indicações raras e vagas.",
        ]),
        seg("6:00–11:00", "Os 3 níveis (mostrar slide 8)", ["Generalista, semi-especializado e especializado — cada um exigindo um esforço diferente pra evoluir."]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Próxima aula: as 3 perguntas que ajudam a encontrar sua especialidade, e os 4 passos completos." }]),
      ],
    },
    {
      n: 4, titulo: "As 3 perguntas e os 4 passos", duracao: "11 min", slides: "9, 10",
      objetivo: "Conhecer as 3 perguntas de especialidade e os 4 passos de construção do recorte.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três perguntas simples — e um processo de 4 passos pra encontrar seu recorte."]),
        seg("1:00–5:00", "3 perguntas (mostrar slide 9)", ["Você gosta, você domina, você já vê — as 3 perguntas que revelam uma especialidade escondida."]),
        seg("5:00–10:00", "Os 4 passos (mostrar slide 10)", ["Revisar os últimos pacientes, identificar o padrão, escolher um recorte inicial, testar a comunicação."]),
        seg("10:00–11:00", "Fechamento", [{ fala: "Próxima aula: aplicando os 4 passos na prática." }]),
      ],
    },
    {
      n: 5, titulo: "Aplicação prática dos 4 passos", duracao: "12 min", slides: "11, 12",
      objetivo: "Aplicar os 4 passos com exemplos concretos.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Hoje colocamos os 4 passos em prática, do padrão ao recorte testado."]),
        seg("1:00–6:00", "Passos 1 e 2 (mostrar slide 11)", ["Liste os últimos 10 a 15 casos, sem detalhes sigilosos.", { fala: "Olhando essa lista, existe um tema ou perfil que aparece bem mais que os outros?" }]),
        seg("6:00–11:00", "Passos 3 e 4 (mostrar slide 12)", ["Use as 3 perguntas do slide 9 pra confirmar o recorte.", "Ajuste bio e conteúdo em torno dele por alguns meses."]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Próxima aula: um caso real de bio ampla demais, e o recap final." }]),
      ],
    },
    {
      n: 6, titulo: "Prática guiada — a bio ampla demais e recap final", duracao: "13 min", slides: "13, 14, 15",
      objetivo: "Aplicar tudo que foi visto a um caso real e consolidar os pontos-chave do módulo.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["A última aula do módulo — um caso real, e o recap final."]),
        seg("1:00–5:00", "Apresentando o caso (mostrar slide 13)", ["Leia a vinheta com calma.", "Note que a intenção de \"não perder ninguém\" é o que gera a lista ampla demais."]),
        seg("5:00–9:00", "Percorrendo as perguntas de discussão", ["Discuta em voz alta as 3 perguntas do slide 13.", "Esboce uma bio mais específica pra essa psicóloga."]),
        seg("9:00–11:00", "Quando buscar ajuda especializada (mostrar slide 14)", ["Percorra os 4 critérios do slide 14."]),
        seg("11:00–13:00", "Recap final (mostrar slide 15)", [{ fala: "Retome os 4 pontos-chave do módulo. Agora é hora dos exercícios e da avaliação — e do próximo módulo, sobre definir seu paciente ideal com mais profundidade." }]),
      ],
    },
  ];

  const totalMin = 13 + 12 + 12 + 11 + 12 + 13;

  const children = [
    ...doc.capa(KICKER, "Roteiro de Aulas — O Custo de Generalizar", "Módulo dividido em 6 vídeo-aulas de 11 a 13 minutos, seguindo os slides já produzidos. Cada aula tem roteiro cronometrado, pronto pra gravação."),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "Duração total do módulo em vídeo: ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: `${totalMin} minutos (${(totalMin / 60).toFixed(1)}h) em 6 aulas`, font: doc.FONT, size: 21, color: doc.INK })] }),
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

  return doc.salvar(doc.paginaDoc("Escola de Marketing para Psicólogos", `${RODAPE_DOC} — Roteiro de Aulas`, children), "Modulo-1.1-Roteiro-Aulas.docx");
}

// ============================================================
Promise.resolve()
  .then(construirDeck)
  .then(construirExercicios)
  .then(construirProva)
  .then(construirRoteiro)
  .then(() => console.log("TUDO PRONTO"))
  .catch((e) => { console.error(e); process.exit(1); });

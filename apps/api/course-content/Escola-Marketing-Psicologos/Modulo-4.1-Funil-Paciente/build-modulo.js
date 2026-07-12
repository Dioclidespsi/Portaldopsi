const deck = require("../_lib/lib-deck.js");
const doc = require("../_lib/lib-doc.js");

const MOD = "4.1";
const NOME = "O Funil do Paciente";
const RODAPE_DECK = `O Funil do Paciente — Módulo ${MOD}`;
const RODAPE_DOC = `Módulo ${MOD} — O Funil do Paciente`;
const KICKER = "MÓDULO 4.1 · AQUISIÇÃO DE PACIENTES: ORGÂNICO E PAGO";
const MARCA = "Escola de Marketing para Psicólogos — by Dioclides";

// ============================================================
// 1) SLIDE DECK
// ============================================================
function construirDeck() {
  const pres = deck.novaApresentacao(`${NOME} — De Desconhecido a Primeira Sessão`);

  deck.slideTitulo(pres, {
    moduloLabel: `Módulo ${MOD} · Bloco 4 · Aquisição de Pacientes`,
    titulo: "O Funil do Paciente",
    subtitulo: "Mapeando as etapas reais entre \"nunca ouviu falar de você\" e \"primeira sessão agendada\"",
    rodapeMarca: MARCA,
    passos: ["Estágios", "Conteúdo", "Vazamentos", "Métricas", "Prática"],
  });

  deck.slideRoteiro(pres, {
    rodape: RODAPE_DECK, pageNum: 2,
    cards: [
      { titulo: "Os 4 estágios do funil", desc: "De desconhecido a paciente, com nome pra cada etapa" },
      { titulo: "Conteúdo por estágio", desc: "O que atrai é diferente do que converte" },
      { titulo: "Onde o funil vaza", desc: "Sinais de que pessoas estão se perdendo pelo caminho" },
      { titulo: "Métricas certas", desc: "Como medir cada estágio, sem virar analista de dados" },
      { titulo: "Aplicação prática", desc: "Diagnosticando o funil de um caso real" },
    ],
  });

  deck.slideHook(pres, {
    rodape: RODAPE_DECK, pageNum: 3,
    frase: "Ninguém agenda uma sessão no primeiro contato com seu conteúdo — existe uma distância real entre \"ver seu post\" e \"marcar uma consulta\", e conhecer essa distância é o que separa quem enche a agenda de quem só acumula curtidas.",
    apoio: "Este módulo abre o Bloco 4 mapeando essa distância inteira, estágio por estágio, pra você saber exatamente onde investir energia.",
  });

  deck.slideCircuito(pres, {
    rodape: RODAPE_DECK, pageNum: 4,
    titulo: "4 estágios do funil do paciente",
    regioes: [
      { label: "Desconhecido: nunca ouviu falar do seu trabalho", rx: 0.20, ry: 0.22, color: deck.NAVY, d: 0.5 },
      { label: "Interessado: viu conteúdo seu e achou relevante", rx: 0.22, ry: 0.62, color: deck.TERRA, d: 0.4 },
      { label: "Considerando: pesquisa, compara e ainda hesita", rx: 0.60, ry: 0.60, color: deck.NAVY_TINT, d: 0.36 },
      { label: "Paciente: agendou e compareceu à primeira sessão", rx: 0.58, ry: 0.24, color: deck.TERRA_TINT, d: 0.36 },
    ],
    notas: [
      "A maioria dos psicólogos investe quase toda energia no primeiro estágio (atrair desconhecidos) e quase nenhuma nos demais.",
      "Cada estágio exige um tipo de conteúdo e uma métrica diferente — misturar tudo é o erro mais comum.",
    ],
  });

  deck.slideCadeia(pres, {
    rodape: RODAPE_DECK, pageNum: 5,
    titulo: "Do primeiro contato ao agendamento",
    elos: [
      { titulo: "Descoberta", desc: "Post, indicação de colega, ou busca no Google" },
      { titulo: "Interesse", desc: "Segue o perfil, salva o conteúdo, lê mais posts" },
      { titulo: "Consideração", desc: "Manda mensagem, visita o site, tira dúvidas" },
      { titulo: "Conversão", desc: "Agenda a primeira sessão e comparece" },
    ],
    notaFinal: "Cada seta desse funil representa uma decisão da pessoa — e cada decisão pode ser facilitada ou dificultada pelo que você comunica.",
  });

  deck.slideCategorias(pres, {
    rodape: RODAPE_DECK, pageNum: 6,
    titulo: "3 tipos de conteúdo por estágio",
    categorias: [
      { titulo: "Conteúdo de topo", desc: "Atrai desconhecidos — temas amplos, alta chance de compartilhamento", color: deck.NAVY },
      { titulo: "Conteúdo de meio", desc: "Nutre interessados — aprofunda, constrói confiança ao longo do tempo", color: deck.TERRA },
      { titulo: "Conteúdo de fundo", desc: "Convida quem já considera a dar o próximo passo, sem pressão", color: deck.NAVY_TINT },
    ],
    notaFinal: "Publicar só conteúdo de topo é como abrir a porta da loja e nunca convidar ninguém a entrar.",
  });

  deck.slideSinais(pres, {
    rodape: RODAPE_DECK, pageNum: 7,
    titulo: "Sinais de que o funil está vazando",
    itens: [
      { titulo: "Muitas curtidas, poucas mensagens", desc: "O conteúdo atrai, mas não converte interesse em contato" },
      { titulo: "Muitas mensagens, poucos agendamentos", desc: "O contato acontece, mas hesita antes de marcar" },
      { titulo: "Perfil visitado sem ação clara", desc: "Falta um próximo passo óbvio pra quem chega até a bio" },
      { titulo: "Contato difícil de encontrar", desc: "Nenhum canal simples e visível pra dar o primeiro passo" },
    ],
  });

  deck.slideDiferencial(pres, {
    rodape: RODAPE_DECK, pageNum: 8,
    titulo: "3 posts, 3 estágios",
    cards: [
      { titulo: "Post de topo", desc: "\"5 sinais de que sua ansiedade pode ser mais que estresse comum\"" },
      { titulo: "Post de meio", desc: "\"Como funciona minha primeira sessão de avaliação\"" },
      { titulo: "Post de fundo", desc: "\"Ainda com dúvida se vale a pena? Vamos conversar 15 minutos, sem custo\"" },
    ],
  });

  deck.slideInstrumentos(pres, {
    rodape: RODAPE_DECK, pageNum: 9,
    titulo: "3 métricas, uma por estágio",
    instrumentos: [
      { sigla: "Alcance", nome: "Quantas pessoas novas viram seu conteúdo", desc: "Mede o topo do funil — a porta de entrada." },
      { sigla: "Engajamento", nome: "Comentários, salvamentos e mensagens diretas", desc: "Mede o meio — o quanto o conteúdo gera confiança." },
      { sigla: "Agendamento", nome: "Quantos contatos viram sessão marcada", desc: "Mede o fundo — o que realmente enche a agenda." },
    ],
  });

  deck.slideProtocoloOverview(pres, {
    rodape: RODAPE_DECK, pageNum: 10,
    titulo: "Mapeando seu funil: 4 passos",
    passos: [
      { titulo: "Mapear o\nfunil atual", desc: "Que conteúdo você já publica, e pra qual estágio ele serve" },
      { titulo: "Identificar o\nmaior vazamento", desc: "Onde a queda de número é mais brusca entre estágios" },
      { titulo: "Criar conteúdo\npro estágio que falta", desc: "Geralmente meio ou fundo, os mais esquecidos" },
      { titulo: "Medir e\najustar mensalmente", desc: "O funil muda com o tempo — revisar é parte do processo" },
    ],
    notaFinal: "A maioria dos psicólogos só precisa desse diagnóstico simples pra descobrir por que a agenda não enche, mesmo com bom conteúdo.",
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 11,
    titulo: "Passos 1 e 2, na prática",
    colunas: [
      {
        numero: 1, titulo: "Mapear o funil atual",
        bullets: ["Liste os últimos 15 posts e classifique cada um: topo, meio ou fundo", "A maioria dos perfis descobre que 90% do conteúdo é só de topo"],
      },
      {
        numero: 2, titulo: "Identificar o maior vazamento",
        fala: "“Entre curtida e mensagem, e entre mensagem e agendamento, onde a queda é mais brusca?”",
        bullets: ["O vazamento mais comum é entre \"interessado\" e \"considerando\" — falta conteúdo de meio"],
      },
    ],
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 12,
    titulo: "Passos 3 e 4, na prática",
    colunas: [
      {
        numero: 3, titulo: "Criar conteúdo pro estágio que falta",
        bullets: ["Se falta meio, explique melhor como funciona seu atendimento", "Se falta fundo, crie um convite claro e de baixo risco pro próximo passo"],
      },
      {
        numero: 4, titulo: "Medir e ajustar mensalmente",
        bullets: ["Reserve 15 minutos por mês pra revisar as 3 métricas do slide 9", "Pequenos ajustes mensais valem mais que uma reformulação completa ocasional"],
      },
    ],
  });

  deck.slideCaso(pres, {
    rodape: RODAPE_DECK, pageNum: 13,
    vinheta: "Uma psicóloga tem 8 mil seguidores e posts com bom engajamento, mas atende apenas 4 pacientes por semana e sente que precisa \"postar mais\" pra crescer. Ao revisar o perfil, quase todo o conteúdo explica conceitos gerais de psicologia, sem nenhuma menção a como funciona o atendimento dela ou como marcar uma consulta.",
    perguntas: [
      "Em que estágio do funil essa psicóloga está investindo quase toda a energia?",
      "Que tipo de conteúdo (slide 6) está mais ausente no perfil dela?",
      "Que próximo passo você recomendaria, com base nos 4 passos do protocolo?",
    ],
  });

  deck.slideEncaminhamento(pres, {
    rodape: RODAPE_DECK, pageNum: 14,
    titulo: "Quando buscar ajuda especializada",
    criterios: [
      "Funil mapeado, mas resultado ainda não melhora após ajustes: considerar consultoria de marketing específica pra saúde",
      "Volume de mensagens maior do que dá conta de responder: avaliar automação ou apoio administrativo (Bloco 6)",
      "Interesse em investir em anúncios pagos: seguir para o Módulo 4.4, dentro dos limites éticos do Bloco 2",
      "Funil funcionando bem, mas agenda no limite: revisar precificação e escala, temas do Bloco 6",
    ],
  });

  deck.slideRecap(pres, {
    rodape: RODAPE_DECK, pageNum: 15,
    pontos: [
      "O funil tem 4 estágios: desconhecido, interessado, considerando e paciente",
      "Conteúdo de topo, meio e fundo servem propósitos diferentes — publicar só um tipo deixa o funil incompleto",
      "Alcance, engajamento e agendamento são as 3 métricas certas, uma por estágio",
      "Mapear o funil atual e identificar o maior vazamento resolve a maioria dos casos de \"agenda vazia apesar do bom conteúdo\"",
    ],
    proximoTexto: "Próximo: exercícios práticos e avaliação do Módulo 4.1 →",
  });

  return pres.writeFile({ fileName: "Modulo-4.1-Funil-Paciente.pptx" });
}

// ============================================================
// 2) EXERCÍCIOS
// ============================================================
function construirExercicios() {
  const children = [
    ...doc.capa(KICKER, "Exercícios — O Funil do Paciente", "Resolva individualmente, de preferência aplicando ao seu próprio perfil real."),

    doc.exNum(1, "Os 4 estágios do funil"),
    doc.pergunta(1, "Descreva, com suas palavras, os 4 estágios do funil do paciente."),
    ...doc.linhaResposta(3),

    doc.exNum(2, "Os 3 tipos de conteúdo"),
    doc.tabelaSimples(["Tipo", "Função no funil"], [["Conteúdo de topo", ""], ["Conteúdo de meio", ""], ["Conteúdo de fundo", ""]], [3600, 5550]),

    doc.exNum(3, "Classificando seus próprios posts"),
    doc.pergunta(1, "Liste seus últimos 5 posts (ou ideias de post) e classifique cada um como topo, meio ou fundo."),
    ...doc.linhaResposta(4),
    doc.pergunta(2, "Que estágio está mais ausente na sua lista?"),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),

    doc.exNum(4, "As 3 métricas"),
    doc.pergunta(1, "Explique por que medir só alcance (curtidas, visualizações) é insuficiente pra saber se o funil funciona."),
    ...doc.linhaResposta(2),

    doc.exNum(5, "Caso integrado — os 8 mil seguidores"),
    doc.vinhetaBox("Uma psicóloga com 8 mil seguidores e bom engajamento atende só 4 pacientes por semana; quase todo conteúdo dela explica conceitos gerais, sem menção a como funciona o atendimento."),
    doc.pergunta(1, "Em que estágio do funil essa psicóloga investe quase toda a energia?"),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Que tipo de conteúdo está mais ausente no perfil dela?"),
    ...doc.linhaResposta(2),
    doc.pergunta(3, "Que próximo passo você recomendaria, com base nos 4 passos do protocolo?"),
    ...doc.linhaResposta(2),
  ];

  return doc.salvar(doc.paginaDoc("Escola de Marketing para Psicólogos", RODAPE_DOC, children), "Modulo-4.1-Exercicios.docx");
}

// ============================================================
// 3) AVALIAÇÃO
// ============================================================
function construirProva() {
  const objetivas = [
    ["Os 4 estágios do funil do paciente, segundo o módulo, são:", ["Desconhecido, interessado, considerando e paciente", "Topo, meio, fundo e conversão", "Alcance, engajamento, agendamento e retenção", "Descoberta, indicação, busca e site"]],
    ["Conteúdo de topo de funil tem como função principal:", ["Atrair desconhecidos com temas amplos e alta chance de compartilhamento", "Converter quem já está decidido a agendar", "Substituir a necessidade de conteúdo de meio e fundo", "Detalhar exclusivamente como funciona o atendimento"]],
    ["\"Muitas curtidas, poucas mensagens\" é um sinal de que:", ["O funil está vazando entre os estágios de interesse e consideração", "O perfil está funcionando perfeitamente em todos os estágios", "O problema está exclusivamente no conteúdo de fundo", "Não há qualquer ação necessária"]],
    ["A métrica de \"engajamento\" (comentários, salvamentos, DMs) mede principalmente:", ["O estágio de meio do funil", "Exclusivamente o estágio de topo", "Apenas o resultado financeiro do consultório", "O número total de seguidores do perfil"]],
    ["O erro mais comum descrito no módulo é:", ["Publicar quase só conteúdo de topo, sem meio ou fundo", "Publicar apenas conteúdo de fundo, sem topo", "Medir engajamento e agendamento ao mesmo tempo", "Ter um canal de contato visível no perfil"]],
    ["Um exemplo de conteúdo de fundo de funil é:", ["Um convite direto e de baixo risco pro próximo passo", "Um post amplo sobre um tema geral de psicologia", "Um conteúdo pensado exclusivamente pra alcançar desconhecidos", "Uma explicação aprofundada sobre um conceito clínico, sem convite"]],
    ["O passo \"identificar o maior vazamento\", segundo o protocolo, busca:", ["Encontrar onde a queda de número é mais brusca entre estágios", "Aumentar o número total de seguidores do perfil", "Ignorar completamente as métricas de engajamento", "Substituir a necessidade de criar novo conteúdo"]],
    ["Diante de volume de mensagens maior do que dá conta de responder, o módulo recomenda:", ["Avaliar automação ou apoio administrativo", "Parar de responder mensagens até reduzir o volume", "Reduzir drasticamente a quantidade de conteúdo publicado", "Ignorar o problema, já que se resolve sozinho"]],
    ["Medir e ajustar o funil mensalmente é recomendado porque:", ["O funil muda com o tempo, exigindo revisão periódica", "Uma única revisão inicial é suficiente para sempre", "Métricas não mudam significativamente mês a mês", "É uma exigência formal do CFP"]],
    ["Este módulo abre o Bloco 4 com o objetivo de:", ["Mapear a distância entre desconhecido e paciente, estágio por estágio", "Substituir o conteúdo do Bloco 2 sobre ética na publicidade", "Ensinar exclusivamente sobre anúncios pagos", "Abordar apenas gestão financeira do consultório"]],
  ];
  const gabaritoObjetivas = ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a"];

  const children = [
    ...doc.capa(KICKER, "Avaliação — O Funil do Paciente", `Avaliação formativa de encerramento do Módulo ${MOD}.`),
    doc.infoBox([
      ["Nota de corte:", "70 de 100 pontos"],
      ["Tempo sugerido:", "30 minutos"],
      ["Composição:", "10 questões objetivas (6 pts cada = 60 pts) + 1 questão de caso (40 pts)"],
      ["Consulta:", "Material da aula permitido; discussão entre colegas, não"],
    ]),
    doc.tituloH1("Parte 1 — Questões objetivas"),
  ];
  objetivas.forEach((q, i) => children.push(...doc.questaoObjetiva(i + 1, q[0], q[1])));

  children.push(
    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    doc.tituloH1("Parte 2 — Questão de caso (40 pontos)"),
    doc.vinhetaBox("Um psicólogo recebe muitas mensagens no Instagram perguntando sobre valores e horários, mas poucas dessas conversas viram sessão agendada. Ele nota que geralmente responde de forma breve e demora a retomar contato."),
    new doc.Paragraph({ spacing: { before: 240 }, children: [new doc.TextRun({ text: "Com base no protocolo estudado, responda:", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    new doc.Paragraph({ spacing: { before: 220, after: 40 }, children: [new doc.TextRun({ text: "a) (10 pts) Em que estágio do funil está o vazamento principal desse caso?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "b) (10 pts) Que tipo de conteúdo (topo, meio ou fundo) poderia reduzir a quantidade de dúvidas básicas repetidas nas mensagens?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "c) (10 pts) Que passo do protocolo esse psicólogo deveria aplicar primeiro?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "d) (10 pts) Que módulo futuro do curso poderia ajudar diretamente com esse problema de conversão de mensagem em agendamento?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    new doc.Paragraph({ spacing: { after: 40 }, children: [new doc.TextRun({ text: "USO EXCLUSIVO DO INSTRUTOR — remover antes de aplicar a prova", bold: true, color: doc.TERRA, font: doc.FONT, size: 20 })] }),
    doc.tituloH1("Gabarito"),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 1 — Questões objetivas", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 200 }, children: [new doc.TextRun({ text: gabaritoObjetivas.map((r, i) => `${i + 1}-${r}`).join("   ·   "), font: doc.FONT, size: 22, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 2 — Critério de correção da questão de caso", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "a) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Entre \"considerando\" e \"paciente\" — as mensagens acontecem (interesse existe), mas a conversão em agendamento falha, provavelmente por resposta lenta e pouco acolhedora.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "b) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Conteúdo de meio, explicando de forma acessível como funciona o atendimento, valores e formas de agendar, reduzindo a necessidade de perguntar tudo por mensagem.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "c) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Identificar o maior vazamento (passo 2) — já está claro que é entre mensagem e agendamento, então o foco deve ir direto pra melhorar essa etapa específica.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "d) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Módulo 5.1 (A primeira sessão como acolhimento, não venda) e Módulo 4.5 (Métricas que importam), que tratam diretamente de conversão e acompanhamento de resultado.", font: doc.FONT, size: 21, color: doc.INK })] }),
  );

  return doc.salvar(doc.paginaDoc("Escola de Marketing para Psicólogos", RODAPE_DOC, children), "Modulo-4.1-Avaliacao.docx");
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
      n: 1, titulo: "Os 4 estágios do funil", duracao: "13 min", slides: "1, 2, 3, 4",
      objetivo: "Sair sabendo nomear e explicar os 4 estágios do funil do paciente.",
      segmentos: [
        seg("0:00–0:45", "Abertura (gancho)", [{ fala: "Ninguém agenda uma sessão no primeiro contato com seu conteúdo — existe uma distância real, e conhecer essa distância é o que separa quem enche a agenda de quem só acumula curtidas." }]),
        seg("0:45–2:00", "Por que isso importa", ["Este módulo abre o Bloco 4 mapeando essa distância inteira, estágio por estágio."]),
        seg("2:00–9:00", "Os 4 estágios (mostrar slide 4)", [
          "Desconhecido: nunca ouviu falar do seu trabalho.",
          "Interessado: viu conteúdo seu e achou relevante.",
          "Considerando: pesquisa, compara e ainda hesita.",
          "Paciente: agendou e compareceu à primeira sessão.",
        ]),
        seg("9:00–12:00", "Um ponto importante", ["A maioria dos psicólogos investe quase toda energia no primeiro estágio, e quase nenhuma nos demais."]),
        seg("12:00–13:00", "Fechamento", [{ fala: "Próxima aula: do primeiro contato ao agendamento, e os 3 tipos de conteúdo por estágio." }]),
      ],
    },
    {
      n: 2, titulo: "Do contato ao agendamento, e os 3 tipos de conteúdo", duracao: "12 min", slides: "5, 6",
      objetivo: "Explicar a cadeia entre descoberta e conversão e diferenciar os 3 tipos de conteúdo.",
      segmentos: [
        seg("0:00–1:00", "Retomada rápida", ["Vimos os 4 estágios. Hoje, como a pessoa se move entre eles."]),
        seg("1:00–6:00", "A cadeia (mostrar slide 5)", ["Descoberta → Interesse → Consideração → Conversão."]),
        seg("6:00–11:00", "Os 3 tipos de conteúdo (mostrar slide 6)", ["Conteúdo de topo, de meio e de fundo — cada um cumprindo uma função diferente no funil."]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Próxima aula: os sinais de vazamento, e 3 posts lado a lado." }]),
      ],
    },
    {
      n: 3, titulo: "Sinais de vazamento e 3 posts por estágio", duracao: "12 min", slides: "7, 8",
      objetivo: "Reconhecer sinais de vazamento no funil e ver exemplos concretos de post por estágio.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Quatro sinais de vazamento — e três exemplos de post, um por estágio."]),
        seg("1:00–6:00", "Sinais de vazamento (mostrar slide 7)", [
          "Muitas curtidas, poucas mensagens.",
          "Muitas mensagens, poucos agendamentos.",
          "Perfil visitado sem ação clara.",
          "Contato difícil de encontrar.",
        ]),
        seg("6:00–11:00", "3 posts, 3 estágios (mostrar slide 8)", ["Compare os 3 exemplos de post do slide 8, um de topo, um de meio e um de fundo."]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Próxima aula: as métricas certas, e os 4 passos pra mapear seu próprio funil." }]),
      ],
    },
    {
      n: 4, titulo: "As métricas certas e os 4 passos do diagnóstico", duracao: "11 min", slides: "9, 10",
      objetivo: "Conhecer as 3 métricas por estágio e memorizar os 4 passos de diagnóstico do funil.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três métricas — e um processo de 4 passos pra diagnosticar seu próprio funil."]),
        seg("1:00–5:00", "3 métricas (mostrar slide 9)", ["Alcance mede topo, engajamento mede meio, agendamento mede fundo."]),
        seg("5:00–10:00", "Os 4 passos (mostrar slide 10)", ["Mapear o funil atual, identificar o maior vazamento, criar conteúdo pro estágio que falta, medir e ajustar mensalmente."]),
        seg("10:00–11:00", "Fechamento", [{ fala: "Próxima aula: aplicando os 2 primeiros passos na prática." }]),
      ],
    },
    {
      n: 5, titulo: "Aplicação prática do diagnóstico", duracao: "12 min", slides: "11, 12",
      objetivo: "Aplicar os 4 passos do diagnóstico com exemplos concretos.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Hoje colocamos o diagnóstico completo em prática."]),
        seg("1:00–6:00", "Passos 1 e 2 (mostrar slide 11)", ["Liste os últimos 15 posts e classifique cada um.", { fala: "Entre curtida e mensagem, e entre mensagem e agendamento, onde a queda é mais brusca?" }]),
        seg("6:00–11:00", "Passos 3 e 4 (mostrar slide 12)", ["Crie conteúdo pro estágio que falta.", "Reserve 15 minutos por mês pra revisar as métricas."]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Próxima aula: um caso real de perfil grande com poucos agendamentos, e o recap final." }]),
      ],
    },
    {
      n: 6, titulo: "Prática guiada — os 8 mil seguidores e recap final", duracao: "13 min", slides: "13, 14, 15",
      objetivo: "Aplicar o diagnóstico completo a um caso real e consolidar os pontos-chave do módulo.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["A última aula do módulo — um caso real, e o recap final."]),
        seg("1:00–5:00", "Apresentando o caso (mostrar slide 13)", ["Leia a vinheta com calma.", "Note que o problema não é falta de alcance — é a ausência de conteúdo de meio e fundo."]),
        seg("5:00–9:00", "Percorrendo as perguntas de discussão", ["Discuta em voz alta as 3 perguntas do slide 13.", "Esboce um plano de conteúdo que preencha a lacuna identificada."]),
        seg("9:00–11:00", "Quando buscar ajuda especializada (mostrar slide 14)", ["Percorra os 4 critérios do slide 14."]),
        seg("11:00–13:00", "Recap final (mostrar slide 15)", [{ fala: "Retome os 4 pontos-chave do módulo. Agora é hora dos exercícios e da avaliação — e do próximo módulo, sobre Google Meu Negócio e SEO local." }]),
      ],
    },
  ];

  const totalMin = 13 + 12 + 12 + 11 + 12 + 13;

  const children = [
    ...doc.capa(KICKER, "Roteiro de Aulas — O Funil do Paciente", "Módulo dividido em 6 vídeo-aulas de 11 a 13 minutos, seguindo os slides já produzidos. Cada aula tem roteiro cronometrado, pronto pra gravação."),
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

  return doc.salvar(doc.paginaDoc("Escola de Marketing para Psicólogos", `${RODAPE_DOC} — Roteiro de Aulas`, children), "Modulo-4.1-Roteiro-Aulas.docx");
}

// ============================================================
Promise.resolve()
  .then(construirDeck)
  .then(construirExercicios)
  .then(construirProva)
  .then(construirRoteiro)
  .then(() => console.log("TUDO PRONTO"))
  .catch((e) => { console.error(e); process.exit(1); });

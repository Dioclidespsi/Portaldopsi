const deck = require("../_lib/lib-deck.js");
const doc = require("../_lib/lib-doc.js");

const MOD = "3.2";
const NOME = "Pilares que Educam";
const RODAPE_DECK = `Pilares que Educam — Módulo ${MOD}`;
const RODAPE_DOC = `Módulo ${MOD} — Pilares que Educam`;
const KICKER = "MÓDULO 3.2 · CONTEÚDO E AUTORIDADE";
const MARCA = "Escola de Marketing para Psicólogos — by Dioclides";

// ============================================================
// 1) SLIDE DECK
// ============================================================
function construirDeck() {
  const pres = deck.novaApresentacao(`${NOME} — Ensinando Sem Prometer`);

  deck.slideTitulo(pres, {
    moduloLabel: `Módulo ${MOD} · Bloco 3 · Conteúdo e Autoridade`,
    titulo: "Pilares que Educam",
    subtitulo: "Aplicando o checklist do Bloco 2 na prática: temas, formatos e linhas editoriais dentro do limite ético",
    rodapeMarca: MARCA,
    passos: ["Formatos", "Prevenção", "Fontes", "Templates", "Prática"],
  });

  deck.slideRoteiro(pres, {
    rodape: RODAPE_DECK, pageNum: 2,
    cards: [
      { titulo: "Os 4 formatos-pilares", desc: "Estruturas que funcionam repetidamente, sem parecer repetitivo" },
      { titulo: "Como evitar o neuro-hype", desc: "Cada pilar aplicado sem cruzar a linha do Bloco 2" },
      { titulo: "3 fontes de ideias", desc: "De onde tirar conteúdo sem depender de inspiração súbita" },
      { titulo: "Templates prontos", desc: "Estruturas de legenda prontas pra preencher" },
      { titulo: "Praticando", desc: "Construindo um post completo, do zero" },
    ],
  });

  deck.slideHook(pres, {
    rodape: RODAPE_DECK, pageNum: 3,
    frase: "Ensinar bem um conceito clínico, sem prometer nada, ainda é o conteúdo mais compartilhável que existe — a ética não compete com o alcance, ela sustenta.",
    apoio: "Este módulo pega a estratégia definida no Módulo 3.1 e transforma em formatos concretos de post, já revisados pelo checklist do Bloco 2.",
  });

  deck.slideCircuito(pres, {
    rodape: RODAPE_DECK, pageNum: 4,
    titulo: "4 formatos-pilares de conteúdo educativo",
    regioes: [
      { label: "Explicação de mecanismo: o \"como funciona\" por trás de um conceito", rx: 0.20, ry: 0.22, color: deck.NAVY, d: 0.5 },
      { label: "Mito x fato: desconstruindo uma crença popular equivocada", rx: 0.22, ry: 0.62, color: deck.TERRA, d: 0.4 },
      { label: "Bastidores do processo: o que esperar da terapia, na prática", rx: 0.60, ry: 0.60, color: deck.NAVY_TINT, d: 0.36 },
      { label: "Reflexão guiada: uma pergunta que convida a pensar, sem resposta pronta", rx: 0.58, ry: 0.24, color: deck.TERRA_TINT, d: 0.36 },
    ],
    notas: [
      "Alternar entre os 4 formatos evita que o perfil pareça repetitivo, mesmo publicando sobre os mesmos 2 ou 3 temas centrais.",
      "Nenhum dos 4 formatos exige prova social, promessa ou comparação — todos se sustentam só com conteúdo educativo bem construído.",
    ],
  });

  deck.slideCadeia(pres, {
    rodape: RODAPE_DECK, pageNum: 5,
    titulo: "Do conceito ao post pronto",
    elos: [
      { titulo: "Escolher um conceito", desc: "Dentro dos seus 2 a 3 temas centrais, definidos no Módulo 3.1" },
      { titulo: "Escolher o formato", desc: "Um dos 4 pilares — explicação, mito x fato, bastidores ou reflexão" },
      { titulo: "Escrever com o template", desc: "Seguindo a estrutura pronta, sem começar do zero toda vez" },
      { titulo: "Revisar com o checklist", desc: "As 4 categorias do Módulo 2.4, antes de publicar" },
    ],
    notaFinal: "Esse caminho, repetido, transforma criação de conteúdo numa rotina previsível, em vez de uma busca por inspiração a cada post.",
  });

  deck.slideCategorias(pres, {
    rodape: RODAPE_DECK, pageNum: 6,
    titulo: "3 fontes de ideias de conteúdo",
    categorias: [
      { titulo: "Perguntas frequentes", desc: "O que pacientes e seguidores perguntam repetidamente", color: deck.NAVY },
      { titulo: "Conceitos do consultório", desc: "O que você já explica toda semana, dentro da sessão", color: deck.TERRA },
      { titulo: "Mitos populares", desc: "Crenças equivocadas comuns sobre saúde mental e terapia", color: deck.NAVY_TINT },
    ],
    notaFinal: "As 3 fontes juntas praticamente eliminam o bloqueio criativo — o conteúdo já existe na sua rotina, só precisa ser registrado.",
  });

  deck.slideSinais(pres, {
    rodape: RODAPE_DECK, pageNum: 7,
    titulo: "Sinais de que o pilar escapou pra promessa",
    itens: [
      { titulo: "Garantia implícita no fim", desc: "O post termina sugerindo um resultado, mesmo sem dizer explicitamente" },
      { titulo: "Estatística sem fonte", desc: "Um número usado como argumento, sem origem verificável" },
      { titulo: "Comparação com colegas", desc: "Mesmo o formato educativo pode escorregar nisso, sem perceber" },
      { titulo: "Urgência artificial pra engajar", desc: "Pressa fabricada só pra aumentar interação, sem necessidade real" },
    ],
  });

  deck.slideDiferencial(pres, {
    rodape: RODAPE_DECK, pageNum: 8,
    titulo: "3 versões do mesmo pilar (mito x fato)",
    cards: [
      { titulo: "Bem feito", desc: "\"Mito: terapia é só desabafar. Fato: envolve método, teoria e processo ativo de mudança.\"" },
      { titulo: "Mediano", desc: "\"Mito: terapia é só desabafar. Fato: é muito mais transformador do que você imagina.\"" },
      { titulo: "Problemático", desc: "\"Mito: terapia é só desabafar. Fato: meus pacientes resolvem tudo em poucas sessões.\"" },
    ],
  });

  deck.slideInstrumentos(pres, {
    rodape: RODAPE_DECK, pageNum: 9,
    titulo: "3 templates prontos de legenda",
    instrumentos: [
      { sigla: "Explicação", nome: "\"Você já percebeu [padrão]? Isso acontece porque [mecanismo].\"", desc: "Explica um conceito a partir de uma observação comum." },
      { sigla: "Mito x fato", nome: "\"Mito: [crença popular]. Fato: [correção com base real].\"", desc: "Desconstrói uma ideia equivocada de forma direta." },
      { sigla: "Reflexão", nome: "\"Já parou pra pensar em [pergunta]? Não existe resposta certa.\"", desc: "Convida à reflexão, sem prometer conclusão nem solução." },
    ],
  });

  deck.slideProtocoloOverview(pres, {
    rodape: RODAPE_DECK, pageNum: 10,
    titulo: "Criando um post: 4 passos",
    passos: [
      { titulo: "Escolher\num conceito", desc: "Dentro dos seus temas centrais, de uma das 3 fontes de ideias" },
      { titulo: "Escolher\num formato-pilar", desc: "Explicação, mito x fato, bastidores ou reflexão" },
      { titulo: "Escrever com\num template", desc: "Preenchendo a estrutura pronta com seu conteúdo específico" },
      { titulo: "Revisar com\no checklist do Bloco 2", desc: "As 4 categorias do Módulo 2.4, sem pular nenhuma" },
    ],
    notaFinal: "Repetir esse processo transforma a criação de conteúdo numa rotina de poucos minutos, não numa busca por inspiração.",
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 11,
    titulo: "Passos 1 e 2, na prática",
    colunas: [
      {
        numero: 1, titulo: "Escolher um conceito",
        bullets: ["Pense numa pergunta que você já respondeu várias vezes em sessão", "Se não vier nada à cabeça, revise as 3 fontes de ideias do slide 6"],
      },
      {
        numero: 2, titulo: "Escolher um formato-pilar",
        fala: "“Esse conceito funciona melhor explicado, desconstruído como mito, mostrado como bastidor, ou como uma pergunta reflexiva?”",
        bullets: ["Alterne entre os 4 formatos ao longo do mês, pra manter o perfil variado"],
      },
    ],
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 12,
    titulo: "Passos 3 e 4, na prática",
    colunas: [
      {
        numero: 3, titulo: "Escrever com um template",
        bullets: ["Use o template do slide 9 correspondente ao formato escolhido", "Preencha com sua linguagem própria, sem soar robótico ou genérico"],
      },
      {
        numero: 4, titulo: "Revisar com o checklist",
        bullets: ["Identificação, veracidade, sigilo e comparação — nessa ordem, do Módulo 2.4", "Um post educativo também pode falhar no checklist, mesmo sem intenção"],
      },
    ],
  });

  deck.slideCaso(pres, {
    rodape: RODAPE_DECK, pageNum: 13,
    vinheta: "Uma psicóloga quer criar um post sobre o mito de que \"pessoas fortes não precisam de terapia\". Ela escreve um primeiro rascunho: \"Mito: pessoas fortes não precisam de terapia. Fato: os pacientes mais resilientes que atendo são justamente os que buscaram ajuda antes de tudo desmoronar — comigo, a mudança começa já na primeira sessão.\"",
    perguntas: [
      "Que formato-pilar esse post está usando?",
      "Que parte do rascunho falha no checklist do Bloco 2, e por quê?",
      "Reescreva o rascunho mantendo a força da mensagem, dentro do checklist.",
    ],
  });

  deck.slideEncaminhamento(pres, {
    rodape: RODAPE_DECK, pageNum: 14,
    titulo: "Quando buscar ajuda especializada",
    criterios: [
      "Dificuldade persistente em encontrar conceitos pra transformar em conteúdo: revisar as 3 fontes de ideias com mais atenção",
      "Templates prontos ainda soam genéricos ou pouco naturais: buscar mentoria de escrita ou copywriting ético",
      "Volume de conteúdo grande, mas engajamento baixo: revisar a estratégia do Módulo 3.1 antes de mudar os formatos",
      "Dúvida recorrente se um post passa no checklist: pedir revisão de colega antes de publicar"
    ],
  });

  deck.slideRecap(pres, {
    rodape: RODAPE_DECK, pageNum: 15,
    pontos: [
      "Explicação, mito x fato, bastidores e reflexão guiada são os 4 formatos-pilares de conteúdo educativo",
      "Perguntas frequentes, conceitos do consultório e mitos populares resolvem a maioria dos bloqueios de ideia",
      "Mesmo conteúdo educativo pode escapar pra promessa — o checklist do Bloco 2 vale pra todo formato, sem exceção",
      "Escolher conceito, escolher formato, escrever com template e revisar com checklist tornam a criação uma rotina, não um esforço criativo constante",
    ],
    proximoTexto: "Próximo: exercícios práticos e avaliação do Módulo 3.2 →",
  });

  return pres.writeFile({ fileName: "Modulo-3.2-Pilares-Conteudo-Sem-Prometer.pptx" });
}

// ============================================================
// 2) EXERCÍCIOS
// ============================================================
function construirExercicios() {
  const children = [
    ...doc.capa(KICKER, "Exercícios — Pilares que Educam", "Módulo com tag de exercício guiado: reserve um tempo maior aqui, você vai sair com pelo menos 2 posts prontos pra usar."),

    doc.exNum(1, "Os 4 formatos-pilares"),
    doc.pergunta(1, "Descreva, com suas palavras, os 4 formatos-pilares vistos no módulo."),
    ...doc.linhaResposta(3),

    doc.exNum(2, "As 3 fontes de ideias"),
    doc.tabelaSimples(["Fonte", "Exemplo aplicado ao seu perfil"], [["Perguntas frequentes", ""], ["Conceitos do consultório", ""], ["Mitos populares", ""]], [3600, 5550]),

    doc.exNum(3, "Praticando com os templates — parte 1"),
    doc.pergunta(1, "Escolha um conceito da sua área e escreva um post usando o template de Explicação."),
    ...doc.linhaResposta(3),
    doc.pergunta(2, "Escolha um mito comum da sua área e escreva um post usando o template de Mito x Fato."),
    ...doc.linhaResposta(3),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),

    doc.exNum(4, "Praticando com os templates — parte 2"),
    doc.pergunta(1, "Escreva um post usando o template de Reflexão Guiada, sobre um tema da sua área."),
    ...doc.linhaResposta(3),
    doc.pergunta(2, "Rode o checklist do Bloco 2 nos 3 posts que você acabou de escrever. Algum deles precisa de ajuste?"),
    ...doc.linhaResposta(3),

    doc.exNum(5, "Caso integrado — o mito da força"),
    doc.vinhetaBox("Rascunho: \"Mito: pessoas fortes não precisam de terapia. Fato: os pacientes mais resilientes que atendo são justamente os que buscaram ajuda antes de tudo desmoronar — comigo, a mudança começa já na primeira sessão.\""),
    doc.pergunta(1, "Que formato-pilar esse post está usando?"),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Que parte do rascunho falha no checklist do Bloco 2, e por quê?"),
    ...doc.linhaResposta(2),
    doc.pergunta(3, "Reescreva o rascunho mantendo a força da mensagem, dentro do checklist."),
    ...doc.linhaResposta(2),
  ];

  return doc.salvar(doc.paginaDoc("Escola de Marketing para Psicólogos", RODAPE_DOC, children), "Modulo-3.2-Exercicios.docx");
}

// ============================================================
// 3) AVALIAÇÃO
// ============================================================
function construirProva() {
  const objetivas = [
    ["Os 4 formatos-pilares de conteúdo educativo, segundo o módulo, são:", ["Explicação de mecanismo, mito x fato, bastidores do processo, reflexão guiada", "Topo, meio, fundo de funil e remarketing", "Identificação, veracidade, sigilo e comparação", "Reconhecimento, geração de contato e conversão"]],
    ["As 3 fontes de ideias de conteúdo, segundo o módulo, são:", ["Perguntas frequentes, conceitos do consultório, mitos populares", "Estatísticas de sucesso, depoimentos e comparações", "Preço, localização e horário de atendimento", "Alcance, engajamento e taxa de conversão"]],
    ["O objetivo de alternar entre os 4 formatos-pilares é:", ["Evitar que o perfil pareça repetitivo, mesmo com poucos temas centrais", "Aumentar artificialmente o número de seguidores", "Substituir a necessidade de definir temas centrais", "Cumprir uma exigência formal da Resolução CFP"]],
    ["Uma \"garantia implícita no fim\" do post é descrita como:", ["Um sinal de que o conteúdo educativo escapou pra promessa", "Uma prática recomendada para fechar bem qualquer post", "Permitida quando o conteúdo já é predominantemente educativo", "Irrelevante para o checklist do Bloco 2"]],
    ["O template de \"Reflexão guiada\", segundo o módulo, deve:", ["Convidar à reflexão, sem prometer conclusão nem solução", "Sempre apresentar uma resposta definitiva ao final", "Substituir a necessidade de qualquer outro formato", "Ser usado exclusivamente em campanhas pagas"]],
    ["Mesmo conteúdo educativo, segundo o módulo, pode:", ["Escapar pra promessa e falhar no checklist do Bloco 2", "Nunca precisar de revisão, por já ser educativo por natureza", "Substituir completamente a necessidade de definir formato", "Ser publicado sem qualquer verificação prévia"]],
    ["O passo \"escrever com um template\", segundo o protocolo, recomenda:", ["Preencher a estrutura pronta com linguagem própria, sem soar robótico", "Copiar o template exatamente como está, sem qualquer adaptação", "Ignorar os templates e escrever sempre do zero", "Usar apenas um formato-pilar durante todo o mês"]],
    ["Diante de templates que ainda soam genéricos, o módulo recomenda:", ["Buscar mentoria de escrita ou copywriting ético", "Abandonar completamente o uso de templates", "Aumentar a frequência de publicação sem qualquer ajuste", "Copiar o texto de outros perfis da área"]],
    ["Este módulo se relaciona ao Módulo 3.1 ao:", ["Transformar a estratégia definida ali em formatos concretos de post", "Substituir completamente o conteúdo daquele módulo", "Introduzir uma estratégia totalmente nova e independente", "Não ter qualquer relação temática com o módulo anterior"]],
    ["O checklist mencionado neste módulo, aplicado a todo formato-pilar, vem de:", ["Módulo 2.4 (O Checklist Antes de Publicar)", "Módulo 1.2 (Definindo especialidade e paciente ideal)", "Módulo 4.5 (Métricas que Importam)", "Módulo 5.1 (A primeira sessão como acolhimento)"]],
  ];
  const gabaritoObjetivas = ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a"];

  const children = [
    ...doc.capa(KICKER, "Avaliação — Pilares que Educam", `Avaliação formativa de encerramento do Módulo ${MOD}.`),
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
    doc.vinhetaBox("Um psicólogo quer criar um post no formato \"bastidores do processo\", explicando como funciona sua primeira sessão. Ele escreve: \"Na primeira sessão, eu já identifico exatamente qual é o problema e como vou resolvê-lo — você sai de lá com um plano certeiro.\""),
    new doc.Paragraph({ spacing: { before: 240 }, children: [new doc.TextRun({ text: "Com base no protocolo estudado, responda:", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    new doc.Paragraph({ spacing: { before: 220, after: 40 }, children: [new doc.TextRun({ text: "a) (10 pts) Que elemento desse texto falha no checklist do Bloco 2?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "b) (10 pts) Reescreva o texto mantendo o formato \"bastidores do processo\", dentro do checklist.", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(3),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "c) (10 pts) Que uma das 3 fontes de ideias esse tema (primeira sessão) provavelmente veio?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "d) (10 pts) Sugira um segundo post, em formato diferente, sobre o mesmo tema geral (primeira sessão).", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    new doc.Paragraph({ spacing: { after: 40 }, children: [new doc.TextRun({ text: "USO EXCLUSIVO DO INSTRUTOR — remover antes de aplicar a prova", bold: true, color: doc.TERRA, font: doc.FONT, size: 20 })] }),
    doc.tituloH1("Gabarito"),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 1 — Questões objetivas", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 200 }, children: [new doc.TextRun({ text: gabaritoObjetivas.map((r, i) => `${i + 1}-${r}`).join("   ·   "), font: doc.FONT, size: 22, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 2 — Critério de correção da questão de caso", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "a) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Veracidade — o texto promete diagnóstico imediato e um \"plano certeiro\", algo que a terapia real não garante numa única sessão.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "b) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Exemplo: \"Na primeira sessão, buscamos entender juntos o que te trouxe até aqui — é o início de um processo, não uma resposta pronta.\"", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "c) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Perguntas frequentes — \"como funciona a primeira sessão\" é uma das dúvidas mais comuns de quem considera começar terapia.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "d) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Exemplo em formato \"mito x fato\": \"Mito: a primeira sessão já resolve o problema. Fato: ela serve pra entender o que precisa ser trabalhado.\"", font: doc.FONT, size: 21, color: doc.INK })] }),
  );

  return doc.salvar(doc.paginaDoc("Escola de Marketing para Psicólogos", RODAPE_DOC, children), "Modulo-3.2-Avaliacao.docx");
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
      n: 1, titulo: "Os 4 formatos-pilares", duracao: "13 min", slides: "1, 2, 3, 4",
      objetivo: "Sair sabendo explicar os 4 formatos-pilares de conteúdo educativo.",
      segmentos: [
        seg("0:00–0:45", "Abertura (gancho)", [{ fala: "Ensinar bem um conceito clínico, sem prometer nada, ainda é o conteúdo mais compartilhável que existe — a ética não compete com o alcance, ela sustenta." }]),
        seg("0:45–2:00", "Por que isso importa", ["Este módulo pega a estratégia do Módulo 3.1 e transforma em formatos concretos, já dentro do checklist do Bloco 2."]),
        seg("2:00–9:00", "Os 4 formatos (mostrar slide 4)", [
          "Explicação de mecanismo: o \"como funciona\".",
          "Mito x fato: desconstruindo uma crença popular.",
          "Bastidores do processo: o que esperar da terapia.",
          "Reflexão guiada: uma pergunta que convida a pensar.",
        ]),
        seg("9:00–12:00", "Um ponto importante", ["Alternar entre os 4 formatos evita que o perfil pareça repetitivo, mesmo com poucos temas centrais."]),
        seg("12:00–13:00", "Fechamento", [{ fala: "Próxima aula: do conceito ao post pronto, e as 3 fontes de ideias." }]),
      ],
    },
    {
      n: 2, titulo: "Do conceito ao post, e as 3 fontes de ideias", duracao: "12 min", slides: "5, 6",
      objetivo: "Explicar a cadeia de criação de conteúdo e as 3 fontes de ideias.",
      segmentos: [
        seg("0:00–1:00", "Retomada rápida", ["Vimos os 4 formatos. Hoje, o caminho completo até o post publicado."]),
        seg("1:00–6:00", "A cadeia (mostrar slide 5)", ["Escolher conceito → Escolher formato → Escrever com template → Revisar com checklist."]),
        seg("6:00–11:00", "As 3 fontes (mostrar slide 6)", ["Perguntas frequentes, conceitos do consultório e mitos populares — praticamente eliminam o bloqueio criativo."]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Próxima aula: os sinais de que o pilar escapou pra promessa, e 3 versões do mesmo post." }]),
      ],
    },
    {
      n: 3, titulo: "Sinais de alerta e 3 versões comparadas", duracao: "12 min", slides: "7, 8",
      objetivo: "Reconhecer sinais de que o conteúdo educativo escapou pra promessa e comparar 3 versões do mesmo post.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Quatro sinais de alerta — e três versões do mesmo post, do bem feito ao problemático."]),
        seg("1:00–6:00", "Sinais de alerta (mostrar slide 7)", [
          "Garantia implícita no fim.",
          "Estatística sem fonte.",
          "Comparação com colegas.",
          "Urgência artificial pra engajar.",
        ]),
        seg("6:00–11:00", "3 versões (mostrar slide 8)", ["Compare o post bem feito, o mediano e o problemático — todos sobre o mesmo mito."]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Próxima aula: os 3 templates prontos, e os 4 passos completos." }]),
      ],
    },
    {
      n: 4, titulo: "Os 3 templates e os 4 passos", duracao: "11 min", slides: "9, 10",
      objetivo: "Conhecer os 3 templates prontos e os 4 passos completos de criação de post.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três templates prontos — e um processo de 4 passos pra criar qualquer post."]),
        seg("1:00–5:00", "3 templates (mostrar slide 9)", ["Explicação, mito x fato e reflexão — cada um com estrutura pronta pra preencher."]),
        seg("5:00–10:00", "Os 4 passos (mostrar slide 10)", ["Escolher conceito, escolher formato, escrever com template, revisar com checklist."]),
        seg("10:00–11:00", "Fechamento", [{ fala: "Próxima aula: aplicando os 4 passos na prática, criando um post de verdade." }]),
      ],
    },
    {
      n: 5, titulo: "Aplicação prática dos 4 passos", duracao: "13 min", slides: "11, 12",
      objetivo: "Aplicar os 4 passos criando um post completo.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Hoje colocamos os 4 passos em prática, criando um post do início ao fim."]),
        seg("1:00–7:00", "Passos 1 e 2 (mostrar slide 11)", ["Pense numa pergunta que já respondeu várias vezes em sessão.", { fala: "Esse conceito funciona melhor explicado, desconstruído como mito, mostrado como bastidor, ou como pergunta reflexiva?" }]),
        seg("7:00–12:00", "Passos 3 e 4 (mostrar slide 12)", ["Preencha o template com linguagem própria.", "Revise com as 4 categorias do checklist do Bloco 2."]),
        seg("12:00–13:00", "Fechamento", [{ fala: "Próxima aula: um caso real de mito x fato que precisa de ajuste, e o recap final." }]),
      ],
    },
    {
      n: 6, titulo: "Prática guiada — o mito da força e recap final", duracao: "13 min", slides: "13, 14, 15",
      objetivo: "Aplicar tudo que foi visto a um caso real e consolidar os pontos-chave do módulo.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["A última aula do módulo — um caso real, e o recap final."]),
        seg("1:00–5:00", "Apresentando o caso (mostrar slide 13)", ["Leia a vinheta com calma.", "Note que a intenção educativa é genuína, mas o final escorrega pra promessa."]),
        seg("5:00–9:00", "Percorrendo as perguntas de discussão", ["Discuta em voz alta as 3 perguntas do slide 13.", "Esboce uma versão reescrita do post, dentro do checklist."]),
        seg("9:00–11:00", "Quando buscar ajuda especializada (mostrar slide 14)", ["Percorra os 4 critérios do slide 14."]),
        seg("11:00–13:00", "Recap final (mostrar slide 15)", [{ fala: "Retome os 4 pontos-chave do módulo. Agora é hora dos exercícios e da avaliação — e do próximo módulo, sobre Instagram na prática." }]),
      ],
    },
  ];

  const totalMin = 13 + 12 + 12 + 11 + 13 + 13;

  const children = [
    ...doc.capa(KICKER, "Roteiro de Aulas — Pilares que Educam", "Módulo dividido em 6 vídeo-aulas de 11 a 13 minutos, seguindo os slides já produzidos. Cada aula tem roteiro cronometrado, pronto pra gravação."),
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

  return doc.salvar(doc.paginaDoc("Escola de Marketing para Psicólogos", `${RODAPE_DOC} — Roteiro de Aulas`, children), "Modulo-3.2-Roteiro-Aulas.docx");
}

// ============================================================
Promise.resolve()
  .then(construirDeck)
  .then(construirExercicios)
  .then(construirProva)
  .then(construirRoteiro)
  .then(() => console.log("TUDO PRONTO"))
  .catch((e) => { console.error(e); process.exit(1); });

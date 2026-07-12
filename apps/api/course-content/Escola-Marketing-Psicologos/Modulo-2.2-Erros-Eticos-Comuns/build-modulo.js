const deck = require("../_lib/lib-deck.js");
const doc = require("../_lib/lib-doc.js");

const MOD = "2.2";
const NOME = "Os Erros Mais Comuns";
const RODAPE_DECK = `Os Erros Mais Comuns — Módulo ${MOD}`;
const RODAPE_DOC = `Módulo ${MOD} — Os Erros Mais Comuns`;
const KICKER = "MÓDULO 2.2 · ÉTICA NA PUBLICIDADE EM PSICOLOGIA";
const MARCA = "Escola de Marketing para Psicólogos — by Dioclides";

// ============================================================
// 1) SLIDE DECK
// ============================================================
function construirDeck() {
  const pres = deck.novaApresentacao(`${NOME} — Estudos de Caso Reais`);

  deck.slideTitulo(pres, {
    moduloLabel: `Módulo ${MOD} · Bloco 2 · Ética na Publicidade`,
    titulo: "Os Erros Mais Comuns",
    subtitulo: "Estudos de caso reais dos deslizes éticos mais frequentes em marketing de psicólogos",
    rodapeMarca: MARCA,
    passos: ["Padrões", "Gravidade", "Sinais", "Prevenção", "Casos"],
  });

  deck.slideRoteiro(pres, {
    rodape: RODAPE_DECK, pageNum: 2,
    cards: [
      { titulo: "4 padrões de erro", desc: "Os deslizes que mais se repetem, mesmo entre profissionais cuidadosos" },
      { titulo: "Como o erro se instala", desc: "O caminho comum entre boa intenção e post problemático" },
      { titulo: "Gravidade do erro", desc: "Nem todo deslize tem o mesmo peso — mas todos merecem atenção" },
      { titulo: "Como prevenir", desc: "Um processo simples que evita a maioria dos problemas" },
      { titulo: "Casos reais", desc: "Analisando dois casos completos, do início ao fim" },
    ],
  });

  deck.slideHook(pres, {
    rodape: RODAPE_DECK, pageNum: 3,
    frase: "A maioria dos processos éticos contra psicólogos por publicidade não nasce de má intenção — nasce de um post feito às pressas, sem rodar as 4 perguntas do módulo anterior.",
    apoio: "Este módulo examina os erros mais recorrentes de perto, com estudos de caso reais, pra você reconhecer o padrão antes de repeti-lo.",
  });

  deck.slideCircuito(pres, {
    rodape: RODAPE_DECK, pageNum: 4,
    titulo: "4 padrões de erro mais recorrentes",
    regioes: [
      { label: "Depoimento \"espontâneo\" compartilhado nos stories ou feed", rx: 0.20, ry: 0.22, color: deck.NAVY, d: 0.5 },
      { label: "Storytelling de caso real sem descaracterizar o suficiente", rx: 0.22, ry: 0.62, color: deck.TERRA, d: 0.4 },
      { label: "Comparação disfarçada de opinião pessoal", rx: 0.60, ry: 0.60, color: deck.NAVY_TINT, d: 0.36 },
      { label: "Urgência artificial: \"vagas quase esgotadas\" sem ser verdade", rx: 0.58, ry: 0.24, color: deck.TERRA_TINT, d: 0.36 },
    ],
    notas: [
      "Esses 4 padrões aparecem repetidamente em processos éticos e notificações de CRPs regionais.",
      "Nenhum deles exige má intenção — todos podem nascer de um impulso genuíno de comunicar bem.",
    ],
  });

  deck.slideCadeia(pres, {
    rodape: RODAPE_DECK, pageNum: 5,
    titulo: "Como um erro comum se instala",
    elos: [
      { titulo: "Boa intenção", desc: "Vontade genuína de mostrar que o trabalho funciona" },
      { titulo: "Busca por prova social", desc: "Sensação de que \"só dizer que ajuda\" não é suficiente" },
      { titulo: "Uso de caso real", desc: "\"Só um pouquinho\", sem perceber que já identifica alguém" },
      { titulo: "Publicação sem revisão", desc: "No calor do momento, sem tempo de reler com distância" },
    ],
    notaFinal: "O último elo — publicar sem revisão — é o único realmente evitável na hora. É onde a prevenção deste módulo age.",
  });

  deck.slideCategorias(pres, {
    rodape: RODAPE_DECK, pageNum: 6,
    titulo: "3 níveis de gravidade do erro",
    categorias: [
      { titulo: "Erro leve", desc: "Linguagem exagerada, sem promessa explícita nem exposição de terceiros", color: deck.NAVY },
      { titulo: "Erro moderado", desc: "Zona cinzenta cruzada sem perceber — comparação sutil, urgência artificial", color: deck.TERRA },
      { titulo: "Erro grave", desc: "Depoimento identificável ou promessa explícita de resultado", color: deck.NAVY_TINT },
    ],
    notaFinal: "A gravidade determina a urgência da correção — mas todo nível merece revisão antes de se repetir.",
  });

  deck.slideSinais(pres, {
    rodape: RODAPE_DECK, pageNum: 7,
    titulo: "Sinais de que um erro já pode ter acontecido",
    itens: [
      { titulo: "Paciente identificado", desc: "Alguém nos comentários reconheceu ou nomeou a pessoa do relato" },
      { titulo: "Denúncia ou reclamação", desc: "O post recebeu algum tipo de queixa formal ou informal" },
      { titulo: "Alerta de colega", desc: "Outro profissional comentou sobre o conteúdo publicado" },
      { titulo: "Desconforto ao reler", desc: "Você mesmo, ao reler depois, sente que passou do ponto" },
    ],
  });

  deck.slideDiferencial(pres, {
    rodape: RODAPE_DECK, pageNum: 8,
    titulo: "3 tipos de erro, com exemplo",
    cards: [
      { titulo: "Storytelling arriscado", desc: "\"Atendi uma paciente que só conseguia sair de casa depois de anos...\" — detalhes reconhecíveis" },
      { titulo: "Prova social disfarçada", desc: "\"Vejam essa mensagem que recebi hoje\" — depoimento indireto, mesmo sem nome" },
      { titulo: "Urgência artificial", desc: "\"Só restam 2 vagas esta semana\" — quando não é verdade" },
    ],
  });

  deck.slideInstrumentos(pres, {
    rodape: RODAPE_DECK, pageNum: 9,
    titulo: "3 consequências possíveis",
    instrumentos: [
      { sigla: "Orientação", nome: "Contato informal do CRP regional", desc: "O desfecho mais comum e mais leve — uma conversa de ajuste." },
      { sigla: "Advertência", nome: "Registro formal, sem processo aberto", desc: "Já entra no histórico profissional, mas sem sanção maior." },
      { sigla: "Processo ético", nome: "Procedimento disciplinar formal", desc: "Reservado a casos graves ou reincidentes — o desfecho mais sério." },
    ],
  });

  deck.slideProtocoloOverview(pres, {
    rodape: RODAPE_DECK, pageNum: 10,
    titulo: "Prevenindo o erro: 4 passos",
    passos: [
      { titulo: "Revisar com\nas 4 perguntas", desc: "As mesmas do Módulo 2.1, sempre antes de publicar" },
      { titulo: "Esperar 24h\nem conteúdo emocional", desc: "Distância reduz a chance de exagero no calor do momento" },
      { titulo: "Pedir uma\nsegunda opinião", desc: "Um colega vê o que você, envolvido, pode não perceber" },
      { titulo: "Documentar\num checklist", desc: "Processo consistente reduz erro mais que boa intenção sozinha" },
    ],
    notaFinal: "Esses 4 passos custam poucos minutos e evitam a maioria dos erros vistos neste módulo.",
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 11,
    titulo: "Passos 1 e 2, na prática",
    colunas: [
      {
        numero: 1, titulo: "Revisar com as 4 perguntas",
        bullets: ["Releia o texto com as 4 perguntas do Módulo 2.1, uma de cada vez", "Se qualquer resposta for \"sim\", pare e reescreva antes de continuar"],
      },
      {
        numero: 2, titulo: "Esperar 24h em conteúdo emocional",
        fala: "“Esse post ainda vai parecer uma boa ideia amanhã, com a cabeça mais fria?”",
        bullets: ["Vale especialmente pra conteúdo escrito logo após uma sessão marcante"],
      },
    ],
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 12,
    titulo: "Passos 3 e 4, na prática",
    colunas: [
      {
        numero: 3, titulo: "Pedir uma segunda opinião",
        bullets: ["Um colega, supervisor ou mentor de confiança, antes de publicar algo sensível", "Quem não estava envolvido no caso enxerga a exposição com mais clareza"],
      },
      {
        numero: 4, titulo: "Documentar um checklist",
        bullets: ["Use o checklist do Módulo 2.4 como rotina fixa, não como exceção", "Processo consistente reduz erro melhor do que confiar só na atenção do momento"],
      },
    ],
  });

  deck.slideCaso(pres, {
    rodape: RODAPE_DECK, pageNum: 13,
    vinheta: "Um psicólogo publica no feed: \"Diferente de muitos profissionais que só escutam sem direção, meu método é estruturado e vai direto ao ponto — por isso meus pacientes avançam mais rápido.\" A publicação gera debate nos comentários, com colegas apontando o tom da comparação.",
    perguntas: [
      "Que padrão de erro do slide 4 esse post exemplifica?",
      "A ausência de nomes específicos de colegas resolve o problema ético? Por quê?",
      "Como reescrever esse post comunicando o mesmo diferencial, sem comparação?",
    ],
  });

  deck.slideEncaminhamento(pres, {
    rodape: RODAPE_DECK, pageNum: 14,
    titulo: "Se um erro já aconteceu",
    criterios: [
      "Post já publicado com problema identificado: remover ou editar assim que possível, sem esperar repercussão",
      "Paciente ou terceiro identificado nos comentários: apagar o comentário e revisar a publicação original imediatamente",
      "Notificação recebida do CRP: buscar orientação jurídica ou de colega experiente antes de responder",
      "Dúvida se um conteúdo antigo ainda está no perfil: fazer uma auditoria periódica do próprio feed, não só do que é novo",
    ],
  });

  deck.slideRecap(pres, {
    rodape: RODAPE_DECK, pageNum: 15,
    pontos: [
      "Depoimento disfarçado, storytelling arriscado, comparação sutil e urgência artificial são os 4 padrões mais recorrentes",
      "A maioria dos erros nasce de boa intenção, não de má-fé — o ponto de risco é publicar sem revisão",
      "As 4 perguntas do Módulo 2.1, aplicadas como rotina, evitam a maioria dos deslizes vistos aqui",
      "Um erro já publicado deve ser corrigido rapidamente — quanto mais cedo, menor o risco de repercussão",
    ],
    proximoTexto: "Próximo: exercícios práticos e avaliação do Módulo 2.2 →",
  });

  return pres.writeFile({ fileName: "Modulo-2.2-Erros-Eticos-Comuns.pptx" });
}

// ============================================================
// 2) EXERCÍCIOS
// ============================================================
function construirExercicios() {
  const children = [
    ...doc.capa(KICKER, "Exercícios — Os Erros Mais Comuns", "Resolva individualmente. O objetivo é reconhecer o padrão de erro rapidamente, antes de precisar corrigir algo já publicado."),

    doc.exNum(1, "Os 4 padrões de erro"),
    doc.pergunta(1, "Descreva, com suas palavras, os 4 padrões de erro vistos neste módulo."),
    ...doc.linhaResposta(3),

    doc.exNum(2, "Os 3 níveis de gravidade"),
    doc.tabelaSimples(["Nível", "Característica central"], [["Erro leve", ""], ["Erro moderado", ""], ["Erro grave", ""]], [3600, 5550]),

    doc.exNum(3, "Reconhecendo o padrão"),
    doc.vinhetaBox("\"Só restam 2 vagas essa semana, agenda sua avaliação agora antes que feche!\" — publicado por um psicólogo que, na verdade, tem disponibilidade ampla."),
    doc.pergunta(1, "Que padrão de erro esse texto exemplifica?"),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Reescreva o texto de forma honesta, sem perder o apelo comercial."),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),

    doc.exNum(4, "Os 4 passos de prevenção"),
    doc.pergunta(1, "Explique por que esperar 24h antes de publicar conteúdo emocional reduz o risco de erro."),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Por que uma segunda opinião ajuda mesmo quando o autor já rodou as 4 perguntas do Módulo 2.1 sozinho?"),
    ...doc.linhaResposta(2),

    doc.exNum(5, "Caso integrado — a comparação disfarçada"),
    doc.vinhetaBox("Um psicólogo publica: \"Diferente de muitos profissionais que só escutam sem direção, meu método é estruturado e vai direto ao ponto — por isso meus pacientes avançam mais rápido.\""),
    doc.pergunta(1, "Que padrão de erro esse post exemplifica?"),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "A ausência de nomes específicos de colegas resolve o problema ético? Por quê?"),
    ...doc.linhaResposta(2),
    doc.pergunta(3, "Reescreva esse post comunicando o mesmo diferencial, sem comparação."),
    ...doc.linhaResposta(2),
  ];

  return doc.salvar(doc.paginaDoc("Escola de Marketing para Psicólogos", RODAPE_DOC, children), "Modulo-2.2-Exercicios.docx");
}

// ============================================================
// 3) AVALIAÇÃO
// ============================================================
function construirProva() {
  const objetivas = [
    ["Os 4 padrões de erro mais recorrentes, segundo o módulo, são:", ["Depoimento disfarçado, storytelling arriscado, comparação sutil, urgência artificial", "Ansiedade, depressão, burnout e trauma", "Identificação, veracidade, sigilo e ausência de comparação", "CEPP, Resolução 03/2007, Nota Técnica 01/2022, LGPD"]],
    ["A maioria dos processos éticos por publicidade, segundo o módulo, nasce de:", ["Boa intenção seguida de publicação sem revisão", "Má-fé deliberada por parte do profissional", "Falha exclusiva das plataformas de redes sociais", "Denúncias infundadas sem qualquer base real"]],
    ["Erro grave, segundo a classificação do módulo, envolve:", ["Depoimento identificável ou promessa explícita de resultado", "Linguagem exagerada, sem exposição de terceiros", "Zona cinzenta cruzada sem perceber, de forma sutil", "Qualquer menção a preço de sessão"]],
    ["Um sinal de que um erro já pode ter acontecido é:", ["Alguém identificar ou nomear a pessoa do relato nos comentários", "O post não receber nenhum tipo de engajamento", "O conteúdo ser revisado antes da publicação", "A publicação seguir rigorosamente as 4 perguntas do Módulo 2.1"]],
    ["Esperar 24h antes de publicar conteúdo emocional serve para:", ["Reduzir a chance de exagero no calor do momento", "Aumentar o engajamento da publicação", "Cumprir uma exigência formal da Resolução CFP", "Evitar que o conteúdo seja compartilhado"]],
    ["Pedir uma segunda opinião antes de publicar algo sensível ajuda porque:", ["Quem não estava envolvido enxerga a exposição com mais clareza", "Substitui a necessidade de rodar as 4 perguntas do Módulo 2.1", "É uma exigência formal da Nota Técnica CFP 01/2022", "Garante juridicamente que nenhum erro pode ocorrer"]],
    ["\"Urgência artificial\" como padrão de erro se caracteriza por:", ["Comunicar escassez ou pressa que não corresponde à realidade", "Informar corretamente a disponibilidade real de horários", "Um recurso recomendado pela Resolução CFP", "Uma prática exclusiva de anúncios pagos, não orgânicos"]],
    ["Diante de um post já publicado com problema identificado, o módulo recomenda:", ["Remover ou editar assim que possível, sem esperar repercussão", "Aguardar para ver se alguém realmente vai notar o problema", "Publicar uma justificativa pública imediata, sem remover o conteúdo", "Ignorar, já que a correção pode chamar mais atenção"]],
    ["Um checklist documentado, segundo o módulo, é útil porque:", ["Reduz erro de forma mais consistente do que confiar só na atenção do momento", "Substitui completamente a necessidade de conhecer a Resolução CFP", "É exigido formalmente antes de qualquer publicação", "Serve apenas para campanhas pagas, não para conteúdo orgânico"]],
    ["Este módulo se relaciona ao Módulo 2.1 da seguinte forma:", ["Aplica as 4 perguntas daquele módulo a casos reais de erro", "É totalmente independente, sem qualquer conexão de conteúdo", "Substitui o conteúdo do Módulo 2.1 por uma abordagem nova", "Antecede o Módulo 2.1 na ordem lógica do curso"]],
  ];
  const gabaritoObjetivas = ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a"];

  const children = [
    ...doc.capa(KICKER, "Avaliação — Os Erros Mais Comuns", `Avaliação formativa de encerramento do Módulo ${MOD}.`),
    doc.infoBox([
      ["Nota de corte:", "75 de 100 pontos"],
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
    doc.vinhetaBox("Uma psicóloga publica um carrossel no Instagram contando, em detalhes, a trajetória de \"uma paciente que superou um quadro grave de pânico\", incluindo idade aproximada, profissão e um trecho supostamente transcrito da sessão."),
    new doc.Paragraph({ spacing: { before: 240 }, children: [new doc.TextRun({ text: "Com base no protocolo estudado, responda:", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    new doc.Paragraph({ spacing: { before: 220, after: 40 }, children: [new doc.TextRun({ text: "a) (10 pts) Que padrão de erro do slide 4 esse carrossel exemplifica?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "b) (10 pts) Por que incluir idade, profissão e trecho de sessão é problemático mesmo sem citar o nome da paciente?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "c) (10 pts) Em que nível de gravidade (leve, moderado, grave) você classificaria esse caso, e por quê?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "d) (10 pts) Que passo de prevenção do módulo poderia ter evitado essa publicação?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    new doc.Paragraph({ spacing: { after: 40 }, children: [new doc.TextRun({ text: "USO EXCLUSIVO DO INSTRUTOR — remover antes de aplicar a prova", bold: true, color: doc.TERRA, font: doc.FONT, size: 20 })] }),
    doc.tituloH1("Gabarito"),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 1 — Questões objetivas", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 200 }, children: [new doc.TextRun({ text: gabaritoObjetivas.map((r, i) => `${i + 1}-${r}`).join("   ·   "), font: doc.FONT, size: 22, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 2 — Critério de correção da questão de caso", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "a) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Storytelling arriscado — o nível de detalhe torna a pessoa potencialmente identificável mesmo sem nome.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "b) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Porque a combinação de detalhes (idade, profissão, trecho de sessão) pode permitir que pessoas próximas reconheçam quem é, violando sigilo mesmo sem identificação nominal direta.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "c) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Grave — o nível de detalhe e o trecho supostamente transcrito da sessão se aproximam de exposição identificável, mesmo sem nome próprio.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "d) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Pedir uma segunda opinião antes de publicar — um colega provavelmente notaria o nível de detalhe identificável que a autora, envolvida no caso, não percebeu.", font: doc.FONT, size: 21, color: doc.INK })] }),
  );

  return doc.salvar(doc.paginaDoc("Escola de Marketing para Psicólogos", RODAPE_DOC, children), "Modulo-2.2-Avaliacao.docx");
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
      n: 1, titulo: "Os 4 padrões de erro mais recorrentes", duracao: "13 min", slides: "1, 2, 3, 4",
      objetivo: "Sair sabendo reconhecer os 4 padrões de erro mais comuns em publicidade de psicólogos.",
      segmentos: [
        seg("0:00–0:45", "Abertura (gancho)", [{ fala: "A maioria dos processos éticos contra psicólogos por publicidade não nasce de má intenção — nasce de um post feito às pressas, sem rodar as 4 perguntas do módulo anterior." }]),
        seg("0:45–2:00", "Por que isso importa", ["Este módulo examina os erros mais recorrentes de perto, com casos reais, pra você reconhecer o padrão antes de repeti-lo."]),
        seg("2:00–9:00", "Os 4 padrões (mostrar slide 4)", [
          "Depoimento \"espontâneo\" compartilhado.",
          "Storytelling de caso real sem descaracterizar.",
          "Comparação disfarçada de opinião pessoal.",
          "Urgência artificial: \"vagas quase esgotadas\" sem ser verdade.",
        ]),
        seg("9:00–12:00", "Um ponto importante", ["Nenhum desses padrões exige má intenção — todos podem nascer de um impulso genuíno de comunicar bem."]),
        seg("12:00–13:00", "Fechamento", [{ fala: "Próxima aula: como um erro comum se instala, passo a passo." }]),
      ],
    },
    {
      n: 2, titulo: "Como o erro se instala, e os 3 níveis de gravidade", duracao: "12 min", slides: "5, 6",
      objetivo: "Explicar a cadeia que leva a um erro comum e diferenciar os 3 níveis de gravidade.",
      segmentos: [
        seg("0:00–1:00", "Retomada rápida", ["Vimos os 4 padrões. Hoje, como eles se instalam na prática."]),
        seg("1:00–6:00", "A cadeia (mostrar slide 5)", ["Boa intenção → Busca por prova social → Uso de caso real → Publicação sem revisão."]),
        seg("6:00–11:00", "Os 3 níveis (mostrar slide 6)", ["Erro leve: linguagem exagerada, sem exposição.", "Erro moderado: zona cinzenta cruzada sem perceber.", "Erro grave: depoimento identificável ou promessa explícita."]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Próxima aula: os sinais de que um erro já pode ter acontecido, e 3 exemplos lado a lado." }]),
      ],
    },
    {
      n: 3, titulo: "Sinais de alerta e 3 tipos de erro com exemplo", duracao: "12 min", slides: "7, 8",
      objetivo: "Reconhecer sinais de que um erro já ocorreu e identificar 3 tipos de erro com exemplos concretos.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Quatro sinais de alerta — e três tipos de erro, com exemplo de texto real."]),
        seg("1:00–6:00", "Sinais de alerta (mostrar slide 7)", [
          "Paciente identificado nos comentários.",
          "Denúncia ou reclamação recebida.",
          "Alerta de colega sobre o conteúdo.",
          "Desconforto ao reler o próprio texto.",
        ]),
        seg("6:00–11:00", "3 tipos de erro (mostrar slide 8)", ["Storytelling arriscado, prova social disfarçada e urgência artificial — cada um com seu exemplo."]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Próxima aula: as possíveis consequências, e os 4 passos de prevenção." }]),
      ],
    },
    {
      n: 4, titulo: "Consequências possíveis e os 4 passos de prevenção", duracao: "11 min", slides: "9, 10",
      objetivo: "Conhecer as consequências possíveis e memorizar os 4 passos de prevenção.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["O que pode acontecer depois de um erro — e como evitar chegar lá."]),
        seg("1:00–5:00", "3 consequências (mostrar slide 9)", ["Orientação informal, advertência formal e processo ético — em ordem crescente de gravidade."]),
        seg("5:00–10:00", "Os 4 passos de prevenção (mostrar slide 10)", ["Revisar com as 4 perguntas, esperar 24h em conteúdo emocional, pedir segunda opinião, documentar um checklist."]),
        seg("10:00–11:00", "Fechamento", [{ fala: "Próxima aula: colocando os 2 primeiros passos em prática." }]),
      ],
    },
    {
      n: 5, titulo: "Aplicação prática dos 4 passos", duracao: "12 min", slides: "11, 12",
      objetivo: "Aplicar os 4 passos de prevenção com exemplos concretos.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Hoje colocamos os 4 passos de prevenção em prática."]),
        seg("1:00–6:00", "Passos 1 e 2 (mostrar slide 11)", ["Revisar com as 4 perguntas do Módulo 2.1.", { fala: "Esse post ainda vai parecer uma boa ideia amanhã, com a cabeça mais fria?" }]),
        seg("6:00–11:00", "Passos 3 e 4 (mostrar slide 12)", ["Pedir uma segunda opinião a um colega de confiança.", "Documentar um checklist como rotina, não como exceção."]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Próxima aula: um caso real de comparação disfarçada, e o recap final." }]),
      ],
    },
    {
      n: 6, titulo: "Prática guiada — a comparação disfarçada e recap final", duracao: "14 min", slides: "13, 14, 15",
      objetivo: "Aplicar tudo que foi visto a um caso real e consolidar os pontos-chave do módulo.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["A última aula do módulo — um caso real de comparação, e o recap final."]),
        seg("1:00–5:00", "Apresentando o caso (mostrar slide 13)", ["Leia a vinheta com calma.", "Note que a comparação não cita nomes, mas ainda assim é um padrão de erro."]),
        seg("5:00–9:00", "Percorrendo as perguntas de discussão", ["Discuta em voz alta as 3 perguntas do slide 13.", "Esboce uma versão reescrita do post sem comparação."]),
        seg("9:00–12:00", "Se um erro já aconteceu (mostrar slide 14)", ["Percorra os 4 critérios do slide 14."]),
        seg("12:00–14:00", "Recap final (mostrar slide 15)", [{ fala: "Retome os 4 pontos-chave do módulo. Agora é hora dos exercícios e da avaliação — e do próximo módulo, sobre comunicar autoridade sem prometer cura." }]),
      ],
    },
  ];

  const totalMin = 13 + 12 + 12 + 11 + 12 + 14;

  const children = [
    ...doc.capa(KICKER, "Roteiro de Aulas — Os Erros Mais Comuns", "Módulo dividido em 6 vídeo-aulas de 11 a 14 minutos, seguindo os slides já produzidos. Cada aula tem roteiro cronometrado, pronto pra gravação."),
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

  return doc.salvar(doc.paginaDoc("Escola de Marketing para Psicólogos", `${RODAPE_DOC} — Roteiro de Aulas`, children), "Modulo-2.2-Roteiro-Aulas.docx");
}

// ============================================================
Promise.resolve()
  .then(construirDeck)
  .then(construirExercicios)
  .then(construirProva)
  .then(construirRoteiro)
  .then(() => console.log("TUDO PRONTO"))
  .catch((e) => { console.error(e); process.exit(1); });

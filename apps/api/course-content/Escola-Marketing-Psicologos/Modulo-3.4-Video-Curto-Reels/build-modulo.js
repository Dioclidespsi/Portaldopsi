const deck = require("../_lib/lib-deck.js");
const doc = require("../_lib/lib-doc.js");

const MOD = "3.4";
const NOME = "Vídeo Curto e Reels";
const RODAPE_DECK = `Vídeo Curto e Reels — Módulo ${MOD}`;
const RODAPE_DOC = `Módulo ${MOD} — Vídeo Curto e Reels`;
const KICKER = "MÓDULO 3.4 · CONTEÚDO E AUTORIDADE";
const MARCA = "Escola de Marketing para Psicólogos — by Dioclides";

// ============================================================
// 1) SLIDE DECK
// ============================================================
function construirDeck() {
  const pres = deck.novaApresentacao(`${NOME} — Comunicação Clínica Acessível`);

  deck.slideTitulo(pres, {
    moduloLabel: `Módulo ${MOD} · Bloco 3 · Conteúdo e Autoridade`,
    titulo: "Vídeo Curto e Reels",
    subtitulo: "Simplificar conceito clínico sem cair em neuro-hype ou generalização perigosa",
    rodapeMarca: MARCA,
    passos: ["Por quê", "A armadilha", "Estrutura", "Erros", "Aplicação"],
  });

  deck.slideRoteiro(pres, {
    rodape: RODAPE_DECK, pageNum: 2,
    cards: [
      { titulo: "Por que vídeo curto", desc: "O formato que mais cresce, e o que ele exige de você" },
      { titulo: "A armadilha da brevidade", desc: "Por que pouco tempo empurra pra generalização" },
      { titulo: "Estrutura de um Reels", desc: "Os 4 elementos que sustentam um vídeo responsável" },
      { titulo: "Erros de generalização", desc: "Sinais de que a simplificação virou distorção" },
      { titulo: "Aplicação prática", desc: "Corrigindo um roteiro que generaliza demais" },
    ],
  });

  deck.slideHook(pres, {
    rodape: RODAPE_DECK, pageNum: 3,
    frase: "Um vídeo de 30 segundos não tem espaço pra nuance — e é exatamente essa pressão por brevidade que mais facilmente empurra um conceito clínico correto pra virar uma generalização perigosa.",
    apoio: "Este módulo aplica ao vídeo curto o mesmo cuidado com simplificação já visto na Formação em Neurociência: reduzir complexidade sem distorcer o que está sendo explicado.",
  });

  deck.slideCircuito(pres, {
    rodape: RODAPE_DECK, pageNum: 4,
    titulo: "4 elementos de um Reels educativo responsável",
    regioes: [
      { label: "Um conceito por vídeo, nunca vários ao mesmo tempo", rx: 0.20, ry: 0.22, color: deck.NAVY, d: 0.5 },
      { label: "Gancho nos primeiros 3 segundos, sem exagero", rx: 0.22, ry: 0.62, color: deck.TERRA, d: 0.4 },
      { label: "Simplificação que reduz complexidade sem distorcer", rx: 0.60, ry: 0.60, color: deck.NAVY_TINT, d: 0.36 },
      { label: "Fechamento sem promessa, convidando à reflexão", rx: 0.58, ry: 0.24, color: deck.TERRA_TINT, d: 0.36 },
    ],
    notas: [
      "Tentar explicar mais de um conceito no mesmo vídeo curto quase sempre resulta em superficialidade em ambos.",
      "O gancho dos primeiros segundos precisa despertar curiosidade genuína, não usar o mesmo tipo de urgência artificial vedado no Bloco 2.",
    ],
  });

  deck.slideCadeia(pres, {
    rodape: RODAPE_DECK, pageNum: 5,
    titulo: "Do conceito ao vídeo pronto",
    elos: [
      { titulo: "Escolher um conceito", desc: "Simples o suficiente pra caber em poucos segundos" },
      { titulo: "Escrever o roteiro", desc: "Em texto, antes de gravar qualquer coisa" },
      { titulo: "Gravar com clareza", desc: "Linguagem acessível, sem jargão técnico desnecessário" },
      { titulo: "Revisar a simplificação", desc: "Checando se ela ainda é fiel ao conceito original" },
    ],
    notaFinal: "Pular o roteiro escrito e gravar direto é o motivo mais comum de um vídeo sair mais raso — ou mais arriscado — do que deveria.",
  });

  deck.slideCategorias(pres, {
    rodape: RODAPE_DECK, pageNum: 6,
    titulo: "3 tipos de Reels educativo",
    categorias: [
      { titulo: "Definição", desc: "Explica de forma simples o que é um conceito clínico específico", color: deck.NAVY },
      { titulo: "Desmistificação", desc: "O mito x fato do Módulo 3.2, adaptado pro formato de vídeo", color: deck.TERRA },
      { titulo: "Bastidor", desc: "Mostra, de forma geral, como funciona o processo terapêutico", color: deck.NAVY_TINT },
    ],
    notaFinal: "Os 3 tipos reaproveitam diretamente os formatos-pilares do Módulo 3.2 — a mudança está só no formato de entrega.",
  });

  deck.slideSinais(pres, {
    rodape: RODAPE_DECK, pageNum: 7,
    titulo: "Sinais de que a simplificação virou generalização",
    itens: [
      { titulo: "\"Todo mundo que sente X tem Y\"", desc: "Afirmação categórica aplicada a qualquer pessoa, sem nuance" },
      { titulo: "Ausência de qualquer ressalva", desc: "Nenhuma menção a variação individual ou contexto" },
      { titulo: "Conselho clínico genérico", desc: "Uma recomendação tratada como válida pra todo mundo, sempre" },
      { titulo: "Título clickbait", desc: "Promessa maior do que o conteúdo do vídeo realmente entrega" },
    ],
  });

  deck.slideDiferencial(pres, {
    rodape: RODAPE_DECK, pageNum: 8,
    titulo: "3 versões do mesmo roteiro",
    cards: [
      { titulo: "Responsável", desc: "\"Um sinal possível de ansiedade é [X] — mas vale sempre investigar com um profissional.\"" },
      { titulo: "Arriscado", desc: "\"Se você sente [X], você provavelmente tem ansiedade.\"" },
      { titulo: "Distorcido", desc: "\"Todo mundo que sente [X] tem ansiedade, sem exceção.\"" },
    ],
  });

  deck.slideInstrumentos(pres, {
    rodape: RODAPE_DECK, pageNum: 9,
    titulo: "3 elementos técnicos de um bom Reels",
    instrumentos: [
      { sigla: "Roteiro escrito", nome: "Texto completo antes de qualquer gravação", desc: "Permite revisar a simplificação com calma, fora da pressão de gravar." },
      { sigla: "Legenda de apoio", nome: "Texto na tela pra quem assiste sem áudio", desc: "Grande parte do público vê vídeo sem som — a mensagem precisa passar assim também." },
      { sigla: "Gancho visual", nome: "Algo nos primeiros segundos que sustenta a atenção", desc: "Sem recorrer a urgência artificial ou exagero emocional." },
    ],
  });

  deck.slideProtocoloOverview(pres, {
    rodape: RODAPE_DECK, pageNum: 10,
    titulo: "Criando um Reels responsável: 4 passos",
    passos: [
      { titulo: "Escrever o\nroteiro em texto", desc: "Antes de qualquer gravação, com calma pra revisar" },
      { titulo: "Aplicar o\nchecklist do Bloco 2", desc: "No roteiro escrito, antes de gravar" },
      { titulo: "Gravar com\nlinguagem acessível", desc: "Sem jargão técnico desnecessário" },
      { titulo: "Revisar o\nvídeo pronto", desc: "Assistindo como se fosse a primeira vez, antes de publicar" },
    ],
    notaFinal: "Esses 4 passos evitam tanto o erro ético do Bloco 2 quanto a generalização perigosa específica do formato de vídeo curto.",
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 11,
    titulo: "Passos 1 e 2, na prática",
    colunas: [
      {
        numero: 1, titulo: "Escrever o roteiro em texto",
        bullets: ["Escreva a fala completa antes de ligar a câmera, mesmo que pareça um passo extra", "É muito mais fácil identificar generalização perigosa lendo do que ouvindo de improviso"],
      },
      {
        numero: 2, titulo: "Aplicar o checklist do Bloco 2",
        fala: "“Esse roteiro promete algo, expõe alguém, ou generaliza demais um conceito que na verdade varia de pessoa pra pessoa?”",
        bullets: ["Revise identificação, veracidade, sigilo e comparação, como em qualquer outro conteúdo"],
      },
    ],
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 12,
    titulo: "Passos 3 e 4, na prática",
    colunas: [
      {
        numero: 3, titulo: "Gravar com linguagem acessível",
        bullets: ["Troque termos técnicos por explicações que qualquer pessoa entenderia", "Fale como se estivesse explicando pra alguém leigo no assunto, não pra um colega"],
      },
      {
        numero: 4, titulo: "Revisar o vídeo pronto",
        bullets: ["Assista de novo antes de publicar, prestando atenção ao tom e ao ritmo, não só ao conteúdo", "Peça a opinião de outra pessoa se o tema for sensível ou você tiver alguma dúvida"],
      },
    ],
  });

  deck.slideCaso(pres, {
    rodape: RODAPE_DECK, pageNum: 13,
    vinheta: "Um psicólogo grava um Reels sobre procrastinação, e no roteiro escreve: \"Se você procrastina, é porque tem medo de falhar — é sempre isso.\" O vídeo tem bom potencial de viralizar, e ele está satisfeito com a clareza da mensagem.",
    perguntas: [
      "Que sinal de generalização perigosa esse roteiro apresenta?",
      "Em que \"versão\" (slide 8) esse roteiro se encaixa, e por quê?",
      "Reescreva o roteiro mantendo a clareza, mas dentro de uma simplificação responsável.",
    ],
  });

  deck.slideEncaminhamento(pres, {
    rodape: RODAPE_DECK, pageNum: 14,
    titulo: "Quando buscar ajuda especializada",
    criterios: [
      "Dificuldade em simplificar sem perder precisão: praticar primeiro em texto, no formato do Módulo 3.2, antes de migrar pro vídeo",
      "Tema clínico sensível ou pouco dominado: buscar mentoria de conteúdo antes de gravar",
      "Produção técnica (edição, áudio) exigindo mais tempo do que disponível: considerar apoio de editor de vídeo",
      "Vídeo já publicado identificado como problemático: seguir o protocolo de correção do Módulo 2.2, adaptado ao vídeo"
    ],
  });

  deck.slideRecap(pres, {
    rodape: RODAPE_DECK, pageNum: 15,
    pontos: [
      "A pressão por brevidade do vídeo curto empurra facilmente um conceito correto pra generalização perigosa",
      "Um conceito por vídeo, gancho sem exagero, simplificação sem distorção e fechamento sem promessa sustentam um Reels responsável",
      "\"Todo mundo que sente X tem Y\" é o sinal mais claro de que a simplificação já virou distorção",
      "Escrever o roteiro em texto antes de gravar é o passo mais simples que evita a maioria dos erros deste módulo",
    ],
    proximoTexto: "Próximo: exercícios práticos e avaliação do Módulo 3.4 →",
  });

  return pres.writeFile({ fileName: "Modulo-3.4-Video-Curto-Reels.pptx" });
}

// ============================================================
// 2) EXERCÍCIOS
// ============================================================
function construirExercicios() {
  const children = [
    ...doc.capa(KICKER, "Exercícios — Vídeo Curto e Reels", "Resolva individualmente, de preferência escrevendo o roteiro de um Reels real enquanto responde."),

    doc.exNum(1, "Os 4 elementos de um Reels responsável"),
    doc.pergunta(1, "Liste os 4 elementos vistos no módulo."),
    ...doc.linhaResposta(3),

    doc.exNum(2, "Os 3 tipos de Reels educativo"),
    doc.tabelaSimples(["Tipo", "O que faz"], [["Definição", ""], ["Desmistificação", ""], ["Bastidor", ""]], [3600, 5550]),

    doc.exNum(3, "Reescrevendo roteiros de risco"),
    doc.pergunta(1, "Reescreva de forma responsável: \"Se você sente [X], você provavelmente tem ansiedade.\""),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Reescreva de forma responsável: \"Todo mundo que sente [X] tem ansiedade, sem exceção.\""),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),

    doc.exNum(4, "Escrevendo seu próprio roteiro"),
    doc.pergunta(1, "Escolha um conceito da sua área e escreva o roteiro completo de um Reels de até 30 segundos, seguindo os 4 passos do protocolo."),
    ...doc.linhaResposta(5),

    doc.exNum(5, "Caso integrado — o roteiro da procrastinação"),
    doc.vinhetaBox("Roteiro: \"Se você procrastina, é porque tem medo de falhar — é sempre isso.\""),
    doc.pergunta(1, "Que sinal de generalização perigosa esse roteiro apresenta?"),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Em que versão (responsável, arriscada ou distorcida) esse roteiro se encaixa?"),
    ...doc.linhaResposta(2),
    doc.pergunta(3, "Reescreva o roteiro mantendo a clareza, dentro de uma simplificação responsável."),
    ...doc.linhaResposta(2),
  ];

  return doc.salvar(doc.paginaDoc("Escola de Marketing para Psicólogos", RODAPE_DOC, children), "Modulo-3.4-Exercicios.docx");
}

// ============================================================
// 3) AVALIAÇÃO
// ============================================================
function construirProva() {
  const objetivas = [
    ["Os 4 elementos de um Reels educativo responsável, segundo o módulo, são:", ["Um conceito por vídeo, gancho sem exagero, simplificação sem distorção, fechamento sem promessa", "Alcance, engajamento, agendamento e custo por lead", "Identificação, veracidade, sigilo e comparação", "Feed, Stories, Carrossel e Direct"]],
    ["A pressão por brevidade do vídeo curto, segundo o módulo, tende a:", ["Empurrar um conceito correto pra generalização perigosa", "Eliminar completamente qualquer risco de erro ético", "Facilitar automaticamente a precisão do conteúdo", "Ser irrelevante para a qualidade da simplificação"]],
    ["Os 3 tipos de Reels educativo, segundo o módulo, reaproveitam diretamente:", ["Os formatos-pilares do Módulo 3.2", "As métricas do Módulo 4.5", "Os critérios de encaminhamento do Bloco 5", "As regras de precificação do Bloco 1"]],
    ["\"Todo mundo que sente X tem Y\" é descrito no módulo como:", ["O sinal mais claro de que a simplificação virou distorção", "Uma forma responsável de comunicar um conceito clínico", "Permitida quando o conceito já é amplamente conhecido", "Irrelevante para o checklist do Bloco 2"]],
    ["Escrever o roteiro em texto antes de gravar serve para:", ["Facilitar a identificação de generalização perigosa antes da gravação", "Aumentar artificialmente o tempo de produção do vídeo", "Substituir a necessidade de aplicar o checklist do Bloco 2", "Garantir automaticamente mais visualizações ao vídeo"]],
    ["\"Legenda de apoio\", como elemento técnico, é importante porque:", ["Grande parte do público assiste vídeo sem áudio", "Substitui completamente a necessidade de um roteiro escrito", "É exigida formalmente pela Resolução CFP", "Aumenta o tempo de duração do vídeo automaticamente"]],
    ["O gancho dos primeiros segundos, segundo o módulo, deve:", ["Despertar curiosidade genuína, sem recorrer a urgência artificial", "Prometer um resultado específico logo no início", "Ser sempre mais longo que o restante do vídeo", "Incluir comparação direta com outros profissionais"]],
    ["Diante de tema clínico sensível ou pouco dominado, o módulo recomenda:", ["Buscar mentoria de conteúdo antes de gravar", "Gravar imediatamente, sem qualquer preparação adicional", "Evitar completamente qualquer produção de vídeo", "Delegar toda a responsabilidade ao editor de vídeo"]],
    ["O passo \"revisar o vídeo pronto\" recomenda:", ["Assistir novamente antes de publicar, atento ao tom e ao ritmo", "Publicar imediatamente após a gravação, sem qualquer revisão", "Substituir a necessidade de aplicar o checklist do Bloco 2", "Revisar apenas a qualidade técnica de imagem e som"]],
    ["Este módulo aplica ao vídeo curto o mesmo cuidado já visto em:", ["Simplificação responsável, tema da Formação em Neurociência", "Precificação de sessão, tema do Bloco 1", "Gestão financeira, tema do Bloco 6", "Objeções de venda, tema do Bloco 5"]],
  ];
  const gabaritoObjetivas = ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a"];

  const children = [
    ...doc.capa(KICKER, "Avaliação — Vídeo Curto e Reels", `Avaliação formativa de encerramento do Módulo ${MOD}.`),
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
    doc.vinhetaBox("Uma psicóloga grava um vídeo curto: \"3 sinais de que você está num relacionamento tóxico\", listando 3 comportamentos, sem qualquer menção de que esses sinais podem ter outras explicações ou variar de contexto pra contexto."),
    new doc.Paragraph({ spacing: { before: 240 }, children: [new doc.TextRun({ text: "Com base no protocolo estudado, responda:", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    new doc.Paragraph({ spacing: { before: 220, after: 40 }, children: [new doc.TextRun({ text: "a) (10 pts) Que risco esse formato de vídeo (lista de sinais) apresenta, mesmo sendo tecnicamente correto?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "b) (10 pts) Que ajuste no roteiro reduziria esse risco, sem perder o formato de lista?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "c) (10 pts) Em que um dos 3 tipos de Reels esse vídeo se encaixa?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "d) (10 pts) Que passo do protocolo, se seguido antes de gravar, provavelmente teria evitado esse problema?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    new doc.Paragraph({ spacing: { after: 40 }, children: [new doc.TextRun({ text: "USO EXCLUSIVO DO INSTRUTOR — remover antes de aplicar a prova", bold: true, color: doc.TERRA, font: doc.FONT, size: 20 })] }),
    doc.tituloH1("Gabarito"),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 1 — Questões objetivas", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 200 }, children: [new doc.TextRun({ text: gabaritoObjetivas.map((r, i) => `${i + 1}-${r}`).join("   ·   "), font: doc.FONT, size: 22, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 2 — Critério de correção da questão de caso", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "a) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Risco de generalização perigosa — listar sinais sem contexto pode levar alguém a diagnosticar a própria relação (ou de outra pessoa) de forma equivocada, sem considerar nuance.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "b) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Adicionar uma ressalva clara, como \"esses sinais podem ter outras explicações — vale conversar com um profissional se algo ressoar com você\".", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "c) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Definição — o vídeo define/lista características de um conceito (relacionamento tóxico) de forma direta.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "d) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Escrever o roteiro em texto antes de gravar (passo 1) e aplicar o checklist do Bloco 2 (passo 2) — a ausência de ressalva provavelmente teria sido notada nessa revisão.", font: doc.FONT, size: 21, color: doc.INK })] }),
  );

  return doc.salvar(doc.paginaDoc("Escola de Marketing para Psicólogos", RODAPE_DOC, children), "Modulo-3.4-Avaliacao.docx");
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
      n: 1, titulo: "Por que vídeo curto, e os 4 elementos", duracao: "13 min", slides: "1, 2, 3, 4",
      objetivo: "Sair sabendo por que vídeo curto exige cuidado redobrado e quais são os 4 elementos de um Reels responsável.",
      segmentos: [
        seg("0:00–0:45", "Abertura (gancho)", [{ fala: "Um vídeo de 30 segundos não tem espaço pra nuance — e é exatamente essa pressão por brevidade que mais facilmente empurra um conceito clínico correto pra virar uma generalização perigosa." }]),
        seg("0:45–2:00", "Por que isso importa", ["Este módulo aplica ao vídeo curto o mesmo cuidado já visto na Formação em Neurociência sobre simplificação responsável."]),
        seg("2:00–9:00", "Os 4 elementos (mostrar slide 4)", [
          "Um conceito por vídeo, nunca vários.",
          "Gancho nos primeiros 3 segundos, sem exagero.",
          "Simplificação que reduz sem distorcer.",
          "Fechamento sem promessa.",
        ]),
        seg("9:00–12:00", "Um ponto importante", ["Tentar explicar mais de um conceito no mesmo vídeo curto quase sempre resulta em superficialidade."]),
        seg("12:00–13:00", "Fechamento", [{ fala: "Próxima aula: do conceito ao vídeo pronto, e os 3 tipos de Reels educativo." }]),
      ],
    },
    {
      n: 2, titulo: "Do conceito ao vídeo, e os 3 tipos de Reels", duracao: "12 min", slides: "5, 6",
      objetivo: "Explicar a cadeia de criação de vídeo e diferenciar os 3 tipos de Reels educativo.",
      segmentos: [
        seg("0:00–1:00", "Retomada rápida", ["Vimos os 4 elementos. Hoje, o caminho completo até o vídeo pronto."]),
        seg("1:00–6:00", "A cadeia (mostrar slide 5)", ["Escolher conceito → Escrever roteiro → Gravar com clareza → Revisar a simplificação."]),
        seg("6:00–11:00", "Os 3 tipos (mostrar slide 6)", ["Definição, desmistificação e bastidor — reaproveitando diretamente os formatos-pilares do Módulo 3.2."]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Próxima aula: os sinais de generalização perigosa, e 3 versões do mesmo roteiro." }]),
      ],
    },
    {
      n: 3, titulo: "Sinais de alerta e 3 versões comparadas", duracao: "12 min", slides: "7, 8",
      objetivo: "Reconhecer sinais de generalização perigosa e comparar 3 versões do mesmo roteiro.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Quatro sinais de generalização — e três versões do mesmo roteiro, da responsável à distorcida."]),
        seg("1:00–6:00", "Sinais de alerta (mostrar slide 7)", [
          "\"Todo mundo que sente X tem Y\".",
          "Ausência de qualquer ressalva.",
          "Conselho clínico genérico.",
          "Título clickbait.",
        ]),
        seg("6:00–11:00", "3 versões (mostrar slide 8)", ["Compare a versão responsável, a arriscada e a distorcida, todas sobre o mesmo tema."]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Próxima aula: os elementos técnicos de um bom Reels, e os 4 passos completos." }]),
      ],
    },
    {
      n: 4, titulo: "Elementos técnicos e os 4 passos", duracao: "11 min", slides: "9, 10",
      objetivo: "Conhecer os 3 elementos técnicos de um bom Reels e os 4 passos completos de produção.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três elementos técnicos — e um processo de 4 passos pra criar qualquer Reels."]),
        seg("1:00–5:00", "3 elementos técnicos (mostrar slide 9)", ["Roteiro escrito, legenda de apoio e gancho visual."]),
        seg("5:00–10:00", "Os 4 passos (mostrar slide 10)", ["Escrever o roteiro, aplicar o checklist do Bloco 2, gravar com clareza, revisar o vídeo pronto."]),
        seg("10:00–11:00", "Fechamento", [{ fala: "Próxima aula: aplicando os 4 passos na prática." }]),
      ],
    },
    {
      n: 5, titulo: "Aplicação prática dos 4 passos", duracao: "12 min", slides: "11, 12",
      objetivo: "Aplicar os 4 passos com exemplos concretos.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Hoje colocamos os 4 passos em prática, do roteiro escrito ao vídeo revisado."]),
        seg("1:00–6:00", "Passos 1 e 2 (mostrar slide 11)", ["Escreva a fala completa antes de ligar a câmera.", { fala: "Esse roteiro promete algo, expõe alguém, ou generaliza demais um conceito que na verdade varia de pessoa pra pessoa?" }]),
        seg("6:00–11:00", "Passos 3 e 4 (mostrar slide 12)", ["Troque termos técnicos por explicações acessíveis.", "Assista de novo antes de publicar, atento ao tom e ao ritmo."]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Próxima aula: um caso real de roteiro generalizador, e o recap final." }]),
      ],
    },
    {
      n: 6, titulo: "Prática guiada — o roteiro da procrastinação e recap final", duracao: "13 min", slides: "13, 14, 15",
      objetivo: "Aplicar tudo que foi visto a um caso real e consolidar os pontos-chave do módulo.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["A última aula do módulo — um caso real, e o recap final."]),
        seg("1:00–5:00", "Apresentando o caso (mostrar slide 13)", ["Leia a vinheta com calma.", "Note que a frase é curta e impactante — exatamente o tipo de frase que viraliza, mas generaliza demais."]),
        seg("5:00–9:00", "Percorrendo as perguntas de discussão", ["Discuta em voz alta as 3 perguntas do slide 13.", "Esboce uma versão reescrita do roteiro."]),
        seg("9:00–11:00", "Quando buscar ajuda especializada (mostrar slide 14)", ["Percorra os 4 critérios do slide 14."]),
        seg("11:00–13:00", "Recap final (mostrar slide 15)", [{ fala: "Retome os 4 pontos-chave do módulo. Agora é hora dos exercícios e da avaliação — e do próximo módulo, sobre email e newsletter." }]),
      ],
    },
  ];

  const totalMin = 13 + 12 + 12 + 11 + 12 + 13;

  const children = [
    ...doc.capa(KICKER, "Roteiro de Aulas — Vídeo Curto e Reels", "Módulo dividido em 6 vídeo-aulas de 11 a 13 minutos, seguindo os slides já produzidos. Cada aula tem roteiro cronometrado, pronto pra gravação."),
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

  return doc.salvar(doc.paginaDoc("Escola de Marketing para Psicólogos", `${RODAPE_DOC} — Roteiro de Aulas`, children), "Modulo-3.4-Roteiro-Aulas.docx");
}

// ============================================================
Promise.resolve()
  .then(construirDeck)
  .then(construirExercicios)
  .then(construirProva)
  .then(construirRoteiro)
  .then(() => console.log("TUDO PRONTO"))
  .catch((e) => { console.error(e); process.exit(1); });

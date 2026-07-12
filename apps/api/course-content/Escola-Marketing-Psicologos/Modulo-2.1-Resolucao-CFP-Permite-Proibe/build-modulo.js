const deck = require("../_lib/lib-deck.js");
const doc = require("../_lib/lib-doc.js");

const MOD = "2.1";
const NOME = "O Que Você Pode Divulgar";
const RODAPE_DECK = `O Que Você Pode Divulgar — Módulo ${MOD}`;
const RODAPE_DOC = `Módulo ${MOD} — O Que Você Pode Divulgar`;
const KICKER = "MÓDULO 2.1 · ÉTICA NA PUBLICIDADE EM PSICOLOGIA";
const MARCA = "Escola de Marketing para Psicólogos — by Dioclides";

// ============================================================
// 1) SLIDE DECK
// ============================================================
function construirDeck() {
  const pres = deck.novaApresentacao(`${NOME} — Resolução CFP e Nota Técnica 01/2022`);

  deck.slideTitulo(pres, {
    moduloLabel: `Módulo ${MOD} · Bloco 2 · Ética na Publicidade`,
    titulo: "O Que Você Pode Divulgar",
    subtitulo: "Resolução CFP nº 03/2007 e Nota Técnica CFP nº 01/2022, na prática",
    rodapeMarca: MARCA,
    passos: ["Base legal", "Permitido", "Proibido", "Zona cinzenta", "Aplicação"],
  });

  deck.slideRoteiro(pres, {
    rodape: RODAPE_DECK, pageNum: 2,
    cards: [
      { titulo: "A base legal", desc: "As 3 fontes que sustentam tudo neste módulo" },
      { titulo: "O que é permitido", desc: "Informar quem você é e como atende, com clareza" },
      { titulo: "O que é proibido", desc: "As linhas que a divulgação profissional não pode cruzar" },
      { titulo: "Zonas de risco", desc: "Onde a maioria dos deslizes realmente acontece" },
      { titulo: "Aplicação prática", desc: "4 perguntas pra rodar antes de publicar qualquer coisa" },
    ],
  });

  deck.slideHook(pres, {
    rodape: RODAPE_DECK, pageNum: 3,
    frase: "Divulgar seu trabalho como psicólogo não é proibido — proibido é prometer o que a psicoterapia não garante, e isso muda completamente o que você pode escrever numa legenda.",
    apoio: "Este módulo é a base de toda a Escola de Marketing: antes de pensar em conteúdo, anúncio ou funil, você precisa saber exatamente onde está a linha.",
  });

  deck.slideCircuito(pres, {
    rodape: RODAPE_DECK, pageNum: 4,
    titulo: "4 pilares da publicidade profissional permitida",
    regioes: [
      { label: "Identificação obrigatória: nome completo, psicólogo(a) e CRP", rx: 0.20, ry: 0.22, color: deck.NAVY, d: 0.5 },
      { label: "Veracidade: nada de exagero ou promessa sobre resultado", rx: 0.22, ry: 0.62, color: deck.TERRA, d: 0.4 },
      { label: "Sigilo e dignidade: nenhuma exposição de paciente ou caso", rx: 0.60, ry: 0.60, color: deck.NAVY_TINT, d: 0.36 },
      { label: "Sem comparação: nenhuma autopromoção às custas de colega", rx: 0.58, ry: 0.24, color: deck.TERRA_TINT, d: 0.36 },
    ],
    notas: [
      "Esses 4 pilares resumem, na prática, o Capítulo II da Resolução CFP nº 03/2007 (Da Publicidade Profissional).",
      "A Nota Técnica CFP nº 01/2022 detalha como aplicar esses mesmos pilares especificamente em redes sociais.",
    ],
  });

  deck.slideCadeia(pres, {
    rodape: RODAPE_DECK, pageNum: 5,
    titulo: "Do texto ao problema ético",
    elos: [
      { titulo: "Ideia de conteúdo", desc: "Nasce de uma vontade genuína de ajudar ou se posicionar" },
      { titulo: "Redação do texto", desc: "Onde a linguagem começa a ganhar forma e emoção" },
      { titulo: "Ponto de virada", desc: "Quando a linguagem passa a prometer, expor ou comparar" },
      { titulo: "Versão final", desc: "Dentro da Resolução, sem perder força de comunicação" },
    ],
    notaFinal: "A maioria dos deslizes éticos não nasce de má intenção — nasce de um texto que, no calor da escrita, avança um passo além do que deveria.",
  });

  deck.slideCategorias(pres, {
    rodape: RODAPE_DECK, pageNum: 6,
    titulo: "3 zonas da divulgação profissional",
    categorias: [
      { titulo: "Permitido", desc: "Informar formação, especialidade e forma de atendimento com clareza", color: deck.NAVY },
      { titulo: "Zona de risco", desc: "Linguagem emocional forte, sem cruzar para promessa explícita", color: deck.TERRA },
      { titulo: "Proibido", desc: "Depoimento de paciente, promessa de resultado, comparação direta", color: deck.NAVY_TINT },
    ],
    notaFinal: "A zona de risco é onde a maioria dos psicólogos escorrega — não por má-fé, mas por não ter esse mapa claro.",
  });

  deck.slideSinais(pres, {
    rodape: RODAPE_DECK, pageNum: 7,
    titulo: "Sinais de que um texto pode estar infringindo a norma",
    itens: [
      { titulo: "Promessa de resultado", desc: "\"Garanta a cura\", \"resolva definitivamente\" — previsão taxativa de resultado" },
      { titulo: "Depoimento identificável", desc: "De paciente real, mesmo com consentimento expresso da pessoa" },
      { titulo: "\"Antes e depois\"", desc: "Relato ou imagem que banaliza uma condição singular e complexa" },
      { titulo: "Comparação com colega", desc: "Autopromoção às custas de outro profissional, direta ou indireta" },
    ],
  });

  deck.slideDiferencial(pres, {
    rodape: RODAPE_DECK, pageNum: 8,
    titulo: "3 frases, lado a lado",
    cards: [
      { titulo: "Frase permitida", desc: "\"Atendo ansiedade e questões de carreira, com abordagem cognitivo-comportamental.\"" },
      { titulo: "Frase de risco", desc: "\"Você não precisa mais sofrer com ansiedade.\" — emocional, mas sem promessa explícita" },
      { titulo: "Frase proibida", desc: "\"Fulana curou sua ansiedade em 3 sessões comigo.\" — depoimento + promessa combinados" },
    ],
  });

  deck.slideInstrumentos(pres, {
    rodape: RODAPE_DECK, pageNum: 9,
    titulo: "3 fontes que sustentam este módulo",
    instrumentos: [
      { sigla: "CEPP", nome: "Código de Ética, Art. 2º, alínea 'q'", desc: "Veda expor diagnóstico, procedimento ou resultado de forma a identificar alguém." },
      { sigla: "CFP 03/2007", nome: "Resolução CFP, Capítulo II — Publicidade Profissional", desc: "A norma central que rege toda divulgação profissional do psicólogo." },
      { sigla: "NT 01/2022", nome: "Nota Técnica CFP sobre redes sociais", desc: "Critérios específicos pra publicidade em Instagram, TikTok e afins." },
    ],
  });

  deck.slideProtocoloOverview(pres, {
    rodape: RODAPE_DECK, pageNum: 10,
    titulo: "Antes de publicar: 4 perguntas",
    passos: [
      { titulo: "Identifica\nvocê corretamente?", desc: "Nome completo, \"psicólogo(a)\" e número do CRP presentes" },
      { titulo: "Promete algo que\na terapia não garante?", desc: "Verifique previsão taxativa de resultado" },
      { titulo: "Expõe alguém,\nmesmo indiretamente?", desc: "Mesmo sem nome, um caso real reconhecível" },
      { titulo: "Se compara a\noutro profissional?", desc: "Autopromoção às custas de colega, direta ou não" },
    ],
    notaFinal: "Se a resposta pra qualquer uma dessas 4 perguntas for \"sim\", o texto precisa ser reescrito antes de publicar.",
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 11,
    titulo: "Perguntas 1 e 2, na prática",
    colunas: [
      {
        numero: 1, titulo: "Identificação correta",
        bullets: ["Nome completo, \"psicólogo(a)\" e número do CRP devem aparecer em toda peça publicitária", "Vale pra bio, posts fixos e rodapé de qualquer anúncio pago"],
      },
      {
        numero: 2, titulo: "Promessa de resultado",
        fala: "“Este texto garante que a pessoa vai se sentir melhor, ou apenas descreve o que você oferece?”",
        bullets: ["Troque \"resolve sua ansiedade\" por \"trabalho com estratégias pra ansiedade\""],
      },
    ],
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 12,
    titulo: "Perguntas 3 e 4, na prática",
    colunas: [
      {
        numero: 3, titulo: "Exposição indireta",
        bullets: ["Evite detalhes de caso real, mesmo sem citar nome", "Evite \"antes e depois\", mesmo de forma genérica ou hipotética"],
      },
      {
        numero: 4, titulo: "Comparação com colega",
        bullets: ["Fale do seu diferencial sem mencionar a concorrência", "Evite frases como \"diferente da maioria dos psicólogos que...\""],
      },
    ],
  });

  deck.slideCaso(pres, {
    rodape: RODAPE_DECK, pageNum: 13,
    vinheta: "Uma psicóloga posta nos stories: \"Recebi essa mensagem de uma paciente hoje: 'depois de 3 meses com você, finalmente consigo dormir a noite toda!' — muito feliz em fazer parte dessa jornada 💙\". O post tem alto engajamento, e ela pergunta se pode fixar como destaque permanente do perfil.",
    perguntas: [
      "Que elementos desse post cruzam a linha da Resolução CFP e da Nota Técnica 01/2022?",
      "Como reescrever esse conteúdo preservando o sentimento de gratidão, sem infringir a norma?",
      "Por que \"mesmo com autorização da paciente\" não resolve o problema ético aqui?",
    ],
  });

  deck.slideEncaminhamento(pres, {
    rodape: RODAPE_DECK, pageNum: 14,
    titulo: "Quando buscar orientação adicional",
    criterios: [
      "Dúvida sobre um caso específico de divulgação: consultar a Comissão de Orientação e Fiscalização do seu CRP regional",
      "Campanha publicitária de maior porte (site, anúncio pago): revisar com um colega ou mentor antes de publicar",
      "Situação de exposição pública não intencional: buscar orientação técnica do CRP imediatamente, antes de mais publicações",
      "Contrato com agência ou terceiro pra criar conteúdo: garantir que a agência conhece as regras do CFP, não só as de marketing genérico",
    ],
  });

  deck.slideRecap(pres, {
    rodape: RODAPE_DECK, pageNum: 15,
    pontos: [
      "Divulgar seu trabalho é permitido — o problema está em prometer resultado, expor paciente ou comparar com colegas",
      "Toda peça publicitária deve identificar nome completo, \"psicólogo(a)\" e número do CRP",
      "Depoimento, \"antes e depois\" e promessa de resultado são proibidos mesmo com consentimento do paciente",
      "Este módulo é a base: releia o checklist do Módulo 2.4 antes de publicar qualquer coisa daqui pra frente",
    ],
    proximoTexto: "Próximo: exercícios práticos e avaliação do Módulo 2.1 →",
  });

  return pres.writeFile({ fileName: "Modulo-2.1-Resolucao-CFP-Permite-Proibe.pptx" });
}

// ============================================================
// 2) EXERCÍCIOS
// ============================================================
function construirExercicios() {
  const children = [
    ...doc.capa(KICKER, "Exercícios — O Que Você Pode Divulgar", "Resolva individualmente. Não existe problema em errar aqui — o objetivo é treinar o olhar antes de publicar de verdade."),

    doc.exNum(1, "Os 4 pilares da publicidade permitida"),
    doc.pergunta(1, "Liste, com suas palavras, os 4 pilares vistos no módulo."),
    ...doc.linhaResposta(3),
    doc.pergunta(2, "Por que a identificação (nome completo, \"psicólogo(a)\" e CRP) é obrigatória em toda peça publicitária?"),
    ...doc.linhaResposta(2),

    doc.exNum(2, "As 3 zonas da divulgação"),
    doc.tabelaSimples(["Zona", "Característica central"], [["Permitido", ""], ["Zona de risco", ""], ["Proibido", ""]], [3600, 5550]),

    doc.exNum(3, "Reescrevendo frases de risco"),
    doc.pergunta(1, "Reescreva de forma permitida: \"Você não precisa mais sofrer com ansiedade.\""),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Reescreva de forma permitida: \"Meus pacientes sempre saem transformados depois de algumas sessões.\""),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),

    doc.exNum(4, "As 4 perguntas antes de publicar"),
    doc.vinhetaBox("Um psicólogo quer publicar: \"Atendo casais há 10 anos e, diferente de muitos colegas que só ouvem, eu realmente resolvo o problema na raiz.\""),
    doc.pergunta(1, "Aplique as 4 perguntas do módulo a esse texto. Que problema(s) você identifica?"),
    ...doc.linhaResposta(3),
    doc.pergunta(2, "Reescreva o texto de forma que ele passe pelas 4 perguntas sem problema."),
    ...doc.linhaResposta(2),

    doc.exNum(5, "Caso integrado — o story da gratidão"),
    doc.vinhetaBox("Uma psicóloga posta nos stories um print de mensagem de uma paciente agradecendo por \"finalmente dormir a noite toda\" depois de 3 meses de terapia, e pergunta se pode fixar como destaque permanente."),
    doc.pergunta(1, "Que elementos desse post cruzam a linha da Resolução CFP e da Nota Técnica 01/2022?"),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Como reescrever esse conteúdo preservando o sentimento de gratidão, sem infringir a norma?"),
    ...doc.linhaResposta(2),
    doc.pergunta(3, "Por que \"mesmo com autorização da paciente\" não resolve o problema ético aqui?"),
    ...doc.linhaResposta(2),
  ];

  return doc.salvar(doc.paginaDoc("Escola de Marketing para Psicólogos", RODAPE_DOC, children), "Modulo-2.1-Exercicios.docx");
}

// ============================================================
// 3) AVALIAÇÃO
// ============================================================
function construirProva() {
  const objetivas = [
    ["A norma central que rege a publicidade profissional do psicólogo é:", ["A Resolução CFP nº 03/2007, Capítulo II", "O Estatuto da Criança e do Adolescente", "A Lei Geral de Proteção de Dados, isoladamente", "Não existe norma específica sobre o tema"]],
    ["Toda peça publicitária de um psicólogo deve obrigatoriamente conter:", ["Nome completo, a palavra \"psicólogo(a)\" e o número do CRP", "Apenas o nome da clínica ou consultório", "Uma lista completa de todos os pacientes atendidos", "O valor exato de todas as sessões oferecidas"]],
    ["Depoimento de paciente identificável é:", ["Proibido, mesmo com consentimento expresso da pessoa", "Permitido sempre que houver autorização por escrito", "Obrigatório para qualquer campanha publicitária", "Permitido apenas em redes sociais, não em sites"]],
    ["\"Antes e depois\" em divulgação profissional é considerado, segundo o módulo:", ["Uma prática que banaliza uma condição singular e complexa", "A forma mais recomendada de mostrar resultado do trabalho", "Permitido desde que sem identificar o paciente", "Uma exigência da Nota Técnica CFP nº 01/2022"]],
    ["A Nota Técnica CFP nº 01/2022 trata especificamente de:", ["Critérios de publicidade profissional em redes sociais", "Regras de prontuário eletrônico", "Precificação de sessões de psicoterapia", "Formação continuada obrigatória"]],
    ["Uma frase como \"garanta a cura da sua ansiedade\" infringe o pilar de:", ["Veracidade — previsão taxativa de resultado", "Identificação obrigatória", "Sigilo e dignidade", "Ausência de comparação"]],
    ["Comparar-se diretamente a \"colegas que só ouvem, sem resolver\" é um exemplo de:", ["Autopromoção às custas de outro profissional", "Publicidade permitida, por ser apenas opinião pessoal", "Identificação correta do profissional", "Prática recomendada pela Nota Técnica CFP"]],
    ["Diante de dúvida sobre um caso específico de divulgação, o módulo recomenda:", ["Consultar a Comissão de Orientação e Fiscalização do CRP regional", "Publicar mesmo assim e corrigir depois se necessário", "Perguntar apenas a colegas sem formação jurídica", "Ignorar a dúvida, já que raramente gera problema real"]],
    ["As 4 perguntas antes de publicar, segundo o módulo, verificam:", ["Identificação, promessa de resultado, exposição indireta e comparação", "Apenas o número de curtidas esperado na publicação", "Exclusivamente o tamanho do texto a ser publicado", "Se o conteúdo foi aprovado por um advogado"]],
    ["Este módulo é descrito no curso como:", ["A base de toda a Escola de Marketing para Psicólogos", "Um conteúdo opcional, sem relação com os demais blocos", "Relevante apenas para quem já teve problema com o CRP", "Um resumo de técnicas de venda, sem base ética"]],
  ];
  const gabaritoObjetivas = ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a"];

  const children = [
    ...doc.capa(KICKER, "Avaliação — O Que Você Pode Divulgar", `Avaliação formativa de encerramento do Módulo ${MOD}.`),
    doc.infoBox([
      ["Nota de corte:", "80 de 100 pontos (nota alta, por se tratar de conformidade regulatória)"],
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
    doc.vinhetaBox("Um psicólogo cria um anúncio pago no Instagram com o texto: \"Depois de anos sofrendo, minha paciente Mariana finalmente encontrou paz. Agende sua sessão e comece sua transformação também.\" O anúncio inclui uma foto de sorriso amplo com a legenda \"antes x depois da terapia\"."),
    new doc.Paragraph({ spacing: { before: 240 }, children: [new doc.TextRun({ text: "Com base no protocolo estudado, responda:", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    new doc.Paragraph({ spacing: { before: 220, after: 40 }, children: [new doc.TextRun({ text: "a) (10 pts) Liste todos os elementos desse anúncio que infringem a Resolução CFP ou a Nota Técnica 01/2022.", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(3),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "b) (10 pts) Reescreva o anúncio de forma que ele mantenha apelo comercial dentro dos limites éticos.", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(3),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "c) (10 pts) Que elemento de identificação obrigatória está ausente no anúncio original?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "d) (10 pts) Que passo você recomendaria a esse psicólogo antes de publicar campanhas futuras?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    new doc.Paragraph({ spacing: { after: 40 }, children: [new doc.TextRun({ text: "USO EXCLUSIVO DO INSTRUTOR — remover antes de aplicar a prova", bold: true, color: doc.TERRA, font: doc.FONT, size: 20 })] }),
    doc.tituloH1("Gabarito"),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 1 — Questões objetivas", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 200 }, children: [new doc.TextRun({ text: gabaritoObjetivas.map((r, i) => `${i + 1}-${r}`).join("   ·   "), font: doc.FONT, size: 22, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 2 — Critério de correção da questão de caso", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "a) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Depoimento identificável (nome \"Mariana\"), promessa de resultado (\"transformação\"), \"antes e depois\" explícito, e ausência de identificação obrigatória do profissional.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "b) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Exemplo: \"Atendo questões de ansiedade e bem-estar emocional com abordagem [X]. [Nome completo], Psicólogo(a), CRP [número]. Agende uma conversa inicial.\"", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "c) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Nome completo do profissional, a palavra \"psicólogo(a)\" e o número do CRP não aparecem em nenhum lugar do anúncio.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "d) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Rodar o checklist de conformidade (Módulo 2.4) antes de qualquer publicação paga, e considerar revisão com colega ou mentor para campanhas de maior porte.", font: doc.FONT, size: 21, color: doc.INK })] }),
  );

  return doc.salvar(doc.paginaDoc("Escola de Marketing para Psicólogos", RODAPE_DOC, children), "Modulo-2.1-Avaliacao.docx");
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
      n: 1, titulo: "A base legal e os 4 pilares", duracao: "13 min", slides: "1, 2, 3, 4",
      objetivo: "Sair sabendo explicar os 4 pilares da publicidade profissional permitida.",
      segmentos: [
        seg("0:00–0:45", "Abertura (gancho)", [{ fala: "Divulgar seu trabalho como psicólogo não é proibido — proibido é prometer o que a psicoterapia não garante, e isso muda completamente o que você pode escrever numa legenda." }]),
        seg("0:45–2:00", "Por que isso importa", ["Este módulo é a base de toda a Escola de Marketing: antes de conteúdo, anúncio ou funil, você precisa saber onde está a linha."]),
        seg("2:00–9:00", "Os 4 pilares (mostrar slide 4)", [
          "Identificação obrigatória: nome completo, psicólogo(a) e CRP.",
          "Veracidade: nada de exagero ou promessa sobre resultado.",
          "Sigilo e dignidade: nenhuma exposição de paciente ou caso.",
          "Sem comparação: nenhuma autopromoção às custas de colega.",
        ]),
        seg("9:00–12:00", "Um ponto importante", ["A maioria dos deslizes éticos não nasce de má intenção — nasce de um texto que avança um passo além do que deveria."]),
        seg("12:00–13:00", "Fechamento", [{ fala: "Próxima aula: do texto ao problema ético, e as 3 zonas da divulgação." }]),
      ],
    },
    {
      n: 2, titulo: "Da ideia ao problema ético, e as 3 zonas", duracao: "12 min", slides: "5, 6",
      objetivo: "Explicar como um texto cruza a linha ética e reconhecer as 3 zonas da divulgação.",
      segmentos: [
        seg("0:00–1:00", "Retomada rápida", ["Vimos os 4 pilares. Hoje, como um texto comum cruza a linha sem perceber."]),
        seg("1:00–6:00", "A cadeia (mostrar slide 5)", ["Ideia de conteúdo → Redação do texto → Ponto de virada → Versão final dentro da Resolução."]),
        seg("6:00–11:00", "As 3 zonas (mostrar slide 6)", ["Permitido: informar formação e especialidade com clareza.", "Zona de risco: linguagem emocional forte, sem promessa explícita.", "Proibido: depoimento, promessa de resultado, comparação direta."]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Próxima aula: os sinais de alerta e 3 frases lado a lado." }]),
      ],
    },
    {
      n: 3, titulo: "Sinais de alerta e 3 frases lado a lado", duracao: "12 min", slides: "7, 8",
      objetivo: "Reconhecer sinais de infração e comparar exemplos permitidos, de risco e proibidos.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Quatro sinais de alerta — e três frases reais, lado a lado, pra fixar a diferença."]),
        seg("1:00–6:00", "Sinais de alerta (mostrar slide 7)", [
          "Promessa de resultado específico.",
          "Depoimento identificável, mesmo com consentimento.",
          "\"Antes e depois\", mesmo genérico.",
          "Comparação direta ou indireta com colega.",
        ]),
        seg("6:00–11:00", "3 frases lado a lado (mostrar slide 8)", ["Frase permitida, frase de risco e frase proibida — a diferença geralmente está em poucas palavras."]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Próxima aula: as 3 fontes legais e as 4 perguntas antes de publicar." }]),
      ],
    },
    {
      n: 4, titulo: "As fontes legais e as 4 perguntas antes de publicar", duracao: "11 min", slides: "9, 10",
      objetivo: "Conhecer as 3 fontes legais e memorizar as 4 perguntas de checagem antes de publicar.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["De onde vem tudo isso — e um checklist rápido de 4 perguntas."]),
        seg("1:00–5:00", "As 3 fontes (mostrar slide 9)", ["CEPP Art. 2º, alínea 'q'.", "Resolução CFP 03/2007, Capítulo II.", "Nota Técnica CFP 01/2022, sobre redes sociais."]),
        seg("5:00–10:00", "As 4 perguntas (mostrar slide 10)", ["Identifica você corretamente? Promete algo que a terapia não garante? Expõe alguém, mesmo indiretamente? Se compara a outro profissional?"]),
        seg("10:00–11:00", "Fechamento", [{ fala: "Próxima aula: aplicando essas 4 perguntas na prática, com exemplos reais." }]),
      ],
    },
    {
      n: 5, titulo: "Aplicação prática das 4 perguntas", duracao: "12 min", slides: "11, 12",
      objetivo: "Aplicar as 4 perguntas de checagem a exemplos de texto reais.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Hoje colocamos as 4 perguntas em prática, com exemplos de texto."]),
        seg("1:00–6:00", "Perguntas 1 e 2 (mostrar slide 11)", ["Identificação correta: nome, \"psicólogo(a)\" e CRP em toda peça.", { fala: "Este texto garante que a pessoa vai se sentir melhor, ou apenas descreve o que você oferece?" }]),
        seg("6:00–11:00", "Perguntas 3 e 4 (mostrar slide 12)", ["Exposição indireta: evite detalhes de caso real, mesmo sem nome.", "Comparação: fale do seu diferencial sem mencionar a concorrência."]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Próxima aula: um caso real de story que viralizou por engano." }]),
      ],
    },
    {
      n: 6, titulo: "Prática guiada — o story da gratidão e recap final", duracao: "14 min", slides: "13, 14, 15",
      objetivo: "Aplicar tudo que foi visto a um caso real e consolidar os pontos-chave do módulo.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["A última aula do módulo — um caso real, e o recap final."]),
        seg("1:00–5:00", "Apresentando o caso (mostrar slide 13)", ["Leia a vinheta do story com calma.", "Note que o problema não é a intenção — é o resultado do texto publicado."]),
        seg("5:00–9:00", "Percorrendo as perguntas de discussão", ["Discuta em voz alta as 3 perguntas do slide 13.", "Esboce uma versão reescrita do story que preserve a emoção sem infringir a norma."]),
        seg("9:00–12:00", "Quando buscar orientação adicional (mostrar slide 14)", ["Percorra os 4 critérios do slide 14."]),
        seg("12:00–14:00", "Recap final (mostrar slide 15)", [{ fala: "Retome os 4 pontos-chave do módulo. Agora é hora dos exercícios e da avaliação — e do próximo módulo, sobre os erros éticos mais comuns." }]),
      ],
    },
  ];

  const totalMin = 13 + 12 + 12 + 11 + 12 + 14;

  const children = [
    ...doc.capa(KICKER, "Roteiro de Aulas — O Que Você Pode Divulgar", "Módulo dividido em 6 vídeo-aulas de 11 a 14 minutos, seguindo os slides já produzidos. Cada aula tem roteiro cronometrado, pronto pra gravação."),
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

  return doc.salvar(doc.paginaDoc("Escola de Marketing para Psicólogos", `${RODAPE_DOC} — Roteiro de Aulas`, children), "Modulo-2.1-Roteiro-Aulas.docx");
}

// ============================================================
Promise.resolve()
  .then(construirDeck)
  .then(construirExercicios)
  .then(construirProva)
  .then(construirRoteiro)
  .then(() => console.log("TUDO PRONTO"))
  .catch((e) => { console.error(e); process.exit(1); });

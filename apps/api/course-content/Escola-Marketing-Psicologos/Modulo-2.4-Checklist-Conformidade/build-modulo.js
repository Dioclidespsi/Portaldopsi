const deck = require("../_lib/lib-deck.js");
const doc = require("../_lib/lib-doc.js");

const MOD = "2.4";
const NOME = "O Checklist Antes de Publicar";
const RODAPE_DECK = `O Checklist Antes de Publicar — Módulo ${MOD}`;
const RODAPE_DOC = `Módulo ${MOD} — O Checklist Antes de Publicar`;
const KICKER = "MÓDULO 2.4 · ÉTICA NA PUBLICIDADE EM PSICOLOGIA";
const MARCA = "Escola de Marketing para Psicólogos — by Dioclides";

// ============================================================
// 1) SLIDE DECK
// ============================================================
function construirDeck() {
  const pres = deck.novaApresentacao(`${NOME} — Ferramenta Prática de Conformidade`);

  deck.slideTitulo(pres, {
    moduloLabel: `Módulo ${MOD} · Bloco 2 · Ética na Publicidade`,
    titulo: "O Checklist Antes de Publicar",
    subtitulo: "Uma ferramenta de 2 minutos pra publicar com confiança, não com medo",
    rodapeMarca: MARCA,
    passos: ["Por quê", "O checklist", "Como usar", "O que evita", "Aplicação"],
  });

  deck.slideRoteiro(pres, {
    rodape: RODAPE_DECK, pageNum: 2,
    cards: [
      { titulo: "Por que um checklist", desc: "Ética não deveria depender de lembrar tudo de cabeça" },
      { titulo: "O checklist completo", desc: "As perguntas organizadas por categoria" },
      { titulo: "Como usar na prática", desc: "Os 3 momentos certos pra rodar essa ferramenta" },
      { titulo: "O que ele evita", desc: "Conectando de volta aos erros dos Módulos 2.1 a 2.3" },
      { titulo: "Aplicação real", desc: "Rodando o checklist num rascunho de verdade" },
    ],
  });

  deck.slideHook(pres, {
    rodape: RODAPE_DECK, pageNum: 3,
    frase: "Ética na publicidade não deveria depender de lembrar tudo de cabeça toda vez — deveria ser um checklist de 2 minutos que você roda antes de apertar publicar.",
    apoio: "Este módulo fecha o Bloco 2 transformando tudo que você viu nos Módulos 2.1, 2.2 e 2.3 numa ferramenta prática, pronta pra usar hoje mesmo.",
  });

  deck.slideCircuito(pres, {
    rodape: RODAPE_DECK, pageNum: 4,
    titulo: "4 categorias que o checklist cobre",
    regioes: [
      { label: "Identificação: nome completo, psicólogo(a) e CRP presentes", rx: 0.20, ry: 0.22, color: deck.NAVY, d: 0.5 },
      { label: "Veracidade: nenhuma promessa de resultado ou prazo", rx: 0.22, ry: 0.62, color: deck.TERRA, d: 0.4 },
      { label: "Sigilo: nenhuma exposição de paciente, caso ou detalhe", rx: 0.60, ry: 0.60, color: deck.NAVY_TINT, d: 0.36 },
      { label: "Comparação: nenhuma autopromoção às custas de colega", rx: 0.58, ry: 0.24, color: deck.TERRA_TINT, d: 0.36 },
    ],
    notas: [
      "Essas 4 categorias retomam diretamente os 4 pilares do Módulo 2.1 — o checklist é a versão aplicável do que você já aprendeu.",
      "Cada categoria vira, na prática, 2 a 3 perguntas objetivas de sim ou não.",
    ],
  });

  deck.slideCadeia(pres, {
    rodape: RODAPE_DECK, pageNum: 5,
    titulo: "Do rascunho ao publicado, em 4 verificações",
    elos: [
      { titulo: "Rascunho pronto", desc: "O texto está escrito, mas ainda não foi revisado" },
      { titulo: "Passagem pelo checklist", desc: "As 4 categorias, rodadas uma de cada vez" },
      { titulo: "Ajustes finais", desc: "Qualquer resposta \"não\" vira uma reescrita pontual" },
      { titulo: "Publicação com confiança", desc: "Sem a dúvida de \"será que isso está certo?\"" },
    ],
    notaFinal: "O checklist não torna a escrita mais lenta — torna a publicação mais segura, o que no fim economiza tempo e ansiedade.",
  });

  deck.slideCategorias(pres, {
    rodape: RODAPE_DECK, pageNum: 6,
    titulo: "3 momentos pra usar o checklist",
    categorias: [
      { titulo: "Conteúdo emocional", desc: "Qualquer post escrito logo após uma sessão marcante ou mensagem de paciente", color: deck.NAVY },
      { titulo: "Campanha paga", desc: "Antes de qualquer anúncio, onde o alcance e a visibilidade são maiores", color: deck.TERRA },
      { titulo: "Auditoria periódica", desc: "Revisão do próprio perfil a cada poucos meses, não só do que é novo", color: deck.NAVY_TINT },
    ],
    notaFinal: "Os 3 momentos cobrem tanto o conteúdo novo quanto o que já está publicado há mais tempo.",
  });

  deck.slideSinais(pres, {
    rodape: RODAPE_DECK, pageNum: 7,
    titulo: "Sinais de que você precisa rodar o checklist agora",
    itens: [
      { titulo: "Orgulho rápido demais", desc: "Você escreveu algo e já quer publicar, sem deixar esfriar" },
      { titulo: "Mensagem emocionante", desc: "Recebeu um feedback tocante de paciente e quer compartilhar" },
      { titulo: "Campanha nova", desc: "Está lançando um anúncio pago que ainda não existia antes" },
      { titulo: "Perfil sem revisão", desc: "Já faz mais de 3 meses que você não audita o próprio conteúdo" },
    ],
  });

  deck.slideDiferencial(pres, {
    rodape: RODAPE_DECK, pageNum: 8,
    titulo: "3 formas de lidar com ética na prática",
    cards: [
      { titulo: "Sem checklist", desc: "Confiar só na memória — mais rápido, mas mais sujeito a erro no impulso" },
      { titulo: "Checklist mental", desc: "Lembrar dos pontos principais, mas sem rigor consistente" },
      { titulo: "Checklist documentado", desc: "Uma lista fixa, sempre igual, rodada antes de qualquer publicação" },
    ],
  });

  deck.slideInstrumentos(pres, {
    rodape: RODAPE_DECK, pageNum: 9,
    titulo: "O checklist, por categoria",
    instrumentos: [
      { sigla: "Identificação", nome: "Nome completo, \"psicólogo(a)\" e CRP aparecem?", desc: "Se não, o texto não está pronto pra publicar, independente do resto." },
      { sigla: "Veracidade", nome: "Existe promessa de resultado, prazo ou cura?", desc: "Troque qualquer garantia por descrição do que você oferece." },
      { sigla: "Sigilo", nome: "Algum detalhe pode identificar um paciente real?", desc: "Mesmo sem nome — reveja qualquer história com base real." },
    ],
  });

  deck.slideProtocoloOverview(pres, {
    rodape: RODAPE_DECK, pageNum: 10,
    titulo: "Rodando o checklist: 4 passos",
    passos: [
      { titulo: "Ler o texto\nem voz alta", desc: "O ouvido percebe exageros que o olho, sozinho, deixa passar" },
      { titulo: "Rodar as 4\nperguntas do 2.1", desc: "Identifica, promete, expõe ou compara?" },
      { titulo: "Aplicar o\nchecklist completo", desc: "As 4 categorias do slide 9, uma de cada vez" },
      { titulo: "Aguardar 24h\nse for emocional", desc: "Distância do Módulo 2.2, reaplicada aqui como hábito final" },
    ],
    notaFinal: "Esses 4 passos levam poucos minutos e reúnem tudo que os Módulos 2.1, 2.2 e 2.3 ensinaram separadamente.",
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 11,
    titulo: "Passos 1 e 2, na prática",
    colunas: [
      {
        numero: 1, titulo: "Ler em voz alta",
        fala: "“Essa frase, ouvida em voz alta, ainda soa como uma descrição honesta, ou já parece um discurso de vendas?”",
        bullets: ["Ler em voz alta revela ritmo e tom que a leitura silenciosa costuma esconder"],
      },
      {
        numero: 2, titulo: "Rodar as 4 perguntas do 2.1",
        bullets: ["Identifica você corretamente? Promete resultado? Expõe alguém? Se compara a colega?", "Qualquer \"sim\" indevido significa parar e reescrever antes de seguir"],
      },
    ],
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 12,
    titulo: "Passos 3 e 4, na prática",
    colunas: [
      {
        numero: 3, titulo: "Aplicar o checklist completo",
        bullets: ["Percorra identificação, veracidade, sigilo e comparação, nessa ordem", "Marque cada categoria como resolvida antes de seguir pra próxima"],
      },
      {
        numero: 4, titulo: "Aguardar 24h se for emocional",
        bullets: ["Vale especialmente pra conteúdo escrito logo após um momento marcante", "Reler no dia seguinte, com a cabeça fria, é o teste final antes de publicar"],
      },
    ],
  });

  deck.slideCaso(pres, {
    rodape: RODAPE_DECK, pageNum: 13,
    vinheta: "Uma psicóloga escreveu um rascunho de post: \"Trabalho com casais há 8 anos e sei exatamente o que fazer pra salvar seu relacionamento, mesmo quando parece impossível.\" Ela está satisfeita com o texto e prestes a publicar.",
    perguntas: [
      "Rode as 4 categorias do checklist nesse texto. O que passa e o que falha?",
      "Que elemento de identificação está faltando nesse rascunho?",
      "Reescreva o texto de forma que ele passe pelo checklist completo.",
    ],
  });

  deck.slideEncaminhamento(pres, {
    rodape: RODAPE_DECK, pageNum: 14,
    titulo: "Quando o checklist sozinho não basta",
    criterios: [
      "Campanha de grande alcance (anúncio pago, site institucional): peça revisão de um colega além do checklist",
      "Tema sensível ou pouco dominado pelo profissional: busque mentoria de conteúdo antes de publicar",
      "Dúvida persistente mesmo após rodar o checklist: consulte a Comissão de Orientação do seu CRP regional",
      "Erro já publicado identificado durante a auditoria: siga o protocolo de correção do Módulo 2.2",
    ],
  });

  deck.slideRecap(pres, {
    rodape: RODAPE_DECK, pageNum: 15,
    pontos: [
      "O checklist cobre 4 categorias: identificação, veracidade, sigilo e comparação",
      "Os 3 momentos certos pra usar: conteúdo emocional, campanha paga e auditoria periódica",
      "Ler em voz alta e aguardar 24h em conteúdo emocional são hábitos simples que evitam a maioria dos erros",
      "Este módulo encerra o Bloco 2 — a base ética que sustenta todos os demais blocos da Escola de Marketing",
    ],
    proximoTexto: "Bloco 2 completo. Próximo: exercícios práticos e avaliação do Módulo 2.4 →",
  });

  return pres.writeFile({ fileName: "Modulo-2.4-Checklist-Conformidade.pptx" });
}

// ============================================================
// 2) EXERCÍCIOS
// ============================================================
function construirExercicios() {
  const children = [
    ...doc.capa(KICKER, "Exercícios — O Checklist Antes de Publicar", "Resolva individualmente. O objetivo é treinar o uso do checklist até que ele vire hábito automático."),

    doc.exNum(1, "As 4 categorias do checklist"),
    doc.pergunta(1, "Liste as 4 categorias do checklist, com a pergunta central de cada uma."),
    ...doc.linhaResposta(4),

    doc.exNum(2, "Os 3 momentos de uso"),
    doc.tabelaSimples(["Momento", "Por que rodar o checklist aqui"], [["Conteúdo emocional", ""], ["Campanha paga", ""], ["Auditoria periódica", ""]], [3200, 5950]),

    doc.exNum(3, "Rodando o checklist num texto real"),
    doc.vinhetaBox("\"Atendo ansiedade há 10 anos e garanto que, com meu método, você vai se sentir muito melhor já nas primeiras semanas.\""),
    doc.pergunta(1, "Rode as 4 categorias do checklist nesse texto. Onde ele falha?"),
    ...doc.linhaResposta(3),
    doc.pergunta(2, "Reescreva o texto de forma que ele passe pelo checklist completo."),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),

    doc.exNum(4, "Aplicando os 4 passos do protocolo"),
    doc.pergunta(1, "Pegue um texto seu (real ou hipotético) e aplique os 4 passos do protocolo deste módulo. Anote o que mudou entre a versão inicial e a final."),
    ...doc.linhaResposta(4),

    doc.exNum(5, "Caso integrado — o rascunho de casal"),
    doc.vinhetaBox("\"Trabalho com casais há 8 anos e sei exatamente o que fazer pra salvar seu relacionamento, mesmo quando parece impossível.\""),
    doc.pergunta(1, "Rode as 4 categorias do checklist nesse texto. O que passa e o que falha?"),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Que elemento de identificação está faltando nesse rascunho?"),
    ...doc.linhaResposta(2),
    doc.pergunta(3, "Reescreva o texto de forma que ele passe pelo checklist completo."),
    ...doc.linhaResposta(2),
  ];

  return doc.salvar(doc.paginaDoc("Escola de Marketing para Psicólogos", RODAPE_DOC, children), "Modulo-2.4-Exercicios.docx");
}

// ============================================================
// 3) AVALIAÇÃO
// ============================================================
function construirProva() {
  const objetivas = [
    ["As 4 categorias do checklist deste módulo são:", ["Identificação, veracidade, sigilo e comparação", "Preço, localização, agenda e forma de pagamento", "Depoimento, urgência, comparação e antes-e-depois", "Formação, conteúdo, transparência e prova social"]],
    ["O checklist deste módulo, segundo o texto, retoma diretamente:", ["Os 4 pilares vistos no Módulo 2.1", "Um conteúdo totalmente novo, sem relação com módulos anteriores", "Apenas as regras específicas de anúncios pagos", "As regras de precificação de sessão"]],
    ["Ler o texto em voz alta antes de publicar serve para:", ["Perceber exageros que a leitura silenciosa costuma deixar passar", "Cumprir uma exigência formal da Resolução CFP", "Aumentar o tempo de produção de conteúdo sem benefício real", "Substituir a necessidade de rodar as demais categorias"]],
    ["Um dos 3 momentos certos pra usar o checklist, segundo o módulo, é:", ["Antes de publicar conteúdo emocional, escrito logo após um momento marcante", "Apenas uma vez, no primeiro dia de uso das redes sociais", "Exclusivamente antes de responder comentários", "Somente quando solicitado por um colega"]],
    ["\"Checklist documentado\", comparado a \"checklist mental\", oferece:", ["Rigor mais consistente, por não depender só da memória no momento", "Exatamente o mesmo nível de consistência, sem diferença prática", "Menos confiabilidade, por depender de anotação externa", "Nenhuma vantagem real sobre confiar na memória"]],
    ["Diante de uma campanha de grande alcance (anúncio pago, site institucional), o módulo recomenda:", ["Pedir revisão de um colega além do checklist", "Publicar direto, já que o checklist sozinho sempre basta", "Evitar completamente esse tipo de campanha", "Aguardar aprovação formal do CFP antes de cada publicação"]],
    ["\"Garanto que você vai se sentir muito melhor já nas primeiras semanas\" falha, no checklist, na categoria de:", ["Veracidade", "Identificação", "Sigilo", "Comparação"]],
    ["Aguardar 24h antes de publicar conteúdo emocional é um hábito que o módulo:", ["Reaplica do Módulo 2.2, como parte final do checklist", "Introduz pela primeira vez, sem relação com módulos anteriores", "Recomenda apenas para campanhas pagas", "Considera desnecessário quando o autor já é experiente"]],
    ["Diante de dúvida persistente mesmo após rodar o checklist, o módulo recomenda:", ["Consultar a Comissão de Orientação do CRP regional", "Publicar mesmo assim, já que a dúvida raramente é relevante", "Ignorar a dúvida e seguir pela intuição pessoal", "Aguardar indefinidamente, sem buscar qualquer orientação"]],
    ["Este módulo, em relação ao Bloco 2 como um todo, representa:", ["O encerramento, transformando os módulos anteriores numa ferramenta prática", "O primeiro módulo do bloco, antes da base teórica", "Um bloco totalmente separado, sem relação com os módulos 2.1 a 2.3", "Um conteúdo opcional, sem relevância pra aplicação prática"]],
  ];
  const gabaritoObjetivas = ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a"];

  const children = [
    ...doc.capa(KICKER, "Avaliação — O Checklist Antes de Publicar", `Avaliação formativa de encerramento do Módulo ${MOD} e do Bloco 2.`),
    doc.infoBox([
      ["Nota de corte:", "80 de 100 pontos (nota alta, por encerrar o bloco de conformidade)"],
      ["Tempo sugerido:", "20 minutos"],
      ["Composição:", "10 questões objetivas (6 pts cada = 60 pts) + 1 questão de caso (40 pts)"],
      ["Consulta:", "Material da aula permitido; discussão entre colegas, não"],
    ]),
    doc.tituloH1("Parte 1 — Questões objetivas"),
  ];
  objetivas.forEach((q, i) => children.push(...doc.questaoObjetiva(i + 1, q[0], q[1])));

  children.push(
    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    doc.tituloH1("Parte 2 — Questão de caso (40 pontos)"),
    doc.vinhetaBox("Um psicólogo recém-formado está lançando seu primeiro site profissional, com uma seção de \"depoimentos de pacientes anônimos\" que ele mesmo escreveu com base em conversas reais, sem citar nomes."),
    new doc.Paragraph({ spacing: { before: 240 }, children: [new doc.TextRun({ text: "Com base no checklist e nos módulos anteriores, responda:", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    new doc.Paragraph({ spacing: { before: 220, after: 40 }, children: [new doc.TextRun({ text: "a) (10 pts) Que categoria(s) do checklist esse conteúdo provavelmente falha, mesmo sendo \"anônimo\"?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "b) (10 pts) Por que \"anônimo\", mesmo escrito pelo próprio profissional, não resolve o problema ético aqui?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "c) (10 pts) Sendo um site institucional de grande alcance, que passo adicional do Módulo 2.4 você recomendaria?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "d) (10 pts) Sugira um conteúdo alternativo pra essa seção do site, dentro do checklist.", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    new doc.Paragraph({ spacing: { after: 40 }, children: [new doc.TextRun({ text: "USO EXCLUSIVO DO INSTRUTOR — remover antes de aplicar a prova", bold: true, color: doc.TERRA, font: doc.FONT, size: 20 })] }),
    doc.tituloH1("Gabarito"),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 1 — Questões objetivas", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 200 }, children: [new doc.TextRun({ text: gabaritoObjetivas.map((r, i) => `${i + 1}-${r}`).join("   ·   "), font: doc.FONT, size: 22, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 2 — Critério de correção da questão de caso", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "a) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Sigilo — mesmo sem nome, um relato baseado em conversa real com detalhe suficiente ainda constitui exposição de caso, o mesmo padrão de erro do Módulo 2.2.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "b) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Porque o CEPP veda expor procedimento ou resultado de forma a identificar alguém — o anonimato do nome não elimina o risco de reconhecimento por detalhes, nem resolve que ainda funciona como depoimento/prova social disfarçada.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "c) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Pedir revisão de um colega além do checklist, já que se trata de campanha de grande alcance (site institucional).", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "d) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Exemplo: substituir a seção de depoimentos por uma seção de \"como eu trabalho\", explicando método e abordagem — autoridade por transparência, não por prova social disfarçada (Módulo 2.3).", font: doc.FONT, size: 21, color: doc.INK })] }),
  );

  return doc.salvar(doc.paginaDoc("Escola de Marketing para Psicólogos", RODAPE_DOC, children), "Modulo-2.4-Avaliacao.docx");
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
      n: 1, titulo: "Por que um checklist, e as 4 categorias", duracao: "10 min", slides: "1, 2, 3, 4",
      objetivo: "Sair sabendo por que o checklist importa e quais são as 4 categorias que ele cobre.",
      segmentos: [
        seg("0:00–0:40", "Abertura (gancho)", [{ fala: "Ética na publicidade não deveria depender de lembrar tudo de cabeça toda vez — deveria ser um checklist de 2 minutos que você roda antes de apertar publicar." }]),
        seg("0:40–1:30", "Por que isso importa", ["Este módulo fecha o Bloco 2 transformando tudo que você viu antes numa ferramenta prática."]),
        seg("1:30–7:30", "As 4 categorias (mostrar slide 4)", [
          "Identificação: nome completo, psicólogo(a) e CRP.",
          "Veracidade: nenhuma promessa de resultado ou prazo.",
          "Sigilo: nenhuma exposição de paciente ou caso.",
          "Comparação: nenhuma autopromoção às custas de colega.",
        ]),
        seg("7:30–10:00", "Fechamento", [{ fala: "Próxima aula: do rascunho ao publicado, e os 3 momentos certos de usar o checklist." }]),
      ],
    },
    {
      n: 2, titulo: "Do rascunho ao publicado, e os 3 momentos de uso", duracao: "10 min", slides: "5, 6",
      objetivo: "Explicar o caminho do rascunho à publicação e os 3 momentos certos de rodar o checklist.",
      segmentos: [
        seg("0:00–1:00", "Retomada rápida", ["Vimos as 4 categorias. Hoje, quando exatamente usar essa ferramenta."]),
        seg("1:00–5:00", "A cadeia (mostrar slide 5)", ["Rascunho pronto → Passagem pelo checklist → Ajustes finais → Publicação com confiança."]),
        seg("5:00–9:00", "Os 3 momentos (mostrar slide 6)", ["Conteúdo emocional, campanha paga e auditoria periódica."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: os sinais de alerta, e as 3 formas de lidar com ética na prática." }]),
      ],
    },
    {
      n: 3, titulo: "Sinais de alerta e o checklist completo", duracao: "10 min", slides: "7, 8, 9",
      objetivo: "Reconhecer sinais de que o checklist precisa ser rodado, e conhecer o checklist completo.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Sinais de alerta — e o checklist completo, categoria por categoria."]),
        seg("1:00–5:00", "Sinais de alerta (mostrar slide 7)", ["Orgulho rápido demais, mensagem emocionante, campanha nova, perfil sem revisão."]),
        seg("5:00–9:00", "O checklist (mostrar slides 8 e 9)", ["Compare as 3 formas de lidar com ética do slide 8.", "Percorra o checklist por categoria do slide 9."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: os 4 passos pra rodar o checklist, na prática." }]),
      ],
    },
    {
      n: 4, titulo: "Aplicação prática dos 4 passos", duracao: "11 min", slides: "10, 11, 12",
      objetivo: "Aplicar os 4 passos do protocolo com exemplos concretos.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Hoje colocamos os 4 passos em prática, do início ao fim."]),
        seg("1:00–2:00", "Visão geral (mostrar slide 10)", ["Ler em voz alta → Rodar as 4 perguntas do 2.1 → Aplicar o checklist → Aguardar 24h se emocional."]),
        seg("2:00–7:00", "Passos 1 e 2 (mostrar slide 11)", [{ fala: "Essa frase, ouvida em voz alta, ainda soa como uma descrição honesta, ou já parece um discurso de vendas?" }, "Identifica, promete, expõe ou compara?"]),
        seg("7:00–10:00", "Passos 3 e 4 (mostrar slide 12)", ["Percorra as 4 categorias, nessa ordem.", "Aguarde 24h se o conteúdo for emocional."]),
        seg("10:00–11:00", "Fechamento", [{ fala: "Próxima aula: um caso real com o rascunho de um post, e o recap final do bloco." }]),
      ],
    },
    {
      n: 5, titulo: "Prática guiada final e encerramento do Bloco 2", duracao: "12 min", slides: "13, 14, 15",
      objetivo: "Aplicar o checklist completo a um caso real e encerrar o Bloco 2.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["A última aula do Bloco 2 — um caso real, e o recap final."]),
        seg("1:00–4:00", "Apresentando o caso (mostrar slide 13)", ["Leia a vinheta do rascunho sobre casais com calma.", "Note que o texto parece inofensivo à primeira vista."]),
        seg("4:00–7:00", "Percorrendo as perguntas de discussão", ["Discuta em voz alta as 3 perguntas do slide 13.", "Esboce uma versão reescrita que passe pelo checklist completo."]),
        seg("7:00–9:00", "Quando o checklist não basta (mostrar slide 14)", ["Percorra os 4 critérios do slide 14."]),
        seg("9:00–12:00", "Recap final e encerramento do bloco (mostrar slide 15)", [{ fala: "Retome os 4 pontos-chave. Você concluiu o Bloco 2 — a base ética que sustenta todos os demais blocos da Escola de Marketing. Agora é hora dos exercícios e da avaliação." }]),
      ],
    },
  ];

  const totalMin = 10 + 10 + 10 + 11 + 12;

  const children = [
    ...doc.capa(KICKER, "Roteiro de Aulas — O Checklist Antes de Publicar", "Módulo dividido em 5 vídeo-aulas de 10 a 12 minutos, seguindo os slides já produzidos. Cada aula tem roteiro cronometrado, pronto pra gravação. Este é o último roteiro do Bloco 2."),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "Duração total do módulo em vídeo: ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: `${totalMin} minutos (${(totalMin / 60).toFixed(1)}h) em 5 aulas`, font: doc.FONT, size: 21, color: doc.INK })] }),
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

  return doc.salvar(doc.paginaDoc("Escola de Marketing para Psicólogos", `${RODAPE_DOC} — Roteiro de Aulas`, children), "Modulo-2.4-Roteiro-Aulas.docx");
}

// ============================================================
Promise.resolve()
  .then(construirDeck)
  .then(construirExercicios)
  .then(construirProva)
  .then(construirRoteiro)
  .then(() => console.log("TUDO PRONTO"))
  .catch((e) => { console.error(e); process.exit(1); });

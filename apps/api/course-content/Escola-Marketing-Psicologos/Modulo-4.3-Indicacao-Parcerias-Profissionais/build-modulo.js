const deck = require("../_lib/lib-deck.js");
const doc = require("../_lib/lib-doc.js");

const MOD = "4.3";
const NOME = "Indicação e Parcerias";
const RODAPE_DECK = `Indicação e Parcerias — Módulo ${MOD}`;
const RODAPE_DOC = `Módulo ${MOD} — Indicação e Parcerias`;
const KICKER = "MÓDULO 4.3 · AQUISIÇÃO DE PACIENTES: ORGÂNICO E PAGO";
const MARCA = "Escola de Marketing para Psicólogos — by Dioclides";

// ============================================================
// 1) SLIDE DECK
// ============================================================
function construirDeck() {
  const pres = deck.novaApresentacao(`${NOME} — Indicação de Mão Dupla`);

  deck.slideTitulo(pres, {
    moduloLabel: `Módulo ${MOD} · Bloco 4 · Aquisição de Pacientes`,
    titulo: "Indicação e Parcerias",
    subtitulo: "Construindo relação com colegas que gera indicação de mão dupla, com naturalidade",
    rodapeMarca: MARCA,
    passos: ["Por quê", "Tipos", "Abordagem", "Manutenção", "Prática"],
  });

  deck.slideRoteiro(pres, {
    rodape: RODAPE_DECK, pageNum: 2,
    cards: [
      { titulo: "Por que indicação importa", desc: "O canal de aquisição com maior taxa de conversão" },
      { titulo: "Tipos de parceria", desc: "Quem faz sentido procurar, e por quê" },
      { titulo: "Como abordar", desc: "A diferença entre parecer genuíno e parecer interesseiro" },
      { titulo: "Mantendo a relação", desc: "O que sustenta uma parceria ao longo do tempo" },
      { titulo: "Aplicação prática", desc: "Um caso real de aproximação com psiquiatra" },
    ],
  });

  deck.slideHook(pres, {
    rodape: RODAPE_DECK, pageNum: 3,
    frase: "A indicação de um colega vale mais que 100 curtidas — porque quem indica já resolveu, pra quem recebe, a pergunta mais difícil de qualquer marketing: \"posso confiar nesse profissional?\"",
    apoio: "Este módulo trata do canal de aquisição mais antigo e ainda um dos mais eficazes: a rede de profissionais que confiam no seu trabalho.",
  });

  deck.slideCircuito(pres, {
    rodape: RODAPE_DECK, pageNum: 4,
    titulo: "4 pilares de uma boa parceria",
    regioes: [
      { label: "Reciprocidade genuína: indicar sem contar pontos", rx: 0.20, ry: 0.22, color: deck.NAVY, d: 0.5 },
      { label: "Especialidades complementares, não concorrentes diretas", rx: 0.22, ry: 0.62, color: deck.TERRA, d: 0.4 },
      { label: "Comunicação clara sobre limites e expectativas", rx: 0.60, ry: 0.60, color: deck.NAVY_TINT, d: 0.36 },
      { label: "Consistência: contato mantido ao longo do tempo", rx: 0.58, ry: 0.24, color: deck.TERRA_TINT, d: 0.36 },
    ],
    notas: [
      "Parcerias que funcionam raramente nascem de um pedido direto de indicação — nascem de relação genuína construída antes.",
      "Especialidades complementares evitam a sensação (real ou percebida) de disputa pelo mesmo paciente.",
    ],
  });

  deck.slideCadeia(pres, {
    rodape: RODAPE_DECK, pageNum: 5,
    titulo: "Da primeira conversa à indicação de mão dupla",
    elos: [
      { titulo: "Mapear profissionais", desc: "Especialidades complementares na sua região ou rede" },
      { titulo: "Primeira aproximação", desc: "Genuína, sem pedir indicação logo de cara" },
      { titulo: "Construir confiança", desc: "Tempo e contato consistente, não um único encontro" },
      { titulo: "Indicação natural", desc: "Nos dois sentidos, sem precisar ser cobrada" },
    ],
    notaFinal: "Pular direto pro último elo sem passar pelos anteriores é o motivo mais comum de uma tentativa de parceria não vingar.",
  });

  deck.slideCategorias(pres, {
    rodape: RODAPE_DECK, pageNum: 6,
    titulo: "3 tipos de parceiros profissionais",
    categorias: [
      { titulo: "Psiquiatras", desc: "Conexão direta com o Bloco 3 — indicação em ambas as direções é comum e esperada", color: deck.NAVY },
      { titulo: "Outros terapeutas", desc: "Especialidades complementares: casal, infantil, neuropsicologia, entre outras", color: deck.TERRA },
      { titulo: "Médicos e saúde geral", desc: "Clínico geral, ginecologista, endocrinologista — portas de entrada comuns", color: deck.NAVY_TINT },
    ],
    notaFinal: "Quanto mais complementar (e menos concorrente) a especialidade, mais natural tende a ser a indicação de mão dupla.",
  });

  deck.slideSinais(pres, {
    rodape: RODAPE_DECK, pageNum: 7,
    titulo: "Sinais de que a parceria não está saudável",
    itens: [
      { titulo: "Indicação de mão única", desc: "Você indica sempre, mas nunca recebe indicação de volta" },
      { titulo: "Contato só por interesse", desc: "Comunicação genérica, sem conhecer de fato o trabalho do outro" },
      { titulo: "Silêncio prolongado", desc: "Meses sem qualquer contato, mesmo esperando reciprocidade" },
      { titulo: "Comissão por indicação", desc: "Oferta ou aceite de pagamento por paciente indicado — vedado eticamente" },
    ],
  });

  deck.slideDiferencial(pres, {
    rodape: RODAPE_DECK, pageNum: 8,
    titulo: "2 formas de abordar, lado a lado",
    cards: [
      { titulo: "Abordagem que afasta", desc: "\"Oi, tudo bem? Podemos trocar indicação de pacientes?\" — direto demais, sem relação prévia" },
      { titulo: "Abordagem que aproxima", desc: "\"Vi seu trabalho com X, achei muito interessante — como você tem abordado isso?\"" },
      { titulo: "O que muda", desc: "A segunda constrói relação primeiro; a indicação vem depois, como consequência natural" },
    ],
  });

  deck.slideInstrumentos(pres, {
    rodape: RODAPE_DECK, pageNum: 9,
    titulo: "3 formas de manter a parceria viva",
    instrumentos: [
      { sigla: "Encontro", nome: "Café, call ou conversa periódica, sem pauta fixa", desc: "Mantém a relação humana, não só profissional." },
      { sigla: "Atualização", nome: "Compartilhar o que você tem estudado ou mudado na prática", desc: "Mostra que a relação segue viva e relevante." },
      { sigla: "Retorno cuidadoso", nome: "Feedback geral sobre encaminhamentos, respeitando sigilo", desc: "Sem detalhar caso — apenas confirmar que o encaminhamento fez sentido." },
    ],
  });

  deck.slideProtocoloOverview(pres, {
    rodape: RODAPE_DECK, pageNum: 10,
    titulo: "Construindo parcerias: 4 passos",
    passos: [
      { titulo: "Mapear\nprofissionais complementares", desc: "Na sua região ou na sua rede de contatos já existente" },
      { titulo: "Fazer a\nprimeira aproximação", desc: "Genuína, baseada em interesse real pelo trabalho do outro" },
      { titulo: "Manter contato\nperiódico", desc: "Sem grande esforço — pequenas interações consistentes" },
      { titulo: "Indicar\nprimeiro", desc: "Sem esperar reciprocidade imediata como condição" },
    ],
    notaFinal: "O passo mais contraintuitivo costuma ser o último — mas é ele que diferencia parceria genuína de troca calculada.",
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 11,
    titulo: "Passos 1 e 2, na prática",
    colunas: [
      {
        numero: 1, titulo: "Mapear profissionais complementares",
        bullets: ["Liste psiquiatras, terapeutas de outras abordagens e médicos que já conhece, mesmo que pouco", "Priorize quem atua perto da sua região ou já compartilha algum contato em comum"],
      },
      {
        numero: 2, titulo: "Primeira aproximação genuína",
        fala: "“Vi seu trabalho com [tema], achei muito interessante — como você tem abordado isso na prática?”",
        bullets: ["Comece pelo interesse genuíno no trabalho do outro, não pelo pedido de indicação"],
      },
    ],
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 12,
    titulo: "Passos 3 e 4, na prática",
    colunas: [
      {
        numero: 3, titulo: "Manter contato periódico",
        bullets: ["Um café a cada poucos meses, ou uma mensagem pontual, já sustenta a relação", "Não precisa de agenda fixa — precisa de consistência ao longo do tempo"],
      },
      {
        numero: 4, titulo: "Indicar primeiro",
        bullets: ["Encaminhe um paciente quando fizer sentido, sem esperar retorno imediato", "A reciprocidade tende a vir com o tempo, quando a relação é genuína"],
      },
    ],
  });

  deck.slideCaso(pres, {
    rodape: RODAPE_DECK, pageNum: 13,
    vinheta: "Uma psicóloga quer construir uma parceria de indicação com um psiquiatra da região, mas nunca conversou com ele antes. Ela pensa em mandar uma mensagem perguntando diretamente se ele topa trocar indicações de pacientes.",
    perguntas: [
      "Por que essa abordagem direta tende a afastar, em vez de aproximar?",
      "Como ela poderia aplicar o passo 2 do protocolo nesse caso específico?",
      "Que tipo de primeiro contato teria mais chance de gerar uma parceria genuína?",
    ],
  });

  deck.slideEncaminhamento(pres, {
    rodape: RODAPE_DECK, pageNum: 14,
    titulo: "Quando a parceria exige mais cuidado",
    criterios: [
      "Oferta de comissão financeira por indicação de pacientes: recusar — a prática fere o código de ética profissional",
      "Excesso de encaminhamentos de um único parceiro: avaliar se sua capacidade de atendimento comporta o volume",
      "Divergência de abordagem clínica com o colega: alinhar expectativas antes de continuar indicando pacientes",
      "Dúvida sobre limites de compartilhamento de informação: nunca detalhar caso clínico, mesmo entre parceiros de confiança",
    ],
  });

  deck.slideRecap(pres, {
    rodape: RODAPE_DECK, pageNum: 15,
    pontos: [
      "Indicação de colega resolve, de forma natural, a pergunta mais difícil de qualquer marketing: \"posso confiar?\"",
      "Reciprocidade genuína, especialidades complementares, comunicação clara e consistência sustentam uma boa parceria",
      "A abordagem que aproxima começa pelo interesse genuíno no trabalho do outro, não pelo pedido direto de indicação",
      "Comissão financeira por indicação de pacientes é vedada eticamente — a parceria certa nunca depende disso",
    ],
    proximoTexto: "Próximo: exercícios práticos e avaliação do Módulo 4.3 →",
  });

  return pres.writeFile({ fileName: "Modulo-4.3-Indicacao-Parcerias-Profissionais.pptx" });
}

// ============================================================
// 2) EXERCÍCIOS
// ============================================================
function construirExercicios() {
  const children = [
    ...doc.capa(KICKER, "Exercícios — Indicação e Parcerias", "Resolva individualmente, de preferência pensando em profissionais reais da sua rede."),

    doc.exNum(1, "Os 4 pilares de uma boa parceria"),
    doc.pergunta(1, "Liste os 4 pilares vistos no módulo, com suas palavras."),
    ...doc.linhaResposta(3),

    doc.exNum(2, "Os 3 tipos de parceiros"),
    doc.tabelaSimples(["Tipo", "Por que faz sentido essa parceria"], [["Psiquiatras", ""], ["Outros terapeutas", ""], ["Médicos e saúde geral", ""]], [3600, 5550]),

    doc.exNum(3, "Mapeando sua própria rede"),
    doc.pergunta(1, "Liste 3 profissionais complementares que você já conhece, mesmo que pouco."),
    ...doc.linhaResposta(3),
    doc.pergunta(2, "Escreva uma mensagem de primeira aproximação genuína para um deles, seguindo o exemplo do módulo."),
    ...doc.linhaResposta(3),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),

    doc.exNum(4, "Reconhecendo parcerias não saudáveis"),
    doc.pergunta(1, "Por que uma oferta de comissão por indicação de paciente é vedada eticamente, mesmo que pareça vantajosa financeiramente?"),
    ...doc.linhaResposta(2),

    doc.exNum(5, "Caso integrado — a mensagem direta"),
    doc.vinhetaBox("Uma psicóloga quer construir parceria de indicação com um psiquiatra que nunca conversou antes, e pensa em perguntar diretamente se ele topa trocar indicações."),
    doc.pergunta(1, "Por que essa abordagem direta tende a afastar, em vez de aproximar?"),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Como ela poderia aplicar o passo 2 do protocolo nesse caso específico?"),
    ...doc.linhaResposta(2),
    doc.pergunta(3, "Que tipo de primeiro contato teria mais chance de gerar uma parceria genuína?"),
    ...doc.linhaResposta(2),
  ];

  return doc.salvar(doc.paginaDoc("Escola de Marketing para Psicólogos", RODAPE_DOC, children), "Modulo-4.3-Exercicios.docx");
}

// ============================================================
// 3) AVALIAÇÃO
// ============================================================
function construirProva() {
  const objetivas = [
    ["Os 4 pilares de uma boa parceria, segundo o módulo, são:", ["Reciprocidade genuína, especialidades complementares, comunicação clara, consistência", "Preço, localização, agenda e horário de atendimento", "Alcance, engajamento, agendamento e retenção", "Identificação, veracidade, sigilo e ausência de comparação"]],
    ["Especialidades complementares, em vez de concorrentes diretas, ajudam a evitar:", ["A sensação, real ou percebida, de disputa pelo mesmo paciente", "Qualquer possibilidade de indicação de mão dupla", "A necessidade de manter contato periódico", "A obrigação de indicar primeiro"]],
    ["A abordagem \"que aproxima\", segundo o módulo, começa por:", ["Interesse genuíno no trabalho do outro profissional", "Pedido direto de troca de indicações", "Oferta de comissão por paciente indicado", "Comparação entre os dois profissionais"]],
    ["Oferta ou aceite de comissão financeira por indicação de pacientes é descrito no módulo como:", ["Uma prática vedada eticamente", "Uma forma recomendada de fortalecer parcerias", "Permitida desde que ambos os profissionais concordem", "Exigida em parcerias com psiquiatras"]],
    ["Um sinal de que a parceria não está saudável é:", ["Indicação sempre de mão única, sem reciprocidade", "Contato mantido de forma consistente ao longo do tempo", "Especialidades complementares entre os dois profissionais", "Comunicação baseada em interesse genuíno pelo trabalho do outro"]],
    ["O passo \"indicar primeiro\", segundo o protocolo, recomenda:", ["Encaminhar um paciente sem esperar retorno imediato como condição", "Esperar sempre que o outro profissional indique primeiro", "Cobrar reciprocidade a cada indicação feita", "Evitar qualquer indicação até ter certeza de retorno"]],
    ["Compartilhar retorno sobre um paciente encaminhado deve ser feito:", ["De forma geral, respeitando o sigilo, sem detalhar o caso", "Com detalhamento completo do caso clínico", "Apenas por escrito, nunca verbalmente", "Somente quando solicitado formalmente pelo outro profissional"]],
    ["Diante de excesso de encaminhamentos de um único parceiro, o módulo recomenda:", ["Avaliar se sua capacidade de atendimento comporta o volume", "Aceitar todos os encaminhamentos, independente da capacidade", "Encerrar a parceria imediatamente", "Repassar automaticamente o excesso sem avaliação"]],
    ["O canal de aquisição tratado neste módulo é descrito como:", ["Um dos mais antigos e ainda um dos mais eficazes", "Um canal irrelevante comparado às redes sociais", "Exclusivo de grandes clínicas, não de consultórios individuais", "Substituto direto do Google Meu Negócio"]],
    ["Este módulo se relaciona ao Bloco 3 (Farmacologia) ao mencionar especificamente:", ["A parceria com psiquiatras como tipo de conexão direta", "Regras de prescrição medicamentosa", "Efeitos colaterais de antidepressivos", "Critérios de encaminhamento para internação"]],
  ];
  const gabaritoObjetivas = ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a"];

  const children = [
    ...doc.capa(KICKER, "Avaliação — Indicação e Parcerias", `Avaliação formativa de encerramento do Módulo ${MOD}.`),
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
    doc.vinhetaBox("Um psicólogo tem uma boa relação com uma ginecologista há 2 anos, com indicações frequentes nos dois sentidos. Recentemente, ela sugeriu que ele pagasse uma pequena porcentagem por cada paciente indicado, \"só pra formalizar a parceria\"."),
    new doc.Paragraph({ spacing: { before: 240 }, children: [new doc.TextRun({ text: "Com base no protocolo estudado, responda:", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    new doc.Paragraph({ spacing: { before: 220, after: 40 }, children: [new doc.TextRun({ text: "a) (10 pts) Como ele deveria responder a essa sugestão, e por quê?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "b) (10 pts) Isso significa que a parceria inteira deve ser encerrada? Por quê?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "c) (10 pts) Que alternativa ele poderia propor pra \"formalizar\" a parceria sem infringir a ética profissional?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "d) (10 pts) Que pilar da parceria (slide 4) essa situação coloca à prova?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    new doc.Paragraph({ spacing: { after: 40 }, children: [new doc.TextRun({ text: "USO EXCLUSIVO DO INSTRUTOR — remover antes de aplicar a prova", bold: true, color: doc.TERRA, font: doc.FONT, size: 20 })] }),
    doc.tituloH1("Gabarito"),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 1 — Questões objetivas", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 200 }, children: [new doc.TextRun({ text: gabaritoObjetivas.map((r, i) => `${i + 1}-${r}`).join("   ·   "), font: doc.FONT, size: 22, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 2 — Critério de correção da questão de caso", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "a) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Recusar com clareza, explicando que pagamento por indicação de paciente fere o código de ética profissional, independente da boa intenção por trás da sugestão.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "b) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Não necessariamente — a parceria de 2 anos com indicação genuína de mão dupla pode continuar, desde que o elemento financeiro seja recusado e a relação permaneça baseada em confiança, não em comissão.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "c) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Propor manter a relação como está — indicação genuína e recíproca, sem contrapartida financeira — reafirmando o valor da parceria como já vinha funcionando.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "d) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Reciprocidade genuína — a proposta de comissão transforma uma relação de confiança mútua numa transação comercial, o que descaracteriza esse pilar.", font: doc.FONT, size: 21, color: doc.INK })] }),
  );

  return doc.salvar(doc.paginaDoc("Escola de Marketing para Psicólogos", RODAPE_DOC, children), "Modulo-4.3-Avaliacao.docx");
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
      n: 1, titulo: "Por que indicação importa, e os 4 pilares", duracao: "13 min", slides: "1, 2, 3, 4",
      objetivo: "Sair sabendo por que indicação é um canal valioso e quais são os 4 pilares de uma boa parceria.",
      segmentos: [
        seg("0:00–0:45", "Abertura (gancho)", [{ fala: "A indicação de um colega vale mais que 100 curtidas — porque quem indica já resolveu, pra quem recebe, a pergunta mais difícil de qualquer marketing: 'posso confiar nesse profissional?'" }]),
        seg("0:45–2:00", "Por que isso importa", ["Este módulo trata do canal de aquisição mais antigo e ainda um dos mais eficazes."]),
        seg("2:00–9:00", "Os 4 pilares (mostrar slide 4)", [
          "Reciprocidade genuína: indicar sem contar pontos.",
          "Especialidades complementares, não concorrentes diretas.",
          "Comunicação clara sobre limites e expectativas.",
          "Consistência: contato mantido ao longo do tempo.",
        ]),
        seg("9:00–12:00", "Um ponto importante", ["Parcerias que funcionam raramente nascem de um pedido direto de indicação."]),
        seg("12:00–13:00", "Fechamento", [{ fala: "Próxima aula: da primeira conversa à indicação de mão dupla, e os 3 tipos de parceiros." }]),
      ],
    },
    {
      n: 2, titulo: "Da primeira conversa à indicação, e os 3 tipos de parceiros", duracao: "12 min", slides: "5, 6",
      objetivo: "Explicar a cadeia de construção de parceria e os 3 tipos de parceiros profissionais.",
      segmentos: [
        seg("0:00–1:00", "Retomada rápida", ["Vimos os 4 pilares. Hoje, o caminho completo até a indicação de mão dupla."]),
        seg("1:00–6:00", "A cadeia (mostrar slide 5)", ["Mapear profissionais → Primeira aproximação → Construir confiança → Indicação natural."]),
        seg("6:00–11:00", "Os 3 tipos de parceiros (mostrar slide 6)", ["Psiquiatras, outros terapeutas e médicos de saúde geral — cada um com sua lógica de indicação."]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Próxima aula: os sinais de parceria não saudável, e 2 formas de abordar, lado a lado." }]),
      ],
    },
    {
      n: 3, titulo: "Sinais de alerta e as 2 formas de abordar", duracao: "12 min", slides: "7, 8",
      objetivo: "Reconhecer sinais de parceria não saudável e comparar formas de fazer a primeira aproximação.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Quatro sinais de alerta — e duas formas de abordar, uma que afasta e outra que aproxima."]),
        seg("1:00–6:00", "Sinais de alerta (mostrar slide 7)", [
          "Indicação de mão única.",
          "Contato só por interesse.",
          "Silêncio prolongado.",
          "Comissão por indicação — vedada eticamente.",
        ]),
        seg("6:00–11:00", "2 formas de abordar (mostrar slide 8)", ["Compare a abordagem que afasta com a que aproxima, e o que muda entre elas."]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Próxima aula: como manter a parceria viva, e os 4 passos completos." }]),
      ],
    },
    {
      n: 4, titulo: "Mantendo a parceria viva, e os 4 passos", duracao: "11 min", slides: "9, 10",
      objetivo: "Conhecer as 3 formas de manter a parceria viva e os 4 passos completos do protocolo.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três formas de manter a relação viva — e um processo de 4 passos completo."]),
        seg("1:00–5:00", "3 formas de manter viva (mostrar slide 9)", ["Encontro periódico, atualização sobre a própria prática, e retorno cuidadoso sobre encaminhamentos."]),
        seg("5:00–10:00", "Os 4 passos (mostrar slide 10)", ["Mapear profissionais complementares, fazer a primeira aproximação, manter contato periódico, indicar primeiro."]),
        seg("10:00–11:00", "Fechamento", [{ fala: "Próxima aula: aplicando os 2 primeiros passos na prática." }]),
      ],
    },
    {
      n: 5, titulo: "Aplicação prática dos 4 passos", duracao: "12 min", slides: "11, 12",
      objetivo: "Aplicar os 4 passos do protocolo com exemplos concretos.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Hoje colocamos os 4 passos em prática, do mapeamento à indicação."]),
        seg("1:00–6:00", "Passos 1 e 2 (mostrar slide 11)", ["Liste profissionais complementares que já conhece, mesmo que pouco.", { fala: "Vi seu trabalho com [tema], achei muito interessante — como você tem abordado isso na prática?" }]),
        seg("6:00–11:00", "Passos 3 e 4 (mostrar slide 12)", ["Mantenha contato periódico, sem precisar de agenda fixa.", "Indique primeiro, sem esperar reciprocidade imediata."]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Próxima aula: um caso real de primeira aproximação com psiquiatra, e o recap final." }]),
      ],
    },
    {
      n: 6, titulo: "Prática guiada — a mensagem direta e recap final", duracao: "13 min", slides: "13, 14, 15",
      objetivo: "Aplicar tudo que foi visto a um caso real e consolidar os pontos-chave do módulo.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["A última aula do módulo — um caso real, e o recap final."]),
        seg("1:00–5:00", "Apresentando o caso (mostrar slide 13)", ["Leia a vinheta com calma.", "Note que a intenção é boa, mas a abordagem pulou etapas importantes."]),
        seg("5:00–9:00", "Percorrendo as perguntas de discussão", ["Discuta em voz alta as 3 perguntas do slide 13.", "Esboce uma mensagem de primeira aproximação mais genuína."]),
        seg("9:00–11:00", "Quando a parceria exige mais cuidado (mostrar slide 14)", ["Percorra os 4 critérios do slide 14."]),
        seg("11:00–13:00", "Recap final (mostrar slide 15)", [{ fala: "Retome os 4 pontos-chave do módulo. Agora é hora dos exercícios e da avaliação — e do próximo módulo, sobre anúncios pagos dentro do limite ético." }]),
      ],
    },
  ];

  const totalMin = 13 + 12 + 12 + 11 + 12 + 13;

  const children = [
    ...doc.capa(KICKER, "Roteiro de Aulas — Indicação e Parcerias", "Módulo dividido em 6 vídeo-aulas de 11 a 13 minutos, seguindo os slides já produzidos. Cada aula tem roteiro cronometrado, pronto pra gravação."),
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

  return doc.salvar(doc.paginaDoc("Escola de Marketing para Psicólogos", `${RODAPE_DOC} — Roteiro de Aulas`, children), "Modulo-4.3-Roteiro-Aulas.docx");
}

// ============================================================
Promise.resolve()
  .then(construirDeck)
  .then(construirExercicios)
  .then(construirProva)
  .then(construirRoteiro)
  .then(() => console.log("TUDO PRONTO"))
  .catch((e) => { console.error(e); process.exit(1); });

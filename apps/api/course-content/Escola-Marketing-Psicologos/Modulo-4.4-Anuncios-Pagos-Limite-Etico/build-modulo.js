const deck = require("../_lib/lib-deck.js");
const doc = require("../_lib/lib-doc.js");

const MOD = "4.4";
const NOME = "Anúncios com Ética";
const RODAPE_DECK = `Anúncios com Ética — Módulo ${MOD}`;
const RODAPE_DOC = `Módulo ${MOD} — Anúncios com Ética`;
const KICKER = "MÓDULO 4.4 · AQUISIÇÃO DE PACIENTES: ORGÂNICO E PAGO";
const MARCA = "Escola de Marketing para Psicólogos — by Dioclides";

// ============================================================
// 1) SLIDE DECK
// ============================================================
function construirDeck() {
  const pres = deck.novaApresentacao(`${NOME} — Instagram e Google Ads Dentro do Limite`);

  deck.slideTitulo(pres, {
    moduloLabel: `Módulo ${MOD} · Bloco 4 · Aquisição de Pacientes`,
    titulo: "Anúncios com Ética",
    subtitulo: "O que é permitido e o que é limite ao investir em Instagram e Google Ads",
    rodapeMarca: MARCA,
    passos: ["Por quê", "O que muda", "Limites", "Estrutura", "Aplicação"],
  });

  deck.slideRoteiro(pres, {
    rodape: RODAPE_DECK, pageNum: 2,
    cards: [
      { titulo: "Por que anunciar", desc: "O que o investimento pago resolve que o orgânico não resolve" },
      { titulo: "O que muda no pago", desc: "Por que o mesmo erro pesa mais quando tem alcance comprado" },
      { titulo: "Limites específicos", desc: "O que observar além do checklist do Bloco 2" },
      { titulo: "Estrutura ética", desc: "Como montar uma campanha do início ao fim" },
      { titulo: "Aplicação prática", desc: "Revisando uma campanha real antes de publicar" },
    ],
  });

  deck.slideHook(pres, {
    rodape: RODAPE_DECK, pageNum: 3,
    frase: "Um anúncio pago amplia o alcance de qualquer erro ético em segundos — o que passaria quase despercebido num post orgânico vira, com investimento, uma campanha inteira violando a Resolução CFP.",
    apoio: "Este módulo aplica tudo que você já viu no Bloco 2 a um contexto de maior risco: o anúncio pago, onde erro custa mais caro e se espalha mais rápido.",
  });

  deck.slideCircuito(pres, {
    rodape: RODAPE_DECK, pageNum: 4,
    titulo: "4 elementos além do checklist orgânico",
    regioes: [
      { label: "Segmentação responsável: sem explorar vulnerabilidade específica", rx: 0.20, ry: 0.22, color: deck.NAVY, d: 0.5 },
      { label: "Criativo revisado pelo checklist completo do Bloco 2", rx: 0.22, ry: 0.62, color: deck.TERRA, d: 0.4 },
      { label: "Página de destino condizente com o que o anúncio promete", rx: 0.60, ry: 0.60, color: deck.NAVY_TINT, d: 0.36 },
      { label: "Investimento sustentável: teste pequeno antes de escalar", rx: 0.58, ry: 0.24, color: deck.TERRA_TINT, d: 0.36 },
    ],
    notas: [
      "Anúncio pago não cria novas regras éticas — ele aumenta a urgência de aplicar bem as que você já conhece.",
      "As próprias plataformas (Meta, Google) já restringem segmentação por condição de saúde sensível — mas isso não substitui o cuidado próprio do profissional.",
    ],
  });

  deck.slideCadeia(pres, {
    rodape: RODAPE_DECK, pageNum: 5,
    titulo: "Do orçamento ao agendamento",
    elos: [
      { titulo: "Definir objetivo", desc: "Reconhecimento, contato ou remarketing — cada um com métrica própria" },
      { titulo: "Criar a peça", desc: "Texto e imagem revisados pelo checklist completo do Bloco 2" },
      { titulo: "Testar pequeno", desc: "Orçamento reduzido, pra validar antes de comprometer mais recurso" },
      { titulo: "Escalar com revisão", desc: "Aumentar investimento só no que já provou funcionar dentro da ética" },
    ],
    notaFinal: "Pular direto pro \"testar grande\" é o erro financeiro mais comum — e também o que mais amplia qualquer problema ético não percebido a tempo.",
  });

  deck.slideCategorias(pres, {
    rodape: RODAPE_DECK, pageNum: 6,
    titulo: "3 tipos de campanha permitidos",
    categorias: [
      { titulo: "Reconhecimento", desc: "Educar e informar sobre um tema, sem foco imediato em conversão", color: deck.NAVY },
      { titulo: "Geração de contato", desc: "Convite claro a uma conversa inicial, sem pressão nem promessa", color: deck.TERRA },
      { titulo: "Remarketing responsável", desc: "Alcançar quem já visitou o perfil, sem insistência excessiva", color: deck.NAVY_TINT },
    ],
    notaFinal: "Os 3 tipos têm em comum a ausência de promessa de resultado — a diferença está só no estágio do funil que atendem.",
  });

  deck.slideSinais(pres, {
    rodape: RODAPE_DECK, pageNum: 7,
    titulo: "Sinais de que o anúncio cruzou a linha",
    itens: [
      { titulo: "Segmentação sensível explícita", desc: "Direcionar por condição de saúde específica de forma direta" },
      { titulo: "Promessa no criativo", desc: "Qualquer garantia de resultado, ainda mais grave com alcance pago" },
      { titulo: "Urgência artificial ampliada", desc: "\"Últimas vagas\" com investimento — o mesmo erro do Módulo 2.2, maior" },
      { titulo: "Página de destino inconsistente", desc: "O anúncio promete uma coisa, e o link entrega outra" },
    ],
  });

  deck.slideDiferencial(pres, {
    rodape: RODAPE_DECK, pageNum: 8,
    titulo: "3 anúncios, o mesmo tema",
    cards: [
      { titulo: "Anúncio permitido", desc: "\"Entenda como a terapia pode ajudar com ansiedade. Saiba mais.\"" },
      { titulo: "Anúncio de risco", desc: "\"Cansado de sofrer com ansiedade? Isso pode mudar rápido.\"" },
      { titulo: "Anúncio proibido", desc: "\"Elimine sua ansiedade em 30 dias ou seu dinheiro de volta.\"" },
    ],
  });

  deck.slideInstrumentos(pres, {
    rodape: RODAPE_DECK, pageNum: 9,
    titulo: "3 elementos de uma campanha ética",
    instrumentos: [
      { sigla: "Segmentação", nome: "Por interesse geral, nunca por diagnóstico específico", desc: "Respeita o limite que as próprias plataformas já sugerem." },
      { sigla: "Texto revisado", nome: "Passou pelo checklist completo do Módulo 2.4", desc: "Mesmo processo do conteúdo orgânico, sem atalho." },
      { sigla: "Página condizente", nome: "Identificação completa e coerência com o anúncio", desc: "O que a pessoa encontra deve bater com o que foi prometido." },
    ],
  });

  deck.slideProtocoloOverview(pres, {
    rodape: RODAPE_DECK, pageNum: 10,
    titulo: "Montando a campanha: 4 passos",
    passos: [
      { titulo: "Definir\num objetivo claro", desc: "Reconhecimento, contato ou remarketing — escolha um por vez" },
      { titulo: "Rodar o\nchecklist do Bloco 2", desc: "Na peça inteira, texto e imagem, antes de publicar" },
      { titulo: "Testar com\norçamento pequeno", desc: "Validar a campanha antes de comprometer mais investimento" },
      { titulo: "Escalar com\nrevisão periódica", desc: "Aumentar investimento só no que já provou funcionar" },
    ],
    notaFinal: "Esses 4 passos evitam tanto o erro ético quanto o desperdício financeiro — os dois costumam andar juntos.",
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 11,
    titulo: "Passos 1 e 2, na prática",
    colunas: [
      {
        numero: 1, titulo: "Definir um objetivo claro",
        bullets: ["Escolha entre reconhecimento, geração de contato ou remarketing — não os três ao mesmo tempo", "Cada objetivo pede um texto e uma métrica de sucesso diferentes"],
      },
      {
        numero: 2, titulo: "Rodar o checklist do Bloco 2",
        fala: "“Esse anúncio, com alcance pago, ainda passa pelas 4 categorias do checklist do Módulo 2.4?”",
        bullets: ["Revise identificação, veracidade, sigilo e comparação — nessa ordem, sem pular nenhuma"],
      },
    ],
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 12,
    titulo: "Passos 3 e 4, na prática",
    colunas: [
      {
        numero: 3, titulo: "Testar com orçamento pequeno",
        bullets: ["Comece com um valor que você aceitaria perder, sem comprometer o restante do mês", "Rode por período curto antes de julgar se a campanha funciona"],
      },
      {
        numero: 4, titulo: "Escalar com revisão periódica",
        bullets: ["Aumente investimento só no anúncio que já mostrou resultado consistente", "Revise a peça periodicamente — o que era ético no lançamento pode precisar de ajuste depois"],
      },
    ],
  });

  deck.slideCaso(pres, {
    rodape: RODAPE_DECK, pageNum: 13,
    vinheta: "Um psicólogo está lançando seu primeiro anúncio pago no Instagram. O rascunho diz: \"Você não precisa mais viver ansioso. Clique e agende sua consulta hoje.\" Ele planeja segmentar o público por \"pessoas com sintomas de ansiedade\", uma opção que encontrou na plataforma de anúncios.",
    perguntas: [
      "Que elementos desse anúncio falham no checklist do Bloco 2?",
      "Por que segmentar por \"sintomas de ansiedade\" é um problema, mesmo sendo uma opção disponível na plataforma?",
      "Reescreva o anúncio e a segmentação de forma que passem pelos 4 passos do protocolo.",
    ],
  });

  deck.slideEncaminhamento(pres, {
    rodape: RODAPE_DECK, pageNum: 14,
    titulo: "Quando buscar ajuda especializada",
    criterios: [
      "Campanha de investimento maior (recorrente ou de grande volume): considerar um gestor de tráfego especializado em saúde",
      "Dúvida sobre configuração técnica da plataforma de anúncios: buscar tutorial oficial ou suporte da própria ferramenta",
      "Resultado consistentemente abaixo do esperado após ajustes: revisar o funil completo (Módulo 4.1), não só o anúncio",
      "Incerteza sobre um criativo específico: aplicar o checklist do Bloco 2 e, se a dúvida persistir, pedir revisão de colega",
    ],
  });

  deck.slideRecap(pres, {
    rodape: RODAPE_DECK, pageNum: 15,
    pontos: [
      "Anúncio pago não cria novas regras éticas — amplia a urgência de aplicar bem as que você já conhece do Bloco 2",
      "Reconhecimento, geração de contato e remarketing responsável são os 3 tipos de campanha permitidos",
      "Segmentação por diagnóstico específico e promessa de resultado são os erros mais graves em anúncio pago",
      "Definir objetivo, rodar o checklist, testar pequeno e escalar com revisão evitam tanto erro ético quanto desperdício financeiro",
    ],
    proximoTexto: "Próximo: exercícios práticos e avaliação do Módulo 4.4 →",
  });

  return pres.writeFile({ fileName: "Modulo-4.4-Anuncios-Pagos-Limite-Etico.pptx" });
}

// ============================================================
// 2) EXERCÍCIOS
// ============================================================
function construirExercicios() {
  const children = [
    ...doc.capa(KICKER, "Exercícios — Anúncios com Ética", "Resolva individualmente, de preferência pensando numa campanha que você já tenha ou pretenda criar."),

    doc.exNum(1, "Os 4 elementos além do checklist orgânico"),
    doc.pergunta(1, "Liste os 4 elementos que um anúncio pago exige além do checklist do conteúdo orgânico."),
    ...doc.linhaResposta(3),

    doc.exNum(2, "Os 3 tipos de campanha"),
    doc.tabelaSimples(["Tipo", "Objetivo principal"], [["Reconhecimento", ""], ["Geração de contato", ""], ["Remarketing responsável", ""]], [3600, 5550]),

    doc.exNum(3, "Reescrevendo anúncios de risco"),
    doc.pergunta(1, "Reescreva de forma permitida: \"Cansado de sofrer com ansiedade? Isso pode mudar rápido.\""),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Reescreva de forma permitida: \"Elimine sua ansiedade em 30 dias ou seu dinheiro de volta.\""),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),

    doc.exNum(4, "Os 4 passos de uma campanha ética"),
    doc.pergunta(1, "Explique por que testar com orçamento pequeno antes de escalar reduz tanto risco financeiro quanto risco ético."),
    ...doc.linhaResposta(2),

    doc.exNum(5, "Caso integrado — o primeiro anúncio"),
    doc.vinhetaBox("Um psicólogo cria o rascunho: \"Você não precisa mais viver ansioso. Clique e agende sua consulta hoje.\", planejando segmentar por \"pessoas com sintomas de ansiedade\"."),
    doc.pergunta(1, "Que elementos desse anúncio falham no checklist do Bloco 2?"),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Por que segmentar por \"sintomas de ansiedade\" é um problema, mesmo sendo uma opção disponível?"),
    ...doc.linhaResposta(2),
    doc.pergunta(3, "Reescreva o anúncio e a segmentação de forma que passem pelos 4 passos do protocolo."),
    ...doc.linhaResposta(2),
  ];

  return doc.salvar(doc.paginaDoc("Escola de Marketing para Psicólogos", RODAPE_DOC, children), "Modulo-4.4-Exercicios.docx");
}

// ============================================================
// 3) AVALIAÇÃO
// ============================================================
function construirProva() {
  const objetivas = [
    ["Os 4 elementos além do checklist orgânico, segundo o módulo, são:", ["Segmentação responsável, criativo revisado, página condizente, investimento sustentável", "Preço, localização, horário e forma de pagamento", "Alcance, engajamento, agendamento e retenção", "Identificação, veracidade, sigilo e comparação"]],
    ["Por que o mesmo erro ético pesa mais em um anúncio pago, segundo o módulo?", ["Porque o alcance comprado amplia o erro em segundos", "Porque anúncios pagos não seguem a Resolução CFP", "Porque o erro só é considerado grave quando é pago", "Não pesa mais — o risco é idêntico ao conteúdo orgânico"]],
    ["Os 3 tipos de campanha permitidos, segundo o módulo, são:", ["Reconhecimento, geração de contato, remarketing responsável", "Depoimento, antes e depois, urgência artificial", "Topo, meio e fundo de funil", "Alcance, engajamento e conversão"]],
    ["Segmentar um anúncio por \"pessoas com sintomas de ansiedade\" é descrito como:", ["Um problema, mesmo sendo uma opção disponível na plataforma", "Uma prática recomendada para aumentar a precisão da campanha", "Permitido, desde que o texto do anúncio não mencione ansiedade", "Exigido pelas plataformas de anúncio para aprovar a campanha"]],
    ["\"Página de destino inconsistente\" ocorre quando:", ["O anúncio promete uma coisa e o link entrega outra", "A página de destino tem identificação completa do profissional", "O anúncio e a página têm exatamente a mesma mensagem", "A página carrega rapidamente em qualquer dispositivo"]],
    ["O primeiro passo do protocolo de montagem de campanha é:", ["Definir um objetivo claro, sem misturar mais de um por vez", "Escalar o investimento imediatamente após a criação da peça", "Ignorar o checklist do Bloco 2 por já ser um anúncio pago", "Segmentar por diagnóstico específico antes de qualquer outra etapa"]],
    ["Testar com orçamento pequeno antes de escalar serve para:", ["Reduzir risco financeiro e risco ético ao mesmo tempo", "Aumentar artificialmente o alcance do anúncio", "Substituir a necessidade de rodar o checklist do Bloco 2", "Garantir aprovação automática da plataforma de anúncios"]],
    ["Diante de campanha de investimento maior e recorrente, o módulo recomenda:", ["Considerar um gestor de tráfego especializado em saúde", "Aumentar o orçamento sem qualquer acompanhamento", "Evitar completamente anúncios pagos a partir desse ponto", "Migrar toda a campanha para conteúdo orgânico imediatamente"]],
    ["\"Elimine sua ansiedade em 30 dias ou seu dinheiro de volta\" é classificado como:", ["Anúncio proibido, por prometer resultado e prazo específicos", "Anúncio permitido, por ser transparente sobre o serviço", "Anúncio de risco, mas aceitável em campanhas de remarketing", "Um exemplo correto de reconhecimento de marca"]],
    ["Este módulo aplica o conteúdo de qual bloco anterior a um contexto de maior risco?", ["Bloco 2 (Ética na Publicidade)", "Bloco 1 (Posicionamento e Nicho)", "Bloco 5 (Vendas e Primeira Sessão)", "Bloco 6 (Gestão e Escala)"]],
  ];
  const gabaritoObjetivas = ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a"];

  const children = [
    ...doc.capa(KICKER, "Avaliação — Anúncios com Ética", `Avaliação formativa de encerramento do Módulo ${MOD}.`),
    doc.infoBox([
      ["Nota de corte:", "75 de 100 pontos"],
      ["Tempo sugerido:", "35 minutos"],
      ["Composição:", "10 questões objetivas (6 pts cada = 60 pts) + 1 questão de caso (40 pts)"],
      ["Consulta:", "Material da aula permitido; discussão entre colegas, não"],
    ]),
    doc.tituloH1("Parte 1 — Questões objetivas"),
  ];
  objetivas.forEach((q, i) => children.push(...doc.questaoObjetiva(i + 1, q[0], q[1])));

  children.push(
    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    doc.tituloH1("Parte 2 — Questão de caso (40 pontos)"),
    doc.vinhetaBox("Uma psicóloga quer anunciar um grupo terapêutico para mães de primeira viagem. O texto do rascunho: \"Grupo exclusivo para mães ansiosas — vagas limitadas, garanta a sua!\" A página de destino, porém, é a home genérica do site, sem menção ao grupo."),
    new doc.Paragraph({ spacing: { before: 240 }, children: [new doc.TextRun({ text: "Com base no protocolo estudado, responda:", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    new doc.Paragraph({ spacing: { before: 220, after: 40 }, children: [new doc.TextRun({ text: "a) (10 pts) Identifique todos os problemas éticos e estruturais presentes nesse anúncio.", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(3),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "b) (10 pts) Reescreva o texto do anúncio de forma ética, mantendo o apelo comercial.", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "c) (10 pts) Que ajuste é necessário na página de destino antes de publicar?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "d) (10 pts) Que tipo de campanha (dos 3 vistos no módulo) esse anúncio deveria seguir?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    new doc.Paragraph({ spacing: { after: 40 }, children: [new doc.TextRun({ text: "USO EXCLUSIVO DO INSTRUTOR — remover antes de aplicar a prova", bold: true, color: doc.TERRA, font: doc.FONT, size: 20 })] }),
    doc.tituloH1("Gabarito"),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 1 — Questões objetivas", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 200 }, children: [new doc.TextRun({ text: gabaritoObjetivas.map((r, i) => `${i + 1}-${r}`).join("   ·   "), font: doc.FONT, size: 22, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 2 — Critério de correção da questão de caso", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "a) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Urgência artificial (\"vagas limitadas, garanta a sua\"), possível exposição indireta (\"mães ansiosas\" rotula o público), e página de destino inconsistente com o anúncio.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "b) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Exemplo: \"Grupo terapêutico para mães de primeira viagem — saiba mais sobre como funciona e agende sua conversa inicial.\"", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "c) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Criar uma página específica sobre o grupo, com identificação completa da profissional, coerente com o que o anúncio promete.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "d) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Geração de contato — o objetivo é converter interesse em conversa inicial sobre o grupo, não apenas reconhecimento de marca.", font: doc.FONT, size: 21, color: doc.INK })] }),
  );

  return doc.salvar(doc.paginaDoc("Escola de Marketing para Psicólogos", RODAPE_DOC, children), "Modulo-4.4-Avaliacao.docx");
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
      n: 1, titulo: "Por que anunciar, e os 4 elementos extras", duracao: "14 min", slides: "1, 2, 3, 4",
      objetivo: "Sair sabendo por que anúncio pago exige cuidado redobrado e quais os 4 elementos além do checklist orgânico.",
      segmentos: [
        seg("0:00–0:45", "Abertura (gancho)", [{ fala: "Um anúncio pago amplia o alcance de qualquer erro ético em segundos — o que passaria quase despercebido num post orgânico vira, com investimento, uma campanha inteira violando a Resolução CFP." }]),
        seg("0:45–2:00", "Por que isso importa", ["Este módulo aplica tudo do Bloco 2 a um contexto de maior risco: o anúncio pago."]),
        seg("2:00–9:00", "Os 4 elementos (mostrar slide 4)", [
          "Segmentação responsável: sem explorar vulnerabilidade específica.",
          "Criativo revisado pelo checklist completo do Bloco 2.",
          "Página de destino condizente com o que o anúncio promete.",
          "Investimento sustentável: teste pequeno antes de escalar.",
        ]),
        seg("9:00–13:00", "Um ponto importante", ["Anúncio pago não cria novas regras éticas — amplia a urgência de aplicar bem as que você já conhece."]),
        seg("13:00–14:00", "Fechamento", [{ fala: "Próxima aula: do orçamento ao agendamento, e os 3 tipos de campanha permitidos." }]),
      ],
    },
    {
      n: 2, titulo: "Do orçamento ao agendamento, e os 3 tipos de campanha", duracao: "12 min", slides: "5, 6",
      objetivo: "Explicar a cadeia da campanha paga e diferenciar os 3 tipos de campanha permitidos.",
      segmentos: [
        seg("0:00–1:00", "Retomada rápida", ["Vimos os 4 elementos. Hoje, do orçamento definido até o agendamento."]),
        seg("1:00–6:00", "A cadeia (mostrar slide 5)", ["Definir objetivo → Criar a peça → Testar pequeno → Escalar com revisão."]),
        seg("6:00–11:00", "Os 3 tipos de campanha (mostrar slide 6)", ["Reconhecimento, geração de contato e remarketing responsável — cada um sem promessa de resultado."]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Próxima aula: os sinais de que o anúncio cruzou a linha, e 3 exemplos lado a lado." }]),
      ],
    },
    {
      n: 3, titulo: "Sinais de alerta e 3 anúncios comparados", duracao: "12 min", slides: "7, 8",
      objetivo: "Reconhecer sinais de que um anúncio cruzou a linha ética e comparar 3 exemplos reais.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Quatro sinais de alerta específicos de anúncio pago — e três exemplos, lado a lado."]),
        seg("1:00–6:00", "Sinais de alerta (mostrar slide 7)", [
          "Segmentação sensível explícita.",
          "Promessa no criativo.",
          "Urgência artificial ampliada.",
          "Página de destino inconsistente.",
        ]),
        seg("6:00–11:00", "3 anúncios (mostrar slide 8)", ["Compare o anúncio permitido, o de risco e o proibido, todos sobre o mesmo tema."]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Próxima aula: os 3 elementos de uma campanha ética, e os 4 passos completos." }]),
      ],
    },
    {
      n: 4, titulo: "Elementos de uma campanha ética e os 4 passos", duracao: "11 min", slides: "9, 10",
      objetivo: "Conhecer os 3 elementos de uma campanha ética e os 4 passos completos de montagem.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três elementos essenciais — e um processo de 4 passos pra montar qualquer campanha."]),
        seg("1:00–5:00", "3 elementos (mostrar slide 9)", ["Segmentação por interesse geral, texto revisado e página condizente."]),
        seg("5:00–10:00", "Os 4 passos (mostrar slide 10)", ["Definir objetivo claro, rodar o checklist, testar com orçamento pequeno, escalar com revisão periódica."]),
        seg("10:00–11:00", "Fechamento", [{ fala: "Próxima aula: aplicando os 4 passos na prática, com atenção ao checklist e ao orçamento." }]),
      ],
    },
    {
      n: 5, titulo: "Aplicação prática dos 4 passos", duracao: "12 min", slides: "11, 12",
      objetivo: "Aplicar os 4 passos com exemplos concretos.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Hoje colocamos os 4 passos em prática, do objetivo à revisão periódica."]),
        seg("1:00–6:00", "Passos 1 e 2 (mostrar slide 11)", ["Escolha um objetivo por vez, não os três ao mesmo tempo.", { fala: "Esse anúncio, com alcance pago, ainda passa pelas 4 categorias do checklist do Módulo 2.4?" }]),
        seg("6:00–11:00", "Passos 3 e 4 (mostrar slide 12)", ["Comece com um valor que aceitaria perder.", "Escale só o que já mostrou resultado consistente."]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Próxima aula: um caso real de primeiro anúncio, e o recap final." }]),
      ],
    },
    {
      n: 6, titulo: "Prática guiada — o primeiro anúncio e recap final", duracao: "13 min", slides: "13, 14, 15",
      objetivo: "Aplicar tudo que foi visto a um caso real e consolidar os pontos-chave do módulo.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["A última aula do módulo — um caso real, e o recap final."]),
        seg("1:00–5:00", "Apresentando o caso (mostrar slide 13)", ["Leia a vinheta com calma.", "Note que o texto e a segmentação falham em pontos diferentes."]),
        seg("5:00–9:00", "Percorrendo as perguntas de discussão", ["Discuta em voz alta as 3 perguntas do slide 13.", "Esboce uma versão reescrita do anúncio e da segmentação."]),
        seg("9:00–11:00", "Quando buscar ajuda especializada (mostrar slide 14)", ["Percorra os 4 critérios do slide 14."]),
        seg("11:00–13:00", "Recap final (mostrar slide 15)", [{ fala: "Retome os 4 pontos-chave do módulo. Agora é hora dos exercícios e da avaliação — e do último módulo do Bloco 4, sobre as métricas que realmente importam." }]),
      ],
    },
  ];

  const totalMin = 14 + 12 + 12 + 11 + 12 + 13;

  const children = [
    ...doc.capa(KICKER, "Roteiro de Aulas — Anúncios com Ética", "Módulo dividido em 6 vídeo-aulas de 11 a 14 minutos, seguindo os slides já produzidos. Cada aula tem roteiro cronometrado, pronto pra gravação."),
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

  return doc.salvar(doc.paginaDoc("Escola de Marketing para Psicólogos", `${RODAPE_DOC} — Roteiro de Aulas`, children), "Modulo-4.4-Roteiro-Aulas.docx");
}

// ============================================================
Promise.resolve()
  .then(construirDeck)
  .then(construirExercicios)
  .then(construirProva)
  .then(construirRoteiro)
  .then(() => console.log("TUDO PRONTO"))
  .catch((e) => { console.error(e); process.exit(1); });

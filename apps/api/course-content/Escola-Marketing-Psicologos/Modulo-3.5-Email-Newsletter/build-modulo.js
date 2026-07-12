const deck = require("../_lib/lib-deck.js");
const doc = require("../_lib/lib-doc.js");

const MOD = "3.5";
const NOME = "Email e Newsletter";
const RODAPE_DECK = `Email e Newsletter — Módulo ${MOD}`;
const RODAPE_DOC = `Módulo ${MOD} — Email e Newsletter`;
const KICKER = "MÓDULO 3.5 · CONTEÚDO E AUTORIDADE";
const MARCA = "Escola de Marketing para Psicólogos — by Dioclides";

// ============================================================
// 1) SLIDE DECK
// ============================================================
function construirDeck() {
  const pres = deck.novaApresentacao(`${NOME} — Relação de Confiança ao Longo do Tempo`);

  deck.slideTitulo(pres, {
    moduloLabel: `Módulo ${MOD} · Bloco 3 · Conteúdo e Autoridade`,
    titulo: "Email e Newsletter",
    subtitulo: "O canal mais esquecido e mais eficaz pra manter relação com quem ainda não agendou",
    rodapeMarca: MARCA,
    passos: ["Por quê", "O que enviar", "Frequência", "Erros", "Aplicação"],
  });

  deck.slideRoteiro(pres, {
    rodape: RODAPE_DECK, pageNum: 2,
    cards: [
      { titulo: "Por que email funciona", desc: "O único canal de conteúdo que ninguém tira de você" },
      { titulo: "O que enviar", desc: "3 tipos de email que sustentam relação de confiança" },
      { titulo: "Frequência e estrutura", desc: "O que torna um email aberto e lido, sem parecer spam" },
      { titulo: "Erros comuns", desc: "Sinais de newsletter que ninguém espera abrir" },
      { titulo: "Aplicação prática", desc: "Reativando uma lista de email esquecida" },
    ],
  });

  deck.slideHook(pres, {
    rodape: RODAPE_DECK, pageNum: 3,
    frase: "Redes sociais são emprestadas — o algoritmo decide quem vê o quê. Uma lista de email é sua, e ninguém tira isso de você.",
    apoio: "Este módulo trata do canal mais esquecido do Bloco 3, mas um dos poucos que mantém relação direta e duradoura, sem depender de algoritmo.",
  });

  deck.slideCircuito(pres, {
    rodape: RODAPE_DECK, pageNum: 4,
    titulo: "4 elementos de uma newsletter que funciona",
    regioes: [
      { label: "Assunto que desperta abertura, sem recorrer a clickbait", rx: 0.20, ry: 0.22, color: deck.NAVY, d: 0.5 },
      { label: "Conteúdo de valor real, não apenas promoção", rx: 0.22, ry: 0.62, color: deck.TERRA, d: 0.4 },
      { label: "Consistência de envio, mesmo que pouco frequente", rx: 0.60, ry: 0.60, color: deck.NAVY_TINT, d: 0.36 },
      { label: "Chamada clara pra um único próximo passo", rx: 0.58, ry: 0.24, color: deck.TERRA_TINT, d: 0.36 },
    ],
    notas: [
      "Um assunto de email exagerado quebra confiança mais rápido do que qualquer outro formato, por chegar direto na caixa de entrada pessoal.",
      "Newsletter só com promoção tende a gerar cancelamento de inscrição rapidamente — o valor real precisa vir antes.",
    ],
  });

  deck.slideCadeia(pres, {
    rodape: RODAPE_DECK, pageNum: 5,
    titulo: "Do cadastro à confiança",
    elos: [
      { titulo: "Cadastro inicial", desc: "Por interesse genuíno ou uma isca de conteúdo simples" },
      { titulo: "Conteúdo regular", desc: "Valor real entregue de forma consistente ao longo do tempo" },
      { titulo: "Familiaridade", desc: "A pessoa passa a reconhecer sua voz e confiar no que você diz" },
      { titulo: "Segurança pra agendar", desc: "Quando pronta, a decisão já está sustentada pela confiança construída" },
    ],
    notaFinal: "Esse processo é mais lento que um anúncio pago, mas a confiança construída assim tende a durar muito mais tempo.",
  });

  deck.slideCategorias(pres, {
    rodape: RODAPE_DECK, pageNum: 6,
    titulo: "3 tipos de email",
    categorias: [
      { titulo: "Educativo", desc: "Aprofunda um tema além do que cabe num post de rede social", color: deck.NAVY },
      { titulo: "Bastidor", desc: "Aproxima, mostrando a pessoa por trás do trabalho, com naturalidade", color: deck.TERRA },
      { titulo: "Convite direto", desc: "Fundo de funil, sem pressão, pra quem já está pronto pra agendar", color: deck.NAVY_TINT },
    ],
    notaFinal: "Alternar entre os 3 tipos evita que a lista sinta que só recebe email quando há algo pra vender.",
  });

  deck.slideSinais(pres, {
    rodape: RODAPE_DECK, pageNum: 7,
    titulo: "Sinais de newsletter que não funciona",
    itens: [
      { titulo: "Só envia com promoção", desc: "A lista associa seu email a \"querem vender algo\", não a valor real" },
      { titulo: "Texto genérico", desc: "Sem voz própria, parecendo copiado de um modelo qualquer" },
      { titulo: "Frequência irregular", desc: "Sem previsibilidade, a pessoa esquece que se cadastrou" },
      { titulo: "Nunca convida a nada", desc: "Conteúdo bom, mas sem direção clara de próximo passo" },
    ],
  });

  deck.slideDiferencial(pres, {
    rodape: RODAPE_DECK, pageNum: 8,
    titulo: "3 tipos de email, por resultado",
    cards: [
      { titulo: "Email de vaidade", desc: "Bonito visualmente, mas sem conteúdo que realmente ajude quem lê" },
      { titulo: "Email só promocional", desc: "Sempre com oferta, gerando cancelamento de inscrição rápido" },
      { titulo: "Email de relação", desc: "Alterna valor real, proximidade e convite, sustentando confiança" },
    ],
  });

  deck.slideInstrumentos(pres, {
    rodape: RODAPE_DECK, pageNum: 9,
    titulo: "3 elementos técnicos de um bom email",
    instrumentos: [
      { sigla: "Assunto claro", nome: "Desperta curiosidade genuína, sem exagero", desc: "É a única linha que decide se o email será aberto ou ignorado." },
      { sigla: "Um objetivo", nome: "Cada email fala de uma única coisa por vez", desc: "Misturar temas dilui a mensagem e confunde quem lê." },
      { sigla: "CTA único", nome: "Uma chamada clara de próximo passo, não várias", desc: "Muitas opções ao mesmo tempo reduzem a chance de qualquer ação." },
    ],
  });

  deck.slideProtocoloOverview(pres, {
    rodape: RODAPE_DECK, pageNum: 10,
    titulo: "Construindo sua newsletter: 4 passos",
    passos: [
      { titulo: "Escolher\numa isca simples", desc: "Um motivo genuíno pra alguém querer se cadastrar" },
      { titulo: "Definir\nfrequência sustentável", desc: "Mensal já sustenta relação, se mantida com consistência" },
      { titulo: "Alternar entre\nos 3 tipos de email", desc: "Educativo, bastidor e convite, sem repetir sempre o mesmo" },
      { titulo: "Revisar com o\nchecklist do Bloco 2", desc: "Mesmo processo de qualquer outro conteúdo publicado" },
    ],
    notaFinal: "Uma newsletter mensal bem mantida vale mais do que uma semanal abandonada depois de 3 envios.",
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 11,
    titulo: "Passos 1 e 2, na prática",
    colunas: [
      {
        numero: 1, titulo: "Escolher uma isca simples",
        bullets: ["Pode ser tão simples quanto \"receba reflexões quinzenais sobre [tema]\"", "Evite promessas exageradas na isca — ela também passa pelo checklist do Bloco 2"],
      },
      {
        numero: 2, titulo: "Definir frequência sustentável",
        fala: "“Consigo escrever e enviar esse email todo mês, mesmo nos meses mais cheios da agenda?”",
        bullets: ["Prefira mensal e consistente a semanal e abandonado depois de pouco tempo"],
      },
    ],
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 12,
    titulo: "Passos 3 e 4, na prática",
    colunas: [
      {
        numero: 3, titulo: "Alternar entre os 3 tipos",
        bullets: ["Um email educativo, outro de bastidor, outro de convite direto — nessa rotação, ou parecida", "Isso evita que a lista associe seu contato só a promoção"],
      },
      {
        numero: 4, titulo: "Revisar com o checklist",
        bullets: ["Identificação, veracidade, sigilo e comparação — o mesmo processo de qualquer conteúdo", "Email chega direto na caixa pessoal — o cuidado importa ainda mais aqui"],
      },
    ],
  });

  deck.slideCaso(pres, {
    rodape: RODAPE_DECK, pageNum: 13,
    vinheta: "Um psicólogo criou uma lista de email há 2 anos, oferecendo um material gratuito em troca do cadastro. Desde então, só enviou 2 emails: um de boas-vindas automático, e um recente anunciando que \"abriu vagas\". A lista tem 400 contatos, mas ele sente que \"gastou\" essa oportunidade e não sabe como recomeçar sem parecer estranho.",
    perguntas: [
      "Que sinal de newsletter que não funciona esse caso exemplifica?",
      "Como ele poderia reabrir contato com essa lista sem parecer que está \"vendendo do nada\"?",
      "Que tipo de email (dos 3 vistos) seria mais indicado pra esse primeiro reenvio?",
    ],
  });

  deck.slideEncaminhamento(pres, {
    rodape: RODAPE_DECK, pageNum: 14,
    titulo: "Quando buscar ajuda especializada",
    criterios: [
      "Lista grande, mas taxa de abertura muito baixa: revisar a qualidade dos assuntos antes de qualquer outra mudança",
      "Dificuldade técnica com ferramenta de envio: buscar tutorial da própria plataforma escolhida",
      "Volume de conteúdo grande, mas sem estrutura de email: aplicar os templates do Módulo 3.2, adaptados ao formato",
      "Lista antiga e nunca usada: recomeçar com transparência, explicando a pausa, em vez de fingir que nada aconteceu"
    ],
  });

  deck.slideRecap(pres, {
    rodape: RODAPE_DECK, pageNum: 15,
    pontos: [
      "Email é o único canal de conteúdo que não depende de algoritmo — a lista é inteiramente sua",
      "Educativo, bastidor e convite direto são os 3 tipos de email que sustentam relação de confiança",
      "Frequência sustentável e consistente vale mais que frequência alta e abandonada",
      "O checklist do Bloco 2 vale pra email como pra qualquer outro conteúdo — talvez com ainda mais cuidado, por chegar direto na caixa pessoal",
    ],
    proximoTexto: "Próximo: exercícios práticos e avaliação do Módulo 3.5 →",
  });

  return pres.writeFile({ fileName: "Modulo-3.5-Email-Newsletter.pptx" });
}

// ============================================================
// 2) EXERCÍCIOS
// ============================================================
function construirExercicios() {
  const children = [
    ...doc.capa(KICKER, "Exercícios — Email e Newsletter", "Resolva individualmente, de preferência já esboçando sua própria estrutura de newsletter enquanto responde."),

    doc.exNum(1, "Os 4 elementos de uma newsletter"),
    doc.pergunta(1, "Liste os 4 elementos de uma newsletter que funciona, vistos no módulo."),
    ...doc.linhaResposta(3),

    doc.exNum(2, "Os 3 tipos de email"),
    doc.tabelaSimples(["Tipo", "Função principal"], [["Educativo", ""], ["Bastidor", ""], ["Convite direto", ""]], [3600, 5550]),

    doc.exNum(3, "Planejando sua isca de cadastro"),
    doc.pergunta(1, "Esboce uma isca simples de cadastro pra sua lista de email."),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Que frequência você conseguiria manter de forma sustentável?"),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),

    doc.exNum(4, "Escrevendo um assunto de email"),
    doc.pergunta(1, "Escreva 2 opções de assunto de email sobre um tema da sua área, que desperte curiosidade sem clickbait."),
    ...doc.linhaResposta(2),

    doc.exNum(5, "Caso integrado — a lista esquecida"),
    doc.vinhetaBox("Um psicólogo tem uma lista de 400 contatos há 2 anos, mas só enviou 2 emails no período, e não sabe como recomeçar sem parecer estranho."),
    doc.pergunta(1, "Que sinal de newsletter que não funciona esse caso exemplifica?"),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Como ele poderia reabrir contato com essa lista sem parecer que está \"vendendo do nada\"?"),
    ...doc.linhaResposta(2),
    doc.pergunta(3, "Que tipo de email seria mais indicado pra esse primeiro reenvio?"),
    ...doc.linhaResposta(2),
  ];

  return doc.salvar(doc.paginaDoc("Escola de Marketing para Psicólogos", RODAPE_DOC, children), "Modulo-3.5-Exercicios.docx");
}

// ============================================================
// 3) AVALIAÇÃO
// ============================================================
function construirProva() {
  const objetivas = [
    ["Os 4 elementos de uma newsletter que funciona, segundo o módulo, são:", ["Assunto sem clickbait, conteúdo de valor, consistência de envio, chamada clara", "Alcance, engajamento, agendamento e custo por lead", "Feed, Stories, Carrossel e Direct", "Identificação, veracidade, sigilo e comparação"]],
    ["A principal vantagem do email, segundo o módulo, é:", ["Não depender de algoritmo — a lista pertence inteiramente ao profissional", "Ter alcance automaticamente maior que qualquer rede social", "Dispensar qualquer cuidado com o checklist do Bloco 2", "Substituir totalmente a necessidade de conteúdo no Instagram"]],
    ["Os 3 tipos de email, segundo o módulo, são:", ["Educativo, bastidor, convite direto", "Topo, meio e fundo de funil", "Reconhecimento, geração de contato e remarketing", "Explicação, mito x fato e reflexão guiada"]],
    ["\"Só envia com promoção\" é descrito como um sinal de:", ["Newsletter que não funciona", "Newsletter bem estruturada e eficaz", "Uma prática recomendada pelo módulo", "Consistência de envio adequada"]],
    ["A frequência recomendada pelo módulo, quando há dúvida, é:", ["Mensal e consistente, em vez de semanal e abandonada", "Diária, independente da disponibilidade real", "Anual, para reduzir o esforço de produção", "Não enviar email regularmente, apenas quando surgir promoção"]],
    ["\"Um objetivo\", como elemento técnico de um bom email, recomenda:", ["Que cada email fale de uma única coisa por vez", "Incluir o máximo de temas possíveis em cada envio", "Substituir a necessidade de um assunto claro", "Focar exclusivamente em conteúdo promocional"]],
    ["\"CTA único\" busca:", ["Uma chamada clara de próximo passo, evitando múltiplas opções ao mesmo tempo", "Incluir o maior número possível de links no email", "Substituir a necessidade de conteúdo de valor", "Ser usado apenas em emails promocionais"]],
    ["Diante de lista grande, mas taxa de abertura muito baixa, o módulo recomenda:", ["Revisar a qualidade dos assuntos antes de qualquer outra mudança", "Aumentar imediatamente a frequência de envio", "Excluir toda a lista e recomeçar do zero", "Ignorar a métrica, já que não é relevante"]],
    ["Diante de uma lista antiga nunca usada, o módulo recomenda:", ["Recomeçar com transparência, explicando a pausa", "Fingir que nada aconteceu e enviar normalmente", "Excluir a lista, já que não pode mais ser reativada", "Enviar apenas promoções para reconquistar a atenção"]],
    ["O cuidado do checklist do Bloco 2, segundo o módulo, é ainda mais importante em email porque:", ["O email chega direto na caixa de entrada pessoal do destinatário", "Email não é considerado publicidade profissional", "A Resolução CFP não se aplica a comunicações por email", "Email tem alcance automaticamente menor que redes sociais"]],
  ];
  const gabaritoObjetivas = ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a"];

  const children = [
    ...doc.capa(KICKER, "Avaliação — Email e Newsletter", `Avaliação formativa de encerramento do Módulo ${MOD}.`),
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
    doc.vinhetaBox("Uma psicóloga quer começar uma newsletter, mas está insegura sobre o que escrever, com medo de \"não ter assunto suficiente\" pra manter envios regulares."),
    new doc.Paragraph({ spacing: { before: 240 }, children: [new doc.TextRun({ text: "Com base no protocolo estudado, responda:", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    new doc.Paragraph({ spacing: { before: 220, after: 40 }, children: [new doc.TextRun({ text: "a) (10 pts) Que isca simples de cadastro você sugeriria pra ela começar?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "b) (10 pts) Que frequência você recomendaria, dado o receio dela sobre falta de assunto?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "c) (10 pts) Como alternar entre os 3 tipos de email ajudaria com o receio de \"falta de assunto\"?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "d) (10 pts) Esboce um assunto de email pro primeiro envio dela.", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    new doc.Paragraph({ spacing: { after: 40 }, children: [new doc.TextRun({ text: "USO EXCLUSIVO DO INSTRUTOR — remover antes de aplicar a prova", bold: true, color: doc.TERRA, font: doc.FONT, size: 20 })] }),
    doc.tituloH1("Gabarito"),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 1 — Questões objetivas", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 200 }, children: [new doc.TextRun({ text: gabaritoObjetivas.map((r, i) => `${i + 1}-${r}`).join("   ·   "), font: doc.FONT, size: 22, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 2 — Critério de correção da questão de caso", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "a) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Exemplo: \"receba reflexões mensais sobre [tema da especialidade]\" — simples, sem promessa exagerada.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "b) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Mensal — reduz a pressão de encontrar assunto com frequência, e ainda é suficiente pra sustentar relação de confiança.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "c) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Reduz a pressão de sempre criar conteúdo educativo novo — email de bastidor e de convite direto usam menos \"assunto técnico\" e mais proximidade ou clareza de próximo passo.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "d) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Resposta livre — avaliar se desperta curiosidade genuína sem clickbait, coerente com um dos 3 tipos de email do módulo.", font: doc.FONT, size: 21, color: doc.INK })] }),
  );

  return doc.salvar(doc.paginaDoc("Escola de Marketing para Psicólogos", RODAPE_DOC, children), "Modulo-3.5-Avaliacao.docx");
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
      n: 1, titulo: "Por que email, e os 4 elementos", duracao: "12 min", slides: "1, 2, 3, 4",
      objetivo: "Sair sabendo por que email ainda é relevante e quais são os 4 elementos de uma newsletter eficaz.",
      segmentos: [
        seg("0:00–0:45", "Abertura (gancho)", [{ fala: "Redes sociais são emprestadas — o algoritmo decide quem vê o quê. Uma lista de email é sua, e ninguém tira isso de você." }]),
        seg("0:45–2:00", "Por que isso importa", ["Este módulo trata do canal mais esquecido do Bloco 3, mas um dos poucos que não depende de algoritmo."]),
        seg("2:00–8:00", "Os 4 elementos (mostrar slide 4)", [
          "Assunto que desperta abertura, sem clickbait.",
          "Conteúdo de valor real, não apenas promoção.",
          "Consistência de envio, mesmo pouco frequente.",
          "Chamada clara pra um único próximo passo.",
        ]),
        seg("8:00–11:00", "Um ponto importante", ["Um assunto exagerado quebra confiança mais rápido em email do que em qualquer outro formato."]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Próxima aula: do cadastro à confiança, e os 3 tipos de email." }]),
      ],
    },
    {
      n: 2, titulo: "Do cadastro à confiança, e os 3 tipos de email", duracao: "11 min", slides: "5, 6",
      objetivo: "Explicar a jornada do cadastro à confiança e diferenciar os 3 tipos de email.",
      segmentos: [
        seg("0:00–1:00", "Retomada rápida", ["Vimos os 4 elementos. Hoje, a jornada completa até a confiança construída."]),
        seg("1:00–5:00", "A cadeia (mostrar slide 5)", ["Cadastro inicial → Conteúdo regular → Familiaridade → Segurança pra agendar."]),
        seg("5:00–10:00", "Os 3 tipos (mostrar slide 6)", ["Educativo, bastidor e convite direto — alternar entre eles evita parecer só promocional."]),
        seg("10:00–11:00", "Fechamento", [{ fala: "Próxima aula: os sinais de newsletter que não funciona, e 3 tipos por resultado." }]),
      ],
    },
    {
      n: 3, titulo: "Sinais de alerta e 3 tipos por resultado", duracao: "12 min", slides: "7, 8",
      objetivo: "Reconhecer sinais de newsletter ineficaz e diferenciar 3 tipos de email por resultado.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Quatro sinais de alerta — e três tipos de email, do vaidoso ao de relação."]),
        seg("1:00–6:00", "Sinais de alerta (mostrar slide 7)", [
          "Só envia com promoção.",
          "Texto genérico, sem voz própria.",
          "Frequência irregular.",
          "Nunca convida a nada.",
        ]),
        seg("6:00–11:00", "3 tipos por resultado (mostrar slide 8)", ["Email de vaidade, só promocional e de relação — o objetivo é sempre o terceiro."]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Próxima aula: os elementos técnicos de um bom email, e os 4 passos completos." }]),
      ],
    },
    {
      n: 4, titulo: "Elementos técnicos e os 4 passos", duracao: "11 min", slides: "9, 10",
      objetivo: "Conhecer os 3 elementos técnicos de um bom email e os 4 passos de construção da newsletter.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três elementos técnicos — e um processo de 4 passos pra construir sua newsletter."]),
        seg("1:00–5:00", "3 elementos técnicos (mostrar slide 9)", ["Assunto claro, um objetivo por email e CTA único."]),
        seg("5:00–10:00", "Os 4 passos (mostrar slide 10)", ["Escolher isca simples, definir frequência, alternar tipos, revisar com o checklist."]),
        seg("10:00–11:00", "Fechamento", [{ fala: "Próxima aula: aplicando os 4 passos na prática." }]),
      ],
    },
    {
      n: 5, titulo: "Aplicação prática dos 4 passos", duracao: "12 min", slides: "11, 12",
      objetivo: "Aplicar os 4 passos com exemplos concretos.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Hoje colocamos os 4 passos em prática, da isca ao checklist."]),
        seg("1:00–6:00", "Passos 1 e 2 (mostrar slide 11)", ["Uma isca simples já basta pra começar.", { fala: "Consigo escrever e enviar esse email todo mês, mesmo nos meses mais cheios da agenda?" }]),
        seg("6:00–11:00", "Passos 3 e 4 (mostrar slide 12)", ["Alterne entre educativo, bastidor e convite direto.", "Revise com as 4 categorias do checklist do Bloco 2."]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Próxima aula: um caso real de lista esquecida, e o recap final." }]),
      ],
    },
    {
      n: 6, titulo: "Prática guiada — a lista esquecida e recap final", duracao: "13 min", slides: "13, 14, 15",
      objetivo: "Aplicar tudo que foi visto a um caso real e consolidar os pontos-chave do módulo.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["A última aula do módulo — um caso real, e o recap final."]),
        seg("1:00–5:00", "Apresentando o caso (mostrar slide 13)", ["Leia a vinheta com calma.", "Note que a lista existe, o problema é só a falta de uso consistente."]),
        seg("5:00–9:00", "Percorrendo as perguntas de discussão", ["Discuta em voz alta as 3 perguntas do slide 13.", "Esboce um plano de retomada pra essa lista."]),
        seg("9:00–11:00", "Quando buscar ajuda especializada (mostrar slide 14)", ["Percorra os 4 critérios do slide 14."]),
        seg("11:00–13:00", "Recap final (mostrar slide 15)", [{ fala: "Retome os 4 pontos-chave do módulo. Agora é hora dos exercícios e da avaliação — e do último módulo do Bloco 3, sobre planejamento editorial." }]),
      ],
    },
  ];

  const totalMin = 12 + 11 + 12 + 11 + 12 + 13;

  const children = [
    ...doc.capa(KICKER, "Roteiro de Aulas — Email e Newsletter", "Módulo dividido em 6 vídeo-aulas de 11 a 13 minutos, seguindo os slides já produzidos. Cada aula tem roteiro cronometrado, pronto pra gravação."),
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

  return doc.salvar(doc.paginaDoc("Escola de Marketing para Psicólogos", `${RODAPE_DOC} — Roteiro de Aulas`, children), "Modulo-3.5-Roteiro-Aulas.docx");
}

// ============================================================
Promise.resolve()
  .then(construirDeck)
  .then(construirExercicios)
  .then(construirProva)
  .then(construirRoteiro)
  .then(() => console.log("TUDO PRONTO"))
  .catch((e) => { console.error(e); process.exit(1); });

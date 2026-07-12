const deck = require("../_lib/lib-deck.js");
const doc = require("../_lib/lib-doc.js");

const MOD = "6.2";
const NOME = "Ferramentas Essenciais";
const RODAPE_DECK = `Ferramentas Essenciais — Módulo ${MOD}`;
const RODAPE_DOC = `Módulo ${MOD} — Ferramentas Essenciais`;
const KICKER = "MÓDULO 6.2 · GESTÃO E ESCALA DO CONSULTÓRIO";
const MARCA = "Escola de Marketing para Psicólogos — by Dioclides";

// ============================================================
// 1) SLIDE DECK
// ============================================================
function construirDeck() {
  const pres = deck.novaApresentacao(`${NOME} — Agenda, Prontuário e Lembretes`);

  deck.slideTitulo(pres, {
    moduloLabel: `Módulo ${MOD} · Bloco 6 · Gestão e Escala`,
    titulo: "Ferramentas Essenciais",
    subtitulo: "O kit mínimo pra parar de gerenciar tudo por WhatsApp e planilha solta",
    rodapeMarca: MARCA,
    passos: ["Por quê", "3 categorias", "Como escolher", "Erros", "Aplicação"],
  });

  deck.slideRoteiro(pres, {
    rodape: RODAPE_DECK, pageNum: 2,
    cards: [
      { titulo: "Por que ferramentas importam", desc: "O custo invisível de gerenciar tudo manualmente" },
      { titulo: "As 3 categorias essenciais", desc: "O mínimo que qualquer consultório deveria ter" },
      { titulo: "Como escolher sem complicar", desc: "3 critérios simples pra decidir entre opções" },
      { titulo: "Erros comuns", desc: "Sinais de que falta ferramenta adequada" },
      { titulo: "Aplicação prática", desc: "Migrando um consultório do caos ao sistema" },
    ],
  });

  deck.slideHook(pres, {
    rodape: RODAPE_DECK, pageNum: 3,
    frase: "Gerenciar agenda por WhatsApp funciona até o dia em que duas pessoas marcam o mesmo horário — e nesse dia você descobre o preço real de não ter um sistema.",
    apoio: "Este módulo apresenta o kit mínimo de ferramentas que sustenta um consultório organizado, sem exigir virar especialista em tecnologia.",
  });

  deck.slideCircuito(pres, {
    rodape: RODAPE_DECK, pageNum: 4,
    titulo: "4 funções que um kit de ferramentas cobre",
    regioes: [
      { label: "Agendamento e confirmação de sessões", rx: 0.20, ry: 0.22, color: deck.NAVY, d: 0.5 },
      { label: "Prontuário e registro clínico organizado", rx: 0.22, ry: 0.62, color: deck.TERRA, d: 0.4 },
      { label: "Lembretes automáticos, do Módulo 5.4", rx: 0.60, ry: 0.60, color: deck.NAVY_TINT, d: 0.36 },
      { label: "Pagamento e cobrança organizados", rx: 0.58, ry: 0.24, color: deck.TERRA_TINT, d: 0.36 },
    ],
    notas: [
      "Não é preciso resolver as 4 funções de uma vez — comece pela que mais gera dor de cabeça hoje.",
      "Prontuário eletrônico organizado também sustenta o sigilo profissional exigido pelo Código de Ética.",
    ],
  });

  deck.slideCadeia(pres, {
    rodape: RODAPE_DECK, pageNum: 5,
    titulo: "Do caos ao sistema simples",
    elos: [
      { titulo: "Gerenciamento disperso", desc: "Agenda por mensagem, prontuário em papel solto" },
      { titulo: "Escolha de uma ferramenta", desc: "Uma por função, sem tentar resolver tudo de uma vez" },
      { titulo: "Configuração inicial", desc: "Tempo dedicado a aprender e ajustar a ferramenta escolhida" },
      { titulo: "Rotina consolidada", desc: "Uso natural, sem esforço extra a cada semana" },
    ],
    notaFinal: "Tentar migrar tudo de uma vez costuma gerar abandono rápido — uma função por vez tem muito mais chance de virar hábito real.",
  });

  deck.slideCategorias(pres, {
    rodape: RODAPE_DECK, pageNum: 6,
    titulo: "3 categorias de ferramentas essenciais",
    categorias: [
      { titulo: "Agenda online", desc: "Agendamento e confirmação, reduzindo conflito de horário", color: deck.NAVY },
      { titulo: "Prontuário eletrônico", desc: "Registro clínico organizado, seguro e de fácil acesso", color: deck.TERRA },
      { titulo: "Comunicação automatizada", desc: "Lembretes e confirmações, sem esforço manual repetido", color: deck.NAVY_TINT },
    ],
    notaFinal: "Muitas plataformas hoje já unem as 3 categorias num único sistema, o que simplifica bastante a escolha inicial.",
  });

  deck.slideSinais(pres, {
    rodape: RODAPE_DECK, pageNum: 7,
    titulo: "Sinais de que falta ferramenta adequada",
    itens: [
      { titulo: "Prontuário desorganizado", desc: "Em papel solto ou arquivo sem padrão nem sigilo garantido" },
      { titulo: "Agendamento só por mensagem", desc: "Sem confirmação formal nem visão clara da agenda completa" },
      { titulo: "Conflito de horário já ocorrido", desc: "Duas pessoas marcadas no mesmo horário por falta de sistema" },
      { titulo: "Tarefas manuais repetidas", desc: "Tempo perdido toda semana com o que poderia ser automático" },
    ],
  });

  deck.slideDiferencial(pres, {
    rodape: RODAPE_DECK, pageNum: 8,
    titulo: "3 níveis de organização com ferramentas",
    cards: [
      { titulo: "Manual", desc: "Tudo por WhatsApp e papel, sem qualquer sistema dedicado" },
      { titulo: "Parcial", desc: "Uma ou duas funções resolvidas, o resto ainda manual" },
      { titulo: "Integrado", desc: "As 3 categorias essenciais funcionando de forma consolidada" },
    ],
  });

  deck.slideInstrumentos(pres, {
    rodape: RODAPE_DECK, pageNum: 9,
    titulo: "3 critérios pra escolher uma ferramenta",
    instrumentos: [
      { sigla: "Segurança", nome: "Sigilo e proteção real dos dados do paciente", desc: "Não negociável, dado o sigilo profissional exigido pela ética." },
      { sigla: "Facilidade", nome: "Simples o suficiente pro uso diário sem esforço", desc: "Uma ferramenta complexa demais tende a ser abandonada rápido." },
      { sigla: "Custo compatível", nome: "Alinhado ao estágio atual do consultório", desc: "Não é preciso a ferramenta mais cara pra resolver o essencial." },
    ],
  });

  deck.slideProtocoloOverview(pres, {
    rodape: RODAPE_DECK, pageNum: 10,
    titulo: "Migrando pro sistema: 4 passos",
    passos: [
      { titulo: "Mapear o que\né feito manualmente", desc: "Identificar exatamente onde está o maior esforço hoje" },
      { titulo: "Escolher uma\nferramenta por função", desc: "Priorizando o que gera mais dor de cabeça agora" },
      { titulo: "Migrar\naos poucos", desc: "Sem trocar tudo de uma vez, reduzindo risco de abandono" },
      { titulo: "Revisar após\num mês de uso", desc: "Ajustar ou trocar se a ferramenta não estiver funcionando" },
    ],
    notaFinal: "Esses 4 passos evitam tanto a paralisia por excesso de opções quanto a frustração de trocar tudo ao mesmo tempo.",
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 11,
    titulo: "Passos 1 e 2, na prática",
    colunas: [
      {
        numero: 1, titulo: "Mapear o que é manual",
        bullets: ["Liste as tarefas que você repete manualmente toda semana relacionadas a agenda, prontuário e cobrança", "Identifique qual delas consome mais tempo ou já gerou algum problema"],
      },
      {
        numero: 2, titulo: "Escolher uma ferramenta por função",
        fala: "“Dessas 3 categorias, qual resolveria o problema que mais me incomoda agora?”",
        bullets: ["Priorize por dor real, não por qual parece mais moderna ou completa"],
      },
    ],
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 12,
    titulo: "Passos 3 e 4, na prática",
    colunas: [
      {
        numero: 3, titulo: "Migrar aos poucos",
        bullets: ["Comece com pacientes novos, migrando os antigos gradualmente", "Evite migrar tudo de uma vez — o esforço de adaptação fica mais gerenciável"],
      },
      {
        numero: 4, titulo: "Revisar após um mês",
        bullets: ["Avalie se a ferramenta realmente reduziu o esforço manual esperado", "Troque sem culpa se ela não estiver funcionando bem na prática"],
      },
    ],
  });

  deck.slideCaso(pres, {
    rodape: RODAPE_DECK, pageNum: 13,
    vinheta: "Uma psicóloga gerencia toda sua agenda por WhatsApp, mantém anotações de sessão num caderno físico, e já teve um episódio em que confirmou dois pacientes no mesmo horário sem perceber. Ela sente que \"não tem tempo\" pra aprender uma ferramenta nova, mesmo reconhecendo que o sistema atual já causou problema real.",
    perguntas: [
      "Que sinais do slide 7 esse caso já apresenta claramente?",
      "Por qual das 3 categorias (slide 6) ela deveria começar, considerando o problema já ocorrido?",
      "Como o passo 3 (migrar aos poucos) ajudaria a reduzir a resistência dela à mudança?",
    ],
  });

  deck.slideEncaminhamento(pres, {
    rodape: RODAPE_DECK, pageNum: 14,
    titulo: "Quando buscar ajuda especializada",
    criterios: [
      "Dificuldade técnica persistente na configuração de uma ferramenta: buscar tutorial oficial ou suporte da própria plataforma",
      "Dúvida sobre conformidade com sigilo profissional de uma ferramenta específica: consultar orientação do CRP regional",
      "Volume de pacientes grande o suficiente pra justificar apoio administrativo: considerar contratação, tema do Módulo 6.3",
      "Indecisão persistente entre múltiplas opções de ferramenta: escolher a mais simples entre as viáveis e testar por um mês"
    ],
  });

  deck.slideRecap(pres, {
    rodape: RODAPE_DECK, pageNum: 15,
    pontos: [
      "Gerenciar tudo manualmente funciona até o primeiro conflito real de agenda ou perda de informação",
      "Agenda online, prontuário eletrônico e comunicação automatizada são as 3 categorias essenciais",
      "Segurança, facilidade de uso e custo compatível orientam a escolha entre ferramentas disponíveis",
      "Migrar uma função por vez, com revisão após um mês, evita tanto paralisia quanto abandono precipitado",
    ],
    proximoTexto: "Próximo: exercícios práticos e avaliação do Módulo 6.2 →",
  });

  return pres.writeFile({ fileName: "Modulo-6.2-Ferramentas-Essenciais.pptx" });
}

// ============================================================
// 2) EXERCÍCIOS
// ============================================================
function construirExercicios() {
  const children = [
    ...doc.capa(KICKER, "Exercícios — Ferramentas Essenciais", "Resolva individualmente, de preferência já mapeando as ferramentas que você usa hoje."),

    doc.exNum(1, "As 4 funções essenciais"),
    doc.pergunta(1, "Liste as 4 funções que um kit de ferramentas deveria cobrir, vistas no módulo."),
    ...doc.linhaResposta(3),

    doc.exNum(2, "As 3 categorias de ferramentas"),
    doc.tabelaSimples(["Categoria", "O que resolve"], [["Agenda online", ""], ["Prontuário eletrônico", ""], ["Comunicação automatizada", ""]], [3600, 5550]),

    doc.exNum(3, "Mapeando seu próprio sistema"),
    doc.pergunta(1, "Quais das 3 categorias você já resolve bem hoje? Quais ainda são manuais?"),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Aplicando os 3 critérios do slide 9, qual seria sua prioridade pra resolver primeiro?"),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),

    doc.exNum(4, "Planejando a migração"),
    doc.pergunta(1, "Descreva como você migraria essa função pro novo sistema, seguindo o passo 3 (aos poucos)."),
    ...doc.linhaResposta(3),

    doc.exNum(5, "Caso integrado — o conflito de agenda"),
    doc.vinhetaBox("Uma psicóloga gerencia tudo por WhatsApp e caderno físico, e já confirmou dois pacientes no mesmo horário sem perceber, mas sente que \"não tem tempo\" pra mudar."),
    doc.pergunta(1, "Que sinais do módulo esse caso já apresenta claramente?"),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Por qual categoria ela deveria começar, considerando o problema já ocorrido?"),
    ...doc.linhaResposta(2),
    doc.pergunta(3, "Como migrar aos poucos ajudaria a reduzir a resistência dela à mudança?"),
    ...doc.linhaResposta(2),
  ];

  return doc.salvar(doc.paginaDoc("Escola de Marketing para Psicólogos", RODAPE_DOC, children), "Modulo-6.2-Exercicios.docx");
}

// ============================================================
// 3) AVALIAÇÃO
// ============================================================
function construirProva() {
  const objetivas = [
    ["As 4 funções que um kit de ferramentas deveria cobrir, segundo o módulo, são:", ["Agendamento, prontuário, lembretes automáticos, pagamento e cobrança", "Alcance, engajamento, agendamento e custo por lead", "Tom neutro, conexão com valor, silêncio aceito, abertura genuína", "Identificação, veracidade, sigilo e comparação"]],
    ["As 3 categorias de ferramentas essenciais, segundo o módulo, são:", ["Agenda online, prontuário eletrônico, comunicação automatizada", "Preço, localização e horário de atendimento", "Alcance, engajamento e taxa de conversão", "Reconhecimento, geração de contato e remarketing"]],
    ["Um sinal de que falta ferramenta adequada é:", ["Já ter ocorrido conflito de horário por falta de sistema", "Ter prontuário eletrônico organizado e seguro", "Usar agenda online com confirmação automática", "Não repetir tarefas manuais toda semana"]],
    ["Os 3 critérios pra escolher uma ferramenta, segundo o módulo, são:", ["Segurança, facilidade de uso, custo compatível", "Alcance, engajamento e conversão", "Preço, localização e horário", "Identificação, veracidade e sigilo"]],
    ["\"Segurança\", como critério de escolha, é descrito como:", ["Não negociável, dado o sigilo profissional exigido pela ética", "Um critério secundário, menos importante que o custo", "Irrelevante para ferramentas de agendamento", "Aplicável apenas a ferramentas de prontuário, não de agenda"]],
    ["O passo \"migrar aos poucos\" recomenda:", ["Evitar trocar tudo de uma vez, reduzindo risco de abandono", "Migrar todos os pacientes simultaneamente para o novo sistema", "Substituir a necessidade de revisar a ferramenta depois", "Ser aplicado apenas em consultórios de grande porte"]],
    ["O passo \"revisar após um mês de uso\" recomenda:", ["Avaliar se a ferramenta reduziu o esforço manual esperado, trocando se necessário", "Manter a ferramenta escolhida indefinidamente, sem qualquer revisão", "Aguardar pelo menos um ano antes de qualquer avaliação", "Substituir a necessidade de mapear tarefas manuais"]],
    ["Diante de volume de pacientes grande o suficiente pra justificar apoio administrativo, o módulo recomenda:", ["Considerar contratação, tema do Módulo 6.3", "Ignorar completamente essa possibilidade", "Reduzir o número de pacientes atendidos", "Migrar imediatamente para o nível avançado do Bloco 1"]],
    ["Diante de indecisão persistente entre múltiplas ferramentas, o módulo recomenda:", ["Escolher a mais simples entre as viáveis e testar por um mês", "Aguardar indefinidamente até ter certeza absoluta", "Adquirir todas as opções disponíveis simultaneamente", "Ignorar completamente a necessidade de ferramenta"]],
    ["Este módulo se conecta diretamente a qual módulo anterior, no que se refere a lembretes automáticos?", ["Módulo 5.4, sobre reduzir faltas e cancelamentos", "Módulo 2.4, sobre o checklist de conformidade", "Módulo 3.6, sobre planejamento editorial", "Módulo 1.4, sobre preço e posicionamento"]],
  ];
  const gabaritoObjetivas = ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a"];

  const children = [
    ...doc.capa(KICKER, "Avaliação — Ferramentas Essenciais", `Avaliação formativa de encerramento do Módulo ${MOD}.`),
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
    doc.vinhetaBox("Um psicólogo já usa uma agenda online eficaz, mas ainda mantém prontuários em um documento de texto simples no computador, sem qualquer proteção adicional além da senha do próprio dispositivo."),
    new doc.Paragraph({ spacing: { before: 240 }, children: [new doc.TextRun({ text: "Com base no protocolo estudado, responda:", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    new doc.Paragraph({ spacing: { before: 220, after: 40 }, children: [new doc.TextRun({ text: "a) (10 pts) Qual das 3 categorias ainda está em nível manual ou insuficiente nesse caso?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "b) (10 pts) Que critério do slide 9 está mais comprometido nessa situação, e por quê?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "c) (10 pts) Que passo do protocolo ele deveria seguir a partir de agora?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "d) (10 pts) Como ele poderia migrar essa função gradualmente, sem interromper o atendimento em curso?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    new doc.Paragraph({ spacing: { after: 40 }, children: [new doc.TextRun({ text: "USO EXCLUSIVO DO INSTRUTOR — remover antes de aplicar a prova", bold: true, color: doc.TERRA, font: doc.FONT, size: 20 })] }),
    doc.tituloH1("Gabarito"),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 1 — Questões objetivas", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 200 }, children: [new doc.TextRun({ text: gabaritoObjetivas.map((r, i) => `${i + 1}-${r}`).join("   ·   "), font: doc.FONT, size: 22, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 2 — Critério de correção da questão de caso", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "a) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Prontuário eletrônico — ainda em formato inseguro e sem estrutura de proteção adequada.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "b) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Segurança — um documento de texto simples com apenas senha de dispositivo não oferece proteção real de dados sensíveis de pacientes.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "c) ", bold: true, font: doc.FONT, size: 21, color: doc.INK }), new doc.TextRun({ text: "Passo 2 — escolher uma ferramenta específica de prontuário eletrônico com segurança adequada, já que o passo 1 (mapear) já está implícito na constatação do problema.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "d) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Começar registrando pacientes novos na nova ferramenta, migrando os prontuários antigos aos poucos, sem interromper o atendimento em curso.", font: doc.FONT, size: 21, color: doc.INK })] }),
  );

  return doc.salvar(doc.paginaDoc("Escola de Marketing para Psicólogos", RODAPE_DOC, children), "Modulo-6.2-Avaliacao.docx");
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
      n: 1, titulo: "Por que ferramentas importam, e as 4 funções", duracao: "12 min", slides: "1, 2, 3, 4",
      objetivo: "Sair sabendo por que ferramentas dedicadas importam e quais são as 4 funções essenciais.",
      segmentos: [
        seg("0:00–0:40", "Abertura (gancho)", [{ fala: "Gerenciar agenda por WhatsApp funciona até o dia em que duas pessoas marcam o mesmo horário — e nesse dia você descobre o preço real de não ter um sistema." }]),
        seg("0:40–1:30", "Por que isso importa", ["Este módulo apresenta o kit mínimo de ferramentas que sustenta um consultório organizado."]),
        seg("1:30–8:00", "As 4 funções (mostrar slide 4)", [
          "Agendamento e confirmação de sessões.",
          "Prontuário e registro clínico organizado.",
          "Lembretes automáticos, do Módulo 5.4.",
          "Pagamento e cobrança organizados.",
        ]),
        seg("8:00–11:00", "Um ponto importante", ["Não é preciso resolver as 4 funções de uma vez — comece pela que mais gera dor de cabeça hoje."]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Próxima aula: do caos ao sistema simples, e as 3 categorias essenciais." }]),
      ],
    },
    {
      n: 2, titulo: "Do caos ao sistema, e as 3 categorias essenciais", duracao: "12 min", slides: "5, 6",
      objetivo: "Explicar a cadeia de migração e as 3 categorias de ferramentas essenciais.",
      segmentos: [
        seg("0:00–1:00", "Retomada rápida", ["Vimos as 4 funções. Hoje, o caminho completo do gerenciamento disperso ao sistema consolidado."]),
        seg("1:00–6:00", "A cadeia (mostrar slide 5)", ["Gerenciamento disperso → Escolha de ferramenta → Configuração inicial → Rotina consolidada."]),
        seg("6:00–11:00", "As 3 categorias (mostrar slide 6)", ["Agenda online, prontuário eletrônico e comunicação automatizada."]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Próxima aula: os sinais de que falta ferramenta adequada, e 3 níveis de organização." }]),
      ],
    },
    {
      n: 3, titulo: "Sinais de alerta e os 3 níveis de organização", duracao: "12 min", slides: "7, 8",
      objetivo: "Reconhecer sinais de que falta ferramenta adequada e diferenciar os 3 níveis de organização.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Quatro sinais de alerta — e três níveis, do manual ao integrado."]),
        seg("1:00–6:00", "Sinais de alerta (mostrar slide 7)", [
          "Prontuário desorganizado.",
          "Agendamento só por mensagem.",
          "Conflito de horário já ocorrido.",
          "Tarefas manuais repetidas.",
        ]),
        seg("6:00–11:00", "Os 3 níveis (mostrar slide 8)", ["Manual, parcial e integrado — cada um com um esforço diferente pra sair do estágio."]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Próxima aula: os 3 critérios de escolha, e os 4 passos completos." }]),
      ],
    },
    {
      n: 4, titulo: "Os 3 critérios e os 4 passos", duracao: "11 min", slides: "9, 10",
      objetivo: "Conhecer os 3 critérios de escolha e os 4 passos completos de migração.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três critérios simples — e um processo de 4 passos pra migrar pro sistema certo."]),
        seg("1:00–5:00", "3 critérios (mostrar slide 9)", ["Segurança, facilidade de uso e custo compatível."]),
        seg("5:00–10:00", "Os 4 passos (mostrar slide 10)", ["Mapear o que é manual, escolher uma ferramenta por função, migrar aos poucos, revisar após um mês."]),
        seg("10:00–11:00", "Fechamento", [{ fala: "Próxima aula: aplicando os 4 passos na prática." }]),
      ],
    },
    {
      n: 5, titulo: "Aplicação prática dos 4 passos", duracao: "12 min", slides: "11, 12",
      objetivo: "Aplicar os 4 passos com exemplos concretos.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Hoje colocamos os 4 passos em prática, migrando pro sistema certo."]),
        seg("1:00–6:00", "Passos 1 e 2 (mostrar slide 11)", ["Liste as tarefas manuais mais repetidas toda semana.", { fala: "Dessas 3 categorias, qual resolveria o problema que mais me incomoda agora?" }]),
        seg("6:00–11:00", "Passos 3 e 4 (mostrar slide 12)", ["Comece com pacientes novos, migre os antigos aos poucos.", "Avalie após um mês se a ferramenta funcionou de verdade."]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Próxima aula: um caso real de conflito de agenda, e o recap final." }]),
      ],
    },
    {
      n: 6, titulo: "Prática guiada — o conflito de agenda e recap final", duracao: "13 min", slides: "13, 14, 15",
      objetivo: "Aplicar tudo que foi visto a um caso real e consolidar os pontos-chave do módulo.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["A última aula do módulo — um caso real, e o recap final."]),
        seg("1:00–5:00", "Apresentando o caso (mostrar slide 13)", ["Leia a vinheta com calma.", "Note que a resistência à mudança persiste mesmo depois de um problema real ter acontecido."]),
        seg("5:00–9:00", "Percorrendo as perguntas de discussão", ["Discuta em voz alta as 3 perguntas do slide 13.", "Esboce um plano de migração gradual pra esse caso."]),
        seg("9:00–11:00", "Quando buscar ajuda especializada (mostrar slide 14)", ["Percorra os 4 critérios do slide 14."]),
        seg("11:00–13:00", "Recap final (mostrar slide 15)", [{ fala: "Retome os 4 pontos-chave do módulo. Agora é hora dos exercícios e da avaliação — e do próximo módulo, sobre quando e como contratar ou formar clínica." }]),
      ],
    },
  ];

  const totalMin = 12 + 12 + 12 + 11 + 12 + 13;

  const children = [
    ...doc.capa(KICKER, "Roteiro de Aulas — Ferramentas Essenciais", "Módulo dividido em 6 vídeo-aulas de 11 a 13 minutos, seguindo os slides já produzidos. Cada aula tem roteiro cronometrado, pronto pra gravação."),
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

  return doc.salvar(doc.paginaDoc("Escola de Marketing para Psicólogos", `${RODAPE_DOC} — Roteiro de Aulas`, children), "Modulo-6.2-Roteiro-Aulas.docx");
}

// ============================================================
Promise.resolve()
  .then(construirDeck)
  .then(construirExercicios)
  .then(construirProva)
  .then(construirRoteiro)
  .then(() => console.log("TUDO PRONTO"))
  .catch((e) => { console.error(e); process.exit(1); });

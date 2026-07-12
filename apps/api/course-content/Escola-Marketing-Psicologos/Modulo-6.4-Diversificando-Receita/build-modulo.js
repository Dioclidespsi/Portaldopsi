const deck = require("../_lib/lib-deck.js");
const doc = require("../_lib/lib-doc.js");

const MOD = "6.4";
const NOME = "Diversificando Receita";
const RODAPE_DECK = `Diversificando Receita — Módulo ${MOD}`;
const RODAPE_DOC = `Módulo ${MOD} — Diversificando Receita`;
const KICKER = "MÓDULO 6.4 · GESTÃO E ESCALA DO CONSULTÓRIO";
const MARCA = "Escola de Marketing para Psicólogos — by Dioclides";

// ============================================================
// 1) SLIDE DECK
// ============================================================
function construirDeck() {
  const pres = deck.novaApresentacao(`${NOME} — Além da Hora de Sessão Individual`);

  deck.slideTitulo(pres, {
    moduloLabel: `Módulo ${MOD} · Bloco 6 · Encerramento`,
    titulo: "Diversificando Receita",
    subtitulo: "Formatos que ampliam receita sem depender só de hora de sessão individual",
    rodapeMarca: MARCA,
    passos: ["Por quê", "4 formatos", "Como escolher", "Erros", "Aplicação"],
  });

  deck.slideRoteiro(pres, {
    rodape: RODAPE_DECK, pageNum: 2,
    cards: [
      { titulo: "Por que diversificar", desc: "Os limites reais de um modelo baseado só em hora individual" },
      { titulo: "Os 4 formatos possíveis", desc: "Grupos, supervisão, cursos e palestras" },
      { titulo: "Como escolher o certo", desc: "3 critérios pra decidir sem se perder em opções" },
      { titulo: "Erros comuns", desc: "Sinais de que ainda não é hora, ou o formato está errado" },
      { titulo: "Aplicação prática", desc: "Escolhendo um formato pra testar em pequena escala" },
    ],
  });

  deck.slideHook(pres, {
    rodape: RODAPE_DECK, pageNum: 3,
    frase: "Sua renda como psicólogo não precisa ser um múltiplo simples de \"horas atendidas vezes valor da sessão\" — existem formas de gerar mais valor sem gerar mais horas.",
    apoio: "Este é o último módulo da Escola Completa de Marketing para Psicólogos, e olha pra frente: como sustentar crescimento sem depender de uma única fonte de receita.",
  });

  deck.slideCircuito(pres, {
    rodape: RODAPE_DECK, pageNum: 4,
    titulo: "4 formatos de diversificação",
    regioes: [
      { label: "Grupos terapêuticos: mesma hora, mais pessoas atendidas", rx: 0.20, ry: 0.22, color: deck.NAVY, d: 0.5 },
      { label: "Supervisão clínica: ensinar o que você já domina profundamente", rx: 0.22, ry: 0.62, color: deck.TERRA, d: 0.4 },
      { label: "Cursos e conteúdo pago: escala sem limite direto de tempo", rx: 0.60, ry: 0.60, color: deck.NAVY_TINT, d: 0.36 },
      { label: "Palestras e parcerias: autoridade combinada com receita", rx: 0.58, ry: 0.24, color: deck.TERRA_TINT, d: 0.36 },
    ],
    notas: [
      "Cada formato exige uma competência e um nível de energia diferentes — não existe um \"melhor\" universal, só o mais adequado ao seu momento.",
      "Diversificar não significa abandonar o atendimento individual — significa não depender só dele.",
    ],
  });

  deck.slideCadeia(pres, {
    rodape: RODAPE_DECK, pageNum: 5,
    titulo: "Da hora individual à receita diversificada",
    elos: [
      { titulo: "Modelo individual consolidado", desc: "Uma base sólida de atendimento 1:1 já estabelecida" },
      { titulo: "Competência replicável", desc: "Identificar o que você domina o suficiente pra ensinar ou escalar" },
      { titulo: "Escolha do formato", desc: "O que combina com sua energia e momento de carreira" },
      { titulo: "Teste em pequena escala", desc: "Validar antes de investir tempo e recurso em expansão" },
    ],
    notaFinal: "Pular direto pra um formato ambicioso, sem testar pequeno primeiro, é o erro mais comum nessa fase de crescimento.",
  });

  deck.slideCategorias(pres, {
    rodape: RODAPE_DECK, pageNum: 6,
    titulo: "3 critérios pra escolher o formato certo",
    categorias: [
      { titulo: "Energia disponível", desc: "Além do atendimento individual, sem comprometer a qualidade dele", color: deck.NAVY },
      { titulo: "Competência dominada", desc: "Algo que você já entende profundamente, não está só aprendendo", color: deck.TERRA },
      { titulo: "Momento de carreira", desc: "O formato precisa combinar com onde você está agora, não onde quer chegar", color: deck.NAVY_TINT },
    ],
    notaFinal: "Os 3 critérios juntos evitam a armadilha de escolher um formato pela moda, em vez de pela adequação real.",
  });

  deck.slideSinais(pres, {
    rodape: RODAPE_DECK, pageNum: 7,
    titulo: "Sinais de que é hora de diversificar",
    itens: [
      { titulo: "Agenda individual no limite", desc: "Atendimento 1:1 já sustentável, mas sem espaço pra crescer mais" },
      { titulo: "Interesse recorrente de outros", desc: "Colegas ou pacientes perguntando como você faz o que faz" },
      { titulo: "Desejo de impacto ampliado", desc: "Vontade de alcançar mais pessoas do que a agenda individual permite" },
      { titulo: "Busca por resiliência financeira", desc: "Não depender de uma única fonte de receita no consultório" },
    ],
  });

  deck.slideDiferencial(pres, {
    rodape: RODAPE_DECK, pageNum: 8,
    titulo: "3 abordagens de diversificação",
    cards: [
      { titulo: "Só individual", desc: "Toda a receita depende de horas de atendimento 1:1, sem alternativa" },
      { titulo: "Sem estratégia", desc: "Tenta vários formatos ao mesmo tempo, sem foco nem teste real" },
      { titulo: "Intencional", desc: "Um formato testado em pequena escala, com critério claro de escolha" },
    ],
  });

  deck.slideInstrumentos(pres, {
    rodape: RODAPE_DECK, pageNum: 9,
    titulo: "3 perguntas antes de diversificar",
    instrumentos: [
      { sigla: "Isso energiza?", nome: "Isso realmente te energiza, ou é mais uma obrigação", desc: "Diversificação sem energia real vira desgaste, não crescimento." },
      { sigla: "Domino isso?", nome: "Você tem competência real, ou está aprendendo junto", desc: "Ensinar ou escalar algo ainda incerto compromete a qualidade entregue." },
      { sigla: "Impacto na agenda?", nome: "Que impacto isso teria no seu atendimento individual", desc: "Diversificar não deveria comprometer a base que já sustenta o consultório." },
    ],
  });

  deck.slideProtocoloOverview(pres, {
    rodape: RODAPE_DECK, pageNum: 10,
    titulo: "Diversificando com segurança: 4 passos",
    passos: [
      { titulo: "Identificar uma\ncompetência replicável", desc: "O que você já domina o suficiente pra ensinar ou escalar" },
      { titulo: "Escolher um\nformato pra testar", desc: "Com base nos 3 critérios do slide 6" },
      { titulo: "Rodar uma\nversão piloto", desc: "Pequena, de baixo risco, antes de qualquer expansão" },
      { titulo: "Avaliar antes\nde expandir", desc: "Com dados reais, não só entusiasmo inicial" },
    ],
    notaFinal: "Esses 4 passos fecham o curso inteiro voltando ao mesmo princípio do início: decisão baseada em dado real, não em intuição isolada.",
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 11,
    titulo: "Passos 1 e 2, na prática",
    colunas: [
      {
        numero: 1, titulo: "Identificar uma competência replicável",
        bullets: ["Pense no que colegas ou pacientes já elogiaram ou perguntaram como você faz", "Prefira algo que você já domina, não algo que ainda está descobrindo"],
      },
      {
        numero: 2, titulo: "Escolher um formato pra testar",
        fala: "“Considerando minha energia, competência e momento de carreira, qual dos 4 formatos faz mais sentido agora?”",
        bullets: ["Escolha um formato por vez, não tente iniciar vários ao mesmo tempo"],
      },
    ],
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 12,
    titulo: "Passos 3 e 4, na prática",
    colunas: [
      {
        numero: 3, titulo: "Rodar uma versão piloto",
        bullets: ["Um grupo pequeno, uma palestra única, ou um mini curso — algo de baixo risco pra validar a ideia", "O objetivo do piloto é aprender, não já gerar receita significativa"],
      },
      {
        numero: 4, titulo: "Avaliar antes de expandir",
        bullets: ["Reveja se o formato realmente energizou, gerou resultado e não comprometeu o atendimento individual", "Expanda só depois de confirmar isso com a experiência real do piloto"],
      },
    ],
  });

  deck.slideCaso(pres, {
    rodape: RODAPE_DECK, pageNum: 13,
    vinheta: "Uma psicóloga com agenda de atendimento individual já no limite sustentável recebe, com frequência, perguntas de colegas mais novos sobre como ela lida com um tema clínico específico que domina profundamente. Ela nunca considerou dar supervisão, mas o padrão de interesse é claro.",
    perguntas: [
      "Quantos dos 4 sinais do slide 7 essa psicóloga já apresenta?",
      "Que formato de diversificação (slide 4) parece mais alinhado à situação dela?",
      "Como ela poderia estruturar um piloto de baixo risco pra testar essa ideia?",
    ],
  });

  deck.slideEncaminhamento(pres, {
    rodape: RODAPE_DECK, pageNum: 14,
    titulo: "Quando buscar ajuda especializada",
    criterios: [
      "Dúvida sobre requisitos formais pra oferecer supervisão clínica: consultar orientação do CRP regional",
      "Interesse em criar curso ou conteúdo pago estruturado: buscar apoio de produção educacional, se o volume justificar",
      "Complexidade tributária ao diversificar fontes de receita: revisar com o contador já envolvido desde o Módulo 6.1",
      "Insegurança persistente mesmo com os sinais de prontidão presentes: considerar mentoria com quem já diversificou com sucesso"
    ],
  });

  deck.slideRecap(pres, {
    rodape: RODAPE_DECK, pageNum: 15,
    pontos: [
      "Grupos, supervisão, cursos e palestras ampliam receita sem depender só de hora de atendimento individual",
      "Energia disponível, competência dominada e momento de carreira orientam a escolha do formato certo",
      "Testar em pequena escala antes de expandir é o que diferencia diversificação intencional de tentativa dispersa",
      "Você concluiu a Escola de Marketing para Psicólogos — do posicionamento à diversificação, uma base completa pra construir e sustentar seu consultório",
    ],
    proximoTexto: "Escola Completa concluída. Últimos exercícios e avaliação do Módulo 6.4 →",
  });

  return pres.writeFile({ fileName: "Modulo-6.4-Diversificando-Receita.pptx" });
}

// ============================================================
// 2) EXERCÍCIOS
// ============================================================
function construirExercicios() {
  const children = [
    ...doc.capa(KICKER, "Exercícios — Diversificando Receita", "Último conjunto de exercícios da Escola Completa. Resolva individualmente, de preferência já esboçando um piloto real."),

    doc.exNum(1, "Os 4 formatos de diversificação"),
    doc.pergunta(1, "Liste os 4 formatos vistos no módulo."),
    ...doc.linhaResposta(3),

    doc.exNum(2, "Os 3 critérios de escolha"),
    doc.tabelaSimples(["Critério", "Como avaliar em você mesmo"], [["Energia disponível", ""], ["Competência dominada", ""], ["Momento de carreira", ""]], [3600, 5550]),

    doc.exNum(3, "As 3 perguntas antes de diversificar"),
    doc.pergunta(1, "Responda as 3 perguntas do slide 9 pensando num formato que te interessa."),
    ...doc.linhaResposta(4),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),

    doc.exNum(4, "Planejando seu piloto"),
    doc.pergunta(1, "Escolha um formato e esboce como seria uma versão piloto, de baixo risco, pra testá-lo."),
    ...doc.linhaResposta(4),

    doc.exNum(5, "Caso integrado — o interesse dos colegas"),
    doc.vinhetaBox("Uma psicóloga com agenda no limite recebe, com frequência, perguntas de colegas mais novos sobre um tema clínico que domina profundamente, mas nunca considerou dar supervisão."),
    doc.pergunta(1, "Quantos dos 4 sinais essa psicóloga já apresenta?"),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Que formato de diversificação parece mais alinhado à situação dela?"),
    ...doc.linhaResposta(2),
    doc.pergunta(3, "Como ela poderia estruturar um piloto de baixo risco pra testar essa ideia?"),
    ...doc.linhaResposta(2),
  ];

  return doc.salvar(doc.paginaDoc("Escola de Marketing para Psicólogos", RODAPE_DOC, children), "Modulo-6.4-Exercicios.docx");
}

// ============================================================
// 3) AVALIAÇÃO
// ============================================================
function construirProva() {
  const objetivas = [
    ["Os 4 formatos de diversificação, segundo o módulo, são:", ["Grupos terapêuticos, supervisão clínica, cursos e conteúdo pago, palestras e parcerias", "Alcance, engajamento, agendamento e custo por lead", "Apoio administrativo, outro psicólogo, clínica formal", "Identificação, veracidade, sigilo e comparação"]],
    ["Os 3 critérios pra escolher o formato certo, segundo o módulo, são:", ["Energia disponível, competência dominada, momento de carreira", "Preço, localização e horário de atendimento", "Alcance, engajamento e conversão", "Segurança, facilidade de uso, custo compatível"]],
    ["Diversificar receita, segundo o módulo, significa:", ["Ampliar fontes de receita sem depender só de hora de atendimento individual", "Abandonar completamente o atendimento individual", "Reduzir a receita total do consultório", "Substituir a necessidade de organização financeira do Módulo 6.1"]],
    ["\"Está aprendendo junto\", em relação à pergunta sobre competência, é descrito como:", ["Um risco à qualidade entregue se a pessoa tentar ensinar ou escalar isso", "O critério ideal pra escolher um formato de diversificação", "Irrelevante para a decisão de diversificar", "Exigido antes de qualquer diversificação"]],
    ["Rodar uma \"versão piloto\", segundo o protocolo, tem como objetivo principal:", ["Aprender com baixo risco, não gerar receita significativa de imediato", "Gerar o máximo de receita possível já na primeira tentativa", "Substituir a necessidade de escolher um formato específico", "Ser aplicado apenas em formatos de curso, nunca em grupos"]],
    ["\"Diversificação sem estratégia\", segundo a classificação do módulo, se caracteriza por:", ["Tentar vários formatos ao mesmo tempo, sem foco nem teste real", "Testar um formato de cada vez, com critério claro de escolha", "Manter-se exclusivamente no atendimento individual", "Ser a abordagem mais recomendada pelo módulo"]],
    ["Um sinal de que é hora de diversificar é:", ["Agenda de atendimento individual já no limite sustentável", "Agenda individual ainda com muita disponibilidade livre", "Ausência completa de interesse de colegas ou pacientes", "Dependência total de uma única fonte de receita, sem qualquer desconforto"]],
    ["Diante de interesse em criar curso ou conteúdo pago estruturado, o módulo recomenda:", ["Buscar apoio de produção educacional, se o volume justificar", "Criar imediatamente sem qualquer planejamento prévio", "Evitar completamente esse formato de diversificação", "Delegar toda a responsabilidade sem qualquer supervisão"]],
    ["O passo \"avaliar antes de expandir\" recomenda decidir com base em:", ["Dados reais do piloto, não apenas entusiasmo inicial", "Exclusivamente a opinião de um único colega", "A quantidade de tempo já investido no formato", "Nenhum critério específico, apenas intuição"]],
    ["Este módulo encerra qual etapa da Escola de Marketing para Psicólogos?", ["A Escola Completa, do posicionamento à diversificação de receita", "Apenas o Bloco 1, sobre posicionamento e nicho", "Apenas o Bloco 3, sobre conteúdo e autoridade", "Apenas o Bloco 4, sobre aquisição de pacientes"]],
  ];
  const gabaritoObjetivas = ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a"];

  const children = [
    ...doc.capa(KICKER, "Avaliação — Diversificando Receita", `Avaliação final de encerramento do Módulo ${MOD} e da Escola Completa de Marketing para Psicólogos.`),
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
    doc.vinhetaBox("Um psicólogo especializado em burnout em profissionais de tecnologia (Bloco 1), com conteúdo consistente (Bloco 3), boa taxa de agendamento (Bloco 4) e agenda de atendimento individual já no limite sustentável (Módulo 6.3), está pensando em criar um curso online sobre prevenção de burnout voltado a empresas de tecnologia."),
    new doc.Paragraph({ spacing: { before: 240 }, children: [new doc.TextRun({ text: "Com base em tudo que foi estudado na Escola Completa, responda:", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    new doc.Paragraph({ spacing: { before: 220, after: 40 }, children: [new doc.TextRun({ text: "a) (10 pts) Rode as 3 perguntas do slide 9 pra esse caso.", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(3),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "b) (10 pts) Esboce um piloto de baixo risco pra testar essa ideia antes de um curso completo.", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "c) (10 pts) Que módulo do Bloco 2 ele deveria revisar antes de comunicar esse curso publicamente?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "d) (10 pts) Como esse curso se conecta ao posicionamento já definido no Bloco 1?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    new doc.Paragraph({ spacing: { after: 40 }, children: [new doc.TextRun({ text: "USO EXCLUSIVO DO INSTRUTOR — remover antes de aplicar a prova", bold: true, color: doc.TERRA, font: doc.FONT, size: 20 })] }),
    doc.tituloH1("Gabarito"),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 1 — Questões objetivas", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 200 }, children: [new doc.TextRun({ text: gabaritoObjetivas.map((r, i) => `${i + 1}-${r}`).join("   ·   "), font: doc.FONT, size: 22, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 2 — Critério de correção da questão de caso", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "a) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Deve avaliar se o tema genuinamente energiza (não só parece uma boa ideia de negócio), se domina o conteúdo com profundidade real, e se o curso não comprometeria a qualidade do atendimento individual atual.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "b) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Exemplo: uma palestra única gratuita ou de baixo custo pra uma empresa parceira, testando o formato antes de estruturar o curso completo.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "c) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Módulo 2.4 (O Checklist Antes de Publicar), garantindo que a divulgação do curso respeite identificação, veracidade, sigilo e ausência de comparação.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "d) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "O curso reforça diretamente a especialidade e o público definidos no Bloco 1, ampliando o alcance da mesma proposta de valor já validada no consultório.", font: doc.FONT, size: 21, color: doc.INK })] }),
  );

  return doc.salvar(doc.paginaDoc("Escola de Marketing para Psicólogos", RODAPE_DOC, children), "Modulo-6.4-Avaliacao.docx");
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
      n: 1, titulo: "Por que diversificar, e os 4 formatos", duracao: "13 min", slides: "1, 2, 3, 4",
      objetivo: "Sair sabendo por que diversificar importa e quais são os 4 formatos possíveis.",
      segmentos: [
        seg("0:00–0:45", "Abertura (gancho)", [{ fala: "Sua renda como psicólogo não precisa ser um múltiplo simples de 'horas atendidas vezes valor da sessão' — existem formas de gerar mais valor sem gerar mais horas." }]),
        seg("0:45–2:00", "Por que isso importa", ["Este é o último módulo da Escola Completa, olhando pra frente: como sustentar crescimento sem depender de uma única fonte."]),
        seg("2:00–9:00", "Os 4 formatos (mostrar slide 4)", [
          "Grupos terapêuticos: mesma hora, mais pessoas.",
          "Supervisão clínica: ensinar o que você domina.",
          "Cursos e conteúdo pago: escala sem limite de tempo.",
          "Palestras e parcerias: autoridade com receita.",
        ]),
        seg("9:00–12:00", "Um ponto importante", ["Diversificar não significa abandonar o atendimento individual — significa não depender só dele."]),
        seg("12:00–13:00", "Fechamento", [{ fala: "Próxima aula: da hora individual à receita diversificada, e os 3 critérios de escolha." }]),
      ],
    },
    {
      n: 2, titulo: "Da hora individual à diversificação, e os 3 critérios", duracao: "12 min", slides: "5, 6",
      objetivo: "Explicar a cadeia de diversificação e os 3 critérios pra escolher o formato certo.",
      segmentos: [
        seg("0:00–1:00", "Retomada rápida", ["Vimos os 4 formatos. Hoje, o caminho completo até uma diversificação intencional."]),
        seg("1:00–6:00", "A cadeia (mostrar slide 5)", ["Modelo consolidado → Competência replicável → Escolha do formato → Teste em pequena escala."]),
        seg("6:00–11:00", "Os 3 critérios (mostrar slide 6)", ["Energia disponível, competência dominada e momento de carreira."]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Próxima aula: os sinais de que é hora de diversificar, e 3 abordagens comparadas." }]),
      ],
    },
    {
      n: 3, titulo: "Sinais de alerta e as 3 abordagens", duracao: "12 min", slides: "7, 8",
      objetivo: "Reconhecer sinais de prontidão pra diversificar e comparar 3 abordagens possíveis.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Quatro sinais de prontidão — e três abordagens, da só individual à intencional."]),
        seg("1:00–6:00", "Sinais de alerta (mostrar slide 7)", [
          "Agenda individual no limite.",
          "Interesse recorrente de outros.",
          "Desejo de impacto ampliado.",
          "Busca por resiliência financeira.",
        ]),
        seg("6:00–11:00", "3 abordagens (mostrar slide 8)", ["Só individual, sem estratégia, e intencional — a última é o objetivo."]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Próxima aula: as 3 perguntas antes de diversificar, e os 4 passos completos." }]),
      ],
    },
    {
      n: 4, titulo: "As 3 perguntas e os 4 passos", duracao: "11 min", slides: "9, 10",
      objetivo: "Conhecer as 3 perguntas antes de diversificar e os 4 passos completos.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três perguntas simples — e um processo de 4 passos pra diversificar com segurança."]),
        seg("1:00–5:00", "3 perguntas (mostrar slide 9)", ["Isso energiza, você domina, e que impacto na agenda — as 3 perguntas centrais."]),
        seg("5:00–10:00", "Os 4 passos (mostrar slide 10)", ["Identificar competência replicável, escolher formato, rodar piloto, avaliar antes de expandir."]),
        seg("10:00–11:00", "Fechamento", [{ fala: "Próxima aula: aplicando os 4 passos na prática." }]),
      ],
    },
    {
      n: 5, titulo: "Aplicação prática dos 4 passos", duracao: "12 min", slides: "11, 12",
      objetivo: "Aplicar os 4 passos com exemplos concretos.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Hoje colocamos os 4 passos em prática, do zero ao piloto testado."]),
        seg("1:00–6:00", "Passos 1 e 2 (mostrar slide 11)", ["Pense no que colegas ou pacientes já elogiaram em você.", { fala: "Considerando minha energia, competência e momento de carreira, qual dos 4 formatos faz mais sentido agora?" }]),
        seg("6:00–11:00", "Passos 3 e 4 (mostrar slide 12)", ["Rode uma versão pequena e de baixo risco primeiro.", "Avalie com dados reais antes de expandir."]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Próxima aula: um caso real de interesse de colegas, e o fechamento de toda a Escola." }]),
      ],
    },
    {
      n: 6, titulo: "Prática guiada final e encerramento da Escola Completa", duracao: "14 min", slides: "13, 14, 15",
      objetivo: "Aplicar tudo que foi visto a um último caso real e encerrar formalmente a Escola Completa.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["A última aula de toda a Escola de Marketing para Psicólogos."]),
        seg("1:00–5:00", "Apresentando o caso (mostrar slide 13)", ["Leia a vinheta com calma.", "Note que o sinal de prontidão já está presente — falta só a decisão intencional."]),
        seg("5:00–9:00", "Percorrendo as perguntas de discussão", ["Discuta em voz alta as 3 perguntas do slide 13.", "Esboce um piloto pra essa psicóloga."]),
        seg("9:00–11:00", "Quando buscar ajuda especializada (mostrar slide 14)", ["Percorra os 4 critérios do slide 14."]),
        seg("11:00–14:00", "Encerramento da Escola Completa (mostrar slide 15)", [{ fala: "Retome os 4 pontos-chave finais. Você concluiu a Escola de Marketing para Psicólogos — do posicionamento à diversificação de receita, uma base completa pra construir e sustentar seu consultório. Parabéns pela jornada." }]),
      ],
    },
  ];

  const totalMin = 13 + 12 + 12 + 11 + 12 + 14;

  const children = [
    ...doc.capa(KICKER, "Roteiro de Aulas — Diversificando Receita", "Módulo dividido em 6 vídeo-aulas de 11 a 14 minutos, seguindo os slides já produzidos. Cada aula tem roteiro cronometrado, pronto pra gravação. Este é o último roteiro da Escola Completa."),
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

  return doc.salvar(doc.paginaDoc("Escola de Marketing para Psicólogos", `${RODAPE_DOC} — Roteiro de Aulas`, children), "Modulo-6.4-Roteiro-Aulas.docx");
}

// ============================================================
Promise.resolve()
  .then(construirDeck)
  .then(construirExercicios)
  .then(construirProva)
  .then(construirRoteiro)
  .then(() => console.log("TUDO PRONTO"))
  .catch((e) => { console.error(e); process.exit(1); });

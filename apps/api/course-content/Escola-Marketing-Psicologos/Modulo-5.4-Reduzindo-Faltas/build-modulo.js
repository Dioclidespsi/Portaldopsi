const deck = require("../_lib/lib-deck.js");
const doc = require("../_lib/lib-doc.js");

const MOD = "5.4";
const NOME = "Reduzindo Faltas";
const RODAPE_DECK = `Reduzindo Faltas — Módulo ${MOD}`;
const RODAPE_DOC = `Módulo ${MOD} — Reduzindo Faltas`;
const KICKER = "MÓDULO 5.4 · VENDAS E PRIMEIRA SESSÃO";
const MARCA = "Escola de Marketing para Psicólogos — by Dioclides";

// ============================================================
// 1) SLIDE DECK
// ============================================================
function construirDeck() {
  const pres = deck.novaApresentacao(`${NOME} — Políticas e Lembretes que Funcionam`);

  deck.slideTitulo(pres, {
    moduloLabel: `Módulo ${MOD} · Bloco 5 · Vendas e Primeira Sessão`,
    titulo: "Reduzindo Faltas",
    subtitulo: "Políticas, lembretes e comunicação que diminuem faltas sem parecer rígido demais",
    rodapeMarca: MARCA,
    passos: ["Por que acontecem", "Políticas", "Lembretes", "Erros", "Aplicação"],
  });

  deck.slideRoteiro(pres, {
    rodape: RODAPE_DECK, pageNum: 2,
    cards: [
      { titulo: "Por que faltas acontecem", desc: "As razões mais comuns, além de \"esquecimento\"" },
      { titulo: "Políticas claras", desc: "Como comunicar regras sem soar rígido" },
      { titulo: "Lembretes que funcionam", desc: "O tempo e formato certos pra reduzir esquecimento" },
      { titulo: "Erros comuns", desc: "Sinais de que a política atual não está funcionando" },
      { titulo: "Aplicação prática", desc: "Criando uma política do zero pra um consultório novo" },
    ],
  });

  deck.slideHook(pres, {
    rodape: RODAPE_DECK, pageNum: 3,
    frase: "Uma falta não avisada custa duas vezes — o tempo perdido na agenda e a energia gasta decidindo se vale a pena cobrar por isso.",
    apoio: "Este módulo encerra o Bloco 5 com uma ferramenta prática: como estruturar políticas e lembretes que reduzem faltas sem prejudicar a relação com o paciente.",
  });

  deck.slideCircuito(pres, {
    rodape: RODAPE_DECK, pageNum: 4,
    titulo: "4 elementos que reduzem faltas",
    regioes: [
      { label: "Política clara comunicada antes da primeira sessão", rx: 0.20, ry: 0.22, color: deck.NAVY, d: 0.5 },
      { label: "Lembrete automático com antecedência adequada", rx: 0.22, ry: 0.62, color: deck.TERRA, d: 0.4 },
      { label: "Facilidade real de remarcar quando necessário", rx: 0.60, ry: 0.60, color: deck.NAVY_TINT, d: 0.36 },
      { label: "Consequência combinada, aplicada com consistência", rx: 0.58, ry: 0.24, color: deck.TERRA_TINT, d: 0.36 },
    ],
    notas: [
      "A maioria das faltas não vem de má-fé — vem de esquecimento genuíno, que lembrete automático resolve na maior parte dos casos.",
      "Consistência na aplicação da política é tão importante quanto a política em si — exceções constantes a tornam inútil.",
    ],
  });

  deck.slideCadeia(pres, {
    rodape: RODAPE_DECK, pageNum: 5,
    titulo: "Do agendamento à presença",
    elos: [
      { titulo: "Agendamento confirmado", desc: "Sessão marcada, com política já comunicada antes" },
      { titulo: "Lembrete enviado", desc: "Com antecedência suficiente pra reorganizar a agenda" },
      { titulo: "Facilidade de remarcar", desc: "Um caminho simples se um imprevisto real acontecer" },
      { titulo: "Comparecimento", desc: "Ou falta comunicada com antecedência, dentro da política" },
    ],
    notaFinal: "Cada elo reduz uma causa diferente de falta — esquecimento, imprevisto genuíno, ou simplesmente ausência de aviso.",
  });

  deck.slideCategorias(pres, {
    rodape: RODAPE_DECK, pageNum: 6,
    titulo: "3 tipos de política de cancelamento",
    categorias: [
      { titulo: "Sem política definida", desc: "Cada falta é tratada de forma diferente, sem critério claro", color: deck.NAVY },
      { titulo: "Política rígida", desc: "Sem exceção nenhuma, mesmo diante de imprevisto genuíno", color: deck.TERRA },
      { titulo: "Política clara e humana", desc: "Regras definidas, com espaço razoável pra imprevisto real", color: deck.NAVY_TINT },
    ],
    notaFinal: "A política clara e humana é a que sustenta relação de longo prazo sem abrir mão de proteger a agenda do profissional.",
  });

  deck.slideSinais(pres, {
    rodape: RODAPE_DECK, pageNum: 7,
    titulo: "Sinais de que a política precisa de ajuste",
    itens: [
      { titulo: "Padrão recorrente de faltas", desc: "O mesmo tipo de situação se repetindo com frequência" },
      { titulo: "Constrangimento ao cobrar", desc: "Desconforto perceptível ao aplicar a consequência combinada" },
      { titulo: "Nenhum lembrete configurado", desc: "Ausência de qualquer aviso automático antes da sessão" },
      { titulo: "Política nunca comunicada", desc: "Regras que só aparecem depois que a falta já aconteceu" },
    ],
  });

  deck.slideDiferencial(pres, {
    rodape: RODAPE_DECK, pageNum: 8,
    titulo: "3 abordagens de política",
    cards: [
      { titulo: "Sem política", desc: "Decisões caso a caso, sem previsibilidade pra nenhum dos lados" },
      { titulo: "Rígida demais", desc: "Cobra sempre, mesmo em situações claramente excepcionais" },
      { titulo: "Clara e humana", desc: "Regra definida, comunicada, com bom senso em casos reais" },
    ],
  });

  deck.slideInstrumentos(pres, {
    rodape: RODAPE_DECK, pageNum: 9,
    titulo: "3 ferramentas que reduzem faltas",
    instrumentos: [
      { sigla: "Lembrete automático", nome: "Mensagem ou notificação de app, 24 a 48h antes", desc: "Resolve a maior parte das faltas por esquecimento genuíno." },
      { sigla: "Política escrita", nome: "Regras explicadas já na primeira sessão", desc: "Evita surpresa e desconforto quando a situação surgir de fato." },
      { sigla: "Janela de cancelamento", nome: "Prazo definido pra cancelar sem consequência", desc: "Dá previsibilidade pros dois lados da relação." },
    ],
  });

  deck.slideProtocoloOverview(pres, {
    rodape: RODAPE_DECK, pageNum: 10,
    titulo: "Estruturando sua política: 4 passos",
    passos: [
      { titulo: "Definir uma\npolítica clara", desc: "Prazo de cancelamento e consequência, por escrito" },
      { titulo: "Comunicar já\nna primeira sessão", desc: "Antes que qualquer falta aconteça, não depois" },
      { titulo: "Configurar\nlembretes automáticos", desc: "Reduz a maior causa de falta: o esquecimento genuíno" },
      { titulo: "Aplicar com\nconsistência", desc: "Sem exceção arbitrária, preservando o respeito à regra" },
    ],
    notaFinal: "Esses 4 passos, feitos uma vez, reduzem a maior parte das faltas sem exigir gestão caso a caso constante.",
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 11,
    titulo: "Passos 1 e 2, na prática",
    colunas: [
      {
        numero: 1, titulo: "Definir uma política clara",
        bullets: ["Escolha um prazo de cancelamento razoável (24h é comum) e uma consequência específica", "Escreva isso de forma simples, sem jargão jurídico desnecessário"],
      },
      {
        numero: 2, titulo: "Comunicar na primeira sessão",
        fala: "“Só pra alinhar: se precisar cancelar, é só avisar com 24h de antecedência, combinado?”",
        bullets: ["Comunicar antes evita que a política pareça punitiva quando aplicada depois"],
      },
    ],
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 12,
    titulo: "Passos 3 e 4, na prática",
    colunas: [
      {
        numero: 3, titulo: "Configurar lembretes automáticos",
        bullets: ["Use recursos do próprio aplicativo de agenda ou uma mensagem simples programada", "24 a 48h antes costuma ser o intervalo mais eficaz pra reorganizar compromissos"],
      },
      {
        numero: 4, titulo: "Aplicar com consistência",
        bullets: ["Use bom senso em situações claramente excepcionais, mas mantenha a regra na maioria dos casos", "Inconsistência constante enfraquece a política até ela deixar de funcionar"],
      },
    ],
  });

  deck.slideCaso(pres, {
    rodape: RODAPE_DECK, pageNum: 13,
    vinheta: "Uma psicóloga recém-formada nunca definiu uma política de cancelamento formal. Ela decide caso a caso se cobra ou não por faltas, o que já gerou alguns momentos constrangedores com pacientes que acharam a decisão injusta em comparação a outro caso anterior. Ela também não usa nenhum lembrete automático.",
    perguntas: [
      "Que tipo de política (slide 6) ela está praticando hoje, mesmo sem perceber?",
      "Que passo do protocolo resolveria diretamente o problema da comparação entre pacientes?",
      "Esboce uma política simples, com prazo e consequência, pra esse consultório.",
    ],
  });

  deck.slideEncaminhamento(pres, {
    rodape: RODAPE_DECK, pageNum: 14,
    titulo: "Quando buscar ajuda especializada",
    criterios: [
      "Dificuldade técnica em configurar lembretes automáticos: buscar tutorial da ferramenta de agenda utilizada",
      "Padrão de faltas muito acima do esperado, mesmo com política clara: investigar se há um problema mais amplo no funil (Módulo 4.1)",
      "Desconforto emocional recorrente ao aplicar a política: revisar com base no Módulo 5.2, sobre comunicação de valor sem desconforto",
      "Dúvida jurídica sobre cobrança formal por falta não avisada: consultar orientação de um profissional contábil ou jurídico"
    ],
  });

  deck.slideRecap(pres, {
    rodape: RODAPE_DECK, pageNum: 15,
    pontos: [
      "A maioria das faltas vem de esquecimento genuíno, não de má-fé — lembrete automático resolve boa parte disso",
      "Política clara e humana, com prazo definido e espaço pra imprevisto real, sustenta relação de longo prazo",
      "Comunicar a política antes de qualquer falta acontecer evita que ela pareça punitiva quando aplicada",
      "Este módulo encerra o Bloco 5 — do primeiro contato acolhedor à agenda protegida contra faltas evitáveis",
    ],
    proximoTexto: "Bloco 5 completo. Próximo: exercícios práticos e avaliação do Módulo 5.4 →",
  });

  return pres.writeFile({ fileName: "Modulo-5.4-Reduzindo-Faltas.pptx" });
}

// ============================================================
// 2) EXERCÍCIOS
// ============================================================
function construirExercicios() {
  const children = [
    ...doc.capa(KICKER, "Exercícios — Reduzindo Faltas", "Resolva individualmente, de preferência já esboçando sua própria política de cancelamento."),

    doc.exNum(1, "Os 4 elementos que reduzem faltas"),
    doc.pergunta(1, "Liste os 4 elementos vistos no módulo."),
    ...doc.linhaResposta(3),

    doc.exNum(2, "As 3 abordagens de política"),
    doc.tabelaSimples(["Abordagem", "Consequência prática"], [["Sem política", ""], ["Rígida demais", ""], ["Clara e humana", ""]], [3600, 5550]),

    doc.exNum(3, "Escrevendo sua própria política"),
    doc.pergunta(1, "Defina um prazo de cancelamento e uma consequência específica pra sua prática."),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Escreva a frase que você usaria pra comunicar essa política na primeira sessão."),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),

    doc.exNum(4, "Configurando lembretes"),
    doc.pergunta(1, "Que ferramenta você usaria (ou já usa) pra enviar lembretes automáticos? Com quanto tempo de antecedência?"),
    ...doc.linhaResposta(2),

    doc.exNum(5, "Caso integrado — a política inconsistente"),
    doc.vinhetaBox("Uma psicóloga sem política formal decide caso a caso se cobra por faltas, gerando constrangimento por comparação entre pacientes, e não usa lembrete automático."),
    doc.pergunta(1, "Que tipo de política ela está praticando hoje, mesmo sem perceber?"),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Que passo do protocolo resolveria o problema da comparação entre pacientes?"),
    ...doc.linhaResposta(2),
    doc.pergunta(3, "Esboce uma política simples, com prazo e consequência, pra esse consultório."),
    ...doc.linhaResposta(2),
  ];

  return doc.salvar(doc.paginaDoc("Escola de Marketing para Psicólogos", RODAPE_DOC, children), "Modulo-5.4-Exercicios.docx");
}

// ============================================================
// 3) AVALIAÇÃO
// ============================================================
function construirProva() {
  const objetivas = [
    ["Os 4 elementos que reduzem faltas, segundo o módulo, são:", ["Política clara, lembrete automático, facilidade de remarcar, consequência consistente", "Alcance, engajamento, agendamento e custo por lead", "Validar, informar, respeitar a decisão, manter a porta aberta", "Tom neutro, conexão com valor, silêncio aceito, abertura genuína"]],
    ["A maioria das faltas, segundo o módulo, vem de:", ["Esquecimento genuíno, não de má-fé", "Má-fé deliberada do paciente", "Falha exclusiva do sistema de agendamento", "Ausência completa de qualquer causa identificável"]],
    ["Os 3 tipos de política de cancelamento, segundo o módulo, são:", ["Sem política definida, rígida, clara e humana", "Mensal, semanal e diária", "Preço, localização e horário", "Alcance, engajamento e conversão"]],
    ["\"Política nunca comunicada\" é descrita como um sinal de que:", ["A política precisa de ajuste", "A política está funcionando perfeitamente", "Não é necessário nenhum ajuste adicional", "O lembrete automático já resolveu o problema"]],
    ["O passo \"comunicar na primeira sessão\" busca:", ["Evitar que a política pareça punitiva quando aplicada depois", "Substituir a necessidade de definir prazo e consequência", "Ser aplicado apenas após a primeira falta ocorrer", "Aumentar a rigidez da política em qualquer circunstância"]],
    ["O intervalo mais eficaz pra lembretes automáticos, segundo o módulo, costuma ser:", ["24 a 48 horas antes da sessão", "Apenas no momento exato da sessão", "Uma semana inteira antes, sem exceção", "Não há intervalo relevante para lembretes"]],
    ["\"Aplicar com consistência\", segundo o protocolo, recomenda:", ["Manter a regra na maioria dos casos, com bom senso em exceções claras", "Nunca abrir exceção, mesmo em situações claramente excepcionais", "Aplicar a regra apenas quando for conveniente para o profissional", "Ignorar completamente a política definida anteriormente"]],
    ["Inconsistência constante na aplicação da política, segundo o módulo:", ["Enfraquece a política até ela deixar de funcionar", "Fortalece a relação de confiança com o paciente", "É recomendada para manter flexibilidade total", "Não tem qualquer efeito sobre a eficácia da política"]],
    ["Diante de padrão de faltas muito acima do esperado mesmo com política clara, o módulo recomenda:", ["Investigar se há um problema mais amplo no funil", "Aumentar imediatamente o valor cobrado por falta", "Ignorar o padrão, já que é considerado normal", "Encerrar o atendimento de todos os pacientes envolvidos"]],
    ["Este módulo encerra qual bloco do curso?", ["Bloco 5 — Vendas e Primeira Sessão", "Bloco 2 — Ética na Publicidade", "Bloco 4 — Aquisição de Pacientes", "Bloco 1 — Posicionamento e Nicho"]],
  ];
  const gabaritoObjetivas = ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a"];

  const children = [
    ...doc.capa(KICKER, "Avaliação — Reduzindo Faltas", `Avaliação formativa de encerramento do Módulo ${MOD} e do Bloco 5.`),
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
    doc.vinhetaBox("Um psicólogo tem uma política de cancelamento com 24h de antecedência, comunicada na primeira sessão, mas não usa nenhum lembrete automático. Ele percebe que boa parte das faltas acontece porque os pacientes \"simplesmente esquecem\", mesmo sabendo da política."),
    new doc.Paragraph({ spacing: { before: 240 }, children: [new doc.TextRun({ text: "Com base no protocolo estudado, responda:", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    new doc.Paragraph({ spacing: { before: 220, after: 40 }, children: [new doc.TextRun({ text: "a) (10 pts) Que elemento específico dos 4 do slide 4 está faltando nesse caso?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "b) (10 pts) Que passo do protocolo ele deveria implementar primeiro?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "c) (10 pts) Sugira uma ferramenta e um intervalo de tempo pra esse lembrete.", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "d) (10 pts) Por que a política já existir e ser comunicada não resolve sozinha o problema do esquecimento genuíno?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    new doc.Paragraph({ spacing: { after: 40 }, children: [new doc.TextRun({ text: "USO EXCLUSIVO DO INSTRUTOR — remover antes de aplicar a prova", bold: true, color: doc.TERRA, font: doc.FONT, size: 20 })] }),
    doc.tituloH1("Gabarito"),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 1 — Questões objetivas", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 200 }, children: [new doc.TextRun({ text: gabaritoObjetivas.map((r, i) => `${i + 1}-${r}`).join("   ·   "), font: doc.FONT, size: 22, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 2 — Critério de correção da questão de caso", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "a) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Lembrete automático com antecedência adequada — os outros 3 elementos já estão presentes.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "b) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Passo 3 — configurar lembretes automáticos, já que os passos 1 e 2 (política e comunicação) já estão feitos.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "c) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Exemplo: mensagem automática via aplicativo de agenda, 24 a 48h antes da sessão.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "d) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Porque saber da regra não impede o esquecimento genuíno no dia a dia — o lembrete atua exatamente nesse ponto, reduzindo a causa mais comum de falta, independente da política já existir.", font: doc.FONT, size: 21, color: doc.INK })] }),
  );

  return doc.salvar(doc.paginaDoc("Escola de Marketing para Psicólogos", RODAPE_DOC, children), "Modulo-5.4-Avaliacao.docx");
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
      n: 1, titulo: "Por que faltas acontecem, e os 4 elementos", duracao: "12 min", slides: "1, 2, 3, 4",
      objetivo: "Sair sabendo por que faltas acontecem e quais são os 4 elementos que ajudam a reduzi-las.",
      segmentos: [
        seg("0:00–0:40", "Abertura (gancho)", [{ fala: "Uma falta não avisada custa duas vezes — o tempo perdido na agenda e a energia gasta decidindo se vale a pena cobrar por isso." }]),
        seg("0:40–1:30", "Por que isso importa", ["Este módulo encerra o Bloco 5 com uma ferramenta prática pra proteger sua agenda."]),
        seg("1:30–8:00", "Os 4 elementos (mostrar slide 4)", [
          "Política clara comunicada antes da primeira sessão.",
          "Lembrete automático com antecedência adequada.",
          "Facilidade real de remarcar quando necessário.",
          "Consequência combinada, aplicada com consistência.",
        ]),
        seg("8:00–11:00", "Um ponto importante", ["A maioria das faltas vem de esquecimento genuíno, não de má-fé."]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Próxima aula: do agendamento à presença, e os 3 tipos de política." }]),
      ],
    },
    {
      n: 2, titulo: "Do agendamento à presença, e os 3 tipos de política", duracao: "12 min", slides: "5, 6",
      objetivo: "Explicar a cadeia do agendamento à presença e os 3 tipos de política de cancelamento.",
      segmentos: [
        seg("0:00–1:00", "Retomada rápida", ["Vimos os 4 elementos. Hoje, a jornada completa do agendamento à presença."]),
        seg("1:00–6:00", "A cadeia (mostrar slide 5)", ["Agendamento confirmado → Lembrete enviado → Facilidade de remarcar → Comparecimento."]),
        seg("6:00–11:00", "Os 3 tipos de política (mostrar slide 6)", ["Sem política, rígida e clara e humana — a última sustenta relação de longo prazo."]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Próxima aula: os sinais de que a política precisa de ajuste, e 3 abordagens comparadas." }]),
      ],
    },
    {
      n: 3, titulo: "Sinais de alerta e as 3 abordagens", duracao: "12 min", slides: "7, 8",
      objetivo: "Reconhecer sinais de que a política precisa de ajuste e comparar 3 abordagens possíveis.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Quatro sinais de alerta — e três abordagens, da ausência de política à clara e humana."]),
        seg("1:00–6:00", "Sinais de alerta (mostrar slide 7)", [
          "Padrão recorrente de faltas.",
          "Constrangimento ao cobrar.",
          "Nenhum lembrete configurado.",
          "Política nunca comunicada.",
        ]),
        seg("6:00–11:00", "3 abordagens (mostrar slide 8)", ["Sem política, rígida demais, e clara e humana."]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Próxima aula: as 3 ferramentas que reduzem faltas, e os 4 passos completos." }]),
      ],
    },
    {
      n: 4, titulo: "As 3 ferramentas e os 4 passos", duracao: "11 min", slides: "9, 10",
      objetivo: "Conhecer as 3 ferramentas que reduzem faltas e os 4 passos completos de estruturação.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três ferramentas simples — e um processo de 4 passos pra estruturar sua política."]),
        seg("1:00–5:00", "3 ferramentas (mostrar slide 9)", ["Lembrete automático, política escrita e janela de cancelamento."]),
        seg("5:00–10:00", "Os 4 passos (mostrar slide 10)", ["Definir a política, comunicar na primeira sessão, configurar lembretes, aplicar com consistência."]),
        seg("10:00–11:00", "Fechamento", [{ fala: "Próxima aula: aplicando os 4 passos na prática." }]),
      ],
    },
    {
      n: 5, titulo: "Aplicação prática dos 4 passos", duracao: "12 min", slides: "11, 12",
      objetivo: "Aplicar os 4 passos com exemplos concretos.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Hoje colocamos os 4 passos em prática, criando uma política completa."]),
        seg("1:00–6:00", "Passos 1 e 2 (mostrar slide 11)", ["Escolha um prazo razoável e uma consequência específica.", { fala: "Só pra alinhar: se precisar cancelar, é só avisar com 24h de antecedência, combinado?" }]),
        seg("6:00–11:00", "Passos 3 e 4 (mostrar slide 12)", ["Configure lembretes com 24 a 48h de antecedência.", "Aplique a regra com bom senso, mas sem exceção arbitrária."]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Próxima aula: um caso real de política inconsistente, e o recap final do Bloco 5." }]),
      ],
    },
    {
      n: 6, titulo: "Prática guiada — a política inconsistente e encerramento do Bloco 5", duracao: "13 min", slides: "13, 14, 15",
      objetivo: "Aplicar tudo que foi visto a um caso real e encerrar o Bloco 5.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["A última aula do Bloco 5 — um caso real, e o recap final."]),
        seg("1:00–5:00", "Apresentando o caso (mostrar slide 13)", ["Leia a vinheta com calma.", "Note que a ausência de política formal criou inconsistência percebida pelos pacientes."]),
        seg("5:00–9:00", "Percorrendo as perguntas de discussão", ["Discuta em voz alta as 3 perguntas do slide 13.", "Esboce uma política simples pra esse consultório."]),
        seg("9:00–11:00", "Quando buscar ajuda especializada (mostrar slide 14)", ["Percorra os 4 critérios do slide 14."]),
        seg("11:00–13:00", "Recap final e encerramento do bloco (mostrar slide 15)", [{ fala: "Retome os 4 pontos-chave. Você concluiu o Bloco 5 — do primeiro contato acolhedor à agenda protegida. Agora é hora dos exercícios e da avaliação." }]),
      ],
    },
  ];

  const totalMin = 12 + 12 + 12 + 11 + 12 + 13;

  const children = [
    ...doc.capa(KICKER, "Roteiro de Aulas — Reduzindo Faltas", "Módulo dividido em 6 vídeo-aulas de 11 a 13 minutos, seguindo os slides já produzidos. Cada aula tem roteiro cronometrado, pronto pra gravação. Este é o último roteiro do Bloco 5."),
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

  return doc.salvar(doc.paginaDoc("Escola de Marketing para Psicólogos", `${RODAPE_DOC} — Roteiro de Aulas`, children), "Modulo-5.4-Roteiro-Aulas.docx");
}

// ============================================================
Promise.resolve()
  .then(construirDeck)
  .then(construirExercicios)
  .then(construirProva)
  .then(construirRoteiro)
  .then(() => console.log("TUDO PRONTO"))
  .catch((e) => { console.error(e); process.exit(1); });

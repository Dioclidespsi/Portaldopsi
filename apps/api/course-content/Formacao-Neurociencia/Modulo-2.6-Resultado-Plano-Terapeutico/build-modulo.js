const deck = require("../_lib/lib-deck.js");
const doc = require("../_lib/lib-doc.js");

const MOD = "2.6";
const NOME = "Do Resultado ao Plano Terapêutico";
const RODAPE_DECK = `Resultado ao Plano — Módulo ${MOD}`;
const RODAPE_DOC = `Módulo ${MOD} — Resultado ao Plano`;
const KICKER = "MÓDULO 2.6 · PSICODIAGNÓSTICO E AVALIAÇÃO NEUROPSICOLÓGICA";

// ============================================================
// 1) SLIDE DECK
// ============================================================
function construirDeck() {
  const pres = deck.novaApresentacao(`${NOME} — Fechando o Ciclo do Bloco 2`);

  deck.slideTitulo(pres, {
    moduloLabel: `Módulo ${MOD} · Bloco 2 · Avaliação`,
    titulo: "Do Resultado ao Plano",
    subtitulo: "A síntese que transforma dados isolados num plano terapêutico coerente",
    passos: ["Síntese", "Priorização", "Protocolo", "Comunicação", "Plano formal"],
  });

  deck.slideRoteiro(pres, {
    rodape: RODAPE_DECK, pageNum: 2,
    cards: [
      { titulo: "Síntese diagnóstica", desc: "Convergindo anamnese, diagnóstico, testes e escalas" },
      { titulo: "Priorização clínica", desc: "O que tratar primeiro, quando há mais de uma demanda" },
      { titulo: "Escolha do protocolo", desc: "Selecionar o(s) módulo(s) certo(s) do Bloco 4" },
      { titulo: "Comunicação", desc: "Devolver o plano de forma clara e colaborativa" },
      { titulo: "Plano formal", desc: "Documentar de modo que sustente todo o tratamento" },
    ],
  });

  deck.slideHook(pres, {
    rodape: RODAPE_DECK, pageNum: 3,
    frase: "A habilidade mais rara em avaliação não é aplicar o teste certo — é a síntese que transforma três fontes de dados isoladas num único plano de ação coerente.",
    apoio: "Esse é o módulo que fecha o ciclo do Bloco 2: tudo que foi aprendido em entrevista, classificação, testes e escalas converge aqui, num plano terapêutico real.",
  });

  deck.slideCircuito(pres, {
    rodape: RODAPE_DECK, pageNum: 4,
    titulo: "As 4 fontes que convergem no plano terapêutico",
    regioes: [
      { label: "Anamnese e exame do estado mental (Módulo 2.1)", rx: 0.20, ry: 0.22, color: deck.NAVY, d: 0.5 },
      { label: "Diagnóstico formal com especificadores (Módulo 2.2)", rx: 0.22, ry: 0.62, color: deck.TERRA, d: 0.4 },
      { label: "Testes neuropsicológicos e de personalidade (Módulos 2.3, 2.4)", rx: 0.60, ry: 0.60, color: deck.NAVY_TINT, d: 0.36 },
      { label: "Escalas de gravidade e acompanhamento (Módulo 2.5)", rx: 0.58, ry: 0.24, color: deck.TERRA_TINT, d: 0.36 },
    ],
    notas: [
      "Nenhuma dessas 4 fontes, isoladamente, é suficiente pra construir um plano terapêutico robusto.",
      "A convergência entre elas é o que diferencia uma avaliação superficial de uma avaliação clinicamente útil.",
      "Esse é exatamente o percurso que este curso seguiu, módulo a módulo, ao longo de todo o Bloco 2.",
    ],
  });

  deck.slideCadeia(pres, {
    rodape: RODAPE_DECK, pageNum: 5,
    titulo: "Da síntese ao plano formal",
    elos: [
      { titulo: "Dados convergentes", desc: "Informação de múltiplas fontes, cruzada e coerente entre si" },
      { titulo: "Prioridades clínicas", desc: "Hierarquia do que precisa ser tratado primeiro" },
      { titulo: "Seleção do protocolo", desc: "Escolha do(s) módulo(s) do Bloco 4 mais adequado(s) ao caso" },
      { titulo: "Plano formal comunicado", desc: "Documentado e compartilhado de forma clara com o paciente" },
    ],
    notaFinal: "Pular a etapa de priorização é um erro comum — tentar tratar tudo ao mesmo tempo, sem hierarquia, tende a diluir a eficácia de qualquer protocolo.",
  });

  deck.slideCategorias(pres, {
    rodape: RODAPE_DECK, pageNum: 6,
    titulo: "3 elementos de um plano terapêutico bem formulado",
    categorias: [
      { titulo: "Diagnóstico claro", desc: "Com especificadores, não apenas uma categoria genérica", color: deck.NAVY },
      { titulo: "Hierarquia de prioridades", desc: "O que tratar primeiro, quando há mais de uma demanda real", color: deck.TERRA },
      { titulo: "Protocolo(s) selecionado(s)", desc: "Com justificativa clínica clara da escolha feita", color: deck.NAVY_TINT },
    ],
    notaFinal: "Um plano sem esses 3 elementos tende a ser vago demais pra orientar o trabalho sessão a sessão.",
  });

  deck.slideSinais(pres, {
    rodape: RODAPE_DECK, pageNum: 7,
    titulo: "Erros comuns na síntese diagnóstica",
    itens: [
      { titulo: "Tratar sintomas isolados", desc: "Sem hierarquia clara entre eles, diluindo o foco terapêutico" },
      { titulo: "Ignorar comorbidade real", desc: "Forçar um único diagnóstico quando dois coexistem genuinamente" },
      { titulo: "Comunicação pouco clara", desc: "Plano não compreendido pelo paciente, prejudicando adesão" },
      { titulo: "Plano estático", desc: "Não revisado com a evolução mostrada pelas escalas (Módulo 2.5)" },
    ],
  });

  deck.slideDiferencial(pres, {
    rodape: RODAPE_DECK, pageNum: 8,
    titulo: "Caso simples versus caso complexo",
    cards: [
      { titulo: "Caso simples", desc: "Um diagnóstico claro, um protocolo único do Bloco 4 aplicado diretamente" },
      { titulo: "Caso com comorbidade real", desc: "Dois ou mais diagnósticos coexistentes, exigindo priorização clara" },
      { titulo: "Caso complexo", desc: "Múltiplas demandas exigindo formulação integrada — ver Módulo 5.1" },
    ],
  });

  deck.slideInstrumentos(pres, {
    rodape: RODAPE_DECK, pageNum: 9,
    titulo: "Os 3 documentos que fecham essa etapa",
    instrumentos: [
      { sigla: "Laudo psicológico", nome: "Síntese formal da avaliação", desc: "Documenta achados, diagnóstico e recomendações de forma estruturada." },
      { sigla: "Plano terapêutico", nome: "Objetivos e protocolo(s) selecionado(s)", desc: "Orienta o trabalho sessão a sessão, com metas claras." },
      { sigla: "Contrato terapêutico", nome: "Combinados e expectativas", desc: "Compartilhado com o paciente, sustentando adesão desde o início." },
    ],
  });

  deck.slideProtocoloOverview(pres, {
    rodape: RODAPE_DECK, pageNum: 10,
    titulo: "Da síntese ao plano: 4 passos",
    passos: [
      { titulo: "Sintetizar\nos dados", desc: "Cruzar anamnese, diagnóstico, testes e escalas numa leitura única" },
      { titulo: "Hierarquizar\nprioridades", desc: "Definir o que precisa ser tratado primeiro, com justificativa clara" },
      { titulo: "Selecionar o\nprotocolo", desc: "Escolher o(s) módulo(s) do Bloco 4 mais adequado(s)" },
      { titulo: "Comunicar\no plano", desc: "De forma clara, colaborativa e compreensível pro paciente" },
    ],
    notaFinal: "Esse é o momento em que a avaliação para de ser um exercício acadêmico e vira, de fato, direção clínica pro tratamento.",
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 11,
    titulo: "Passos 1 e 2, na prática",
    colunas: [
      {
        numero: 1, titulo: "Sintetizar os dados",
        bullets: ["Revise anamnese, exame do estado mental, diagnóstico formal, testes e escalas juntos, não isoladamente", "Procure ativamente por convergências e discrepâncias entre as fontes"],
      },
      {
        numero: 2, titulo: "Hierarquizar prioridades",
        fala: "“Entre tudo que conversamos, o que mais tem afetado sua vida agora — é isso que vamos priorizar primeiro.”",
        bullets: ["Priorize risco imediato (Módulo 4.9) acima de qualquer outra demanda, sempre", "Em seguida, priorize o que gera maior prejuízo funcional atual"],
      },
    ],
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 12,
    titulo: "Passos 3 e 4, na prática",
    colunas: [
      {
        numero: 3, titulo: "Selecionar o protocolo",
        bullets: ["Revise o módulo correspondente do Bloco 4 antes de aplicar qualquer intervenção", "Em casos com múltiplas demandas, considere qual protocolo abordar primeiro, sem tentar aplicar todos simultaneamente"],
      },
      {
        numero: 4, titulo: "Comunicar o plano",
        bullets: ["Explique o plano em linguagem acessível, evitando jargão técnico desnecessário", "Confirme que o paciente entendeu e concorda com a direção proposta"],
      },
    ],
  });

  deck.slideCaso(pres, {
    rodape: RODAPE_DECK, pageNum: 13,
    vinheta: "Um paciente chega com queixas de ansiedade generalizada, sintomas depressivos moderados e relato de uso crescente de álcool nos últimos 6 meses. A entrevista, os testes e as escalas (GAD-7, PHQ-9, AUDIT) confirmam os 3 quadros com gravidade moderada.",
    perguntas: [
      "Como você hierarquizaria as 3 demandas desse caso, e com base em que critério?",
      "Você aplicaria um único protocolo do Bloco 4 ou consideraria mais de um? Justifique.",
      "Como você comunicaria esse plano ao paciente, de forma que ele entenda a lógica de priorização escolhida?",
    ],
  });

  deck.slideEncaminhamento(pres, {
    rodape: RODAPE_DECK, pageNum: 14,
    criterios: [
      "Múltiplas demandas com prejuízo funcional significativo em várias áreas: considerar formulação de caso integrada (Módulo 5.1)",
      "Necessidade de equipe multiprofissional desde o início, não apenas protocolo psicológico isolado",
      "Qualquer sinal de risco imediato identificado durante a síntese: ativar o Módulo 4.9 antes de qualquer outra priorização",
      "Dúvida persistente sobre qual protocolo priorizar: buscar supervisão clínica antes de definir o plano final",
    ],
  });

  deck.slideRecap(pres, {
    rodape: RODAPE_DECK, pageNum: 15,
    pontos: [
      "A síntese que converge múltiplas fontes de dados é a habilidade mais rara e mais valiosa da avaliação clínica",
      "Diagnóstico claro, hierarquia de prioridades e protocolo(s) selecionado(s) compõem um plano terapêutico bem formulado",
      "Risco imediato sempre vem primeiro na hierarquia de prioridades, acima de qualquer outra demanda",
      "Esse módulo fecha o ciclo do Bloco 2 inteiro — da entrevista ao plano formal — e abre a ponte direta pro Bloco 5",
    ],
    proximoTexto: "Módulo 2.6 concluído — fim do Bloco 2 (Avaliação) →",
  });

  return pres.writeFile({ fileName: "Modulo-2.6-Resultado-Plano-Terapeutico.pptx" });
}

// ============================================================
// 2) EXERCÍCIOS
// ============================================================
function construirExercicios() {
  const children = [
    ...doc.capa(KICKER, "Exercícios — Do Resultado ao Plano Terapêutico", "Resolva individualmente antes da sessão de supervisão. O objetivo é testar sua capacidade de síntese antes de comparar com a discussão em grupo — não há problema em errar."),

    doc.exNum(1, "Os 3 elementos, em suas palavras"),
    doc.pergunta(1, "Explique em uma frase cada elemento de um plano terapêutico bem formulado: diagnóstico claro, hierarquia de prioridades, protocolo selecionado."),
    ...doc.linhaResposta(3),
    doc.pergunta(2, "Por que priorizar risco imediato sempre vem antes de qualquer outra demanda na hierarquia?"),
    ...doc.linhaResposta(2),

    doc.exNum(2, "Identificando erros de síntese"),
    doc.vinhetaBox("Um profissional decide tratar ansiedade, sintomas depressivos e dificuldades de sono do mesmo paciente simultaneamente, sem qualquer ordem de prioridade definida."),
    doc.pergunta(1, "Que erro comum de síntese está ilustrado nessa vinheta, e por que ele tende a diluir a eficácia do tratamento?"),
    ...doc.linhaResposta(2),

    doc.exNum(3, "Comunicando o plano"),
    doc.vinhetaBox("Um paciente pergunta: \"por que vamos trabalhar minha ansiedade antes da minha procrastinação, se a procrastinação é o que mais me incomoda no dia a dia?\""),
    doc.pergunta(1, "Escreva uma resposta que explique a lógica de priorização de forma clara e colaborativa."),
    ...doc.linhaResposta(3),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),

    doc.exNum(4, "Caso integrado"),
    doc.vinhetaBox("Um paciente apresenta ansiedade generalizada, sintomas depressivos moderados e uso crescente de álcool nos últimos 6 meses, todos confirmados com gravidade moderada por entrevista, testes e escalas (GAD-7, PHQ-9, AUDIT)."),
    doc.pergunta(1, "Como você hierarquizaria as 3 demandas, e com base em que critério?"),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Você aplicaria um único protocolo do Bloco 4 ou mais de um? Justifique."),
    ...doc.linhaResposta(2),
    doc.pergunta(3, "Como você comunicaria esse plano ao paciente?"),
    ...doc.linhaResposta(2),
  ];

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-2.6-Exercicios.docx");
}

// ============================================================
// 3) AVALIAÇÃO
// ============================================================
function construirProva() {
  const objetivas = [
    ["As 4 fontes que convergem no plano terapêutico são:", ["Anamnese/exame do estado mental, diagnóstico formal, testes neuropsicológicos/personalidade, escalas de gravidade", "Grandiosidade, necessidade de admiração, falta de empatia, impulsividade", "Compreensão verbal, organização perceptual, memória de trabalho, velocidade de processamento", "Serotonina, dopamina, GABA, glutamato"]],
    ["A habilidade descrita como mais rara e valiosa em avaliação clínica é:", ["A síntese que converge múltiplas fontes de dados num plano coerente", "Aplicar o maior número possível de testes em cada caso", "Memorizar todos os critérios diagnósticos do DSM-5-TR", "Aplicar exclusivamente escalas de autorrelato rápido"]],
    ["Os 3 elementos de um plano terapêutico bem formulado são:", ["Diagnóstico claro, hierarquia de prioridades, protocolo(s) selecionado(s)", "Sintomas nucleares, duração mínima, prejuízo funcional", "Atenção, memória, funções executivas", "Compreensão verbal, organização perceptual, velocidade de processamento"]],
    ["Na hierarquia de prioridades clínicas, o que deve vir sempre primeiro?", ["Risco imediato, acima de qualquer outra demanda", "A queixa que o paciente menciona por último na sessão", "O quadro mais fácil de tratar, independente da gravidade", "Nenhuma prioridade específica precisa ser definida"]],
    ["Tratar sintomas isolados sem hierarquia clara tende a:", ["Diluir o foco terapêutico e a eficácia do tratamento", "Sempre acelerar a resolução de todos os quadros simultaneamente", "Não ter qualquer impacto na eficácia do tratamento", "Ser sempre a abordagem mais eficaz em qualquer caso"]],
    ["Diante de comorbidade real entre dois quadros, o módulo recomenda:", ["Reconhecer ambos os diagnósticos, com hierarquia clara de tratamento, em vez de ignorar um deles", "Escolher aleatoriamente qual diagnóstico tratar primeiro", "Ignorar completamente um dos dois diagnósticos", "Aplicar todos os protocolos simultaneamente, sem qualquer ordem"]],
    ["Os 3 documentos que fecham a etapa de síntese são:", ["Laudo psicológico, plano terapêutico, contrato terapêutico", "Apenas o laudo psicológico, sem qualquer outro documento", "Exclusivamente escalas de rastreio reaplicadas", "Documentos exclusivamente médicos, sem qualquer registro psicológico"]],
    ["O passo \"comunicar o plano\" recomenda:", ["Explicar em linguagem acessível e confirmar que o paciente entendeu e concorda", "Utilizar exclusivamente jargão técnico, sem qualquer adaptação", "Evitar qualquer comunicação direta do plano ao paciente", "Presumir que o paciente já entende automaticamente a lógica do plano"]],
    ["Diante de múltiplas demandas com prejuízo funcional significativo em várias áreas, o módulo recomenda considerar:", ["Formulação de caso integrada (Módulo 5.1)", "Ignorar completamente a complexidade do caso", "Tratar apenas a demanda mais recente relatada", "Encerrar o acompanhamento por complexidade excessiva"]],
    ["Este módulo, segundo o material, tem a função de:", ["Fechar o ciclo do Bloco 2, da entrevista ao plano formal, abrindo ponte pro Bloco 5", "Introduzir testes completamente novos, não vistos em módulos anteriores", "Substituir a necessidade de qualquer protocolo do Bloco 4", "Funcionar de forma independente, sem relação com os demais módulos do Bloco 2"]],
  ];
  const gabaritoObjetivas = ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a"];

  const children = [
    ...doc.capa(KICKER, "Avaliação — Do Resultado ao Plano Terapêutico", `Avaliação formativa de encerramento do Módulo ${MOD}.`),
    doc.infoBox([
      ["Nota de corte:", "70 de 100 pontos"],
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
    doc.vinhetaBox("Uma paciente apresenta sintomas de TEPT (Módulo 4.6) após um acidente há 8 meses, além de sinais compatíveis com Luto Complicado (Módulo 4.24) pela perda de um familiar no mesmo acidente. A entrevista confirma ambos os quadros com gravidade significativa, e a paciente relata, num momento da sessão, \"às vezes penso que seria mais fácil não estar aqui\"."),
    new doc.Paragraph({ spacing: { before: 240 }, children: [new doc.TextRun({ text: "Com base no protocolo estudado, responda:", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    new doc.Paragraph({ spacing: { before: 220, after: 40 }, children: [new doc.TextRun({ text: "a) (10 pts) Qual deve ser a prioridade clínica absoluta diante do comentário da paciente, antes de qualquer outra consideração?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "b) (10 pts) Depois de garantida a segurança, como você hierarquizaria TEPT e Luto Complicado?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "c) (10 pts) Que conexão entre os dois protocolos do Bloco 4 pode ser explorada, dado que ambos se originam do mesmo evento?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "d) (10 pts) Como você comunicaria esse plano complexo à paciente, de forma clara e colaborativa?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    new doc.Paragraph({ spacing: { after: 40 }, children: [new doc.TextRun({ text: "USO EXCLUSIVO DO INSTRUTOR — remover antes de aplicar a prova", bold: true, color: doc.TERRA, font: doc.FONT, size: 20 })] }),
    doc.tituloH1("Gabarito"),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 1 — Questões objetivas", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 200 }, children: [new doc.TextRun({ text: gabaritoObjetivas.map((r, i) => `${i + 1}-${r}`).join("   ·   "), font: doc.FONT, size: 22, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 2 — Critério de correção da questão de caso", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "a) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Avaliação de risco formal, ativando o protocolo do Módulo 4.9 — qualquer menção a desejo de não estar mais aqui exige investigação imediata, antes de qualquer outra priorização.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "b) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Ambos precisam ser trabalhados de forma integrada, já que se originam do mesmo evento — a hierarquia dependerá de qual sintoma gera maior prejuízo funcional imediato, frequentemente o TEPT primeiro, dado seu impacto funcional mais amplo.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "c) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "O Módulo 4.24 já prevê explicitamente essa sobreposição, recomendando trabalho conjunto com o protocolo de TEPT quando a morte foi traumática.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "d) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Explicar que os dois quadros estão conectados pelo mesmo evento, que a segurança dela vem primeiro, e que o plano vai trabalhar ambos de forma integrada, no ritmo dela.", font: doc.FONT, size: 21, color: doc.INK })] }),
  );

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-2.6-Avaliacao.docx");
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
      n: 1, titulo: "Fechando o ciclo do Bloco 2", duracao: "12 min", slides: "1, 2, 3, 4",
      objetivo: "Sair sabendo explicar as 4 fontes que convergem no plano terapêutico sem jargão técnico.",
      segmentos: [
        seg("0:00–0:45", "Abertura (gancho)", [{ fala: "A habilidade mais rara em avaliação não é aplicar o teste certo — é a síntese que transforma três fontes de dados isoladas num único plano de ação coerente." }]),
        seg("0:45–2:00", "Por que isso importa", ["Esse módulo fecha o ciclo do Bloco 2 inteiro, da entrevista ao plano formal."]),
        seg("2:00–8:00", "As 4 fontes (mostrar slide 4)", [
          "Anamnese e exame do estado mental (Módulo 2.1).",
          "Diagnóstico formal com especificadores (Módulo 2.2).",
          "Testes neuropsicológicos e de personalidade (Módulos 2.3, 2.4).",
          "Escalas de gravidade e acompanhamento (Módulo 2.5).",
        ]),
        seg("8:00–10:30", "Um ponto importante", ["A convergência entre essas fontes é o que diferencia avaliação superficial de avaliação clinicamente útil."]),
        seg("10:30–12:00", "Fechamento", [{ fala: "Próxima aula: da síntese ao plano formal, passo a passo." }]),
      ],
    },
    {
      n: 2, titulo: "Da síntese ao plano formal", duracao: "10 min", slides: "5, 6",
      objetivo: "Explicar a cadeia entre síntese, priorização e plano formal, e os 3 elementos de um bom plano.",
      segmentos: [
        seg("0:00–1:00", "Retomada rápida", ["Vimos as 4 fontes. Hoje vemos como elas se transformam num plano de fato."]),
        seg("1:00–5:00", "A cadeia (mostrar slide 5)", ["Dados convergentes: informação cruzada e coerente.", "Prioridades clínicas: hierarquia do que tratar primeiro.", "Seleção do protocolo: módulo(s) mais adequado(s) do Bloco 4.", "Plano formal comunicado: documentado e compartilhado com clareza."]),
        seg("5:00–9:00", "Os 3 elementos de um bom plano (mostrar slide 6)", ["Diagnóstico claro, com especificadores.", "Hierarquia de prioridades definida.", "Protocolo(s) selecionado(s) com justificativa."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: os erros mais comuns nessa etapa de síntese." }]),
      ],
    },
    {
      n: 3, titulo: "Erros comuns e caso simples versus complexo", duracao: "12 min", slides: "7, 8",
      objetivo: "Reconhecer os erros mais comuns de síntese e diferenciar níveis de complexidade de caso.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Quatro erros comuns — e uma forma prática de calibrar a complexidade do caso."]),
        seg("1:00–6:00", "Os erros comuns (mostrar slide 7)", [
          "Tratar sintomas isolados sem hierarquia.",
          "Ignorar comorbidade real.",
          "Comunicação pouco clara.",
          "Plano estático, não revisado com a evolução.",
        ]),
        seg("6:00–10:30", "Caso simples versus complexo (mostrar slide 8)", [
          "Caso simples: diagnóstico claro, protocolo único.",
          "Caso com comorbidade real: dois ou mais diagnósticos coexistentes.",
          "Caso complexo: múltiplas demandas exigindo formulação integrada — Módulo 5.1.",
        ]),
        seg("10:30–12:00", "Fechamento", [{ fala: "Próxima aula: os 3 documentos que fecham essa etapa." }]),
      ],
    },
    {
      n: 4, titulo: "Aplicação — sintetizar, hierarquizar e selecionar", duracao: "13 min", slides: "9, 10, 11",
      objetivo: "Consolidar documentos formais e aplicar os passos 1, 2 e 3 do modelo.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Hoje colocamos o modelo em prática, do documento à ação."]),
        seg("1:00–4:00", "Os 3 documentos (mostrar slide 9)", ["Laudo psicológico, plano terapêutico e contrato terapêutico."]),
        seg("4:00–5:00", "Visão geral do modelo (mostrar slide 10)", ["Sintetizar os dados → Hierarquizar prioridades → Selecionar o protocolo → Comunicar o plano."]),
        seg("5:00–9:30", "Passos 1 e 2 (mostrar slide 11)", ["Revise todas as fontes juntas, procurando convergências e discrepâncias.", { fala: "Entre tudo que conversamos, o que mais tem afetado sua vida agora — é isso que vamos priorizar primeiro." }, "Risco imediato sempre acima de qualquer outra demanda."]),
        seg("9:30–13:00", "Fechamento", [{ fala: "Próxima aula: selecionar o protocolo, comunicar o plano, e um caso real completo." }]),
      ],
    },
    {
      n: 5, titulo: "Aplicação, estudo de caso, encaminhamento e recap", duracao: "15 min", slides: "12, 13, 14, 15",
      objetivo: "Fechar os passos 3 e 4 do modelo, integrar um caso completo e encerrar o Bloco 2.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Última aula do módulo — e do Bloco 2 inteiro."]),
        seg("1:00–5:00", "Passos 3 e 4 (mostrar slide 12)", ["Revise o módulo correspondente antes de aplicar qualquer intervenção.", "Explique o plano em linguagem acessível e confirme entendimento."]),
        seg("5:00–9:00", "Estudo de caso (mostrar slide 13)", ["Leia a vinheta com calma.", "Percorra as 3 perguntas de discussão.", "Convide o aluno a pausar e responder por escrito."]),
        seg("9:00–12:00", "Quando encaminhar (mostrar slide 14)", ["Percorra os 4 critérios, com atenção à formulação de caso integrada do Módulo 5.1."]),
        seg("12:00–14:00", "Recapitulando o módulo (mostrar slide 15)", ["Retome os 4 pontos-chave.", "Reforce que esse módulo fecha o Bloco 2 e abre a ponte pro Bloco 5."]),
        seg("14:00–15:00", "Fechamento do módulo e do bloco", [{ fala: "Agora é hora dos exercícios e da avaliação. Com isso, encerramos o Bloco 2 completo de Avaliação." }]),
      ],
    },
  ];

  const totalMin = 12 + 10 + 12 + 13 + 15;

  const children = [
    ...doc.capa(KICKER, "Roteiro de Aulas — Do Resultado ao Plano Terapêutico", "Módulo dividido em 5 vídeo-aulas de 10 a 15 minutos, seguindo os slides já produzidos. Cada aula tem roteiro cronometrado, pronto pra gravação."),
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

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", `${RODAPE_DOC} — Roteiro de Aulas`, children), "Modulo-2.6-Roteiro-Aulas.docx");
}

// ============================================================
Promise.resolve()
  .then(construirDeck)
  .then(construirExercicios)
  .then(construirProva)
  .then(construirRoteiro)
  .then(() => console.log("TUDO PRONTO"))
  .catch((e) => { console.error(e); process.exit(1); });

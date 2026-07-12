const deck = require("../_lib/lib-deck.js");
const doc = require("../_lib/lib-doc.js");

const MOD = "4.23";
const NOME = "Insônia (CBT-I)";
const RODAPE_DECK = `Insônia — Módulo ${MOD}`;
const RODAPE_DOC = `Módulo ${MOD} — Insônia`;
const KICKER = "MÓDULO 4.23 · PROTOCOLOS CLÍNICOS";

// ============================================================
// 1) SLIDE DECK
// ============================================================
function construirDeck() {
  const pres = deck.novaApresentacao(`${NOME} — Da Neurociência ao Protocolo Clínico`);

  deck.slideTitulo(pres, {
    moduloLabel: `Módulo ${MOD} · Protocolos Clínicos`,
    titulo: "Insônia (CBT-I)",
    subtitulo: "O protocolo mais contraintuitivo — e um dos mais eficazes",
    passos: ["Mecanismo", "Sinais", "Instrumento", "Protocolo", "Encaminhamento"],
  });

  deck.slideRoteiro(pres, {
    rodape: RODAPE_DECK, pageNum: 2,
    cards: [
      { titulo: "Mecanismo", desc: "Como a cama vira sinal de vigília, não de sono" },
      { titulo: "Sinais", desc: "O ciclo que se sustenta mesmo sem o estressor original" },
      { titulo: "Instrumento", desc: "ISI, diário do sono e triagem de apneia" },
      { titulo: "Protocolo", desc: "4 passos da CBT-I, o padrão-ouro de tratamento" },
      { titulo: "Encaminhamento", desc: "Quando insônia é sintoma de outra coisa" },
    ],
  });

  deck.slideHook(pres, {
    rodape: RODAPE_DECK, pageNum: 3,
    frase: "O componente mais eficaz do tratamento da insônia crônica é, na prática, reduzir o tempo que a pessoa passa na cama — o oposto do que ela mais quer fazer quando está exausta.",
    apoio: "Isso só faz sentido quando se entende o mecanismo: a cama, com o tempo, deixou de ser sinal de sono e passou a ser sinal de frustração e vigília.",
  });

  deck.slideCircuito(pres, {
    rodape: RODAPE_DECK, pageNum: 4,
    titulo: "Por que a mente acelera justamente na hora de dormir",
    regioes: [
      { label: "Sistema de hiperativação (arousal cognitivo e fisiológico elevado à noite)", rx: 0.20, ry: 0.22, color: deck.TERRA, d: 0.5 },
      { label: "Amígdala (condicionamento da cama como sinal de ameaça/frustração)", rx: 0.22, ry: 0.62, color: deck.NAVY, d: 0.4 },
      { label: "Processo homeostático de sono (pressão de sono reduzida por compensações)", rx: 0.60, ry: 0.60, color: deck.NAVY_TINT, d: 0.36 },
      { label: "Núcleo supraquiasmático (ritmo circadiano desalinhado por horários irregulares)", rx: 0.58, ry: 0.24, color: deck.TERRA_TINT, d: 0.36 },
    ],
    notas: [
      "O sistema de hiperativação mantém ativação cognitiva e fisiológica elevada justamente no momento em que o corpo deveria relaxar pra dormir.",
      "A amígdala participa do condicionamento da cama como sinal de frustração — não mais de sono — depois de noites repetidas de vigília ali.",
      "A pressão de sono (processo homeostático) fica reduzida por cochilos e tempo excessivo na cama, dois comportamentos compensatórios que parecem ajudar mas perpetuam o problema.",
    ],
  });

  deck.slideCadeia(pres, {
    rodape: RODAPE_DECK, pageNum: 5,
    titulo: "Do estressor inicial ao ciclo autossustentado",
    elos: [
      { titulo: "Episódio inicial de sono ruim", desc: "Geralmente ligado a um estressor agudo ou evento de vida específico" },
      { titulo: "Resposta compensatória", desc: "Ir pra cama mais cedo, ficar mais tempo deitado tentando dormir" },
      { titulo: "Condicionamento negativo", desc: "A cama passa a ser sinal de vigília e frustração, não de sono" },
      { titulo: "Insônia crônica", desc: "Persiste mesmo depois que o estressor original já passou" },
    ],
    notaFinal: "É por isso que insônia crônica muitas vezes continua bem depois do problema que a originou ter sido resolvido — o ciclo aprendeu a se sustentar sozinho.",
  });

  deck.slideCategorias(pres, {
    rodape: RODAPE_DECK, pageNum: 6,
    titulo: "3 mecanismos centrais",
    categorias: [
      { titulo: "Hiperativação cognitiva", desc: "Mente acelerada e ruminação ao se aproximar da hora de dormir", color: deck.TERRA },
      { titulo: "Condicionamento cama-vigília", desc: "A cama deixa de sinalizar sono e passa a sinalizar frustração", color: deck.NAVY },
      { titulo: "Comportamentos compensatórios", desc: "Cochilos e tempo excessivo na cama, que perpetuam o problema", color: deck.NAVY_TINT },
    ],
    notaFinal: "Os comportamentos compensatórios parecem lógicos (\"preciso recuperar o sono perdido\"), mas são justamente o que mantém o ciclo ativo.",
  });

  deck.slideSinais(pres, {
    rodape: RODAPE_DECK, pageNum: 7,
    titulo: "Como reconhecer o padrão na prática",
    itens: [
      { titulo: "Cognitivo", desc: "Ansiedade antecipatória sobre não conseguir dormir, catastrofização das consequências" },
      { titulo: "Comportamental", desc: "Tempo excessivo na cama tentando forçar o sono, cochilos diurnos compensatórios" },
      { titulo: "Funcional", desc: "Fadiga diurna, irritabilidade, prejuízo cognitivo no dia seguinte" },
      { titulo: "Físico", desc: "Tensão muscular e hiperativação do sistema nervoso simpático ao anoitecer" },
    ],
  });

  deck.slideDiferencial(pres, {
    rodape: RODAPE_DECK, pageNum: 8,
    titulo: "Diagnóstico diferencial rápido",
    cards: [
      { titulo: "Insônia secundária", desc: "A ansiedade generalizada ou depressão de base deve ser tratada em conjunto, não só a insônia isolada" },
      { titulo: "Apneia do sono", desc: "Ronco, pausas respiratórias e sonolência diurna mesmo com tempo de sono adequado exigem triagem antes da CBT-I" },
      { titulo: "Transtorno Bipolar (Módulo 4.20)", desc: "Redução da necessidade de sono em mania é diferente de insônia com desejo de dormir e incapacidade" },
    ],
  });

  deck.slideInstrumentos(pres, {
    rodape: RODAPE_DECK, pageNum: 9,
    titulo: "Instrumentos e triagem antes de começar",
    instrumentos: [
      { sigla: "ISI", nome: "Insomnia Severity Index", desc: "Mede gravidade e impacto funcional da insônia." },
      { sigla: "Diário do sono", nome: "Registro diário, 1-2 semanas", desc: "Linha de base objetiva antes de iniciar o protocolo." },
      { sigla: "Triagem de apneia", nome: "Perguntas de rastreio (ronco, pausas respiratórias)", desc: "Descarta apneia do sono antes de assumir insônia primária." },
    ],
  });

  deck.slideProtocoloOverview(pres, {
    rodape: RODAPE_DECK, pageNum: 10,
    titulo: "Do mecanismo ao protocolo: 4 passos da CBT-I",
    passos: [
      { titulo: "Restrição\nde sono", desc: "Reduzir o tempo na cama pra aumentar a pressão e eficiência do sono" },
      { titulo: "Controle de\nestímulos", desc: "Recondicionar a cama como sinal de sono, não de vigília" },
      { titulo: "Higiene do\nsono e ritmo", desc: "Horários consistentes, exposição à luz, regulação de cafeína" },
      { titulo: "Reestruturação\ncognitiva", desc: "Questionar crenças catastróficas sobre as consequências de dormir mal" },
    ],
    notaFinal: "O passo mais contraintuitivo — restrição de sono — costuma ser também o mais eficaz, mesmo parecendo piorar as coisas nos primeiros dias.",
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 11,
    titulo: "Passos 1 e 2, na prática",
    colunas: [
      {
        numero: 1, titulo: "Restrição de sono",
        fala: "“Vamos reduzir o tempo que você passa na cama por algumas semanas — isso vai parecer contraintuitivo, mas é o que reconstrói a eficiência do seu sono.”",
        bullets: ["Calcule o tempo de restrição com base no diário de sono, nunca abaixo de um mínimo seguro", "Ajuste progressivamente conforme a eficiência do sono melhora"],
      },
      {
        numero: 2, titulo: "Controle de estímulos",
        bullets: ["Só deitar na cama quando sentir sono real, não apenas cansaço", "Se não dormir em cerca de 20 minutos, sair da cama e voltar só quando sentir sono novamente"],
      },
    ],
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 12,
    titulo: "Passos 3 e 4, na prática",
    colunas: [
      {
        numero: 3, titulo: "Higiene do sono e ritmo circadiano",
        bullets: ["Mantenha horários de dormir e acordar consistentes, inclusive nos fins de semana", "Regule exposição à luz e consumo de cafeína conforme o horário do dia"],
      },
      {
        numero: 4, titulo: "Reestruturação cognitiva",
        fala: "“O que realmente aconteceria se você tivesse mais uma noite de sono ruim — é tão catastrófico quanto parece agora, às 3 da manhã?”",
        bullets: ["Questione crenças catastróficas sobre as consequências de uma noite mal dormida", "Trabalhe a ansiedade antecipatória associada à hora de deitar"],
      },
    ],
  });

  deck.slideCaso(pres, {
    rodape: RODAPE_DECK, pageNum: 13,
    vinheta: "Patrícia, 40 anos, relata insônia há 2 anos, iniciada após um período de estresse no trabalho que já foi resolvido há mais de um ano. Vai pra cama às 21h \"pra garantir tempo suficiente\", mas só consegue dormir por volta da 1h, e cochila à tarde \"pra compensar\". Relata pânico só de pensar em outra noite mal dormida, e já tentou \"de tudo\", incluindo ficar ainda mais tempo na cama tentando relaxar.",
    perguntas: [
      "Que elementos da vinheta ilustram os 3 mecanismos centrais da insônia crônica?",
      "Por que o estressor original já ter sido resolvido não significa que a insônia deveria ter passado também?",
      "Que ajuste específico no comportamento de Patrícia você indicaria primeiro, e por quê?",
    ],
  });

  deck.slideEncaminhamento(pres, {
    rodape: RODAPE_DECK, pageNum: 14,
    criterios: [
      "Rastreio de apneia do sono antes de iniciar a CBT-I — encaminhar pra polissonografia se houver suspeita",
      "Tratar o transtorno psiquiátrico primário concomitantemente, quando a insônia for secundária a ansiedade ou depressão",
      "Insônia crônica não tratada é fator de risco pra depressão e ansiedade — o tratamento tem valor preventivo",
      "Uso crônico de medicação hipnótica sem acompanhamento: encaminhar pra avaliação médica de desmame supervisionado",
    ],
  });

  deck.slideRecap(pres, {
    rodape: RODAPE_DECK, pageNum: 15,
    pontos: [
      "A cama, com o tempo, deixa de sinalizar sono e passa a sinalizar frustração e vigília — o núcleo do condicionamento na insônia crônica",
      "Hiperativação cognitiva, condicionamento cama-vigília e comportamentos compensatórios são os 3 mecanismos centrais",
      "ISI, diário do sono e triagem de apneia estruturam a avaliação antes de iniciar o protocolo",
      "A CBT-I, com restrição de sono e controle de estímulos como pilares, é o padrão-ouro de tratamento, mesmo parecendo contraintuitiva",
    ],
    proximoTexto: "Próximo: exercícios práticos e avaliação do Módulo 4.23 →",
  });

  return pres.writeFile({ fileName: "Modulo-4.23-Insonia.pptx" });
}

// ============================================================
// 2) EXERCÍCIOS
// ============================================================
function construirExercicios() {
  const children = [
    ...doc.capa(KICKER, "Exercícios — Insônia (CBT-I)", "Resolva individualmente antes da sessão de supervisão. O objetivo é testar sua leitura do mecanismo e do protocolo antes de comparar com a discussão em grupo — não há problema em errar."),

    doc.exNum(1, "O mecanismo, em suas palavras"),
    doc.pergunta(1, "Explique em até 3 frases, sem jargão técnico, por que reduzir o tempo na cama pode melhorar o sono, mesmo parecendo contraintuitivo."),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Por que a insônia crônica pode persistir mesmo depois que o estressor original já foi resolvido?"),
    ...doc.linhaResposta(2),

    doc.exNum(2, "Diagnóstico diferencial"),
    doc.vinhetaBox("Um paciente relata dificuldade de dormir, mas o parceiro observa ronco alto e pausas na respiração durante o sono, além de sonolência diurna intensa mesmo passando tempo suficiente na cama."),
    doc.pergunta(1, "Que hipótese deve ser descartada antes de iniciar a CBT-I, e por quê?"),
    ...doc.linhaResposta(2),

    doc.exNum(3, "Os 4 passos da CBT-I"),
    doc.tabelaSimples(["Passo", "Ação concreta"], [["Restrição de sono", ""], ["Controle de estímulos", ""], ["Higiene do sono/ritmo", ""], ["Reestruturação cognitiva", ""]], [3400, 5950]),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),

    doc.exNum(4, "Controle de estímulos"),
    doc.vinhetaBox("Um paciente permanece na cama por mais de uma hora tentando forçar o sono, cada vez mais frustrado."),
    doc.pergunta(1, "Que orientação específica de controle de estímulos você daria pra essa situação?"),
    ...doc.linhaResposta(3),

    doc.exNum(5, "Caso integrado — Patrícia"),
    doc.vinhetaBox("Patrícia, 40 anos, insônia há 2 anos, iniciada após estresse no trabalho já resolvido. Vai pra cama às 21h \"pra garantir tempo\", só dorme por volta da 1h, cochila à tarde, tem pânico de outra noite mal dormida."),
    doc.pergunta(1, "Identifique os 3 mecanismos centrais presentes na vinheta."),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Que ajuste específico de comportamento você indicaria primeiro, e por quê?"),
    ...doc.linhaResposta(2),
    doc.pergunta(3, "Por que o estressor já resolvido não significa que a insônia deveria ter passado também?"),
    ...doc.linhaResposta(2),
  ];

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-4.23-Exercicios.docx");
}

// ============================================================
// 3) AVALIAÇÃO
// ============================================================
function construirProva() {
  const objetivas = [
    ["O sistema de hiperativação, na insônia crônica, mantém:", ["Ativação cognitiva e fisiológica elevada justamente no momento de relaxar pra dormir", "Ausência completa de qualquer ativação fisiológica", "Ativação apenas durante o dia, nunca à noite", "Nenhuma relação com o padrão de sono"]],
    ["A amígdala, no condicionamento da insônia, participa:", ["Do condicionamento da cama como sinal de frustração, não mais de sono", "Exclusivamente da regulação da temperatura corporal", "Sem qualquer relação com o ciclo de insônia", "Apenas do processamento visual durante o sono"]],
    ["Os 3 mecanismos centrais da insônia crônica são:", ["Hiperativação cognitiva, condicionamento cama-vigília, comportamentos compensatórios", "Desatenção, impulsividade, inquietação interna", "Restrição/controle, distorção da imagem corporal, comportamento compensatório", "Episódios de mania/hipomania, episódios depressivos, instabilidade do ritmo circadiano"]],
    ["Por que comportamentos compensatórios como cochilos e tempo excessivo na cama perpetuam a insônia?", ["Porque reduzem a pressão de sono (processo homeostático), tornando mais difícil dormir à noite", "Porque aumentam diretamente a qualidade do sono noturno", "Porque não têm qualquer relação com o ciclo de insônia", "Porque eliminam completamente a necessidade de dormir à noite"]],
    ["Instrumento que mede gravidade e impacto funcional da insônia:", ["ISI (Insomnia Severity Index)", "PCL-R", "Y-BOCS", "ASRS-18"]],
    ["Antes de iniciar a CBT-I, é essencial:", ["Realizar triagem de apneia do sono", "Prescrever medicação hipnótica em todos os casos", "Eliminar completamente o diário de sono do processo", "Ignorar qualquer sintoma respiratório relatado"]],
    ["O passo \"restrição de sono\" da CBT-I tem como objetivo:", ["Aumentar a pressão e eficiência do sono, reduzindo o tempo na cama", "Aumentar indefinidamente o tempo total na cama", "Eliminar completamente a necessidade de dormir", "Substituir a necessidade de horários regulares de sono"]],
    ["No passo \"controle de estímulos\", se o paciente não dormir em cerca de 20 minutos, a orientação é:", ["Sair da cama e voltar só quando sentir sono novamente", "Permanecer na cama forçando o sono a qualquer custo", "Dormir em qualquer outro cômodo permanentemente", "Aumentar o tempo total de permanência na cama"]],
    ["Diante de insônia secundária a um transtorno psiquiátrico de base, o protocolo recomenda:", ["Tratar o transtorno primário concomitantemente à CBT-I", "Tratar exclusivamente a insônia, ignorando o quadro de base", "Aguardar a resolução espontânea do quadro primário", "Suspender qualquer intervenção até resolução completa do quadro de base"]],
    ["Insônia crônica não tratada é considerada:", ["Fator de risco pra depressão e ansiedade, com valor preventivo no tratamento", "Uma condição sem qualquer relação com outros transtornos", "Um sintoma que nunca precisa de intervenção clínica", "Exclusivamente um problema de origem respiratória"]],
  ];
  const gabaritoObjetivas = ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a"];

  const children = [
    ...doc.capa(KICKER, "Avaliação — Insônia (CBT-I)", `Avaliação formativa de encerramento do Módulo ${MOD}.`),
    doc.infoBox([
      ["Nota de corte:", "70 de 100 pontos"],
      ["Tempo sugerido:", "40 minutos"],
      ["Composição:", "10 questões objetivas (6 pts cada = 60 pts) + 1 questão de caso (40 pts)"],
      ["Consulta:", "Material da aula permitido; discussão entre colegas, não"],
    ]),
    doc.tituloH1("Parte 1 — Questões objetivas"),
  ];
  objetivas.forEach((q, i) => children.push(...doc.questaoObjetiva(i + 1, q[0], q[1])));

  children.push(
    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    doc.tituloH1("Parte 2 — Questão de caso (40 pontos)"),
    doc.vinhetaBox("André, 35 anos, relata insônia há 8 meses. Passa cerca de 9 horas na cama tentando dormir, mas dorme efetivamente apenas 5. Cochila 2 vezes por dia \"pra compensar\", e diz que sua vida \"gira em torno de tentar dormir bem\". Nega ronco ou pausas respiratórias observadas pela esposa. Relata que a insônia começou após uma mudança de emprego estressante, já superada há 6 meses."),
    new doc.Paragraph({ spacing: { before: 240 }, children: [new doc.TextRun({ text: "Com base no protocolo estudado, responda:", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    new doc.Paragraph({ spacing: { before: 220, after: 40 }, children: [new doc.TextRun({ text: "a) (10 pts) Identifique os 3 mecanismos centrais presentes na vinheta.", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "b) (10 pts) A ausência de ronco/pausas respiratórias observadas é suficiente pra descartar necessidade de triagem de apneia?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "c) (10 pts) Calcule, com base nos dados da vinheta, uma sugestão inicial de restrição de sono (passo 1) pra André.", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "d) (10 pts) Que orientação de controle de estímulos (passo 2) você daria em relação aos cochilos diurnos?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    new doc.Paragraph({ spacing: { after: 40 }, children: [new doc.TextRun({ text: "USO EXCLUSIVO DO INSTRUTOR — remover antes de aplicar a prova", bold: true, color: doc.TERRA, font: doc.FONT, size: 20 })] }),
    doc.tituloH1("Gabarito"),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 1 — Questões objetivas", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 200 }, children: [new doc.TextRun({ text: gabaritoObjetivas.map((r, i) => `${i + 1}-${r}`).join("   ·   "), font: doc.FONT, size: 22, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 2 — Critério de correção da questão de caso", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "a) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Hiperativação cognitiva (\"vida gira em torno de tentar dormir\"), condicionamento cama-vigília (9h na cama, só 5h dormindo), comportamentos compensatórios (cochilos diurnos).", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "b) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Não necessariamente — a triagem ativa de apneia (perguntas estruturadas, e polissonografia se indicada) deve ocorrer independente do relato do parceiro, que pode não perceber todos os episódios.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "c) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Com base no tempo de sono real relatado (5h), a restrição inicial de tempo na cama giraria em torno desse valor (com ajustes conforme diário de sono e um mínimo seguro), bem abaixo das 9h atuais.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "d) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Orientar a eliminação ou redução significativa dos cochilos diurnos, já que eles reduzem a pressão de sono necessária pra dormir bem à noite.", font: doc.FONT, size: 21, color: doc.INK })] }),
  );

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", RODAPE_DOC, children), "Modulo-4.23-Avaliacao.docx");
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
      n: 1, titulo: "Por que a mente acelera na hora de dormir", duracao: "12 min", slides: "1, 2, 3, 4",
      objetivo: "Sair sabendo explicar o mecanismo da insônia crônica sem jargão, e por que restringir o tempo na cama funciona.",
      segmentos: [
        seg("0:00–0:45", "Abertura (gancho)", [{ fala: "O componente mais eficaz do tratamento da insônia crônica é, na prática, reduzir o tempo que a pessoa passa na cama — o oposto do que ela mais quer fazer quando está exausta." }]),
        seg("0:45–2:00", "Por que isso importa clinicamente", ["A cama, com o tempo, deixou de ser sinal de sono e passou a ser sinal de frustração e vigília."]),
        seg("2:00–8:00", "Por que a mente acelera na hora de dormir (mostrar slide 4)", [
          "Sistema de hiperativação com arousal cognitivo e fisiológico elevado à noite.",
          "Amígdala participando do condicionamento da cama como sinal de ameaça/frustração.",
          "Processo homeostático de sono reduzido por compensações.",
          "Núcleo supraquiasmático com ritmo circadiano desalinhado.",
        ]),
        seg("8:00–10:30", "Um ponto importante", ["Isso explica por que \"apenas tentar relaxar mais\" raramente resolve sozinho."]),
        seg("10:30–12:00", "Fechamento", [{ fala: "Próxima aula: como um estressor pontual vira um ciclo autossustentado." }]),
      ],
    },
    {
      n: 2, titulo: "Do estressor inicial ao ciclo autossustentado", duracao: "10 min", slides: "5",
      objetivo: "Explicar a cadeia entre estressor inicial, resposta compensatória e cronificação.",
      segmentos: [
        seg("0:00–1:00", "Retomada rápida", ["Vimos as estruturas envolvidas. Hoje vemos como o ciclo se consolida a partir de um evento pontual."]),
        seg("1:00–6:30", "A cadeia (mostrar slide 5)", ["Episódio inicial de sono ruim, ligado a um estressor agudo.", "Resposta compensatória: ir pra cama mais cedo, ficar mais tempo deitado.", "Condicionamento negativo: a cama vira sinal de vigília e frustração.", "Insônia crônica, que persiste mesmo com o estressor resolvido."]),
        seg("6:30–9:00", "Um ponto importante", ["O ciclo aprendeu a se sustentar sozinho, independente da causa original."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: os 3 mecanismos centrais da insônia crônica." }]),
      ],
    },
    {
      n: 3, titulo: "Os 3 mecanismos centrais", duracao: "10 min", slides: "6",
      objetivo: "Reconhecer hiperativação cognitiva, condicionamento cama-vigília e comportamentos compensatórios.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três mecanismos — e um deles parece, à primeira vista, uma solução lógica."]),
        seg("1:00–7:00", "Os 3 mecanismos (mostrar slide 6)", [
          "Hiperativação cognitiva: mente acelerada e ruminação ao se aproximar da hora de dormir.",
          "Condicionamento cama-vigília: a cama deixa de sinalizar sono e passa a sinalizar frustração.",
          "Comportamentos compensatórios: cochilos e tempo excessivo na cama.",
        ]),
        seg("7:00–9:00", "O paradoxo central", ["Os comportamentos compensatórios parecem lógicos, mas são justamente o que mantém o ciclo ativo."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: como reconhecer esse padrão nas 4 dimensões clínicas." }]),
      ],
    },
    {
      n: 4, titulo: "Sinais de alerta", duracao: "10 min", slides: "7",
      objetivo: "Reconhecer sinais cognitivos, comportamentais, funcionais e físicos da insônia crônica.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Reconhecer o padrão com precisão orienta a triagem que vem antes de qualquer intervenção."]),
        seg("1:00–7:30", "As 4 categorias (mostrar slide 7)", [
          "Cognitivo: ansiedade antecipatória, catastrofização das consequências.",
          "Comportamental: tempo excessivo na cama, cochilos diurnos compensatórios.",
          "Funcional: fadiga diurna, irritabilidade, prejuízo cognitivo.",
          "Físico: tensão muscular e hiperativação simpática ao anoitecer.",
        ]),
        seg("7:30–9:00", "Por que isso importa", ["Esses sinais orientam a escolha e intensidade de cada passo do protocolo."]),
        seg("9:00–10:00", "Fechamento", [{ fala: "Próxima aula: como diferenciar de outras causas de sono ruim." }]),
      ],
    },
    {
      n: 5, titulo: "Diagnóstico diferencial rápido", duracao: "11 min", slides: "8",
      objetivo: "Diferenciar insônia primária de insônia secundária, apneia do sono e Transtorno Bipolar.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Um filtro rápido — a triagem de apneia é a etapa mais frequentemente esquecida na prática."]),
        seg("1:00–8:00", "Os 3 comparativos (mostrar slide 8)", [
          "Insônia secundária: tratar ansiedade ou depressão de base em conjunto.",
          "Apneia do sono: ronco, pausas respiratórias, sonolência diurna — exige triagem antes da CBT-I.",
          "Transtorno Bipolar (Módulo 4.20): redução da necessidade de sono é diferente de insônia com desejo de dormir e incapacidade.",
        ]),
        seg("8:00–10:30", "Por que a triagem de apneia é essencial", ["Aplicar CBT-I sem descartar apneia pode mascarar um problema respiratório sério."]),
        seg("10:30–11:00", "Fechamento", [{ fala: "Próxima aula: os instrumentos que estruturam a avaliação." }]),
      ],
    },
    {
      n: 6, titulo: "Instrumentos e triagem antes de começar", duracao: "11 min", slides: "9",
      objetivo: "Saber quando usar ISI, diário do sono e triagem de apneia.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Um instrumento, um diário e uma triagem obrigatória — nessa ordem de importância."]),
        seg("1:00–4:30", "ISI", ["Mede gravidade e impacto funcional da insônia."]),
        seg("4:30–7:30", "Diário do sono", ["Registro diário de 1 a 2 semanas, linha de base objetiva antes de iniciar o protocolo."]),
        seg("7:30–10:00", "Triagem de apneia", ["Perguntas de rastreio pra descartar apneia do sono antes de assumir insônia primária."]),
        seg("10:00–11:00", "Fechamento", [{ fala: "Próxima aula: colocamos tudo em prática — restrição de sono e controle de estímulos." }]),
      ],
    },
    {
      n: 7, titulo: "Protocolo — restrição de sono e controle de estímulos", duracao: "14 min", slides: "10, 11",
      objetivo: "Aplicar os passos 1 e 2 da CBT-I, os dois componentes mais eficazes do protocolo.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Os dois passos mais contraintuitivos, e também os mais eficazes. Hoje, eles."]),
        seg("1:00–2:00", "Visão geral (mostrar slide 10)", ["Restrição de sono → Controle de estímulos → Higiene do sono/ritmo → Reestruturação cognitiva.", "O passo mais contraintuitivo costuma ser também o mais eficaz."]),
        seg("2:00–7:30", "Passo 1 — Restrição de sono (mostrar slide 11, esquerda)", [{ fala: "Vamos reduzir o tempo que você passa na cama por algumas semanas — isso vai parecer contraintuitivo, mas é o que reconstrói a eficiência do seu sono." }, "Calcule com base no diário de sono, nunca abaixo de um mínimo seguro."]),
        seg("7:30–13:00", "Passo 2 — Controle de estímulos (mostrar slide 11, direita)", ["Só deitar quando sentir sono real, não apenas cansaço.", "Se não dormir em cerca de 20 minutos, sair da cama e voltar só com sono."]),
        seg("13:00–14:00", "Fechamento", [{ fala: "Próxima aula: higiene do sono e reestruturação cognitiva." }]),
      ],
    },
    {
      n: 8, titulo: "Protocolo — higiene do sono e reestruturação cognitiva", duracao: "13 min", slides: "12",
      objetivo: "Trabalhar regularidade de ritmo circadiano e crenças catastróficas sobre o sono.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Hoje fechamos o protocolo com os componentes de manutenção e reestruturação."]),
        seg("1:00–7:00", "Passo 3 — Higiene do sono e ritmo (mostrar slide 12, esquerda)", ["Mantenha horários consistentes de dormir e acordar, inclusive fins de semana.", "Regule exposição à luz e consumo de cafeína conforme o horário."]),
        seg("7:00–13:00", "Passo 4 — Reestruturação cognitiva (mostrar slide 12, direita)", [{ fala: "O que realmente aconteceria se você tivesse mais uma noite de sono ruim — é tão catastrófico quanto parece agora, às 3 da manhã?" }]),
        seg("13:00–13:00", "Fechamento", [{ fala: "Protocolo completo. Próxima aula: um caso real e os critérios de quando escalar." }]),
      ],
    },
    {
      n: 9, titulo: "Estudo de caso, encaminhamento e recap", duracao: "15 min", slides: "13, 14, 15",
      objetivo: "Integrar mecanismo, instrumento e protocolo num caso completo, com ênfase na triagem prévia de apneia.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Última aula do módulo. Caso completo e os critérios de quando aprofundar ou referenciar."]),
        seg("1:00–7:00", "Estudo de caso — Patrícia (mostrar slide 13)", ["Leia a vinheta com calma.", "Percorra as 3 perguntas de discussão.", "Convide o aluno a pausar e responder por escrito."]),
        seg("7:00–11:00", "Quando encaminhar (mostrar slide 14)", ["Percorra os 4 critérios, com atenção especial à triagem de apneia antes de iniciar."]),
        seg("11:00–14:00", "Recapitulando o módulo (mostrar slide 15)", ["Retome os 4 pontos-chave.", "Reforce a reformulação central: a cama precisa voltar a sinalizar sono, não vigília."]),
        seg("14:00–15:00", "Fechamento do módulo", [{ fala: "Agora é hora dos exercícios e da avaliação. Te vejo no próximo protocolo." }]),
      ],
    },
  ];

  const totalMin = 12 + 10 + 10 + 10 + 11 + 11 + 14 + 13 + 15;

  const children = [
    ...doc.capa(KICKER, "Roteiro de Aulas — Insônia (CBT-I)", "Módulo dividido em 9 vídeo-aulas de 10 a 15 minutos, seguindo os slides já produzidos. Cada aula tem roteiro cronometrado, pronto pra gravação."),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "Duração total do módulo em vídeo: ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: `${totalMin} minutos (${(totalMin / 60).toFixed(1)}h) em 9 aulas`, font: doc.FONT, size: 21, color: doc.INK })] }),
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

  return doc.salvar(doc.paginaDoc("Formação em Neurociência Aplicada à Psicoterapia", `${RODAPE_DOC} — Roteiro de Aulas`, children), "Modulo-4.23-Roteiro-Aulas.docx");
}

// ============================================================
Promise.resolve()
  .then(construirDeck)
  .then(construirExercicios)
  .then(construirProva)
  .then(construirRoteiro)
  .then(() => console.log("TUDO PRONTO"))
  .catch((e) => { console.error(e); process.exit(1); });

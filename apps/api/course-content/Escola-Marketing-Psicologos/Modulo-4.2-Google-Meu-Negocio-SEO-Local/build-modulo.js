const deck = require("../_lib/lib-deck.js");
const doc = require("../_lib/lib-doc.js");

const MOD = "4.2";
const NOME = "Encontrado no Google";
const RODAPE_DECK = `Encontrado no Google — Módulo ${MOD}`;
const RODAPE_DOC = `Módulo ${MOD} — Encontrado no Google`;
const KICKER = "MÓDULO 4.2 · AQUISIÇÃO DE PACIENTES: ORGÂNICO E PAGO";
const MARCA = "Escola de Marketing para Psicólogos — by Dioclides";

// ============================================================
// 1) SLIDE DECK
// ============================================================
function construirDeck() {
  const pres = deck.novaApresentacao(`${NOME} — Google Meu Negócio e SEO Local`);

  deck.slideTitulo(pres, {
    moduloLabel: `Módulo ${MOD} · Bloco 4 · Aquisição de Pacientes`,
    titulo: "Encontrado no Google",
    subtitulo: "O canal mais subestimado pra quem atende presencialmente numa região específica",
    rodapeMarca: MARCA,
    passos: ["Por quê", "Perfil", "Ranking", "Avaliações", "Aplicação"],
  });

  deck.slideRoteiro(pres, {
    rodape: RODAPE_DECK, pageNum: 2,
    cards: [
      { titulo: "Por que o Google importa", desc: "Quem busca no Google já está mais perto de decidir" },
      { titulo: "Configurando o perfil", desc: "Os elementos que fazem seu perfil aparecer bem" },
      { titulo: "O que pesa no ranking", desc: "Os 3 fatores que decidem quem aparece primeiro" },
      { titulo: "Avaliações", desc: "Como lidar com isso dentro dos limites éticos do Bloco 2" },
      { titulo: "Aplicação prática", desc: "Diagnosticando um perfil real" },
    ],
  });

  deck.slideHook(pres, {
    rodape: RODAPE_DECK, pageNum: 3,
    frase: "Enquanto você posta nas redes esperando ser descoberto, alguém pesquisa \"psicólogo perto de mim\" no Google agora mesmo — e se seu perfil não aparece, essa pessoa nunca vai saber que você existe.",
    apoio: "Diferente das redes sociais, quem busca no Google já decidiu que quer resolver algo — esse é o público mais próximo de agendar uma sessão.",
  });

  deck.slideCircuito(pres, {
    rodape: RODAPE_DECK, pageNum: 4,
    titulo: "4 pilares do perfil no Google",
    regioes: [
      { label: "Perfil completo e verificado, com todas as informações", rx: 0.20, ry: 0.22, color: deck.NAVY, d: 0.5 },
      { label: "Categoria e localização configuradas corretamente", rx: 0.22, ry: 0.62, color: deck.TERRA, d: 0.4 },
      { label: "Avaliações reais e respondidas com cuidado", rx: 0.60, ry: 0.60, color: deck.NAVY_TINT, d: 0.36 },
      { label: "Consistência: mesmo nome, endereço e telefone em toda a web", rx: 0.58, ry: 0.24, color: deck.TERRA_TINT, d: 0.36 },
    ],
    notas: [
      "O Google prioriza perfis completos e consistentes — informação incompleta é a razão mais comum de um perfil não aparecer bem.",
      "Consistência de nome, endereço e telefone (NAP) entre Google, site e redes sociais é mais importante do que a maioria imagina.",
    ],
  });

  deck.slideCadeia(pres, {
    rodape: RODAPE_DECK, pageNum: 5,
    titulo: "Da busca ao agendamento via Google",
    elos: [
      { titulo: "Busca local", desc: "\"Psicólogo no [bairro]\" ou \"psicólogo perto de mim\"" },
      { titulo: "Resultado no mapa", desc: "Google mostra os perfis mais relevantes da região" },
      { titulo: "Comparação rápida", desc: "A pessoa compara fotos, avaliações e informações em segundos" },
      { titulo: "Contato direto", desc: "Clique no site, telefone ou WhatsApp do perfil mais completo" },
    ],
    notaFinal: "Essa jornada inteira pode acontecer em menos de um minuto — por isso um perfil incompleto perde a pessoa antes mesmo dela chegar ao seu site.",
  });

  deck.slideCategorias(pres, {
    rodape: RODAPE_DECK, pageNum: 6,
    titulo: "3 fatores que pesam no ranking local",
    categorias: [
      { titulo: "Proximidade", desc: "Distância entre o endereço cadastrado e quem está buscando", color: deck.NAVY },
      { titulo: "Relevância", desc: "O quanto o perfil está bem categorizado e completo pra busca feita", color: deck.TERRA },
      { titulo: "Notoriedade", desc: "Avaliações, tempo de perfil ativo e presença consistente online", color: deck.NAVY_TINT },
    ],
    notaFinal: "Proximidade você não controla — mas relevância e notoriedade dependem inteiramente de como o perfil é mantido.",
  });

  deck.slideSinais(pres, {
    rodape: RODAPE_DECK, pageNum: 7,
    titulo: "Sinais de que o perfil está prejudicando você",
    itens: [
      { titulo: "Perfil não verificado", desc: "Nunca foi reivindicado formalmente junto ao Google" },
      { titulo: "Informações desatualizadas", desc: "Endereço, telefone ou horário diferentes do real" },
      { titulo: "Poucas ou nenhuma avaliação", desc: "Perfil parece pouco ativo ou pouco confiável à primeira vista" },
      { titulo: "Categoria genérica", desc: "\"Estabelecimento de saúde\" em vez de \"psicólogo\" especificamente" },
    ],
  });

  deck.slideDiferencial(pres, {
    rodape: RODAPE_DECK, pageNum: 8,
    titulo: "3 níveis de perfil",
    cards: [
      { titulo: "Incompleto", desc: "Sem verificação, sem fotos, categoria genérica — praticamente invisível na busca" },
      { titulo: "Básico", desc: "Verificado e com informações corretas, mas sem avaliações nem atualização" },
      { titulo: "Completo e ativo", desc: "Fotos reais, categoria específica, avaliações e postagens periódicas" },
    ],
  });

  deck.slideInstrumentos(pres, {
    rodape: RODAPE_DECK, pageNum: 9,
    titulo: "3 elementos essenciais do perfil",
    instrumentos: [
      { sigla: "Fotos reais", nome: "Do espaço de atendimento e do profissional", desc: "Aumenta a confiança de quem nunca visitou o consultório." },
      { sigla: "Horário atual", nome: "Dias e horários de atendimento sempre atualizados", desc: "Informação errada frustra antes mesmo do primeiro contato." },
      { sigla: "Descrição clara", nome: "Especialidade e forma de atendimento explicadas", desc: "Ajuda o Google a mostrar seu perfil pras buscas certas." },
    ],
  });

  deck.slideProtocoloOverview(pres, {
    rodape: RODAPE_DECK, pageNum: 10,
    titulo: "Configurando o perfil: 4 passos",
    passos: [
      { titulo: "Reivindicar\ne verificar", desc: "O primeiro passo obrigatório antes de qualquer outro ajuste" },
      { titulo: "Preencher todas\nas informações", desc: "Categoria, endereço, horário, telefone e site" },
      { titulo: "Cuidar das\navaliações", desc: "Dentro dos limites éticos do Bloco 2 — nunca solicitar depoimento de conteúdo" },
      { titulo: "Publicar\natualizações", desc: "Pequenas postagens periódicas mantêm o perfil ativo aos olhos do Google" },
    ],
    notaFinal: "Esses 4 passos, feitos uma vez e mantidos, valem mais do que qualquer post avulso nas redes sociais pra quem atende presencialmente.",
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 11,
    titulo: "Passos 1 e 2, na prática",
    colunas: [
      {
        numero: 1, titulo: "Reivindicar e verificar",
        bullets: ["Acesse o Google Empresas e busque se já existe um perfil não reivindicado com seu nome", "A verificação costuma ser feita por cartão postal, telefone ou vídeo, conforme a região"],
      },
      {
        numero: 2, titulo: "Preencher todas as informações",
        fala: "“Um estranho, olhando só esse perfil, entenderia onde fica, quando atende e o que você faz?”",
        bullets: ["Categoria principal: \"Psicólogo\", não uma opção genérica de saúde"],
      },
    ],
  });

  deck.slideProtocoloDetalhe(pres, {
    rodape: RODAPE_DECK, pageNum: 12,
    titulo: "Passos 3 e 4, na prática",
    colunas: [
      {
        numero: 3, titulo: "Cuidar das avaliações",
        bullets: ["Você pode convidar pacientes a deixar uma avaliação — nunca pedir que descrevam o motivo do atendimento ou o resultado", "Nunca reposte ou capture avaliações como peça publicitária em outro canal — isso recria o problema do Módulo 2.1"],
      },
      {
        numero: 4, titulo: "Publicar atualizações",
        bullets: ["Pequenas novidades: novo horário, tema de atendimento, ou aviso de recesso", "Frequência baixa é normal — o importante é o perfil não parecer abandonado"],
      },
    ],
  });

  deck.slideCaso(pres, {
    rodape: RODAPE_DECK, pageNum: 13,
    vinheta: "Um psicólogo atende presencialmente há 3 anos num bairro bem localizado, mas ao buscar \"psicólogo\" nesse bairro no Google, seu nome nem aparece na primeira página. Seu perfil no Google foi criado automaticamente pela plataforma, nunca foi verificado, e está com o endereço antigo, de um consultório de dois anos atrás.",
    perguntas: [
      "Quais dos 4 pilares do slide 4 provavelmente estão comprometidos nesse perfil?",
      "Por que um endereço desatualizado prejudica tanto a proximidade quanto a relevância?",
      "Por onde esse psicólogo deveria começar, seguindo os 4 passos do protocolo?",
    ],
  });

  deck.slideEncaminhamento(pres, {
    rodape: RODAPE_DECK, pageNum: 14,
    titulo: "Quando buscar ajuda especializada",
    criterios: [
      "Perfil configurado corretamente, mas ainda sem visibilidade após meses: considerar consultoria de SEO local especializada",
      "Site próprio inexistente ou desatualizado: priorizar a criação de uma página simples antes de investir em outros canais",
      "Volume de avaliações crescendo com comentários fora do esperado: revisar com base nos critérios éticos do Bloco 2",
      "Dúvida técnica sobre verificação ou configuração do perfil: consultar a central de ajuda oficial do Google Empresas",
    ],
  });

  deck.slideRecap(pres, {
    rodape: RODAPE_DECK, pageNum: 15,
    pontos: [
      "Quem busca no Google já decidiu resolver algo — é o público mais próximo de agendar",
      "Proximidade, relevância e notoriedade são os 3 fatores que decidem quem aparece primeiro",
      "Avaliações podem ser incentivadas, mas nunca solicitadas com conteúdo específico — e nunca reutilizadas como peça publicitária",
      "Reivindicar, preencher, cuidar das avaliações e publicar atualizações resolvem a maioria dos casos de baixa visibilidade",
    ],
    proximoTexto: "Próximo: exercícios práticos e avaliação do Módulo 4.2 →",
  });

  return pres.writeFile({ fileName: "Modulo-4.2-Google-Meu-Negocio-SEO-Local.pptx" });
}

// ============================================================
// 2) EXERCÍCIOS
// ============================================================
function construirExercicios() {
  const children = [
    ...doc.capa(KICKER, "Exercícios — Encontrado no Google", "Resolva individualmente, de preferência revisando seu próprio perfil real no Google enquanto responde."),

    doc.exNum(1, "Os 4 pilares do perfil"),
    doc.pergunta(1, "Liste os 4 pilares do perfil no Google vistos no módulo."),
    ...doc.linhaResposta(3),

    doc.exNum(2, "Os 3 fatores de ranking"),
    doc.tabelaSimples(["Fator", "O que significa"], [["Proximidade", ""], ["Relevância", ""], ["Notoriedade", ""]], [3600, 5550]),

    doc.exNum(3, "Avaliando seu próprio perfil"),
    doc.pergunta(1, "Seu perfil no Google está verificado, com categoria correta e informações atualizadas? O que falta?"),
    ...doc.linhaResposta(3),
    doc.pergunta(2, "Em que nível (incompleto, básico, completo e ativo) você classificaria seu perfil hoje?"),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),

    doc.exNum(4, "Avaliações dentro do limite ético"),
    doc.pergunta(1, "Explique a diferença entre convidar um paciente a deixar uma avaliação e pedir um depoimento sobre o resultado do atendimento."),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Por que reutilizar uma avaliação do Google como peça publicitária em outro canal recria o problema visto no Módulo 2.1?"),
    ...doc.linhaResposta(2),

    doc.exNum(5, "Caso integrado — o endereço antigo"),
    doc.vinhetaBox("Um psicólogo atende há 3 anos num bairro bem localizado, mas não aparece na busca do Google; seu perfil nunca foi verificado e está com o endereço de dois anos atrás."),
    doc.pergunta(1, "Quais dos 4 pilares provavelmente estão comprometidos nesse perfil?"),
    ...doc.linhaResposta(2),
    doc.pergunta(2, "Por que um endereço desatualizado prejudica tanto a proximidade quanto a relevância?"),
    ...doc.linhaResposta(2),
    doc.pergunta(3, "Por onde esse psicólogo deveria começar, seguindo os 4 passos do protocolo?"),
    ...doc.linhaResposta(2),
  ];

  return doc.salvar(doc.paginaDoc("Escola de Marketing para Psicólogos", RODAPE_DOC, children), "Modulo-4.2-Exercicios.docx");
}

// ============================================================
// 3) AVALIAÇÃO
// ============================================================
function construirProva() {
  const objetivas = [
    ["Os 4 pilares do perfil no Google, segundo o módulo, são:", ["Perfil completo, categoria e localização corretas, avaliações cuidadas, consistência de dados", "Preço, promoção, desconto e urgência", "Alcance, engajamento, agendamento e retenção", "Depoimento, antes e depois, comparação e urgência artificial"]],
    ["O público que busca no Google, comparado ao das redes sociais, é descrito no módulo como:", ["Mais próximo de decidir, já que busca ativamente resolver algo", "Igualmente distante da decisão de agendar", "Menos propenso a se tornar paciente", "Irrelevante pra consultórios que atendem presencialmente"]],
    ["\"Proximidade\", como fator de ranking local, se refere a:", ["Distância entre o endereço cadastrado e quem está buscando", "Quantidade de seguidores nas redes sociais do profissional", "Tempo de formação do psicólogo", "Valor cobrado pela sessão"]],
    ["Uma categoria genérica como \"estabelecimento de saúde\" em vez de \"psicólogo\" é considerada:", ["Um sinal de que o perfil está prejudicando a visibilidade", "A configuração mais recomendada pelo módulo", "Irrelevante para o ranking de busca local", "Exigida pelo Google em todos os casos"]],
    ["Sobre pedir avaliações a pacientes, o módulo recomenda:", ["Convidar a deixar avaliação, sem pedir que descrevam motivo ou resultado do atendimento", "Nunca permitir que pacientes avaliem o perfil publicamente", "Escrever a avaliação em nome do paciente para agilizar o processo", "Exigir uma avaliação positiva como condição de alta do tratamento"]],
    ["Reutilizar uma avaliação do Google como peça publicitária em outro canal é descrito como:", ["Um erro que recria o problema de depoimento visto no Módulo 2.1", "Uma prática recomendada para aumentar a confiança do público", "Permitido, já que a avaliação já é pública no Google", "Uma exigência da Nota Técnica CFP nº 01/2022"]],
    ["\"Notoriedade\", como fator de ranking, envolve:", ["Avaliações, tempo de perfil ativo e presença consistente online", "Apenas a distância geográfica entre perfil e buscador", "Exclusivamente o número de anos de formação", "O valor da sessão comparado a outros profissionais"]],
    ["O primeiro passo do protocolo de configuração do perfil é:", ["Reivindicar e verificar o perfil junto ao Google", "Publicar avaliações de pacientes imediatamente", "Criar uma campanha de anúncios pagos", "Aguardar que o perfil apareça automaticamente sem nenhuma ação"]],
    ["Diante de perfil configurado corretamente, mas sem visibilidade após meses, o módulo recomenda:", ["Considerar consultoria de SEO local especializada", "Desistir completamente do canal Google", "Reivindicar o perfil uma segunda vez, repetindo o mesmo processo", "Ignorar o problema, já que raramente é relevante"]],
    ["Este módulo abre com a comparação entre:", ["Esperar ser descoberto nas redes e ser encontrado ativamente por quem já busca resolver algo", "Anúncios pagos e conteúdo orgânico, sem qualquer relação com o Google", "Ética na publicidade e precificação de sessão", "Gestão financeira e diversificação de receita"]],
  ];
  const gabaritoObjetivas = ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a"];

  const children = [
    ...doc.capa(KICKER, "Avaliação — Encontrado no Google", `Avaliação formativa de encerramento do Módulo ${MOD}.`),
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
    doc.vinhetaBox("Uma psicóloga tem perfil verificado no Google, com informações atualizadas e 3 avaliações positivas. Mesmo assim, um colega que atende no mesmo bairro aparece sempre à frente dela nas buscas. Ela nota que o perfil do colega tem 20 avaliações e publica pequenas novidades a cada 2 semanas."),
    new doc.Paragraph({ spacing: { before: 240 }, children: [new doc.TextRun({ text: "Com base no protocolo estudado, responda:", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    new doc.Paragraph({ spacing: { before: 220, after: 40 }, children: [new doc.TextRun({ text: "a) (10 pts) Qual dos 3 fatores de ranking provavelmente explica a diferença de posição entre os dois perfis?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "b) (10 pts) Que 2 ações do protocolo essa psicóloga deveria priorizar a partir de agora?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "c) (10 pts) Como ela pode convidar mais pacientes a avaliar, sem infringir os limites éticos do Bloco 2?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),
    new doc.Paragraph({ spacing: { before: 100, after: 40 }, children: [new doc.TextRun({ text: "d) (10 pts) Que tipo de conteúdo ela poderia publicar periodicamente no perfil, sem infringir regras de publicidade?", font: doc.FONT, size: 22, color: doc.INK, bold: true })] }),
    ...doc.linhaResposta(2),

    new doc.Paragraph({ children: [new doc.PageBreak()] }),
    new doc.Paragraph({ spacing: { after: 40 }, children: [new doc.TextRun({ text: "USO EXCLUSIVO DO INSTRUTOR — remover antes de aplicar a prova", bold: true, color: doc.TERRA, font: doc.FONT, size: 20 })] }),
    doc.tituloH1("Gabarito"),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 1 — Questões objetivas", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 200 }, children: [new doc.TextRun({ text: gabaritoObjetivas.map((r, i) => `${i + 1}-${r}`).join("   ·   "), font: doc.FONT, size: 22, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { before: 100, after: 100 }, children: [new doc.TextRun({ text: "Parte 2 — Critério de correção da questão de caso", bold: true, color: doc.NAVY, font: doc.FONT, size: 23 })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "a) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Notoriedade — o colega tem muito mais avaliações e mantém o perfil ativo com publicações periódicas.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "b) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Cuidar das avaliações (incentivar mais pacientes a avaliar) e publicar atualizações periódicas — os passos 3 e 4 do protocolo.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "c) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Convidar de forma geral (\"se puder, deixe uma avaliação\"), sem sugerir o que escrever nem pedir menção a resultado ou diagnóstico.", font: doc.FONT, size: 21, color: doc.INK })] }),
    new doc.Paragraph({ spacing: { after: 100 }, children: [new doc.TextRun({ text: "d) ", bold: true, font: doc.FONT, size: 21, color: doc.NAVY }), new doc.TextRun({ text: "Pequenas novidades administrativas: novo horário disponível, aviso de recesso, ou um post educativo curto — nunca prova social ou promessa de resultado.", font: doc.FONT, size: 21, color: doc.INK })] }),
  );

  return doc.salvar(doc.paginaDoc("Escola de Marketing para Psicólogos", RODAPE_DOC, children), "Modulo-4.2-Avaliacao.docx");
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
      n: 1, titulo: "Por que o Google importa, e os 4 pilares", duracao: "13 min", slides: "1, 2, 3, 4",
      objetivo: "Sair sabendo por que o Google é um canal prioritário e quais são os 4 pilares do perfil.",
      segmentos: [
        seg("0:00–0:45", "Abertura (gancho)", [{ fala: "Enquanto você posta nas redes esperando ser descoberto, alguém pesquisa 'psicólogo perto de mim' no Google agora mesmo — e se seu perfil não aparece, essa pessoa nunca vai saber que você existe." }]),
        seg("0:45–2:00", "Por que isso importa", ["Diferente das redes sociais, quem busca no Google já decidiu que quer resolver algo."]),
        seg("2:00–9:00", "Os 4 pilares (mostrar slide 4)", [
          "Perfil completo e verificado.",
          "Categoria e localização corretas.",
          "Avaliações reais e respondidas com cuidado.",
          "Consistência de nome, endereço e telefone em toda a web.",
        ]),
        seg("9:00–12:00", "Um ponto importante", ["Informação incompleta é a razão mais comum de um perfil não aparecer bem nas buscas."]),
        seg("12:00–13:00", "Fechamento", [{ fala: "Próxima aula: da busca ao agendamento, e os 3 fatores que decidem quem aparece primeiro." }]),
      ],
    },
    {
      n: 2, titulo: "Da busca ao agendamento, e os 3 fatores de ranking", duracao: "12 min", slides: "5, 6",
      objetivo: "Explicar a jornada de busca local e os 3 fatores que decidem o ranking.",
      segmentos: [
        seg("0:00–1:00", "Retomada rápida", ["Vimos os 4 pilares. Hoje, a jornada completa de quem busca no Google."]),
        seg("1:00–6:00", "A cadeia (mostrar slide 5)", ["Busca local → Resultado no mapa → Comparação rápida → Contato direto."]),
        seg("6:00–11:00", "Os 3 fatores (mostrar slide 6)", ["Proximidade, relevância e notoriedade — cada um pesando de forma diferente no ranking."]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Próxima aula: os sinais de que o perfil está prejudicando você, e 3 níveis de qualidade." }]),
      ],
    },
    {
      n: 3, titulo: "Sinais de alerta e os 3 níveis de perfil", duracao: "12 min", slides: "7, 8", },
    {
      n: 4, titulo: "Elementos essenciais e os 4 passos de configuração", duracao: "11 min", slides: "9, 10",
      objetivo: "Conhecer os 3 elementos essenciais do perfil e os 4 passos de configuração.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Três elementos essenciais — e um processo de 4 passos pra configurar o perfil do zero."]),
        seg("1:00–5:00", "3 elementos essenciais (mostrar slide 9)", ["Fotos reais, horário atualizado e descrição clara da especialidade."]),
        seg("5:00–10:00", "Os 4 passos (mostrar slide 10)", ["Reivindicar e verificar, preencher todas as informações, cuidar das avaliações, publicar atualizações."]),
        seg("10:00–11:00", "Fechamento", [{ fala: "Próxima aula: aplicando os 4 passos na prática, com atenção especial às avaliações." }]),
      ],
    },
    {
      n: 5, titulo: "Aplicação prática dos 4 passos", duracao: "12 min", slides: "11, 12",
      objetivo: "Aplicar os 4 passos de configuração, com foco em avaliações dentro do limite ético.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["Hoje colocamos os 4 passos em prática, com atenção especial às avaliações."]),
        seg("1:00–6:00", "Passos 1 e 2 (mostrar slide 11)", ["Reivindique e verifique o perfil primeiro.", { fala: "Um estranho, olhando só esse perfil, entenderia onde fica, quando atende e o que você faz?" }]),
        seg("6:00–11:00", "Passos 3 e 4 (mostrar slide 12)", ["Convide avaliações sem pedir conteúdo específico.", "Nunca reutilize avaliação como peça publicitária em outro canal."]),
        seg("11:00–12:00", "Fechamento", [{ fala: "Próxima aula: um caso real de perfil desatualizado, e o recap final." }]),
      ],
    },
    {
      n: 6, titulo: "Prática guiada — o endereço antigo e recap final", duracao: "13 min", slides: "13, 14, 15",
      objetivo: "Aplicar o diagnóstico completo a um caso real e consolidar os pontos-chave do módulo.",
      segmentos: [
        seg("0:00–1:00", "Abertura", ["A última aula do módulo — um caso real, e o recap final."]),
        seg("1:00–5:00", "Apresentando o caso (mostrar slide 13)", ["Leia a vinheta com calma.", "Note que o problema não é falta de tempo de atuação — é um perfil nunca verificado."]),
        seg("5:00–9:00", "Percorrendo as perguntas de discussão", ["Discuta em voz alta as 3 perguntas do slide 13.", "Esboce um plano de correção seguindo os 4 passos do protocolo."]),
        seg("9:00–11:00", "Quando buscar ajuda especializada (mostrar slide 14)", ["Percorra os 4 critérios do slide 14."]),
        seg("11:00–13:00", "Recap final (mostrar slide 15)", [{ fala: "Retome os 4 pontos-chave do módulo. Agora é hora dos exercícios e da avaliação — e do próximo módulo, sobre indicação e parcerias profissionais." }]),
      ],
    },
  ];

  aulas[2].objetivo = "Reconhecer sinais de perfil prejudicado e diferenciar os 3 níveis de qualidade de perfil.";
  aulas[2].segmentos = [
    seg("0:00–1:00", "Abertura", ["Quatro sinais de alerta — e três níveis de perfil, do pior ao melhor."]),
    seg("1:00–6:00", "Sinais de alerta (mostrar slide 7)", [
      "Perfil não verificado.",
      "Informações desatualizadas.",
      "Poucas ou nenhuma avaliação.",
      "Categoria genérica em vez de \"psicólogo\".",
    ]),
    seg("6:00–11:00", "Os 3 níveis (mostrar slide 8)", ["Incompleto, básico, e completo e ativo — cada um com uma visibilidade bem diferente."]),
    seg("11:00–12:00", "Fechamento", [{ fala: "Próxima aula: os elementos essenciais do perfil, e os 4 passos de configuração." }]),
  ];

  const totalMin = 13 + 12 + 12 + 11 + 12 + 13;

  const children = [
    ...doc.capa(KICKER, "Roteiro de Aulas — Encontrado no Google", "Módulo dividido em 6 vídeo-aulas de 11 a 13 minutos, seguindo os slides já produzidos. Cada aula tem roteiro cronometrado, pronto pra gravação."),
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

  return doc.salvar(doc.paginaDoc("Escola de Marketing para Psicólogos", `${RODAPE_DOC} — Roteiro de Aulas`, children), "Modulo-4.2-Roteiro-Aulas.docx");
}

// ============================================================
Promise.resolve()
  .then(construirDeck)
  .then(construirExercicios)
  .then(construirProva)
  .then(construirRoteiro)
  .then(() => console.log("TUDO PRONTO"))
  .catch((e) => { console.error(e); process.exit(1); });

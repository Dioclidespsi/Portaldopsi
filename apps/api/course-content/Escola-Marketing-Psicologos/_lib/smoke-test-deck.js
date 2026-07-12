const lib = require("./lib-deck.js");

const pres = lib.novaApresentacao("Smoke Test");

lib.slideTitulo(pres, {
  moduloLabel: "Módulo X.X · Teste", titulo: "Teste", subtitulo: "Subtítulo de teste",
  passos: ["Um", "Dois", "Três", "Quatro", "Cinco"],
});

lib.slideRoteiro(pres, {
  rodape: "Teste", pageNum: 2, titulo: "Roteiro de teste",
  cards: [
    { titulo: "Mecanismo", desc: "desc 1" },
    { titulo: "Sinais", desc: "desc 2" },
    { titulo: "Instrumento", desc: "desc 3" },
  ],
});

lib.slideHook(pres, { rodape: "Teste", pageNum: 3, frase: "Frase de teste bem grande pra ver se quebra direito no layout.", apoio: "Apoio." });

lib.slideCircuito(pres, {
  rodape: "Teste", pageNum: 4, titulo: "Circuito de teste",
  regioes: [
    { label: "Região A", rx: 0.3, ry: 0.6, color: lib.TERRA, d: 0.4 },
    { label: "Região B", rx: 0.2, ry: 0.3, color: lib.NAVY, d: 0.5 },
  ],
  notas: ["Nota 1", "Nota 2"],
});

lib.slideCadeia(pres, {
  rodape: "Teste", pageNum: 5, titulo: "Cadeia de teste",
  elos: [
    { titulo: "Elo 1", desc: "desc" }, { titulo: "Elo 2", desc: "desc" }, { titulo: "Elo 3", desc: "desc" },
  ],
  notaFinal: "Nota final",
});

lib.slideCategorias(pres, {
  rodape: "Teste", pageNum: 6, titulo: "Categorias de teste",
  categorias: [
    { titulo: "A", desc: "desc a", color: lib.TERRA }, { titulo: "B", desc: "desc b", color: lib.NAVY },
  ],
});

lib.slideSinais(pres, {
  rodape: "Teste", pageNum: 7, titulo: "Sinais de teste",
  itens: [{ titulo: "Cat 1", desc: "desc" }, { titulo: "Cat 2", desc: "desc" }],
});

lib.slideDiferencial(pres, {
  rodape: "Teste", pageNum: 8, titulo: "Diferencial de teste",
  cards: [{ titulo: "X", desc: "desc x" }, { titulo: "Y", desc: "desc y" }],
});

lib.slideInstrumentos(pres, {
  rodape: "Teste", pageNum: 9, titulo: "Instrumentos de teste",
  instrumentos: [{ sigla: "AAA", nome: "Nome A", desc: "desc a" }],
});

lib.slideProtocoloOverview(pres, {
  rodape: "Teste", pageNum: 10, titulo: "Protocolo de teste",
  passos: [{ titulo: "P1", desc: "d1" }, { titulo: "P2", desc: "d2" }],
  notaFinal: "nota",
});

lib.slideProtocoloDetalhe(pres, {
  rodape: "Teste", pageNum: 11, titulo: "Detalhe de teste",
  colunas: [
    { numero: 1, titulo: "Col 1", fala: "fala de teste", bullets: ["b1", "b2"] },
    { numero: 2, titulo: "Col 2", tabela: { header: ["A", "B"], linhas: [["1", "2"]] }, notaTabela: "nota" },
  ],
});

lib.slideCaso(pres, {
  rodape: "Teste", pageNum: 12, vinheta: "Vinheta de teste.", perguntas: ["P1?", "P2?"],
});

lib.slideEncaminhamento(pres, {
  rodape: "Teste", pageNum: 13, criterios: ["Critério 1", "Critério 2"],
});

lib.slideRecap(pres, {
  rodape: "Teste", pageNum: 14, pontos: ["Ponto 1", "Ponto 2"], proximoTexto: "Próximo →",
});

pres.writeFile({ fileName: "smoke-test.pptx" }).then(() => console.log("done"));

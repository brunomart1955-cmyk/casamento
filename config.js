/* =========================================================
   CONFIGURAÇÕES DO CASAMENTO — edite aqui os dados do casal
   ========================================================= */
const CASAMENTO = {
  noivo: "Bruno",
  noiva: "Lavínia",
  data: "2027-08-07T09:00:00",          // ano-mês-diaThora:minuto
  whatsapp: "5527999999999",            // TROCAR: DDI + DDD + número, só números (recebe as confirmações)
  chavePix: "seuemail@exemplo.com",     // TROCAR: chave Pix para os presentes
  nomePix: "Nome do Titular da Conta",  // TROCAR
};

/* Lista de presentes simbólicos — adicione, remova ou edite à vontade.
   icone: um emoji OU o caminho de uma imagem (ex: "img/jantar.jpg")
   categoria: usada nos filtros da página de presentes */
const PRESENTES = [
  { nome: "Jantar romântico",        valor: 250, icone: "🍷", categoria: "Lua de mel" },
  { nome: "Passeio de barco",        valor: 400, icone: "⛵", categoria: "Lua de mel" },
  { nome: "Diária no hotel",         valor: 600, icone: "🏨", categoria: "Lua de mel" },
  { nome: "Passagem aérea",          valor: 900, icone: "✈️", categoria: "Lua de mel" },
  { nome: "Café da manhã especial",  valor: 120, icone: "🥐", categoria: "Lua de mel" },
  { nome: "Day spa para o casal",    valor: 350, icone: "💆", categoria: "Lua de mel" },
  { nome: "Plantinha para a casa nova", valor: 90, icone: "🪴", categoria: "Lar" },
  { nome: "Primeiro rancho do casal", valor: 200, icone: "🛒", categoria: "Lar" },
  { nome: "Cota de pizza da semana", valor: 120, icone: "🍕", categoria: "Divertidos" },
  { nome: "Ajuda pro noivo não chorar no altar", valor: 150, icone: "😭", categoria: "Divertidos" },
  { nome: "Primeira briga do casal (bandeira branca)", valor: 100, icone: "🏳️", categoria: "Divertidos" },
];

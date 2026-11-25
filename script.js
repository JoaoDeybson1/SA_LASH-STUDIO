/* =========================================================
   CONFIGURAÇÃO — edite só esta parte
   ========================================================= */

// Número com código do país + DDD, só dígitos. Ex.: Brasil (55) + RN (84) + número
const WHATSAPP_NUMERO = "5584999999999";

// Serviços do carrossel. Para adicionar um, copie um bloco { ... }.
// "foto": caminho da imagem (ex.: "img/classico.jpg"). Se a imagem não existir,
// o card mostra um fundo dourado com as iniciais.
const SERVICOS = [
  {
    nome: "Fio a fio clássico",
    descricao: "Um fio sintético para cada cílio natural. Resultado leve, delicado e com aparência natural.",
    preco: "R$ 120,00",
    foto: "img/classico.jpg"
  },
  {
    nome: "Volume russo",
    descricao: "Leques de fios ultrafinos em cada cílio, para um olhar mais cheio e marcante sem pesar.",
    preco: "R$ 160,00",
    foto: "img/volume-russo.jpg"
  },
  {
    nome: "Volume brasileiro",
    descricao: "Fios em formato Y que dão volume e preenchimento com leveza. Ótimo para o dia a dia.",
    preco: "R$ 140,00",
    foto: "img/volume-brasileiro.jpg"
  },
  {
    nome: "Mega volume",
    descricao: "Máximo de volume e densidade, para quem quer um olhar bem intenso e glamouroso.",
    preco: "R$ 190,00",
    foto: "img/mega-volume.jpg"
  },
  {
    nome: "Manutenção",
    descricao: "Reposição dos fios que caíram para manter o efeito. Indicada a cada 15 a 20 dias.",
    preco: "R$ 90,00",
    foto: "img/manutencao.jpg"
  },
  {
    nome: "Remoção",
    descricao: "Retirada segura das extensões, sem agredir seus cílios naturais.",
    preco: "R$ 40,00",
    foto: "img/remocao.jpg"
  }
];

/* =========================================================
   WHATSAPP
   ========================================================= */
function linkWhats(mensagem) {
  return "https://wa.me/" + WHATSAPP_NUMERO + "?text=" + encodeURIComponent(mensagem);
}

function ligarBotoesWhats() {
  document.querySelectorAll(".js-whats").forEach(function (el) {
    el.href = linkWhats(el.dataset.msg || "Olá! Gostaria de agendar um horário.");
    el.target = "_blank";
    el.rel = "noopener";
  });
}

/* =========================================================
   CARDS DE SERVIÇOS
   ========================================================= */
function iniciais(texto) {
  return texto.split(" ").filter(Boolean).slice(0, 2).map(function (p) { return p[0]; }).join("").toUpperCase();
}

function criarCard(servico) {
  var card = document.createElement("article");
  card.className = "card";

  var foto = document.createElement("div");
  foto.className = "card-foto";
  var img = document.createElement("img");
  img.src = servico.foto;
  img.alt = servico.nome;
  img.loading = "lazy";
  img.onerror = function () {
    img.remove();
    foto.textContent = iniciais(servico.nome);
  };
  foto.appendChild(img);

  var corpo = document.createElement("div");
  corpo.className = "card-corpo";

  var titulo = document.createElement("h3");
  titulo.textContent = servico.nome;

  var desc = document.createElement("p");
  desc.className = "card-desc";
  desc.textContent = servico.descricao;

  var preco = document.createElement("div");
  preco.className = "card-preco";
  preco.textContent = servico.preco;

  var botao = document.createElement("a");
  botao.className = "btn btn-contorno";
  botao.textContent = "Agendar";
  botao.href = "agendamento.html?servico=" + encodeURIComponent(servico.nome);

  corpo.append(titulo, desc, preco, botao);
  card.append(foto, corpo);
  return card;
}

/* =========================================================
   CARROSSEL
   ========================================================= */
function iniciarCarrossel() {
  var trilho = document.getElementById("trilho");
  var pontos = document.getElementById("pontos");
  var setaEsq = document.querySelector(".seta-esq");
  var setaDir = document.querySelector(".seta-dir");

  SERVICOS.forEach(function (s) {
    trilho.appendChild(criarCard(s));
    var p = document.createElement("span");
    p.className = "ponto";
    pontos.appendChild(p);
  });

  var cards = trilho.querySelectorAll(".card");
  var bolinhas = pontos.querySelectorAll(".ponto");

  function passo() {
    var gap = parseFloat(getComputedStyle(trilho).columnGap) || 24;
    return cards[0].offsetWidth + gap;
  }

  function atualizar() {
    var indice = Math.round(trilho.scrollLeft / passo());
    indice = Math.min(indice, cards.length - 1);
    bolinhas.forEach(function (b, i) { b.classList.toggle("ativo", i === indice); });
    var max = trilho.scrollWidth - trilho.clientWidth - 2;
    setaEsq.disabled = trilho.scrollLeft <= 2;
    setaDir.disabled = trilho.scrollLeft >= max;
  }

  setaEsq.addEventListener("click", function () { trilho.scrollBy({ left: -passo(), behavior: "smooth" }); });
  setaDir.addEventListener("click", function () { trilho.scrollBy({ left: passo(), behavior: "smooth" }); });
  trilho.addEventListener("scroll", function () { window.requestAnimationFrame(atualizar); });
  trilho.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") { e.preventDefault(); setaDir.click(); }
    if (e.key === "ArrowLeft") { e.preventDefault(); setaEsq.click(); }
  });
  window.addEventListener("resize", atualizar);
  atualizar();
}

/* =========================================================
   INÍCIO
   ========================================================= */
/* ---------- Galeria de trabalhos ---------- */
// Coloque as fotos em img/ com estes nomes (ou edite a lista)
const GALERIA = [
  "img/galeria-1.jpg", "img/galeria-2.jpg", "img/galeria-3.jpg",
  "img/galeria-4.jpg", "img/galeria-5.jpg", "img/galeria-6.jpg"
];

function iniciarGaleria() {
  var grade = document.getElementById("galeria-grade");
  GALERIA.forEach(function (src, i) {
    var fig = document.createElement("figure");
    var img = document.createElement("img");
    img.src = src;
    img.alt = "Trabalho de extensão de cílios " + (i + 1);
    img.loading = "lazy";
    img.onerror = function () { img.remove(); fig.textContent = "SA"; };
    fig.appendChild(img);
    grade.appendChild(fig);
  });
}

/* ---------- Formulário: monta a mensagem e abre o WhatsApp ---------- */
function iniciarFormulario() {
  var select = document.getElementById("f-servico");
  var data = document.getElementById("f-data");
  select.add(new Option("Escolha um serviço", ""));
  SERVICOS.forEach(function (s) { select.add(new Option(s.nome + " (" + s.preco + ")", s.nome)); });
  select.add(new Option("Ainda não sei, quero ajuda", "Ainda não sei, quero ajuda"));
  data.min = new Date().toISOString().split("T")[0]; // não deixa escolher data passada

  // Se veio de um card (agendamento.html?servico=Nome), já deixa o serviço escolhido
  var escolhido = new URLSearchParams(window.location.search).get("servico");
  if (escolhido) select.value = escolhido;

  document.getElementById("form-agenda").addEventListener("submit", function (e) {
    e.preventDefault();
    var nome = document.getElementById("f-nome").value.trim();
    var periodo = document.getElementById("f-periodo").value;
    var obs = document.getElementById("f-obs").value.trim();
    var msg = "Olá! Meu nome é " + nome + " e gostaria de agendar: " + select.value + ".";
    if (data.value) {
      var p = data.value.split("-");
      msg += "\nData de preferência: " + p[2] + "/" + p[1] + "/" + p[0];
    }
    if (periodo) msg += "\nPeríodo: " + periodo;
    if (obs) msg += "\nObservações: " + obs;
    window.open(linkWhats(msg), "_blank", "noopener");
  });
}

/* ---------- Menu do celular ---------- */
function iniciarMenu() {
  var botao = document.querySelector(".burger");
  var menu = document.getElementById("menu");
  function fechar() { menu.classList.remove("aberto"); botao.setAttribute("aria-expanded", "false"); }
  botao.addEventListener("click", function () {
    var aberto = menu.classList.toggle("aberto");
    botao.setAttribute("aria-expanded", String(aberto));
  });
  menu.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", fechar); });
}

// Cada página usa só o que existe nela
if (document.getElementById("trilho")) iniciarCarrossel();
if (document.getElementById("galeria-grade")) iniciarGaleria();
if (document.getElementById("form-agenda")) iniciarFormulario();
if (document.querySelector(".burger")) iniciarMenu();
ligarBotoesWhats();
document.getElementById("ano").textContent = new Date().getFullYear();

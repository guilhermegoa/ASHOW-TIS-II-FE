const urlParams = new URLSearchParams(window.location.search);
const categoria = urlParams.get("idRed");
const estilo = urlParams.get("estilo");
const min = urlParams.get("min");
const max = urlParams.get("max");

const mostraTodosNaHome = () => {
  if (categoria == 1) {
    var http = new XMLHttpRequest();
    var url =
      "http://localhost:8080/ashow/artista/filter/" +
      estilo +
      "/" +
      min +
      "/" +
      max;

    http.open("GET", url, true);
    http.setRequestHeader("Content-type", "application/json");
    http.onreadystatechange = function () {
      if (http.readyState == 4 && http.status == 200) {
        var dados = http.responseText;
        dados = JSON.parse(dados);

        if (dados.length == 0) {
          let na = document.getElementById("void");
          na.style.display = "block";
          let acabou = document.getElementById("NA");
          acabou.style.display = "block";
          document.getElementById("titleHome").style.display = "none";
        } else if (dados.length <= 6) {
          let na = document.getElementById("void");
          na.style.display = "block";
          let acabou = document.getElementById("NA");
          acabou.style.display = "none";
          document.getElementById("titleHome").style.display = "block";
        } else {
          let na = document.getElementById("void");
          na.style.display = "none";
          document.getElementById("titleHome").style.display = "block";
        }

        var resp = ``;
        for (var i = dados.length - 1; i >= 0; i--) {
          let data = dados[i].data;
          resp += `<div id="cardEventos" class="cardEventos" data-modal="abrir" onClick="artistaNoModal('${dados[i].email}')">
        <div id="card-${dados[i].ID}">
      <h2 id="NomeArtistico-${dados[i].ID}" class = "nomeEvento">${dados[i].nomeArtistico}</h2>
      <h2 id="Nome-${dados[i].ID}">${dados[i].nome}</h2>
      <h2 id="Estilo-${dados[i].ID}">
         <span class="title">Estilo:</span>
         <span class="value">${dados[i].estilo}</span>
      </h2>
      <h3 id="Valor-${dados[i].ID}">
         <span class="title">Média de Avaliação:</span>
         <span class="value">${dados[i].mediaAvaliacao}</span>
      </h3>
    </div></div>`;
        }
        document.getElementById("card").innerHTML = resp;
        // $('#card').html(resp);
      }
    };
    http.send();
  } else {
    var http = new XMLHttpRequest();
    var url = "http://localhost:8080/ashow/artista/all";

    http.open("GET", url, true);
    http.setRequestHeader("Content-type", "application/json");
    http.onreadystatechange = function () {
      if (http.readyState == 4 && http.status == 200) {
        var dados = http.responseText;
        dados = JSON.parse(dados);

        if (dados.length == 0) {
          let na = document.getElementById("void");
          na.style.display = "block";
          let acabou = document.getElementById("NA");
          acabou.style.display = "block";
          document.getElementById("titleHome").style.display = "none";
        } else if (dados.length <= 6) {
          let na = document.getElementById("void");
          na.style.display = "block";
          let acabou = document.getElementById("NA");
          acabou.style.display = "none";
          document.getElementById("titleHome").style.display = "block";
        } else {
          let na = document.getElementById("void");
          na.style.display = "none";
          document.getElementById("titleHome").style.display = "block";
        }

        var resp = ``;
        var maior = dados[0].valorPadrao;
        for (var i = dados.length - 1; i >= 0; i--) {
          if (dados[i].valorPadrao > maior) {
            maior = dados[i].valorPadrao;
          }
          let data = dados[i].data;
          resp += `<div id="cardEventos" class="cardEventos" data-modal="abrir" onClick="artistaNoModal('${dados[i].email}')">
        <div id="card-${dados[i].ID}">
      <h2 id="NomeArtistico-${dados[i].ID}" class = "nomeEvento">${dados[i].nomeArtistico}</h2>
      <h2 id="Nome-${dados[i].ID}">${dados[i].nome}</h2>
      <h2 id="Estilo-${dados[i].ID}">
         <span class="title">Estilo:</span>
         <span class="value">${dados[i].estilo}</span>
      </h2>
      <h3 id="Valor-${dados[i].ID}">
         <span class="title">Média de Avaliação:</span>
         <span class="value">${dados[i].mediaAvaliacao}</span>
      </h3>
    </div></div>`;
        }
        document.getElementById("card").innerHTML = resp;
        $("#rangeMax").attr({
          max: maior + 1,
          min: 0
        });
        $("#rangeMin").attr({
          max: maior + 1,
          min: 0
        });
      }
    };
    http.send();
  }
};

mostraTodosNaHome();

function initModal() {
  document.querySelector("body").setAttribute("onclick", "");
  const botaoAbrir = document.querySelectorAll('[data-modal="abrir"]');
  const botaoFechar = document.querySelector('[data-modal="fechar"]');
  const containerModal = document.querySelector('[data-modal="container"]');

  if (botaoAbrir && botaoFechar && containerModal) {
    function toggleModal(event) {
      event.preventDefault();
      containerModal.classList.toggle("ativo");
    }
    function cliqueForaModal(event) {
      if (event.target === this) {
        toggleModal(event);
      }
    }

    botaoAbrir.forEach(e => {
      e.addEventListener("click", toggleModal);
    });

    botaoFechar.addEventListener("click", toggleModal);
    containerModal.addEventListener("click", cliqueForaModal);
  }
}

function artistaNoModal(email) {
  fetch(`http://localhost:8080/ashow/artista/${email}`).then(e =>
    e.json().then(art => {
      let htmlTexto = ``;
      //         <div class="imagem" id="imagem"> <div> <img src="../assets/img/default.jpg" alt="" /> </div> </div>

      if (sessionStorage.getItem("type") == "artista") {
        htmlTexto += `
      <h2 class="titleArtista">${art.nomeArtistico}</h2>
      <div class="dadosEvento" id="dadosEvento">
      <h3><img class="imgArtista" height="100" src="${art.dataUriFoto}" alt=""></h3>
         <h3><span>nome:</span> ${art.nome}</h3>
         <h3><span>Email:</span> ${art.email}</h3>
         <h3><span>Estilo:</span> ${art.estilo}</h3>
         <h3><span>Tipo de artista:</span> ${art.tipoArtista}</h3>
         <h3><span>Valor base: </span>${art.valorPadrao}</h3>
         <h3><span>Média de avaliação:</span> ${art.mediaAvaliacao}</h3>
         <h3><span>Quantidade de eventos:</span> ${art.numeroEventos}</h3>
      </div>`;
      } else {
        htmlTexto += `
      <h2 class="titleArtista">${art.nomeArtistico}</h2>
      <div class="dadosEvento" id="dadosEvento">
      <h3><img class="imgArtista" height="100" src="${art.dataUriFoto}" alt=""></h3>
         <h3><span>nome:</span> ${art.nome}</h3>
         <h3><span>Email:</span> ${art.email}</h3>
         <h3><span>Estilo:</span> ${art.estilo}</h3>
         <h3><span>Tipo de artista:</span> ${art.tipoArtista}</h3>
         <h3><span>Valor base: </span>${art.valorPadrao}</h3>
         <h3><span>Média de avaliação:</span> ${art.mediaAvaliacao}</h3>
         <h3><span>Quantidade de eventos:</span> ${art.numeroEventos}</h3>
         <button disabled>Convidar para um evento</button>
      </div>`;
      }
      document.getElementById("info").innerHTML = htmlTexto;
    })
  );
}

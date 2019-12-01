const mostraTodosNaHome = () => {
  var http = new XMLHttpRequest();
  var url = "http://localhost:8080/ashow/evento/all";

  http.open("GET", url, true);
  http.setRequestHeader("Content-type", "application/json");
  http.onreadystatechange = function() {
    if (http.readyState == 4 && http.status == 200) {
      var dados = http.responseText;

      dados = JSON.parse(dados);

      if (dados.length == 0) {
        let na = document.getElementById("void");
        na.style.display = "block";
        let acabou = document.getElementById("NA");
        acabou.style.display = "block";
        document.getElementById("titleHome").style.display = "none";
      } else if (dados.length <= 4) {
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
      var maior = dados[0].valor;
      for (var i = dados.length - 1; i >= 0; i--) {
        if (dados[i].valor > maior) {
          maior = dados[i].valor;
        }
        let data = dados[i].data;
        var dia =
          data[8] +
          data[9] +
          "/" +
          data[5] +
          data[6] +
          "/" +
          data[0] +
          data[1] +
          data[2] +
          data[3];
        resp += `<a id="cardEventos" class="cardEventos" data-modal="abrir" >

            <div id="card-${dados[i].id}">
      <h2 id="NomeArtistico-${dados[i].id}" class = "nomeEvento">${dados[i].nome}</h2>
      <h2 id="Nome-${dados[i].id}">${dia}</h2>
      <h2 id="Estilo-${dados[i].id}">
         <span class="title">Estilo:</span>
         <span class="value">${dados[i].estilo}</span>
      </h2>
      <h3 id="Valor-${dados[i].id}">
         <span class="title">Endereço:</span>
         <span class="value">${dados[i].endereco.bairro}, ${dados[i].endereco.cidade}</span>
      </h3>
    </div></a>`;
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

      initModal();
    }
  };
  http.send();
};
mostraTodosNaHome();

function initModal() {
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

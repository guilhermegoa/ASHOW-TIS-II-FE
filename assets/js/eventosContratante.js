const mostraTodosNaHome = () => {
  var http = new XMLHttpRequest();
  var url = `http://localhost:8080/ashow/${sessionStorage.getItem(
    "type"
  )}/${sessionStorage.getItem("email")}/eventos`;

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
        let data = dados[i].dataEvento;
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
        resp += `
        <div id="cardEventos-${dados[i].id}" class="cardEventos" data-modal="abrir" onClick="abreEvt(${dados[i].id})>
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
   </div></div>`;
      }
      document.getElementById("card").innerHTML = resp;
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

const getEvento = async id =>
  await (await fetch(`http://localhost:8080/ashow/evento/${id}`)).json();

async function abreEvt(id) {
  let data;
  let dados = await getEvento(id);
  // dados.forEach(e => {
  //   if (e.id == id)
  //     console.log(e);
  //   data = e;
  // })

  data = dados.dataEvento;
  data =
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
  let hora = data[11] + data[12] + data[13] + data[14] + data[15];
  let htmlTexto = ``;
  //         <div class="imagem" id="imagem"> <div> <img src="../assets/img/default.jpg" alt="" /> </div> </div>
  htmlTexto += `
      <h2 class="titleArtista">${dados.nome}</h2>
      <div class="dadosEvento" id="dadosEvento">`;

  if (dados.dataUriFoto != "")
    htmlTexto += `<h3><img class="imgArtista" height="100" src="${dados.dataUriFoto}" alt=""></h3>`;

  htmlTexto += `  <h3><span>Estilo:</span> ${dados.estilo}</h3>
         <h3><span>Data:</span> ${data}</h3>
         <h3><span>Hora:</span> ${hora}</h3>
         <h3><span>Endereço:</span> </h3>
         <h3>${dados.endereco.rua}, ${dados.endereco.numero}, ${dados.endereco.complemento},
            ${dados.endereco.bairro}, ${dados.endereco.cidade}, ${dados.endereco.uf} </h3>
            <h3><span>Quantidade de pessoas esperadas: </span>${dados.capacidadeEsperada}</h3>
         <h3><span>Quantidade de artistas:</span> ${dados.quantidadeArtistas}</h3>
         <h3><span>Valor base: </span>${dados.valor}</h3>`;
  if (sessionStorage.getItem("type") == "artista") {
    console.log(sessionStorage.getItem("email") == -1);
    if (
      dados.open &&
      dados.emailArtistasPendente.indexOf(sessionStorage.getItem("email") == -1)
    ) {
      htmlTexto += `<h3><button id="btnJuntar"  class="btnJuntar">Juntar-se</button></h3></div>`;
    } else
      htmlTexto += `<h3><button id="btnJuntar" class="btnJuntar" disabled>Juntar-se</button></h3></div>`;
  } else {
    htmlTexto += `</div>`;
  }

  document.getElementById("info").innerHTML = htmlTexto;

  let databody = {
    type: "proposta",
    emailArtista: sessionStorage.getItem("email"),
    emailContratante: dados.emailContratante,
    idEvento: dados.id,
    valor: dados.valor
  };

  $("#btnJuntar").on("click", async () => {
    await fetch(`http://localhost:8080/ashow/proposta/artista/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(databody)
    }).then(response => {
      response.text().then(e => {
        console.log(e.valueOf());
        if (e.valueOf() == "true") {
          document.getElementById("btnJuntar").disabled = true;
          alert("Pedido enviado");
        } else {
          document.getElementById("btnJuntar").disabled = true;
          alert("Você já solicitou para participar desse evento");
        }
      });
    });
  });
}

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("idEvt");
const getEvento = async id =>
  await (await fetch(`http://localhost:8080/ashow/evento/${id}`)).json();

var myHeaders = new Headers();

var myInit = {
  method: "GET",
  headers: myHeaders,
  mode: "cors",
  cache: "default"
};
const databody = {
  type: "proposta",
  emailArtista: "2@2",
  emailContratante: "email",
  idEvento: 1,
  valor: 500.0
};

const addArtistaAoEventoFet = async () =>
  await fetch(`http://localhost:8080/ashow/proposta/artista/add`, {
    method: "POST",
    body: myInit
  });

(async () => {
  let dados = await getEvento(id);

  let data = dados.data;
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
  let hora =
    dados.data[11] +
    dados.data[12] +
    dados.data[13] +
    dados.data[14] +
    dados.data[15];
  let htmlTexto = ``;
  //         <div class="imagem" id="imagem"> <div> <img src="../assets/img/default.jpg" alt="" /> </div> </div>
  console.log(dados);
  htmlTexto += `
      <h2 class="titleArtista">${dados.nome}</h2>
      <div class="dadosEvento" id="dadosEvento">

         <h3><span>Estilo:</span> ${dados.estilo}</h3>
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
  }

  document.getElementById("evento").innerHTML = htmlTexto;

  document.getElementById("btnJuntar").onclick = () => {
    document.getElementById("btnJuntar").onclick = async () =>
      await fetch(`http://localhost:8080/ashow/proposta/artista/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(databody)
      }).then(response => {
        console.log(response);
      });
  };
})();

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("idEvt");
const getEvento = async id =>
  await (await fetch(`http://localhost:8080/ashow/evento/${id}`)).json();

// var myHeaders = new Headers();

// var myInit = {
//   method: "GET",
//   headers: myHeaders,
//   mode: "cors",
//   cache: "default"
// };

// const addArtistaAoEventoFet = async () =>
//   await fetch(`http://localhost:8080/ashow/proposta/artista/add`, {
//     method: "POST",
//     body: myInit
//   });

(async () => {
  let dados = await getEvento(id);

  let data = dados.dataEvento;
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
    htmlTexto += `<h3><img class="imgArtista" src="${dados.dataUriFoto}" alt=""></h3>`;

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
  }

  document.getElementById("evento").innerHTML = htmlTexto;

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
})();

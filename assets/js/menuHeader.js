const getUsuarioAtual = async email =>
  await (await fetch(
    `http://localhost:8080/ashow/${sessionStorage.getItem(
      "type"
    )}/${sessionStorage.getItem("email")}`
  )).json();

(async () => {
  let dados = await getUsuarioAtual();

  let htmlTexto = `<img src="${dados.dataUriFoto}" alt="" />`;

  document.getElementById("imgUser").innerHTML = htmlTexto;

  htmlTexto = `<p> ${dados.nome}</p>`;

  document.getElementById("nome").innerHTML = htmlTexto;

  htmlTexto = ``;

  if (sessionStorage.getItem("type") == "artista") {
    htmlTexto += `
      <ul>
      <li><a href="./new-home.html">Eventos</a></li>
      <li><a href="/pages/artistas.html">Artistas</a></li>
      <li><a href="#">Link 1</a></li>
      <li><a href="../pages/sobrenos.html">Sobre Nos</a></li>
      <li id="logOut"><a href="../index.html">Logout</a></li>
      </ul>`;
  } else {
    htmlTexto += `
       <ul ">
        <li><a href="./new-home.html">Eventos</a></li>
        <li><a href="cadastrarEvento.html">Criar Evento</a></li>
        <li><a href="/pages/meusEventos.html">Meus eventos</a></li>
        <li><a href="/pages/artistas.html">Artistas</a></li>
        <li><a href="#">Link 1</a></li>
        <li><a href="../pages/sobrenos.html">Sobre Nos</a></li>
        <li id="logOut"><a href="../index.html">Logout</a></li>
        </ul>`;
  }

  document.getElementById("lista-nav").innerHTML = htmlTexto;
})();

let getNotificacoes = async () =>
  await (await fetch(
    `http://localhost:8080/ashow/notificacao/${sessionStorage.getItem(
      "type"
    )}/${sessionStorage.getItem("email")}`
  )).json();
let getNotificacoesId = async id =>
  await (await fetch(`http://localhost:8080/ashow/notificacao/${id}`)).json();
let getArtistaNot = async email =>
  await (await fetch(`http://localhost:8080/ashow/artista/${email}`)).json();
let getEventoNot = async id =>
  await (await fetch(`http://localhost:8080/ashow/evento/${id}`)).json();
let getPropostaId = async id =>
  await (await fetch(`http://localhost:8080/ashow/proposta/${id}`)).json();

(async () => {
  let dados = await getNotificacoes();

  let htmlTexto = ``;

  for (i = 0; i < dados.length; i++) {
    let artista = await getArtistaNot(dados[i].proposta.emailArtista);
    let evento = await getEventoNot(dados[i].proposta.idEvento);
    htmlTexto += `
    <div id="not-${dados[i].id}" class="not" data-modal="abrir" onclick="vizualizar(${dados[i].id})">
        <img src="${artista.dataUriFoto}" alt="" class="imgNot" >
        <p>${artista.nomeArtistico} pediu para participar do evento ${evento.nome}</p>
    </div>`;
  }
  document.getElementById("notificacoes").innerHTML = htmlTexto;
  initModal();
})();

function vizualizar(id) {
  let modal = document.getElementById("info");

  getNotificacoesId(id).then(e => {
    getPropostaId(e.proposta.id).then(prop => {
      fetch(`http://localhost:8080/ashow/notificacao/visualizar/${id}`, {
        method: "PUT"
      });

      if (!e.proposta.contratanteAceitou) {
        getArtistaNot(prop.emailArtista).then(art => {
          getEventoNot(prop.idEvento).then(evt => {
            dadosModal = `
          <div>
            <h1>Pedido para: ${evt.nome}</h1>
          </div>
          <div>
            <img src="${art.dataUriFoto}" height="100" alt="">
            <h1>${art.nomeArtistico}</h1>
          </div>
          <div>
            <h2>Estilo: ${art.estilo}</h2>
          </div>
          <div>
            <h2>Valor: R$${evt.valor}</h2>
          </div>
          <div>
            <h2>Nota: ${art.mediaAvaliacao}</h2>
          </div>`;

            if (prop.contratanteAceitou) {
              dadosModal += `
          <button onclick="aceitar(${e.proposta.id},${id})" disabled>Aceitar</button>`;
            } else {
              dadosModal += `
            <button onclick="aceitar(${e.proposta.id},${id})">Aceitar</button>`;
            }
            if (e.visualizou) {
              dadosModal += `
            <button onclick="" disabled>Cancelar</button>`;
            } else {
              dadosModal += `
          <button onclick="" disabled>Rejeitar</button>`;
            }
            dadosModal += `
            <button onClick="artistaNoModal('${art.email}')">Ver Perfil</button>`;
            modal.innerHTML = dadosModal;
          });
        });
      }
    });
  });
}

function aceitar(idProposta, idNot) {
  getPropostaId(idProposta).then(prop => {
    fetch(
      `http://localhost:8080/ashow/proposta/${sessionStorage.getItem(
        "type"
      )}/add`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(prop)
      }
    ).then(e => {
      e.text().then(tx => {
        if (tx == "true") {
          alert("Artista adicionado para tocar no evento");
        } else {
          alert("Artista já confirmado");
        }

        vizualizar(idNot);
      });
    });
  });
}

function artistaNoModal(email) {
  fetch(`http://localhost:8080/ashow/artista/${email}`).then(e =>
    e.json().then(art => {
      let htmlTexto = ``;
      //         <div class="imagem" id="imagem"> <div> <img src="../assets/img/default.jpg" alt="" /> </div> </div>

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

      document.getElementById("info").innerHTML = htmlTexto;
    })
  );
}

$("#notificacoes").hide();
$("#notification").on("click", () => {
  $("#notificacoes").toggle();
});

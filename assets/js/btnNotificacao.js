const getNotificacoes = async () =>await (await fetch(`http://localhost:8080/ashow/notificacao/${sessionStorage.getItem("type")}/${sessionStorage.getItem("email")}`)).json();
const getNotificacoesId = async id =>await (await fetch(`http://localhost:8080/ashow/notificacao/${id}`)).json();
const getArtistaNot = async email => await (await fetch(`http://localhost:8080/ashow/artista/${email}`)).json();
const getEventoNot = async id =>await (await fetch(`http://localhost:8080/ashow/evento/${id}`)).json();
const getPropostaId = async id =>await (await fetch(`http://localhost:8080/ashow/proposta/${id}`)).json();

(async () => {
  let dados = await getNotificacoes();

  let htmlTexto = ``;

  for(i=0;i<dados.length;i++){
    let artista = await getArtistaNot(dados[i].proposta.emailArtista);
    let evento = await getEventoNot(dados[i].proposta.idEvento);
    htmlTexto+= `
    <div id="not" class="not" onclick="vizualizar(${dados[i].id})">
        <img src="${artista.dataUriFoto}" alt="" class="imgNot" >
        <p>${artista.nomeArtistico} pediu para participar do evento ${evento.nome}</p>
        <input type="checkbox" name="chk" class="chkNot" id="chk${dados[i].id}">
        <label id="label${dados[i].id}" for="chk${dados[i].id}">
            <img src="../assets/img/olho.png" class="olhoNot" alt="">
        </label>
    </div>`;
  }
    document.getElementById("notificacoes").innerHTML = htmlTexto;
})();

$("#notificacoes").hide();
$("#notification").on("click", () => {
  $("#notificacoes").toggle();
});

function vizualizar(id) {
  let modal = document.getElementById("notificacaoModal");
  document.getElementById("bk").style.display = "block";
  modal.style.display = "flex";

  getNotificacoesId(id).then(e => {
    if(!e.proposta.contratanteAceitou) {
      getArtistaNot(e.proposta.emailArtista).then(art => {
        getEventoNot(e.proposta.idEvento).then(evt => {
          modal.innerHTML = `
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
          </div>
          <button onclick="aceitar(${e.proposta.id})">Aceitar</button>
          <button onclick="">Rejeitar</button>
          <a href="./artista.html?idArt=${e.proposta.emailArtista}"><button>Ver Perfil</button></a>`;
        });
      });
    }
  });
}

function aceitar(idProposta) {
  getPropostaId(idProposta).then( prop=> {
  let databody = {
    emailArtista: prop.emailArtista,
    emailContratante: prop.emailContratante,
    idEvento: prop.idEvento,
  };

  fetch(`http://localhost:8080/ashow/proposta/${sessionStorage.getItem("type")}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(prop)
  }).then(e => {
    console.log(e)
      if(e.body == "true") {
        alert("Artista adicionado para tocar no evento");
      } else {
        alert("Erro ao confirmar proposta");
      }
    });
  });
}

function tirarModal() {
  document.getElementById("bk").style.display = "none";
  document.getElementById("notificacaoModal").style.display = "none";
}


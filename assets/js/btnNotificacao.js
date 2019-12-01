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
    getPropostaId(e.proposta.id).then( prop=> {

  fetch(`http://localhost:8080/ashow/notificacao/visualizar/${id}`,{method:"PUT"});

    if(!e.proposta.contratanteAceitou) {
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

          console.log(prop.contratanteAceitou)
          if(prop.contratanteAceitou) {
          dadosModal+=`
          <button onclick="aceitar(${e.proposta.id})" disabled>Aceitar</button>`;
          } else {
            dadosModal+=`
            <button onclick="aceitar(${e.proposta.id})">Aceitar</button>`;
          }
          if(e.visualizou){
            dadosModal+=`
            <button onclick="" disabled>Cancelar</button>`;
          }
          else {
          dadosModal+=`
          <button onclick="" disabled>Rejeitar</button>`;
        }
        dadosModal+=`
          <a href="./artista.html?idArt=${e.proposta.emailArtista}"><button>Ver Perfil</button></a>`;
          modal.innerHTML = dadosModal;
        });
      });
    }
  });
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
    e.text().then(tx => {
      if(tx == "true") {
        alert("Artista adicionado para tocar no evento");
        location.reload();
      } else {
        alert("Artista já confirmado");
      }});
    });
  });
}

function tirarModal() {
  document.getElementById("bk").style.display = "none";
  document.getElementById("notificacaoModal").style.display = "none";
}


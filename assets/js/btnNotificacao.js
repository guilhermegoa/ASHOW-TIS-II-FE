const getNotificacoes = async () =>await (await fetch(`http://localhost:8080/ashow/notificacao/${sessionStorage.getItem("type")}/${sessionStorage.getItem("email")}`)).json();
const getArtistaNot = async email => await (await fetch(`http://localhost:8080/ashow/artista/${email}`)).json();
const getEventoNot = async id =>await (await fetch(`http://localhost:8080/ashow/evento/${id}`)).json();

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
  modal.style.display = "block";
}

function tirarModal() {
  document.getElementById("bk").style.display = "none";
  document.getElementById("notificacaoModal").style.display = "none";
}


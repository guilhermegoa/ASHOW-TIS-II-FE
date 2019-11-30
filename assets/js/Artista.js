const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("idArt");
const getArtista = async email =>
  await (await fetch(`http://localhost:8080/ashow/artista/${email}`)).json();

(async () => {
  let dados = await getArtista(id);

  let htmlTexto = ``;
  //         <div class="imagem" id="imagem"> <div> <img src="../assets/img/default.jpg" alt="" /> </div> </div>

  htmlTexto += `
      <h2 class="titleArtista">${dados.nomeArtistico}</h2>
      <div class="dadosEvento" id="dadosEvento">`;

  if (dados.dataUriFoto != "")
    htmlTexto += `<h3><img class="imgArtista" src="${dados.dataUriFoto}" alt=""></h3>`;

  htmlTexto += `
         <h3><span>nome:</span> ${dados.nome}</h3>
         <h3><span>Email:</span> ${dados.email}</h3>
         <h3><span>Estilo:</span> ${dados.estilo}</h3>
         <h3><span>Tipo de artista:</span> ${dados.tipoArtista}</h3>
         <h3><span>Valor base: </span>${dados.valorPadrao}</h3>
         <h3><span>Média de avaliação:</span> ${dados.mediaAvaliacao}</h3>
         <h3><span>Quantidade de eventos:</span> ${dados.numeroEventos}</h3>
      </div>`;

  document.getElementById("evento").innerHTML = htmlTexto;
})();

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('idArt');
const getArtista = async id => await (await fetch(`http://localhost:8080/ashow/artista/${id}`)).json();

(async () => {
   let dados = await getArtista(id);

   let data = dados.data;
   let htmlTexto = ``;
   //         <div class="imagem" id="imagem"> <div> <img src="../assets/img/default.jpg" alt="" /> </div> </div>

      htmlTexto += `
      <h2 class="titleArtista">${dados.nomeArtistico}</h2>
      <div class="dadosEvento" id="dadosEvento">
      <h3><span>nome:</span> ${dados.nome}</h3>
      <h3><span>Email:</span> ${dados.email}</h3>
         <h3><span>Estilo:</span> ${dados.estilo}</h3>
         <h3><span>Tipo de artista:</span> ${dados.tipoArtista}</h3>
         <h3><span>Valor base: </span>${dados.valorPadrao}</h3>
         <h3><span>Média de avaliação:</span> ${dados.mediaAvaliacao}</h3>
         <h3><span>Quantidade de eventos:</span> ${dados.numeroEventos}</h3>`;

         if(sessionStorage.getItem("email") == "artista") {
         if(dados.open) htmlTexto +=`<h3><button>Juntar-se</button></h3>`;
         else htmlTexto += `<h3><button disabled>Juntar-se</button></h3></div>`;
         }

   document.getElementById('evento').innerHTML = htmlTexto;
})();

(async () => {
   let artista
})();


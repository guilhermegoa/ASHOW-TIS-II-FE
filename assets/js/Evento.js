const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('idEvt');
const getEvento = async id => await (await fetch(`http://localhost:8080/ashow/evento/${id}`)).json();

(async () => {
   let dados = await getEvento(id);

   let data = dados.data;
   data =
      data[8] +
      data[9] +
      '/' +
      data[5] +
      data[6] +
      '/' +
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
         if(sessionStorage.getItem("type") == "artista") {
            if(dados.open) htmlTexto +=`<h3><button>Juntar-se</button></h3></div>`;
            else htmlTexto += `<h3><button disabled>Juntar-se</button></h3></div>`;
         }

   document.getElementById('evento').innerHTML = htmlTexto;
})();

(async () => {
   let artista
})();


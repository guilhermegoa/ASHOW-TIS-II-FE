const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');


(async () => {
   const dados = await getEvento(id);

   let data = dados.data;
   data = data[8] + data[9] + "/" + data[5] + data[6] + "/" + data[0] + data[1] + data[2] + data[3];
   let hora = dados.data[11] + dados.data[12] + dados.data[13] + dados.data[14] + dados.data[15];
   let htmlTexto = ``;
   if (dados.open == true) {
      htmlTexto += `
      <h2 class="titleArtista">${dados.nome}</h2>
      <div class="dadosEvento" id="dadosEvento">
         <h3>Estilo: ${dados.estilo}</h3>
         <h3>Data: ${data}</h3>
         <h3>Hora: ${hora}</h3>
         <h3>Endereço: </h3>
         <h3>${dados.endereco.rua}, ${dados.endereco.numero}, ${dados.endereco.complemento},
            ${dados.endereco.bairro}, ${dados.endereco.cidade}, ${dados.endereco.uf} </h3>
         <h3>Quantidade de artistas: ${dados.quantidadeArtistas}</h3>
         <h3>Valor base: ${dados.valor}</h3>
      </div>`;
   }
   document.getElementById("evento").innerHTML = htmlTexto;
})()


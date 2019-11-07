function mostraTodosNaHome() {
   var http = new XMLHttpRequest();
   var url = 'http://localhost:8080/ashow/evento/all';

   http.open('GET', url, true);
   http.setRequestHeader('Content-type', 'application/json');
   http.onreadystatechange = function () {
      if (http.readyState == 4 && http.status == 200) {
         var dados = (http.responseText);

         dados = JSON.parse(dados);

         var resp = ``;
         for (var i = 0; i < dados.length; i++) {
            resp += `<div class="cardArtista" id="card-${dados[i].id}">
      <h2 id="NomeArtistico-${dados[i].id}">${dados[i].nome}</h2>
      <h2 id="Nome-${dados[i].id}">${dados[i].nome}</h2>
      <h2 id="Estilo-${dados[i].id}">
         <span class="title">Estilo:</span>
         <span class="value">${dados[i].estilo}</span>
      </h2>
      <h3 id="Valor-${dados[i].id}">
         <span class="title">Valor Padrão:</span>
         <span class="value">${dados[i].valor}</span>
      </h3>
    </div>`
         }
         document.getElementById("card").innerHTML = (resp);
         // $('#card').html(resp);
      }
   };
   http.send(JSON.stringify());
}

mostraTodosNaHome();

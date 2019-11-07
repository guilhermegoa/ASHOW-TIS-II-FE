
const getAllEventos = () => {
   var retorno = [];
   var http = new XMLHttpRequest();
   var url = 'http://localhost:8080/ashow/evento/all';

   http.open('GET', url, true);
   http.setRequestHeader('Content-type', 'application/json');
   http.onreadystatechange = function () {
      if (http.readyState == 4 && http.status == 200) {
         retorno = (JSNO.parse(http.responseText));
      }
   };
   http.send(JSON.stringify());
}

const mostraTodosNaHome = () => {
   var dados = getAllEventos().retorno;

   var resp = ``;
   for (var i = 0; i < dados.length; i++) {
      resp += `<div id="card-A">
      <h2 id="NomeArtistico-${dados.id}">${dados.nome}</h2>
      <h2 id="Nome-${dados.id}">${nome.data}</h2>
      <h2 id="Estilo-${dados.id}">
         <span class="title">Estilo:</span>
         <span class="value">${dados.estilo}</span>
      </h2>
      <h3 id="Valor-${dados.id}">
         <span class="title">Valor Padrão:</span>
         <span class="value">${dados.valor}</span>
      </h3>
    </div>`
   }
   $('#card').html(resp);
}


mostraTodosNaHome();

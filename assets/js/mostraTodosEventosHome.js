const mostraTodosNaHome = () => {
   var http = new XMLHttpRequest();
   var url = 'http://localhost:8080/ashow/evento/all';

   http.open('GET', url, true);
   http.setRequestHeader('Content-type', 'application/json');
   http.onreadystatechange = function() {
      if (http.readyState == 4 && http.status == 200) {
         var dados = http.responseText;

         dados = JSON.parse(dados);

         if (dados.length == 0) {
            let na = document.getElementById('void');
            na.style.display = 'block';
            let acabou = document.getElementById('NA');
            acabou.style.display = 'block';
            document.getElementById('titleHome').style.display = 'none';
         } else if (dados.length <= 6) {
            let na = document.getElementById('void');
            na.style.display = 'block';
            let acabou = document.getElementById('NA');
            acabou.style.display = 'none';
            document.getElementById('titleHome').style.display = 'block';
         } else {
            let na = document.getElementById('void');
            na.style.display = 'none';
            document.getElementById('titleHome').style.display = 'block';
         }

         var resp = ``;
         for (var i = dados.length - 1; i >= 0; i--) {
            let data = dados[i].dataEvento;
            var dia =
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
            resp += `<a id="cardEventos" class="cardEventos" href="./evento.html?idEvt=${dados[i].id}"><div id="card-${dados[i].id}">
      <h2 id="NomeArtistico-${dados[i].id}" class = "nomeEvento">${dados[i].nome}</h2>
      <h2 id="Nome-${dados[i].id}">${dia}</h2>
      <h2 id="Estilo-${dados[i].id}">
         <span class="title">Estilo:</span>
         <span class="value">${dados[i].estilo}</span>
      </h2>
      <h3 id="Valor-${dados[i].id}">
         <span class="title">Endereço:</span>
         <span class="value">${dados[i].endereco.bairro}, ${dados[i].endereco.cidade}</span>
      </h3>
    </div></a>`;
         }
         document.getElementById('card').innerHTML = resp;
         // $('#card').html(resp);
      }
   };
   http.send();
}

mostraTodosNaHome();

const mostraTodosNaHome = () => {
   var http = new XMLHttpRequest();
   var url = 'http://localhost:8080/ashow/artista/all';
   console.log(url);

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
            let data = dados[i].data;
            resp += `<a id="cardEventos" class="cardEventos" href="./artista.html?idArt=${dados[i].email}"><div id="card-${dados[i].ID}">
      <h2 id="NomeArtistico-${dados[i].ID}" class = "nomeEvento">${dados[i].nomeArtistico}</h2>
      <h2 id="Nome-${dados[i].ID}">${dados[i].nome}</h2>
      <h2 id="Estilo-${dados[i].ID}">
         <span class="title">Estilo:</span>
         <span class="value">${dados[i].estilo}</span>
      </h2>
      <h3 id="Valor-${dados[i].ID}">
         <span class="title">Média de Avaliação:</span>
         <span class="value">${dados[i].mediaAvaliacao}</span>
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

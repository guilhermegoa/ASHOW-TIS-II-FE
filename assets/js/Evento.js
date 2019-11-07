function getEvento(id) {
   var http = new XMLHttpRequest();
   var url = `http://localhost:8080/ashow/evento/${id}`;

   http.open('GET', url, true);
   http.setRequestHeader('Content-type', 'application/json');
   http.onreadystatechange = function () {
      if (http.readyState == 4 && http.status == 200) {
         data = (JSON.parse(http.responseText));

         if (data.opne == "true") {
            let dados = ``;
            dados += `
               <h2 class="titleArtista">${data.nome}</h2>
               <div class="card" id="card"></div>`;
         }
         document.getElementById("evento").innerHTML = dados;
      }
   };
   http.send();
}


const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
getEvento(id);

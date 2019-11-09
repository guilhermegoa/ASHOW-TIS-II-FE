function AddEvento(dadosCadastro) {
   var http = new XMLHttpRequest();
   var url = 'http://localhost:8080/ashow/evento/add';

   http.open('POST', url, true);
   http.setRequestHeader('Content-type', 'application/json');
   http.onreadystatechange = function () {
      if (http.readyState == 4 && http.status == 200) {
         // console.log(http.responseText);
      }
   };
   http.send(JSON.stringify(dadosCadastro));
}

function getAllEventos() {
   var http = new XMLHttpRequest();
   var url = 'http://localhost:8080/ashow/evento/all';

   http.open('GET', url, true);
   http.setRequestHeader('Content-type', 'application/json');
   http.onreadystatechange = function () {
      if (http.readyState == 4 && http.status == 200) {
         return (JSNO.parse(http.responseText));
      }
   };
   http.send(JSON.stringify());
}

const getEvento = async id => await (await fetch(`http://localhost:8080/ashow/evento/${id}`)).json();

function deleteEvento(id) {
   var http = new XMLHttpRequest();
   var url = `http://localhost:8080/ashow/evento/delete/${id}`;

   http.open('GET', url, true);
   http.setRequestHeader('Content-type', 'application/json');
   http.onreadystatechange = function () {
      if (http.readyState == 4 && http.status == 200) {
         console.log(JSON.parse(http.responseText));
      }
   };
   http.send(JSON.stringify());
}

const formLog = $('#formLog');
const emailLog = $('#emailLog');
const senhaLog = $('#senhaLog');
const tryLogArtista = $('#tryLog-artista');
const tryLogContratante = $('#tryLog-contratante');

tryLogArtista.on('click', event => {
   event.preventDefault();
   if (formLog[0].checkValidity()) {
      var dadosTry = {
         type: 'loginUsuario',
         email: emailLog.val(),
         senha: senhaLog.val(),
      };

      var http = new XMLHttpRequest();
      var url = 'http://localhost:8080/ashow/artista/log';
      // var resposta;

      http.open('POST', url, true);
      http.setRequestHeader('Content-type', 'application/json');
      http.onreadystatechange = function() {
         if (http.readyState == 4 && http.status == 200) {
            console.log(http.responseText);
            if (http.responseText == 'true') {
               sessionStorage.clear();
               sessionStorage.setItem('type', "artista");
               sessionStorage.setItem("email",emailLog.val());
               window.location.href = '../../pages/home.html?';
            } else {
               alert('Senha ou email errado');
            }
         }
      };
      http.send(JSON.stringify(dadosTry));
   }
});

tryLogContratante.on('click', event => {
   event.preventDefault();
   if (formLog[0].checkValidity()) {
      var dadosTry = {
         type: 'loginUsuario',
         email: emailLog.val(),
         senha: senhaLog.val(),
      };

      var http = new XMLHttpRequest();
      var url = 'http://localhost:8080/ashow/contratante/log';
      // var resposta;

      http.open('POST', url, true);
      http.setRequestHeader('Content-type', 'application/json');
      http.onreadystatechange = function() {
         if (http.readyState == 4 && http.status == 200) {
            console.log(http.responseText);
            if (http.responseText == 'true') {
               sessionStorage.clear();
               sessionStorage.setItem('type', "contratante");
               sessionStorage.setItem("email",emailLog.val());
               window.location.href = '../../pages/home.html';
            } else {
               alert('Senha ou email errado');
            }
         }
      };
      http.send(JSON.stringify(dadosTry));
   }
});

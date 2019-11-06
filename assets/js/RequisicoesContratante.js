const AddContrattante = () => {
   const formContratante = $('#form-contratante');
   const nomeContratante = $('#nomeContratante');
   const senhaContratante = $('#senhaContratante');
   const emailContratante = $('#emailContratante');
   const cadastrarContratante = $('#cadastrarContratante');

   cadastrarContratante.click(() => {
      if (formContratante[0].checkValidity()) {
         var dadosCadastro = {
            type: 'contratante',
            email: emailContratante.val(),
            nome: nomeContratante.val(),
            senha: senhaContratante.val(),
         };

         console.log(dadosCadastro);

         var http = new XMLHttpRequest();
         var url = 'http://localhost:8080/ashow/contratante/add';

         http.open('POST', url, true);
         http.setRequestHeader('Content-type', 'application/json');
         http.onreadystatechange = function() {
            if (http.readyState == 4 && http.status == 200) {
               console.log(http.responseText);
               if (http.responseText == 'true') {
                  window.location.href = '../../index.html';
               }
            }
         };
         http.send(JSON.stringify(dadosCadastro));
      }
   });
};

const UpdateContrattante = () => {};

const GetContrattante = (email) => {
   // const contratante = document.getElementById(id);
   const dado;
   var http = new XMLHttpRequest();
   var url = 'http://localhost:8080/ashow/contratante/' + email;

   http.open('GET', url, true);
   http.setRequestHeader('Content-type', 'application/json');
   http.onreadystatechange = function() {
      if (http.readyState == 4 && http.status == 200) {
         dado = JSON.parse(url.responseText);
      }
   };

   http.send(dado);
};

const GetAllContrattante = () => {
   // const contratantes = document.getElementById(id);
   const dados;
   var http = new XMLHttpRequest();
   var url = 'http://localhost:8080/ashow/contratante/all';


   http.open('GET', url, true);
   http.setRequestHeader('Content-type', 'application/json');
   http.onreadystatechange = function() {
      if (http.readyState == 4 && http.status == 200) {
         dados = JSON.parse(url.responseText);
      }
   };

   http.send(dados);
};

const DeleteContrattante = () => {};

AddContrattante();

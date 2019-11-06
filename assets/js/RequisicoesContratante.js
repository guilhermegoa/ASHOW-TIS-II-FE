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

const GetContrattante = (email, id) => {
   const contratante = document.getElementById(id);

   var http = new XMLHttpRequest();
   var url = 'http://localhost:8080/ashow/contratante/' + email;
   var dado;
   http.open('GET', url, true);
   http.setRequestHeader('Content-type', 'application/json');
   http.onreadystatechange = function() {
      if (http.onload == 4 && http.status == 200) {
         dado = JSON.parse(this.responseText);
      }
   };
   http.send();
   return dado;
};

const GetAllContrattante = id => {
   const contratantes = document.getElementById(id);

   var http = new XMLHttpRequest();
   var url = 'http://localhost:8080/ashow/contratante/all';

   http.open('GET', url, true);
   http.setRequestHeader('Content-type', 'application/json');
   http.onreadystatechange = function() {
      if (http.readyState == 4 && http.status == 200) {
         contratantes.innerHTML = this.responseText;
      }
   };

   http.send();
};

const DeleteContrattante = () => {};

AddContrattante();

console.log(GetContrattante());

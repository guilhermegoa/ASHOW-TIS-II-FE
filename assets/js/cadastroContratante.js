const AddContrattante = () => {
   const formContratante = $('#form-contratante');
   const nomeContratante = $('#nomeContratante');
   const senhaContratante = $('#senhaContratante');
   const emailContratante = $('#emailContratante');
   const cadastrarContratante = $('#cadastrarContratante');

   formContratante.on('submit', event => {
      event.preventDefault();
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
                  alert('Contratante Cadastrado');
                  window.location.href = '../../index.html';
               }
            }
         };
         http.send(JSON.stringify(dadosCadastro));
      }
   });
};

AddContrattante();
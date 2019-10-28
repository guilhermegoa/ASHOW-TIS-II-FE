const slidemusico = () => {
   const btn_musico = document.getElementById('btn-musico');
   const form_musico = document.getElementById('form-musico');
   const tela_musico = document.getElementById('musico');
   const tela_contratante = document.getElementById('contratante');
   const aux = document.getElementById('div-contratante');

   btn_musico.addEventListener('click', () => {
      form_musico.classList.toggle('form-active');
      tela_musico.classList.toggle('musico-active');
      tela_contratante.classList.toggle('contratante-active');
      aux.classList.toggle('off');
   });
};

const slidecontratante = () => {
   const btn_contratante = document.getElementById('btn-contratante');
   const form_contratante = document.getElementById('form-contratante');
   const tela_contratante = document.getElementById('contratante');
   const tela_musico = document.getElementById('musico');
   const aux = document.getElementById('div-musico');

   btn_contratante.addEventListener('click', () => {
      form_contratante.classList.toggle('form-active');
      tela_contratante.classList.toggle('contratante-active');
      tela_musico.classList.toggle('musico-active');
      aux.classList.toggle('off');
   });
};

slidemusico();
slidecontratante();

function descer() {
   var heightPage = document.body.scrollHeight;
   window.scrollTo(0, heightPage);
}

const init = () => {
   const formContratante = $('#form-contratante');
   const nomeContratante = $('#nomeContratante');
   const senhaContratante = $('#senhaContratante');
   const emailContratante = $('#emailContratante');
   const cadastrarContratante = $('#cadastrarContratante');
   const formMusico = $('#form-musico');
   const nomeMusico = $('#nomeMusico');
   const senhaMusico = $('#senhaMusico');
   const emailMusico = $('#emailMusico');
   const estiloMusico = $('#estiloMusico');
   const tipoMusico = $('#tipoMusico');
   const submitMusico = $('#submitMusico');

   cadastrarContratante.click(() => {
      if (formContratante[0].checkValidity()) {
         var dadosCadastro = {
            nome: nomeContratante.val(),
            senha: senhaContratante.val(),
            email: emailContratante.val(),
         };

         console.log(dadosCadastro);

         function reqListener() {
            console.log(this.responseText);
         }

         //  var oReq = new XMLHttpRequest();
         //  oReq.onload = reqListener;
         //  oReq.open("get", "http://localhost:8080/ashow/artista/all", true);
         //  oReq.send();

         var http = new XMLHttpRequest();
         var url = 'http://localhost:8080/ashow/contratante/add';
         var params1 = dadosCadastro;
         http.open('POST', url, true);

         //Send the proper header information along with the request
         http.setRequestHeader('Content-type', 'application/json');

         http.onreadystatechange = function() {
            //Call a function when the state changes.
            if (http.readyState == 4 && http.status == 200) {
               alert(http.responseText);
            }
         };
         http.send(params1);
      }
   });

   submitMusico.click(() => {
      if (formMusico[0].checkValidity()) {
         var dadosCadastro = {
            nome: nomeMusico.val(),
            senha: senhaMusico.val(),
            email: emailMusico.val(),
            estilo: estiloMusico.val(),
            tipo: tipoMusico.val(),
         };

         console.log(dadosCadastro);

         function reqListener() {
            console.log(this.responseText);
         }

         //  var oReq = new XMLHttpRequest();
         //  oReq.onload = reqListener;
         //  oReq.open("get", "http://localhost:8080/ashow/artista/all", true);
         //  oReq.send();

         var http = new XMLHttpRequest();
         var url = 'http://localhost:8080/ashow/contratante/add';
         var params1 = dadosCadastro;
         http.open('POST', url, true);

         //Send the proper header information along with the request
         http.setRequestHeader('Content-type', 'application/json');

         http.onreadystatechange = function() {
            //Call a function when the state changes.
            if (http.readyState == 4 && http.status == 200) {
               alert(http.responseText);
            }
         };
         http.send(params1);
      }
   });
};

init();

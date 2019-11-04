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
            "type": "contratante",
            "email": emailContratante.val(),
            "nome": nomeContratante.val(),
            "senha": senhaContratante.val(),
         };

         var http = new XMLHttpRequest();
         var url = 'http://localhost:8080/ashow/contratante/add';

         http.open('POST', url, true);
         http.setRequestHeader('Content-type', 'application/json');
         http.onreadystatechange = function () {
            if (http.readyState == 4 && http.status == 200) {
               console.log(http.responseText);
               if (http.responseText == "true") {
                  window.location.href = '../../index.html';
               }
            }
         };
         http.send(JSON.stringify(dadosCadastro));
      }
   });

   submitMusico.click(() => {
      if (formMusico[0].checkValidity()) {
         var dadosCadastroBase = {
            ID: null,
            email: emailMusico.val(),
            mediaAvaliacao: 0.0,
            nome: nomeMusico.val(),
            estilo: estiloMusico.val(),
            nomeArtistico: nomeMusico.val(),
            numeroEventos: 0,
            tipoArtista: tipoMusico.val(),
            valorPadrao: 0.0,
            popularidade: '',
            contatoPublico: emailMusico.val(),
            descricao: '',
            senha: senhaMusico.val(),
            endereco: '',
            eventos: null,
            avaliacoes: null,
         };

         var dadosCadastro = {
            type: 'artista',
            email: emailMusico.val(),
            nome: nomeMusico.val(),
            senha: senhaMusico.val(),
            estilo: estiloMusico.val(),
            nomeArtistico: nomeMusico.val(),
            tipoArtista: tipoMusico.val(),
         };

         console.log(dadosCadastro);

         var http = new XMLHttpRequest();
         var url = 'http://localhost:8080/ashow/artista/add';
         var params = dadosCadastro;

         http.open('POST', url, true);
         http.setRequestHeader('Content-type', 'application/json');
         http.onreadystatechange = () => {
            if (http.readyState == 4 && http.status == 200) {
               if (http.responseText == "true") {
                  window.location.href = '../../index.html';
               }
            }
         };
         http.send(JSON.stringify(params));
      }
   });
};

init();

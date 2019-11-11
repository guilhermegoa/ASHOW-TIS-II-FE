const AddArtista = () => {
   const formMusico = $('#form-musico');
   const nomeMusico = $('#nomeMusico');
   const senhaMusico = $('#senhaMusico');
   const emailMusico = $('#emailMusico');
   const estiloMusico = $('#estiloMusico');
   const tipoMusico = $('#tipoMusico');
   const submitMusico = $('#submitMusico');

   formMusico.on('submit', event => {
      event.preventDefault();
      if (formMusico[0].checkValidity()) {
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

         console.log(url);
         http.open('POST', url, true);
         http.setRequestHeader('Content-type', 'application/json');
         http.onreadystatechange = () => {
            if (http.readyState == 4 && http.status == 200) {
               if (http.responseText == 'true') {
                  alert('Artista Cadastrado');
                  window.location.href = '../../index.html';
               }
            }
         };
         http.send(JSON.stringify(dadosCadastro));
      }
   });
};

AddArtista();

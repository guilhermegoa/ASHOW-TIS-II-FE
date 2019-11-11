const AddEvento = () => {
   const form = $('#formEvent');
   const name = $('#name');
   const eventType = $('#eventType');
   const date = $('#date');
   const hours = $('#hours');
   const CEP = $('#CEP');
   const street = $('#street');
   const number = $('#number');
   const district = $('#district');
   const city = $('#city');
   const state = $('#state');
   const complement = $('#complement');
   const peopleQnt = $('#peopleQnt');
   const artistValue = $('#artistValue');
   const artistQnt = $('#artistQnt');
   const btnCadastrar = $('#cadastrarEventoBtn');

   CEP.change(() => {
      if (CEP.val().length >= 8) {
         $.getJSON('https://viacep.com.br/ws/' + CEP.val() + '/json/', function(
            dados,
         ) {
            street.prop('disabled', false);
            district.prop('disabled', false);
            city.prop('disabled', false);
            state.prop('disabled', false);
            if (!('erro' in dados)) {
               if (dados.logradouro != '') {
                  street.val(dados.logradouro);
                  street.prop('disabled', true);
               }
               if (dados.bairro != '') {
                  district.val(dados.bairro);
                  district.prop('disabled', true);
               }
               if (dados.localidade != '') {
                  city.val(dados.localidade);
                  city.prop('disabled', true);
               }
               if (dados.uf != '') {
                  state.val(dados.uf);
                  state.prop('disabled', true);
               }
            }
         });
      } else {
         street.prop('disabled', false);
         district.prop('disabled', false);
         city.prop('disabled', false);
         state.prop('disabled', false);
      }
   });

   form.on('submit', event => {
      event.preventDefault();

      if (form[0].checkValidity()) {
         var dadosCadastro = {
            capacidadeEsperada: peopleQnt.val(),
            data: date.val() + 'T' + hours.val(),
            endereco: {
               bairro: district.val(),
               cep: CEP.val(),
               cidade: city.val(),
               complemento: complement.val(),
               numero: number.val(),
               rua: street.val(),
               uf: state.val(),
            },
            estilo: eventType.val(),
            nome: name.val(),
            open: true,
            quantidadeArtistas: artistQnt.val(),
            valor: artistValue.val(),
         };
         console.log(dadosCadastro.quantidadeArtistas);

         var http = new XMLHttpRequest();
         var url = 'http://localhost:8080/ashow/evento/add';

         http.open('POST', url, true);
         http.setRequestHeader('Content-type', 'application/json');
         http.onreadystatechange = function() {
            if (http.readyState == 4 && http.status == 200) {
               // console.log(http.responseText);
               if (http.responseText == 'true') {
                  alert('Evento cadastrado');
                  window.location.href = './home.html';
               } else {
                  alert('Erro ao cadastrar o evento');
               }
            }
         };
         http.send(JSON.stringify(dadosCadastro));
      }
   });
};

AddEvento();

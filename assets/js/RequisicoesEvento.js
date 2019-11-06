const InitCadastroEvento = () => {
   const form = $("#formEvent");
   const name = $("#name");
   const eventType = $("#eventType");
   const date = $("#date");
   const CEP = $("#CEP");
   const street = $("#street");
   const number = $("#number");
   const district = $("#district");
   const city = $("#city");
   const state = $("#state");
   const complement = $("#complement");
   const peopleQnt = $("#peopleQnt");
   const artistValue = $("#artistValue");
   const btnCadastrar = $("#cadastrarEventoBtn");

   CEP.change(() => {
      if (CEP.val().length >= 8) {
         $.getJSON("https://viacep.com.br/ws/" + CEP.val() + "/json/", function(dados) {
            street.prop("disabled", false);
            district.prop("disabled", false);
            city.prop("disabled", false);
            state.prop("disabled", false);
            if (!("erro" in dados)) {
               if (dados.logradouro != "") {
                  street.val(dados.logradouro);
                  street.prop("disabled", true);
               }
               if (dados.bairro != "") {
                  district.val(dados.bairro);
                  district.prop("disabled", true);
               }
               if (dados.localidade != "") {
                  city.val(dados.localidade);
                  city.prop("disabled", true);
               }
               if (dados.uf != "") {
                  state.val(dados.uf);
                  state.prop("disabled", true);
               }
            }
         });
      } else {
         street.prop("disabled", false);
         district.prop("disabled", false);
         city.prop("disabled", false);
         state.prop("disabled", false);
      }
   });

   btnCadastrar.click(() => {
      if (form[0].checkValidity()) {
         var dadosCadastro = {
            name: name.val(),
            eventType: eventType.val(),
            date: date.val(),
            CEP: CEP.val(),
            street: street.val(),
            number: number.val(),
            district: district.val(),
            city: city.val(),
            state: state.val(),
            complement: complement.val(),
            peopleQnt: peopleQnt.val(),
            artistValue: artistValue.val(),
         };

         console.log(dadosCadastro);

         $.ajax({
            url: "http://localhost/json/teste.php",
            type: "POST",
            data: dadosCadastro,
            dataType: "json",
            beforeSend: function() {
               alert("carregando...");
            },
         })
            .done(function() {
               alert("Enviado");
            })
            .fail(function() {
               alert("error");
            })
            .always(function() {
               alert("complete");
            });
      }
   });
};

InitCadastroEvento();

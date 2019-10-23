const cadastroEventoInit = () => {
   const formEvent = document.getElementById('formEvent');
   const name = document.getElementById('name');
   const eventType = document.getElementById('eventType');
   const date = document.getElementById('date');
   const CEP = document.getElementById('CEP');
   const street = document.getElementById('street');
   const number = document.getElementById('number');
   const district = document.getElementById('district');
   const city = document.getElementById('city');
   const state = document.getElementById('state');
   const complement = document.getElementById('complement');
   const peopleQnt = document.getElementById('peopleQnt');
   const artistValue = document.getElementById('artistValue');
   const cadastrarEventoBtn = document.getElementById('cadastrarEventoBtn');

   cadastrarEventoBtn.addEventListener('click', () => {
      var x = name.value;
      console.log('oi');
   });
};

cadastroEventoInit();

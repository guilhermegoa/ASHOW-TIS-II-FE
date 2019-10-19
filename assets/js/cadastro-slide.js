const slidemusico = () => {
   const btn_musico = document.getElementById('btn-musico');
   const form_musico = document.getElementById('form-musico');
   const tela_musico = document.getElementById('musico');

   btn_musico.addEventListener('click', () => {
      form_musico.classList.toggle('form-active');
      tela_musico.classList.toggle('musico-active');
   });
};

const slidecontratante = () => {
   const btn_musico = document.getElementById('btn-contratante');
   const form_musico = document.getElementById('form-contratante');
   const tela_contratante = document.getElementById('contratante');

   btn_musico.addEventListener('click', () => {
      form_musico.classList.toggle('form-active');
      tela_contratante.classList.toggle('contratante-active');
   });
};

slidemusico();
slidecontratante();

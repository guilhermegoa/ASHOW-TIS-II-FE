const slidemusico = () => {
   const btn_musico = document.getElementById('btn-musico');
   const form_musico = document.getElementById('form-musico');

   btn_musico.addEventListener('click', () => {
      form_musico.classList.toggle('form-musico');
   });
};

const slidecontratante = () => {
   const btn_musico = document.getElementById('btn-contratante');
   const form_musico = document.getElementById('form-contratante');

   btn_musico.addEventListener('click', () => {
      form_musico.classList.toggle('form-contratante');
   });
};

slidemusico();
slidecontratante();

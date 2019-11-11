const slidemusico = () => {
   const btn_musico = document.getElementById('btn-musico');
   const form_musico = document.getElementById('form-musico');
   const tela_musico = document.getElementById('musico');
   const tela_contratante = document.getElementById('contratante');
   const aux = document.getElementById('div-contratante');
   var troca = new Boolean(true);

   btn_musico.addEventListener('click', () => {
      form_musico.classList.toggle('form-active');
      tela_musico.classList.toggle('musico-active');
      tela_contratante.classList.toggle('contratante-active');
      aux.classList.toggle('off');

      if (troca) {
         btn_musico.textContent = `Clique para cancelar`;
         troca = false;
      } else {
         btn_musico.textContent = `Cadastrar como Músico`;
         troca = true;
      }
   });
};

const slidecontratante = () => {
   const btn_contratante = document.getElementById('btn-contratante');
   const form_contratante = document.getElementById('form-contratante');
   const tela_contratante = document.getElementById('contratante');
   const tela_musico = document.getElementById('musico');
   const aux = document.getElementById('div-musico');
   var troca = new Boolean(true);

   btn_contratante.addEventListener('click', () => {
      form_contratante.classList.toggle('form-active');
      tela_contratante.classList.toggle('contratante-active');
      tela_musico.classList.toggle('musico-active');
      aux.classList.toggle('off');

      if (troca) {
         btn_contratante.textContent = `Clique para cancelar`;
         troca = false;
      } else {
         btn_contratante.textContent = `Cadastrar como Contratante`;
         troca = true;
      }
   });
};

slidemusico();
slidecontratante();

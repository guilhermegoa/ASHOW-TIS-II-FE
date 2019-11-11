// Filter
// Valor dentro do filtro

let filtroInput = document.getElementById('filtroInput');

//Evento keyup
filtroInput.addEventListener('keyup', filtrarVaga);

function filtrarVaga() {
   let valorInput = document.getElementById('filtroInput').value.toUpperCase();
   let main = document.getElementById('card');
   let lista = main.querySelectorAll('h2.nomeEvento');
   let cards = main.querySelectorAll('a.cardEventos');
   let qnt = 0;

   for (let i = 0; i < lista.length; i++) {
      let h3 = lista[i].innerHTML;

      if (h3.toUpperCase().indexOf(valorInput) > -1) {
         cards[i].style.display = '';
         qnt++;
      } else {
         cards[i].style.display = 'none';
      }
   }
   if (qnt == 0) {
      let na = document.getElementById('void');
      na.style.display = 'block';
      let acabou = document.getElementById('NA');
      acabou.style.display = 'block';
      document.getElementById('titleHome').style.display = 'none';
   } else if (qnt <= 6) {
      let na = document.getElementById('void');
      na.style.display = 'block';
      let acabou = document.getElementById('NA');
      acabou.style.display = 'none';
      document.getElementById('titleHome').style.display = 'block';
   } else {
      let na = document.getElementById('void');
      na.style.display = 'none';
      document.getElementById('titleHome').style.display = 'block';
   }
}

{
   /* <script>
const emailLog = $('#emailLog');
const senhaLog = $('#senhaLog');
const tryLog = $('#tryLog');

tryLog.click(() => {
   var dadosTry = senhaLog.val();

   var http = new XMLHttpRequest();
   var url =
      'http://localhost:8080/ashow/artista/' + emailLog.val();
   var resposta;

   http.open('POST', url, true);
   http.setRequestHeader('Content-type', 'text/plain');
   http.onreadystatechange = function() {
      if (http.readyState == 4 && http.status == 200) {
         resposta = http.responseText;
         window.location.href =
            './asset/pages/home.html' + emailLog.val();
      }
   };
   http.send(dadosTry);
});
</script> */
}

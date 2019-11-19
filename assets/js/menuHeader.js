
const getUsuarioAtual = async email => await (await fetch(`http://localhost:8080/ashow/${sessionStorage.getItem("type")}/${sessionStorage.getItem("email")}`)).json();

(async () => {
   let dados = await getUsuarioAtual()

   let htmlTexto = ``;
   //         <div class="imagem" id="imagem"> <div> <img src="../assets/img/default.jpg" alt="" /> </div> </div>

   htmlTexto += `
      <button class="dropbtn">
         <i class="fas fa-user fa-2x"></i> ${dados.nome}
         <i class="fa fa-chevron-up rotate"></i>
      </button>`;
   if(sessionStorage.getItem("type") == "artista"){
      htmlTexto+=`
      <div class="dropdown-content">
         <a href="./artista.html?idArt=${dados.email}">Perfil</a>
         <a href="./artistas.html">Ver Artistas</a>
         <div id="logOut"><a href="../index.html" >Logout</a></div>
      </div>`;
   } else {
      htmlTexto+=`
         <div class="dropdown-content">
            <a href="./perfilContratante.html">Perfil</a>
            <a href="cadastrarEvento.html">Criar Evento</a>
            <div id="logOut"><a href="../index.html" >Logout</a></div>
         </div>`;
   }

   document.getElementById('user-menu').innerHTML = htmlTexto;

})();



const getUsuarioAtual = async email => await (await fetch(`http://localhost:8080/ashow/${sessionStorage.getItem("type")}/${sessionStorage.getItem("email")}`)).json();

(async () => {
   let dados = await getUsuarioAtual()

   console.log(dados)
   let htmlTexto = ``;
   //         <div class="imagem" id="imagem"> <div> <img src="../assets/img/default.jpg" alt="" /> </div> </div>

   htmlTexto += `
      <section id="logo">
      <a href="../pages/home.html"
         ><img src="../assets/img/ashowLogoTextWhite.png" alt="logo"
      /></a>
   </section>
   <section id="search">
      <input id="filtroInput" type="text" placeholder="Buscar..." />
      <button type="submit">
         <i class="fas fa-search fa-2x"></i>
      </button>
   </section>
   <section id="user-menu">
      <button class="dropbtn">
         <i class="fas fa-user fa-2x"></i>${dados.nome}
         <i class="fa fa-chevron-up rotate"></i>
      </button>`;
   if(sessionStorage.getItem("type") == "artista"){
      htmlTexto+=`
      <div class="dropdown-content">
         <a href="./perfilArtista.html">Perfil</a>
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

   htmlTexto+=`
   </section>
   <section id="notification">
      <a href="#">
         <i class="fas fa-bell fa-2x"> <div class="circle"></div> </i
      ></a>
   </section>
         `;

   if(sessionStorage.getItem("type") == "artista") {

   }

   document.getElementById('header').innerHTML = htmlTexto;
})();

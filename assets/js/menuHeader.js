const getUsuarioAtual = async email =>
  await (await fetch(
    `http://localhost:8080/ashow/${sessionStorage.getItem(
      "type"
    )}/${sessionStorage.getItem("email")}`
  )).json();

(async () => {
  let dados = await getUsuarioAtual();

  let htmlTexto = `<img src="${dados.dataUriFoto}" alt="" />`;

  document.getElementById("imgUser").innerHTML = htmlTexto;

  htmlTexto = `<p> ${dados.nome}</p>`;

  document.getElementById("nome").innerHTML = htmlTexto;

  htmlTexto = ``;

  if (sessionStorage.getItem("type") == "artista") {
    htmlTexto += `
      <ul>
      <li><a href="./new-home.html">Eventos</a></li>
      <li><a href="/pages/artistas.html">Artistas</a></li>
      <li><a href="#">Link 1</a></li>
      <li><a href="../pages/sobrenos.html">Sobre Nos</a></li>
      <li id="logOut"><a href="../index.html">Logout</a></li>
      </ul>`;
  } else {
    htmlTexto += `
       <ul ">
        <li><a href="./new-home.html">Eventos</a></li>
        <li><a href="cadastrarEvento.html">Criar Evento</a></li>
        <li><a href="/pages/meusEventos.html">Meus eventos</a></li>
        <li><a href="/pages/artistas.html">Artistas</a></li>
        <li><a href="#">Link 1</a></li>
        <li><a href="../pages/sobrenos.html">Sobre Nos</a></li>
        <li id="logOut"><a href="../index.html">Logout</a></li>
        </ul>`;
  }

  document.getElementById("lista-nav").innerHTML = htmlTexto;
})();

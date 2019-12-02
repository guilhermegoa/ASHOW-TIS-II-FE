function perfil() {

  let htmltexto = ``;

  if (sessionStorage.getItem('type') == 'contratante') {

    htmltexto = `
    <div id="ed-perfil" data-modal="abrir">
    <form action="">
      <div class="input-field">
        <label for="">Foto de perfil</label>
        <input type="file" id="formImagemContratante" />
      </div>
      <div class="input-field">
        <label for="">Nome</label>
        <input type="Name" id="nomeContratante"  />
      </div>
      <div class="input-field">
        <label for="">Email</label>
        <input type="email" id="emailContratante"  />
      </div>
      <input type="submit" value="Update" id="perfil" onClick="atualiza()"/>
    </form>
    </div>`

    document.getElementById("info").innerHTML = htmltexto;
  } else {
    htmltexto = `
  <div id="ed-perfil" data-modal="abrir">
    <div class="input-field">
      <label for="">Foto de perfil</label>
      <input type="file" id="formImagemMusico" />
    </div>
    <div class="input-field">
      <label for="">Nome</label>
      <input type="text" id="nomeMusico"  />
    </div>
    <div class="input-field">
    <label for="">Email</label>

      <input type="email" id="emailMusico"  />
    </div>
    <div class="input-field">
      <label for="">Estilo Musical</label>
      <input type="text" id="estiloMusico" />
    </div>
    <div class="input-field">
      <label for="">Tipo de Músico</label>
      <input
        required
        type="text"
        placeholder="Ex: Banda, Solo, Dj..."
        id="tipoMusico"
      />
    </div>
    <input type="submit" value="Update" id="perfil" onClick="atualiza()"/>
  </div>
  `
    document.getElementById("info").innerHTML = htmltexto;
  }

}


function atualiza() {
  console.log('passei')
  const imgContratante = $('#formImagemContratante').value;
  const nomeContratante = $('#nomeContratante').value;
  const emailContratante = $('#emailContratante').value;
  console.log(nomeContratante, emailContratante)


  const imgMusico = $('#formImagemMusico').value;
  const nomeMusico = $("#nomeMusico").value;
  const emailMusico = $("#emailMusico").value;
  const estiloMusico = $("#estiloMusico").value;
  const tipoMusico = $("#tipoMusico").value;

  if (sessionStorage.getItem('type') == 'contratante') {
    const aux = fetch(`http://localhost:8080/ashow/contratante/${sessionStorage.getItem('email')}`).then(e => e.json());
    if (aux.dataUriFoto === imgContratante) imgContratante = aux.dataUriFoto;
    if (aux.nome === nomeContratante) imgContratante = aux.dataUriFoto;
    if (aux.email === emailContratante) imgContratante = aux.dataUriFoto;

    let dados = {
      type: aux.type,
      ID: aux.ID,
      avaliacoes: aux.avaliacoes,
      dataUriFoto: imgContratante,
      email: emailContratante,
      eventos: [],
      mediaAvaliacao: aux.mediaAvaliacao,
      nome: nomeContratante,
      senha: aux.senha,
    }

    async () =>
      await fetch(`http://localhost:8080/ashow/contratante/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dados),
      });

  } else {
    const aux = fetch(`http://localhost:8080/ashow/artista/${sessionStorage.getItem('email')}`).then(e => e.json());
    if (imgMusico === aux.dataUriFoto) imgMusico = aux.dataUriFoto;
    if (nomeMusico === aux.nome) imgMusico = aux.dataUriFoto;
    if (emailMusico === aux.email) imgMusico = aux.dataUriFoto;
    if (estiloMusico === aux.estilo) imgMusico = aux.dataUriFoto;
    if (tipoMusico === aux.tipoArtista) imgMusico = aux.dataUriFoto;

    let dados = {
      type: aux.type,
      ID: aux.ID,
      avaliacoes: aux.avaliacoes,
      dataUriFoto: "data:image/png;base64,iV…5NCcgQAAAABJRU5ErkJggg==",
      email: emailMusico,
      eventos: aux.eventos,
      mediaAvaliacao: aux.mediaAvaliacao,
      nome: nomeMusico,
      senha: aux.senha,
      estilo: estiloMusico,
      nomeArtistico: aux.nomeArtistico,
      numeroEventos: 0,
      tipoArtista: aux.tipoArtista,
      valorPadrao: aux.valorPadrao,
    }

    async () =>
      await fetch(`http://localhost:8080/ashow/artista/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dados),
      });
  }
}


// function initModal() {
//   const botaoAbrir = document.querySelectorAll('[data-modal="abrir"]');
//   const botaoFechar = document.querySelector('[data-modal="fechar"]');
//   const containerModal = document.querySelector('[data-modal="container"]');

//   if (botaoAbrir && botaoFechar && containerModal) {
//     function toggleModal(event) {
//       event.preventDefault();
//       containerModal.classList.toggle("ativo");
//     }
//     function cliqueForaModal(event) {
//       if (event.target === this) {
//         toggleModal(event);
//       }
//     }

//     botaoAbrir.forEach(e => {
//       e.addEventListener("click", toggleModal);
//     });

//     botaoFechar.addEventListener("click", toggleModal);
//     containerModal.addEventListener("click", cliqueForaModal);
//   }
// }

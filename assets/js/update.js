function perfil() {
  fetch(
    `http://localhost:8080/ashow/${sessionStorage.getItem(
      "type"
    )}/${sessionStorage.getItem("email")}`
  ).then(e =>
    e.json().then(user => {
      let htmltexto = ``;

      if (user.type == "contratante") {
        htmltexto = `
      <form action="" id="ed-perfil">
        <div class="input-field">
          <label for="">Foto de perfil</label>
          <input required type="file" id="formImagemContratante" />
        </div>
        <div class="input-field">
          <label for="">Nome</label>
          <input required type="Name" id="nomeContratante" value="${user.nome}" />
        </div>
        <input type="submit" value="Update" id="perfil" onClick="atualiza('${user.email}')"/>
      </form>`;

        document.getElementById("info").innerHTML = htmltexto;

        let imgSubmitContratante = document.getElementById(
          "formImagemContratante"
        );
        imgSubmitContratante.addEventListener("change", loadimage, false);
        const nomeContratante = $("#nomeContratante").value;
      } else {
        htmltexto = `
    <form action="" id="ed-perfil">
      <div class="input-field">
        <label for="">Foto de perfil</label>
        <input required type="file" id="formImagemMusico" value="${user.dataUriFoto}" />
      </div>
      <div class="input-field">
        <label for="">Nome</label>
        <input required type="text" id="nomeMusico" value="${user.nome}" />
      </div>
      <div class="input-field">
        <label for="">Nome Artístico</label>
        <input required type="text" id="nomeArtistico" value="${user.nomeArtistico}" />
      </div>
      <div class="input-field">
        <label for="">Estilo Musical</label>
        <input required type="text" id="estiloMusico" value="${user.estilo}" />
      </div>
      <div class="input-field">
        <label for="">Tipo de Músico</label>
        <input
          required
          type="text"
          placeholder="Ex: Banda, Solo, Dj..."
          id="tipoMusico"
          value="${user.tipoArtista}"
        />
      </div>
      <input type="submit" value="Update" id="perfil" onClick="atualiza('${user.email}')"/>
    </form>
    `;
        document.getElementById("info").innerHTML = htmltexto;

        let formImagemMusico = document.getElementById("formImagemMusico");
        formImagemMusico.addEventListener("change", loadimage, false);

        const nomeMusico = $("#nomeMusico").value;
        const nomeArtistico = $("#nomeArtistico").value;
        const estiloMusico = $("#estiloMusico").value;
        const tipoMusico = $("#tipoMusico").value;
      }
    })
  );
}

function atualiza() {
  console.log("passei");

  if (sessionStorage.getItem("type") == "contratante") {
    fetch(
      `http://localhost:8080/ashow/contratante/${sessionStorage.getItem(
        "email"
      )}`
    ).then(resp => {
      resp.json().then(contratante => {
        let img = localStorage.getItem("imgAtual");
        if (img != null)
          contratante.dataUriFoto = localStorage.getItem("imgAtual");
        contratante.nome = nomeContratante.value;
        console.log(contratante);
        fetch(`http://localhost:8080/ashow/contratante/update`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(contratante)
        }).then(() => location.reload());
      });
    });
  } else {
    const aux = fetch(
      `http://localhost:8080/ashow/artista/${sessionStorage.getItem("email")}`
    ).then(e =>
      e.json().then(arts => {
        arts.dataUriFoto = localStorage.getItem("imgAtual");
        arts.nome = nomeMusico.value;
        arts.nomeArtistico = nomeArtistico.value;
        arts.estilo = estiloMusico.value;
        arts.tipoArtista = tipoMusico.value;

        fetch(`http://localhost:8080/ashow/artista/update`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(arts)
        }).then(e => e.text().then(t => console.log(t)));
      })
    );
  }
}

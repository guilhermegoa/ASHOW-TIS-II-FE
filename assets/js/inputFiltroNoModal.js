function filtroNoModal() {
  let filtroHTML = `
  <section>
    Estilo:
    <input id="estiloInput" class="string" type="text" />
  </section>
  <section>
    Cidade:
    <input id="cidadeInput" class="string" type="text" />
  </section>
  <div class="price-slider">
    <span
      >De
      <input
        class="numero"
        id="numeroMin"
        type="number"
        value="0"
        min="0"
        max="1000"
        placeholder="Cidade"/>
      Até
      <input
        class="numero"
        id="numeroMax"
        type="number"
        value="0"
        min="0"
        max="1000"
        placeholder="Estilo"
    /></span>
    <input
      id="rangeMin"
      value="25000"
      min="0"
      max="1000"
      step="20"
      type="range"
      placeholder="Preço mínimo"
    />
    <input
      id="rangeMax"
      value="50000"
      min="0"
      max="1000"
      step="20"
      type="range"
      placeholder="Preço máximo"
    />
  </div>
  <div class="btns">
    <button id="filtrador" onclick="filtrar()">Filtrar</button>
  </div>`;
  document.getElementById("info").innerHTML = filtroHTML;
}

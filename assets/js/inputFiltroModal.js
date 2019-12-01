function filtroNoModal() {
  let filtroHTML = `
  <input class="string" type="text" />
  <input class="string" type="text" />
  <div class="price-slider">
    <span
      >De
      <input
        class="numero"
        id="numero"
        type="number"
        value="0"
        min="0"
        max="1000"/>
      Até
      <input
        class="numero"
        id="numero"
        type="number"
        value="0"
        min="0"
        max="1000"
    /></span>
    <input value="25000" min="0" max="1000" step="20" type="range" />
    <input value="50000" min="0" max="1000" step="20" type="range" />
  </div>
  <button id="filtrador">Filtrar</button>
  <button id="recomendador">Recomendações</button>`;
  document.getElementById("info").innerHTML = filtroHTML;
}

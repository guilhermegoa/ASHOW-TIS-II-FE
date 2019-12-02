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

  $("#filtroBtn").click(function () {
    $("#filtro-modal").toggle();
  });

  $("#fechar-modal-filtro").click(function () {
    $("#filtro-modal").toggle();
  });

  (function () {
    var parent = document.querySelector(".price-slider");
    if (!parent) return;

    var rangeS = parent.querySelectorAll("input[type=range]"),
      numberS = parent.querySelectorAll("input[type=number]");

    rangeS.forEach(function (el) {
      el.oninput = function () {
        var slide1 = parseFloat(rangeS[0].value),
          slide2 = parseFloat(rangeS[1].value);

        if (slide1 > slide2) {
          [slide1, slide2] = [slide2, slide1];
        }

        numberS[0].value = slide1;
        numberS[1].value = slide2;
      };
    });

    numberS.forEach(function (el) {
      el.oninput = function () {
        var number1 = parseFloat(numberS[0].value),
          number2 = parseFloat(numberS[1].value);

        if (number1 > number2) {
          var tmp = number1;
          numberS[0].value = number2;
          numberS[1].value = tmp;
        }

        rangeS[0].value = number1;
        rangeS[1].value = number2;
      };
    });
  })();
  mostraTodosNaHome();
}

function filtrar() {
  const estilo = document.getElementById("estiloInput");
  const cidade = document.getElementById("cidadeInput");
  const min = document.getElementById("numeroMin");
  const max = document.getElementById("numeroMax");
  const reqMin = min.value;
  const reqMax = max.value;
  let reqEs;
  if (estilo.value == "") {
    reqEs = "@";
  } else {
    reqEs = estilo.value;
  }
  let reqCid;
  if (cidade.value == "") {
    reqCid = "@";
  } else {
    reqCid = cidade.value;
  }

  window.location.href =
    "./new-home.html?idRed=1&estilo=" +
    reqEs +
    "&local=" +
    reqCid +
    "&min=" +
    reqMin +
    "&max=" +
    reqMax;
}

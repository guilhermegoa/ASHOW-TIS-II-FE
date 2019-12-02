const mostraTodosNaHome = () => {
  var http = new XMLHttpRequest();
  var url = "http://localhost:8080/ashow/indicador/get";
  console.log(url);

  http.open("GET", url, true);
  http.setRequestHeader("Content-type", "application/json");
  http.onreadystatechange = function() {
    if (http.readyState == 4 && http.status == 200) {
      var dados = http.responseText;
      dados = JSON.parse(dados);
      const art = dados.art;
      const cont = dados.cont;
      const even = dados.even;
      const evenT = dados.valorEvento;
      let soma = art + cont;
      let media = (art * 100) / soma;
      document.getElementById("percentual").textContent = media;
      document.getElementById("qntcont").textContent = cont;
      document.getElementById("qntart").textContent = art;
      document.getElementById("qntev").textContent = even;
      let mediaEv = evenT / even;
      document.getElementById("valev").textContent = mediaEv;
      document.getElementById("evpart").textContent = even / art;
    }
  };
  http.send();
};

mostraTodosNaHome();

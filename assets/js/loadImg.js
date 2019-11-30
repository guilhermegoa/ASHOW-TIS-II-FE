let imgAtual;

function imageHandler(e2) {
  imgAtual = e2.target.result;
  localStorage.setItem("imgAtual", imgAtual);
}

function loadimage(e1) {
  var filename = e1.target.files[0];
  var fr = new FileReader();
  fr.onload = imageHandler;
  fr.readAsDataURL(filename);
}

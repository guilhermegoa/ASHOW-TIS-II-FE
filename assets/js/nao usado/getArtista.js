const getArtista = async email => await (await fetch(`http://localhost:8080/ashow/artista/${email}`)).json();

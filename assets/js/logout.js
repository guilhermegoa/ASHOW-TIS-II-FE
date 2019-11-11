const deslog = () => {
   const logOut = $('#logOut');

logOut.on("click",() => {
   sessionStorage.clear();
   window.location.href = '../index.html';
});
}

deslog();

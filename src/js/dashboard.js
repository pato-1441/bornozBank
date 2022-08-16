const user = JSON.parse(localStorage.getItem('usuario'));

const loggedUser = document.getElementById('loggedUser');

loggedUser.innerHTML=`${user.username}`;

const btnLogOut = document.getElementById('btnLogOut');
btnLogOut.addEventListener('click',logOut);

function logOut(){
    localStorage.removeItem('usuario');
    window.location.href='./index.html';
}
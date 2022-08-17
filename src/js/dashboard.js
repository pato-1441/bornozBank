//Traigo del localStorage
const user = JSON.parse(localStorage.getItem('usuario'));
//Seleccion del DOM el User que inició sesion
const loggedUser = document.getElementById('loggedUser');
//Le asigno la variable para mostrarla en el DOM
loggedUser.innerHTML=`${user.username}`;

//Boton de LogOut
const btnLogOut = document.getElementById('btnLogOut');
btnLogOut.addEventListener('click',logOut);

function logOut(){
    //Elimino el localStorage antes de irme
    //localStorage.removeItem('usuario');
    localStorage.clear();
    window.location.href='./index.html';
}

// muestro balance ars en dashboard
const balanceARSTxt = document.getElementById('balanceARSTxt');
let usuarioBalanceARS = JSON.parse(localStorage.getItem('usuarioBalanceARS'))
balanceARSTxt.innerHTML=`${usuarioBalanceARS}`

// botones balance en pesos
const inputRetirarARSConfirmar = document.getElementById('inputRetirarARSConfirmar');
const btnRetirarARSConfirmar = document.getElementById('btnRetirarARSConfirmar');
btnRetirarARSConfirmar.addEventListener('click',retirarARS);

function retirarARS(){
    if(inputRetirarARSConfirmar.value>0&&inputRetirarARSConfirmar.value<=usuarioBalanceARS){
        usuarioBalanceARS = (usuarioBalanceARS)-(inputRetirarARSConfirmar.value);
        localStorage.setItem('usuarioBalanceARS', JSON.stringify(usuarioBalanceARS));
        balanceARSTxt.innerHTML=`${usuarioBalanceARS}`;
        inputRetirarARSConfirmar.value = '';
        window.location.href='./dashboard.html';
    } else {
        alert('Error');
    }
}

const inputDepositarARSConfimar = document.getElementById('inputDepositarARSConfirmar');
const btnDepositarARS = document.getElementById('btnDepositarARS');
btnDepositarARSConfirmar.addEventListener('click',depositarARS);

function depositarARS(){
    if(inputDepositarARSConfirmar.value>1){
        debugger
        let balanceARSDepositado = (parseInt(inputDepositarARSConfirmar.value));
        usuarioBalanceARS = parseInt(balanceARSDepositado+JSON.parse(usuarioBalanceARS));
        localStorage.setItem('usuarioBalanceARS', JSON.stringify(usuarioBalanceARS));
        balanceARSTxt.innerHTML=`${usuarioBalanceARS}`
        inputDepositarARSConfirmar.value = '';
        window.location.href='./dashboard.html';
    } else {
        alert('Error');
    }
}

//fin botones pesos

// muestro balance usd en dashboard
const balanceUSDTxt = document.getElementById('balanceUSDTxt');
balanceUSDTxt.innerHTML=`${JSON.parse(localStorage.getItem('usuarioBalanceUSD'))}`

// botones balance en dolares
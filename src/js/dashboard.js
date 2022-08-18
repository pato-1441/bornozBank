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
        const loadingRetirar = document.getElementById('loadingRetirar');
        loadingRetirar.classList.remove('hidden');
        setTimeout(function(){
            window.location.href='./dashboard.html';;
        }, 2500); 
    } else {
        const alertRetirarError=document.getElementById('alertRetirarError');
        alertRetirarError.classList.remove('hidden');
        setTimeout(function(){
            alertRetirarError.classList.add('hidden');
        }, 5000); 
    }
}

const inputDepositarARSConfimar = document.getElementById('inputDepositarARSConfirmar');
const btnDepositarARS = document.getElementById('btnDepositarARS');
btnDepositarARSConfirmar.addEventListener('click',depositarARS);

function depositarARS(){
    if(inputDepositarARSConfirmar.value>1){
        let balanceARSDepositado = (parseInt(inputDepositarARSConfirmar.value));
        usuarioBalanceARS = parseInt(balanceARSDepositado+JSON.parse(usuarioBalanceARS));
        localStorage.setItem('usuarioBalanceARS', JSON.stringify(usuarioBalanceARS));
        balanceARSTxt.innerHTML=`${usuarioBalanceARS}`
        inputDepositarARSConfirmar.value = '';
        window.location.href='./dashboard.html';
    } else {
        const alertDepositarError=document.getElementById('alertDepositarError');
        alertDepositarError.classList.remove('hidden');
        setTimeout(function(){
            alertDepositarError.classList.add('hidden');
        }, 7000); 
    }
}

//fin botones pesos

// muestro balance usd en dashboard
const balanceUSDTxt = document.getElementById('balanceUSDTxt');
let usuarioBalanceUSD = JSON.parse(localStorage.getItem('usuarioBalanceUSD'));
balanceUSDTxt.innerHTML=`${usuarioBalanceUSD}`;

// botones balance en dolares
const inputRetirarUSDConfirmar = document.getElementById('inputRetirarUSDConfirmar');
const btnRetirarUSDConfirmar = document.getElementById('btnRetirarUSDConfirmar');
btnRetirarUSDConfirmar.addEventListener('click',retirarUSD);

function retirarUSD(){
    if(inputRetirarUSDConfirmar.value>0&&inputRetirarUSDConfirmar.value<=usuarioBalanceUSD){
        usuarioBalanceUSD = (usuarioBalanceUSD)-(inputRetirarUSDConfirmar.value);
        localStorage.setItem('usuarioBalanceUSD', JSON.stringify(usuarioBalanceUSD));
        balanceUSDTxt.innerHTML=`${usuarioBalanceUSD}`;
        inputRetirarUSDConfirmar.value = '';
        const loadingRetirarUSD = document.getElementById('loadingRetirarUSD');
        loadingRetirarUSD.classList.remove('hidden');
        setTimeout(function(){
            window.location.href='./dashboard.html';;
        }, 2500); 
    } else {
        const alertRetirarErrorUSD=document.getElementById('alertRetirarErrorUSD');
        alertRetirarErrorUSD.classList.remove('hidden');
        setTimeout(function(){
            alertRetirarErrorUSD.classList.add('hidden');
        }, 5000); 
    }
}


/*
const inputDepositarARSConfimar = document.getElementById('inputDepositarARSConfirmar');
const btnDepositarARS = document.getElementById('btnDepositarARS');
btnDepositarARSConfirmar.addEventListener('click',depositarARS);
*/

const inputDepositarUSDConfirmar = document.getElementById('inputDepositarUSDConfirmar');
const btnDepositarUSDConfirmar = document.getElementById('btnDepositarUSDConfirmar');
btnDepositarUSDConfirmar.addEventListener('click',depositarUSD);

function depositarUSD(){
    if(inputDepositarUSDConfirmar.value>1){
        let balanceUSDDepositado = (parseInt(inputDepositarUSDConfirmar.value));
        usuarioBalanceUSD = parseInt(balanceUSDDepositado+JSON.parse(usuarioBalanceUSD));
        localStorage.setItem('usuarioBalanceUSD', JSON.stringify(usuarioBalanceUSD));
        balanceUSDTxt.innerHTML=`${usuarioBalanceUSD}`
        inputDepositarUSDConfirmar.value = '';
        window.location.href='./dashboard.html';
    } else {
        const alertDepositarErrorUSD=document.getElementById('alertDepositarErrorUSD');
        alertDepositarErrorUSD.classList.remove('hidden');
        setTimeout(function(){
            alertDepositarErrorUSD.classList.add('hidden');
        }, 7000); 
    }
}
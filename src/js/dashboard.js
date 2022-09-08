//Traigo del localStorage
const user = JSON.parse(localStorage.getItem('usuario'));
//Seleccion del DOM el User que inició sesion
const loggedUser = document.getElementById('loggedUser');
//Le asigno la variable para mostrarla en el DOM
loggedUser.innerHTML=`${user.username}`;

//Boton de LogOut
const btnLogOut = document.getElementById('btnLogOut');
btnLogOut.addEventListener('click',()=>{logOut()});

const logOut=()=>{
    //Elimino el localStorage antes de irme
    //localStorage.removeItem('usuario');
    localStorage.clear();
    window.location.href='./index.html';
}

// Contactos
class Contact{
    constructor(id,contactFullname,contactCBU,contactAlias){
        this.id = id;
        this.contactFullname = contactFullname;
        this.contactCBU = contactCBU;
        this.contactAlias = contactAlias;
    }
}

//si el usuario existe le genero unos contactos por default
//user.username === user.username ? generadorContactos() : loggedUser.innerHTML=`Sesión no iniciada`;

const refreshSite=()=>{
    window.location.href='./dashboard.html';
}

// muestro balance ars en dashboard
const balanceARSTxt = document.getElementById('balanceARSTxt');
let usuarioBalanceARS = JSON.parse(localStorage.getItem('usuarioBalanceARS'))
balanceARSTxt.innerHTML=`${usuarioBalanceARS}`

// botones balance en pesos
const inputRetirarARSConfirmar = document.getElementById('inputRetirarARSConfirmar');
const btnRetirarARSConfirmar = document.getElementById('btnRetirarARSConfirmar');
btnRetirarARSConfirmar.addEventListener('click',()=>{retirarARS()});

// movimientos
class MovimientoBancario{
    constructor(id,movimiento,fecha,debe,haber,saldo) {
        this.id = id;
        this.movimiento = movimiento;
        this.fecha = fecha;
        this.debe = debe;
        this.haber = haber;
        this.saldo = saldo;
    }
}

let movimientosARS = JSON.parse(localStorage.getItem('movimientosUsuarioARS'));
let movimientosUSD = JSON.parse(localStorage.getItem('movimientosUsuarioUSD'));

const retirarARS=()=>{
    let total = parseInt(JSON.parse(localStorage.getItem('usuarioBalanceARS')));
    let generadorID = parseInt(Math.random()*1000);
    if(inputRetirarARSConfirmar.value>0&&inputRetirarARSConfirmar.value<=total){
        let balanceARSRetirado = (parseInt(inputRetirarARSConfirmar.value));
        total = total-balanceARSRetirado;
        fechaFormateo= new Date();
        fecha = `${(fechaFormateo.getDate()).toString()+'/'+
                  (fechaFormateo.getMonth()+1).toString()+'/'+
                  (fechaFormateo.getFullYear())+' '+
                  (fechaFormateo.toLocaleTimeString())}`;
        let movimiento = new MovimientoBancario(generadorID,'retiro',fecha,balanceARSRetirado,0,total)
        movimientosARS.push(movimiento);        
        localStorage.setItem('movimientosUsuarioARS',JSON.stringify(movimientosARS));
        localStorage.setItem('usuarioBalanceARS', JSON.stringify(total));
        balanceARSTxt.innerHTML=`${total}`
        inputRetirarARSConfirmar.value = '';
        const loadingRetirar = document.getElementById('loadingRetirar');
        loadingRetirar.classList.remove('hidden');
        refreshSite();
        setTimeout(function(){
            window.location.href='./dashboard.html';
        }, 500);
    } else {
        const alertRetirarError=document.getElementById('alertRetirarError');
        alertRetirarError.classList.remove('hidden');
        setTimeout(function(){
            alertRetirarError.classList.add('hidden');
        }, 5000); 
    }
}

const inputDepositarARSConfirmar = document.getElementById('inputDepositarARSConfirmar');
const btnDepositarARS = document.getElementById('btnDepositarARS');
btnDepositarARSConfirmar.addEventListener('click',()=>{depositarARS()});

const depositarARS=()=>{
    let total = parseInt(JSON.parse(localStorage.getItem('usuarioBalanceARS')));
    let generadorID = parseInt(Math.random()*1000);
    if(inputDepositarARSConfirmar.value>1){
        let balanceARSDepositado = parseInt(inputDepositarARSConfirmar.value);
        total = total+balanceARSDepositado;
        fechaFormateo= new Date();
        fecha = `${(fechaFormateo.getDate()).toString()+'/'+
                  (fechaFormateo.getMonth()+1).toString()+'/'+
                  (fechaFormateo.getFullYear())+' '+
                  (fechaFormateo.toLocaleTimeString())}`;
        const movimiento = new MovimientoBancario(generadorID,'deposito',fecha,0,balanceARSDepositado,total);
        movimientosARS.push(movimiento);
        localStorage.setItem('movimientosUsuarioARS',JSON.stringify(movimientosARS));
        localStorage.setItem('usuarioBalanceARS', JSON.stringify(total));
        balanceARSTxt.innerHTML=`${total}`;
        inputDepositarARSConfirmar.value = '';  
        refreshSite();      
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
btnRetirarUSDConfirmar.addEventListener('click',()=>{retirarUSD()});

const retirarUSD=()=>{
    debugger
    let total = parseInt(JSON.parse(localStorage.getItem('usuarioBalanceUSD')));
    let generadorID = parseInt(Math.random()*1000);
    if(inputRetirarUSDConfirmar.value>0&&inputRetirarUSDConfirmar.value<=usuarioBalanceUSD){
        let balanceUSDRetirado = (parseInt(inputRetirarUSDConfirmar.value));
        total = total-balanceUSDRetirado;
        fechaFormateo= new Date();
        fecha = `${(fechaFormateo.getDate()).toString()+'/'+
                  (fechaFormateo.getMonth()+1).toString()+'/'+
                  (fechaFormateo.getFullYear())+' '+
                  (fechaFormateo.toLocaleTimeString())}`;
        let movimiento = new MovimientoBancario(generadorID,'retiro',fecha,balanceUSDRetirado,0,total)
        movimientosUSD.push(movimiento);        
        localStorage.setItem('movimientosUsuarioUSD',JSON.stringify(movimientosUSD));
        localStorage.setItem('usuarioBalanceUSD', JSON.stringify(total));
        balanceUSDTxt.innerHTML=`${total}`
        inputRetirarUSDConfirmar.value = '';
        const loadingRetirar = document.getElementById('loadingRetirar');
        loadingRetirar.classList.remove('hidden');
        refreshSite();
        setTimeout(function(){
            window.location.href='./dashboard.html';
        }, 500);
    } else {
        const alertRetirarErrorUSD=document.getElementById('alertRetirarErrorUSD');
        alertRetirarErrorUSD.classList.remove('hidden');
        setTimeout(function(){
            alertRetirarErrorUSD.classList.add('hidden');
        }, 5000); 
    }
}

const inputDepositarUSDConfirmar = document.getElementById('inputDepositarUSDConfirmar');
const btnDepositarUSDConfirmar = document.getElementById('btnDepositarUSDConfirmar');
btnDepositarUSDConfirmar.addEventListener('click',()=>{depositarUSD()});

const depositarUSD=()=>{
    let total = parseInt(JSON.parse(localStorage.getItem('usuarioBalanceUSD')));
    let generadorID = parseInt(Math.random()*1000);
    if(inputDepositarUSDConfirmar.value>1){
        let balanceUSDDepositado = parseInt(inputDepositarUSDConfirmar.value);
        total = total+balanceUSDDepositado;
        fechaFormateo= new Date();
        fecha = `${(fechaFormateo.getDate()).toString()+'/'+
                  (fechaFormateo.getMonth()+1).toString()+'/'+
                  (fechaFormateo.getFullYear())+' '+
                  (fechaFormateo.toLocaleTimeString())}`;
        const movimiento = new MovimientoBancario(generadorID,'deposito',fecha,0,balanceUSDDepositado,total);
        movimientosUSD.push(movimiento);
        localStorage.setItem('movimientosUsuarioUSD',JSON.stringify(movimientosUSD));
        localStorage.setItem('usuarioBalanceUSD', JSON.stringify(total));
        balanceUSDTxt.innerHTML=`${total}`;
        inputDepositarUSDConfirmar.value = '';
        refreshSite();        
    } else {
        const alertDepositarErrorUSD=document.getElementById('alertDepositarErrorUSD');
        alertDepositarErrorUSD.classList.remove('hidden');
        setTimeout(function(){
            alertDepositarErrorUSD.classList.add('hidden');
        }, 5000); 
    }
}

// logs balances

// distinguir deposito de retiro
    /*
    let tipoMovimiento = JSON.parse(localStorage.getItem('movimientosUsuarioARS'));
    let tipoMovimientoUSD = JSON.parse(localStorage.getItem('movimientosUsuarioUSD'));

    tipoMovimiento.forEach(element => {
            switch (element.movimiento) {
                case 'deposito':
                    return '+';
                case 'retiro':
                    return '-';        
                default:
                    break;
        }
    });
    */
// fin distinguir deposito de retiro

const contenedorMovimientosARS = document.getElementById('contenedorMovimientosARS');
const contenedorMovimientosUSD = document.getElementById('contenedorMovimientosUSD');

let movimientoARS = JSON.parse(localStorage.getItem('movimientosUsuarioARS'));
let movimientoUSD = JSON.parse(localStorage.getItem('movimientosUsuarioUSD'));

const muestroMovimientos=()=>{
    movimientosARS.reverse();
    movimientosARS.forEach(movimiento => {
        contenedorMovimientosARS.innerHTML+=`<tr class="">
                            <td>
                                <div class="flex items-center space-x-3">
                                <div class="avatar placeholder mr-2">
                                    <div class="bg-neutral-focus text-neutral-content rounded-full w-12">
                                    <span></span>
                                    </div>
                                </div>
                                <div>
                                    <div class="font-bold capitalize">${movimiento.movimiento}</div>
                                    <div class="text-sm opacity-50">${movimiento.fecha}</div>
                                </div>
                                </div>
                            </td>
                            <td><span class="text-white bg-green-500 rounded-box px-2 py-0.5 font-semibold">+$${movimiento.haber}</span></td>
                            <td><span class="text-white bg-red-600 rounded-box px-2 py-0.5 font-semibold">-$${movimiento.debe}</span></td>
                        </tr>` 
    });
    // dolares
    movimientosUSD.reverse();
    movimientosUSD.forEach(movimiento => {
        contenedorMovimientosUSD.innerHTML+=`<tr class="">
                            <td>
                                <div class="flex items-center space-x-3">
                                <div class="avatar placeholder mr-2">
                                    <div class="bg-neutral-focus text-neutral-content rounded-full w-12">
                                    <span></span>
                                    </div>
                                </div>
                                <div>
                                    <div class="font-bold capitalize">${movimiento.movimiento}</div>
                                    <div class="text-sm opacity-50">${movimiento.fecha}</div>
                                </div>
                                </div>
                            </td>
                            <td><span class="text-white bg-green-500 rounded-box px-2 py-0.5 font-semibold">+$${movimiento.haber}</span></td>
                            <td><span class="text-white bg-red-600 rounded-box px-2 py-0.5 font-semibold">-$${movimiento.debe}</span></td>
                        </tr>` 
    });
};
muestroMovimientos();

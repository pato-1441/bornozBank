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

// muestro balance ars en dashboard
const balanceARSTxt = document.getElementById('balanceARSTxt');
let usuarioBalanceARS = JSON.parse(localStorage.getItem('usuarioBalanceARS'))
balanceARSTxt.innerHTML=`${usuarioBalanceARS}`

// botones balance en pesos
const inputRetirarARSConfirmar = document.getElementById('inputRetirarARSConfirmar');
const btnRetirarARSConfirmar = document.getElementById('btnRetirarARSConfirmar');
btnRetirarARSConfirmar.addEventListener('click',()=>{retirarARS()});

// movimientos
class MovimientoBancarioARS{
    constructor(id,movimiento,debe,haber,saldo) {
        this.id = id;
        this.movimiento = movimiento;
        this.debe = debe;
        this.haber = haber;
        this.saldo = saldo;
    }
}

let movimientosARS = JSON.parse(localStorage.getItem('movimientosUsuarioARS'));
let movimientosUSD = [];

const retirarARS=()=>{
    let total = parseInt(JSON.parse(localStorage.getItem('usuarioBalanceARS')));
    let generadorID = parseInt(Math.random()*1000);
    if(inputRetirarARSConfirmar.value>0&&inputRetirarARSConfirmar.value<=total){
        let balanceARSRetirado = (parseInt(inputRetirarARSConfirmar.value));
        total = total-balanceARSRetirado;
        let movimiento = new MovimientoBancarioARS(generadorID,'retiro',balanceARSRetirado,0,total)
        movimientosARS.push(movimiento);        
        localStorage.setItem('movimientosUsuarioARS',JSON.stringify(movimientosARS));
        localStorage.setItem('usuarioBalanceARS', JSON.stringify(total));
        balanceARSTxt.innerHTML=`${total}`
        inputRetirarARSConfirmar.value = '';
        const loadingRetirar = document.getElementById('loadingRetirar');
        loadingRetirar.classList.remove('hidden');
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
        const movimiento = new MovimientoBancarioARS(generadorID,'deposito',0,balanceARSDepositado,total);
        movimientosARS.push(movimiento);
        localStorage.setItem('movimientosUsuarioARS',JSON.stringify(movimientosARS));
        localStorage.setItem('usuarioBalanceARS', JSON.stringify(total));
        balanceARSTxt.innerHTML=`${total}`;
        inputDepositarARSConfirmar.value = '';        
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

const inputDepositarUSDConfirmar = document.getElementById('inputDepositarUSDConfirmar');
const btnDepositarUSDConfirmar = document.getElementById('btnDepositarUSDConfirmar');
btnDepositarUSDConfirmar.addEventListener('click',()=>{depositarUSD()});

const depositarUSD=()=>{
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
        }, 5000); 
    }
}

// logs balances
const logs = document.getElementById('contenedorLogs');
logs.innerHTML=`
                <div class="overflow-x-auto w-full text-black">
                <h2 class="text-2xl mb-4">Movimientos</h2>            
                <table class="table-compact sm:table-normal w-full">
                <!-- head -->
                <tbody>
                    <!-- row 1 -->
                    <tr class="bg-gray-100">
                    <td>
                        <div class="flex items-center space-x-3">
                        <div class="avatar placeholder mr-2">
                            <div class="bg-neutral-focus text-neutral-content rounded-full w-12">
                            <span>JC</span>
                            </div>
                        </div>
                        <div>
                            <div class="font-bold">Joaquin Carbajal</div>
                            <div class="text-sm opacity-50">Hoy</div>
                        </div>
                        </div>
                    </td>
                    <td><span class="text-white bg-green-500 rounded-box px-2 py-0.5 font-semibold">+$1.500</span></td>
                    <th>
                        <button class="btn btn-ghost btn-xs">Detalles</button>
                    </th>
                    </tr>
                    <!-- row 2 -->
                    <tr>
                    <td>
                        <div class="flex items-center space-x-3">
                        <div class="avatar placeholder mr-2">
                            <div class="bg-neutral-focus text-neutral-content rounded-full w-12">
                            <span>AM</span>
                            </div>
                        </div>
                        <div>
                            <div class="font-bold">Anacleto Medina</div>
                            <div class="text-sm opacity-50">Ayer</div>
                        </div>
                        </div>
                    </td>
                    <td><span class="text-white bg-green-500 rounded-box px-2 py-0.5 font-semibold">+$850</span></td>
                    <th>
                        <button class="btn btn-ghost btn-xs">Detalles</button>
                    </th>
                    </tr>
                    <!-- row 3 -->
                    <tr class="bg-gray-100">
                    <td>
                        <div class="flex items-center space-x-3">
                        <div class="avatar placeholder mr-2">
                            <div class="bg-neutral-focus text-neutral-content rounded-full w-12">
                            <span>JL</span>
                            </div>
                        </div>
                        <div>
                            <div class="font-bold">Jeronimo Lache</div>
                            <div class="text-sm opacity-50">Antiayer</div>
                        </div>
                        </div>
                    </td>
                    <td><span class="text-white bg-red-600 rounded-box px-2 py-0.5 font-semibold">-$3.750</span></td>
                    <th>
                        <button class="btn btn-ghost btn-xs">Detalles</button>
                    </th>
                    </tr>
                    <!-- row 4 -->
                    <tr>
                    <td>
                        <div class="flex items-center space-x-3">
                        <div class="avatar placeholder mr-2">
                            <div class="bg-neutral-focus text-neutral-content rounded-full w-12">
                            <span>NP</span>
                            </div>
                        </div>
                        <div>
                            <div class="font-bold">Jecsi Peras</div>
                            <div class="text-sm opacity-50">05/08/22</div>
                        </div>
                        </div>
                    </td>
                    <td><span class="text-white bg-red-600 rounded-box px-2 py-0.5 font-semibold">-$6.300</span></td>
                    <th>
                        <button class="btn btn-ghost btn-xs">Detalles</button>
                    </th>
                    </tr>
                </tbody>
                <!-- foot -->
                </table>
                </div>
               `
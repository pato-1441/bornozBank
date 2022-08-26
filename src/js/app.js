//
//
//
//
//
// Usuarios
class User {
    constructor(username,mail,password,balanceARS,balanceUSD,movimientosUsuarioARS,movimientosUsuarioUSD){
        this.username = username;
        this.mail = mail;
        this.password = password;
        this.balanceARS = balanceARS;
        this.balanceUSD = balanceUSD;
        this.movimientosUsuarioARS = movimientosUsuarioARS;
        this.movimientosUsuarioUSD = movimientosUsuarioUSD;
    }
    updateUsername(){
        this.username = prompt('Ingrese su nombre nuevo:');
        this.mail = prompt('Ingrese su mail nuevo:');
        this.password = prompt('Ingrese su contraseña nueva:');     
        alert('Sus datos han sido modificados a: '+'\n- '+this.username+'\n- '+this.mail+'\n- '+this.password);
    }
    updatePassword(){
        this.password = prompt('Ingrese su contraseña nueva');                    
    }
}
const users = [];
let movimientosARS = [];
let movimientosUSD = [];
users.push(new User('invitado','invitado@gmail.com','invitado','0','0',JSON.stringify(movimientosARS),JSON.stringify(movimientosUSD)));

// REGISTRO DE USUARIOS

const buttonRegister = document.getElementById("submitRegister");
buttonRegister.addEventListener("click",registerUser);

function registerUser(){
    let formularioRegistro = document.getElementById("registerForm");
    const alertSuccess=document.getElementById("alertRegisterSuccess");
    const alertError=document.getElementById('alertRegisterError');

    //Si los campos están completos
    if(formularioRegistro.children[1].value!==''&&formularioRegistro.children[3].value!==''&&formularioRegistro.children[5].value!==''){
        let nuevoUser = new User(formularioRegistro.children[1].value,formularioRegistro.children[3].value,formularioRegistro.children[5].value,localStorage.setItem('usuarioBalanceARS',JSON.stringify('0')),localStorage.setItem('usuarioBalanceUSD',JSON.stringify('0')),localStorage.setItem('movimientosUsuarioARS',JSON.stringify(movimientosUSD)),localStorage.setItem('movimientosUsuarioUSD',JSON.stringify(movimientosUSD)));
        //Creo el usuario y lo guardo en localStorage
        localStorage.setItem('usuario', JSON.stringify(nuevoUser));
        //Limpio el formulario
        formularioRegistro.children[1].value = '';
        formularioRegistro.children[3].value = '';
        formularioRegistro.children[5].value = '';
        // agrego timeout para que se borre la alerta de exito y rediriga al dashboard
        alertError.classList.add('hidden'); 
        alertSuccess.classList.remove('hidden');
        setTimeout(function(){
            alertSuccess.classList.add('hidden');
            window.location.href='./dashboard.html';
        }, 5000);               
    } else {
        // agrego timeout para que se borre la alerta de error
        alertError.classList.remove('hidden')
        setTimeout(function(){
            alertError.classList.add('hidden');
        }, 5000);        
    }
}
// Fin Usuarios

// Log In
const inputUsernameLogin = document.getElementById('inputUsernameLogin')
const inputPasswordLogin = document.getElementById('inputPasswordLogin');
const submitLogin = document.getElementById('submitLogin');
submitLogin.addEventListener('click',validarLogin)

// Cargo datos default
inputUsernameLogin.value='invitado';
inputPasswordLogin.value='invitado';

function validarLogin(){
    if(inputUsernameLogin.value==='invitado'&&inputPasswordLogin.value==='invitado'){
        let invitadoUser = new User(inputUsernameLogin.value,inputPasswordLogin.value,'invitado@mail.com',localStorage.setItem('usuarioBalanceARS',JSON.stringify('0')),localStorage.setItem('usuarioBalanceUSD',JSON.stringify('0')),localStorage.setItem('movimientosUsuarioARS',JSON.stringify(movimientosUSD)),localStorage.setItem('movimientosUsuarioUSD',JSON.stringify(movimientosUSD)));
        inputUsernameLogin.value='';
        inputPasswordLogin.value='';
        window.location.href='./dashboard.html';
        alertLoginError.classList.add('hidden'); 
        localStorage.setItem('usuario', JSON.stringify(invitadoUser));
    } else {
        alertLoginError.classList.remove('hidden')
        setTimeout(function(){
            alertLoginError.classList.add('hidden');
        }, 5000);   
    }
}
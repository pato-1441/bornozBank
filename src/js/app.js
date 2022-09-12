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


class Contact{
    constructor(id,contactFullname,contactCBU,contactAlias){
        this.id = id;
        this.contactFullname = contactFullname;
        this.contactCBU = contactCBU;
        this.contactAlias = contactAlias;
    }
}

let contacts=[];
const generadorID =()=>{return parseInt(Math.random()*100000)}
contacts.push(new Contact(generadorID(),'Gerardo Kelly',parseInt('0002465832152469952001'),'gerardo.kelly'));
contacts.push(new Contact(generadorID(),'Miriam Nancy',parseInt('0008965142452469952001'),'miriam.nancy'));
contacts.push(new Contact(generadorID(),'Leonardo Fonseca',parseInt('0003412145782469952001'),'leo.basquet'));
contacts.push(new Contact(generadorID(),'Jesus Garcia',parseInt('0006933356872469952001'),'maria.jesus'));
localStorage.setItem('contactos',JSON.stringify(contacts))

// REGISTRO DE USUARIOS
let formularioRegistro = document.getElementById("registerForm");
formularioRegistro.addEventListener('submit',e=>{
    e.preventDefault();
    registeringUser(e);
})

const registeringUser = e =>{
    const validacionRegisterComplete = (formularioRegistro.children[1].value!==''&&
                                        formularioRegistro.children[3].value!==''&&
                                        formularioRegistro.children[5].value!=='');
    validacionRegisterComplete ? registerUser() : registerUserError();                                        
}

const registerUser=()=>{
    const alertSuccess=document.getElementById("alertRegisterSuccess");
    const alertError=document.getElementById('alertRegisterError');
    
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
        window.location.href='./src/dashboard.html';
    }, 5000);       
}

const registerUserError=()=>{
    // agrego timeout para que se borre la alerta de error
    alertError.classList.remove('hidden')
    setTimeout(function(){
        alertError.classList.add('hidden');
    }, 5000);  
}
// Fin Usuarios

// Log In
const inputUsernameLogin = document.getElementById('inputUsernameLogin')
const inputPasswordLogin = document.getElementById('inputPasswordLogin');
const submitLogin = document.getElementById('submitLogin');
submitLogin.addEventListener('click',()=>{validarLogin()})

// Cargo datos default
inputUsernameLogin.value='invitado';
inputPasswordLogin.value='invitado';

const validarLogin=()=>{
    if(inputUsernameLogin.value==='invitado'&&inputPasswordLogin.value==='invitado'){
        let invitadoUser = new User(inputUsernameLogin.value,inputPasswordLogin.value,'invitado@mail.com',localStorage.setItem('usuarioBalanceARS',JSON.stringify('10000')),localStorage.setItem('usuarioBalanceUSD',JSON.stringify('10000')),localStorage.setItem('movimientosUsuarioARS',JSON.stringify(movimientosUSD)),localStorage.setItem('movimientosUsuarioUSD',JSON.stringify(movimientosUSD)));
        inputUsernameLogin.value='';
        inputPasswordLogin.value='';
        window.location.href='./src/dashboard.html';
        alertLoginError.classList.add('hidden'); 
        localStorage.setItem('usuario', JSON.stringify(invitadoUser));
    } else {
        alertLoginError.classList.remove('hidden')
        setTimeout(function(){
            alertLoginError.classList.add('hidden');
        }, 5000);   
    }
}
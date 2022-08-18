//
//
//
//
//
// Usuarios
class User {
    constructor(username,mail,password,balanceARS,balanceUSD){
        this.username = username;
        this.mail = mail;
        this.password = password;
        this.balanceARS = balanceARS;
        this.balanceUSD = balanceUSD;
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
const users = []
users.push(new User('Patricio','admin@gmail.com','admin','0','0'));
users.push(new User('Guillermo','guille@gmail.com','guille','0','0'));
users.push(new User('Silvina','silvi@gmail.com','silvi','0','0'));

// REGISTRO DE USUARIOS

const buttonRegister = document.getElementById("submitRegister");
buttonRegister.addEventListener("click",registerUser);

function registerUser(){
    let formularioRegistro = document.getElementById("registerForm");
    const alertSuccess=document.getElementById("alertRegisterSuccess");
    const alertError=document.getElementById('alertRegisterError');

    //Si los campos están completos
    if(formularioRegistro.children[1].value!==''&&formularioRegistro.children[3].value!==''&&formularioRegistro.children[5].value!==''){
        let nuevoUser = new User(formularioRegistro.children[1].value,formularioRegistro.children[3].value,formularioRegistro.children[5].value,localStorage.setItem('usuarioBalanceARS',JSON.stringify('0')),localStorage.setItem('usuarioBalanceUSD',JSON.stringify('0')));
        //Creo el usuario y lo guardo en localStorage
        localStorage.setItem('usuario', JSON.stringify(nuevoUser));
        //Limpio el formulario
        formularioRegistro.children[1].value = '';
        formularioRegistro.children[3].value = '';
        formularioRegistro.children[5].value = '';
        // agrego timeout para que se borre la alerta de exito y rediriga al dashboard
        alertError.classList.add('hidden'); 
        alertSuccess.classList.remove('hidden')
        setTimeout(function(){
            alertSuccess.classList.add('hidden');
            window.location.href='./dashboard.html'
        }, 5000);               
    } else {
        // agrego timeout para que se borre la alerta de error
        alertError.classList.remove('hidden')
        setTimeout(function(){
            alertError.classList.add('hidden');
        }, 5000);        
    }
}

// FIN REGISTRO DE USUARIOS

function removeUser(){
    let removedUser = (users[users.length-1].username);
    let remove = confirm('¿Desea remover el usuario: '+(users[users.length-1].username)+'?');
    if(remove){
        users.pop();
        alert('El usuario '+removedUser+ ' se ha eliminado correctamente.');
    } else {
        alert('El usuario '+removedUser+' no ha sido eliminado/a.');
    }   
    
}

function mostrarUsers(){
    users.forEach((user)=>{
        console.table(user);
    })
}

// Fin Usuarios
// Log In
function validarLogin(username,password){
    if(username==='admin'&&password==='admin'){
        alert('Sesion iniciada con exito');
    } else {
        alert('Ocurrio un error inesperado');
    }
}
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


// Contactos
class Contact{
    constructor(contactFullname,contactCBU,contactAlias){
        this.contactFullname = contactFullname;
        this.contactCBU = contactCBU;
        this.contactAlias = contactAlias;
    }
    updateContact(){
        this.contactFullname = prompt('Ingrese el nombre completo nuevo:');
        this.contactCBU = prompt('Ingrese el nuevo CBU de: '+ this.contactFullname);
        this.contactAlias = prompt('Ingrese el nuevo Alias de: '+ this.contactFullname);
    }
}

const contacts=[];
contacts.push(new Contact('Gerardo',parseInt('0002465832152469952001'),'gerardo.kelly'));
contacts.push(new Contact('Miriam',parseInt('0008965142452469952001'),'miriam.nancy'));
contacts.push(new Contact('Leonardo',parseInt('0003412145782469952001'),'leo.basquet'));
contacts.push(new Contact('Jesus',parseInt('0006933356872469952001'),'maria.jesus'));

function newContact(){
    let nuevoContact = new Contact(
        prompt('Nombre:'),
        parseInt(prompt('CBU:')),
        prompt('Alias:')        
        );
    contacts.push(nuevoContact);
    alert('Se ha agregado el contacto: '+(contacts[contacts.length-1].contactFullname)+' correctamente.');
}

function removeContact(){
    let removedContact = (contacts[contacts.length-1].contactFullname);
    let remove = confirm('¿Desea remover el usuario: '+(contacts[contacts.length-1].contactFullname)+'?');
    if(remove){
        contacts.pop();
        alert('El usuario '+removedContact+ ' se ha eliminado correctamente.');
    } else {
        alert('El usuario '+removedContact+' no ha sido eliminado/a.');
    }   
    
}
// Fin Contactos

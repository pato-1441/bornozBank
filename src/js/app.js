//
//
//
//
//
// Usuarios
class User {
    constructor(username,mail,password){
        this.username = username;
        this.mail = mail;
        this.password = password;          
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
users.push(new User('Patricio','admin@gmail.com','admin'));
users.push(new User('Guillermo','guille@gmail.com','guille'));
users.push(new User('Silvina','silvi@gmail.com','silvi'));


function registerUser(){
    let nuevoUser = new User(
        prompt('Nombre:'),
        prompt('Mail:'),
        prompt('Contraseña:')
        );
    users.push(nuevoUser);
    alert('Se ha agregado el usuario: '+(users[users.length-1].username)+' correctamente.');
}

function removeUser(){
    debugger
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

//  Fin Usuarios
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



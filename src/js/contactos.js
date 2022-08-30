
// Log Out
const btnLogOut = document.getElementById('btnLogOut');
btnLogOut.addEventListener('click',()=>{logOut()});

const logOut=()=>{
    //Elimino el localStorage antes de irme
    //localStorage.removeItem('usuario');
    localStorage.clear();
    window.location.href='./index.html';
}

//añadir contactos
class Contact{
    constructor(id,contactFullname,contactCBU,contactAlias){
        this.id = id;
        this.contactFullname = contactFullname;
        this.contactCBU = contactCBU;
        this.contactAlias = contactAlias;
    }
}

//mostras contactos en pantalla
const addContactForm = document.getElementById('addContactForm');
const inputNameAddContact = document.getElementById('inputNameAddContact');
const inputCBUAddContact = document.getElementById('inputCBUAddContact');
const inputAliasAddContact = document.getElementById('inputAliasAddContact');
const submitAddContact = document.getElementById('submitAddContact');
const contenedorContactos = document.getElementById('contenedorContactos');
const template = document.getElementById('template').content;
const fragment = document.createDocumentFragment();
let contacts = JSON.parse(localStorage.getItem('contactos'));

addContactForm.addEventListener('submit',e =>{
    e.preventDefault();
    crearContacto(e);
})

const crearContacto = e => {
    const validacionAddComplete = (inputNameAddContact.value!==''&&
                                (inputCBUAddContact.value!==''&&inputCBUAddContact.value.length==22)&&
                                inputAliasAddContact.value!=='')
    if (validacionAddComplete) {
        const generadorID =()=>{return parseInt(Math.random()*100000)}
        let nuevoContacto = new Contact(generadorID(),
                                        inputNameAddContact.value,
                                        parseInt(inputCBUAddContact.value),
                                        inputAliasAddContact.value)
        contacts.push(nuevoContacto)
        localStorage.setItem('contactos',JSON.stringify(contacts))
        addContactForm.reset();
        pintarContactos();        
        return  
    }    
    
}

const pintarContactos = () =>{
    contenedorContactos.innerHTML='';
    contacts.forEach(contacto => {
        const cloneTemplate = template.cloneNode(true);
        cloneTemplate.getElementById('contactoFullname').textContent = contacto.contactFullname;
        fragment.appendChild(cloneTemplate);
    });
    contenedorContactos.appendChild(fragment);
}

pintarContactos();

/*
const cargarContactos=()=>{
    let contenedorContactos = document.getElementById('contenedorContactos');
    let contador=0;
    contacts.forEach(contacto => {    
        contador++;
        contenedorContactos.innerHTML+=`
                                        `
    });  
    let contadorDos = 0;
    contacts.forEach(contacto => {
        contadorDos++;
        const boton = document.getElementById(`submitDeleteContact${contadorDos}`)
        boton.addEventListener('click',()=>removeContact(contacto.id))
    });
}

cargarContactos();


submitAddContact.addEventListener('click',()=>{newContact()});

const newContact=()=>{
    const addContactForm = document.getElementById('addContactForm');
    const alertAddContactSuccess = document.getElementById('alertAddContactSuccess');
    const alertAddContactError = document.getElementById('alertAddContactError');

    //Si los campos están completos
    if(addContactForm.children[1].value!==''&&addContactForm.children[3].value!==''&&addContactForm.children[5].value!==''){
        let nuevoContacto = new Contact(inputNameAddContact.value,parseInt(inputCBUAddContact.value),inputAliasAddContact.value);
        contacts.push(nuevoContacto);
        localStorage.setItem('contactos',JSON.stringify(contacts))
        inputNameAddContact.value = '';
        inputCBUAddContact.value = '';
        inputAliasAddContact.value = '';
        cargarContactos();
        alertAddContactError.classList.add('hidden');
        alertAddContactSuccess.classList.remove('hidden');
        setTimeout(function(){
            alertAddContactSuccess.classList.add('hidden');
            //window.location.href='./contactos.html';
        }, 5000); 
    } else {
        // agrego timeout para que se borre la alerta de error
        alertAddContactError.classList.remove('hidden')
        setTimeout(function(){
            alertAddContactError.classList.add('hidden');
        }, 7500);        
    }
}
//


const removeContact=(id)=>{
    debugger
    let contactos = JSON.parse(localStorage.getItem('contactos'));
    contactos = contactos.filter(contacto=>contacto.id !== (parseInt(id)));    
    localStorage.setItem('contactos',JSON.stringify(contactos));
    cargarContactos();
}

//Editar contacto
const inputNameEditContact = document.getElementById('inputNameEditContact');
const inputCBUEditContact = document.getElementById('inputCBUEditContact');
const inputAliasEditContact = document.getElementById('inputAliasEditContact');
const submitEditContact = document.getElementById('submitEditContact');
const submitDeleteContact = document.getElementById('submitDeleteContact');
//submitDeleteContact.addEventListener('click',deleteContact);

const editContact=()=>{
    const editContactForm = document.getElementById('editContactForm');
    const alertEditContactSuccess = document.getElementById('alertEditContactSuccess');
    const alertEditContactError = document.getElementById('alertEditContactError');

    // Si los campos estan completos
    if(editContactForm.children[1].value!==''&&editContactForm.children[4].value!==''&&editContactForm.children[7].value!==''){
        let nuevoContacto = new Contact(inputNameAddContact.value,parseInt(inputCBUAddContact.value),inputAliasAddContact.value);
        contacts.push(nuevoContacto);
        localStorage.setItem('contactos',JSON.stringify(contacts))
        inputNameEditContact.value = '';
        inputCBUEditContact.value = '';
        inputAliasEditContact.value = '';
        alertEditContactError.classList.add('hidden');
        alertEditContactSuccess.classList.remove('hidden');
        setTimeout(function(){
            alertEditContactSuccess.classList.add('hidden');
            //window.location.href='./contactos.html';
        }, 5000); 
    } else {
        // agrego timeout para que se borre la alerta de error
        alertEditContactError.classList.remove('hidden')
        setTimeout(function(){
            alertEditContactError.classList.add('hidden');
        }, 7500);        
    }
}
// Fin Contactos

*/

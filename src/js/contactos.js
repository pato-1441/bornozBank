
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
const fragment = document.createDocumentFragment();
const contacts = JSON.parse(localStorage.getItem('contactos'));

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
        alertAddContactError.classList.add('hidden');
        alertAddContactSuccess.classList.remove('hidden');
        setTimeout(function(){
            alertAddContactSuccess.classList.add('hidden');
            //window.location.href='./contactos.html';
        }, 5000); 
        pintarContactos();        
        return  
    } else {
        // agrego timeout para que se borre la alerta de error
        alertAddContactError.classList.remove('hidden')
        setTimeout(function(){
            alertAddContactError.classList.add('hidden');
        }, 7500);    
    }
    
}

const pintarContactos = () =>{
    let contador = 0;
    contenedorContactos.innerHTML='';
    contacts.forEach(contacto => {
        contador++
        contenedorContactos.innerHTML+=`<label for="my-modal-${contador}" class="btn modal-button font-medium text-white">
                                            <span class="ml-1" id="contactoFullname">${contacto.contactFullname}</span>
                                        </label>
                                        <input type="checkbox" id="my-modal-${contador}" class="modal-toggle" />
                                        <!--cuerpo del modal-->
                                        <label for="my-modal-${contador}" class="modal cursor-pointer">
                                            <label
                                                class="modal-box relative w-11/12 sm:w-8/12 h-fit max-w-5xl bg-white text-black flex flex-col"
                                                for="">
                                                <h2 class="text-black text-center text-2xl pt-4 w-2/3 font-semibold mx-auto">Editar contacto</h2>
                                                <div class="form flex flex-col items-center">
                                                    <!--arranca añadir contacto-->
                                                    <div class="form-control w-full max-w-xs mx-auto pt-4 pb-4" id="editContactForm">
                                                        <!--arranca nombre contacto-->
                                                        <label class="label">
                                                            <span class="label-text text-base text-black">Nombre Completo</span>
                                                        </label>                                    
                                                        <input required type="text" placeholder="Nombre completo"
                                                                class="input input-bordered w-full max-w-xs bg-white" minlength="4"
                                                                maxlength="30" id="inputNameEditContact" value="${contacto.contactFullname}" />
                                                        <label class="label">
                                                            <span class="label-text-alt text-sm" id="previousName">Nombre previo: ${contacto.contactFullname}</span>                                       
                                                        </label>
                                                        <!--termina nombre contacto-->
                                                        <!--arranca cbu contacto-->
                                                        <label class="label">
                                                            <span class="label-text text-base text-black">CBU</span>
                                                        </label>
                                                        <input required type="text" placeholder="CBU"
                                                            class="input input-bordered w-full max-w-xs bg-white" minlength="22"
                                                            maxlength="22" id="inputCBUEditContact" value="${contacto.contactCBU}"/>
                                                        <label class="label">
                                                            <span class="label-text-alt text-sm">CBU previo: ${contacto.contactCBU}</span>                                       
                                                        </label>
                                                        <!--termina cbu contacto-->
                                                        <!--arranca alias contacto-->
                                                        <label class="label">
                                                            <span class="label-text text-base text-black">Alias</span>
                                                        </label>
                                                        <input required type="text" placeholder="Alias"
                                                            class="input input-bordered w-full max-w-xs bg-white" minlength="2"
                                                            maxlength="40" id="inputAliasEditContact" value="${contacto.contactAlias}"/>
                                                        <label class="label">
                                                            <span class="label-text-alt text-sm">Alias previo: ${contacto.contactAlias}</span>                                       
                                                        </label>
                                                        <!--termina alias contacto-->
                                                        <!--boton añadir contacto-->
                                                        <div class="mt-4 flex mx-auto">
                                                            <button type="submit" id="submitEditContact"
                                                                class="btn btn-outline w-1/2 mr-1 text-white hover:text-blue-500 hover:border-blue-500 hover:bg-inherit bg-blue-500 mb-3">Guardar cambios
                                                            </button>
                                                            <button type="submit" id="submitDeleteContact"
                                                                class="btn btn-outline w-1/2 text-white hover:text-red-600 hover:border-red-600 hover:bg-inherit bg-red-600 mb-3">Eliminar
                                                                contacto
                                                            </button>
                                                        </div>
                                                        <!--termina añadir contacto-->
                                                        <!--arranca alerta contacto añadido con exito-->
                                                        <div class="alert alert-success bg-green-400 text-white hidden"
                                                            id="alertEditContactSuccess">
                                                            <div><svg xmlns="http://www.w3.org/2000/svg"
                                                                    class="stroke-current flex-shrink-0 h-6 w-6" fill="none"
                                                                    viewBox="0 0 24 24">
                                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                                <span>Se ha modificado correctamente el contacto.</span>
                                                            </div>
                                                        </div>
                                                        <!--termina alerta contacto añadido con exito-->
                                                        <!--arranca error en añadir contacto-->
                                                        <div class="alert alert-error text-white bg-red-700 hidden" id="alertEditContactError">
                                                            <div>
                                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                                    class="stroke-current flex-shrink-0 h-6 w-6" fill="none"
                                                                    viewBox="0 0 24 24">
                                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                </svg>
                                                                <span>Error! Complete todos los campos por favor.</span>
                                                            </div>
                                                        </div>
                                                        <!--termina error en añadir contacto-->
                                                    </div>
                                                    <!--termina form interno-->
                                                </div>
                                                <!--termina form contacto-->
                                            </label>
                                        </label>
                                        <!--termina modal añadir contactos-->`
    });
}

addEventListener('DOMContentLoaded',()=>{pintarContactos()})

/*
    let contadorDos = 0;
    contacts.forEach(contacto => {
        contadorDos++;
        const boton = document.getElementById(`submitDeleteContact${contadorDos}`)
        boton.addEventListener('click',()=>removeContact(contacto.id))
    });
}

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

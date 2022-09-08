
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
                                   inputCBUAddContact.value!==''&&
                                   inputAliasAddContact.value!=='')
    validacionAddComplete ? creacionContacto() : creacionContactoError();    
}

const creacionContacto=()=>{
    const generadorID =()=>{return parseInt(Math.random()*100000)}
    let nuevoContacto = new Contact(generadorID(),
                                    inputNameAddContact.value,
                                    inputCBUAddContact.value,
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
}

const creacionContactoError=()=>{
    // agrego timeout para que se borre la alerta de error
    alertAddContactError.classList.remove('hidden')
    setTimeout(function(){
        alertAddContactError.classList.add('hidden');
    }, 7500);    
}

const pintarContactos=()=>{
    let contador = 0;
    contenedorContactos.innerHTML='';
    contactos = JSON.parse(localStorage.getItem('contactos'));
    contactos.forEach(contacto => {
        contador++
        const fragmentContacto = document.createDocumentFragment();
        let contactoDiv = document.createElement('label');
        contactoDiv.innerHTML = `<label for="my-modal-${contador}" class="btn modal-button font-medium text-white w-full">
                                    <span class="ml-1" id="contactoFullname">${contacto.contactFullname}</span>
                                </label>
                                <input type="checkbox" id="my-modal-${contador}" class="modal-toggle" />
                                <!--cuerpo del modal-->
                                <label for="my-modal-${contador}" class="modal cursor-pointer">
                                    <label class="modal-box relative w-11/12 sm:w-8/12 h-fit max-w-5xl bg-white text-black flex flex-col" for="my-modal-${contador}" id="cuerpo-my-modal-${contador}">
                                        <h2 class="text-black text-center text-2xl pt-4 w-2/3 font-semibold mx-auto">${contacto.contactFullname}</h2>
                                        <div class="form flex flex-col items-center">
                                        <!--arranca editar contacto-->
                                            <form class="form-control w-full max-w-xs mx-auto pt-4 pb-4 editContactForm">
                                        <!--arranca nombre contacto-->
                                            <label class="label">
                                                <span class="label-text text-base text-black">Nombre Completo</span>
                                            </label>                                    
                                            <input required type="text" placeholder="Nombre completo" readonly
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
                                            <input required type="text" placeholder="CBU" readonly
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
                                            <input required type="text" placeholder="Alias" readonly
                                                class="input input-bordered w-full max-w-xs bg-white" minlength="2"
                                                maxlength="40" id="inputAliasEditContact" value="${contacto.contactAlias}"/>
                                            <label class="label">
                                                <span class="label-text-alt text-sm">Alias previo: ${contacto.contactAlias}</span>                                       
                                            </label>
                                        <!--termina alias contacto-->
                                        <!--boton editar contacto-->
                                            <div class="mt-4 flex mx-auto">
                                                <button 
                                                    type="submit"
                                                    class="btn btn-outline w-full text-white hover:text-red-600 hover:border-red-600 hover:bg-inherit bg-red-600 mb-3 submitDeleteContact"
                                                    id="${contacto.id}"
                                                >
                                                    Eliminar contacto
                                                </button>
                                            </div>
                                        <!--termina editar contacto-->
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
                                        <!--arranca error en editar contacto-->
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
                                                <!--termina error en editar contacto-->
                                            </form>
                                            <!--termina form interno-->
                                        </div>
                                        <!--termina form contacto-->
                                    </label>
                                </label>
                                <!--termina modal editar contactos-->`;
        fragmentContacto.appendChild(contactoDiv);
        contenedorContactos.appendChild(fragmentContacto); 
    });
    /*const submitEditContactButton = document.querySelectorAll('.submitEditContact');
    submitEditContactButton.forEach(btn=>{
        btn.addEventListener('click',()=>{editContact(btn.id)})
    })*/
    const submitDeleteContactButton = document.querySelectorAll('.submitDeleteContact');
    submitDeleteContactButton.forEach(btn=>{
        btn.addEventListener('click',()=>{removeContact(btn.id)})
    })
}

addEventListener('DOMContentLoaded',()=>{pintarContactos()})

//Editar contacto

//Eliminar contacto
const removeContact=(id)=>{
    //let botonEliminar = document.querySelectorAll('.submitDeleteContact');
    contactos = contacts.filter(contacto => contacto.id !== (parseInt(id)));
    localStorage.setItem('contactos',JSON.stringify(contactos));
    pintarContactos();
    window.location.href='./contactos.html';
}

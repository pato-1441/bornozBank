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
contacts.push(new Contact('Gerardo Kelly',parseInt('0002465832152469952001'),'gerardo.kelly'));
contacts.push(new Contact('Miriam Nancy',parseInt('0008965142452469952001'),'miriam.nancy'));
contacts.push(new Contact('Leonardo Fonseca',parseInt('0003412145782469952001'),'leo.basquet'));
contacts.push(new Contact('Jesus Garcia',parseInt('0006933356872469952001'),'maria.jesus'));
localStorage.setItem('contactos',JSON.stringify(contacts))

//añadir contactos
const inputNameAddContact = document.getElementById('inputNameAddContact');
const inputCBUAddContact = document.getElementById('inputCBUAddContact');
const inputAliasAddContact = document.getElementById('inputAliasAddContact');
const submitAddContact = document.getElementById('submitAddContact');
submitAddContact.addEventListener('click',newContact);

function newContact(){
    const addContactForm = document.getElementById('addContactForm');
    const alertAddContactSuccess = document.getElementById('alertAddContactSuccess');
    const alertAddContactError = document.getElementById('alertAddContactError');

    //Si los campos están completos
    if(addContactForm.children[1].value!==''&&addContactForm.children[3].value!==''&&addContactForm.children[5].value!==''){
        let nuevoContacto = new Contact(inputNameAddContact.value,parseInt(inputCBUAddContact.value),inputAliasAddContact.value);
        contacts.push(nuevoContacto);
        inputNameAddContact.value = '';
        inputCBUAddContact.value = '';
        inputAliasAddContact.value = '';
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

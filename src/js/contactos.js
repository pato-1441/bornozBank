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

// pido las cotizaciones

const contenedorCotizaciones = document.getElementById('contenedorCotizaciones');
const loader = document.getElementById('loader');
const URLS=[];
let datos=[];
let contenidoHTML='';

let myHeaders = new Headers();
myHeaders.append("apikey", "s4bYzPdEyKwXOQ0G2UkG3EmIXgwFJFGP");

let requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

const retornoCardContenido=(dato)=>{
    return `<div class="text-3xl text-center bg-gray-100 rounded-box p-2 w-full flex flex-col">
                <p class="font-semibold">${dato.base} <span>${parseFloat(dato.rates.ARS.toFixed(2))}</span></p>
                <p class="text-base">Fecha de actualización:<br>${dato.date}</p>
            </div>`
}

const retornoCardError=()=>{
    return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-24 h-24 mx-auto">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>                     
            <p class="text-2xl px-2">Ha ocurrido un error inesperado!</p>
            <p class="text-2xl">Recargue la página e intente nuevamente.</p>`
}

const cargarCotizaciones = async()=>{
    await fetch('https://api.apilayer.com/exchangerates_data/latest?symbols=ARS&base=USD',requestOptions)
          .then((response)=>response.json())
          .then((data)=>{
                datos.push(data);
                console.log(datos);
                datos.forEach(dato => {
                    contenidoHTML += retornoCardContenido(dato)
                });
                contenedorCotizaciones.innerHTML=contenidoHTML;
          })
          .catch((error)=>{
            contenedorCotizaciones.innerHTML=retornoCardError();
          })
          .finally(()=>loader.innerHTML='');
}

/*
const pedirCotizaciones=async()=>{
    await fetch('https://api.apilayer.com/exchangerates_data/latest?symbols=ARS&base=USD',requestOptions)
    .then(response => response.json())
    .then(data=>{datos=data})
    .catch(error=>{
        contenedorCotizacionesError.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-24 h-24 mx-auto">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                                </svg>
                                                <p>${error}</p>                      
                                                <p class="text-2xl px-2">Ha ocurrido un error inesperado!</p>
                                                <p class="text-2xl">Recargue la página e intente nuevamente.</p>`;
    });
}

const pintoCotizaciones=()=>{
    contenedorCotizaciones.innerHTML='';
    datos.forEach(cotizacion => {
        const fragment = document.createDocumentFragment();
        const cotizado = document.createElement('div');
        cotizado.classList.add('text-3xl','text-center','bg-gray-100','rounded-box','p-2','w-full','flex','flex-col')
        cotizado.innerHTML=`<p class="font-semibold">${cotizacion.base} <span>${Math.trunc(cotizacion.rates.ARS)}</span></p>
                            <p class="text-base">Fecha de actualización:<br>${cotizacion.date}</p>   
                            `;
        fragment.append(cotizado)
        contenedorCotizaciones.append(fragment);
    });
}
*/
// pido las cotizaciones

const contenedorCotizaciones = document.getElementById('contenedorCotizaciones');
const URLS=[];
let datos=[];

let myHeaders = new Headers();
myHeaders.append("apikey", "s4bYzPdEyKwXOQ0G2UkG3EmIXgwFJFGP");

let requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

const pedirCotizaciones=async()=>{
    await fetch('https://api.apilayer.com/exchangerates_data/latest?symbols=ARS&base=USD',requestOptions)
    .then(response => response.json())
    .then(data=>{
        console.log(data)
        datos.push(data)
        /*const arrayCotizaciones = [data]
        arrayCotizaciones.map((dato)=>{
            const base = dato.base
            const fecha = dato.date
            const valor = dato.rates
        })*/
    })
    .catch(error=>console.log(error));
}

const pintoCotizaciones=()=>{
    contenedorCotizaciones.innerHTML='';
    datos.forEach(cotizacion => {
        const cotizado = document.createElement('div');
        cotizado.innerHTML=`<span>${cotizacion.base}</span>
                            <span>${cotizacion.date}</span>
                            <span>${cotizacion.rates.ARS}</span>`
        contenedorCotizaciones.append(cotizado);
    });
}
// guardo la API de Eventos en una variable

let ApiUrl = "https://mindhub-xj03.onrender.com/api/amazing"

// capturo los contenedores de las tablas del html que necesito

const tabla1 = document.getElementById('contenedortbody1')
const tabla2 = document.getElementById('contenedortbody2')
const tabla3 = document.getElementById('contenedortbody3')

fetch(ApiUrl)
.then(response => response.json())
.then(data => {
    
// declaración de variables que voy a utilizar para el fetch (promesa si se cumple)

let arrayEvents = data.events; 
console.log(arrayEvents);


// variable que llama a la función que crea los eventos pasados

const arrayPasadosFiltrados = crearArrayPasados(arrayEvents)

// variable que llama a la función que crea los eventos futuros

const arrayFuturosFiltrados = crearArrayFuturos(arrayEvents)

console.log(arrayPasadosFiltrados);
console.log(arrayFuturosFiltrados);

// variable que llama a la función que calcula el porcentaje de la asistencia

let arrayConPorcentaje = calcularPorcentaje(arrayPasadosFiltrados)

console.log(arrayConPorcentaje);

// variable que llama a la función que ordena de mayor a menor los eventos filtrados por porcentaje

let eventosMayorMenor = ordenarEventosMayorMenor(arrayConPorcentaje)
console.log(eventosMayorMenor);

console.log(eventosMayorMenor.length);

// variable que guarda el evento con menor porcentaje de eventos pasados

let eventoMenorPorc = eventosMayorMenor[(eventosMayorMenor.length) - 1]
console.log(eventoMenorPorc);

// variable que guarda el evento con mayor porcentaje de asistencia de eventos pasados

let eventoMayorPorc = eventosMayorMenor[0]
console.log(eventoMayorPorc);



// variable que llama a la función que ordena de mayor a menor los eventos filtrados por capacidad

let capacidadOrdenadaEventos = ordenarCapacidadMayorMenor(arrayConPorcentaje)
console.log(capacidadOrdenadaEventos);

// evento con mayor capacidad

let eventoMayorCap = capacidadOrdenadaEventos[1]
console.log(eventoMayorCap);


// arreglo que contiene los datos para la tabla 1
let arrayTabla1 = []
arrayTabla1.push(eventoMayorPorc)
arrayTabla1.push(eventoMenorPorc)
arrayTabla1.push(eventoMayorCap)

console.log(arrayTabla1);

// creación de arreglo con categorías sin repetir
const catSinRep = [...new Set(arrayEvents.map(events => events.category))];
console.log(catSinRep);

// función que crea un arreglo dentro de otro arreglo filtrado por categorías

function crearArraydeArrays(array){
 let arrayCategorias = catSinRep.map((categoria) => array.filter((evento) => evento.category == categoria)).filter(elemento => elemento.length)
 console.log(arrayCategorias); 
 return arrayCategorias
}

// variables que contienen la creación del filtro de eventos pasados y futuros por categoría

let arrayPasados = crearArraydeArrays(arrayPasadosFiltrados)
let arrayFuturos = crearArraydeArrays(arrayFuturosFiltrados)


// función que contiene los datos para las tablas 2 y 3

function crearDatosTabla(arraydeArrays){
    let resultadoMap = arraydeArrays.map(array => array.reduce((acumulador, elementoActual) => {
     acumulador.category = elementoActual.category
     acumulador.revenues += (elementoActual.assistance ?
        elementoActual.price * elementoActual.assistance : 
        elementoActual.price * elementoActual.estimate)
    acumulador.percentage += (elementoActual.assistance ?
        ((elementoActual.assistance * 100) / elementoActual.capacity)/array.length :
        ((elementoActual.estimate * 100) / elementoActual.capacity)/array.length)
    return acumulador
    },{category: "", revenues: 0, percentage: 0})
    
    
    )
    return resultadoMap
}

// variables con los datos para la tabla 2 y 3

let datosPasados = crearDatosTabla(arrayPasados)
let datosFuturos = crearDatosTabla(arrayFuturos)

// llamado de las funciones que imprimen las tablas con los datos que necesito
crearEstructuraTabla1(arrayTabla1)

crearEstructuraTabla2y3(datosFuturos, tabla2)

crearEstructuraTabla2y3(datosPasados, tabla3)

// cración del catch con un mensaje si ocurre algún error (promesa que no se cumple)
})
.catch(error => {
  console.error("Error al obtener datos de la API:", error);
});



// declaración de funciones que voy a utilizar


function crearArrayPasados(array){
    let arrayPasados = array.filter(evento => evento.assistance)
    return arrayPasados
}


function crearArrayFuturos(array){
    let arrayFuturos = array.filter(evento => evento.estimate)
    return arrayFuturos
}

function calcularPorcentaje(array){
    let arrayObjetoPorcentaje = array.map(evento => {
    let porcentaje = (evento.assistance * 100) / evento.capacity
    let objeto = {}
    objeto.porcentaje = porcentaje
    objeto.nombre = evento.name
    objeto.capacidad = evento.capacity

    return objeto

 })

 return arrayObjetoPorcentaje

}
function ordenarEventosMayorMenor(array){
    let eventosMayoraMenor = array.sort((a, b) => b.porcentaje-a.porcentaje)
    return eventosMayoraMenor
}

function ordenarCapacidadMayorMenor(array){
    let capacidadMayoraMenor = array.sort((a, b) => b.capacity-a.capacity)
    return capacidadMayoraMenor
}


function crearEstructuraTabla1(events) {
    let template = ""
    template = ` <tr>

    <td>${events[0].nombre} ${events[0].porcentaje.toFixed(2)}%</td>
    <td>${events[1].nombre} ${events[1].porcentaje.toFixed(2)}%</td>
    <td>${events[2].nombre} ${events[2].porcentaje.toFixed(2)}%</td>
    
</tr>
    `
    tabla1.innerHTML = template
}


function crearEstructuraTabla2y3(array, elementoHTML) {
    let template = ""

    for (let event of array){
        template += `

     <tr>

        <td>${event.category}</td>
        <td>$${event.revenues}</td>
        <td>${event.percentage.toFixed(2)}%</td>
    
     </tr>`


    }
   
    elementoHTML.innerHTML = template
}


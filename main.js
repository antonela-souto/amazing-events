// declaración de variables

let arrayEvents = data.events

const $input = document.querySelector("input[type='search']")
const $boton = document.querySelector("button[type='submit']")
console.log($boton);

let template = ""

// recorro el arreglo y para imprimir todas las cards

for (let events of arrayEvents) {

    template += `<div class="card" style="width: 18rem;">
    <img src="${events.image}" class="card-img-top" alt="..." height="200">
    <div class="card-body">
        <h5 class="card-title">${events.name}</h5>
        <p class="card-text"> ${events.description}</p>
        <p class="card-text"> Price: ${events.price}</p>
        <a href="details.html?id=${events._id}" class="btn btn-primary">Details</a>
    </div>
    </div>`
}
// capturo el contenedor del HTML donde se van a colocar las cards

const $contenedorcards = document.getElementById('contenedorcards')
console.log($contenedorcards)

$contenedorcards.innerHTML = template


const $contenedorChecks = document.getElementById('contenedorChecks')
console.log($contenedorChecks)

// creación de función para que no se repitan las categorías

const catSinRep = [...new Set(arrayEvents.map(events => events.category))]

// función donde se crea la estructura de checkboxs

function crearEstructuraCheks(string) {
    let template = ""
    template = `
    <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="${string}">
    <label class="form-check-label" for="inlineCheckbox2">${string}</label>
    `
    return template
}

// función que imprime checks por categoría

function imprimirChecksEnHTML(array, elementoHTML) {
    let estructura = ""
    array.forEach(categoria => {
        estructura += crearEstructuraCheks(categoria)
    });
    elementoHTML.innerHTML = estructura
}

imprimirChecksEnHTML(catSinRep, $contenedorChecks)

// función que filtra checks, según la categoría que se tilde

function filtrarPorChecks(array) {

    let nodeList = document.querySelectorAll("input[type='checkbox']:checked");
    let arrayValores = Array.from(nodeList).map(input => input.value);

    if (arrayValores.length === 0) {
        
        return arrayEvents
    } else {
        let objetosFiltradosPorCheck = arrayEvents.filter(event => arrayValores.includes(event.category));
        return objetosFiltradosPorCheck
        
    }
}




// escuchador que filtra, según la búsqueda del evento solicitado y devuelve la impresión de cards

$contenedorChecks.addEventListener("change", (e) => {
    const returnFiltroCruzado = filtrosCruzados(arrayEvents, $input)
    imprimirCardsEnHTML(returnFiltroCruzado, $contenedorcards)


})

// función que crea la estructura de las cards

function crearEstructuraCard(events) {
    let template = ""
    template = `
    <div div class="card" style="width: 18rem;">
         <img src="${events.image}" class="card-img-top" alt="...">
         <div class="card-body">
         <h5 class="card-title">${events.name}</h5>
         <p class="card-text">${events.description}</p>
         <p class="card-text"> Price: ${events.price}</p>
         <a href="details.html?id=${events._id}" class="btn btn-primary">Details</a>
         </div>
    </div>
    `
    return template
}

// función que imprime cards y si no se cumple con lo buscado, te envía una advertencia

function imprimirCardsEnHTML(array, elementoHTML) {
    if (array.length > 0) {
        let estructura = ""
        array.forEach(string => {
            estructura += crearEstructuraCard(string)
        })
        elementoHTML.innerHTML = estructura
    } else {
        elementoHTML.innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Atención</strong> Su búsqueda no coincide con ningún evento de la lista.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`

    }

}

// escuchador que filtra según el texto que se ingrese

$input.addEventListener('keyup', (e) => {
    e.preventDefault()
    console.log("string");
    const returnFiltroCruzado = filtrosCruzados(arrayEvents, $input)
    imprimirCardsEnHTML(returnFiltroCruzado, $contenedorcards)
   
})

// escuchador que filtra cuando se presiona el botón para enviar la búsqueda solicitada por texto

$boton.addEventListener('keyup', (e) => {
    e.preventDefault()
    const returnFiltroCruzado = filtrosCruzados(arrayEvents, $input)
    imprimirCardsEnHTML(returnFiltroCruzado, $contenedorcards)
})

// función que filtra el texto que se ingrese y lo convierte en minúsculas en caso de que alguna palabra esté en mayúscula
function filtrarporTexto(array, texto) {
    let arrayFiltrado = array.filter(evento => evento.name.toLowerCase().includes(texto.value.toLowerCase()))

    return arrayFiltrado
}



// función para filtros cruzados

function filtrosCruzados(array, input) {
    const arrayFiltradoChecks = filtrarPorChecks(array)
    const arrayFiltradoTexto = filtrarporTexto(arrayFiltradoChecks, input)
    return arrayFiltradoTexto
}


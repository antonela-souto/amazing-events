// guardo la API de Eventos en una variable

let ApiUrl = "https://mindhub-xj03.onrender.com/api/amazing"

fetch(ApiUrl)
    .then(response => response.json())
    .then(data => {

        // declaración de variables

        let arrayEvents = data.events


        const $input = document.querySelector("input[type='search']")
        const $boton = document.querySelector("button[type='submit']")
        console.log($boton);

        let fechaEventos = data.currentDate

        let arrayEventsPasados = []


        let template = ""

        // recorro el arreglo y para imprimir las cards de eventos pasados

        for (let events of arrayEvents) {
            if (events.date < fechaEventos) {
                arrayEventsPasados.push(events)
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
        }

        arrayEventsPasados = arrayEventsPasados

        // capturo el contenedor del HTML donde se van a colocar las cards
        const $contenedorcards3 = document.getElementById('contenedorcards3')
        console.log($contenedorcards3)

        $contenedorcards3.innerHTML = template

        // capturo el contenedor de checkbox del HTML donde se van a colocar las cards, según la categoría
        const $contenedorChecks3 = document.getElementById('contenedorChecks3')
        console.log($contenedorChecks3)

        // creación de variable para que no se repitan las categorías
        const catSinRep = [...new Set(arrayEvents.map(events => events.category))]



        imprimirChecksEnHTML(catSinRep, $contenedorChecks3)

        // escuchador que filtra, según la búsqueda del evento solicitado y devuelve la impresión de cards

        $contenedorChecks3.addEventListener("change", (e) => {
            const returnFiltroCruzado = filtrosCruzados(arrayEventsPasados, $input)
            imprimirCardsEnHTML(returnFiltroCruzado, $contenedorcards3)


        })


        // escuchador que filtra según el texto que se ingrese

        $input.addEventListener('keyup', (e) => {
            e.preventDefault()
            console.log("string");
            const returnFiltroCruzado = filtrosCruzados(arrayEventsPasados, $input)
            imprimirCardsEnHTML(returnFiltroCruzado, $contenedorcards3)

        })


        // escuchador que filtra cuando se presiona el botón para enviar la búsqueda solicitada por texto

        $boton.addEventListener('keyup', (e) => {
            e.preventDefault()
            const returnFiltroCruzado = filtrosCruzados(arrayEventsPasados, $input)
            imprimirCardsEnHTML(returnFiltroCruzado, $contenedorcards3)
        })

        // cración del catch con un mensaje si ocurre algún error (promesa que no se cumple)
    })
    .catch(error => {
        console.error("Error al obtener datos de la API:", error);
    });

// --------------------------------------------------------------------------------------------------------------------
// Declaración de funciones

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




// función que filtra checks, según la categoría que se tilde

function filtrarPorChecks(arrayEventsPasados) {

    let nodeList = document.querySelectorAll("input[type='checkbox']:checked");
    let arrayValores = Array.from(nodeList).map(input => input.value);

    if (arrayValores.length === 0) {

        return arrayEventsPasados
    } else {
        let objetosFiltradosPorCheck = arrayEventsPasados.filter(event => arrayValores.includes(event.category));
        return objetosFiltradosPorCheck

    }
}

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
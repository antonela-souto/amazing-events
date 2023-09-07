// declaración de variables

const locationSearch = location.search

const objetoURL = new URLSearchParams(locationSearch)

const valorKeyParams = objetoURL.get('id')

let arrayEvents = data.events

let nombreEvento = arrayEvents.find(events => events._id == valorKeyParams)


// capturo el contenedor del HTML donde se van a colocar las cards

const $contenedordetalles = document.getElementById('contenedordetalles')
console.log($contenedordetalles);

// función que crea la estructura de las cards

function crearEstructuraCard(events) {
    let template = ""
    template = `
  <div class="col-md-5">
    <img src="${events.image}" class="img-fluid rounded-start" alt="imgprin" height="80">
  </div>
    <div class="contenedortext col-md-5 p-4 border">
    <div class="card-body">
        <h3 class="card-title p-3 text-center">${events.name}</h3>
        <p class="card-text text-center">${events.description}</p>
        <ul>
            <li class="li3">Date: ${events.date}</li>
            <li class="li2">Place: ${events.place}</li>
            <li class="li4">Price: ${events.price}</li>
            <li class="li4">Capacity: ${events.capacity}</li>
        </ul>

    </div>

    `
    return template
}

// función que imprime cards 

function imprimirCardsEnHTML(elementoHTML, events) {
 elementoHTML.innerHTML = crearEstructuraCard(events)
}

imprimirCardsEnHTML($contenedordetalles, nombreEvento)

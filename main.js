let arrayEvents = data.events


let template = ""

for (let events of arrayEvents){

template += `<div class="card" style="width: 18rem;">
    <img src="${events.image}" class="card-img-top" alt="..." height="200">
    <div class="card-body">
        <h5 class="card-title">${events.name}</h5>
        <p class="card-text"> ${events.description}</p>
        <p class="card-text"> Price: ${events.price}</p>
        <a href="details.html" class="btn btn-primary">Details</a>
    </div>
    </div>`
} 
const $contenedorcards = document.getElementById('contenedorcards')
console.log($contenedorcards)

$contenedorcards.innerHTML = template

let arrayEvents = data.events


let fechaEventos = data.currentDate



let template = ""

for (let events of arrayEvents){
if (events.date > fechaEventos){
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
}

const $contenedorcards2 = document.getElementById('contenedorcards2')
console.log($contenedorcards2)

$contenedorcards2.innerHTML = template

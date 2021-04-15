let cards = localStorage["CardsInStorage"] 
let parsedCards = JSON.parse(cards).length > 0?JSON.parse(cards):[]
console.log(parsedCards)
// var cardCount = parsedCards.length


var cardsInDeck = document.querySelector(".card-count")
let cardCount = 0
var cardsInStorage = localStorage.getItem("CardsInStorage");

if (cardsInStorage) {
    cardCount = JSON.parse(localStorage["CardsInStorage"]).length
    cardsInDeck.innerHTML = `Cards in deck: ${cardCount}/40`
}

// const removeCard 


if (parsedCards.length > 0){
    parsedCards.forEach((card, i) => {
        var deckDiv = document.querySelector(".player-deck")
        var imageDiv = `<img src=${card.assets[0].gameAbsolutePath}>`;
        var buttonDiv = `<button onClick="removeCard(${i})">Remove</button>`;
        var cardDiv = `<div class="card">${imageDiv} ${buttonDiv}</div>`;
        deckDiv.insertAdjacentHTML('beforeend', cardDiv)
    })   
}


// Clear local storage on click
const reset = document.querySelector(".reset-button")
reset.addEventListener('click', function() {
    cardCount = 0; 
    cardsInDeck.innerHTML = `Cards in deck: ${cardCount}/40`
    localStorage.removeItem("CardsInStorage")
})

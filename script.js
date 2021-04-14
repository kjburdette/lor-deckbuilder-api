const searchButton = document.querySelector(".search-button");

// Defining all global variables
let gameData = [];
let playerDeck = [];
let filteredCards = [];


// Fetch card data
const getCardData = async () => {

    const data1 = await fetch("./set1-en_us.json")
    const data2 = await fetch("./set2-en_us.json")
    const data3 = await fetch("./set3-en_us.json")
    const data4 = await fetch("./set4-en_us.json")
    const json1 = await data1.json()
    const json2 = await data2.json()
    const json3 = await data3.json()
    const json4 = await data4.json()


    gameData = json1.concat(json2, json3, json4)
    console.log(gameData)
}

getCardData();


const filterData = (data) => {
    let container = document.querySelector(".main-container");
    container.innerHTML = "";
    
    let set = document.querySelector(".set-select").value;
    let region = document.querySelector(".region-select").value;
    let cardType = document.querySelector(".card-type").value;
    
    filteredCards = data.filter(data => data);
    
    if (set !== "All"){
        filteredCards = filteredCards.filter(card => card.set === set);
    }
    
    if (region !== "All") {
        filteredCards = filteredCards.filter(card => card.regionRef === region);
        filteredCards = filteredCards.filter(card => card.subtypes[0] !== "MOON WEAPON");
    }
    
    if (cardType === "All"){
        filteredCards = filteredCards.filter(card => card.rarity !== "None");
    } else if(cardType === "Champion") {
        filteredCards = filteredCards.filter(card => card.type === "Unit");
        filteredCards = filteredCards.filter(card => card.supertype === cardType);
        filteredCards = filteredCards.filter(card => card.levelupDescription);
        filteredCards = filteredCards.filter(card => card.rarity !== "None");
    } else if(cardType === "Unit") {
        filteredCards = filteredCards.filter(card => card.type === "Unit");
        filteredCards = filteredCards.filter(card => card.supertype !== "Champion");
        filteredCards = filteredCards.filter(card => card.subtype !== "CELESTIAL");
        filteredCards = filteredCards.filter(card => card.levelupDescription === "");
    } else if(cardType === "Spell") {
        filteredCards = filteredCards.filter(card => card.type === "Spell");
        filteredCards = filteredCards.filter(card => card.supertype !== "Champion");
        filteredCards = filteredCards.filter(card => card.rarity !== "None");
        filteredCards = filteredCards.filter(card => card.subtypes[0] !== "MOON WEAPON");
    } else {
        filteredCards = filteredCards.filter(card => card.type === "Landmark");
    }
    
    console.log(filteredCards)
    
    filteredCards.forEach((card, i) => {
        var imageDiv = `<img src=${card.assets[0].gameAbsolutePath}>`;
        var buttonDiv = `<button onClick="addCardToDeck(${i})">Add to Deck</button>`;
        var cardDiv = `<div class="card">${imageDiv} ${buttonDiv}</div>`;
        container.insertAdjacentHTML('beforeend', cardDiv)
        
    })
}

const addCardToDeck = (index) => {
    playerDeck.push(filteredCards[index]);
    console.log(playerDeck);
} 

searchButton.addEventListener('click', function() {
    filterData(gameData)
})


let selects = document.querySelectorAll("select");
selects.forEach((select) => {
    select.addEventListener("change", function() {
        filterData(gameData)
    })
})
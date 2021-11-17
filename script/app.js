var arrcards=[];
const arrHigh = ['10','JACK','QUEEN','KING','ACE'];
const arrLow = ['2','3','4','5','6'];
const arrNeutral = ['7','8','9'];
var count = 0;
var initialBet = 0;

const get = (url) => fetch(url).then((r) => r.json());

let calculate_true_count = async (cards_remaining) =>{
    const numberDecksLeft = cards_remaining/52
    console.log(count)
    console.log(numberDecksLeft)
    let true_count = Math.round(count/numberDecksLeft);
    console.log(true_count)
    // if (true_count == 0){
    //     true_count = 1 
    // }
    if (true_count < 0){
        true_count = 0
    }
    let bet = ((true_count) * initialBet)
    
    console.log(bet)
    
}

let getCards = async (deckId) => {
    // console.log(deckId)
    const endPointDraw = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`

    const drawesponse = await get(endPointDraw);
    console.log(drawesponse)
    // console.log(drawesponse["remaining"])
    if(drawesponse["success"]==true){
        const cards = drawesponse["cards"]
        // console.log(cards)
        const card1 = cards[0]
        // console.log(card1["value"])
        const card2 = cards[1]
        // console.log(card2["value"])
        arrcards.push(card1["value"])
        arrcards.push(card2["value"])
        console.log(arrcards) 
        // console.log(count)
        var svg = card1["images"];
        console.log(svg["png"])
        var design = document.querySelector(".js-card1");
        design.innerHTML = svg["png"];

        for(const card of arrcards){
            // console.log(card)
            if(arrHigh.includes(card)){
                // console.log("+1")
                count += 1
            } 
            else if(arrLow.includes(card)){
                // console.log("-1")
                count -= 1
            } 
            else if(arrNeutral.includes(card)){
                // console.log("0")
            } else{
                console.log("something wrong happend")
            }
        }
        arrcards = [];
        // if(arrHigh.includes(card1["value"])){
        //     // console.log("+1")
        //     count += 1
        // } 
        // else if(arrLow.includes(card1["value"])){
        //     // console.log("-1")
        //     count -= 1
        // } 
        // else if(arrNeutral.includes(card1["value"])){
        //     // console.log("0")
        // } else{
        //     console.log("something wrong happend")
        // }
        
        // if(arrHigh.includes(card2["value"])){
        //     // console.log("+1")
        //     count += 1
        // } 
        // else if(arrLow.includes(card2["value"])){
        //     // console.log("-1")
        //     count -= 1
        // } 
        // else if(arrNeutral.includes(card2["value"])){
        //     // console.log("0")
        // } else{
        //     console.log("something wrong happend")
        // }
        // console.log(count)
        // console.log(arrcards.length)
    } else{
        console.log(count)
        console.log("no cards left")
    }
    calculate_true_count(drawesponse["remaining"] )
} 

let getAPI = async (deck_count) => {
	// Eerst bouwen we onze url op
	const endPoint = `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=${deck_count}`
	// Met de fetch API proberen we de data op te halen.
	console.log(endPoint)
    const deckResponse = await get(endPoint);
	console.log(deckResponse)
	// Als dat gelukt is, gaan we naar onze showResult functie.
	const deckId = deckResponse["deck_id"];
    console.log(deckId)
    const deck =  document.querySelector(".js-button")
    deck.addEventListener("click",function(){
        getCards(deckId)
    })  
};

document.addEventListener('DOMContentLoaded', function() {
	// 1 We will query the API with longitude and latitude.
	initialBet = 25
    getAPI(2);
    // console.log(deckId)
    
});
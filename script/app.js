
const get = (url) => fetch(url).then((r) => r.json());

let getCards = async (deckId) => {
    console.log(deckId)
    const endPointDraw = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`

    const drawesponse = await get(endPointDraw);
    console.log(drawesponse)
    for(const card in drawesponse["cards"]){
        console.log(card["value"]) 
        console.log(card);
        
    }

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
    getCards(deckId)
};




document.addEventListener('DOMContentLoaded', function() {
	// 1 We will query the API with longitude and latitude.
	getAPI(6);
    // console.log(deckId)
    
});
var arrcards=[];
const arrHigh = ['10','JACK','QUEEN','KING','ACE'];
const arrLow = ['2','3','4','5','6'];
const arrNeutral = ['7','8','9'];
var count = 0;
var initialBet = 0;
var ownCount = 0;
var myChart;

const labels = [
    ''
];

const data = {
    labels: labels,
    datasets: [{
        label: 'How mutch should you bet',
        backgroundColor: '#d12721',
        borderColor: '#d12721', 
        data: [0]
    }]
};
  
const config = {
type: 'bar',
data: data,
options: {
    indexAxis: 'y',
    plugins: {
        legend: false
    },
    scales: {
        x: {
            grid: {
                color: 'white'
            },
            
            min:0,
            max: 25,
            ticks: {
                color: 'white',
                stepSize: 1  
            }
        },
        y:{
            grid: {
                color: 'white',
                ticks: {
                    color: 'white'
                }
            }, 
        }
    },
    elements: {
        bar: {
          backgroundColor: 'rgb(0, 0, 0)',
          borderColor: 'rgb(0, 0, 0)',
          borderWidth: 2
        }
    }

}
};



const get = (url) => fetch(url).then((r) => r.json());

let calculate_true_count = (cards_remaining) =>{
    if (cards_remaining!=0){
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
        
        console.log(bet);
        var bedrag = [bet];
        drawChart(bedrag);
    } else{
        console.log("no cards remaining")
    }  
}

const drawChart = (bedrag) =>{
    const datasets  = myChart.data.datasets;
    console.log(datasets)
    for(const dataset of datasets ){
      dataset.data = bedrag
    //   console.log(myChart.data.datasets.data);
    }
    myChart.update();
}

const checkCount = () =>{
    ownCount = document.querySelector(".js-count").value;
    var button = document.querySelector(".js-info-check");
    // console.log(ownCount)
    if(ownCount==count){
        console.log("correct")
        button.classList.remove("is-wrong");
    } else if(ownCount!=count){
        console.log("Wrong")
        button.classList.add("is-wrong");
    }
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
        design.innerHTML = `<img src="${svg["png"]}" class="c-card"></img>`;
        
        var svg2 = card2["images"];
        // console.log(svg["png"])
        var design2 = document.querySelector(".js-card2");
        design2.innerHTML = `<img src="${svg2["png"]}" class="c-card" height="310px"></img>`;

        for(const card of arrcards){
            // console.log(card)
            if(arrHigh.includes(card)){
                // console.log("+1")
                count -= 1
            } 
            else if(arrLow.includes(card)){
                // console.log("-1")
                count += 1
            } 
            else if(arrNeutral.includes(card)){
                // console.log("0")
            } else{
                console.log("something wrong happend")
            }
        }
        arrcards = [];
        calculate_true_count(drawesponse["remaining"]);
    } else{
        console.log(count)
        console.log("no cards left")
    }
} 

let getAPI = async (deck_count) => {
	
	const endPoint = `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=${deck_count}`

	// console.log(endPoint)
    const deckResponse = await get(endPoint);
	console.log(deckResponse)
	const deckId = deckResponse["deck_id"];
    // console.log(deckId)
    const deck =  document.querySelector(".js-button")
    deck.addEventListener("click",function(){
        getCards(deckId)
    })  
    
    

    const check =  document.querySelector(".js-info-check")
    check.addEventListener("click",function(){
        checkCount();
    })  
};

document.addEventListener('DOMContentLoaded', function() {
	// 1 We will query the API with longitude and latitude.
	initialBet = 1;
    getAPI(6);

    graph = document.querySelector(".js-graph").getContext('2d');

    myChart = new Chart(
        graph, 
        config
    );

    // console.log(deckId)
    
});
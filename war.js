document.querySelector("#createDeck").addEventListener("click", createDeck)
document.querySelector("#drawTwoCards").addEventListener("click", drawTwoCards)

let deckId = ""

fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
.then(res => res.json())
.then(data => {
    console.log(data)
    deckId = data.deck_id
})
.catch(err => {
    console.log(`error ${err}`)
});

function createDeck(){
    fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        deckId = data.deck_id
    })
    .catch(err => {
        console.log(`error ${err}`)
    });

}

    function drawTwoCards(){
    
        fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            document.querySelector("#playerCard").src = data.cards[0].image
            document.querySelector("#computerCard").src = data.cards[1].image
            document.querySelector("#cardsRemaining").innerText = `Cards Remaining: ${data.remaining}`
            let playerCardValue = convertsValueToNumber(data.cards[0].value)
            let computerCardValue = convertsValueToNumber(data.cards[1].value)


            if(playerCardValue > computerCardValue){
                document.querySelector("#gameResult").innerText = "Player Wins!"
            }else if(computerCardValue > playerCardValue){
                document.querySelector("#gameResult").innerText = "Computer Wins!"
            }else document.querySelector("#gameResult").innerText = "War!"


        })
        .catch(err => {
            console.log(`error ${err}`)
        });
        
        }


        function convertsValueToNumber(value){
            if(value === "ACE"){
                return 14
            }else if(value === "KING"){
                return 13
            }else if(value === "QUEEN"){
                return 12
            }else if (value === "JACK"){
                return 11
            }else return Number(value)
        }
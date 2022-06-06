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

    function drawTwoCards(){
    
        fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            document.querySelector("#playerCard").src = data.cards[0].image
            document.querySelector("#computerCard").src = data.cards[1].image
            document.querySelector("#cardsRemaining").innerText = `Cards Remaining: ${data.remaining}`
        })
        .catch(err => {
            console.log(`error ${err}`)
        });
        
        }
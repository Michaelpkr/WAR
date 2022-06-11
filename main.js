document.addEventListener("click", (e) => {
  let target = e.target.innerText
  if (target == "Start Game"){
    startGame()
  } else if (target == "Draw Card") {
    drawCards()
  }
})

let deck = {
  id: 'string'
}
let player = {
  hand: []
}
let computer = {
  hand: []
}

async function startGame(){
  data = await getNewDeck()
  deck.id = data.deck_id
  console.log("Game Started", deck)
  // TODO: reset game
}

async function drawCards(count = 2){
  const DECK_OF_CARDS_URL = `https://deckofcardsapi.com/api/deck/${deck.id}/draw/?count=${count}`
  const data = await fetch(DECK_OF_CARDS_URL)
  .then(res => res.json())
  data.cards.forEach((card, index) => {
    if (index == 0 || index % 2 == 0) {
      player.hand.push(card)
    } else {
      computer.hand.push(card)
    }
  })
  showHands(player, computer)
}

async function getNewDeck(count = 1){
  const DECK_OF_CARDS_URL = `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=${count}`
  const data = await fetch(DECK_OF_CARDS_URL)
  .then(res => res.json())
  return data
}

function showHands(player, computer){
  const playerImage = document.getElementById('player')
  const computerImage = document.getElementById('computer')
  playerImage.setAttribute('src', player.hand.at(-1).images.svg)
  computerImage.setAttribute('src', computer.hand.at(-1).images.svg)
  calculateRoundWinner(player, computer)
}

function calculateRoundWinner(player, computer){
  let playerCard
  let computerCard
  switch (player.hand.at(-1).value){
    case 'ACE':
      playerCard = 14
      break
    case 'KING':
      playerCard = 13
      break
    case 'QUEEN':
      playerCard = 12
      break
    case 'JACK':
      playerCard = 11
      break
    default:
      playerCard = Number(player.hand.at(-1).value)
      break
  } 
  switch (computer.hand.at(-1).value){
    case 'ACE':
      computerCard = 14
      break
    case 'KING':
      computerCard = 13
      break
    case 'QUEEN':
      computerCard = 12
      break
    case 'JACK':
      computerCard = 11
      break
    default:
      computerCard = Number(computer.hand.at(-1).value)
      break
  } 
  if (playerCard == computerCard) {
    console.log('player shows', playerCard, 'computer shows', computerCard, 'Go to war!')
  } else {
    let roundWinner = (playerCard < computerCard) ? 'computer' : 'player'

    console.log('player shows', playerCard, 'computer shows', computerCard, roundWinner, 'wins')
  }

  // TODO: handle winner
}

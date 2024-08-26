import { useState } from 'react'
import { useEffect } from 'react'
import SingleCard from './components/SingleCard'
import './App.css'

const cardImages = [
  {"src": "img/helmet.png", matched: false},
  {"src": "img/potion.png", matched: false},
  {"src": "img/ring.png", matched: false},
  {"src": "img/scroll.png", matched: false},
  {"src": "img/shield.png", matched: false},
  {"src": "img/sword.png", matched: false}
  ]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({ ...card, id: Math.random() }))

    setCards(shuffledCards)
    setTurns(0)
  }

  // handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  // compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)

      if (choiceOne.src === choiceTwo.src) {
        setCards( prevCards => prevCards.map(card => {
          if (card.src === choiceOne.src) {
            return { ...card, matched: true }
          }
          return card
        })),
        resetTurn()
      } else {
        setTimeout(() => { resetTurn() }, 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  // reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  console.log(cards)

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map(card => (
          <SingleCard key={card.id}
          card={card}
          handleChoice={handleChoice}
          flipped={card === choiceOne || card === choiceTwo || card.matched}
          disabled={disabled}
          />
        ))}
      </div>
    </div>
  )
}

export default App

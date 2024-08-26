import "./SingleCard.css";

export default function SingleCard({ card, handleChoice }) {
  return (
    <div className="card">
      <div>
        <img className="front" src={card.src} alt="card front" onClick={() => handleChoice(card)}/>
        <img className="back" src="/img/cover.png" alt="card back" />
      </div>
    </div> 
  );
}

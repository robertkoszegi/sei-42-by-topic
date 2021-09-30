export default function LineItem(props) {
  return (
    <div className="LineItem">
      <div>{props.emoji}</div>
      <div className="nameprice">
        <span>{props.name}</span>
        <span>${props.price}</span>
      </div>
      <div className="qty">
        <button>−</button>
        <span>{props.qty}</span>
        <button>+</button>
      </div>
      <div className="itemprice">${props.qty*props.price}</div>
    </div>
  );
}
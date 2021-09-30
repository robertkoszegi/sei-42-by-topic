import './LineItem.css'

export default function LineItem(props) {
  return (
    <div className="LineItem">
      <div className="flex-ctr-ctr">{props.lineItem.item.emoji}</div>
      <div className="flex-ctr-ctr flex-col">
        <span className="align-ctr">{props.lineItem.item.name}</span>
        <span>$3.95</span>
      </div>
      <div className="qty" style={{ justifyContent: 'center' }}>
        <button className="btn-xs" onClick={()=>alert('- clicked!')}>−</button>
        <span>{props.lineItem.qty}</span>
        <button className="btn-xs" onClick={()=>alert('+ clicked!')}>+</button>
      </div>
      <div className="ext-price">${props.lineItem.item.price}</div>
    </div>
  );
}
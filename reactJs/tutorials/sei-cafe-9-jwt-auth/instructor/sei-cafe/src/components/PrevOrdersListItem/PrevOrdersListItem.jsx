import './PrevOrdersListItem.css';

function calculateTotalQty(lineItems) {
  let sum = 0;
  for (let item of lineItems) {
    sum += item.qty
  }
  return sum;
}

function calculateTotalPrice(lineItems) {
  let totalPrice = 0
  for (let item of lineItems) {
    totalPrice += item.item.price * item.qty
  }
  return totalPrice;
}

export default function PrevOrdersListItem(props) {
  let localTime = new Date(props.order.updatedAt).toLocaleString()
  let totalQty = calculateTotalQty(props.order.lineItems)
  let totalPrice = calculateTotalPrice(props.order.lineItems)
  console.log(totalPrice)
  return (
    <div className="PrevOrdersListItem">
      <div>
        <div>Order Id: <span className="smaller">{props.order._id}</span></div>
        <div className="smaller">{localTime}</div>
      </div>
      <div className="align-rt">
        <div>${totalPrice.toFixed(2)}</div>
        <div className="smaller">{totalQty} Items</div>
      </div>
    </div>
  )
}
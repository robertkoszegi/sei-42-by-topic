import LineItem from '../LineItem/LineItem';
import './OrderDetail.css'

function OrderDetail(props) {
  // this is a normal javascript comment intended to inform you that
  // you can do calculations and declare variables above the return statement!
  let todaysDate = (new Date()).toLocaleDateString()

  // calculate the total cart price by iterating over all the lineitems
  let totalCartPrice = 0;
  for (let l of props.lineItems) {
    totalCartPrice += l.item.price * l.qty
  }

  return (
      <div className='OrderDetail'>
        <div className='section-heading'>
          <span className="smaller">NEW ORDER</span>
          {/** This is a JSX comment! */}
          <span className="smaller">{todaysDate}</span>
        </div>
	      <div className="line-item-container flex-ctr-ctr flex-col scroll-y">
          {props.lineItems.map(i => <LineItem lineItem={i} />)}
          <section className="total">
            <button className="btn-sm" onClick={()=>{props.handleCheckout()}}>CHECKOUT</button>
            <span>${totalCartPrice.toFixed(2)}</span>
          </section>
        </div>
      </div>
  );
}

export default OrderDetail;
// When using JSX, React must be in scope
import React from 'react';
import LineItem from '../LineItem/LineItem';

function OrderDetail(props) {
  // this is a normal javascript comment intended to inform you that
  // you can do calculations and do normal javascript ABOVE the return statement!
  let todaysDate = (new Date()).toLocaleDateString()

  return (
      <div className='OrderDetail'>
        <div className='OrderDetail-heading'>
          <span>ORDER #{props.orderId}</span>
          <span>{todaysDate}</span>
        </div>
	      <div className='OrderDetail-container'>
          <br />
          {props.lineItems.map(m =>
            <LineItem qty={m.qty} name={m.item.name} price={m.item.price} emoji={m.item.emoji}/>
            )}
          <section className="total">
            <button className="btn-sm">CHECKOUT</button>
            <span>${props.orderTotal}</span>
          </section>
          <div>
            Paid: {props.isPaid}
          </div>
        </div>
      </div>
  );
}

export default OrderDetail;
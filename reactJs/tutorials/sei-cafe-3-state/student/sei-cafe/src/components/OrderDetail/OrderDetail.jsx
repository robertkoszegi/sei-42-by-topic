// When using JSX, React must be in scope
import React from 'react';
import LineItem from '../LineItem/LineItem';

function OrderDetail(props) {
  // this is a normal javascript comment intended to inform you that
  // you can do calculations and declare variables above the return statement!
  let todaysDate = (new Date()).toLocaleDateString()

  return (
      <div className='OrderDetail'>
        <div className='OrderDetail-heading'>
          <span>ORDER #5</span>
          {/** This is a JSX comment! */}
          <span>{todaysDate}</span>
        </div>
	      <div className='OrderDetail-container'>
          <br /><br />
          <LineItem />
          <LineItem />
          <section className="total">
            <button className="btn-sm">CHECKOUT</button>
            <span>$75</span>
          </section>
        </div>
      </div>
  );
}

export default OrderDetail;
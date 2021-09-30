import LineItem from '../LineItem/LineItem';
import './OrderDetail.css'

function OrderDetail(props) {
  // this is a normal javascript comment intended to inform you that
  // you can do calculations and declare variables above the return statement!
  let todaysDate = (new Date()).toLocaleDateString()

  return (
      <div className='OrderDetail'>
        <div className='section-heading'>
          <span className="smaller">ORDER #???</span>
          {/** This is a JSX comment! */}
          <span className="smaller">{todaysDate}</span>
        </div>
	      <div className="line-item-container flex-ctr-ctr flex-col scroll-y">
          {props.lineItems.map(i => <LineItem lineItem={i} />)}
          <section className="total">
            <button className="btn-sm" onClick={()=>alert('checkout clicked!')}>CHECKOUT</button>
            <span>$75</span>
          </section>
        </div>
      </div>
  );
}

export default OrderDetail;
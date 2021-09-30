import './PrevOrdersList.css';
import PrevOrderListItem from '../PrevOrdersListItem/PrevOrdersListItem'

export default function PrevOrdersList(props) {
  let orderHistoryArray = props.orderHistory.map( o => 
    <PrevOrderListItem order={o} />)

  return(
    <main className="PrevOrdersList">
      {/** is there more than one order in the order history? okay then display it */}
      {orderHistoryArray.length > 0 ?
        orderHistoryArray
        :
        <span className="no-orders">No Previous Orders</span>
      }
    </main>
  )
}
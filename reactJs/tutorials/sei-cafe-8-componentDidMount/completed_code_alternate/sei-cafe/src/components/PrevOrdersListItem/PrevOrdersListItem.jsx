import './PrevOrdersListItem.css';

export default function PrevOrdersListItem(props) {
  return (
    <div className="PrevOrdersListItem">
      <div>
        <div>Order Id: <span className="smaller">73</span></div>
        <div className="smaller">{new Date().toLocaleDateString()}</div>
      </div>
      <div className="align-rt">
        <div>$75</div>
        <div className="smaller">5 Items</div>
      </div>
    </div>
  )
}
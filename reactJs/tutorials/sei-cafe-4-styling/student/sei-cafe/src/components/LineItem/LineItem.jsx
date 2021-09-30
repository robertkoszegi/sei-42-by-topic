
export default function LineItem(props) {
  return (
    <div className="DefinitelyNotLineItem">
      <div className="flex-ctr-ctr">🥗</div>
      <div className="flex-ctr-ctr flex-col">
        <span className="align-ctr">Green Salad</span>
        <span>$3.95</span>
      </div>
      <div className="qty">
        <button className="btn-xs">−</button>
        <span>70</span>
        <button className="btn-xs">+</button>
      </div>
      <div class="ext-price">$3.95</div>
    </div>
  );
}
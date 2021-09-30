export default function LineItem(props) {
  return (
    <div className="LineItem">
      <div>🥗</div>
      <div class="nameprice">
        <span>Green Salad</span>
        <span>$3.95</span>
      </div>
      <div class="qty">
        <button>−</button>
        <span>70</span>
        <button>+</button>
      </div>
      <div class="itemprice">$3.95</div>
    </div>
  );
}
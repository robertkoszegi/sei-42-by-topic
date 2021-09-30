// When using JSX, React must be in scope
import './MenuList.css'
import MenuListItem from '../MenuListItem/MenuListItem';

function MenuList(props) {
  return (
      <div  className="MenuList">
        {props.menuItems.map(m =>
          <MenuListItem item={m} handleAddToCart={props.handleAddToCart} />)}
      </div>
  );
}

export default MenuList;
// When using JSX, React must be in scope
import React from 'react';
import MenuListItem from '../MenuListItem/MenuListItem';

function MenuList(props) {
  return (
      <div className="MenuList">
        {/* For each m in menuitems (eg., {id:"0",name:"Hamburger", price:5.95, emoji:"🍔", category: "Sandwiches"}, */}
        {/*                             or {id:"1",name:"Ice Cream", price:1.95, emoji:"🍨",category: "Desserts"}, */}
        {/* make a MenuListItem show up. */}
        {/* Additionally, give the menuListItem the current m's name + price */}
        {props.menuItems.map(m =>
          <MenuListItem name={m.name} price={m.price} emoji={m.emoji}/>
        )}
      </div>
  );
}

export default MenuList;
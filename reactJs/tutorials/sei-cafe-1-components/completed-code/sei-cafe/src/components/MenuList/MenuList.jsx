// When using JSX, React must be in scope
import React from 'react';
import MenuListItem from '../MenuListItem/MenuListItem';

function MenuList(props) {
  return (
      <div className='component'>
        MenuList
        <MenuListItem />
        <MenuListItem />
      </div>
  );
}

export default MenuList;
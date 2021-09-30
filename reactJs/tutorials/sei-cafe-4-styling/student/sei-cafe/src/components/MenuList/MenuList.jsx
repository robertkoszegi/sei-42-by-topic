import MenuListItem from '../MenuListItem/MenuListItem';

function MenuList(props) {
  return (
      <div className='NothingSpecial'>
        {props.menuItems.map(m =>
          <MenuListItem name={m.name} price={m.price} emoji={m.emoji} />)}
      </div>
  );
}

export default MenuList;
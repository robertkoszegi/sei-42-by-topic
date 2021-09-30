import MenuListItem from '../MenuListItem/MenuListItem';
import styles from './MenuList.module.css' // module import


function MenuList(props) {
  return (
      <div className={styles.div}>
        {props.menuItems.map(m =>
          <MenuListItem name={m.name} price={m.price} emoji={m.emoji} />)}
      </div>
  );
}

export default MenuList;
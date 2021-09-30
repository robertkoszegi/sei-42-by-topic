import MenuListItem from "../MenuListItem/MenuListItem";
import styles from "./MenuList.module.css";
console.log(styles);

function MenuList(props) {
  return (
    <div className={`${styles.div} btn btn-primary`}>
      {props.menuItems.map((m) => (
        <MenuListItem name={m.name} price={m.price} emoji={m.emoji} />
      ))}
    </div>
  );
}

export default MenuList;

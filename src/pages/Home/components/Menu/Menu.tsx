import "./menu.css";
// components
import MenuItem from "./MenuItem";
//
const Menu: React.FC = () => {
  return (
    <div className="menu">
      <MenuItem itemTitle="Subject 1" />
      <MenuItem itemTitle="Subject 2" />
      <MenuItem itemTitle="Subject 3" />
      <MenuItem itemTitle="Subject 4" />
    </div>
  );
};

export default Menu;

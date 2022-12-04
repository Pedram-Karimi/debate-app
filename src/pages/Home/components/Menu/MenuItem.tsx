import { Link } from "react-router-dom";

// props interface
interface Props {
  itemTitle: string;
}
//
const MenuItem: React.FC<Props> = ({ itemTitle }) => {
  return (
    // <Link
    //   to={"/" + itemTitle.toLowerCase().split(" ").join("-")}
    //   className="link"
    // >
    <div className="menuItem">
      <h1>{itemTitle}</h1>
    </div>
    // </Link>
  );
};

export default MenuItem;

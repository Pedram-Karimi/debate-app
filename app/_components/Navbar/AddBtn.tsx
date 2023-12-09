import { FaPlus } from "react-icons/fa";
import Link from "next/link";
function AddBtn() {
  return (
    <div>
      <Link href="/create/debate">
        <FaPlus className="h-6 w-6 cursor-pointer" />
      </Link>
    </div>
  );
}

export default AddBtn;

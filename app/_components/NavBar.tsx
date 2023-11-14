import Link from "next/link";
const NavBar: React.FC = () => {
  return (
    <div className="w-full h-16 p-6 border-b border-[var(--border-color-2)] justify-between flex items-center z-20 fixed top-0 backdrop-blur-xl bg-[var(--wrapper-1)]">
      <Link href="/">
        <h1 className="text-4xl cursor-pointer">Logo</h1>
      </Link>
      <div className="w-[35%]">
        <form className="w-[100%]">
          <input
            className="bg-[var(--wrapper-2)] w-[70%] outline-none p-2 rounded-lg border border-[var(--border-color-2)] rounded-r-none border-r-0"
            placeholder="Search"
          />
          <button className="bg-[var(--wrapper-2)]  p-2 rounded-lg border border-[var(--border-color-2)] rounded-l-none">
            Search
          </button>
        </form>
      </div>
      <div>
        <div className="flex gap-2">
          <Link href="/login" className="decoration-none">
            <button className="text-[var(--text-color)] px-5 py-[6px]  rounded-lg bg-[var(--dark-text)]  text-black transition hover:bg-[var(--text-color)]">
              Sign In
            </button>
          </Link>
          <Link href="/signup" className="decoration-none">
            <button className="text-[var(--text-color)] px-5 py-[6px]  rounded-lg bg-[var(--dark-text)]  text-black transition hover:bg-[var(--text-color)]">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
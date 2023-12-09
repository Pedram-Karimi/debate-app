"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import NavUserAva from "./NavUserAva";
function AuthBtns() {
  const { data, status } = useSession();
  console.log(data, status);
  return (
    <>
      <div className={`gap-2 ${data ? "hidden" : "flex"}`}>
        <Link href="/auth/signin" className="decoration-none">
          <button className="text-[var(--text-color)] px-5 py-[6px]  rounded-lg bg-[var(--dark-text)]  text-black transition hover:bg-[var(--text-color)]">
            Sign In
          </button>
        </Link>
      </div>
      {data && (
        <div className="gap-2">
          <NavUserAva
            name={data.user?.name as string}
            email={data.user?.email as string}
            image={data.user?.image as string}
          />
        </div>
      )}
    </>
  );
}

export default AuthBtns;

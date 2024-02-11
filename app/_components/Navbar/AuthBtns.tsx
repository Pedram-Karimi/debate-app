"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import NavUserAva from "./NavUserAva";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
function AuthBtns() {
  const { data, status } = useSession();
  console.log(data, status, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
  return (
    <>
      <div className={`gap-2 ${data ? "hidden" : "flex"}`}>
        <Link href="/auth/signin" className="decoration-none">
          <button
            className="text-[var(--text-color)] px-5 py-[6px]  rounded-lg bg-[var(--dark-text)]  text-black transition hover:bg-[var(--text-color)]"
            // onClick={() => {
            //   signIn();
            // }}
          >
            Sign In
          </button>
        </Link>
        <Link href="/auth/signup" className="decoration-none">
          <button className="text-[var(--text-color)] px-5 py-[6px]  rounded-lg bg-[var(--dark-text)]  text-black transition hover:bg-[var(--text-color)]">
            Sign Up
          </button>
        </Link>
      </div>
      {status == "authenticated" && (
        <div className="gap-2">
          <NavUserAva
            name={data.user?.name as string}
            email={data.user?.email as string}
            image={data.user?.image as string}
            /** @ts-ignore */
            id={data?.user?.id}
          />
        </div>
      )}
    </>
  );
}

export default AuthBtns;

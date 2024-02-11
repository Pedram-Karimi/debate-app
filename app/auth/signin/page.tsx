"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

function Login() {
  const email = useRef<string>();
  const password = useRef<string>();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signIn("credentials", {
      email: email.current,
      password: password.current,
      redirect: false,
      callbackUrl: "/",
    });
  };

  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <div className="bg-[var(--bg-2)] rounded-lg border border-[var(--border-color)] p-5 flex flex-col h-[70vh] pb-3 w-[95%] sm:w-[30%]">
        <h1 className="text-[var(--text-color)] text-2xl text-center pb-5 font-bold pt-0">
          login
        </h1>
        <form
          className="flex-col flex gap-2 justify-between h-full "
          onSubmit={onSubmit}
        >
          <div className="flex-col flex gap-2 pt-0">
            <input
              placeholder="Email"
              className="bg-transparent p-2 border border-[var(--border-color-2)] rounded-lg outline-none text-[var(--text-color)] placeholder-[var(--placeholder-text)]"
              required
              onChange={(e) => {
                email.current = e.target.value;
              }}
            />
            <input
              placeholder="Password"
              className="bg-transparent p-2 border border-[var(--border-color-2)] rounded-lg outline-none text-[var(--text-color)] placeholder-[var(--placeholder-text)]"
              required
              type="password"
              onChange={(e) => {
                password.current = e.target.value;
              }}
            />
          </div>
          <div className="flex-col flex gap-2 pt-0">
            <button
              type="submit"
              className="border border-[var(--primary-color-transparent-1)] text-[var(--text-color)] p-2 cursor-pointer rounded-lg hover:bg-[var(--primary-color-transparent-1)] transition "
            >
              login
            </button>
            <div className="border-[var(--border-color)] border-b"></div>
            <p className="text-[var(--dark-text)] w-full text-center">or</p>
            <div
              onClick={() => signIn("google")}
              className="w-full p-2  border border-[#4c8bf5] cursor-pointer rounded-lg hover:bg-[#4c8af537] flex gap-2 items-center"
            >
              <Image
                src="/google-logo.png"
                width={20}
                height={20}
                alt="Google logo"
              />
              <p className="text-[14px] ">Login with google</p>
            </div>
          </div>
        </form>
        <p className="pt-2  mt-2 border-t border-[var(--border-color)] text-[16px] text-center text-[var(--dark-text)]">
          Do not have account yet?{" "}
          <Link href="/signup" className="text-[var(--primary-color)]">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}
export default Login;

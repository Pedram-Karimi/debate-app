"use client";

import { useRef } from "react"; // react
import Image from "next/image";
import { signIn } from "next-auth/react";

import Link from "next/link";

function Signup() {
  const email = useRef<string>();
  const password = useRef<string>();
  const username = useRef<string>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const user = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.current,
          email: email.current,
          password: password.current,
        }),
      });

      if (user.ok) {
        signIn("credentials", {
          email: email,
          password: password,
          callbackUrl: "/",
          redirect: false,
        });
        const createdUser = await user.json();
        console.log("Created debate:", createdUser);
      } else {
        console.error("Failed to create user:", user.statusText);
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <div className="bg-[var(--bg-2)] rounded-lg border border-[var(--border-color)] p-5 flex flex-col h-[70vh] pb-3 w-[95%] sm:w-[30%]">
        <h1 className="text-[var(--text-color)] text-2xl text-center pb-5 font-bold pt-0">
          Sign up
        </h1>
        <form
          className="flex-col flex gap-2 justify-between h-full "
          onSubmit={handleSubmit}
        >
          <div className="flex-col flex gap-2 pt-0">
            <input
              placeholder="email"
              className="bg-transparent p-2 border border-[var(--border-color-2)] rounded-lg outline-none text-[var(--text-color)] placeholder-[var(--placeholder-text)]"
              required
              onChange={(e) => {
                email.current = e.target.value;
              }}
            />
            <input
              placeholder="username"
              className="bg-transparent p-2 border border-[var(--border-color-2)] rounded-lg outline-none text-[var(--text-color)] placeholder-[var(--placeholder-text)]"
              required
              onChange={(e) => {
                username.current = e.target.value;
              }}
            />
            <input
              placeholder="password"
              type="password"
              className="bg-transparent p-2 border border-[var(--border-color-2)] rounded-lg outline-none text-[var(--text-color)] placeholder-[var(--placeholder-text)]"
              required
              onChange={(e) => {
                password.current = e.target.value;
              }}
            />
          </div>
          <div className="flex-col flex gap-2 pt-0">
            <button className="border border-[var(--primary-color-transparent-1)] text-[var(--text-color)] p-2 cursor-pointer rounded-lg hover:bg-[var(--primary-color-transparent-1)] transition ">
              Signup
            </button>
            <div className="border-[var(--border-color)] border-b"></div>
            <p className="text-[var(--dark-text)] w-full text-center">or</p>
            <div className="w-full p-2  border border-[#4c8bf5] cursor-pointer rounded-lg hover:bg-[#4c8af537] flex gap-2 items-center">
              <Image
                src="/google-logo.png"
                width={20}
                height={20}
                alt="Google logo"
              />
              <p className="text-[14px] ">Signup with google</p>
            </div>
          </div>
        </form>
        <p className="pt-2  mt-2 border-t border-[var(--border-color)] text-[16px] text-center text-[var(--text-color)]">
          Do you have an account?{" "}
          <Link href="signin" className="text-[var(--primary-color)]">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;

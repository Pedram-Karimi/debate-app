"use client";

import { useRef, useState } from "react"; // react
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";

function Signup() {
  const email = useRef<string>();
  const password = useRef<string>();
  const username = useRef<string>();
  const handle = useRef<string>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const credentialsSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
      const user = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.current,
          email: email.current,
          password: password.current,
          handle: handle.current,
        }),
      });

      if (user.ok) {
        const createdUser = await user.json();
        await signIn("credentials", {
          email: email.current,
          password: password.current,
          callbackUrl: `/auth/verify-email?id=${createdUser.id}`,
        });

        console.log(createdUser);
      } else {
        setError(user.statusText);
      }
    } catch (err) {
      console.log("Error creating user:", err);
    }
    setLoading(false);
  };

  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <div className="bg-[var(--bg-2)] rounded-lg border border-[var(--border-color)] p-5 flex flex-col h-[70vh] pb-3 w-[95%] sm:w-[30%]">
        <h1 className="text-[var(--text-color)] text-2xl text-center pb-5 font-bold pt-0">
          Sign up
        </h1>

        <form
          className="flex-col flex gap-2 justify-between h-full "
          onSubmit={credentialsSubmit}
        >
          <div className="flex-col flex gap-2 pt-0">
            <input
              placeholder="email"
              disabled={loading}
              className="bg-transparent p-2 border border-[var(--border-color-2)] rounded-lg outline-none text-[var(--text-color)] placeholder-[var(--placeholder-text)]"
              required
              onChange={(e) => {
                email.current = e.target.value;
              }}
            />
            <input
              placeholder="Username"
              disabled={loading}
              className="bg-transparent p-2 border border-[var(--border-color-2)] rounded-lg outline-none text-[var(--text-color)] placeholder-[var(--placeholder-text)]"
              required
              onChange={(e) => {
                username.current = e.target.value;
              }}
            />
            <input
              placeholder="Handle"
              disabled={loading}
              className="bg-transparent p-2 border border-[var(--border-color-2)] rounded-lg outline-none text-[var(--text-color)] placeholder-[var(--placeholder-text)]"
              required
              onChange={(e) => {
                handle.current = e.target.value;
              }}
            />
            <input
              placeholder="Password"
              disabled={loading}
              type="password"
              className="bg-transparent p-2 border border-[var(--border-color-2)] rounded-lg outline-none text-[var(--text-color)] placeholder-[var(--placeholder-text)]"
              required
              onChange={(e) => {
                password.current = e.target.value;
              }}
            />
            {error && (
              <p className="p-2 bg-[var(--error-bg)] flex justify-center rounded-lg">
                {error}
              </p>
            )}
          </div>

          <div className="flex-col flex gap-2 pt-0">
            <button
              disabled={loading}
              className={`border border-[var(--primary-color-transparent-1)] text-[var(--text-color)] p-2 cursor-pointer rounded-lg  hover:bg-[var(--primary-color-transparent-1)] transition ${
                loading &&
                "pointer-events-none bg-[var(--primary-color-transparent-2)] border-[var(--primary-color-transparent-2)]"
              }`}
            >
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
          <Link href="/auth/signin" className="text-[var(--primary-color)]">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;

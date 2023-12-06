"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userEmail = email;
    const userPassword = password;
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ userEmail, userPassword }),
    });
    const { success } = await res.json();
    if (success) {
      router.push("/protected");
      router.refresh();
    } else {
      alert("Login failed");
    }
  };

  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <div className="bg-[var(--bg-2)] rounded-lg border border-[var(--border-color)] p-5 flex flex-col h-[70vh] pb-3 w-[95%] sm:w-[30%]">
        <h1 className="text-[var(--text-color)] text-2xl text-center pb-5 font-bold pt-0">
          login
        </h1>
        <form
          className="flex-col flex gap-2 justify-between h-full "
          onSubmit={login}
        >
          <div className="flex-col flex gap-2 pt-0">
            <input
              placeholder="email"
              className="bg-transparent p-2 border border-[var(--border-color-2)] rounded-lg outline-none text-[var(--text-color)] placeholder-[var(--placeholder-text)]"
              value={email}
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              placeholder="password"
              className="bg-transparent p-2 border border-[var(--border-color-2)] rounded-lg outline-none text-[var(--text-color)] placeholder-[var(--placeholder-text)]"
              value={password}
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="flex-col flex gap-2 pt-0">
            <button className="border border-[var(--primary-color-transparent-1)] text-[var(--text-color)] p-2 cursor-pointer rounded-lg hover:bg-[var(--primary-color-transparent-1)] transition ">
              login
            </button>
            <div className="border-[var(--border-color)] border-b"></div>
            <p className="text-[var(--dark-text)] w-full text-center">or</p>
            <div className="w-full p-2  border border-[#4c8bf5] cursor-pointer rounded-lg hover:bg-[#4c8af537] flex gap-2 items-center">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/800px-Google_%22G%22_Logo.svg.png"
                className="w-[20px] h-[20px]"
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

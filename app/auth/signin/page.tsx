"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
function Login() {
  const { data, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (data) {
      router.push("/");
    }
  }, [data]);
  // google signin
  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <button
        onClick={() => signIn("google")}
        className="px-2 py-[6px] border border-[#4c8bf5] cursor-pointer rounded-lg hover:bg-[#4c8af537] flex gap-2 justify-between items-center"
      >
        <Image
          src="/google-logo.png"
          width={20}
          height={20}
          alt="Google logo"
        />
        <p className="pl-4">Sign in with Google!</p>
      </button>
    </div>
  );
}

export default Login;
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// normal:
{
  // import { useState } from "react";
  // import Link from "next/link";
  // import { useRouter } from "next/navigation";
  // import Image from "next/image";
  /*
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      <div
        onClick={() => signIn("google")}
        className="w-full p-2  border border-[#4c8bf5] cursor-pointer rounded-lg hover:bg-[#4c8af537] flex gap-2 items-center"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/800px-Google_%22G%22_Logo.svg.png"
          className="w-[20px] h-[20px]"
        />
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/800px-Google_%22G%22_Logo.svg.png"
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
</div> */
}

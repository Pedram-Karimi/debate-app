import Link from "next/link";
import NavUserAva from "./NavUserAva";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/prisma/client";
import { User } from "@/types/globals";

async function AuthBtns() {
  const session = await getServerSession(authOptions);
  function exclude<
    User extends { [s: string]: unknown },
    Key extends keyof User
  >(user: User, keys: String[]): Omit<User, Key> {
    return Object.fromEntries(
      Object.entries(user).filter(([key]) => !keys.includes(key))
    ) as Omit<User, Key>;
  }
  let userAll = null;
  if (session) {
    userAll = await prisma.user.findUnique({
      where: {
        id: session?.user.id,
      },
    });
  }

  const user = userAll ? exclude(userAll, ["password"]) : null;
  return (
    <>
      <div className={`gap-2 ${session ? "hidden" : "flex"}`}>
        <Link href="/auth/signin" className="decoration-none">
          <button className="text-[var(--text-color)] px-5 py-[6px]  rounded-lg bg-[var(--dark-text)]  text-black transition hover:bg-[var(--text-color)]">
            Sign In
          </button>
        </Link>
        <Link href="/auth/signup" className="decoration-none">
          <button className="text-[var(--text-color)] px-5 py-[6px]  rounded-lg bg-[var(--dark-text)]  text-black transition hover:bg-[var(--text-color)]">
            Sign Up
          </button>
        </Link>
      </div>
      {session && (
        <div className="gap-2">
          <NavUserAva
            email={session.user.email as string}
            id={session.user.id as string}
            user={user as User}
          />
        </div>
      )}
    </>
  );
}

export default AuthBtns;

import NavBar from "./_components/Navbar/NavBar";
import "./globals.css";
import type { Metadata } from "next";
import AuthContext from "./AuthContext";
import { MssgPanelCtxProvider } from "./context/MssgPanelCtx";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";
import prisma from "@/prisma/client";
import SetLocalStorage from "./SetLocalStorage";
import { User } from "@/types/globals";

export const metadata: Metadata = {};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session = await getServerSession(authOptions);
  // function exclude<
  //   User extends { [s: string]: unknown },
  //   Key extends keyof User
  // >(user: User, keys: String[]): Omit<User, Key> {
  //   return Object.fromEntries(
  //     Object.entries(user).filter(([key]) => !keys.includes(key))
  //   ) as Omit<User, Key>;
  // }
  // let userAll = null;
  // if (session) {
  //   userAll = await prisma.user.findUnique({
  //     where: {
  //       id: session?.user.id,
  //     },
  //   });
  // }

  // const user = userAll ? exclude(userAll, ["password"]) : null;

  return (
    <html lang="en">
      <body>
        {/* <SetLocalStorage user={user as User} /> */}
        <MssgPanelCtxProvider>
          <AuthContext>
            <div>
              <NavBar />
            </div>

            {children}
          </AuthContext>
        </MssgPanelCtxProvider>
      </body>
    </html>
  );
}

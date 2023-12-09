import NavBar from "./_components/Navbar/NavBar";
import "./globals.css";
import type { Metadata } from "next";
import AuthContext from "./AuthContext";
export const metadata: Metadata = {};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AuthContext>
        <body>
          <div>
            <NavBar />
          </div>
          {children}
        </body>
      </AuthContext>
    </html>
  );
}

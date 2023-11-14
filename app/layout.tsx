import NavBar from "./_components/NavBar";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div>
          <NavBar />
        </div>
        {children}
      </body>
    </html>
  );
}

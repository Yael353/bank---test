import { Inter } from "next/font/google";
import "./globals.css";

import Header from "./Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Bank site",
  description:
    "Safely log in, check your balance, and perform secure transactions. This page is deployed through AWS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}

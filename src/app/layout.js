// src/app/layout.js
"use client";

import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";

import "./globals.css";
import React from "react";
import Cookies from "js-cookie";

const inter = Inter({ subsets: ["latin"] });
export const GlobalContext = React.createContext();



export default function RootLayout({ children }) {
  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      setUser(JSON.parse(userCookie));
    }
  }, []);
  return (
    <html lang="en">
      <body className={inter.className} style={{ margin: 0, padding: 0, boxSizing: "border-box" }}>
        <GlobalContext.Provider value={{user, setUser}}>
          {children}
          <Toaster />
        </GlobalContext.Provider>
      </body>
    </html>
  );
}

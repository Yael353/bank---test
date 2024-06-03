"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <nav>
        <div className="flex justify-between bg-white h-auto p-3.5">
          <Link href="/">
            <img
              src="/banika.png"
              alt="bank-logo"
              className="w-30 h-20 rounded-md"
            />
          </Link>
          <div className="flex space-x-2 ">
            <Link href="/create">
              <button className="bg-orange-200 font-bold m-2 p-2 rounded-full w-30 hover:shadow-orange-900">
                Bli kund
              </button>
            </Link>
            <Link href="/login">
              <button className=" bg-orange-800 text-white font-bold m-2 p-2 w-30 rounded-full">
                Logga in
              </button>
            </Link>
          </div>
        </div>
      </nav>
      <div className="bg-orange-100 text-xl flex justify-between items-center">
        <div className="relative flex p-3 items-center  space-x-3">
          <button
            onClick={toggleMenu}
            className=" hover:bg-orange-300 focus:outline-none focus:bg-orange-300"
          >
            Meny
          </button>
          {isOpen && (
            <ul className="absolute top-1 left-0 bg-orange-100  border border-t-0 border-orange-200 mt-12 py-2 w-32">
              <li className="hover:font-bold">
                <a className="block px-4 py-2 text-black hover:bg-orange-100">
                  Saldo
                </a>
              </li>
              <li className="hover:font-bold">
                <a className="block px-4 py-2 text-black hover:bg-orange-100">
                  Fakturor
                </a>
              </li>
              <li className="hover:font-bold">
                <a className="block px-4 py-2 text-black hover:bg-orange-100">
                  Sparande
                </a>
              </li>
              <li className="hover:font-bold">
                <a className="block px-4 py-2 text-black hover:bg-orange-100">
                  Bank-id
                </a>
              </li>
            </ul>
          )}
          <p> |</p>
          <Link href="/">
            <button className="hover:bg-orange-400">Hem</button>
          </Link>
        </div>
        <div>
          <ul className="flex m-2 space-x-4 divide-gray-950">
            <li className="hover:font-bold ">Om oss</li>
            <li className="hover:font-bold">Våra tjänster</li>
            <li className="hover:font-bold">Lediga tjänster</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

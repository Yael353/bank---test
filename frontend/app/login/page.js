"use client";

import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function logIn(event) {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        sessionStorage.setItem("token", data.token);
        router.push("/account");
      } else {
        console.error("Fel användarnamn eller lösenord");
        alert(data.message || "Felaktiga inloggningsuppgifter.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <form
        method="post"
        className="w-1/2 max-w-lg p-6 bg-orange-100 rounded-lg shadow-lg"
        onSubmit={logIn}
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">Logga in</h2>
        <div className="mb-4">
          <label htmlFor="username" className="block mb-2">
            Användarnamn
          </label>
          <input
            value={username}
            type="text"
            id="username"
            placeholder="Skriv in ditt användarnamn"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block mb-2">
            Lösenord
          </label>
          <input
            value={password}
            id="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            type="password"
            placeholder="Skriv in ditt lösenord"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-orange-800 py-2 px-4 rounded-lg text-white font-bold text-center"
        >
          Logga in
        </button>
      </form>
    </div>
  );
}

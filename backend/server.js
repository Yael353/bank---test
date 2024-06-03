import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import cors from "cors";
import mysql from "mysql2/promise";

dotenv.config();

const app = express();
const port = process.env.DB_PORT;

app.use(cors());
app.use(bodyParser.json());

const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASS,
  database: process.env.DB,
  port: process.env.PORT,
});

// help function to make code look nicer
async function query(sql, params) {
  const [results] = await pool.execute(sql, params);
  return results;
}

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Generera engångslösenord
function generateOTP() {
  // Generera en sexsiffrig numerisk OTP
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp.toString();
}

// Din kod här. Skriv dina arrayer

// skapa användare
app.post("/users", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Alla fält måste fyllas i" });
  }

  try {
    // Kontrollera om användarnamnet redan finns
    const existingUser = await query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "Användarnamnet är upptaget" });
    }

    // Lägg till användaren
    await query("INSERT INTO users (username, password) VALUES (?, ?)", [
      username,
      password,
    ]);

    // Hämta användarens ID
    const newUser = await query("SELECT id FROM users WHERE username = ?", [
      username,
    ]);

    // Skapa ett konto för användaren
    await query("INSERT INTO accounts (user_id, balance) VALUES (?, ?)", [
      newUser[0].id,
      0.0,
    ]);
    console.log([username, password, newUser]);

    res.status(201).json({ message: "Användare skapad!" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Serverfel" });
  }
});

//Logga in
app.post("/sessions", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Alla fält måste fyllas i" });
  }

  try {
    const user = await query(
      "SELECT * FROM users WHERE username = ? AND password = ?",
      [username, password]
    );
    if (user.length === 0) {
      return res
        .status(401)
        .json({ message: "Fel användarnamn eller lösenord" });
    }
    // Generera och spara en inloggningstoken för att representera den autentiserade sessionen
    const { randomBytes } = await import("crypto");
    const token = randomBytes(64).toString("hex");

    await query("INSERT INTO sessions (user_id, token) VALUES (?, ?)", [
      user[0].id,
      token,
    ]);
    console.log(token);

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Serverfel" });
  }
});

//visa saldo
//server.js

app.post("/me/accounts", async (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ message: "Ingen token tillhandahållen" });
  }

  try {
    const session = await query("SELECT * FROM sessions WHERE token = ?", [
      token,
    ]);
    if (session.length === 0) {
      return res.status(401).json({ message: "Ogiltig token" });
    }

    const accounts = await query("SELECT * FROM accounts WHERE user_id = ?", [
      session[0].user_id,
    ]);
    if (accounts.length === 0) {
      return res.status(404).json({ message: "Konto inte hittat" });
    }

    res.status(200).json(accounts[0]);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Serverfel" });
  }
});

//insättning
app.post("/me/accounts/transactions", async (req, res) => {
  const { token, amount } = req.body;
  if (!token || amount == null) {
    return res.status(400).json({ message: "Alla fält måste fyllas i" });
  }

  try {
    const session = await query("SELECT * FROM sessions WHERE token = ?", [
      token,
    ]);
    if (session.length === 0) {
      return res.status(401).json({ message: "Ogiltig token" });
    }

    const account = await query("SELECT * FROM accounts WHERE user_id = ?", [
      session[0].user_id,
    ]);
    if (account.length === 0) {
      return res.status(404).json({ message: "Konto inte hittat" });
    }

    await query("UPDATE accounts SET balance = balance + ? WHERE id = ?", [
      amount,
      account[0].id,
    ]);
    await query(
      "INSERT INTO transactions (account_id, amount, type) VALUES (?, ?, 'deposit')",
      [account[0].id, amount]
    );
    await query(
      "INSERT INTO transactions (account_id, amount, transaction_type) VALUES (?, ?, ?)",
      [account[0].id, amount, "deposit"]
    );

    res.status(200).json({ message: "Insättning lyckades" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Serverfel" });
  }
});

// Starta servern
app.listen(port, () => {
  console.log(`Bankens backend körs på http://localhost:${port}`);
});

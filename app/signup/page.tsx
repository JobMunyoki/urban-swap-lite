"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";
import Link from "next/link";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Account created successfully!");
    }
  }

  return (
    <main className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-6">
      <div className="bg-slate-800 p-8 rounded-2xl w-full max-w-md">
        <Link href="/" className="text-cyan-400 hover:underline">
          ← Back Home
        </Link>

        <h1 className="text-3xl font-bold mt-4 mb-6">Create Account</h1>

        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-xl bg-slate-900 border border-white/10"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-xl bg-slate-900 border border-white/10"
          />

          <button
            type="submit"
            className="w-full bg-cyan-400 text-black py-3 rounded-xl font-semibold"
          >
            Sign Up
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-cyan-400">
            {message}
          </p>
        )}
      </div>
    </main>
  );
}
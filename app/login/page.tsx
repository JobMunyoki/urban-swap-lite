"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Login successful!");
      router.push("/dashboard");
    }
  }

  return (
    <main className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-6">
      <div className="bg-slate-800 p-8 rounded-2xl w-full max-w-md">
        <Link href="/" className="text-cyan-400 hover:underline">
          ← Back Home
        </Link>

        <h1 className="text-3xl font-bold mt-4 mb-6">Login</h1>

        <form onSubmit={handleLogin} className="space-y-4">
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
            Login
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-cyan-400">
            {message}
          </p>
        )}

        <p className="text-slate-400 text-sm mt-5 text-center">
          No account?{" "}
          <Link href="/signup" className="text-cyan-400 hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </main>
  );
}
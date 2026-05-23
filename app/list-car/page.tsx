"use client";

import Link from "next/link";
import { useState } from "react";

export default function ListCarPage() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <main className="min-h-screen bg-slate-900 text-white p-10">
      <Link href="/" className="text-cyan-400 hover:underline">
        ← Back to Home
      </Link>

      <div className="max-w-3xl mx-auto mt-10 bg-slate-800 rounded-2xl p-8">
        <h1 className="text-3xl font-bold mb-2">List Your Car</h1>
        <p className="text-slate-400 mb-6">
          Add your vehicle details so customers can view and request bookings.
        </p>

        <form
  className="grid gap-4"
  onSubmit={(e) => {
    e.preventDefault();
    setSubmitted(true);
  }}
>
          <input
            type="text"
            placeholder="Car name e.g. Toyota Prado"
            className="px-4 py-3 rounded-xl bg-slate-900 border border-white/10 outline-none focus:border-cyan-400"
          />

          <select className="px-4 py-3 rounded-xl bg-slate-900 border border-white/10 outline-none focus:border-cyan-400">
            <option>Car Type</option>
            <option>SUV</option>
            <option>Compact</option>
            <option>Sedan</option>
            <option>Van</option>
          </select>

          <select className="px-4 py-3 rounded-xl bg-slate-900 border border-white/10 outline-none focus:border-cyan-400">
            <option>Transmission</option>
            <option>Automatic</option>
            <option>Manual</option>
          </select>

          <select className="px-4 py-3 rounded-xl bg-slate-900 border border-white/10 outline-none focus:border-cyan-400">
            <option>Fuel Type</option>
            <option>Petrol</option>
            <option>Diesel</option>
            <option>Hybrid</option>
            <option>Electric</option>
          </select>

          <input
            type="text"
            placeholder="Price per day e.g. Ksh 5,000/day"
            className="px-4 py-3 rounded-xl bg-slate-900 border border-white/10 outline-none focus:border-cyan-400"
          />

          <input
            type="text"
            placeholder="Image URL or image file name"
            className="px-4 py-3 rounded-xl bg-slate-900 border border-white/10 outline-none focus:border-cyan-400"
          />

          <textarea
            rows={4}
            placeholder="Car description"
            className="px-4 py-3 rounded-xl bg-slate-900 border border-white/10 outline-none focus:border-cyan-400"
          ></textarea>

          <button
            type="submit"
            className="mt-2 py-3 rounded-xl bg-cyan-400 text-black font-semibold hover:scale-105 transition"
          >
            Submit Car Listing
          </button>
          {submitted && (
  <p className="text-green-400 text-center font-medium">
    Car listing submitted successfully!
  </p>
)}
        </form>
      </div>
    </main>
  );
}
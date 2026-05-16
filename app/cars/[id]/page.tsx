"use client";

import Link from "next/link";
import { useState } from "react";
import { useParams } from "next/navigation";
const cars = [
  {
    id: "toyota-prado",
    name: "Toyota Prado",
    type: "SUV",
    transmission: "Automatic",
    fuel: "Diesel",
    price: "Ksh 8,000/day",
    image: "/cars/prado.jpg",
    description:
      "A comfortable SUV suitable for family travel, business trips, and long-distance journeys.",
  },
  {
    id: "mazda-demio",
    name: "Mazda Demio",
    type: "Compact",
    transmission: "Automatic",
    fuel: "Petrol",
    price: "Ksh 2,500/day",
    image: "/cars/demio.jpg",
    description:
      "A fuel-efficient compact car suitable for city movement and short-distance trips.",
  },
  {
    id: "subaru-forester",
    name: "Subaru Forester",
    type: "SUV",
    transmission: "Manual",
    fuel: "Petrol",
    price: "Ksh 5,000/day",
    image: "/cars/forester.jpg",
    description:
      "A reliable SUV designed for comfort, power, and flexible road conditions.",
  },
];

export default function CarDetails() {
  const [submitted, setSubmitted] = useState(false);
  const params = useParams();

  const car = cars.find((item) => item.id === params.id);

  if (!car) {
    return (
      <main className="min-h-screen bg-slate-900 text-white p-10">
        <h1 className="text-3xl font-bold mb-4">Car not found</h1>
        <Link href="/" className="text-cyan-400 underline">
          Back to home
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-900 text-white p-10">
      <Link href="/" className="text-cyan-400 hover:underline">
        ← Back to cars
      </Link>

      <div className="mt-8 grid md:grid-cols-2 gap-10 items-start">
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-80 object-cover rounded-2xl"
        />

        <div>
          <h1 className="text-4xl font-bold mb-4">{car.name}</h1>

          <p className="text-slate-300 mb-4">
            {car.type} • {car.transmission} • {car.fuel}
          </p>

          <p className="text-cyan-400 text-2xl font-bold mb-6">
            {car.price}
          </p>

          <p className="text-slate-300 leading-7 mb-8">
            {car.description}
          </p>

          <div className="mt-8 bg-slate-800 rounded-2xl p-6">
  <h2 className="text-2xl font-bold mb-4">Request Booking</h2>

  <form
  className="space-y-4"
  onSubmit={(e) => {
    e.preventDefault();
    setSubmitted(true);
  }}
>
    <input
      type="text"
      placeholder="Full Name"
      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white outline-none focus:border-cyan-400"
    />

    <input
      type="tel"
      placeholder="Phone Number"
      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white outline-none focus:border-cyan-400"
    />

    <div className="grid md:grid-cols-2 gap-4">
      <input
        type="date"
        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white outline-none focus:border-cyan-400"
      />

      <input
        type="date"
        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white outline-none focus:border-cyan-400"
      />
    </div>

    <textarea
      placeholder="Additional message"
      rows="4"
      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white outline-none focus:border-cyan-400"
    ></textarea>

    <button
      type="submit"
      className="w-full py-3 bg-cyan-400 text-black rounded-xl font-semibold hover:scale-105 transition"
    >
      Submit Booking Request
    </button>
    {submitted && (
  <p className="text-green-400 text-center font-medium">
    Booking request submitted successfully!
  </p>
)}
  </form>
</div>
        </div>
      </div>
    </main>
  );
}
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";


const cars = [
  {
    id: "toyota-prado",
    name: "Toyota Prado",
    type: "SUV",
    transmission: "Automatic",
    fuel: "Diesel",
    price: "Ksh 8,000/day",
    image: "/cars/prado.jpg",
  },
  {
    id: "mazda-demio",
    name: "Mazda Demio",
    type: "Compact",
    transmission: "Automatic",
    fuel: "Petrol",
    price: "Ksh 2,500/day",
    image: "/cars/demio.jpg",
  },
  {
    id: "subaru-forester",
    name: "Subaru Forester",
    type: "SUV",
    transmission: "Manual",
    fuel: "Petrol",
    price: "Ksh 5,000/day",
    image: "/cars/forester.jpg",
  },
];

export default function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [supabaseCars, setSupabaseCars] = useState<any[]>([]);
  useEffect(() => {
  async function fetchCars() {
    const { data, error } = await supabase
      .from("cars")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setSupabaseCars(data);
    } else {
      console.log(error);
    }
  }

  fetchCars();
}, []);
  const allCars = [...supabaseCars, ...cars];

  const filteredCars = allCars.filter((car) => {
  const matchesSearch =
    car.name.toLowerCase().includes(search.toLowerCase()) ||
    car.type.toLowerCase().includes(search.toLowerCase());

  const matchesCategory =
    category === "All" || car.type === category;

  return matchesSearch && matchesCategory;
});
  return (
    <main className="min-h-screen bg-slate-900 text-white p-10">
      <div className="flex flex-col items-center justify-center text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Urban Swap Lite 🚗</h1>

        <p className="text-lg text-slate-300 mb-6 max-w-xl">
          A modern car hire platform where users can browse, book, and manage vehicles easily.
        </p>

        <div className="flex flex-wrap gap-4">
  <button className="px-6 py-3 bg-cyan-400 text-black rounded-xl font-semibold hover:scale-105 transition">
    Browse Cars
  </button>

  <button className="px-6 py-3 border border-white/20 rounded-xl hover:bg-white/10 transition">
    List Your Car
  </button>

  <Link
    href="/login"
    className="px-6 py-3 border border-cyan-400 text-cyan-400 rounded-xl hover:bg-cyan-400 hover:text-black transition"
  >
    Login
  </Link>

  <Link
    href="/signup"
    className="px-6 py-3 bg-white text-black rounded-xl font-semibold hover:scale-105 transition"
  >
    Sign Up
  </Link>
</div>
</div>

<section>
        <div className="mb-6">
  <input
    type="text"
    placeholder="Search cars..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full md:w-96 px-4 py-3 rounded-xl bg-slate-800 border border-white/10 text-white outline-none focus:border-cyan-400"
  />
</div>
<div className="flex flex-wrap gap-3 mb-6">
  {["All", "SUV", "Compact"].map((item) => (
    <button
      key={item}
      onClick={() => setCategory(item)}
      className={`px-4 py-2 rounded-xl border transition ${
        category === item
          ? "bg-cyan-400 text-black border-cyan-400"
          : "border-white/10 text-slate-300 hover:bg-white/10"
      }`}
    >
      {item}
    </button>
  ))}
</div>
        <h2 className="text-2xl font-semibold mb-6">Available Cars</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <div key={car.name} className="bg-slate-800 rounded-2xl overflow-hidden shadow-lg">

            <img
              src={car.image}
              alt={car.name}
              className="w-full h-40 object-cover"
            />

            <div className="p-5">
              <h3 className="text-xl font-semibold mb-2">{car.name}</h3>

              <p className="text-slate-400 mb-3">
                {car.type} • {car.transmission} • {car.fuel}
              </p>

              <p className="text-cyan-400 font-bold mb-4">{car.price}</p>

              <Link
  href={`/cars/${car.id}`}
  className="block w-full py-2 bg-cyan-400 text-black rounded-lg font-semibold text-center hover:scale-105 transition"
>
  View Details
</Link>
            </div>

</div>
          ))}
        </div>
      </section>
    </main>
  );
}
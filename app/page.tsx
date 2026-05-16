import Link from "next/link";

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
  return (
    <main className="min-h-screen bg-slate-900 text-white p-10">
      <div className="flex flex-col items-center justify-center text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Urban Swap Lite 🚗</h1>

        <p className="text-lg text-slate-300 mb-6 max-w-xl">
          A modern car hire platform where users can browse, book, and manage vehicles easily.
        </p>

        <div className="flex gap-4">
          <button className="px-6 py-3 bg-cyan-400 text-black rounded-xl font-semibold hover:scale-105 transition">
            Browse Cars
          </button>

          <button className="px-6 py-3 border border-white/20 rounded-xl hover:bg-white/10 transition">
            List Your Car
          </button>
        </div>
      </div>

      <section>
        <h2 className="text-2xl font-semibold mb-6">Available Cars</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {cars.map((car) => (
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
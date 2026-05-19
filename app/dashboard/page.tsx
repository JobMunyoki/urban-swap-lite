import Link from "next/link";

const bookings = [
  {
    customer: "John Doe",
    car: "Toyota Prado",
    date: "18 May 2026 - 20 May 2026",
    status: "Pending",
  },
  {
    customer: "Mary Wanjiku",
    car: "Mazda Demio",
    date: "21 May 2026 - 22 May 2026",
    status: "Approved",
  },
  {
    customer: "Brian Otieno",
    car: "Subaru Forester",
    date: "24 May 2026 - 26 May 2026",
    status: "Rejected",
  },
];

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-slate-900 text-white p-10">
      <Link href="/" className="text-cyan-400 hover:underline">
        ← Back to Home
      </Link>

      <div className="mt-8 mb-8">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        <p className="text-slate-300 mt-2">
          Manage booking requests and vehicle activity.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="bg-slate-800 rounded-2xl p-6">
          <p className="text-slate-400">Total Bookings</p>
          <h2 className="text-3xl font-bold mt-2">3</h2>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6">
          <p className="text-slate-400">Available Cars</p>
          <h2 className="text-3xl font-bold mt-2">3</h2>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6">
          <p className="text-slate-400">Pending Requests</p>
          <h2 className="text-3xl font-bold mt-2">1</h2>
        </div>
      </div>

      <section className="bg-slate-800 rounded-2xl p-6 overflow-x-auto">
        <h2 className="text-2xl font-bold mb-5">Recent Bookings</h2>

        <div className="space-y-4 min-w-[900px]">
          {bookings.map((booking) => (
            <div
  key={booking.customer}
  className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-slate-900 rounded-xl p-4 items-center"
>
              <div>
  <p className="font-semibold">{booking.customer}</p>
  <p className="text-slate-400 text-sm">Customer</p>
</div>

<div>
  <p className="text-slate-200">{booking.car}</p>
  <p className="text-slate-400 text-sm">Vehicle</p>
</div>

<div>
  <p className="text-slate-200">{booking.date}</p>
  <p className="text-slate-400 text-sm">Booking Dates</p>
</div>
              <p
                className={
                  booking.status === "Approved"
                    ? "text-green-400 font-semibold"
                    : booking.status === "Rejected"
                    ? "text-red-400 font-semibold"
                    : "text-yellow-400 font-semibold"
                }
              >
                {booking.status}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
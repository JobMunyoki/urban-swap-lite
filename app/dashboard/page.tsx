"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Dashboard() {
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    async function fetchBookings() {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setBookings(data);
      } else {
        console.log(error);
      }
    }

    fetchBookings();
  }, []);

  const pendingBookings = bookings.filter(
    (booking) => booking.status === "Pending"
  );

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
          <h2 className="text-3xl font-bold mt-2">{bookings.length}</h2>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6">
          <p className="text-slate-400">Available Cars</p>
          <h2 className="text-3xl font-bold mt-2">4</h2>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6">
          <p className="text-slate-400">Pending Requests</p>
          <h2 className="text-3xl font-bold mt-2">{pendingBookings.length}</h2>
        </div>
      </div>

      <section className="bg-slate-800 rounded-2xl p-6 overflow-x-auto">
        <h2 className="text-2xl font-bold mb-5">Recent Bookings</h2>

        {bookings.length === 0 ? (
          <p className="text-slate-400">No bookings found.</p>
        ) : (
          <div className="space-y-4 min-w-[900px]">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-slate-900 rounded-xl p-4 items-center"
              >
                <div>
                  <p className="font-semibold">{booking.customer_name}</p>
                  <p className="text-slate-400 text-sm">Customer</p>
                </div>

                <div>
                  <p className="text-slate-200">{booking.car_name}</p>
                  <p className="text-slate-400 text-sm">Vehicle</p>
                </div>

                <div>
                  <p className="text-slate-200">
                    {booking.start_date} - {booking.end_date}
                  </p>
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
        )}
      </section>
    </main>
  );
}
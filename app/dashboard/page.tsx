"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState<any[]>([]);

 useEffect(() => {
  async function checkUserAndFetchBookings() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setBookings(data);
    } else {
      console.log(error);
    }

    setLoading(false);
  }

  checkUserAndFetchBookings();
}, [router]);
async function handleLogout() {
  await supabase.auth.signOut();
  router.push("/login");
}
if (loading) {
  return (
    <main className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
      <p className="text-cyan-400">Checking access...</p>
    </main>
  );
}
  async function updateBookingStatus(id: string, status: string) {
  const { error } = await supabase
    .from("bookings")
    .update({ status })
    .eq("id", id);

  if (!error) {
    setBookings((currentBookings) =>
      currentBookings.map((booking) =>
        booking.id === id ? { ...booking, status } : booking
      )
    );
  } else {
    console.log(error);
  }
}

  const pendingBookings = bookings.filter(
    (booking) => booking.status === "Pending"
  );

  return (
    <main className="min-h-screen bg-slate-900 text-white p-10">
      <Link href="/" className="text-cyan-400 hover:underline">
        ← Back to Home
      </Link>

      <div className="mt-8 mb-8 flex items-center justify-between">
      <div>
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>

        <p className="text-slate-300 mt-2">
      Manage booking requests and vehicle activity.
    </p>
  </div>

  <button
    onClick={handleLogout}
    className="px-5 py-2 bg-red-500 hover:bg-red-600 rounded-xl font-semibold"
  >
    Logout
  </button>
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

                <div className="flex gap-3 items-center">
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

  {booking.status === "Pending" && (
    <>
      <button
        onClick={() =>
          updateBookingStatus(booking.id, "Approved")
        }
        className="px-3 py-1 bg-green-500 text-white rounded-lg text-sm"
      >
        Approve
      </button>

      <button
        onClick={() =>
          updateBookingStatus(booking.id, "Rejected")
        }
        className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm"
      >
        Reject
      </button>
    </>
  )}
</div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
import Link from "next/link";

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-slate-800 rounded-2xl p-8 shadow-lg">
        <h1 className="text-3xl font-bold mb-2">Create Account</h1>
        <p className="text-slate-400 mb-6">Join Urban Swap as a hirer or car owner.</p>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Full name"
            className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 outline-none focus:border-cyan-400"
          />

          <input
            type="email"
            placeholder="Email address"
            className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 outline-none focus:border-cyan-400"
          />

          <select className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 outline-none focus:border-cyan-400">
            <option>Hirer</option>
            <option>Car Owner</option>
          </select>

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 outline-none focus:border-cyan-400"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-cyan-400 text-black font-semibold hover:scale-105 transition"
          >
            Create Account
          </button>
        </form>

        <p className="text-slate-400 text-sm mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-cyan-400 hover:underline">
            Login
          </Link>
        </p>

        <Link href="/" className="block mt-4 text-sm text-slate-400 hover:text-cyan-400">
          ← Back to home
        </Link>
      </div>
    </main>
  );
}
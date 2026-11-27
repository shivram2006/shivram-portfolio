import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#08090D] px-4 text-center text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute h-96 w-96 rounded-full bg-blue-600/20 blur-[130px]"
      />
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-400">
        Error 404
      </p>
      <h1 className="mt-4 text-5xl font-bold tracking-tight sm:text-7xl">
        Page Not Found
      </h1>
      <p className="mt-4 max-w-md text-sm text-slate-400 sm:text-base">
        The route you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:brightness-110"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Home</span>
      </Link>
    </main>
  );
}

"use client";

export default function Error({ error, reset }) {
  return (
    <div className="min-h-screen bg-base text-fg flex flex-col items-center justify-center text-center px-6 py-20">
      <div className="text-6xl md:text-7xl font-extrabold brand-text mb-4">Oops</div>
      <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3">Something went wrong</h1>
      <p className="text-soft max-w-md mb-8">
        An unexpected error occurred. You can try again, or head back to the homepage.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <button onClick={() => reset()} className="brand-bg text-white px-6 py-3 rounded-full font-semibold hover:opacity-90 transition">Try again</button>
        <a href="/" className="border border-base px-6 py-3 rounded-full font-semibold hover:bg-soft transition">Back home</a>
      </div>
    </div>
  );
}

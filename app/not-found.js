import ThemeToggle from "./themetoggle";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <div className="min-h-screen bg-base text-fg flex flex-col">
      <nav className="px-8 h-16 flex items-center justify-between border-b border-base">
        <a href="/" className="font-extrabold text-xl tracking-tight">Volunteens</a>
        <ThemeToggle />
      </nav>
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20">
        <div className="text-7xl md:text-8xl font-extrabold brand-text mb-4">404</div>
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3">This page wandered off</h1>
        <p className="text-soft max-w-md mb-8">
          The page you're looking for doesn't exist or may have moved. Let's get you back on track.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <a href="/" className="brand-bg text-white px-6 py-3 rounded-full font-semibold hover:opacity-90 transition">Back home</a>
          <a href="/programs" className="border border-base px-6 py-3 rounded-full font-semibold hover:bg-soft transition">Browse programs</a>
        </div>
      </div>
    </div>
  );
}

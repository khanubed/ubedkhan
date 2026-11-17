import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 text-center">
      <span className="text-xs uppercase font-semibold tracking-widest text-indigo-400 mb-2">
        Error 404
      </span>
      <h1 className="republica text-6xl sm:text-8xl tracking-wider text-white mb-6">
        PAGE NOT FOUND
      </h1>
      <p className="text-gray-400 text-sm sm:text-base max-w-md font-light mb-8">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-8 py-3.5 rounded-full border border-white/20 hover:border-white/40 text-sm font-medium text-white bg-white/5 hover:bg-white/10 transition-all"
      >
        Return Home
      </Link>
    </div>
  );
}

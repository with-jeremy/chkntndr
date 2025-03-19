import Link from 'next/link';

export default function Nav() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-pink-400 border-4 border-yellow-300">
      {/* Header */}
      <Link
          href="/"
          className="px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-800 transition-transform transform hover:scale-105"
        >
      <h1 className="text-4xl font-bold" style={{ fontFamily: "'Dancing Script', cursive" }}>
        ChknTndr
      </h1>
      </Link>
      {/* Description */}
      {/* Navigation buttons */}
      <div className="space-x-4">
        <Link
          href="/"
          className="px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-800 transition-transform transform hover:scale-105"
        >
          Home
        </Link>
        <Link
          href="/about"
          className="px-4 py-2 font-semibold text-white bg-green-600 rounded-lg shadow-lg hover:bg-green-800 transition-transform transform hover:scale-105"
        >
          About
        </Link>
        <Link
          href="/contact"
          className="px-4 py-2 font-semibold text-white bg-red-600 rounded-lg shadow-lg hover:bg-red-800 transition-transform transform hover:scale-105"
        >
          Contact
        </Link>
      </div>
    </nav>
  );
}

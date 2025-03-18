import Link from "next/link";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem-5rem)] bg-gray-100 px-6 py-12"> {/* Revert to inline height calculation */}
      <h1 className="text-5xl font-bold text-center mb-6 text-pink-500">
        Chkn Tndr
      </h1>
      <p className="text-lg text-center mb-8 max-w-2xl">
        Tired of the endless &quot;Where do you want to eat?&quot; arguments? ChknTndr is
        here to save the day! Swipe through restaurant options and let the app
        decide for you. No more indecision, no more debates—just great food.
      </p>
      <div className="flex space-x-4 mb-12">
        <Link
          href="/create-match"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create Match
        </Link>
        <Link
          href="/join-match"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Join Match
        </Link>
      </div>
    </section>
  );
}

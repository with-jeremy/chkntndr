import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Chkn Tndr</h1>
      <div className="flex space-x-4">
        <Link href="/create-match" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Create Match
        </Link>
        <Link href="/join-match" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Join Match
        </Link>
      </div>
    </main>
  );
}

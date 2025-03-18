"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function JoinMatch() {
  const [matchId, setMatchId] = useState("");
  const router = useRouter();

  const handleJoinMatch = () => {
    router.push(`/match/${matchId}?user=joiner`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem-5rem)] bg-gray-100 px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Join a Match</h1>
      <input
        type="text"
        placeholder="Enter Match ID"
        className="border border-gray-300 rounded px-4 py-2 mb-4"
        value={matchId}
        onChange={(e) => setMatchId(e.target.value)}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleJoinMatch}
      >
        Join Match
      </button>
    </div>
  );
}

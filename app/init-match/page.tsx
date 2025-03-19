"use client";
import Link from "next/link";
import MatchSettingsForm from "@/components/MatchSettingsForm";
import { useMatchStore } from "@/state/matchStore"; // Zustand store
import { useState, useEffect } from "react";

export default function InitMatchPage() {
  const matchSettings = useMatchStore((state) => state.matchSettings); // Access matchSettings from Zustand store
  const [matchId, setMatchId] = useState<string | null>(null);

  useEffect(() => {
    if (matchSettings?.matchId) {
      setMatchId(matchSettings.matchId); // Update local state with matchId
    }
  }, [matchSettings]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem-5rem)] bg-gray-100 px-6 py-12">
      {!matchId ? (
        <h1 className="text-3xl font-bold mb-8">Create a Match</h1>
      ) : (
        <h1 className="text-3xl font-bold mb-8">Match Initiated!</h1>
      )}
      {matchId ? (
        <div className="flex flex-col items-center">
          <Link
            href={`/match/${matchId}?user=creator`}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Join Match Id: {matchId}
          </Link>
        </div>
      ) : (
        <MatchSettingsForm />
      )}
    </div>
  );
}
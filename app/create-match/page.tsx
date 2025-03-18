"use client";
import MatchSettings from "@/components/MatchSettings";
import { useState } from "react";
import Link from 'next/link';

export default function CreateMatch() {
  const [matchId, setMatchId] = useState<string | null>(null);

  const handleSettingsSubmit = () => {
    const newMatchId = Math.random().toString(36).substring(2, 15);
    setMatchId(newMatchId);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Create a Match</h1>
      {matchId ? (
        <div className="flex flex-col items-center">
          <p className="text-lg mb-4">
            Match ID: 
              <span className="font-bold">
                <Link href={`/match/${matchId}`}>
                  {matchId}
                </Link>
              </span>
          </p>
        </div>
      ) : (
        <MatchSettings onSubmit={handleSettingsSubmit} />
      )}
    </div>
  );
}

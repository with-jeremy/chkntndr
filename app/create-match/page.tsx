"use client";
import { useState } from "react";
import Link from "next/link";
import MatchSettings from "@/components/MatchSettings";

export default function CreateMatch() {
  const [matchId, setMatchId] = useState<string | null>(null);
  const [testing, setTesting] = useState(false);

  const handleSettingsSubmit = (data: { testing: boolean }) => {
    const newMatchId = Math.floor(100 + Math.random() * 900).toString();
    setTesting(data.testing);
    setMatchId(newMatchId);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem-5rem)] bg-gray-100 px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Create a Match</h1>
      {matchId ? (
        <div className="flex flex-col items-center">
          <p className="text-lg mb-4">
            Match ID: 
            <span className="font-bold">
              <Link href={`/match/${matchId}?user=creator${testing ? "&testing=true" : ""}`}>
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

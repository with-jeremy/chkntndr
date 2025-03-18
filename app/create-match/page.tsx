"use client";
import MatchSettings from "@/components/MatchSettings";
import QRCodeDisplay from "@/components/QRCodeDisplay";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export default function CreateMatch() {
  const [matchId, setMatchId] = useState<string | null>(null);

  const handleSettingsSubmit = () => {
    const newMatchId = uuidv4();
    setMatchId(newMatchId);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Create a Match</h1>
      {matchId ? (
        <div className="flex flex-col items-center">
          <QRCodeDisplay matchId={matchId} />
          <p className="mt-4">
            Share this link: <a href={`/match/${matchId}`}>{`/match/${matchId}`}</a>
          </p>
        </div>
      ) : (
        <MatchSettings onSubmit={handleSettingsSubmit} />
      )}
    </div>
  );
}

"use client";
import Link from "next/link";
import MatchSettings from "@/components/MatchSettings";
import { useState } from "react";

type MatchSettings = {
  matchId,
  lat,
  lng,
  radius,
  pricing,
  category,
};


export default function CreateMatchPage() {

  const [matchSettings, setMatchSettings] = useState<MatchSettings[]>([]);
  const handleMatchSettingsSubmit = (matchSettings: MatchSettings) => {
    console.log("Received match settings:", matchSettings);
    
    setMatchSettings(matchSettings);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem-5rem)] bg-gray-100 px-6 py-12">
      {!matchSettings.matchId ? (<h1 className="text-3xl font-bold mb-8">Create a Match</h1>) :
      (<h1 className="text-3xl font-bold mb-8">Match Initiated!</h1>)}
      {matchSettings.matchId ? (
        <div className="flex flex-col items-center">
          <Link
            href={`/match/${matchSettings.matchId}?user=creator`}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Join Match Id: {matchSettings.matchId}
          </Link>
        </div>
      ) : (
        <MatchSettings onSubmit={(matchSettings: MatchSettings) => {
          handleMatchSettingsSubmit(matchSettings);
        }} />
      )}
    </div>
  );
}

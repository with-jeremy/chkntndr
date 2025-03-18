import MatchClient from "./MatchClient";


export default async function Match({ params }: { params: Promise<{ matchId: string }> }) {
  const { matchId } = await params;

  return (
    <div className="flex flex-col items-center  min-h-[calc(100vh-5rem-5rem)] bg-gray-100 px-6">
      <MatchClient matchId={matchId} />
    </div>
  );
}

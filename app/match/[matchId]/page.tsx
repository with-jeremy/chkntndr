import MatchClient from "./MatchClient";



export default async function Match({ params }: { params: Promise<{ matchId: string }> }) {
  const { matchId } = await params;

  return (
    <div>
      <MatchClient matchId={matchId} />
    </div>
  );
}

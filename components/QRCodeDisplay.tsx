import { QRCodeSVG } from "qrcode.react";

interface QRCodeDisplayProps {
  matchId: string;
}

export default function QRCodeDisplay({ matchId }: QRCodeDisplayProps) {
  const qrCodeValue = `${window.location.origin}/match/${matchId}`;

  return (
    <div>
      <QRCodeSVG value={qrCodeValue} size={256} level="H" />
    </div>
  );
}

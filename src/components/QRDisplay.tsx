import { QRCodeSVG } from "qrcode.react";

interface QRDisplayProps {
  value: string;
  size?: number;
}

const QRDisplay = ({ value, size = 200 }: QRDisplayProps) => {
  return (
    <div className="p-4 bg-white rounded-xl shadow-lg">
      <QRCodeSVG
        value={value}
        size={size}
        level="H"
        includeMargin={true}
        fgColor="#000000"
        bgColor="#ffffff"
      />
    </div>
  );
};

export default QRDisplay;

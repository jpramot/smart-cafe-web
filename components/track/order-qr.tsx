import QRCode from "react-qr-code";

type OrderQrCodeProps = {
  orderId: number;
  username: string;
};

export default function OrderQrCode({ orderId, username }: OrderQrCodeProps) {
  const url = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/order/${orderId}/scan?username=${username}`;
  return <QRCode value={url} />;
}

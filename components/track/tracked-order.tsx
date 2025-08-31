import { Divider } from "primereact/divider";
import { Image } from "primereact/image";
import { Card } from "primereact/card";
import { Tag } from "primereact/tag";

export default function TrackedOrder() {
  const orderId = "12345";
  const status = "ready"; // ลองเปลี่ยนเป็น preparing ได้
  const estimatedTime = 12;
  const items = [
    { name: "Espresso", quantity: 2, price: 55 },
    { name: "Cappuccino", quantity: 1, price: 65 },
  ];
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  return (
    <div className="border border-gray-200">
      <section className="py-4 px-4 border ">
        <div className="container max-w-2xl mx-auto">
          <Card className="mb-6">
            <div className="text-center mb-4">
              {/* status badge */}
              {status === "preparing" && (
                <Tag value="Preparing" severity="warning" className="px-4 py-2 text-base" />
              )}
              {status === "ready" && (
                <Tag value="Ready for Pickup" severity="success" className="px-4 py-2 text-base" />
              )}
            </div>

            {/* header */}
            <h2 className="text-2xl font-bold text-center mb-2">Order {orderId}</h2>
            <p className="text-center text-gray-600 mb-6">
              {status === "preparing" && "Your order is being prepared"}
              {status === "ready" && "Your order is ready to be picked up"}
            </p>

            {/* status detail */}
            {status === "preparing" && (
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-green-700 mb-2">
                  ~{estimatedTime} minutes
                </div>
                <p className="text-sm text-gray-500">Estimated preparation time</p>
              </div>
            )}

            {status === "ready" && (
              <div className="text-center mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="text-xl font-bold text-green-800 mb-2">Ready for Pickup!</div>
                <p className="text-sm text-green-700">
                  Please show this screen or your QR code at the counter
                </p>
              </div>
            )}

            <Divider />

            {/* order details */}
            <h3 className="font-semibold mb-3">Order Details</h3>
            <div>
              {items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center py-2 border-b border-gray-400"
                >
                  <span className="font-medium">
                    {item.quantity}x {item.name}
                  </span>
                  <span className="font-medium">฿{item.price * item.quantity}</span>
                </div>
              ))}
              <div className="flex justify-between items-center pt-3 mt-3 ">
                <span className="text-lg font-bold">Total</span>
                <span className="text-lg font-bold text-green-700">฿{totalPrice}</span>
              </div>
            </div>

            <Divider />

            {/* QR code */}
            <div className="text-center pt-4">
              <h4 className="font-semibold mb-3">Your Order QR Code</h4>
              <div className="inline-block p-4 bg-white rounded-lg border">
                <Image
                  src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Order12345"
                  alt="Order QR"
                  width="128"
                  height="128"
                  preview
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">Show this QR code at pickup</p>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}

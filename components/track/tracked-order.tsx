"use client";

import { Divider } from "primereact/divider";
import { Image } from "primereact/image";
import { Card } from "primereact/card";
import { Tag } from "primereact/tag";
import orderStore from "@/hook/store/order-store";
import { useEffect, useState, useTransition } from "react";
import TrackLoading from "./track-loading";
import { OrderResponse } from "@/types/order.type";

type TrackOrderProps = {
  search: string;
};

export default function TrackedOrder({ search }: TrackOrderProps) {
  const trackOrder = orderStore((state) => state.trackOrder);
  const [isPending, startTransition] = useTransition();
  const [trackedOrder, setTrackedOrder] = useState<OrderResponse | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      if (search) {
        startTransition(async () => {
          const response = await trackOrder(search);
          setTrackedOrder(response);
        });
      }
    };

    fetchOrder();

    const intervalId = setInterval(fetchOrder, 10000);

    return () => clearInterval(intervalId);
  }, [search]);

  if (isPending) return <TrackLoading />;

  if (!trackedOrder && search) return <h1> not found</h1>;

  return (
    <>
      {trackedOrder && (
        <div className="border border-gray-200">
          <section className="py-4 px-4 border ">
            <div className="container max-w-2xl mx-auto">
              <Card className="mb-6">
                <div className="text-center mb-4">
                  {/* status badge */}
                  {trackedOrder?.status === "PREPARING" && (
                    <Tag value="Preparing..." severity="warning" className="px-4 py-2 !text-xl" />
                  )}
                  {trackedOrder?.status === "READY" && (
                    <Tag
                      value="Ready for Pickup"
                      severity="success"
                      className="px-4 py-2 !text-xl"
                    />
                  )}
                </div>

                {/* header */}
                <h2 className="text-2xl font-bold text-center mb-2">Order {trackedOrder?.id}</h2>
                <p className="text-center text-gray-600 mb-6">
                  {trackedOrder?.status === "PREPARING" && "Your order is being prepared"}
                  {trackedOrder?.status === "READY" && "Your order is ready to be picked up"}
                </p>

                {trackedOrder?.status === "READY" && (
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
                  {trackedOrder?.items.map((item, idx) => (
                    <div key={idx} className="flex flex-col border-b border-gray-400">
                      <div className="flex justify-between items-center py-2">
                        <span className="font-medium">
                          {item.quantity}x {item.name}
                        </span>
                        <span className="font-medium">
                          ฿
                          {(item.price + item.toppings?.reduce((tSum, t) => tSum + t.price, 0)) *
                            item.quantity}
                        </span>
                      </div>
                      <small>{item.toppings?.map((t) => t.name).join(", ") || "No Toppings"}</small>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-3 mt-3 ">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-lg font-bold text-green-700">
                      ฿{trackedOrder?.totalPrice}
                    </span>
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
      )}
    </>
  );
}

"use client";

import cartStore from "@/hook/store/cart-store";
import orderStore from "@/hook/store/order-store";
import userStore from "@/hook/store/user-store";

import { createOrderSchema } from "@/libs/schema/order.schema";
import { CreateOrderBody } from "@/types/order.type";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ShowCartItems() {
  const items = cartStore((state) => state.cart);
  const getMe = userStore((state) => state.getMe);
  const deleteFromCart = cartStore((state) => state.deleteFromCart);
  const createOrder = orderStore((state) => state.createOrder);

  const router = useRouter();
  const total = items.reduce(
    (sum, item) =>
      sum +
      (item.price + (item.toppings?.reduce((tSum, t) => tSum + t.price, 0) || 0)) * item.quantity,
    0
  );

  const hdlDeleteDrinkFromCart = (id: number, price: number) => {
    deleteFromCart(id, price);
  };

  const hdlCreateOrder = async () => {
    console.log("first");
    const rawData: CreateOrderBody = {
      items: items.map((item) => ({
        menuId: item.id,
        quantity: item.quantity,
        topping: item.toppings?.map((t) => t.id) || [],
      })),
      totalPrice: total,
    };
    const { data, success, error } = createOrderSchema.safeParse(rawData);
    if (!success) {
      console.log(error);
      return;
    }
    console.log("create");
    const response = await createOrder(data);
    router.replace(`/track?orderId=${response.id}`);
  };

  useEffect(() => {
    (async () => {
      const response = await getMe();
      if (!response.success) {
        router.replace("/login");
      }
    })();
  }, []);
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      {items.length === 0 ? (
        <p className="text-gray-500 text-center py-10">Your cart is empty ☕</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-start py-4 gap-4">
              <img src={item.image} alt={item.name} className="w-20 h-20 rounded-md object-cover" />

              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                  </div>
                  <div>
                    ฿
                    {(
                      (item.price + (item.toppings?.reduce((t, tp) => t + tp.price, 0) ?? 0)) *
                      item.quantity
                    ).toFixed(2)}
                  </div>
                  {/* <button onClick={() => {}} className="text-gray-400 hover:text-red-500">
                      <X size={20} />
                    </button> */}
                </div>

                {/* render toppings */}
                {item.toppings && item.toppings.length > 0 && (
                  <ul className="mt-2 ml-4 text-sm text-gray-600 list-disc">
                    {item.toppings.map((tp) => (
                      <li key={tp.id}>
                        {tp.name} (+฿{tp.price})
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="text-right font-medium">
                <button
                  onClick={() => hdlDeleteDrinkFromCart(item.id, item.price)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <X size={20} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* total & checkout */}
      {items.length > 0 && (
        <div className="mt-6 border-t pt-4 flex justify-between items-center">
          <p className="text-lg font-bold">Total: ฿{total.toFixed(2)}</p>
          <button
            onClick={hdlCreateOrder}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}

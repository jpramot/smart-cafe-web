"use client";

import cartStore from "@/hook/store/cart-store";
import orderStore from "@/hook/store/order-store";
import userStore from "@/hook/store/user-store";

import { createOrderSchema } from "@/libs/schema/order.schema";
import { CreateOrderBody } from "@/types/order.type";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";
import CartItemLoading from "./cart-items-loading";
import Image from "next/image";
import toast from "react-hot-toast";

export default function ShowCartItems() {
  const items = cartStore((state) => state.cart);
  const getMe = userStore((state) => state.getMe);
  const deleteFromCart = cartStore((state) => state.deleteFromCart);
  const createOrder = orderStore((state) => state.createOrder);
  const isCartHydrated = cartStore((state) => state.isCartHydrated);
  const [isPending, startTransition] = useTransition();

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
    const rawData: CreateOrderBody = {
      items: items.map((item) => ({
        menuId: item.id,
        quantity: item.quantity,
        topping: item.toppings?.map((t) => t.id) || [],
      })),
      totalPrice: total,
    };
    const { data, success } = createOrderSchema.safeParse(rawData);
    if (!success) {
      return;
    }
    const response = await createOrder(data);
    router.replace(`/track?orderId=${response.id}`);
  };

  useEffect(() => {
    startTransition(async () => {
      const response = await getMe();
      if (!response.success) {
        toast.error(response.message);
        router.replace("/login");
      }
    });
  }, [getMe, router]);

  if (isPending || !isCartHydrated) {
    return <CartItemLoading />;
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      {items.length === 0 ? (
        <p className="text-gray-500 text-center py-10">Your cart is empty ☕</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {/* render each items */}
          {items.map((item, idx) => (
            <li key={idx} className="flex items-start py-4 gap-4">
              <Image
                src={item.image}
                alt={item.name}
                width={80}
                height={80}
                className="w-20 h-20 rounded-md object-cover"
              />

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

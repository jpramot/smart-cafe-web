"use client";

import cartStore from "@/hook/store/cart-store";
import { Menu } from "@/types/menu.type";
import { Topping } from "@/types/topping";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { useState } from "react";

type ChooseDrinkProps = {
  drink: Menu;
  toppings: Topping[];
};
export default function ChooseDrink({ drink, toppings }: ChooseDrinkProps) {
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedToppings, setSelectedToppings] = useState<
    { id: number; name: string; price: number }[]
  >([]);
  const addToCart = cartStore((state) => state.addToCart);
  const router = useRouter();

  const drinkPrice =
    drink.price + selectedToppings.reduce((total, topping) => total + topping.price, 0);

  const hdlChangeQty = (value: number) => {
    setQuantity((cur) => {
      if ((value = 1)) {
        return cur + 1;
      } else if (value == -1 && cur > 1) {
        return cur - 1;
      } else {
        return cur;
      }
    });
  };

  const handleToggleTopping = (toppingId: number, toppingName: string, tippingPrice: number) => {
    setSelectedToppings((prev) => {
      if (prev.some((t) => t.id === toppingId)) {
        return prev.filter((t) => t.id !== toppingId);
      } else {
        return [...prev, { id: toppingId, name: toppingName, price: tippingPrice }];
      }
    });
  };

  const handleAddToCart = () => {
    addToCart({
      id: drink.id,
      name: drink.name,
      price: drink.price,
      quantity: quantity,
      image: drink.image,
      toppings: selectedToppings,
    });
    setSelectedToppings([]);
    setQuantity(1);
    router.push("/cart");
  };

  return (
    <div className="grid grid-cols-1 gap-6 items-stretch">
      <Card
        key={drink.id}
        className="flex flex-col justify-between shadow-lg rounded-2xl overflow-hidden p-4"
      >
        {/* Image */}
        <Image
          src={drink.image}
          alt={drink.name}
          width={400}
          height={400}
          sizes="100%"
          className="object-cover rounded-lg mb-4 mx-auto"
          priority
        />

        {/* Name & Description */}
        <div className="mb-4">
          <h2 className="text-xl font-bold">{drink.name}</h2>
          <p className="text-gray-600 text-sm">{drink.description}</p>
          <p className="text-green-700 font-semibold mt-2">฿{drink.price}</p>
        </div>

        {/* Toppings */}
        <div className="mb-4">
          <p className="text-sm font-medium mb-2">Add Toppings:</p>
          {["Coffee", "Milk", "Temperature", "Texture", "Syrup", "Topping"].map((category) => {
            const categoryToppings = toppings.filter((t) => t.category === category);
            if (categoryToppings.length === 0) return null;

            return (
              <div key={category} className="mb-2 p-1.5">
                <p className="text-xs font-semibold text-gray-500 mb-2">{category}</p>
                <div className="flex flex-wrap gap-2 items-center">
                  {categoryToppings.map((top) => (
                    <label
                      key={top.id}
                      className="flex items-center gap-1 px-2 py-1 border border-gray-300 rounded-full text-sm cursor-pointer hover:bg-green-100"
                    >
                      <input
                        type="checkbox"
                        className="w-4 h-4 accent-green-700"
                        checked={selectedToppings.some((t) => t.id === top.id)}
                        onChange={() => handleToggleTopping(top.id, top.name, top.price)}
                      />

                      {/* <Image src={top.image} alt={top.name} className="h-4 w-4 object-contain" /> */}
                      <div className="w-4 h-4 relative">
                        <Image
                          src={top.image}
                          alt={top.name}
                          sizes="100%"
                          fill
                          className="object-contain"
                        />
                      </div>

                      {top.price > 0 ? `${top.name} (+฿${top.price})` : top.name + " (Free)"}
                    </label>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Quantity & Add to Cart */}
        <div className="flex items-center justify-between mt-auto gap-3">
          {/* Quantity + Price */}
          <div className="flex flex-col">
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden mb-2">
              <button
                type="button"
                className="px-3 py-1 text-gray-700 hover:bg-gray-100"
                onClick={() => hdlChangeQty(-1)}
              >
                -
              </button>
              <span className="px-4">{quantity}</span>
              <button
                type="button"
                className="px-3 py-1 text-gray-700 hover:bg-gray-100"
                onClick={() => hdlChangeQty(1)}
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="flex justify-between gap-4 items-center">
            <p className="text-lg font-semibold text-gray-700">
              Total: ฿
              {/* {(
                quantity *
                (drink.price +
                  selectedToppings.reduce(
                    (sum, top) => sum + (toppings.find((t) => t.id === top.id)?.price || 0),
                    0
                  ))
              ).toFixed(2)} */}
              {drinkPrice.toFixed(2)}
            </p>
            <Button
              className="bg-green-700 text-white hover:bg-green-800 rounded-md p-3"
              onClick={handleAddToCart}
              label="Add to Cart"
            />
          </div>
        </div>
      </Card>
    </div>
  );
}

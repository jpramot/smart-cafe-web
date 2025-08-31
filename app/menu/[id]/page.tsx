"use client";

import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { useState } from "react";

const drinks = [
  {
    id: 1,
    name: "Café Latte",
    price: 65,
    description: "Smooth espresso with steamed milk.",
    image:
      "https://res.cloudinary.com/dmzla7cgd/image/upload/v1756455515/espresso-coffee-cup_rebjai.png",
  },
];

const toppings = [
  {
    id: 1,
    name: "Extra Shot",
    price: 15,
    image: "https://res.cloudinary.com/dmzla7cgd/image/upload/v1756456139/espresso-shot_wovsjz.png",
    category: "Coffee",
  },
  {
    id: 2,
    name: "Decaf",
    price: 0,
    image: "https://res.cloudinary.com/dmzla7cgd/image/upload/v1756456139/espresso-shot_wovsjz.png",
    category: "Coffee",
  },
  {
    id: 3,
    name: "Oat Milk",
    price: 10,
    image:
      "https://res.cloudinary.com/dmzla7cgd/image/upload/v1756456138/oat-milk-carton_ssqujo.png",
    category: "Milk",
  },
  {
    id: 4,
    name: "Almond Milk",
    price: 10,
    image:
      "https://res.cloudinary.com/dmzla7cgd/image/upload/v1756456137/almond-milk-pouring_nk3ivd.png",
    category: "Milk",
  },
  {
    id: 5,
    name: "Soy Milk",
    price: 10,
    image:
      "https://res.cloudinary.com/dmzla7cgd/image/upload/v1756456137/almond-milk-pouring_nk3ivd.png",
    category: "Milk",
  },
  {
    id: 6,
    name: "Coconut Milk",
    price: 12,
    image: "https://res.cloudinary.com/dmzla7cgd/image/upload/v1756456141/coconut-milk_bdiafw.png",
    category: "Milk",
  },
  {
    id: 7,
    name: "Extra Hot",
    price: 0,
    image:
      "https://res.cloudinary.com/dmzla7cgd/image/upload/v1756456139/hot-temperature_izjmgv.png",
    category: "Temperature",
  },
  {
    id: 8,
    name: "Extra Foam",
    price: 5,
    image: "https://res.cloudinary.com/dmzla7cgd/image/upload/v1756456143/milk-foam_jcqmpv.png",
    category: "Texture",
  },
  {
    id: 9,
    name: "No Foam",
    price: 0,
    image: "https://res.cloudinary.com/dmzla7cgd/image/upload/v1756456143/milk-foam_jcqmpv.png",
    category: "Texture",
  },
  {
    id: 10,
    name: "Vanilla Syrup",
    price: 8,
    image: "https://res.cloudinary.com/dmzla7cgd/image/upload/v1756456143/vanilla-syrup_vrvfbt.png",
    category: "Syrup",
  },
  {
    id: 11,
    name: "Caramel Syrup",
    price: 8,
    image: "https://res.cloudinary.com/dmzla7cgd/image/upload/v1756456138/caramel-syrup_v91okz.png",
    category: "Syrup",
  },
  {
    id: 12,
    name: "Hazelnut Syrup",
    price: 8,
    image:
      "https://res.cloudinary.com/dmzla7cgd/image/upload/v1756456138/hazelnut-syrup_g13e2j.png",
    category: "Syrup",
  },
  {
    id: 13,
    name: "Sugar Free Vanilla",
    price: 8,
    image: "https://res.cloudinary.com/dmzla7cgd/image/upload/v1756456143/vanilla-syrup_vrvfbt.png",
    category: "Syrup",
  },
  {
    id: 14,
    name: "Whipped Cream",
    price: 10,
    image: "https://res.cloudinary.com/dmzla7cgd/image/upload/v1756456139/whipped-cream_n6easx.png",
    category: "Topping",
  },
  {
    id: 15,
    name: "Cinnamon Powder",
    price: 5,
    image: "https://res.cloudinary.com/dmzla7cgd/image/upload/v1756456139/whipped-cream_n6easx.png",
    category: "Topping",
  },
];

export default function MenuItemPage() {
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [selectedToppings, setSelectedToppings] = useState<Record<number, number[]>>({});

  const handleIncrement = (drinkId: number) => {
    setQuantities((prev) => ({ ...prev, [drinkId]: (prev[drinkId] || 1) + 1 }));
  };

  const handleDecrement = (drinkId: number) => {
    setQuantities((prev) => ({ ...prev, [drinkId]: Math.max(1, (prev[drinkId] || 1) - 1) }));
  };

  const handleToggleTopping = (drinkId: number, toppingId: number) => {
    setSelectedToppings((prev) => {
      const current = prev[drinkId] || [];
      if (current.includes(toppingId)) {
        return { ...prev, [drinkId]: current.filter((id) => id !== toppingId) };
      } else {
        return { ...prev, [drinkId]: [...current, toppingId] };
      }
    });
  };

  const handleAddToCart = (drinkId: number) => {
    const qty = quantities[drinkId] || 1;
    const tops = selectedToppings[drinkId] || [];
    alert(`Added ${qty} x drink ${drinkId} with ${tops.length} toppings!`);
  };

  return (
    <div className=" p-6 flex justify-center w-[50%] mx-auto">
      <div className="max-w-6xl w-full">
        <h1 className="text-3xl font-bold text-center text-green-700 mb-8">Choose Your Drink</h1>

        <div className="grid grid-cols-1 gap-6 items-stretch">
          {drinks.map((drink) => (
            <Card
              key={drink.id}
              className="flex flex-col justify-between shadow-lg rounded-2xl overflow-hidden p-4"
            >
              {/* Image */}
              <img
                src={drink.image}
                alt={drink.name}
                className="h-48 w-full object-cover rounded-lg mb-4"
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
                {["Coffee", "Milk", "Temperature", "Texture", "Syrup", "Topping"].map(
                  (category) => {
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
                                checked={selectedToppings[drink.id]?.includes(top.id) || false}
                                onChange={() => handleToggleTopping(drink.id, top.id)}
                              />
                              <img
                                src={top.image}
                                alt={top.name}
                                className="h-4 w-4 object-contain"
                              />
                              {/* ({top.name} {top.price > 0 && `(+฿${top.price})`}) */}
                              {top.price > 0
                                ? `${top.name} (+฿${top.price})`
                                : top.name + " (Free)"}
                            </label>
                          ))}
                        </div>
                      </div>
                    );
                  }
                )}
              </div>

              {/* Quantity & Add to Cart */}
              <div className="flex items-center justify-between mt-auto gap-3">
                {/* Quantity + Price */}
                <div className="flex flex-col">
                  <div className="flex items-center border border-gray-300 rounded-md overflow-hidden mb-2">
                    <button
                      type="button"
                      className="px-3 py-1 text-gray-700 hover:bg-gray-100"
                      onClick={() => handleDecrement(drink.id)}
                    >
                      -
                    </button>
                    <span className="px-4">{quantities[drink.id] || 1}</span>
                    <button
                      type="button"
                      className="px-3 py-1 text-gray-700 hover:bg-gray-100"
                      onClick={() => handleIncrement(drink.id)}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Add to Cart */}
                <div className="flex justify-between gap-4 items-center">
                  <p className="text-lg font-semibold text-gray-700">
                    Total: ฿
                    {(
                      (quantities[drink.id] || 1) *
                      (drink.price +
                        (selectedToppings[drink.id]?.reduce(
                          (sum, topId) => sum + toppings.find((t) => t.id === topId)!.price,
                          0
                        ) || 0))
                    ).toFixed(2)}
                  </p>
                  <Button
                    className="bg-green-700 text-white hover:bg-green-800 rounded-md p-3"
                    onClick={() => handleAddToCart(drink.id)}
                    label="Add to Cart"
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

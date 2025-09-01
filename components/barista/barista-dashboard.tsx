"use client";

import { OrderResponse } from "@/types/order.type";
import { Card } from "primereact/card";
import { useState } from "react";

const orders = [
  {
    id: "ORD-001",
    customerName: "John Doe",
    items: [
      { name: "Café Latte", quantity: 2, price: 65 },
      { name: "Croissant", quantity: 1, price: 45 },
    ],
    totalPrice: 175,
    status: "preparing",
    createdAt: "2024-01-15T10:30:00Z",
    estimatedTime: 5,
  },
  {
    id: "ORD-002",
    customerName: "Jane Smith",
    items: [
      { name: "Americano", quantity: 1, price: 50 },
      { name: "Blueberry Muffin", quantity: 1, price: 55 },
    ],
    totalPrice: 105,
    status: "preparing",
    createdAt: "2024-01-15T10:25:00Z",
    estimatedTime: 3,
  },
  {
    id: "ORD-003",
    customerName: "Mike Johnson",
    items: [{ name: "Cappuccino", quantity: 1, price: 60 }],
    totalPrice: 60,
    status: "ready",
    createdAt: "2024-01-15T10:20:00Z",
    completedAt: "2024-01-15T10:28:00Z",
  },
  {
    id: "ORD-004",
    customerName: "Sarah Wilson",
    items: [
      { name: "Mocha", quantity: 1, price: 75 },
      { name: "Caramel Macchiato", quantity: 1, price: 80 },
    ],
    totalPrice: 155,
    status: "completed",
    createdAt: "2024-01-15T10:15:00Z",
    completedAt: "2024-01-15T10:25:00Z",
  },
];

type BaristaDashBoardProps = {
  orders: OrderResponse[] | null;
};

export default function BaristaDashBoard({ orders }: BaristaDashBoardProps) {
  // const [data, setData] = useState(orders);
  return (
    <section className="py-6 px-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card
        title={<h1 className="text-xl font-semibold">Preparing</h1>}
        className="border border-gray-200 rounded-md shadow-sm p-4 min-h-full"
      >
        <p className="text-2xl font-bold text-yellow-600 my-3">
          {orders?.filter((o) => o.status === "PREPARING").length || 0}
        </p>
        <p className="text-sm text-gray-500">Orders in progress</p>
      </Card>

      <Card
        title={<h1 className="text-xl font-semibold">Ready</h1>}
        className="border border-gray-200 rounded-md shadow-sm p-4"
      >
        <p className="text-2xl font-bold text-green-600 my-3">
          {orders?.filter((o) => o.status === "READY").length || 0}
        </p>
        <p className="text-sm text-gray-500">Ready for pickup</p>
      </Card>

      <Card
        title={<h1 className="text-xl font-semibold">Complete</h1>}
        className="border border-gray-200 rounded-md shadow-sm p-4"
      >
        <p className="text-2xl font-bold text-gray-600 my-3">
          {orders?.filter((o) => o.status === "COMPLETE").length || 0}
        </p>
        <p className="text-sm text-gray-500">Orders completed today</p>
      </Card>
    </section>
  );
}

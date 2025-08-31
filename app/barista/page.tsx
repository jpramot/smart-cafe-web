"use client";

import { useState } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import BaristaManagement from "@/components/barista/barista-management";

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

const getSeverity = (status: string) => {
  switch (status) {
    case "preparing":
      return "warning";
    case "ready":
      return "success";
    case "completed":
      return "info";
    default:
      return "secondary";
  }
};

export default function BaristaPage() {
  const [data, setData] = useState(orders);

  return (
    <div className="flex flex-col">
      {/* Header */}
      {/* <header className="sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur">
        <div className="flex h-16 items-center justify-between px-6">
          <h1 className="text-xl font-bold text-green-700">☕ Barista Dashboard</h1>
          <Button label="Customer View" className="p-button-outlined p-button-sm" />
        </div>
      </header> */}

      {/* Stats Cards */}
      <section className="py-6 px-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card
          title={<h1 className="text-xl font-semibold">Preparing</h1>}
          className="border border-gray-200 rounded-md shadow-sm p-4 min-h-full"
        >
          <p className="text-2xl font-bold text-yellow-600 my-3">
            {data.filter((o) => o.status === "preparing").length}
          </p>
          <p className="text-sm text-gray-500">Orders in progress</p>
        </Card>

        <Card
          title={<h1 className="text-xl font-semibold">Ready</h1>}
          className="border border-gray-200 rounded-md shadow-sm p-4"
        >
          <p className="text-2xl font-bold text-green-600 my-3">
            {data.filter((o) => o.status === "ready").length}
          </p>
          <p className="text-sm text-gray-500">Ready for pickup</p>
        </Card>

        <Card
          title={<h1 className="text-xl font-semibold">Complete</h1>}
          className="border border-gray-200 rounded-md shadow-sm p-4"
        >
          <p className="text-2xl font-bold text-gray-600 my-3">
            {data.filter((o) => o.status === "completed").length}
          </p>
          <p className="text-sm text-gray-500">Orders completed today</p>
        </Card>
      </section>

      {/* Orders Table */}
      <BaristaManagement />
    </div>
  );
}

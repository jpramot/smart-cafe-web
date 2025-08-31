"use client";

import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Tag } from "primereact/tag";
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

export default function BaristaManagement() {
  const [data, setData] = useState(orders);

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

  const statusTemplate = (rowData: any) => {
    return <Tag value={rowData.status} severity={getSeverity(rowData.status)} />;
  };

  const itemsTemplate = (rowData: any) => {
    return (
      <ul className="text-sm space-y-1">
        {rowData.items.map((item: any, idx: number) => (
          <li key={idx}>
            {item.quantity}x {item.name}
          </li>
        ))}
      </ul>
    );
  };

  const timeTemplate = (rowData: any) => {
    if (rowData.status === "preparing")
      return <span className="text-yellow-600">~{rowData.estimatedTime} min</span>;
    if (rowData.status === "ready") return <span className="text-green-600">Ready now</span>;
    if (rowData.status === "completed") return <span className="text-gray-500">Completed</span>;
    return null;
  };

  const actionTemplate = (rowData: any) => {
    if (rowData.status === "preparing")
      return (
        <Button
          label="Mark Ready"
          size="small"
          className="bg-green-700 text-white px-2 py-1 hover:bg-green-600 rounded-md"
        />
      );
    if (rowData.status === "ready") {
      return <span className="text-green-700 text-md">Rady To Serve</span>;
    }
    return <span className="text-gray-400 text-md">Done</span>;
  };
  return (
    <section className="px-6 pb-10 min-h-[500px]">
      <Card
        title={<h1 className="text-2xl font-bold  text-green-700">Order Management</h1>}
        subTitle={<p className="text-lg my-2 ">Manage and track all customer orders</p>}
        className="p-6 rounded-2xl shadow-lg border border-gray-200 min-h-[500px]"
      >
        <div className="border border-gray-300 rounded-md overflow-hidden">
          <DataTable
            value={data}
            stripedRows
            tableStyle={{ minWidth: "60rem" }}
            className="border-collapse"
          >
            <Column field="id" header="Order ID" style={{ width: "120px" }} />
            <Column field="customerName" header="Customer" />
            <Column header="Items" body={itemsTemplate} />
            <Column
              field="totalPrice"
              header="Total"
              body={(rowData) => `฿${rowData.totalPrice}`}
            />
            <Column header="Status" body={statusTemplate} />

            <Column header="Actions" body={actionTemplate} />
          </DataTable>
        </div>
      </Card>
    </section>
  );
}

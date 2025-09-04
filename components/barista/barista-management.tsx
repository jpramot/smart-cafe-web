"use client";

import orderStore from "@/hook/store/order-store";
import { OrderResponse } from "@/types/order.type";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Tag } from "primereact/tag";
import toast from "react-hot-toast";

type BaristaManagementProps = {
  orders: OrderResponse[] | null;
};

export default function BaristaManagement({ orders }: BaristaManagementProps) {
  const markAsReady = orderStore((state) => state.markAsReady);

  const hdlUpdateStatus = async (id: number) => {
    try {
      await markAsReady(id);
    } catch (_) {
      toast.error("Update status failed");
    }
  };
  const getSeverity = (status: string) => {
    switch (status) {
      case "PREPARING":
        return "warning";
      case "READY":
        return "success";
      case "COMPLETED":
        return "info";
      default:
        return "secondary";
    }
  };

  const statusTemplate = (rowData: OrderResponse) => {
    return <Tag value={rowData.status} severity={getSeverity(rowData.status)} />;
  };

  const itemsTemplate = (rowData: OrderResponse) => {
    return (
      <ul className="text-sm space-y-1">
        {rowData.items.map((item: { name: string; quantity: number }, idx: number) => (
          <li key={idx}>
            {item.quantity}x {item.name}
          </li>
        ))}
      </ul>
    );
  };

  const actionTemplate = (rowData: OrderResponse) => {
    if (rowData.status === "PREPARING")
      return (
        <Button
          label="Mark Ready"
          size="small"
          unstyled
          className="bg-green-700 text-white px-2 py-1 hover:bg-green-600 rounded-md"
          onClick={() => hdlUpdateStatus(rowData.id)}
        />
      );
    if (rowData.status === "READY") {
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
            value={orders || []}
            stripedRows
            tableStyle={{ minWidth: "60rem" }}
            className="border-collapse"
          >
            <Column field="id" header="Order ID" style={{ width: "120px" }} />
            <Column field="username" header="Customer" />
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

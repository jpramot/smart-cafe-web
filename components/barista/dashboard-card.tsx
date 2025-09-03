import { Card } from "primereact/card";
import clxs from "clsx";

type DashboardCardProps = {
  title: string;
  total: number;
};

export default function DashboardCard({ title, total }: DashboardCardProps) {
  const textColor = clxs({
    "text-yellow-600": title === "Preparing",
    "text-green-600": title === "Ready",
    "text-blue-600": title === "Completed",
  });
  return (
    <Card
      title={<h1 className="text-xl font-semibold">{title}</h1>}
      className="border border-gray-200 rounded-md shadow-sm p-4 min-h-full"
    >
      <p className={`text-2xl font-bold my-3 ${textColor}`}>{total}</p>
      <p className="text-sm text-gray-500">Orders in progress</p>
    </Card>
  );
}

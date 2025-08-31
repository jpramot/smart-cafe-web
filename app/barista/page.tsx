import BaristaManagement from "@/components/barista/barista-management";
import BaristaDashBoard from "@/components/barista/barista-dashboard";

export default function BaristaPage() {
  return (
    <div className="flex flex-col">
      {/* Stats Cards */}
      <BaristaDashBoard />

      {/* Orders Table */}
      <BaristaManagement />
    </div>
  );
}

import { Clock, Coffee } from "lucide-react";
import { Button } from "primereact/button";
import CustomButton from "../ui/custom-button";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Coffee className="h-6 w-6 text-primary text-green-700" />
          <h1 className="text-xl font-bold text-foreground">Smart Café</h1>
        </div>
        <div className="flex items-center gap-4">
          {/* <Button label="Track Order" icon={<Clock className="h-4 w-4 mr-2" />} /> */}
          <CustomButton label="Track Order" icon={<Clock className="h-4 w-4 mr-2" />} />

          <CustomButton label="Baristar" />
        </div>
      </div>
    </header>
  );
}

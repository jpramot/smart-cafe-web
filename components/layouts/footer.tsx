import { Coffee } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t py-8 px-4">
      <div className="container max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Coffee className="h-5 w-5 text-primary" />
          <span className="font-semibold text-foreground">Smart Café</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Freshly brewed coffee, perfectly timed for your day
        </p>
      </div>
    </footer>
  );
}

import TrackInput from "@/components/track/track-input";
import TrackedOrder from "@/components/track/tracked-order";
import { number } from "zod";

type TrackPageProps = {
  searchParams: Promise<{ [k: string]: string | undefined }>;
};

export default async function TrackPage({ searchParams }: TrackPageProps) {
  const { orderId = "" } = await searchParams;
  return (
    <section className="py-12 px-4">
      <div className=" max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4 text-balance">Track Your Order</h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Enter your Order ID to see the current status
          </p>
        </div>
        <TrackInput />
      </div>
      <div className="w-[500px] mx-auto">
        <TrackedOrder search={orderId} />
      </div>
    </section>
  );
}

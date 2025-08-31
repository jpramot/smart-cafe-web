import MenuList from "@/components/menu/menu-list";
import Loading from "@/components/ui/loading";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="flex flex-col mx-5 mt-10 gap-4 mb-16">
      <div className=" text-center">
        <h1 className="text-4xl font-bold">Order Your Perfect Coffee</h1>
        <p className="text-lg text-gray-500 mt-4">
          Skip the queue and enjoy freshly brewed coffee made just for you
        </p>
      </div>
      <div>
        <h2 className="text-2xl font-semibold">Our Menu</h2>
      </div>
      <Suspense fallback={<Loading />}>
        <div className="flex flex-wrap gap-4 justify-evenly">
          <MenuList />
        </div>
      </Suspense>
    </div>
  );
}

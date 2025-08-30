import Image from "next/image";
import { Card } from "primereact/card";
import CustomLinkButton from "../ui/custom-link-button";
import { Coffee } from "lucide-react";

type MenuCardProps = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
};

export default function MenuCard({ id, name, price, image, description, category }: MenuCardProps) {
  const header = (
    <div className="overflow-hidden rounded-t-md h-48 relative">
      <Image
        src={image}
        alt={name}
        fill
        className="object-cover transition-transform duration-300 ease-in-out hover:scale-105 w-full"
      />
    </div>
  );

  const footer = (
    <div className="flex justify-center my-10">
      <CustomLinkButton
        label="Order now"
        href={`/menu/${id}`}
        icon={<Coffee className="h-4 w-4" />}
        className="text-green-700 font-semibold w-[80%]"
      />
    </div>
  );

  return (
    <Card
      header={header}
      className="w-64 md:w-72 lg:w-80 shadow-lg rounded-md hover:shadow-xl transition-shadow duration-300 flex flex-col min-h-[400px] mt-8"
      footer={footer}
    >
      <div className="flex flex-col justify-between h-full p-4">
        <div>
          <h3 className="text-lg font-semibold truncate">{name}</h3>
          <p className="text-sm font-light text-gray-700 line-clamp-3 mt-1 h-[50px]">
            {description}
          </p>
        </div>

        <div className="flex justify-between items-center mt-4">
          <p className="text-xl font-semibold text-gray-800">{price} ฿</p>
          <span className="text-xs font-medium text-white text-center bg-green-700 rounded-lg py-1 px-3">
            {category}
          </span>
        </div>
      </div>
    </Card>
  );
}

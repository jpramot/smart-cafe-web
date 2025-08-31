import ChooseDrink from "@/components/menu/choose-drink";
import { getMenuById } from "@/libs/apis/menu.api";

type MenuItemPageProps = {
  params: Promise<{ id: number }>;
};

export default async function MenuItemPage({ params }: MenuItemPageProps) {
  const { id } = await params;

  const menuWithTopping = await getMenuById(id);

  if (!menuWithTopping) return <p>Menu not found...</p>;
  return (
    <div className=" p-6 flex justify-center w-[50%] mx-auto">
      <div className="max-w-6xl w-full">
        <h1 className="text-3xl font-bold text-center text-green-700 mb-8">Choose Your Drink</h1>

        <ChooseDrink drink={menuWithTopping.menu} toppings={menuWithTopping.toppings} />
      </div>
    </div>
  );
}

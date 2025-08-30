import { getAllMenu } from "@/libs/apis/menu.api";
import MenuCard from "./menu-card";

export default async function MenuList() {
  const menus = await getAllMenu();
  return (
    <>
      {menus.length > 0 ? (
        menus.map((menu) => <MenuCard key={menu.id} {...menu} />)
      ) : (
        <p>No menu found</p>
      )}
    </>
  );
}

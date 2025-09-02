import ShowCartItems from "@/components/cart/show-cartItem";

export default async function CartPage() {
  return (
    <div className="px-6 py-10 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
      <ShowCartItems />
    </div>
  );
}

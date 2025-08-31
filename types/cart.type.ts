export type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  toppings?: Topping[];
};

export type Topping = {
  id: number;
  name: string;
  price: number;
};

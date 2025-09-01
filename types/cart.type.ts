export type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  toppings?: ToppingInCart[];
};

export type ToppingInCart = {
  id: number;
  name: string;
  price: number;
};

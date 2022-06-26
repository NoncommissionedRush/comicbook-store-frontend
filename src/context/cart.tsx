import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { Cart } from "../../@types";

type CartContext = [Cart, Dispatch<SetStateAction<Cart>>];

const defaultCart = { items: [], size: 0, total: 0 };

const authContextDefaultValue: CartContext = [defaultCart, () => defaultCart];

const CartContext = createContext(authContextDefaultValue);

export function CartProvider({ children }) {
  const [cart, setCart] = useState<Cart>(defaultCart);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  return useContext(CartContext);
}

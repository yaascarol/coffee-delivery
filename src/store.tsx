import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
  type ReactNode,
  type Dispatch,
} from "react";
import {
  cartReducer,
  sanitizeCart,
  CART_KEY,
  type CartAction,
  type CartItem,
} from "./cart";
import { coffees } from "./data";
const CartContext = createContext<{
  items: CartItem[];
  dispatch: Dispatch<CartAction>;
  total: number;
  count: number;
  storageError: boolean;
} | null>(null);
export function CartProvider({ children }: { children: ReactNode }) {
  const [storageError, setStorageError] = useState(false);
  const [items, dispatch] = useReducer(cartReducer, [], () => {
    try {
      return sanitizeCart(JSON.parse(localStorage.getItem(CART_KEY) ?? "[]"));
    } catch {
      return [];
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(items));
      setStorageError(false);
    } catch {
      setStorageError(true);
    }
  }, [items]);
  const total = items.reduce(
    (sum, item) =>
      sum + (coffees.find((c) => c.id === item.id)?.price ?? 0) * item.quantity,
    0,
  );
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <CartContext.Provider
      value={{ items, dispatch, total, count, storageError }}
    >
      {children}
    </CartContext.Provider>
  );
}
export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error("useCart requer CartProvider");
  return value;
}

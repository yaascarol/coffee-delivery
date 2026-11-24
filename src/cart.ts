import { coffees } from "./data";
export type CartItem = { id: string; quantity: number };
export type CartAction =
  | { type: "add"; id: string; quantity: number }
  | { type: "quantity"; id: string; quantity: number }
  | { type: "remove"; id: string }
  | { type: "clear" };
export const CART_KEY = "coffee-delivery:cart:v1";
export function sanitizeCart(value: unknown): CartItem[] {
  if (!Array.isArray(value)) return [];
  const result: CartItem[] = [];
  for (const item of value as unknown[]) {
    if (
      item &&
      typeof item === "object" &&
      "id" in item &&
      typeof item.id === "string" &&
      "quantity" in item &&
      typeof item.quantity === "number" &&
      coffees.some((c) => c.id === item.id) &&
      Number.isInteger(item.quantity) &&
      item.quantity > 0 &&
      !result.some((c) => c.id === item.id)
    )
      result.push({ id: item.id, quantity: Math.min(99, item.quantity) });
  }
  return result;
}
export function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  if (action.type === "clear") return [];
  if (action.type === "remove")
    return state.filter((item) => item.id !== action.id);
  if (
    !coffees.some((c) => c.id === action.id) ||
    !Number.isInteger(action.quantity) ||
    action.quantity < 1
  )
    return state;
  const existing = state.find((item) => item.id === action.id);
  const quantity = Math.min(
    99,
    action.type === "add"
      ? (existing?.quantity ?? 0) + action.quantity
      : action.quantity,
  );
  if (existing)
    return state.map((item) =>
      item.id === action.id ? { ...item, quantity } : item,
    );
  return action.type === "add"
    ? [...state, { id: action.id, quantity }]
    : state;
}

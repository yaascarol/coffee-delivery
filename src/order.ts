import { z } from "zod";
import { checkoutSchema, type Address } from "./schema";
import { type CartItem } from "./cart";
import { coffees, DELIVERY } from "./data";
const orderSchema = z
  .object({
    id: z.string().min(1),
    createdAt: z.string(),
    address: checkoutSchema,
    items: z
      .array(
        z.object({
          id: z.string(),
          name: z.string(),
          quantity: z.number().int().min(1).max(99),
          price: z.number().int().positive(),
        }),
      )
      .min(1),
    subtotal: z.number().int().positive(),
    delivery: z.number().int().nonnegative(),
    total: z.number().int().positive(),
  })
  .refine(
    (order) =>
      order.subtotal ===
        order.items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0,
        ) && order.total === order.subtotal + order.delivery,
  );
export type Order = z.infer<typeof orderSchema>;
export const ORDER_KEY = "coffee-delivery:last-order:v1";
export function createOrder(address: Address, cart: CartItem[]): Order {
  const items = cart.map((item) => {
    const coffee = coffees.find((c) => c.id === item.id);
    if (!coffee) throw new Error("Produto inválido");
    return { ...item, name: coffee.name, price: coffee.price };
  });
  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0,
  );
  return orderSchema.parse({
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    address: { ...address },
    items,
    subtotal,
    delivery: DELIVERY,
    total: subtotal + DELIVERY,
  });
}
export function parseOrder(value: unknown): Order | null {
  const result = orderSchema.safeParse(value);
  return result.success ? result.data : null;
}
export function readOrder(): Order | null {
  try {
    return parseOrder(JSON.parse(sessionStorage.getItem(ORDER_KEY) ?? "null"));
  } catch {
    return null;
  }
}

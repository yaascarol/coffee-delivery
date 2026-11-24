import { describe, it, expect } from "vitest";
import { createOrder, parseOrder } from "../order";
import { type Address } from "../schema";
describe("Snapshot do pedido", () => {
  const address: Address = {
    cep: "01001000",
    street: "Rua de Exemplo",
    number: "123",
    complement: "",
    district: "Centro",
    city: "São Paulo",
    state: "SP",
    payment: "cash",
  };
  it("preserva itens e endereço quando o carrinho original muda", () => {
    const cart = [{ id: "tradicional", quantity: 2 }];
    const input = { ...address };
    const order = createOrder(input, cart);
    cart[0].quantity = 9;
    input.street = "Outra rua";
    expect(order.items[0].quantity).toBe(2);
    expect(order.address.street).toBe("Rua de Exemplo");
    expect(order.total).toBe(2330);
  });
  it("recusa pedido vazio e produto inexistente", () => {
    expect(() => createOrder(address, [])).toThrow();
    expect(() =>
      createOrder(address, [{ id: "inexistente", quantity: 1 }]),
    ).toThrow();
  });
  it("rejeita snapshots malformados e totais inconsistentes", () => {
    expect(parseOrder(null)).toBeNull();
    expect(parseOrder({ id: "x" })).toBeNull();
    const order = createOrder(address, [{ id: "latte", quantity: 1 }]);
    expect(parseOrder({ ...order, total: 1 })).toBeNull();
    expect(parseOrder(order)).toEqual(order);
  });
});

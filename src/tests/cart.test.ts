import { describe, it, expect } from "vitest";
import { cartReducer, sanitizeCart } from "../cart";
import { checkoutSchema } from "../schema";
import { coffees, DELIVERY, money } from "../data";
describe("Carrinho", () => {
  it("acumula produtos sem duplicar e sem mutar", () => {
    const before = [{ id: "latte", quantity: 2 }];
    const result = cartReducer(before, {
      type: "add",
      id: "latte",
      quantity: 3,
    });
    expect(result).toEqual([{ id: "latte", quantity: 5 }]);
    expect(before[0].quantity).toBe(2);
  });
  it("altera, remove e limpa", () => {
    let state = cartReducer([], { type: "add", id: "latte", quantity: 2 });
    state = cartReducer(state, { type: "quantity", id: "latte", quantity: 4 });
    expect(state[0].quantity).toBe(4);
    expect(cartReducer(state, { type: "remove", id: "latte" })).toEqual([]);
    expect(cartReducer(state, { type: "clear" })).toEqual([]);
  });
  it("recusa IDs desconhecidos, zero, negativos e frações", () => {
    for (const quantity of [0, -1, 1.5, NaN])
      expect(cartReducer([], { type: "add", id: "latte", quantity })).toEqual(
        [],
      );
    expect(
      cartReducer([], { type: "add", id: "fantasma", quantity: 1 }),
    ).toEqual([]);
  });
  it("limita em 99 e não cria item ao alterar ID ausente", () => {
    expect(
      cartReducer([{ id: "latte", quantity: 98 }], {
        type: "add",
        id: "latte",
        quantity: 8,
      })[0].quantity,
    ).toBe(99);
    expect(
      cartReducer([], { type: "quantity", id: "latte", quantity: 4 }),
    ).toEqual([]);
  });
  it("sanitiza persistência inválida", () => {
    expect(sanitizeCart(null)).toEqual([]);
    expect(sanitizeCart({})).toEqual([]);
    expect(
      sanitizeCart([
        null,
        { id: "latte", quantity: 3 },
        { id: "latte", quantity: 4 },
        { id: "foo", quantity: 2 },
        { id: "leite", quantity: -2 },
      ]),
    ).toEqual([{ id: "latte", quantity: 3 }]);
  });
  it("calcula em centavos inteiros", () => {
    const price = coffees.find((c) => c.id === "tradicional")!.price;
    expect(price * 3 + DELIVERY).toBe(3320);
    expect(money(3320).replace(/\s/g, " ")).toBe("R$ 33,20");
  });
});
const address = {
  cep: "01001-000",
  street: "Rua de Teste",
  number: "123",
  complement: "",
  district: "Centro",
  city: "São Paulo",
  state: "SP",
  payment: "credit",
};
describe("Checkout", () => {
  it("aceita endereço completo e complemento vazio", () =>
    expect(checkoutSchema.safeParse(address).success).toBe(true));
  it("exige pagamento, número e UF válida", () => {
    for (const invalid of [
      { payment: "" },
      { number: "" },
      { state: "XX" },
      { cep: "123" },
      { street: " " },
      { district: "" },
      { city: "" },
    ])
      expect(checkoutSchema.safeParse({ ...address, ...invalid }).success).toBe(
        false,
      );
  });
  it("aceita CEP sem hífen e endereço sem número", () =>
    expect(
      checkoutSchema.safeParse({ ...address, cep: "01001000", number: "S/N" })
        .success,
    ).toBe(true));
});

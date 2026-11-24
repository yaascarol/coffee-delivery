import { z } from "zod";
export const states = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
] as const;
export const checkoutSchema = z.object({
  cep: z
    .string()
    .trim()
    .regex(/^\d{5}-?\d{3}$/, "Informe um CEP válido (8 números)"),
  street: z.string().trim().min(3, "Informe a rua"),
  number: z.string().trim().min(1, "Informe o número ou S/N"),
  complement: z.string().trim(),
  district: z.string().trim().min(2, "Informe o bairro"),
  city: z.string().trim().min(2, "Informe a cidade"),
  state: z.enum(states, { error: "Selecione a UF" }),
  payment: z.enum(["credit", "debit", "cash"], {
    error: "Selecione a forma de pagamento",
  }),
});
export type Address = z.infer<typeof checkoutSchema>;
export const payments = {
  credit: "Cartão de crédito",
  debit: "Cartão de débito",
  cash: "Dinheiro",
};

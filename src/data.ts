export type Coffee = {
  id: string;
  name: string;
  description: string;
  tags: string[];
  price: number;
  color: string;
  foam: boolean;
};
export const coffees: Coffee[] = [
  {
    id: "tradicional",
    name: "Expresso Tradicional",
    description: "O tradicional café feito com água quente e grãos moídos",
    tags: ["Tradicional"],
    price: 990,
    color: "#6f3820",
    foam: false,
  },
  {
    id: "americano",
    name: "Expresso Americano",
    description: "Expresso diluído, menos intenso que o tradicional",
    tags: ["Tradicional"],
    price: 990,
    color: "#442518",
    foam: false,
  },
  {
    id: "cremoso",
    name: "Expresso Cremoso",
    description: "Café expresso tradicional com espuma cremosa",
    tags: ["Tradicional"],
    price: 990,
    color: "#b47b46",
    foam: true,
  },
  {
    id: "gelado",
    name: "Expresso Gelado",
    description: "Bebida preparada com café expresso e cubos de gelo",
    tags: ["Tradicional", "Gelado"],
    price: 1090,
    color: "#70472d",
    foam: false,
  },
  {
    id: "leite",
    name: "Café com Leite",
    description: "Meio a meio de expresso tradicional com leite vaporizado",
    tags: ["Tradicional", "Com leite"],
    price: 1090,
    color: "#c79c6d",
    foam: true,
  },
  {
    id: "latte",
    name: "Latte",
    description: "Uma dose de café expresso com o dobro de leite e espuma",
    tags: ["Tradicional", "Com leite"],
    price: 1190,
    color: "#d5ad83",
    foam: true,
  },
  {
    id: "capuccino",
    name: "Capuccino",
    description: "Canela, café, leite e espuma na medida perfeita",
    tags: ["Tradicional", "Com leite"],
    price: 1290,
    color: "#b98552",
    foam: true,
  },
  {
    id: "macchiato",
    name: "Macchiato",
    description: "Café expresso misturado com um pouco de leite e espuma",
    tags: ["Tradicional", "Com leite"],
    price: 1190,
    color: "#ad7544",
    foam: true,
  },
  {
    id: "mocaccino",
    name: "Mocaccino",
    description: "Café expresso com calda de chocolate, leite e espuma",
    tags: ["Tradicional", "Com leite"],
    price: 1390,
    color: "#865033",
    foam: true,
  },
  {
    id: "chocolate",
    name: "Chocolate Quente",
    description: "Chocolate dissolvido no leite quente e cremoso",
    tags: ["Especial", "Com leite"],
    price: 1290,
    color: "#6a3a27",
    foam: true,
  },
  {
    id: "cubano",
    name: "Cubano",
    description:
      "Drink gelado de café expresso com rum, creme de leite e hortelã",
    tags: ["Especial", "Alcoólico", "Gelado"],
    price: 1590,
    color: "#9b714d",
    foam: true,
  },
  {
    id: "havaiano",
    name: "Havaiano",
    description: "Uma combinação especial de café e leite de coco",
    tags: ["Especial"],
    price: 1390,
    color: "#c5a078",
    foam: true,
  },
  {
    id: "arabe",
    name: "Árabe",
    description: "Café com especiarias e o aroma marcante do cardamomo",
    tags: ["Especial"],
    price: 1490,
    color: "#71401f",
    foam: false,
  },
  {
    id: "irlandes",
    name: "Irlandês",
    description: "Café com uísque irlandês, açúcar e chantilly",
    tags: ["Especial", "Alcoólico"],
    price: 1690,
    color: "#976443",
    foam: true,
  },
];
export const money = (cents: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
    cents / 100,
  );
export const DELIVERY = 350;

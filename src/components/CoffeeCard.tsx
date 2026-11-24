import { useState } from "react";
import { ShoppingCart } from "@phosphor-icons/react";
import styled from "styled-components";
import { type Coffee, money } from "../data";
import { useCart } from "../store";
import { QuantityInput } from "./QuantityInput";
const Card = styled.article`
  position: relative;
  background: ${(p) => p.theme.card};
  border-radius: 6px 36px;
  padding: 0 20px 20px;
  text-align: center;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  > img {
    height: 120px;
    width: 120px;
    object-fit: contain;
    margin-top: -20px;
    margin-bottom: 12px;
  }
  .tags {
    display: flex;
    gap: 4px;
    justify-content: center;
    flex-wrap: wrap;
    min-height: 22px;
  }
  h3 {
    margin: 14px 0 8px;
    font-weight: 700;
  }
  p {
    font-size: 0.875rem;
    color: ${(p) => p.theme.muted};
    min-height: 42px;
  }
  .buy {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    width: 100%;
    margin-top: auto;
    padding-top: 28px;
  }
  .price {
    white-space: nowrap;
    font-size: 0.875rem;
    strong {
      font-family: "Baloo 2", sans-serif;
      font-size: 1.5rem;
      color: ${(p) => p.theme.text};
    }
  }
  .controls {
    display: flex;
    gap: 8px;
  }
  .add {
    border: 0;
    border-radius: 6px;
    background: #4b2995;
    color: white;
    min-width: 40px;
    height: 40px;
    display: grid;
    place-items: center;
    &:hover {
      background: #8047f8;
    }
  }
  @media (min-width: 601px) and (max-width: 1100px) {
    padding-inline: 14px;
  }
  .feedback {
    font-size: 0.75rem;
    color: ${(p) => p.theme.purpleDark};
    min-height: 18px;
    margin-top: 8px;
  }
`;
export const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  background: ${(p) => p.theme.yellowLight};
  color: ${(p) => p.theme.yellowDark};
  font-size: 0.625rem;
  font-weight: 700;
  text-transform: uppercase;
  padding: 4px 8px;
  border-radius: 100px;
`;
export function CoffeeCard({ coffee }: { coffee: Coffee }) {
  const [quantity, setQuantity] = useState(1);
  const [notice, setNotice] = useState("");
  const { dispatch, items } = useCart();
  function add() {
    const current = items.find((item) => item.id === coffee.id)?.quantity ?? 0;
    dispatch({ type: "add", id: coffee.id, quantity });
    setNotice(
      current + quantity > 99
        ? "Limite de 99 unidades por café."
        : `${quantity} ${quantity === 1 ? "unidade adicionada" : "unidades adicionadas"}!`,
    );
  }
  return (
    <Card>
      <img
        src={`/coffees/${coffee.id}.png`}
        alt={`Xícara de ${coffee.name}`}
        width="120"
        height="120"
        loading="lazy"
      />
      <div className="tags">
        {coffee.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
      <h3>{coffee.name}</h3>
      <p>{coffee.description}</p>
      <div className="buy">
        <span className="price">
          R$ <strong>{money(coffee.price).replace(/R\$\s*/, "")}</strong>
        </span>
        <div className="controls">
          <QuantityInput
            name={coffee.name}
            value={quantity}
            onChange={(value) => {
              setQuantity(value);
              setNotice("");
            }}
          />
          <button
            className="add"
            type="button"
            onClick={add}
            aria-label={`Adicionar ${coffee.name} ao carrinho`}
          >
            <ShoppingCart size={22} weight="fill" />
          </button>
        </div>
      </div>
      <div className="feedback" role="status">
        {notice}
      </div>
    </Card>
  );
}

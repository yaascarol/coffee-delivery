import { Trash } from "@phosphor-icons/react";
import styled from "styled-components";
import { coffees, DELIVERY, money } from "../data";
import { useCart } from "../store";
import { QuantityInput } from "./QuantityInput";
import { Panel, PrimaryButton } from "../styles/shared";
const Summary = styled(Panel)`
  border-radius: 6px 44px;
  .item {
    display: grid;
    grid-template-columns: 64px 1fr;
    gap: 20px;
    padding: 8px 0 24px;
    border-bottom: 1px solid ${(p) => p.theme.border};
    margin-bottom: 24px;
  }
  .item img {
    width: 64px;
    height: 64px;
    object-fit: contain;
  }
  .item-top {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 8px;
    color: ${(p) => p.theme.title};
    font-size: 1rem;
  }
  .item-top strong {
    white-space: nowrap;
    font-size: 0.875rem;
  }
  .item-controls {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }
  .remove {
    display: flex;
    align-items: center;
    gap: 4px;
    min-height: 40px;
    padding: 8px;
    border: 0;
    border-radius: 6px;
    background: ${(p) => p.theme.button};
    color: ${(p) => p.theme.text};
    font-size: 0.75rem;
    text-transform: uppercase;
    svg {
      color: ${(p) => p.theme.purple};
    }
    &:hover {
      background: ${(p) => p.theme.hover};
    }
  }
  dl {
    margin: 0 0 24px;
  }
  dl > div {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    margin: 12px 0;
    font-size: 0.875rem;
  }
  dd {
    margin: 0;
  }
  .grand-total {
    font-weight: 700;
    font-size: 1.25rem;
    color: ${(p) => p.theme.title};
  }
  ${PrimaryButton} {
    width: 100%;
  }
  .note {
    text-align: center;
    font-size: 0.75rem;
    color: ${(p) => p.theme.muted};
    margin-top: 12px;
  }
  @media (max-width: 360px) {
    .item {
      gap: 10px;
      grid-template-columns: 46px 1fr;
    }
    .item img {
      width: 46px;
      height: 46px;
    }
    .item-top {
      flex-wrap: wrap;
    }
  }
`;
export function CartSummary({ submitting }: { submitting: boolean }) {
  const { items, total, dispatch } = useCart();
  return (
    <Summary aria-label="Resumo do pedido">
      {items.map((item) => {
        const coffee = coffees.find((c) => c.id === item.id)!;
        return (
          <div className="item" key={item.id}>
            <img src={`/coffees/${item.id}.png`} alt="" />
            <div>
              <div className="item-top">
                <span>{coffee.name}</span>
                <strong>{money(coffee.price * item.quantity)}</strong>
              </div>
              <div className="item-controls">
                <QuantityInput
                  value={item.quantity}
                  name={coffee.name}
                  onChange={(quantity) =>
                    dispatch({ type: "quantity", id: item.id, quantity })
                  }
                />
                <button
                  className="remove"
                  type="button"
                  onClick={() => dispatch({ type: "remove", id: item.id })}
                  aria-label={`Remover ${coffee.name}`}
                >
                  <Trash size={16} />
                  Remover
                </button>
              </div>
            </div>
          </div>
        );
      })}
      <dl aria-live="polite">
        <div>
          <dt>Total de itens</dt>
          <dd>{money(total)}</dd>
        </div>
        <div>
          <dt>Entrega</dt>
          <dd>{money(items.length ? DELIVERY : 0)}</dd>
        </div>
        <div className="grand-total">
          <dt>Total</dt>
          <dd>{money(total + (items.length ? DELIVERY : 0))}</dd>
        </div>
      </dl>
      <PrimaryButton type="submit" disabled={submitting || items.length === 0}>
        {submitting ? "Confirmando…" : "Confirmar pedido"}
      </PrimaryButton>
      <p className="note">Pedido fictício • Nenhuma cobrança será realizada</p>
    </Summary>
  );
}

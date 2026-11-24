import {
  CurrencyDollar,
  MapPin,
  Timer,
  CheckCircle,
} from "@phosphor-icons/react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { Container, IconCircle } from "../styles/shared";
import { parseOrder, readOrder } from "../order";
import { payments } from "../schema";
import { money } from "../data";
import { EmptyState } from "../components/EmptyState";
const SuccessLayout = styled(Container)`
  padding-top: 64px;
  padding-bottom: 100px;
  h1 {
    font-size: 2rem;
    color: ${(p) => p.theme.yellowDark};
  }
  .lead {
    font-size: 1.25rem;
    margin-top: 4px;
  }
  .content {
    display: grid;
    grid-template-columns: 1.1fr 1fr;
    gap: 80px;
    align-items: center;
    margin-top: 40px;
  }
  .border {
    padding: 1px;
    border-radius: 6px 36px;
    background: linear-gradient(120deg, #dbac2c, #8047f8);
  }
  .details {
    background: ${(p) => p.theme.background};
    padding: 40px;
    border-radius: 5px 35px;
    display: flex;
    flex-direction: column;
    gap: 28px;
  }
  .detail {
    display: flex;
    gap: 12px;
    align-items: center;
  }
  .detail p {
    line-height: 1.5;
  }
  .art {
    width: 100%;
    max-width: 492px;
  }
  .order-meta {
    font-size: 0.875rem;
    color: ${(p) => p.theme.muted};
    margin-top: 22px;
    display: flex;
    gap: 8px;
    align-items: center;
  }
  .return {
    display: inline-block;
    color: ${(p) => p.theme.purpleDark};
    text-decoration: underline;
    text-underline-offset: 4px;
    margin-top: 24px;
  }
  @media (max-width: 800px) {
    padding-top: 32px;
    .content {
      grid-template-columns: 1fr;
      gap: 36px;
    }
    .art {
      max-width: 340px;
      justify-self: center;
    }
    .details {
      padding: 28px 24px;
    }
  }
`;
export function Success() {
  const location = useLocation();
  const order = parseOrder(location.state?.order) ?? readOrder();
  if (!order)
    return (
      <EmptyState
        title="Nenhum pedido por aqui ainda"
        description="Escolha seus cafés e finalize um pedido para acompanhar a confirmação."
      />
    );
  return (
    <SuccessLayout>
      <h1>Uhu! Pedido confirmado</h1>
      <p className="lead">
        Agora é só aguardar que logo o café chegará até você
      </p>
      <div className="content">
        <div>
          <div className="border">
            <section className="details" aria-label="Detalhes da entrega">
              <div className="detail">
                <IconCircle $tone="purple">
                  <MapPin weight="fill" size={16} />
                </IconCircle>
                <p>
                  Entrega em{" "}
                  <strong>
                    {order.address.street}, {order.address.number}
                  </strong>
                  <br />
                  {order.address.district} — {order.address.city},{" "}
                  {order.address.state}
                  {order.address.complement && (
                    <>
                      <br />
                      {order.address.complement}
                    </>
                  )}
                </p>
              </div>
              <div className="detail">
                <IconCircle $tone="yellow">
                  <Timer weight="fill" size={16} />
                </IconCircle>
                <p>
                  Previsão de entrega
                  <br />
                  <strong>20 min – 30 min</strong>
                </p>
              </div>
              <div className="detail">
                <IconCircle>
                  <CurrencyDollar size={16} />
                </IconCircle>
                <p>
                  Pagamento na entrega
                  <br />
                  <strong>{payments[order.address.payment]}</strong>
                </p>
              </div>
            </section>
          </div>
          <p className="order-meta">
            <CheckCircle size={20} />
            Pedido #{order.id.slice(0, 8).toUpperCase()} • {money(order.total)}
          </p>
          {location.state?.persisted === false && (
            <p role="status">
              O navegador não permitiu salvar esta confirmação. Ela pode
              desaparecer ao fechar a página.
            </p>
          )}
          <Link className="return" to="/">
            Voltar para o catálogo
          </Link>
        </div>
        <img
          className="art"
          src="/delivery.svg"
          alt="Entregador levando o café de scooter"
        />
      </div>
    </SuccessLayout>
  );
}

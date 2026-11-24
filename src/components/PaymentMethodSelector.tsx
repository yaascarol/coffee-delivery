import { Bank, CreditCard, CurrencyDollar, Money } from "@phosphor-icons/react";
import { useFormContext } from "react-hook-form";
import styled from "styled-components";
import { payments, type Address } from "../schema";
import { Panel, SectionIntro } from "../styles/shared";
const Choices = styled.fieldset`
  border: 0;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  label {
    position: relative;
    cursor: pointer;
  }
  input {
    position: absolute;
    opacity: 0;
    width: 1px;
    height: 1px;
  }
  span {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 14px 8px;
    min-height: 52px;
    background: ${(p) => p.theme.button};
    border: 1px solid transparent;
    border-radius: 6px;
    font-size: 0.75rem;
    text-transform: uppercase;
    svg {
      color: ${(p) => p.theme.purple};
      flex-shrink: 0;
    }
  }
  input:checked + span {
    background: ${(p) => p.theme.purpleLight};
    border-color: ${(p) => p.theme.purple};
  }
  input:focus-visible + span {
    outline: 3px solid ${(p) => p.theme.purple};
    outline-offset: 3px;
  }
  label:hover span {
    background: ${(p) => p.theme.hover};
  }
  .error {
    grid-column: 1/-1;
  }
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    span {
      justify-content: flex-start;
      padding-inline: 16px;
    }
  }
`;
export function PaymentMethodSelector() {
  const {
    register,
    formState: { errors },
  } = useFormContext<Address>();
  return (
    <Panel>
      <SectionIntro>
        <CurrencyDollar size={22} color="#8047F8" />
        <div>
          <h2>Pagamento</h2>
          <p>
            O pagamento é feito na entrega. Escolha a forma que deseja pagar
          </p>
        </div>
      </SectionIntro>
      <Choices aria-describedby={errors.payment ? "payment-error" : undefined}>
        <legend className="sr-only">Forma de pagamento</legend>
        {(
          [
            { id: "credit", Icon: CreditCard },
            { id: "debit", Icon: Bank },
            { id: "cash", Icon: Money },
          ] as const
        ).map(({ id, Icon }) => (
          <label key={id}>
            <input type="radio" value={id} {...register("payment")} />
            <span>
              <Icon size={18} />
              {payments[id]}
            </span>
          </label>
        ))}
        {errors.payment && (
          <p className="error" id="payment-error" role="alert">
            {errors.payment.message}
          </p>
        )}
      </Choices>
    </Panel>
  );
}

import { useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { checkoutSchema, type Address } from "../schema";
import { createOrder, ORDER_KEY } from "../order";
import { useCart } from "../store";
import { Container } from "../styles/shared";
import { DeliveryAddressForm } from "../components/DeliveryAddressForm";
import { PaymentMethodSelector } from "../components/PaymentMethodSelector";
import { CartSummary } from "../components/CartSummary";
import { EmptyState } from "../components/EmptyState";
const CheckoutLayout = styled(Container)`
  padding-top: 32px;
  padding-bottom: 80px;
  form {
    display: grid;
    grid-template-columns: minmax(0, 640px) minmax(0, 448px);
    gap: 32px;
  }
  h1,
  h2.section-title {
    font-family: "Baloo 2", sans-serif;
    font-size: 1.125rem;
    font-weight: 700;
    margin-bottom: 15px;
  }
  .left {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .back {
    display: inline-block;
    color: ${(p) => p.theme.purpleDark};
    font-size: 0.875rem;
    margin-bottom: 24px;
    text-decoration: underline;
    text-underline-offset: 4px;
  }
  .form-error {
    margin: 14px 0;
  }
  @media (max-width: 1000px) {
    form {
      grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
      gap: 20px;
    }
  }
  @media (max-width: 850px) {
    form {
      grid-template-columns: 1fr;
    }
    .summary {
      margin-top: 18px;
    }
  }
`;
export function Checkout() {
  const { items, dispatch } = useCart();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const submitted = useRef(false);
  const methods = useForm<Address>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      cep: "",
      street: "",
      number: "",
      complement: "",
      district: "",
      city: "",
    },
    mode: "onBlur",
  });
  function submit(address: Address) {
    if (submitted.current || !items.length) return;
    submitted.current = true;
    try {
      const order = createOrder(address, items);
      let persisted = true;
      try {
        sessionStorage.setItem(ORDER_KEY, JSON.stringify(order));
      } catch {
        persisted = false;
      }
      dispatch({ type: "clear" });
      navigate("/success", { state: { order, persisted }, replace: true });
    } catch {
      setError(
        "Não foi possível confirmar. Confira o carrinho e tente novamente.",
      );
      submitted.current = false;
    }
  }
  if (!items.length) return <EmptyState />;
  return (
    <CheckoutLayout>
      <Link to="/" className="back">
        Continuar escolhendo cafés
      </Link>
      <FormProvider {...methods}>
        <form noValidate onSubmit={methods.handleSubmit(submit)}>
          <div>
            <h1>Complete seu pedido</h1>
            <div className="left">
              <DeliveryAddressForm />
              <PaymentMethodSelector />
            </div>
          </div>
          <div className="summary">
            <h2 className="section-title">Cafés selecionados</h2>
            <CartSummary submitting={methods.formState.isSubmitting} />
            {error && (
              <p className="error form-error" role="alert">
                {error}
              </p>
            )}
          </div>
        </form>
      </FormProvider>
    </CheckoutLayout>
  );
}

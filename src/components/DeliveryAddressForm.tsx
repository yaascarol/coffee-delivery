import { MapPinLine } from "@phosphor-icons/react";
import { useFormContext } from "react-hook-form";
import styled from "styled-components";
import { states, type Address } from "../schema";
import { useCep } from "../hooks/useCep";
import { Panel, SectionIntro } from "../styles/shared";
const Fields = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr 64px;
  gap: 16px 12px;
  .field {
    display: flex;
    flex-direction: column;
    gap: 5px;
    min-width: 0;
  }
  label {
    font-size: 0.875rem;
    color: ${(p) => p.theme.text};
  }
  input,
  select {
    width: 100%;
    height: 44px;
    min-width: 0;
    border: 1px solid ${(p) => p.theme.border};
    border-radius: 4px;
    background: ${(p) => p.theme.input};
    padding: 10px 12px;
    color: ${(p) => p.theme.text};
    font-size: 0.875rem;
  }
  input:focus,
  select:focus {
    border-color: #c47f17;
  }
  input[aria-invalid="true"],
  select[aria-invalid="true"] {
    border-color: ${(p) => p.theme.error};
  }
  .full {
    grid-column: 1/-1;
  }
  .wide {
    grid-column: 2/-1;
  }
  .city {
    grid-column: 2;
  }
  .cep-status {
    font-size: 0.875rem;
    grid-column: 1/-1;
    margin-top: -4px;
  }
  .optional {
    color: ${(p) => p.theme.muted};
    font-size: 0.75rem;
  }
  @media (max-width: 1000px) {
    grid-template-columns: 140px 1fr 70px;
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr 80px;
    .field {
      grid-column: 1/-1;
    }
    .number {
      grid-column: 1;
    }
    .uf {
      grid-column: 2;
      grid-row: 7;
    }
    .city {
      grid-column: 1;
      grid-row: 7;
    }
    .wide {
      grid-column: 1/-1;
    }
  }
`;
export function DeliveryAddressForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<Address>();
  const status = useCep();
  const field = (
    name: Exclude<keyof Address, "state" | "payment">,
    label: string,
    className = "",
    autoComplete?: string,
  ) => (
    <div className={`field ${className}`}>
      <label htmlFor={name}>
        {label}
        {name === "complement" && <span className="optional"> (opcional)</span>}
      </label>
      <input
        id={name}
        {...register(name)}
        autoComplete={autoComplete}
        placeholder={
          name === "cep"
            ? "00000-000"
            : name === "number"
              ? "Número ou S/N"
              : name === "complement"
                ? "Apartamento, bloco…"
                : label
        }
        maxLength={name === "cep" ? 9 : 120}
        inputMode={name === "cep" ? "numeric" : undefined}
        aria-invalid={!!errors[name]}
        aria-describedby={
          errors[name]
            ? `${name}-error`
            : name === "cep"
              ? "cep-status"
              : undefined
        }
      />
      {errors[name] && (
        <span id={`${name}-error`} className="error" role="alert">
          {errors[name]?.message}
        </span>
      )}
    </div>
  );
  return (
    <Panel>
      <SectionIntro>
        <MapPinLine size={22} />
        <div>
          <h2>Endereço de entrega</h2>
          <p>Informe o endereço onde deseja receber seu pedido</p>
        </div>
      </SectionIntro>
      <Fields>
        {field("cep", "CEP", "", "postal-code")}
        <p
          id="cep-status"
          className={`cep-status ${status.error ? "error" : ""}`}
          role="status"
          aria-live="polite"
        >
          {status.message ||
            "Digite o CEP para preencher seu endereço automaticamente."}
        </p>
        {field("street", "Rua", "full", "address-line1")}
        {field("number", "Número", "number")}
        {field("complement", "Complemento", "wide", "address-line2")}
        {field("district", "Bairro")}
        {field("city", "Cidade", "city", "address-level2")}
        <div className="field uf">
          <label htmlFor="state">UF</label>
          <select
            id="state"
            {...register("state")}
            autoComplete="address-level1"
            aria-invalid={!!errors.state}
            aria-describedby={errors.state ? "state-error" : undefined}
          >
            <option value="">UF</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          {errors.state && (
            <span className="error" id="state-error" role="alert">
              {errors.state.message}
            </span>
          )}
        </div>
      </Fields>
    </Panel>
  );
}

import { Minus, Plus } from "@phosphor-icons/react";
import styled from "styled-components";
const Stepper = styled.div`
  display: flex;
  align-items: center;
  border-radius: 6px;
  background: ${(p) => p.theme.button};
  height: 40px;
  button {
    width: 28px;
    min-height: 40px;
    border: 0;
    background: transparent;
    color: ${(p) => p.theme.purple};
    display: grid;
    place-items: center;
    border-radius: 5px;
    &:hover:not(:disabled) {
      background: ${(p) => p.theme.hover};
    }
  }
  output {
    min-width: 20px;
    text-align: center;
    color: ${(p) => p.theme.title};
  }
`;
export function QuantityInput({
  value,
  onChange,
  name,
}: {
  value: number;
  onChange: (value: number) => void;
  name: string;
}) {
  return (
    <Stepper role="group" aria-label={`Quantidade de ${name}`}>
      <button
        type="button"
        disabled={value <= 1}
        onClick={() => onChange(value - 1)}
        aria-label={`Diminuir ${name}`}
      >
        <Minus size={16} />
      </button>
      <output aria-label={`Unidades de ${name}`}>{value}</output>
      <button
        type="button"
        disabled={value >= 99}
        onClick={() => onChange(value + 1)}
        aria-label={`Aumentar ${name}`}
      >
        <Plus size={16} />
      </button>
    </Stepper>
  );
}

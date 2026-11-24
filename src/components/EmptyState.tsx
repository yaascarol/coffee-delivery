import { Coffee } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Container, PrimaryButton } from "../styles/shared";
const Empty = styled(Container)`
  text-align: center;
  padding: 100px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  > svg {
    color: ${(p) => p.theme.purple};
  }
  p {
    max-width: 420px;
  }
`;
export function EmptyState({
  title = "Seu carrinho está esperando um café",
  description = "Escolha seus favoritos no catálogo e prepare seu próximo momento de pausa.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <Empty>
      <Coffee size={64} weight="duotone" />
      <h1 style={{ fontSize: "2rem" }}>{title}</h1>
      <p>{description}</p>
      <PrimaryButton as={Link} to="/">
        Explorar cafés
      </PrimaryButton>
    </Empty>
  );
}

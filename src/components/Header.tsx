import { Link } from "react-router-dom";
import { MapPin, ShoppingCart, Moon, Sun } from "@phosphor-icons/react";
import styled from "styled-components";
import { Container } from "../styles/shared";
import { useCart } from "../store";
import { useAppTheme } from "../styles/theme";
const Bar = styled.header`
  padding: 28px 0;
  background: ${(p) => p.theme.background};
  ${Container} {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }
  @media (max-width: 480px) {
    padding: 20px 0;
  }
`;
const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  img {
    width: 48px;
    height: 48px;
    object-fit: contain;
  }
  span {
    font-family: "Baloo 2", sans-serif;
    line-height: 0.95;
    font-size: 1.35rem;
    font-weight: 800;
    color: ${(p) => p.theme.title};
  }
  small {
    font-size: 0.85rem;
    font-weight: 500;
    letter-spacing: 2px;
    display: block;
    margin-top: 5px;
  }
`;
const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  .location {
    display: flex;
    gap: 5px;
    align-items: center;
    background: ${(p) => p.theme.purpleLight};
    color: ${(p) => p.theme.purpleDark};
    padding: 10px;
    border-radius: 6px;
    font-size: 0.875rem;
  }
  @media (max-width: 540px) {
    .location {
      display: none;
    }
  }
`;
const ThemeButton = styled.button`
  border: 1px solid ${(p) => p.theme.border};
  background: ${(p) => p.theme.card};
  color: ${(p) => p.theme.text};
  display: grid;
  place-items: center;
  border-radius: 6px;
  width: 44px;
  height: 44px;
`;
const CartLink = styled(Link)`
  position: relative;
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  background: ${(p) => p.theme.yellowLight};
  color: ${(p) => p.theme.yellowDark};
  border-radius: 6px;
  span {
    position: absolute;
    right: -8px;
    top: -8px;
    border-radius: 100px;
    min-width: 22px;
    height: 22px;
    padding: 2px 5px;
    background: #c47f17;
    color: #fff;
    font-size: 12px;
    font-weight: 700;
    text-align: center;
  }
`;
export function Header() {
  const { count } = useCart();
  const { mode, toggle } = useAppTheme();
  return (
    <Bar>
      <Container>
        <Logo to="/" aria-label="Coffee Delivery — início">
          <img src="/logo.png" alt="" />
          <span>
            Coffee<small>DELIVERY</small>
          </span>
        </Logo>
        <Actions>
          <div className="location">
            <MapPin size={20} weight="fill" />
            Seu café, onde você estiver
          </div>
          <ThemeButton
            onClick={toggle}
            aria-label={
              mode === "light" ? "Ativar modo escuro" : "Ativar modo claro"
            }
            title={
              mode === "light" ? "Ativar modo escuro" : "Ativar modo claro"
            }
          >
            {mode === "light" ? <Moon size={21} /> : <Sun size={21} />}
          </ThemeButton>
          <CartLink
            to="/checkout"
            aria-label={`Carrinho com ${count} unidades`}
          >
            <ShoppingCart size={22} weight="fill" />
            {count > 0 && <span aria-hidden="true">{count}</span>}
          </CartLink>
        </Actions>
      </Container>
    </Bar>
  );
}

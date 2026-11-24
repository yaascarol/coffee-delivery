import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import styled from "styled-components";
import { Header } from "./components/Header";
import { EmptyState } from "./components/EmptyState";
import { Home } from "./pages/Home";
import { Checkout } from "./pages/Checkout";
import { Success } from "./pages/Success";
import { GlobalStyle } from "./styles/global";
import { useCart } from "./store";
const Footer = styled.footer`
  padding: 28px 16px;
  border-top: 1px solid ${(p) => p.theme.border};
  text-align: center;
  color: ${(p) => p.theme.muted};
  font-size: 0.875rem;
  span {
    display: block;
    margin-top: 6px;
    font-size: 0.75rem;
  }
`;
const StorageWarning = styled.p`
  background: ${(p) => p.theme.yellowLight};
  padding: 12px;
  text-align: center;
  font-size: 0.875rem;
`;
export default function App() {
  const { pathname } = useLocation();
  const { storageError } = useCart();
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${pathname === "/checkout" ? "Checkout" : pathname === "/success" ? "Pedido confirmado" : "Seu café, seu momento"} | Coffee Delivery`;
  }, [pathname]);
  return (
    <>
      <GlobalStyle />
      <a className="skip-link" href="#main">
        Pular para o conteúdo
      </a>
      <Header />
      {storageError && (
        <StorageWarning role="status">
          O navegador não permitiu salvar o carrinho. Ele será mantido apenas
          enquanto esta página estiver aberta.
        </StorageWarning>
      )}
      <main id="main" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/success" element={<Success />} />
          <Route
            path="*"
            element={
              <EmptyState
                title="Essa página não está no cardápio"
                description="Volte ao catálogo para encontrar seu próximo café."
              />
            }
          />
        </Routes>
      </main>
      <Footer>
        Coffee Delivery • Seu café, seu momento
        <span>
          Projeto acadêmico. Pedidos, pagamentos e entregas são fictícios.
        </span>
      </Footer>
    </>
  );
}

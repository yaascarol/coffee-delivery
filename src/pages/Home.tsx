import { Coffee, Package, ShoppingCart, Timer } from "@phosphor-icons/react";
import styled from "styled-components";
import { Container, IconCircle } from "../styles/shared";
import { coffees } from "../data";
import { CoffeeCard } from "../components/CoffeeCard";
const Hero = styled.section`
  padding: 62px 0 80px;
  background:
    radial-gradient(
      ellipse at 8% 50%,
      ${(p) => p.theme.yellowLight}55,
      transparent 42%
    ),
    radial-gradient(
      ellipse at 90% 50%,
      ${(p) => p.theme.purpleLight}88,
      transparent 45%
    );
  ${Container} {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: 56px;
    align-items: center;
  }
  h1 {
    max-width: 590px;
  }
  .subtitle {
    font-size: 1.25rem;
    margin-top: 16px;
    color: ${(p) => p.theme.text};
  }
  .benefits {
    display: grid;
    grid-template-columns: 1fr 1.15fr;
    gap: 20px 22px;
    margin-top: 56px;
  }
  .benefit {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 1rem;
  }
  .hero-art {
    width: 476px;
    justify-self: end;
  }
  @media (max-width: 900px) {
    padding: 30px 0 50px;
    ${Container} {
      gap: 24px;
    }
    h1 {
      font-size: 2.5rem;
    }
    .benefits {
      grid-template-columns: 1fr;
      margin-top: 28px;
      gap: 14px;
    }
    .subtitle {
      font-size: 1.125rem;
    }
  }
  @media (max-width: 650px) {
    ${Container} {
      grid-template-columns: 1fr;
    }
    .hero-art {
      grid-row: 2;
      width: 300px;
      justify-self: center;
      margin-top: 10px;
    }
    h1 {
      font-size: 2.25rem;
    }
    .benefits {
      grid-template-columns: 1fr 1fr;
      gap: 16px 12px;
    }
    .benefit {
      font-size: 0.875rem;
      gap: 8px;
    }
  }
  @media (max-width: 360px) {
    .benefits {
      grid-template-columns: 1fr;
    }
  }
`;
const Catalog = styled(Container)`
  padding-top: 28px;
  padding-bottom: 80px;
  .catalog-heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 34px;
    gap: 16px;
  }
  .catalog-heading span {
    font-size: 0.875rem;
    color: ${(p) => p.theme.muted};
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 20px 32px;
  }
  @media (max-width: 1100px) {
    .grid {
      gap: 20px 18px;
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }
  @media (max-width: 850px) {
    .grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
  @media (max-width: 540px) {
    .grid {
      grid-template-columns: 1fr;
      gap: 24px;
      max-width: 340px;
      margin: auto;
    }
    .catalog-heading {
      margin-bottom: 30px;
    }
    .catalog-heading span {
      display: none;
    }
  }
`;
export function Home() {
  return (
    <>
      <Hero>
        <Container>
          <div>
            <h1>Encontre o café perfeito para qualquer hora do dia</h1>
            <p className="subtitle">
              Com o Coffee Delivery você recebe seu café onde estiver, a
              qualquer hora
            </p>
            <div className="benefits">
              <div className="benefit">
                <IconCircle>
                  <ShoppingCart weight="fill" size={16} />
                </IconCircle>
                Compra simples e segura
              </div>
              <div className="benefit">
                <IconCircle $tone="gray">
                  <Package weight="fill" size={16} />
                </IconCircle>
                Embalagem mantém o café intacto
              </div>
              <div className="benefit">
                <IconCircle $tone="yellow">
                  <Timer weight="fill" size={16} />
                </IconCircle>
                Entrega rápida e rastreada
              </div>
              <div className="benefit">
                <IconCircle $tone="purple">
                  <Coffee weight="fill" size={16} />
                </IconCircle>
                O café chega fresquinho até você
              </div>
            </div>
          </div>
          <img
            className="hero-art"
            src="/hero.png"
            alt="Copo de café para viagem com grãos de café"
            width="476"
            height="360"
            fetchPriority="high"
          />
        </Container>
      </Hero>
      <Catalog as="section" aria-labelledby="catalog-title">
        <div className="catalog-heading">
          <h2 id="catalog-title">Nossos cafés</h2>
          <span>Um café para cada momento</span>
        </div>
        <div className="grid">
          {coffees.map((coffee) => (
            <CoffeeCard key={coffee.id} coffee={coffee} />
          ))}
        </div>
      </Catalog>
    </>
  );
}

import styled from "styled-components";
export const Container = styled.div`
  width: min(1120px, calc(100% - 48px));
  margin-inline: auto;
  @media (max-width: 480px) {
    width: calc(100% - 32px);
  }
`;
export const Panel = styled.section`
  background: ${(p) => p.theme.card};
  padding: 40px;
  border-radius: 6px;
  @media (max-width: 600px) {
    padding: 24px 16px;
  }
`;
export const PrimaryButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 0;
  border-radius: 6px;
  min-height: 48px;
  padding: 12px 24px;
  background: ${(p) => p.theme.yellow};
  color: #35260d;
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  transition: background 0.15s;
  &:hover:not(:disabled) {
    background: #c47f17;
    color: #fff;
  }
`;
export const SectionIntro = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 30px;
  > svg {
    flex-shrink: 0;
    color: ${(p) => p.theme.yellowDark};
    margin-top: 2px;
  }
  h2 {
    font-family: Roboto, sans-serif;
    font-size: 1rem;
    font-weight: 400;
    margin-bottom: 4px;
  }
  p {
    font-size: 0.875rem;
  }
`;
export const IconCircle = styled.span<{
  $tone?: "purple" | "yellow" | "brown" | "gray";
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  flex-shrink: 0;
  color: white;
  background: ${(p) => (p.$tone === "purple" ? "#8047F8" : p.$tone === "yellow" ? "#DBAC2C" : p.$tone === "gray" ? "#574F4D" : "#C47F17")};
`;

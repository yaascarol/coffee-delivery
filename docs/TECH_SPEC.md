# Coffee Delivery — Technical SPEC

## Stack e responsabilidades
React + Vite + TypeScript strict para SPA tipada. React Router para rotas (RF-07). Context API e useReducer para carrinho (RF-03 a RF-06). React Hook Form e Zod para validação (RF-08/09/11). styled-components para tokens e estilos responsivos (RF-14/15). Phosphor Icons para ícones do protótipo. Vitest para regras de negócio; Playwright para fluxo e screenshots quando disponível.

## Arquitetura
`main.tsx` monta BrowserRouter, CartProvider e ThemeProvider. `App.tsx` contém somente estrutura e rotas. `components/` reúne Header, QuantityInput, CoffeeCard, CartSummary, DeliveryAddressForm e PaymentMethodSelector. `pages/` contém Home, Checkout e Success. `data.ts` fornece Coffee[], dinheiro em centavos e DELIVERY. `cart.ts` contém tipos, sanitização e reducer puro; `store.tsx` encapsula Context e useCart. `schema.ts` centraliza endereço e pagamentos; `hooks/` isola ViaCEP; `styles/` contém tokens e estilos. `order.ts` define snapshot e leitura defensiva.

## Contratos
- Coffee: id, name, description, tags, price em centavos, parâmetros visuais/imagem.
- CartItem: id do café e quantity inteira positiva.
- DeliveryAddress (Address): cep, street, number, complement, district, city e state.
- PaymentMethod: `credit | debit | cash`.
- Order: id, createdAt, address (incluindo payment), items com nome/preço/quantidade, subtotal, delivery e total. Snapshot independente do carrinho, validado na leitura.

## Estado e efeitos
Ações `add`, `quantity`, `remove`, `clear`; `map`, `filter`, `find` e `reduce` sem mutar arrays. `quantity` dá suporte a incrementar/decrementar. `add` acumula e limita 99. Rehidratação filtra IDs desconhecidos, duplicatas e quantidades inválidas. Persistência usa `coffee-delivery:cart:v1`; falhas de armazenamento preservam funcionamento em memória e informam o usuário. Tema usa chave própria, fallback a prefers-color-scheme e ThemeProvider. Hooks locais controlam quantidade selecionada e feedback.

ViaCEP: disparo ao completar 8 dígitos; AbortController e limpeza do efeito evitam aplicar respostas antigas. Validar formato, resposta `erro`, status HTTP e estrutura mínima. Timeout e mensagens acessíveis. Campos disponíveis são preenchidos sem alterar número/complemento; usuário pode corrigir manualmente. Nenhuma consulta envia dados além do CEP.

## Checkout e rotas
`/`: catálogo. `/checkout`: formulário e resumo, ou estado vazio. `/success`: snapshot ou estado vazio; rota desconhecida mostra retorno ao início. Zod exige CEP, rua, número, bairro, cidade, UF brasileira e pagamento; complemento opcional. Dinheiro sempre inteiro. Frete centralizado em DELIVERY. Confirmar salva snapshot em SessionStorage, limpa carrinho e navega com estado de rota como fallback. Não há API de pagamento.

## Temas e acesso
styled-components ThemeProvider e createGlobalStyle com cores semânticas. Baloo 2 e Roboto hospedadas localmente quando possível. Grid de 1/2/4 colunas; checkout empilha no mobile. Botões de quantidade com nomes acessíveis e alvos confortáveis, labels nos campos, fieldset/legend no pagamento, foco visível e status live. Transições respeitam prefers-reduced-motion.

## Validação
`npm test`: acumulação, remoção, limites, imutabilidade, persistência corrompida, dinheiro e schema. `npm run build`: TypeScript + Vite. Testes de navegador: catálogo → carrinho → refresh → checkout inválido → ViaCEP → pagamento → sucesso → carrinho limpo; estados vazios, tema persistente, CEP inexistente/falha/respostas atrasadas e viewport. Mocks determinísticos da API nos testes; verificar integração real separadamente. Screenshots reais em `docs/screenshots/`, sem dados pessoais reais.

## Publicação
Build estático `dist`, Node 22.12+ ou 24 recomendado. Vercel usa `vercel.json`, Netlify usa `public/_redirects` para fallback de SPA. Sites pode hospedar o mesmo build. `npm ci`, `npm test`, `npm run build`. Não versionar node_modules, dist, secrets ou .env. Estado de publicação registrado somente após confirmação.

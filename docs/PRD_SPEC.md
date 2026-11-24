# Coffee Delivery — Product SPEC

## Visão e público
SPA acadêmica de uma cafeteria fictícia para pessoas que desejam escolher cafés e simular uma entrega. Objetivo: completar o fluxo catálogo → carrinho/checkout → confirmação com clareza, acessibilidade e identidade consistente. Não há backend próprio, login, cobrança real nem gestão de estoque.

## Referências
- [Figma e Style Guide](https://www.figma.com/design/yGPNTA0Yczb183EikXGIiA/Coffee-Delivery-%E2%80%A2-Projeto-Final-React?node-id=2-1297). Frames: Home 2:1550; checkout 217:511; sucesso 222:824.
- [Enunciado](https://deluxe-blue-bc1.notion.site/Projeto-Final-05-Coffee-Delivery-React-TypeScript-IA-41bdfca74d8d8119a849e30ea492a6af).
- Texto integral e capturas do Style Guide fornecidos pela aluna. Consulta via MCP ao arquivo Figma indisponível por permissão; capturas fornecidas orientam cores, tipografia e componentes. Não se afirma comparação pixel a pixel das telas completas.

## Requisitos e critérios verificáveis
| ID | Requisito / aceite |
| --- | --- |
| RF-01 | Catálogo local com 14 cafés, imagem, nome, descrição, preço e tags. |
| RF-02 | Seletor de quantidade inteira entre 1 e 99 antes da adição. |
| RF-03 | Adicionar produto repetido acumula até 99 unidades em uma única linha. |
| RF-04 | Badge do Header soma todas as unidades. |
| RF-05 | Alterar quantidade e remover itens atualiza badge e totais imediatamente. |
| RF-06 | Carrinho recuperado após recarregar; dados inválidos não quebram a aplicação. |
| RF-07 | React Router conecta `/`, `/checkout` e `/success` sem recarga completa. |
| RF-08 | CEP de 8 dígitos consulta ViaCEP, preenche rua, bairro, cidade e UF disponíveis; informa carregamento, CEP inexistente e falha; permite edição manual. Número manual e complemento opcional. |
| RF-09 | Crédito, débito ou dinheiro: exatamente uma opção obrigatória. |
| RF-10 | Resumo apresenta subtotal, frete e total coerentes em BRL. |
| RF-11 | Carrinho vazio e campos inválidos impedem confirmação; erros são visíveis e associados aos campos. |
| RF-12 | Sucesso mostra endereço, pagamento e previsão fictícia de entrega. |
| RF-13 | Confirmar cria snapshot independente, depois limpa carrinho. |
| RF-14 | Tema claro/escuro em todas as telas; escolha persistente e fallback do sistema. |
| RF-15 | Fluxo utilizável em 320, 390, 768 e 1440 px, sem rolagem horizontal. |
| RF-16 | Logo original gerada por IA aplicada ao Header, favicon e README. |

## Regras de negócio
| ID | Regra |
| --- | --- |
| RN-01 | Quantidades de 1 a 99; diminuir em 1 fica desabilitado. Remoção usa botão específico. |
| RN-02 | ID identifica um café; adições não duplicam linhas. |
| RN-03 | Subtotal = soma(preço × quantidade); frete fixo fictício de R$ 3,50 somente com itens; total = subtotal + frete. |
| RN-04 | Valores calculados em centavos inteiros e exibidos com Intl.NumberFormat pt-BR. |
| RN-05 | Pagamento na entrega, apenas informativo; não pedir dados de cartão. |
| RN-06 | LocalStorage para carrinho/tema; snapshot de pedido em SessionStorage para suportar refresh na confirmação sem manter endereço indefinidamente. |
| RN-07 | CEP válido inicia consulta automática; dados disponíveis podem ser corrigidos. Falha de rede permite preenchimento manual validado. |
| RN-08 | Catálogo tipado local; ViaCEP é a única API funcional externa. |
| RN-09 | Carrinho vazio e sucesso sem snapshot oferecem retorno ao catálogo. |
| RN-10 | Formulário validado por Zod e itens sanitizados antes de uso. |

## Requisitos não funcionais e identidade
React, Vite, TypeScript em modo strict, componentes separados e estado imutável. Tema claro utiliza amarelos #C47F17 / #DBAC2C / #F1E9C9 e roxos #4B2995 / #8047F8 / #EBE5F9; Baloo 2 nos títulos e Roboto no corpo. Tema escuro usa tokens semânticos para superfícies, texto e feedback. Labels, foco visível, controles por teclado e regiões de status; WCAG 2.2 AA como referência, sem alegar certificação. Testar navegadores Chromium atuais e larguras citadas. Assets locais e build estático. Não guardar credenciais ou dados pessoais reais em evidências.

## Aceite geral
Fluxo completo sem erros de execução, testes de reducer/validação aprovados, produção compilada, documentação e capturas reais presentes. Repositório público e URL publicada devem ser verificados separadamente; passos pendentes não contam como concluídos.

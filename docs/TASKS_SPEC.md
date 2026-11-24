# Coffee Delivery — Plano de implementação

Status: `[x]` concluído com verificação registrada; `[ ]` pendente/em andamento.

| Status | ID | Objetivo / requisitos | Arquivos | Critério de pronto / verificação |
| --- | --- | --- | --- | --- |
| [x] | T01 | Especificar produto e arquitetura; RF-01 a 16 | docs/*SPEC.md, AGENTS.md | Escopo confrontado com enunciado fornecido; AGENTS copiado sem alterações. |
| [ ] | T02 | Configurar Vite e TypeScript | package.json, tsconfig.json, main.tsx | Dependências instaladas, typecheck e build. |
| [ ] | T03 | Logo IA e tokens; RF-14/16 | public/, styles/, README | Imagem real gerada, favicon e identidade nos dois temas. |
| [ ] | T04 | Header e catálogo; RF-01/02/04 | components/, pages/Home.tsx | 14 cards e seletores testados. |
| [ ] | T05 | Carrinho persistente; RF-03 a 06 | cart.ts, store.tsx | Reducer testado, refresh mantém itens. |
| [ ] | T06 | Endereço e ViaCEP; RF-08/11 | schema.ts, hooks/, components/ | Erros, loading e preenchimento automático testados. |
| [ ] | T07 | Checkout e pagamento; RF-05/09/10/11 | pages/Checkout.tsx, components/ | Totais, remoção e validação verificados. |
| [ ] | T08 | Snapshot e confirmação; RF-07/12/13 | order.ts, pages/Success.tsx | Snapshot independente e refresh de sucesso testados. |
| [ ] | T09 | Temas e responsividade; RF-14/15 | styles/, components/ | 320/390/768/1440 px, teclado e dark mode verificados. |
| [ ] | T10 | Testes e evidências | tests/, docs/screenshots/ | Resultados reais e screenshots salvos. |
| [ ] | T11 | README e registro de IA | README.md, docs/AI_USAGE.md | Instalação, branding e três interações reais documentadas. |
| [ ] | T12 | Repositório e deploy | Git, configuração de hospedagem | URL pública, rotas diretas e repositório verificados. |

## Registro
- 2026-11-24: recebidos enunciado completo, Style Guide e AGENTS da aluna. Especificações criadas; base existente tem configuração, catálogo, reducer, schema e Context em preparação. Implementação e validação seguem por etapas.

# Uso de IA no desenvolvimento

Registro de interações reais desta sessão, em 24/11/2026. Não representa um histórico de aulas nem atribui validações humanas que não foram realizadas.

| Interação / prompt | Objetivo | Resposta e aplicação | Decisão humana / evidência |
| --- | --- | --- | --- |
| Enunciado completo acompanhado de “consegue fazer este trabalho?” | Identificar escopo técnico e entregáveis | Identificados catálogo, carrinho, checkout, confirmação, temas, logo IA e cinco documentos obrigatórios. | A aluna forneceu o escopo e autorizou a implementação. Requisitos registrados em PRD_SPEC.md. |
| “pode fazer o projeto, as decisões já sei” | Iniciar a implementação com a stack exigida | Preparada base React/Vite/TypeScript, estado do carrinho e schema; planejamento detalhado incorporado aos SPECs. | Autorização explícita para execução. Evidência: configuração e histórico Git desta sessão. |
| “vou colocar aqui as informações para seguir” e pedido para manter somente o AGENTS enviado | Incorporar enunciado completo e referências visuais | Incluídos ViaCEP obrigatório, styled-components, Style Guide e estrutura docs. AGENTS copiado sem acréscimos. | A aluna escolheu as referências e impôs preservação literal do AGENTS. Evidência: AGENTS.md e docs/TECH_SPEC.md. |
| “você pode ja publicar no github pra mim?” | Disponibilizar o código da entrega | Preparação de repositório independente com documentação, testes e assets atribuídos. | Autorização explícita da aluna para publicação pública; resultado consta no README quando verificado. |

## Ferramentas efetivamente usadas

- **Codex:** elaboração dos SPECs, implementação por responsabilidades, revisão das regras e execução de verificações. O reducer usa Context/useReducer e snapshots para separar carrinho atual e pedido concluído; essas decisões estão documentadas no TECH_SPEC.
- **ImageGen:** gerou a proposta original de logo. Prompt e resultado no README; imagem em public/logo.png.
- **Figma MCP:** tentativas de leitura de contexto e screenshot retornaram falta de permissão. Nenhum resultado visual do MCP foi inventado; as capturas anexadas foram usadas como referência.
- **Context7 MCP:** consulta real à documentação oficial de React Hook Form Resolvers, ID `/react-hook-form/resolvers`, sobre zodResolver com Zod 4, register, handleSubmit e errors. Orientou integração do schema.
- **Vitest / Playwright:** verificações executadas pelo terminal. Playwright é biblioteca/runner local neste projeto, não é apresentado como Playwright MCP. Resultados efetivos em VALIDATION.md e screenshots.

## Revisão responsável

O registro não afirma que a aluna escreveu manualmente o código nem que aprovou cada detalhe visual. A implementação apoiada por IA deve ser revisada pela aluna antes da apresentação. Não há chatbot dentro da aplicação. Não foram inseridos dados de pagamento, credenciais ou endereços pessoais nas evidências.

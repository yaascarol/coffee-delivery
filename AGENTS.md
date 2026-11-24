# Orientações para trabalhar no Coffee Delivery

Projeto acadêmico React + Vite + TypeScript de cafeteria com pedido fictício. A aluna está aprendendo: explicar mudanças em português simples e implementar uma tarefa pequena por vez.

## Antes de escrever código
Ler docs/PRD_SPEC.md, docs/TECH_SPEC.md e docs/TASKS_SPEC.md. Conferir estado atual do repositório e preservar alterações da usuária. Consultar o Figma e o enunciado vinculados no PRD. O template inicial foi convertido para TypeScript na T02; manter componentes em TSX.

## Regras
- Respeitar requisitos e escopo documentados. Não gerar toda a aplicação de uma vez.
- Usar React Router, Context API + useReducer, React Hook Form + Zod e styled-components conforme TECH_SPEC.
- Tipos explícitos, sem any como atalho. Estado imutável, reducer puro, responsabilidades separadas e componentes reutilizáveis.
- Dinheiro em centavos; uma fonte para frete/cálculos. API de CEP obrigatória com feedback de erro/carregamento.
- Considerar temas, celular, labels e teclado desde cada componente.
- Não adicionar backend, login, pagamentos reais ou funcionalidades extras sem necessidade acordada.
- Não inventar evidências, testes aprovados, uso de MCP ou resultados de geração de imagem. Documentar somente uso real de IA, incluindo decisões humanas.
- Não publicar credenciais ou dados pessoais reais em código, logs e screenshots.

## Validação e histórico
Ao concluir tarefa: explicar o que mudou e como verificar; executar checagens apropriadas; atualizar TASKS_SPEC e documentação afetada. Usar commits semânticos (docs, feat, fix, test, refactor, style) com escopo pequeno. Não sobrescrever trabalho da usuária nem reescrever histórico compartilhado. Publicação/entrega devem refletir resultados efetivamente verificados.

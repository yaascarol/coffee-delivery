# Validação

## Resultados registrados

- 24/11/2026: 9 testes Vitest passaram: adição acumulada, imutabilidade, alteração/remoção/limpeza, valores inválidos, limite 99, sanitização, cálculo e validação de endereço/pagamento.
- 24/11/2026: primeiro `npm run build` concluído, incluindo TypeScript strict e Vite. Avisos de anotações PURE em dependência Zod não impediram a compilação.
- 24/11/2026: suíte ampliada para **12 testes unitários, todos aprovados**, incluindo snapshot independente, pedido vazio/produto inválido e totais inconsistentes.
- 24/11/2026: **3 testes E2E aprovados no Microsoft Edge**, em 53,3 s. Fluxo completo, persistência, validação, pagamento, snapshot após refresh, limpeza do carrinho, tema persistido, remoção, armazenamento corrompido, CEP inexistente/indisponível e resposta atrasada foram exercitados.
- Larguras 320, 390, 768 e 1440 px verificadas sem overflow horizontal em Home e Checkout. Capturas reais de Home, Checkout e Sucesso em desktop/mobile, incluindo mobile escuro, em `docs/screenshots/`. Checkout mobile escuro e sucesso desktop inspecionados visualmente.
- Consulta HTTP real ao ViaCEP para CEP público de teste retornou resposta válida com cidade e UF; testes E2E usam endereço fictício controlado.
- Arquivo AGENTS.md comparado por SHA-256 com o arquivo fornecido: conteúdo idêntico.
- Durante a validação, corrigido fechamento de estilo do seletor de quantidade; testes passaram após aguardar carregamento das imagens lazy antes de fotografar a página inteira. Primeira execução teve timeout de 45 s, ajustado para 120 s. Falhas anteriores não foram contabilizadas como aprovação.
- Publicação em andamento; links e estado final serão registrados após verificação.

## Demonstração manual

1. Abrir catálogo; aumentar Expresso Tradicional para 2 e adicionar duas vezes. Badge deve mostrar 4 e checkout deve conter uma linha.
2. Recarregar: quatro unidades permanecem. Diminuir para 3: subtotal R$ 29,70, frete R$ 3,50 e total R$ 33,20.
3. Confirmar formulário vazio: campos obrigatórios e pagamento mostram erros.
4. Informar CEP; aguardar a API; conferir rua, bairro, cidade e UF. Preencher número e selecionar pagamento.
5. Confirmar: sucesso mostra endereço e pagamento, carrinho fica vazio; refresh mantém o snapshot durante a sessão.
6. Alternar tema e recarregar. Repetir no celular. Remover o último produto deve mostrar estado vazio.

## Limites

A validação automatizada de CEP usa respostas controladas para reprodutibilidade; disponibilidade real da API pode variar. Capturas não representam entregas nem pagamentos reais. Não foi realizada auditoria formal WCAG nem comparação pixel a pixel dos frames Figma inacessíveis.

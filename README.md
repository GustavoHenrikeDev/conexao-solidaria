# Conexão Solidária — EP 3

Projeto acadêmico de Desenvolvimento Front-End para Web. ONG e contatos fictícios.

## Abrir

Abra `html/index.html` no navegador. Não é necessário instalar dependências.
Também é possível servir a pasta por um servidor HTTP local.

As telas usam `#/inicio`, `#/projetos` e `#/cadastro`. O cabeçalho e o rodapé
permanecem no documento; somente os filhos de `main#conteudo` são substituídos.
As entradas `html/projetos.html` e `html/cadastro.html` encaminham à SPA.

## Estrutura

- `html/`: documento principal e dois atalhos de compatibilidade.
- `css/styles.css`: estilos enviados da EP 2 e ajustes de foco da SPA.
- `imagens/`: fotografia ilustrativa gerada por IA, em JPG e WebP.
- `js/main.js`: inicialização da aplicação.
- `js/modules/roteador.js`: navegação por hash, histórico, foco e tela ativa.
- `js/modules/templates.js`: conteúdo fixo das três telas e criação de fragmentos.
- `js/modules/navegacao.js`: menu responsivo e submenu.
- `js/modules/formulario.js`: máscaras, validação nativa e feedback por campo.
- `js/modules/armazenamento.js`: persistência e restauração da preferência de participação.
- `js/modules/modal.js`: janela de informações sobre o cadastro.

Os arquivos JavaScript são scripts clássicos com `defer`, organizados por função
no namespace `ConexaoSolidaria`. Não são módulos ES com import/export.
Essa escolha permite a execução por duplo clique, sem depender de fetch ou servidor.

## Navegação e estado

Links internos marcados com `data-rota` alteram o hash. O evento `hashchange`
seleciona a tela, inclusive com Voltar/Avançar. Rotas desconhecidas retornam ao início.
Subrotas `#/projetos/contribuicao` e `#/projetos/voluntariado` direcionam à seção.
O atalho de teclado para o conteúdo não altera a rota.

Cada tela é criada uma vez e mantida em memória. Ao retornar ao cadastro, os
campos conservam o preenchimento e os eventos não são duplicados. Recarregar ou
fechar a página descarta esse estado da aplicação. O navegador pode oferecer
preenchimento automático conforme suas próprias configurações.

Use somente dados fictícios. Não há envio nem banco de dados. O localStorage guarda somente a preferência de participação (doador, voluntário ou ambos), na chave `conexao-solidaria:preferencias:v1`. Os dados pessoais do formulário não são persistidos. A integração de framework será trabalhada em outra etapa. A validação de CPF é de formato, não de dígitos verificadores.

## Verificações sugeridas

1. Navegar por todas as telas e usar Voltar/Avançar, sem recarregar o documento.
2. Abrir uma rota diretamente e atualizar a página.
3. Conferir as máscaras e o bloqueio de campos inválidos no cadastro.
4. Sair e voltar ao cadastro; conferir que não há mensagens duplicadas.
5. Abrir/fechar o modal por botão e Escape.
6. Testar o menu em tela pequena e navegar por teclado.

Os resultados anteriores do W3C referem-se à versão anterior dos HTML.
Esta versão deve ser submetida novamente ao validador antes da entrega final.

## Testar a persistência

1. Abra o cadastro e selecione Doador, Voluntário ou Doador e voluntário.
2. Atualize a página ou feche e reabra o site no mesmo navegador e endereço.
3. Acesse o cadastro e confira a preferência restaurada.
4. Escolha “Selecione uma opção” para remover o registro salvo; atualize e confira.

Para testar de forma consistente, use o Live Server do VS Code com o mesmo endereço e porta. Em URLs file://, o comportamento do localStorage depende do navegador. Quando o armazenamento está indisponível ou o conteúdo salvo é inválido, o formulário continua utilizável e apresenta uma mensagem.

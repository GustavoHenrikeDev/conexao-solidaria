# Conexão Solidária

## Apresentação

Projeto acadêmico da disciplina Desenvolvimento Front-end para Web, desenvolvido por Gustavo Henrike. A Conexão Solidária é uma ONG fictícia utilizada para demonstrar apresentação institucional, divulgação de projetos sociais e cadastro demonstrativo de apoiadores.

O projeto evolui das páginas HTML e estilos responsivos para uma Single Page Application (SPA). A etapa atual acrescenta práticas de versionamento, documentação e preparação para publicação. A aplicação não recebe pagamentos nem envia cadastros a um servidor.

## Tecnologias e pré-requisitos

| Tecnologia ou recurso | Uso no projeto |
| --- | --- |
| HTML5 | Estrutura semântica, formulários, templates e dialog |
| CSS3 | Variáveis de design, Grid, Flexbox, responsividade e estados visuais |
| JavaScript puro | DOM, eventos, rotas por hash, máscaras e validação |
| Web Storage e JSON | Persistência da preferência de participação no localStorage |
| Git e GitHub | Histórico, branches, pull requests, issues e milestones |
| JPG e WebP | Imagem ilustrativa de voluntariado, gerada por IA |

Para executar, utilize um navegador atualizado com JavaScript habilitado e um servidor HTTP local. As opções descritas abaixo são VS Code com a extensão Live Server ou Python 3. Git é necessário somente para a opção de clonagem. Node.js é opcional para checagem de sintaxe.

O projeto não utiliza frameworks, pacotes NPM ou dependências de execução externas. Não possui package.json e não exige npm install.

## Instalação e execução local

A versão SPA está na branch develop. Para obter essa versão com Git:

```bash
git clone --branch develop https://github.com/GustavoHenrikeDev/conexao-solidaria.git
cd conexao-solidaria
```

Como alternativa, selecione develop no GitHub, use Code → Download ZIP e extraia a pasta. Abra a raiz do projeto, que contém html, css, imagens e js.

**Opção A — VS Code e Live Server:**

1. Abra a pasta do projeto no VS Code.
2. Instale a extensão Live Server, caso ainda não esteja disponível.
3. Clique com o botão direito em html/index.html e selecione Open with Live Server.
4. Use o endereço HTTP aberto pelo servidor para navegar entre as telas.

**Opção B — servidor local do Python 3:**

Na raiz do projeto, execute:

```bash
python -m http.server 5500 --bind 127.0.0.1
```

Se a instalação do Python no Windows disponibilizar o comando py, use:

```bash
py -m http.server 5500 --bind 127.0.0.1
```

Acesse [a aplicação local](http://127.0.0.1:5500/html/index.html#/inicio). Para encerrar o servidor, pressione Ctrl+C no terminal.

Use o mesmo navegador, endereço e porta ao testar a persistência. localhost e 127.0.0.1 são origens diferentes. Abrir por file:// pode permitir a navegação, mas o armazenamento deve ser conferido por HTTP para evitar diferenças de comportamento entre navegadores.

## Estrutura e manutenção

| Caminho | Responsabilidade |
| --- | --- |
| html/index.html | Documento principal, navegação, contêiner da SPA e scripts com defer |
| html/projetos.html e html/cadastro.html | Atalhos que redirecionam às rotas da SPA |
| css/styles.css | Design system, layouts, componentes e estilos de feedback |
| imagens/ | Arquivos voluntarios.jpg e voluntarios.webp |
| js/main.js | Inicialização do menu e do roteador |
| js/modules/templates.js | Marcação das telas e criação de fragmentos HTML |
| js/modules/roteador.js | Interpretação do hash, troca de telas, título e foco |
| js/modules/navegacao.js | Menu responsivo, submenu e interações por teclado |
| js/modules/formulario.js | Máscaras, validações e mensagens por campo |
| js/modules/armazenamento.js | Persistência e restauração da preferência de participação |
| js/modules/modal.js | Criação e abertura do modal informativo |

Os scripts clássicos compartilham funções pelo namespace ConexaoSolidaria e são carregados com defer. templates.js inicializa o namespace, e main.js executa por último. Esta organização não utiliza import/export.

Para alterar o conteúdo das telas, edite templates.js; para ajustes visuais, styles.css; para regras de formulário, formulario.js. Preserve os identificadores usados pelos eventos e as associações de acessibilidade. Ao alterar a estrutura dos dados persistidos, revise a versão e o tratamento dos registros anteriores em armazenamento.js. Antes de integrar alterações, repita os testes das funcionalidades afetadas.

## Funcionalidades e dados

- Rotas #/inicio, #/projetos e #/cadastro com atualização do conteúdo principal sem recarregar todo o documento.
- Subrotas #/projetos/contribuicao e #/projetos/voluntariado para acesso às seções correspondentes.
- Suporte a Voltar/Avançar, indicação da página ativa e foco no conteúdo apresentado.
- Formulário com campos obrigatórios, tipos específicos, limites de tamanho, máscaras e feedback textual e visual.
- Data de nascimento limitada ao dia atual e bloqueio de campos obrigatórios preenchidos apenas com espaços.
- Modal informativo e menus com controle por eventos.

Use dados fictícios no cadastro. A validação de CPF verifica o formato; não calcula dígitos verificadores nem confirma a identidade do usuário. O botão de validação apresenta uma mensagem e impede o envio do formulário.

Somente a preferência de participação é persistida, na chave conexao-solidaria:preferencias:v1, por exemplo:

```json
{"versao":1,"participacao":"voluntario"}
```

As opções permitidas são doador, voluntario e ambos. JSON.stringify prepara a gravação; getItem e JSON.parse recuperam o objeto, cuja estrutura e versão são verificadas antes de restaurar o campo. Ao selecionar a opção vazia, o registro é removido. Falhas de acesso ao armazenamento são tratadas com mensagens.

Os demais campos ficam somente em memória durante a navegação da SPA e não são gravados pela aplicação no localStorage. O navegador pode oferecer preenchimento automático conforme suas configurações.

## Testes e acessibilidade

Durante o desenvolvimento foram verificadas a sintaxe JavaScript e, em ambiente simulado, a gravação, restauração e remoção da preferência, além de JSON inválido, estrutura incompatível e armazenamento indisponível. Essas verificações não substituem a execução no navegador. Ainda não há uma suíte automatizada versionada nem um comando npm test.

Se Node.js estiver instalado, exemplos de checagem de sintaxe na raiz do projeto são:

```bash
node --check js/main.js
node --check js/modules/armazenamento.js
```

O mesmo comando pode ser aplicado aos demais arquivos JavaScript. A checagem de sintaxe não executa o DOM nem valida o comportamento da interface.

Roteiro manual para executar no navegador com o servidor local ativo:

| Teste | Procedimento e resultado esperado |
| --- | --- |
| Navegação | Alternar entre as três telas e usar Voltar/Avançar; o conteúdo deve acompanhar a rota |
| Acesso direto | Abrir e atualizar html/index.html#/cadastro; o cadastro deve ser exibido |
| Rota inválida | Usar #/inexistente; a aplicação deve retornar ao início |
| Campos inválidos | Testar campos vazios, e-mail incorreto, CPF incompleto, espaços e nascimento futuro; a confirmação deve ser bloqueada |
| Campos válidos | Preencher com dados fictícios nos formatos exigidos; a mensagem deve informar a validação demonstrativa |
| Persistência | Escolher uma participação, atualizar e reabrir o cadastro na mesma origem; a escolha deve ser recuperada |
| Remoção | Selecionar a opção vazia e atualizar; a preferência deve permanecer apagada |
| Menus e modal | Testar clique, teclado e Escape; conferir abertura, fechamento e foco |
| Responsividade | Testar telas pequenas, ampliação e orientação; verificar legibilidade e ausência de conteúdo inacessível |

Use Console para observar erros e Network para verificar recursos que falharam ao carregar. Registre navegador, passos, resultado e correção na issue de revisão. Repita os testes afetados após cada ajuste.

O código inclui lang, HTML semântico, labels, textos alternativos, atalho para o conteúdo, foco visível e atributos ARIA. A revisão de acessibilidade da EP4 usa WCAG 2.1 nível AA como referência e está em andamento. Ainda não foi concluída uma avaliação que permita declarar conformidade integral. Resultados anteriores do validador HTML referem-se às versões anteriores; a versão atual precisa de nova verificação.

## Build e publicação

A aplicação é estática e não requer compilação ou empacotamento para executar. Não há comando npm run build nem pasta dist gerada nesta versão: os arquivos de execução são html, css, imagens e js.

Otimização e deploy fazem parte da preparação da entrega v1.0.0 e ainda estão pendentes. Antes de publicar, revisar o tamanho das imagens, os testes, os caminhos relativos e a documentação.

O ponto de entrada atual é html/index.html. Ao escolher a hospedagem, preservar as quatro pastas na mesma hierarquia e configurar um acesso à entrada da SPA. Publicar apenas a pasta html quebraria os caminhos para CSS, JavaScript e imagens. Se o provedor exigir index.html na raiz, será necessário preparar essa entrada na etapa de deploy. O servidor local do Python descrito acima serve para desenvolvimento.

Após publicar, registrar aqui a plataforma, a URL pública, a tag da versão e as instruções de atualização.

## Versionamento e colaboração

Repositório: [GustavoHenrikeDev/conexao-solidaria](https://github.com/GustavoHenrikeDev/conexao-solidaria).

Adota-se um fluxo baseado em GitFlow:

| Branch | Finalidade |
| --- | --- |
| main | Versão estável; atualmente preserva a versão anterior à integração da SPA |
| develop | Integração das alterações em desenvolvimento; contém a SPA |
| feature/* | Trabalho isolado a partir de develop, integrado por pull request |
| release/* | Preparação de lançamentos; prevista para a etapa de publicação |
| hotfix/* | Correção urgente a partir de main, quando necessária |

Na preparação de uma release, as alterações finais devem retornar a main e develop. Uma hotfix também deve ser propagada às duas branches. Essas etapas ainda não foram executadas nesta versão do projeto.

Registros já realizados:

- feat: adiciona SPA e persistência de preferências — introduz a SPA e a persistência.
- chore: remove arquivos antigos da EP2 — elimina a estrutura substituída.
- [Pull request #1](https://github.com/GustavoHenrikeDev/conexao-solidaria/pull/1) — integrou feature/spa-localstorage à develop após revisão estrutural documentada.
- Milestone Entrega v1.0.0 — acompanha a preparação do lançamento.
- Issue Revisar acessibilidade e interações da SPA — acompanha as verificações e correções, vinculada à milestone.

Para novos commits, usar mensagens claras no padrão tipo: descrição. Exemplos de tipos: feat para funcionalidades, fix para correções, docs para documentação e chore para manutenção. Commits de merge podem manter a mensagem gerada pelo GitHub.

A primeira tag planejada é v1.0.0; ela ainda não foi criada. O esquema MAJOR.MINOR.PATCH orientará lançamentos: MAJOR para mudanças incompatíveis nos contratos de uso definidos, MINOR para funcionalidades compatíveis e PATCH para correções compatíveis. Uma milestone com esse nome não equivale a uma release publicada.

Para contribuir, registrar a tarefa em uma issue, criar uma feature a partir de develop, fazer commits por alteração e abrir um pull request descritivo para develop. Revisar as diferenças e os testes antes do merge. Em trabalho individual, registrar a própria conferência com seu escopo real, sem apresentá-la como aprovação de outro revisor.

Ao concluir a EP4, atualizar este README com os resultados dos testes, a situação das branches, a release e o endereço do site publicado.

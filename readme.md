 # SPA Simples com JavaScript Puro

Este é um projeto de exemplo que demonstra a criação de uma Single-Page Application (SPA) utilizando apenas HTML, CSS e JavaScript, sem a necessidade de frameworks complexos.

## O que é uma SPA?

Uma **Single-Page Application** (ou **Aplicação de Página Única**) é um tipo de site que funciona como um aplicativo de computador. A principal diferença é que ele carrega apenas uma página HTML inicial. Quando você navega por ela, o conteúdo é atualizado dinamicamente sem que a página inteira precise ser recarregada.

Isso cria uma experiência de usuário mais rápida e fluida, pois apenas os dados necessários são solicitados do servidor, e não a página completa a cada clique.

## Como este projeto funciona?

Este projeto simula o comportamento de uma SPA de forma bem simples e direta:

1.  **Carregamento Inicial**: O navegador carrega o arquivo `index.html` e o arquivo `script.js`.
2.  **Links de Navegação**: Os links no menu de navegação (`<nav>`) não têm um `href` padrão que leva a uma nova página. Em vez disso, eles usam o atributo `data-tela` para armazenar o nome do arquivo HTML parcial que deve ser carregado.
3.  **JavaScript Ativo**: O arquivo `script.js` escuta os cliques nesses links.
4.  **Busca de Conteúdo**: Quando um link é clicado, o JavaScript:
    -   Intercepta a ação para **impedir a recarga total** da página (`event.preventDefault()`).
    -   Usa a função `fetch()` para buscar o conteúdo do arquivo HTML especificado pelo `data-tela` (por exemplo, `telas/tela1.html`).
5.  **Injeção de Conteúdo**: Após receber o conteúdo, o JavaScript o injeta dentro do contêiner principal (`<div id="app">`) do `index.html` usando a propriedade `innerHTML`.

O resultado é que o conteúdo central da aplicação muda, mas o cabeçalho, o rodapé e a própria página nunca são recarregados.

## Estrutura do Projeto

/spa-exemplo
├── index.html
├── style.css
├── script.js
└── telas/
    ├── tela1.html
    ├── tela2.html
    └── tela3.html

    
## Como Executar

1.  Clone este repositório ou baixe os arquivos.
2.  Abra o arquivo `index.html` em seu navegador.
3.  Clique nos links de navegação para ver a mágica da SPA acontecer!

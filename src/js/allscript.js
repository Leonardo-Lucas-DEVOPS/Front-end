// ============================================
// INSTITUTO VIDA ANIMAL - MÁSCARAS DE FORMULÁRIO
// ============================================
// funções de navegação e carregamento dinâmico de telas web e mobile

document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    const navLinks = document.querySelectorAll('nav a');
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    // Criar overlay para o menu mobile
    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    document.body.appendChild(overlay);

    // Toggle do menu hamburguer
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        
        // Previne scroll quando menu aberto
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Fechar menu ao clicar no overlay
    overlay.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    });

   // Função para carregar o conteúdo de um arquivo HTML
    function carregarScriptDinamico(src) {
        return new Promise((resolve, reject) => {
            const existingScript = document.querySelector(`script[src="${src}"]`);
            if (existingScript) {
                existingScript.remove(); // Remove a versão antiga
            }

            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.body.appendChild(script);
        });
    }

     // Carrega os scripts específicos da tela de Doação
    async function inicializarScriptsDoacao() {
        try {
            // 2. Carrega o script de doacao.js
            await carregarScriptDinamico('src/js/doacao.js');
        } catch (error) {
            console.error('Erro ao carregar scripts da doação:', error);
        }
    }

    // Função para carregar o conteúdo de um arquivo HTML
    async function carregarTela(caminho) {
        if (!app) return;

        // Limpa a URL atual (para evitar histórico sujo com a rota anterior)
        window.history.pushState({}, '', `#${caminho.replace('.html', '')}`);
        
        try {
            const response = await fetch(`src/telas/${caminho}`);
            if (!response.ok) {
                throw new Error(`Erro ao carregar ${caminho}: ${response.statusText}`);
            }
            const html = await response.text();

            app.innerHTML = html;

            // AÇÃO CRÍTICA: Se for a tela de doação, carregue os scripts dinamicamente
            if (caminho === 'doacao.html') {
                inicializarScriptsDoacao(); 
            }
            
        } catch (error) {
            console.error('Falha ao carregar tela:', error);
            app.innerHTML = `<section class="erro-404"><h2>Erro ao carregar a página</h2><p>Não foi possível carregar o conteúdo de ${caminho}.</p></section>`;
        }
    }
    

    // Navegação e Eventos

    // Manipulador de navegação
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const tela = link.getAttribute('data-tela');

            // Gerenciar classe 'active'
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            carregarTela(tela);
            
            // Fechar menu se estiver aberto (mobile)
            if (navMenu.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Botão Contato no Header
    const botaoHeader = document.getElementById('botao-header');
    if (botaoHeader) {
        botaoHeader.addEventListener('click', () => {
            // Gerenciar classe 'active' para o link de contato
            const contatoLink = document.querySelector('a[data-tela="contato.html"]');
            if (contatoLink) {
                navLinks.forEach(l => l.classList.remove('active'));
                contatoLink.classList.add('active');
            }

            carregarTela('contato.html');
            
            // Fechar menu se estiver aberto (mobile)
            if (navMenu.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    

    // Botões de Doação - Projeto

    document.addEventListener('click', (e) => {
      // Verifica se é um botão de doação (classe .btn-doacao)
      const btn = e.target.closest('.btn-doacao');
      if (!btn) return;
      
      e.preventDefault();
      const amount = btn.getAttribute('data-amount');
      
      if (amount) {
        // 1. Armazena valor a pré-selecionar na página de doação
        sessionStorage.setItem('doacaoAmount', amount);
        
        // 2. Garante que o link de doação (se existir) fique ativo
        const doacaoLink = document.querySelector('a[data-tela="doacao.html"]');
        if (doacaoLink) {
            navLinks.forEach(l => l.classList.remove('active'));
            doacaoLink.classList.add('active');
        }

        // 3. Carrega página de doação
        carregarTela('doacao.html');
      }
    });

    // Carrega a primeira tela por padrão ao iniciar a aplicação
    // 1. Verifica se há hash na URL para navegação direta
    const hash = window.location.hash.substring(1);
    const initialPath = hash ? hash + '.html' : 'sobre.html';

    // 2. Tenta encontrar o link correspondente no menu para aplicar a classe 'active'
    const initialLink = document.querySelector(`a[data-tela="${initialPath}"]`);
    if (initialLink) {
        initialLink.classList.add('active');
    }

    // 3. Carrega a tela inicial
    carregarTela(initialPath);
});


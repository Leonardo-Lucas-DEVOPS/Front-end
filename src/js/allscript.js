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
    async function carregarTela(caminho) {
        try {
                const response = await fetch(`src/telas/${caminho}`);
            if (!response.ok) {
                throw new Error(`Erro ao carregar a tela: ${response.statusText}`);
            }
            const html = await response.text();
            app.innerHTML = html;
            
            // Fechar menu após navegação (mobile)
            if (navMenu.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            }
            
            // Scroll suave para o topo
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {
            console.error('Falha ao carregar o conteúdo:', error);
            app.innerHTML = '<p>Erro ao carregar o conteúdo.</p>';
        }
    }

    // Função para lidar com a navegação
    function navegar(event) {
        event.preventDefault();
        const link = event.target.closest('a'); // Garante que pega o link, mesmo se clicar no texto
        
        if (!link) return;
        
        const tela = link.dataset.tela;
        
        if (tela) {
            carregarTela(tela);
            
            // Adicionar classe active ao link atual
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        }
    }

    // Adiciona o evento de clique a cada link de navegação
    navLinks.forEach(link => {
        link.addEventListener('click', navegar);
    });

    // Botão de contato no banner
    const botaoContato = document.getElementById('botao-header');
    if (botaoContato) {
        botaoContato.addEventListener('click', () => {
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
    

    // Carrega a primeira tela por padrão ao iniciar a aplicação
    carregarTela('sobre.html');
});

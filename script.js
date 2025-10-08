document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    const navLinks = document.querySelectorAll('nav a');

    // Função para carregar o conteúdo de um arquivo HTML
    async function carregarTela(caminho) {
        try {
            const response = await fetch(caminho);
            if (!response.ok) {
                throw new Error(`Erro ao carregar a tela: ${response.statusText}`);
            }
            const html = await response.text();
            app.innerHTML = html;
        } catch (error) {
            console.error('Falha ao carregar o conteúdo:', error);
            app.innerHTML = '<p>Erro ao carregar o conteúdo.</p>';
        }
    }

    // Função para lidar com a navegação
    function navegar(event) {
        event.preventDefault();
        const link = event.target;
        const tela = link.dataset.tela;
        
        if (tela) {
            carregarTela(`./telas/${tela}`);
        }
    }

    // Adiciona o evento de clique a cada link de navegação
    navLinks.forEach(link => {
        link.addEventListener('click', navegar);
    });

    // Carrega a primeira tela por padrão ao iniciar a aplicação
    carregarTela('./telas/tela1.html');
});

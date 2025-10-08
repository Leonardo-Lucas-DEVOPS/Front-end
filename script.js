// Elemento principal onde o conteúdo será trocado
const conteudo = document.getElementById("conteudo");

// --- Templates das páginas ---
function templateHome() {
  return `
    <h2>Bem-vindo à ONG Patinhas do Bem!</h2>
    <p>Somos uma organização dedicada ao resgate e à adoção de animais em situação de vulnerabilidade.</p>
    <p>Conheça nossos projetos, eventos e animais disponíveis para adoção!</p>
    <img src="https://place-puppy.com/500x300" alt="Cachorrinho fofo" style="width:100%; border-radius:10px;">
  `;
}

function templateSobre() {
  return `
    <h2>Sobre Nós</h2>
    <p>A <strong>Patinhas do Bem</strong> é uma ONG sem fins lucrativos fundada em 2020. Nosso propósito é garantir um lar digno e amoroso para cães e gatos resgatados das ruas.</p>
    <ul>
      <li>+200 animais resgatados</li>
      <li>+150 adoções concluídas</li>
      <li>Campanhas de castração e conscientização</li>
    </ul>
  `;
}

function templateCadastro() {
  return `
    <h2>Contato</h2>
    <p>Quer adotar, ser voluntário ou doar? Fale conosco!</p>
    <form id="formContato">
      <label>Nome:</label><br>
      <input type="text" required><br><br>

      <label>Email:</label><br>
      <input type="email" required><br><br>

      <label>Mensagem:</label><br>
      <textarea rows="4" required></textarea><br><br>

      <button type="submit">Enviar</button>
    </form>
  `;
}

// --- Sistema SPA ---
function navegar(pagina) {
  if (pagina === "home") conteudo.innerHTML = templateHome();
  else if (pagina === "sobre") conteudo.innerHTML = templateSobre();
  else if (pagina === "contato") conteudo.innerHTML = templateCadastro();
  else conteudo.innerHTML = "<h2>Página não encontrada</h2>";
}

// --- Iniciar na página Home ---
navegar("home");

// --- Adicionar eventos de navegação ---
document.querySelectorAll("nav button").forEach(botao => {
  botao.addEventListener("click", () => {
    const pagina = botao.dataset.page;
    navegar(pagina);
  });
});

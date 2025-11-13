// ============================================
// INSTITUTO VIDA ANIMAL - FORMULÁRIO DE CONTATO
// ============================================
// Conexão com Google Sheets via Apps Script
// Busca de CEP e Validação Via API
// Sistema de status e feedback ao usuário

// ============================================
// CONFIGURAÇÃO GOOGLE SHEETS
// ============================================
const GOOGLE_SHEETS_CONFIG = {
    scriptURL: 'https://script.google.com/macros/s/AKfycbzMX8eDxKZ_2Q_RSneuFcPxRTr7783kVc5DiCwyfU5ciAtKLnZJKpPpOYiJvOWVnaN9nQ/exec'
};

// ============================================
// BUSCAR CEP (ViaCEP API)
// ============================================
async function buscarCEP(cep) {
    const cepLimpo = cep.replace(/\D/g, '');

    if (cepLimpo.length !== 8) return;

    const cepInput = document.getElementById('cep');
    const enderecoInput = document.getElementById('endereco');
    const cidadeInput = document.getElementById('cidade');
    const estadoInput = document.getElementById('estado');
    const complementoInput = document.getElementById('complemento');

    // Indica carregamento
    cepInput.style.borderColor = '#fdbe00';

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
        const dados = await response.json();

        if (!dados.erro) {
            enderecoInput.value = dados.logradouro || '';
            cidadeInput.value = dados.localidade || '';
            estadoInput.value = dados.uf || '';
            complementoInput.value = dados.complemento || '';

            cepInput.style.borderColor = '#4caf50';
            document.getElementById('numero')?.focus();
        } else {
            mostrarFeedback('CEP não encontrado.', 'erro');
            cepInput.style.borderColor = '#ff6b6b';
        }
    } catch (error) {
        mostrarFeedback('Erro ao buscar CEP. Tente novamente.', 'erro');
        cepInput.style.borderColor = '#ff6b6b';
    }
}

// ============================================
// VALIDAÇÃO DO FORMULÁRIO
// ============================================
function validarFormulario(form) {
    const erros = [];

    // Valida Nome
    const nome = form.nome.value.trim();
    if (nome.length < 3) {
        erros.push('Nome deve ter pelo menos 3 caracteres');
    }

    // Valida E-mail
    const email = form.email.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        erros.push('E-mail inválido');
    }

    // Valida Telefone
    const telefone = form.telefone.value.replace(/\D/g, '');
    if (telefone.length < 10 || telefone.length > 11) {
        erros.push('Telefone inválido (deve ter 10 ou 11 dígitos)');
    }

    // Valida CEP
    const cep = form.cep.value.replace(/\D/g, '');
    if (cep.length !== 8) {
        erros.push('CEP inválido (deve ter 8 dígitos)');
    }

    // Valida Assunto
    if (!form.assunto.value) {
        erros.push('Selecione um assunto');
    }

    // Valida Mensagem
    const mensagem = form.mensagem.value.trim();
    if (mensagem.length < 10) {
        erros.push('Mensagem deve ter pelo menos 10 caracteres');
    }

    // Valida Termos
    if (!form.aceitaTermos.checked) {
        erros.push('Você deve aceitar os termos de uso');
    }

    return erros;
}

// ============================================
// MOSTRAR FEEDBACK
// ============================================
function mostrarFeedback(mensagem, tipo = 'sucesso') {
    const feedback = document.getElementById('formFeedback');
    if (!feedback) return;

    feedback.textContent = mensagem;
    feedback.className = `form-feedback ${tipo}`;
    feedback.style.display = 'block';

    // Scroll suave até o feedback
    feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Auto-ocultar após 5 segundos
    setTimeout(() => {
        feedback.style.display = 'none';
    }, 5000);
}

// ============================================
// ENVIAR PARA GOOGLE SHEETS
// ============================================
async function enviarFormulario(event) {
    event.preventDefault();

    const form = event.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const btnTextoOriginal = submitBtn.textContent;

    // Validar formulário
    const erros = validarFormulario(form);
    if (erros.length > 0) {
        mostrarFeedback('❌ ' + erros.join(', '), 'erro');
        return;
    }

    // Desabilitar botão durante envio
    submitBtn.disabled = true;
    submitBtn.textContent = '📤 Enviando...';

    // Preparar dados para Google Sheets
    const formData = new FormData();
    formData.append('nome', form.nome.value.trim());
    formData.append('email', form.email.value.trim());
    formData.append('telefone', form.telefone.value);
    formData.append('dataNascimento', form.dataNascimento.value || 'Não informado');
    formData.append('cep', form.cep.value);
    formData.append('estado', form.estado.value || 'Não informado');
    formData.append('cidade', form.cidade.value || 'Não informado');
    formData.append('endereco', form.endereco.value || 'Não informado');
    formData.append('numero', form.numero.value || 'S/N');
    formData.append('complemento', form.complemento.value || 'Não informado');
    formData.append('assunto', form.assunto.options[form.assunto.selectedIndex].text);
    formData.append('mensagem', form.mensagem.value.trim());
    formData.append('aceitaTermos', form.aceitaTermos.checked ? 'Sim' : 'Não');
    formData.append('receberNovidades', form.receberNovidades?.checked ? 'Sim' : 'Não');
    formData.append('receberSMS', form.receberSMS?.checked ? 'Sim' : 'Não');

    try {

        // Enviar para Google Sheets
        const response = await fetch(GOOGLE_SHEETS_CONFIG.scriptURL, {
            method: 'POST',
            body: formData
        });

        const result = await response.json();

        if (result.result === 'success') {
            mostrarFeedback('✅ Mensagem enviada com sucesso! Entraremos em contato em breve.', 'sucesso');
            form.reset();
            atualizarContador();
        } else {
            throw new Error(result.message || 'Erro desconhecido');
        }

    } catch (error) {
        mostrarFeedback('❌ Erro ao enviar mensagem. Tente novamente mais tarde.', 'erro');
    } finally {
        // Reabilitar botão
        submitBtn.disabled = false;
        submitBtn.textContent = btnTextoOriginal;
    }
}

// ============================================
// CONTADOR DE CARACTERES
// ============================================
function atualizarContador() {
    const mensagemInput = document.getElementById('mensagem');
    const contador = document.getElementById('contadorCaracteres');

    if (mensagemInput && contador) {
        const atual = mensagemInput.value.length;
        const max = mensagemInput.maxLength || 500;
        contador.textContent = `${atual}/${max} caracteres`;

        // Muda cor conforme proximidade do limite
        if (atual >= max * 0.9) {
            contador.style.color = '#ff6b6b';
        } else if (atual >= max * 0.7) {
            contador.style.color = '#fdbe00';
        } else {
            contador.style.color = '#cac3c3';
        }
    }
}

// ============================================
// INICIALIZAÇÃO
// ============================================
function inicializarFormulario() {
    const form = document.getElementById('contatoForm');

    if (!form) {
        return; // Sai silenciosamente se não encontrar
    }

    // Verifica se já foi inicializado
    if (form.dataset.inicializado === 'true') {
        return;
    }


    // Marca como inicializado
    form.dataset.inicializado = 'true';
    formularioInicializado = true;

    // Event Listener para Submit
    form.addEventListener('submit', enviarFormulario);

    // Aplicar máscaras nos inputs

    const nomeInput = form.querySelector('#nome');
    if (nomeInput) {
        nomeInput.addEventListener('input', mascaraNome);
        nomeInput.addEventListener('blur', capitalizarTexto);
    }

    const emailInput = form.querySelector('#email');
    if (emailInput) {
        emailInput.addEventListener('input', mascaraEmail);
    }

    const telefoneInput = form.querySelector('#telefone');
    if (telefoneInput) {
        telefoneInput.addEventListener('input', mascaraTelefone);
    }

    const cepInput = form.querySelector('#cep');
    if (cepInput) {
        cepInput.addEventListener('input', mascaraCEP);
        cepInput.addEventListener('blur', (e) => buscarCEP(e.target.value));
    }

    const numeroInput = form.querySelector('#numero');
    if (numeroInput) {
        numeroInput.addEventListener('input', mascaraNumero);
    }

    const cidadeInput = form.querySelector('#cidade');
    if (cidadeInput) {
        cidadeInput.addEventListener('blur', capitalizarTexto);
    }

    const enderecoInput = form.querySelector('#endereco');
    if (enderecoInput) {
        enderecoInput.addEventListener('blur', capitalizarTexto);
    }

    const complementoInput = form.querySelector('#complemento');
    if (complementoInput) {
        complementoInput.addEventListener('blur', capitalizarTexto);
    }

    const mensagemInput = form.querySelector('#mensagem');
    if (mensagemInput) {
        mensagemInput.addEventListener('input', atualizarContador);
        mensagemInput.maxLength = 500;

        // Cria contador visual se não existir
        if (!document.getElementById('contadorCaracteres')) {
            const contador = document.createElement('small');
            contador.id = 'contadorCaracteres';
            contador.style.display = 'block';
            contador.style.textAlign = 'right';
            contador.style.marginTop = '0.5rem';
            contador.style.color = '#cac3c3';
            mensagemInput.parentNode.appendChild(contador);
            atualizarContador();
        }
    }

}

// Variável para controle de inicialização
let formularioInicializado = false;

// Inicializa quando o DOM carregar
document.addEventListener('DOMContentLoaded', inicializarFormulario);

// Observa mudanças no #app para reinicializar quando contato.html carregar
const observador = new MutationObserver((mutations) => {
    const form = document.getElementById('contatoForm');

    // Só inicializa se o formulário existe e ainda não foi inicializado
    if (form && !formularioInicializado) {
        inicializarFormulario();
    } else if (!form && formularioInicializado) {
        // Reseta flag quando sair da página de contato
        formularioInicializado = false;
    }
});

// Observa o container #app
const iniciarObservacao = () => {
    const appContainer = document.getElementById('app');
    if (appContainer) {
        observador.observe(appContainer, {
            childList: true,
            subtree: false // Mudado para false para evitar observar todos os descendentes
        });
    }
};

// Inicia observação após DOM carregar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciarObservacao);
} else {
    iniciarObservacao();
}
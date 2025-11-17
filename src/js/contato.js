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
// VALIDAR CPF
// ============================================
function validarCPF(cpf) {
    // Remove caracteres não numéricos
    cpf = cpf.replace(/\D/g, '');
    
    // Verifica se tem 11 dígitos
    if (cpf.length !== 11) return false;
    
    // Verifica CPFs conhecidos como inválidos
    if (/^(\d)\1{10}$/.test(cpf)) return false;
    
    // Validação do primeiro dígito verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = 11 - (soma % 11);
    let digitoVerificador1 = resto === 10 || resto === 11 ? 0 : resto;
    
    if (digitoVerificador1 !== parseInt(cpf.charAt(9))) {
        return false;
    }
    
    // Validação do segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = 11 - (soma % 11);
    let digitoVerificador2 = resto === 10 || resto === 11 ? 0 : resto;
    
    if (digitoVerificador2 !== parseInt(cpf.charAt(10))) {
        return false;
    }
    
    return true;
}

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

    // Valida CPF
    if (form.cpf) {
        const cpf = form.cpf.value.replace(/\D/g, '');
        if (cpf.length !== 11) {
            erros.push('CPF deve ter 11 dígitos');
        } else if (!validarCPF(cpf)) {
            erros.push('CPF inválido');
        }
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
// GERENCIAR ERROS COM ARIA
// ============================================
function mostrarErroAria(campoId, mensagem) {
    const campo = document.getElementById(campoId);
    const erroSpan = document.getElementById(`${campoId}-erro`);
    
    if (!campo) return;
    
    // Marca campo como inválido
    campo.setAttribute('aria-invalid', 'true');
    
    // Mostra mensagem de erro
    if (erroSpan) {
        erroSpan.textContent = mensagem;
    }
}

function limparErroAria(campoId) {
    const campo = document.getElementById(campoId);
    const erroSpan = document.getElementById(`${campoId}-erro`);
    
    if (!campo) return;
    
    // Marca campo como válido
    campo.setAttribute('aria-invalid', 'false');
    
    // Remove mensagem de erro
    if (erroSpan) {
        erroSpan.textContent = '';
    }
}

function limparTodosErrosAria() {
    const camposComErro = ['nome', 'email', 'telefone', 'cpf', 'cep', 'assunto', 'mensagem', 'aceitaTermos'];
    camposComErro.forEach(campo => limparErroAria(campo));
}

// ============================================
// ENVIAR PARA GOOGLE SHEETS
// ============================================
async function enviarFormulario(event) {
    event.preventDefault();

    const form = event.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const btnTextoOriginal = submitBtn.textContent;

    // Limpar erros anteriores
    limparTodosErrosAria();

    // Validar formulário
    const erros = validarFormulario(form);
    if (erros.length > 0) {
        // Mostrar erros específicos nos campos
        if (form.nome.value.trim().length < 3) {
            mostrarErroAria('nome', 'Nome deve ter pelo menos 3 caracteres');
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email.value.trim())) {
            mostrarErroAria('email', 'E-mail inválido');
        }
        
        const telefone = form.telefone.value.replace(/\D/g, '');
        if (telefone.length < 10 || telefone.length > 11) {
            mostrarErroAria('telefone', 'Telefone inválido (10 ou 11 dígitos)');
        }
        
        if (form.cpf) {
            const cpf = form.cpf.value.replace(/\D/g, '');
            if (cpf.length !== 11) {
                mostrarErroAria('cpf', 'CPF deve ter 11 dígitos');
            } else if (!validarCPF(cpf)) {
                mostrarErroAria('cpf', 'CPF inválido');
            }
        }
        
        const cep = form.cep.value.replace(/\D/g, '');
        if (cep.length !== 8) {
            mostrarErroAria('cep', 'CEP deve ter 8 dígitos');
        }
        
        if (!form.assunto.value) {
            mostrarErroAria('assunto', 'Selecione um assunto');
        }
        
        if (form.mensagem.value.trim().length < 10) {
            mostrarErroAria('mensagem', 'Mensagem deve ter pelo menos 10 caracteres');
        }
        
        if (!form.aceitaTermos.checked) {
            mostrarErroAria('aceitaTermos', 'Você deve aceitar os termos de uso');
        }
        
        mostrarFeedback('❌ Por favor, corrija os erros no formulário', 'erro');
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
    formData.append('cpf', form.cpf?.value || 'Não informado');
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
            limparTodosErrosAria();
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
        // Validação ARIA em tempo real
        nomeInput.addEventListener('input', (e) => {
            if (e.target.value.trim().length >= 3) {
                limparErroAria('nome');
            }
        });
    }

    const emailInput = form.querySelector('#email');
    if (emailInput) {
        emailInput.addEventListener('input', mascaraEmail);
        // Validação ARIA em tempo real
        emailInput.addEventListener('blur', (e) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailRegex.test(e.target.value.trim())) {
                limparErroAria('email');
            }
        });
    }

    const telefoneInput = form.querySelector('#telefone');
    if (telefoneInput) {
        telefoneInput.addEventListener('input', mascaraTelefone);
        // Validação ARIA em tempo real
        telefoneInput.addEventListener('input', (e) => {
            const tel = e.target.value.replace(/\D/g, '');
            if (tel.length >= 10 && tel.length <= 11) {
                limparErroAria('telefone');
            }
        });
    }

    const cpfInput = form.querySelector('#cpf');
    if (cpfInput) {
        cpfInput.addEventListener('input', mascaraCPF);
        // Validação ARIA em tempo real
        cpfInput.addEventListener('blur', (e) => {
            const cpf = e.target.value.replace(/\D/g, '');
            if (cpf.length === 11 && validarCPF(cpf)) {
                limparErroAria('cpf');
            }
        });
    }

    const cepInput = form.querySelector('#cep');
    if (cepInput) {
        cepInput.addEventListener('input', mascaraCEP);
        cepInput.addEventListener('blur', (e) => buscarCEP(e.target.value));
        // Validação ARIA em tempo real
        cepInput.addEventListener('input', (e) => {
            const cep = e.target.value.replace(/\D/g, '');
            if (cep.length === 8) {
                limparErroAria('cep');
            }
        });
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
        
        // Validação ARIA em tempo real
        mensagemInput.addEventListener('input', (e) => {
            if (e.target.value.trim().length >= 10) {
                limparErroAria('mensagem');
            }
        });

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
    
    // Validação ARIA para Assunto
    const assuntoSelect = form.querySelector('#assunto');
    if (assuntoSelect) {
        assuntoSelect.addEventListener('change', (e) => {
            if (e.target.value) {
                limparErroAria('assunto');
            }
        });
    }
    
    // Validação ARIA para checkbox de termos
    const termosCheckbox = form.querySelector('#aceitaTermos');
    if (termosCheckbox) {
        termosCheckbox.addEventListener('change', (e) => {
            if (e.target.checked) {
                limparErroAria('aceitaTermos');
            }
        });
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
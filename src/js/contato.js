// ============================================
// CONFIGURAÇÃO EMAILJS
// ============================================
const EMAILJS_CONFIG = {
    serviceID: 'service_cey5m1p',
    templateID: 'template_id_aqui', // Você precisa criar um template no EmailJS
    publicKey: 'hCSkJpAn0vigCaAdD'
};

// Inicializar EmailJS
(function() {
    emailjs.init(EMAILJS_CONFIG.publicKey);
})();

// ============================================
// MÁSCARA DE TELEFONE
// ============================================
function mascaraTelefone(event) {
    let valor = event.target.value.replace(/\D/g, '');
    
    if (valor.length <= 10) {
        valor = valor.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else {
        valor = valor.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    }
    
    event.target.value = valor;
}

// ============================================
// MÁSCARA DE CEP
// ============================================
function mascaraCEP(event) {
    let valor = event.target.value.replace(/\D/g, '');
    valor = valor.replace(/(\d{5})(\d{0,3})/, '$1-$2');
    event.target.value = valor;
}

// ============================================
// BUSCAR CEP (ViaCEP API)
// ============================================
async function buscarCEP(cep) {
    const cepLimpo = cep.replace(/\D/g, '');
    
    if (cepLimpo.length !== 8) return;
    
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
        const dados = await response.json();
        
        if (!dados.erro) {
            document.getElementById('endereco').value = dados.logradouro || '';
            document.getElementById('cidade').value = dados.localidade || '';
            document.getElementById('estado').value = dados.uf || '';
            document.getElementById('complemento').value = dados.complemento || '';
        } else {
            mostrarFeedback('CEP não encontrado.', 'erro');
        }
    } catch (error) {
        console.error('Erro ao buscar CEP:', error);
        mostrarFeedback('Erro ao buscar CEP. Tente novamente.', 'erro');
    }
}

// ============================================
// VALIDAÇÃO DO FORMULÁRIO
// ============================================
function validarFormulario(form) {
    const erros = [];
    
    // Validar nome
    const nome = form.nome.value.trim();
    if (nome.length < 3) {
        erros.push('Nome deve ter pelo menos 3 caracteres');
    }
    
    // Validar email
    const email = form.email.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        erros.push('E-mail inválido');
    }
    
    // Validar telefone
    const telefone = form.telefone.value.replace(/\D/g, '');
    if (telefone.length < 10) {
        erros.push('Telefone inválido');
    }
    
    // Validar CEP
    const cep = form.cep.value.replace(/\D/g, '');
    if (cep.length !== 8) {
        erros.push('CEP inválido');
    }
    
    // Validar mensagem
    const mensagem = form.mensagem.value.trim();
    if (mensagem.length < 10) {
        erros.push('Mensagem deve ter pelo menos 10 caracteres');
    }
    
    // Validar termos
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
    feedback.textContent = mensagem;
    feedback.className = `form-feedback ${tipo}`;
    feedback.style.display = 'block';
    
    // Auto-ocultar após 5 segundos
    setTimeout(() => {
        feedback.style.display = 'none';
    }, 5000);
}

// ============================================
// ENVIAR FORMULÁRIO
// ============================================
async function enviarFormulario(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Validar formulário
    const erros = validarFormulario(form);
    if (erros.length > 0) {
        mostrarFeedback(erros.join(', '), 'erro');
        return;
    }
    
    // Desabilitar botão durante envio
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';
    
    // Preparar dados para EmailJS
    const templateParams = {
        name: form.nome.value.trim(),
        email: form.email.value.trim(),
        telefone: form.telefone.value,
        dataNascimento: form.dataNascimento.value || 'Não informado',
        cep: form.cep.value,
        estado: form.estado.value || 'Não informado',
        cidade: form.cidade.value || 'Não informado',
        endereco: form.endereco.value || 'Não informado',
        numero: form.numero.value || 'S/N',
        complemento: form.complemento.value || 'Não informado',
        assunto: form.assunto.options[form.assunto.selectedIndex].text,
        message: form.mensagem.value.trim(),
        receberNovidades: form.receberNovidades.checked ? 'Sim' : 'Não',
        receberSMS: form.receberSMS.checked ? 'Sim' : 'Não',
        time: new Date().toLocaleString('pt-BR')
    };
    
    try {
        // Enviar via EmailJS
        const response = await emailjs.send(
            EMAILJS_CONFIG.serviceID,
            EMAILJS_CONFIG.templateID,
            templateParams
        );
        
        console.log('E-mail enviado com sucesso!', response);
        mostrarFeedback('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'sucesso');
        
        // Limpar formulário após sucesso
        form.reset();
        
    } catch (error) {
        console.error('Erro ao enviar e-mail:', error);
        mostrarFeedback('Erro ao enviar mensagem. Tente novamente mais tarde.', 'erro');
    } finally {
        // Reabilitar botão
        submitBtn.disabled = false;
        submitBtn.textContent = 'Enviar Mensagem';
    }
}

// ============================================
// INICIALIZAÇÃO
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contatoForm');
    
    if (!form) return; // Sai se não estiver na página de contato
    
    // Event Listeners
    form.addEventListener('submit', enviarFormulario);
    
    // Máscaras
    const telefoneInput = document.getElementById('telefone');
    if (telefoneInput) {
        telefoneInput.addEventListener('input', mascaraTelefone);
    }
    
    const cepInput = document.getElementById('cep');
    if (cepInput) {
        cepInput.addEventListener('input', mascaraCEP);
        cepInput.addEventListener('blur', (e) => buscarCEP(e.target.value));
    }
});

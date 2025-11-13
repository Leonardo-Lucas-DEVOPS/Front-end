// ============================================
// INSTITUTO VIDA ANIMAL - MÁSCARAS DE FORMULÁRIO
// ============================================
// Funções de formatação e máscaras de input


/**
 * Objeto contendo todas as máscaras de formulário
 */
const Mascaras = {
    
    /**
     * Máscara de Nome - permite apenas letras e espaços
     * @param {Event} event - Evento de input
     */
    nome: function(event) {
        let valor = event.target.value;
        valor = valor.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
        event.target.value = valor;
    },
    
    /**
     * Máscara de Telefone - formato (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
     * @param {Event} event - Evento de input
     */
    telefone: function(event) {
        let valor = event.target.value.replace(/\D/g, '');
        
        if (valor.length <= 10) {
            // Formato: (XX) XXXX-XXXX (telefone fixo)
            valor = valor.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
        } else {
            // Formato: (XX) XXXXX-XXXX (celular)
            valor = valor.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
        }
        
        event.target.value = valor;
    },
    
    /**
     * Máscara de CEP - formato XXXXX-XXX
     * @param {Event} event - Evento de input
     */
    cep: function(event) {
        let valor = event.target.value.replace(/\D/g, '');
        valor = valor.replace(/(\d{5})(\d{0,3})/, '$1-$2');
        event.target.value = valor.substring(0, 9);
    },
    
    /**
     * Máscara de Número - permite apenas dígitos
     * @param {Event} event - Evento de input
     */
    numero: function(event) {
        let valor = event.target.value.replace(/\D/g, '');
        event.target.value = valor;
    },
    
    /**
     * Máscara de E-mail - converte para minúsculo e remove espaços
     * @param {Event} event - Evento de input
     */
    email: function(event) {
        let valor = event.target.value;
        valor = valor.toLowerCase().replace(/\s/g, '');
        event.target.value = valor;
    },
    
    /**
     * Capitalizar - primeira letra de cada palavra em maiúscula
     * @param {Event} event - Evento de input
     */
    capitalizar: function(event) {
        let valor = event.target.value;
        valor = valor.toLowerCase().replace(/(?:^|\s)\S/g, function(a) { 
            return a.toUpperCase(); 
        });
        event.target.value = valor;
    }
};

// ============================================
// FUNÇÕES LEGADAS (Compatibilidade)
// ============================================
// Mantém funções antigas para compatibilidade com código existente

function mascaraNome(event) {
    Mascaras.nome(event);
}

function mascaraTelefone(event) {
    Mascaras.telefone(event);
}

function mascaraCEP(event) {
    Mascaras.cep(event);
}

function mascaraNumero(event) {
    Mascaras.numero(event);
}

function mascaraEmail(event) {
    Mascaras.email(event);
}

function capitalizarTexto(event) {
    Mascaras.capitalizar(event);
}

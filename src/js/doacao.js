(function () {
  'use strict';

  const PIX_KEY = 'pix@institutovidaanimal.org.br';
  let initialized = false;

  function $ (sel, root = document) { return root.querySelector(sel); }
  function $$ (sel, root = document) { return Array.from((root || document).querySelectorAll(sel)); }
  
  // Função auxiliar para escapar HTML (mantida)
  function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/[&<>"']/g, function (m) {
      return ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' })[m];
    });
  }

  /* feedback */
  function showFeedback(message, type = 'sucesso') {
    const fb = $('#formFeedback');
    if (!fb) return console.log(message);
    fb.textContent = message;
    fb.className = `form-feedback ${type}`;
    fb.style.display = 'block';
    clearTimeout(fb._t);
    fb._t = setTimeout(() => fb.style.display = 'none', 4500);
  }


  // FUNÇÕES DE VISIBILIDADE E MÁSCARAS

  /* aplica máscaras (incluindo as de cartão/cpf) */
  function applyMasks() {
    // Seleção interna (garante que exista)
    const phone = $('#donorPhone');
    if (phone && typeof window.mascaraTelefone === 'function') {
      phone.addEventListener('input', window.mascaraTelefone);
    }
    const cardN = $('#cardNumber');
    if (cardN) {
      cardN.addEventListener('input', e => {
        const v = e.target.value.replace(/\D/g, '').slice(0, 19);
        e.target.value = v.replace(/(\d{4})(?=\d)/g, '$1 ');
      });
    }
    const expiry = $('#cardExpiry');
    if (expiry) {
      expiry.addEventListener('input', e => {
        let v = e.target.value.replace(/\D/g, '').slice(0,4);
        if (v.length >= 3) v = v.replace(/(\d{2})(\d{1,2})/, '$1/$2');
        e.target.value = v;
      });
    }
    const cpf = $('#cardCpf');
    if (cpf) {
      cpf.addEventListener('input', e => {
        let v = e.target.value.replace(/\D/g, '').slice(0,11);
        v = v.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, function(_,a,b,c,d){ return a ? a + (b ? '.'+b : '') + (c ? '.'+c : '') + (d ? '-' + d : '') : a; });
        e.target.value = v;
      });
    }
  }

  /* alternar blocos PIX <-> CARTÃO */
  function bindPaymentToggle() {
    const pixBlock = document.getElementById('pixBlock');
    const cardBlock = document.getElementById('cardBlock');
    const paymentRadios = Array.from(document.querySelectorAll('input[name="paymentMethod"]'));

    if (!pixBlock || !cardBlock || paymentRadios.length === 0) {
      console.warn('Elementos de pagamento não encontrados. Visibilidade não será aplicada.');
      return;
    }
    const cardInputs = cardBlock.querySelectorAll('input, select, textarea, button');

    /** Lógica de alternância */
    function aplicarVisibilidade(valor) {
      if (valor === 'pix') {
        // Esconde CARTÃO
        cardBlock.classList.add('hidden');
        cardBlock.style.display = 'none'; 
        cardBlock.setAttribute('aria-hidden', 'true');
        cardInputs.forEach(input => input.disabled = true);
        
        // Mostra PIX
        pixBlock.classList.remove('hidden');
        pixBlock.style.display = 'block'; 
        pixBlock.setAttribute('aria-hidden', 'false');

      } else { // 'card'
        // Mostra CARTÃO
        cardBlock.classList.remove('hidden');
        cardBlock.style.display = 'block'; 
        cardBlock.setAttribute('aria-hidden', 'false');
        
        // AÇÃO CRÍTICA: Habilita todos os inputs
        cardInputs.forEach(input => input.disabled = false);

        // Esconde PIX
        pixBlock.classList.add('hidden');
        pixBlock.style.display = 'none'; 
        pixBlock.setAttribute('aria-hidden', 'true');
      }
    }

    // Vincula listeners para alternar
    paymentRadios.forEach(radio => {
      radio.addEventListener('change', () => {
        if (radio.checked) aplicarVisibilidade(radio.value);
      });
    });

    // Define estado inicial
    const checked = paymentRadios.find(r => r.checked);
    aplicarVisibilidade(checked ? checked.value : 'pix'); 
  }

  /* Funções PIX (bindPixUi) */
  function bindPixUi() {
    const pixKeyText = document.getElementById('pixKeyText');
    const pixQrImg = document.getElementById('pixQr');
    const btnCopyPix = document.getElementById('copyPixKey');

    if (pixKeyText) pixKeyText.textContent = PIX_KEY;

    if (btnCopyPix) {
      btnCopyPix.addEventListener('click', async () => {
        try {
          const keyToCopy = document.getElementById('pixKeyText')?.textContent || PIX_KEY;
          await navigator.clipboard.writeText(keyToCopy);
          showFeedback('Chave PIX copiada!', 'sucesso');
        } catch {
          showFeedback('Não foi possível copiar', 'erro');
        }
      });
    }
  }

  /* Funções de Valor (bindAmountSelection) */
  function bindAmountSelection() {
    const preco = sessionStorage.getItem('doacaoAmount');
    const radios = $$('input[name="amount"]');
    const amountCustomEl = document.getElementById('amountCustom');
    const customRadio = document.getElementById('customRadio');

    if (preco) {
      let matched = radios.find(r => r.value === preco);
      if (matched) matched.checked = true;
      else {
        if (customRadio) customRadio.checked = true;
        if (amountCustomEl) amountCustomEl.value = preco;
      }
      sessionStorage.removeItem('doacaoAmount');
    }

    if (amountCustomEl && customRadio) {
      amountCustomEl.addEventListener('input', () => customRadio.checked = true);
    }
  }

  /* Funções de Submissão (bindSubmit) */
  function bindSubmit() {
    const form = document.getElementById('doacaoForm');
    if (!form) return;
    
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      // ... (simulação de envio de dados)
      showFeedback('Processando...', 'sucesso');
      const btn = form.querySelector('button[type="submit"]');
      if (btn) btn.disabled = true;

      // Simulação de processamento assíncrono
      await new Promise(resolve => setTimeout(resolve, 1500)); 

      showFeedback('Doação simulada concluída. Muito obrigada!', 'sucesso');
      form.reset();
      
      if (btn) btn.disabled = false;
      
      // Força a re-aplicação da visibilidade após o reset
      const checked = $$('input[name="paymentMethod"]').find(r => r.checked);
      if (checked) {
        // Dispara o change para re-executar a lógica de visibilidade
        checked.dispatchEvent(new Event('change', { bubbles: true })); 
      }
    });
  }

  /* Inicializa tudo (CRÍTICO: Chamado diretamente) */
  function init() {
    const form = document.getElementById('doacaoForm');
    if (initialized || !form) return;

    initialized = true;
    applyMasks();
    bindAmountSelection();
    bindPaymentToggle(); 
    bindPixUi();
    bindSubmit();

    console.log('doacao.js inicializado com sucesso.');
  }

  init();

})();
# 📧 Configuração do Formulário de Contato com EmailJS

## 🎯 O que foi criado:

### Arquivos criados:
1. **`src/telas/contato.html`** - Formulário HTML completo e semântico
2. **`src/js/contato.js`** - Lógica de envio com EmailJS
3. **`src/style/contato.css`** - Estilos do formulário

### Arquivos modificados:
- **`Index.html`** - Adicionado SDK do EmailJS
- **`src/style/allstyle.css`** - Importado CSS do contato

---

## ⚙️ PASSOS PARA CONFIGURAR NO EMAILJS:

### 1️⃣ Criar um Template no EmailJS

Acesse: https://dashboard.emailjs.com/admin/templates

**Clique em "Create New Template"** e use este código HTML:

```html
<div style="font-family: system-ui, sans-serif, Arial; font-size: 14px; max-width: 600px; margin: 0 auto;">
  
  <!-- Cabeçalho -->
  <div style="background-color: #0d323b; padding: 20px; text-align: center;">
    <h1 style="color: #fdbe00; margin: 0;">Instituto Vida Animal</h1>
    <p style="color: #ffffff; margin: 5px 0 0 0;">Nova mensagem recebida</p>
  </div>

  <!-- Corpo da mensagem -->
  <div style="background-color: #f5f5f5; padding: 20px;">
    
    <p style="font-size: 16px; color: #333;">Uma mensagem de <strong>{{name}}</strong> foi recebida. Responda o mais breve possível.</p>
    
    <!-- Informações do remetente -->
    <div style="margin-top: 20px; padding: 15px; background-color: #ffffff; border-left: 4px solid #fdbe00; border-radius: 5px;">
      
      <table role="presentation" style="width: 100%;">
        <tr>
          <td style="vertical-align: top; width: 60px;">
            <div style="padding: 10px; background-color: #fdbe00; border-radius: 50%; font-size: 30px; text-align: center; width: 50px; height: 50px; line-height: 30px;">
              👤
            </div>
          </td>
          <td style="vertical-align: top; padding-left: 15px;">
            <div style="color: #0d323b; font-size: 18px; font-weight: bold;">
              {{name}}
            </div>
            <div style="color: #666; font-size: 13px; margin: 5px 0;">
              {{time}}
            </div>
            <div style="margin-top: 10px;">
              <p style="margin: 5px 0;"><strong>📧 E-mail:</strong> {{email}}</p>
              <p style="margin: 5px 0;"><strong>📞 Telefone:</strong> {{telefone}}</p>
              <p style="margin: 5px 0;"><strong>📅 Data Nascimento:</strong> {{dataNascimento}}</p>
            </div>
          </td>
        </tr>
      </table>
    </div>

    <!-- Endereço -->
    <div style="margin-top: 15px; padding: 15px; background-color: #ffffff; border-radius: 5px;">
      <h3 style="color: #0d323b; margin-top: 0;">📍 Endereço</h3>
      <p style="margin: 5px 0;"><strong>CEP:</strong> {{cep}}</p>
      <p style="margin: 5px 0;"><strong>Cidade/Estado:</strong> {{cidade}} - {{estado}}</p>
      <p style="margin: 5px 0;"><strong>Endereço:</strong> {{endereco}}, {{numero}}</p>
      <p style="margin: 5px 0;"><strong>Complemento:</strong> {{complemento}}</p>
    </div>

    <!-- Assunto e Mensagem -->
    <div style="margin-top: 15px; padding: 15px; background-color: #ffffff; border-radius: 5px;">
      <h3 style="color: #0d323b; margin-top: 0;">📋 Assunto: {{assunto}}</h3>
      <p style="font-size: 15px; line-height: 1.6; color: #333; white-space: pre-wrap;">{{message}}</p>
    </div>

    <!-- Preferências -->
    <div style="margin-top: 15px; padding: 15px; background-color: #fff9e6; border-radius: 5px;">
      <h4 style="margin-top: 0; color: #0d323b;">⚙️ Preferências de Contato</h4>
      <p style="margin: 5px 0;">📬 Receber novidades por e-mail: <strong>{{receberNovidades}}</strong></p>
      <p style="margin: 5px 0;">📱 Receber notificações por SMS: <strong>{{receberSMS}}</strong></p>
    </div>

  </div>

  <!-- Rodapé -->
  <div style="background-color: #0d323b; padding: 15px; text-align: center; color: #ffffff; font-size: 12px;">
    <p style="margin: 0;">© 2025 Instituto Vida Animal - Todos os direitos reservados</p>
    <p style="margin: 5px 0 0 0;">Este e-mail foi enviado automaticamente através do formulário de contato do site</p>
  </div>

</div>
```

### 2️⃣ Copiar o Template ID

Após criar o template, copie o **Template ID** (exemplo: `template_abc123`)

### 3️⃣ Atualizar o arquivo `contato.js`

Abra `src/js/contato.js` e na linha 7, substitua:

```javascript
templateID: 'template_id_aqui', // Substitua pelo seu Template ID
```

Por:

```javascript
templateID: 'template_abc123', // Seu Template ID real
```

---

## 📋 Campos do Formulário:

### ✅ Campos Obrigatórios:
- Nome Completo
- E-mail
- Telefone
- CEP
- Assunto
- Mensagem
- Aceitar Termos

### ⚙️ Campos Opcionais:
- Data de Nascimento
- Estado, Cidade, Endereço, Número, Complemento
- Preferências (receber novidades/SMS)

---

## 🚀 Funcionalidades Implementadas:

1. **Máscaras automáticas** para telefone e CEP
2. **Busca de CEP** automática (Via CEP API)
3. **Validação completa** de todos os campos
4. **Feedback visual** de sucesso/erro
5. **Responsivo** para mobile
6. **Semântico** (fieldsets, legends, labels)
7. **Acessível** (aria-live, autocomplete)
8. **Integração com EmailJS**

---

## 🧪 Como Testar:

1. Abra o site
2. Navegue para "Contate-nos"
3. Preencha o formulário
4. Clique em "Enviar Mensagem"
5. Verifique seu e-mail cadastrado no EmailJS

---

## 📧 Credenciais EmailJS (já configuradas):

- **Service ID:** `service_cey5m1p`
- **Public Key:** `hCSkJpAn0vigCaAdD`
- **Template ID:** ⚠️ **VOCÊ PRECISA CRIAR E ADICIONAR**

---

## ⚠️ IMPORTANTE:

Por segurança, **NÃO compartilhe** a Private Key em arquivos públicos!
Use apenas a Public Key no código frontend.

---

## 🎨 Personalização:

Você pode personalizar as cores editando o arquivo `src/style/contato.css`

**Cores principais:**
- Amarelo: `#fdbe00`
- Azul escuro: `#0d323b`
- Branco: `#ffffff`

---

Criado para o **Instituto Vida Animal** 🐾

# 🐾 Instituto Vida Animal

> **Projeto Acadêmico de Desenvolvimento Front-end**  
> Site institucional para ONG de proteção animal com sistema completo de contato e acessibilidade

<div align="center">

[![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-success?logo=github)](https://leonardo-lucas-devops.github.io/Front-end)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
[![Google Sheets](https://img.shields.io/badge/Google%20Sheets-34A853?logo=google-sheets&logoColor=white)](https://www.google.com/sheets/about/)

</div>

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Como Executar](#-como-executar)
- [Diferenciais Técnicos](#-diferenciais-técnicos)
- [Acessibilidade](#-acessibilidade)
- [Deploy](#-deploy)
- [Autor](#-autor)

---

## 🎯 Sobre o Projeto

O **Instituto Vida Animal** é um site institucional desenvolvido para uma ONG fictícia de proteção animal. O projeto demonstra a aplicação de boas práticas de desenvolvimento web, incluindo HTML semântico, CSS responsivo, JavaScript modular e integração com APIs externas.

### 🔗 Links Importantes

| Recurso | Link |
|---------|------|
| 🌐 **Site Publicado** | [leonardo-lucas-devops.github.io/Front-end](https://leonardo-lucas-devops.github.io/Front-end) |
| 💻 **Repositório** | [github.com/Leonardo-Lucas-DEVOPS/Front-end](https://github.com/Leonardo-Lucas-DEVOPS/Front-end) |
| 📊 **Banco de Dados** | [Google Sheets - Contatos](https://docs.google.com/spreadsheets/d/1zlWLJns7e9pK2ATWBB9_yfLVrIiUg1WMwLoSoZC7ch0/edit?usp=sharing) |

---

## ✨ Funcionalidades

### 🏠 Páginas Principais

- **Menu (Sobre)**: Apresentação do instituto e seus valores
- **Projetos**: Detalhamento dos 3 principais projetos da ONG
  - Mutirão de Castração
  - Programa de Adoção
  - Centro de Reabilitação
- **Contato**: Formulário completo com validação e integração

### 📝 Sistema de Contato

- ✅ **16 campos** com validação robusta
- ✅ **Máscaras automáticas** (telefone, CEP)
- ✅ **Busca automática de endereço** via API ViaCEP
- ✅ **Integração com Google Sheets** para armazenamento
- ✅ **Feedback visual** em tempo real
- ✅ **Validação ARIA** para acessibilidade
- ✅ **Limpeza de erros dinâmica** conforme o usuário corrige

### ♿ Acessibilidade (WCAG 2.1)

- ✅ **Atributos ARIA** completos em todo o site
- ✅ **Navegação por teclado** otimizada
- ✅ **Leitores de tela** totalmente compatíveis
- ✅ **Feedback de erro** acessível com `role="alert"`
- ✅ **Estados dinâmicos** (`aria-expanded`, `aria-invalid`, `aria-describedby`)
- ✅ **Menu hambúrguer** com `aria-controls` e `aria-label`

---

## 🛠️ Tecnologias

### Frontend

| Tecnologia | Descrição |
|------------|-----------|
| ![HTML5](https://img.shields.io/badge/-HTML5-E34F26?style=flat&logo=html5&logoColor=white) | Estrutura semântica do site |
| ![CSS3](https://img.shields.io/badge/-CSS3-1572B6?style=flat&logo=css3&logoColor=white) | Estilização responsiva (Mobile-First) |
| ![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black) | Interatividade e validações (Vanilla JS) |

### Backend & APIs

| Tecnologia | Descrição |
|------------|-----------|
| ![Google Apps Script](https://img.shields.io/badge/-Apps%20Script-34A853?style=flat&logo=google&logoColor=white) | Backend serverless para receber formulários |
| ![Google Sheets](https://img.shields.io/badge/-Google%20Sheets-34A853?style=flat&logo=google-sheets&logoColor=white) | Banco de dados em nuvem (gratuito) |
| ![ViaCEP](https://img.shields.io/badge/-ViaCEP-0066CC?style=flat) | API de consulta de endereços por CEP |

### Hospedagem & Deploy

| Plataforma | Descrição |
|------------|-----------|
| ![GitHub Pages](https://img.shields.io/badge/-GitHub%20Pages-222?style=flat&logo=github) | Hospedagem gratuita e automática |
| ![Git](https://img.shields.io/badge/-Git-F05032?style=flat&logo=git&logoColor=white) | Controle de versão |

---

## 📂 Estrutura do Projeto

```
Front-end/
│
├── index.html                    # Página principal (SPA Container)
├── readme.md                     # Documentação do projeto
│
└── src/                          # Código-fonte
    │
    ├── assets/                   # Recursos estáticos
    │   ├── fonts/                # Fontes personalizadas
    │   ├── icons/                # Ícones e favicons
    │   │   └── favicon/          # Variantes do favicon
    │   │       ├── favicon.svg
    │   │       ├── favicon.ico
    │   │       ├── favicon-96x96.png
    │   │       ├── apple-touch-icon.png
    │   │       └── site.webmanifest
    │   └── images/               # Imagens do site
    │       ├── logo.png
    │       ├── bg.png
    │       ├── animais_diversos.png
    │       ├── cachorro_filhote.png
    │       ├── gato-bonito.jpg
    │       ├── projeto-adoca.jpg
    │       └── projeto-reabilitacao.jpg
    │
    ├── Js/                       # JavaScript modular
    │   ├── allscript.js          # Navegação SPA + Menu hambúrguer
    │   ├── contato.js            # Lógica do formulário
    │   └── mask.js               # Máscaras de input
    │
    ├── Style/                    # Estilos CSS
    │   ├── allstyle.css          # Estilos globais e responsivos
    │   ├── sobrestyle.css        # Página Sobre
    │   ├── projeto.css           # Página Projetos
    │   └── contato.css           # Página Contato + ARIA
    │
    └── Telas/                    # Views HTML (carregadas via SPA)
        ├── sobre.html            # Página Sobre o Instituto
        ├── projeto.html          # Página de Projetos
        └── contato.html          # Formulário de Contato
```

---

## 🚀 Como Executar

### Pré-requisitos

- Navegador moderno (Chrome, Firefox, Edge, Safari)
- Conexão com internet (para APIs externas)

### Opção 1: Acessar Online

Acesse diretamente: **[leonardo-lucas-devops.github.io/Front-end](https://leonardo-lucas-devops.github.io/Front-end)**

### Opção 2: Executar Localmente

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/Leonardo-Lucas-DEVOPS/Front-end.git
   ```

2. **Navegue até a pasta:**
   ```bash
   cd Front-end
   ```

3. **Abra o arquivo `index.html` no navegador:**
   - **Windows:** Duplo clique no arquivo
   - **Linux/Mac:** 
     ```bash
     open index.html  # Mac
     xdg-open index.html  # Linux
     ```

4. **Ou use um servidor local:**
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js (npx)
   npx serve
   ```
   
   Acesse: `http://localhost:8000`

---

## 💎 Diferenciais Técnicos

### 1. Arquitetura SPA (Single Page Application)

O projeto utiliza uma abordagem SPA com JavaScript vanilla, sem frameworks:

```javascript
// Navegação dinâmica sem reload da página
async function carregarTela(caminho) {
    const response = await fetch(`src/Telas/${caminho}`);
    const html = await response.text();
    document.getElementById('app').innerHTML = html;
}
```

**Vantagens:**
- ⚡ Navegação instantânea entre páginas
- 🎨 Transições suaves
- 📱 Menor consumo de dados
- 🔄 Header e footer preservados

### 2. Integração com Google Apps Script

Backend serverless que recebe e armazena dados do formulário:

```javascript
// API URL configurada no projeto
const CONFIG = {
    scriptURL: 'https://script.google.com/macros/s/AKfycbzMX8eDxKZ_2Q_RSneuFcPxRTr7783kVc5DiCwyfU5ciAtKLnZJKpPpOYiJvOWVnaN9nQ/exec'
};
```

**Benefícios:**
- ✅ Zero custo de hospedagem
- ✅ Escalável automaticamente
- ✅ Integração nativa com Google Sheets
- ✅ Deploy com 1 clique

### 3. Busca Automática de Endereço (ViaCEP)

Quando o usuário digita o CEP, o sistema busca automaticamente o endereço completo:

```javascript
// Exemplo de uso
CEP digitado: 01310-100
↓
Sistema busca na API ViaCEP
↓
Campos preenchidos automaticamente:
- Endereço: Av. Paulista
- Cidade: São Paulo
- Estado: SP
```

### 4. Máscaras de Input em Tempo Real

```javascript
// Máscaras implementadas
Telefone: (11) 98765-4321
CEP: 01310-100
```

### 5. Validação ARIA Completa

Sistema robusto de acessibilidade com feedback dinâmico:

```html
<!-- Exemplo de campo com ARIA -->
<input 
  type="email" 
  id="email" 
  aria-required="true" 
  aria-invalid="false"
  aria-describedby="email-erro"
>
<span id="email-erro" role="alert" aria-live="polite"></span>
```

**Funcionalidades ARIA:**
- Estados de erro (`aria-invalid="true"`)
- Descrições de erro (`aria-describedby`)
- Alertas ao vivo (`role="alert"`)
- Estados do menu (`aria-expanded`)
- Limpeza automática de erros ao corrigir

---

## ♿ Acessibilidade

O projeto segue as diretrizes **WCAG 2.1 Nível AA**:

### Implementações de Acessibilidade

| Recurso | Implementação |
|---------|---------------|
| **Menu Hambúrguer** | `aria-label`, `aria-expanded`, `aria-controls` |
| **Formulário** | `aria-labelledby`, `novalidate`, `aria-required` |
| **Campos** | `aria-invalid`, `aria-describedby` |
| **Erros** | `role="alert"`, `aria-live="polite"` |
| **Feedback** | `role="status"`, `aria-atomic="true"` |

### Navegação por Teclado

- `Tab`: Navegar entre elementos
- `Enter/Space`: Ativar botões e links
- `Esc`: Fechar menu hambúrguer

### Leitores de Tela

Totalmente compatível com:
- NVDA (Windows)
- JAWS (Windows)
- VoiceOver (macOS/iOS)
- TalkBack (Android)

---

## 🌐 Deploy

### GitHub Pages (Automático)

O site é automaticamente publicado via GitHub Pages quando há push na branch `main`.

**URL de Produção:** [leonardo-lucas-devops.github.io/Front-end](https://leonardo-lucas-devops.github.io/Front-end)

### Como Fazer Deploy

1. **Faça alterações no código:**
   ```bash
   git add .
   git commit -m "feat: nova funcionalidade"
   git push origin main
   ```

2. **Aguarde ~2 minutos** para o GitHub Pages processar

3. **Acesse o site atualizado**

### Google Apps Script (Backend)

O backend já está configurado e rodando. Para criar uma nova instância:

1. Abra o [Google Sheets](https://sheets.google.com)
2. Crie nova planilha
3. **Extensões → Apps Script**
4. Cole o código do backend
5. **Implantar → Nova implantação → Aplicativo da Web**
6. Configure:
   - Executar como: **Eu**
   - Acesso: **Qualquer pessoa**
7. Copie a URL gerada
8. Atualize em `src/Js/contato.js`:
   ```javascript
   const CONFIG = {
       scriptURL: 'SUA_URL_AQUI'
   };
   ```

---

## 👨‍💻 Autor

<div align="center">

**Leonardo Lucas**

[![GitHub](https://img.shields.io/badge/-Leonardo--Lucas--DEVOPS-181717?style=flat&logo=github)](https://github.com/Leonardo-Lucas-DEVOPS)
[![Portfolio](https://img.shields.io/badge/-Portfólio-000?style=flat&logo=vercel)](https://leonardo-lucas-devops.github.io/Front-end)

</div>

---

## 📄 Licença

Este projeto foi desenvolvido para fins **acadêmicos e educacionais**.

---

## 📊 Estatísticas do Projeto

```
Linhas de Código: ~2.000
Arquivos HTML: 4
Arquivos CSS: 4
Arquivos JavaScript: 3
Imagens: 7
Páginas: 3 (SPA)
```

---

## 🎓 Aprendizados

Este projeto demonstra:

- ✅ **HTML Semântico** e boas práticas
- ✅ **CSS Responsivo** com Mobile-First
- ✅ **JavaScript Modular** sem frameworks
- ✅ **Integração com APIs** externas
- ✅ **Backend Serverless** (Google Apps Script)
- ✅ **Acessibilidade Web** (WCAG 2.1)
- ✅ **Controle de Versão** com Git/GitHub
- ✅ **Deploy Automático** com GitHub Pages

---

<div align="center">

**Desenvolvido com ❤️ para o Instituto Vida Animal**

🐾 *Porque todo animal merece uma vida digna* 🐾

</div>

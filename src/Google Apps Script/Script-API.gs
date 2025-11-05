// ============================================
// GOOGLE APPS SCRIPT - INSTITUTO VIDA ANIMAL
// ============================================
// Formulário de Contato - Integração com Google Sheets
// Versão: 1.0
// Data: 04/11/2025

function doPost(e) {
  // Headers CORS para permitir requisições de qualquer origem
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };
  
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const params = e.parameter;
    
    // Log para debug
    console.log('📥 Dados recebidos:', params);
    
    // Monta array com os dados na ordem das colunas
    const rowData = [
      new Date().toLocaleString('pt-BR'),           // Data/Hora
      params.nome || '',                             // Nome
      params.email || '',                            // E-mail
      params.telefone || '',                         // Telefone
      params.dataNascimento || 'Não informado',     // Data de Nascimento
      params.cep || '',                              // CEP
      params.estado || 'Não informado',             // Estado
      params.cidade || 'Não informado',             // Cidade
      params.endereco || 'Não informado',           // Endereço
      params.numero || 'S/N',                       // Número
      params.complemento || 'Não informado',        // Complemento
      params.assunto || '',                          // Assunto
      params.mensagem || '',                         // Mensagem
      params.aceitaTermos || 'Não',                 // Aceita Termos
      params.receberNovidades || 'Não',             // Receber Novidades
      params.receberSMS || 'Não'                    // Receber SMS
    ];
    
    // Adiciona linha na planilha
    sheet.appendRow(rowData);
    
    const linha = sheet.getLastRow();
    console.log('✅ Dados salvos na linha:', linha);
    
    // Retorna resposta JSON de sucesso
    return ContentService
      .createTextOutput(JSON.stringify({ 
        result: 'success',
        message: 'Mensagem enviada com sucesso!',
        row: linha,
        timestamp: new Date().toLocaleString('pt-BR')
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('❌ Erro ao salvar dados:', error);
    
    // Retorna resposta JSON de erro
    return ContentService
      .createTextOutput(JSON.stringify({ 
        result: 'error',
        message: error.toString(),
        timestamp: new Date().toLocaleString('pt-BR')
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Função OPTIONS para CORS preflight
function doOptions(e) {
  return ContentService
    .createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type')
    .setHeader('Access-Control-Max-Age', '3600');
}

// Função GET para testar se o script está online
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ 
      status: 'online',
      message: '✅ API funcionando corretamente!',
      project: 'Instituto Vida Animal',
      version: '1.0',
      timestamp: new Date().toLocaleString('pt-BR')
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Função para criar cabeçalhos formatados na planilha
function criarCabecalhos() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // Define os cabeçalhos
  const headers = [
    'Data/Hora',
    'Nome',
    'E-mail',
    'Telefone',
    'Data de Nascimento',
    'CEP',
    'Estado',
    'Cidade',
    'Endereço',
    'Número',
    'Complemento',
    'Assunto',
    'Mensagem',
    'Aceita Termos',
    'Receber Novidades',
    'Receber SMS'
  ];
  
  // Limpa primeira linha e insere cabeçalhos
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Formatação dos cabeçalhos
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setBackground('#0D323B');      // Cor de fundo azul escuro
  headerRange.setFontColor('#FFFFFF');       // Texto branco
  headerRange.setFontWeight('bold');          // Negrito
  headerRange.setHorizontalAlignment('center'); // Centralizado
  headerRange.setVerticalAlignment('middle');
  
  // Ajusta largura das colunas
  sheet.setColumnWidth(1, 150);   // Data/Hora
  sheet.setColumnWidth(2, 200);   // Nome
  sheet.setColumnWidth(3, 220);   // E-mail
  sheet.setColumnWidth(4, 130);   // Telefone
  sheet.setColumnWidth(5, 130);   // Data de Nascimento
  sheet.setColumnWidth(6, 100);   // CEP
  sheet.setColumnWidth(7, 80);    // Estado
  sheet.setColumnWidth(8, 150);   // Cidade
  sheet.setColumnWidth(9, 250);   // Endereço
  sheet.setColumnWidth(10, 80);   // Número
  sheet.setColumnWidth(11, 150);  // Complemento
  sheet.setColumnWidth(12, 150);  // Assunto
  sheet.setColumnWidth(13, 400);  // Mensagem
  sheet.setColumnWidth(14, 130);  // Receber Novidades
  sheet.setColumnWidth(15, 100);  // Receber SMS
  
  // Congela primeira linha
  sheet.setFrozenRows(1);
  
  Logger.log('✅ Cabeçalhos criados com sucesso!');
  
  // Retorna mensagem (não usa UI porque pode ser executado via trigger)
  return 'Cabeçalhos criados e formatados com sucesso!';
}

// Função para limpar dados da planilha (mantém cabeçalhos)
function limparDados() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const ultimaLinha = sheet.getLastRow();
  
  if (ultimaLinha > 1) {
    sheet.deleteRows(2, ultimaLinha - 1);
    Logger.log('🗑️ Dados excluídos. Cabeçalhos mantidos.');
    return 'Dados excluídos com sucesso!';
  } else {
    Logger.log('⚠️ A planilha já está vazia!');
    return 'A planilha já está vazia!';
  }
}

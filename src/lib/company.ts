/**
 * STYFLA — Informações Fiscais, Cadastrais e Institucionais Oficiais
 * Extraídas do Cadastro Nacional da Pessoa Jurídica (RFB).
 */
export const COMPANY_INFO = {
  legalName: '68.840.074 JOAO VITOR MARTINS FREIRES',
  tradeName: 'STYFLA',
  cnpj: '68.840.074/0001-70',
  cnpjClean: '68840074000170',
  legalNature: '213-5 - Empresário (Individual)',
  size: 'ME',
  mainActivity: '47.81-4-00 - Comércio varejista de artigos do vestuário e acessórios',
  address: {
    street: 'Av. Santos Dumont',
    number: '1687',
    complement: 'Sala 604',
    district: 'Aldeota',
    city: 'Fortaleza',
    state: 'CE',
    zipCode: '60150-161',
    zipCodeClean: '60150161',
    formatted: 'Av. Santos Dumont, 1687, Sala 604 - Aldeota, Fortaleza - CE, CEP: 60150-161',
  },
  contact: {
    phone: '(85) 9609-4790',
    phoneClean: '8596094790',
    email: 'pedidos@styfla.com.br',
    accountingEmail: 'contato@adyscontabilidade.com.br',
  },
} as const;

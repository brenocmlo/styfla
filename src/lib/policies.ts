export const EXCHANGE_WINDOW_DAYS = 7;

export const EXCHANGE_POLICY = {
  windowLabel: `Prazo de ${EXCHANGE_WINDOW_DAYS} Dias (CDC)`,
  windowDescription: `Você tem até ${EXCHANGE_WINDOW_DAYS} dias corridos após o recebimento para solicitar a troca de tamanho ou devolução sem custos.`,
  conditionLabel: 'Estado da Peça',
  conditionDescription:
    'A peça deve estar intacta, sem marcas de uso em treino/suor e com as tags originais afixadas.',
  logisticsLabel: 'Logística Reversa',
  logisticsDescription:
    'Geramos uma autorização de postagem gratuita para você despachar em qualquer agência dos Correios.',
};

export const SHIPPING_POLICY = {
  dispatchLabel: 'Envio Expresso',
  dispatchDescription: 'Despacho em até 24h úteis para todo o território nacional.',
};

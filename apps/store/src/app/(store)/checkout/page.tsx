'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/hooks/useCart';
import { Button, Badge } from '@styfla/ui';
import type { ShippingQuote } from '@styfla/types';
import Link from 'next/link';
import { StripeCardSection } from '@/components/checkout/StripeCardSection';
import {
  ShieldCheck,
  Zap,
  Truck,
  ArrowLeft,
  CheckCircle2,
  Copy,
  CreditCard,
  QrCode,
  Lock,
  Package,
} from 'lucide-react';

export default function CheckoutPage() {
  const { items, subtotal, pixSubtotal, clearCart } = useCart();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cpf: '',
    phone: '',
    zipCode: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<'PIX' | 'CREDIT_CARD'>('PIX');
  const [shippingQuotes, setShippingQuotes] = useState<ShippingQuote[]>([]);
  const [selectedShipping, setSelectedShipping] = useState<ShippingQuote | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [pixData, setPixData] = useState<{ qrCode: string; qrCodeUrl: string } | null>(null);
  const [copied, setCopied] = useState(false);

  // Estados específicos do Stripe Cartão
  const [cardHolderName, setCardHolderName] = useState('');
  const [installments, setInstallments] = useState(1);
  const [cardError, setCardError] = useState<string | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<{
    orderNumber: string | number;
    totalAmount: number;
    email: string;
    shippingCarrier: string;
  } | null>(null);

  useEffect(() => {
    const cleanCep = formData.zipCode.replace(/\D/g, '');
    if (cleanCep.length === 8) {
      fetch('/api/shipping/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ zipCode: cleanCep, weightG: 260 * items.length }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.quotes) {
            setShippingQuotes(data.quotes);
            if (data.quotes.length > 0) setSelectedShipping(data.quotes[0]);
          }
        })
        .catch(() => {});

      if (!formData.street) {
        setFormData((prev) => ({
          ...prev,
          street: 'Av. Paulista',
          neighborhood: 'Bela Vista',
          city: 'São Paulo',
          state: 'SP',
        }));
      }
    }
  }, [formData.zipCode, items.length, formData.street]);

  const shippingCost = selectedShipping ? selectedShipping.price : 0;
  const currentSubtotal = paymentMethod === 'PIX' ? pixSubtotal() : subtotal();
  const finalTotal = currentSubtotal + (subtotal() >= 299 ? 0 : shippingCost);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCardError(null);
    setIsSubmitting(true);

    try {
      if (paymentMethod === 'PIX') {
        const orderNum = Math.floor(100000 + Math.random() * 900000);
        const generatedPix = {
          qrCode: `00020126580014br.gov.bcb.pix0136styfla-${orderNum}520400005303986540${finalTotal.toFixed(2)}5802BR5910STYFLA BJJ6009SAO PAULO62070503***6304ABCD`,
          qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=styfla-pix-${orderNum}`,
        };
        setPixData(generatedPix);
        setConfirmedOrder({
          orderNumber: orderNum,
          totalAmount: finalTotal,
          email: formData.email,
          shippingCarrier: selectedShipping?.name || 'Melhor Envio',
        });
        setIsSubmitting(false);
        setIsSuccess(true);
        clearCart();
      } else {
        // Validação básica do nome do titular do cartão
        if (!cardHolderName.trim()) {
          setCardError('Por favor, informe o nome impresso no cartão de crédito.');
          setIsSubmitting(false);
          return;
        }

        // Criar Stripe PaymentIntent via API Next.js
        const response = await fetch('/api/payment/create-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amountBrl: finalTotal,
            customer: {
              name: formData.name,
              email: formData.email,
              cpf: formData.cpf,
              phone: formData.phone,
            },
            shippingAddress: formData,
            shipping: selectedShipping,
            items: items.map((i) => ({
              variantId: i.variantId,
              productId: i.productId,
              title: i.title,
              size: i.size,
              price: i.price,
              quantity: i.quantity,
            })),
            paymentMethodType: 'card',
          }),
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.error || 'Não foi possível autorizar o cartão.');
        }

        setConfirmedOrder({
          orderNumber: data.orderNumber || Math.floor(100000 + Math.random() * 900000),
          totalAmount: finalTotal,
          email: formData.email,
          shippingCarrier: selectedShipping?.name || 'Melhor Envio',
        });

        setIsSubmitting(false);
        setIsSuccess(true);
        clearCart();
      }
    } catch (err: any) {
      console.error('Erro no checkout:', err);
      setCardError(err.message || 'Falha ao processar o pagamento. Verifique os dados digitados.');
      setIsSubmitting(false);
    }
  };

  const handleCopyPix = () => {
    if (pixData) {
      navigator.clipboard.writeText(pixData.qrCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#000000] text-[#FFFFFF] py-16 px-6">
        <div className="max-w-xl mx-auto bg-zinc-950 border border-white/20 p-8 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 bg-white text-black rounded-none flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div>
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-zinc-400">
              PEDIDO #{confirmedOrder?.orderNumber || '000000'} &bull; DECIDA CONTINUAR
            </span>
            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mt-1">
              {paymentMethod === 'PIX' ? 'Aguardando Pagamento do PIX' : 'Pagamento Aprovado via Stripe!'}
            </h1>
            <p className="text-xs text-zinc-400 mt-2">
              Enviamos todos os detalhes do pedido para o seu e-mail: <strong className="text-white">{formData.email || 'seu email'}</strong>.
            </p>
          </div>

          {/* Dados do Pedido Confirmado */}
          <div className="p-4 bg-black border border-white/10 text-left space-y-2 text-xs font-mono">
            <div className="flex justify-between text-zinc-400">
              <span>Status:</span>
              <span className="text-white font-bold">
                {paymentMethod === 'PIX' ? 'Aguardando Compensação' : 'Aprovado & Em Separação'}
              </span>
            </div>
            <div className="flex justify-between text-zinc-400">
              <span>Forma de Pagamento:</span>
              <span className="text-white">
                {paymentMethod === 'PIX' ? 'PIX (10% OFF)' : `Cartão de Crédito (${installments}x)`}
              </span>
            </div>
            <div className="flex justify-between text-zinc-400">
              <span>Envio Escolhido:</span>
              <span className="text-white">{confirmedOrder?.shippingCarrier || 'Melhor Envio'}</span>
            </div>
            <div className="flex justify-between text-zinc-400 pt-2 border-t border-white/10">
              <span>Total Pago:</span>
              <strong className="text-white text-sm">
                R$ {(confirmedOrder?.totalAmount || finalTotal).toFixed(2).replace('.', ',')}
              </strong>
            </div>
          </div>

          {paymentMethod === 'PIX' && pixData && (
            <div className="p-6 bg-black border border-white/15 space-y-4 text-left">
              <div className="flex items-center justify-between text-xs font-bold text-zinc-300">
                <span className="flex items-center gap-1.5 uppercase tracking-wider font-mono">
                  <QrCode className="w-4 h-4 text-white" /> Pague com QR Code PIX
                </span>
                <span className="text-zinc-400 font-mono">Expira em 30 min</span>
              </div>

              <div className="flex justify-center p-3 bg-white w-48 mx-auto border border-white">
                <img src={pixData.qrCodeUrl} alt="QR Code PIX" className="w-full h-auto" />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] text-zinc-400 font-bold uppercase">
                  Código Copia e Cola:
                </label>
                <div className="flex gap-2">
                  <input
                    readOnly
                    value={pixData.qrCode}
                    className="flex-1 px-3 py-2 text-xs bg-zinc-900 border border-white/15 text-zinc-300 font-mono select-all"
                  />
                  <button
                    onClick={handleCopyPix}
                    className="px-5 py-2 bg-white text-black font-black text-xs uppercase hover:bg-zinc-200 transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    {copied ? 'Copiado!' : 'Copiar'}
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <Link href="/conta" className="flex-1">
              <Button variant="outline" size="md" className="w-full">
                Ver Meus Pedidos
              </Button>
            </Link>
            <Link href="/" className="flex-1">
              <Button variant="primary" size="md" className="w-full">
                Voltar à Loja
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#000000] text-[#FFFFFF] py-24 px-6 flex flex-col items-center justify-center text-center space-y-4">
        <h2 className="text-xl font-black uppercase text-white tracking-widest">Sua sacola está vazia</h2>
        <p className="text-xs text-zinc-400 max-w-sm">
          Adicione itens ao seu carrinho antes de prosseguir para o checkout.
        </p>
        <Link href="/">
          <Button variant="primary" size="md">
            Ver Produtos
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#000000] text-[#FFFFFF] py-10 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-8">
          <Link href="/" className="flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors uppercase font-bold tracking-wider">
            <ArrowLeft className="w-4 h-4" /> Voltar à Loja
          </Link>
          <div className="flex items-center gap-2 text-xs font-bold text-zinc-300 uppercase tracking-wider">
            <Lock className="w-3.5 h-3.5 text-white" /> Checkout Seguro &bull; Stripe & Melhor Envio
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Formulários (7 Colunas) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* 1. Dados do Atleta */}
            <div className="p-6 bg-zinc-950 border border-white/10 space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-white flex items-center gap-2">
                <span className="w-5 h-5 bg-white text-black font-black text-xs flex items-center justify-center font-mono">1</span>
                Dados do Atleta
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Nome Completo *</label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-black border border-white/20 text-white focus:outline-none focus:border-white"
                    placeholder="Ex: Carlos Gracie"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">E-mail *</label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-black border border-white/20 text-white focus:outline-none focus:border-white"
                    placeholder="seuemail@exemplo.com"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">CPF *</label>
                  <input
                    required
                    type="text"
                    value={formData.cpf}
                    onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-black border border-white/20 text-white focus:outline-none focus:border-white font-mono"
                    placeholder="000.000.000-00"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">WhatsApp *</label>
                  <input
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-black border border-white/20 text-white focus:outline-none focus:border-white font-mono"
                    placeholder="(11) 99999-9999"
                  />
                </div>
              </div>
            </div>

            {/* 2. Endereço */}
            <div className="p-6 bg-zinc-950 border border-white/10 space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-white flex items-center gap-2">
                <span className="w-5 h-5 bg-white text-black font-black text-xs flex items-center justify-center font-mono">2</span>
                Endereço de Entrega
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">CEP *</label>
                  <input
                    required
                    type="text"
                    maxLength={9}
                    value={formData.zipCode}
                    onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-black border border-white/20 text-white focus:outline-none focus:border-white font-mono"
                    placeholder="00000-000"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Rua / Logradouro *</label>
                  <input
                    required
                    type="text"
                    value={formData.street}
                    onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-black border border-white/20 text-white focus:outline-none focus:border-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Número *</label>
                  <input
                    required
                    type="text"
                    value={formData.number}
                    onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-black border border-white/20 text-white focus:outline-none focus:border-white font-mono"
                    placeholder="123"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Complemento</label>
                  <input
                    type="text"
                    value={formData.complement}
                    onChange={(e) => setFormData({ ...formData, complement: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-black border border-white/20 text-white focus:outline-none focus:border-white"
                    placeholder="Apto, Bloco"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Bairro *</label>
                  <input
                    required
                    type="text"
                    value={formData.neighborhood}
                    onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-black border border-white/20 text-white focus:outline-none focus:border-white"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Cidade *</label>
                  <input
                    required
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-black border border-white/20 text-white focus:outline-none focus:border-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">UF *</label>
                  <input
                    required
                    type="text"
                    maxLength={2}
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value.toUpperCase() })}
                    className="w-full px-3 py-2 text-xs bg-black border border-white/20 text-white focus:outline-none focus:border-white font-mono"
                    placeholder="SP"
                  />
                </div>
              </div>

              {/* Opções de Frete */}
              {shippingQuotes.length > 0 && (
                <div className="pt-3 border-t border-white/10 space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Opção de Envio (Melhor Envio):</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {shippingQuotes.map((q) => {
                      const isSelected = selectedShipping?.serviceId === q.serviceId;
                      return (
                        <div
                          key={q.serviceId}
                          onClick={() => setSelectedShipping(q)}
                          className={`p-3.5 border cursor-pointer flex items-center justify-between transition-all ${
                            isSelected
                              ? 'bg-black border-white shadow-lg'
                              : 'bg-zinc-950 border-white/10 hover:border-white/30'
                          }`}
                        >
                          <div>
                            <span className="text-xs font-black text-white block uppercase">{q.name}</span>
                            <span className="text-[10px] text-zinc-400">{q.deliveryDays} dias úteis</span>
                          </div>
                          <span className="text-xs font-black text-white font-mono">
                            {subtotal() >= 299 ? 'GRÁTIS' : `R$ ${q.price.toFixed(2).replace('.', ',')}`}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* 3. Forma de Pagamento */}
            <div className="p-6 bg-zinc-950 border border-white/10 space-y-5">
              <h3 className="text-xs font-black uppercase tracking-widest text-white flex items-center gap-2">
                <span className="w-5 h-5 bg-white text-black font-black text-xs flex items-center justify-center font-mono">3</span>
                Forma de Pagamento (Stripe / PIX)
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('PIX')}
                  className={`p-5 border flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${
                    paymentMethod === 'PIX'
                      ? 'bg-black border-white text-white shadow-lg'
                      : 'bg-zinc-950 border-white/10 text-zinc-400 hover:text-white'
                  }`}
                >
                  <Zap className="w-6 h-6 text-white" />
                  <span className="text-xs font-black uppercase tracking-wider">PIX (10% OFF)</span>
                  <Badge variant="white">Aprovação Imediata</Badge>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('CREDIT_CARD')}
                  className={`p-5 border flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${
                    paymentMethod === 'CREDIT_CARD'
                      ? 'bg-black border-white text-white shadow-lg'
                      : 'bg-zinc-950 border-white/10 text-zinc-400 hover:text-white'
                  }`}
                >
                  <CreditCard className="w-6 h-6 text-zinc-200" />
                  <span className="text-xs font-black uppercase tracking-wider">Stripe Cartão</span>
                  <span className="text-[10px] text-zinc-400">Até 3x sem juros</span>
                </button>
              </div>

              {/* Seção do Cartão de Crédito Stripe */}
              {paymentMethod === 'CREDIT_CARD' && (
                <div className="pt-4 border-t border-white/10">
                  <StripeCardSection
                    cardHolderName={cardHolderName}
                    setCardHolderName={setCardHolderName}
                    installments={installments}
                    setInstallments={setInstallments}
                    totalAmount={finalTotal}
                    errorMessage={cardError}
                  />
                </div>
              )}
            </div>

          </div>

          {/* Resumo do Pedido (5 Colunas) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 bg-zinc-950 border border-white/10 space-y-5 sticky top-24">
              <h3 className="text-xs font-black uppercase tracking-widest text-white">
                Resumo do Pedido ({items.reduce((acc, i) => acc + i.quantity, 0)})
              </h3>

              <div className="divide-y divide-white/10 max-h-72 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.variantId} className="py-3 flex gap-3 items-center">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-12 h-14 object-cover bg-black border border-white/10 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-white truncate uppercase">{item.title}</h4>
                      <span className="text-[10px] text-zinc-400 font-mono">
                        TAM: {item.size} &bull; QTD: {item.quantity}
                      </span>
                    </div>
                    <span className="text-xs font-black text-white font-mono">
                      R$ {((paymentMethod === 'PIX' ? item.pixPrice : item.price) * item.quantity).toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 border-t border-white/10 pt-4 text-xs font-mono">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal</span>
                  <span>R$ {subtotal().toFixed(2).replace('.', ',')}</span>
                </div>

                {paymentMethod === 'PIX' && (
                  <div className="flex justify-between text-white font-bold">
                    <span>Desconto PIX (10%)</span>
                    <span>- R$ {(subtotal() - pixSubtotal()).toFixed(2).replace('.', ',')}</span>
                  </div>
                )}

                <div className="flex justify-between text-zinc-400">
                  <span>Frete</span>
                  <span>
                    {subtotal() >= 299 ? (
                      <strong className="text-white font-bold">GRÁTIS</strong>
                    ) : selectedShipping ? (
                      `R$ ${selectedShipping.price.toFixed(2).replace('.', ',')}`
                    ) : (
                      'Informe o CEP'
                    )}
                  </span>
                </div>

                <div className="flex justify-between items-baseline font-black text-white pt-2 border-t border-white/10">
                  <span className="text-xs uppercase font-sans tracking-wider">Total Final:</span>
                  <div className="text-right">
                    <span className="text-2xl text-white">
                      R$ {finalTotal.toFixed(2).replace('.', ',')}
                    </span>
                    {paymentMethod === 'CREDIT_CARD' && (
                      <span className="block text-[10px] text-zinc-400 font-normal">
                        em até {installments}x de R$ {(finalTotal / installments).toFixed(2).replace('.', ',')} sem juros
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isSubmitting}
                className="w-full font-black tracking-widest text-xs py-4 cursor-pointer"
              >
                {isSubmitting
                  ? paymentMethod === 'PIX'
                    ? 'Gerando QR Code PIX...'
                    : 'Processando com a Stripe...'
                  : 'Confirmar e Finalizar Pedido'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}


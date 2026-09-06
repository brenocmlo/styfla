import React from 'react';
import { getAuthenticatedCustomer } from '@/lib/customerAuth';
import { CustomerAuthForms } from '@/components/auth/CustomerAuthForms';
import { CustomerDashboardView } from '@/components/auth/CustomerDashboardView';

export default async function CustomerAccountPage() {
  const customer = await getAuthenticatedCustomer();

  if (!customer) {
    return (
      <div className="min-h-screen bg-[#000000] text-[#FFFFFF]">
        <CustomerAuthForms />
      </div>
    );
  }

  // Prepara DTO serializável do cliente logado
  const customerData = {
    id: customer.id,
    name: customer.name,
    email: customer.email,
    phone: customer.phone || '',
    cpf: customer.cpf || '',
    createdAt: customer.createdAt.toISOString(),
    addresses: customer.addresses.map((a) => ({
      id: a.id,
      title: a.title || 'Endereço',
      recipient: a.recipient,
      street: a.street,
      number: a.number,
      complement: a.complement || '',
      neighborhood: a.neighborhood,
      city: a.city,
      state: a.state,
      zipCode: a.zipCode,
      isDefault: a.isDefault,
    })),
    orders: customer.orders.map((o) => ({
      id: o.id,
      orderNumber: `STY-${o.orderNumber}`,
      date: new Date(o.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }),
      status: o.status,
      statusText: o.status === 'DELIVERED' ? 'Entregue' : o.status === 'SHIPPED' ? 'Em Trânsito' : 'Em Processamento',
      total: Number(o.totalAmount),
      paymentMethod: o.payment?.method || 'PIX',
      trackingCode: o.trackingCode || undefined,
      carrier: o.shippingCarrier || undefined,
      items: o.items.map((i) => ({
        title: i.productName,
        size: i.variantInfo,
        quantity: i.quantity,
        price: Number(i.unitPrice),
        image: i.variant?.product?.images[0]?.url || '/products/rash-guard-preta-frente.jpg',
      })),
    })),
  };

  return (
    <div className="min-h-screen bg-[#000000] text-[#FFFFFF] py-10 px-6">
      <CustomerDashboardView customer={customerData} />
    </div>
  );
}

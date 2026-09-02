'use client';

import React, { useState } from 'react';
import { notFound, useParams, useRouter } from 'next/navigation';
import { getProductBySlug } from '@/lib/products';
import { useCart } from '@/hooks/useCart';
import { SizeGuideModal } from '@styfla/ui';
import { ArrowLeft } from 'lucide-react';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductPurchasePanel } from '@/components/product/ProductPurchasePanel';
import { ProductTechSpecs } from '@/components/product/ProductTechSpecs';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  const { addItem, openCart } = useCart();

  const handleAddToCart = () => {
    addItem({
      variantId: selectedVariant.id,
      productId: product.id,
      title: product.name,
      size: selectedVariant.size,
      price: product.price,
      pixPrice: product.pixPrice,
      imageUrl: product.images[0],
      ibjjfRank: product.ibjjfRank === 'default' ? 'NONE' : 'BLACK',
      quantity: 1,
    });
    openCart();
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push('/checkout');
  };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://styfla.com.br';
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images.map((img) => (img.startsWith('http') ? img : `${siteUrl}${img}`)),
    description: product.description,
    sku: selectedVariant.id,
    brand: {
      '@type': 'Brand',
      name: 'STYFLA',
    },
    offers: {
      '@type': 'Offer',
      url: `${siteUrl}/produto/${product.slug}`,
      priceCurrency: 'BRL',
      price: product.pixPrice.toFixed(2),
      priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      itemCondition: 'https://schema.org/NewCondition',
      availability: selectedVariant.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'STYFLA',
      },
    },
  };

  return (
    <div className="min-h-screen bg-[#000000] text-[#FFFFFF] pb-24">
      {/* Schema.org JSON-LD para Rich Snippets no Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      {/* Top Breadcrumb & Back */}
      <div className="max-w-7xl mx-auto px-6 py-4 border-b border-white/10 flex items-center justify-between text-xs text-zinc-400">
        <a href="/" className="flex items-center gap-1.5 hover:text-white transition-colors uppercase font-bold text-[11px]">
          <ArrowLeft className="w-3.5 h-3.5" /> Voltar ao Catálogo
        </a>
        <span className="text-[11px] font-mono uppercase text-zinc-500">
          {product.category} &bull; SKU: {selectedVariant.id}
        </span>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          <ProductGallery
            images={product.images}
            productName={product.name}
            ibjjfRank={product.ibjjfRank}
            ibjjfText={product.ibjjfText}
            selectedImage={selectedImage}
            onSelectImage={setSelectedImage}
          />

          <ProductPurchasePanel
            product={product}
            selectedVariant={selectedVariant}
            onSelectVariant={setSelectedVariant}
            onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
            onBuyNow={handleBuyNow}
            onAddToCart={handleAddToCart}
          />
        </div>

        <ProductTechSpecs techSpecs={product.techSpecs} features={product.features} />
      </main>

      {/* Modal Guia de Medidas */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />
    </div>
  );
}

'use client';

import { Badge } from '@styfla/ui';
import type { ProductDetail } from '@/lib/products';

interface ProductGalleryProps {
  images: string[];
  productName: string;
  ibjjfRank: ProductDetail['ibjjfRank'];
  ibjjfText: string;
  selectedImage: string;
  onSelectImage: (image: string) => void;
}

export function ProductGallery({
  images,
  productName,
  ibjjfRank,
  ibjjfText,
  selectedImage,
  onSelectImage,
}: ProductGalleryProps) {
  return (
    <div className="md:col-span-7 space-y-4">
      <div className="relative aspect-[4/5] bg-zinc-950 rounded-none overflow-hidden border border-white/15 shadow-2xl">
        <img src={selectedImage} alt={productName} className="w-full h-full object-cover" />
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <Badge variant="white">IBJJF APPROVED</Badge>
          <Badge variant={ibjjfRank}>{ibjjfText}</Badge>
        </div>
      </div>

      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => onSelectImage(img)}
              className={`relative w-20 aspect-square overflow-hidden border-2 transition-all shrink-0 bg-zinc-950 cursor-pointer ${
                selectedImage === img
                  ? 'border-white opacity-100'
                  : 'border-white/10 opacity-50 hover:opacity-100'
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

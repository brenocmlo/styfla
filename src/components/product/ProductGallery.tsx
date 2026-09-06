'use client';

import { Badge } from '@/components/ui';

interface ProductGalleryProps {
  images: string[];
  productName: string;
  ibjjfRank: string;
  ibjjfText: string;
  selectedImage: string;
  onSelectImage: (image: string) => void;
}

export function ProductGallery({
  images,
  productName,
  ibjjfText,
  selectedImage,
  onSelectImage,
}: ProductGalleryProps) {
  return (
    <div className="md:col-span-7 space-y-4">
      <div className="relative aspect-[4/5] bg-zinc-950 rounded-none overflow-hidden border border-white/15 shadow-2xl">
        <img src={selectedImage} alt={productName} className="w-full h-full object-cover" />
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <Badge variant="white">NO-GI PERFORMANCE</Badge>
          <Badge variant="outline" className="bg-black/80 backdrop-blur-sm text-white">
            {ibjjfText || 'High Performance'}
          </Badge>
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

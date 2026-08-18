import { RotateCcw, Truck } from 'lucide-react';
import { EXCHANGE_POLICY, SHIPPING_POLICY } from '@/lib/policies';

export function ProductLogistics() {
  return (
    <div className="p-5 bg-zinc-950 border border-white/10 space-y-3">
      <span className="text-xs font-bold uppercase text-white flex items-center gap-1.5 tracking-wider">
        <Truck className="w-4 h-4 text-white" /> Logística
      </span>
      <div className="flex items-start gap-2.5 text-xs text-zinc-300">
        <Truck className="w-4 h-4 text-white shrink-0 mt-0.5" />
        <span>
          <strong>{SHIPPING_POLICY.dispatchLabel}:</strong> {SHIPPING_POLICY.dispatchDescription}
        </span>
      </div>
      <div className="flex items-start gap-2.5 text-xs text-zinc-300">
        <RotateCcw className="w-4 h-4 text-white shrink-0 mt-0.5" />
        <span>
          <strong>{EXCHANGE_POLICY.windowLabel}:</strong> {EXCHANGE_POLICY.windowDescription}
        </span>
      </div>
    </div>
  );
}

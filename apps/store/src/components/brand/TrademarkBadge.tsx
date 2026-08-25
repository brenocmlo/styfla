interface TrademarkBadgeProps {
  size?: 'xs' | 'sm' | 'md';
  className?: string;
}

const SIZE_CLASSES = {
  xs: 'text-[7px]',
  sm: 'text-[9px]',
  md: 'text-[11px]',
};

/** Registered trademark mark (®) — only for marks with a granted INPI/USPTO registration. */
export function TrademarkBadge({ size = 'sm', className = '' }: TrademarkBadgeProps) {
  return (
    <span className={`font-bold leading-none select-none ${SIZE_CLASSES[size]} ${className}`}>
      ®
    </span>
  );
}

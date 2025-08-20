'use client';

import * as LabelPrimitive from '@radix-ui/react-label';

import { cn } from '@/shared/lib/shadcnUtils';

interface LabelProps extends React.ComponentProps<'label'> {}

export default function Label({ className, ...restProps }: LabelProps) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        'flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
        className,
      )}
      {...restProps}
    />
  );
}

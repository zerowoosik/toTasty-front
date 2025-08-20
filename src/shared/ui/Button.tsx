import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/shared/lib/shadcnUtils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
        danger: 'bg-danger text-secondary shadow-xs hover:bg-danger/90',
        destructive:
          'bg-destructive text-secondary shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        secondary: 'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        login: 'bg-[#FEE502] shadow-sm hover:bg-[#FFD900] cursor-pointer',
        findFilterClicked: 'bg-foreground text-secondary text-sm font-medium',
        calendarBtn1:
          'w-[118px] h-[40px] bg-background text-sm font-semibold text-primary border border-primary rounded-xl',
        calendarBtn2:
          'w-[118px] h-[40px] bg-primary text-sm font-semibold text-background rounded-xl',
        outlinePrimary:
          'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-primary/60 dark:hover:bg-primary/30 border-primary text-primary',
        outlineDanger:
          'border bg-background shadow-xs hover:bg-danger/20 dark:bg-input/30 dark:border-danger/60 dark:hover:bg-danger/30 border-danger text-danger',
        hidden: '',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
        findFilterSize: 'min-w-[57px] h-[40px] rounded-xl px-4 mr-2',
        hidden: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  disabled,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }), {
        'bg-muted/60 text-muted-foreground border-muted cursor-not-allowed': disabled,
      })}
      disabled={disabled}
      {...props}
    />
  );
}

export { Button, buttonVariants };

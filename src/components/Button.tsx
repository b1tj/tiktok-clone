import { cva, VariantProps } from 'class-variance-authority'
import React from 'react'
import { twMerge } from 'tailwind-merge'

const buttonStyles = cva('button', {
  variants: {
    intent: {
      primary: [
        'bg-white',
        'hover:bg-primary-hover',
        'text-primary',
        'border-primary',
        'border',
        'font-semibold',
        'rounded-[2px]',
      ],
      ghost: [
        'font-semibold',
        'hover:bg-ghost',
        'border',
        'border-ghost-border',
        'py-0',
        'flex',
        'items-center',
        'shrink-0',
        'gap-2',
        'rounded-[2px]',
        'font-[16px]',
      ],
      fill: [
        'bg-primary',
        'text-white',
        'hover:bg-gradient-to-b',
        'from-[rgba(0,0,0,0.06)]',
        'to-[rgba(0,0,0,0.06)]',
        'font-semibold',
        'rounded-[4px]',
        'font-bold',
        'text-[16px]',
        'boder-none',
      ],
      round: [
        'rounded-full',
        'border-none',
        'flex items-center justify-center',
      ],
      icon: [],
      action: [
        'rounded-full',
        'border-none',
        'flex items-center justify-center',
        'bg-input',
        'p-[10px]',
      ],
    },
    size: {
      unset: [],
      small: ['px-4', 'py-[1px]', 'h-[36px]'],
      medium: ['p-2', 'rounded-[2px]', 'h-[48px]'],
    },
    fontWeight: {
      semibold: ['font-semibold'],
      bold: ['font-bold'],
    },
  },

  defaultVariants: {
    intent: 'primary',
    size: 'small',
    fontWeight: 'semibold',
  },
})

export type ButtonProps = VariantProps<typeof buttonStyles> &
  React.ButtonHTMLAttributes<HTMLButtonElement>

export function Button({
  className,
  intent,
  size,
  fontWeight,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={twMerge(buttonStyles({ intent, size, fontWeight }), className)}
    />
  )
}

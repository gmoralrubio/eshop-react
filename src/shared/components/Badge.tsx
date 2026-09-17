import type { ReactElement } from 'react'
import { twMerge } from 'tailwind-merge'

type BadgeColorVariant =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'success'
  | 'ghost'
type BadgeStyleVariant = 'outline' | 'soft'
type BadgeSizeVariant = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

interface Props {
  readonly children: ReactElement | string
  readonly className?: string
  color?: BadgeColorVariant | null
  style?: BadgeStyleVariant | null
  size?: BadgeSizeVariant | null
}

export const Badge: React.FC<Props> = ({
  children,
  className,
  color,
  style,
  size,
}) => {
  const colorVariant = color ? `badge-${color}` : null
  const styleVariant = style ? `badge-${style}` : null
  const sizeVariant = size ? `badge-${size}` : null

  return (
    <div
      className={twMerge(
        'badge',
        colorVariant,
        styleVariant,
        sizeVariant,
        className
      )}
    >
      {children}
    </div>
  )
}

import type { ReactNode, ElementType } from 'react'

export interface TypographyProps {
  children: ReactNode
  as?: ElementType
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'small' | 'caption'
  color?: 'muted' | 'primary' | 'success' | 'error'
  align?: 'center' | 'right'
  className?: string
}

import cn from 'classnames'
import type { TypographyProps } from './interface'
import './style.scss'

export const Typography = ({
  children,
  as: Tag = 'p',
  variant = 'body',
  color,
  align,
  className = ''
}: TypographyProps) => (
  <Tag
    className={cn(
      'typo',
      `typo--${variant}`,
      color && `typo--${color}`,
      align && `typo--${align}`,
      className
    )}>
    {children}
  </Tag>
)

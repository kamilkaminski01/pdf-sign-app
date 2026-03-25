import cn from 'classnames'
import type { ButtonProps } from './interface'
import './style.scss'

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  ...rest
}: ButtonProps) => (
  <button
    className={cn('btn', `btn--${variant}`, `btn--${size}`, fullWidth && 'btn--full', className)}
    {...rest}>
    {children}
  </button>
)

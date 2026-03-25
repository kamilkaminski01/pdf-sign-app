import type { ProgressBarProps } from './interface'
import './style.scss'

export const ProgressBar = ({ value = 0, label = '' }: ProgressBarProps) => {
  const clamped = Math.min(100, Math.max(0, value))

  return (
    <div
      className="progress-bar"
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}>
      <div className="progress-bar__track">
        <div className="progress-bar__fill" style={{ width: `${clamped}%` }} />
      </div>
      {label && <span className="progress-bar__label">{label}</span>}
    </div>
  )
}

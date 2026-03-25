import cn from 'classnames'
import { Icon } from 'components/atoms/Icon'
import { Typography } from 'components/atoms/Typography'
import type { IconName } from 'components/atoms/Icon/interface'
import type { StatusMessageProps } from './interface'
import './style.scss'

const typeConfig: Record<string, { icon: IconName; modifier: string }> = {
  info: { icon: 'file', modifier: 'status-message--info' },
  loading: { icon: 'send', modifier: 'status-message--loading' },
  success: { icon: 'check', modifier: 'status-message--success' },
  error: { icon: 'alertCircle', modifier: 'status-message--error' }
}

export const StatusMessage = ({ type = 'info', message, detail }: StatusMessageProps) => {
  const { icon, modifier } = typeConfig[type]

  return (
    <div className={cn('status-message', modifier)}>
      <div className="status-message__icon">
        <Icon name={icon} size={20} />
      </div>
      <div className="status-message__content">
        <Typography variant="small">{message}</Typography>
        {detail && (
          <Typography variant="caption" color="muted">
            {detail}
          </Typography>
        )}
      </div>
    </div>
  )
}

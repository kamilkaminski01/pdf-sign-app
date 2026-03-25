import cn from 'classnames'
import { Button } from 'components/atoms/Button'
import { Icon } from 'components/atoms/Icon'
import { ProgressBar } from 'components/atoms/ProgressBar'
import { StatusMessage } from 'components/molecules/StatusMessage'
import { Typography } from 'components/atoms/Typography'
import type { SigningSectionProps } from './interface'
import './style.scss'

export const SigningSection = ({ file, status, progress, onSign, error }: SigningSectionProps) => (
  <section className={cn('signing-section', !file && 'signing-section--disabled')}>
    <div className="signing-section__header">
      <div className={cn('signing-section__step', !file && 'signing-section__step--inactive')}>
        2
      </div>
      <Typography as="h2" variant="h3">
        Sign Document
      </Typography>
    </div>

    {(status === 'idle' || status === 'uploaded') && file && (
      <div className="signing-section__action">
        <Button onClick={onSign} fullWidth size="lg">
          <Icon name="pen" size={20} />
          Send for Signing
        </Button>
      </div>
    )}

    {status === 'signing' && (
      <div className="signing-section__progress">
        <ProgressBar value={progress} label="Signing in progress..." />
        <StatusMessage
          type="loading"
          message="Processing your document"
          detail="The server is applying a digital signature..."
        />
      </div>
    )}

    {status === 'signed' && (
      <StatusMessage
        type="success"
        message="Document signed successfully!"
        detail="Your PDF has been digitally signed and is ready to view."
      />
    )}

    {status === 'error' && (
      <div className="signing-section__error">
        <StatusMessage
          type="error"
          message="Signing failed"
          detail={error || 'An unexpected error occurred. Please try again.'}
        />
        <Button variant="secondary" onClick={onSign} size="sm">
          <Icon name="refresh" size={16} />
          Retry
        </Button>
      </div>
    )}

    {!file && (
      <Typography variant="small" color="muted">
        Upload a PDF first to enable signing.
      </Typography>
    )}
  </section>
)

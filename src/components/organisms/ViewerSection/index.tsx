import cn from 'classnames'
import { PDFViewer } from 'components/molecules/PDFViewer'
import { Button } from 'components/atoms/Button'
import { Icon } from 'components/atoms/Icon'
import { Typography } from 'components/atoms/Typography'
import type { ViewerSectionProps } from './interface'
import './style.scss'

export const ViewerSection = ({ signedPdfData, onDownload, onReset }: ViewerSectionProps) => (
  <section className={cn('viewer-section', !signedPdfData && 'viewer-section--disabled')}>
    <div className="viewer-section__header">
      <div
        className={cn('viewer-section__step', !signedPdfData && 'viewer-section__step--inactive')}>
        3
      </div>
      <Typography as="h2" variant="h3">
        View Signed PDF
      </Typography>
    </div>

    {signedPdfData ? (
      <>
        <PDFViewer pdfData={signedPdfData} />
        <div className="viewer-section__actions">
          <Button onClick={onDownload} fullWidth>
            <Icon name="download" size={20} />
            Download Signed PDF
          </Button>
          <Button variant="secondary" onClick={onReset} fullWidth>
            <Icon name="refresh" size={18} />
            Sign Another Document
          </Button>
        </div>
      </>
    ) : (
      <Typography variant="small" color="muted">
        The signed document will appear here once signing is complete.
      </Typography>
    )}
  </section>
)

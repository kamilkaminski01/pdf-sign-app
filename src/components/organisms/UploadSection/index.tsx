import { UploadArea } from 'components/molecules/UploadArea'
import { StatusMessage } from 'components/molecules/StatusMessage'
import { Typography } from 'components/atoms/Typography'
import type { UploadSectionProps } from './interface'
import './style.scss'

const formatSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export const UploadSection = ({ file, onFileSelect, disabled }: UploadSectionProps) => (
  <section className="upload-section">
    <div className="upload-section__header">
      <div className="upload-section__step">1</div>
      <Typography as="h2" variant="h3">
        Upload PDF
      </Typography>
    </div>

    <UploadArea onFileSelect={onFileSelect} disabled={disabled} />

    {file && (
      <div className="upload-section__file-info">
        <StatusMessage type="info" message={file.name} detail={formatSize(file.size)} />
      </div>
    )}
  </section>
)

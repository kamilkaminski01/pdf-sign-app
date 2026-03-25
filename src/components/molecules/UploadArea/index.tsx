import { useState, useCallback, type DragEvent } from 'react'
import cn from 'classnames'
import { Icon } from 'components/atoms/Icon'
import { FileInput } from 'components/atoms/FileInput'
import { Typography } from 'components/atoms/Typography'
import type { UploadAreaProps } from './interface'
import './style.scss'

export const UploadArea = ({ onFileSelect, disabled = false }: UploadAreaProps) => {
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDragOver = useCallback(
    (e: DragEvent) => {
      e.preventDefault()
      if (!disabled) setIsDragOver(true)
    },
    [disabled]
  )

  const handleDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)
      if (disabled) return

      const file = e.dataTransfer.files?.[0]
      if (file?.type === 'application/pdf') onFileSelect(file)
    },
    [disabled, onFileSelect]
  )

  return (
    <div
      className={cn(
        'upload-area',
        isDragOver && 'upload-area--drag-over',
        disabled && 'upload-area--disabled'
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}>
      <div className="upload-area__icon">
        <Icon name="upload" size={40} />
      </div>
      <Typography variant="body" color="muted" align="center">
        Drag & drop your PDF here, or
      </Typography>
      <FileInput onFileSelect={onFileSelect} disabled={disabled} />
      <Typography variant="caption" color="muted" align="center">
        Supports PDF files up to 10 MB
      </Typography>
    </div>
  )
}

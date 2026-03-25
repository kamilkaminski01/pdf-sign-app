import { useState, useCallback } from 'react'
import { MainTemplate } from 'components/templates/MainTemplate'
import { UploadSection } from 'components/organisms/UploadSection'
import { SigningSection } from 'components/organisms/SigningSection'
import { ViewerSection } from 'components/organisms/ViewerSection'
import { signPdf } from 'api/mockSigningServer'
import type { AppStatus } from 'components/organisms/SigningSection/interface'
import './style.scss'

export const HomePage = () => {
  const [file, setFile] = useState<File | null>(null)
  const [status, setStatus] = useState<AppStatus>('idle')
  const [progress, setProgress] = useState(0)
  const [signedPdfData, setSignedPdfData] = useState<ArrayBuffer | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileSelect = useCallback((selected: File) => {
    if (selected.type !== 'application/pdf') {
      setError('Please select a valid PDF file.')
      setStatus('error')
      return
    }

    if (selected.size > 10 * 1024 * 1024) {
      setError('File size exceeds 10 MB limit.')
      setStatus('error')
      return
    }

    setFile(selected)
    setStatus('uploaded')
    setSignedPdfData(null)
    setError(null)
    setProgress(0)
  }, [])

  const handleSign = useCallback(async () => {
    if (!file) return

    setStatus('signing')
    setProgress(0)
    setError(null)

    try {
      const buffer = await file.arrayBuffer()
      const signed = await signPdf(buffer, setProgress)
      setSignedPdfData(signed)
      setStatus('signed')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signing failed.')
      setStatus('error')
    }
  }, [file])

  const handleDownload = useCallback(() => {
    if (!signedPdfData) return

    const blob = new Blob([signedPdfData], { type: 'application/pdf' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `signed_${file?.name || 'document.pdf'}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [signedPdfData, file])

  const handleReset = useCallback(() => {
    setFile(null)
    setStatus('idle')
    setProgress(0)
    setSignedPdfData(null)
    setError(null)
  }, [])

  return (
    <MainTemplate>
      <div className="home-page">
        <UploadSection
          file={file}
          onFileSelect={handleFileSelect}
          disabled={status === 'signing'}
        />
        <div className="home-page__divider" />
        <SigningSection
          file={file}
          status={status}
          progress={progress}
          onSign={handleSign}
          error={error}
        />
        <div className="home-page__divider" />
        <ViewerSection
          signedPdfData={signedPdfData}
          onDownload={handleDownload}
          onReset={handleReset}
        />
      </div>
    </MainTemplate>
  )
}

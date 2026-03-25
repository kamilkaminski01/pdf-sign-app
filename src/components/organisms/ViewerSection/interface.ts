export interface ViewerSectionProps {
  signedPdfData: ArrayBuffer | null
  onDownload: () => void
  onReset: () => void
}

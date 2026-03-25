export interface UploadSectionProps {
  file: File | null
  onFileSelect: (file: File) => void
  disabled: boolean
}

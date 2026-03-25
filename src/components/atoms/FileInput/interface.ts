export interface FileInputProps {
  onFileSelect: (file: File) => void
  accept?: string
  disabled?: boolean
}

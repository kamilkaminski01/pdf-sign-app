import { useRef, type ChangeEvent } from 'react'
import type { FileInputProps } from './interface'
import './style.scss'

export const FileInput = ({ onFileSelect, accept = '.pdf', disabled = false }: FileInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) onFileSelect(file)
    e.target.value = ''
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        disabled={disabled}
        className="file-input__native"
        aria-label="Choose PDF file"
      />
      <button
        type="button"
        className="file-input__trigger"
        onClick={() => inputRef.current?.click()}
        disabled={disabled}>
        Choose PDF File
      </button>
    </>
  )
}

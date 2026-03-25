export type AppStatus = 'idle' | 'uploaded' | 'signing' | 'signed' | 'error'

export interface SigningSectionProps {
  file: File | null
  status: AppStatus
  progress: number
  onSign: () => void
  error: string | null
}

export interface StatusMessageProps {
  type?: 'info' | 'loading' | 'success' | 'error'
  message: string
  detail?: string
}

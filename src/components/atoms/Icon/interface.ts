export type IconName =
  | 'upload'
  | 'file'
  | 'check'
  | 'send'
  | 'download'
  | 'refresh'
  | 'alertCircle'
  | 'pen'

export interface IconProps {
  name: IconName
  size?: number
  className?: string
}

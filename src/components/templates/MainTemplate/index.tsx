import { Typography } from 'components/atoms/Typography'
import { Icon } from 'components/atoms/Icon'
import type { MainTemplateProps } from './interface'
import './style.scss'

export const MainTemplate = ({ children }: MainTemplateProps) => (
  <div className="main-template">
    <header className="main-template__header">
      <div className="main-template__logo">
        <Icon name="pen" size={24} />
        <Typography as="span" variant="h3">
          PDF Sign
        </Typography>
      </div>
    </header>

    <main className="main-template__content">{children}</main>

    <footer className="main-template__footer">
      <Typography variant="caption" color="muted" align="center">
        PDF Sign &mdash; Mobile Upload & Sign Demo
      </Typography>
    </footer>
  </div>
)

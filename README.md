# PDF Sign

Mobile-friendly web app for uploading a PDF, sending it to a mock signing server, and viewing the signed result.

## Tech Stack

- React 18, TypeScript, Vite
- SCSS with BEM naming
- Atomic design (atoms → molecules → organisms → templates → pages)
- `pdfjs-dist` for in-browser PDF rendering

## Getting Started

```bash
npm install
npm run dev
```

## Scripts

| Command          | Description              |
| ---------------- | ------------------------ |
| `npm run dev`    | Start dev server         |
| `npm run build`  | Type-check and build     |
| `npm run lint`   | Run ESLint               |
| `npm run format` | Format with Prettier     |

## Project Structure

```
src/
├── api/                        # Mock signing server
├── components/
│   ├── atoms/                  # Button, FileInput, Icon, ProgressBar, Typography
│   ├── molecules/              # UploadArea, StatusMessage, PDFViewer
│   ├── organisms/              # UploadSection, SigningSection, ViewerSection
│   ├── templates/              # MainTemplate
│   └── pages/                  # HomePage
└── styles/                     # Global styles, SCSS variables
```

Each component follows the pattern:

```
ComponentName/
├── index.tsx
├── interface.ts
└── style.scss
```

## Import Aliases

`tsconfig.json` sets `baseUrl` to `src/`, so imports look like:

```ts
import { Button } from 'components/atoms/Button'
```

Resolved at build time by `vite-tsconfig-paths`.

## How It Works

1. **Upload** — pick or drag-and-drop a PDF (max 10 MB)
2. **Sign** — sends the file to a mock server that simulates signing with a progress indicator
3. **View** — renders the signed PDF in-browser with page navigation and zoom, with an option to download

import { useEffect, useRef, useState } from 'react'
import * as pdfjsLib from 'pdfjs-dist'
import { Typography } from 'components/atoms/Typography'
import { Button } from 'components/atoms/Button'
import type { PDFViewerProps } from './interface'
import './style.scss'

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`

export const PDFViewer = ({ pdfData }: PDFViewerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [pdfDoc, setPdfDoc] = useState<pdfjsLib.PDFDocumentProxy | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [scale, setScale] = useState(1)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!pdfData) return

    pdfjsLib
      .getDocument({ data: pdfData })
      .promise.then((doc) => {
        setPdfDoc(doc)
        setTotalPages(doc.numPages)
        setCurrentPage(1)
        setError(null)
      })
      .catch(() => setError('Failed to load PDF'))
  }, [pdfData])

  useEffect(() => {
    if (!pdfDoc || !canvasRef.current) return

    pdfDoc.getPage(currentPage).then((page) => {
      const canvas = canvasRef.current!
      const ctx = canvas.getContext('2d')!
      const containerWidth = canvas.parentElement!.clientWidth - 32
      const viewport = page.getViewport({ scale: 1 })
      const fitScale = containerWidth / viewport.width
      const scaledViewport = page.getViewport({ scale: fitScale * scale })

      canvas.width = scaledViewport.width
      canvas.height = scaledViewport.height

      page.render({ canvasContext: ctx, viewport: scaledViewport })
    })
  }, [pdfDoc, currentPage, scale])

  if (error) {
    return (
      <div className="pdf-viewer__error">
        <Typography color="error">{error}</Typography>
      </div>
    )
  }

  return (
    <div className="pdf-viewer">
      <div className="pdf-viewer__toolbar">
        <div className="pdf-viewer__nav">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage <= 1}>
            Prev
          </Button>
          <Typography variant="small">
            {currentPage} / {totalPages}
          </Typography>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage >= totalPages}>
            Next
          </Button>
        </div>
        <div className="pdf-viewer__zoom">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setScale((s) => Math.max(0.5, s - 0.25))}>
            -
          </Button>
          <Typography variant="caption">{Math.round(scale * 100)}%</Typography>
          <Button variant="ghost" size="sm" onClick={() => setScale((s) => Math.min(3, s + 0.25))}>
            +
          </Button>
        </div>
      </div>
      <div className="pdf-viewer__canvas-wrap">
        <canvas ref={canvasRef} className="pdf-viewer__canvas" />
      </div>
    </div>
  )
}

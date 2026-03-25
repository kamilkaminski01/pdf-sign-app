const DELAY = 3000

function simulateProgress(
  onProgress: (value: number) => void,
  from: number,
  to: number,
  duration: number
): Promise<void> {
  return new Promise((resolve) => {
    const steps = 10
    const interval = duration / steps
    let current = 0

    const timer = setInterval(() => {
      current++
      onProgress(Math.round(from + ((to - from) * current) / steps))

      if (current >= steps) {
        clearInterval(timer)
        resolve()
      }
    }, interval)
  })
}

export async function signPdf(
  pdfBytes: ArrayBuffer,
  onProgress: (value: number) => void
): Promise<ArrayBuffer> {
  if (!pdfBytes || pdfBytes.byteLength === 0) {
    throw new Error('No PDF data provided.')
  }

  await simulateProgress(onProgress, 0, 40, DELAY * 0.3)
  await simulateProgress(onProgress, 40, 80, DELAY * 0.5)
  await simulateProgress(onProgress, 80, 100, DELAY * 0.2)

  return pdfBytes
}

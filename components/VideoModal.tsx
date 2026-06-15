'use client'
import { useEffect, useState } from 'react'
import { X, AlertCircle } from 'lucide-react'

type VideoModalProps = {
  isOpen: boolean
  onClose: () => void
  processTitle: string
  videoUrl?: string
}

type FeedbackStatus = 'idle' | 'open' | 'sending' | 'sent' | 'error'

export default function VideoModal({ isOpen, onClose, processTitle, videoUrl }: VideoModalProps) {
  const [comment, setComment] = useState('')
  const [status, setStatus] = useState<FeedbackStatus>('idle')

  useEffect(() => {
    if (!isOpen) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [isOpen, onClose])

  const handleClose = () => {
    setComment('')
    setStatus('idle')
    onClose()
  }

  const submitFeedback = async () => {
    if (!comment.trim()) return
    setStatus('sending')
    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ processTitle, comment: comment.trim() }),
      })
      setStatus('sent')
      setComment('')
    } catch {
      setStatus('error')
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-carbon/70 px-4"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-xl w-full max-w-3xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-cloud">
          <h3 className="text-carbon font-semibold">{processTitle}</h3>
          <button
            onClick={handleClose}
            className="text-mid-gray hover:text-carbon transition-colors p-1 rounded"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6">
          {videoUrl ? (
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                src={videoUrl}
                className="absolute inset-0 w-full h-full rounded-lg"
                allowFullScreen
                allow="autoplay; fullscreen"
              />
            </div>
          ) : (
            <div className="h-64 bg-cloud rounded-lg flex items-center justify-center border border-dashed border-mid-gray">
              <span className="text-mid-gray">Video coming soon</span>
            </div>
          )}

          <div className="mt-4 pt-4 border-t border-cloud">
            {status === 'idle' && (
              <button
                onClick={() => setStatus('open')}
                className="inline-flex items-center gap-1.5 text-sm text-mid-gray hover:text-carbon transition-colors"
              >
                <AlertCircle size={14} />
                This isn&apos;t working
              </button>
            )}

            {status === 'open' && (
              <div className="space-y-3">
                <p className="text-sm text-carbon font-medium">What&apos;s the issue?</p>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Describe what isn't working…"
                  rows={3}
                  className="w-full px-3 py-2 text-sm border border-cloud rounded-lg text-carbon placeholder-mid-gray focus:outline-none focus:ring-2 focus:ring-scarlet resize-none"
                />
                <div className="flex items-center gap-3">
                  <button
                    onClick={submitFeedback}
                    disabled={!comment.trim()}
                    className="px-4 py-2 bg-scarlet text-cloud text-sm font-semibold rounded-lg hover:bg-[#e02900] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Send
                  </button>
                  <button
                    onClick={() => { setStatus('idle'); setComment('') }}
                    className="text-sm text-mid-gray hover:text-carbon transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {status === 'sending' && (
              <p className="text-sm text-mid-gray">Sending…</p>
            )}

            {status === 'sent' && (
              <p className="text-sm text-carbon">Thanks — we&apos;ve been notified and will look into it.</p>
            )}

            {status === 'error' && (
              <p className="text-sm text-scarlet">Something went wrong. Please try again.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

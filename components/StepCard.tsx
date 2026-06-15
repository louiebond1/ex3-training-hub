'use client'
import { useState, useEffect } from 'react'
import { ChevronDown, ChevronUp, Image as ImageIcon, X, ZoomIn } from 'lucide-react'
import Image from 'next/image'

type StepCardProps = {
  stepNumber: number
  description: string
  screenshot?: string
}

export default function StepCard({ stepNumber, description, screenshot }: StepCardProps) {
  const [open, setOpen] = useState(false)
  const [lightbox, setLightbox] = useState(false)

  useEffect(() => {
    if (!lightbox) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightbox(false) }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [lightbox])

  return (
    <>
      <div className="bg-white border border-cloud rounded-lg p-6">
        <div className="flex items-start gap-4">
          <div className="shrink-0 w-8 h-8 rounded-full bg-indigo-deep flex items-center justify-center">
            <span className="text-cloud text-sm font-semibold">{stepNumber}</span>
          </div>
          <div className="flex-1">
            <p className="text-carbon">{description}</p>
            <button
              onClick={() => setOpen((v) => !v)}
              className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-carbon border border-cloud rounded-md hover:border-mid-gray hover:bg-cloud transition-all"
            >
              <ImageIcon size={12} className="text-mid-gray" />
              {open ? 'Hide screenshot' : 'View screenshot'}
              {open ? <ChevronUp size={12} className="text-mid-gray" /> : <ChevronDown size={12} className="text-mid-gray" />}
            </button>
            {open && (
              <div className="mt-3 rounded-lg overflow-hidden border border-cloud">
                {screenshot ? (
                  <div
                    className="relative cursor-zoom-in group"
                    onClick={() => setLightbox(true)}
                  >
                    <Image
                      src={screenshot}
                      alt={`Step ${stepNumber} screenshot`}
                      width={900}
                      height={500}
                      className="w-full h-auto"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-carbon/0 group-hover:bg-carbon/10 transition-colors flex items-center justify-center">
                      <ZoomIn
                        size={28}
                        className="text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="h-44 bg-cloud flex items-center justify-center border border-dashed border-mid-gray rounded-lg">
                    <span className="text-mid-gray text-sm">Screenshot coming soon</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {lightbox && screenshot && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-carbon/85 p-4"
          onClick={() => setLightbox(false)}
        >
          <button
            onClick={() => setLightbox(false)}
            className="absolute top-4 right-4 text-cloud hover:text-mid-gray transition-colors"
          >
            <X size={24} />
          </button>
          <div
            className="relative max-w-6xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={screenshot}
              alt={`Step ${stepNumber} screenshot`}
              width={1400}
              height={900}
              className="w-full h-auto rounded-lg shadow-2xl"
              unoptimized
            />
          </div>
        </div>
      )}
    </>
  )
}

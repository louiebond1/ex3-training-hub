'use client'
import { useState } from 'react'
import { Play } from 'lucide-react'
import VideoModal from './VideoModal'

export default function ProcessClientSection({
  processTitle,
  videoUrl,
}: {
  processTitle: string
  videoUrl?: string
}) {
  const [videoOpen, setVideoOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setVideoOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-scarlet text-cloud text-sm font-semibold rounded-lg hover:bg-[#e02900] transition-colors shrink-0"
      >
        <Play size={15} />
        Watch Video
      </button>
      <VideoModal
        isOpen={videoOpen}
        onClose={() => setVideoOpen(false)}
        processTitle={processTitle}
        videoUrl={videoUrl}
      />
    </>
  )
}

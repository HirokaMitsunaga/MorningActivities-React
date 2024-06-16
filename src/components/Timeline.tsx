import { useState } from 'react'
import { PlusIcon } from '@heroicons/react/24/solid'
import { useQueryTimeline } from '../hooks/useQueryTimeline'
import { TimelineItem } from './TimelineItem'
import { TimelineModal } from './TimelineModal'

export const Timeline = () => {
  const [isTimelineModalOpen, setTimelineModalOpen] = useState(false)
  const { data } = useQueryTimeline()

  return (
    <div className="flex justify-center items-center flex-col min-h-screen text-gray-600 font-mono">
      <button
        className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-colors"
        onClick={() => setTimelineModalOpen(true)}
      >
        <PlusIcon className="h-5 w-5 mr-2" />
        投稿
      </button>
      <TimelineModal
        isOpen={isTimelineModalOpen}
        onClose={() => setTimelineModalOpen(false)}
      />
      <div className="w-5/6 sm:ml-5 md:ml-50 lg:ml-64">
        <ul className="w-5/6">
          {data?.map((timeline) => (
            <TimelineItem
              key={timeline.id}
              id={timeline.id}
              comment_count={timeline.comment_count}
              like_count={timeline.like_count}
              sentence={timeline.sentence}
              email={timeline.email}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

import React, { useEffect, useState } from 'react'
import { useQueryComment } from '../hooks/useQueryComment'
import { useParams } from 'react-router-dom'
import useCommentStore from '../store/commentStore'
import { TimelineCommentItem } from './TimelineCommentItem'
import { useQueryClient } from '@tanstack/react-query'
import { useQueryTimelineById } from '../hooks/useQueryTimelineById'
import { TimelineItem } from './TimelineItem'
import { PlusIcon } from '@heroicons/react/24/solid'
import { TimelineCommentModal } from './TimelineCommentModal'

export const TimelineComment = () => {
  // クエリパラメータでtimelineIdを受け取る
  const [isTimelineModalOpen, setTimelineModalOpen] = useState(false)
  const { editedComment } = useCommentStore()
  const { timelineId } = useParams<{ timelineId?: string }>()
  const numericTimelineId = parseInt(timelineId!, 10)
  const queryClient = useQueryClient()

  useEffect(() => {
    queryClient.invalidateQueries(['comments'])
  }, [numericTimelineId, queryClient])
  //クエリパラメータから取得したタイムラインIDをグローバルなstateとして保存する
  editedComment.timeline_id = numericTimelineId
  const { data, isLoading } = useQueryComment(numericTimelineId)
  const { data: timelineData, isLoading: isTimelineLoading } =
    useQueryTimelineById(numericTimelineId)
  if (!timelineId) {
    return <div>タイムラインIDが指定されていません。</div>
  }

  if (isLoading || isTimelineLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex justify-center items-center flex-col min-h-screen text-gray-600 font-mono">
      <button
        className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-colors"
        onClick={() => setTimelineModalOpen(true)}
      >
        <PlusIcon className="h-5 w-5 mr-2" />
        コメント
      </button>
      <TimelineCommentModal
        isOpen={isTimelineModalOpen}
        onClose={() => setTimelineModalOpen(false)}
      />
      <div className="w-5/6 sm:ml-5 md:ml-50 lg:ml-64">
        <TimelineItem
          key={timelineData?.id ?? 0}
          id={timelineData?.id ?? 0}
          comment_count={0}
          like_count={timelineData?.like_count ?? 0}
          sentence={timelineData?.sentence ?? ''}
          email={timelineData?.email ?? ''}
        />
      </div>

      <div className="w-5/6 sm:ml-5 md:ml-50 lg:ml-64">
        {data?.map((comment) => (
          <TimelineCommentItem
            key={comment.id}
            id={comment.id}
            timeline_id={comment.timeline_id}
            comment={comment.comment}
            like_count={comment.like_count}
            user_id={comment.user_id}
          />
        ))}
      </div>
    </div>
  )
}

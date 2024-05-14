import { FC, memo } from 'react'
import {
  PencilIcon,
  TrashIcon,
  HeartIcon,
  ChatBubbleOvalLeftIcon,
} from '@heroicons/react/24/outline'
import useTimelineStore from '../store/timelineStore'
import { Timeline } from '../types'
import { useMutateTimeline } from '../hooks/useMutateTimeline'
import { useNavigate } from 'react-router-dom'

//タスク１個１個に対する処理(更新か削除)
const TimelineItemMemo: FC<
  Omit<Timeline, 'created_at' | 'updated_at' | 'user_id'>
> = ({ id, sentence, email, comment_count, like_count }) => {
  const updateTimeline = useTimelineStore((state) => state.updateEditedTimeline)
  const { deleteTimelineMutation, toggleLikeMutation } = useMutateTimeline()
  const navigate = useNavigate()
  const handleTimelineClick = () => {
    navigate(`/timeline/${id}`)
  }
  return (
    <li
      className="my-3 p-4 shadow-lg rounded-lg bg-white cursor-pointer hover:bg-gray-100 flex flex-col"
      onClick={handleTimelineClick}
    >
      <div className="flex items-center mb-4">
        <img
          src="https://via.placeholder.com/40"
          alt="Profile"
          className="h-10 w-10 rounded-full mr-2"
        />
        <span className="flex-none font-bold text-gray-600">{email}</span>
      </div>
      <div className="flex-1 font-bold text-gray-800 mb-4">{sentence}</div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <ChatBubbleOvalLeftIcon
            className="h-5 w-5 mr-1 text-gray-500 hover:text-gray-700"
            onClick={(e) => {
              e.stopPropagation()
              alert(email)
            }}
          />
          <span className="font-bold text-gray-700">{comment_count}</span>
        </div>
        <div className="flex items-center">
          <HeartIcon
            className="h-5 w-5 mr-1 text-red-500 hover:text-red-700"
            onClick={(e) => {
              e.stopPropagation()
              toggleLikeMutation.mutate(id)
            }}
          />
          <span className="font-bold text-gray-700">{like_count}</span>
        </div>
        <div className="flex items-center">
          <PencilIcon
            className="h-5 w-5 mx-1 text-blue-500 hover:text-blue-700 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation()
              updateTimeline({
                id: id,
                sentence: sentence,
              })
            }}
          />
          <TrashIcon
            className="h-5 w-5 text-blue-500 hover:text-blue-700 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation()
              deleteTimelineMutation.mutate(id)
            }}
          />
        </div>
      </div>
    </li>
  )
}
export const TimelineItem = memo(TimelineItemMemo)

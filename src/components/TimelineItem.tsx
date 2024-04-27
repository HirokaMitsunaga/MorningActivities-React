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

//タスク１個１個に対する処理(更新か削除)
const TimelineItemMemo: FC<
  Omit<Timeline, 'created_at' | 'updated_at' | 'user_id'>
> = ({ id, sentence, email, comment_count, like_count }) => {
  const updateTimeline = useTimelineStore((state) => state.updateEditedTimeline)
  const { deleteTimelineMutation, toggleLikeMutation } = useMutateTimeline()
  return (
    <li className="my-3 p-4 shadow-lg rounded-lg flex items-center bg-white">
      <span className="font-bold mr-4">{sentence}</span>
      <span className="font-bold mr-4">{email}</span>
      <div className="flex items-center mr-4">
        <ChatBubbleOvalLeftIcon
          className="h-5 w-5 mr-1"
          onClick={() => {
            alert(email)
          }}
        />
        <span className="font-bold">{comment_count}</span>
      </div>
      <div className="flex items-center mr-4">
        <HeartIcon
          className="h-5 w-5 mr-1"
          onClick={() => {
            toggleLikeMutation.mutate(id)
          }}
        />
        <span className="font-bold">{like_count}</span>
      </div>
      <div className="flex ml-auto">
        <PencilIcon
          className="h-5 w-5 mx-1 text-blue-500 cursor-pointer"
          onClick={() => {
            //編集中のtaskをzustandを使ってグローバルなstateとして保持する
            //その後にupdateTaskMutationがどこかで実行されるのか？
            updateTimeline({
              id: id,
              sentence: sentence,
            })
          }}
        />
        <TrashIcon
          className="h-5 w-5 text-blue-500 cursor-pointer"
          onClick={() => {
            deleteTimelineMutation.mutate(id)
          }}
        />
      </div>
    </li>
  )
}
export const TimelineItem = memo(TimelineItemMemo)

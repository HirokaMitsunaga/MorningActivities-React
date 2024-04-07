import { FC, memo } from 'react'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid'
import useTimelineStore from '../store/timelineStore'
import { Timeline } from '../types'
import { useMutateTimeline } from '../hooks/useMutateTimeline'

//タスク１個１個に対する処理(更新か削除)
const TimelineItemMemo: FC<
  Omit<Timeline, 'created_at' | 'updated_at' | 'user_id'>
> = ({ id, sentence, email }) => {
  const updateTimeline = useTimelineStore((state) => state.updateEditedTimeline)
  const { deleteTimelineMutation } = useMutateTimeline()
  return (
    <li className="my-3">
      <span className="font-bold">{sentence}</span>
      <span className="font-bold">{email}</span>
      <div className="flex float-right ml-20">
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

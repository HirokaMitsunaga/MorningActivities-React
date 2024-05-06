import { FC, memo } from 'react'
import { PencilIcon, TrashIcon, HeartIcon } from '@heroicons/react/24/outline'
import useCommentStore from '../store/commentStore'
import { Comment } from '../types'
import { useMutateComment } from '../hooks/useMutateComment'

//タスク１個１個に対する処理(更新か削除)
const TimelineCommentItemMemo: FC<
  Omit<Comment, 'created_at' | 'updated_at'>
> = ({ id, timeline_id, comment, user_id, like_count }) => {
  const updateComment = useCommentStore((state) => state.updateEditedComment)
  const { deleteCommentMutation, toggleLikeMutation } = useMutateComment()
  return (
    <li className="my-3 p-4 shadow-lg rounded-lg flex items-center bg-white">
      <span className="font-bold mr-4">{comment}</span>
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
            updateComment({
              id: id,
              comment: comment,
              timeline_id: timeline_id,
            })
          }}
        />
        <TrashIcon
          className="h-5 w-5 text-blue-500 cursor-pointer"
          onClick={() => {
            deleteCommentMutation.mutate(id)
          }}
        />
      </div>
    </li>
  )
}
export const TimelineCommentItem = memo(TimelineCommentItemMemo)

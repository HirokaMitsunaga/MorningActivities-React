import { FC, memo, useState } from 'react'
import { PencilIcon, TrashIcon, HeartIcon } from '@heroicons/react/24/outline'
import useCommentStore from '../store/commentStore'
import { Comment } from '../types'
import { useMutateComment } from '../hooks/useMutateComment'
import { TimelineCommentModal } from './TimelineCommentModal'

//タスク１個１個に対する処理(更新か削除)
const TimelineCommentItemMemo: FC<
  Omit<Comment, 'created_at' | 'updated_at'>
> = ({ id, timeline_id, comment, user_id, like_count }) => {
  const updateComment = useCommentStore((state) => state.updateEditedComment)
  const { deleteCommentMutation, toggleLikeMutation } = useMutateComment()
  const [isModalOpen, setModalOpen] = useState(false) // モーダルの状態を追加

  const openModal = () => {
    updateComment({ id, comment, timeline_id })
    setModalOpen(true)
  }

  return (
    <>
      <li className="my-3 p-4 shadow-lg rounded-lg bg-white cursor-pointer hover:bg-gray-100 flex flex-col">
        <div className="flex items-center mb-4">
          <img
            src="https://via.placeholder.com/40"
            alt="Profile"
            className="h-10 w-10 rounded-full mr-2"
          />
          <span className="flex-none font-bold text-gray-600">{user_id}</span>
        </div>
        <div className="flex-1 font-bold text-gray-800 mb-4">{comment}</div>
        <div className="flex items-center justify-between">
          <div style={{ width: '2.5rem' }}></div>{' '}
          <div className="flex items-center justify-center">
            <HeartIcon
              className="h-5 w-5 text-red-500 hover:text-red-700 cursor-pointer"
              onClick={() => {
                toggleLikeMutation.mutate(id)
              }}
            />
            <span className="font-bold text-gray-700 ml-2">{like_count}</span>
          </div>
          <div className="flex items-center">
            <PencilIcon
              className="h-5 w-5 mx-1 text-blue-500 hover:text-blue-700 cursor-pointer"
              onClick={openModal}
            />
            <TimelineCommentModal
              isOpen={isModalOpen}
              onClose={() => setModalOpen(false)}
            />
            <TrashIcon
              className="h-5 w-5 text-blue-500 hover:text-blue-700 cursor-pointer"
              onClick={() => {
                deleteCommentMutation.mutate(id)
              }}
            />
          </div>
        </div>
      </li>
    </>
  )
}
export const TimelineCommentItem = memo(TimelineCommentItemMemo)

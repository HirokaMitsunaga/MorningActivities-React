import React, { FormEvent } from 'react'
import useCommentStore from '../store/commentStore'
import { useMutateComment } from '../hooks/useMutateComment'

export const TimelineCommentModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) => {
  const { editedComment, updateEditedComment, resetEditedComment } =
    useCommentStore()
  const { createCommentMutation, updateCommentMutation } = useMutateComment()
  //editedTimeline.idが0の時、timelineを作成し、それ以外はもともとidをもっていると判断して更新をする
  const submitCommentHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editedComment.id === 0) createCommentMutation.mutate(editedComment)
    else {
      updateCommentMutation.mutate(editedComment)
    }
    onClose()
  }
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 pointer-events-none flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-2xl transition duration-300 transform hover:-translate-y-2 pointer-events-auto">
        <p className="text-sm text-gray-500">コメント</p>
        <form onSubmit={submitCommentHandler} className="space-y-4">
          <textarea
            onChange={(e) =>
              updateEditedComment({
                ...editedComment,
                comment: e.target.value,
              })
            }
            value={editedComment.comment || ''}
            placeholder="コメントを記載"
            className="w-full p-4 h-40 border border-gray-300 rounded text-left align-top"
            rows={4}
          />
          <div className="flex justify-between">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {editedComment.id === 0 ? 'コメント' : '更新'}
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={() => {
                onClose()
                resetEditedComment()
              }}
            >
              閉じる
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

import React, { FormEvent } from 'react'
import { useMutateTimeline } from '../hooks/useMutateTimeline'
import useTimelineStore from '../store/timelineStore'

export const TimelineModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) => {
  const { editedTimeline, updateEditedTimeline, resetEditedTimeline } =
    useTimelineStore()
  const { createTimelineMutation, updateTimelineMutation } = useMutateTimeline()
  //editedTimeline.idが0の時、timelineを作成し、それ以外はもともとidをもっていると判断して更新をする
  const submitTaskHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editedTimeline.id === 0) createTimelineMutation.mutate(editedTimeline)
    else {
      updateTimelineMutation.mutate(editedTimeline)
    }
    onClose()
  }
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 pointer-events-none flex justify-center items-center"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="bg-white p-8 rounded-lg shadow-2xl transition duration-300 transform hover:-translate-y-2 pointer-events-auto">
        <p className="text-sm text-gray-500">投稿内容</p>
        <form onSubmit={submitTaskHandler} className="space-y-4">
          <textarea
            onChange={(e) =>
              updateEditedTimeline({
                ...editedTimeline,
                sentence: e.target.value,
              })
            }
            value={editedTimeline.sentence || ''}
            placeholder="投稿内容を記載"
            className="w-full p-4 h-40 border border-gray-300 rounded text-left align-top"
            rows={4}
          />
          <div className="flex justify-between">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {editedTimeline.id === 0 ? '投稿' : '更新'}
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={() => {
                onClose()
                resetEditedTimeline()
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

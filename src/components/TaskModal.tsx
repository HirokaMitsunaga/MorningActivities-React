import React, { FormEvent } from 'react'
import { useMutateTask } from '../hooks/useMutateTask'
import useTaskStore from '../store/taskStore'

export const TaskModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) => {
  const { editedTask, updateEditedTask, selectedDate, resetEditedTask } =
    useTaskStore()
  const { createTaskMutation, updateTaskMutation } = useMutateTask(selectedDate)
  //editedTask.idが0の時、新規にたtaskを作成し、それ以外はもともとidをもっていると判断して更新をする
  const submitTaskHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editedTask.id === 0) createTaskMutation.mutate(editedTask)
    else {
      updateTaskMutation.mutate(editedTask)
    }
    onClose()
  }
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center pointer-events-none">
      <div className="bg-white p-8 rounded-lg shadow-2xl transition duration-300 transform hover:-translate-y-2 pointer-events-auto">
        <p className="text-sm text-gray-500">タスク名</p>
        <form onSubmit={submitTaskHandler} className="space-y-4">
          <input
            type="text"
            onChange={(e) =>
              updateEditedTask({ ...editedTask, title: e.target.value })
            }
            value={editedTask.title || ''}
            placeholder="タスク名"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <p className="text-sm text-gray-500">予定時間(半角数字)</p>
          <input
            type="text"
            value={editedTask.scheduled_minutes}
            onChange={(e) =>
              updateEditedTask({
                ...editedTask,
                scheduled_minutes: parseInt(e.target.value) || 0,
              })
            }
            placeholder="予定時間（分）"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <p className="text-sm text-gray-500">実際の時間(半角数字)</p>
          <input
            type="text"
            value={editedTask.actual_minutes}
            onChange={(e) => {
              const value = e.target.value
              // 数値または空文字のみ許可
              if (value === '' || /^\d+$/.test(value)) {
                updateEditedTask({
                  ...editedTask,
                  actual_minutes: parseInt(value) || 0,
                })
              }
            }}
            placeholder="実際の時間（分）"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <div className="flex justify-between">
            <button
              aria-label="タスクを保存"
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {editedTask.id === 0 ? '登録' : '更新'}
            </button>
            <button
              aria-label="モーダルを閉じる"
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={() => {
                onClose()
                resetEditedTask()
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

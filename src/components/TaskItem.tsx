import { FC, memo, useState } from 'react'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid'
import useTaskStore from '../store/taskStore'
import { Task } from '../types'
import { useMutateTask } from '../hooks/useMutateTask'
import { TaskModal } from './TaskModal' // TaskModalをインポート

//タスク１個１個に対する処理(更新か削除)
const TaskItemMemo: FC<Omit<Task, 'created_at' | 'updated_at'>> = ({
  id,
  title,
  scheduled_minutes,
  actual_minutes,
}) => {
  const updateTask = useTaskStore((state) => state.updateEditedTask)
  const selectedDate = useTaskStore((state) => state.selectedDate)
  const { deleteTaskMutation } = useMutateTask(selectedDate)
  const [isModalOpen, setModalOpen] = useState(false) // モーダルの状態を追加

  const openModal = () => {
    updateTask({ id, title, scheduled_minutes, actual_minutes })
    setModalOpen(true)
  }
  return (
    <>
      <div className="p-4 bg-white shadow rounded-lg">
        <li
          aria-label={`${id}`}
          className="border-b border-gray-200 flex justify-between items-center py-3"
        >
          <div>
            <span className="font-bold text-lg">{title}</span>
            <div className="text-sm text-gray-500 mb-1">
              予定: {scheduled_minutes}分
            </div>
            <div className="text-sm text-gray-500">
              実施: {actual_minutes}分
            </div>
            <div className="w-full bg-gray-300 h-2 my-2">
              <div
                className="bg-blue-500 h-2"
                style={{
                  width: `${(actual_minutes / scheduled_minutes) * 100}%`,
                }}
              ></div>
            </div>
            <div className="text-sm text-gray-500">
              予定時間に対する実際の時間の割合:
              {((actual_minutes / scheduled_minutes) * 100).toFixed(2)}%
            </div>
          </div>
          <div className="flex items-center">
            <PencilIcon
              aria-label="タスクを更新"
              className="h-5 w-5 mx-1 text-blue-500 cursor-pointer"
              onClick={openModal} // クリックイベントを変更
            />
            <TaskModal
              isOpen={isModalOpen}
              onClose={() => setModalOpen(false)}
            />
            <TrashIcon
              aria-label="タスクを削除"
              className="h-5 w-5 text-blue-500 cursor-pointer"
              onClick={() => deleteTaskMutation.mutate(id)}
            />
          </div>
        </li>
      </div>
    </>
  )
}

export const TaskItem = memo(TaskItemMemo)

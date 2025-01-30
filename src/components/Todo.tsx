import { FormEvent, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { CalendarIcon, PlusIcon } from '@heroicons/react/24/solid'
import useTaskStore from '../store/taskStore'
import { useQueryTasks } from '../hooks/useQueryTasks'
import { useMutateTask } from '../hooks/useMutateTask'
import { TaskItem } from './TaskItem'
import { TaskModal } from './TaskModal'
import { CalendarModal } from './CalendarModal'
// import { TaskItem } from './TaskItem'

export const Todo = () => {
  const { editedTask, selectedDate, setSelectedDate } = useTaskStore()
  const { data, isLoading } = useQueryTasks(selectedDate)
  const { createTaskMutation, updateTaskMutation } = useMutateTask(selectedDate)

  //editedTask.idが0の時、新規にたtaskを作成し、それ以外はもともとidをもっていると判断して更新をする
  const submitTaskHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editedTask.id === 0) createTaskMutation.mutate(editedTask)
    else {
      updateTaskMutation.mutate(editedTask)
    }
  }

  const [isTaskModalOpen, setTaskModalOpen] = useState(false)
  const [isCalendarModalOpen, setCalendarModalOpen] = useState(false)
  return (
    <>
      <div className="flex justify-center items-center flex-col min-h-screen text-gray-600 font-mono">
        <button
          aria-label="タスクを作成"
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-colors"
          onClick={() => setTaskModalOpen(true)}
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          タスクを追加
        </button>
        <button
          className="flex items-center mt-2 px-4 py-2 bg-gray-400 text-white rounded-lg shadow hover:bg-gray-600 transition-colors"
          onClick={() => setCalendarModalOpen(true)}
        >
          <CalendarIcon className="h-5 w-5 mr-2" />
          {selectedDate}
        </button>
        <TaskModal
          isOpen={isTaskModalOpen}
          onClose={() => setTaskModalOpen(false)}
        />
        <CalendarModal
          isOpen={isCalendarModalOpen}
          onRequestClose={() => setCalendarModalOpen(false)}
        />

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <ul className="my-5">
              {data?.map((task) => (
                <TaskItem
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  scheduled_minutes={task.scheduled_minutes}
                  actual_minutes={task.actual_minutes}
                />
              ))}
            </ul>
          </>
        )}
        <div className="mt-4 p-3 bg-gray-100 rounded">
          <h3 className="font-semibold text-gray-800">
            今日の引用句:まじで危機感持った方がいい
          </h3>
        </div>
        <div className="text-sm text-red-500">連続活動日数: 2日</div>
      </div>
    </>
  )
}

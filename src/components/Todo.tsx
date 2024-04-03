import { FormEvent, useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import {
  ArrowRightOnRectangleIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/solid'
import useStore from '../store/taskStore'
import { useQueryTasks } from '../hooks/useQueryTasks'
import { useMutateTask } from '../hooks/useMutateTask'
import { useMutateAuth } from '../hooks/useMutateAuth'
import { TaskItem } from './TaskItem'

export const Todo = () => {
  const queryClient = useQueryClient()
  const { editedTask, updateEditedTask, selectedDate, setSelectedDate } =
    useStore()
  const { data, isLoading } = useQueryTasks(selectedDate)
  const { createTaskMutation, updateTaskMutation } = useMutateTask(selectedDate)

  const { logoutMutation } = useMutateAuth()
  //editedTask.idが0の時、新規にたtaskを作成し、それ以外はもともとidをもっていると判断して更新をする
  const submitTaskHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editedTask.id === 0) createTaskMutation.mutate(editedTask)
    else {
      updateTaskMutation.mutate(editedTask)
    }
  }
  const logout = async () => {
    await logoutMutation.mutateAsync()
    //ログアウト後にキャッシュを削除
    queryClient.removeQueries(['tasks'])
  }

  useEffect(() => {
    const storedDate = localStorage.getItem('selectedDate')
    if (storedDate) {
      setSelectedDate(storedDate)
    }
  }, [setSelectedDate])

  return (
    <div className="flex justify-center items-center flex-col min-h-screen text-gray-600 font-mono">
      <div className="flex items-center my-3">
        <ShieldCheckIcon className="h-8 w-8 mr-3 text-indigo-500 cursor-pointer" />
        <span className="text-center text-3xl font-extrabold">
          Task Manager
        </span>
      </div>
      <ArrowRightOnRectangleIcon
        onClick={logout}
        className="h-6 w-6 my-6 text-blue-500 cursor-pointer"
      />

      <input
        type="date"
        value={selectedDate}
        onChange={(e) => {
          const newDate = e.target.value
          setSelectedDate(newDate)
          localStorage.setItem('selectedDate', newDate) // ローカルストレージに保存
          console.log({ selectedDate: newDate })
        }}
      />
      <form onSubmit={submitTaskHandler}>
        <input
          className="mb-3 mr-3 px-3 py-2 border border-gray-300"
          placeholder="title ?"
          type="text"
          onChange={(e) =>
            updateEditedTask({ ...editedTask, title: e.target.value })
          }
          value={editedTask.title || ''}
        />
        <div>
          <label htmlFor="scheduled_minutes">Scheduled Minutes:</label>
          <input
            id="scheduled_minutes"
            type="number"
            value={editedTask.scheduled_minutes}
            onChange={(e) =>
              updateEditedTask({
                ...editedTask,
                scheduled_minutes: parseInt(e.target.value),
              })
            }
          />
        </div>
        <div>
          <label htmlFor="actual_minutes">Actual Minutes:</label>
          <input
            id="actual_minutes"
            type="number"
            value={editedTask.actual_minutes}
            onChange={(e) =>
              updateEditedTask({
                ...editedTask,
                actual_minutes: parseInt(e.target.value),
              })
            }
          />
        </div>
        <button
          className="disabled:opacity-40 mx-3 py-2 px-3 text-white bg-indigo-600 rounded"
          disabled={!editedTask.title}
        >
          {editedTask.id === 0 ? 'Create' : 'Update'}
        </button>
      </form>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
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
      )}
    </div>
  )
}

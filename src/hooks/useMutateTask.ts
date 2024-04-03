import axios from 'axios'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { Task } from '../types'
import useStore from '../store/taskStore'
import { useError } from '../hooks/useError'

export const useMutateTask = (selectedDate: string) => {
  const queryClient = useQueryClient()
  const { switchErrorHandling } = useError()
  const resetEditedTask = useStore((state) => state.resetEditedTask)

  const createTaskMutation = useMutation(
    (task: Omit<Task, 'id' | 'created_at' | 'updated_at'>) =>
      axios.post<Task>(`${process.env.REACT_APP_API_URL}/tasks`, task),
    {
      onSuccess: (res) => {
        const previousTasks = queryClient.getQueryData<Task[]>([
          'tasks',
          selectedDate,
        ])
        if (previousTasks) {
          //既存のキャッシュが存在する場合、既存の配列に新しく追加したtaskを配列の末尾に追加する
          queryClient.setQueryData(
            ['tasks', selectedDate],
            [...previousTasks, res.data]
          )
        }
        //zustandのstateをクリアする
        resetEditedTask()
      },
      onError: (err: any) => {
        if (err.response.data.message) {
          switchErrorHandling(err.response.data.message)
        } else {
          switchErrorHandling(err.response.data)
        }
      },
    }
  )
  const updateTaskMutation = useMutation(
    (task: Omit<Task, 'created_at' | 'updated_at'>) =>
      //データとしてtaskのタイトルを渡す
      axios.put<Task>(`${process.env.REACT_APP_API_URL}/tasks/${task.id}`, {
        title: task.title,
        scheduled_minutes: task.scheduled_minutes,
        actual_minutes: task.actual_minutes,
      }),
    {
      onSuccess: (res, variables) => {
        const previousTasks = queryClient.getQueryData<Task[]>([
          'tasks',
          selectedDate,
        ])
        if (previousTasks) {
          queryClient.setQueryData<Task[]>(
            ['tasks', selectedDate],
            previousTasks.map((task) =>
              //previousTasksの中でupdate対象のキャッシュのtask.idをupdateしたもので置き換える
              //対象外のものはそのままにする
              task.id === variables.id ? res.data : task
            )
          )
        }
        //zustandのstateをクリアする
        resetEditedTask()
      },
      onError: (err: any) => {
        if (err.response.data.message) {
          switchErrorHandling(err.response.data.message)
        } else {
          switchErrorHandling(err.response.data)
        }
      },
    }
  )
  const deleteTaskMutation = useMutation(
    (id: number) =>
      axios.delete(`${process.env.REACT_APP_API_URL}/tasks/${id}`),
    {
      onSuccess: (_, variables) => {
        const previousTasks = queryClient.getQueryData<Task[]>([
          'tasks',
          selectedDate,
        ])
        if (previousTasks) {
          queryClient.setQueryData<Task[]>(
            ['tasks', selectedDate],
            //キャッシュの中で削除したtask.idと一致しないものを削除して新しく配列を作りなおす
            previousTasks.filter((task) => task.id !== variables)
          )
        }
        resetEditedTask()
      },
      onError: (err: any) => {
        if (err.response.data.message) {
          switchErrorHandling(err.response.data.message)
        } else {
          switchErrorHandling(err.response.data)
        }
      },
    }
  )
  return {
    createTaskMutation,
    updateTaskMutation,
    deleteTaskMutation,
  }
}

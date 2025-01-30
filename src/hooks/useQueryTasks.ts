import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { Task } from '../types'
import { useError } from '../hooks/useError'

export const useQueryTasks = (selectedDate: string) => {
  const { switchErrorHandling } = useError()
  const getTasks = async () => {
    const { data } = await axios.get<Task[]>(
      `${process.env.REACT_APP_API_URL}/task`,
      { withCredentials: true }
    )
    // タスクのcreated_atと選択された日付が一致するものだけをフィルタリング
    const filteredTasks = data.filter((task) => {
      const taskDate = new Date(task.created_at).toISOString().split('T')[0]
      return taskDate === selectedDate
    })

    return filteredTasks
  }

  return useQuery<Task[], Error>({
    queryKey: ['tasks', selectedDate],
    queryFn: getTasks,
    staleTime: Infinity,
    onError: (err: any) => {
      if (err.response.data.message) {
        switchErrorHandling(err.response.data.message)
      } else {
        switchErrorHandling(err.response.data)
      }
    },
  })
}

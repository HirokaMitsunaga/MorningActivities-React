import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { Comment } from '../types'
import { useError } from './useError'

export const useQueryComment = (timelineId: number) => {
  const { switchErrorHandling } = useError()

  const getComments = async () => {
    const { data } = await axios.get<Comment[]>(
      `${process.env.REACT_APP_API_URL}/comments?timelineID=${timelineId}`,
      { withCredentials: true }
    )

    return data
  }

  return useQuery<Comment[], Error>({
    queryKey: ['comments'],
    queryFn: getComments,
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

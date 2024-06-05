import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { Timeline } from '../types'
import { useError } from './useError'

export const useQueryTimelineById = (timelineId: number) => {
  const { switchErrorHandling } = useError()

  const getComments = async () => {
    const { data } = await axios.get<Timeline>(
      `${process.env.REACT_APP_API_URL}/timelines/${timelineId}`,
      { withCredentials: true }
    )

    return data
  }

  return useQuery<Timeline, Error>({
    queryKey: ['timeline', { id: timelineId }],
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

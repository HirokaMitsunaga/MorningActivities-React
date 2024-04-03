import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { Timeline } from '../types'
import { useError } from './useError'

export const useQueryTimeline = () => {
  const { switchErrorHandling } = useError()
  const getTimelines = async () => {
    const { data } = await axios.get<Timeline[]>(
      `${process.env.REACT_APP_API_URL}/timelines`,
      { withCredentials: true }
    )

    return data
  }

  return useQuery<Timeline[], Error>({
    queryKey: ['timelines'],
    queryFn: getTimelines,
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

import axios from 'axios'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { Timeline } from '../types'
import useTimelineStore from '../store/timelineStore'
import { useError } from './useError'

export const useMutateTimeline = () => {
  const queryClient = useQueryClient()
  const { switchErrorHandling } = useError()
  const resetEditedTimeline = useTimelineStore(
    (state) => state.resetEditedTimeline
  )

  const createTimelineMutation = useMutation(
    (
      timeline: Omit<
        Timeline,
        | 'id'
        | 'created_at'
        | 'updated_at'
        | 'user_id'
        | 'email'
        | 'comment_count'
        | 'like_count'
      >
    ) =>
      axios.post<Timeline>(
        `${process.env.REACT_APP_API_URL}/timelines`,
        timeline
      ),
    {
      onSuccess: (res) => {
        const previousTimelines = queryClient.getQueryData<Timeline[]>([
          'timelines',
        ])
        if (previousTimelines) {
          //既存のキャッシュが存在する場合、既存の配列に新しく追加したtimelineを配列の末尾に追加する
          queryClient.setQueryData(
            ['timelines'],
            [...previousTimelines, res.data]
          )
        }
        //zustandのstateをクリアする
        resetEditedTimeline()
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
  const updateTimelineMutation = useMutation(
    (
      timeline: Omit<
        Timeline,
        | 'created_at'
        | 'updated_at'
        | 'user_id'
        | 'email'
        | 'comment_count'
        | 'like_count'
      >
    ) =>
      //データとしてtimelineの文章を渡す
      axios.put<Timeline>(
        `${process.env.REACT_APP_API_URL}/timelines/${timeline.id}`,
        {
          sentence: timeline.sentence,
        }
      ),
    {
      onSuccess: (res, variables) => {
        const previousTimelines = queryClient.getQueryData<Timeline[]>([
          'timelines',
        ])
        if (previousTimelines) {
          queryClient.setQueryData<Timeline[]>(
            ['timelines'],
            previousTimelines.map((timeline) =>
              //previousTimelinesの中でupdate対象のキャッシュのtimeline.idをupdateしたもので置き換える
              //対象外のものはそのままにする
              timeline.id === variables.id ? res.data : timeline
            )
          )
        }
        //zustandのstateをクリアする
        resetEditedTimeline()
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
  const deleteTimelineMutation = useMutation(
    (id: number) =>
      axios.delete(`${process.env.REACT_APP_API_URL}/timelines/${id}`),
    {
      onSuccess: (_, variables) => {
        const previousTimelines = queryClient.getQueryData<Timeline[]>([
          'timelines',
        ])
        if (previousTimelines) {
          queryClient.setQueryData<Timeline[]>(
            ['timelines'],
            //キャッシュの中で削除したtimeline.idと一致しないものを削除して新しく配列を作りなおす
            previousTimelines.filter((timeline) => timeline.id !== variables)
          )
        }
        resetEditedTimeline()
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
  const toggleLikeMutation = useMutation(
    (id: number) =>
      axios.post(`${process.env.REACT_APP_API_URL}/likes/toggle`, {
        target_id: id,
        target_type: 'timeline',
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['timelines'])
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
    createTimelineMutation,
    updateTimelineMutation,
    deleteTimelineMutation,
    toggleLikeMutation,
  }
}

import { FormEvent } from 'react'
// import { useQueryClient } from '@tanstack/react-query'
import useTimelineStore from '../store/timelineStore'
import { useQueryTimeline } from '../hooks/useQueryTimeline'
import { useMutateTimeline } from '../hooks/useMutateTimeline'
import { TimelineItem } from './TimelineItem'

export const Timeline = () => {
  // const queryClient = useQueryClient()
  const { editedTimeline, updateEditedTimeline } = useTimelineStore()
  const { data } = useQueryTimeline()
  const { createTimelineMutation, updateTimelineMutation } = useMutateTimeline()

  const submitTimelineHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editedTimeline.id === 0) createTimelineMutation.mutate(editedTimeline)
    else {
      updateTimelineMutation.mutate(editedTimeline)
    }
  }
  return (
    <div className="flex justify-center items-center flex-col min-h-screen text-gray-600 font-mono">
      <form onSubmit={submitTimelineHandler}>
        <input
          className="mb-3 mr-3 px-3 py-2 border border-gray-300"
          placeholder="sentence ?"
          type="text"
          onChange={(e) =>
            updateEditedTimeline({
              ...editedTimeline,
              sentence: e.target.value,
            })
          }
          value={editedTimeline.sentence || ''}
        />
        <button
          className="disabled:opacity-40 mx-3 py-2 px-3 text-white bg-indigo-600 rounded"
          disabled={!editedTimeline.sentence}
        >
          {editedTimeline.id === 0 ? 'Create' : 'Update'}
        </button>
      </form>
      <ul className="my-5">
        {data?.map((timeline) => (
          <TimelineItem
            key={timeline.id}
            id={timeline.id}
            sentence={timeline.sentence}
            email={timeline.email}
          />
        ))}
      </ul>
    </div>
  )
}

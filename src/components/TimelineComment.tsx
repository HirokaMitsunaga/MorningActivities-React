import React, { useEffect, FormEvent } from 'react'
import { useQueryComment } from '../hooks/useQueryComment'
import { useParams } from 'react-router-dom'
import useCommentStore from '../store/commentStore'
import { useMutateComment } from '../hooks/useMutateComment'
import { TimelineCommentItem } from './TimelineCommentItem'
import { useQueryClient } from '@tanstack/react-query'

export const TimelineComment = () => {
  // クエリパラメータでtimelineIdを受け取る
  const { editedComment, updateEditedComment } = useCommentStore()
  const { createCommentMutation, updateCommentMutation } = useMutateComment()
  const { timelineId } = useParams<{ timelineId?: string }>()
  const numericTimelineId = parseInt(timelineId!, 10)
  const queryClient = useQueryClient()

  useEffect(() => {
    queryClient.invalidateQueries(['comments'])
  }, [numericTimelineId, queryClient])
  //クエリパラメータから取得したタイムラインIDをグローバルなstateとして保存する
  editedComment.timeline_id = numericTimelineId
  const { data, isLoading } = useQueryComment(numericTimelineId)
  if (!timelineId) {
    return <div>タイムラインIDが指定されていません。</div>
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  const submitCommentHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editedComment.id === 0) {
      createCommentMutation.mutate(editedComment)
    } else {
      updateCommentMutation.mutate(editedComment)
    }
  }

  return (
    <div className="flex justify-center items-center flex-col min-h-screen text-gray-600 font-mono">
      <form onSubmit={submitCommentHandler}>
        <input
          className="mb-3 mr-3 px-3 py-2 border border-gray-300"
          placeholder="comment ?"
          type="text"
          onChange={(e) =>
            updateEditedComment({
              ...editedComment,
              comment: e.target.value,
            })
          }
          value={editedComment.comment || ''}
        />
        <button
          className="disabled:opacity-40 mx-3 py-2 px-3 text-white bg-indigo-600 rounded"
          disabled={!editedComment.comment}
        >
          {editedComment.id === 0 ? 'Create' : 'Update'}
        </button>
      </form>
      <ul className="my-5">
        {data?.map((comment) => (
          <TimelineCommentItem
            key={comment.id}
            id={comment.id}
            timeline_id={comment.timeline_id}
            comment={comment.comment}
            user_id={comment.user_id}
          />
        ))}
      </ul>
    </div>
  )
}

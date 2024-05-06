import axios from 'axios'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { Comment } from '../types'
import useCommentStore from '../store/commentStore'
import { useError } from './useError'

export const useMutateComment = () => {
  const queryClient = useQueryClient()
  const { switchErrorHandling } = useError()
  const resetEditedComment = useCommentStore(
    (state) => state.resetEditedComment
  )

  const createCommentMutation = useMutation(
    (
      comment: Omit<
        Comment,
        'created_at' | 'updated_at' | 'user_id' | 'like_count'
      >
    ) =>
      axios.post<Comment>(`${process.env.REACT_APP_API_URL}/comments`, comment),
    {
      onSuccess: (res) => {
        const previousComments = queryClient.getQueryData<Comment[]>([
          'comments',
        ])
        if (previousComments) {
          //既存のキャッシュが存在する場合、既存の配列に新しく追加したcommentを配列の末尾に追加する
          queryClient.setQueryData(
            ['comments'],
            [...previousComments, res.data]
          )
        }
        //zustandのstateをクリアする
        resetEditedComment()
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
  const updateCommentMutation = useMutation(
    (
      comment: Omit<
        Comment,
        'created_at' | 'updated_at' | 'user_id' | 'like_count'
      >
    ) =>
      //データとしてcommentの文章を渡す
      axios.put<Comment>(
        `${process.env.REACT_APP_API_URL}/comments/${comment.id}`,
        {
          comment: comment.comment,
        }
      ),
    {
      onSuccess: (res, variables) => {
        const previousComments = queryClient.getQueryData<Comment[]>([
          'comments',
        ])
        if (previousComments) {
          queryClient.setQueryData<Comment[]>(
            ['comments'],
            previousComments.map((comment) =>
              //previousCommentsの中でupdate対象のキャッシュのcomment.idをupdateしたもので置き換える
              //対象外のものはそのままにする
              comment.id === variables.id ? res.data : comment
            )
          )
        }
        //zustandのstateをクリアする
        resetEditedComment()
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
  const deleteCommentMutation = useMutation(
    (id: number) =>
      axios.delete(`${process.env.REACT_APP_API_URL}/comments/${id}`),
    {
      onSuccess: (_, variables) => {
        const previousComments = queryClient.getQueryData<Comment[]>([
          'comments',
        ])
        if (previousComments) {
          queryClient.setQueryData<Comment[]>(
            ['comments'],
            //キャッシュの中で削除したcomment.idと一致しないものを削除して新しく配列を作りなおす
            previousComments.filter((comment) => comment.id !== variables)
          )
        }
        resetEditedComment()
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
  //ロクイン中のユーザのいいねが存在すれば、いいねを一つ減らす、いいねが存在しなければ、いいねを一つ増やす
  const toggleLikeMutation = useMutation(
    (id: number) =>
      axios.post(`${process.env.REACT_APP_API_URL}/likes/toggle`, {
        target_id: id,
        target_type: 'comment',
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['comments'])
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
    createCommentMutation,
    updateCommentMutation,
    deleteCommentMutation,
    toggleLikeMutation,
  }
}

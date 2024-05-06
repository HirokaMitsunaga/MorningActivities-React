// ユーザが編集中のeditTimelineをグローバルなstateとして保持する
//

import { create } from 'zustand'

type EditedComment = {
  id: number
  comment: string
  timeline_id: number
}

type State = {
  editedComment: EditedComment
  updateEditedComment: (payload: EditedComment) => void
  resetEditedComment: () => void
}

const useCommentStore = create<State>((set) => ({
  editedComment: { id: 0, comment: '', timeline_id: 0 },
  updateEditedComment: (payload) =>
    set({
      editedComment: payload,
    }),
  resetEditedComment: () =>
    set({
      editedComment: { id: 0, comment: '', timeline_id: 0 },
    }),
}))

export default useCommentStore

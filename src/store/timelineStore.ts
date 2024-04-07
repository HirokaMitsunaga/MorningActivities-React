// ユーザが編集中のeditTimelineをグローバルなstateとして保持する
//

import { create } from 'zustand'

type EditedTimeline = {
  id: number
  sentence: string
}

type State = {
  editedTimeline: EditedTimeline
  updateEditedTimeline: (payload: EditedTimeline) => void
  resetEditedTimeline: () => void
}

const useTimelineStore = create<State>((set) => ({
  editedTimeline: { id: 0, sentence: '' },
  updateEditedTimeline: (payload) =>
    set({
      editedTimeline: payload,
    }),
  resetEditedTimeline: () =>
    set({
      editedTimeline: { id: 0, sentence: '' },
    }),
}))

export default useTimelineStore

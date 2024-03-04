//ユーザが編集中のeditTaskをグローバルなstateとして保持する
//カスタムフックの定義

import { create } from 'zustand'

type EditedTask = {
  id: number
  title: string
}

type State = {
  editedTask: EditedTask
  updateEditedTask: (payload: EditedTask) => void
  resetEditedTask: () => void
}

//editedTask,updateEditedTask,resetEditedTaskが呼び出された時にそれぞれ何をするのかを記載
const useStore = create<State>((set) => ({
  editedTask: { id: 0, title: '' },
  updateEditedTask: (payload) => set({ editedTask: payload }),
  resetEditedTask: () => set({ editedTask: { id: 0, title: '' } }),
}))

export default useStore

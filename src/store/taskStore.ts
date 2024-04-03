//ユーザが編集中のeditTaskをグローバルなstateとして保持する
//カスタムフックの定義

import { create } from 'zustand'

type EditedTask = {
  id: number
  title: string
  scheduled_minutes: number
  actual_minutes: number
}

type State = {
  editedTask: EditedTask
  updateEditedTask: (payload: EditedTask) => void
  resetEditedTask: () => void
  selectedDate: string
  setSelectedDate: (date: string) => void
}

//editedTask,updateEditedTask,resetEditedTaskが呼び出された時にそれぞれ何をするのかを記載
const useStore = create<State>((set) => ({
  editedTask: { id: 0, title: '', scheduled_minutes: 0, actual_minutes: 0 },
  updateEditedTask: (payload) =>
    set({
      editedTask: payload,
    }),
  resetEditedTask: () =>
    set({
      editedTask: { id: 0, title: '', scheduled_minutes: 0, actual_minutes: 0 },
    }),
  selectedDate: new Date().toISOString().split('T')[0], // 初期値を今日の日付に設定
  setSelectedDate: (date) => set({ selectedDate: date }),
}))

export default useStore

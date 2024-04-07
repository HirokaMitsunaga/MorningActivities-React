import { FC, memo } from 'react'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid'
import useTaskStore from '../store/taskStore'
import { Task } from '../types'
import { useMutateTask } from '../hooks/useMutateTask'

//タスク１個１個に対する処理(更新か削除)
const TaskItemMemo: FC<Omit<Task, 'created_at' | 'updated_at'>> = ({
  id,
  title,
  scheduled_minutes,
  actual_minutes,
}) => {
  const updateTask = useTaskStore((state) => state.updateEditedTask)
  const selectedDate = useTaskStore((state) => state.selectedDate)
  const { deleteTaskMutation } = useMutateTask(selectedDate)
  return (
    <li className="my-3">
      <span className="font-bold">
        {title}({scheduled_minutes}分/{actual_minutes}分)
      </span>
      <div className="flex float-right ml-20">
        <PencilIcon
          className="h-5 w-5 mx-1 text-blue-500 cursor-pointer"
          onClick={() => {
            //編集中のtaskをzustandを使ってグローバルなstateとして保持する
            //その後にupdateTaskMutationがどこかで実行されるのか？
            updateTask({
              id: id,
              title: title,
              scheduled_minutes: scheduled_minutes,
              actual_minutes: actual_minutes,
            })
          }}
        />
        <TrashIcon
          className="h-5 w-5 text-blue-500 cursor-pointer"
          onClick={() => {
            deleteTaskMutation.mutate(id)
          }}
        />
      </div>
    </li>
  )
}
export const TaskItem = memo(TaskItemMemo)

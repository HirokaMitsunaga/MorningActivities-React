// todo.tsx
import React from 'react'

interface Activity {
  name: string
  startTime: string
  endTime: string
}

const activities: Activity[] = [
  { name: 'メディテーション', startTime: '6:30 AM', endTime: '7:00 AM' },
  { name: 'ジョギング', startTime: '7:15 AM', endTime: '8:00 AM' },
]

export const Profile: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
        <h1 className="text-2xl font-bold mb-6">今日の朝活ダッシュボード</h1>
        <div>
          <h2 className="text-lg font-semibold">予定されている活動:</h2>
          <ul className="list-disc pl-5 mt-2">
            {activities.map((activity, index) => (
              <li key={index} className="mt-2">
                {activity.name} - {activity.startTime} - {activity.endTime}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6">
          <h2 className="text-lg font-semibold">本日の進捗:</h2>
          <p>完了した活動: 2</p>
          <p>合計活動時間: 1時間15分</p>
        </div>
      </div>
    </div>
  )
}

export default Profile

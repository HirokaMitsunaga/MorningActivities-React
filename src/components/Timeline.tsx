import React from 'react'

import { useQueryTimeline } from '../hooks/useQueryTimeline'

export const Timeline = () => {
  const { data } = useQueryTimeline()

  return (
    <div>
      {data?.map((timeline) => (
        <>
          <p key={timeline.id}>{timeline.sentence}</p>
          <p key={timeline.id}>{timeline.email}</p>
        </>
      ))}
    </div>
  )
}

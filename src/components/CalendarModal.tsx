import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import Modal from 'react-modal'
import 'react-calendar/dist/Calendar.css'
import useTaskStore from '../store/taskStore'

interface CalendarModalProps {
  isOpen: boolean
  onRequestClose: () => void
}

// Modal.setAppElement('#root') // root要素にModalのアクセシビリティ対応を設定

export const CalendarModal: React.FC<CalendarModalProps> = ({
  isOpen,
  onRequestClose,
}) => {
  const [date, setDate] = useState(new Date())
  const { setSelectedDate } = useTaskStore()

  const handleDateChange = (
    newDate: Date | Date[] | null,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (newDate instanceof Date) {
      const localDate = new Date(
        newDate.getTime() - newDate.getTimezoneOffset() * 60000
      )
      setSelectedDate(localDate.toISOString().split('T')[0])
    }
  }

  useEffect(() => {
    Modal.setAppElement('#root')
  }, [])

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Calendar Modal"
        className="absolute top-1/2 left-1/2 max-w-md w-full p-5 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <Calendar
          onChange={(value, event) =>
            handleDateChange(value as Date | Date[] | null, event)
          }
          value={date}
          className="border p-4 rounded-lg"
        />
      </Modal>
    </>
  )
}

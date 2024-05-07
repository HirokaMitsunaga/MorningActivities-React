import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useMutateAuth } from '../hooks/useMutateAuth'

export const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation()

  return (
    <>
      {location.pathname !== '/' && (
        <div className="p-4 bg-blue-400 flex space-x-4 items-center">
          <Link
            to="/todo"
            className="tracking-wider text-base hover:text-blue-200"
          >
            Todo
          </Link>
          <Link
            to="/timeline"
            className="tracking-wider text-base hover:text-blue-200"
          >
            タイムライン
          </Link>
          <LogoutButton />
        </div>
      )}
      <div className="page-content">{children}</div>
    </>
  )
}

function LogoutButton() {
  const { logoutMutation } = useMutateAuth()
  const handleLogout = async () => {
    await logoutMutation.mutateAsync()
  }

  return (
    <button
      className="tracking-wider text-base hover:text-blue-200"
      onClick={handleLogout}
    >
      ログアウト
    </button>
  )
}

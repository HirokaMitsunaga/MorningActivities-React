import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useMutateAuth } from '../../hooks/useMutateAuth'

export const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation()

  return (
    <>
      {location.pathname !== '/' && (
        <aside className="bg-bgc h-full w-64 shadow-xl flex flex-col fixed mt-11">
          <nav className="text-white text-base font-semibold bg-basic pt-3 flex flex-col text-left">
            <div className="flex items-center bg-blue-500 opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
              <Link
                to="/todo"
                className="flex items-center bg-blue-500 opacity-75 hover:opacity-100 py-4 pl-6 nav-item"
              >
                朝活登録
              </Link>
            </div>
            <div className="flex items-center bg-blue-500 opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
              <Link
                to="/profile"
                className="flex items-center bg-blue-500 opacity-75 hover:opacity-100 py-4 pl-6 nav-item"
              >
                プロフィール
              </Link>
            </div>
            <div className="flex items-center bg-blue-500 opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
              <Link
                to="/timeline"
                className="flex items-center bg-blue-500 opacity-75 hover:opacity-100 py-4 pl-6 nav-item"
              >
                タイムライン
              </Link>
            </div>
            <div className="flex items-center bg-blue-500 opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
              <LogoutButton />
            </div>
          </nav>
        </aside>
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
      // className="tracking-wider text-base hover:text-blue-200"
      className="flex items-center bg-blue-500 opacity-75 hover:opacity-100 py-4 pl-6 nav-item"
      onClick={handleLogout}
    >
      ログアウト
    </button>
  )
}

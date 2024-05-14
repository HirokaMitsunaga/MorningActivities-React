import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <header className="h-16 w-full shadow-md bg-white flex border-b-4 border-basic m-0 p-0 fixed top-0 w-full z-50">
      <span className="ml-5">
        <Link to="/" className="flex items-center">
          <img
            src="moring-activity-icon.png"
            width={50}
            height={50}
            alt="ロゴ"
          />
          <span className="text-3xl text-gray-500 m-3">朝活アプリ</span>
        </Link>
      </span>
    </header>
  )
}

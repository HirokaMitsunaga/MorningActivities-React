import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Auth } from './components/Auth'
import { Todo } from './components/Todo'
import axios from 'axios'
import { CsrfToken } from './types'
import { Timeline } from './components/Timeline'
import { TimelineComment } from './components/TimelineComment'
import { Profile } from './components/Profile'
import { LayOut } from './components/LayOut/LayOut'

function App() {
  // useEffect(() => {
  axios.defaults.withCredentials = true
  //   const getCsrfToken = async () => {
  //     const { data } = await axios.get<CsrfToken>(
  //       `${process.env.REACT_APP_API_URL}/csrf`
  //     )
  //     //API経由で取得したcsrf_tokenをX-CSRF-TOKENへ設定する
  //     axios.defaults.headers.common['X-CSRF-Token'] = data.csrf_token
  //   }
  //   getCsrfToken()
  // }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <LayOut>
              <Auth />
            </LayOut>
          }
        />
        <Route
          path="/todo"
          element={
            <LayOut>
              <Todo />
            </LayOut>
          }
        />
        <Route
          path="/profile"
          element={
            <LayOut>
              <Profile />
            </LayOut>
          }
        />
        <Route
          path="/timeline"
          element={
            <LayOut>
              <Timeline />
            </LayOut>
          }
        />
        <Route
          path="/timeline/:timelineId"
          element={
            <LayOut>
              <TimelineComment />
            </LayOut>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App

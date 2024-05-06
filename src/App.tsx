import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Auth } from './components/Auth'
import { Todo } from './components/Todo'
import axios from 'axios'
import { CsrfToken } from './types'
import { Timeline } from './components/Timeline'
import { TimelineComment } from './components/TimelineComment'

function App() {
  useEffect(() => {
    axios.defaults.withCredentials = true
    const getCsrfToken = async () => {
      const { data } = await axios.get<CsrfToken>(
        `${process.env.REACT_APP_API_URL}/csrf`
      )
      //API経由で取得したcsrf_tokenをX-CSRF-TOKENへ設定する
      axios.defaults.headers.common['X-CSRF-Token'] = data.csrf_token
    }
    getCsrfToken()
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/timeline/:timelineId" element={<TimelineComment />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
// import HomePage from './pages/home'
import BaseWidget from './widget/baseWidget'
import ChatPage from './pages/chat'
import LoginPage from './pages/login'
import LoadingPage from './pages/loading'
import AuthRoute from './widget/authRoute'
import LodingWiget from './widget/loadingWidget'
import RegisterPage from './pages/register'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index loader={LodingWiget} element={<LoadingPage />} />
      <Route path="register" loader={LodingWiget} element={<RegisterPage />} />
      <Route path="login" loader={LodingWiget} element={<LoginPage />} />
      <Route
        path="chat"
        loader={LodingWiget}
        element={
          <AuthRoute>
            <BaseWidget />
          </AuthRoute>
        }
      >
        <Route path=":roomId" element={<ChatPage />} />
      </Route>
    </Route>
  )
)
export default router

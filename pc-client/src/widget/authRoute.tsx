import { getUser } from '@/store/user'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function AuthRoute({ children }: { children: JSX.Element }) {
  const user = getUser()
  const navigate = useNavigate()
  useEffect(() => {
    if (!user?.userId) {
      navigate('/login')
    }
  }, [])
  return children
}

export default AuthRoute

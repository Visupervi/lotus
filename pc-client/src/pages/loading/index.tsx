import { getUser } from '@/store/user'
import { Spin } from 'antd'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function LoadingPage() {
  const user = getUser()
  const navigate = useNavigate()
  useEffect(() => {
    console.log(user)
    if (!user?.userId) {
      navigate('/login')
    } else {
      navigate('/chat')
    }
  }, [])
  return (
    <div className="w-screen h-screen flex justify-center items-center text-xl text-violet-800">
      <Spin size="large" />
    </div>
  )
}
export default LoadingPage

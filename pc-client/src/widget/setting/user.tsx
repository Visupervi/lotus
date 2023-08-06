import { baseUrl } from '@/config'
import IMClient from '@/plugins/im/socket'
import { getUser, removeUser } from '@/store/user'
import { Avatar, Button } from 'antd'
import { useNavigate } from 'react-router-dom'

const im = IMClient.getInstance()
function User() {
  const user = getUser()
  const navigate = useNavigate()
  const onLogout = () => {
    removeUser()
    im.logout()
    navigate('/login')
  }
  return user ? (
    <div>
      <div className="flex">
        <Avatar src={baseUrl + user.avatar} size={'large'} />
        <div className="pl-3">
          <div className="text-base">{user.userName}</div>
          <div className='text-sm'>签名：{user.label || '暂无'}</div>
        </div>
      </div>
      <div className="pt-10">
        <Button type="primary" className="w-32" danger onClick={onLogout}>
          退出登录
        </Button>
      </div>
    </div>
  ) : (
    <></>
  )
}

export default User

import { Avatar, Modal } from 'antd'
import { getUser } from '@/store/user'
import { baseUrl } from '@/config'
import { SettingOutlined } from '@ant-design/icons'
import { useState } from 'react'
import Setting from './setting'
function UserWidget() {
  const user = getUser()
  const [open, setOpen] = useState(false)
  return user ? (
    <div className="footer">
      <div className="p-2 py-1 flex items-center justify-between">
        <div className="flex items-center">
          <Avatar src={baseUrl + user.avatar} />
          <div className="pl-2">{user.userName}</div>
        </div>
        <SettingOutlined className="text-xl" rev={undefined} onClick={() => setOpen(true)} />
      </div>
      <Modal open={open} title={<></>} footer={<></>} onCancel={() => setOpen(false)}>
        <Setting/>
      </Modal>
    </div>
  ) : (
    <></>
  )
}

export default UserWidget

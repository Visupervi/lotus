import { baseUrl } from '@/config'
import { Friend } from '@/model'
import IMClient from '@/plugins/im/socket'
import { Avatar, Input, Modal, Spin } from 'antd'
import { forwardRef, useImperativeHandle, useState } from 'react'

const AddFriend = forwardRef((_, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  useImperativeHandle(ref, () => ({
    onOpen
  }))
  const im = IMClient.getInstance()

  const onOpen = () => {
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setFriend(undefined)
    setIsModalOpen(false)
  }

  const [friend, setFriend] = useState<Friend>()
  const onSearch = async (val: string) => {
    setLoading(true)
    const res = await im.getFriendSearch(val)
    if (res.status) {
      setFriend(res.data)
    }
    setLoading(false)
    console.log(res)
  }

  return (
    <Modal title="新的朋友" open={isModalOpen} footer={null} onCancel={handleCancel}>
      <Input.Search loading={loading} placeholder="搜索邮箱号" onSearch={onSearch} enterButton />
      <Spin spinning={loading} size="small">
        <div>
          {friend ? (
            <div className="flex pt-4 pb-4">
              <div className="flex items-center">
                <Avatar className="w-11 h-11" src={baseUrl + friend.avatar} />
                <div className="pl-2">
                  <div className="text-base">{friend.userName}</div>
                  <div>{friend.email}</div>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </Spin>
    </Modal>
  )
})
export default AddFriend

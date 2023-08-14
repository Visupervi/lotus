import { Outlet, useNavigate } from 'react-router-dom'
import { Avatar, Button, Input, List, Space } from 'antd'
import { IMChatTypes } from '../plugins/im/enum'
import { ConversationInfo } from '../plugins/im/model'
import { useDispatch, useSelector } from 'react-redux'
import { conversation, getConversationInit, setConversation } from '../store/conversationReducer'
import { useEffect, useRef, useState } from 'react'
import { baseUrl } from '../config'
import UserWidget from './userWidget'
import { PlusOutlined } from '@ant-design/icons'
import AddFriend from './addFriend'

function BaseWidget() {
  const dispatch = useDispatch()
  const { conversationList } = useSelector(conversation)
  useEffect(() => {
    getConversationInit().then((res) => {
      if (res && Array.isArray(res.data) && res.data.length > 0) {
        setActive(res.data[0])
        setFriendList(res.data)
      }
      dispatch(setConversation(res?.data || []))
    })
  }, [])

  const [active, setActive] = useState<ConversationInfo>()
  const itemClass = (item: ConversationInfo) => {
    if (active && item.id === active.id) {
      return 'mb-1 rounded-xl border-violet-800'
    }
    return 'mb-1 rounded-xl border-2'
  }
  const itemStyle = (item: ConversationInfo) => {
    if (active && item.id === active.id) {
      return { padding: '8px 0' }
    }
    return { padding: '8px 0' }
  }
  useEffect(() => {
    setFriendList(conversationList)
  }, [conversationList])
  const [friendList, setFriendList] = useState<ConversationInfo[]>([])

  const navigate = useNavigate()
  useEffect(() => {
    if (active) {
      navigate(`/chat/${active.roomId}`)
    }
  }, [active])

  const listItem = (item: ConversationInfo) => {
    if (item.conversationType === IMChatTypes.C2C) {
      return (
        <List.Item
          key={item.id}
          className={itemClass(item)}
          style={itemStyle(item)}
          onClick={() => {
            setActive(item)
          }}
        >
          <List.Item.Meta
            className="pl-2 pr-2"
            avatar={<Avatar className="select-none" size="large" src={baseUrl + item.friend.avatar} />}
            title={item.friend.userName}
            description={
              <div className="text-sm truncate">{item.lastMessage ? item.lastMessage.content.content.text : ''}</div>
            }
          />
        </List.Item>
      )
    }
    return (
      <List.Item
        key={item.id}
        className={itemClass(item)}
        style={itemStyle(item)}
        onClick={() => {
          setActive(item)
        }}
      >
        <List.Item.Meta
          className="pl-2 pr-2"
          avatar={
            <Avatar size="large" className="bg-violet-900 text-gray-50 select-none">
              {item.name}
            </Avatar>
          }
          title={item.name}
          description={
            <div className="text-sm truncate">{item.lastMessage ? item.lastMessage.content.content.text : ''}</div>
          }
        />
      </List.Item>
    )
  }

  const onSearchChange = (val: any) => {
    const searchVal = val.target.value as string
    if (searchVal.trimStart().length > 0) {
      const list = friendList.filter((item) => {
        if (item.conversationType === IMChatTypes.C2C && item.friend.userName.includes(searchVal)) {
          return true
        }
        if (item.conversationType === IMChatTypes.Group && item.name.includes(searchVal)) {
          return true
        }
        return false
      })
      setFriendList(list)
    } else {
      setFriendList(conversationList)
    }
  }

  const addFriendRef = useRef<{ onOpen: () => void }>()

  return (
    <div className="w-screen h-screen">
      <div className="flex">
        <div className="w-1/4 h-screen flex flex-col bg-white">
          <div className="flex p-2">
            <Input allowClear className=" flex-1" onChange={onSearchChange} />
            <Button
              className="ml-1"
              icon={<PlusOutlined rev={undefined} />}
              onClick={() => addFriendRef.current!.onOpen()}
            ></Button>
          </div>
          <List
            className="p-2 flex-1"
            itemLayout="horizontal"
            dataSource={friendList}
            split={false}
            renderItem={(item, index) => listItem(item)}
          />
          <UserWidget />
        </div>
        <div className="flex-1">{active ? <Outlet /> : <></>}</div>
      </div>
      <AddFriend ref={addFriendRef} />
    </div>
  )
}
export default BaseWidget

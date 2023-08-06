import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import IMClient from '@/plugins/im/socket'
import ChatInput from './widget/chatInput'
import MessageView from './widget/messageView'
import chatCss from './chat.module.less'
import { useDebounceFn } from 'ahooks'
import { IMMessage } from '@/plugins/im/model'

const im = IMClient.getInstance()
function ChatPage() {
  const { roomId } = useParams()
  const [loading, setLoading] = useState<'idle' | 'loading' | 'finish'>('idle')
  const [messageList, setMessageList] = useState<Array<IMMessage>>([])
  const [lateMessage, setLateMessage] = useState<string | undefined>()

  const [scroll, setScroll] = useState(false)
  useEffect(() => {
    if (scroll) {
      messageViewRef.current?.onScrollBottom()
      setScroll(false)
    } else {
      if (lateMessage) {
        document.getElementById(lateMessage)?.scrollIntoView({ block: 'start' })
      }
    }
  }, [messageList])

  const { run: getList } = useDebounceFn(
    async (scroll: boolean) => {
      {
        if (!roomId || loading === 'finish') return
        setLoading('loading')
        const pageSize = 15
        const res = await im.getHistoryMessage({
          roomId,
          pageSize: pageSize,
          sort: 1,
          ...(messageList.length > 0 ? { messageId: messageList[0].message.id } : {})
        })
        if (messageList.length > 0) {
          setLateMessage(messageList[0].id)
        }
        if (scroll) {
          setScroll(scroll)
        }
        if (res.data?.list) {
          setMessageList([...res.data.list, ...messageList])
          if (res.data.list.length < pageSize) {
            setLoading('finish')
          }
        } else {
          setLoading('idle')
        }
      }
    },
    { wait: 60 }
  )

  const messageViewRef = useRef<{
    onScrollBottom: () => void
  }>(null)
  useEffect(() => {
    if (roomId) {
      getList(true)
      im.socket!.on('message', onPushMessag)
    }
    return () => {
      setLoading('idle')
      setMessageList([])
    }
  }, [roomId])

  const onLoad = () => {
    getList(false)
  }

  const onPushMessag = (message: IMMessage) => {
    setMessageList([...messageList, message])
    messageViewRef.current?.onScrollBottom()
  }

  return (
    <div className="bg-white">
      {roomId ? (
        <div className={`${chatCss.chat} h-screen flex flex-col`}>
          <MessageView roomId={roomId} messageList={messageList} ref={messageViewRef} onLoadMore={onLoad} />
          <ChatInput roomId={roomId} pushMessag={onPushMessag} />
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}
export default ChatPage

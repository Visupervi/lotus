import { useEffect, useImperativeHandle, useRef, forwardRef } from 'react'
import MessageItem from './messageItem'
import chatCss from '../chat.module.less'
import { useScroll, useDebounceFn } from 'ahooks'
import { IMMessage } from '@/plugins/im/model'

const MessageView = forwardRef<
  { onScrollBottom: (animation?: boolean) => void },
  { roomId: string; messageList: Array<IMMessage>; onLoadMore: () => void }
>(({ roomId, messageList, onLoadMore }, ref) => {
  let messageViewRef = useRef<HTMLDivElement | null>(null)

  const messageRef = useRef<HTMLDivElement | null>(null)
  const scroll = useScroll(messageRef)

  let lastScrollTop = 0
  const { run: scrollCallBack } = useDebounceFn(
    () => {
      if (!scroll) return
      let scrollStep = scroll.top - lastScrollTop
      lastScrollTop = scroll.top
      if (scrollStep <= 0 && scroll.top < 50) {
        lastScrollTop = scroll.top
        onLoadMore()
      }
    },
    {
      wait: 60
    }
  )

  useEffect(() => {
    messageRef.current!.addEventListener('scroll', scrollCallBack)
    return () => {
      messageRef.current?.removeEventListener('scroll', scrollCallBack)
    }
  }, [roomId])

  useImperativeHandle(ref, () => ({
    onScrollBottom
  }))

  const bottomRef = useRef<HTMLDivElement | null>(null)
  const onScrollBottom = (animation = false) => {
    if (messageViewRef.current && bottomRef.current) {
      bottomRef.current.scrollIntoView(animation ? { behavior: 'smooth' } : {})
    }
  }

  return (
    <div className={`${chatCss.message} pl-2 pt-2 pb-2`} ref={messageRef}>
      <div className={chatCss.message_view} ref={messageViewRef}>
        {messageList.map((item) => (
          <MessageItem key={item.id} message={item} />
        ))}
      </div>
      <div ref={bottomRef}></div>
    </div>
  )
})
export default MessageView

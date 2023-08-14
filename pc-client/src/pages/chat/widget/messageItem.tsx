import { baseUrl } from '@/config'
import { IMMessageTypes } from '@/plugins/im/enum'
import { IMMessage } from '@/plugins/im/model'
import { Avatar } from 'antd'
import dayjs from 'dayjs'
import TextMessage from './components/textMessage'
import ImgMessage from './components/imgMessage'

function MessageItem({ message }: { message: IMMessage }) {
  const MessageRender = () => {
    switch (message.message.type) {
      case IMMessageTypes.text:
        return <TextMessage message={message} />
      case IMMessageTypes.image:
        return <ImgMessage message={message} />
      default:
        return <div></div>
    }
  }
  
  return (
    <div className="flex pt-3 pb-3" id={message.id}>
      <Avatar src={baseUrl + message.user.avatar} className="select-none w-10 h-10 block" />
      <div className="pl-2">
        <div className="flex items-end pb-2">
          <div className="text-base font-semibold">{message.user.userName}</div>
          <span className="pl-2 text-sm text-slate-400">{dayjs(message.sendDate).format('HH:mm:ss')}</span>
        </div>
        <MessageRender />
      </div>
    </div>
  )
}
export default MessageItem

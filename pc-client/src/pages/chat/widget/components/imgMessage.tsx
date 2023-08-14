import { IMMessage, IMImageMessage } from '@/plugins/im/model'

function ImgMessage({ message }: { message: IMMessage }) {
  const item = message.message.content.content as IMImageMessage
  return (
    <div className="max-w-xl pt-1 pb-1 text-sm whitespace-pre-wrap w-auto text-gray-600 bg-white">
      <img src={item.url} alt="" />
    </div>
  )
}

export default ImgMessage

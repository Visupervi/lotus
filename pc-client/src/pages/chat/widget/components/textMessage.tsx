import { IMMessage, IMTextMessage } from '@/plugins/im/model'

function TextMessage({ message }: { message: IMMessage }) {
  const item = message.message.content.content as IMTextMessage
  return (
    <div
      className="max-w-xl pt-1 pb-1 text-sm whitespace-pre-wrap w-auto text-gray-600 bg-white p-1"
      dangerouslySetInnerHTML={{ __html: item.text }}
    ></div>
  )
}

export default TextMessage

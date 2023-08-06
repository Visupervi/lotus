import { Spin } from 'antd'

function LodingWiget() {
  return (
    <div className="w-screen h-screen flex justify-center items-center text-xl text-violet-800">
      <Spin size="large" />
    </div>
  )
}
export default LodingWiget

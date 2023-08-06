import { Tabs } from 'antd'
import About from './about'
import User from './user'

function Setting() {
  return (
    <div style={{ height: '50vh' }}>
      <Tabs
        tabPosition="left"
        items={[
          {
            key: '1',
            label: '用户',
            children: <User />
          },
          {
            key: '2',
            label: '关于',
            children: <About />
          }
        ]}
      />
    </div>
  )
}
export default Setting

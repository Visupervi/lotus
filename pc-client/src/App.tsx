import { RouterProvider } from 'react-router-dom'
import './App.css'
import { ConfigProvider, App as BaseApp } from 'antd'
import router from './router'
function App() {
  return (
    <ConfigProvider>
      <BaseApp className="bg-gray-50">
        <RouterProvider router={router} />
      </BaseApp>
    </ConfigProvider>
  )
}

export default App

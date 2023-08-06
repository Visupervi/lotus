import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'antd/dist/reset.css'
import './styles.css'
import { Provider } from 'react-redux'
import store from './store'
import IMClient from './plugins/im/socket'
import { baseUrl } from './config'

const im = IMClient.getInstance()
im.load({ baseUrl: baseUrl })

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)

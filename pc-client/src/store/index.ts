import { configureStore } from '@reduxjs/toolkit'
import conversationReducer from './conversationReducer'

export default configureStore({
  reducer: {
    conversation: conversationReducer
  }
})

import { createSlice } from '@reduxjs/toolkit'
import IMClient from '../plugins/im/socket'
import { ConversationInfo } from '../plugins/im/model'
import { getUser } from './user'

const initialState: {
  status: string
  conversationList: Array<ConversationInfo>
  error: string
} = {
  status: 'idle',
  conversationList: [],
  error: ''
}

export const conversationReducer = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    setConversation(state, action) {
      state.conversationList = action.payload
    }
  }
})

export const { setConversation } = conversationReducer.actions
export const getConversationInit = async () => {
  const im = IMClient.getInstance()
  const user = getUser()
  if (!user) {
    return
  }
  await im.login({
    userId: user.userId,
    userSig: user.userSig
  })
  const res = await im.getConversationList()
  return res
}

export const conversation = (state: any) => state.conversation as typeof initialState

export default conversationReducer.reducer

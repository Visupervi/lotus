import { IMMessageTypes } from './enum'

export interface WsData<T = any> {
  status: boolean
  data?: T
  message: string
}

export interface ListDTO {
  pageNum: number
  pageSize: number
  sort: number
}

export interface IMOptions {
  baseUrl: string
}

export interface IMLoginOptions {
  userId: number
  userSig: string
}

export interface IMLoginRep {
  status: boolean
}

export interface IMUser {
  id: number
  userName: string
  email: string
  avatar: string
  label: string
}

export type IMTextMessage = {
  text: string
}

export type IMIMageMessage = {
  url: string
}

export type IMVideoMessage = {
  url: string
}

type MessageData = {
  id: string
  extra: null
  type: string
  content: {
    type: string
    content: IMTextMessage | IMIMageMessage | IMVideoMessage
  }
}

export type IMMessage = {
  message: MessageData
  user: IMUser
  roomId: string
  read: boolean
  id: string
  sendDate: Date
}

type LastMessage = {
  id: string
  content: any
  extra: null
  type: string
  sendDate: string
}

export interface ConversationInfo {
  id: number
  roomId: string
  remark: string
  wording: string
  statue: number
  type: number
  createdDate: string
  updatedDate: string
  user: IMUser
  friend: IMUser
  conversationType: string
  lastMessage: LastMessage
  name: string
  description: string
  isActive: boolean
  users: Array<IMUser>
}

export interface IMHistoryMessageOptions {
  pageSize: number
  sort: number
  messageId?: string
  roomId: string
}

export interface IMMessageList {
  list: Array<IMMessage>
  count: number
}

export interface IMSendMessage {
  roomId: string
  content: {
    type: IMMessageTypes
    extra: string
    content: any
  }
}

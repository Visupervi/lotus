import { io, Socket } from 'socket.io-client'
import {
  ConversationInfo,
  IMHistoryMessageOptions,
  IMLoginOptions,
  IMMessage,
  IMMessageList,
  IMOptions,
  IMSendMessage,
  IMUser,
  WsData
} from './model'
import { IMEvents } from './enum'
import { Friend } from '@/model'

const TAG = '[IM]'

export default class IMClient {
  static instance: IMClient
  socket: Socket | undefined
  config = {
    userId: 0,
    userSig: ''
  }
  loading: boolean = false
  isLogin: boolean = false

  static getInstance() {
    if (!this.instance) {
      this.instance = new IMClient()
    }
    return this.instance
  }

  load(options: IMOptions) {
    if (!this.socket) {
      this.socket = io(options.baseUrl, { transports: ['websocket'] })
      this.event()
    }
  }

  event() {
    this.socket?.on('connect', () => {
      console.log(TAG, `链接成功, ID: ${this.socket?.id}`)
    })
    this.socket?.on('disconnect', () => {
      console.log(TAG, '链接断开')
    })
    this.socket?.on('exception', (val) => {
      console.log(TAG, 'exception', val)
    })
  }

  async login(options: IMLoginOptions) {
    if (this.loading) return
    this.loading = true
    if (this.isLogin) {
      console.warn(TAG, `已登陆用户${this.config.userId}`)
      return
    }
    this.config.userSig = options.userSig
    this.config.userId = options.userId
    const res = await this.send<IMLoginOptions, { status: boolean }>(IMEvents.login, options)
    console.log(res)
    if (res.status === true) {
      this.isLogin = true
    }
    this.loading = false
  }

  async logout() {
    await this.send(IMEvents.logout)
    this.isLogin = false
  }

  getMyProfile() {
    return this.send<undefined, IMUser>(IMEvents.getMyProfile)
  }

  getConversationList() {
    return this.send<undefined, ConversationInfo[]>(IMEvents.conversationList)
  }

  getFriendSearch(email: string) {
    return this.send<{ email: string }, Friend>(IMEvents.friendSearch, { email })
  }

  getFriendGetApplicationList() {
    return this.send<undefined, any>(IMEvents.friendGetApplicationList)
  }

  getHistoryMessage(options: IMHistoryMessageOptions) {
    return this.send<IMHistoryMessageOptions, IMMessageList>(IMEvents.historyMessage, options)
  }

  async sendMessage(options: IMSendMessage): Promise<IMMessage | undefined> {
    const res = await this.send<IMSendMessage, IMMessage>(IMEvents.sendMessage, options)
    return res.data
  }

  emit(types: string, options: any): Promise<WsData> {
    return new Promise((resolve) => {
      this.socket?.emit(types, options, resolve)
    })
  }

  send<T = void, C = any>(types: IMEvents, options?: T): Promise<WsData<C>> {
    if (!this.isLogin && !this.loading) {
      throw Error('未登录调用API异常')
    }
    return new Promise(async (resolve, reject) => {
      const res = await this.emit(types, options)
      if (res.status) {
        resolve(res)
      } else {
        reject(res)
      }
    })
  }
}

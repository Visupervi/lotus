import { ResponseParams } from './model'
import httpClient from '@/plugins/httpClient'

export type loginReq = { email: string; password: string }
export type registerReq = {
  email: string
  code: string
  password: string
  userName: string
}

export const ApiLogin = async (options: loginReq): Promise<ResponseParams> => {
  return await httpClient.post('/user/login', { ...options, appId: 'fenx5eY98cVruqAAyAjCI' })
}

export const ApiRegister = async (options: registerReq): Promise<ResponseParams> => {
  return await httpClient.post('/user/create', { ...options, role: 2, appId: 'fenx5eY98cVruqAAyAjCI' })
}

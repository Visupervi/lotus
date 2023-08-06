import { ResponseParams } from './model'
import httpClient from '@/plugins/httpClient'

export type emailReq = { email: string }

export const ApiSendEmailCode = async (options: emailReq): Promise<ResponseParams> => {
  return await httpClient.post('/email/send', options)
}

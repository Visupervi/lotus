import { ResponseParams } from '@/api/model'
import { baseUrl, httpSucCode } from '@/config'
import { getClient, Body } from '@tauri-apps/api/http'
const client = await getClient()

const http = {
  post(url: string, options: any): Promise<ResponseParams> {
    return new Promise((resolve, reject) => {
      const response = client.post<ResponseParams>(baseUrl + url, Body.json(options))
      response.then((res) => {
        if (res.data.code === httpSucCode) {
          resolve(res.data)
        } else {
          reject(res.data)
        }
      })
    })
  }
}
export default http

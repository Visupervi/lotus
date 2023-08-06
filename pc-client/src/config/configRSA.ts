import JSEncrypt from 'jsencrypt'

export const initConfigRSA = async () => {
  const crypt = new JSEncrypt()
  crypt.getKey()
  const privateKey = crypt.getPrivateKey()
  const publicKey = crypt.getPublicKey()
  localStorage.setItem('keys', JSON.stringify({ privateKey, publicKey }))
  return { privateKey, publicKey }
}

export default async (): Promise<{ privateKey: string; publicKey: string }> => {
  const res = localStorage.getItem('keys')
  if (!res) {
    return await initConfigRSA()
  }
  return JSON.parse(res)
}

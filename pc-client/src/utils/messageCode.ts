import JSEncrypt from 'jsencrypt'

// encryption and decryption
export const encryption = (options: Object, key: string) => {
  const str = encodeURIComponent(JSON.stringify(options))
  const encrypt = new JSEncrypt()
  encrypt.setPublicKey(key)
  const res = encrypt.encrypt(str)
  if (res) {
    console.log('加密的数据', res)
    return res
  }
  return ''
}

export const decryption = (str: string, key: string) => {
  const encrypt = new JSEncrypt()
  encrypt.setPrivateKey(key)
  const res = encrypt.decrypt(str)
  if (res) {
    console.log('解密后的数据', decodeURIComponent(res))
    return decodeURIComponent(res)
  }
  return res
}

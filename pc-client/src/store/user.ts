export type User = {
  userId: number
  userSig: string
  avatar: string
  email: string
  userName: string
  label: string
}
const getUser = (): User | undefined => {
  const user = localStorage.getItem('user')
  if (!user) {
    return undefined
  }
  return JSON.parse(user)
}
const saveUser = (val: User) => {
  return localStorage.setItem('user', JSON.stringify(val))
}

const removeUser = () => {
  localStorage.removeItem('user')
}
export { getUser, saveUser, removeUser }

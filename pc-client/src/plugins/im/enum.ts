export enum IMMessageTypes {
  text = "text",
  image = "image",
  video = "video",
}

export enum IMChatTypes {
  C2C = "C2C",
  Group = "Group",
}

export enum IMEvents {
  login = "login", // 登录
  logout = "logout", // 登出
  getMyProfile = "getMyProfile", //获取个人信息
  message = 'message', //接收消息
  sendMessage = "sendMessage", //发送消息
  conversationList = "conversationList", //会话列表
  createRoom = "createRoom", //创建房间
  friendSearch = 'friendSearch', //搜索好友
  friendAdd = "friendAdd", // 添加好友申请
  friendDelete = "friendDelete", // 删除好友
  friendCheck = "friendCheck", // 查询好友状态
  friendGetApplicationList = "friendGetApplicationList", // 获取待添加好友
  friendAcceptApplication = "friendAcceptApplication", // 同意好友申请
  friendRefuseApplication = "friendRefuseApplication", // 拒绝好友申请
  friendDeleteApplication = "friendDeleteApplication", // 删除好友申请
  historyMessage = "historyMessage", // 历史消息
}

export const selectChats = state => state.chats
export const getMessageList = (chatID) => state => state.chats[chatID]?.messages || []
export const isExistChat = (chatID) => state => state.chats[chatID]
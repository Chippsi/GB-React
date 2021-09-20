export const ADD_CHAT = 'CHATS::ADD_CHAT'
export const DEL_CHAT = 'CHATS:DEL_CHAT'
export const SEND_MESSAGE = 'CHATS:SEND_MESSAGE'

export const addChat = (chatID, chatName) => ({
    type: ADD_CHAT,
    payload: {
        chatID,
        chatName
    }
})

export const delChat = (chatID) => ({
    type: DEL_CHAT,
    payload: {
        chatID
    }
})

export const sendMessage =  (chatID, author, txt, time, id) => ({
    type: SEND_MESSAGE,
    payload: {
        chatID,
        author,
        txt,
        time,
        id
    }
})
import { v4 as uuidv4 } from 'uuid'

import { USER_NAME } from "../../constants/constants"
import { getTime } from "../../functions/functions"

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

const sendMessage = (chatID, author, txt, time, id) => ({
    type: SEND_MESSAGE,
    payload: {
        chatID,
        author,
        txt,
        time,
        id
    }
})

/* const botTimeoutDcorator = (callback) => { //!
    let botTimeout
    return callback
} */

export const sendMessageThunk = (chatID, author, txt, time, id) => (dispatch) => {
    dispatch(sendMessage(chatID, author, txt, time, id))
    if (USER_NAME === author) {
        sendMessageThunk.botTimeout && clearTimeout(sendMessageThunk.botTimeout)
        sendMessageThunk.botTimeout = setTimeout(() => {
            dispatch(sendMessageThunk(chatID, 'BOT', 'Бот Валерий на связи!', getTime(), uuidv4()))
        }, 1500)
    }
}
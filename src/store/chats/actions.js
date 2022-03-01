import { onChildAdded, set, push, query, orderByKey, startAt, onChildRemoved, onValue, off } from '@firebase/database'

import { GET_CHATID_REF, CHATS_REF, GET_MESSAGES_REF } from '../../services/firebase'

export const ADD_CHAT = 'CHATS::ADD_CHAT'
export const DEL_CHAT = 'CHATS:DEL_CHAT'
export const SEND_MESSAGE = 'CHATS:SEND_MESSAGE'
export const INIT_CHATS = 'INIT_CHATS'

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

const initChats = (chats) => ({
    type: INIT_CHATS,
    payload: {
        chats
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

export const initChatsFbThunk = () => (dispatch) => {
    onValue(CHATS_REF, (chats) => {
        if (!chats.exists()) {
            console.log("No data available")
            return
        }
        dispatch(initChats(chats.val()))
    }, {
        onlyOnce: true
    })

    //chats events
    onChildAdded(query(CHATS_REF, orderByKey(), startAt(push(CHATS_REF).key)), (chat) => {
        dispatch(addChat(chat.key, chat.val().name))
        initMessagesFbThunk(chat.key)
    })
    onChildRemoved(CHATS_REF, (chat) => {
        dispatch(delChat(chat.key))
    })
}

export const initMessagesFbThunk = (chatID) => (dispatch) => {
    const messagesRef = GET_MESSAGES_REF(chatID)

    // messages events
    onChildAdded(query(messagesRef, orderByKey(), startAt(push(messagesRef).key)), (message) => {
        const { author, txt, time } = message.val()
        const id = message.key
        dispatch(sendMessage(chatID, author, txt, time, id))
    })
    /*  onChildRemoved(messagesRef, (message) => {
        console.log('remove message')
    }) */
}

export const removeChatsEventListeners = () => off(CHATS_REF)
export const removeMessagesEventListeners = (chatID) => off(GET_MESSAGES_REF(chatID))

export const addChatFb = (chatName) => {
    set(push(CHATS_REF), {
        name: chatName,
    })
}

export const delChatFb = (chatID) => {
    set(GET_CHATID_REF(chatID), null)
}

export const sendMessageFb = (chatID, author, txt, time) => {
    push(GET_MESSAGES_REF(chatID), {
        author,
        txt,
        time
    })
}
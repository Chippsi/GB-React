import { ADD_CHAT, DEL_CHAT, SEND_MESSAGE, INIT_CHATS } from "./actions"

const initialState = {
    /* 'chat1': {
        name: 'Чат 1',
        messages: {
            '123123124123': { author: 'Anton', txt: 'Привет!', time: '20:00' }
        }
    }, */
}

export const chatsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case INIT_CHATS:
            return {
                ...state,
                ...payload.chats
            }
        case ADD_CHAT:
            return {
                ...state,
                [payload.chatID]: { name: payload.chatName, messages: {} }
            }

        case DEL_CHAT:
            const newState = { ...state }
            delete newState[payload.chatID]
            return newState

        case SEND_MESSAGE:
            return {
                ...state,
                [payload.chatID]: {
                    ...state[payload.chatID],
                    'messages': {
                        ...state[payload.chatID].messages,
                        [payload.id]: {
                            author: payload.author,
                            txt: payload.txt,
                            time: payload.time,
                        }
                    }
                }
            }

        default:
            return state
    }
}
import { ADD_CHAT, DEL_CHAT, SEND_MESSAGE } from "./actions"

const initialState = {
    'chat1': { name: 'Чат 1', messages: [{ author: 'Anton', txt: 'Привет!', time: '20:00', id: 123123124123 }] },
    'chat2': { name: 'Чат 2', messages: [{ author: 'Anton', txt: 'Приветasdsadasdas!', time: '20.00', id: 12312323124123 }] },
    'chat3': { name: 'Чат 3', messages: [] }
}

export const chatsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ADD_CHAT:
            return {
                ...state,
                [payload.chatID]: { name: payload.chatName, messages: [] }
            }

        case DEL_CHAT:
            const newState = {...state}
            delete newState[payload.chatID]
            return newState

        case SEND_MESSAGE:
            return {
                ...state,
                [payload.chatID]: {
                    ...state[payload.chatID],
                    'messages': [
                        ...state[payload.chatID].messages,
                        {
                            author: payload.author,
                            txt: payload.txt,
                            time: payload.time,
                            id: payload.id
                        }
                    ]
                }
            }
            
        default:
            return state
    }
}
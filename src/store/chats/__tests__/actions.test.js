import { addChat, ADD_CHAT } from "../actions"

describe('chats actions test', () => {
    test('addChat', () => {
        const expected = {
            type: ADD_CHAT,
            payload: {
                chatID: '123456',
                chatName: 'New Chat'
            }
        }
        const recived = addChat('123456', 'New Chat')

        expect(expected).toEqual(recived)
    })
})
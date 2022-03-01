import { render } from "@testing-library/react"
import { Provider } from "react-redux"
import { mockStore } from "../../../setupTests"
import { MemoryRouter } from 'react-router-dom'

import ChatList from "../ChatList"
import { initChatsFbThunk } from "../../../store/chats/actions"

describe('ChatList test:', () => {
    const initialStore = {
        chats: {
            'chat1': {
                name: 'Чат 1',
                messages: {
                    '123123124123': { author: 'Anton', txt: 'Привет!', time: '20:00' }
                }
            },
        }
    }
    const store = mockStore(initialStore)
    render(<Provider store={store}><ChatList /></Provider>, {wrapper: MemoryRouter})
    //screen.debug()
})
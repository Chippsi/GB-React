import List from '@material-ui/core/List'
import { v4 as uuidv4 } from 'uuid'
import { useDispatch } from 'react-redux'
import { addChat } from '../../store/chats/actions'

import './ChatList.sass'
import ChatItem from '../chatItem/ChatItem'

export default function ChatList({ chats }) {
    const dispatch = useDispatch()

    const chatsJSX = Object.entries(chats).map((chat) => <ChatItem chatID={chat[0]} chatName={chat[1].name} />)

    const handleAddChat = () => {
        const newChatName = prompt('Введите название чата', 'Новый чат')
        const newChatID = uuidv4()
        if (!newChatName || !newChatID) return
        dispatch(addChat(newChatID, newChatName))
    }

    return (
        <div>
            <List className='chatList'>
                {chatsJSX}
            </List>
            <button onClick={handleAddChat} className='App__addChat' type='button'>+</button>
        </div>
    )
}

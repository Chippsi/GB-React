import List from '@material-ui/core/List'
import { v4 as uuidv4 } from 'uuid'
import { useDispatch, useSelector } from 'react-redux'
import { addChatFb, initChatsFbThunk, removeChatsEventListeners } from '../../store/chats/actions'

import './ChatList.sass'
import ChatItem from '../chatItem/ChatItem'
import { selectChats } from '../../store/chats/selectors'
import { useEffect } from 'react'

export default function ChatList() {
    const chats = useSelector(selectChats)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initChatsFbThunk())
        return removeChatsEventListeners
    }, [])

    const renderChats = () => Object.entries(chats).map(([id, { name }]) => <ChatItem key={id} chatID={id} chatName={name} />)

    const handleAddChat = () => {
        const newChatName = prompt('Введите название чата', 'Новый чат')
        const newChatID = uuidv4()
        if (!newChatName || !newChatID) return
        addChatFb(newChatName)
    }

    return (
        <div>
            <List className='chatList'>
                {renderChats()}
            </List>
            <button onClick={handleAddChat} className='App__addChat' type='button'>+</button>
        </div>
    )
}

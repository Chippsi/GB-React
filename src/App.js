import { useMemo } from 'react'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'

import './App.sass'
import ChatList from './components/chatList/ChatList'
import MessageList from './components/messageList/MessageList'
import MessengerForm from './components/messengerForm/MessengerForm'
import { getMessageList, isExistChat } from './store/chats/selectors'

export default function App() {
  const { chatID } = useParams()
  const messages = useSelector(getMessageList(chatID))
  const chatExist = useSelector(isExistChat(chatID))
  
  return (
    <div className="App">
      <div className="App__container container">
        <div className="App__grid">
          <div className="App__side">
            <ChatList />
          </div>
          <div className="App__body">
            {chatExist ?
              <>
                <MessageList messages={messages} />
                <MessengerForm chatID={chatID} messages={messages} />
              </>
              :
              <div className="App__hello">Добро пожаловать!</div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

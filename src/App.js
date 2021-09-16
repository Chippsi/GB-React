import React, { useState, useEffect, useRef, useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useParams } from 'react-router'

import './App.sass'
import Message from './components/message/Message'
import MessengerForm from './components/messengerForm/MessengerForm'
import ChatList from './components/chatList/ChatList'

const initialChats = {
  'chat1': { name: 'Чат 1', messages: [{ author: 'Anton', txt: 'Привет!', time: '20:00', id: 123123124123 }]},
  'chat2': { name: 'Чат 2', messages: [{ author: 'Anton', txt: 'Приветasdsadasdas!', time: '20.00', id: 123123124123 }]},
  'chat3': { name: 'Чат 3', messages: []}
}

export default function App() {
  const { chatID } = useParams()
  const [chats, setChats] = useState(initialChats)
  const messages = chats[chatID]?.messages || []

  const userName = 'Anton'
  const lastMessageAuthor = messages[messages.length - 1]?.author
  const botDelayRef = useRef(null)

  const messagesJSX = messages.map((message, index) => {
    const author = message.author
    return <Message
      key={message.id}
      txt={message.txt}
      time={message.time}
      firstEl={author !== messages[index - 1]?.author}
      isOut={author === userName}
    />
  })

  const getTime = () => {
    const date = new Date()
    const time = [date.getHours(), date.getMinutes()]
    return time.map(el => el >= 10 ? '' + el : '0' + el).join(':')
  }

  const sendMassege = (input) => {
    setChats((chats) => {
      return {
        ...chats,
        [chatID]: {
          ...chats[chatID],
          'messages': [...messages, { author: 'Anton', txt: input.value, time: getTime(), id: uuidv4() }]
        }
      }
    })
  }

  useEffect(() => {
    if (userName === lastMessageAuthor) {
      botDelayRef.current && clearTimeout(botDelayRef.current)
      botDelayRef.current = setTimeout(() => {
        setChats({
          ...chats,
          [chatID]: {
            ...chats[chatID],
            'messages': [...messages, { author: 'BOT', txt: 'Бот Валерий на связи!', time: getTime(), id: uuidv4() }]
          }
        })
      }, 1500)
    }
  })


  return (
    <div className="App">
      <div className="App__container container">
        <div className="App__grid">
          <div className="App__side">
            <ChatList chats={Object.entries(chats)} />
            <button className='App__addChat' type='button'>+</button>
          </div>
          <div className="App__body">
            {chats[chatID] ? 
              <>
                <div className="App__msgList">
                  {messagesJSX}
                </div>
                <MessengerForm getState={sendMassege} />
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

import { useEffect } from 'react'
import { USER_NAME } from '../../constants/constants'
import Message from '../message/Message'

export default function MessageList({ messages }) {
    const renderMessages = () => (Array.isArray(messages) ? messages : Object.entries(messages)).map(([id, message], index) => {
        const author = message.author
        return <Message
            key={id}
            txt={message.txt}
            time={message.time}
            firstEl={author !== messages[index - 1]?.author}
            isOut={author === USER_NAME}
        />
    })

    return (
        <div className="App__msgList">
            {renderMessages()}
        </div>
    )
}
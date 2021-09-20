import { USER_NAME } from '../../constants/constants'
import Message from '../message/Message'

export default function MessageList({ messages }) {

    const messagesJSX = messages.map((message, index) => {
        const author = message.author
        return <Message
            key={message.id}
            txt={message.txt}
            time={message.time}
            firstEl={author !== messages[index - 1]?.author}
            isOut={author === USER_NAME}
        />
    })

    return (
        <div className="App__msgList">
            {messagesJSX}
        </div>
    )
}
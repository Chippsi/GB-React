import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { Link } from "react-router-dom"

import './ChatList.sass'

export default function chatList({ chats }) {
    const chatsJsx = chats.map((chat) => {
        return (
            <Link key={chat[0]} to={`/chats/${chat[0]}`}>
                <ListItem className='chatList__item' /* disabled */ divider button>
                    <ListItemText className='chatList__txt'>{chat[1].name}</ListItemText>
                </ListItem>
            </Link>
        )
    })

    return (
        <div>
            <List className='chatList'>
                {chatsJsx}
            </List>
        </div>
    )
}

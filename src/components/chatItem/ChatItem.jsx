import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@mui/material/IconButton'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { Link } from "react-router-dom"
import { useDispatch } from 'react-redux'

import { delChat } from '../../store/chats/actions'

export default function ChatItem({ chatID, chatName }) {
    const dispatch = useDispatch()
    const handleDeleteChat = () => dispatch(delChat(chatID))

    return (
        <li key={chatID} className="chatList__itemBox">
            <Link to={`/chats/${chatID}`}>
                <ListItemButton className='chatList__item' divider>
                    <ListItemText className='chatList__txt'>{chatName}</ListItemText>
                </ListItemButton>
            </Link>
            <IconButton onClick={handleDeleteChat} className='chatList__item-delete'>
                <DeleteForeverIcon />
            </IconButton>
        </li>
    )
}

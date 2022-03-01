import { Button } from '@material-ui/core'
import { TextField } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import './LoginForm.sass'
import { useState } from 'react'
export default function LoginForm({ login }) {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    const changeName = (e) => setName(e.target.value)
    const changePassword = (e) => setPassword(e.target.value)
    const hundleSubmit = (e) => {
        e.preventDefault()
        setName('')
        setPassword('')
        login(name, password)
    }

    return (
        <form onSubmit={hundleSubmit} method='POST' className='loginForm'>
            <TextField onChange={changeName} value={name} className='loginForm__inpWrp' fullWidth id="standard-basic" label="E-mail" variant="standard" />
            <TextField onChange={changePassword} value={password} className='loginForm__inpWrp' fullWidth id="standard-basic" label="Password" variant="standard" />
            <Button type='submit' className='loginForm__btn' variant="contained" endIcon={<SendIcon />}>
                Send
            </Button>
        </form>
    )
}

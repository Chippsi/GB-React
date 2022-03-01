import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'

import { USER_NAME } from '../../constants/constants'
import './MessagerForm.sass'
import { sendMessage } from '../../store/chats/actions'

export default function Textarea({ chatID, messages }) {
    const inputPlaceholder = 'Type a message'
    const inputRef = useRef(null)
    const [input, setInput] = useState({ value: '', placeholder: inputPlaceholder, focus: '' })
    const dispatch = useDispatch()

    const lastMessageAuthor = messages[messages.length - 1]?.author
    const botTimeoutRef = useRef(null)

    const setInputRange = (el) => {
        const range = new Range()
        const childNodes = el.childNodes.length
        range.setStart(el, childNodes)
        range.setEnd(el, childNodes)
        document.getSelection().removeAllRanges()
        document.getSelection().addRange(range)
    }

    const getTime = () => {
        const date = new Date()
        const time = [date.getHours(), date.getMinutes()]
        return time.map(el => el >= 10 ? '' + el : '0' + el).join(':')
    }

    const focusInput = () => {
        inputRef.current.focus()
        setInputRange(inputRef.current)
        if (inputRef.current.innerText === inputPlaceholder) {
            setInput({
                ...input,
                placeholder: '',
                focus: ' _focus',
            })
        }
    }

    const blurInput = () => {
        if (!inputRef.current.innerText.length) {
            setInput({
                ...input,
                placeholder: inputPlaceholder,
                focus: ''
            })
        }
    }

    const changeInput = () => {
        setInputRange(inputRef.current)
        setInput({
            ...input,
            value: inputRef.current.innerText,
            placeholder: inputRef.current.innerText
        })
    }

    const submitForm = (e) => {
        if (e.type === 'keypress' && e.charCode !== 13) return
        e.preventDefault()

        if (input.value) {
            dispatch(sendMessage(chatID, 'Anton', input.value, getTime(), uuidv4()))
            setInput({
                ...input,
                value: '',
                placeholder: ''
            })
        }
    }

    useEffect(() => {
        if (USER_NAME === lastMessageAuthor) {
            botTimeoutRef.current && clearTimeout(botTimeoutRef.current)
            botTimeoutRef.current = setTimeout(() => {
                dispatch(sendMessage(chatID, 'BOT', 'Бот Валерий на связи!', getTime(), uuidv4()))
            }, 1500)
        }
        return () => botTimeoutRef.current && clearTimeout(botTimeoutRef.current)
    })

    useEffect(() => {
        inputRef.current.focus()
    }, [])

    return (
        <form onSubmit={submitForm} onFocus={focusInput} className='messagerForm' tabIndex='0'>
            <div className='messagerForm__body'>
                <textarea value={input.value} className='messagerForm__textarea hidden' name='messagerTextarea' id='messagerTextarea' rows='1'></textarea>
                <div
                    ref={inputRef}
                    onKeyPress={submitForm}
                    onInput={changeInput}
                    onBlur={blurInput}
                    className={`messagerForm__txtInput ${input.focus}`}
                    tabIndex='0'
                    contentEditable
                    suppressContentEditableWarning
                >
                    {input.placeholder}
                </div>
                <button type='submit' className='messagerForm__button'></button>
            </div>
        </form>
    )
}


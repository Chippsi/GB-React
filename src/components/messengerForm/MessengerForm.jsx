import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'

import './MessagerForm.sass'
import { sendMessageThunk } from '../../store/chats/actions'
import { getTime } from '../../functions/functions'

export default function Textarea({ chatID }) {
    const inputPlaceholder = 'Type a message'
    const inputRef = useRef(null)
    const [input, setInput] = useState({ value: '', placeholder: inputPlaceholder, focus: '' })
    const dispatch = useDispatch()

    const setInputRange = (el) => {
        const range = new Range()
        const childNodes = el.childNodes.length
        range.setStart(el, childNodes)
        range.setEnd(el, childNodes)
        document.getSelection().removeAllRanges()
        document.getSelection().addRange(range)
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
            dispatch(sendMessageThunk(chatID, 'Anton', input.value, getTime(), uuidv4()))
            setInput({
                ...input,
                value: '',
                placeholder: ''
            })
        }
    }

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


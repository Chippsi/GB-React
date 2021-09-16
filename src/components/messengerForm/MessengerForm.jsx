import { useState, useEffect, useRef } from 'react'
import './MessagerForm.sass'


export default function Textarea({ getState }) {
    const inputPlaceholder = 'Type a message'
    const inputRef = useRef(null)
    const [input, setInput] = useState({value: '', placeholder: inputPlaceholder, focus: '' })

    useEffect(() => {
        inputRef.current.focus()
    }, [])

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

    const submitForm = (e, callback = getState) => {
        if (e.type === 'keypress' && e.charCode !== 13) return
        e.preventDefault()
        
        if (input.value) {
            callback(input)
            setInput({
                ...input,
                value: '',
                placeholder: ''
            })
        }
    }

    const setInputRange = (el) => {
        const range = new Range()
        const childNodes = el.childNodes.length
        range.setStart(el, childNodes)
        range.setEnd(el, childNodes)
        document.getSelection().removeAllRanges()
        document.getSelection().addRange(range)
    }
    
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


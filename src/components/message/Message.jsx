import React from 'react'
import './Message.sass'
import TriangleSvg from './icons/Triangle'

export default React.memo(function Message({ txt, time, firstEl, isOut }) {
    return (
        <div className={`message ${isOut ? 'isOut' : ''}`}>
            <div className='message__body'>
                <span className='message__txt'>{txt}</span>
                <span className='message__time'>{time}</span>
                {firstEl && <span className='message__decor'> <TriangleSvg className='message__triangle' /> </span>}
            </div>
        </div>
    )
})
import React from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { toggleShowName } from '../store/profile/actions'
import { store } from '../store/store'
import './Profile.sass'

export default function Profile() {
    const showName = useSelector((state) => state.showName)
    const dispatch = useDispatch()
    const handleClick = () => {
        dispatch(toggleShowName)
    }
    return (
        <div className='profile'>
            <div>
                Профиль
            </div>
            {showName && <div>Name show - true</div>}
            <button onClick={handleClick}>Toggle Name</button>
        </div>
    )
}

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Checkbox from '@mui/material/Checkbox'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import Favorite from '@mui/icons-material/Favorite'

import { toggleShowName, toggleCheckBox } from '../store/profile/actions'
import './Profile.sass'
import { selectCheckBox, selectShowName } from '../store/profile/selectors'

export default function Profile() {
    const showName = useSelector(selectShowName)
    const checkBox = useSelector(selectCheckBox)
    console.log(showName, checkBox);
    const dispatch = useDispatch()
    const handleClickButton = () => {
        dispatch(toggleShowName)
    }
    const handleClickCheckBox = () => {
        dispatch(toggleCheckBox)
    }
    return (
        <div className='profile'>
            <div>
                Профиль
            </div>
            {showName && <div>Name show - true</div>}
            <button onClick={handleClickButton}>Toggle Name</button>
            <div className="checkboxWrp">
                <Checkbox onChange={handleClickCheckBox} checked={checkBox} icon={<FavoriteBorder />} checkedIcon={<Favorite />} color='error' />
                {checkBox && <span style={{color: 'purple', fontWeight: '700'}}>Redux</span>}
            </div>
        </div>
    )
}

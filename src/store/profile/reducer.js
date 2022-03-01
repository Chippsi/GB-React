import { TOGGLE_SHOW_NAME, TOGGLE_CHECK_BOX } from "./actions"

const initialState = {
    showName: false,
    checkBox: false
}

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_SHOW_NAME: {
            return {
                ...state,
                showName: !state.showName
            }
        }
        case TOGGLE_CHECK_BOX: {
            return {
                ...state,
                checkBox: !state.checkBox
            }
        }
        default:
            return state
    }
}
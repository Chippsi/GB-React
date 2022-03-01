import { STATUS } from '../../constants/constants'
import { GET_MAX_TOTAL_COUNT, GET_POSTS_ERROR, GET_POSTS_REQUEST, GET_POSTS_SUCCESS } from './actions'

const initialState = {
    posts: [],
    totalCount: 0,
    maxTotalCount: 0,
    request: STATUS.IDLE,
    error: null
}

export const postsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_POSTS_REQUEST:
            return {
                ...state,
                request: STATUS.REQUEST,
                error: null
            }
        case GET_POSTS_SUCCESS:
            return {
                ...state,
                posts: [...state.posts, ...payload],
                totalCount: state.totalCount + 10,
                request: STATUS.SUCCESS
            }
        case GET_POSTS_ERROR:
            return {
                ...state,
                request: STATUS.FAILURE,
                error: payload
            }
        case GET_MAX_TOTAL_COUNT:
            return {
                ...state,
                maxTotalCount: payload
            }

        default:
            return state
    }
}
export const GET_POSTS_REQUEST = 'POSTS::GET_POSTS_REQUEST'
export const GET_POSTS_SUCCESS = 'POSTS::GET_POSTS_SUCCESS'
export const GET_POSTS_ERROR = 'POSTS::GET_POSTS_ERROR'
export const GET_MAX_TOTAL_COUNT = 'POSTS::GET_MAX_TOTAL_COUNT'

export const getPostsRequest = () => ({
    type: GET_POSTS_REQUEST
})

export const getPostsSuccess = (posts) => ({
    type: GET_POSTS_SUCCESS,
    payload: posts
})

export const getPostsError = (error) => ({
    type: GET_POSTS_ERROR,
    payload: error
})

export const getMaxTotalCount = (max) => ({
    type: GET_MAX_TOTAL_COUNT,
    payload: max
})
export const getPostsThunk = () => (dispatch, getState) => {
    const state = getState().posts
    if(state.request === 1 || state.maxTotalCount && state.totalCount >= +state.maxTotalCount) return
    dispatch(getPostsRequest())

    return fetch(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${state.totalCount / 10 + 1}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`error ${response.status}`)
            }
            !state.maxTotalCount && dispatch(getMaxTotalCount(response.headers.get('x-total-count')))
            return response.json()
        })
        .then(result => {
            dispatch(getPostsSuccess(result))
        })
        .catch((err) => {
            dispatch(getPostsError(err.message))
        })
}
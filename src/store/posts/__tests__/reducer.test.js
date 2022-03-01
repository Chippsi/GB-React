import { STATUS } from "../../../constants/constants"
import { getMaxTotalCount, getPostsError, getPostsRequest, getPostsSuccess } from "../actions"
import { postsReducer } from "../reducer"

describe('postsReducer:', () => {
    let defaultState
    beforeEach(() => {
        defaultState = {
            posts: [],
            totalCount: 0,
            maxTotalCount: 0,
            request: STATUS.IDLE,
            error: null
        }
    })
    test('action GET_POSTS_REQUEST: should update state with request status === 1(REQUEST)', () => {
        const expected = {
            ...defaultState,
            request: STATUS.REQUEST,
            error: null
        }
        const result = postsReducer(defaultState, getPostsRequest())
        expect(result.request).toBe(expected.request)
    })
    test('action GET_POSTS_SUCCESS: should add new POSTS & update request status(SUCCESS) & increase count posts ', () => {
        const expected = {
            ...defaultState,
            request: STATUS.REQUEST,
            posts: [...defaultState.posts, ...[{'test': 123, 'test2': 321}]],
            totalCount: defaultState.totalCount + 10,
            request: STATUS.SUCCESS
        }
        const result = postsReducer(defaultState, getPostsSuccess( [{'test': 123, 'test2': 321}] ))
        expect(result).toEqual(expected)
    })
    test('action GET_POSTS_ERROR: should add Error & update request status(ERROR)', () => {
        const expected = {
            ...defaultState,
            request: STATUS.FAILURE,
            error: 'test Error'
        }
        const result = postsReducer(defaultState, getPostsError('test Error'))
        expect(result).toEqual(expected)
    })
    test('action GET_MAX_TOTAL_COUNT: should update max.total count of posts', () => {
        const expected = {
            ...defaultState,
            maxTotalCount: 100
        }
        const result = postsReducer(defaultState, getMaxTotalCount(100))
        expect(result).toEqual(expected)
    })
    test('action undefined should return default state', () => {
        const result = postsReducer(defaultState, {type: null, payload: null})
        expect(result).toEqual(defaultState)
    })
})
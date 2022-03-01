import { STATUS } from "../../../constants/constants"
import { getMaxTotalCount, getPostsError, getPostsSuccess, getPostsThunk } from "../actions"

describe('getPostsThunk(): ', () => {
    const mockGetState = jest.fn()
    const mockDispatch = jest.fn()
    let state
    beforeEach(() => {
        state = {
            posts: {
                posts: [],
                totalCount: 0,
                maxTotalCount: 0,
                request: STATUS.IDLE,
                error: null
            }
        }

        mockGetState.mockReturnValue(state)
        fetchMock.mockOnce(JSON.stringify('fetch ok'), {headers: {'x-total-count': 10}})
    })
    test('should call the dispatch() if the maxTotalCount === 0', async () => {
        await getPostsThunk()(mockDispatch, mockGetState)
        expect(mockDispatch).toHaveBeenNthCalledWith(2, getMaxTotalCount('10'))
        expect(mockDispatch).toBeCalledTimes(3)
    })
    test('should NOT call the dispatch() if the request status === 1(REQUEST)', async () => {
        state.posts.request = STATUS.REQUEST
        state.posts.maxTotalCount = 20
        state.posts.totalCount = 10
        await getPostsThunk()(mockDispatch, mockGetState)
        expect(mockDispatch).not.toBeCalled()
    })
    test('should NOT call the dispatch() if the posts totalCount >= maxTotalCount', async () => {
        state.posts.maxTotalCount = 10
        state.posts.totalCount = 20
        await getPostsThunk()(mockDispatch, mockGetState)
        expect(mockDispatch).not.toBeCalled()
    })
    test('should call dispatch(getPostsSuccess(result)) if fetch ---resolved', async () => {
        state.posts.maxTotalCount = 20
        state.posts.totalCount = 10
        await getPostsThunk()(mockDispatch, mockGetState)
        expect(mockDispatch).toBeCalledTimes(2)
        expect(mockDispatch).toHaveBeenNthCalledWith(2, getPostsSuccess('fetch ok'))
    })
    test('should call dispatch(getPostsError(err)) if fetch ---rejected', async () => {
        state.posts.maxTotalCount = 20
        state.posts.totalCount = 10
        fetchMock.resetMocks()
        fetchMock.mockRejectOnce(new Error('fetch Crashed'))
        await getPostsThunk()(mockDispatch, mockGetState)
        expect(mockDispatch).toBeCalledTimes(2)
        expect(mockDispatch).toHaveBeenNthCalledWith(2, getPostsError('fetch Crashed'))
    })
})
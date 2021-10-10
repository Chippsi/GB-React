import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { profileReducer } from './profile/reducer'
import { chatsReducer } from './chats/reducer'
import { postsReducer } from './posts/reducer'
import ReduxThunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistConfig = {
    key: 'root1337',
    storage,
    blacklist: ['posts', 'chats']
}

const rootReducer = combineReducers({
    profile: profileReducer,
    chats: chatsReducer,
    posts: postsReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(ReduxThunk))
)

export const persistor = persistStore(store)
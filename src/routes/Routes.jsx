import { onAuthStateChanged } from '@firebase/auth'
import React, { useEffect, useState } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom"

import App from '../App'
import Loader from '../components/loader/Loader'
import Home from '../pages/home/Home'
import Login from '../pages/login/Login'
import NotFound from '../pages/notFound/NotFound'
import Posts from '../pages/posts/Posts'
import Profile from '../pages/profile/Profile'
import { auth, logIn, logOut } from '../services/firebase'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

export default function Routes() {
    const [authed, setAuthed] = useState(null)
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            user ? setAuthed(true) : setAuthed(false)
        })
        return unsubscribe
    }, [])

    return (
        <>
            {authed === null ?
                <Loader />
                :
                <Router>
                    <Switch>
                        <Route exact path='/'>
                            <Home auth={authed} signOut={logOut} />
                        </Route>
                        <PublicRoute exact path='/login' auth={authed} >
                            <Login login={logIn} />
                        </PublicRoute>
                        <Route exact path='/posts'>
                            <Posts />
                        </Route>
                        <PrivateRoute exact path='/chats/:chatID?' auth={authed}>
                            <App />
                        </PrivateRoute>
                        <PrivateRoute exact path='/profile' auth={authed}>
                            <Profile />
                        </PrivateRoute>
                        <Route path='*'>
                            <NotFound />
                        </Route>
                    </Switch>
                </Router>
            }
        </>
    )
}

import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom"

import App from '../App'
import Home from '../home/Home'
import NotFound from '../notFound/NotFound'
import Posts from '../posts/Posts'
import Profile from '../profile/Profile'

export default function routes() {
    return (
        <Router>
            <Switch>
                <Route exact path='/'>
                    <Home/>
                </Route>
                <Route exact path='/posts'>
                    <Posts/>
                </Route>
                <Route exact path='/chats/:chatID?'>
                    <App/>
                </Route>
                <Route exact path='/profile'>
                    <Profile/>
                </Route>
                <Route path='*'>
                    <NotFound/>
                </Route>
            </Switch> 
        </Router> 
    )
}

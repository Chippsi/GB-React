import { Redirect, Route } from 'react-router'

export default function PublicRoute({ auth, ...props }) {
    return (
        !auth ? <Route {...props}/> : <Redirect to="/" />
    )
}

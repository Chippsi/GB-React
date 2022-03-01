import { Redirect, Route } from 'react-router'

export default function PrivateRoute({ auth, ...props }) {
    return (
        auth ? <Route {...props}/> : <Redirect to="/login" />
    )
}

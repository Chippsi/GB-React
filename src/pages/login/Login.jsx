import LoginForm from "../../components/loginForm/LoginForm"
import './Login.sass'
export default function Login({ login }) {
    return (
        <div className='login container'>
            <LoginForm login={login}/>
        </div>
    )
}



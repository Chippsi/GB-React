import { Button } from "@material-ui/core"
import {
  Link
} from "react-router-dom"

import './Home.sass'

export default function Home({ auth, signOut }) {
  return (
    <div className="home">
      <div className="home__container container">
        <ul className="home__menu">
          {!auth ?
            <li className="home__menu-item"><Link to='/login'>Авторизация</Link></li>
            :
            <Button onClick={signOut} type='button' color={"error"} className='loginForm__btn' variant="contained">
              Выйти
            </Button>
          }
          <li className="home__menu-item"><Link to='/posts'>Посты</Link></li>
          <li className="home__menu-item"><Link to='/chats'>Чаты</Link></li>
          <li className="home__menu-item"><Link to='/profile'>Профиль</Link></li>
        </ul>
      </div>
    </div>
  )
}

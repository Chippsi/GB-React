import {
  Link
} from "react-router-dom"

import './Home.sass'

export default function Home() {
  return (
    <div className="home">
      <div className="home__container container">
        <ul className="home__menu">
          <li className="home__menu-item"><Link to='/chats'>Чаты</Link></li>
          <li className="home__menu-item"><Link to='/profile'>Профиль</Link></li>
        </ul>
      </div>
    </div>
  )
}

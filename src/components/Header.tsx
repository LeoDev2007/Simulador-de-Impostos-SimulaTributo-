
import {ROUTES} from '../routes/routes'
import { NavLink } from 'react-router-dom'
import styles from '../styles/Header.module.css'



const Header = () => {
  return (
    <div className={styles.header}>
        <nav className={styles.nav}>
            <NavLink to={ROUTES.HOME}>Home</NavLink>
            <NavLink to={ROUTES.HISTORY}>Histórico</NavLink>
            <NavLink to={ROUTES.CHARTS}>Gráficos</NavLink>
        </nav>
    </div>
  )
}

export default Header
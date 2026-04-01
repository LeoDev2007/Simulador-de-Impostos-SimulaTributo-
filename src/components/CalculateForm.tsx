
import {ROUTES} from '../routes/routes'
import { NavLink, Outlet } from 'react-router-dom'
import styles from '../styles/CalculateForm.module.css'


const CalculateForm = () => {
  return (
    <div className={styles.box}>
        <div className={styles.links}>
            <NavLink to={ROUTES.IRFORM} className={({isActive}) => isActive ? styles.activeLink : styles.link}>Salário</NavLink>
            <NavLink to={ROUTES.ICMSIPVAFORM} className={({isActive}) => isActive ? styles.activeLink : styles.link}>Bem/Imóvel</NavLink>
        </div>
        <div className={styles.container}>
            <Outlet />
        </div>
    </div>
  )
}

export default CalculateForm
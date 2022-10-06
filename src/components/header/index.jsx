import './header.sass'
import { Link } from 'react-router-dom'
import { isClassNameActive } from '../../utils/functions'

const Header = ({ auth = false, setIsAuth }) => {
    const onLogoutClick = () => {
        if (!window.confirm('Are you sure?')) return
        localStorage.removeItem('token')
        setIsAuth(false)
    }

    return (
        <header className='header'>
            <Link to={'/'} className={isClassNameActive(auth, 'header__title')}>
                Lenwo
            </Link>
            <button
                onClick={onLogoutClick}
                className={isClassNameActive(auth, 'header__logout')}
            >
                Logout
            </button>
        </header>
    )
}

export default Header

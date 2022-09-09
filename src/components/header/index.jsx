import './header.sass'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header className='header'>
            <Link to={'/'} className='header__title'>Lenwo</Link>
        </header>
    )
}

export default Header

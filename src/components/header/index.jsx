import './header.sass'
import { Link } from 'react-router-dom'
import { isClassNameActive } from '../../utils/functions'
import { headerLanguageObj } from '../../utils/languageObj'

const Header = ({ auth = false, setIsAuth, language, setLanguage }) => {
    const onLogoutClick = () => {
        if (!window.confirm(headerLanguageObj.logoutAlert[language])) return
        localStorage.removeItem('token')
        setIsAuth(false)
    }

    const onChangeLangCLick = (lang) => {
        if (lang === language) return

        window.localStorage.setItem('language', lang)
        setLanguage(lang)
    }

    return (
        <header className='header'>
            <Link to={'/'} className={isClassNameActive(auth, 'header__title')}>
                Lenwo
            </Link>
            <div className='header__language'>
                <button
                    onClick={() => onChangeLangCLick('EN')}
                    className={isClassNameActive(
                        'EN' !== language,
                        'header__language__btn'
                    )}
                >
                    EN
                </button>
                <div className='header__language__line'></div>
                <button
                    onClick={() => onChangeLangCLick('UA')}
                    className={isClassNameActive(
                        'UA' !== language,
                        'header__language__btn'
                    )}
                >
                    UA
                </button>
            </div>
            <button
                onClick={onLogoutClick}
                className={isClassNameActive(auth, 'header__logout')}
            >
                {headerLanguageObj.logout[language]}
            </button>
        </header>
    )
}

export default Header

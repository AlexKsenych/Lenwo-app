import './auth.sass'
import { postLogin } from '../../service/service'
import { useState } from 'react'
import { isClassNameActive } from '../../utils/functions'

const onChange = (e, setData) => {
    const value = e.currentTarget.value
    return setData(value)
}

const Auth = ({ setIsAuth }) => {
    const [isLogin, setIsLogin] = useState(true)
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('google@gmail.com')
    const [password, setPassword] = useState('12345')
    const [isError, setIsError] = useState(false)

    const onFormSubmit = (e) => {
        e.preventDefault()
        postLogin({
            email,
            password,
        })
            .then((res) => {
                window.localStorage.setItem('token', res.token)
                setIsAuth(true)
            })
            .catch((err) => {
                console.log('Auth error :', err)
                setIsError(true)
            })
    }

    const onUserNameChange = (e) => onChange(e, setUserName)

    const onEmailChange = (e) => onChange(e, setEmail)

    const onPasswordChange = (e) => onChange(e, setPassword)

    const onButtonClick = () => {
        setIsLogin(!isLogin)
    }

    const submitCondition = isLogin
        ? !email.trim() || !password.trim()
        : !userName.trim() || !email.trim() || !password.trim()

    return (
        <div className='auth'>
            <form onSubmit={onFormSubmit} className='auth__form'>
                <div className='auth__form__links'>
                    <button
                        type='button'
                        onClick={onButtonClick}
                        className={isClassNameActive(
                            isLogin,
                            'auth__form__links__link'
                        )}
                    >
                        Login
                    </button>
                    <button
                        type='button'
                        onClick={onButtonClick}
                        className={isClassNameActive(
                            !isLogin,
                            'auth__form__links__link'
                        )}
                    >
                        Registration
                    </button>
                </div>
                {isLogin ? null : (
                    <input
                        className='auth__form__input'
                        type='text'
                        placeholder='User Name'
                        value={userName}
                        onChange={onUserNameChange}
                    />
                )}
                <input
                    className='auth__form__input'
                    type='email'
                    placeholder='Email'
                    value={email}
                    onChange={onEmailChange}
                />
                <input
                    className='auth__form__input'
                    type='text'
                    placeholder='Password'
                    value={password}
                    onChange={onPasswordChange}
                />
                <div
                    className={isClassNameActive(!isError, 'auth__form__error')}
                >
                    Incorrect email or password
                </div>
                <button
                    type='submit'
                    className={isClassNameActive(
                        submitCondition,
                        'auth__form__btn'
                    )}
                >
                    Login
                </button>
            </form>
        </div>
    )
}

export default Auth

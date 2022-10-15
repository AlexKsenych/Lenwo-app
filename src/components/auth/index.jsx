import './auth.sass'
import { postLogin, postRegister } from '../../service/service'
import { useState } from 'react'
import { isClassNameActive } from '../../utils/functions'
import { registerValidation } from '../../utils/validations'

const onChange = (e, setData) => {
    const value = e.currentTarget.value
    return setData(value)
}

const Auth = ({ setIsAuth }) => {
    const [isLogin, setIsLogin] = useState(true)
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('google@gmail.com')
    const [password, setPassword] = useState('12345')
    const [error, setError] = useState({
        isError: false,
        message: '',
    })

    const onFormSubmit = (e) => {
        e.preventDefault()
        if (isLogin) {
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
                    setError({
                        isError: true,
                        message: 'Incorrect email or password',
                    })
                })
        } else {
            if (!registerValidation(fullName, email, password, setError)) return
            postRegister({
                fullName,
                email,
                password,
            })
                .then((res) => {
                    window.localStorage.setItem('token', res.token)
                    setIsAuth(true)
                })
                .catch((err) => {
                    console.log('Auth error :', err)
                    setError({
                        isError: true,
                        message: err.response.data.message,
                    })
                })
        }
    }

    const onFullNameChange = (e) => {
        const value = e.currentTarget.value
        if (value > 36) return

        return setFullName(value)
    }

    const onEmailChange = (e) => onChange(e, setEmail)

    const onPasswordChange = (e) => onChange(e, setPassword)

    const onButtonClick = () => {
        setIsLogin(!isLogin)
    }

    const submitCondition = isLogin
        ? !email.trim() || !password.trim()
        : !fullName.trim() || !email.trim() || !password.trim()

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
                        Sign Up
                    </button>
                </div>
                {isLogin ? null : (
                    <input
                        className='auth__form__input'
                        type='text'
                        placeholder='Full Name'
                        value={fullName}
                        onChange={onFullNameChange}
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
                {error.isError ? (
                    <div className='auth__form__error'>{error.message}</div>
                ) : null}
                <button
                    type='submit'
                    className={isClassNameActive(
                        submitCondition,
                        'auth__form__btn'
                    )}
                >
                    {isLogin ? 'Login' : 'Sign Up'}
                </button>
            </form>
        </div>
    )
}

export default Auth

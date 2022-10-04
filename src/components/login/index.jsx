import './login.sass'
import { isClassNameActive } from '../../utils/functions'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onFormSubmit = (e) => {
        e.preventDefault()
    }

    const onEmailChange = (e) => {
        const value = e.currentTarget.value
        setEmail(value)
    }

    const onPasswordChange = (e) => {
        const value = e.currentTarget.value
        setPassword(value)
    }

    return (
        <div className='login'>
            <form onSubmit={onFormSubmit} className='login__form'>
                <div className='login__form__links'>
                    <div className='login__form__links__login'>Login</div>
                    <Link
                        className='login__form__links__registration'
                        to={'/registration'}
                    >
                        Registration
                    </Link>
                </div>
                <input
                    className='login__form__input'
                    type='text'
                    placeholder='Email'
                    value={email}
                    onChange={onEmailChange}
                />
                <input
                    className='login__form__input'
                    type='text'
                    placeholder='Password'
                    value={password}
                    onChange={onPasswordChange}
                />
                <button
                    type='submit'
                    className={isClassNameActive(
                        !email.trim() || !password.trim(),
                        'login__form__btn'
                    )}
                >
                    Login
                </button>
            </form>
        </div>
    )
}

export default Login

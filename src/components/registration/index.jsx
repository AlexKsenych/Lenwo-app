import './registration.sass'
import { isClassNameActive } from '../../utils/functions'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Registration = () => {
    const [userName, setUserName] = useState('')
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

    const onUserNameChange = (e) => {
        const value = e.currentTarget.value
        setUserName(value)
    }

    return (
        <div className='registration'>
            <form onSubmit={onFormSubmit} className='registration__form'>
                <div className='registration__form__links'>
                    <Link
                        className='registration__form__links__login'
                        to={'/login'}
                    >
                        Login
                    </Link>
                    <div className='registration__form__links__registration'>
                        Registration
                    </div>
                </div>
                <input
                    className='registration__form__input'
                    type='text'
                    placeholder='User Name'
                    value={userName}
                    onChange={onUserNameChange}
                />
                <input
                    className='registration__form__input'
                    type='text'
                    placeholder='Email'
                    value={email}
                    onChange={onEmailChange}
                />
                <input
                    className='registration__form__input'
                    type='text'
                    placeholder='Password'
                    value={password}
                    onChange={onPasswordChange}
                />
                <button
                    type='submit'
                    className={isClassNameActive(
                        !userName.trim() || !email.trim() || !password.trim(),
                        'registration__form__btn'
                    )}
                >
                    Login
                </button>
            </form>
        </div>
    )
}

export default Registration

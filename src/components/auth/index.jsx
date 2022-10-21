import './auth.sass'
import { postLogin, postRegister } from '../../service/service'
import { useState } from 'react'
import { isClassNameActive } from '../../utils/functions'
import { registerValidation } from '../../utils/validations'
import { authLanguageObj } from '../../utils/languageObj'

const onChange = (e, setData) => {
    const value = e.currentTarget.value
    return setData(value)
}

const Auth = ({ setIsAuth, language }) => {
    const [isLogin, setIsLogin] = useState(true)
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
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

        setFullName('')
        setEmail('')
        setPassword('')
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
                        {authLanguageObj.login[language]}
                    </button>
                    <button
                        type='button'
                        onClick={onButtonClick}
                        className={isClassNameActive(
                            !isLogin,
                            'auth__form__links__link'
                        )}
                    >
                        {authLanguageObj.signUp[language]}
                    </button>
                </div>
                {isLogin ? null : (
                    <input
                        className='auth__form__input'
                        type='text'
                        placeholder={authLanguageObj.fullName[language]}
                        value={fullName}
                        onChange={onFullNameChange}
                    />
                )}
                <input
                    className='auth__form__input'
                    type='email'
                    placeholder={authLanguageObj.email[language]}
                    value={email}
                    onChange={onEmailChange}
                />
                <input
                    className='auth__form__input'
                    type='text'
                    placeholder={authLanguageObj.password[language]}
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
                    {isLogin
                        ? authLanguageObj.login[language]
                        : authLanguageObj.signUp[language]}
                </button>
            </form>
        </div>
    )
}

export default Auth

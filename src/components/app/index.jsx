import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import './app.sass'
import Header from '../header'
import Auth from '../auth'
import Flashcards from '../templates/flashcards'
import FindOut from '../templates/findOut'
import KahootLike from '../templates/kahootLIke'
import Profile from '../profile'
import WordSet from '../wordSet'
import { getMe } from '../../service/service'
import TemplateHOC from './templateHOC'

const App = () => {
    const [isAuth, setIsAuth] = useState(null)
    const [userData, setUserData] = useState({})
    const [language, setLanguage] = useState('EN')

    useEffect(() => {
        if (!window.localStorage.getItem('language')) {
            window.localStorage.setItem('language', 'EN')
        } else {
            setLanguage(window.localStorage.getItem('language'))
        }
    }, [])

    useEffect(() => {
        getMe()
            .then((res) => {
                setIsAuth(true)
                setUserData(res)
            })
            .catch((err) => {
                window.localStorage.removeItem('token')
                setIsAuth(false)
                console.log('Authorization is required')
                console.log('Get me request has been failed : ', err)
            })
    }, [isAuth])

    const authCondition = isAuth !== null && !isAuth

    return (
        <div className='app'>
            <Header
                auth={authCondition}
                setIsAuth={setIsAuth}
                language={language}
                setLanguage={setLanguage}
            />
            {authCondition ? (
                <Auth setIsAuth={setIsAuth} language={language} />
            ) : (
                <Routes>
                    <Route
                        path='/'
                        element={
                            <Profile
                                data={userData.wordSets}
                                userData={userData}
                                language={language}
                                setIsAuth={setIsAuth}
                            />
                        }
                    />
                    <Route
                        path='/create-word-set'
                        element={
                            <WordSet
                                setIsAuth={setIsAuth}
                                data={userData.wordSets}
                                language={language}
                            />
                        }
                    />
                    <Route
                        path='/template/flashcards'
                        element={
                            <TemplateHOC
                                Component={Flashcards}
                                data={userData.wordSets}
                                language={language}
                            />
                        }
                    />
                    <Route
                        path='/template/findOut'
                        element={
                            <TemplateHOC
                                Component={FindOut}
                                data={userData.wordSets}
                                language={language}
                            />
                        }
                    />
                    <Route
                        path='/template/kahoot-like'
                        element={
                            <TemplateHOC
                                Component={KahootLike}
                                data={userData.wordSets}
                                language={language}
                            />
                        }
                    />
                </Routes>
            )}
        </div>
    )
}

export default App

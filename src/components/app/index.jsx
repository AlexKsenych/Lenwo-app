import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import './app.sass'
import Header from '../header'
import Auth from '../auth'
import Flashcards from '../flashcards'
import FindOut from '../findOut'
import KahootLike from '../kahootLIke'
import Profile from '../profile'
import WordSet from '../wordSet'
import { getMe } from '../../service/service'
import TemplateHOC from './templateHOC'

const App = () => {
    const [isAuth, setIsAuth] = useState(null)
    const [userData, setUserData] = useState({})

    useEffect(() => {
        if (!window.localStorage.getItem('token')) {
            setIsAuth(false)
            console.log('Authorization is required')
        } else {
            getMe()
                .then((res) => {
                    setIsAuth(true)
                    setUserData(res)
                })
                .catch((err) => {
                    console.log('Get Me error : ', err)
                })
        }
    }, [isAuth, userData])

    const authCondition = isAuth !== null && !isAuth

    return (
        <div className='app'>
            <Header auth={authCondition} setIsAuth={setIsAuth} />
            {authCondition ? (
                <Auth setIsAuth={setIsAuth} />
            ) : (
                <Routes>
                    <Route
                        path='/'
                        element={
                            <Profile
                                data={userData.wordSets}
                                userData={userData}
                            />
                        }
                    />
                    <Route
                        path='/create-word-set'
                        element={
                            <WordSet
                                setUserData={setUserData}
                                data={userData.wordSets}
                            />
                        }
                    />
                    <Route
                        path='/template/flashcards'
                        element={
                            <TemplateHOC
                                Component={Flashcards}
                                data={userData.wordSets}
                            />
                        }
                    />
                    <Route
                        path='/template/findOut'
                        element={
                            <TemplateHOC
                                Component={FindOut}
                                data={userData.wordSets}
                            />
                        }
                    />
                    <Route
                        path='/template/kahoot-like'
                        element={
                            <TemplateHOC
                                Component={KahootLike}
                                data={userData.wordSets}
                            />
                        }
                    />
                </Routes>
            )}
        </div>
    )
}

export default App

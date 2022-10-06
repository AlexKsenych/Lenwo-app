import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import './app.sass'
import Header from '../header'
import Auth from '../auth'
import Flashcards from '../flashcards'
import FindOut from '../findOut'
import KahootLike from '../kahootLIke'
import Profile from '../profile'
import { getList, getAuthMe } from '../../service/service'
import TemplateHOC from './templateHOC'

const App = () => {
    const [isAuth, setIsAuth] = useState(null)
    const [state, setState] = useState({})
    const [userData, setUserData] = useState({})

    useEffect(() => {
        getAuthMe()
            .then((res) => {
                setIsAuth(true)
                setUserData(res)
            })
            .catch((err) => {
                if (!isAuth) {
                    console.log(err)
                    setIsAuth(false)
                    console.log('Authorization is required')
                }
            })
    }, [isAuth])

    useEffect(() => {
        if (!isAuth) return
        getList().then((res) => {
            setState(res)
        })
    }, [isAuth])

    const authCondition = isAuth !== null && !isAuth

    return (
        <div className='app'>
            <Header auth={authCondition} />
            {authCondition ? (
                <Auth setIsAuth={setIsAuth} />
            ) : (
                <Routes>
                    <Route
                        path='/'
                        element={<Profile data={state} userData={userData} />}
                    />
                    <Route
                        path='/template/flashcards'
                        element={
                            <TemplateHOC Component={Flashcards} data={state} />
                        }
                    />
                    <Route
                        path='/template/findOut'
                        element={
                            <TemplateHOC Component={FindOut} data={state} />
                        }
                    />
                    <Route
                        path='/template/kahoot-like'
                        element={
                            <TemplateHOC Component={KahootLike} data={state} />
                        }
                    />
                </Routes>
            )}
        </div>
    )
}

export default App

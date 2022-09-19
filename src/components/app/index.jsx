import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import './app.sass'
import Loading from '../../utils/loading'
import Header from '../header'
import Flashcards from '../flashcards'
import FindOut from '../findOut'
import KahootLike from '../kahootLIke'
import Profile from '../profile'
import getData from '../../service/service'
import TemplateHOC from './templateHOC'

const App = () => {
    const [data, setData] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        getData().then((res) => {
            setData(res)
            return res
        })
        setIsLoading(false)
    }, [])

    const loadingCondition = isLoading || Object.keys(data).length === 0

    return (
        <div className='app'>
            <Header />
            {loadingCondition ? (
                <Loading />
            ) : (
                <Routes>
                    <Route
                        path='/'
                        element={
                            <Profile
                                data={data.flashcards}
                                userData={data.userInfo}
                            />
                        }
                    />
                    <Route
                        path='/template/flashcards'
                        element={
                            <TemplateHOC
                                Component={Flashcards}
                                data={data.flashcards}
                            />
                        }
                    />
                    <Route
                        path='/template/findOut'
                        element={
                            <TemplateHOC
                                Component={FindOut}
                                data={data.flashcards}
                            />
                        }
                    />
                    <Route
                        path='/template/kahoot-like'
                        element={
                            <TemplateHOC
                                Component={KahootLike}
                                data={data.flashcards}
                            />
                        }
                    />
                </Routes>
            )}
        </div>
    )
}

export default App

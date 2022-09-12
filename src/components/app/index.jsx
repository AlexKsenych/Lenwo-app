import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import './app.sass'
import Header from '../header'
import Flashcards from '../flashcards'
import FindOut from '../findOut'
import Profile from '../profile'
import getData from '../../service/service'
import TemplateHOC from './templateHOC'

const App = () => {
    const [data, setData] = useState({})

    useEffect(() => {
        getData().then(res => {
            setData(res)
            return res
        })
    }, [])

    return (
        <div className='app'>
            <Header />
            {!data.flashcards ? <div>Oops</div> :
                <Routes>
                    <Route path="/" element={<Profile data={data.flashcards} />} />
                    <Route path="/template/flashcards" element={<TemplateHOC Component={Flashcards} data={data.flashcards}/>} />
                    <Route path="/template/findOut" element={<TemplateHOC Component={FindOut} data={data.flashcards}/>} />
                </Routes>
            }
        </div>
    )
}

export default App

import { useState, useEffect } from 'react'
import './app.sass'
import Header from '../header'
// import Flashcards from '../flashcards'
import Profile from '../profile'
import Data from '../../service/service'

const App = () => {
    const [data, setData] = useState({})

    useEffect(() => {
        Data.then(res => {
            setData(res)
            return res
        })
    }, [])

    return (
        <div className='app'>
            <Header />
            <Profile data={data.flashcards} />
            {/* <Flashcards/> */}
        </div>
    )
}

export default App

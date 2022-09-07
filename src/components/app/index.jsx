import './app.sass'
import Header from '../header'
import Flashcards from '../flashcards'
import Profile from '../profile'

const App = () => {
    return (
        <div className='app'>
            <Header />
            <Profile/>
            {/* <Flashcards/> */}
        </div>
    )
}

export default App

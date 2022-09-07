import './app.sass'
import Header from '../header'
import Flashcards from '../flashcards'
import Template from '../template'

const App = () => {
    return (
        <div className='app'>
            <Header />
            <Template/>
            {/* <Flashcards/> */}
        </div>
    )
}

export default App

import './flashcards.sass'
import Flashcard from './flashcard'
import UserResult from '../userResult'
import { useEffect, useState } from 'react'

const Flashcards = ({ words }) => {
    const [state, setState] = useState([])
    const [currentNum, setCurrentNum] = useState(0)
    const [unknownWords, setUnknownWords] = useState([])

    useEffect(() => {
        setState([...words])
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onNextClick = (e, data) => {
        e.stopPropagation()
        if (data) setUnknownWords([...unknownWords, data])
        setCurrentNum(currentNum + 1)
    }

    const onRestart = () => {
        setUnknownWords([])
        setCurrentNum(0)
    }

    const flashcardProps = {
        onNextClick,
        currentNum,
        dataLength: state.length,
    }

    const isDone = currentNum === state.length && state.length !== 0

    return isDone ? (
        <UserResult
            onRestart={onRestart}
            unknownWordsArray={unknownWords}
            data={state}
        />
    ) : (
        <main className='flashcards'>
            <Flashcard data={state[currentNum]} {...flashcardProps} />
        </main>
    )
}

export default Flashcards

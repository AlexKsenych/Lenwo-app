import './flashcards.sass'
import FlashcardsItem from './flashcardsItem'
import UserResult from '../../userResult'
import { useEffect, useState } from 'react'

const Flashcards = ({ words, language }) => {
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
        language,
    }

    const isDone = currentNum === state.length && state.length !== 0

    return isDone ? (
        <UserResult
            onRestart={onRestart}
            unknownWordsArray={unknownWords}
            data={state}
            language={language}
        />
    ) : (
        <main className='flashcards'>
            <FlashcardsItem data={state[currentNum]} {...flashcardProps} />
        </main>
    )
}

export default Flashcards

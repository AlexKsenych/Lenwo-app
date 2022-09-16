import './flashcards.sass'
// import arrow from '../../assets/img/arrow.png'
import Flashcard from './flashcard'
import UserResult from '../userResult'
import { useEffect, useMemo, useState } from 'react'

const Flashcards = ({words}) => {
    const [currentNum, setCurrentNum] = useState(0)
    const [unknownWords, setUnknownWords] = useState([])
    const [isDone, setIsDone] = useState(false)

    useEffect(() => {
        if (currentNum === words.length) {
            setIsDone(true)
            setCurrentNum(0)
        }
    }, [currentNum, words])

    const onNextClick = (e, id) => {
        e.stopPropagation()
        if (id) setUnknownWords([...unknownWords, id])
        setCurrentNum(currentNum + 1)
    }

    const onRestart = () => {
        setUnknownWords([])
        setIsDone(false)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const unknownWordsArray = useMemo(() => unknownWords.map(id => words.find(item => item.id === id)), [isDone])

    const flashcardProps = {
        onNextClick,
        currentNum,
        dataLength: words.length
    }

    return isDone ? (
        <UserResult 
        onRestart={onRestart} 
        unknownWordsArray={unknownWordsArray} 
        data={words} 
        />
    ) : (
        <main className='flashcards'>
            <Flashcard data={words[currentNum]} {...flashcardProps} />
        </main>
    )
}

export default Flashcards

/* <div onClick={() => onChangeNum(false)} className="flashcards__arrow">
    <img src={arrow} alt="leftArrow" className="flashcards__arrow__left" />
</div>
<div onClick={() => onChangeNum(true)} className="flashcards__arrow">
    <img src={arrow} alt="rightArrow" className="flashcards__arrow__right" />
</div> */
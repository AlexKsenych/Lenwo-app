import './flashcards.sass'
// import arrow from '../../assets/img/arrow.png'
import Flashcard from './flashcard'
import {useSearchParams, Link} from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'

const findKnownWords = (unknownWords = [], arr) => {
    if (unknownWords.length === 0) return arr

    const newArr = arr.filter(item => {
        if (unknownWords[0].id === item.id) return false
        return true
    })

    return findKnownWords(unknownWords.slice(1, unknownWords.length), newArr)
}

const fromArrayToString = (arr) => arr.map(item => item.name).join(', ')

const Flashcards = ({data}) => {
    const [currentNum, setCurrentNum] = useState(0)
    const [unknownWords, setUnknownWords] = useState([])
    const [isDone, setIsDone] = useState(false)

    const [searchParams] = useSearchParams()
    const searchId = searchParams.get('id')

    const {title, words} = data.find(item => item.id === searchId)

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

    const {unknownWordsString, knownWordsString} = useMemo(() => {
        const unknownWordsArray = unknownWords.map(id => words.find(item => item.id === id))

        const unknownWordsString = fromArrayToString(unknownWordsArray)

        const knownWordsString = fromArrayToString(findKnownWords(unknownWordsArray, words))

        return {
            unknownWordsString,
            knownWordsString
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDone])

    const flashcardProps = {
        onNextClick,
        currentNum,
        dataLength: words.length
    }

    const flashcardResult = (
        <div className="flashcards__result">
            <div className="flashcards__result__card">
                <div className="flashcards__result__card__title">Words you should work at</div>
                <div className="flashcards__result__card__words">{unknownWordsString}</div>
                <button onClick={onRestart} className="flashcards__result__card__btn">Restart</button>
            </div>
            <div className="flashcards__result__card">
                <div className="flashcards__result__card__title">Words that you know</div>
                <div className="flashcards__result__card__words">{knownWordsString}</div>
                <Link to={'/'} className="flashcards__result__card__btn">Back to the profile</Link>
            </div>
        </div>
    )

    return (
        <main className='flashcards'>
            <div className='flashcards__title'>{title}</div>
            {isDone ? flashcardResult : <Flashcard data={words[currentNum]} {...flashcardProps} />}
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
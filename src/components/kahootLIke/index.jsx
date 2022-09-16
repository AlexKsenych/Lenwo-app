import { useState, useEffect } from 'react'
import { shuffleArray } from '../../utils/functions'
import Loading from '../../utils/loading'
import UserResult from '../userResult'
import './kahootLike.sass'

const createRandomNumbers = (arrLength, currNum) => {
    const arr = []

    for (let i = 1; i < arrLength; i++) {
        arr.push(i)
    }

    return shuffleArray(arr)
        .filter((item) => item !== currNum)
        .slice(0, 3)
}

const KahootLike = ({ words }) => {
    const [state, setState] = useState([])
    const [wordNums, setWordNums] = useState([])
    const [currentNum, setCurrentNum] = useState(0)
    const [unknownWords, setUnknownWords] = useState([])

    const img = null

    useEffect(() => {
        setState(shuffleArray([...words]))
        setWordNums(
            shuffleArray([
                currentNum,
                ...createRandomNumbers(words.length, currentNum),
            ])
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onNextClick = (wordId) => {
        if (wordId !== state[currentNum].id) {
            setUnknownWords([...unknownWords, state[currentNum]])
        }
        setCurrentNum(currentNum + 1)
        setWordNums(
            shuffleArray([
                currentNum,
                ...createRandomNumbers(words.length, currentNum),
            ])
        )
    }

    const onRestart = () => {
        setState(shuffleArray([...words]))
        setWordNums(
            shuffleArray([0, ...createRandomNumbers(words.length, currentNum)])
        )
        setUnknownWords([])
        setCurrentNum(0)
    }

    const loadingCondition = state.length === 0 || wordNums.length === 0

    const isDone = currentNum === state.length && state.length !== 0

    return loadingCondition ? (
        <Loading />
    ) : isDone ? (
        <UserResult
            onRestart={onRestart}
            unknownWordsArray={unknownWords}
            data={words}
        />
    ) : (
        <main className='kahoot-like'>
            <div className='kahoot-like__container'>
                <div className='kahoot-like__container__definition'>
                    <div className='kahoot-like__container__definition__count'>{`${
                        currentNum + 1
                    } / ${state.length}`}</div>
                    {img ? (
                        <img
                            src={img}
                            alt='definitionImage'
                            className='kahoot-like__container__definition__img'
                        />
                    ) : null}
                    <div className='kahoot-like__container__definition__descr'>
                        {state[currentNum].descr}
                    </div>
                </div>
                <div className='kahoot-like__container__btns'>
                    <button
                        onClick={() => onNextClick(state[wordNums[0]].id)}
                        className='kahoot-like__container__btns__btn'
                    >
                        {state[wordNums[0]].name}
                    </button>
                    <button
                        onClick={() => onNextClick(state[wordNums[1]].id)}
                        className='kahoot-like__container__btns__btn'
                    >
                        {state[wordNums[1]].name}
                    </button>
                    <button
                        onClick={() => onNextClick(state[wordNums[2]].id)}
                        className='kahoot-like__container__btns__btn'
                    >
                        {state[wordNums[2]].name}
                    </button>
                    <button
                        onClick={() => onNextClick(state[wordNums[3]].id)}
                        className='kahoot-like__container__btns__btn'
                    >
                        {state[wordNums[3]].name}
                    </button>
                </div>
            </div>
        </main>
    )
}

export default KahootLike

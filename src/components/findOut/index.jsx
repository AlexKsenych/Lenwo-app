import './findOut.sass'
import arrow from '../../assets/img/arrow.png'
import { useSearchParams } from 'react-router-dom'
import { useState } from 'react';
import { useEffect } from 'react';
import UserResult from '../userResult';

function shuffle(array) {
    let currentIndex = array.length,  randomIndex

    while (currentIndex !== 0) {

      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
       array[randomIndex],  array[currentIndex]]
    }
  
    return array;
}

const isClassnameActive = (condition, className) => {
    return condition ? className : `${className} ${className}_active`
}

const checkStrings = (firstStr, secondStr) => {
    const pureFirstStr = firstStr.trim().toLowerCase()
    const pureSecondStr = secondStr.trim().toLowerCase()
    return pureFirstStr === pureSecondStr
}

const FindOut = ({data}) => {
    const [previousWord, setPreviousWord] = useState('')
    const [unknownWords, setUnknownWords] = useState([])
    const [isTrue, setIsTrue] = useState(null)
    const [state, setState] = useState([])
    const [inputValue, setInputValue] = useState('')
    const [currentNum, setCurrentNum] = useState(0)
    const [searchParams] = useSearchParams()
    const searchId = searchParams.get('id')    

    useEffect(() => {
        const {words} = data.find(item => item.id === searchId)

        setState(shuffle(words))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const img = null

    const onNextClick = () => {
        if (checkStrings(inputValue, state[currentNum].name)) {
            setIsTrue(true)
            setTimeout(() => {
                setCurrentNum(currentNum + 1)
                setIsTrue(null)
            }, 1200)
        } else {
            if (isTrue !== false) {
                setIsTrue(false)
                setUnknownWords([...unknownWords, state[currentNum]])
            }
        }

        setPreviousWord(inputValue)

        setInputValue('')
    }

    const onInputChange = (e) => {
        setInputValue(e.target.value)
    }

    const onRestart = () => {
        setUnknownWords([])
        setCurrentNum(0)
        setState(shuffle(state))
    }

    const inputdd = (condition) => {
        const inputClassName = 'find-out__container__wrapper__input';

        return condition === null ? inputClassName : 
        condition ? `${inputClassName} ${inputClassName}_true` : `${inputClassName} ${inputClassName}_false`
    }

    return !state.length ? <div>Oops</div> : currentNum === state.length ? <UserResult onRestart={onRestart} unknownWordsArray={unknownWords} data={state} /> : (
        <main className='find-out'>
            <div className="find-out__title">{data.title}</div>
            <div className="find-out__container">
                <div className="find-out__container__definition">
                    <div className="find-out__container__definition__count">{`${currentNum + 1} / ${state.length}`}</div>
                    {img ? <img src={img} alt="definitionImage" className="find-out__container__definition__img" /> : null}
                    <div className="find-out__container__definition__descr">{state[currentNum].descr}</div>
                </div>
                <div className="find-out__container__wrapper">
                    <div className={isClassnameActive(isTrue !== false, "find-out__container__wrapper__correct-word")}>{state[currentNum].name}</div>
                    <div className={isClassnameActive(inputValue, 'find-out__container__wrapper__idk')}>idk</div>
                    <input onChange={(e) => onInputChange(e)} className={inputdd(isTrue)} type="text" value={inputValue} />
                    <button onClick={onNextClick} className={isClassnameActive(!inputValue, 'find-out__container__wrapper__next')}>
                        <img src={arrow} alt="rightArrow" className="find-out__container__wrapper__next__img" />
                    </button>
                    <div className={isClassnameActive(isTrue === null, 'find-out__container__wrapper__prev-word')}>{`Previously written: ${previousWord}`}</div>
                </div>
            </div>
        </main>
    )

}

export default FindOut
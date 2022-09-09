import './flashcards.sass'
// import arrow from '../../assets/img/arrow.png'
import {useSearchParams} from 'react-router-dom'
import { useState } from 'react'

const Flashcards = ({data}) => {
    const [currentNum, setCurrentNum] = useState(0)
    const [unknownWords, setUnknownWords] = useState([])
    const [isActive, setIsActive] = useState(false)
    const [searchParams] = useSearchParams()
    const searchId = searchParams.get('id')

    const {title,  words} = data.find(item => item.id === searchId)
    const {id, name, descr} = words[currentNum]
    const img = null

    const activeClass = isActive ? 'active' : ''

    const onFlashcardClick = () => setIsActive(!isActive)

    const onNextClick = (e, id) => {
        e.stopPropagation()
        if (id) setUnknownWords([...unknownWords, id])
        setCurrentNum(currentNum + 1)
    }

    console.log(unknownWords)

    return (
        <main className='flashcards'>
            <div className='flashcards__title'>{title}</div>
            <div onClick={onFlashcardClick} className='flashcards__flashcard'>
                <div className="flashcards__flashcard__count">{`${currentNum + 1} / ${words.length}`}</div>
                <div className={`flashcards__flashcard__inner ${activeClass}`}>
                    <div className="flashcards__flashcard__inner__front">
                        <div className='flashcards__flashcard__inner__front__word'>{name}</div>
                            <div className='flashcards__flashcard__inner__front__btns'>
                                <button onClick={(e) => onNextClick(e , id)} className='flashcards__flashcard__inner__front__btns__btn'>idk</button>
                                <button onClick={onNextClick} className='flashcards__flashcard__inner__front__btns__btn'>Yeah I Knew That</button>
                            </div>
                        </div>
                    <div className="flashcards__flashcard__inner__back">
                        {img ? <img src={img} alt="wordImage" className="flashcards__flashcard__inner__back__img" /> : null}
                        <div className="flashcards__flashcard__inner__back__definition">{descr}</div>
                    </div>
                </div>
            </div>
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
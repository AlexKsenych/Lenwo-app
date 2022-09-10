import { useState } from "react"

const Flashcard = ({data = {}, onNextClick, currentNum, dataLength}) => {
    const [isActiveClass, setIsActiveClass] = useState(false)
    const {id, name, descr} = data
    const img = null

    const activeClass = isActiveClass ? 'flashcards__flashcard__inner_active' : ''

    const onFlashcardClick = () => setIsActiveClass(!isActiveClass)
    
    
    return (
        <div onClick={onFlashcardClick} className='flashcards__flashcard'>
            <div className="flashcards__flashcard__count">{`${currentNum + 1} / ${dataLength}`}</div>
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
    )
}

export default Flashcard
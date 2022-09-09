import './flashcards.sass'
import arrow from '../../assets/img/arrow.png'
import {useSearchParams} from 'react-router-dom'
import { useState } from 'react'

const Flashcards = ({data}) => {
    const [isActive, setIsActive] = useState(false)
    const [searchParams] = useSearchParams()
    const searchId = +searchParams.get('id')

    const {title, words} = data.find(item => item.id === searchId)
    const img = null

    const onFlashcardClick = () => setIsActive(!isActive)

    const activeClass = isActive ? 'active' : ''

    return (
        <main className='flashcards'>
            <div className='flashcards__title'>{title}</div>
            <div className="flashcards__arrow">
                <img src={arrow} alt="leftArrow" className="flashcards__arrow__left" />
            </div>
            <div onClick={onFlashcardClick} className='flashcards__flashcard'>
                <div className="flashcards__flashcard__count">{`${0} / ${words.length}`}</div>
                <div className={`flashcards__flashcard__inner ${activeClass}`}>
                    <div className="flashcards__flashcard__inner__front">
                        <div className='flashcards__flashcard__inner__front__word'>puppy</div>
                            <div className='flashcards__flashcard__inner__front__btns'>
                                <button className='flashcards__flashcard__inner__front__btns__btn'>idk</button>
                                <button className='flashcards__flashcard__inner__front__btns__btn'>Yeah I Knew That</button>
                            </div>
                        </div>
                    <div className="flashcards__flashcard__inner__back">
                        {img ? <img src={img} alt="wordImage" className="flashcards__flashcard__inner__back__img" /> : null}
                        <div className="flashcards__flashcard__inner__back__definition">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio quasi atque ab?
                        </div>
                    </div>
                </div>
            </div>
            <div className="flashcards__arrow">
                <img src={arrow} alt="rightArrow" className="flashcards__arrow__right" />
            </div>
        </main>
    )
}

export default Flashcards
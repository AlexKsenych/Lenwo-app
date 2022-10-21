import { useState } from 'react'
import { isClassNameActive } from '../../../../utils/functions'
import { flashcardsLanguageObj } from '../../../../utils/languageObj'

const FlashcardsItem = ({
    data = {},
    onNextClick,
    currentNum,
    dataLength,
    language,
}) => {
    const [isActiveClass, setIsActiveClass] = useState(false)
    const { name, descr } = data
    const img = null

    const onFlashcardClick = () => setIsActiveClass(!isActiveClass)

    return (
        <div onClick={onFlashcardClick} className='flashcards__flashcard'>
            <div className='flashcards__flashcard__count'>{`${
                currentNum + 1
            } / ${dataLength}`}</div>
            <div
                className={isClassNameActive(
                    !isActiveClass,
                    'flashcards__flashcard__inner'
                )}
            >
                <div className='flashcards__flashcard__inner__front'>
                    <div className='flashcards__flashcard__inner__front__word'>
                        {name}
                    </div>
                    <div className='flashcards__flashcard__inner__front__btns'>
                        <button
                            onClick={(e) => onNextClick(e, data)}
                            className='flashcards__flashcard__inner__front__btns__btn'
                        >
                            {flashcardsLanguageObj.idk[language]}
                        </button>
                        <button
                            onClick={onNextClick}
                            className='flashcards__flashcard__inner__front__btns__btn'
                        >
                            {flashcardsLanguageObj.know[language]}
                        </button>
                    </div>
                </div>
                <div className='flashcards__flashcard__inner__back'>
                    {img ? (
                        <img
                            src={img}
                            alt='wordImage'
                            className='flashcards__flashcard__inner__back__img'
                        />
                    ) : null}
                    <div className='flashcards__flashcard__inner__back__definition'>
                        {descr}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FlashcardsItem

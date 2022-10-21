import { useEffect } from 'react'
import { useState } from 'react'
import line from '../../../assets/img/line.svg'
import { isClassNameActive } from '../../../utils/functions'
import { wordSetLanguageObj } from '../../../utils/languageObj'

const WordSetList = ({
    data = [],
    activeWordId,
    onWordClick,
    onWordAcceptClick,
    onWordDeleteClick,
    error,
    language,
}) => {
    const [currentNameValue, setCurrentNameValue] = useState('')
    const [currentDescrValue, setCurrentDescrValue] = useState('')

    const { isError, message } = error

    useEffect(() => {
        if (activeWordId === null) {
            setCurrentNameValue('')
            setCurrentDescrValue('')
        }
    }, [activeWordId])

    return [...data].map((item, i) => {
        const { id, name, descr } = item

        const onInputChange = (e) => {
            setCurrentNameValue(e.currentTarget.value)
        }

        const onDescrChange = (e) => {
            setCurrentDescrValue(e.currentTarget.value)
        }

        return (
            <div
                key={id}
                onClick={() => onWordClick(id)}
                className={isClassNameActive(
                    activeWordId !== id,
                    'word-set__words__word'
                )}
            >
                <div className='word-set__words__word__count'>{i + 1}</div>
                <div className='word-set__words__word__overview'>
                    {name ? (
                        <>
                            <div className='word-set__words__word__overview__name'>
                                {name}
                            </div>
                            <img
                                className='word-set__words__word__overview__line'
                                src={line}
                                alt='line'
                            />
                            <div className='word-set__words__word__overview__descr'>
                                {descr}
                            </div>
                        </>
                    ) : (
                        <div className='word-set__words__word__overview__create-word'>
                            {wordSetLanguageObj.createWord[language]}
                        </div>
                    )}
                </div>
                <div className='word-set__words__word__edit'>
                    <input
                        className='word-set__words__word__edit__name'
                        type='text'
                        placeholder={wordSetLanguageObj.enterName[language]}
                        onChange={onInputChange}
                        defaultValue={name}
                    />
                    <textarea
                        className='word-set__words__word__edit__descr'
                        placeholder={wordSetLanguageObj.enterDescr[language]}
                        onChange={onDescrChange}
                        defaultValue={descr}
                    />
                    {isError ? (
                        <div className='word-set__words__word__edit__error'>
                            {message}
                        </div>
                    ) : null}
                    <div className='word-set__words__word__edit__btns'>
                        <button
                            onClick={() =>
                                onWordAcceptClick(
                                    currentNameValue ? currentNameValue : name,
                                    currentDescrValue
                                        ? currentDescrValue
                                        : descr
                                )
                            }
                            className='word-set__words__word__edit__btns__btn'
                        >
                            {wordSetLanguageObj.accept[language]}
                        </button>
                        <button
                            onClick={() => onWordDeleteClick(id)}
                            className='word-set__words__word__edit__btns__btn'
                        >
                            {wordSetLanguageObj.delete[language]}
                        </button>
                    </div>
                </div>
            </div>
        )
    })
}

export default WordSetList

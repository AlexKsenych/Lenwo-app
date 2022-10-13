import { useEffect } from 'react'
import { useState } from 'react'
import line from '../../../assets/img/line.svg'
import { isClassNameActive } from '../../../utils/functions'

const WordSetList = ({
    data = [],
    activeWordId,
    onWordClick,
    onAcceptClick,
    error,
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
                </div>
                <div className='word-set__words__word__edit'>
                    <input
                        className='word-set__words__word__edit__name'
                        type='text'
                        placeholder='Enter a name'
                        onChange={onInputChange}
                        defaultValue={name}
                    />
                    <textarea
                        className='word-set__words__word__edit__descr'
                        placeholder='Enter a description'
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
                                onAcceptClick(
                                    currentNameValue ? currentNameValue : name,
                                    currentDescrValue
                                        ? currentDescrValue
                                        : descr
                                )
                            }
                            className='word-set__words__word__edit__btns__btn'
                        >
                            Accept
                        </button>
                        <button className='word-set__words__word__edit__btns__btn'>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        )
    })
}

export default WordSetList

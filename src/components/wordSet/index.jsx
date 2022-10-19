import './wordSet.sass'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import WordSetList from './wordSetList'
import { postWordSet, updateWordSet } from '../../service/service'
import { wordSetValidation } from '../../utils/validations'

const initialState = {
    title: '',
    words: [
        {
            id: '0',
            name: '',
            descr: '',
        },
        {
            id: '1',
            name: '',
            descr: '',
        },
        {
            id: '2',
            name: '',
            descr: '',
        },
        {
            id: '3',
            name: '',
            descr: '',
        },
    ],
}

const WordSet = ({ setIsAuth, data }) => {
    const [activeWordId, setActiveWordId] = useState(null)
    const [state, setState] = useState(initialState)
    const [isCreate, setIsCreate] = useState(false)
    const [error, setError] = useState({
        isError: false,
        message: '',
    })

    const [searchParams] = useSearchParams()
    const searchId = searchParams.get('id')

    const navigate = useNavigate()

    useEffect(() => {
        if (searchId) {
            setState([...data].find((item) => item.id === searchId))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (
            [...state.words].every((item) => item.name.trim().length > 0) &&
            state.title.trim().length > 0
        ) {
            return setIsCreate(true)
        } else {
            return setIsCreate(false)
        }
    }, [state])

    const onWordClick = (id) => {
        if (activeWordId) return

        setActiveWordId(id)
    }

    const onWordAcceptClick = (nameValue, descrValue) => {
        if (!wordSetValidation(nameValue, descrValue, setError)) return

        setState({
            ...state,
            words: [
                ...state.words.map((item) => {
                    if (item.id === activeWordId) {
                        return {
                            id: item.id,
                            name: nameValue,
                            descr: descrValue,
                        }
                    }
                    return item
                }),
            ],
        })

        setActiveWordId(null)
    }

    const onWordDeleteClick = (wordId) => {
        const { words } = state

        if (words.length === 4) {
            return setError({
                isError: true,
                message: 'Words can not be less than 4',
            })
        }

        setState({
            ...state,
            words: [
                ...words
                    .filter((item) => item.id !== wordId)
                    .map((item, i) => {
                        return { ...item, id: i + '' }
                    }),
            ],
        })

        setActiveWordId(null)
    }

    const onAddWordClick = () => {
        const { words } = state

        setState({
            ...state,
            words: [
                ...words,
                {
                    id: words.at(-1).id + 1,
                    name: '',
                    descr: '',
                },
            ],
        })
    }

    const onCreateWordSetClick = () => {
        const { id, title, words } = state

        if (searchId) {
            updateWordSet(id, { title, words })
        } else {
            postWordSet({ title, words })
        }

        setIsAuth(null)
        navigate('/')
    }

    const onTitleInputChange = (e) => {
        const target = e.currentTarget.value

        if (target.length > 42) return

        setState({ ...state, title: target })
    }

    const wordSetListProps = {
        data: state.words,
        activeWordId,
        onWordClick,
        onWordAcceptClick,
        onWordDeleteClick,
        error,
    }

    return (
        <div className='word-set'>
            <input
                className='word-set__title'
                placeholder='Enter word set title'
                onChange={onTitleInputChange}
                value={state.title}
            />
            <div className='word-set__words'>
                <WordSetList {...wordSetListProps} />
            </div>
            <div className='word-set__btns'>
                <button
                    onClick={onAddWordClick}
                    className='word-set__btns__btn'
                >
                    Add word
                </button>
                <button
                    onClick={onCreateWordSetClick}
                    className={
                        isCreate
                            ? 'word-set__btns__btn'
                            : 'word-set__btns__btn word-set__btns__btn_inactive'
                    }
                >
                    Create word set
                </button>
            </div>
        </div>
    )
}

export default WordSet

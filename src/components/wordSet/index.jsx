import './createWordSet.sass'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import WordSetList from './wordSetList'
import { postWordSet, updateWordSet } from '../../service/service'

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

const wordValidation = (name, descr, setError) => {
    const pureNameLength = name.trim().length,
        pureDescrLength = descr.trim().length

    if (pureNameLength < 1) {
        setError({
            isError: true,
            message: 'Name can not be less than 1 letter',
        })
        return false
    }

    if (name.length > 32) {
        setError({
            isError: true,
            message: `Name can not be bigger than 32 letters, you have ${name.length} letters`,
        })
        return false
    }

    if (pureDescrLength < 5) {
        setError({
            isError: true,
            message: 'Description can not be less than 5 letters',
        })
        return false
    }

    if (descr.length > 320) {
        setError({
            isError: true,
            message: `Description can not be bigger than 320 letters, you have ${descr.length} letters`,
        })
        return false
    }

    setError({ isError: false, message: '' })
    return true
}

const WordSet = ({ setUserData, data }) => {
    const [activeWordId, setActiveWordId] = useState(null)
    const [state, setState] = useState(initialState)
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

    const onWordClick = (id) => {
        if (activeWordId) return

        setActiveWordId(id)
    }

    const onWordAcceptClick = (nameValue, descrValue) => {
        if (!wordValidation(nameValue, descrValue, setError)) return

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
        if (
            ![...words].every((item) => item.name.trim().length > 0) ||
            !title.trim().length > 0
        ) {
            return
        }

        if (searchId) {
            updateWordSet(id, { title, words })
        } else {
            postWordSet({ title, words })
        }

        setUserData({})
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
                    className='word-set__btns__btn'
                >
                    Create word set
                </button>
            </div>
        </div>
    )
}

export default WordSet

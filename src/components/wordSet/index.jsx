import './createWordSet.sass'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import WordSetList from './wordSetList'

const initialState = {
    id: '0',
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
            message: 'Name is less than 1 letter',
        })
        return false
    }

    if (pureNameLength > 32) {
        setError({
            isError: true,
            message: 'Name is bigger than 32 letters',
        })
        return false
    }

    if (pureDescrLength < 5) {
        setError({
            isError: true,
            message: 'Description is less than 5 letters',
        })
        return false
    }

    if (pureDescrLength < 5) {
        setError({
            isError: true,
            message: 'Description is bigger than 320 letters',
        })
        return false
    }

    setError({ isError: false, message: '' })
    return true
}

const WordSet = ({ data }) => {
    const [activeWordId, setActiveWordId] = useState(null)
    const [state, setState] = useState({})
    const [error, setError] = useState({
        isError: false,
        message: '',
    })

    const [searchParams] = useSearchParams()
    const searchId = searchParams.get('id')

    useEffect(() => {
        if (searchId) {
            setState(data)
        } else {
            setState(initialState)
        }
    }, [])

    const onWordClick = (id) => {
        if (activeWordId) return

        setActiveWordId(id)
    }

    const onAcceptClick = (nameValue, descrValue) => {
        if (!wordValidation(nameValue, descrValue, setError)) return

        setState({
            ...state,
            words: [...state.words].map((item) => {
                if (item.id === activeWordId) {
                    return {
                        id: item.id,
                        name: nameValue,
                        descr: descrValue,
                    }
                }
                return item
            }),
        })

        setActiveWordId(null)
    }

    return (
        <div className='word-set'>
            <input
                className='word-set__title'
                placeholder='Enter word set title'
                defaultValue={state.title}
            />
            <div className='word-set__words'>
                <WordSetList
                    data={state.words}
                    activeWordId={activeWordId}
                    onWordClick={onWordClick}
                    onAcceptClick={onAcceptClick}
                    error={error}
                />
            </div>
            <div className='word-set__btns'>
                <button className='word-set__btns__btn'>Add word</button>
                <button className='word-set__btns__btn'>Create word set</button>
            </div>
        </div>
    )
}

export default WordSet

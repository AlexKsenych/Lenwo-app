import './userResult.sass'
import { Link } from 'react-router-dom'
import { userResultLanguageObj } from '../../utils/languageObj'
import { LanguageContext } from '../app/templateHOC'
import { useContext } from 'react'

const findKnownWords = (unknownWords = [], arr) => {
    if (unknownWords.length === 0) return arr

    const newArr = arr.filter((item) => {
        if (unknownWords[0].id === item.id) return false
        return true
    })

    return findKnownWords(unknownWords.slice(1, unknownWords.length), newArr)
}

const fromArrayToString = (arr) => arr.map((item) => item.name).join(', ')

const UserResult = ({ onRestart, unknownWordsArray, data }) => {
    const unknownWordsString = fromArrayToString(unknownWordsArray)

    const knownWordsString = fromArrayToString(
        findKnownWords(unknownWordsArray, data)
    )

    const language = useContext(LanguageContext)

    return (
        <div className='user-result'>
            <div className='user-result__wrapper'>
                <div className='user-result__wrapper__card'>
                    <div className='user-result__wrapper__card__title'>
                        {userResultLanguageObj.unknownWordsTitle[language]}
                    </div>
                    <div className='user-result__wrapper__card__words'>
                        {unknownWordsString}
                    </div>
                    <button
                        onClick={onRestart}
                        className='user-result__wrapper__card__btn'
                    >
                        {userResultLanguageObj.restart[language]}
                    </button>
                </div>
                <div className='user-result__wrapper__card'>
                    <div className='user-result__wrapper__card__title'>
                        {userResultLanguageObj.knownWordsTitle[language]}
                    </div>
                    <div className='user-result__wrapper__card__words'>
                        {knownWordsString}
                    </div>
                    <Link to={'/'} className='user-result__wrapper__card__btn'>
                        {userResultLanguageObj.toProfile[language]}
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default UserResult

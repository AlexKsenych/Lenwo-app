import './userResult.sass'
import { Link } from 'react-router-dom'

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

    return (
        <div className='user-result'>
            <div className='user-result__wrapper'>
                <div className='user-result__wrapper__card'>
                    <div className='user-result__wrapper__card__title'>
                        Words you should work at
                    </div>
                    <div className='user-result__wrapper__card__words'>
                        {unknownWordsString}
                    </div>
                    <button
                        onClick={onRestart}
                        className='user-result__wrapper__card__btn'
                    >
                        Restart
                    </button>
                </div>
                <div className='user-result__wrapper__card'>
                    <div className='user-result__wrapper__card__title'>
                        Words that you know
                    </div>
                    <div className='user-result__wrapper__card__words'>
                        {knownWordsString}
                    </div>
                    <Link to={'/'} className='user-result__wrapper__card__btn'>
                        Back to the profile
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default UserResult

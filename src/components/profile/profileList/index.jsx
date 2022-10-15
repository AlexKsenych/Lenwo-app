import edit from '../../../assets/img/edit.png'
import remove from '../../../assets/img/delete.png'
import plus from '../../../assets/img/plus.png'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { deleteWordSet } from '../../../service/service'

const ProfileList = ({ data }) => {
    const [isActive, setIsActive] = useState(false)
    const [activeId, setActiveId] = useState()

    const navigate = useNavigate()

    const onUpdateWordSetClick = (e, id) => {
        e.stopPropagation()
        return navigate(`/create-word-set?id=${id}`)
    }

    const onDeleteWordSetClick = (e, id, title) => {
        e.stopPropagation()
        if (!window.confirm(`Do you want to delete this word set ${title} ?`))
            return

        deleteWordSet(id)
    }

    const listItems = data.map((item) => {
        const { title, id, words } = item

        const descrWords = `${words[0].name}, ${words[1].name}, ${words[2].name}... / ${words.length} words in total`

        const onItemClick = () => {
            setIsActive(!isActive)
            setActiveId(id)
        }

        const idParams = `?id=${id}`

        const itemActive = isActive && activeId === id ? ' item_active' : '',
            templatesActive =
                isActive && activeId === id ? ' templates_active' : ''

        return (
            <div
                key={id}
                onClick={onItemClick}
                className={'profile__list__item' + itemActive}
            >
                <div className='profile__list__item__descr'>
                    <div className='profile__list__item__descr__title'>
                        {title}
                    </div>
                    <div className='profile__list__item__descr__words'>
                        {descrWords}
                    </div>
                </div>
                <div className='profile__list__item__btns'>
                    <button
                        onClick={(e) => onUpdateWordSetClick(e, id)}
                        className='profile__list__item__btns__btn'
                    >
                        <img
                            className='profile__list__item__btns__btn__img'
                            src={edit}
                            alt='edit'
                        />
                    </button>
                    <button
                        onClick={(e) => onDeleteWordSetClick(e, id, title)}
                        className='profile__list__item__btns__btn'
                    >
                        <img
                            className='profile__list__item__btns__btn__img'
                            src={remove}
                            alt='edit'
                        />
                    </button>
                </div>
                <div
                    className={
                        'profile__list__item__templates' + templatesActive
                    }
                >
                    <Link
                        to={`/template/flashcards${idParams}`}
                        className='profile__list__item__templates__template'
                    >
                        Classic Flashcards
                    </Link>
                    <Link
                        to={`/template/findOut${idParams}`}
                        className='profile__list__item__templates__template'
                    >
                        Find out a word
                    </Link>
                    <Link
                        to={`/template/kahoot-like${idParams}`}
                        className='profile__list__item__templates__template'
                    >
                        Kahoot-like
                    </Link>
                </div>
            </div>
        )
    })

    const onAddItem = () => {
        return navigate('/create-word-set')
    }

    return (
        <div className='profile__list'>
            {listItems}
            <div className='profile__list__item'>
                <img
                    onClick={onAddItem}
                    className='profile__list__item__plus'
                    src={plus}
                    alt='Add item'
                />
            </div>
        </div>
    )
}

export default ProfileList

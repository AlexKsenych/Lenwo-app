import edit from '../../../assets/img/edit.png'
import remove from '../../../assets/img/delete.png'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const ProfileList = ({data}) => {
    const [isActive, setIsActive] = useState(false)
    const [activeId, setActiveId] = useState()

    const listItems = data.map(item => {
        const {title, id, words} = item

        const descrWords = `${words[0].name}, ${words[1].name}, ${words[2].name}... + ${words.length - 3} words`

        const onItemClick = () => {
            setIsActive(!isActive)
            setActiveId(id)
        }

        const itemActive = isActive && activeId === id ? " item_active" : '',
              templatesActive = isActive && activeId === id ? ' templates_active' : ''

        return (
            <div key={id} onClick={onItemClick} className={'profile__list__item' + itemActive}>
                <div className='profile__list__item__descr'>
                    <div className='profile__list__item__descr__title'>{title}</div>
                    <div className='profile__list__item__descr__words'>{descrWords}</div>
                </div>
                <div className="profile__list__item__btns">
                    <button className="profile__list__item__btns__btn">
                        <img className='profile__list__item__btns__btn__img' src={edit} alt="edit" />
                    </button>
                    <button className="profile__list__item__btns__btn">
                        <img className='profile__list__item__btns__btn__img' src={remove} alt="edit" />
                    </button>
                </div>
                <div className={'profile__list__item__templates' + templatesActive}>
                    <Link to={'/flashcards'} className='profile__list__item__templates__template'>Classic Flashcards</Link>
                    <Link to={'/flashcardOnTime'} className='profile__list__item__templates__template'>Flashcards on time</Link>
                    <Link to={'/findOut'} className='profile__list__item__templates__template'>Find out a definition</Link>
                    <Link to={'/kahoot-like'} className='profile__list__item__templates__template'>Kahoot-like</Link>
                </div>
            </div>
        )
    })

    return (
        <div className="profile__list">
            {listItems}
        </div>
    )
}

export default ProfileList
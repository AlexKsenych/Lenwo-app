import './profile.sass'
import edit from '../../assets/img/edit.png'
import remove from '../../assets/img/delete.png'

const Profile = () => {
    return (
        <div className='profile'>
            <div className="profile__list">
                <div className="profile__list__item item_active">
                    <div className='profile__list__item__descr'>
                        <div className='profile__list__item__descr__title'>Animals</div>
                        <div className='profile__list__item__descr__words'>Cat, Dog, Camel... + 24 words</div>
                    </div>
                    <div className="profile__list__item__btns">
                        <button className="profile__list__item__btns__btn">
                            <img className='profile__list__item__btns__btn__img' src={edit} alt="edit" />
                        </button>
                        <button className="profile__list__item__btns__btn">
                            <img className='profile__list__item__btns__btn__img' src={remove} alt="edit" />
                        </button>
                    </div>
                    <div className="profile__list__item__templates templates_active">
                        <div className='profile__list__item__templates__template'>Classic Flashcards</div>
                        <div className='profile__list__item__templates__template'>Flashcards on time</div>
                        <div className='profile__list__item__templates__template'>Find out a definition</div>
                        <div className='profile__list__item__templates__template'>Kahoot-like</div>
                    </div>
                </div>
                <div className="profile__list__item">
                    <div className='profile__list__item__descr'>
                        <div className='profile__list__item__descr__title'>Animals</div>
                        <div className='profile__list__item__descr__words'>Cat, Dog, Camel... + 24 words</div>
                    </div>
                    <div className="profile__list__item__btns">
                        <button className="profile__list__item__btns__btn">
                            <img className='profile__list__item__btns__btn__img' src={edit} alt="edit" />
                        </button>
                        <button className="profile__list__item__btns__btn">
                            <img className='profile__list__item__btns__btn__img' src={remove} alt="edit" />
                        </button>
                    </div>
                </div>
                <div className="profile__list__item">
                    <div className='profile__list__item__descr'>
                        <div className='profile__list__item__descr__title'>Animals</div>
                        <div className='profile__list__item__descr__words'>Cat, Dog, Camel... + 24 words</div>
                    </div>
                    <div className="profile__list__item__btns">
                        <button className="profile__list__item__btns__btn">
                            <img className='profile__list__item__btns__btn__img' src={edit} alt="edit" />
                        </button>
                        <button className="profile__list__item__btns__btn">
                            <img className='profile__list__item__btns__btn__img' src={remove} alt="edit" />
                        </button>
                    </div>
                </div>
            </div>
            <div className="profile__user"></div>
        </div>
    )
}

export default Profile
















/* <div className='templates'>
    <div className='templates__template'>Classic Flashcards</div>
    <div className='templates__template'>Flashcards on time</div>
    <div className='templates__template'>Find out a definition</div>
    <div className='templates__template'>Kahoot-like</div>
</div> */
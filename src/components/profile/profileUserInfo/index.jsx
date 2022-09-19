import React from 'react'
import imgNotFound from '../../../assets/img/image-not-found.png'
import { isClassNameActive } from '../../../utils/functions'

const ProfileUserInfo = ({ data, setsLength }) => {
    const { name, img, dayStreak } = data

    return (
        <div className='profile__user'>
            <img
                src={img !== 'null' ? img : imgNotFound}
                alt='UserInfoAvatar'
                className={isClassNameActive(
                    img === 'null',
                    'profile__user__img'
                )}
            />
            <div className='profile__user__name'>{name}</div>
            <div className='profile__user__descr'>
                <div className='profile__user__descr__title'>
                    Number of sets :
                </div>
                <div className='profile__user__descr__value'>{setsLength}</div>
            </div>
            <div className='profile__user__descr'>
                <div className='profile__user__descr__title'>
                    My day streak :
                </div>
                <div className='profile__user__descr__value'>{dayStreak}</div>
            </div>
        </div>
    )
}

export default ProfileUserInfo
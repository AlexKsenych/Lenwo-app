import React from 'react'
import imgNotFound from '../../../assets/img/image-not-found.png'
import { isClassNameActive } from '../../../utils/functions'

const ProfileUser = ({ data, setsLength }) => {
    const { fullName, img } = data

    return (
        <div className='profile__user'>
            <img
                src={img ? img : imgNotFound}
                alt='UserInfoAvatar'
                className={isClassNameActive(
                    img === 'null',
                    'profile__user__img'
                )}
            />
            <div className='profile__user__name'>{fullName}</div>
            <div className='profile__user__descr'>
                <div className='profile__user__descr__title'>
                    Number of sets :
                </div>
                <div className='profile__user__descr__value'>{setsLength}</div>
            </div>
        </div>
    )
}

export default ProfileUser

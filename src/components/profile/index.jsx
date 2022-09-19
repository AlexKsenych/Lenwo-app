import './profile.sass'
import ProfileList from './profileList'
import ProfileUserInfo from './profileUserInfo'

const Profile = ({ data, userData }) => {
    const profileUserInfoProps = {
        data: userData,
        setsLength: data.length,
    }

    return (
        <div className='profile'>
            <ProfileList data={data} />
            <ProfileUserInfo {...profileUserInfoProps} />
        </div>
    )
}

export default Profile

import './profile.sass'
import ProfileList from './profileList'
import ProfileUserInfo from './profileUserInfo'
import Loading from '../../utils/loading'

const Profile = ({ data = [], userData }) => {
    const loadingCondition = Object.keys(userData).length === 0

    return (
        <>
            {loadingCondition ? (
                <Loading />
            ) : (
                <div className='profile'>
                    <ProfileList data={data} />
                    <ProfileUserInfo data={userData} setsLength={data.length} />
                </div>
            )}
        </>
    )
}

export default Profile

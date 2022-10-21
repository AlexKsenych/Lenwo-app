import './profile.sass'
import ProfileList from './profileList'
import ProfileUser from './profileUser'
import Loading from '../../utils/loading'

const Profile = ({ data = [], userData, language }) => {
    const loadingCondition = Object.keys(userData).length === 0

    return (
        <>
            {loadingCondition ? (
                <Loading />
            ) : (
                <div className='profile'>
                    <ProfileList data={data} language={language} />
                    <ProfileUser
                        data={userData}
                        setsLength={data.length}
                        language={language}
                    />
                </div>
            )}
        </>
    )
}

export default Profile

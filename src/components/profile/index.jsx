import './profile.sass'
import ProfileList from './profileList'
import ProfileUser from './profileUser'
import Loading from '../../utils/loading'

const Profile = ({ data = [], userData, language, setIsAuth }) => {
    const loadingCondition = Object.keys(userData).length === 0

    return (
        <>
            {loadingCondition ? (
                <Loading />
            ) : (
                <div className='profile'>
                    <ProfileList
                        data={data}
                        language={language}
                        setIsAuth={setIsAuth}
                    />
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

import './profile.sass'
import ProfileList from './profileList'

const Profile = ({data}) => {

    return (
        <div className='profile'>
            <ProfileList data={data}/>
            <div className="profile__user"></div>
        </div>
    )
}

export default Profile
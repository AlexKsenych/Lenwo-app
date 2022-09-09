import './profile.sass'
import ProfileList from './profileList'

const Profile = ({data}) => {

    return (
        <div className='profile'>
            {data ? <ProfileList data={data}/> : <div>Oops</div>}
            <div className="profile__user"></div>
        </div>
    )
}

export default Profile
import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

function Profile() {
    const user = useContext(UserContext);
    const navigate = useNavigate();
    function handleSignOut() {
        user.setUser({})
        navigate('/sign-in')
    }
    if(!user.user.username) {
        return (
            <p>Please sign in</p>
        )
    } else {
        return (
            <>
                <div className="profile-img-container">
                    <img className="profile-img" src={user.user.avatar_url}/>
                </div>
                <p className="profile-text">{user.user.name}</p>
                <p className="profile-text">{user.user.username}</p>
                <button className="button-submit" onClick={()=>{handleSignOut()}}>Sign out</button>
            </>
        )
    }
}

export default Profile;
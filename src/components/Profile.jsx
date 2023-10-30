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
                <div className="bg-white padding-20 profile-img-container border-2px">
                    <img className="center padding-20 profile-img" src={user.user.avatar_url}/>
                </div>
                <p className="margin-20">{user.user.name}</p>
                <p className="margin-20">{user.user.username}</p>
                <button className="dis-blk button-submit rounded size-1em btn" onClick={()=>{handleSignOut()}}>Sign out</button>
            </>
        )
    }
}

export default Profile;
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
                <img src={user.user.avatar_url}/>
                <p>{user.user.name}</p>
                <p>{user.user.username}</p>
                <button onClick={()=>{handleSignOut()}}>Sign out</button>
            </>
        )
    }
}

export default Profile;
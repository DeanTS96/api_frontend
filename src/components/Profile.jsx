import { useContext } from "react";
import { UserContext } from '../App';

function Profile() {
    const user = useContext(UserContext).user;
    return (
        <>
            <img src={user.avatar_url || ''}/>
            <p>{user.name || ''}</p>
            <p>{user.username || 'please sign in'}</p>
        </>
    )
}

export default Profile;
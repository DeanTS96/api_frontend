import { useContext } from "react";
import { UserContext } from '../App';

function Profile() {
    const user = useContext(UserContext);
    if(!user.user.username) {
        return (
            <p>Please sign in</p>
        )
    } else {
        return (
            <>
                <img src={user.avatar_url}/>
                <p>{user.name}</p>
                <p>{user.username}</p>
                <button onClick={()=>{user.setUser({})}}>Sign out</button>
            </>
        )
    }
}

export default Profile;
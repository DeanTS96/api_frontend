import {useState, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {UserContext} from'../App';
import axios from 'axios';

function SignIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [userExists, setUserExists] = useState('');
    const {setUser} = useContext(UserContext);
    const navigate = useNavigate();
    
    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        axios.get(`https://news-api-9k2x.onrender.com/api/users/${e.target[0].value}`).then(({data:{user}}) => {
            setIsLoading(false);
            setUserExists('');
            setUser(user)
            setUsername('');
            setPassword('');
            navigate('/profile');
        }).catch(err => {
            setIsLoading(false);
            setUserExists('User doesn\'t exist');
            console.log(err)
        })

    }
    return (
        <>
            <p>{isLoading ? 'Loading...' : ''}</p>
            <form onSubmit={(e)=>{handleSubmit(e)}}>
                <label htmlFor="username">Username: </label>
                <input id="username" name="username" value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
                <label htmlFor="password">Password: </label>
                <input id="password" name="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                <button type="submit">Sign In</button>
            </form>
            <p>Not with us?</p>
            <button onClick={(e)=>{navigate('/sign-up')}}>Create Account</button>
            <p>{userExists}</p>
        </>
    )
}

export default SignIn;
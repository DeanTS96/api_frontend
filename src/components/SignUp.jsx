import {useState, useNavigate} from 'react';

function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [avatarURL, setAvatarURL] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        console.log(e.target.value);
        //setIsLoading(true);
        //axios.post(`https://news-api-9k2x.onrender.com/api/users/${e.target[0].value}`, {body: commentInput, username: 'grumpy19'}).then(x => {console.log(x);})
    }
    return (
        <>
            {isLoading ? 'Loading...' : ''}
            <p>Signup</p>
            <form>
                <label htmlFor="username">Username: </label>
                <input id="username" name="username" value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
                <label htmlFor="password">Password: </label>
                <input id="password" name="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                <label htmlFor="avatar-url">Avatar: </label>
                <input id="avatar-url" name="avatar-rul" value={avatarURL} onChange={(e)=>{setAvatarURL(e.target.value)}}/>
                <button type="submit" onSubmit={(e)=>{handleSubmit(e)}}>Submit</button>
            </form>
        </>
    )
}

export default SignUp;
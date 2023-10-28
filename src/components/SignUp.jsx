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
            <p className="page-title">Create Account</p>
            <div className="content">
                <form className="content-item">
                    <label className="form-label" htmlFor="username">Username </label>
                    <input className="form-item" id="username" name="username" value={username} onChange={(e)=>{setUsername(e.target.value)}} required/>
                    <label className="form-label" htmlFor="password">Password </label> 
                    <input className="form-item" id="password" name="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} required/>
                    <label className="form-label" htmlFor="avatar-url">Avatar url </label>
                    <input className="form-item" id="avatar-url" name="avatar-rul" value={avatarURL} onChange={(e)=>{setAvatarURL(e.target.value)}}/>
                    <button className="button-submit" type="submit" onSubmit={(e)=>{handleSubmit(e)}}>Submit</button>
                </form>
            </div>
        </>
    )
}

export default SignUp;
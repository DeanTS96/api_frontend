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
            <p className="size-15em page-title">Create Account</p>
            <div className="border-2px bg-white margin-20 content">
                <form className="border-2px rounded padding-20 content-item bg-lightblue">
                    <label className="dis-blk" htmlFor="username">Username </label>
                    <input className="form-item rounded border-2px" id="username" name="username" value={username} onChange={(e)=>{setUsername(e.target.value)}} required/>
                    <label className="dis-blk" htmlFor="password">Password </label> 
                    <input className="form-item rounded border-2px" id="password" name="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} required/>
                    <label className="dis-blk" htmlFor="avatar-url">Avatar url </label>
                    <input className="form-item rounded border-2px" id="avatar-url" name="avatar-rul" value={avatarURL} onChange={(e)=>{setAvatarURL(e.target.value)}}/>
                    <button className="dis-blk button-submit rounded size-1em btn" type="submit" onSubmit={(e)=>{handleSubmit(e)}}>Submit</button>
                </form>
            </div>
        </>
    )
}

export default SignUp;
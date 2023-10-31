import {useState, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {UserContext} from'../App';
import {requestSignIn} from '../../api';

function SignIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const {setUser} = useContext(UserContext);
    const [signInError, setSignInError] = useState('');
    const navigate = useNavigate();
    
    function handleSubmit(e) {
        e.preventDefault();
        setSignInError('');
        setIsLoading(true);
        requestSignIn(e.target[0].value)
        .then(({data:{user}}) => {
            setIsLoading(false);
            setUser(user)
            setUsername('');
            setPassword('');
            navigate('/');
        }).catch(err => {
            setIsLoading(false);
            const errorStatus = err.response.status;
            if(errorStatus === 404){
                setSignInError({head: 'User doesn\'t exist', body: 'please check your spelling and try again'})
            } else {
                setSignInError({head:'oops', body: 'Server is currnetly down. Please try again later'})
            }
            console.log(err)
        })

    }
        return (
            <div className="padding-20">
                <p>{isLoading ? 'Loading...' : ''}</p>
                    <form className="border-2px rounded padding-20 content-item bg-lightblue width-mx-600 account" onSubmit={(e)=>{handleSubmit(e)}}>
                        <label className="dis-blk" htmlFor="username">Username </label>
                        <input className="form-item rounded border-2px" id="username" name="username" value={username} onChange={(e)=>{setUsername(e.target.value)}} required/>
                        <label className="dis-blk" htmlFor="password">Password </label>
                        <input className="form-item rounded border-2px" id="password" name="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} required/>
                        <button className="dis-blk button-submit rounded size-10em btn" type="submit">Sign In</button>
                    </form>
                    <h2>{signInError.head}</h2>
                    <p>{signInError.body}</p>
        
                <p>Not with us?</p>
                <button className="dis-blk button-sign-up rounded size-10em btn" onClick={(e)=>{navigate('/sign-up')}}>Create Account</button>
            </div>
        )
}

export default SignIn;
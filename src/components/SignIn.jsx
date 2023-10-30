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
            <>
                <p>{isLoading ? 'Loading...' : ''}</p>
                <div className="content">
                    <form className="content-item" onSubmit={(e)=>{handleSubmit(e)}}>
                        <label className="form-label" htmlFor="username">Username </label>
                        <input className="form-item" id="username" name="username" value={username} onChange={(e)=>{setUsername(e.target.value)}} required/>
                        <label className="form-label" htmlFor="password">Password </label>
                        <input className="form-item" id="password" name="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} required/>
                        <button className="button-submit" type="submit">Sign In</button>
                    </form>
                    <h2>{signInError.head}</h2>
                    <p>{signInError.body}</p>
                </div>
                <p>Not with us?</p>
                <button className="button-sign-up" onClick={(e)=>{navigate('/sign-up')}}>Create Account</button>
            </>
        )
}

export default SignIn;
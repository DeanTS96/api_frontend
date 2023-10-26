import {useState, useContext} from 'react';
import axios from 'axios';
import {UserContext} from '../App';

function PostComment({articleId, setIsCommentPosted}) {
    const [commentInput, setCommentInput] = useState('');
    const [isPostingComment, setIsPostingComment] = useState(false);
    const [postCommentError, setPostCommentError] = useState('');
    const user = useContext(UserContext)

    function handleSubmit(e) {
        e.preventDefault();
        setPostCommentError('')
        setIsPostingComment(true);
        axios.post(`https://news-api-9k2x.onrender.com/api/articles/${articleId}/comments`, {body: commentInput, username: 'grumpy19'}).then(() => {
            setIsPostingComment(false);
            setCommentInput('')
            setIsCommentPosted(true);
        }).catch(err => {
            const errorStatus = err.response.status;
            if(errorStatus === 404){
                setPostCommentError({head: 'Error: Article id doesn\'t exist', body: 'That article id didn\'t match any articles in our database. Please try again later.'})
            } else if(errorStatus === 400) {
                setPostCommentError({head: 'Error: Article id invalid', body: 'Please check article Id is a number and try again'})
            } else {
                setPostCommentError({head:'Error: A problem with our server', body: 'We\'re experiencing issues currently with this functionality.please come back and try ahgain later. We\'re sorry for any inconvienicne this may have cuaused'})
            }
            setIsPostingComment(false);
            console.log(err)
        })
    }
        return (
            <>
                {isPostingComment ? 'Loading...' : 
                <form onSubmit={handleSubmit}>
                    <img src={user.user.avatar_url}/>
                    <label htmlFor="add-comment">Add comment</label>
                    <input id="add-comment" value={commentInput} onChange={(e) => {setCommentInput(e.target.value)}} name="add-comment"></input>
                    <button type="submit" placeholder="add comment">submit</button>
                </form>
                }
                <h2>{postCommentError.head}</h2>
                <p>{postCommentError.body}</p>
            </>
        )
}

export default PostComment;
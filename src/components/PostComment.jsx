import {useState} from 'react';
import axios from 'axios';

function PostComment({articleId, setIsCommentPosted}) {
    const [commentInput, setCommentInput] = useState('');
    const [isPostingComment, setIsPostingComment] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        setIsPostingComment(true);
        axios.post(`https://news-api-9k2x.onrender.com/api/articles/${articleId}/comments`, {body: commentInput, username: 'grumpy19'}).then(() => {
            setIsPostingComment(false);
            setCommentInput('')
            setIsCommentPosted(true);
        }).catch(err => {
            setIsPostingComment(false);
            console.log(err)
        })
    }

    return (
        <>
            {isPostingComment ? 'Loading...' : 
            <form onSubmit={handleSubmit}>
                <p>userAvatar</p>
                <label htmlFor="add-comment">Add comment</label>
                <input id="add-comment" value={commentInput} onChange={(e) => {setCommentInput(e.target.value)}} name="add-comment"></input>
                <button type="submit" placeholder="add comment">submit</button>
            </form>
            }
        </>
    )

}

export default PostComment;
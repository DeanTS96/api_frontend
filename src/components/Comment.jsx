import {useState, useEffect} from 'react';
import axios from 'axios';
import CommentVoteButtons from './CommentVoteButtons';

function Comment({comment}) {
    const [userImage, setUserImage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        axios.get(`https://news-api-9k2x.onrender.com/api/users/${comment.author}`)
        .then(({data:{user: {avatar_url}}}) => {
            setIsLoading(false);
        setUserImage(avatar_url)
    }).catch(err => {
        setIsLoading(false);
        console.log(err)
    })
    }, [])
    /*disabled={voted > 0}*/
    console.log('kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk')
    return (
        <>
            <p>{isLoading ? 'Loading...' : ''}</p>
            <p>{comment.author}</p>
            <img src={userImage} alt="user profile picture"/>
            <p>{new Date(comment.created_at).toLocaleDateString()}</p>
            <p>{comment.body}</p>
            <CommentVoteButtons commentId={comment.comment_id} votes={comment.votes} voter='comment'/>
        </>
    )
}

export default Comment;
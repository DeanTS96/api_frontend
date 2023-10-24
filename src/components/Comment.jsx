import {useState, useEffect} from 'react';
import handleVote from '../utils/handleVote'
import axios from 'axios';

function Comment({comment}) {
    const [userImage, setUserImage] = useState("");
    const [voted, setVoted] = useState(0);
    const [commentVotes, setCommentVotes] = useState(comment.votes);
    const commentId = comment.comment_id;
    const voter = 'comment'
    axios.get(`https://news-api-9k2x.onrender.com/api/users/${comment.author}`).then(({data:{user: {avatar_url}}}) => {
        setUserImage(avatar_url)
    })
    return (
        <>
            <p>{comment.author}</p>
            <img src={userImage}/>
            <p>{new Date(comment.created_at).toLocaleDateString()}</p>
            <p>{comment.body}</p>
            <button disabled={voted > 0} onClick={(e) => {handleVote(e, setVoted, commentId, voter, setCommentVotes)}}>^</button>
            <button disabled={voted < 0} onClick={(e) => {handleVote(e, setVoted, commentId, voter, setCommentVotes)}}>v</button>
            <p>{commentVotes}</p>
        </>
    )
}

export default Comment;
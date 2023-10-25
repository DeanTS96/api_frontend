import {useState, useEffect} from 'react';
import handleVote from '../utils/handleVote'
import axios from 'axios';

function Comment({comment}) {
    const [userImage, setUserImage] = useState("");
    const [upVoted, setUpVoted] = useState(false);
    const [downVoted, setDownVoted] = useState(false);
    const [commentVotes, setCommentVotes] = useState(comment.votes);
    const [isLoading, setIsLoading] = useState(false);
    const commentId = comment.comment_id;
    const voter = 'comment'
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
    return (
        <>
            <p>{isLoading ? 'Loading...' : ''}</p>
            <p>{comment.author}</p>
            <img src={userImage} alt="user profile picture"/>
            <p>{new Date(comment.created_at).toLocaleDateString()}</p>
            <p>{comment.body}</p>
            <button id="upVote" onClick={(e) => {handleVote(e, upVoted, setUpVoted, downVoted, setDownVoted, commentId, voter, setCommentVotes)}}>^</button>
            <button id="downVote" onClick={(e) => {handleVote(e, upVoted, setUpVoted, downVoted, setDownVoted, commentId, voter, setCommentVotes)}}>v</button>
            <p>{commentVotes}</p>
        </>
    )
}

export default Comment;
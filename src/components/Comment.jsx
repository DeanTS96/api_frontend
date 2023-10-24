import {useState} from 'react';
import handleVote from '../utils/handleVote'

function Comment({comment}) {
    const [voted, setVoted] = useState(0);
    const [commentVotes, setCommentVotes] = useState(comment.votes);
    const commentId = comment.comment_id;
    const voter = 'comment'
    return (
        <>
            <p>{comment.author}</p>
            <p>{comment.created_at}</p>
            <p>{comment.body}</p>
            <button disabled={voted > 0} onClick={(e) => {handleVote(e, setVoted, commentId, voter, setCommentVotes)}}>^</button>
            <button disabled={voted < 0} onClick={(e) => {handleVote(e, setVoted, commentId, voter, setCommentVotes)}}>v</button>
            <p>{commentVotes}</p>
        </>
    )
}

export default Comment;
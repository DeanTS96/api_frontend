import {useState} from 'react';
import handleVote from '../utils/handleVote'

function CommentVoteButtons({commentId, voter, votes}) {
    const [commentVotes, setCommentVotes] = useState(votes);
    const [commentVoteError, setCommentVoteError] = useState('');
    const [upVoted, setUpVoted] = useState(false);
    const [downVoted, setDownVoted] = useState(false);
    return (
        <>
            <button id="upVote" onClick={(e) => {handleVote(e, upVoted, setUpVoted, downVoted, setDownVoted, commentId, voter, setCommentVotes, setCommentVoteError)}}>^</button>
            <button id="downVote" onClick={(e) => {handleVote(e, upVoted, setUpVoted, downVoted, setDownVoted, commentId, voter, setCommentVotes, setCommentVoteError)}}>v</button>
            <p>{commentVoteError}</p>
            <p>{commentVotes}</p>
        </>
    )
}

export default CommentVoteButtons;
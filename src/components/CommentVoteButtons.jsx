import {useState} from 'react';
import handleVote from '../utils/handleVote'

function CommentVoteButtons({commentId, voter, votes}) {
    const [commentVotes, setCommentVotes] = useState(votes);
    const [commentVoteError, setCommentVoteError] = useState('');
    const [upVoted, setUpVoted] = useState(false);
    const [downVoted, setDownVoted] = useState(false);
    return (
        <>
            <button className="comment-vote-button" id="upVote" onClick={(e) => {handleVote(e, upVoted, setUpVoted, downVoted, setDownVoted, commentId, voter, setCommentVotes, setCommentVoteError)}}>^</button>
            <p className="comment-votes">{commentVotes}</p>
            <button className="comment-vote-button" id="downVote" onClick={(e) => {handleVote(e, upVoted, setUpVoted, downVoted, setDownVoted, commentId, voter, setCommentVotes, setCommentVoteError)}}>v</button>
            <p>{commentVoteError}</p>
        </>
    )
}

export default CommentVoteButtons;
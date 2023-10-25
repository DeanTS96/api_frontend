import {useState} from 'react';
import handleVote from '../utils/handleVote'

function ArticleVoteButtons({articleId, voter, setArticleVotes}) {
    const [articleVoteError, setArticleVoteError] = useState('');
    const [upVoted, setUpVoted] = useState(false);
    const [downVoted, setDownVoted] = useState(false);
    return (
        <>
                <button id="upVote" onClick={(e) => {handleVote(e, upVoted, setUpVoted, downVoted, setDownVoted, articleId, voter, setArticleVotes, setArticleVoteError)}}>^</button>
                <button id="downVote" onClick={(e) => {handleVote(e, upVoted, setUpVoted, downVoted, setDownVoted, articleId, voter, setArticleVotes, setArticleVoteError)}}>v</button>
                <p>{articleVoteError}</p>
        </>
    )
}

export default ArticleVoteButtons;
import axios from 'axios';

function handleVote(e, upVoted, setUpVoted, downVoted, setDownVoted, idToVote, voter, setVotes, setVoteError) {
    setVoteError('');
    if(e.target.id === "upVote") {
        let changedDownVote = false;
        if(!upVoted){
            setUpVoted(true)
            let upVoteInc;
            if(downVoted) {
                setDownVoted(false);
                changedDownVote = true;
                upVoteInc = 2
            } else {
                upVoteInc = 1;
            }
            setVotes(votes => {
                return votes + upVoteInc
            })
            axios.patch(`https://news-api-9k2x.onrender.com/api/${voter === 'article' ? 'articles' : 'comments'}/${idToVote}`, {inc_votes: upVoteInc})
            .catch(err => {
                if(changedDownVote) {
                    setDownVoted(true);
                    changedDownVote = false;
                }
                setUpVoted(false)
                setVotes(votes => {
                    return votes - upVoteInc
                }) 
                setVoteError('Vote failed. Please try again later')
            })
        } else {
            setUpVoted(false)
            setVotes(votes => {
                return votes - 1
            })
            axios.patch(`https://news-api-9k2x.onrender.com/api/${voter === 'article' ? 'articles' : 'comments'}/${idToVote}`, {inc_votes: -1})
            .then(() => {
            }).catch(err => {
                setUpVoted(true)
                setVotes(votes => {
                    return votes + 1
                }) 
                setVoteError('Vote failed. Please try again later')
            })
        }
    } else if(e.target.id === "downVote") {
        let changedUpVote = false;
        if(!downVoted) {
            setDownVoted(true)
            let downVoteInc;
            let incVotes;
            if(upVoted) {
                downVoteInc = 2
                incVotes = -2
                setUpVoted(false);
                changedUpVote = true;
            } else {
                downVoteInc = 1;
                incVotes = -1
            }
            setVotes(votes => {
                return votes - downVoteInc
            })
            axios.patch(`https://news-api-9k2x.onrender.com/api/${voter === 'article' ? 'articles' : 'comments'}/${idToVote}`, {inc_votes: incVotes})
            .catch(err => {
                if(changedUpVote) {
                    setUpVoted(true);
                    changedUpVote = false;
                }
                setDownVoted(false)
                setVotes(votes => {
                    return votes + downVoteInc
                })
                setVoteError('Vote failed. Please try again later')
            })
        } else {
            setDownVoted(false)
            setVotes(votes => {
                return votes + 1
            })
            axios.patch(`https://news-api-9k2x.onrender.com/api/${voter === 'article' ? 'articles' : 'comments'}/${idToVote}`, {inc_votes: +1})
            .then(() => {
            }).catch(err => {
                setDownVoted(true)
                setVotes(votes => {
                    return votes - 1
                })
                setVoteError('Vote failed. Please try again later')
            })
        }
    }
}

export default handleVote;
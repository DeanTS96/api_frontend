import axios from 'axios';

function handleVote(e, setVoted, idToVote, voter, setVotes) {
    console.log(e.target)
    console.log(idToVote)
    if(e.target.innerText === "^") {
        setVoted(vote => {
            return vote + 1
        })
        setVotes(votes => {
            return votes + 1
        })
        axios.patch(`https://news-api-9k2x.onrender.com/api/${voter === 'article' ? 'articles' : 'comments'}/${idToVote}`, {inc_votes: 1})
        .then(() => {
        }).catch(err => {
            setVoted(vote => {
                return vote - 1
            })
            setVotes(votes => {
                return votes - 1
            }) 
        })
    } else if(e.target.innerText === "v") {
        setVoted(vote => {
            return vote - 1
        })
        setVotes(votes => {
            return votes - 1
        })
        axios.patch(`https://news-api-9k2x.onrender.com/api/${voter === 'article' ? 'articles' : 'comments'}/${idToVote}`, {inc_votes: -1})
        .then(() => {
        }).catch(err => {
            setVoted(vote => {
                return vote + 1
            })
            setVotes(votes => {
                return votes + 1
            })
        })
    }
}

export default handleVote;
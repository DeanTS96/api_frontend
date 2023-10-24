import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import Comment from './Comment';
import handleVote from '../utils/handleVote';

function Article() {
    const params = useParams();
    const [article, setArticle] = useState({});
    const [comments, setComments] = useState([]);
    const [voted, setVoted] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [articleVotes, setArticleVotes] = useState(0);
    useEffect(() => {
        setIsLoading(true);
        axios.get(`https://news-api-9k2x.onrender.com/api/articles/${params.article_id}`)
        .then(({data: {article: requestArticle}}) => {
            console.log(requestArticle, 'requested');
            setArticle(requestArticle);
            setArticleVotes(requestArticle.votes);
        }).then(() => {
            return axios.get(`https://news-api-9k2x.onrender.com/api/articles/${params.article_id}/comments`)
        }).then(({data: {comments: requestedComments}}) => {
            setIsLoading(false);
            console.log(requestedComments)
            setComments(requestedComments)
        }).catch(err => {
            setIsLoading(false);
            console.log(err);
        })
    }, [])

    const articleId = article.article_id;
    const voter = 'article';

    return (
        <>
            <p>{isLoading ? 'Loading...': ''}</p>
            <div>
                <h2>{article.title}</h2>
                <p>{article.topic}</p>
                <p>{article.article_img_url}</p>
                <p>{article.body}</p>
                <p>{article.author}</p>
                <p>{new Date(article.created_at).toLocaleDateString()}</p>
                <p><button>{article.comment_count}</button></p>
                <button disabled={voted > 0} onClick={(e) => {handleVote(e, setVoted, articleId, voter, setArticleVotes)}}>^</button>
                <button disabled={voted < 0} onClick={(e) => {handleVote(e, setVoted, articleId, voter, setArticleVotes)}}>v</button>
                <p>{articleVotes}</p>
            </div>
            <ul>
                {comments.map(comment => {
                    return (
                        <li key={`${article.article_id}-${comment.comment_id}-${comment.author}`}>
                            <Comment comment={comment} />
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

export default Article;
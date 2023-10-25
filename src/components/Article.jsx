import {useEffect, useState, Component} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import Comment from './Comment';
import handleVote from '../utils/handleVote';
import Pagination from './Pagination';

function Article() {
    const params = useParams();
    const [article, setArticle] = useState({});
    const [comments, setComments] = useState([]);
    const [upVoted, setUpVoted] = useState(false);
    const [downVoted, setDownVoted] = useState(false);
    const [loadingComments, setLoadingComments] = useState(false);
    const [loadingArticles, setLoadingArticles] = useState(false);
    const [articleVotes, setArticleVotes] = useState(0);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [commentInput, setCommentInput] = useState('');
    const [commentPosted, setIsCommentPosted] = useState(false);
    const [isPostingComment, setIsPostingComment] = useState(false);

    useEffect(() => {
        setLoadingArticles(true);
        axios.get(`https://news-api-9k2x.onrender.com/api/articles/${params.article_id}`)
        .then(({data: {article: requestArticle}}) => {
            setArticle(requestArticle);
            setArticleVotes(requestArticle.votes);
            setLoadingArticles(false);
        }).catch(err => {
            setLoadingArticles(false);
            console.log(err);
        })
    }, [])
    useEffect(() => {
        setIsCommentPosted(false);
        setLoadingComments(true);
        axios.get(`https://news-api-9k2x.onrender.com/api/articles/${params.article_id}/comments?p=${page}&limit=${limit}`)
        .then(({data: {comments: requestedComments}}) => {
            setComments(requestedComments);
            setLoadingComments(false);
        }).catch(err => {
            setLoadingComments(false);
            console.log(err);
        })
    },[page, limit, commentPosted])
    console.log('hi')
    const articleId = article.article_id;
    const voter = 'article';
    function handleSubmit(e) {
        e.preventDefault();
        setIsPostingComment(true);
        axios.post(`https://news-api-9k2x.onrender.com/api/articles/${articleId}/comments`, {body: commentInput, username: 'grumpy19'}).then(() => {
            setIsPostingComment(false);
            setCommentInput('')
            setIsCommentPosted(true);
        }).catch(err => {
            setIsPostingComment(false);
            console.log(err)
        })
    }
    return (
        <>
            <p>{loadingArticles || loadingComments ? 'Loading...': ''}</p>
            <div>
                <h2>{article.title}</h2>
                <p>{article.topic}</p>
                <p>{article.article_img_url}</p>
                <p>{article.body}</p>
                <p>{article.author}</p>
                <p>{new Date(article.created_at).toLocaleDateString()}</p>
                <p>{article.comment_count} comments</p>
                <button onClick={(e) => {handleVote(e, upVoted, setUpVoted, downVoted, setDownVoted, articleId, voter, setArticleVotes)}}>^</button>
                <button onClick={(e) => {handleVote(e, upVoted, setUpVoted, downVoted, setDownVoted, articleId, voter, setArticleVotes)}}>v</button>
                <p>{articleVotes}</p>
            </div>
            {isPostingComment ? 'Loading...' : 
            <form onSubmit={handleSubmit}>
                <p>userAvatar</p>
                <label htmlFor="add-comment">Add comment</label>
                <input id="add-comment" value={commentInput} onChange={(e) => {setCommentInput(e.target.value)}} name="add-comment"></input>
                <button type="submit" placeholder="add comment">submit</button>
            </form>
            }
            <ul>
                {comments.map(comment => {
                    return (
                        <li key={`${article.article_id}-${comment.comment_id}-${comment.author}`}>
                            <Comment comment={comment} />
                        </li>
                    )
                })}
            </ul>
            <Pagination perPage="comments" limit={limit} setLimit={setLimit} page={page} setPage={setPage} itemsLength={comments.length}/>
        </>
    )
}

export default Article;
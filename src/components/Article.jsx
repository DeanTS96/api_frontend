import {useEffect, useState, useContext} from 'react';
import {useParams} from 'react-router-dom';
import Comments from './Comments';
import ArticleVoteButtons from './ArticleVoteButtons';
import {getArticleById} from '../../api';
import DeleteArticle from './DeleteArticle';
import {UserContext} from '../App';

function Article() {
    const params = useParams();
    const articleId = params.article_id;
    const [article, setArticle] = useState({});
    const [loadingArticles, setLoadingArticles] = useState(true);
    const [articleVotes, setArticleVotes] = useState(0);
    const [articleError, setArticleError] = useState('');
    const user = useContext(UserContext).user.username;

    useEffect(() => {
        setArticleError('');
        setLoadingArticles(true);
        getArticleById(articleId)
        .then(({data: {article: requestArticle}}) => {
            setArticle(requestArticle);
            setArticleVotes(requestArticle.votes);
            setLoadingArticles(false);
        }).catch(err => {
            const errorStatus = err.response.status;
            if(errorStatus === 404){
                setArticleError({head: 'Sorry :(', body: 'I could not find the article you\'re looking for.'})
            } else if(errorStatus === 400) {
                setArticleError({head: 'Article id invalid', body: 'Please check article Id is a number and try again'})
            } else {
                setArticleError({head:'oops', body: 'Server is currnetly down. Please try again later'})
            }
            setLoadingArticles(false);
        })
    }, [])
    if(articleError) {
        return (
            <>
                <h2>{articleError.head}</h2>
                <p>{articleError.body}</p>
            </>
        )
    } else {
        return (
            <div className="center width-mx-1300">
                <p>{loadingArticles ? 'Loading...': ''}</p>
                <div className="bg-lightblue padding-20 margin-20 rounded border-2px" >
                    <h2>{article.title}</h2>
                    <p className="article-topic" >{article.topic}</p>
                    <img className="rounded width-100 article-list-img" src={article.article_img_url} alt="articles image"></img>
                    <p>{article.body}</p>
                    <p className="article-posted-date">Posted on {new Date(article.created_at).toLocaleDateString()}</p>
                    <p className="size-08em">By {article.author}</p>
                    <ArticleVoteButtons articleVotes={articleVotes} articleId={article.article_id} voter='article' setArticleVotes={setArticleVotes} votes={article.votes} />
                    {user === article.author ? <DeleteArticle articleId={article.article_id}/> : ''}
                </div>
                <Comments commentCount={article.comment_count} articleId={articleId}/>
            </div>
        )
    }
}

export default Article;
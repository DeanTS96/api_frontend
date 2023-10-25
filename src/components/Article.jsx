import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import Comments from './Comments';
import ArticleVoteButtons from './ArticleVoteButtons';

function Article() {
    const params = useParams();
    const articleId = params.article_id;
    const [article, setArticle] = useState({});
    const [loadingArticles, setLoadingArticles] = useState(false);
    const [articleVotes, setArticleVotes] = useState(0);

    useEffect(() => {
        setLoadingArticles(true);
        axios.get(`https://news-api-9k2x.onrender.com/api/articles/${articleId}`)
        .then(({data: {article: requestArticle}}) => {
            setArticle(requestArticle);
            setArticleVotes(requestArticle.votes);
            setLoadingArticles(false);
        }).catch(err => {
            setLoadingArticles(false);
            console.log(err);
        })
    }, [])
    return (
        <>
            <p>{loadingArticles ? 'Loading...': ''}</p>
            <div>
                <h2>{article.title}</h2>
                <p>{article.topic}</p>
                <img src={article.article_img_url} alt="articles image"></img>
                <p>{article.body}</p>
                <p>{article.author}</p>
                <p>{new Date(article.created_at).toLocaleDateString()}</p>
                <p>{article.comment_count} comments</p>
                <ArticleVoteButtons articleId={article.article_id} voter='article' setArticleVotes={setArticleVotes} votes={article.votes} />
                <p>{articleVotes}</p>
            </div>
            <Comments articleId={articleId}/>
        </>
    )
}

export default Article;
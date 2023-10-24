import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import axios from 'axios';

function Articles() {
    const params = useParams();
    console.log(params);
    const [articles, setArticles] = useState([]);
    //create base url
    useEffect(() => {
        axios.get('https://news-api-9k2x.onrender.com/api/articles', {params: {topic: params.topic}})
        .then(({data}) => {
            setArticles(data.articles);
        })
    },[])
console.log(articles)
    return (
        <>
            <p>Articles {params.topic}</p>
            <ol>
                {articles.map(article => {
                    return (
                        <li key={`${article.article_id} ${article.title}`} article_id={article.article_id}>
                            <p>{article.title}</p>
                            <p>{article.created_at}</p>
                            <p>{article.topic}</p>
                            <p>{article.author}</p>
                        </li>
                    )
                })}
            </ol>
        </>
        

    )
}

export default Articles;
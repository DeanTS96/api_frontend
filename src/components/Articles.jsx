import {useParams,Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import axios from 'axios';
import Pagination from './Pagination';

function Articles() {
    const params = useParams();
    console.log(params);
    const [articles, setArticles] = useState([]);
    const [isLoading , setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    //create base url
    useEffect(() => {
        setIsLoading(true);
        axios.get(`https://news-api-9k2x.onrender.com/api/articles?p=${page}&limit=${limit}`, {params: {topic: params.topic}})
        .then(({data}) => {
            setIsLoading(false);
            setArticles(data.articles);
        }).catch(err => {
            setIsLoading(false);
            console.log('err')
        })
    },[limit, page])
    return (
        <>
            <p>Articles {params.topic}</p>
            <p>{isLoading ? 'Loading...': ''}</p>
            <ol>
                {articles.map(article => {
                    return (
                        <Link key={`${article.article_id} ${article.title}`} to={`/articles/${article.article_id}`}>
                            <li article_id={article.article_id}>
                                <p>{article.title}</p>
                                <p>{new Date(article.created_at).toLocaleDateString()}</p>
                                <p>{article.topic}</p>
                                <p>{article.author}</p>
                            </li>
                        </Link>
                    )
                })}
            </ol>
            <Pagination perPage="articles" limit={limit} setLimit={setLimit} page={page} setPage={setPage} itemsLength={articles.length}/>
        </>
        

    )
}

export default Articles;
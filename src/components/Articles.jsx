import {useParams,Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import axios from 'axios';
import Pagination from './Pagination';
import Sort from './Sort';

function Articles({currentURL}) {
    const params = useParams();
    const [articles, setArticles] = useState([]);
    const [isLoading , setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [sortBy, setSortBy] = useState('created_at')
    const [order, setOrder] = useState('desc')

    useEffect(() => {
        setIsLoading(true);
        axios.get(`https://news-api-9k2x.onrender.com/api/articles?p=${page}&limit=${limit}&sort_by=${sortBy}&order=${order}`, {params: {topic: params.topic}})
        .then(({data}) => {
            setIsLoading(false);
            setArticles(data.articles);
        }).catch(err => {
            setIsLoading(false);
            console.log(err)
        })
    },[limit, page, sortBy, order, currentURL])
    return (
        <>
            <p>Articles {params.topic}</p>
            <p>{isLoading ? 'Loading...': ''}</p>
            <Sort sortBy={sortBy} setSortBy={setSortBy} order={order} setOrder={setOrder} />
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
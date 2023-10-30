import {useParams,Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import Pagination from './Pagination';
import Sort from './Sort';
import {getAllArticles} from '../../api';

function Articles({currentURL}) {
    const params = useParams();
    const [articles, setArticles] = useState([]);
    const [isLoading , setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [sortBy, setSortBy] = useState('created_at')
    const [order, setOrder] = useState('desc')
    const [articlesError, setArticlesError] = useState('');

    useEffect(() => {
        setIsLoading(true);
        setArticlesError('');
        getAllArticles(page, limit, sortBy, order, params)
        .then(({data}) => {
            setIsLoading(false);
            setArticles(data.articles);
        }).catch(err => {
            setIsLoading(false);
            const errorStatus = err.response.status;
            console.log(errorStatus);
            setArticlesError({head:'oops', body: 'Server is currnetly down. Please try again later'})
            console.log(err)
        })
    },[limit, page, sortBy, order, currentURL])

    if(articlesError) {
        return (
            <>
                <h2>{articlesError.head}</h2>
                <p>{articlesError.body}</p>
            </>
        )
    } else {
        return (
            <>
                <p>{isLoading ? 'Loading...': ''}</p>
                    <Sort sortBy={sortBy} setSortBy={setSortBy} order={order} setOrder={setOrder} />
                <div className="border-2px bg-white margin-20 content">
                    <ol>
                        {articles.map(article => {
                            console.log(article);
                            return (
                                <Link key={`${article.article_id} ${article.title}`} to={`/articles/${article.article_id}`}>
                                    <li className="dis-inblk border-2px bg-lightblue rounded padding-20 content-item" article_id={article.article_id}>
                                        <img className="rounded width-100 article-list-img" src={article.article_img_url}/>
                                        <p className="bold">{article.title}</p>
                                        <p>Posted on {new Date(article.created_at).toLocaleDateString()}</p>
                                        <p>By {article.author}</p>
                                    </li>
                                </Link>
                            )
                        })}
                    </ol>
                </div>
                <Pagination perPage="Articles" limit={limit} setLimit={setLimit} page={page} setPage={setPage} itemsLength={articles.length}/>
            </>
        )
    }
}

export default Articles;
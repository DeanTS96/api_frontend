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
    const [order, setOrder] = useState('asc')
    const [articlesError, setArticlesError] = useState('');
    const [isOrderUnchanged, setIsOrderUnchanged] = useState(true);
    const [isSortByUnchanged, setIsSortByUnchanged] = useState(true);

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
                    <Sort sortBy={sortBy} setSortBy={setSortBy} order={order} setOrder={setOrder} 
                    isOrderUnchanged={isOrderUnchanged} setIsOrderUnchanged={setIsOrderUnchanged} isSortByUnchanged={isSortByUnchanged} setIsSortByUnchanged={setIsSortByUnchanged}/>
                    <ol>
                        {articles.map(article => {
                            console.log(article);
                            return (
                                <Link key={`${article.article_id} ${article.title}`} to={`/articles/${article.article_id}`}>
                                    <li className="dis-inblk border-2px bg-lightblue rounded padding-20 content-item width-mx-600 margin-20" article_id={article.article_id}>
                                        <img className="rounded width-100 article-list-img height-mx-500" src={article.article_img_url}/>
                                        <p className="bold">{article.title}</p>
                                        <p >{article.topic}</p>
                                        <p class="articles-posted-date">Posted on {new Date(article.created_at).toLocaleDateString()}</p>
                                        <p class="size-08em">By {article.author}</p>
                                        <div className="comment-foot">
                                            <svg className="vote-icon" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                                                <path d="M168.2 384.9c-15-5.4-31.7-3.1-44.6 6.4c-8.2 6-22.3 14.8-39.4 22.7c5.6-14.7 9.9-31.3 11.3-49.4c1-12.9-3.3-25.7-11.8-35.5C60.4 302.8 48 272 48 240c0-79.5 
                                                83.3-160 208-160s208 80.5 208 160s-83.3 160-208 160c-31.6 0-61.3-5.5-87.8-15.1zM26.3 423.8c-1.6 2.7-3.3 5.4-5.1 8.1l-.3 .5c-1.6 2.3-3.2 4.6-4.8 6.9c-3.5 4.7-7.3 
                                                9.3-11.3 13.5c-4.6 4.6-5.9 11.4-3.4 17.4c2.5 6 8.3 9.9 14.8 9.9c5.1 0 10.2-.3 15.3-.8l.7-.1c4.4-.5 8.8-1.1 13.2-1.9c.8-.1 1.6-.3 2.4-.5c17.8-3.5 
                                                34.9-9.5 50.1-16.1c22.9-10 42.4-21.9 54.3-30.6c31.8 11.5 67 17.9 104.1 17.9c141.4 0 256-93.1 256-208S397.4 32 256 32S0 125.1 0 240c0 45.1 17.7 86.8 
                                                47.7 120.9c-1.9 24.5-11.4 46.3-21.4 62.9zM144 272a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm144-32a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm80 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"/>
                                            </svg>
                                            <p className="dis-in size-20em margin-l-5">{article.comment_count}</p>
                                            <svg className="vote-icon margin-l-20" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                                                <path d="M323.8 34.8c-38.2-10.9-78.1 11.2-89 49.4l-5.7 20c-3.7 13-10.4 25-19.5 35l-51.3 56.4c-8.9 9.8-8.2 25 1.6 
                                                33.9s25 8.2 33.9-1.6l51.3-56.4c14.1-15.5 24.4-34 30.1-54.1l5.7-20c3.6-12.7 16.9-20.1 29.7-16.5s20.1 16.9 16.5 29.7l-5.7 
                                                20c-5.7 19.9-14.7 38.7-26.6 55.5c-5.2 7.3-5.8 16.9-1.7 24.9s12.3 13 21.3 13L448 224c8.8 0 16 7.2 16 16c0 6.8-4.3 12.7-10.4 
                                                15c-7.4 2.8-13 9-14.9 16.7s.1 15.8 5.3 21.7c2.5 2.8 4 6.5 4 10.6c0 7.8-5.6 14.3-13 15.7c-8.2 1.6-15.1 7.3-18 15.1s-1.6 16.7 3.6 
                                                23.3c2.1 2.7 3.4 6.1 3.4 9.9c0 6.7-4.2 12.6-10.2 14.9c-11.5 4.5-17.7 16.9-14.4 28.8c.4 1.3 .6 2.8 .6 4.3c0 8.8-7.2 16-16 16H286.5c-12.6 
                                                0-25-3.7-35.5-10.7l-61.7-41.1c-11-7.4-25.9-4.4-33.3 6.7s-4.4 25.9 6.7 33.3l61.7 41.1c18.4 12.3 40 18.8 62.1 18.8H384c34.7 0 62.9-27.6 
                                                64-62c14.6-11.7 24-29.7 24-50c0-4.5-.5-8.8-1.3-13c15.4-11.7 25.3-30.2 25.3-51c0-6.5-1-12.8-2.8-18.7C504.8 273.7 512 257.7 512 240c0-35.3-28.6-64-64-64l-92.3 
                                                0c4.7-10.4 8.7-21.2 11.8-32.2l5.7-20c10.9-38.2-11.2-78.1-49.4-89zM32 192c-17.7 0-32 14.3-32 32V448c0 17.7 14.3 32 32 32H96c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32H32z"/>
                                            </svg>
                                            <p className="dis-in size-20em margin-l-5">{article.votes}</p>
                                        </div>
                                    </li>
                                </Link>
                            )
                        })}
                    </ol>
                <Pagination perPage="Articles" limit={limit} setLimit={setLimit} page={page} setPage={setPage} itemsLength={articles.length}/>
            </>
        )
    }
}

export default Articles;
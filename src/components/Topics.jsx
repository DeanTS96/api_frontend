import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { getTopics } from '../../api';

function Topics() {
    const [topics, setTopics] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [topicsError, setTopicsError] = useState('');
    useEffect(()=> {
        setTopicsError('')
        setIsLoading(true);
        getTopics()
        .then(({data}) => {
            setIsLoading(false);
            setTopics(data);
        }).catch(err => {
            setIsLoading(false);
            setTopicsError({head:'oops', body: 'Server is currnetly down. Please try again later'})
        })
    }, [])
    if(topicsError) {
        return (
            <>
                <h2>{topicsError.head}</h2>
                <p>{topicsError.body}</p>
            </>
        )
    } else
    return (
        <>
            <p>{isLoading ? 'Loading...': ''}</p>
            <ul>
                {topics.map(topic => {
                return (
                <Link key={topic.slug} to={`${topic.slug}`} >
                    <li>
                        {topic.slug}
                    </li>
                </Link>
                )})}
            </ul>
        </>
    )
}

export default Topics;
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

function Topics() {
    const [topics, setTopics] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(()=> {
        setIsLoading(true);
        axios.get('https://news-api-9k2x.onrender.com/api/topics').then(({data}) => {
            setIsLoading(false);
            setTopics(data);
        })
    }, [])
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
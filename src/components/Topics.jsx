import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

function Topics() {
    const [topics, setTopics] = useState([]);
    useEffect(()=> {
        axios.get('https://news-api-9k2x.onrender.com/api/topics').then(({data}) => {
            console.log(data)
            setTopics(data);
        })
    }, [])
    console.log(topics)
    return (
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
    )
}

export default Topics;
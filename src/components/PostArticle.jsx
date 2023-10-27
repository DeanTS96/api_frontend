import {useState, useContext} from 'react';
import {UserContext} from '../App';
import {requestPostArticle} from '../../api';
import {useNavigate} from 'react-router-dom';

function PostArticle() {
    const [titleInput, setTitleInput] = useState('');
    const [topicInput, setTopicInput] = useState('');
    const [bodyInput, setBodyInput] = useState('');
    const [imgURLInput, setImgURLInput] = useState('');
    const [isPostingArticle, setIsPostingArticle] = useState(false);
    const [postArticleError, setPostArticleError] = useState('');
    const navigate = useNavigate();
    const user = useContext(UserContext).user

    function postArticle(e) {
        e.preventDefault();
        setPostArticleError('')
        setIsPostingArticle(true);
        const title = e.target[0].value;
        const topic = e.target[1].value;
        const body = e.target[2].value;
        const imgURL = e.target[3].value || user.avatar_url;

        requestPostArticle(user.username, title, topic, body, imgURL)
        .then((x) => {
            console.log(x)
            setIsPostingArticle(false);
            setTitleInput('')
            setTopicInput('')
            setBodyInput('')
            setImgURLInput('')
            navigate('/');
        }).catch(err => {
            setPostArticleError({head:'oops sorry :(', body: 'We\'re currently experiencing issues with our server. Please come com back later'})
            setIsPostingArticle(false);
            console.log(err)
        })
    }
    return (
        <>
            {isPostingArticle ? 'Loading...' : 
            <form onSubmit={postArticle}>
                <label htmlFor="title">Title</label>
                <input id="title" name="title" value={titleInput} onChange={(e) => {setTitleInput(e.target.value)}} required/>
                <label htmlFor="topic">Topic</label>
                <input id="topic" name="topic" value={topicInput} onChange={(e) => {setTopicInput(e.target.value)}} required/>
                <label htmlFor="body">Article</label>
                <textarea id="body" name="body" value={bodyInput} onChange={(e) => {setBodyInput(e.target.value)}} required/>
                <label htmlFor="img_url">Image url</label>
                <input id="img_url" name="img_url" value={imgURLInput} onChange={(e) => {setImgURLInput(e.target.value)}}/>
                <button type="submit">Submit</button>
            </form>
            }
            <h2>{postArticleError.head}</h2>
            <p>{postArticleError.body}</p>
        </>
    )
}

export default PostArticle;
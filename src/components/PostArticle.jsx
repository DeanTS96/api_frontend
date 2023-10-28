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
        <div className="content">
            {isPostingArticle ? 'Loading...' : 
            <form className="content-item" onSubmit={postArticle}>
                <label className="post-article-label" htmlFor="title">Title</label>
                <input className="form-item" id="title" name="title" value={titleInput} onChange={(e) => {setTitleInput(e.target.value)}} required/>
                <label className="post-article-label" htmlFor="topic">Topic</label>
                <input className="form-item" id="topic" name="topic" value={topicInput} onChange={(e) => {setTopicInput(e.target.value)}} required/>
                <label className="post-article-label" htmlFor="body">Article</label>
                <textarea className="form-item post-article-body" id="body" name="body" value={bodyInput} onChange={(e) => {setBodyInput(e.target.value)}} autosize required/>
                <label className="post-article-label" htmlFor="img_url">Image url</label>
                <input className="form-item" id="img_url" name="img_url" value={imgURLInput} onChange={(e) => {setImgURLInput(e.target.value)}}/>
                <button className="button-submit" type="submit">Submit</button>
            </form>
            }
            <h2>{postArticleError.head}</h2>
            <p>{postArticleError.body}</p>
        </div>
    )
}

export default PostArticle;
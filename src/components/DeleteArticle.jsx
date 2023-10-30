import {useState} from 'react';
import { requestDeleteArticle } from "../../api";
import {useNavigate} from 'react-router-dom';


function DeleteArticle({articleId}) {
    const [deletingArticle, setDeletingArticle] = useState(false);
    const [deleteArticleError, setDeleteArticleError] = useState('');
    const navigate = useNavigate();

    function deleteArticle(e) {
        setDeleteArticleError('')
        setDeletingArticle(true)
        requestDeleteArticle(articleId)
        .then(()=>{
            setDeletingArticle(false)
            navigate('/');
        })
        .catch(err => {
            setDeleteArticleError({head:'oops sorry :(', body: 'Server is currnetly down. Please try again later'})
            setDeletingArticle(false)
            console.log(err)
        })
    }
        return (
            <div className="width-100 align-r">  
                {deletingArticle ? 'Deleting article...' : <button className="btn-none btn-text clickable" onClick={(e)=>{deleteArticle(e)}}>Delete</button>}
                <h2>{deleteArticleError.head}</h2>
                <p>{deleteArticleError.body}</p>
            </div>
        )
}

export default DeleteArticle;
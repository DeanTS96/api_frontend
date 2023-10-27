import {useState} from 'react';
import { requestUpdateArticle } from "../../api";


function UpdateArticle({articleId, setArticleUpdated}) {
    const [updatingArticle, setUpdatingArticle] = useState(false);
    const [updateArticleError, setUpdateArticleError] = useState('');

    function updateArticle(e) {
        setUpdateArticleError('')
        setUpdatingArticle(true)
        requestUpdateArticle(articleId)
        .then(()=>{
            setUpdatingArticle(false)
            setArticleUpdated(true)
        })
        .catch(err => {
            /*
            const errorStatus = err.response.status;
            if(errorStatus === 400) {
                setUpdateArticleError({head: 'Comment id invalid', body: 'Please check comment Id is a number and try again'})
            } else {
                setUpdateArticleError({head:'oops', body: 'Server is currnetly down. Please try again later'})
            }*/
            setUpdatingArticle(false)
            console.log(err)
        })
    }
    //onClick={(e)=>{updateArticle(e)}} <-- button
        return (
            <>  
                {updatingArticle ? 'Deleting article...' : <button >Edit</button>}
                <h2>{updateArticleError.head}</h2>
                <p>{updateArticleError.body}</p>
            </>
        )
}

export default UpdateArticle;
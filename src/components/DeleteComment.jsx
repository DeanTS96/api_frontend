import {useState} from 'react';
import { requestDeleteComment } from "../../api";


function DeleteComment({commentId, setCommentDeleted}) {
    const [deletingComment, setDeletingComment] = useState(false);
    const [deleteCommentError, setDeleteCommentError] = useState('');

    function deleteComment(e) {
        setDeleteCommentError('')
        setDeletingComment(true)
        requestDeleteComment(commentId)
        .then(()=>{
            setDeletingComment(false)
            setCommentDeleted(true)
        })
        .catch(err => {
            const errorStatus = err.response.status;
            if(errorStatus === 400) {
                setDeleteCommentError({head: 'Comment id invalid', body: 'Please check comment Id is a number and try again'})
            } else {
                setDeleteCommentError({head:'oops', body: 'Server is currnetly down. Please try again later'})
            }
            setDeletingComment(false)
            console.log(err)
        })
    }
        return (
            <div className="button-delete dis-inblk">  
                {deletingComment ? 'Deleting comment...' : <button className="btn-none btn-text clickable size-08em" onClick={(e)=>{deleteComment(e)}}>Delete</button>}
                <h2>{deleteCommentError.head}</h2>
                <p>{deleteCommentError.body}</p>
            </div>
        )
}

export default DeleteComment;
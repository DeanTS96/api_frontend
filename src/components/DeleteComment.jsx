import axios from "axios";
import {useState} from 'react';


function DeleteComment({commentId, setCommentDeleted}) {
    const [deletingComment, setDeletingComment] = useState(false);
    const [deleteSuccesful, setDeleteSuccesful] = useState(true);

    function deleteComment(e) {
        setDeleteSuccesful(true)
        setDeletingComment(true)
        axios.delete(`https://news-api-9k2x.onrender.com/api/comments/${commentId}`).then(()=>{
            setDeletingComment(false)
            setDeleteSuccesful(true);
            setCommentDeleted(true)
        })
        .catch(err => {
            setDeletingComment(false)
            setDeleteSuccesful(false)
            console.log(err)
        })
    }
    return (
        <>
            {deletingComment ? 'Deleting comment...' : <button onClick={(e)=>{deleteComment(e)}}>Delete</button>}
            <p>{deleteSuccesful ? '' : 'Delete failed. Please try again later'}</p>
        </>
    )
}

export default DeleteComment;
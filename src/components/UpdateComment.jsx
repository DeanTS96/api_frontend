import {useState} from 'react';
import { requestUpdateComment } from "../../api";


function UpdateComment({commentId, setCommentUpdated}) {
    const [updatingComment, setUpdatingComment] = useState(false);
    const [updateCommentError, setUpdateCommentError] = useState('');

    function updateComment(e) {
        setUpdateCommentError('')
        setUpdatingComment(true)
        requestUpdateComment(commentId)
        .then(()=>{
            setUpdatingComment(false)
            setCommentUpdated(true)
        })
        .catch(err => {
            const errorStatus = err.response.status;
            if(errorStatus === 400) {
                setUpdateCommentError({head: 'Comment id invalid', body: 'Please check comment Id is a number and try again'})
            } else {
                setUpdateCommentError({head:'oops', body: 'Server is currnetly down. Please try again later'})
            }
            setUpdatingComment(false)
            console.log(err)
        })
    }
    //onClick={(e)=>{updateComment(e)}} <-- button
        return (
            <>  
                {updatingComment ? 'Deleting comment...' : <button >Edit</button>}
                <h2>{updateCommentError.head}</h2>
                <p>{updateCommentError.body}</p>
            </>
        )
}

export default UpdateComment;
import {useEffect, useState} from 'react';
import Comment from './Comment';
import Pagination from './Pagination';
import PostComment from './PostComment';
import {getComments} from '../../api';

function Comments({articleId}) {
    const [comments, setComments] = useState([]);
    const [loadingComments, setLoadingComments] = useState(true);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [commentPosted, setIsCommentPosted] = useState(false);
    const [commentDeleted, setCommentDeleted] = useState(false);
    const [commentUpdated, setCommentUpdated] = useState(false);
    const [commentsError, setCommentsError] = useState('');

    useEffect(() => {
        setCommentsError('')
        setCommentDeleted(false);
        setCommentUpdated(false);
        setIsCommentPosted(false);
        setLoadingComments(true);
        getComments(articleId, page, limit)
        .then(({data: {comments: requestedComments}}) => {
            setComments(requestedComments);
            setLoadingComments(false);
        }).catch(err => {
            const errorStatus = err.response.status;
            if(errorStatus === 404){
                setCommentsError({head: 'Error: Article id doesn\'t exist', body: 'That article id didn\'t match any articles in our database. Please try again later.'})
            } else if(errorStatus === 400) {
                setCommentsError({head: 'Error: Article id invalid', body: 'Please check article Id is a number and try again'})
            } else {
                setCommentsError({head:'Error: A problem with our server', body: 'We\'re experiencing issues currently with this functionality.please come back and try ahgain later. We\'re sorry for any inconvienicne this may have cuaused'})
            }
            setLoadingComments(false);
            console.log(err);
        })
    },[page, limit, commentPosted, commentDeleted, commentUpdated])

    if(commentsError) {
        return (
            <>
                <h2>{commentsError.head}</h2>
                <p>{commentsError.body}</p>
            </>
        )
    } else {
        return (
            <>
                <PostComment articleId={articleId} setIsCommentPosted={setIsCommentPosted}/>
                {loadingComments ? 'Loading...' : 
                <ul>
                {comments.map(comment => {
                    return (
                        <li key={`${comment.comment_id}`}>
                            <Comment comment={comment} setCommentDeleted={setCommentDeleted} setCommentUpdated={setCommentUpdated} />
                        </li>
                    )
                })}
                </ul>
                }
                <Pagination perPage="Comments" limit={limit} setLimit={setLimit} page={page} setPage={setPage} itemsLength={comments.length}/>
            </>
        )
    }
}

export default Comments;